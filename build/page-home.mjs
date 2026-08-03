import { SITE, liveScreen, cta, faq, ORG, icons } from './layout.mjs';

const F = faq([
  ['What exactly does Munimo do?',
   'We are a custom software company. We design and build the systems a business runs on — accounting and cash books, full ERP, school management, field and mobile apps, and one-off tools for a process nobody else has. We start from working engines we already own, then shape them to your business, which is why a custom build with us takes weeks rather than years.'],
  ['Can I try the software before I commit anything?',
   'Yes, and you should. Every product on this site runs live in your browser with sample data. Nothing to install, no account, no sales call. Open <a href="/software.html">the software page</a>, click into any product and use it properly — add an entry, change a record, run a report.'],
  ['How much does it cost?',
   'We price to your budget and your scope, not from a fixed rate card. Tell us what the software has to do and what you can spend, and we will tell you honestly what fits, what has to wait, and what we would not charge you for. Small additions to a system we have already built are usually a one-time charge.'],
  ['Do I own the software or rent it?',
   'Your choice. Take a perpetual licence and the software is yours to keep and run for as long as you like. Or subscribe monthly if you would rather keep costs low and flexible. Either way you are not locked in, and your data is exportable at any time.'],
  ['What is included after the software goes live?',
   'Three years of annual maintenance is included at no extra cost — bug fixes, security updates, small changes and support. Most companies charge fifteen to twenty per cent of the licence value every year for this. We do not, for the first three years.'],
  ['We already have old software. Is moving worth the disruption?',
   'Usually yes, and it is less disruptive than people expect. We import your existing data, run both systems side by side until you trust the new one, and only then switch. <a href="/legacy-vs-custom.html">This page</a> walks through what staying on legacy software actually costs and how a migration runs.'],
  ['Do you work with companies outside India?',
   'Yes. The software handles multiple currencies, tax rules, languages and time zones, and we work with clients remotely as standard. Nothing on this site is India-only.'],
  ['How quickly can you add something we need?',
   'Small changes to an existing build usually land in days. A new module is typically two to four weeks. Because we build on our own engines rather than from a blank page, most of what you ask for is configuration and interface work rather than new foundations.'],
]);

export const meta = {
  path: 'index.html',
  title: 'Munimo — Custom software built around your business',
  desc: 'Custom ERP, accounting, school and field software, built around how your business works. Try every product live in your browser. Own it or subscribe.',
  keywords: 'custom software development company, bespoke business software, custom ERP development, perpetual licence software, legacy software replacement, business process automation, try ERP without signup',
  css: ['motion.css'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': SITE.domain + '/#site', url: SITE.domain, name: SITE.name,
        publisher: { '@id': SITE.domain + '/#org' } },
      { '@type': 'Service', name: 'Custom software development',
        provider: { '@id': SITE.domain + '/#org' }, areaServed: 'Worldwide',
        description: 'Custom business software built on proven engines: ERP, accounting, school management, field and mobile applications. Perpetual licence or subscription, with three years of maintenance included.',
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Software we build', itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Full business ERP', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' } },
          { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Cash Book', applicationCategory: 'FinanceApplication', operatingSystem: 'Web' } },
          { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'School ERP', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' } },
          { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Mobile field app', applicationCategory: 'BusinessApplication', operatingSystem: 'Android, iOS, Web' } },
        ] } },
      F.schema,
    ],
  },
};

const PRODUCTS = [
  ['full-erp.html', icons.layers, 'Full business ERP',
   'Invoicing, purchases, stock, payroll, tax filing, receivables, profit and loss. The whole office in one system.',
   ['Any industry', 'Multi-branch', 'Role permissions']],
  ['cash-book.html', icons.ledger, 'Cash Book',
   'Money in, money out, who owes you, who you owe. The daily book, kept honest, on web and phone together.',
   ['Web + phone', 'Bank balances', 'Approvals']],
  ['school-erp.html', icons.school, 'School ERP',
   'Admissions, attendance, fee collection with receipts, exams and results, staff payroll, parent communication.',
   ['Fees + receipts', 'Exams', 'Parent portal']],
  ['mobile-app.html', icons.phone, 'Mobile field app',
   'For the people away from a desk. Works with no signal and syncs when it finds one. Office approves from the back.',
   ['Works offline', 'Photo proof', 'Site attendance']],
];

const ENGINES = [
  [icons.ledger, 'Double-entry ledger', 'Every figure traces to an entry. Balances that always tally.', '--ex:-190px;--ey:-70px;--er:-24deg'],
  [icons.tax, 'Tax and compliance', 'Tax rules, returns and statutory formats, per country.', '--ex:0px;--ey:-120px;--er:0deg'],
  [icons.people, 'People and payroll', 'Attendance, wages, advances, salary runs, leave.', '--ex:190px;--ey:-70px;--er:24deg'],
  [icons.offline, 'Offline sync', 'Keeps working with no signal, reconciles cleanly after.', '--ex:-190px;--ey:70px;--er:-24deg'],
  [icons.check, 'Approval workflow', 'Who may raise it, who must approve it, what it locks.', '--ex:0px;--ey:120px;--er:0deg'],
  [icons.ai, 'Natural language entry', 'Type or speak a line, get a correct posted entry back.', '--ex:190px;--ey:70px;--er:24deg'],
];

export const body = `
<!-- ══════════ HERO — animation 1: a requirement becomes software ══════════ -->
<section class="sec" style="padding:clamp(94px,10vw,116px) 0 clamp(50px,6vw,72px);overflow:hidden">
  <div class="glow" style="width:1000px;height:620px;top:-260px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.17),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="center" style="max-width:860px;margin:0 auto">
      <span class="pill rv">Custom software studio</span>
      <h1 class="h-display rv rv2" style="margin-top:17px">
        Software built around your business.<br><span class="gold">Not the other way round.</span>
      </h1>
      <p class="lead rv rv3" style="margin:19px auto 0;max-width:640px;font-size:clamp(15.5px,1.8vw,19px)">
        <b style="color:var(--t);font-weight:700">We are a custom software company.</b>
        We build the systems service businesses run on: accounting, ERP, school management,
        field apps, and the one-off tool nobody sells. Every product below is live on this
        page &mdash; open it before you speak to us.
      </p>
      <div class="rv rv4" style="display:flex;gap:12px;justify-content:center;margin-top:26px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/software.html">Use the software now</a>
        <a class="btn btn-ghost btn-big" href="/contact.html">Tell us what you need</a>
      </div>
      <p class="faint rv rv5" style="margin-top:15px;font-size:13px">
        Priced to your budget &middot; own the licence or subscribe &middot; three years maintenance included
      </p>
    </div>

    <!-- the animation: a sentence a client actually said, becoming software -->
    <div class="stage rv rv5" style="margin-top:clamp(34px,4vw,48px)" data-typer='[
      "We need to know what every site spent, by Friday, without chasing anyone.",
      "Our accountant is the only one who understands the file. That has to stop.",
      "Fees, receipts and attendance for 1,200 students. One system.",
      "Our supervisors have no signal on site. It still has to work."
    ]'>
      <div class="prompt">
        <span class="prompt-dot"></span>
        <span class="typer-text"></span>
        <span class="prompt-tag">What a client asked for</span>
      </div>
      <div class="assemble" aria-hidden="true">
        <div class="ab ab-w4 ab-em"><div class="ab-k">In bank</div><div class="ab-v num">53,57,500</div><div class="ab-s">Across 4 accounts</div></div>
        <div class="ab ab-w4 ab-gold"><div class="ab-k">To collect</div><div class="ab-v num">2,31,75,200</div><div class="ab-s">8 parties &middot; 8 overdue</div></div>
        <div class="ab ab-w4 ab-red"><div class="ab-k">To pay</div><div class="ab-v num">16,28,635</div><div class="ab-s">7 bills due</div></div>
        <div class="ab ab-w7">
          <div class="ab-k">Today's entries</div>
          <div class="ab-row"><span>Client receipt &middot; Eastern Railway</span><b class="em">+48,38,000</b></div>
          <div class="ab-row"><span>Vendor payment &middot; cement</span><b style="color:var(--red)">−1,51,680</b></div>
          <div class="ab-row"><span>Labour wages &middot; week 31</span><b style="color:var(--red)">−1,92,000</b></div>
        </div>
        <div class="ab ab-w5">
          <div class="ab-k">Month progress</div>
          <div class="ab-v" style="font-size:19px">Books closed to 31 Jul</div>
          <div class="ab-s">Nothing pending approval</div>
          <div class="ab-bar" style="--w:86%"><i></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ WHAT WE ARE, IN ONE LINE ══════════ -->
<section class="sec-tight sec-alt">
  <div class="wrap">
    <div class="grid g4">
      <div class="rv"><div class="h2 em num" data-count="3" data-suf=" yrs">3 yrs</div><p class="muted" style="font-size:14.5px;margin-top:6px">Maintenance included free after go-live</p></div>
      <div class="rv rv2"><div class="h2 num" data-count="100" data-suf="%">100%</div><p class="muted" style="font-size:14.5px;margin-top:6px">Ownership option — keep the licence for good</p></div>
      <div class="rv rv3"><div class="h2 gold">Days</div><p class="muted" style="font-size:14.5px;margin-top:6px">Typical turnaround for a change you ask for</p></div>
      <div class="rv rv4"><div class="h2">Any nation</div><p class="muted" style="font-size:14.5px;margin-top:6px">Multi-currency, multi-tax, multi-language</p></div>
    </div>
  </div>
</section>

<!-- ══════════ WHAT WE BUILD ══════════ -->
<section class="sec" id="software">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What we build</span>
      <h2 class="h1 rv">Four systems we have already built.<br>And whatever you need next.</h2>
      <p class="lead rv rv2">
        These are real, finished products running real businesses today. They are also our
        starting point — we reshape them to your process instead of charging you to invent
        the same foundations again. Click any one and use it right now.
      </p>
    </div>
    <div class="grid g2">
      ${PRODUCTS.map(([href, ico, name, blurb, tags], i) => `
      <a class="card rv ${i ? 'rv' + (i + 1) : ''}" href="/${href}">
        <div class="ico">${ico}</div>
        <h3 class="h3">${name}</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">${blurb}</p>
        <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:16px">${tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="em" style="margin-top:18px;font-weight:700;font-size:14.5px">Open it live &rarr;</div>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ TOUCH THE REAL SOFTWARE ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Not a video. Not a screenshot.</span>
      <h2 class="h1 rv">Use the real thing, right here.</h2>
      <p class="lead rv rv2">
        This is the actual software, loaded with sample data for a company that does not exist.
        Add an entry. Change a record. Run a report. Break something. It resets when you reload,
        and it never touches a real customer's books.
      </p>
    </div>
    <div class="rv rv3" style="max-width:1080px;margin:0 auto;position:relative">
      <div class="glow" style="width:80%;height:70%;top:10%;left:10%;background:radial-gradient(ellipse,rgba(18,185,129,.2),transparent 66%)"></div>
      <div style="position:relative">
        ${liveScreen({
          src: '/web-app/app.html',
          url: 'munimo.online/web-app',
          poster: '/assets/web/cashbook-hero.png',
          label: 'Start the live ERP',
          note: 'Real software, sample data, no sign-up',
        })}
      </div>
    </div>
    <p class="center faint rv rv4" style="margin-top:22px;font-size:13.5px">
      Runs entirely in your browser. Nothing you type here is sent anywhere.
    </p>
  </div>
</section>

<!-- ══════════ ENGINES — animation 2 ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Why we are fast</span>
      <h2 class="h1 rv">Custom software, without paying<br>to rebuild the foundations.</h2>
      <p class="lead rv rv2">
        Most of any business system is the same underneath: a ledger that has to balance, tax that
        has to be filed, people who have to be paid, approvals that have to hold. We already own
        those engines, tested and in production. Your build starts on top of them, so the money
        goes into what makes your business different.
      </p>
    </div>
    <div class="engines rv rv3" data-scrub="0.08 0.50">
      <div class="eng-core">
        <div class="eng-grid">
          ${ENGINES.map(([ico, name, blurb, pos]) => `
          <div class="eng" style="${pos}">
            <div class="ico">${ico}</div>
            <h4>${name}</h4>
            <p>${blurb}</p>
          </div>`).join('')}
        </div>
        <div class="eng-weld"></div>
      </div>
      <p class="eng-label">One system. Your rules on top.</p>
    </div>
    <div class="center rv rv4" style="margin-top:38px">
      <a class="btn btn-ghost" href="/engines.html">See what each engine does &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ LEGACY VS CUSTOM — animation 3 ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">The honest comparison</span>
      <h2 class="h1 rv">What old software costs you<br>while you keep putting up with it.</h2>
      <p class="lead rv rv2">
        Legacy systems rarely fail outright. They just quietly tax you — an export here, a
        re-keyed number there, one person who is the only one who understands the file.
        Scroll and watch the same screen change hands.
      </p>
    </div>
    <div class="shift rv rv3" data-scrub="0.16 0.70">
      <div class="shift-pane shift-old">
        <div class="shift-head"><span class="shift-t">LEDGER_2019_FINAL_v4.xls</span><span class="shift-chip">Legacy</span></div>
        <div class="shift-line">SUM(H4:H92) &mdash; #REF! error<b>?</b></div>
        <div class="shift-line">last saved by: accounts_pc<b>14 Mar</b></div>
        <div class="shift-line">site_3_expenses_FINAL(2).xls<b>not merged</b></div>
        <div class="shift-line">manual entry &mdash; awaiting Ravi<b>6 days</b></div>
        <div class="shift-line">tax working &mdash; separate file<b>unreconciled</b></div>
      </div>
      <div class="shift-pane shift-new">
        <div class="shift-head"><span class="shift-t">Your books, live</span><span class="shift-chip">Custom</span></div>
        <div class="shift-line">Cash and bank, all accounts<b>Tallied</b></div>
        <div class="shift-line">Every entry traced to a person<b>Audited</b></div>
        <div class="shift-line">All sites, one view<b>Live</b></div>
        <div class="shift-line">Approvals cleared<b>Today</b></div>
        <div class="shift-line">Tax return ready to file<b>Generated</b></div>
      </div>
      <div class="shift-seam"></div>
      <div class="shift-cap">
        <span class="a">Everyone works around the software</span>
        <span class="b">The software works the way you do</span>
      </div>
    </div>
    <div class="center rv rv4" style="margin-top:38px">
      <a class="btn btn-ghost" href="/legacy-vs-custom.html">Read the full comparison &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ CLIENTS ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Clients</span>
      <h2 class="h1 rv">The people who trusted us first.</h2>
    </div>
    <div class="rv rv2" style="max-width:880px">
      <div class="card-flat" style="padding:clamp(26px,3.4vw,40px);border-color:var(--hair3)">
        <div style="display:flex;align-items:center;gap:3px;margin-bottom:18px" aria-label="5 out of 5">
          ${'<svg viewBox="0 0 24 24" style="width:19px;height:19px;fill:var(--gold)"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'.repeat(5)}
          <span class="muted" style="font-size:13.5px;font-weight:700;margin-left:9px">5.0</span>
        </div>
        <p style="font-size:clamp(17px,2.2vw,22px);font-weight:600;line-height:1.55;letter-spacing:-.01em">
          &ldquo;What surprised us was the speed. We would mention something on a call and it would be
          in the software the same week — not after a change request, a quotation and three months.
          It stopped feeling like buying software and started feeling like having our own team.&rdquo;
        </p>
        <div style="display:flex;align-items:center;gap:14px;margin-top:24px;padding-top:22px;border-top:1px solid var(--hair)">
          <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--em),var(--emdk));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;color:#04110b;flex-shrink:0">NP</div>
          <div>
            <div style="font-weight:800">Niptu Paul</div>
            <div class="muted" style="font-size:14px">Adidev Commercials</div>
          </div>
        </div>
      </div>
    </div>
    <div class="center rv rv3" style="margin-top:36px">
      <a class="btn btn-ghost" href="/clients.html">See who else we build for &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ OWNERSHIP + BUDGET ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Commercials</span>
      <h2 class="h1 rv">You set the budget. We tell you<br>honestly what fits inside it.</h2>
      <p class="lead rv rv2">
        We do not publish a rate card, because we have never met two businesses that needed the
        same thing. Tell us what the software has to do and what you can spend. We will tell you
        what fits, what should wait for phase two, and what we would not charge you for at all.
      </p>
    </div>
    <div class="grid g3" style="max-width:1000px;margin:0 auto">
      <div class="card rv">
        <div class="ico ico-gold">${icons.lock}</div>
        <h3 class="h3">Own it outright</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">
          A perpetual licence. The software is yours to keep and run for as long as you want,
          with no monthly fee hanging over it. Best when you want the cost to end.
        </p>
      </div>
      <div class="card rv rv2">
        <div class="ico">${icons.swap}</div>
        <h3 class="h3">Or subscribe</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">
          A monthly fee instead of a capital outlay, hosting and updates included.
          Best when you would rather keep cash free and stay flexible.
        </p>
      </div>
      <div class="card rv rv3">
        <div class="ico">${icons.shield}</div>
        <h3 class="h3">Three years of AMC, free</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">
          Fixes, security updates, small changes and support for three years after go-live,
          at no extra charge. The industry norm is fifteen to twenty per cent a year.
        </p>
      </div>
    </div>
    <div class="center rv rv4" style="margin-top:34px">
      <a class="btn btn-em btn-big" href="/contact.html">Get a price for your scope</a>
      <p class="faint" style="margin-top:16px;font-size:13.5px">
        Already running something of ours? Adding a feature is usually a one-time charge, not a new plan.
      </p>
    </div>
  </div>
</section>

<!-- ══════════ HOW WE WORK ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">How a build runs</span>
      <h2 class="h1 rv">Four steps. No mystery.</h2>
    </div>
    <div class="grid g4">
      ${[
        ['01', 'We watch you work', 'A call or a visit. We map what actually happens today, including the workarounds nobody admits to. This is where most projects are won or lost.'],
        ['02', 'You see it early', 'A working version in front of you in weeks, not a document. You use it, you tell us where it is wrong, we change it while it is still cheap to change.'],
        ['03', 'We move your data', 'Your existing records come across. Both systems run together until you trust the new one. Nobody switches on a promise.'],
        ['04', 'It keeps growing', 'Three years of maintenance included. New requirements get added as they come up, usually in days.'],
      ].map(([n, h, p], i) => `
      <div class="rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="mono em" style="font-size:13px;font-weight:800;letter-spacing:.1em">${n}</div>
        <h3 class="h4" style="margin:11px 0 8px">${h}</h3>
        <p class="muted" style="font-size:14.5px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ FAQ ══════════ -->
<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">Straight answers.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Tell us what your business needs.',
      'Describe the problem in your own words. We will tell you whether we are the right people for it — and if we are not, we will say so.')}
`;
