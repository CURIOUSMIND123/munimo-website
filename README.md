# munimo.online

The Munimo marketing site. Plain static HTML, served by GitHub Pages from `main`
at the custom domain in `CNAME`. No framework, no build step needed to *view* it.

## Editing the site

The `.html` files in the root are **generated** — don't edit them by hand or your
change will be overwritten. Edit the source in `build/` and regenerate:

```bash
node build/build.mjs      # rewrites every .html, plus sitemap.xml and robots.txt
git add -A && git commit -m "..." && git push
```

| I want to change… | Edit |
| --- | --- |
| Header, footer, nav, SEO tags, contact details | `build/layout.mjs` |
| Homepage | `build/page-home.mjs` |
| The four product pages | `build/page-products.mjs` |
| "Try the software" hub | `build/page-software.mjs` |
| Custom build service page | `build/page-custom.mjs` |
| Engines page | `build/page-engines.mjs` |
| Legacy vs custom page | `build/page-legacy.mjs` |
| **Clients and testimonials** | `build/page-clients.mjs` |
| Licence / subscription / AMC | `build/page-ownership.mjs` |
| Enquiry form | `build/page-contact.mjs` |
| Colours, type, components | `assets/site.css` |
| The three scroll animations | `assets/motion.css` + `assets/site.js` |

### Adding a client testimonial

Open `build/page-clients.mjs`. `TESTIMONIALS` holds named, quotable clients and
`WORK` holds engagements described without a name. When a client agrees to be
quoted, move them from `WORK` to `TESTIMONIALS` and rebuild. Only put a real
person in `TESTIMONIALS` — the entries there are published as `Review` structured
data with a star rating, and invented reviews are illegal in most of the markets
this site sells into.

## The live demos

`/web-app/` and `/lite-app/` are the **real applications**, running entirely in
the browser with no server behind them:

- `web-app/demo-data.js` — a snapshot of genuine API responses captured from a
  seeded demo company (58 operations, 226 calls).
- `web-app/demo-backend.js` — replays that snapshot and applies writes in memory,
  so a visitor who adds a payment sees balances move. Resets on reload.
- `web-app/erp-web.js` — the app's own bridge, patched at build time so its single
  `fetch` chokepoint routes to the demo backend.

To refresh the demo after the product changes, re-run the capture and rebuild
scripts against a locally running server (see the ERP repo), then commit the
regenerated `web-app/`.

Both are excluded in `robots.txt` so the app screens don't compete with the
marketing pages in search results. That does not affect the embeds.
