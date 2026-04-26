import type { Project } from "../types/project"

// Replace these placeholder entries with your real projects.
export const projects: Project[] = [
  {
    slug: "sample-project-a",
    title: "Sample Project A",
    description:
      "A personal portfolio site built to showcase projects with clean, content-first case studies.",
    tech: ["React", "TypeScript", "Tailwind", "Vite", "React Router"],
    repoUrl: "https://github.com/mash0040",
    liveUrl: "https://example.com",
    year: 2026,
    role: "Designer & Developer",
    overview:
      "A static portfolio site that puts the work first. Each project has its own case study page with consistent typography, predictable structure, and no flashy animation getting in the way of the writing.",
    problem:
      "Most junior-developer portfolios bury the actual work under heavy animation, generic templates, or one-paragraph project blurbs that don't explain anything. I wanted a site that reads more like a designer's case-study deck — each project should answer what the problem was, what I built, and what I took away from it.",
    features: [
      "Reusable ProjectCard with hover lift, focus-visible ring, and a full-card click target",
      "Dynamic /projects/:slug route with graceful handling of unknown slugs",
      "Structured case study layout: Overview, Problem, Features, Challenges, What I Learned, Links",
      "Responsive grid that scales from a single column on mobile to three columns at xl",
      "Dark, accessible color palette tuned for long-form reading",
    ],
    challenges:
      "The trickiest part was making the whole project card clickable while keeping the inline Repo and Live links independently actionable — nesting <a> tags inside <Link> isn't valid HTML. I solved it with an absolutely-positioned overlay link and lifted the action links above it with z-index so both interaction targets work without breaking semantics.",
    learnings: [
      "Designing a small system of reusable components before writing any pages kept every later change small and predictable.",
      "Constraining text width to roughly 65 characters is the single highest-leverage typography decision on a content page.",
      "Tailwind v4's marker: variant lets you style list bullets without giving up native <ul> semantics.",
      "Optional, gracefully-degrading data fields make a content-driven site easier to fill out over time — half-finished case studies still look intentional.",
    ],
  },
  {
    slug: "sample-project-b",
    title: "Sample Project B",
    description:
      "Another placeholder. This one omits the live URL and case study content so you can see how the layout degrades gracefully.",
    tech: ["Node.js", "PostgreSQL"],
    repoUrl: "https://github.com/mash0040",
    year: 2025,
  },
]
