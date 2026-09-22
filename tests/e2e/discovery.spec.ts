import { test, expect } from '@playwright/test'
import { routes } from '../routes'
import { canonicalUrl, NOT_FOUND_META, SITE_URL } from '../../src/utils/seo'

test('sitemap serves valid XML containing exactly the canonical content routes', async ({ page, request }) => {
  const response = await request.get('/sitemap.xml', { maxRedirects: 0 })
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toMatch(/^(application|text)\/xml\b/)
  const sitemap = await page.evaluate(source => {
    const document = new DOMParser().parseFromString(source, 'application/xml')
    const root = document.documentElement
    return {
      error: document.querySelector('parsererror')?.textContent ?? null,
      root: root.localName,
      namespace: root.namespaceURI,
      entries: [...root.children].map(entry => ({
        tag: entry.localName,
        children: [...entry.children].map(child => child.localName),
        url: entry.querySelector('loc')?.textContent,
      })),
    }
  }, await response.text())
  expect(sitemap.error).toBeNull()
  expect(sitemap.root).toBe('urlset')
  expect(sitemap.namespace).toBe('http://www.sitemaps.org/schemas/sitemap/0.9')
  expect(sitemap.entries).toEqual(routes.map(route => ({
    tag: 'url', children: ['loc'], url: canonicalUrl(route.path),
  })))
  const urls = sitemap.entries.map(entry => entry.url!)
  expect(new Set(urls).size).toBe(urls.length)
  expect(urls).not.toContain(canonicalUrl(NOT_FOUND_META.path))

  // Check against the served HTML, not runtime React updates. Use this test's
  // base URL so it also works against an explicitly selected deployed host.
  for (const url of urls) {
    const canonical = new URL(url)
    expect(canonical.origin).toBe(SITE_URL)
    expect(canonical.pathname).toMatch(/\/$/)
    expect(canonical.search).toBe('')
    expect(canonical.hash).toBe('')
    const content = await request.get(canonical.pathname, { maxRedirects: 0 })
    expect(content.status(), url).toBe(200)
    const declaredCanonical = await page.evaluate(source => new DOMParser()
      .parseFromString(source, 'text/html')
      .querySelector('link[rel="canonical"]')?.getAttribute('href'), await content.text())
    expect(declaredCanonical).toBe(url)
  }
})

test('robots allows crawling and references the canonical sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt', { maxRedirects: 0 })
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toMatch(/^text\/plain\b/)
  const directives = (await response.text()).split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  expect(directives).toEqual([
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ])
})
