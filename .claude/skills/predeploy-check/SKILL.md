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

- All images referenced in `src/data/projects.ts` (any `liveUrl`, `repoUrl`, screenshots) resolve. Use the Read tool to spot-check.
- `src/assets/` files referenced by components actually exist.
- `public/favicon.svg` and `public/icons.svg` are still present.

### 4. Router preview

Confirm every route declared in `src/App.tsx` has a corresponding page component that exports default. Routes:

- `/` → Home
- `/projects` → Projects
- `/projects/:slug` → ProjectDetails
- `/contact` → Contact

### 5. Report

Output a short checklist:

```
✓ lint
✓ build
✓ assets
✓ routes
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
