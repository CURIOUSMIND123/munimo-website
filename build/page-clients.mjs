import { SITE, cta, faq, ORG, icons } from './layout.mjs';

/* ═══════════════════════════════════════════════════════════════════════════
   CLIENTS — edit this file to add real clients, then run `node build/build.mjs`.

   TESTIMONIALS below is the only thing you need to touch. The first entry is a
   real, named, attributable client. The rest are described by sector and
   engagement rather than with invented names and quotes — publishing made-up
   named reviews with star ratings is illegal in most markets we sell into
   (India's Consumer Protection Act, the FTC in the US, the CMA in the UK) and
   would be the first thing a serious buyer checks. As each real client agrees
   to be quoted, replace a WORK entry with a TESTIMONIAL entry and rebuild.
   ═══════════════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    quote: 'What surprised us was the speed. We would mention something on a call and it would be in the software the same week — not after a change request, a quotation and three months. It stopped feeling like buying software and started feeling like having our own team.',
    name: 'Niptu Paul',
    company: 'Adidev Commercials',
    initials: 'NP',
    rating: 5,
    detail: 'Commercial trading operation. Full business ERP with invoicing, purchases, stock and receivables, plus a cash book their site staff use from a phone.',
  },
];

/* Work we have delivered, described honestly without putting words in anyone's
   mouth. Swap any of these for a TESTIMONIAL entry once that client agrees. */
const WORK = [
  ['Construction and infrastructure', 'Multi-site contractor',
   'Site-wise cash books, labour attendance and wages from the field, subcontractor bills and retention, and profit and loss cut per project.',
   ['Full ERP', 'Field app', 'Labour + wages']],
  ['Trading and distribution', 'Wholesale distributor',
   'Purchase orders through to goods received and vendor bills, stock across locations, receivables ageing, and tax returns generated from the books.',
   ['Purchases + stock', 'Receivables', 'Tax filing']],
  ['Education', 'School and coaching institute',
   'Admissions and student records, fee structures with instalments and concessions, receipts and dues tracking, attendance and staff payroll.',
   ['Fees + receipts', 'Attendance', 'Payroll']],
  ['Professional services', 'Services firm',
   'Client billing against retainers and milestones, staff time and cost allocation, and a clear view of which engagements actually make money.',
   ['Billing', 'Cost allocation', 'Profitability']],
  ['Field operations', 'Distributed field team',
   'An offline-first phone app for staff with no reliable signal, capturing attendance, expenses and photo proof, with office approval before anything posts.',
   ['Offline app', 'Photo proof', 'Approvals']],
];

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
    '@graph': [
      ORG,
      ...TESTIMONIALS.map((t) => ({
        '@type': 'Review',
        itemReviewed: { '@type': 'Organization', name: SITE.legal, '@id': SITE.domain + '/#org' },
        reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5', worstRating: '1' },
        author: { '@type': 'Person', name: t.name, worksFor: { '@type': 'Organization', name: t.company } },
        reviewBody: t.quote,
      })),
      F.schema,
    ],
  },
};

const stars = (n) =>
  Array.from({ length: 5 }, (_, i) =>
    `<svg viewBox="0 0 24 24" style="width:19px;height:19px;fill:${i < n ? 'var(--gold)' : 'var(--hair2)'}"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`
  ).join('');

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(233,187,82,.11),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:820px">
      <span class="pill pill-gold rv">Clients</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        The businesses that<br>backed us early.
      </h1>
      <p class="lead rv rv3" style="margin-top:22px">
        We name the clients who have agreed to be named, and describe the rest by the work
        rather than inventing a quote for them. If you want to speak to someone running
        something like what you are considering, ask and we will arrange it.
      </p>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">
    ${TESTIMONIALS.map((t) => `
    <div class="rv" style="max-width:900px">
      <div class="card-flat" style="padding:clamp(28px,3.6vw,44px);border-color:var(--hair3);position:relative;overflow:hidden">
        <div class="glow" style="width:340px;height:220px;top:-90px;right:-70px;background:radial-gradient(ellipse,rgba(233,187,82,.14),transparent 66%)"></div>
        <div style="position:relative">
          <div style="display:flex;align-items:center;gap:3px;margin-bottom:20px" aria-label="${t.rating} out of 5">
            ${stars(t.rating)}
            <span class="muted" style="font-size:13.5px;font-weight:700;margin-left:9px">${t.rating}.0</span>
          </div>
          <p style="font-size:clamp(18px,2.4vw,25px);font-weight:600;line-height:1.52;letter-spacing:-.014em">&ldquo;${t.quote}&rdquo;</p>
          <div style="display:flex;align-items:center;gap:15px;margin-top:28px;padding-top:24px;border-top:1px solid var(--hair);flex-wrap:wrap">
            <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,var(--em),var(--emdk));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;color:#04110b;flex-shrink:0">${t.initials}</div>
            <div style="flex:1;min-width:180px">
              <div style="font-weight:800;font-size:17px">${t.name}</div>
              <div class="muted" style="font-size:14.5px">${t.company}</div>
            </div>
          </div>
          <p class="muted" style="margin-top:18px;font-size:14px;padding-top:16px;border-top:1px solid var(--hair)">
            <span class="em" style="font-weight:700">What we built:</span> ${t.detail}
          </p>
        </div>
      </div>
    </div>`).join('')}
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">The work</span>
      <h2 class="h1 rv">What we have actually delivered.</h2>
      <p class="lead rv rv2">
        Described by sector and scope. Where a client has not given us permission to use their
        name, we would rather tell you what the software does than make up a testimonial.
      </p>
    </div>
    <div class="grid g3">
      ${WORK.map(([sector, who, what, tags], i) => `
      <div class="card rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}">
        <span class="tag" style="border-color:rgba(18,185,129,.3);color:var(--em2)">${sector}</span>
        <h3 class="h4" style="margin-top:14px">${who}</h3>
        <p class="muted" style="margin-top:9px;font-size:14.5px">${what}</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:16px">${tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
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

<section class="sec sec-alt">
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
