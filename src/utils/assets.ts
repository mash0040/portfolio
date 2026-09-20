import type { Screenshot } from "../types/project"

// Resolves any image under src/assets/* at build time. Screenshot entries
// referencing files that don't exist yet are silently skipped, so pages
// render fine even before the actual screenshot files are dropped in.
const assetUrls = import.meta.glob(
  "../assets/**/*.{png,jpg,jpeg,webp,gif,svg}",
  { eager: true, query: "?url&no-inline", import: "default" },
) as Record<string, string>

export function resolveAsset(relPath: string): string | undefined {
  return assetUrls[`../assets/${relPath}`]
}

export type ResolvedShot = Screenshot & {
  url: string
  previewUrl: string
  previewSrcSet: string
}

/** Drops any screenshot whose file is missing from src/assets. */
export function resolveScreenshots(
  shots: Screenshot[] | undefined,
): ResolvedShot[] {
  return (shots ?? [])
    .map((shot) => {
      const url = resolveAsset(shot.src)
      if (!url) return null
      const previews = shot.previews.flatMap(preview => {
        const previewUrl = resolveAsset(preview.src)
        return previewUrl ? [{ url: previewUrl, width: preview.width }] : []
      })
      return {
        ...shot,
        url,
        previewUrl: previews[0]?.url ?? url,
        previewSrcSet: previews.map(preview => `${preview.url} ${preview.width}w`).join(", "),
      }
    })
    .filter((shot): shot is ResolvedShot => shot !== null)
}
