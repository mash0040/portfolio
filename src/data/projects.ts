import type { Project } from "../types/project"

// Replace these placeholder entries with your real projects.
export const projects: Project[] = [
  {
    slug: "sample-project-a",
    title: "Sample Project A",
    description:
      "Replace this with a real project. A short 1–2 sentence summary of what it does and why it matters.",
    tech: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/mash0040",
    liveUrl: "https://example.com",
    year: 2026,
  },
  {
    slug: "sample-project-b",
    title: "Sample Project B",
    description:
      "Another placeholder. This one omits the live URL so you can see how the link row looks with only a repo link.",
    tech: ["Node.js", "PostgreSQL"],
    repoUrl: "https://github.com/mash0040",
    year: 2025,
  },
]
