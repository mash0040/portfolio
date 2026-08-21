# Operations Context

This workspace contains deployment, monitoring, and operational notes.

## Purpose
Use this folder for anything related to running the portfolio after it is built.

## Deployment Platform
The MVP will be deployed using Cloudflare Pages.

## Deployment Process
Expected workflow:
1. Build locally
2. Commit changes to GitHub
3. Push to the main branch
4. Cloudflare Pages automatically rebuilds and deploys
5. Check the live site
6. Confirm links, routing, and assets work

## Commands
Common commands:

```bash
npm install
npm run dev
npm run build
npm run preview

```

## Routing on Cloudflare Pages

**There is deliberately no `public/_redirects` file.** The usual SPA recipe
(`/* /index.html 200`) is not used here, and adding one would be a regression.

`vite.config.ts` runs a `prerender-meta` plugin after the bundle is written. It
emits a real HTML file for every route:

```
dist/index.html                        /
dist/about/index.html                  /about
dist/projects/index.html               /projects
dist/projects/<slug>/index.html        /projects/:slug   (one per project)
dist/404.html                          everything else
```

Two things follow from that:

1. **Deep links work without a rewrite.** Cloudflare Pages resolves `/projects/traineros`
   to `dist/projects/traineros/index.html` directly, so a link pasted into a
   recruiter's inbox loads on a cold hit.
2. **Unknown URLs return a real 404.** Pages serves `404.html` with a 404 status,
   React Router reads the path and renders the styled `NotFound` page. A
   `/* /index.html 200` catch-all would return **200** for pages that do not
   exist, which is wrong for crawlers and hides broken links.

### Why the routes are prerendered at all

Link-preview crawlers (LinkedIn, Slack, Twitter, iMessage) do not execute
JavaScript. Client-side metadata updates are invisible to them, so without
prerendering every shared URL previews as the homepage. The route table lives in
`src/utils/seo.ts` and is read by both the build plugin and the `usePageMeta`
runtime hook, so the two cannot drift.

**If you add a route to `src/App.tsx`, add it to `STATIC_PAGE_META` in
`src/utils/seo.ts` too.** A route missing from that list gets no prerendered
file and will fall through to the 404 page on a hard load.

### Verify after the next deploy

```bash
curl -sI https://akmasha.dev/projects/traineros | head -1     # expect 200
curl -s  https://akmasha.dev/projects/traineros | grep -o '<title>[^<]*'
curl -sI https://akmasha.dev/not-a-real-page   | head -1      # expect 404
curl -sI https://akmasha.dev/Ekene_Masha_Resume.pdf | head -1 # expect 200 + application/pdf
```
