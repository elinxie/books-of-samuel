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

test('divided-kingdom atlas overlay loads, shows the map, and the shading toggle dismisses/restores it', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Atlas' }).click();
  await expect(page).toHaveURL(/#\/atlas/);

  await expect(page.getByTestId('atlas-map')).toBeVisible();
  await expect(page.getByTestId('atlas-point-hebron')).toBeVisible();
  await expect(page.getByTestId('atlas-point-mahanaim')).toBeVisible();
  await expect(page.getByTestId('location-dispute-mahanaim')).toBeVisible();

  const shadingToggle = page.getByTestId('atlas-toggle-shading');
  await expect(shadingToggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('region-shading-judah')).toBeVisible();
  await shadingToggle.click();
  await expect(shadingToggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByTestId('region-shading-judah')).toHaveCount(0);
  // Dismissing the shading never hides the plotted points themselves.
  await expect(page.getByTestId('atlas-point-hebron')).toBeVisible();

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test('atlas M5 phase (2 Samuel 3–4 long war + northern collapse) switches in without asserting a unified kingdom', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/#/atlas');
  await expect(page.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'true');

  await page.getByTestId('atlas-phase-m5').click();
  await expect(page.getByTestId('atlas-phase-m5')).toHaveAttribute('aria-selected', 'true');

  // Both regions still render — the headless Israel-writ region, faded and
  // labeled "no king," alongside Judah's region, unchanged.
  await expect(page.getByTestId('region-shading-israel-writ')).toBeVisible();
  await expect(page.getByTestId('region-headless-note-israel-writ')).toBeVisible();
  await expect(page.getByTestId('region-shading-judah')).toBeVisible();

  // Hebron and Mahanaim carry the M5 phase's emphasis; Mahanaim's disputed
  // identification note still surfaces.
  await expect(page.getByTestId('atlas-point-hebron')).toBeVisible();
  await expect(page.getByTestId('location-dispute-mahanaim')).toBeVisible();

  // Switching back to M4 restores the original phase cleanly.
  await page.getByTestId('atlas-phase-m4').click();
  await expect(page.getByTestId('atlas-phase-m4')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('region-shading-israel-writ')).toBeVisible();
  await expect(page.getByTestId('region-headless-note-israel-writ')).toHaveCount(0);

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
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

test('violence advisory (ADR-009) also gates hebron-gate — the second named-character-killing scene', async ({
  page,
}) => {
  // The advisory itself is scene-agnostic (driven by SceneDef.depictsDeath,
  // see the gilboa-battle test above); this confirms it actually fires for
  // hebron-gate specifically, since this scene is M5's load-bearing ADR-009
  // application and worth its own explicit coverage.
  await page.goto('/#/observe/hebron-gate');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.getByTestId('violence-advisory-standard').click();
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.getByTestId('observe-root')).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible();

  // Scrub across the whole beat timeline (the strike, the disavowal, the
  // procession, the burial, the lament, the sundown fast) checking for
  // runtime errors at each stop.
  const scrub = page.getByTestId('timeline-scrub');
  for (const t of [0, 48, 60, 76, 98, 116, 150, 168, 186, 212]) {
    await scrub.fill(String(t));
    await page.waitForTimeout(150);
  }

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test('jerusalem-stronghold (M6, depictsDeath: false) loads directly, lists its beats/viewpoints, and shows no violence advisory', async ({
  page,
}) => {
  // Unlike gilboa-battle/hebron-gate/hebron-reckoning, this scene stages no
  // death or fighting (2 Samuel 5:1-16's capture is the narrative's own
  // unrendered gap) — the ADR-009 advisory must never fire here.
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/#/observe/jerusalem-stronghold');
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.getByTestId('observe-root')).toBeVisible();
  await expect(page.getByTestId('scene-title')).toHaveText(
    'The Jebusite stronghold — Jerusalem becomes the city of David',
  );
  await expect(page.locator('canvas')).toBeVisible();

  // Scrub across the whole beat timeline (all-Israel/regnal cards, the
  // approach, the taunt, the taking's own gap, the tsinnôr card, dwelling,
  // the Millo card, greater-and-greater, Hiram's building, perceived, the
  // household card, close) checking for runtime errors at each stop.
  const scrub = page.getByTestId('timeline-scrub');
  for (const t of [0, 14, 26, 54, 80, 98, 118, 132, 144, 152, 160, 168, 176]) {
    await scrub.fill(String(t));
    await page.waitForTimeout(150);
  }
  await expect(page.getByTestId('beat-caption')).toBeVisible();

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test('violence advisory (ADR-009) also gates hebron-reckoning — the third named-character-killing scene, and closes M5', async ({
  page,
}) => {
  // hebron-reckoning is ADR-009's named-killing template's third
  // application and its first judicial one (the execution of Rechab and
  // Baanah); it is also the milestone's closing scene, so worth its own
  // explicit coverage same as hebron-gate's.
  await page.goto('/#/observe/hebron-reckoning');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.getByTestId('violence-advisory-standard').click();
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.getByTestId('observe-root')).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible();

  // Scrub across the whole beat timeline (courage fails, Mephibosheth, the
  // murder card, the arrival, the presentation, the verdict, the execution,
  // the burial, the close) checking for runtime errors at each stop.
  const scrub = page.getByTestId('timeline-scrub');
  for (const t of [0, 14, 28, 48, 66, 84, 106, 128, 150]) {
    await scrub.fill(String(t));
    await page.waitForTimeout(150);
  }

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test("violence advisory (ADR-009) also gates rephaim-valley — M6's second and last scene, standard mode", async ({
  page,
}) => {
  // rephaim-valley is the project's second battle scene after gilboa-battle,
  // deliberately lighter (no fight-stance pose buckets, no melee clash
  // cycle) but still `depictsDeath: true` since both engagements' formation
  // breaks show falls at silhouette distance in standard mode.
  await page.goto('/#/observe/rephaim-valley');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.getByTestId('violence-advisory-standard').click();
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.getByTestId('observe-root')).toBeVisible();
  await expect(page.getByTestId('scene-title')).toHaveText(
    'The Valley of Rephaim — two Philistine engagements',
  );
  await expect(page.locator('canvas')).toBeVisible();

  // Scrub across the whole beat timeline (the Philistines hear, the first
  // spread, the first inquiry, the first engagement's break window, the
  // naming, the images card, the second spread, the second inquiry, the
  // flanking march, the sound/wait beat, the second engagement's break
  // window, the pursuit card, the close) checking for runtime errors at
  // each stop — standard mode, so the fall/disperse branch is exercised.
  const scrub = page.getByTestId('timeline-scrub');
  for (const t of [0, 14, 30, 46, 55, 70, 84, 98, 114, 128, 145, 154, 170, 180, 188, 200]) {
    await scrub.fill(String(t));
    await page.waitForTimeout(150);
  }
  await expect(page.getByTestId('beat-caption')).toBeVisible();

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});

test('rephaim-valley in reduced violence mode elides the falls at both engagements', async ({
  page,
}) => {
  // Reduced mode's one behavioral difference from standard is entirely
  // inside PhilistineForce.tsx's per-frame pose read (philistinePose), not
  // a separate render path — this confirms the app tolerates scrubbing
  // through both break windows in reduced mode without runtime errors.
  await page.goto('/#/observe/rephaim-valley');
  await expect(page.getByTestId('violence-advisory')).toBeVisible();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.getByTestId('violence-advisory-reduced').click();
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await expect(page.locator('canvas')).toBeVisible();

  const scrub = page.getByTestId('timeline-scrub');
  for (const t of [46, 52, 60, 170, 176, 184]) {
    await scrub.fill(String(t));
    await page.waitForTimeout(150);
  }

  // Second visit: no advisory, and the chosen mode stuck in Settings —
  // same persistence contract as gilboa-battle's own advisory test.
  await page.goto('/#/observe/rephaim-valley');
  await expect(page.getByTestId('violence-advisory')).toHaveCount(0);
  await page.getByTestId('open-settings').click();
  await expect(page.getByTestId('violence-reduced')).toBeChecked();

  expect(errors, `console errors: ${errors.join('\n')}`).toEqual([]);
});
