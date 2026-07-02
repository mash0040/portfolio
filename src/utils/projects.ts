import { projects } from "../data/projects"
import type { Project } from "../types/project"

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured)
  return limit ? featured.slice(0, limit) : featured
}

export function getSelectedProjects(): Project[] {
  return projects.filter((p) => !p.featured)
}
