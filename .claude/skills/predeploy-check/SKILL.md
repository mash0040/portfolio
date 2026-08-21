---
name: predeploy-check
description: Run lint + type-check + production build + asset-link sanity check before pushing to Cloudflare Pages. Invoke when the user says "predeploy", "ready to deploy", "ship it", "push to prod", or before a `git push` to main.
---

# predeploy-check

Catch the "looks fine locally, fails in CF Pages build" cycle before pushing.

## Steps

Run these in order. Stop at the first failure and report.

### 1. Lint

```bash
npm run lint
```

If it fails, list the violations and ask the user whether to fix or proceed.

### 2. Production build

```bash
npm run build
```

This runs `tsc -b && vite build`. Catches type errors and build-time bundling issues.

### 3. Asset & link sanity

After build, verify:

- All images referenced in `src/data/projects.ts` (any `liveUrl`, `repoUrl`, screenshots, `leadImage`) resolve. Use the Read tool to spot-check.
- `src/assets/` files referenced by components actually exist.
- `public/favicon.svg` and `public/icons.svg` are still present.
- **Every `href` pointing at a `public/` file resolves to a real file.** A missing target does not 404 in dev: Vite's SPA fallback returns `index.html` with a 200, so a broken download silently hands the user an HTML file with the wrong extension. Check it mechanically rather than by eye:

```bash
# every /-rooted href in src/ that is not a router path, matched against public/
grep -rhoE 'href="/[^"]+\.[a-z0-9]+"' src/ | sed -E 's/href="\/(.*)"//' | sort -u |   while read -r f; do [ -f "public/$f" ] || echo "MISSING: public/$f"; done
```

  This is the check that would have caught `href="/resume.pdf"` while the file on disk was `public/Ekene_Masha_Resume.pdf`.

### 4. Router preview

Confirm every route declared in `src/App.tsx` has a corresponding page component that exports default. Routes:

- `/` → Home
- `/about` → About
- `/projects` → Projects
- `/projects/:slug` → ProjectDetails
- `/contact` → Contact

### 5. Prerendered routes and metadata

`vite.config.ts` emits one HTML file per route so that deep links resolve and
link-preview crawlers (which do not run JS) see real per-page metadata. Verify
after the build that every route produced a file with its own title:

```bash
find dist -name index.html -o -name 404.html | sort
for f in $(find dist -name index.html -o -name 404.html | sort); do
  printf '%-42s %s
' "$f" "$(grep -oE '<title>[^<]*' "$f" | sed 's/<title>//')"
done
```

Every title must be distinct. If two routes share the homepage title, the
rewriter in `vite.config.ts` stopped matching `index.html` and the build should
have thrown; investigate rather than shipping.

**A route in `src/App.tsx` that is missing from `STATIC_PAGE_META` in
`src/utils/seo.ts` gets no prerendered file** and will 404 on a cold load. Check
the two lists against each other whenever a route is added.

### 6. Report

Output a short checklist:

```
✓ lint
✓ build
✓ assets
✓ routes
✓ prerender (7 routes + 404, all titles distinct)
Ready to push.
```

Or, if anything failed:

```
✗ build — TS2322 in src/components/ProjectCard.tsx:42
Fix before pushing.
```

## Anti-patterns

- Don't auto-run `git push`. This skill is a check, not a deploy.
- Don't suppress warnings. Surface them so the user decides.
