import type { Project } from "../types/project"

// Kept free of React imports on purpose: vite.config.ts imports this module at
// build time to prerender per-route metadata, and pulling React into the Vite
// config bundle would be both slow and pointless.

export const SITE_URL = "https://akmasha.dev"
export const SITE_NAME = "Ekene Masha"
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const DEFAULT_TITLE =
  "Ekene Masha | Full-Stack Developer · React & TypeScript"
export const DEFAULT_DESCRIPTION =
  "Portfolio of Ekene Masha, a software developer building practical, reliable web apps with React, TypeScript, and Node.js."

export type PageMeta = {
  /** Leading-slashed route path; content pages end in / to match Pages directories. */
  path: string
  title: string
  description: string
  type: "website" | "article"
}

/** Absolute URL for a route, which is what Open Graph requires. */
export function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export const HOME_META: PageMeta = {
  path: "/",
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  type: "website",
}

export const ABOUT_META: PageMeta = {
  path: "/about/",
  title: `About · ${SITE_NAME}`,
  description:
    "Ekene Masha's background, technical focus, and current work across React, TypeScript, ASP.NET Core, Node.js, PostgreSQL, and Azure.",
  type: "website",
}

export const PROJECTS_META: PageMeta = {
  path: "/projects/",
  title: `Projects · ${SITE_NAME}`,
  description:
    "Full-stack projects by Ekene Masha, each written up as a case study covering the problem, the build, the challenges, and the result.",
  type: "website",
}

export const CONTACT_META: PageMeta = {
  path: "/contact/",
  title: `Contact · ${SITE_NAME}`,
  description:
    "Get in touch with Ekene Masha by email, GitHub, or LinkedIn, or download a copy of the resume.",
  type: "website",
}

/**
 * Must stay in step with the routes declared in App.tsx. Anything routed there
 * but missing here ships without its own metadata and, more importantly, has no
 * prerendered HTML file, so a hard load of that URL falls through to 404.html.
 */
export const STATIC_PAGE_META: PageMeta[] = [
  HOME_META,
  ABOUT_META,
  PROJECTS_META,
  CONTACT_META,
]

export function projectPageMeta(project: Project): PageMeta {
  return {
    path: `/projects/${project.slug}/`,
    title: `${project.title} · ${SITE_NAME}`,
    description: project.description,
    type: "article",
  }
}

/** Every route the prerender step should emit a real HTML file for. */
export function allPageMeta(projects: Project[]): PageMeta[] {
  return [...STATIC_PAGE_META, ...projects.map(projectPageMeta)]
}

export const NOT_FOUND_META: PageMeta = {
  path: "/404",
  title: `Page not found · ${SITE_NAME}`,
  description: DEFAULT_DESCRIPTION,
  type: "website",
}
