# Checkpoint — 2026-07-08 — Sonnet — besor-crossing built + merged

**Milestone:** M2 (1 Samuel 30 route and recovery) — `besor-crossing` (scene 1
of 2) built, reviewed, and merged into `main`. `amalekite-camp` (scene 2 of 2)
not started. M2 stays `planned` until both land and Fable signs off.

**Completed this session:**

- Built the full `besor-crossing` scene (`src/scenes/besor-crossing/*`):
  ADR-005 `channel` terrain, layout, ground works, bank vegetation gradient,
  instanced pack donkeys, crowd reenactment (two hundred/four hundred split,
  ADR-007 pure pose functions), principal figures (David/Abiathar/Egyptian).
  Wired into `ObservePage.tsx`. Scene + `brook-besor` location status
  `planned` → `in-progress`.
- Extended `src/engine/characters/bodyGeometry.ts`: principal-detail figures
  get a segmented merged silhouette instead of a single capsule — first real
  consumer of the M1 character system, closing that milestone's sign-off
  rider. Still static/rigid-group posed, not skeletally animated
  (`applyClipPose` remains a disclosed stub).
- 5 new claims, 3 new placeholder assets, 2 reworded assets.
- Manual QA via Playwright against a real built+served app: all 4
  viewpoints, full timeline scrub, zero console errors.
- 3 review passes (archaeology/biblical-text/performance-reviewer), all with
  real fixes applied (not rubber-stamps) — see `docs/run-log.md` for detail.
  One non-blocking creative-direction item queued: `docs/fable-review-queue.md`
  #11.
- Gate green throughout: format/lint/**51 vitest** (up from 40)/build/7 e2e.
- Merged a `main` advance mid-session (codex PR #12, Pages-deploy hardening)
  — resolved conflicts in `docs/next-run.md`/`docs/run-log.md` by combining
  both sessions' entries.
- **PR #13 merged into `main`** as `5fceb3f` (squash), after its own CI run
  passed clean (~90s). Docs synced (`progress.md`, `next-run.md`,
  `run-log.md`, `asset-roadmap.md`).
- Branch restarted from `main`@`5fceb3f` per the checkpoint protocol's
  merged-PR rule; pushed a small next-run.md follow-up as **PR #14** (draft,
  open, not yet merged — trivial docs-only diff, CI not yet confirmed at
  session end).

**In progress:** none in the sense of half-built code. PR #14 (docs-only) is
open/draft and could be merged by the next session in one look if its CI is
green — nothing to resolve, just an administrative step skipped because this
session hit its context ceiling right after opening it.

**Known failures:** none.

**Tests/build status:** all green as of `main`@`5fceb3f` (see
`docs/progress.md`).

**Next recommended action:** see `docs/next-run.md` — build `amalekite-camp`
(second M2 scene, brief + beats/viewpoints already set), or visual-fidelity
roadmap slice 3, whichever fits the next session's budget. Merge PR #14 first
if its CI is green (one-look sanity check, trivial diff).

**Open research questions:** see `docs/uncertainty-register.md` (unchanged
this session) and `docs/fable-review-queue.md` (1 open item, #11, non-
blocking, besor-crossing-only).

**Why this checkpoint exists:** this session ran very long (built a full new
scene, 3 parallel subagent reviews, several rounds of merge-conflict
resolution) and hit a CRITICAL context checkpoint (~194% of a 200k window
across the whole conversation) right after landing the PR. Stopping here
rather than starting `amalekite-camp` cold with little context budget left.

**Files most recently changed:** `src/scenes/besor-crossing/*` (new, 11
files), `src/engine/characters/bodyGeometry.ts`, `src/pages/ObservePage.tsx`,
`src/data/{scenes,locations,claims,assets,integrity.test}.ts`, 3 source cards,
`docs/{progress,next-run,run-log,asset-roadmap,fable-review-queue}.md`.
