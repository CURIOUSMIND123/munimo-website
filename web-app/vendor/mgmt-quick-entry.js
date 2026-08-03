/**
 * mgmt-quick-entry.js
 * Self-contained widget — drop-in for any page.
 * Adds a floating 🔒 button. On click: verify PIN → show entry form → save.
 *
 * Each page can optionally set window._mgmtCtx = () => ({ party, amount, ref_no })
 * to pre-fill the form from the page's current transaction context.
 */
(function initMgmtWidget() {
  // ── build overlay HTML ────────────────────────────────────────────────────────
  const el = document.createElement('div');
  el.id = 'mgmtWidget';
  el.innerHTML = `
<style>
#mgmtWidget{font-family:'Segoe UI',system-ui,sans-serif;font-size:13px;}
#mgmtFab{position:fixed;bottom:24px;right:24px;z-index:8000;width:46px;height:46px;
  border-radius:50%;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;
  border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(109,40,217,0.5);transition:transform 0.15s;outline:none;}
#mgmtFab:hover{transform:scale(1.1);}
#mgmtFab title{display:none;}
.mgmt-ov{display:none;position:fixed;inset:0;z-index:8100;background:rgba(0,0,0,0.65);
  align-items:center;justify-content:center;}
.mgmt-ov.open{display:flex;}
.mgmt-box{background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:14px;
  width:440px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:0;}
.mgmt-hdr{display:flex;align-items:center;justify-content:space-between;
  padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.07);}
.mgmt-hdr-title{font-weight:700;font-size:14px;color:#f1f5f9;}
.mgmt-close{background:none;border:none;color:#94a3b8;cursor:pointer;font-size:18px;padding:2px;}
.mgmt-body{padding:20px;}
.mgmt-field{margin-bottom:14px;}
.mgmt-field label{display:block;font-size:11px;font-weight:600;color:#94a3b8;
  text-transform:uppercase;letter-spacing:0.4px;margin-bottom:5px;}
.mgmt-field input,.mgmt-field select,.mgmt-field textarea{
  width:100%;background:#243147;border:1px solid rgba(255,255,255,0.1);
  border-radius:8px;padding:8px 11px;color:#f1f5f9;font-size:13px;outline:none;
  font-family:inherit;transition:border-color 0.15s;}
.mgmt-field input:focus,.mgmt-field select:focus,.mgmt-field textarea:focus{
  border-color:#7c3aed;}
.mgmt-field textarea{height:60px;resize:vertical;}
.mgmt-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.mgmt-pin-row{display:flex;gap:10px;justify-content:center;margin:20px 0;}
.mgmt-pin-digit{width:50px;height:54px;background:#243147;border:2px solid rgba(255,255,255,0.1);
  border-radius:10px;text-align:center;font-size:22px;color:#f1f5f9;outline:none;font-family:inherit;}
.mgmt-pin-digit:focus{border-color:#7c3aed;}
.mgmt-footer{padding:14px 20px;border-top:1px solid rgba(255,255,255,0.07);
  display:flex;justify-content:flex-end;gap:10px;}
.mgmt-btn{padding:8px 18px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:none;}
.mgmt-btn-outline{background:transparent;border:1px solid rgba(255,255,255,0.15);color:#94a3b8;}
.mgmt-btn-outline:hover{border-color:#7c3aed;color:#a78bfa;}
.mgmt-btn-primary{background:#7c3aed;color:#fff;}
.mgmt-btn-primary:hover{background:#6d28d9;}
.mgmt-toggle-row{display:flex;align-items:center;justify-content:space-between;
  background:#243147;border-radius:8px;padding:10px 12px;}
.mgmt-toggle{position:relative;width:36px;height:20px;cursor:pointer;}
.mgmt-toggle input{opacity:0;width:0;height:0;}
.mgmt-slider{position:absolute;inset:0;background:#475569;border-radius:20px;transition:0.2s;}
.mgmt-toggle input:checked+.mgmt-slider{background:#7c3aed;}
.mgmt-slider::before{content:'';position:absolute;width:14px;height:14px;left:3px;bottom:3px;
  background:#fff;border-radius:50%;transition:0.2s;}
.mgmt-toggle input:checked+.mgmt-slider::before{transform:translateX(16px);}
.mgmt-info{font-size:11px;color:#64748b;margin-top:6px;line-height:1.5;}
.mgmt-badge-priv{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;
  font-weight:700;background:#4c1d95;color:#c4b5fd;}
.mgmt-badge-acc{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;
  font-weight:700;background:#14532d;color:#86efac;}
.mgmt-err{color:#f87171;font-size:12px;text-align:center;margin-top:8px;min-height:18px;}
</style>

<!-- FAB trigger -->
<button id="mgmtFab" onclick="mgmtOpen()" title="Add Private Entry (Management Register)">🔒</button>

<!-- PIN overlay -->
<div class="mgmt-ov" id="mgmtPinOv">
  <div class="mgmt-box" style="width:340px;">
    <div class="mgmt-hdr">
      <span class="mgmt-hdr-title">🔒 Private Entry — Enter PIN</span>
      <button class="mgmt-close" onclick="mgmtClose()">✕</button>
    </div>
    <div class="mgmt-body" style="text-align:center;">
      <div style="color:#94a3b8;font-size:12px;margin-bottom:4px;">Management Register is PIN-protected</div>
      <div class="mgmt-pin-row">
        <input class="mgmt-pin-digit" id="mgP1" type="password" maxlength="1" inputmode="numeric"
          oninput="mgmtPinNext(this,'mgP2')" onkeydown="mgmtPinKey(event,'','mgP1')">
        <input class="mgmt-pin-digit" id="mgP2" type="password" maxlength="1" inputmode="numeric"
          oninput="mgmtPinNext(this,'mgP3')" onkeydown="mgmtPinKey(event,'mgP1','mgP2')">
        <input class="mgmt-pin-digit" id="mgP3" type="password" maxlength="1" inputmode="numeric"
          oninput="mgmtPinNext(this,'mgP4')" onkeydown="mgmtPinKey(event,'mgP2','mgP3')">
        <input class="mgmt-pin-digit" id="mgP4" type="password" maxlength="1" inputmode="numeric"
          oninput="mgmtPinNext(this,null)" onkeydown="mgmtPinKey(event,'mgP3','mgP4')">
      </div>
      <div class="mgmt-err" id="mgPinErr"></div>
    </div>
    <div class="mgmt-footer">
      <button class="mgmt-btn mgmt-btn-outline" onclick="mgmtClose()">Cancel</button>
      <button class="mgmt-btn mgmt-btn-primary" onclick="mgmtVerifyPin()">Unlock →</button>
    </div>
  </div>
</div>

<!-- Entry form overlay -->
<div class="mgmt-ov" id="mgmtFormOv">
  <div class="mgmt-box">
    <div class="mgmt-hdr">
      <span class="mgmt-hdr-title">🔒 Add Private Entry</span>
      <button class="mgmt-close" onclick="mgmtClose()">✕</button>
    </div>
    <div class="mgmt-body">
      <div class="mgmt-row">
        <div class="mgmt-field">
          <label>Date *</label>
          <input type="date" id="mgDate">
        </div>
        <div class="mgmt-field">
          <label>Category</label>
          <select id="mgCat">
            <option value="procurement_commission">Procurement Commission</option>
            <option value="agent_fee">Agent / Middleman Fee</option>
            <option value="cash_purchase">Cash Purchase</option>
            <option value="advance_cash">Cash Advance</option>
            <option value="misc_expense">Misc Expense</option>
            <option value="misc_income">Misc Income</option>
          </select>
        </div>
      </div>
      <div class="mgmt-field">
        <label>Party Name *</label>
        <input type="text" id="mgParty" placeholder="Vendor / agent / party name">
      </div>
      <div class="mgmt-row">
        <div class="mgmt-field">
          <label>Amount Paid (₹) *</label>
          <input type="number" id="mgAmtPaid" placeholder="0" oninput="mgmtCalcComm()">
        </div>
        <div class="mgmt-field">
          <label>Amount Returned (₹)</label>
          <input type="number" id="mgAmtBack" placeholder="0" value="0" oninput="mgmtCalcComm()">
        </div>
      </div>
      <div class="mgmt-row">
        <div class="mgmt-field">
          <label>Net Commission / Cost (₹)</label>
          <input type="number" id="mgComm" placeholder="Auto-calculated" style="color:#a78bfa;font-weight:600;">
        </div>
        <div class="mgmt-field">
          <label>Commission %</label>
          <input type="number" id="mgCommPct" placeholder="Auto" step="0.01">
        </div>
      </div>
      <div class="mgmt-field">
        <label>Reference (Invoice No. / PO No. etc.)</label>
        <input type="text" id="mgRef" placeholder="Optional — link to a transaction">
      </div>
      <div class="mgmt-field">
        <label>Notes</label>
        <textarea id="mgNotes" placeholder="Any private notes about this transaction"></textarea>
      </div>
      <div class="mgmt-toggle-row">
        <div>
          <div style="font-size:13px;font-weight:600;color:#f1f5f9;">Include in Official Accounts</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">ON = commission shown in P&amp;L expenses + cashflow as cash outflow</div>
        </div>
        <label class="mgmt-toggle">
          <input type="checkbox" id="mgInclude" onchange="mgmtToggleBadge()">
          <span class="mgmt-slider"></span>
        </label>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <span id="mgBadge" class="mgmt-badge-priv">🔒 Off-Book (Private Only)</span>
      </div>
      <div class="mgmt-info">
        <b>Off-Book:</b> Entry visible only in this PIN-protected register. Official reports, GSTR, and CA exports will not see it.<br>
        <b>In Accounts:</b> Commission amount posts to P&amp;L as "Procurement Commission" and to cashflow as a cash outflow.
        No fake invoice or ITC is created — only the commission cost is recorded officially.
      </div>
    </div>
    <div class="mgmt-footer">
      <button class="mgmt-btn mgmt-btn-outline" onclick="mgmtClose()">Cancel</button>
      <button class="mgmt-btn mgmt-btn-primary" onclick="mgmtSaveEntry()">💾 Save Entry</button>
    </div>
  </div>
</div>`;
  document.body.appendChild(el);

  // ── state ─────────────────────────────────────────────────────────────────────
  let _mgmtPin = '';

  // ── helpers ───────────────────────────────────────────────────────────────────
  window.mgmtOpen = function () {
    ['mgP1','mgP2','mgP3','mgP4'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('mgPinErr').textContent = '';
    document.getElementById('mgmtPinOv').classList.add('open');
    setTimeout(() => document.getElementById('mgP1').focus(), 80);
  };

  window.mgmtClose = function () {
    document.getElementById('mgmtPinOv').classList.remove('open');
    document.getElementById('mgmtFormOv').classList.remove('open');
    _mgmtPin = '';
  };

  window.mgmtPinNext = function (el, nextId) {
    if (el.value && nextId) document.getElementById(nextId).focus();
    else if (el.value && !nextId) mgmtVerifyPin();
  };

  window.mgmtPinKey = function (e, prevId, curId) {
    if (e.key === 'Backspace' && !document.getElementById(curId).value && prevId) {
      document.getElementById(prevId).focus();
      e.preventDefault();
    }
    if (e.key === 'Enter') mgmtVerifyPin();
  };

  window.mgmtVerifyPin = async function () {
    const pin = ['mgP1','mgP2','mgP3','mgP4'].map(id => document.getElementById(id).value).join('');
    try {
      const res = await window.erp.verifyManagementPin(pin);
      if (!res || !res.success || !res.data || res.data.valid !== true) {
        document.getElementById('mgPinErr').textContent = '✗ Incorrect PIN';
        ['mgP1','mgP2','mgP3','mgP4'].forEach(id => document.getElementById(id).value = '');
        document.getElementById('mgP1').focus();
        return;
      }
      _mgmtPin = pin;
      document.getElementById('mgmtPinOv').classList.remove('open');
      mgmtOpenForm();
    } catch (e) {
      document.getElementById('mgPinErr').textContent = 'Error: ' + e.message;
    }
  };

  function mgmtOpenForm () {
    // Pre-fill from page context if provided
    const ctx = typeof window._mgmtCtx === 'function' ? window._mgmtCtx() : {};
    document.getElementById('mgDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('mgParty').value = ctx.party || '';
    document.getElementById('mgAmtPaid').value = ctx.amount || '';
    document.getElementById('mgAmtBack').value = '0';
    document.getElementById('mgComm').value = ctx.amount || '';
    document.getElementById('mgCommPct').value = '';
    document.getElementById('mgRef').value = ctx.ref_no || '';
    document.getElementById('mgNotes').value = '';
    document.getElementById('mgInclude').checked = false;
    document.getElementById('mgBadge').className = 'mgmt-badge-priv';
    document.getElementById('mgBadge').textContent = '🔒 Off-Book (Private Only)';
    mgmtCalcComm();
    document.getElementById('mgmtFormOv').classList.add('open');
    setTimeout(() => document.getElementById('mgParty').focus(), 80);
  }

  window.mgmtCalcComm = function () {
    const paid = parseFloat(document.getElementById('mgAmtPaid').value) || 0;
    const back = parseFloat(document.getElementById('mgAmtBack').value) || 0;
    const comm = paid - back;
    document.getElementById('mgComm').value = comm > 0 ? comm.toFixed(2) : '';
    document.getElementById('mgCommPct').value = paid > 0 ? ((comm / paid) * 100).toFixed(1) : '';
  };

  window.mgmtToggleBadge = function () {
    const on = document.getElementById('mgInclude').checked;
    const badge = document.getElementById('mgBadge');
    badge.className = on ? 'mgmt-badge-acc' : 'mgmt-badge-priv';
    badge.textContent = on ? '✅ In Accounts (P&L + Cashflow)' : '🔒 Off-Book (Private Only)';
  };

  window.mgmtSaveEntry = async function () {
    const party = document.getElementById('mgParty').value.trim();
    const paid  = parseFloat(document.getElementById('mgAmtPaid').value) || 0;
    if (!party || !paid) { alert('Party name and amount paid are required.'); return; }
    const back = parseFloat(document.getElementById('mgAmtBack').value) || 0;
    const comm = parseFloat(document.getElementById('mgComm').value) || paid - back;
    const pct  = parseFloat(document.getElementById('mgCommPct').value) || 0;
    const include = document.getElementById('mgInclude').checked ? 1 : 0;
    const data = {
      entry_date: document.getElementById('mgDate').value,
      vendor_name: party,
      party,
      invoice_no: document.getElementById('mgRef').value.trim() || null,
      invoice_amount: paid,
      commission_amount: comm,
      commission_pct: pct,
      net_cash_outflow: comm,
      amount: paid,
      payment_mode: 'cash',
      category: document.getElementById('mgCat').value,
      description: `Commission paid to ${party}`,
      notes: document.getElementById('mgNotes').value.trim() || null,
      include_in_accounts: include,
    };
    try {
      const res = await window.erp.saveManagementEntry(data, _mgmtPin);
      if (!res || !res.success) { alert('Error saving entry: ' + (res && res.error || '')); return; }
      mgmtClose();
      // Notify page of new entry (in case it wants to refresh)
      if (typeof window._mgmtSaved === 'function') window._mgmtSaved();
      // Brief confirmation
      const t = document.createElement('div');
      t.style.cssText = 'position:fixed;bottom:80px;right:24px;z-index:9000;background:#14532d;color:#86efac;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;';
      t.textContent = '🔒 Private entry saved';
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2500);
    } catch (e) { alert('Error: ' + e.message); }
  };
})();
