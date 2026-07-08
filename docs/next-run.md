# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-08, post-M2-sign-off)

**M2 is released.** Both scenes (`besor-crossing`, `amalekite-camp`) built,
triple-reviewed, merged to `main` (PR #16), and signed off by Fable
(`docs/run-log.md`, sign-off entry). Fable-review-queue Open table is empty.
Full gate green: format/lint/70 vitest/build/7 e2e.

## Next session: pick in this order

1. **M3 world-director pass** (Fable): `gilboa-battle` is the next milestone's
   first scene and needs its creative/historical brief before any build —
   same pattern as the M2 briefs (`docs/design/*-brief.md`). ADR-009's
   violence-advisory + reduced-intensity mode lands with this milestone, so
   the brief must specify both rendering treatments. Also due within M3:
   modeled-figure pilot (ADR-008), the dress review (queue #11's revisit),
   and `f-dem-terrain` (re-scoped from M2) — Gilboa IS an identified site, so
   DEM terrain finally applies.
2. **Visual-fidelity roadmap slice 3** (`docs/visual-fidelity-roadmap.md` §A:
   instanced burned-debris + expanded rock/scrub variety in Ziklag) — good
   Sonnet-sized task if no Fable session is available for item 1.
3. **Quick Pages-live check** (carried forward): confirm
   `https://elinxie.github.io/books-of-samuel/` renders after the latest
   merge (expect `/books-of-samuel/assets/...` requests, not `/src/main.tsx`).
4. **Test-gap backlog** (small `test-engineer` task, from the 2026-07-08
   biblical review): `integrity.test.ts` only scans `PASSAGES[].keyExcerpts`
   for the ESV excerpt budget — beat captions in `SCENES[].beats[]` are
   invisible to it. Add caption scanning.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI).
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.
