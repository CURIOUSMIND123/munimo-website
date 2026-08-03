import { SITE, liveScreen, cta, faq, ORG, icons } from './layout.mjs';
import { CLIENTS, tcard, marquee, reviewSchema } from './clients-data.mjs';

const F = faq([
  ['What exactly does Munimo do?',
   'We are a custom software company. We design and build the systems a business runs on — accounting and cash books, full ERP, school and clinic management, field and mobile apps, and one-off tools for a process nobody else has. We start from working engines we already own, then shape them to your business, which is why a custom build with us takes weeks rather than years.'],
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
  desc: 'Custom ERP, accounting, clinic, school and field software, built around how your business works. Try every product live in your browser. Own it or subscribe.',
  keywords: 'custom software development company, bespoke business software, custom ERP development, perpetual licence software, legacy software replacement, clinic management software, try ERP without signup',
  css: ['motion.css'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': SITE.domain + '/#site', url: SITE.domain, name: SITE.name,
        publisher: { '@id': SITE.domain + '/#org' } },
      { '@type': 'Service', name: 'Custom software development',
        provider: { '@id': SITE.domain + '/#org' }, areaServed: 'Worldwide',
        description: 'Custom business software built on proven engines: ERP, accounting, clinic and school management, field and mobile applications. Perpetual licence or subscription, with three years of maintenance included.' },
      ...reviewSchema(SITE),
      F.schema,
    ],
  },
};

/* ── the scroll-driven product tour: real screens, real captions ── */
const TOUR = [
  ['Money', 'See the day before it closes',
   'Cash and bank across every account, what is owed to you, what you owe, and the entries that moved today — live, not a report someone compiles on Monday.',
   'app'],
  ['Billing', 'Invoice, collect, chase',
   'Quotations through to invoices and receipts, tax applied per line, and an ageing list that tells you exactly who is overdue and by how much.',
   'invoices'],
  ['People', 'Attendance through to payslip',
   'Mark a crew present from a phone on site, and watch it flow into wages, advances and a salary run without anyone re-typing a name.',
   'labour'],
  ['Proof', 'Numbers you can defend',
   'Every figure on every report links back to the entries behind it. When somebody asks why a number looks wrong, the answer takes seconds.',
   'reports'],
];

const BENTO = [
  ['full-erp.html', 'Full business ERP', 'Invoicing, purchases, stock, payroll, tax and profit — the whole office in one system.',
   ['Any industry', 'Multi-branch'], 'app', 'bx-4 bx-wide'],
  ['cash-book.html', 'Cash Book', 'Money in, money out, balances that tally. Web and phone share one book.',
   ['Web + phone', 'Approvals'], 'cashflow', 'bx-2'],
  ['mobile-app.html', 'Mobile field app', 'For staff with no signal. Captures offline, syncs later, office approves.',
   ['Offline', 'Photo proof'], 'phone-home', 'bx-2'],
  ['school-erp.html', 'School &amp; clinic systems', 'Admissions, fees and attendance. Patient bookings and doctor appointments. The same accounting engine underneath.',
   ['Fees + receipts', 'Bookings'], 'clients', 'bx-4 bx-wide'],
];

export const body = `
<!-- ══════════ HERO ══════════ -->
<section class="sec" style="padding:clamp(88px,8.5vw,110px) 0 clamp(34px,4vw,56px);overflow:hidden">
  <div class="wrap" style="position:relative;z-index:1">
    <div class="center" style="max-width:830px;margin:0 auto">
      <span class="pill rv">Custom software studio</span>
      <h1 class="h-display rv rv2" style="margin-top:17px">
        Software built around your business.<br><span class="gold">Not the other way round.</span>
      </h1>
      <p class="lead rv rv3" style="margin:19px auto 0;max-width:620px">
        <b style="color:var(--t);font-weight:700">We are a custom software company.</b>
        We build the systems businesses run on &mdash; and every product below is
        live on this page. Open it before you speak to us.
      </p>
      <div class="rv rv4" style="display:flex;gap:12px;justify-content:center;margin-top:23px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/software.html">Use the software now</a>
        <a class="btn btn-ghost btn-big" href="/contact.html">Tell us what you need</a>
      </div>
      <p class="faint rv rv5" style="margin-top:15px;font-size:13px">
        Priced to your budget &middot; own the licence or subscribe &middot; three years maintenance included
      </p>
    </div>

    <!-- the real software, tilted into the page -->
    <div class="deck rv rv5">
      <div class="deck-glow"></div>
      <div class="deck-stage">
        <div class="deck-main">
          <img src="/assets/shots/app.webp" width="1500" height="940" alt="The Munimo ERP dashboard showing bank balances, receivables and the day's entries" fetchpriority="high">
        </div>
        <div class="deck-chip a">
          <div class="k">In bank</div><div class="v em num">53,57,500</div><div class="s">4 accounts &middot; live</div>
        </div>
        <div class="deck-chip b">
          <div class="k">Approved today</div><div class="v gold num">18</div><div class="s">Nothing pending</div>
        </div>
        <div class="deck-phone">
          <img src="/assets/shots/phone-home.webp" width="400" height="840" alt="The same books on the Munimo phone app" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ CLIENT MARQUEE ══════════ -->
<section class="sec-tight" style="padding-top:clamp(46px,6vw,70px);padding-bottom:0">
  <div class="wrap">
    <p class="center faint rv" style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:24px">
      Built for and trusted by
    </p>
  </div>
  <div class="rv rv2">${marquee()}</div>
</section>

<!-- ══════════ STAT BAND ══════════ -->
<section class="sec-tight">
  <div class="wrap">
    <div class="band rv">
      <div><div class="bv em"><span data-count="3">3</span> yrs</div><div class="bl">Maintenance included, free</div></div>
      <div><div class="bv">100%</div><div class="bl">Ownership option on every build</div></div>
      <div><div class="bv gold">Days</div><div class="bl">Turnaround on a change you ask for</div></div>
      <div><div class="bv">Any nation</div><div class="bl">Multi-currency, tax and language</div></div>
    </div>
  </div>
</section>

<!-- ══════════ SCROLL TOUR — the real screens ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Inside the software</span>
      <h2 class="h1 rv">This is what your team<br>would open every morning.</h2>
    </div>
    <div class="tour">
      <div class="tour-steps">
        ${TOUR.map(([tag, h, p], i) => `
        <div class="tour-step${i ? '' : ' on'}" role="button" tabindex="0">
          <span class="n">0${i + 1}</span>
          <h3>${h}</h3>
          <p>${p}</p>
          <span class="tag" style="margin-top:14px">${tag}</span>
        </div>`).join('')}
      </div>
      <div class="tour-vis">
        <div class="tour-frame">
          <div class="tour-imgs">
            ${TOUR.map(([, h, , shot], i) => `
            <img src="/assets/shots/${shot}.webp" width="1500" height="940" alt="${h}"${i ? ' loading="lazy"' : ' class="on"'}>`).join('')}
          </div>
        </div>
        <p class="figure-cap">Real screens from the running product &mdash;
          <a href="/software.html" class="em" style="text-decoration:underline;text-underline-offset:3px">open them live</a>
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ TOUCH IT ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Not a video. Not a mockup.</span>
      <h2 class="h1 rv">Use the real thing, right here.</h2>
      <p class="lead rv rv2">
        The actual software, loaded with sample data for a company that does not exist.
        Add an entry and watch the balances move. It resets when you reload, and it
        never touches a real customer's books.
      </p>
    </div>
    <div class="rv rv3" style="max-width:1080px;margin:0 auto;position:relative">
      <div class="glow" style="width:80%;height:70%;top:10%;left:10%;background:radial-gradient(ellipse,rgba(18,185,129,.22),transparent 66%)"></div>
      <div style="position:relative">
        ${liveScreen({ src: '/web-app/app.html', url: 'munimo.online/web-app',
                       poster: '/assets/shots/app.webp', label: 'Start the live ERP',
                       note: 'Real software, sample data, no sign-up' })}
      </div>
    </div>
  </div>
</section>

<!-- ══════════ WHAT WE BUILD — bento ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What we build</span>
      <h2 class="h1 rv">Finished systems, running<br>real businesses today.</h2>
      <p class="lead rv rv2">
        These are also where your build starts. We reshape them to your process instead of
        charging you to invent the same foundations again.
      </p>
    </div>
    <div class="bento">
      ${BENTO.map(([href, name, blurb, tags, shot, cls], i) => `
      <a class="bx ${cls} rv ${i ? 'rv' + Math.min(i + 1, 4) : ''}" href="/${href}">
        <div class="bx-body">
          <h3>${name}</h3>
          <p>${blurb}</p>
          <div class="bx-tags">${tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          <span class="bx-arrow">Open it live <span aria-hidden="true">&rarr;</span></span>
        </div>
        <div class="bx-shot${shot.startsWith('phone') ? ' portrait' : ''}"><img src="/assets/shots/${shot}.webp" alt="${name}" loading="lazy"></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ ENGINES ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Why we are fast</span>
      <h2 class="h1 rv">Custom software, without paying<br>to rebuild the foundations.</h2>
      <p class="lead rv rv2">
        Most of any business system is the same underneath: a ledger that has to balance, tax
        that has to be filed, people who have to be paid. We already own those engines, tested
        and in production. Your money goes into what makes your business different.
      </p>
    </div>
    <div class="engines rv rv3" data-scrub="0.08 0.50">
      <div class="eng-core">
        <div class="eng-grid">
          ${[
            [icons.ledger, 'Double-entry ledger', 'Every figure traces to an entry.'],
            [icons.tax, 'Tax and compliance', 'Returns generated from live books.'],
            [icons.people, 'People and payroll', 'Attendance through to payslip.'],
            [icons.offline, 'Offline sync', 'Works with no signal, reconciles after.'],
            [icons.check, 'Approval workflow', 'Who raises it, who must approve it.'],
            [icons.ai, 'Natural language entry', 'Type a line, get a correct entry.'],
          ].map(([ico, name, blurb], i) => `
          <div class="eng" style="--ex:${[-190, 0, 190, -190, 0, 190][i]}px;--ey:${[-70, -120, -70, 70, 120, 70][i]}px;--er:${[-24, 0, 24, -24, 0, 24][i]}deg">
            <div class="ico">${ico}</div><h4>${name}</h4><p>${blurb}</p>
          </div>`).join('')}
        </div>
        <div class="eng-weld"></div>
      </div>
      <p class="eng-label">One system. Your rules on top.</p>
    </div>
    <div class="center rv rv4" style="margin-top:34px">
      <a class="btn btn-ghost" href="/engines.html">See what each engine does &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ LEGACY VS CUSTOM ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">The honest comparison</span>
      <h2 class="h1 rv">What old software costs you<br>while you put up with it.</h2>
      <p class="lead rv rv2">Scroll and watch the same screen change hands.</p>
    </div>
    <div class="shift rv rv3" data-scrub="0.16 0.70">
      <div class="shift-pane shift-old">
        <div class="shift-head"><span class="shift-t">LEDGER_2019_FINAL_v4.xls</span><span class="shift-chip">Legacy</span></div>
        <div class="shift-line">SUM(H4:H92) &mdash; #REF! error<b>?</b></div>
        <div class="shift-line">last saved by: accounts_pc<b>14 Mar</b></div>
        <div class="shift-line">branch_3_expenses_FINAL(2).xls<b>not merged</b></div>
        <div class="shift-line">manual entry &mdash; awaiting Ravi<b>6 days</b></div>
        <div class="shift-line">tax working &mdash; separate file<b>unreconciled</b></div>
      </div>
      <div class="shift-pane shift-new">
        <div class="shift-head"><span class="shift-t">Your books, live</span><span class="shift-chip">Custom</span></div>
        <div class="shift-line">Cash and bank, all accounts<b>Tallied</b></div>
        <div class="shift-line">Every entry traced to a person<b>Audited</b></div>
        <div class="shift-line">All branches, one view<b>Live</b></div>
        <div class="shift-line">Approvals cleared<b>Today</b></div>
        <div class="shift-line">Tax return ready to file<b>Generated</b></div>
      </div>
      <div class="shift-seam"></div>
      <div class="shift-cap">
        <span class="a">Everyone works around the software</span>
        <span class="b">The software works the way you do</span>
      </div>
    </div>
    <div class="center rv rv4" style="margin-top:34px">
      <a class="btn btn-ghost" href="/legacy-vs-custom.html">Read the full comparison &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ CLIENTS ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Clients</span>
      <h2 class="h1 rv">Trading, healthcare, education,<br>HR and retail.</h2>
      <p class="lead rv rv2">
        Five very different businesses, five very different systems, one set of engines
        underneath. Every quote below is from the person who signed it off.
      </p>
    </div>
    <div class="tcards">
      ${CLIENTS.map((c, i) => `<div class="rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}"${c.feature ? ' style="grid-column:span 2"' : ''}>${tcard(c, c.feature)}</div>`).join('')}
    </div>
    <div class="rv" style="margin-top:34px">
      <a class="btn btn-ghost" href="/clients.html">See what we built for each of them &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ COMMERCIALS ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Commercials</span>
      <h2 class="h1 rv">You set the budget. We tell you<br>honestly what fits inside it.</h2>
      <p class="lead rv rv2">
        No rate card, because we have never met two businesses that needed the same thing.
        Tell us what the software has to do and what you can spend.
      </p>
    </div>
    <div class="grid g3" style="max-width:1000px;margin:0 auto">
      ${[
        [icons.lock, 'Own it outright', 'A perpetual licence. Yours to keep and run for as long as you want, with no monthly fee hanging over it.', true],
        [icons.swap, 'Or subscribe', 'A monthly fee instead of a capital outlay, hosting and updates included. Keep cash free and stay flexible.', false],
        [icons.shield, 'Three years of AMC, free', 'Fixes, security updates, small changes and support for three years. The industry norm is fifteen to twenty per cent a year.', false],
      ].map(([ico, h, p, gold], i) => `
      <div class="card rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="ico ${gold ? 'ico-gold' : ''}">${ico}</div>
        <h3 class="h3">${h}</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">${p}</p>
      </div>`).join('')}
    </div>
    <div class="center rv rv4" style="margin-top:32px">
      <a class="btn btn-em btn-big" href="/contact.html">Get a price for your scope</a>
      <p class="faint" style="margin-top:15px;font-size:13.5px">
        Already running something of ours? Adding a feature is a one-time charge, not a new plan.
      </p>
    </div>
  </div>
</section>

<!-- ══════════ PROCESS ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead"><span class="eyebrow">How a build runs</span><h2 class="h1 rv">Four steps. No mystery.</h2></div>
    <div class="grid g4">
      ${[
        ['01', 'We watch you work', 'A call or a visit. We map what actually happens today, including the workarounds nobody admits to.'],
        ['02', 'You see it early', 'A working version in weeks, not a document. You tell us where it is wrong while it is cheap to change.'],
        ['03', 'We move your data', 'Your records come across. Both systems run together until you trust the new one.'],
        ['04', 'It keeps growing', 'Three years of maintenance included. New requirements added as they come up, usually in days.'],
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
<section class="sec">
  <div class="wrap-n">
    <div class="sechead center"><span class="eyebrow">Questions</span><h2 class="h1 rv">Straight answers.</h2></div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Tell us what your business needs.',
      'Describe the problem in your own words. We will tell you whether we are the right people for it — and if we are not, we will say so.')}
`;
