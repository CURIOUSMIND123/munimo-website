import { SITE, liveScreen, cta, ORG, icons } from './layout.mjs';

export const meta = {
  path: 'software.html',
  title: 'Try our software live, with no sign-up | Munimo',
  desc: 'Open and use our real software in your browser with sample data: business ERP, Cash Book, School ERP and an offline field app. No sign-up, no install.',
  keywords: 'try ERP software free no signup, live ERP demo, interactive accounting software demo, school management software demo, offline field app demo',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'ItemList', name: 'Munimo software you can try live',
      itemListElement: [
        ['Full business ERP', 'full-erp.html'], ['Cash Book', 'cash-book.html'],
        ['School ERP', 'school-erp.html'], ['Mobile field app', 'mobile-app.html'],
      ].map(([name, url], i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'SoftwareApplication', name, applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web', url: SITE.domain + '/' + url,
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD',
                          description: 'Free live demo, no sign-up required' } },
      })),
    }],
  },
};

const ITEMS = [
  ['full-erp.html', icons.layers, 'Full business ERP',
   'The whole office in one system: invoicing and quotations, purchases and stock, payroll, tax returns, receivables, and profit and loss by branch or project.',
   'Built for any business that has outgrown separate tools.',
   ['Invoicing + tax', 'Purchases + stock', 'Payroll', 'Reports + P&L']],
  ['cash-book.html', icons.ledger, 'Cash Book',
   'The daily book of money in and money out, with bank balances that tally, budget heads, and approvals before anything is posted. Web and phone share one set of books.',
   'For owners who want the day to be clear by evening.',
   ['Money in / out', 'Bank balances', 'Approvals', 'Web + phone']],
  ['school-erp.html', icons.school, 'School ERP',
   'Admissions and student records, daily attendance, fee collection with printed receipts and dues tracking, exams and results, staff payroll, and parent communication.',
   'For schools and coaching institutes of any size.',
   ['Fees + receipts', 'Attendance', 'Exams', 'Parent portal']],
  ['mobile-app.html', icons.phone, 'Mobile field app',
   'For staff who are nowhere near a desk. Records attendance, expenses and photo proof with no signal at all, then syncs the moment it finds one. The office approves before anything hits the books.',
   'For sites, routes, branches and field teams.',
   ['Works offline', 'Photo proof', 'Attendance', 'Office approval']],
];

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:880px;height:500px;top:-200px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.15),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="sechead center" style="margin-bottom:clamp(30px,4vw,46px)">
      <span class="pill rv">Everything here is live</span>
      <h1 class="h-display rv rv2" style="margin-top:20px">Try the software.<br>Then decide.</h1>
      <p class="lead rv rv3" style="margin:22px auto 0;max-width:640px">
        No sign-up form, no install, no call with a salesperson. These are the real products,
        loaded with sample data for a company that does not exist. Use them properly — add
        something, change something, run a report. Reload and it is fresh again.
      </p>
    </div>

    <div class="rv rv4" style="max-width:1080px;margin:0 auto;position:relative">
      <div class="glow" style="width:80%;height:70%;top:10%;left:10%;background:radial-gradient(ellipse,rgba(18,185,129,.18),transparent 66%)"></div>
      <div style="position:relative">
        ${liveScreen({
          src: '/web-app/app.html',
          url: 'munimo.online/web-app',
          poster: '/assets/web/cashbook-hero.png',
          label: 'Start the live ERP',
          note: 'The full office system — click to use it',
        })}
      </div>
    </div>
    <p class="center faint rv rv5" style="margin-top:20px;font-size:13.5px">
      Everything runs in your browser. Nothing you type is sent anywhere.
      <a href="/web-app/app.html" target="_blank" rel="noopener" class="em" style="text-decoration:underline;text-underline-offset:3px">Open full screen</a>
    </p>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Pick a system</span>
      <h2 class="h1 rv">Each one has its own page,<br>and its own live demo.</h2>
      <p class="lead rv rv2">
        These four are finished products running real businesses. They are also the starting
        point for custom work — we shape them to how you operate rather than charging you to
        rebuild the same foundations from nothing.
      </p>
    </div>
    <div class="grid g2">
      ${ITEMS.map(([href, ico, name, blurb, who, tags], i) => `
      <a class="card rv ${i ? 'rv' + (i + 1) : ''}" href="/${href}">
        <div class="ico">${ico}</div>
        <h3 class="h3">${name}</h3>
        <p class="muted" style="margin-top:10px;font-size:15px">${blurb}</p>
        <p class="em" style="margin-top:12px;font-size:13.5px;font-weight:700">${who}</p>
        <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:16px">${tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="em" style="margin-top:18px;font-weight:700;font-size:14.5px">Open ${name} &rarr;</div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap-n center">
    <h2 class="h2 rv">None of these is quite it?</h2>
    <p class="lead rv rv2" style="margin-top:16px">
      That is the usual answer, and it is fine. These are where we start, not where we stop.
      Most of our work is a system that does not exist anywhere on this page yet.
    </p>
    <div class="rv rv3" style="margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-em btn-big" href="/custom-software.html">See how custom builds work</a>
      <a class="btn btn-ghost btn-big" href="/contact.html">Describe what you need</a>
    </div>
  </div>
</section>

${cta('Seen enough to talk?',
      'Tell us what your business actually does and where the current system gets in the way.')}
`;
