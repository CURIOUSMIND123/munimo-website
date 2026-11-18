import { SITE, cta, faq, ORG, icons } from './layout.mjs';
import { priceEngine, otherProducts } from './parts.mjs';

const F = faq([
  ['What does a perpetual licence actually give us?',
   'The right to keep running the software indefinitely, with no monthly fee. You can host it on your own server or let us host it. If you stop paying us anything at all after the three included maintenance years, the software carries on working — it does not phone home and it does not expire.'],
  ['And if we choose the subscription instead?',
   'You pay monthly, and hosting, updates, backups and support are part of it. It suits businesses that would rather not spend capital up front, or that want the freedom to stop. There is no minimum lock-in period beyond the current month.'],
  ['Can we start on subscription and buy the licence later?',
   'Yes, and it is a common path. We agree the licence figure at the start so there is no surprise, and a portion of what you have already paid usually counts towards it.'],
  ['What exactly is covered in the three years of maintenance?',
   'Bug fixes, security updates, compatibility updates, small changes and adjustments, and support for your team. What it does not cover is a whole new module — that is quoted separately, usually as a one-time charge rather than an increase to a recurring fee.'],
  ['What happens after the three years?',
   'You can take an annual maintenance contract at that point, or not. If you own the licence and the software is doing its job, plenty of clients simply carry on. We will not switch anything off.'],
  ['Do we get the source code?',
   'For a perpetual licence we can include a source escrow or a full source handover, depending on the engagement. It changes the price, and we will be upfront about how much. Ask if it matters to you — it is a reasonable thing to want.'],
  ['How do you charge for changes after go-live?',
   'Small changes during the maintenance period are included. Anything substantial is quoted before we start, as a one-time figure. We do not bill by the hour after the fact, because nobody can budget against that.'],
  ['Is the data ours?',
   'Entirely. It is exportable in full, with its structure intact, at any time and without asking us. We think holding data hostage is the worst practice in this industry.'],
]);

export const meta = {
  path: 'ownership.html',
  title: 'Pricing — Munimo Workforce, Lite Cashbook and ConstructPro',
  desc: 'Munimo Workforce from \u20b939 per worker a month, Lite Cashbook free for one user, ConstructPro \u20b91,499 per site. Or own the licence outright. Three years of maintenance either way.',
  css: ['saas.css'],
  js: ['saas.js'],
  keywords: 'manpower tracking software price India, contract labour attendance app pricing, perpetual licence business software, own your software outright, software subscription vs perpetual licence, free annual maintenance contract software, source code escrow custom software',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'Service', serviceType: 'Software licensing and maintenance',
      provider: { '@id': SITE.domain + '/#org' },
      description: 'Custom business software licensed either as a perpetual licence with outright ownership or as a monthly subscription, both including three years of maintenance.',
    }, F.schema],
  },
};

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.16),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:820px">
      <span class="pill rv">Commercials</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        Own it, or rent it.<br><span class="gold">Your call, not ours.</span>
      </h1>
      <p class="lead rv rv3" style="margin-top:22px">
        Most software companies decide this for you, and the answer is always the one that suits
        them. We let you pick, we tell you the figure for both, and either way three years of
        maintenance is included and your data stays yours.
      </p>
      <div class="rv rv4" style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/contact.html">Get both figures for your scope</a>
      </div>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">
    <div class="grid g2" style="max-width:900px;margin:0 auto">
      <div class="card rv" style="border-color:rgba(233,187,82,.28)">
        <div class="ico ico-gold">${icons.lock}</div>
        <h2 class="h3">Perpetual licence</h2>
        <p class="muted" style="margin-top:10px;font-size:15px">
          Pay for the build once and the software is yours. Run it for as long as you like with
          no recurring fee. Host it on your own server or let us host it for you.
        </p>
        <ul style="margin-top:20px;list-style:none;display:grid;gap:11px">
          ${['No monthly fee after the build', 'Runs indefinitely — no expiry, no phone-home',
             'Host it yourself if you want to', 'Source escrow or handover available on request',
             'Three years of maintenance included']
            .map((x) => `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--m)">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:4px;stroke:var(--gold);fill:none;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
              <span>${x}</span></li>`).join('')}
        </ul>
        <p class="faint" style="margin-top:20px;font-size:13.5px">Best when you want the cost to end.</p>
      </div>
      <div class="card rv rv2">
        <div class="ico">${icons.swap}</div>
        <h2 class="h3">Subscription</h2>
        <p class="muted" style="margin-top:10px;font-size:15px">
          A monthly fee instead of a capital outlay, with hosting, backups, updates and support
          included. Stop whenever you want — there is no lock-in beyond the current month.
        </p>
        <ul style="margin-top:20px;list-style:none;display:grid;gap:11px">
          ${['No large payment up front', 'Hosting, backups and updates included',
             'No minimum term beyond the current month', 'Convert to a perpetual licence later',
             'Three years of maintenance included']
            .map((x) => `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--m)">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:4px;stroke:var(--em2);fill:none;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"><path d="M20 7 10 17l-5-5"/></svg>
              <span>${x}</span></li>`).join('')}
        </ul>
        <p class="faint" style="margin-top:20px;font-size:13.5px">Best when you want to keep cash free.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Included either way</span>
      <h2 class="h1 rv">Three years of maintenance,<br>at no extra charge.</h2>
      <p class="lead rv rv2">
        The industry standard is an annual maintenance contract at fifteen to twenty per cent of
        the licence value, every year, starting the day you go live. We do not charge it for the
        first three years — because software that needs constant paid attention in its first
        three years was not built properly.
      </p>
    </div>
    <div class="grid g4" style="max-width:1060px;margin:0 auto">
      ${[
        [icons.wrench, 'Fixes', 'Anything that is not working as agreed gets fixed, at no cost, for three years.'],
        [icons.shield, 'Security updates', 'Patches and dependency updates applied as they are needed, not when you ask.'],
        [icons.bolt, 'Small changes', 'Adjustments, new fields, new reports and tweaks as your business shifts.'],
        [icons.people, 'Support', 'Your team talks to the people who wrote the software, on WhatsApp or a call.'],
      ].map(([ico, h, p], i) => `
      <div class="rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="ico">${ico}</div>
        <h3 class="h4">${h}</h3>
        <p class="muted" style="margin-top:7px;font-size:14px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec" id="price">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Munimo Workforce</span>
      <h2 class="h1 rv">Move the dial. The price is the price.</h2>
      <p class="lead rv rv2">
        Per worker, per month. No setup fee, no hardware, no per-site licence, and
        three years of maintenance inside every figure here.
      </p>
    </div>
    <div class="rv rv2">${priceEngine({ start: 200 })}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow">The other two, priced</span>
      <h2 class="h2 rv">Lite Cashbook and ConstructPro.</h2>
    </div>
    <div class="rv rv2">${otherProducts()}</div>

    <div class="sechead" style="margin-top:clamp(50px,7vw,86px)">
      <span class="eyebrow gold">Anything we build from scratch</span>
      <h2 class="h2 rv">A custom build is quoted to your budget.</h2>
    </div>
    <div class="rv rv2 card-flat" style="padding:clamp(24px,3vw,36px)">
      <p style="font-size:16px;margin:0">
        The three products above have a price because they already exist. Software we
        build specifically for you does not, so we do not pretend otherwise.
      </p>
      <p class="muted" style="margin:16px 0 0;font-size:15px">
        You tell us what it has to do and what you can spend. We come back with what fits
        inside that, what should wait for a second phase, and what we think is not worth
        building at all. If the budget does not cover the ask, we say so plainly instead of
        quoting it and managing the shortfall later. For businesses already running something
        of ours, additions are a one-time charge against the existing system, not a move to a
        bigger plan.
      </p>
      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <a class="btn btn-em" href="/contact.html">Tell us your scope and budget</a>
        <a class="btn btn-wa" href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">Ask on WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">Licensing, plainly.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Get both numbers before you decide.',
      'We will price the licence and the subscription for the same scope, so you can compare them properly.')}
`;
