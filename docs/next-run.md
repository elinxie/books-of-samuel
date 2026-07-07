# Next run

**Read `docs/sonnet-continuation.md` first if you haven't.**

## Since the last version of this note

Reconciled a repo-level conflict: a separate session's KJV/WEB text reader
(merged into `main` independently) now lives at `/reader/` as a companion
tool, not in conflict with the visualizer. See `docs/run-log.md` (session 2)
and `docs/architecture.md` for details. If you're touching `README.md`,
`LICENSE`, or anything build-related, be aware `reader/` and
`scripts/copy-reader.mjs` now exist — don't remove them without reason.

## Immediate next task

Milestone 1 is functionally complete and passing all gates. Pick ONE of these,
smallest-first:

1. **Citation verification pass** (`docs/fable-review-queue.md` #4): verify the
   exact publication venue/page for `garfinkel-ganor-2019` and the first-proposer
   history for `oren-tel-sera-1993`. Update the source cards' `confidenceNotes` and
   remove the `TO VERIFY` flag once done, or narrow the hedge if only partially
   resolved. This is pure research/doc work, no code changes needed — good
   Sonnet task, no Fable required.

2. **Start Milestone 2 groundwork**: add `SceneDef` details for `besor-crossing`
   (currently a stub in `src/data/scenes.ts` with empty beats/viewpoints) — but
   stop at data/planning, don't build 3D geometry yet without route-distance
   clarity (blocked on Ziklag-candidate choice, `uncertainty-register.md` #1–2).

3. **Repo hygiene**: confirm GitHub Pages is actually live (see README "Deploying"
   section — one manual repo-settings step is required and may not be done yet).
   If not live, that's the highest-priority next action since it's an explicit
   Milestone 0 acceptance criterion.

Do not start Milestone 3 (Gilboa) content work — it has an open Fable-review item
(violence-intensity default, queue #6) that should be resolved before scenes are
built around it.

## Known state

- All tests, lint, typecheck, build, and e2e pass as of this commit.
- No open bugs.
- `M1` milestone status is `in-progress` (not `released`) pending the Fable review
  pass noted in `docs/fable-review-queue.md`.

## Files most recently changed

`docs/`, `.claude/`, `.github/workflows/`, `README.md`, `CLAUDE.md`,
`playwright.config.ts`, `vite.config.ts` (minor fixes), `scripts/build-source-index.mjs`.
Full app implementation (`src/**`, `sources/source-cards/**`) landed in the same
push as these docs — see `docs/run-log.md` for the session history.
