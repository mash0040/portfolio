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
