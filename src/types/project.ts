export type Screenshot = {
  src: string
  width: number
  height: number
  previews: { src: string; width: number; height: number }[]
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
  /** Portrait/phone counterpart to leadImage, shown below 640px. A landscape
   * desktop capture is illegible at phone width, so mobile gets its own art
   * direction. Without this, the panel simply renders no image on mobile. */
  leadImageMobile?: string
  screenshots?: Screenshot[]
}
