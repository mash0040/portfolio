// Resolves any image under src/assets/* at build time. Screenshot entries
// referencing files that don't exist yet are silently skipped, so pages
// render fine even before the actual screenshot files are dropped in.
const assetUrls = import.meta.glob(
  "../assets/**/*.{png,jpg,jpeg,webp,gif,svg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>

export function resolveAsset(relPath: string): string | undefined {
  return assetUrls[`../assets/${relPath}`]
}

export type ResolvedShot = {
  src: string
  url: string
  alt: string
  caption?: string
}

/** Drops any screenshot whose file is missing from src/assets. */
export function resolveScreenshots(
  shots: { src: string; alt: string; caption?: string }[] | undefined,
): ResolvedShot[] {
  return (shots ?? [])
    .map((shot) => {
      const url = resolveAsset(shot.src)
      return url ? { ...shot, url } : null
    })
    .filter((shot): shot is ResolvedShot => shot !== null)
}
