/* ─────────────────────────────────────────────────────────────────────────────
   Munimo web ERP — offline DEMO backend.

   Runs the REAL office software in the browser with no server behind it. Every
   read is answered from `demo-data.js`, a snapshot of genuine API responses
   captured from a seeded demo company. Every write is applied to that snapshot
   in memory, so a visitor who adds a payment, a client or a worker sees it
   appear in the lists and roll into the totals — then everything resets on
   reload. Nothing here talks to a real customer's data.

   It plugs into the single fetch chokepoint in erp-web.js (`call(op, arg)`).
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SNAP = window.__DEMO_SNAPSHOT || {};
  var LAT = 90;                       // a touch of latency so it feels networked
  var seq = 90000;                    // id generator for new rows

  var SESSION = { id: 1, username: 'demo', name: 'Demo User', role: 'admin', csrf: 'demo-csrf-token' };

  function ok(data) { return { success: true, data: data }; }
  function clone(v) { return v == null ? v : JSON.parse(JSON.stringify(v)); }

  function sortKeys(o) {
    if (o === null || typeof o !== 'object' || Array.isArray(o)) return o;
    var out = {}, ks = Object.keys(o).sort();
    for (var i = 0; i < ks.length; i++) out[ks[i]] = sortKeys(o[ks[i]]);
    return out;
  }

  /* Look up a captured response: exact args first, then any capture for the op. */
  function replay(op, arg) {
    var e = SNAP[op];
    if (!e) return null;
    var key;
    try { key = JSON.stringify(sortKeys(arg || {})); } catch (_) { key = '{}'; }
    if (e.byArgs && Object.prototype.hasOwnProperty.call(e.byArgs, key)) return clone(e.byArgs[key]);
    return clone(e.any);
  }

  /* The live, mutable copy of each list the demo lets you write to. Seeded
     lazily from the snapshot the first time an op is touched. */
  var live = {};
  function list(op) {
    if (!live[op]) {
      var r = replay(op, {});
      live[op] = (r && r.success && Array.isArray(r.data)) ? r.data : [];
    }
    return live[op];
  }

  /* save-<thing> → which list the new row belongs in. */
  var WRITES = {
    'save-transaction': 'get-transactions',
    'save-client': 'get-clients',
    'save-vendor': 'get-vendors',
    'save-site': 'get-sites',
    'save-employee': 'get-employees',
    'save-labour-worker': 'get-labour-workers',
    'save-invoice': 'get-invoices',
    'save-expense': 'get-expenses',
    'save-bank': 'get-banks',
    'save-budget-head': 'get-budget-heads',
    'save-cash-head': 'get-cash-heads',
    'save-subcontractor': 'get-subcontractors',
    'save-inventory-item': 'get-inventory-items',
    'save-commission-entry': 'get-commission-entries',
    'save-loan': 'get-loans',
    'save-service': 'get-services',
    'save-instrument': 'get-instruments',
  };
  var DELETES = {
    'delete-transaction': 'get-transactions',
    'delete-client': 'get-clients',
    'delete-vendor': 'get-vendors',
    'delete-site': 'get-sites',
    'delete-employee': 'get-employees',
    'delete-labour-worker': 'get-labour-workers',
    'delete-invoice': 'get-invoices',
    'delete-expense': 'get-expenses',
    'delete-budget-head': 'get-budget-heads',
    'delete-cash-head': 'get-cash-heads',
    'delete-inventory-item': 'get-inventory-items',
    'delete-commission-entry': 'get-commission-entries',
  };

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* Money written in the demo moves the cash-book headline numbers too, so the
     dashboard reacts the way the real product does. */
  function applyToSummary(row) {
    var amt = Number(row.amount) || 0;
    if (!amt) return;
    var s = live['get-lite-summary'] || (live['get-lite-summary'] = (function () {
      var r = replay('get-lite-summary', {});
      return (r && r.data) ? r.data : null;
    })());
    if (!s) return;
    var credit = String(row.type || '').toLowerCase() === 'credit';
    if (s.flow) {
      if (credit) { s.flow.month_in = (s.flow.month_in || 0) + amt; s.flow.today_in = (s.flow.today_in || 0) + amt; }
      else { s.flow.month_out = (s.flow.month_out || 0) + amt; s.flow.today_out = (s.flow.today_out || 0) + amt; }
      s.flow.month_net = (s.flow.month_in || 0) - (s.flow.month_out || 0);
    }
    if (s.cash) {
      s.cash.total = (s.cash.total || 0) + (credit ? amt : -amt);
      var accs = s.cash.accounts || [];
      for (var i = 0; i < accs.length; i++) {
        if (String(accs[i].id) === String(row.bank_id)) { accs[i].current_balance = (accs[i].current_balance || 0) + (credit ? amt : -amt); break; }
      }
    }
  }

  function route(op, arg) {
    arg = arg || {};

    /* ── auth: always signed in, never a login wall ── */
    if (op === 'get-session' || op === 'session' || op === 'login') return ok(SESSION);
    if (op === 'logout') return { success: true, data: true };

    /* ── bridge no-ops the desktop build answers locally ── */
    if (op === '__noop_license_ok') return ok({ valid: true, licensed: true });
    if (op === '__machine_id') return ok('DEMO-MACHINE');
    if (op === '__license_info') return ok({ valid: true, type: 'demo', expires: null });
    if (op === '__goto_dashboard') { window.location.href = 'app.html'; return { success: true }; }
    if (op === 'verify-management-pin') return ok({ ok: true, verified: true });

    /* ── reads the live copy owns (writes have touched them) ── */
    if (live[op]) return ok(clone(live[op]));

    /* ── writes ── */
    var target = WRITES[op];
    if (target) {
      var rows = list(target);
      var row = clone(arg && arg.payload ? arg.payload : arg) || {};
      if (row.id) {                                   // update in place
        for (var i = 0; i < rows.length; i++) {
          if (String(rows[i].id) === String(row.id)) { rows[i] = Object.assign({}, rows[i], row); break; }
        }
      } else {                                        // insert
        row.id = ++seq;
        if (!row.txn_date && !row.date) row.txn_date = today();
        if (!row.status) row.status = 'active';
        rows.unshift(row);
        if (target === 'get-transactions') applyToSummary(row);
      }
      return ok({ id: row.id });
    }

    var delTarget = DELETES[op];
    if (delTarget) {
      var dr = list(delTarget);
      var id = arg && (arg.id != null ? arg.id : arg);
      for (var j = 0; j < dr.length; j++) {
        if (String(dr[j].id) === String(id)) { dr.splice(j, 1); break; }
      }
      return ok(true);
    }

    /* ── captured read ── */
    var hit = replay(op, arg);
    if (hit) return hit;

    /* ── anything else: succeed quietly so no screen dead-ends ──
       reads get an empty list, writes get a plausible ack. */
    if (/^(get|list|search|fetch)-/.test(op)) return ok([]);
    return ok({ id: ++seq, demo: true });
  }

  window.__DEMO_API = function (op, arg) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var out;
        try { out = route(op, arg); }
        catch (e) { out = { success: false, error: 'Demo error: ' + (e && e.message) }; }
        resolve(out);
      }, LAT);
    });
  };

  /* The demo is a shared sandbox — make that unmissable, and make sure nothing
     the visitor types is mistaken for their own books. */
  window.__MUNIMO_DEMO = true;
})();
