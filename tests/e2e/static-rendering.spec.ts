import { test, expect } from '@playwright/test'
import { routes, projects } from '../routes'

for (const failure of ['disabled JavaScript', 'failed script download']) {
  test.describe(failure, () => {
    test.use({ javaScriptEnabled: failure !== 'disabled JavaScript' })
    test.beforeEach(async ({ page }) => {
      if (failure === 'failed script download') {
        await page.route('**/*', route => route.request().resourceType() === 'script'
          ? route.abort('failed') : route.continue())
      }
    })

    for (const route of routes) {
      test(`${route.path}: useful content and navigation survive`, async ({ page }) => {
        const response = await page.goto(route.path)
        expect(response?.status()).toBe(200)
        await expect(page).toHaveTitle(route.title)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await expect(page.locator('#root main')).toBeVisible()
        // Inspect the response body too: runtime rendering must not hide an
        // empty root, and static inline styles would violate the shipped CSP.
        const body = (await response!.text()).split('<body>')[1]
        expect(body).toContain('<main')
        expect(body).not.toMatch(/\sstyle=/)
        const project = projects.find(project => route.path === `/projects/${project.slug}/`)
        if (project) {
          await expect(page.getByRole('main')).toContainText(project.description)
          if (project.overview) await expect(page.getByRole('main')).toContainText(project.overview)
          if (project.repoUrl) await expect(page.getByRole('main').locator(`a[href="${project.repoUrl}"]`).first()).toBeVisible()
        }
        // All primary links are reachable even at mobile width before hydration.
        const nav = page.getByRole('navigation', { name: 'Primary' })
        for (const name of ['Home', 'About', 'Projects', 'Contact']) {
          await expect(nav.getByRole('link', { name, exact: true })).toBeVisible()
        }
        const widths = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth])
        expect(widths[0]).toBeLessThanOrEqual(widths[1] + 1)
        await nav.getByRole('link', { name: 'Contact', exact: true }).click()
        await expect(page.getByRole('link', { name: /mashaekene1313@gmail.com/ })).toHaveAttribute('href', 'mailto:mashaekene1313@gmail.com')
        await expect(page.getByRole('link', { name: /Download resume/ })).toHaveAttribute('href', '/Ekene_Masha_Resume.pdf')
      })
    }

    test('screenshots open as full-size image links', async ({ page }) => {
      await page.goto('/projects/traineros/')
      const link = page.getByRole('region', { name: /Screenshots/ }).getByRole('link').first()
      const imageUrl = await link.getAttribute('href')
      expect(imageUrl).toMatch(/^\/assets\/.+\.(png|jpeg)$/)
      await link.click()
      expect(new URL(page.url()).pathname).toBe(imageUrl)
      await expect.poll(() => page.locator('img').evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    })

    for (const path of ['/not-a-real-page', '/projects/not-a-real-project']) {
      test(`${path}: readable 404 and recovery`, async ({ page }) => {
        expect((await page.goto(path))?.status()).toBe(404)
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found.')
        await page.getByRole('main').getByRole('link', { name: /View projects/ }).click()
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projects.')
      })
    }
  })
}

for (const route of routes) {
  test(`${route.path}: hydration preserves the rendered page`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    // Hold the bundle until we have captured the static DOM. A successful
    // hydration must keep it rather than replacing the page with a client render.
    let release!: () => void
    const bundleGate = new Promise<void>(resolve => { release = resolve })
    await page.route('**/*.js', async request => {
      await bundleGate
      await request.continue()
    })
    const navigation = page.goto(route.path)
    try {
      await page.getByRole('heading', { level: 1 }).waitFor()
      const originalMain = await page.getByRole('main').elementHandle()
      release()
      await navigation
      // The menu button is only mounted after hydration, including on desktop.
      await expect(page.getByRole('navigation', { name: 'Primary' }).locator('button')).toHaveCount(1)
      expect(await originalMain!.evaluate(main => main === document.querySelector('main'))).toBe(true)
      expect(errors).toEqual([])
    } finally {
      release()
      await navigation
    }
  })
}
