# 2026-08-29 — Sonnet — nathans-oracle build (M8), checkpoint at CRITICAL

Scheduled/automated session. Branch `claude/focused-mccarthy-dqx1qb`, PR #75
(draft, CI subscribed). Per `CLAUDE.md`: no Fable calls attempted despite the
scheduled prompt's offer.

## Done this session (committed + pushed)

1. Baseline verified clean (`npm install` + full `npm run verify`: 608
   vitest, build, 19/19 e2e).
2. **Researcher pass** (commit `45b3317`) closing standing citation gaps:
   `mccarter-1984-ii-samuel` extended to 2 Samuel 6 (three disputes searched,
   closed checked-thin — no citable McCarter statement found) and to 2 Samuel
   7 (**landed a real named-attribution finding for queue #29**: McCarter
   reads 7:13a as a redactional "linchpin," *II Samuel* pp. 217-24/222).
   `king-stager-2001` checked for instrument-construction coverage, closed
   checked-thin. New source card `finkelstein-romer-2018-kiriath-jearim`
   closes the Kiriath-jearim dedicated-card gap. One real issue caught and
   fixed before commit: the researcher's own notes had mislabeled the 2 Sam
   6/King-Stager findings as "Queue #29" — only the 7:13a finding is
   actually queue #29 material (see `docs/fable-review-queue.md`'s #29
   entry); relabeled to avoid conflating unrelated gap-closing with that
   tracked provisional decision. Gate independently re-run after the fix:
   format, lint, typecheck, 608 vitest — all green.
3. Opened PR #75 (draft) against `main`, subscribed to CI. CI green on the
   researcher-pass commit.
4. **`nathans-oracle` scene build dispatched** (`threejs-engineer`,
   backgrounded) per `docs/design/nathans-oracle-brief.md` — still running
   when this session hit CRITICAL context usage. WIP committed as-is
   (commit `9f2b159`): `src/scenes/nathans-oracle/{NathansOracleScene.tsx,
   DavidsHouseComplete.tsx, PrincipalFigures.tsx, entities.ts, layout.ts,
   layout.test.ts, poses.ts, poses.test.ts}`. **Not yet wired into
   `src/data/scenes.ts`/`claims.ts`/`characters.ts`/`passages.ts`, and
   `M8` in `src/data/milestones.ts` is still `planned`** — nothing imports
   this directory yet, confirmed via a clean `tsc --noEmit` with it present.
   Not yet formatted (3 files have prettier warnings) — left as-is rather
   than risk reformatting mid-edit while the subagent was still writing.

## State of the two background agents at checkpoint time

- **Researcher agent**: completed, output already reconciled and committed
  (item 2 above).
- **`threejs-engineer` scene-build agent** (id was `af42f21ec5f0b38c4` in
  this session, not resumable across sessions): **status unknown at
  checkpoint** — was still running, had produced the 8 files above but had
  not yet touched any `src/data/*.ts` file. It may finish and this session
  may receive a completion notification after this checkpoint; if this
  session has already ended by then, **the next session should check
  whether that work materialized further** (it won't, since a background
  agent's lifetime is tied to the spawning session — treat the 8 committed
  files as the actual stopping point, not as a signal more is coming) and
  **must restart the build from a fresh `threejs-engineer` dispatch**,
  reading the 8 already-committed files first to decide whether to continue
  from them or start clean. They looked structurally reasonable (layout,
  poses, entities, two component files, two test files) but were **not
  independently reviewed against the brief's Resolved-design-calls/
  Not-allowed sections** — do that review before trusting them, don't
  assume a mid-build WIP already satisfies ADR-013 restraint, the
  house-completion geometry limits, or the cast-scale cap.

## What's next (Sonnet), in priority order

1. **Finish/verify `nathans-oracle`.** Read the 8 committed WIP files
   against `docs/design/nathans-oracle-brief.md` in full. Decide: continue
   from them (dispatch a fresh `threejs-engineer` with explicit instruction
   to review and complete the existing WIP, not start over) or discard and
   restart if they don't hold up. Either way, the remaining required work
   per the brief: new passage `2sam-7` in `src/data/passages.ts` (ESV
   excerpt budget ≤3 quotes: 7:16, 7:18b, optionally 7:28-29 — verify
   wording via WebSearch, do not enter from memory); new character `nathan`
   in `src/data/characters.ts` (explicitly distinguished from the son of
   David at 5:14); new claims per the brief's Required-source-basis list,
   citing `mccarter-1984-ii-samuel`'s now-landed 7:13a finding on
   `claim-nathan-oracle`'s `scholarlyViews` slot (queue #29); wire the new
   `SceneDef` into `src/data/scenes.ts`; flip `M8` to `in-progress` (not
   `released`) in `src/data/milestones.ts`. Grep the finished scene against
   every item in the brief's "Not allowed" list before calling it done.
2. Independently re-run the full gate (format, lint, typecheck, vitest,
   build, e2e) — do not just trust the build agent's own report, per this
   project's standing practice (real defects have been caught this way on
   M6/M7).
3. Commit + push to `claude/focused-mccarthy-dqx1qb` (PR #75 already open),
   update `docs/next-run.md`'s top entry properly (this checkpoint note is
   a stopgap, not a substitute for the real next-run update once the scene
   is actually done).
4. Then a Sonnet M8 sign-off review before any status flips past
   `planned`/`in-progress` — confirm or revise queue #27/#28/#29 per
   `docs/fable-review-checklist.md`.
5. (Carried forward, non-blocking) Live ESV wording verification for M6's
   three quotes; real-hardware perf check of `gilboa-battle` + Pages-live
   check — both long-standing, unchanged.

## Gate status at checkpoint

Format/lint/typecheck/608-vitest/build/19-e2e all green as of the
researcher-pass commit (`45b3317`). The WIP commit (`9f2b159`) was verified
with a clean `tsc --noEmit` only (deliberately not full `npm run verify`,
to avoid burning more context at CRITICAL) — full gate re-run is the first
thing the next session should do.
