# 2026-07-09 — Sonnet 5 — Gilboa melee combat + real-figure rig (mid-session, CRITICAL cutoff)

Usage at cutoff: ctx 175k/200k (87%), CRITICAL. Committed + pushed twice
this session (`ba81157`, `9f005a6`) to `claude/resolve-merge-conflicts-nqbqn8`.
Full `npm run verify` not run this session (mid-slice; see below).

## Done

- PR #23 (merge-conflict resolution reconciling ADR-011 policy with the
  Gilboa build) merged to `main`. PR #21 (the original policy PR) also shows
  merged. Both closed/resolved — not part of this checkpoint's open items.
- `claim-battle-scale` (`src/data/claims.ts`) rewritten twice this session:
  1. First pass added `finkelstein-silberman-2001` as a source + a note
     explaining why the ~1:10 abstraction stays undisclosed-number (a
     researcher subagent found no scholar has published a Gilboa-specific
     combatant count).
  2. **User overrode that** — asked for an actual derived number, "just flag
     it as you implement it." Rewrote the claim to state ~3,000 Israelite /
     comparable-or-larger Philistine combatants, built as a fully transparent
     assumption chain off Finkelstein & Silberman's regional population
     figure (every step past their base number is the project's own
     extrapolation, labeled `design-placeholder`/`speculative`, not
     attributed to any scholar). Ratio moves ~1:10 → ~1:20.
  3. Logged `docs/fable-review-queue.md` #14 (non-blocking): the specific
     assumption ratios (1/3 muster-range, 1/5 fighting-age) weren't
     scholarly-sourced, just Sonnet's own picks: sanity-check later. Also an
     unverified Yadin _Art of Warfare in Biblical Lands_ citation, flagged
     `TO VERIFY`, not used in the actual claim text.
- `src/scenes/gilboa-battle/layout.ts`: added `buildDefenderSlots` (new
  Israelite defensive-line placement, z in [-50,-20], facing north).
- `src/scenes/gilboa-battle/poses.ts`: added `T_LINE_CLASH`, `ClashPose`,
  `defenderClashPose`, `infantryEngagedPose`, `defenderFallPose` — pure
  beat-driven melee-clash choreography (swing/stagger cycle, ADR-009
  compliant, no wound/blood/dismemberment geometry in either violence mode).

## In progress — a background `threejs-engineer` subagent is still running

Spawned this session (agent name/id not durable across sessions — if it's
not visibly still active on resume, treat its work as abandoned mid-slice
and pick up from what's on disk + this note). Scope, given across three
messages as requirements accumulated:

1. **Original brief**: build a scripted (non-interactive) melee-clash
   sequence — Israelite defender line vs. Philistine infantry, wired into
   the beat timeline before the existing rout (`T_ROUT=18`..`T_SONS=45`),
   using the `poses.ts`/`layout.ts` additions above. New `claim-line-defense`
   was requested but **not yet confirmed landed** — check `src/data/claims.ts`
   for it on resume.
2. **Addendum 1 (user)**: animate legs (not just torso-level pose blends),
   and replace ALL crowd figures (Philistine archers/infantry/principals in
   `PhilistinePress.tsx`, routing Israelites in `RoutingIsraelites.tsx`,
   non-principal retinue in `CrestRetinue.tsx`) from capsule+sphere primitive
   geometry (`makeFigureGeometry()`) to the real procedural rig
   (`src/engine/characters/`, 17-bone skeleton, `buildCharacterRig`,
   `detail: 'crowd'`), using `bake.ts`'s existing (but previously unused)
   `bakePoseBuckets`/`'walk'` clip infrastructure for performant instanced
   leg animation. Told to add a new fight/strike `ClipName` additively
   (existing clips: `'walk' | 'idle' | 'kneel' | 'mourn'` — don't break other
   scenes that depend on them) and use 2-4 generic `CharacterParams` presets
   per side rather than one-per-figure.
3. **Addendum 2 (user, this checkpoint)**: bump rendered figure counts to
   match the new ~3,000-combatant claim. Target given (ratios of
   `profile.figureCount`, high tier = 72): `retinueCount` 0.18→0.21,
   NEW `defenderCount` ~1.25, `routCount` stays 0.62, `archerCount`
   0.19→0.42, `infantryCount` 0.62→1.81, `philistinePrincipalCount`
   0.07→0.21. Roughly 325 total at high tier, up from ~127. **User explicitly
   deferred performance optimization to a later pass** — told the agent not
   to spend time on it beyond normal care, but to flag (not silently cap) if
   the bumped count clearly craters frame time.

## Next action on resume

1. Check whether the background agent is still running / check its last
   output. If done: read its report, verify what actually landed (`git diff`
   / `git log` on `src/scenes/gilboa-battle/`, `src/engine/characters/`,
   `src/data/claims.ts`, `src/data/scenes.ts`), run full `npm run verify`
   (format/lint/test/build/e2e — e2e needs
   `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium` in this sandbox),
   then dispatch `archaeology-reviewer` + `biblical-text-reviewer` +
   `performance-reviewer` (performance review is NOT optional even though
   optimization work is deferred — the reviewer's job is exactly to
   establish whether the deferred-perf bet is safe) over the new geometry
   pass. Commit + push.
2. If the agent is gone/not resumable: everything in "In progress" above is
   the spec to hand to a fresh `threejs-engineer` session — the `poses.ts`/
   `layout.ts` primitives already on disk (committed) are safe building
   blocks, don't redo them.
3. Confirm `claim-line-defense` exists and is wired into `entities.ts`/scene
   claim references before calling the melee feature done — it was requested
   but not confirmed landed as of this checkpoint.
4. Update `docs/next-run.md`'s "state right now" section once the above
   lands — it currently still describes the pre-combat, capsule-figure
   Gilboa build from earlier today and is now stale.
