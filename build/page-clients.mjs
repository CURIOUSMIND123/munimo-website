import { SITE, cta, faq, ORG, icons } from './layout.mjs';
import { CLIENTS, tcard, reviewSchema } from './clients-data.mjs';

const F = faq([
  ['Can we speak to an existing client before deciding?',
   'Yes. Once we have had a first conversation and know what you are considering, we will put you in touch with a client running something comparable. We ask them first, so give us a few days to arrange it.'],
  ['Why are some clients not named here?',
   'Because we do not publish a client\'s name or words without their permission, and internal business systems are something many companies would rather not advertise. Where we have explicit consent, the client is named. Where we do not, we describe the work instead of inventing a quote.'],
  ['Do you have experience in our industry?',
   'Possibly, and it matters less than people expect. The engines underneath are the same across industries; what changes is the process on top, and we learn that from you during the first stage of the build. What we do not do is pretend to be specialists in a trade we have never worked in.'],
  ['How large are the businesses you work with?',
   'From owner-run companies with a handful of staff to operations spread across multiple sites and branches. The common factor is that they had outgrown spreadsheets and off-the-shelf tools, not a particular headcount.'],
]);

export const meta = {
  path: 'clients.html',
  title: 'Clients and the work we have delivered | Munimo',
  desc: 'The businesses we build software for and what we built for them — across construction, trading, education, professional services and field operations.',
  keywords: 'custom software client work, ERP case studies, business software testimonials, custom software references',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, ...reviewSchema(SITE), F.schema],
  },
};

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(233,187,82,.11),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:830px">
      <span class="pill pill-gold rv">Clients</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        Five businesses.<br>Five very different systems.
      </h1>
      <p class="lead rv rv3" style="margin-top:22px">
        Trading, healthcare, education, HR services and retail. Nothing about how they
        operate is alike &mdash; but the engines underneath every one of these builds are
        the same, which is why none of them waited a year for it.
      </p>
    </div>
    <div class="band rv rv4" style="margin-top:clamp(34px,4vw,50px)">
      <div><div class="bv gold">5.0</div><div class="bl">Average rating from named clients</div></div>
      <div><div class="bv em">5</div><div class="bl">Industries served to date</div></div>
      <div><div class="bv">3 yrs</div><div class="bl">Free AMC on every build</div></div>
      <div><div class="bv">Days</div><div class="bl">Typical turnaround on changes</div></div>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">
    <div class="tcards">
      ${CLIENTS.map((c, i) => `<div class="rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}"${c.feature ? ' style="grid-column:span 2"' : ''}>${tcard(c, c.feature)}</div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">The range</span>
      <h2 class="h1 rv">One set of engines,<br>five different businesses.</h2>
      <p class="lead rv rv2">
        A clinic booking patients and a contractor paying a crew look nothing alike on screen.
        Underneath, both need a ledger that balances, people who get paid and approvals that
        hold. That is the part we do not rebuild.
      </p>
    </div>
    <div class="grid g2" style="max-width:1000px">
      ${CLIENTS.map((c, i) => `
      <div class="card-flat rv ${i % 2 ? 'rv2' : ''}" style="display:flex;gap:16px;align-items:flex-start">
        <div class="tc-av" style="background:${c.tint};width:44px;height:44px;font-size:15px">${c.initials}</div>
        <div>
          <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
            <h3 class="h4">${c.role}</h3>
            <span class="tag">${c.sector}</span>
          </div>
          <p class="muted" style="margin-top:9px;font-size:14.5px">${c.built}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead center">
      <span class="eyebrow">What they get</span>
      <h2 class="h1 rv">The same terms, every time.</h2>
    </div>
    <div class="grid g4" style="max-width:1060px;margin:0 auto">
      ${[
        [icons.bolt, 'Changes in days', 'Small additions land in days, not release cycles.'],
        [icons.lock, 'Ownership option', 'Keep the licence outright if you want the cost to end.'],
        [icons.shield, 'Three years of AMC', 'Included after go-live. No annual percentage.'],
        [icons.people, 'The people who built it', 'You talk to the developers, not a ticket queue.'],
      ].map(([ico, h, p], i) => `
      <div class="rv ${i ? 'rv' + (i + 1) : ''}">
        <div class="ico">${ico}</div>
        <h3 class="h4">${h}</h3>
        <p class="muted" style="margin-top:7px;font-size:14px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">About references.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Want to speak to one of them?',
      'Tell us what you are considering and we will connect you with a client running something comparable.')}
`;
