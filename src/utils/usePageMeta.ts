import { useEffect } from "react"
import { canonicalUrl, OG_IMAGE, type PageMeta } from "./seo"

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.rel = "canonical"
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Keeps the document title and social tags in step with the current route.
 *
 * This is what fixes the browser tab and any crawler that does execute JS.
 * Crawlers that don't (LinkedIn, Slack, Twitter) are served the prerendered
 * HTML written by the prerender plugin in vite.config.ts instead, so the two
 * mechanisms cover different readers and have to agree. Both read their values
 * from utils/seo.ts so they cannot drift apart.
 */
export function usePageMeta({ path, title, description, type }: PageMeta) {
  useEffect(() => {
    const url = canonicalUrl(path)
    document.title = title
    upsertMeta("name", "description", description)
    upsertCanonical(url)
    upsertMeta("property", "og:url", url)
    upsertMeta("property", "og:type", type)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:image", OG_IMAGE)
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", OG_IMAGE)
  }, [path, title, description, type])
}
