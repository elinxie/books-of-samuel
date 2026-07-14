import { expect, test } from '@playwright/test';

/**
 * Baseline smoke test for the Milestone 1 acceptance criteria: the app loads,
 * the user can enter the 1 Samuel 30 observer scene, toggles work, quality
 * modes switch, replay controls function, and no console errors occur on the
 * basic route.
 */

test('companion reader deploys and loads at /reader/', async ({ page }) => {
  const response = await page.goto('reader/');
  expect(response?.ok()).toBe(true);
  // The reader is a separate hand-built subproject (see reader/README.md) —
  // just confirm it actually shipped and renders, not its internal behavior.
  await expect(page.locator('body')).not.toBeEmpty();
});

test('landing page loads and lists entry points', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Books of Samuel' })).toBeVisible();
  await expect(page.getByTestId('enter-passage-1sam-30')).toBeVisible();

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test('user can enter the 1 Samuel 30 Ziklag observer scene', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('enter-default').click();

  await expect(page).toHaveURL(/#\/observe\/ziklag-aftermath/);
  await expect(page.getByTestId('observe-root')).toBeVisible();
  await expect(page.getByTestId('scene-title')).toHaveText(
    'Ziklag, burned — the return of the six hundred',
  );

  // The canvas should render without throwing.
  await expect(page.locator('canvas')).toBeVisible();
});

test('sources and scholarly notes toggles work', async ({ page }) => {
  await page.goto('/#/observe/ziklag-aftermath');
  await page.getByTestId('open-settings').click();
  await expect(page.getByTestId('panel-settings')).toBeVisible();

  const sourcesToggle = page.getByTestId('toggle-sources');
  await expect(sourcesToggle).toHaveAttribute('aria-pressed', 'true');
  await sourcesToggle.click();
  await expect(sourcesToggle).toHaveAttribute('aria-pressed', 'false');

  const notesToggle = page.getByTestId('toggle-notes');
  await expect(notesToggle).toHaveAttribute('aria-pressed', 'true');
  await notesToggle.click();
  await expect(notesToggle).toHaveAttribute('aria-pressed', 'false');
});

test('quality mode can be changed', async ({ page }) => {
  await page.goto('/#/observe/ziklag-aftermath');
  await page.getByTestId('open-settings').click();
  await page.getByTestId('quality-study').check();
  await expect(page.getByTestId('quality-study')).toBeChecked();
  await page.getByTestId('quality-high').check();
  await expect(page.getByTestId('quality-high')).toBeChecked();
});

test('replay controls are visible and functional', async ({ page }) => {
  await page.goto('/#/observe/ziklag-aftermath');
  await expect(page.getByTestId('timeline-controls')).toBeVisible();

  const playPause = page.getByTestId('btn-play-pause');
  await playPause.click();
  await playPause.click();

  const scrub = page.getByTestId('timeline-scrub');
  await scrub.fill('100');
  await expect(page.getByTestId('beat-caption')).toBeVisible();

  await page.getByTestId('btn-restart').click();
  await expect(scrub).toHaveValue('0');
});

test('violence advisory (ADR-009) gates first visit to Gilboa, then never reappears', async ({
  page,
}) => {
  await page.goto('/#/observe/gilboa-battle');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();
  // Not present for scenes without the depictsDeath flag.
  await page.goto('/#/observe/ziklag-aftermath');
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);

  await page.goto('/#/observe/gilboa-battle');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();
  await page.getByTestId('violence-advisory-reduced').click();
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.getByTestId('observe-root')).toBeVisible();

  // Second visit: no advisory, and the chosen mode stuck in Settings.
  await page.goto('/#/observe/gilboa-battle');
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await page.getByTestId('open-settings').click();
  await expect(page.getByTestId('violence-reduced')).toBeChecked();
});

test('no console errors on the basic observer route', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/#/observe/ziklag-aftermath');
  await page.waitForTimeout(1500);

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});
