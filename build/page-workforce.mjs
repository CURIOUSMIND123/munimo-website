import { SITE, cta, faq, ORG, icons } from './layout.mjs';
import { CLIENTS, tcard, reviewSchema } from './clients-data.mjs';
import { filmPhone, filmWide, priceEngine, constructProTable, comboTable,
         addonsTerms, workforceContents, ic } from './parts.mjs';
import { SLABS, CARD, ENTRY, money, lakh } from './pricing-data.mjs';
import { wfDemo } from './wfdemo.mjs';

const VID_V = 'TcsdlIyAut0';
const VID_H = 'RXZDZ7Rdojk';

const F = faq([
  ['What counts as a proven duty?',
   'A face check that passed a blink test, at a position the rules accept, at both the start and the end of the shift. If one of the two is missing, the duty is not proven — it is flagged for a person to decide, and it does not quietly become a paid day.'],
  ['Does it work with no network?',
   'Yes. The face match runs on the handset, not on a server, so a check completes with no signal at all. Duties queue on the phone and sync when network returns. Nothing is lost and nothing is waved through.'],
  ['Do workers need their own smartphones?',
   'No. For contract gangs the supervisor’s phone is the kiosk: he holds it up, each man’s face is checked in turn, and the gang is marked in a minute. Workers who do have phones can mark their own duty instead.'],
  ['How do you stop two men sharing one code?',
   'A hardware key ties a worker’s code to one handset. If the same code appears on a second phone it is recorded and flagged rather than silently accepted.'],
  ['What stops a fake GPS app?',
   'Mock-location apps are detected on the phone and the check is refused. The position also has to make sense against the site fence or the station for that train number.'],
  ['What if the phone kills the app mid-shift?',
   'That is logged as what it is — the handset shutting a background app — and it is not held against the worker. We treat being fair to the man on the ground as part of the product, not a nice-to-have.'],
  ['Which languages does the worker see?',
   'Hindi, Bengali, Assamese and English today. Adding another is a small change, not a new version.'],
  ['Can payroll rules differ per contract?',
   'They must, and they do. Check windows, pay rates, overtime, what counts as a short day and the site’s closing hour are all set per contract, not once for the whole company.'],
  ['What does it cost?',
   `Four headcount slabs. Starter, up to 100 workers, is ${money(SLABS[0].monthFloor)} a month or ${money(SLABS[0].yearFloor)} a year. Growth, 101 to 250, is ${money(SLABS[1].monthFloor)} a month or ${money(SLABS[1].yearFloor)} a year. Scale and Enterprise go up from there, and the per-worker rate comes down as you grow — ${money(SLABS[3].yearRate)} a month each at a thousand workers. One-time setup is ${money(SLABS[0].setup)} on cloud for Starter. Everything excludes ${CARD.gst}% GST, which is input-tax-credit eligible.`],
  ['Can we run it on our own server?',
   `Yes. A dedicated-server setup is a higher one-time fee — ${money(SLABS[0].setupDedicated)} instead of ${money(SLABS[0].setup)} on Starter — and a private VPS is ₹12,000 a year. You can also buy the software outright: a one-time perpetual licence from ${money(SLABS[0].licence)}, which never expires and does not phone home. Year one maintenance is free, and the annual maintenance charge applies from year two.`],
]);

export const meta = {
  path: 'workforce.html',
  title: 'Munimo Workforce — manpower tracking and attendance for contract labour in India',
  desc: 'Face and GPS proof of duty for contract and field workforces, with payroll calculated from proven duty only. Works offline, needs no attendance hardware. From ₹39 per worker a month.',
  keywords: 'manpower tracking app India, contract labour attendance software, face attendance app without hardware, GPS attendance for contract workers, railway contractor attendance and payroll, offline face recognition attendance India, labour muster app, keyman patrol GPS monitoring, security guard attendance app, housekeeping staff attendance software',
  css: ['motion.css', 'saas.css', 'wfdemo.css'],
  js: ['saas.js', 'wfdemo.js'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'SoftwareApplication',
        name: 'Munimo Workforce',
        description: 'Face and GPS proof of duty for contract and field workforces, with payroll calculated from proven duty. Works offline on the worker’s or supervisor’s phone and needs no attendance hardware.',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Workforce attendance and payroll',
        operatingSystem: 'Android, iOS, Web',
        url: SITE.domain + '/workforce.html',
        publisher: { '@id': SITE.domain + '/#org' },
        featureList: [
          'Face check with liveness blink test, matched on the device',
          'GPS geofence per site, or per station and train number',
          'Works fully offline and syncs later',
          'Random face checks inside a shift',
          'GPS trail of the route actually walked',
          'Mock-location and code-sharing detection',
          'Supervisor phone used as a shared kiosk',
          'Automated statutory muster rolls, EPF and ESIC registers, bank payout sheets',
          'Per-contract rules, rates and check windows',
          'Hindi, Bengali, Assamese and English',
        ],
        offers: SLABS.map((t) => ({
          '@type': 'Offer', name: t.name + ' slab', price: t.yearFloor, priceCurrency: 'INR',
          description: t.band + '. Yearly advance from ' + money(t.yearFloor) + ', monthly from ' +
            money(t.monthFloor) + ', one-time licence ' + money(t.licence) + ' with ' + money(t.amc) +
            ' annual maintenance from year two. One-time setup ' + money(t.setup) +
            ' on cloud. Excludes ' + CARD.gst + '% GST.',
          priceSpecification: {
            '@type': 'UnitPriceSpecification', price: t.yearRate, priceCurrency: 'INR',
            unitText: 'worker per month', valueAddedTaxIncluded: false,
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'worker' },
          },
        })),
      },
      ...reviewSchema(SITE),
      F.schema,
    ],
  },
};

/* the four kinds of duty it proves */
const DUTIES = [
  { i: ic.train, n: 'On a train',
    s: 'Face and GPS at the starting station against the train number, kept through the run, face and GPS again at the destination — or in the yard the rake was moved to.',
    t: ['Start station check', 'Train number matched', 'Trail where there is signal', 'Destination or yard check'] },
  { i: icons.school, n: 'At a station',
    s: 'A fence around the station area, face in and out, and random checks inside the shift so a man cannot mark in and leave.',
    t: ['Station fence', 'Face in and out', 'Random checks in shift', 'Shift-wise rosters'] },
  { i: icons.wrench, n: 'On a site',
    s: 'The supervisor’s phone is the gate kiosk. A whole gang is marked by face in a minute, inside the site’s fence, with no machine to buy or mount.',
    s2: '',
    t: ['Supervisor kiosk', 'Gang marked together', 'Site fence', 'Closing-hour rules'] },
  { i: ic.route, n: 'On the track',
    s: 'Keyman and patrol beats with checkpoints along the route, the trail he actually walked drawn on a map, and missed checkpoints raised rather than buried.',
    t: ['Beat with checkpoints', 'Walked trail on a map', 'Missed checkpoints raised', 'Patrol timings'] },
];

const SECTORS = [
  [ic.key, 'Security guards', 'Face at the post, random checks in the shift, his round on the map.'],
  [ic.home, 'Housekeeping and facilities', 'Hospitals, malls and offices: face in and out, inside the building’s fence.'],
  [ic.gear, 'Factories and warehouses', 'The supervisor’s phone is the gate. Contract labour needs no phone of its own.'],
  [ic.route, 'Sanitation and city crews', 'The beat he walked, as a trail on the map, ward by ward.'],
  [ic.tower, 'Field technicians', 'Towers, solar and lifts: proof he reached the site, and how long he stayed.'],
  [ic.users, 'Tea gardens and plantations', 'Muster by face at the garden, offline, in the language he speaks.'],
];

const INTEG = [
  [ic.pin, 'Fake GPS is caught', 'A mock-location app is detected on the phone and the check is refused.'],
  [ic.key, 'One man, one phone', 'A hardware key ties his code to his handset.'],
  [ic.eye, 'A live face, not a photo', 'A blink test runs at every single face check.'],
  [ic.users, 'Two phones, one code', 'Code-sharing is recorded and flagged, not silently accepted.'],
  [ic.face, 'Matched on the phone', 'The face match needs no network, so there are no excuses.'],
  [ic.warn, 'Fair to the worker', 'If the handset shuts the app, that is proven, not blamed on him.'],
];

export const body = `

<!-- ══════════ HERO ══════════ -->
<section class="sec" style="padding-top:clamp(36px,6vw,72px);position:relative;overflow:hidden">
  <div class="aurora" aria-hidden="true"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="grid g2" style="gap:clamp(30px,5vw,64px);align-items:center">
      <div>
        <span class="pill rv">Munimo Workforce</span>
        <h1 class="h-display wipe" style="margin-top:20px">
          Manpower tracking that ends in a <span class="em">payslip.</span>
        </h1>
        <p class="lead rv rv2" style="margin-top:20px;max-width:54ch">
          Face and GPS proof that a man was where the contract says — on trains,
          at stations, on sites and along the track. Pay is then worked out from
          those proven duties and nothing else.
        </p>
        <div class="rv rv3" style="display:flex;gap:11px;margin-top:28px;flex-wrap:wrap">
          <a class="btn btn-em btn-big" href="#price">See your price</a>
          <a class="btn btn-ghost btn-big" href="#how">Watch it work</a>
        </div>
        <ul class="rv rv4" style="list-style:none;margin:30px 0 0;padding:0;display:grid;gap:9px;max-width:46ch">
          ${['Works with no signal — the face match runs on the phone',
             'No attendance machine to buy, at any site',
             'Muster rolls, EPF and ESIC registers and bank payout sheets',
             'Running today on a live railway contract'].map((t) => `
          <li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;color:var(--t)">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px;flex:none;margin-top:3px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
            <span>${t}</span></li>`).join('')}
        </ul>
      </div>
      <div class="rv rv2">${filmPhone(VID_V)}</div>
    </div>
  </div>
</section>

<!-- ══════════ THE GAP ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow gold">The gap</span>
      <h2 class="h1 rv">Today, proof stops at the starting station.</h2>
      <p class="lead rv rv2">
        A machine at the gate proves he arrived. It cannot prove he stayed, cannot
        follow him onto a train, and it does not pay him.
      </p>
    </div>
    <div class="grid g2" style="gap:18px">
      <div class="card rv" style="padding:26px;border-color:rgba(248,113,113,.22)">
        <p class="eyebrow" style="color:var(--red)">Without it</p>
        <ul style="list-style:none;margin:16px 0 0;padding:0;display:grid;gap:11px">
          ${['Calling around to find out who is actually on duty',
             'A signature at the start of the shift, nothing after it',
             'Days counted by hand at month end',
             'Arguments over who worked what, with nothing to settle them',
             'A face machine bought and mounted for every site'].map((t) => `
          <li style="display:flex;gap:10px;font-size:14px;line-height:1.5;color:var(--m)">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;flex:none;margin-top:3px;fill:none;stroke:var(--red);stroke-width:2.2;stroke-linecap:round"><path d="M6 6l12 12M18 6 6 18"/></svg>
            <span>${t}</span></li>`).join('')}
        </ul>
      </div>
      <div class="card edge rv rv2" style="padding:26px;background:linear-gradient(170deg,rgba(16,185,129,.1),var(--surface))">
        <p class="eyebrow">With Munimo Workforce</p>
        <ul style="list-style:none;margin:16px 0 0;padding:0;display:grid;gap:11px">
          ${['A live board of every man and every unit, right now',
             'Face and GPS at both ends of every duty',
             'Slips, bank file, EPF and ESI from proven duty',
             'His face, the time and the place, on record',
             'The supervisor’s phone is the kiosk'].map((t) => `
          <li style="display:flex;gap:10px;font-size:14px;line-height:1.5;color:var(--t)">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;flex:none;margin-top:3px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
            <span>${t}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ FOUR KINDS OF DUTY ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Four kinds of duty</span>
      <h2 class="h1 rv">Different work, different proof.</h2>
      <p class="lead rv rv2">
        A train duty and a site duty are not the same thing, so they are not
        checked the same way. Each has its own rules, set per contract.
      </p>
    </div>
    <div class="grid g2" style="gap:18px">
      ${DUTIES.map((d, n) => `
      <div class="card edge lift spot rv rv${(n % 2) + 1}" style="padding:26px">
        <span class="ico">${d.i}</span>
        <h3 style="margin:16px 0 8px;font-size:19px;font-weight:800">${d.n}</h3>
        <p class="muted" style="margin:0 0 16px;font-size:14px;line-height:1.6">${d.s}</p>
        <div style="display:flex;gap:7px;flex-wrap:wrap">
          ${d.t.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ WHAT IS IN IT ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What you get</span>
      <h2 class="h1 rv">Two halves: the phone, and the office.</h2>
      <p class="lead rv rv2">
        Every plan includes both. There is no edition where the office side is missing.
      </p>
    </div>
    <div class="rv rv2">${workforceContents()}</div>
  </div>
</section>

<!-- ══════════ THE WIDE FILM ══════════ -->
<section class="sec">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Watch it work</span>
      <h2 class="h1 rv">A duty, from his face to his payslip.</h2>
    </div>
    <div class="rv rv2">${filmWide(VID_H)}</div>
  </div>
</section>

<!-- ══════════ INTEGRITY ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Integrity</span>
      <h2 class="h1 rv">Built to be hard to fake.</h2>
      <p class="lead rv rv2">
        Every one of these runs in the app today. None of it is on a roadmap.
      </p>
    </div>
    <div class="grid g3">
      ${INTEG.map(([i, t, b], n) => `
      <div class="card lift spot rv rv${(n % 3) + 1}" style="padding:22px">
        <span class="ico">${i}</span>
        <b style="display:block;margin-top:14px;font-size:15.5px;font-weight:800;color:var(--t)">${t}</b>
        <p class="muted" style="margin:7px 0 0;font-size:13.5px;line-height:1.55">${b}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ PAY ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Pay</span>
      <h2 class="h1 rv">The month adds itself up.</h2>
      <p class="lead rv rv2">
        Attendance and payroll are the same system, so nothing is re-typed and
        nothing is reconciled by hand.
      </p>
    </div>
    <div class="grid g4">
      ${[['Proven duties only', 'A day that was not proven at both ends does not become a paid day on its own.'],
         ['Your own rules', 'Rates, overtime, short days and the site’s closing hour, set per contract.'],
         ['Approved before paid', 'Anything in doubt waits for a named person to look at it and decide.'],
         ['Slips and bank file', 'Payslips, the bank transfer file, EPF and ESI figures, and site-wise sheets.']].map(([t, b], n) => `
      <div class="card edge rv rv${n + 1}" style="padding:22px">
        <span style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--em);color:#04150e;font-weight:800;font-size:14px">${n + 1}</span>
        <b style="display:block;margin-top:14px;font-size:15.5px;font-weight:800;color:var(--t)">${t}</b>
        <p class="muted" style="margin:7px 0 0;font-size:13.5px;line-height:1.55">${b}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ THE WORKING DEMONSTRATION ══════════ -->
<section class="sec" id="how">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Watch it work</span>
      <h2 class="h1 rv">What he taps. What you see. Same second.</h2>
      <p class="lead rv rv2">
        Four kinds of duty, each with its own checks. His phone and your
        dashboard, side by side and in step.
      </p>
    </div>
    <div class="rv rv2">${wfDemo()}</div>
  </div>
</section>

<!-- ══════════ BEYOND THE RAILWAY ══════════ -->
<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Beyond the railway</span>
      <h2 class="h1 rv">Any team you cannot see.</h2>
      <p class="lead rv rv2">
        It was built and hardest tested on a railway contract, but the parts are
        general: a face, a fence, a window of time and a rate.
      </p>
    </div>
    <div class="grid g3">
      ${SECTORS.map(([i, t, b], n) => `
      <div class="card lift spot rv rv${(n % 3) + 1}" style="padding:22px">
        <span class="ico">${i}</span>
        <b style="display:block;margin-top:14px;font-size:15.5px;font-weight:800;color:var(--t)">${t}</b>
        <p class="muted" style="margin:7px 0 0;font-size:13.5px;line-height:1.55">${b}</p>
      </div>`).join('')}
    </div>
    <p class="faint rv rv3" style="margin-top:22px;font-size:12.5px;max-width:70ch">
      These are uses the existing features cover, not a list of current clients.
      Each new workforce is set up with its own sites, rules and pay rates.
    </p>
  </div>
</section>

<!-- ══════════ ROLLOUT ══════════ -->
<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Getting started</span>
      <h2 class="h1 rv">Four steps, and nobody goes live on a promise.</h2>
    </div>
    <div class="pipe">
      ${[['Set up the contract', 'Sites, trains, rates and the contract’s own rules. Days, not weeks.'],
         ['Enrol every man', 'Face and details, taken by his own supervisor on the spot. Minutes per gang.'],
         ['Run beside the old way', 'One full pay cycle side by side, so you can compare the two yourself.'],
         ['Pay from proven duty', 'Slips, bank file and site sheets come out of the system from then on.']].map(([t, b], n) => `
      <div class="pstep rv rv${n + 1}">
        <span class="pnum">${n + 1}</span>
        <b>${t}</b>
        <p>${b}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════ PRICING ══════════ -->
<section class="sec sec-alt" id="price">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Pricing</span>
      <h2 class="h1 rv">Move the dial. The price is the price.</h2>
      <p class="lead rv rv2">
        Four headcount slabs. Each has a minimum that covers the band and a per-worker
        rate above it, and the rate falls as you grow. Pay monthly, pay yearly, or own
        the licence outright. Figures exclude ${CARD.gst}% GST.
      </p>
    </div>
    <div class="rv rv2">${priceEngine({ start: 300 })}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow gold">Take ConstructPro with it</span>
      <h2 class="h2 rv">Field payroll straight into site P&amp;L, at 25% off.</h2>
    </div>
    <div class="rv rv2">${comboTable()}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow">The small print, in plain words</span>
      <h2 class="h2 rv">Add-ons and terms.</h2>
    </div>
    <div class="rv rv2">${addonsTerms()}</div>
  </div>
</section>

<!-- ══════════ CLIENT ══════════ -->
<section class="sec">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Running it today</span>
      <h2 class="h1 rv">Adidev Commercials.</h2>
    </div>
    <div class="tcards rv rv2">${tcard(CLIENTS[0], true)}</div>
  </div>
</section>

<!-- ══════════ FAQ ══════════ -->
<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center"><span class="eyebrow">Questions</span><h2 class="h1 rv">Straight answers.</h2></div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Put one contract on it and compare the month.',
      'Tell us the headcount, the sites and how you pay today. We set it up, enrol your men, and run it beside your existing method for one cycle before you trust it.')}
`;
