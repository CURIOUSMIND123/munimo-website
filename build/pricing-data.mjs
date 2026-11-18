/* ──────────────────────────────────────────────────────────────────────────
   PRICING — transcribed from the Awdhex Technologies Standard Commercial
   Rate Card, 2026–27 Enterprise schedule. This file is the single source of
   truth for every figure on the site: the slab cards, the calculator, the
   ConstructPro and combo tables, and the schema.org Offers all read it.
   Change a number here, run `node build/build.mjs`, commit.

   All rates EXCLUDE 18% GST (SAC 998314).
   ────────────────────────────────────────────────────────────────────────── */

export const CARD = {
  schedule: '2026–27 Enterprise Rate Card',
  sac: '998314',
  gst: 18,
  validityDays: 30,
  udyam: 'UDYAM-BR-06-0068598',
  sectors: 'Indian Railways contractors (OBHS, bedroll, track), civil EPC, infrastructure and facility management',
};

export const CUR = { code: 'INR', sym: '₹' };
export const money = (n) => CUR.sym + Math.round(n).toLocaleString('en-IN');

/* Shorthand for large figures, the way the rate card writes them. */
export const lakh = (n) => (n >= 100000
  ? CUR.sym + (n / 100000).toFixed(n % 100000 === 0 ? 0 : 2).replace(/\.?0+$/, '') + 'L'
  : money(n));

/* ── 1. Munimo Workforce — app + admin dashboard ─────────────────────────── */

export const WF_WHAT = {
  app: ['One-phone crew Face-ID scan', 'Liveness anti-spoofing', '100% offline sync',
    'GPS geofencing', 'Train OBHS and bedroll mid-route check-ins', 'P-Way keyman patrol logs'],
  dash: ['Real-time site headcount', 'Automated statutory muster rolls', 'Overtime and advances',
    'EPF and ESIC registers', 'Bank payout sheets'],
};

/** Four headcount slabs. monthRate / yearRate are per worker per month;
    the floor is the minimum commitment that covers `incl` workers. */
export const SLABS = [
  {
    id: 'starter', name: 'Starter', band: 'Up to 100 workers', max: 100,
    setup: 15000, setupDedicated: 27000,
    monthFloor: 6500, monthRate: 85, monthIncl: 76,
    yearFloor: 65000, yearRate: 70, yearIncl: 100, yearAt: 84000,
    licence: 135000, amc: 25000,
  },
  {
    id: 'growth', name: 'Growth', band: '101 – 250 workers', max: 250, popular: true,
    setup: 25000, setupDedicated: 37000,
    monthFloor: 15000, monthRate: 75, monthIncl: 200,
    yearFloor: 150000, yearRate: 62.5, yearIncl: 250, yearAt: 187500,
    licence: 220000, amc: 40000,
  },
  {
    id: 'scale', name: 'Scale', band: '251 – 500 workers', max: 500,
    setup: 35000, setupDedicated: 47000,
    monthFloor: 22000, monthRate: 65, monthIncl: 338,
    yearFloor: 220000, yearRate: 54, yearIncl: 500, yearAt: 324000,
    licence: 380000, amc: 68000,
  },
  {
    id: 'ent', name: 'Enterprise', band: '501 – 1,000+ workers', max: Infinity,
    setup: 50000, setupDedicated: 62000,
    monthFloor: 35000, monthRate: 55, monthIncl: 636,
    yearFloor: 350000, yearRate: 46, yearIncl: 1000, yearAt: 552000,
    licence: 650000, amc: 115000,
  },
];

export const SLAB_POLICY =
  'Each slab carries a fixed minimum monthly or yearly commitment covering the included headcount. ' +
  'Additional workers within the slab are billed at that slab’s per-worker rate.';

/** Which slab a headcount falls into. */
export const slabFor = (workers) => SLABS.find((s) => workers <= s.max) || SLABS[SLABS.length - 1];

/** What a headcount actually costs, on each of the three options. */
export function quote(workers) {
  const s = slabFor(workers);
  const monthly = Math.max(s.monthFloor, workers * s.monthRate);
  const yearly = Math.max(s.yearFloor, workers * s.yearRate * 12);
  return {
    slab: s,
    setup: s.setup,
    setupDedicated: s.setupDedicated,
    monthly,
    monthlyPerWorker: monthly / workers,
    yearly,
    yearlyPerMonth: yearly / 12,
    yearlyPerWorker: yearly / 12 / workers,
    licence: s.licence,
    amc: s.amc,
    saveYearly: monthly * 12 - yearly,
  };
}

/* ── 2. Munimo ConstructPro Khata & Site ERP ─────────────────────────────── */

export const CP_WHAT = [
  'Project-wise cash flow and site P&L, tracked independently',
  'Running Account (RA) bills and retention money holdbacks',
  'Petty contractor and supplier advances',
  'TDS Section 194C automation',
  'One-click GSTN JSON and Excel exports (GSTR-1 and GSTR-3B)',
];

export const CONSTRUCTPRO = [
  { id: 'cp1', name: 'Single-Site Contractor', band: 'Up to 2 sites / 5 admin users',
    setup: 20000, monthly: 10000, yearly: 100000, licence: 200000, amc: 35000 },
  { id: 'cp2', name: 'Multi-Site Infra / Builder', band: 'Up to 5 sites / 15 admin users',
    setup: 35000, monthly: 18000, yearly: 180000, licence: 350000, amc: 60000 },
  { id: 'cp3', name: 'Enterprise Unlimited', band: 'Unlimited sites + dedicated VPS',
    setup: 50000, monthly: 30000, yearly: 300000, licence: 550000, amc: 95000 },
];

/* ── 3. Combo: Workforce + ConstructPro, 25% off ConstructPro ────────────── */

export const COMBO_RULE =
  'Take Munimo Workforce and ConstructPro Khata ERP together and field payroll syncs straight into ' +
  'site P&L and RA billing — with a flat 25% off ConstructPro on setup, subscription, licence and ' +
  'Year 2+ AMC. Workforce stays at standard slab pricing.';

export const COMBOS = [
  { id: 'c1', name: 'Starter Combo', band: 'Up to 100 workers + Single-Site ERP',
    setup: [35000, 30000], monthly: [16500, 14000], yearly: [165000, 140000],
    licence: [335000, 285000], amc: [60000, 51250],
    split: { m: '₹6.5k Workforce + ₹7.5k ERP', y: '₹65k Workforce + ₹75k ERP' } },
  { id: 'c2', name: 'Growth Combo', band: '101–250 workers + Single-Site ERP', best: true,
    setup: [45000, 40000], monthly: [25000, 22500], yearly: [250000, 225000],
    licence: [420000, 370000], amc: [75000, 66250],
    split: { m: '₹15k Workforce + ₹7.5k ERP', y: '₹1.5L Workforce + ₹75k ERP' } },
  { id: 'c3', name: 'Scale Combo', band: '251–500 workers + Multi-Site ERP',
    setup: [70000, 61250], monthly: [40000, 35500], yearly: [400000, 355000],
    licence: [730000, 642500], amc: [128000, 113000],
    split: { m: '₹22k Workforce + ₹13.5k ERP', y: '₹2.2L Workforce + ₹1.35L ERP' } },
  { id: 'c4', name: 'Enterprise Combo', band: '501–1,000+ workers + Enterprise ERP',
    setup: [100000, 87500], monthly: [65000, 57500], yearly: [650000, 575000],
    licence: [1200000, 1062500], amc: [210000, 186250],
    split: { m: '₹35k Workforce + ₹22.5k ERP', y: '₹3.5L Workforce + ₹2.25L ERP' } },
];

/* ── Add-ons, excluding GST ──────────────────────────────────────────────── */
export const ADDONS = [
  ['Dedicated private VPS server', '₹12,000 a year', '₹1,000 a month'],
  ['Custom railway division or PSU muster-roll template', '₹5,000 – ₹10,000', 'one-time'],
  ['WhatsApp and SMS shift alert pack', '₹2,500', 'per 10,000 alerts'],
  ['Workers above the included base', 'Slab per-worker rate', 'billed at the active slab'],
];

/* ── Standard commercial terms, as written on the rate card ──────────────── */
export const TERMS = [
  ['GST and payment', 'All rates exclude 18% GST (SAC 998314), which is fully input-tax-credit eligible for GST-registered contractors. Payment is 100% in advance against a formal GST tax invoice, before the tenant is activated.'],
  ['Annual maintenance', 'On a one-time perpetual licence, Year 1 AMC is free. From Year 2 the separate annual AMC shown against each plan is required, to keep cloud servers, Android compatibility, backups and support running.'],
  ['Data ownership', 'Every worker biometric template, GPS log, muster roll and financial ledger stays the sole property of the client, with instant Excel and CSV export at any time.'],
  ['Quote validity', 'Thirty days from issue. Rates are the 2026–27 enterprise schedule.'],
];

/* ── What the market charges, for an honest comparison ────────────────────
   Published vendor list prices, October 2026. Quotes may differ. Used by the
   calculator to show what the same job costs bought as separate tools. */
export const MARKET = {
  asof: 'October 2026',
  stack: [
    { name: 'Face-attendance product', eg: 'e.g. Truein', perWorkerYear: 390, platformYear: 69000 },
    { name: 'Field-staff GPS app', eg: 'e.g. Unolo, TrackoField', perWorkerMonth: 275 },
  ],
  missing: 'And statutory muster rolls, EPF and ESIC registers and bank payout sheets are still a third system, or a person with a spreadsheet.',
};

export function marketMonthly(workers) {
  let t = 0;
  for (const s of MARKET.stack) {
    if (s.perWorkerYear) t += (s.perWorkerYear * workers) / 12;
    if (s.platformYear) t += s.platformYear / 12;
    if (s.perWorkerMonth) t += s.perWorkerMonth * workers;
  }
  return Math.round(t);
}

/* Entry points quoted in copy, so headlines never drift from the card. */
export const ENTRY = {
  monthFloor: SLABS[0].monthFloor,          // 6,500 a month
  monthIncl: SLABS[0].monthIncl,            // covering 76 workers
  bestPerWorker: SLABS[3].yearRate,         // 46 per worker per month at 1,000
  setupFrom: SLABS[0].setup,                // 15,000 cloud
  licenceFrom: SLABS[0].licence,            // 1,35,000
};
