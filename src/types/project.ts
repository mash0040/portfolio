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
  screenshots?: Screenshot[]
}
