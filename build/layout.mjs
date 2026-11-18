/* Shared chrome + SEO for every page. Output is plain static HTML — no runtime
   dependency on this file. Edit here, run `node build/build.mjs`, commit. */

export const SITE = {
  name: 'Munimo',                 // the product / brand people search for
  legal: 'Awdhex Technologies',   // the registered company that owns it
  brand: 'Munimo',
  domain: 'https://munimo.online',
  tagline: 'Custom software, built for how your business actually works',
  wa: '919599942248',
  waPretty: '+91 95999 42248',
  email: 'hello@munimo.online',
  udyam: 'UDYAM-BR-06-0068598',
  addr: { street: 'Jaypee Aman, Sector 151', city: 'Noida', region: 'Uttar Pradesh', pin: '201310', country: 'IN' },
};

export const NAV = [
  ['workforce.html', 'Workforce'],
  ['software.html', 'Products'],
  ['ownership.html', 'Pricing'],
  ['clients.html', 'Clients'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── <head> ─────────────────────────────────────────────────────────────── */
function head({ title, desc, path, keywords, schema, css, js }) {
  const url = SITE.domain + '/' + (path === 'index.html' ? '' : path);
  const ogimg = SITE.domain + '/assets/og-cover.png';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta name="theme-color" content="#0b1220">
<meta name="author" content="${esc(SITE.legal)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${ogimg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogimg}">

<link rel="icon" href="/assets/munimo-icon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/favicon-180.png">
<link rel="stylesheet" href="/assets/site.css">
<link rel="stylesheet" href="/assets/visual.css">
${(css || []).map((c) => `<link rel="stylesheet" href="/assets/${c}">`).join('\n')}
${(js || []).map((j) => `<script src="/assets/${j}" defer></script>`).join('\n')}
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body>`;
}

/* ── header ─────────────────────────────────────────────────────────────── */
function header(path) {
  const link = ([href, label]) =>
    `<a href="/${href}"${href === path ? ' class="on" aria-current="page"' : ''}>${label}</a>`;
  return `
<div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
<header class="hd">
  <div class="hd-in">
    <a class="logo" href="/" aria-label="${SITE.name} home">
      <img class="logo-m" src="/assets/munimo-icon.svg" alt="" width="31" height="31"> ${SITE.name}
    </a>
    <nav class="nav" aria-label="Main">${NAV.map(link).join('')}</nav>
    <div class="hd-cta">
      <a class="btn btn-ghost" href="/software.html">Try the software</a>
      <a class="btn btn-em" href="/contact.html">Get a quote</a>
      <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mnav"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav">
  ${NAV.map(link).join('\n  ')}
  <a href="/contact.html">Contact</a>
  <a class="btn btn-em" href="/contact.html">Get a quote</a>
</div>`;
}

/* ── footer ─────────────────────────────────────────────────────────────── */
function footer() {
  return `
<footer class="ft">
  <div class="wrap">
    <div class="ft-grid">
      <div>
        <a class="logo" href="/"><img class="logo-m" src="/assets/munimo-icon.svg" alt="" width="31" height="31"> ${SITE.name}</a>
        <p class="muted" style="margin-top:12px;font-size:12.5px;font-weight:700;letter-spacing:.02em;color:var(--em2)">
          A product of ${SITE.legal}
        </p>
        <p class="muted" style="margin-top:12px;font-size:14.5px;max-width:330px">
          Munimo Workforce proves every outsourced shift with face and GPS, and pays
          from that proof. ConstructPro and Lite Cashbook sit beside it. Subscribe
          monthly or yearly, or own the licence outright.
        </p>
        <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
          <a class="btn btn-wa" href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn-ghost" href="mailto:${SITE.email}">Email</a>
        </div>
      </div>
      <div>
        <h5>Products</h5>
        <a href="/workforce.html">Munimo Workforce</a>
        <a href="/cash-book.html">Lite Cashbook</a>
        <a href="/full-erp.html">ConstructPro &amp; full ERP</a>
        <a href="/school-erp.html">School ERP</a>
        <a href="/clinic-erp.html">Clinic ERP</a>
        <a href="/mobile-app.html">Mobile field app</a>
        <a href="/software.html">Try everything live</a>
      </div>
      <div>
        <h5>More</h5>
        <a href="/custom-software.html">Custom software build</a>
        <a href="/engines.html">Our engines</a>
        <a href="/legacy-vs-custom.html">Legacy vs custom</a>
        <a href="/ownership.html">Pricing</a>
      </div>
      <div>
        <h5>Company</h5>
        <a href="/clients.html">Clients</a>
        <a href="/contact.html">Contact</a>
        <a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">${SITE.waPretty}</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
    <div class="ft-btm">
      <span>&copy; <span data-year>2026</span> ${SITE.legal}. All rights reserved. Munimo is a product of ${SITE.legal}. Udyam ${SITE.udyam}.</span>
      <span>Built for businesses worldwide.</span>
    </div>
  </div>
</footer>
<a class="wafloat" href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.95 1.35-.5.05-.97.23-3.26-.68-2.74-1.08-4.5-3.86-4.63-4.04-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.27c.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.54.77 1.88.84 2.02.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.34z"/></svg>
</a>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

/* ── page builder ───────────────────────────────────────────────────────── */
export function page(meta, body) {
  return head(meta) + header(meta.path) + '\n' + body + '\n' + footer();
}

/* ── reusable blocks ────────────────────────────────────────────────────── */

/** A real screen presented in browser chrome, loaded on click. */
export function liveScreen({ src, url, poster, label, note, cls = '' }) {
  return `
<div class="browser ${cls}">
  <div class="browser-bar"><i class="r"></i><i class="y"></i><i class="g"></i>
    <span class="browser-url">
      <svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
      ${esc(url)}
    </span>
  </div>
</div>
<div class="screen screen-16x10" data-launch="${esc(src)}">
  <span class="livedot">LIVE</span>
  <iframe title="${esc(label)}" loading="lazy"></iframe>
  <div class="launch" aria-label="Start ${esc(label)}">
    ${poster ? `<img class="poster" src="${esc(poster)}" alt="${esc(label)}" loading="lazy">` : ''}
    <span class="ring"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
    <b>${esc(label)}</b>
    ${note ? `<small>${esc(note)}</small>` : ''}
  </div>
</div>`;
}

/** Closing call to action, used at the bottom of every page. */
export function cta(headline, sub) {
  return `
<section class="sec" style="background:linear-gradient(180deg,var(--ink),#0c1a14)">
  <div class="wrap center">
    <div class="glow" style="width:760px;height:400px;top:0;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(16,185,129,.16),transparent 65%)"></div>
    <div style="position:relative;z-index:1">
      <h2 class="h1 rv">${headline}</h2>
      <p class="lead rv rv2" style="margin:18px auto 0;max-width:620px">${sub}</p>
      <div class="rv rv3" style="display:flex;gap:12px;justify-content:center;margin-top:32px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="/contact.html">Tell us what you need</a>
        <a class="btn btn-ghost btn-big" href="/software.html">Try the software first</a>
      </div>
      <p class="faint rv rv4" style="margin-top:20px;font-size:13.5px">
        No sales call needed to look around. Every product on this site is live and usable right now.
      </p>
    </div>
  </div>
</section>`;
}

/** FAQ block + the matching FAQPage schema. */
export function faq(items) {
  return {
    html: `
<div class="faq">
  ${items.map(([q, a]) => `<details><summary>${q}</summary><div class="fa">${a}</div></details>`).join('\n  ')}
</div>`,
    schema: {
      '@type': 'FAQPage',
      mainEntity: items.map(([q, a]) => ({
        '@type': 'Question',
        name: q.replace(/<[^>]+>/g, ''),
        acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
      })),
    },
  };
}

export const ORG = {
  '@type': 'Organization',
  '@id': SITE.domain + '/#org',
  name: SITE.legal,               // Awdhex Technologies
  alternateName: SITE.brand,      // Munimo (the product brand)
  legalName: SITE.legal,
  url: SITE.domain,
  logo: SITE.domain + '/assets/munimo-logo.svg',
  brand: { '@type': 'Brand', name: SITE.brand },
  description: 'Awdhex Technologies is a custom software company. Its Munimo product line covers ERP, accounting, school and clinic management, and field applications, each tailored to the business and available as a perpetual licence or a subscription.',
  email: SITE.email,
  telephone: '+' + SITE.wa,
  areaServed: 'Worldwide',
  knowsAbout: ['Custom software development', 'ERP development', 'Business process automation',
               'Legacy software migration', 'School management systems', 'Clinic management systems',
               'Accounting software'],
};

export const icons = {
  ledger: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 7h7M8 11h7M8 15h4"/></svg>',
  tax: '<svg viewBox="0 0 24 24"><path d="M9 7h6M9 12h6M9 17h3"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg>',
  people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 11a3 3 0 1 0-1.5-5.6M18 20a6 6 0 0 0-3-5.2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 7 10 17l-5-5"/></svg>',
  offline: '<svg viewBox="0 0 24 24"><path d="M5 12.5a5 5 0 0 1 8.5-3.6M19 15.5A4 4 0 0 0 16 9h-.6"/><path d="M3 3l18 18"/><path d="M7 19h9"/></svg>',
  ai: '<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.4"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.6"/><path d="M11 18h2"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>',
  swap: '<svg viewBox="0 0 24 24"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',
  wrench: '<svg viewBox="0 0 24 24"><path d="M15 4a5 5 0 0 0-4.5 7.1L4 17.6 6.4 20l6.5-6.5A5 5 0 1 0 15 4z"/></svg>',
  school: '<svg viewBox="0 0 24 24"><path d="m12 3 10 5-10 5L2 8z"/><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"/></svg>',
  heartbeat: '<svg viewBox="0 0 24 24"><path d="M3 12h4l2-5 3 10 2.5-6 1.5 3h5"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  cart: '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.4 8.2-8 9.4C7.4 20.2 4 17 4 12V6z"/><path d="m9 12 2 2 4-4"/></svg>',
};

/** Before / after: the single clearest thing on the site. Red chaos on the
    left, green calm on the right, readable in two seconds on any screen. */
export function beforeAfter(bad, good) {
  const X = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  const T = '<svg viewBox="0 0 24 24"><path d="M20 7 10 17l-5-5"/></svg>';
  const li = (icon) => (t) =>
    `<div class="ba-li"><span class="ba-ico">${icon}</span><span>${t}</span></div>`;
  return `
<div class="ba">
  <div class="ba-col bad rv">
    <div class="ba-hd">
      <span class="ba-tag">Right now</span>
      <h3>${bad.head}</h3>
      <p>${bad.sub}</p>
    </div>
    <div class="ba-list">${bad.items.map(li(X)).join('')}</div>
    <div class="ba-foot">${bad.foot}</div>
  </div>
  <div class="ba-col good rv rv2">
    <div class="ba-hd">
      <span class="ba-tag">With Munimo</span>
      <h3>${good.head}</h3>
      <p>${good.sub}</p>
    </div>
    <div class="ba-list">${good.items.map(li(T)).join('')}</div>
    <div class="ba-foot">${good.foot}</div>
  </div>
</div>`;
}

/** A big, loud pain-point line. For owners who skim, not read. */
export function painGrid(items) {
  return `<div class="grid g3">${items.map(([big, small], i) => `
    <div class="card rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}">
      <p style="font-size:clamp(19px,2.3vw,24px);font-weight:800;letter-spacing:-.022em;line-height:1.28">${big}</p>
      <p class="muted" style="margin-top:11px;font-size:14.5px">${small}</p>
    </div>`).join('')}</div>`;
}
