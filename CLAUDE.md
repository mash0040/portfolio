# Portfolio

Portfolio — A personal web app to showcase my projects, skills, and experience as an Entry-Level / Junior Software Developer.

## Tech Stack
- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Routing: React Router
- Deployment: Cloudflare Pages
- Version Control: Git + GitHub

## Workspaces
- /planning — Specs, architecture decisions, and feature planning
- /src — React application code
- /docs — Documentation, guides, and changelog
- /ops — Deployment, monitoring, and operational notes
- /.claude — Claude-specific agents, rules, commands, skills, and settings

## Routing

| Task | Go to | Read |
|------|-------|------|
| Understand the project | / | CLAUDE.md |
| Plan a new feature | /planning | CONTEXT.md |
| Write a feature spec | /planning/specs | planning/CONTEXT.md |
| Make an architecture decision | /planning/architecture | planning/CONTEXT.md |
| Record a decision | /planning/decisions | planning/CONTEXT.md |
| Write or edit app code | /src | CONTEXT.md |
| Build reusable components | /src/components | src/CONTEXT.md |
| Create or edit pages | /src/pages | src/CONTEXT.md |
| Add project/skills data | /src/data | src/CONTEXT.md |
| Add TypeScript types | /src/types | src/CONTEXT.md |
| Add images, resume, or screenshots | /src/assets | src/CONTEXT.md |
| Write helper functions | /src/utils | src/CONTEXT.md |
| Add or update tests | /src/tests | src/CONTEXT.md |
| Write documentation | /docs | CONTEXT.md |
| Write guides | /docs/guides | docs/CONTEXT.md |
| Update changelog | /docs/changelog | docs/CONTEXT.md |
| Handle deployment | /ops/deploy | ops/CONTEXT.md |
| Handle analytics/monitoring | /ops/monitoring | ops/CONTEXT.md |
| Add Claude rules | /.claude/rules | CLAUDE.md |
| Add Claude agents | /.claude/agents | CLAUDE.md |
| Add Claude commands | /.claude/commands | CLAUDE.md |
| Add Claude skills | /.claude/skills | CLAUDE.md |

## Project Principles
- Keep the MVP simple and shippable.
- Prioritize clear content over flashy effects.
- Use reusable components.
- Keep project data separate from UI.
- Avoid adding backend features before the portfolio needs them.
- Every showcased project should explain the problem, tools, process, challenges, and result.

## Agents

| Agent | Invoke when |
|-------|-------------|
| ui-reviewer | Reviewing any .tsx/.css changes before shipping or showing to recruiters |