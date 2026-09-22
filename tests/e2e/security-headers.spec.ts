import { test, expect, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { routes } from '../routes'

type Violation = { directive: string; blocked: string; disposition: string }
type ObservedWindow = Window & { cspViolations: Violation[] }

// Only the three explicit blocks used by this file, not a Cloudflare emulator.
async function headerBlocks() {
  const source = await readFile('public/_headers', 'utf8')
  const built = await readFile('dist/_headers', 'utf8')
  expect(built).toBe(source)
  const blocks: Record<string, Record<string, string>> = {}
  let current: Record<string, string> | undefined
  for (const line of built.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    if (!/^\s/.test(line)) {
      expect(blocks[line], `Duplicate rule: ${line}`).toBeUndefined()
      current = blocks[line] = {}
    } else {
      const colon = line.indexOf(':')
      expect(colon).toBeGreaterThan(0)
      const name = line.slice(0, colon).trim().toLowerCase()
      expect(current?.[name], `Duplicate header: ${name}`).toBeUndefined()
      current![name] = line.slice(colon + 1).trim()
    }
  }
  return blocks
}

async function applyCandidate(page: Page, enforce: boolean) {
  const headers = { ...(await headerBlocks())['/*'] }
  if (enforce) {
    headers['content-security-policy'] = headers['content-security-policy-report-only']
    delete headers['content-security-policy-report-only']
  }
  await page.addInitScript(() => {
    const observed = window as unknown as ObservedWindow
    observed.cspViolations = []
    document.addEventListener('securitypolicyviolation', event => {
      observed.cspViolations.push({
        directive: event.effectiveDirective,
        blocked: event.blockedURI,
        disposition: event.disposition,
      })
    })
  })
  await page.route('http://127.0.0.1:4173/**', async route => {
    if (route.request().resourceType() !== 'document') return route.continue()
    const response = await route.fetch()
    await route.fulfill({ response, headers: { ...response.headers(), ...headers } })
  })
}

async function violations(page: Page) {
  // Allow queued policy events to be delivered before reading the observations.
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  return page.evaluate(() => (window as unknown as ObservedWindow).cspViolations)
}

test.describe('candidate security policy (local response injection)', () => {
  test.skip(Boolean(process.env.PLAYWRIGHT_BASE_URL), 'Local policy simulation must not replace deployed headers')

  test('build ships report-only CSP and two independent HSTS host rules', async () => {
    const blocks = await headerBlocks()
    expect(Object.keys(blocks)).toEqual(['/*', 'https://akmasha.dev/*', 'https://www.akmasha.dev/*'])
    expect(blocks['/*']['content-security-policy-report-only']).toContain("frame-ancestors 'none'")
    expect(blocks['/*']['content-security-policy']).toBeUndefined()
    expect(blocks['/*']['strict-transport-security']).toBeUndefined()
    expect(blocks['/*']['x-frame-options']).toBe('DENY')
    for (const host of ['akmasha.dev', 'www.akmasha.dev']) {
      expect(blocks[`https://${host}/*`]).toEqual({ 'strict-transport-security': 'max-age=86400' })
    }
  })

  for (const enforce of [false, true]) {
    test.describe(enforce ? 'enforcement simulation' : 'report-only', () => {
      test.beforeEach(async ({ page }) => { await applyCandidate(page, enforce) })

      for (const path of [...routes.map(route => route.path), '/not-a-real-page']) {
        test(`${path}: scripts, fonts, styles and images work without violations`, async ({ page }) => {
          const errors: string[] = []
          page.on('pageerror', error => errors.push(error.message))
          const response = await page.goto(path)
          expect(response?.status()).toBe(path === '/not-a-real-page' ? 404 : 200)
          const heading = page.getByRole('heading', { level: 1 })
          await expect(heading).toBeVisible()
          // Check real downloaded fonts, not merely a CSS family declaration.
          expect(await page.evaluate(async () => {
            const fonts = await Promise.all([
              document.fonts.load('500 24px Fraunces'),
              document.fonts.load('400 12px "JetBrains Mono"'),
            ])
            return fonts.every(faces => faces.length > 0 && faces.every(face => face.status === 'loaded'))
          })).toBe(true)
          await expect(heading).toHaveCSS('font-variation-settings', '"opsz" 144')
          for (const img of await page.locator('img').all()) {
            if (!await img.isVisible()) continue
            await img.scrollIntoViewIfNeeded()
            await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
          }
          expect(await violations(page)).toEqual([])
          expect(errors).toEqual([])
        })
      }

      test('navigation, lightbox styles and keyboard recovery remain usable', async ({ page, isMobile }) => {
        await page.goto('/')
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter')
        await expect(page.getByRole('main')).toBeFocused()
        const nav = page.getByRole('navigation', { name: 'Primary' })
        if (isMobile) await nav.getByRole('button', { name: 'Open menu' }).click()
        await nav.getByRole('link', { name: 'Projects', exact: true }).click()
        await page.getByRole('main').locator('a[href="/projects/traineros/"]').first().click()
        const trigger = page.getByRole('region', { name: /Screenshots/ }).getByRole('button').first()
        await trigger.click()
        const dialog = page.getByRole('dialog')
        await expect(dialog).toBeVisible()
        await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
        await expect.poll(() => dialog.locator('img').evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
        await page.keyboard.press('Escape')
        await expect(dialog).toHaveCount(0)
        await expect(trigger).toBeFocused()
        await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
        expect(await violations(page)).toEqual([])
      })

      test('analytics sources are allowed (synthetic script and delivery only)', async ({ page }) => {
        let deliveries = 0
        await page.route('https://cloudflareinsights.com/cdn-cgi/rum', async route => {
          deliveries++
          await route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
        })
        await page.route('https://static.cloudflareinsights.com/beacon.min.js', route => route.fulfill({
          contentType: 'text/javascript',
          body: "fetch('https://cloudflareinsights.com/cdn-cgi/rum', { method: 'POST', body: 'synthetic-test' }).then(() => { document.body.dataset.analyticsTest = 'loaded' })",
        }))
        await page.goto('/')
        await page.addScriptTag({ url: 'https://static.cloudflareinsights.com/beacon.min.js' })
        await expect(page.locator('body')).toHaveAttribute('data-analytics-test', 'loaded')
        expect(deliveries).toBe(1)
        expect(await violations(page)).toEqual([])
      })

      test('inline script is reported, and only enforcement blocks it', async ({ page }) => {
        await page.goto('/')
        await page.evaluate(() => {
          const script = document.createElement('script')
          script.textContent = "document.body.dataset.inlineTest = 'ran'"
          document.body.append(script)
        })
        await expect.poll(() => violations(page)).toContainEqual({
          directive: 'script-src-elem', blocked: 'inline', disposition: enforce ? 'enforce' : 'report',
        })
        expect(await page.locator('body').getAttribute('data-inline-test')).toBe(enforce ? null : 'ran')
      })

      test('framing is denied even during the report-only rollout', async ({ page }) => {
        // A header-free parent ensures the child response's framing policy is
        // tested, rather than the parent's default-src blocking the iframe.
        await page.route('http://127.0.0.1:4173/frame-test', route => route.fulfill({
          contentType: 'text/html', body: '<iframe src="/"></iframe>',
        }))
        const denied = page.waitForEvent('console', {
          predicate: message => /Refused|blocked/i.test(message.text()) &&
            /X-Frame-Options|frame-ancestors/i.test(message.text()),
        })
        await page.goto('/frame-test')
        await denied
        await expect(page.frameLocator('iframe').getByRole('main')).toHaveCount(0)
      })
    })
  }
})
