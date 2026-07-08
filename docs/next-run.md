# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-08, Codex handoff check, branch `work`)

`amalekite-camp` is already built and committed in this branch's history. Codex
resumed after Claude Code hit usage limits, re-ran the local gate far enough to
confirm the app is usable:

- `npm run format:check` — pass.
- `npm run lint` — pass.
- `npm run test` — pass, 70/70 Vitest tests.
- `npm run build` — pass; `reader/index.html` copied into `dist/reader/index.html`.
- `npm run e2e` — blocked only because this container has no matching Playwright
  Chromium and `npx playwright install chromium` is forbidden by the CDN (403).
  Earlier Claude run had the 7/7 e2e pass with a local Chromium path.

No code changes were needed to make the page build. For local use, run:

```bash
npm run dev -- --host 0.0.0.0
```

Then open the Vite URL and use the observer page / scene selector. Production
build output is also present under `dist/` from the successful build.

## Next session: pick in this order

1. **Merge/publish this branch's PR if still open** (check CI green first;
   agents are authorized to merge their own PRs — see CLAUDE.md; squash into
   `main`). This Codex container has no configured git remote, so it could not
   push or merge upstream from here.
2. **M2 Fable sign-off is now due** — both M2 scenes are built. A Fable-level
   session should run `docs/fable-review-checklist.md` over besor-crossing +
   amalekite-camp, decide `released` status flips (scenes + `brook-besor`
   location + M2 milestone), and clear queue item #11 (Egyptian dress) if it
   chooses to.
3. **Visual-fidelity roadmap slice 3** (`docs/visual-fidelity-roadmap.md` §A:
   instanced burned-debris + expanded rock/scrub variety in Ziklag).
4. **Quick Pages-live check** (carried forward): confirm
   `https://elinxie.github.io/books-of-samuel/` renders after the next merge
   (deploy hardened by PR #12; expect `/books-of-samuel/assets/...` requests,
   not `/src/main.tsx`).

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Test-gap backlog (from 2026-07-08 biblical review, still open)

`src/data/integrity.test.ts` only scans `PASSAGES[].keyExcerpts` for the ESV
excerpt budget — beat captions in `SCENES[].beats[]` are invisible to it. A
future scene could embed quotes without tripping `npm test`. Small
`test-engineer` task: scan captions for quoted ESV text too.
