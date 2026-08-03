// Smart import mapper — lets a CSV exported from ANY bookkeeping/accounting tool
// (Tally, Zoho Books, QuickBooks, Vyapar, Busy, Marg, Khatabook, plain Excel…)
// be imported, even though every tool names its columns differently and writes
// dates / amounts in its own format.
//
// Pure, framework-free, side-effect-free. Runs identically in the browser
// (settings.html, exposed as window.ImportMapper) and in Node (tools/test-import-mapper.mjs),
// so the matching/normalisation logic is unit-tested without a browser.
//
// All work happens client-side: the raw file is read in the browser, mapped to
// the ERP's canonical field names, and only the canonical rows are sent to the
// existing bulk-import endpoint. Nothing about the source format reaches the
// server, and no data ever leaves the machine.
(function (root) {
  'use strict';

  // Canonical ERP field -> the header names other tools are likely to use for it.
  // Compared after normHeader() (lowercased, punctuation -> single spaces), so
  // "GST No.", "GST_No", "gst no" all collapse to the same alias "gst no".
  const FIELD_ALIASES = {
    // ── party / person name (clients, vendors, employees, sites) ──
    name: ['name', 'party name', 'party', 'ledger name', 'ledger', 'account name', 'account',
      'customer name', 'customer', 'client name', 'client', 'company name', 'company',
      'supplier name', 'supplier', 'vendor name', 'vendor', 'employee name', 'staff name',
      'full name', 'site name', 'project name', 'project', 'particulars', 'firm name', 'business name'],
    client_name: ['client name', 'customer name', 'party name', 'party', 'ledger name', 'account name',
      'customer', 'client', 'name', 'billed to', 'bill to', 'sold to'],
    vendor_name: ['vendor name', 'supplier name', 'party name', 'party', 'ledger name', 'account name',
      'supplier', 'vendor', 'name', 'paid to', 'payee'],

    contact_person: ['contact person', 'contact name', 'contact', 'person', 'concerned person',
      'owner', 'proprietor', 'representative'],
    phone: ['phone', 'phone no', 'phone number', 'mobile', 'mobile no', 'mobile number', 'contact no',
      'contact number', 'telephone', 'tel', 'cell', 'cell no', 'whatsapp', 'whatsapp no'],
    email: ['email', 'email id', 'e mail', 'mail', 'mail id', 'email address'],
    address: ['address', 'billing address', 'addr', 'street', 'street address', 'full address',
      'address line 1', 'address 1', 'mailing address'],
    city: ['city', 'town', 'place', 'district'],
    state: ['state', 'region', 'province'],
    pincode: ['pincode', 'pin', 'pin code', 'postal code', 'zip', 'zip code', 'postcode'],
    gstin: ['gstin', 'gst no', 'gst number', 'gst', 'gst id', 'gstin no', 'gst registration no',
      'gst reg no', 'tax id', 'tin', 'gst in'],
    pan: ['pan', 'pan no', 'pan number', 'pan card', 'pan card no', 'income tax no'],
    credit_days: ['credit days', 'credit period', 'credit', 'payment terms', 'terms', 'credit limit days'],

    // ── vendor classification ──
    category: ['category', 'type', 'vendor type', 'supplier type', 'group', 'under', 'classification'],

    // ── codes / ids ──
    client_code: ['client code', 'customer code', 'customer id', 'client id', 'code', 'party code', 'account code'],
    vendor_code: ['vendor code', 'supplier code', 'supplier id', 'vendor id', 'code', 'party code', 'account code'],
    emp_code: ['emp code', 'employee code', 'employee id', 'emp id', 'staff id', 'staff code', 'code', 'id'],
    site_code: ['site code', 'project code', 'site id', 'project id', 'code', 'id'],

    // ── employee ──
    designation: ['designation', 'role', 'job title', 'title', 'position', 'post'],
    department: ['department', 'dept', 'division', 'team'],
    join_date: ['join date', 'joining date', 'date of joining', 'doj', 'hire date', 'hired on', 'start date'],
    basic_salary: ['basic salary', 'basic', 'salary', 'basic pay', 'monthly salary', 'gross salary', 'ctc'],
    hra: ['hra', 'house rent', 'house rent allowance', 'rent allowance'],
    da: ['da', 'dearness', 'dearness allowance'],

    // ── sites / projects ──
    location: ['location', 'site location', 'project location', 'address', 'place', 'site address'],
    contract_value: ['contract value', 'project value', 'contract amount', 'value', 'order value',
      'agreement value', 'work value', 'tender value'],
    start_date: ['start date', 'commencement date', 'project start', 'start', 'date of start', 'commenced on'],
    status: ['status', 'state', 'stage', 'active'],

    // ── opening balances / invoices / bills ──
    balance_amount: ['balance amount', 'balance', 'closing balance', 'outstanding', 'outstanding amount',
      'amount due', 'due', 'due amount', 'pending', 'pending amount', 'amount', 'net amount', 'total',
      'total amount', 'opening balance', 'closing bal', 'bal'],
    invoice_no: ['invoice no', 'invoice number', 'invoice', 'inv no', 'bill no', 'bill number', 'voucher no',
      'voucher number', 'voucher', 'ref no', 'reference no', 'reference', 'doc no', 'document no'],
    bill_no: ['bill no', 'bill number', 'invoice no', 'invoice number', 'voucher no', 'voucher number',
      'ref no', 'reference no', 'reference', 'doc no', 'document no', 'supplier invoice no'],
    invoice_date: ['invoice date', 'inv date', 'bill date', 'date', 'voucher date', 'doc date', 'document date',
      'dated', 'issue date'],
    bill_date: ['bill date', 'invoice date', 'date', 'voucher date', 'doc date', 'document date', 'dated', 'bill dated'],
    due_date: ['due date', 'payment due date', 'payment due', 'maturity date', 'due on'],
    description: ['description', 'narration', 'particulars', 'remarks', 'notes', 'details', 'memo', 'comment'],
  };

  function normHeader(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  }

  // Given the source file's header names and the list of canonical fields a
  // given entity expects, guess which source column feeds each field. Returns
  // { field: sourceHeaderName-or-empty }. A source column is used at most once.
  function guessMapping(sourceHeaders, fields) {
    const normed = (sourceHeaders || []).map(function (h) { return { raw: h, n: normHeader(h) }; });
    const used = {};
    const mapping = {};
    fields.forEach(function (f) { mapping[f] = ''; });

    // Pass 1 — exact match against an alias (or the canonical name itself).
    fields.forEach(function (field) {
      const aliases = (FIELD_ALIASES[field] || []).concat([normHeader(field)]);
      const hit = normed.find(function (h) { return !used[h.raw] && aliases.indexOf(h.n) !== -1; });
      if (hit) { mapping[field] = hit.raw; used[hit.raw] = true; }
    });

    // Pass 2 — looser token / word-boundary match for anything still unmapped.
    // Deliberately conservative (whole-token or boundary only, never a raw
    // mid-string substring) so e.g. "pan" does not latch onto "company".
    fields.forEach(function (field) {
      if (mapping[field]) return;
      const aliases = (FIELD_ALIASES[field] || []).concat([normHeader(field)]);
      const hit = normed.find(function (h) {
        if (used[h.raw]) return false;
        const n = h.n, tokens = n.split(' ');
        return aliases.some(function (a) {
          return tokens.indexOf(a) !== -1 || n === a || n.indexOf(a + ' ') === 0 || (n.length > a.length && n.slice(n.length - a.length - 1) === ' ' + a);
        });
      });
      if (hit) { mapping[field] = hit.raw; used[hit.raw] = true; }
    });

    return mapping;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function fullYear(y) { y = String(y); if (y.length === 2) { const n = parseInt(y, 10); return String(n >= 70 ? 1900 + n : 2000 + n); } return y; }

  const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

  // Normalise a date written in any common Indian/Western style to YYYY-MM-DD.
  // Handles ISO, DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY, MM/DD/YYYY (when
  // unambiguous), Tally-style 1-Apr-2025, "Apr 1, 2025", 2-digit years.
  // Ambiguous all-numeric dates default to day-first (the Indian convention).
  // Anything unrecognised is passed through untouched.
  function normalizeDate(s) {
    if (s == null) return '';
    s = String(s).trim();
    if (!s) return '';
    var m;

    m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) return m[1] + '-' + pad2(+m[2]) + '-' + pad2(+m[3]);

    m = s.match(/^(\d{4})[\/.](\d{1,2})[\/.](\d{1,2})$/);
    if (m) return m[1] + '-' + pad2(+m[2]) + '-' + pad2(+m[3]);

    // DD-MMM-YYYY  /  DD MMM YY  (Tally, bank statements)
    m = s.match(/^(\d{1,2})[-\s\/]([A-Za-z]{3,9})[-\s\/](\d{2,4})$/);
    if (m && MONTHS[m[2].slice(0, 3).toLowerCase()]) {
      return fullYear(m[3]) + '-' + pad2(MONTHS[m[2].slice(0, 3).toLowerCase()]) + '-' + pad2(+m[1]);
    }

    // MMM DD, YYYY
    m = s.match(/^([A-Za-z]{3,9})[-\s]+(\d{1,2}),?[-\s]+(\d{2,4})$/);
    if (m && MONTHS[m[1].slice(0, 3).toLowerCase()]) {
      return fullYear(m[3]) + '-' + pad2(MONTHS[m[1].slice(0, 3).toLowerCase()]) + '-' + pad2(+m[2]);
    }

    // All-numeric with / . or - separators
    m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
    if (m) {
      var a = parseInt(m[1], 10), b = parseInt(m[2], 10), day, mon;
      if (a > 12) { day = a; mon = b; }        // first part can only be a day
      else if (b > 12) { mon = a; day = b; }   // second part can only be a day -> MM/DD
      else { day = a; mon = b; }               // ambiguous -> day-first (Indian default)
      if (mon < 1 || mon > 12 || day < 1 || day > 31) return s;
      return fullYear(m[3]) + '-' + pad2(mon) + '-' + pad2(day);
    }

    return s;
  }

  // Normalise a money value to a plain Number. Strips currency symbols (Rs, ₹,
  // INR), thousands/lakh grouping commas, and spaces; understands accounting
  // negatives in (parentheses). A trailing Dr/Cr is dropped — the magnitude is
  // what an opening balance import wants. Returns '' for blanks/non-numbers.
  function normalizeAmount(s) {
    if (s == null) return '';
    s = String(s).trim();
    if (!s) return '';
    var neg = false;
    if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
    if (/-\s*$/.test(s) || /^\s*-/.test(s)) neg = true;
    var cleaned = s.replace(/[^0-9.]/g, '');
    if (cleaned === '' || cleaned === '.') return '';
    // Guard against multiple dots (e.g. weird grouping) -> keep first as decimal.
    var firstDot = cleaned.indexOf('.');
    if (firstDot !== -1) {
      cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
    }
    var n = parseFloat(cleaned);
    if (isNaN(n)) return '';
    return neg ? -Math.abs(n) : n;
  }

  // Turn the raw parsed CSV (header row + data rows) into canonical row objects
  // using a field->sourceHeader mapping, normalising any date/amount fields.
  function applyMapping(header, dataRows, mapping, opts) {
    opts = opts || {};
    var dateFields = {}, amountFields = {};
    (opts.dateFields || []).forEach(function (f) { dateFields[f] = true; });
    (opts.amountFields || []).forEach(function (f) { amountFields[f] = true; });

    var idx = {};
    (header || []).forEach(function (h, i) { if (!(h in idx)) idx[h] = i; });

    var out = [];
    (dataRows || []).forEach(function (row) {
      if (!row || row.every(function (c) { return !String(c == null ? '' : c).trim(); })) return;
      var obj = {};
      for (var field in mapping) {
        if (!Object.prototype.hasOwnProperty.call(mapping, field)) continue;
        var src = mapping[field];
        if (!src || !(src in idx)) continue;
        var v = row[idx[src]];
        v = (v == null ? '' : String(v)).trim();
        if (v === '') continue;
        if (dateFields[field]) v = normalizeDate(v);
        else if (amountFields[field]) { var nv = normalizeAmount(v); v = (nv === '' ? '' : nv); if (v === '') continue; }
        obj[field] = v;
      }
      out.push(obj);
    });
    return out;
  }

  var ImportMapper = {
    FIELD_ALIASES: FIELD_ALIASES,
    normHeader: normHeader,
    guessMapping: guessMapping,
    normalizeDate: normalizeDate,
    normalizeAmount: normalizeAmount,
    applyMapping: applyMapping,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = ImportMapper;
  else root.ImportMapper = ImportMapper;
})(typeof window !== 'undefined' ? window : globalThis);
