import { projects } from "../data/projects"
import type { Project } from "../types/project"

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.slice(0, limit)
}
