# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-14, Gilboa clash-contact fix)

User-reported visual bug fixed on the current branch: the `gilboa-battle`
Israelite defender front and engaged Philistine front are now compressed into
close weapon range along a shared ragged clash line, instead of occupying two
separated bands where figures appeared to slash at empty air. The layout tests
now assert the engaged Philistines have a nearby defender within weapon range.
This is a positioning/choreography readability fix only; no new historical
claim, asset type, violence treatment, or interaction model was added.

Checks run this slice: targeted Gilboa layout test plus format-check, lint, full
Vitest suite, and production build (all passed). `npm run verify` reached e2e
and then failed only because this sandbox has no installed Playwright Chromium;
`npx playwright install chromium` was also blocked by CDN 403. No screenshot
could be captured for the same browser-availability reason.

## Next session (Sonnet): build `beth-shan-walls` and `jabesh-burial`

Continue the existing next task from the prior handoff:

1. **Build `beth-shan-walls` and `jabesh-burial`** — both have completed M3
   world-director briefs (`docs/design/beth-shan-walls-brief.md`,
   `docs/design/jabesh-burial-brief.md`, 2026-07-14) but are still fully
   `planned`/empty in `src/data/scenes.ts` (no beats/viewpoints). Build per
   each brief's calls (wall as narrated-but-thin, four wrapped body forms, no
   dismemberment for Beth-shan; covered-before-flame pyre, wrapped bone bundle
   for Jabesh).
2. **Still open / non-blocking to the build:** real-hardware performance check
   for `gilboa-battle`; Fable-review-queue #13 (headdress citation
   page-verification) blocks only `gilboa-battle` → `released`; Beth-shan queue
   #16 and Jabesh queue #17 block only their later release status.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- Quick Pages-live check is still blocked from this sandbox by network policy
  for `elinxie.github.io` (`connect_rejected`), not a repo issue.
- This sandbox currently has no usable Playwright Chromium installed. Plain
  `npm run e2e` fails looking for Playwright's cached browser, and
  `npx playwright install chromium` is blocked by CDN 403. If a future
  environment provides a system/browser-cache Chromium, set
  `PLAYWRIGHT_CHROMIUM_PATH` accordingly before e2e.
