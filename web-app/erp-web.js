'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  erp-web.js — Web bridge for the ConstructPro Cloud Edition.
//
//  The desktop screens talk to the backend through `window.erp.*`, which in the
//  Electron build is wired to IPC (see src/main/preload.js). In the browser
//  there is no IPC — so this file recreates the EXACT same `window.erp` surface
//  backed by `fetch('/api/<op>')`. Because the cloud API returns the same
//  `{success, data}` shape the IPC handlers do, every screen runs unchanged.
//
//  Loaded first on every /app/* page (injected by the server), so window.erp
//  exists before any screen script runs.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  const SS = window.sessionStorage;

  // CSRF double-submit token. Captured at login, persisted for the tab so it
  // survives navigation between screens, refreshed from get-session on boot.
  let CSRF = (() => { try { return SS.getItem('erp_csrf') || ''; } catch (_) { return ''; } })();
  function setCsrf(v) { CSRF = v || ''; try { v ? SS.setItem('erp_csrf', v) : SS.removeItem('erp_csrf'); } catch (_) {} }

  const onLoginPage = () => !!document.getElementById('loginBtn');
  const toLogin = () => { if (!onLoginPage()) window.location.href = 'login.html'; };

  // Core request. Returns the parsed {success,data}|{success,error} body, or a
  // soft failure object on network/parse errors — never throws, so screens that
  // do `const r = await erp.x(); if (r.success)…` keep working offline.
  async function call(op, arg) {
    // DEMO BUILD: the offline demo backend answers every call from a snapshot of
    // real API responses, so the app runs with no server. (See demo-backend.js.)
    if (window.__DEMO_API) return await window.__DEMO_API(op, arg == null ? {} : arg);
    let r;
    try {
      r = await fetch('/api/' + op, {
        method: 'POST',
        headers: Object.assign(
          { 'Content-Type': 'application/json' },
          CSRF ? { 'X-CSRF-Token': CSRF } : {}
        ),
        body: JSON.stringify(arg == null ? {} : arg),
        credentials: 'same-origin',
      });
    } catch (e) {
      return { success: false, error: 'No connection to server.' };
    }
    if (r.status === 401) { setCsrf(''); try { SS.removeItem('erp_user'); } catch (_) {} toLogin(); return { success: false, error: 'Session expired' }; }
    let data;
    try { data = await r.json(); } catch (_) { data = { success: false, error: 'Unexpected server response.' }; }
    return data;
  }

  // ── auth helpers (these three are special — they manage the tab session) ──
  async function login(creds) {
    const r = await call('login', creds);
    if (r && r.success && r.data) {
      setCsrf(r.data.csrf);
      try { SS.setItem('erp_user', JSON.stringify(r.data)); } catch (_) {}
    }
    return r;
  }
  async function logout() {
    const r = await call('logout');
    setCsrf('');
    try { SS.removeItem('erp_user'); SS.removeItem('erp_csrf'); } catch (_) {}
    window.location.href = 'login.html';
    return r;
  }
  async function getSession() {
    const r = await call('get-session');
    if (r && r.success && r.data && r.data.csrf) {
      setCsrf(r.data.csrf);
      try { SS.setItem('erp_user', JSON.stringify(r.data)); } catch (_) {}
    }
    return r;
  }

  // ── method → API-op map (mirrors src/main/preload.js exactly) ─────────────
  // Each entry is [opName] or [opName, argShaper]. The argShaper rebuilds the
  // single API argument from the method's positional args where they differ.
  const M = {
    // License & Auth (license is a no-op in the cloud — the tenant subscription
    // *is* the licence; these keep screens that probe them happy)
    activateLicense: ['__noop_license_ok'],
    getMachineId:    ['__machine_id'],
    getLicenseInfo:  ['__license_info'],
    gotoDashboard:   ['__goto_dashboard'],

    // Company
    getCompany:  ['get-company'],
    saveCompany: ['save-company'],

    // Users
    getUsers:       ['get-users'],
    saveUser:       ['save-user'],
    deleteUser:     ['delete-user'],
    changePassword: ['change-password'],

    // Employees
    getEmployees:   ['get-employees'],
    getNextEmpCode: ['get-next-emp-code'],
    saveEmployee:   ['save-employee'],
    deleteEmployee: ['delete-employee'],

    // Payroll
    getPayroll:    ['get-payroll'],
    savePayroll:   ['save-payroll'],
    deletePayroll: ['delete-payroll'],

    // Clients
    getClients:   ['get-clients'],
    saveClient:   ['save-client'],
    deleteClient: ['delete-client'],

    // Vendors
    getVendors:   ['get-vendors'],
    saveVendor:   ['save-vendor'],
    deleteVendor: ['delete-vendor'],

    // Sites
    getSites:   ['get-sites'],
    saveSite:   ['save-site'],
    deleteSite: ['delete-site'],

    // Banks
    getBanks:   ['get-banks'],
    saveBank:   ['save-bank'],
    deleteBank: ['delete-bank'],

    // Invoices
    getInvoices:      ['get-invoices'],
    getInvoice:       ['get-invoice'],
    getNextInvoiceNo: ['get-next-invoice-no'],
    saveInvoice:      ['save-invoice'],
    deleteInvoice:    ['delete-invoice'],
    payInvoice:       ['pay-invoice', (invoiceId, payment) => ({ invoiceId, payment })],
    voidInvoicePayment: ['void-invoice-payment', (paymentId) => ({ paymentId })],
    generateIrn:        ['generate-irn'],
    cancelIrn:          ['cancel-irn', (invoiceId, reason, remarks) => ({ invoiceId, reason, remarks })],

    // Expenses
    getExpenses:        ['get-expenses'],
    getExpense:         ['get-expense'],
    saveExpense:        ['save-expense'],
    deleteExpense:      ['delete-expense'],
    payExpense:         ['pay-expense', (expenseId, payment) => ({ expenseId, payment })],
    voidExpensePayment: ['void-expense-payment', (paymentId) => ({ paymentId })],
    getVendorTdsStatus: ['get-vendor-tds-status'],

    // Purchase Orders
    getPurchaseOrders:   ['get-purchase-orders'],
    savePurchaseOrder:   ['save-purchase-order'],
    approvePO:           ['approve-po'],
    deletePurchaseOrder: ['delete-purchase-order'],
    getPOItems:          ['get-po-items'],

    // GRN
    getGRN:  ['get-grn'],
    saveGRN: ['save-grn'],

    // Inventory / Stock register
    getInventoryItems:   ['get-inventory-items'],
    getInventorySummary: ['get-inventory-summary'],
    saveInventoryItem:   ['save-inventory-item'],
    deleteInventoryItem: ['delete-inventory-item'],
    getStockLedger:      ['get-stock-ledger'],
    saveStockMovement:   ['save-stock-movement'],

    // Transactions
    getTransactions:   ['get-transactions'],
    saveTransaction:   ['save-transaction'],
    deleteTransaction: ['delete-transaction'],

    // Simple (Lite) Cashbook
    getBudgetHeads:    ['get-budget-heads'],
    saveBudgetHead:    ['save-budget-head'],
    deleteBudgetHead:  ['delete-budget-head'],
    getLiteSummary:    ['get-lite-summary'],

    // Cash heads + money-in/out analysis
    getCashHeads:      ['get-cash-heads'],
    saveCashHead:      ['save-cash-head'],
    deleteCashHead:    ['delete-cash-head'],
    getCashAnalysis:   ['get-cash-analysis'],
    getLoans:          ['get-loans'],

    // Commission register
    getCommissionEntries: ['get-commission-entries'],
    saveCommissionEntry:  ['save-commission-entry'],
    deleteCommissionEntry:['delete-commission-entry'],
    getCommissionSummary: ['get-commission-summary'],

    // Labour
    getLabourWorkers:        ['get-labour-workers'],
    saveLabourWorker:        ['save-labour-worker'],
    deleteLabourWorker:      ['delete-labour-worker'],
    getAttendance:           ['get-attendance'],
    saveAttendance:          ['save-attendance'],
    bulkSaveAttendance:      ['bulk-save-attendance'],
    deleteAttendanceRecords: ['delete-attendance-records'],
    getLabourPayments:       ['get-labour-payments'],
    saveLabourPayment:       ['save-labour-payment'],
    getLabourAdvances:       ['get-labour-advances'],
    saveLabourAdvance:       ['save-labour-advance'],
    deleteLabourAdvance:     ['delete-labour-advance'],

    // Permanent-staff attendance (separate table from the labour muster above)
    getEmployeeAttendance:      ['get-employee-attendance'],
    saveEmployeeAttendance:     ['save-employee-attendance'],
    bulkSaveEmployeeAttendance: ['bulk-save-employee-attendance'],

    // Subcontractors
    getSubcontractors:   ['get-subcontractors'],
    saveSubcontractor:   ['save-subcontractor'],
    deleteSubcontractor: ['delete-subcontractor'],
    getWorkOrders:       ['get-work-orders'],
    saveWorkOrder:       ['save-work-order'],
    getRaBills:          ['get-ra-bills'],
    saveRaBill:          ['save-ra-bill'],
    getRaBillPayments:   ['get-ra-bill-payments'],
    payRaBill:           ['pay-ra-bill', (raBillId, payment) => ({ raBillId, payment })],
    voidRaBillPayment:   ['void-ra-bill-payment', (paymentId) => ({ paymentId })],
    releaseRaRetention:  ['release-ra-retention'],
    getBoqItems:         ['get-boq-items'],
    getBoqVariance:      ['get-boq-variance'],
    saveBoqItem:         ['save-boq-item'],
    deleteBoqItem:       ['delete-boq-item'],
    getMeasurements:     ['get-measurements'],
    saveMeasurement:     ['save-measurement'],
    deleteMeasurement:   ['delete-measurement'],
    importGstr2b:           ['import-gstr2b'],
    getGstr2bPeriods:       ['get-gstr2b-periods'],
    getGstr2bReconciliation:['get-gstr2b-reconciliation'],

    // Advance Ledger
    getAdvances:    ['get-advances'],
    saveAdvance:    ['save-advance'],
    recoverAdvance: ['recover-advance'],
    getCustomerAdvances:    ['get-customer-advances'],
    saveCustomerAdvance:    ['save-customer-advance'],
    recoverCustomerAdvance: ['recover-customer-advance'],
    deleteCustomerAdvance:  ['delete-customer-advance'],

    // Services Master
    getServices:   ['get-services'],
    saveService:   ['save-service'],
    deleteService: ['delete-service'],

    // Equipment
    getEquipment:    ['get-equipment'],
    saveEquipment:   ['save-equipment'],
    deleteEquipment: ['delete-equipment'],

    // Debit/Credit Notes
    getDebitNotes:    ['get-debit-notes'],
    saveDebitNote:    ['save-debit-note'],
    deleteDebitNote:  ['delete-debit-note'],
    getCreditNotes:   ['get-credit-notes'],
    saveCreditNote:   ['save-credit-note'],
    deleteCreditNote: ['delete-credit-note'],

    // Journal Vouchers
    getPeriodLock:      ['get-period-lock'],
    setPeriodLock:      ['set-period-lock'],
    getPfEcr:           ['get-pf-ecr'],
    getEsicReturn:      ['get-esic-return'],
    getForm24Q:         ['get-form-24q'],
    getForm26Q:         ['get-form-26q'],
    getForm16:          ['get-form-16'],
    getGstr9:           ['get-gstr9'],
    getBocwCess:        ['get-bocw-cess'],
    rejectPO:           ['reject-po'],
    submitFieldEntry:   ['submit-field-entry'],
    getFieldSubmissions:['get-field-submissions'],
    approveFieldSubmission: ['approve-field-submission'],
    rejectFieldSubmission:  ['reject-field-submission'],
    generateEwayBill:   ['generate-eway-bill'],
    cancelEwayBill:     ['cancel-eway-bill'],
    getInstruments:     ['get-instruments'],
    saveInstrument:     ['save-instrument'],
    deleteInstrument:   ['delete-instrument'],
    getInstrumentsSummary: ['get-instruments-summary'],
    getChartOfAccounts: ['get-chart-of-accounts'],
    saveLedgerAccount:  ['save-ledger-account'],
    deleteLedgerAccount:['delete-ledger-account'],
    getJournalVouchers: ['get-journal-vouchers'],
    saveJournalVoucher: ['save-journal-voucher'],
    getJournalEntries:  ['get-journal-entries'],
    deleteJournalVoucher: ['delete-journal-voucher'],

    // Management Entries (PIN protected)
    verifyManagementPin:  ['verify-management-pin'],
    setManagementPin:     ['set-management-pin'],
    getManagementEntries: ['get-management-entries'],
    saveManagementEntry:  ['save-management-entry', (data, pin) => ({ data, pin })],
    deleteManagementEntry:['delete-management-entry', (id, pin) => ({ id, pin })],

    // Reports
    getDashboardKPIs:      ['get-dashboard-kpis'],
    getActionCenter:       ['get-action-center'],
    globalSearch:          ['global-search'],
    getGSTR1:              ['get-gstr1'],
    getGSTR3B:             ['get-gstr3b'],
    exportTally:           ['export-tally'],
    getPnLReport:          ['get-pnl-report'],
    getReceivablesAging:   ['get-receivables-aging'],
    getPayablesAging:      ['get-payables-aging'],
    getSitePnL:            ['get-site-pnl'],
    getAllSitesPnL:        ['get-all-sites-pnl'],
    getWipReport:          ['get-wip-report'],
    getClientPnL:          ['get-client-pnl'],
    getRetentionRegister:  ['get-retention-register'],
    getTDSReport:          ['get-tds-report'],
    getTdsReceivable26AS:  ['get-tds-receivable-26as'],
    getOutstandingStatement:['get-outstanding-statement'],
    getAuditLog:           ['get-audit-log'],
    askAssistant:          ['ask-assistant', (question) => ({ question })],
    getBookkeepingAgenda:  ['get-bookkeeping-agenda', (opts) => opts || {}],
    applyBookkeepingAction:['apply-bookkeeping-action', (data) => data || {}],
    parseQuickEntry:       ['parse-quick-entry', (data) => data || {}],
    getEntryDefaults:      ['get-entry-defaults', (opts) => opts || {}],

    // CA Pack
    getTrialBalance: ['get-trial-balance'],
    getBalanceSheet: ['get-balance-sheet'],
    getGeneralLedger: ['get-general-ledger'],

    // TDS Challans
    getTdsChallans:   ['get-tds-challans'],
    saveTdsChallan:   ['save-tds-challan'],
    deleteTdsChallan: ['delete-tds-challan'],

    // Bank Reconciliation
    importBankStatement:  ['import-bank-statement'],
    getStatementLines:    ['get-statement-lines'],
    matchStatementLine:   ['match-statement-line'],
    unmatchStatementLine: ['unmatch-statement-line'],
    deleteStatementBatch: ['delete-statement-batch'],

    // Legacy Data Import
    bulkImport: ['bulk-import'],

    // System (cloud-specific stubs / server-backed)
    getAppVersion: ['__app_version'],
    getDbPath:     ['__db_path'],
    exportBackup:  ['__export_backup'],
    importBackup:  ['__import_backup'],
    quitApp:       ['__quit'],
    showSaveDialog:['__nodialog'],
    showOpenDialog:['__nodialog'],
  };

  // Local handlers for the cloud-only pseudo-ops above.
  const LOCAL = {
    __noop_license_ok: async () => ({ success: true, data: { valid: true, type: 'cloud' } }),
    __machine_id:      async () => ({ success: true, data: 'CLOUD' }),
    __license_info:    async () => ({ success: true, data: { valid: true, type: 'cloud', note: 'Cloud subscription' } }),
    __goto_dashboard:  async () => { window.location.href = 'app.html'; return { success: true }; },
    __app_version:     async () => '1.0.0',
    __db_path:         async () => '(cloud)',
    __export_backup:   async () => ({ success: false, error: 'Your data is backed up automatically on the server every night — no manual export needed.' }),
    __import_backup:   async () => ({ success: false, error: 'Restore from backup is handled by your administrator on the server.' }),
    __quit:            async () => { return logout(); },
    __nodialog:        async () => ({ success: false, error: 'Not available in the browser.' }),
  };

  // Build window.erp from the map.
  const erp = { login, logout, getSession };
  for (const method in M) {
    const [op, shaper] = M[method];
    if (LOCAL[op]) { erp[method] = LOCAL[op]; continue; }
    erp[method] = (...args) => call(op, shaper ? shaper(...args) : args[0]);
  }
  window.erp = erp;

  // Browser-native replacements for the desktop's nativeDialog (which exists to
  // work around an Electron-on-Windows focus bug — irrelevant in a browser).
  window.nativeDialog = {
    alert:   (msg) => { window.alert(msg == null ? '' : String(msg)); return true; },
    confirm: (msg) => window.confirm(msg == null ? '' : String(msg)),
  };

  // Session guard: on an app screen with no token, confirm we're still signed
  // in; bounce to login if not. (Top-level pages only — iframed screens inherit
  // the parent's cookie and CSRF via sessionStorage, so they skip this.)
  const isTopLevel = (window.top === window.self);
  if (!onLoginPage() && isTopLevel) {
    getSession().then((r) => { if (!r || !r.success || !r.data) toLogin(); });
  }
})();
