/* ═══════════════════════════════════════════════════════════════════════════
   Real clients. Used by the homepage marquee, the testimonial cards and the
   Review structured data on /clients.html. Add a new one here and it appears
   everywhere. Only put real, consenting clients in this file.
   ═══════════════════════════════════════════════════════════════════════════ */

export const CLIENTS = [
  {
    name: 'Niptu Paul',
    role: 'Adidev Commercials',
    sector: 'Trading',
    initials: 'NP',
    tint: 'linear-gradient(135deg,#12b981,#0a5c40)',
    rating: 5,
    quote: 'What surprised us was the speed. We would mention something on a call and it would be in the software the same week — not after a change request, a quotation and three months. It stopped feeling like buying software and started feeling like having our own team.',
    built: 'Full business ERP with invoicing, purchases, stock and receivables, plus a cash book their site staff use from a phone.',
    feature: true,
  },
  {
    name: 'Sangeeta Nath',
    role: 'Babyscience IVF',
    sector: 'Healthcare',
    initials: 'SN',
    tint: 'linear-gradient(135deg,#a78bfa,#5b3fa8)',
    rating: 5,
    quote: 'They took on the whole clinic, not just the accounts. Patient bookings and doctor appointments sit in the same system as our payroll, inventory and finance — so nothing has to be typed twice and the day actually reconciles at the end of it.',
    built: 'Full-scale ERP: patient booking and doctor appointments, HR and payroll, inventory, expenses, and complete accounting and finance.',
  },
  {
    name: 'Arun Kumar Singh',
    role: 'Paramount Academy',
    sector: 'Education',
    initials: 'AS',
    tint: 'linear-gradient(135deg,#60a5fa,#1d4ed8)',
    rating: 5,
    quote: 'Very happy. The developers understood our requirements properly — not just the school side, but how any business actually needs to run. That knowledge is what made the difference.',
    built: 'School management: admissions and student records, attendance, fee collection with receipts and dues, and staff payroll.',
  },
  {
    name: 'Pankaj Sharma',
    role: 'REZI HR Services',
    sector: 'HR services',
    initials: 'PS',
    tint: 'linear-gradient(135deg,#e9bb52,#a97c12)',
    rating: 5,
    quote: 'It was the thought process that stood out. The team gave real input instead of just building what I asked for, and what we ended up with was better than what I had described.',
    built: 'Operations and HR service delivery system, built around how the agency already worked with its clients.',
  },
  {
    name: 'Kiran',
    role: 'Kiran Retailers',
    sector: 'Retail',
    initials: 'KR',
    tint: 'linear-gradient(135deg,#34d399,#0f766e)',
    rating: 5,
    quote: 'Best service. And the three years of AMC is real — things get fixed and changed without an invoice arriving every time I ask a question.',
    built: 'Retail billing and stock with day-end reconciliation, supplier dues and margin reporting.',
  },
];

export const stars = (n) =>
  Array.from({ length: 5 }, () =>
    '<svg viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
  ).slice(0, n).join('');

/** Testimonial card. `feat` makes it a wide, larger-type card. */
export function tcard(c, feat = false) {
  return `
<article class="tc${feat ? ' tc-feat' : ''}">
  <div class="tc-stars" aria-label="${c.rating} out of 5">${stars(c.rating)}</div>
  <p class="tc-q">&ldquo;${c.quote}&rdquo;</p>
  <div class="tc-ft">
    <div class="tc-av" style="background:${c.tint}">${c.initials}</div>
    <div>
      <div class="tc-n">${c.name}</div>
      <div class="tc-c">${c.role} &middot; ${c.sector}</div>
    </div>
  </div>
  <p class="tc-what"><b>What we built:</b> ${c.built}</p>
</article>`;
}

/** Infinite marquee of client names. Track is duplicated for a seamless loop. */
export function marquee() {
  const item = (c) => `
    <div class="marq-item"><span class="marq-dot"></span><b>${c.role}</b><span>${c.sector}</span></div>`;
  const run = CLIENTS.map(item).join('');
  return `<div class="marq"><div class="marq-track">${run}${run}</div></div>`;
}

/** Review + AggregateRating structured data from the real client list. */
export function reviewSchema(SITE) {
  return [
    {
      '@type': 'Organization',
      '@id': SITE.domain + '/#org',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (CLIENTS.reduce((s, c) => s + c.rating, 0) / CLIENTS.length).toFixed(1),
        reviewCount: String(CLIENTS.length),
        bestRating: '5',
        worstRating: '1',
      },
    },
    ...CLIENTS.map((c) => ({
      '@type': 'Review',
      itemReviewed: { '@type': 'Organization', name: SITE.legal, '@id': SITE.domain + '/#org' },
      reviewRating: { '@type': 'Rating', ratingValue: String(c.rating), bestRating: '5', worstRating: '1' },
      author: { '@type': 'Person', name: c.name, worksFor: { '@type': 'Organization', name: c.role } },
      reviewBody: c.quote,
    })),
  ];
}
