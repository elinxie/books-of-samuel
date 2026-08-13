# Checkpoint — 2026-08-13, M6 scope + doc sync (context CRITICAL, stopping here)

## Current milestone

M6 (2 Samuel 5) — `planned`, scoped, no briefs/build yet.

## Completed this session

1. Ran baseline `npm run verify` equivalent (all green) at session start.
2. Built `hebron-covenant` (M5 scene) on `claude/focused-mccarthy-u0d9p9`,
   opened PR #51 — **turned out to duplicate work a parallel session had
   already shipped as the full M5 package** (PR #55/#57, merged before this
   session's PR landed). PR #51 was closed without merging by the time this
   session next woke up. No lasting effect: branch was reset to `main`
   (`git checkout -B claude/focused-mccarthy-u0d9p9 origin/main`, force-pushed)
   to discard the redundant commit.
3. Dispatched `fable-architect` for the M6 scope pass (top item in
   `docs/next-run.md`). It landed a real, substantive `M6` entry in
   `src/data/milestones.ts` (scope: 2 Sam 5 standalone, not bundled with
   ch. 6; three scenes + atlas extension; binding constraints for the
   `jerusalem-stronghold` brief around the Kenyon/Mazar archaeological
   disputes) **then hit the account's monthly spend limit** before writing
   any scene briefs or its own doc sync — same failure mode as 2026-07-22
   and 2026-08-10.
4. Completed the doc sync the cut-short Fable session didn't reach:
   `docs/progress.md` (new M6 section), `docs/next-run.md` (top state
   block), `docs/run-log.md` (three entries: the PR #51 supersession note,
   the Fable scope-pass summary, this session's doc-sync summary).
   Re-verified: typecheck, format, lint, 484/484 vitest all green (no
   structural-guard test broke from the additive milestone entry).
5. Committed (`d431584`) and pushed. Opened draft PR #58, subscribed to its
   activity. CI was still pending at the time this session stopped —
   **a future session or the user should check PR #58's CI status** (it
   should be a trivial pass: docs + one additive data-only TS file, same
   shape as the 2026-08-03 M5-scope-only commit which needed no fixes).
6. Sent the user a push notification about the Fable spend-limit hit (per
   their explicit "let me know" instruction) — already done, don't re-send.

## Known state / test / build status

- `npm run format:check` / `lint` / `test` (484 pass) / `npx tsc --noEmit`
  all green as of the last commit on this branch.
- Did **not** re-run `npm run build` or `npm run e2e` after the M6 doc-sync
  commit specifically (ran them earlier in the session against the
  now-discarded `hebron-covenant` commit, and ran typecheck/format/lint/test
  again after the M6 commit) — a future session should run the full
  `npm run verify` once more before treating PR #58 as mergeable, just to
  be thorough, though the diff shape (docs + one additive milestone object)
  makes a build/e2e break very unlikely.

## Next recommended action

1. Check PR #58's CI status; merge if green (agents are authorized to merge
   their own PRs once checks pass, per `CLAUDE.md`).
2. **Write the three M6 world-director briefs** (`hebron-kingship`,
   `jerusalem-stronghold`, `rephaim-valley`) — see `docs/next-run.md`'s top
   state block for the full instruction, including the Fable-unavailable
   fallback path (try `world-director` first; if the spend limit is still
   hit, fall back to Sonnet, honor every binding constraint already recorded
   in the `milestones.ts` M6 comment verbatim, mark the briefs
   **provisional** in `docs/fable-review-queue.md`). Read the `M6` comment
   in `src/data/milestones.ts` in full before starting — it's dense and
   load-bearing, especially the Jerusalem constraints.
3. `jerusalem-stronghold` specifically needs a `researcher` pass first (new
   `jerusalem` `LocationEntry`, source cards for Kenyon/Steiner vs.
   E. Mazar/Faust stratigraphy) before its brief can responsibly commit to
   geometry — there are currently zero Jerusalem-related source cards in
   `sources/source-cards/` (checked this session). Do the research before
   the brief, not during scene geometry.
4. Build order once briefs exist: `hebron-kingship` (cheapest, reuses
   Hebron) → `jerusalem-stronghold` → `rephaim-valley` → atlas extension.
5. Unrelated, still carried forward, non-blocking: real-hardware perf check
   of `gilboa-battle`, Pages-live check — need a non-sandboxed environment.

## Open research questions

- Jerusalem capture-route/stratigraphy dispute (Kenyon/Steiner vs.
  E. Mazar/Faust) — not yet researched, flagged as a hard gate for the
  `jerusalem-stronghold` brief in the `milestones.ts` M6 comment.
- Baal-perazim's own identification (separate from the Rephaim valley,
  which is identifiable) — likely stays unidentified/named-spot-only per
  the M6 scope comment, but not independently verified by a researcher pass
  yet.

## Most-recently-changed files

- `src/data/milestones.ts` (M6 entry added)
- `docs/progress.md`, `docs/next-run.md`, `docs/run-log.md` (M6 doc sync)
- (Reverted/discarded, not in current history) the M5-duplicate
  `hebron-covenant` scene files from the closed PR #51 — none of that
  content is present on this branch anymore.

## Branch / PR state

- Branch: `claude/focused-mccarthy-u0d9p9`, up to date with its remote,
  clean working tree.
- PR #58 (draft) open against `main`, this session subscribed to its
  activity. PR #51 (draft) closed without merging — do not reopen or
  recreate it.
