/* ──────────────────────────────────────────────────────────────────────────
   PRICING — single source of truth for every price shown on the site.
   Change a number here, run `node build/build.mjs`, commit. Nothing else
   to touch: the cards, the calculator and the schema.org Offers all read
   from this file.
   ────────────────────────────────────────────────────────────────────────── */

export const CUR = { code: 'INR', sym: '₹' };

/* Annual billing: you pay for this many months out of twelve. */
export const ANNUAL_MONTHS = 10;

/* Workforce is priced per worker, per month. */
export const MIN_WORKERS = 25;

export const WORKFORCE = [
  {
    id: 'attend',
    name: 'Attendance',
    price: 39,
    unit: 'per worker / month',
    line: 'Proof that he was there.',
    for: 'One fixed site or building. Housekeeping, security, facilities, plantations.',
    feat: [
      ['Face check in and out, with a blink test', 1],
      ['GPS fence around the site', 1],
      ['Works with no signal, syncs later', 1],
      ['The supervisor’s phone is the kiosk', 1],
      ['Hindi, Bengali, Assamese and English', 1],
      ['Live board of who is on duty now', 1],
      ['Monthly muster, exportable', 1],
      ['Payroll from proven duty', 0],
      ['Train and track duties', 0],
    ],
  },
  {
    id: 'work',
    name: 'Workforce',
    price: 69,
    unit: 'per worker / month',
    line: 'Proof, and pay that follows it.',
    for: 'Contractors running men across many sites. The one most companies take.',
    popular: true,
    feat: [
      ['Everything in Attendance', 1],
      ['Payroll from proven duty only', 1],
      ['Slips, bank file, EPF and ESI', 1],
      ['Many sites, transfers between them', 1],
      ['Random face checks inside a shift', 1],
      ['The trail he actually walked, on a map', 1],
      ['Overtime, short days, your own rules', 1],
      ['Approvals before anything is paid', 1],
      ['Train and track duties', 0],
    ],
  },
  {
    id: 'rail',
    name: 'Rail & Enterprise',
    price: 99,
    unit: 'per worker / month',
    line: 'Duty proven to the destination.',
    for: 'Railway contracts, keyman patrols, and workforces that need their own rules.',
    feat: [
      ['Everything in Workforce', 1],
      ['Train duty: start station, en route, destination', 1],
      ['Timetable and train-number checks', 1],
      ['Keyman and patrol beats, missed checkpoints', 1],
      ['Rules set per contract, not per company', 1],
      ['Exports shaped for railway portals', 1],
      ['API into your own systems', 1],
      ['Named engineer on WhatsApp', 1],
      ['Runs on your server if you want', 1],
    ],
  },
];

/* The two other products. */
export const OTHER = [
  {
    id: 'cashbook',
    name: 'Lite Cashbook',
    tag: 'Money in, money out',
    href: '/cash-book.html',
    demo: '/web-app/lite.html',
    line: 'The cash book your accountant stops arguing with.',
    body: 'Cash and bank entries, parties, due lists, GST-ready exports. Built for the person who actually handles the money, on a phone.',
    plans: [
      { name: 'One user', price: 0, unit: 'free, always', note: 'One book, unlimited entries' },
      { name: 'Business', price: 199, unit: 'per month', note: 'Five users, unlimited books, exports', popular: true },
    ],
    annual: 1999,
  },
  {
    id: 'constructpro',
    name: 'ConstructPro',
    tag: 'Sites, materials, bills',
    href: '/full-erp.html',
    demo: '/web-app/app.html',
    line: 'What the site spent, against what it was meant to.',
    body: 'Material and inventory per site, labour and subcontractor bills, BOQ against actual, machinery logs, progress billing and site expenses.',
    plans: [
      { name: 'Per site', price: 1499, unit: 'per site / month', note: 'Two sites minimum', popular: true },
      { name: 'Own the licence', price: null, unit: 'one-time', note: 'Unlimited sites, your server' },
    ],
  },
];

/* Perpetual licence — the alternative to subscribing, for any product. */
export const PERPETUAL = {
  name: 'Own the licence',
  line: 'Pay once. It is yours, and it does not expire.',
  feat: [
    'No monthly fee after the build',
    'Runs on your own server, or ours',
    'No expiry and no phone-home',
    'Source escrow or handover on request',
    'Three years of maintenance included',
    'What you already paid on subscription counts towards it',
  ],
};

/* Included on every plan, every product. */
export const INCLUDED = [
  ['Three years of maintenance', 'Fixes, security updates, small changes and support. Not fifteen per cent a year.'],
  ['Setup and enrolment', 'We set up your sites, rates and rules, and train your supervisors. No charge.'],
  ['No hardware to buy', 'No face machine per site. The supervisor’s phone is the kiosk.'],
  ['Your data, exportable', 'In full, with its structure, whenever you like, without asking us.'],
];

/* ── What the market charges, for an honest comparison ──────────────────────
   Published vendor rates, October 2026. Quotes differ; these are list prices
   as they appeared on the vendors' own pages. Used by the calculator to show
   what the same job costs if you buy it as separate tools. */
export const MARKET = {
  asof: 'October 2026',
  stack: [
    { name: 'Face-attendance product', eg: 'e.g. Truein', perWorkerYear: 390, platformYear: 69000 },
    { name: 'Field-staff GPS app', eg: 'e.g. Unolo, TrackoField', perWorkerMonth: 275 },
  ],
  missing: 'And payroll from that attendance is still a third system, or a person with a spreadsheet.',
};

/* Monthly cost of buying the same job as separate tools. */
export function marketMonthly(workers) {
  let t = 0;
  for (const s of MARKET.stack) {
    if (s.perWorkerYear) t += (s.perWorkerYear * workers) / 12;
    if (s.platformYear) t += s.platformYear / 12;
    if (s.perWorkerMonth) t += s.perWorkerMonth * workers;
  }
  return Math.round(t);
}

export const money = (n) => CUR.sym + Number(n).toLocaleString('en-IN');
