import { defineConfig } from '@playwright/test'

const remoteURL = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: remoteURL || 'http://127.0.0.1:4173',
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', testMatch: '**/e2e/*.spec.ts', use: { viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', testMatch: '**/e2e/*.spec.ts', use: { viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
    { name: 'public-links', testMatch: '**/links/*.spec.ts' },
  ],
  webServer: remoteURL ? undefined : {
    command: 'node scripts/serve-build.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 15_000,
  },
})
