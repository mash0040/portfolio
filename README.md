# Ekene's Portfolio

A personal software developer portfolio built with React, TypeScript, Tailwind CSS, and Vite.

## Live Site

[View Portfolio](https://akmasha.dev/)

## Overview

This portfolio showcases my projects, technical skills, resume, and contact information as a software developer.

The goal of the project is to present my work clearly while demonstrating practical frontend development skills, reusable component structure, and responsive design. 

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Cloudflare Pages

## Features

- Responsive multi-page layout
- Home, About, Projects, Project Details, and Contact pages
- Reusable components for layout, navigation, footer, and project cards
- Dynamic project detail pages using React Router
- Custom favicon and page title
- Deployed with Cloudflare Pages

## Local checks and CI

Use Node.js 22.14 or later within the Node 22 release line and npm.

```sh
npm ci
npx playwright install chromium
npm run check
```

`npm run check` runs lint, TypeScript/build checks, unit tests, browser
regressions, and public-link validation. It stops at the first failing stage.

To run individual test suites after a fresh build:

```sh
npm run build
npm run test:unit
npm run test:e2e
npm run test:links
npx playwright show-report
```

Playwright automatically runs browser tests in Chromium at desktop and mobile screen sizes. Tests use the production build in dist, so run npm run build after source changes. Public links that cannot be verified automatically require a manual check.

GitHub Actions runs on pull requests, pushes to `main`, and manual dispatch.
To block merges, configure branch protection to require both
`Build, lint and regression` and `Public links`.

Cloudflare Pages deploys from `main` independently of these checks. Passing
local tests does not verify Cloudflare routing or deployment settings.

## Development Focus

While building this portfolio, I focused on:

- Clean React + TypeScript structure
- Reusable UI components
- Responsive design
- Clear project case studies
- Simple deployment workflow

## Author

**Ekene Masha**

- Portfolio: [https://akmasha.dev/]
- GitHub: [https://github.com/mash0040]
- LinkedIn: [www.linkedin.com/in/mashaak]

## License

This project is licensed under the [MIT License](LICENSE).

Anyone is free to use this website as inspiration for their own projects.
