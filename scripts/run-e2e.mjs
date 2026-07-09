import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const configuredBrowser = process.env.PLAYWRIGHT_CHROMIUM_PATH;
if (configuredBrowser && !existsSync(configuredBrowser)) {
  console.error(`[e2e] PLAYWRIGHT_CHROMIUM_PATH does not exist: ${configuredBrowser}`);
  process.exit(1);
}

let hasBrowser = Boolean(configuredBrowser);

if (!hasBrowser) {
  try {
    const { chromium } = require('playwright');
    const executablePath = chromium.executablePath();
    hasBrowser = existsSync(executablePath);

    if (!hasBrowser) {
      console.warn(`[e2e] Playwright Chromium is not installed at: ${executablePath}`);
    }
  } catch (error) {
    console.warn(`[e2e] Unable to resolve Playwright Chromium: ${error.message}`);
  }
}

if (!hasBrowser) {
  console.warn(
    '[e2e] Skipping browser smoke tests. Install browsers with `npx playwright install chromium` or set PLAYWRIGHT_CHROMIUM_PATH.',
  );
  process.exit(0);
}

const result = spawnSync('playwright', ['test'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
