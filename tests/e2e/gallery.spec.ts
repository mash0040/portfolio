import { test, expect } from '@playwright/test'
import { projects } from '../routes'

for (const project of projects.filter(project => project.screenshots?.length)) {
  test(`${project.slug}: delayed gallery images preserve space and reading position`, async ({ page }, testInfo) => {
    let releaseImages!: () => void
    const imageGate = new Promise<void>(resolve => { releaseImages = resolve })
    let pendingImages = 0
    await page.route('**/*', async route => {
      if (route.request().resourceType() === 'image') {
        pendingImages++
        await imageGate
      }
      await route.continue()
    })

    try {
      await page.goto(`/projects/${project.slug}`, { waitUntil: 'domcontentloaded' })
      const gallery = page.getByRole('region', { name: /Screenshots/ })
      const images = gallery.locator('img')
      await expect(images).toHaveCount(project.screenshots!.length)
      // Force requests while holding responses, so all placeholders are tested
      // independently of the browser's lazy-loading distance heuristics.
      await images.evaluateAll(elements => elements.forEach(img => { (img as HTMLImageElement).loading = 'eager' }))
      await expect.poll(() => pendingImages).toBeGreaterThanOrEqual(project.screenshots!.length)
      await page.evaluate(() => document.fonts.ready)
      const before = await images.evaluateAll(elements => elements.map(img => ({
        width: img.getBoundingClientRect().width,
        height: img.getBoundingClientRect().height,
        loaded: (img as HTMLImageElement).naturalWidth > 0,
      })))
      for (const [index, size] of before.entries()) {
        const shot = project.screenshots![index]
        expect(size.loaded).toBe(false)
        expect(size.height).toBeGreaterThan(0)
        expect(Math.abs(size.height - size.width * shot.height / shot.width)).toBeLessThan(1)
      }

      const reading = page.getByRole('heading', { name: /What I Learned/, level: 2 })
      await reading.scrollIntoViewIfNeeded()
      const position = () => reading.evaluate(el => ({ viewport: el.getBoundingClientRect().top, document: el.getBoundingClientRect().top + scrollY }))
      const readingBefore = await position()
      releaseImages()
      await expect.poll(() => images.evaluateAll(elements => elements.every(img =>
        (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true)
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
      const after = await images.evaluateAll(elements => elements.map(img => img.getBoundingClientRect().height))
      for (const [index, height] of after.entries()) {
        expect(Math.abs(height - before[index].height)).toBeLessThan(1)
      }
      const readingAfter = await position()
      expect(Math.abs(readingAfter.document - readingBefore.document)).toBeLessThan(1)
      expect(Math.abs(readingAfter.viewport - readingBefore.viewport)).toBeLessThan(1)
      await testInfo.attach('gallery-loading-measurements', {
        body: JSON.stringify({ before, after, readingBefore, readingAfter }, null, 2),
        contentType: 'application/json',
      })
    } finally {
      releaseImages()
      await page.unrouteAll({ behavior: 'wait' })
    }
  })

  test(`${project.slug}: gallery downloads previews and lightbox retains originals`, async ({ page }) => {
    const imageRequests: string[] = []
    page.on('request', request => {
      if (request.resourceType() === 'image') imageRequests.push(request.url())
    })
    await page.goto(`/projects/${project.slug}`)
    const gallery = page.getByRole('region', { name: /Screenshots/ })
    for (const shot of project.screenshots!) {
      const image = gallery.getByRole('img', { name: shot.alt, exact: true })
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      const preview = await image.evaluate(img => ({
        url: (img as HTMLImageElement).currentSrc,
        width: (img as HTMLImageElement).naturalWidth,
      }))
      expect(preview.url).toMatch(/\.webp$/)
      expect(preview.width).toBeLessThanOrEqual(1200)
      await expect(image).toHaveAttribute('width', String(shot.width))
      await expect(image).toHaveAttribute('height', String(shot.height))
    }
    expect(imageRequests.filter(url => /\.(png|jpe?g)(?:\?|$)/i.test(url))).toEqual([])

    for (const shot of project.screenshots!) {
      const trigger = gallery.getByRole('button', { name: `Open ${shot.alt} at full size`, exact: true })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: shot.alt, exact: true })
      const original = dialog.getByRole('img', { name: shot.alt, exact: true })
      await expect.poll(() => original.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBe(shot.width)
      expect(await original.evaluate(img => (img as HTMLImageElement).naturalHeight)).toBe(shot.height)
      await expect(original).toHaveAttribute('src', /\.(png|jpe?g)$/i)
      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
    }
  })
}
