import { SITE, cta, faq, ORG, icons, beforeAfter } from './layout.mjs';
import { CLIENTS, tcard, marquee, reviewSchema } from './clients-data.mjs';

const F = faq([
  ['Do I have to be technical to work with you?',
   'No. Most of the people we build for run a shop, a school, a clinic or a site — not an IT department. You tell us in plain words what is slow or painful today; we handle the software.'],
  ['Can I really try it without signing up?',
   'Yes. Pick your business in the picker at the top and use the real software — add an entry, collect a fee, book an appointment. Nothing to install, no account, no sales call. It resets when you reload.'],
  ['How much does it cost?',
   'We price to your budget, not from a rate card, because no two businesses need the same thing. Tell us what it must do and what you can spend, and we will tell you honestly what fits. Small additions to a system we have already built are usually a one-time charge.'],
  ['Do I own the software or rent it?',
   'Your choice — own the licence outright and keep it for good, or subscribe monthly. Either way your data is yours and exportable at any time.'],
  ['What happens after it goes live?',
   'Three years of maintenance is included free — fixes, updates, small changes and support. Most companies charge fifteen to twenty per cent of the licence value every year for this. We do not, for the first three years.'],
  ['We already have old software. Is switching worth it?',
   'Usually, and it is less painful than people fear. We bring your data across and run both systems side by side until you trust the new one, then switch. Nobody goes live on a promise.'],
  ['How fast can you build or change something?',
   'A change to an existing system usually lands in days. A new system is typically weeks, because we build on engines we already own instead of starting from a blank page.'],
  ['Do you work outside India?',
   'Yes — multiple currencies, tax rules and languages are built in, and we work with clients remotely as standard.'],
]);

export const meta = {
  path: 'index.html',
  title: 'Munimo — Custom software for schools, clinics, shops and trades',
  desc: 'Pick your business and try the real software free — school, clinic, trading, retail. Then we build it around how you work. Own it or subscribe.',
  keywords: 'custom software for small business, school management software, clinic management software, retail billing software, custom ERP, try business software free no signup, perpetual licence software',
  css: ['motion.css'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': SITE.domain + '/#site', url: SITE.domain, name: SITE.name,
        publisher: { '@id': SITE.domain + '/#org' } },
      { '@type': 'Service', name: 'Custom software development',
        provider: { '@id': SITE.domain + '/#org' }, areaServed: 'Worldwide',
        description: 'Custom business software for schools, clinics, trading, retail and field operations, built on proven engines. Perpetual licence or subscription, three years of maintenance included.' },
      ...reviewSchema(SITE),
      F.schema,
    ],
  },
};

/* Each chip loads a REAL demo. School and clinic are their own dedicated apps;
   trading / retail / contractor open the ERP configured that way. */
const INDUSTRIES = [
  ['School', icons.school, '/assets/shots/school.webp', '/demos/school/', 'munimo.online/demos/school',
   '<b>For a school</b> — admissions, attendance, fees with printed receipts, exams and staff payroll.'],
  ['Clinic', icons.heartbeat, '/assets/shots/clinic.webp', '/demos/clinic/', 'munimo.online/demos/clinic',
   '<b>For a clinic</b> — doctor appointments, patient records, billing, pharmacy stock and payroll.'],
  ['Trading', icons.box, '/assets/shots/app.webp', '/web-app/app.html', 'munimo.online/web-app',
   '<b>For trading &amp; distribution</b> — invoicing, purchases, stock, receivables and full accounts.'],
  ['Retail shop', icons.cart, '/assets/shots/cashbook.webp', '/web-app/lite.html', 'munimo.online/web-app',
   '<b>For a shop</b> — fast billing, day-end cash, supplier dues and live margins.'],
  ['Contractor', icons.wrench, '/assets/shots/labour.webp', '/web-app/app.html', 'munimo.online/web-app',
   '<b>For a contractor</b> — site cash books, labour attendance and wages, subcontractor bills.'],
];

const SERVICES = [
  ['/school-erp.html', icons.school, 'School ERP', 'Admissions, attendance, fees with receipts, exams and staff payroll.', true],
  ['/clinic-erp.html', icons.heartbeat, 'Clinic ERP', 'Appointments, patient records, billing, pharmacy stock and payroll.', true],
  ['/full-erp.html', icons.layers, 'Full business ERP', 'Invoicing, purchases, stock, payroll, tax and profit — one system.', true],
  ['/cash-book.html', icons.ledger, 'Cash Book', 'Money in, money out, balances that tally. Web and phone together.', true],
  ['/mobile-app.html', icons.phone, 'Mobile field app', 'For staff on site with no signal. Captures offline, office approves.', true],
  ['/custom-software.html', icons.wrench, 'Something custom', 'A system nobody sells you — built on our engines, in weeks not years.', false],
];

const PIPE = [
  ['Pick or tell us', 'Try a demo above, or tell us the one thing your current system cannot do.'],
  ['See it in weeks', 'A working version shaped to you — not a document. You use it and tell us what is wrong.'],
  ['We move your data', 'Your records come across. Old and new run together until you trust the new one.'],
  ['You own it', 'Own the licence or subscribe. Three years of maintenance included, free.'],
];

export const body = `
<!-- ══════════ HERO — pick your business, use your software ══════════ -->
<section class="sec" style="padding:clamp(84px,8vw,104px) 0 clamp(30px,3.5vw,48px);overflow:hidden">
  <div class="wrap" style="position:relative;z-index:1">
    <div class="center" style="max-width:820px;margin:0 auto">
      <span class="pill rv">Custom software &middot; 5 businesses already run on it</span>
      <h1 class="h-display rv rv2" style="margin-top:16px">
        Your business deserves software<br>that <span class="gold">actually fits it.</span>
      </h1>
      <p class="lead rv rv3" style="margin:17px auto 0;max-width:590px">
        Not another template you bend yourself around.
        <b style="color:var(--t);font-weight:700">Pick your trade below and use the real thing</b> &mdash;
        no sign-up, no install.
      </p>
    </div>

    <div class="pick rv rv4">
      <div class="pchips">
        ${INDUSTRIES.map((x, i) => `
        <button class="pchip${i === 0 ? ' on' : ''}" data-label="${x[0]}"
          data-shot="${x[2]}" data-src="${x[3]}" data-url="${x[4]}" data-line="${x[5].replace(/"/g, '&quot;')}">
          ${x[1]}<span>${x[0]}</span></button>`).join('')}
      </div>
      <p class="pline"></p>
      <div class="pwrap">
        <div class="pframe">
          <div class="pbar"><i class="r"></i><i class="y"></i><i class="g"></i>
            <span class="purl"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span class="purl-t"></span></span>
          </div>
          <div class="pscreen">
            <img class="pshot" src="/assets/shots/school.webp" width="1500" height="940" alt="Live business software demo" fetchpriority="high">
            <iframe id="pframe" title="Live demo" loading="lazy"></iframe>
            <div class="plaunch" role="button" aria-label="Open the live demo">
              <span class="ring"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
              <b>Open the demo</b>
              <small>Real software &middot; sample data &middot; no sign-up</small>
            </div>
          </div>
        </div>
      </div>
      <p class="pnote">It runs entirely in your browser. Nothing you type is saved or sent anywhere.
        &nbsp;·&nbsp; <a href="/software.html">See all software &rarr;</a></p>
    </div>
  </div>
</section>

<!-- ══════════ PROOF STRIP ══════════ -->
<section class="sec-tight" style="padding:clamp(30px,4vw,50px) 0">
  <div class="wrap">
    <p class="center faint rv" style="font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:20px">
      Trusted by real businesses &middot; rated 5.0
    </p>
  </div>
  <div class="rv rv2">${marquee()}</div>
</section>

<!-- ══════════ SERVICES — what we can build ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">What we build for you</span>
      <h2 class="h1 rv">Everything your business runs on,<br>in one system that fits it.</h2>
      <p class="lead rv rv2">Ready-made where it can be, custom where it must be. Open any of them live.</p>
    </div>
    <div class="svcs">
      ${SERVICES.map(([href, ico, name, blurb, live], i) => `
      <a class="svc rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}" href="${href}">
        ${live ? '<span class="live">● LIVE</span>' : ''}
        <div class="ico">${ico}</div>
        <h3>${name}</h3>
        <p>${blurb}</p>
        <span class="go">${live ? 'Try it live' : 'See how'} <span aria-hidden="true">&rarr;</span></span>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ BEFORE / AFTER ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">The difference</span>
      <h2 class="h1 rv">Your Monday morning,<br>before and after.</h2>
    </div>
    ${beforeAfter(
      { head: 'Nobody knows the real number',
        sub: 'And finding out takes half a day.',
        items: [
          'Every branch keeps its own spreadsheet',
          'The same figure typed in three places',
          'One person understands the file &mdash; and they are on leave',
          'Month-end takes a week and still does not tally',
          'You hear about a problem after it cost you money',
        ],
        foot: 'You work around the software' },
      { head: 'One screen. The real number.',
        sub: 'Before your first cup of tea is finished.',
        items: [
          'Every branch on one live screen',
          'Entered once, correct everywhere',
          'Anyone in your team can run it',
          'Books close on the first of the month',
          'You get told the moment something goes wrong',
        ],
        foot: 'The software works the way you do' }
    )}
  </div>
</section>

<!-- ══════════ HOW IT WORKS — the pipeline ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">How it works</span>
      <h2 class="h1 rv">Four steps. No jargon.</h2>
    </div>
    <div class="pipe">
      ${PIPE.map(([h, p], i) => `
      <div class="pstep rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="pnum">${i + 1}</div>
        <h3>${h}</h3>
        <p>${p}</p>
      </div>`).join('')}
    </div>
    <div class="center rv rv5" style="margin-top:44px">
      <a class="btn btn-em btn-big" href="/contact.html">Tell us what you need</a>
    </div>
  </div>
</section>

<!-- ══════════ TESTIMONIALS ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">In their words</span>
      <h2 class="h1 rv">Five owners. Five industries.<br>The same answer.</h2>
    </div>
    <div class="tcards">
      ${CLIENTS.map((c, i) => `<div class="rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}"${c.feature ? ' style="grid-column:span 2"' : ''}>${tcard(c, c.feature)}</div>`).join('')}
    </div>
    <div class="center rv" style="margin-top:32px">
      <a class="btn btn-ghost" href="/clients.html">See what we built for each &rarr;</a>
    </div>
  </div>
</section>

<!-- ══════════ PRICING ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Simple commercials</span>
      <h2 class="h1 rv">You set the budget.<br>We are honest about it.</h2>
      <p class="lead rv rv2">No rate card. Tell us what it must do and what you can spend.</p>
    </div>
    <div class="grid g3" style="max-width:1000px;margin:0 auto">
      ${[
        [icons.lock, 'Own it outright', 'A perpetual licence. Yours to keep and run for good, with no monthly fee.', true],
        [icons.swap, 'Or subscribe', 'A monthly fee instead of a big payment, hosting and updates included.', false],
        [icons.shield, '3 years AMC, free', 'Fixes, updates and small changes for three years. The industry charges 15–20% a year.', false],
      ].map(([ico, h, p, gold], i) => `
      <div class="card rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="ico ${gold ? 'ico-gold' : ''}">${ico}</div>
        <h3 class="h3">${h}</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">${p}</p>
      </div>`).join('')}
    </div>
    <div class="center rv rv4" style="margin-top:30px">
      <a class="btn btn-em btn-big" href="/contact.html">Get a price for your business</a>
      <p class="faint" style="margin-top:14px;font-size:13.5px">Already run something of ours? Adding a feature is a one-time charge, not a new plan.</p>
    </div>
  </div>
</section>

<!-- ══════════ FAQ ══════════ -->
<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center"><span class="eyebrow">Questions</span><h2 class="h1 rv">Straight answers.</h2></div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Tell us what your business needs.',
      'In plain words — what is slow, what is painful, what nobody can see. We will tell you if we are the right people for it, and if we are not, we will say so.')}
`;
