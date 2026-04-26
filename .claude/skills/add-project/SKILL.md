---
name: add-project
description: Add a new project entry to src/data/projects.ts. Enforces the CLAUDE.md rule that every showcased project must explain problem, tools, process, challenges, and result. Invoke when the user says "add a project", "new portfolio entry", or similar.
---

# add-project

Add a fully-populated entry to `src/data/projects.ts`.

## Inputs to gather from the user

If any are missing, ask before writing:

1. **Title** — display name
2. **Slug** — kebab-case URL segment (auto-derive from title if not given, then confirm)
3. **One-line description** — 1–2 sentences for the card view
4. **Tech stack** — array of strings
5. **Repo URL** (optional)
6. **Live URL** (optional)
7. **Year** (optional, defaults to current year)
8. **Role** (optional)
9. **Problem** — what real-world need this solves *(required by CLAUDE.md)*
10. **Process** — how it was built *(required by CLAUDE.md)*
11. **Challenges** — what was hard, what was learned *(required by CLAUDE.md)*
12. **Result** — outcome, metrics, link to demo *(required by CLAUDE.md)*

## Steps

1. Read `src/types/project.ts` to confirm the `Project` shape hasn't drifted.
2. Read `src/data/projects.ts` to see existing entries and avoid slug collisions.
3. Append the new entry to the `projects` array following the existing formatting (double quotes, trailing commas, 2-space indent).
4. If sample placeholder entries (`sample-project-a`, `sample-project-b`) are still present and the user is adding their first real project, ask whether to remove them.
5. After writing, run `npm run lint` to catch any issues.

## Template

```ts
{
  slug: "<slug>",
  title: "<title>",
  description: "<one-liner>",
  tech: ["<tech1>", "<tech2>"],
  repoUrl: "<repo-url>",
  liveUrl: "<live-url>",
  year: <year>,
  role: "<role>",
  problem: "<problem>",
  process: "<process>",
  challenges: "<challenges>",
  result: "<result>",
}
```

## Anti-patterns

- Don't skip problem/process/challenges/result fields just because they're optional in the type — `CLAUDE.md` requires them on every *real* project.
- Don't invent content. If the user can't answer one of the four required fields, stop and ask.
