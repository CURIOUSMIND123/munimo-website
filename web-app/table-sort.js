'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  table-sort.js — universal click-to-sort for the ERP list tables.
//
//  Injected into every /app page (like erp-web.js). It makes the standard list
//  tables sortable by clicking a column header — numeric/currency/date aware,
//  toggling ascending/descending with an arrow indicator. It works on the rows
//  currently in the DOM, so it sorts whatever the screen has rendered without
//  needing to know anything about the screen's data model. Totals live in
//  <tfoot> (untouched); colspan/placeholder rows are left in place.
//
//  Opt-in scope: tables inside a `.tc` container (the shared list-table wrapper)
//  or any table with class `sortable`. Opt a header out with class `no-sort`.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  // Parse a cell into a comparable value. Currency/percent/qty → number;
  // dd/mm/yyyy or yyyy-mm-dd → timestamp; otherwise lower-cased text.
  function cellValue(td) {
    if (!td) return { s: '' };
    const raw = (td.getAttribute('data-sort') != null ? td.getAttribute('data-sort') : td.textContent || '').trim();
    if (raw === '' || raw === '—' || raw === '-') return { s: '', empty: true };
    // numeric (strip ₹, commas, %, spaces, leading +)
    const numStr = raw.replace(/[₹,%\s+]/g, '');
    if (numStr !== '' && /^-?\d*\.?\d+$/.test(numStr)) return { n: parseFloat(numStr) };
    // ISO date
    let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return { n: Date.UTC(+m[1], +m[2] - 1, +m[3]) };
    // dd/mm/yyyy or dd-mm-yyyy
    m = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
    if (m) return { n: Date.UTC(+m[3], +m[2] - 1, +m[1]) };
    return { s: raw.toLowerCase() };
  }

  function compare(a, b) {
    // Empty values always sink to the bottom regardless of direction.
    if (a.empty && b.empty) return 0;
    if (a.empty) return 1;
    if (b.empty) return -1;
    if ('n' in a && 'n' in b) return a.n - b.n;
    if ('n' in a) return -1;          // numbers before text
    if ('n' in b) return 1;
    return String(a.s).localeCompare(String(b.s));
  }

  function sortBy(table, idx, th) {
    const tbody = table.tBodies[0];
    if (!tbody) return;
    const all = Array.from(tbody.rows);
    // Only reorder genuine data rows: skip placeholder/total rows (a single
    // colspanned cell) and any row explicitly opted out.
    const sortable = all.filter(r => r.cells.length > idx && !r.hasAttribute('data-nosort') &&
      !(r.cells.length === 1 && r.cells[0].hasAttribute('colspan')));
    if (sortable.length < 2) return;
    const asc = th.getAttribute('data-dir') !== 'asc';

    // Clear indicators on sibling headers.
    Array.from(th.parentNode.cells).forEach(h => {
      if (h !== th) { h.removeAttribute('data-dir'); const a = h.querySelector('.sort-ar'); if (a) a.remove(); }
    });

    const decorated = sortable.map((row, i) => ({ row, i, v: cellValue(row.cells[idx]) }));
    decorated.sort((x, y) => { const c = compare(x.v, y.v); return (c !== 0 ? c : x.i - y.i) * (asc ? 1 : -1); });
    decorated.forEach(d => tbody.appendChild(d.row));

    th.setAttribute('data-dir', asc ? 'asc' : 'desc');
    let ar = th.querySelector('.sort-ar');
    if (!ar) { ar = document.createElement('span'); ar.className = 'sort-ar'; ar.style.marginLeft = '5px'; ar.style.opacity = '.7'; ar.style.fontSize = '10px'; th.appendChild(ar); }
    ar.textContent = asc ? '▲' : '▼';
  }

  function makeSortable(table) {
    if (table.__sortable) return;
    const thead = table.tHead;
    if (!thead || !thead.rows.length) return;
    const headerRow = thead.rows[thead.rows.length - 1];
    Array.from(headerRow.cells).forEach((th, idx) => {
      if (th.classList.contains('no-sort')) return;
      th.style.cursor = 'pointer';
      th.title = (th.title ? th.title + ' · ' : '') + 'Click to sort';
      th.addEventListener('click', () => sortBy(table, idx, th));
    });
    table.__sortable = true;
  }

  function initAll() {
    try {
      document.querySelectorAll('.tc table, table.sortable').forEach(makeSortable);
    } catch (_) { /* never let sorting break a screen */ }
  }

  window.makeSortable = makeSortable;
  // Run now, and again shortly after — list tables often exist in static markup
  // (their headers do), so attaching once is enough, but a second pass catches
  // any table injected during the screen's async boot.
  if (document.readyState !== 'loading') initAll(); else document.addEventListener('DOMContentLoaded', initAll);
  setTimeout(initAll, 800);
})();
