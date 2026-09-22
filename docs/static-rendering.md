# Static page rendering

`npm run build` renders the existing React pages into the HTML files served by
Cloudflare Pages. Readers receive page content, project links, contact details,
and resume access before JavaScript runs. No runtime server or extra framework
is needed.

## Build and browser behavior

- Vite builds the browser assets, then compiles `src/entry-server.tsx` into
  `node_modules/.cache/portfolio-prerender/`. This build-only bundle uses React's
  `renderToString` and React Router's `StaticRouter` with the same application
  components and asset URLs as the browser bundle. Only `dist/` is deployed.
- `vite.config.ts` writes the rendered body and route metadata for every entry
  from `allPageMeta(projects)`, plus `404.html`, the sitemap, and robots.txt.
  Missing root markup or metadata placeholders fail the build.
- `src/main.tsx` hydrates known pages, attaching React behavior to existing HTML.
  The Vite development server continues to use client rendering; verify static
  output using a production build.
- All unknown paths share one static 404 body with recovery links. After scripts
  load, the client renders the actual unknown URL, including the existing
  project-specific error page. It deliberately does not hydrate the generic 404
  against an unknown route, which could produce different navigation markup.
- Before hydration (including disabled JavaScript or a failed bundle download),
  mobile navigation exposes its links and screenshots link to full-size images.
  After hydration, the normal mobile menu and screenshot lightbox take over.
- Display typography and the home background use CSS rather than inline style
  attributes, preserving the enforced CSP. Image dimensions reserve screenshot
  space without an inline aspect-ratio style. The footer year is fixed at build
  time so the two bundles agree even when a reader visits after New Year.

## Maintenance and validation

Add static routes to both `App.tsx` and `STATIC_PAGE_META`; project pages are
derived from the project records. Keep browser APIs in effects or event handlers
and keep the initial render deterministic. Rebuild when content changes.

After `npm run build`, run `npm run test:e2e`. The static-rendering suite checks
every content route with disabled JavaScript and failed script downloads,
navigation to contact and resume access, full-size screenshot links, 404 recovery,
and hydration retaining the rendered DOM. Existing route, gallery, focus, image,
metadata, discovery, and CSP tests cover the enhanced UI.

For a manual check, run `node scripts/serve-build.mjs`, disable JavaScript, and
reload a case study and `/contact/` at desktop and mobile widths. Follow the
navigation, screenshot, and resume links. Re-enable JavaScript and reload to
check the menu, gallery, and keyboard focus. This local server tests generated
files and HTTP 404 responses; it does not verify Cloudflare deployment behavior.

References: [Vite SSR](https://vite.dev/guide/ssr.html),
[React hydration](https://react.dev/reference/react-dom/client/hydrateRoot), and
[StaticRouter](https://reactrouter.com/api/declarative-routers/StaticRouter).
