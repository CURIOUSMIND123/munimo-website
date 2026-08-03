import { SITE, cta, faq, ORG, icons } from './layout.mjs';

const ENGINES = [
  [icons.ledger, 'Double-entry ledger', 'The accounting core',
   'Every amount that moves creates a balanced pair of entries. Nothing is a loose number in a table. This is why a trial balance actually balances, why a report can be drilled down to the entry that caused it, and why nobody can quietly change history — corrections are entries too.',
   ['Trial balance, P&L and balance sheet from the same source', 'Full audit trail with the person and timestamp on every entry', 'Period locking so closed months stay closed', 'Multi-currency with the rate stored at the time of the entry']],
  [icons.tax, 'Tax and compliance', 'Filing without the panic',
   'Tax rules are data, not code, so a new rate or a new country is a configuration rather than a rebuild. Returns are generated from the same ledger the accounts come from, which means the return and the books cannot disagree.',
   ['Return-ready statutory formats generated from live books', 'Input and output reconciliation before you file', 'Withholding and deduction handled at the point of entry', 'Configurable per country, per state, per registration']],
  [icons.people, 'People and payroll', 'Attendance through to payslip',
   'Attendance, overtime and advances feed wage and salary runs directly, so the amount someone is paid traces back to the days they were marked present. Statutory deductions are applied by rule and land in the ledger as real postings.',
   ['Daily wage, monthly salary and contract labour in one model', 'Advances recovered automatically across pay periods', 'Statutory deductions and payslips generated per run', 'Cost allocated to the site, branch or project worked on']],
  [icons.offline, 'Offline sync', 'Data captured where there is no network',
   'Field devices hold what they capture and reconcile when a connection appears. The hard part is not storing offline — it is merging without duplicates or lost work when several people were offline at once. That is what this engine handles.',
   ['Queued capture with no data loss on flat batteries or dead zones', 'Conflict handling that never silently overwrites', 'Attachments and photos synced alongside the records', 'Same behaviour on Android, iOS and the browser']],
  [icons.check, 'Approval workflow', 'Control without a bottleneck',
   'Who may raise something, who must approve it, what limits apply and what it locks once approved. Field entries stay submissions until the office confirms them, so the books are never at the mercy of the fastest typist.',
   ['Role and amount-based approval chains', 'Submissions held separately from posted records', 'Maker-checker separation on reversals and voids', 'Every decision recorded with who and when']],
  [icons.ai, 'Natural language entry', 'For people who will not fill in forms',
   'A person writes or says a line the way they would tell a colleague, and gets back a properly categorised draft entry to confirm. It is a drafting aid, not an autopilot — nothing posts without a human agreeing to it.',
   ['Free-text and voice input into a structured draft', 'Learns the categories and parties your business actually uses', 'Works in the languages your staff speak', 'Always confirmed by a person before posting']],
  [icons.chart, 'Reporting and drilldown', 'Numbers you can defend',
   'Every figure on every report is a link back to the entries behind it. When someone asks why a number looks wrong, the answer takes seconds instead of an afternoon in a spreadsheet.',
   ['Drill from any total to the underlying entries', 'Profitability by branch, project, client or product', 'Ageing for both receivables and payables', 'Exports that keep their structure, not flat dumps']],
  [icons.lock, 'Tenancy and permissions', 'Separation you can trust',
   'Each organisation\'s data lives in its own store, not in a shared table with a filter on it. Inside that, roles decide what each person can see and do. This is what makes it safe to run several companies, branches or institutions on one deployment.',
   ['Separate data store per organisation', 'Role-based permissions on every operation, checked server-side', 'Session, rate-limit and CSRF protection as standard', 'Backups and restores per organisation']],
];

const F = faq([
  ['Why does it matter that you already have these engines?',
   'Because they are the expensive, slow, easy-to-get-wrong part of any business system, and they are the part that is the same everywhere. A ledger that balances and an approval chain that holds are not what makes your business different. Starting with them built and tested means your budget goes into the part that is actually yours.'],
  ['Is this a template product with a new logo on it?',
   'No. A template gives you the same screens with your name at the top. An engine is the machinery underneath, with your process built on top of it. Two clients on the same engines can end up with systems that look and behave nothing alike.'],
  ['Can you use only some of them?',
   'Yes. A field app might use offline sync, approvals and permissions and nothing else. A school build uses the ledger, tax, payroll and reporting engines with an entirely different set of screens on top.'],
  ['Are the engines proven, or new?',
   'They are in production, running real businesses with real money passing through them, and they carry an automated test suite covering the accounting integrity and security behaviour. That is the point of using them.'],
]);

export const meta = {
  path: 'engines.html',
  title: 'The engines behind our custom software | Munimo',
  desc: 'A balancing ledger, tax, payroll, offline sync, approvals, reporting and tenancy: the proven machinery every custom build of ours starts from.',
  keywords: 'software engines, double entry ledger engine, offline first sync architecture, approval workflow engine, multi tenant business software architecture, custom software foundations',
  css: ['motion.css'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'TechArticle',
      headline: 'The engines behind Munimo custom software',
      description: 'How proven ledger, tax, payroll, sync, approval, reporting and tenancy engines make custom business software fast to build and safe to run.',
      author: { '@id': SITE.domain + '/#org' },
      publisher: { '@id': SITE.domain + '/#org' },
    }, F.schema],
  },
};

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.16),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:820px">
      <span class="pill rv">Engines</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        The expensive part<br>is already built.
      </h1>
      <p class="lead rv rv3" style="margin-top:22px">
        Underneath almost every business system is the same machinery: a ledger that has to
        balance, tax that has to be filed, people who have to be paid, approvals that have to
        hold, and data that has to survive a phone with no signal. We own that machinery,
        tested and in production. Your build starts on top of it.
      </p>
      <div class="rv rv4" style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/software.html">See them running</a>
        <a class="btn btn-ghost btn-big" href="/contact.html">Talk about your build</a>
      </div>
    </div>
  </div>
</section>

<section class="sec-tight sec-alt">
  <div class="wrap">
    <div class="engines rv" data-scrub="0.08 0.50">
      <div class="eng-core">
        <div class="eng-grid">
          ${ENGINES.slice(0, 6).map(([ico, name, , , ], i) => `
          <div class="eng" style="--ex:${[-190, 0, 190, -190, 0, 190][i]}px;--ey:${[-70, -120, -70, 70, 120, 70][i]}px;--er:${[-24, 0, 24, -24, 0, 24][i]}deg">
            <div class="ico">${ico}</div>
            <h4>${name}</h4>
          </div>`).join('')}
        </div>
        <div class="eng-weld"></div>
      </div>
      <p class="eng-label">Assembled per client. Never rebuilt.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">One by one</span>
      <h2 class="h1 rv">What each engine actually does.</h2>
    </div>
    <div style="max-width:900px">
      ${ENGINES.map(([ico, name, sub, body, points], i) => `
      <div class="rv" style="padding:clamp(28px,3.4vw,40px) 0;border-top:1px solid var(--hair)">
        <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap">
          <div class="ico" style="margin-bottom:0">${ico}</div>
          <div style="flex:1;min-width:260px">
            <h3 class="h2" style="font-size:clamp(21px,2.8vw,30px)">${name}</h3>
            <p class="em" style="font-size:14px;font-weight:700;margin-top:4px">${sub}</p>
            <p class="muted" style="margin-top:14px;font-size:15.5px">${body}</p>
            <ul style="margin-top:18px;list-style:none;display:grid;gap:9px">
              ${points.map((pt) => `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--m)">
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:4px;stroke:var(--em2);fill:none;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
                <span>${pt}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">About the engines.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Your process, on machinery that already works.',
      'Tell us what your business does. We will tell you which engines it needs and what has to be built fresh.')}
`;
