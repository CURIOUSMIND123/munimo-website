import { SITE, cta, faq, ORG, icons } from './layout.mjs';

const F = faq([
  ['What kind of software do you actually build?',
   'Systems a business runs on. Accounting and ERP, industry operations software, school and institution management, field and mobile apps, customer and order portals, reporting and dashboards, and integrations between things that were never meant to talk to each other. If it is internal software that your business depends on, it is our work.'],
  ['How long does a custom build take?',
   'A focused system is usually six to twelve weeks from first conversation to running. A large multi-department build runs longer and is delivered in phases, with something usable in your hands early rather than everything at the end.'],
  ['How do you price it?',
   'To your scope and your budget. We do not have a rate card, because we have never met two businesses that needed the same thing. Tell us the budget you have and what the software must do, and we will tell you what fits, what should be phase two, and what is not worth building at all.'],
  ['Do we own what you build?',
   'If you take the perpetual licence, yes — it is yours to keep and run for as long as you like. If you prefer a subscription you pay monthly instead and we host and maintain it. Either way your data is yours and exportable at any time.'],
  ['What if we need changes after it is live?',
   'Three years of maintenance is included: fixes, security updates, small changes and support. Larger new modules are quoted separately, and usually as a one-time charge rather than a new recurring fee.'],
  ['Do you take over software someone else built?',
   'Sometimes. It depends on how it was written and whether we can support it honestly. We will look at it and tell you straight whether taking it on or replacing it is the better use of your money.'],
  ['Where are you based, and does it matter?',
   'We work with clients remotely as standard, across time zones and currencies. Most of our communication is on WhatsApp and calls, which suits business owners better than a ticketing portal.'],
]);

export const meta = {
  path: 'custom-software.html',
  title: 'Custom software development for service businesses | Munimo',
  desc: 'We build custom business software on proven engines, so it takes weeks rather than years. Own the licence or subscribe. Three years of maintenance included.',
  keywords: 'custom software development company, bespoke business software development, tailor made ERP, custom business application development, software built to order, replace spreadsheets with custom software',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'Service',
      serviceType: 'Custom software development',
      provider: { '@id': SITE.domain + '/#org' },
      areaServed: 'Worldwide',
      description: 'Custom business software designed and built around an organisation\'s existing processes, delivered on proven engines with a perpetual licence or subscription option and three years of maintenance included.',
      offers: { '@type': 'Offer', description: 'Priced to scope and budget. Perpetual licence or subscription.' },
    }, F.schema],
  },
};

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.16),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:820px">
      <span class="pill rv">Custom build</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        Nobody sells the software<br>your business actually needs.
      </h1>
      <p class="lead rv rv3" style="margin-top:22px">
        So it gets approximated. You buy something close, then bend the company to fit it, and
        the gap gets filled with spreadsheets, WhatsApp groups and one person who knows how it
        really works. We build the thing that was missing instead.
      </p>
      <div class="rv rv4" style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/contact.html">Describe what you need</a>
        <a class="btn btn-ghost btn-big" href="/software.html">See what we have built</a>
      </div>
    </div>
  </div>
</section>

<section class="sec-tight sec-alt">
  <div class="wrap">
    <div class="grid g3">
      ${[
        ['Weeks, not years', 'We start on engines we already own and have in production, so your money goes into what makes your business different — not into rebuilding a ledger.'],
        ['Yours to keep', 'Take a perpetual licence and the software is yours for good. Or subscribe. It is your call, not a condition of working with us.'],
        ['Three years covered', 'Maintenance, fixes, security updates, small changes and support are included for three years after go-live. Not fifteen per cent a year.'],
      ].map(([h, p], i) => `
      <div class="rv ${i ? 'rv' + (i + 1) : ''}">
        <h3 class="h3 em">${h}</h3>
        <p class="muted" style="margin-top:10px;font-size:15px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What we build</span>
      <h2 class="h1 rv">If your business depends on it,<br>we will build it.</h2>
      <p class="lead rv rv2">
        Our work is internal software — the systems that run the company rather than the ones
        that market it. Some of it looks like the products on this site. Most of it does not.
      </p>
    </div>
    <div class="grid g3">
      ${[
        [icons.layers, 'Business and ERP systems', 'Accounting, invoicing, purchases, stock, payroll and reporting — assembled for how your business actually trades.'],
        [icons.wrench, 'Operations software', 'The system for the thing only your industry does: job cards, dispatch, service contracts, production, route plans, rentals, compliance.'],
        [icons.school, 'Institution management', 'Schools, colleges, coaching institutes, clinics and member organisations — admissions, fees, attendance, records.'],
        [icons.phone, 'Field and mobile apps', 'Offline-first apps for staff away from a desk, syncing into the main system with approval before anything posts.'],
        [icons.globe, 'Portals for your customers', 'Order status, statements, documents and payments, so your team stops answering the same question by phone.'],
        [icons.swap, 'Integrations and migrations', 'Making your existing tools talk to each other, and moving off software that has stopped serving you.'],
      ].map(([ico, h, p], i) => `
      <div class="card rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}">
        <div class="ico">${ico}</div>
        <h3 class="h4">${h}</h3>
        <p class="muted" style="margin-top:8px;font-size:14.5px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">How it runs</span>
      <h2 class="h1 rv">You will see it working<br>before you have paid for most of it.</h2>
      <p class="lead rv rv2">
        The biggest risk in custom software is spending months on a document and discovering at
        the end that everyone imagined something different. We work the other way round.
      </p>
    </div>
    <div style="max-width:860px">
      ${[
        ['We watch you work', 'A call, or a day at your office. We map what actually happens — including the workarounds people have stopped noticing. Most of what makes a build succeed is found here, not in a requirements list.'],
        ['We show you something real', 'Within weeks you are clicking a working version, not reading a specification. You tell us what is wrong while it is still cheap to change.'],
        ['We build it properly', 'Your rules on top of engines that already handle the ledger, tax, permissions and sync. Tested against your real data, not sample data.'],
        ['We move you across', 'Your existing records are imported. Old and new run together until the numbers agree and your team is comfortable. Then we switch.'],
        ['We stay for three years', 'Included maintenance, and new requirements added as they arise — usually in days for something small.'],
      ].map(([h, p], i) => `
      <div class="rv ${i < 4 ? 'rv' + (i + 1) : ''}" style="display:flex;gap:22px;padding:24px 0;border-top:1px solid var(--hair)">
        <div class="mono em" style="font-size:13px;font-weight:800;flex-shrink:0;padding-top:4px">0${i + 1}</div>
        <div>
          <h3 class="h3">${h}</h3>
          <p class="muted" style="margin-top:8px;font-size:15px">${p}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">Commercials</span>
      <h2 class="h1 rv">Tell us the budget.<br>We will be honest about it.</h2>
      <p class="lead rv rv2">
        We would rather scope something real to what you can spend than sell you a number and
        discover the gap later. If your budget does not cover what you are asking for, we will
        say so, and tell you what it does cover.
      </p>
    </div>
    <div class="grid g2" style="max-width:820px;margin:0 auto">
      <div class="card rv rv3">
        <div class="ico ico-gold">${icons.lock}</div>
        <h3 class="h3">Perpetual licence</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">
          Pay for the build, own the software. Run it as long as you like with no monthly fee.
          Host it yourself or let us host it.
        </p>
      </div>
      <div class="card rv rv4">
        <div class="ico">${icons.swap}</div>
        <h3 class="h3">Subscription</h3>
        <p class="muted" style="margin-top:9px;font-size:15px">
          A monthly fee instead of a capital outlay, with hosting, updates and support included.
          Move to a licence later if you prefer.
        </p>
      </div>
    </div>
    <p class="center faint rv rv5" style="margin-top:24px;font-size:14px;max-width:620px;margin-left:auto;margin-right:auto">
      Both include three years of maintenance. Additions to a system we have already built are
      normally a one-time charge, not a new recurring plan.
    </p>
    <div class="center rv rv6" style="margin-top:28px">
      <a class="btn btn-em btn-big" href="/contact.html">Get a price for your scope</a>
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">Before you ask.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('What is the thing nobody sells you?',
      'Describe it in your own words. If we are not the right people to build it, we will tell you that too.')}
`;
