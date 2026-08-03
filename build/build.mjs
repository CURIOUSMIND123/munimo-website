/* Generates the static site. Run: node build/build.mjs
   Output is plain HTML committed to the repo — GitHub Pages serves it directly. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { page, SITE } from './layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const MODULES = [
  './page-home.mjs',
  './page-software.mjs',
  './page-products.mjs',
  './page-custom.mjs',
  './page-engines.mjs',
  './page-legacy.mjs',
  './page-clients.mjs',
  './page-ownership.mjs',
  './page-contact.mjs',
];

const built = [];
for (const m of MODULES) {
  const mod = await import(m);
  // a module exports either {meta, body} or {pages:[{meta, body}, …]}
  const list = mod.pages || [{ meta: mod.meta, body: mod.body }];
  for (const { meta, body } of list) {
    const html = page(meta, body);
    fs.writeFileSync(path.join(ROOT, meta.path), html);
    built.push([meta.path, html.length]);
  }
}

/* ── sitemap ── */
const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === 'index.html' ? '1.0' : p === 'software.html' || p === 'contact.html' ? '0.9' : '0.8');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${built.map(([p]) => `  <url>
    <loc>${SITE.domain}/${p === 'index.html' ? '' : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(p)}</priority>
  </url>`).join('\n')}
</urlset>
`);

/* ── robots ── */
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
`User-agent: *
Allow: /
Disallow: /web-app/
Disallow: /lite-app/

Sitemap: ${SITE.domain}/sitemap.xml
`);

console.log('Built ' + built.length + ' pages:');
for (const [p, n] of built) console.log('  ' + p.padEnd(24) + (n / 1024).toFixed(1) + ' KB');
