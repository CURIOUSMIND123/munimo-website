import { SITE, cta, faq, ORG, icons } from './layout.mjs';
import { CLIENTS, tcard, marquee, reviewSchema } from './clients-data.mjs';
import { filmPhone, filmWide, priceEngine, constructProTable, comboTable,
         addonsTerms, workforceContents, ic } from './parts.mjs';
import { SLABS, CONSTRUCTPRO, ENTRY, CARD, money, lakh } from './pricing-data.mjs';
import { wfDemo } from './wfdemo.mjs';

const VID_V = 'TcsdlIyAut0';   // vertical, the app in a worker's hand
const VID_H = 'RXZDZ7Rdojk';   // wide, the whole thing end to end

const F = faq([
  ['What does Munimo Workforce actually prove?',
   'That a named man was at a named place at a named time, and that he was still there when the shift ended. Face with a blink test at both ends, GPS matched to the site or the station, and the trail in between. His pay is then calculated from those proven duties and nothing else.'],
  ['Does every worker need a smartphone?',
   'No. For contract labour the supervisor’s phone is the kiosk — he holds it up, each man’s face is checked, and the whole gang is marked present in a minute. Workers who do have phones can mark their own duty.'],
  ['What happens where there is no network?',
   'It keeps working. The face match runs on the phone itself, not on a server, so a check completes with no signal at all. Duties queue on the handset and sync the moment there is a bar of network. Nothing is lost and nothing is waved through.'],
  ['Can a worker fake it?',
   'Each of the obvious tricks is handled. A mock-location app is detected. A photo held to the camera fails the blink test. A hardware key ties his code to one handset, so two phones with one code is recorded and flagged. And if the phone itself kills the app, that is logged as the phone’s fault, not held against him.'],
  ['How is this different from a face-attendance machine?',
   'A machine proves he reached the gate. It cannot prove he stayed, cannot follow him onto a train or along a track, and it does not pay him. It also has to be bought and mounted at every site. Munimo needs no hardware, works anywhere the work happens, and pay comes out of the same system.'],
  ['What does it cost?',
   `It is priced in headcount slabs. Starter is ${money(SLABS[0].monthFloor)} a month, or ${money(SLABS[0].yearFloor)} a year, covering up to 100 workers, with a ${money(SLABS[0].setup)} one-time cloud setup. At a thousand workers the yearly rate works out at ${money(SLABS[3].yearRate)} per worker a month. Every figure excludes ${CARD.gst}% GST. Move the dial on this page for your own headcount.`],
  ['Can we own it instead of subscribing?',
   `Yes. A one-time perpetual licence starts at ${money(SLABS[0].licence)} on the Starter slab. It does not expire, does not phone home, and can sit on your own server. Year one maintenance is free; from year two the annual maintenance charge for that slab applies, which is what keeps cloud servers, Android compatibility, backups and support running.`],
  ['Is it only for railway contracts?',
   'That is where it was built and hardest tested, but the parts are general. Security posts, housekeeping, factory gates, sanitation beats, field technicians and plantation musters all use the same face checks, fences, random checks and payroll.'],
  ['How long until a contract is live?',
   'Setting up sites, rates and rules takes days. Enrolling men is a few minutes per gang, done by their own supervisor. We then run one pay cycle beside your existing method so you can compare the two before trusting it.'],
  ['Is our data ours?',
   'Entirely, and exportable in full with its structure intact, whenever you like, without asking us. Holding data hostage is the worst practice in this industry.'],
]);

const APP = (name, desc, price, url) => ({
  '@type': 'SoftwareApplication',
  name, description: desc,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Android, iOS, Web',
  url: SITE.domain + url,
  publisher: { '@id': SITE.domain + '/#org' },
  offers: price,
});

export const meta = {
  path: 'index.html',
  title: 'Munimo Workforce — face and GPS attendance for contract labour, with payroll',
  desc: 'Prove every outsourced shift. Face check with a blink test, GPS matched to the site, works offline, and payroll calculated from proven duty only. From ₹39 per worker a month. No hardware to buy.',
  keywords: 'manpower tracking software India, contract labour attendance app, face attendance without hardware, GPS attendance for field workers, railway contractor attendance software, workforce attendance and payroll, offline face recognition attendance, labour attendance app for contractors, keyman patrol GPS tracking, site attendance app India',
  css: ['motion.css', 'saas.css', 'wfdemo.css'],
  js: ['saas.js', 'wfdemo.js'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': SITE.domain + '/#site', url: SITE.domain, name: SITE.name,
        publisher: { '@id': SITE.domain + '/#org' } },
      APP('Munimo Workforce',
        'Face and GPS proof of duty for contract and field workforces, with statutory muster rolls, EPF and ESIC registers and bank payout sheets. Works offline, needs no attendance hardware.',
        SLABS.map((t) => ({
          '@type': 'Offer', name: t.name + ' slab', priceCurrency: 'INR',
          description: t.band + '. Yearly advance from ' + money(t.yearFloor) +
            ', monthly from ' + money(t.monthFloor) + ', one-time licence ' + money(t.licence) +
            '. Excludes ' + CARD.gst + '% GST.',
          price: t.yearFloor,
          priceSpecification: {
            '@type': 'UnitPriceSpecification', price: t.yearRate, priceCurrency: 'INR',
            unitText: 'worker per month', valueAddedTaxIncluded: false,
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'worker' },
          },
        })), '/workforce.html'),
      APP('Munimo ConstructPro Khata & Site ERP',
        'Financial, billing and compliance control for civil contractors and builders: project-wise cash flow and site P&L, RA bills and retention, contractor and supplier advances, TDS 194C and GSTN exports.',
        CONSTRUCTPRO.map((c) => ({
          '@type': 'Offer', name: c.name, price: c.yearly, priceCurrency: 'INR',
          description: c.band + '. ' + money(c.monthly) + ' a month, ' + money(c.yearly) +
            ' a year, or ' + money(c.licence) + ' one-time. Excludes ' + CARD.gst + '% GST.',
        })), '/full-erp.html'),
      APP('Munimo Lite Cashbook',
        'Free cash and bank book for small businesses, with parties, dues and GST-ready exports.',
        [{ '@type': 'Offer', price: 0, priceCurrency: 'INR' }], '/cash-book.html'),
      ...reviewSchema(SITE),
      F.schema,
    ],
  },
};

/* ── the four beats of a duty ────────────────────────────────────────────── */
const BEATS = [
  [ic.face, 'He shows his face', 'A blink test proves it is a live face, not a photo. Matched on the phone, so no network is needed.'],
  [ic.pin, 'The place is checked', 'GPS inside the site fence, or at the right station for the right train. A fake-location app is caught.'],
  [ic.route, 'The shift is watched', 'Random face checks inside the shift, and the trail he actually walked, drawn on a map.'],
  [ic.rupee, 'He is paid for it', 'Slips, bank file, EPF and ESI, from proven duty only. Anything in doubt waits for a person.'],
];

const PRODUCTS = [
  { name: 'Munimo Workforce', tag: 'The main thing we do',
    line: 'Prove every shift. Pay from the proof.',
    body: 'Face and GPS proof of duty for contract and field workforces, and payroll calculated from it. Works with no signal. Needs no hardware.',
    price: `From ${money(SLABS[0].monthFloor)} a month, or ${money(SLABS[0].yearFloor)} a year`,
    href: '/workforce.html', demo: '/web-app/app.html', demoLabel: 'Open the office side',
    icon: ic.users, hero: true,
    bullets: ['Face check with a blink test', 'GPS fence per site, or per station and train',
      'Random checks and walked trails', 'Payroll, EPF and ESI from proven duty',
      'Offline, in four languages', 'The supervisor’s phone is the kiosk'] },
  { name: 'Lite Cashbook', tag: 'Money in, money out',
    line: 'The cash book your accountant stops arguing with.',
    body: 'Cash and bank entries, parties, due lists and GST-ready exports, built for the person who actually handles the money.',
    price: 'Free for one user, then ₹199 a month',
    href: '/cash-book.html', demo: '/web-app/lite.html', demoLabel: 'Open it now', icon: icons.ledger,
    bullets: ['Entries in seconds on a phone', 'Parties, dues and reminders', 'GST-ready exports'] },
  { name: 'ConstructPro', tag: 'Sites, materials, bills',
    line: 'What the site spent, against what it was meant to.',
    body: 'Material and inventory per site, labour and subcontractor bills, BOQ against actual, machinery logs and progress billing.',
    price: '₹1,499 per site a month',
    href: '/full-erp.html', demo: '/web-app/app.html', demoLabel: 'Open it now', icon: icons.layers,
    bullets: ['BOQ against actual, per site', 'Subcontractor and labour bills', 'Machinery and material logs'] },
];

export const body = `

<!-- ══════════ HERO ══════════ -->
<section class="sec" style="padding-top:clamp(40px,7vw,86px);position:relative;overflow:hidden">
  <div class="aurora" aria-hidden="true"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="grid g2" style="gap:clamp(30px,5vw,64px);align-items:center">

      <div>
        <span class="pill rv">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round"><path d="M20 7 10 17l-5-5"/></svg>
          Live today on a railway contract workforce
        </span>
        <h1 class="h-display wipe" style="margin-top:20px">
          Every outsourced shift. <span class="em">Proven.</span>
        </h1>
        <p class="lead rv rv2" style="margin-top:20px;max-width:54ch">
          Face and GPS proof that a man was where the contract says — and payroll
          calculated from that proof, not from a wage sheet someone typed at month end.
        </p>

        <div class="rv rv3" style="display:flex;gap:11px;margin-top:28px;flex-wrap:wrap">
          <a class="btn btn-em btn-big" href="#price">See your price</a>
          <a class="btn btn-ghost btn-big" href="#how">Watch it work</a>
        </div>

        <div class="rv rv4" style="display:grid;grid-template-columns:repeat(3,auto);gap:clamp(16px,3vw,38px);margin-top:34px;justify-content:start">
          ${[[String(ENTRY.monthFloor), 'From ₹', ' a month, up to 100 workers'],
             [String(ENTRY.bestPerWorker), '₹', ' per worker a month at 1,000'],
             ['0', '₹', ' of attendance hardware']].map(([n, pre, suf]) => `
          <div>
            <b style="display:block;font-size:clamp(26px,3.4vw,38px);font-weight:800;letter-spacing:-.035em;color:var(--t);line-height:1">
              <span style="font-size:.52em;font-weight:700;color:var(--m);vertical-align:.42em">${pre}</span><span data-count="${n}">0</span>
            </b>
            <span class="muted" style="font-size:12.5px;line-height:1.35;display:block;margin-top:5px;max-width:13ch">${suf}</span>
          </div>`).join('')}
        </div>

        <p class="faint rv rv5" style="margin-top:26px;font-size:13px;max-width:48ch">
          Works with no signal. Needs no attendance machine. Set up, enrolled and
          taught to your supervisors at no charge.
        </p>
      </div>

      <div class="rv rv2">
        ${filmPhone(VID_V)}
        <p class="faint center" style="margin-top:18px;font-size:12.5px;max-width:30ch;margin-left:auto;margin-right:auto">
          The app a supervisor actually holds. No sound needed — tap for it.
        </p>
      </div>

    </div>
  </div>
</section>

<!-- ══════════ PROOF STRIP ══════════ -->
<section style="padding:22px 0;border-block:1px solid var(--hair);background:var(--ink2)">
  <div class="wrap">
    <p class="faint center" style="margin:0 0 16px;font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase">
      Businesses running software we built
    </p>
    ${marquee()}
  </div>
</section>

<!-- ══════════ THE WORKING DEMONSTRATION ══════════ -->
<section class="sec" id="how">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Watch it work</span>
      <h2 class="h1 rv">What he taps. What you see. Same second.</h2>
      <p class="lead rv rv2">
        His phone and your dashboard, side by side and in step. Pick a kind of
        duty and watch the whole thing play itself.
      </p>
    </div>
    <div class="rv rv2">${wfDemo()}</div>
  </div>
</section>

<!-- ══════════ FOUR BEATS ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What the software does</span>
      <h2 class="h1 rv">Four things happen. Then he gets paid.</h2>
      <p class="lead rv rv2">No forms to fill in. No register to sign. Four checks, and the month adds itself up.</p>
    </div>
    <div class="grid g4">
      ${BEATS.map(([i, t, b], n) => `
      <div class="card edge lift spot rv rv${n + 1}" style="padding:24px">
        <span class="ico">${i}</span>
        <b style="display:block;margin-top:16px;font-size:16.5px;font-weight:800;color:var(--t)">${t}</b>
        <p class="muted" style="margin:8px 0 0;font-size:13.5px;line-height:1.55">${b}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ THE WIDE FILM ══════════ -->
<section class="sec" style="position:relative;overflow:hidden">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Watch it work</span>
      <h2 class="h1 rv">A duty, from his face to his payslip.</h2>
      <p class="lead rv rv2">No narration needed. It starts when you reach it.</p>
    </div>
    <div class="rv rv2">${filmWide(VID_H)}</div>
  </div>
</section>

<!-- ══════════ THE THREE PRODUCTS ══════════ -->
<section class="sec sec-alt" id="products">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What we sell</span>
      <h2 class="h1 rv">Three products. One of them is the point.</h2>
      <p class="lead rv rv2">
        Workforce is what we are building the company around. The other two are
        real, in use, and priced below — open either one and press buttons.
      </p>
    </div>

    ${PRODUCTS.map((p, n) => p.hero ? `
    <div class="card edge lift spot rv" style="padding:clamp(24px,3vw,38px);margin-bottom:18px;
         background:linear-gradient(165deg,rgba(16,185,129,.11),rgba(16,185,129,.015) 48%,var(--surface))">
      <div class="grid g2" style="gap:clamp(22px,3vw,44px);align-items:start">
        <div>
          <span class="pill">${p.tag}</span>
          <h3 style="margin:16px 0 8px;font-size:clamp(22px,2.6vw,30px);font-weight:800;letter-spacing:-.02em">${p.name}</h3>
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:var(--em2)">${p.line}</p>
          <p class="muted" style="margin:0;font-size:14.5px;line-height:1.6;max-width:50ch">${p.body}</p>
          <p style="margin:18px 0 0;font-size:14.5px;font-weight:800;color:var(--t)">${p.price}</p>
          <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
            <a class="btn btn-em" href="${p.href}">How it proves a shift</a>
            <a class="btn btn-ghost" href="#price">See your price</a>
          </div>
        </div>
        <ul style="list-style:none;margin:0;padding:0;display:grid;gap:10px">
          ${p.bullets.map((b) => `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;color:var(--t)">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px;flex:none;margin-top:3px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
            <span>${b}</span></li>`).join('')}
        </ul>
      </div>
    </div>` : '').join('')}

    <div class="grid g2" style="gap:18px">
      ${PRODUCTS.filter((p) => !p.hero).map((p, n) => `
      <div class="card edge lift spot rv rv${n + 2}" style="padding:26px">
        <span class="ico">${p.icon}</span>
        <p class="eyebrow" style="margin-top:14px">${p.tag}</p>
        <h3 style="margin:8px 0 7px;font-size:20px;font-weight:800">${p.name}</h3>
        <p style="margin:0 0 10px;font-size:14.5px;font-weight:700;color:var(--em2)">${p.line}</p>
        <p class="muted" style="margin:0 0 16px;font-size:13.5px;line-height:1.55">${p.body}</p>
        <ul style="list-style:none;margin:0 0 16px;padding:0;display:grid;gap:8px">
          ${p.bullets.map((b) => `<li style="display:flex;gap:9px;font-size:13px;line-height:1.4;color:var(--t)">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;flex:none;margin-top:2.5px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
            <span>${b}</span></li>`).join('')}
        </ul>
        <p style="margin:0 0 16px;font-size:14px;font-weight:800;color:var(--t)">${p.price}</p>
        <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:auto">
          <a class="btn btn-em" href="${p.demo}">${p.demoLabel}</a>
          <a class="btn btn-ghost" href="${p.href}">What it does</a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ PRICING ══════════ -->
<section class="sec" id="price">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Pricing</span>
      <h2 class="h1 rv">Move the dial. The price is the price.</h2>
      <p class="lead rv rv2">
        Priced in headcount slabs: a minimum that covers the band, and a per-worker rate
        above it. Pay monthly, pay yearly, or own the licence outright. No attendance
        hardware at any site. Figures exclude ${CARD.gst}% GST.
      </p>
    </div>
    <div class="rv rv2">${priceEngine({ start: 180 })}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow">ConstructPro Khata &amp; Site ERP</span>
      <h2 class="h2 rv">Priced by sites, not by workers.</h2>
    </div>
    <div class="rv rv2">${constructProTable()}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow gold">Take both</span>
      <h2 class="h2 rv">25% off ConstructPro when it runs beside Workforce.</h2>
    </div>
    <div class="rv rv2">${comboTable()}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow">The small print, in plain words</span>
      <h2 class="h2 rv">Add-ons and terms.</h2>
    </div>
    <div class="rv rv2">${addonsTerms()}</div>
  </div>
</section>

<!-- ══════════ CLIENTS ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Who we build for</span>
      <h2 class="h1 rv">Five businesses, five different problems.</h2>
      <p class="lead rv rv2">
        Workforce came out of a railway contract. The rest of the Munimo line came
        out of the others. Same people, same habit of fixing things the week you ask.
      </p>
    </div>
    <div class="tcards rv rv2">
      ${tcard(CLIENTS[0], true)}
    </div>
    <div class="center rv rv3" style="margin-top:26px">
      <a class="btn btn-ghost" href="/clients.html">Read what the other four say</a>
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

${cta('Put one contract on it and compare the month.',
      'Tell us the headcount, the sites and how you pay today. We will come back with the figure, set it up, and run it beside your existing method for one cycle.')}
`;
