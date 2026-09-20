import { test, expect } from '@playwright/test'
import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { routes, projects } from '../routes'
import { canonicalUrl, NOT_FOUND_META, OG_IMAGE } from '../../src/utils/seo'

for (const route of routes) {
  test(`${route.path}: direct load, metadata and internal links`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    // Parse the response separately: client-side updates must not hide missing
    // route metadata in the HTML served to crawlers.
    const html = await response!.text()
    const head = await page.evaluate(source => {
      const document = new DOMParser().parseFromString(source, 'text/html')
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      }
    }, html)
    expect(head).toEqual({ title: route.title, description: route.description, canonical: canonicalUrl(route.path), ogTitle: route.title })
    await expect(page).toHaveTitle(route.title)
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const paths = await page.locator('a[href]').evaluateAll(anchors => [...new Set(anchors
      .map(anchor => new URL((anchor as HTMLAnchorElement).href))
      .filter(url => url.origin === location.origin && !url.hash)
      .map(url => url.pathname))])
    for (const path of paths) {
      const linked = await request.get(path)
      expect.soft(linked.status(), `Internal link ${path}`).toBe(200)
    }
    expect(errors, 'Browser errors').toEqual([])
  })

  test(`${route.path}: no horizontal overflow`, async ({ page }) => {
    await page.goto(route.path)
    await page.evaluate(() => document.fonts.ready)
    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll('main *')]
        .filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
        .map(el => `${el.tagName}: ${el.textContent?.trim().slice(0, 100)}`).slice(0, 10),
    }))
    expect(overflow.content, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1)
  })

  test(`${route.path}: accessible region references`, async ({ page }) => {
    await page.goto(route.path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const ids = await page.locator('[id]').evaluateAll(elements => elements.map(el => el.id))
    expect(ids.filter(id => /\s/.test(id)), 'IDs must not contain whitespace').toEqual([])
    expect(ids.filter((id, index) => ids.indexOf(id) !== index), 'IDs must be unique').toEqual([])
    const broken = await page.locator('[aria-labelledby]').evaluateAll(elements => elements.flatMap(el =>
      (el.getAttribute('aria-labelledby') || '').split(/\s+/)
        .filter(id => !document.getElementById(id))
        .map(id => `${el.tagName}: missing #${id}`)))
    expect(broken).toEqual([])
  })

  test(`${route.path}: rendered images load`, async ({ page }) => {
    await page.goto(route.path)
    for (const image of await page.locator('img').all()) {
      if (!await image.isVisible()) continue
      await image.scrollIntoViewIfNeeded()
      // Decorative images inside an aria-hidden preview correctly use alt="".
      await expect(image).toHaveAttribute('alt')
      if (!await image.evaluate(img => Boolean(img.closest('[aria-hidden="true"]')))) {
        await expect(image).toHaveAttribute('alt', /\S/)
      }
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth),
        { message: `Image failed: ${await image.getAttribute('src')}` }).toBeGreaterThan(0)
    }
  })
}

for (const project of projects) {
  test(`${project.slug}: multiword sections have accessible names`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}`)
    const sections = [
      { heading: 'What I Improved', present: Boolean(project.improvements?.length) },
      { heading: 'What I Learned', present: Boolean(project.learnings?.length) },
    ]
    for (const { heading, present } of sections) {
      // The accessible name also includes the section number and separator.
      const region = page.getByRole('region', { name: new RegExp(heading) })
      if (present) {
        await expect(region).toHaveCount(1)
        await expect(region).toBeVisible()
        await expect(region.getByRole('heading', { level: 2, name: new RegExp(heading) })).toBeVisible()
      } else {
        await expect(region).toHaveCount(0)
      }
    }
  })
}

for (const path of ['/not-a-real-page', '/projects/not-a-real-project']) {
  test(`${path}: real HTTP 404 and recovery`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    expect(await response!.text()).toContain(`<title>${NOT_FOUND_META.title}</title>`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/not found/i)
    await page.getByRole('main').getByRole('link', { name: /projects/i }).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects.')
  })
}

test('project asset references exist, including images the resolver silently drops', async () => {
  for (const project of projects) {
    const assets = [project.leadImage, project.leadImageMobile,
      ...(project.screenshots || []).flatMap(shot => [shot.src, ...shot.previews.map(preview => preview.src)])]
    for (const asset of assets.filter((asset): asset is string => Boolean(asset))) {
      expect((await stat(resolve('src/assets', asset))).isFile(), `${project.slug}: ${asset}`).toBe(true)
    }
  }
})

test('resume, favicons and social preview assets are served as files', async ({ page, request }) => {
  await page.goto('/')
  const icons = await page.locator('link[rel~="icon"]').evaluateAll(links => links.map(link => new URL((link as HTMLLinkElement).href).pathname))
  for (const path of [...icons, new URL(OG_IMAGE).pathname]) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type'], path).toMatch(/^image\//)
  }
  const resume = await request.get('/Ekene_Masha_Resume.pdf')
  expect(resume.status()).toBe(200)
  expect(resume.headers()['content-type']).toContain('application/pdf')
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-')
})
