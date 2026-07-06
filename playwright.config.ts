import { defineConfig, devices } from '@playwright/test';

const base = '/books-of-samuel/';

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:4173${base}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          // Pinned @playwright/test may expect a newer browser build than what's
          // preinstalled in this environment; point at the preinstalled binary directly.
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
          // Software WebGL so the 3D scene renders in headless CI machines.
          args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
        },
      },
    },
  ],
  webServer: {
    command: `npm run preview -- --port 4173 --strictPort`,
    url: `http://localhost:4173${base}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
