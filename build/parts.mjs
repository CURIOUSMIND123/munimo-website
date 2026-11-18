/* ──────────────────────────────────────────────────────────────────────────
   parts.mjs — the three new pieces: the auto-running deck, the video frames
   with no player furniture, and the animated price engine.
   ────────────────────────────────────────────────────────────────────────── */
import { icons } from './layout.mjs';
import { SLABS, SLAB_POLICY, CONSTRUCTPRO, CP_WHAT, COMBOS, COMBO_RULE, ADDONS, TERMS,
         MARKET, CARD, WF_WHAT, ENTRY, quote, slabFor, money, lakh } from './pricing-data.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* extra line icons the deck needs */
export const ic = {
  face: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c.9.8 1.9 1.2 3 1.2s2.1-.4 3-1.2"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s4-6.5 10-6.5S22 12 22 12s-4 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/></svg>',
  key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8 3 3-3 3M16 7l2.5 2.5"/></svg>',
  warn: '<svg viewBox="0 0 24 24"><path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 11a3 3 0 1 0-1.5-5.6M18 20a6 6 0 0 0-3-5.2"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  route: '<svg viewBox="0 0 24 24"><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.4 19H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.6"/></svg>',
  train: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M9 20l-2 2M15 20l2 2M9 16h.01M15 16h.01"/></svg>',
  rupee: '<svg viewBox="0 0 24 24"><path d="M7 4h10M7 9h10M15 4c0 3.5-2.4 5-8 5l7 10"/></svg>',
  tower: '<svg viewBox="0 0 24 24"><path d="M8 3 6 21M16 3l2 18M7 10h10M4.5 6a9 9 0 0 1 15 0"/></svg>',
};

/* ── the deck ────────────────────────────────────────────────────────────── */

const six = (items) => `<div class="sl-six" data-seq>${items.map(([i, t, b]) =>
  `<div>${i}<div><strong>${t}</strong><p>${b}</p></div></div>`).join('')}</div>`;

const rail = (nodes, dim) => `<div class="sl-rail${dim ? ' dim' : ''}" data-seq>${
  dim ? '' : '<span class="runner"></span>'}${nodes.map(([t, b, off]) =>
  `<div class="${off ? 'off' : ''}"><i></i><strong>${t}</strong><p>${b}</p></div>`).join('')}</div>`;

const ladder = (rows) => `<div class="sl-lad" data-seq>${rows.map(([a, b]) =>
  `<div><p class="bad">${a}</p><span>&rarr;</span><p class="good">${b}</p></div>`).join('')}</div>`;

/** The slides, in order. Each is plain HTML — readable even with no JS. */
const SLIDES = [
  { eye: 'Munimo Workforce',
    h: 'Every outsourced shift. <em>Proven.</em>',
    sub: 'Face and GPS proof that a man was where the contract says, and pay that follows that proof — on trains, at stations, on the track and on site.',
    body: `<div class="sl-trio" data-seq>
      <div><b class="em">Face</b><p>Checked in and out, with a blink test</p><small>Matched on the phone, so no signal is needed</small></div>
      <div><b class="em">GPS</b><p>Inside the site fence, or at the right station</p><small>A mock-location app is detected and flagged</small></div>
      <div><b class="em">Pay</b><p>Slips, bank file, EPF and ESI from proven duty</p><small>Anything in doubt waits for a person to look</small></div>
    </div>`,
    note: 'Running today at Adidev Commercials · a product of Awdhex Technologies' },

  { eye: 'The ask', gold: true,
    h: 'The railway has been asking for this since 2017',
    sub: 'Not a problem we invented. A requirement that has been written down, circular after circular, for nine years.',
    body: `<div class="sl-time" data-seq>
      <div><i></i><b>2017</b><p>Tender standard: GPRS biometric attendance for on-board housekeeping</p></div>
      <div><i></i><b>2018</b><p>Shramik Kalyan portal: contractors upload what they paid</p></div>
      <div><i></i><b>2020</b><p>Railway Board: link attendance to contractor payments</p></div>
      <div><i></i><b>2023</b><p>Board to every General Manager: attendance at the starting station</p></div>
      <div><i></i><b>2024</b><p>Station staff: biometric or face attendance</p></div>
      <div><i></i><b>2026</b><p>Keymen and patrolmen: GPS monitoring on patrol</p></div>
    </div>`,
    note: 'Railway Board letters of 29.06.2020 and 20.09.2023 · Ministry of Railways · press reports, 2024 and 2026' },

  { eye: 'The size of it', gold: true,
    h: 'Outsourced work is large, and its wages are hard to check',
    body: `<div class="sl-trio" data-seq>
      <div><b>~1,080</b><p>pairs of trains with on-board housekeeping</p><small>Rajya Sabha answer, July 2019</small></div>
      <div><b>3,81,831</b><p>contract workers registered on Shramik Kalyan</p><small>Ministry of Railways, March 2021 · 15,812 contractors</small></div>
      <div><b class="em">105 of 463</b><p>audited contracts paid minimum wages correctly</p><small>CAG Report No. 19 of 2018, before the portal existed</small></div>
    </div>`,
    note: 'Public sources. Figures as published on the dates shown.' },

  { eye: 'The gap', gold: true,
    h: 'Today, proof stops at the starting station',
    body: rail([
      ['Start station', 'Biometric machine, where one is provided'],
      ['On the train', 'Not covered', 1],
      ['Destination', 'Not covered', 1],
      ['Pay', 'The contractor&rsquo;s own wage sheet', 1],
    ], true),
    sub: '<b style="color:var(--gold)">Left early? Reached the destination? Paid for what he worked?</b> Nobody can see it.',
    note: 'Munimo Workforce · munimo.online' },

  { eye: 'How it works',
    h: 'Proof follows him to the destination, and into his pay',
    body: rail([
      ['Start station', 'Face with a blink test, GPS matched to the station, the train number'],
      ['On the train', 'Kept on the phone with or without signal; a GPS trail where there is one'],
      ['Destination', 'Face and GPS at the destination, or in the yard the train was moved to'],
      ['Pay', 'Paid for proven duty only; anything in doubt waits for a person'],
    ]),
    sub: '<b style="color:var(--em2)">Two faces, two positions, one timetable.</b> That is a duty, proven.',
    note: 'Station, track and site duties follow the same idea, each with its own checks' },

  { eye: 'What exists today', gold: true,
    h: 'What the market sells, and what it leaves out',
    body: `<div class="sl-mkt" data-seq>
      <div><strong>Face-attendance kiosks</strong><em>e.g. Truein</em><p>For contract and multi-site workforces</p><b>₹290–390 per worker a year, plus ₹69,000 a year</b></div>
      <div><strong>Field-staff GPS apps</strong><em>e.g. Unolo, TrackoField</em><p>For sales and service teams on the road</p><b>About ₹250–300 per user a month</b></div>
      <div class="us"><strong>Munimo Workforce</strong><em>One system</em><p>Attendance, field tracking and payroll in one place</p><b>From ₹39 per worker a month, nothing to buy</b></div>
    </div>`,
    note: 'Vendors&rsquo; published pages and listings, October 2026. Prices as published; quotes may differ.' },

  { eye: 'Integrity',
    h: 'Built to be hard to fake',
    sub: 'Every one of these is running in the app today, not on a roadmap.',
    body: six([
      [ic.pin, 'Fake GPS is caught', 'A mock-location app is detected on the phone'],
      [ic.key, 'One man, one phone', 'A hardware key ties his code to his handset'],
      [ic.eye, 'A live face, not a photo', 'A blink test at every face check'],
      [ic.users, 'Two phones, one code', 'Code-sharing is recorded and flagged'],
      [ic.face, 'Matched on the phone', 'Face match needs no network, so there are no excuses'],
      [ic.warn, 'Fair to the worker', 'If the phone shuts the app, that is proven, not blamed on him'],
    ]),
    note: 'All of these run at Adidev Commercials today.' },

  { eye: 'For a contractor',
    h: 'What changes on the ground',
    body: ladder([
      ['Calling around to find who is on duty', 'A live board of every man and every unit'],
      ['A signature at the start, nothing after', 'Face and GPS at both ends of every duty'],
      ['Days counted by hand at month end', 'Slips, bank file, EPF and ESI from proven duty'],
      ['Arguments over who worked what', 'His face, the time and the place, on record'],
      ['A face machine bought for every site', 'The supervisor&rsquo;s phone is the kiosk'],
    ]),
    note: 'Munimo Workforce · munimo.online' },

  { eye: 'Beyond the railway',
    h: 'Any team you cannot see, proven the same way',
    body: six([
      [ic.key, 'Security guards', 'Face at the post, random checks in the shift, his round on the map'],
      [ic.home, 'Housekeeping and facilities', 'Hospitals, malls, offices: face in and out, inside the fence'],
      [ic.gear, 'Factories and warehouses', 'The supervisor&rsquo;s phone is the gate; contract labour needs no phone'],
      [ic.route, 'Sanitation and city crews', 'The beat he walked, as a trail on the map, ward by ward'],
      [ic.tower, 'Field technicians', 'Towers, solar, lifts: proof he reached site, and how long he stayed'],
      [ic.users, 'Tea gardens and plantations', 'Muster by face at the garden, offline, in the language he speaks'],
    ]),
    note: 'Illustrative uses, built from features already live. Each workforce is set up with its own sites, rules and rates.' },

  { eye: 'Getting started',
    h: 'How a contract goes live',
    body: `<div class="sl-flow" data-seq>
      <div><i>1</i><strong>Set up the contract</strong><p>Sites, trains, rates and the contract&rsquo;s own rules</p></div>
      <div><i>2</i><strong>Enrol every man</strong><p>Face and details, taken by his supervisor on the spot</p></div>
      <div><i>3</i><strong>Run beside the old way</strong><p>One pay cycle side by side, and compare</p></div>
      <div><i>4</i><strong>Pay from proven duty</strong><p>Slips, bank file and site sheets, out of the system</p></div>
    </div>`,
    sub: 'Each contract keeps its own rules: check windows, pay rates, the site&rsquo;s closing hour, what counts as a short day.',
    note: 'How long each step takes depends on the size of the contract.' },

  { eye: 'In their words',
    h: '',
    body: `<div class="sl-quote" data-seq>
      <p>&ldquo;Whatever we asked for, it was in the app in days, not months. They understood our work before they wrote a line of it.&rdquo;</p>
      <footer>Niptu Paul · Adidev Commercials</footer>
    </div>`,
    note: 'Running their railway contract workforce on Munimo today.' },

  { eye: 'Munimo Workforce',
    h: 'Put one contract on it, and compare the month',
    sub: 'Nothing to buy, no machine per site. We set up your sites, rates and rules, and your supervisors are shown how to use it.',
    body: `<div class="sl-trio" data-seq>
      <div><b class="em">₹39</b><p>per worker a month, to start</p><small>Minimum 25 workers. Annual billing costs two months less.</small></div>
      <div><b class="em">3 yrs</b><p>of maintenance, included</p><small>Not fifteen per cent of the licence, every year</small></div>
      <div><b class="em">₹0</b><p>of hardware to buy</p><small>The supervisor&rsquo;s phone is the kiosk</small></div>
    </div>`,
    note: 'munimo.online · a product of Awdhex Technologies' },
];

export function deck({ secs = 7 } = {}) {
  return `
<div class="deck edge" data-deck="${secs}" role="region" aria-roledescription="carousel" aria-label="How Munimo Workforce proves a shift">
  <div class="deck-stage">
    ${SLIDES.map((s, n) => `
    <article class="sl${n === 0 ? ' on' : ''}" aria-hidden="${n === 0 ? 'false' : 'true'}" aria-label="Slide ${n + 1} of ${SLIDES.length}">
      ${s.eye ? `<p class="sl-eye${s.gold ? ' gold' : ''}">${s.eye}</p>` : ''}
      ${s.h ? `<h3>${s.h}</h3>` : ''}
      ${s.sub ? `<p class="sl-sub">${s.sub}</p>` : ''}
      <div class="sl-body">${s.body || ''}</div>
      ${s.note ? `<p class="sl-note">${s.note}</p>` : ''}
    </article>`).join('')}
  </div>
  <div class="deck-bar">
    <div class="deck-seg"></div>
    <span class="deck-ct">1 / ${SLIDES.length}</span>
    <div class="deck-nav">
      <button type="button" class="deck-prev" aria-label="Previous slide"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <button type="button" class="deck-next" aria-label="Next slide"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
    </div>
  </div>
</div>`;
}

/* ── video with no player furniture ──────────────────────────────────────── */

const SOUND = `<button type="button" class="vsound" aria-pressed="false">
  <svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg><b>Sound off</b></button>`;

const HOLD = `<div class="vhold" style="background-image:var(--still)"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></div>`;

/** The vertical film, held in a phone. */
export function filmPhone(id, poster = '/assets/film-vert.webp') {
  return `
<div class="vid-wrap" data-film="${esc(id)}" style="--still:url('${esc(poster)}')">
  <span class="vglow" aria-hidden="true"></span>
  <div class="vphone">
    <div class="vphone-scr" style="background-image:url('${esc(poster)}')">
      <span class="vphone-notch" aria-hidden="true"></span>
      <iframe title="Munimo Workforce in use" allow="autoplay; encrypted-media" loading="lazy" tabindex="-1"></iframe>
      ${HOLD}
      <span class="vshield" aria-hidden="true"></span>
    </div>
  </div>
  ${SOUND}
</div>`;
}

/** The wide film, on a dark table. */
export function filmWide(id, poster = '/assets/film-wide.webp') {
  return `
<div class="vid-wrap vcine" data-film="${esc(id)}" style="--still:url('${esc(poster)}');background-image:url('${esc(poster)}')">
  <iframe title="Munimo Workforce, shown end to end" allow="autoplay; encrypted-media" loading="lazy" tabindex="-1"></iframe>
  ${HOLD}
  <span class="vshield" aria-hidden="true"></span>
  ${SOUND}
</div>`;
}


/* ── the price engine ────────────────────────────────────────────────────── */

const tick = '<svg viewBox="0 0 24 24"><path d="M20 7 10 17l-5-5"/></svg>';

/** Digits that roll, like a meter. Rendered server-side at the opening
    figure, so the panel reads correctly before any script runs. */
function odo(n) {
  return `<span class="odo" data-shape="">${String(Math.round(n)).split('').map((ch) =>
    /\d/.test(ch)
      ? `<i><u style="transform:translateY(-${+ch}em)">${'0123456789'.split('').map((d) => `<b>${d}</b>`).join('')}</u></i>`
      : `<i class="sep">${ch}</i>`).join('')}</span>`;
}

/**
 * The dial, the quote panel, the four slabs and the market comparison.
 * Every figure comes from pricing-data.mjs, which is the rate card.
 */
export function priceEngine({ start = 180 } = {}) {
  const cfg = {
    gst: CARD.gst,
    slabs: SLABS.map((s) => ({
      id: s.id, name: s.name, max: s.max === Infinity ? null : s.max,
      setup: s.setup, setupDedicated: s.setupDedicated,
      monthFloor: s.monthFloor, monthRate: s.monthRate,
      yearFloor: s.yearFloor, yearRate: s.yearRate,
      licence: s.licence, amc: s.amc,
    })),
    market: MARKET.stack.map((m) => ({
      pwy: m.perWorkerYear || 0, ply: m.platformYear || 0, pwm: m.perWorkerMonth || 0,
    })),
  };
  const q0 = quote(start);

  const cards = SLABS.map((s) => `
  <div class="pc lift spot${s.popular ? ' hot' : ''}" id="pc-${s.id}" data-slab="${s.id}">
    ${s.popular ? '<span class="pc-flag">Most taken</span>' : ''}
    <span class="pc-mine">Your slab</span>
    <h3>${s.name}</h3>
    <p class="pc-band">${s.band}</p>
    <div class="pc-fig">
      <span class="cur">₹</span><span class="pc-amt">${odo(s.yearFloor)}</span>
      <span class="unit pc-unit">a year<br>minimum</span>
    </div>
    <p class="pc-rate">
      <b class="pc-per">${money(s.yearRate)}</b> per worker a month,
      <span class="pc-inclw">${s.yearIncl.toLocaleString('en-IN')} included</span>
    </p>
    <dl class="pc-dl">
      <div><dt>One-time setup</dt><dd>${money(s.setup)} <small>cloud</small></dd></div>
      <div><dt>Dedicated server</dt><dd>${money(s.setupDedicated)} <small>one-time</small></dd></div>
      <div><dt>Monthly advance</dt><dd>${money(s.monthFloor)} <small>min, then ${money(s.monthRate)}/worker</small></dd></div>
      <div><dt>Own the licence</dt><dd>${money(s.licence)} <small>+ ${money(s.amc)}/yr from Yr 2</small></dd></div>
    </dl>
    <a class="btn ${s.popular ? 'btn-em' : 'btn-ghost'}" href="/contact.html" style="justify-content:center">Get this quoted</a>
  </div>`).join('');

  const rows = [
    ...MARKET.stack.map((s) => `
    <div class="vsr" ${s.perWorkerYear ? `data-pwy="${s.perWorkerYear}"` : ''} ${s.platformYear ? `data-ply="${s.platformYear}"` : ''} ${s.perWorkerMonth ? `data-pwm="${s.perWorkerMonth}"` : ''}>
      <span class="vsr-n">${s.name}<small>${s.eg}</small></span>
      <span class="vsr-t"><i class="vsr-b"></i></span>
      <span class="vsr-v">&mdash;</span>
    </div>`),
    `<div class="vsr us">
      <span class="vsr-n">Munimo Workforce<small>Both, with muster rolls and payroll</small></span>
      <span class="vsr-t"><i class="vsr-b"></i></span>
      <span class="vsr-v">&mdash;</span>
    </div>`,
  ].join('');

  return `
<div data-prx='${JSON.stringify(cfg).replace(/'/g, '&#39;')}'>

  <div class="dial">
    <div>
      <span class="dial-lab">How many workers</span>
      <div class="dial-val"><span id="prx-count">${start}</span><span>on duty in a month</span></div>
      <input id="prx-range" type="range" min="25" max="1500" step="5" value="${start}"
             aria-label="Number of workers" style="--fill:${((start - 25) / 1475 * 100).toFixed(1)}%">
      <div class="dial-ticks"><span>25</span><span>250</span><span>500</span><span>1,000</span><span>1,500+</span></div>
    </div>
    <div class="sw sw3" role="group" aria-label="How you pay">
      <button type="button" data-bill="year" class="on">Yearly <b>best</b></button>
      <button type="button" data-bill="month">Monthly</button>
      <button type="button" data-bill="lic">Own it</button>
    </div>
  </div>

  <div class="quote edge" id="prx-quote">
    <div class="quote-main">
      <p class="quote-lab"><span id="q-slab">${q0.slab.name}</span> slab &middot; <span id="q-mode">yearly advance</span></p>
      <div class="quote-fig">
        <span class="cur">₹</span>${odo(q0.yearly)}
        <span class="quote-unit" id="q-unit">a year</span>
      </div>
      <p class="quote-sub" id="q-sub">
        ${money(q0.yearlyPerWorker)} per worker a month &middot; ${money(q0.yearlyPerMonth)} a month equivalent
      </p>
    </div>
    <div class="quote-side">
      <div class="qrow"><span>One-time setup</span><b id="q-setup">${money(q0.setup)}</b></div>
      <div class="qrow"><span>First-year total</span><b id="q-first">${money(q0.setup + q0.yearly)}</b></div>
      <div class="qrow"><span>Plus 18% GST</span><b id="q-gst">${money((q0.setup + q0.yearly) * 0.18)}</b></div>
      <div class="qrow tot"><span>Payable, year one</span><b id="q-pay">${money((q0.setup + q0.yearly) * 1.18)}</b></div>
      <p class="qnote" id="q-note">Yearly advance saves ${money(q0.saveYearly)} against paying monthly.</p>
    </div>
  </div>

  <div class="prx">${cards}</div>

  <p class="prx-note" style="margin-top:16px">
    ${SLAB_POLICY} GST at ${CARD.gst}% is extra on every figure here (SAC ${CARD.sac}) and is fully
    input-tax-credit eligible for GST-registered contractors. ${CARD.schedule}, valid ${CARD.validityDays} days from issue.
  </p>

  <div class="card" style="margin-top:26px;padding:24px">
    <h3 style="margin:0 0 6px;font-size:17px;font-weight:800">What the same job costs bought in pieces</h3>
    <p class="muted" style="margin:0 0 18px;font-size:13.5px;max-width:64ch">
      Attendance is one product, field tracking is another. Move the dial and watch them add up
      against one system that already does both.
    </p>
    <div class="vs2">${rows}</div>
    <p id="prx-save" style="margin:18px 0 0;font-size:14.5px;color:var(--t)"></p>
    <p class="prx-note" style="margin-top:12px">
      ${MARKET.missing} Rates are the vendors&rsquo; own published list prices as at ${MARKET.asof};
      a negotiated quote may be lower. Shown so you can check our figure against something real.
    </p>
  </div>
</div>`;
}

/* ── ConstructPro, the combo, add-ons and the terms ──────────────────────── */

export function constructProTable() {
  return `
<div class="rate edge">
  <div class="rate-head">
    <span>Edition</span><span>Setup</span><span>Monthly</span><span>Yearly</span><span>Own it</span><span>AMC, Yr 2+</span>
  </div>
  ${CONSTRUCTPRO.map((c) => `
  <div class="rate-row">
    <span class="rate-n"><b>${c.name}</b><small>${c.band}</small></span>
    <span data-l="Setup">${money(c.setup)}</span>
    <span data-l="Monthly">${money(c.monthly)}<small> / mo</small></span>
    <span data-l="Yearly" class="good">${lakh(c.yearly)}<small> / yr</small></span>
    <span data-l="Own it">${lakh(c.licence)}</span>
    <span data-l="AMC, Yr 2+">${money(c.amc)}<small> / yr</small></span>
  </div>`).join('')}
</div>
<p class="prx-note" style="margin-top:14px">
  Yearly is two months free against the monthly rate. All figures exclude ${CARD.gst}% GST.
  On a one-time licence, Year 1 AMC is free and the AMC shown applies from Year 2.
</p>`;
}

export function comboTable() {
  return `
<p class="lead" style="margin:0 0 26px;max-width:72ch">${COMBO_RULE}</p>
<div class="rate edge">
  <div class="rate-head">
    <span>Package</span><span>Setup</span><span>Monthly</span><span>Yearly</span><span>Own it</span><span>AMC, Yr 2+</span>
  </div>
  ${COMBOS.map((c) => `
  <div class="rate-row${c.best ? ' best' : ''}">
    <span class="rate-n"><b>${c.name}${c.best ? ' <i class="rate-flag">Best value</i>' : ''}</b><small>${c.band}</small></span>
    <span data-l="Setup"><s>${money(c.setup[0])}</s> <b>${money(c.setup[1])}</b></span>
    <span data-l="Monthly"><s>${money(c.monthly[0])}</s> <b>${money(c.monthly[1])}</b><small>${c.split.m}</small></span>
    <span data-l="Yearly" class="good"><s>${lakh(c.yearly[0])}</s> <b>${lakh(c.yearly[1])}</b><small>${c.split.y}</small></span>
    <span data-l="Own it"><s>${lakh(c.licence[0])}</s> <b>${lakh(c.licence[1])}</b></span>
    <span data-l="AMC, Yr 2+"><s>${money(c.amc[0])}</s> <b>${money(c.amc[1])}</b></span>
  </div>`).join('')}
</div>`;
}

export function addonsTerms() {
  return `
<div class="grid g2" style="gap:18px;align-items:start">
  <div class="card edge" style="padding:26px">
    <p class="eyebrow gold">Add-ons</p>
    <h3 style="margin:8px 0 18px;font-size:19px;font-weight:800">Only if you need them.</h3>
    <dl class="pc-dl">
      ${ADDONS.map(([n, a, b]) => `<div><dt>${n}</dt><dd>${a} <small>${b}</small></dd></div>`).join('')}
    </dl>
    <p class="muted" style="margin:16px 0 0;font-size:12.5px">All add-on rates exclude ${CARD.gst}% GST.</p>
  </div>
  <div style="display:grid;gap:12px">
    ${TERMS.map(([t, b]) => `<div class="card lift" style="padding:18px 20px">
      <b style="font-size:14.5px;color:var(--t)">${t}</b>
      <p class="muted" style="margin:5px 0 0;font-size:13px;line-height:1.55">${b}</p>
    </div>`).join('')}
  </div>
</div>`;
}

/** What the Workforce app and dashboard actually contain, per the rate card. */
export function workforceContents() {
  return `
<div class="grid g2" style="gap:18px">
  <div class="card edge lift spot" style="padding:26px">
    <span class="ico">${ic.face}</span>
    <h3 style="margin:16px 0 4px;font-size:19px;font-weight:800">Supervisor Android app</h3>
    <p class="muted" style="margin:0 0 16px;font-size:13.5px">One phone covers a whole crew.</p>
    <ul style="list-style:none;margin:0;padding:0;display:grid;gap:9px">
      ${WF_WHAT.app.map((f) => `<li style="display:flex;gap:9px;font-size:13.5px;line-height:1.45;color:var(--t)">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;flex:none;margin-top:3px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
        <span>${f}</span></li>`).join('')}
    </ul>
  </div>
  <div class="card edge lift spot" style="padding:26px">
    <span class="ico">${icons.chart}</span>
    <h3 style="margin:16px 0 4px;font-size:19px;font-weight:800">Cloud admin dashboard</h3>
    <p class="muted" style="margin:0 0 16px;font-size:13.5px">The office side, and the month end.</p>
    <ul style="list-style:none;margin:0;padding:0;display:grid;gap:9px">
      ${WF_WHAT.dash.map((f) => `<li style="display:flex;gap:9px;font-size:13.5px;line-height:1.45;color:var(--t)">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;flex:none;margin-top:3px;fill:none;stroke:var(--em2);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
        <span>${f}</span></li>`).join('')}
    </ul>
  </div>
</div>`;
}

/** ConstructPro's feature list, for the product sections. */
export function constructProWhat() {
  return CP_WHAT;
}
