import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: './snapshots/{testFilePath}/{arg}{ext}',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
    * Maximum time expect() should wait for the condition to be met.
    * For example in `await expect(locator).toHaveText();`
    */
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,
  /* Retry on CI only */
  // retries: 2,
  /* Opt out of parallel tests on CI. */
  // workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30 * 1000,
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. See https://playwright.dev/docs/test-webserver#adding-a-baseurl */
    baseURL: 'https://demoqa.com',
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry'
    /* Screenshots not needed now */
    //screenshot: 'only-on-failure',
    /* Storage is useful but not need in this cas*/
    // storageState: resolveAuthFile(authFilePath),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    }
  ]
});