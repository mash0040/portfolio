import { test, expect, type Page, type Locator } from '@playwright/test'
import { projects } from '../routes'

async function tabTo(page: Page, target: Locator) {
  for (let attempt = 0; attempt < 40; attempt++) {
    await page.keyboard.press('Tab')
    if (await target.evaluate(el => el === document.activeElement)) return
  }
  await expect(target, 'Target must be reachable with Tab').toBeFocused()
}

test('skip link moves keyboard focus to main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
})

test('client navigation moves focus to the new page content', async ({ page }) => {
  await page.goto('/')
  await tabTo(page, page.getByRole('link', { name: 'View projects', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect.poll(() => page.evaluate(() => {
    const active = document.activeElement
    return active?.matches('main, main h1') ?? false
  }), { message: 'New page should focus main or its heading' }).toBe(true)
  await page.keyboard.press('Tab')
  await expect.poll(() => page.getByRole('main').evaluate(el => el.contains(document.activeElement))).toBe(true)
})

for (const path of ['/', '/projects/traineros']) {
  test(`${path}: initial load and reload keep the skip link first in keyboard order`, async ({ page }) => {
    await page.goto(path)
    for (let load = 0; load < 2; load++) {
      if (load) await page.reload()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('main')).not.toBeFocused()
      await page.keyboard.press('Tab')
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
    }
  })
}

test('Back and Forward focus the destination content and allow keyboard navigation', async ({ page }) => {
  await page.goto('/')
  await tabTo(page, page.getByRole('link', { name: 'View projects', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.getByRole('main')).toBeFocused()

  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Listen to the pronunciation of Ekene' })).toBeFocused()

  await page.goForward()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect.poll(() => page.getByRole('main').evaluate(el => el.contains(document.activeElement))).toBe(true)
})

test('same-page history keeps focus on the skip-link destination', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
  await expect(page.getByRole('main')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('main')).toBeFocused()
  await page.goForward()
  await expect(page).toHaveURL(/#main-content$/)
  await expect(page.getByRole('main')).toBeFocused()
})

test.describe('mobile menu', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only menu is hidden on desktop')
    await page.goto('/')
  })

  test('Escape restores focus to the menu button', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /menu/ })
    await tabTo(page, toggle)
    await page.keyboard.press('Enter')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Tab')
    await expect(page.locator('#primary-menu').getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('choosing a route closes the menu and focuses page content', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /menu/ })
    await tabTo(page, toggle)
    await page.keyboard.press('Enter')
    await tabTo(page, page.locator('#primary-menu').getByRole('link', { name: 'About', exact: true }))
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/about\/$/)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect.poll(() => page.evaluate(() => document.activeElement?.matches('main, main h1') ?? false)).toBe(true)
  })
})

for (const project of projects.filter(project => project.screenshots?.length)) {
  test(`${project.slug}: gallery traps focus and restores each trigger`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}`)
    for (const shot of project.screenshots!) {
      const trigger = page.getByRole('button', { name: `Open ${shot.alt} at full size`, exact: true })
      await tabTo(page, trigger)
      await page.keyboard.press('Enter')
      const dialog = page.getByRole('dialog', { name: shot.alt, exact: true })
      await expect(dialog).toBeVisible()
      const close = dialog.getByRole('button', { name: 'Close screenshot' })
      await expect(close).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(close).toBeFocused()
      await page.keyboard.press('Shift+Tab')
      await expect(close).toBeFocused()
      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(close).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(trigger).toBeFocused()
    }
  })
}
