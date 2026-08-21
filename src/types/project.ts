export type Screenshot = {
  src: string
  alt: string
  caption?: string
}

export type Project = {
  slug: string
  title: string
  description: string
  tech: string[]
  repoUrl?: string
  liveUrl?: string
  year?: number
  role?: string
  featured?: boolean
  overview?: string
  problem?: string
  solution?: string
  features?: string[]
  challenges?: string
  improvements?: string[]
  learnings?: string[]
  /** Landscape image used as the lead in the featured panel. Opt-in: the
   * panel renders without an image unless a project names one, so an
   * unsuitable portrait screenshot never gets cropped into the wide slot. */
  leadImage?: string
  screenshots?: Screenshot[]
}
