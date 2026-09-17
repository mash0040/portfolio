import { test, expect } from '@playwright/test'
import { routes } from '../routes'
import { checkPublicLink } from '../../scripts/check-public-link.mjs'

test('public HTTP links resolve or report a specific verification limitation', async ({ page }, testInfo) => {
  test.setTimeout(300_000)
  const urls = new Set<string>()
  for (const route of routes) {
    await page.goto(route.path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const links = await page.locator('a[href]').evaluateAll(anchors => anchors
      .map(anchor => anchor.getAttribute('href') || '')
      .filter(href => /^https?:\/\//.test(href)))
    for (const link of links) urls.add(link)
  }
  expect(urls.size, 'Must discover public links from rendered pages').toBeGreaterThan(0)
  const results: Awaited<ReturnType<typeof checkPublicLink>>[] = []
  const ordered = [...urls].sort()
  // Bound concurrency so this small check does not hammer external services.
  for (let i = 0; i < ordered.length; i += 3) {
    results.push(...await Promise.all(ordered.slice(i, i + 3).map(url => checkPublicLink(url))))
  }
  await testInfo.attach('public-link-results', { body: JSON.stringify(results, null, 2), contentType: 'application/json' })
  for (const result of results) {
    console.log(`${result.outcome}: ${result.url} (${result.status ?? result.detail})`)
    if (result.outcome === 'inconclusive') {
      const description = `${result.url}: ${result.detail}`
      testInfo.annotations.push({ type: 'manual verification', description })
      if (process.env.CI) console.log(`::warning::${description.replace(/[\r\n]/g, ' ')}`)
    }
  }
  expect(results.filter(result => result.outcome === 'broken'), 'Broken public links').toEqual([])
})
