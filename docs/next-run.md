# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-09, post melee-combat slice)

**`gilboa-battle` now renders real mutual combat**, not just a rout/death
sequence: a new `DefenderLine`/`EngagedPhilistines` pair engages in a
scripted (non-interactive) swing/block/stagger clash from a new `b-line-clash`
beat (t=8) through `b-rout` (t=18), per `claim-line-defense`. User-directed —
revises the original brief's "not blow-by-blow fighting" call; logged
`docs/fable-review-queue.md` #15, non-blocking, flagged for a Fable sanity
check. Figure-count ratios were also bumped to actually match
`claim-battle-scale`'s already-landed ~1:20 ratio (previously only the claim
text said this, the render didn't) — **~325 figures at high tier, up from
~127, well above the original brief's 120–140 cap** (`docs/design/gilboa-
battle-brief.md` "Scale assumptions"). Literal draw-call count only grew
modestly (~6 new instancedMesh draw calls, DefenderLine + EngagedPhilistines,
on top of ~17-20 existing — everything here is instanced, so draw calls don't
scale with figure count), but total instanced triangle count and the
per-frame `useFrame` matrix-update cost are ~2.5x. Full `npm run verify`
equivalent (format/lint/130 vitest/build/7 e2e) is green and a manual headless
console-error check of `/observe/gilboa-battle` showed 0 errors, but **no
actual FPS/frame-time measurement has been taken** — a real
`performance-reviewer` pass (not just the self-check above) is the next
priority, not deferred further.

Still outstanding from this slice, explicitly told to the user: crowd figures
are still capsule+sphere primitives, not the real procedural rig
(`src/engine/characters/`) — no leg animation, not "real figures." The
forward-kinematics groundwork (`poseJointPositions`/`CrowdLimbPose` in
`src/engine/characters/skeleton.ts`) landed but isn't wired into any scene
component yet. This was the previous background agent's task before it
failed on an account monthly-spend-limit cutoff (not a code issue) — same
spend limit is a live constraint for whoever picks this up next.

## State before this slice (2026-07-09, post-scope-policy change + post-Gilboa-build-pass)

**Policy change landed (Fable, user-directed):** the project is now an
**atlas-first historical world with constrained game-like affordances** —
ADR-011 (`docs/architecture-decisions/adr-011-atlas-first-game-affordances.md`)
replaces the blanket "not a game" rule. Nothing about claims/sources/
anachronism/violence/ESV discipline changed. Battle stays scripted reenactment
(no player combat) unless separately approved.

**`gilboa-battle` is built** (`status: 'in-progress'`, not `planned`): this
policy branch had diverged from `main` before the build landed there (the
build session's own run-log entry notes it checked for and didn't find this
policy branch), so the two ran independently and are reconciled by this merge.
The scene is now a real, playable one — terrain shell, ~127-figure battlefield
population, beat-driven pose choreography (death sequence + rout),
military-kit attachments (incl. the disputed Philistine headdress,
principal-tier only, behind a `scholarlyViews` label), and a rout-dust
atmosphere pass. Full detail: `docs/run-log.md`'s 2026-07-09 "Gilboa build,
Steps 1–5" entry. Five commits, each independently build/lint/vitest-checked;
full gate (vitest 117/117, build, e2e 7/7, plus a manual console-error check of
`/observe/gilboa-battle` specifically) run once at the end. `npm run verify` as
a single command was not invoked — its constituent checks were run
individually instead (see run-log for exact commands); re-run the actual
`npm run verify` script next session to confirm nothing about the combined
gate itself (e.g. its own script wiring) has drifted.

Open fable-review-queue items (both non-blocking, neither newly resolved by
the build): #12 DEM sourcing ADR (deferred — v1 uses procedural `ridge`), #13
Philistine plumed-headdress verification (must clear before the scene ships
`released`).

## Next session (Sonnet): `gilboa-battle` follow-ups, `gilboa-battle`'s build is done

The visible-first build brief below is **complete** — do not re-run it. Next
session's actual work is the follow-up list that fell out of the build pass:

0. **(New top priority) Performance-reviewer pass on the ~325-figure count**:
   the melee-combat slice bumped Gilboa's high-tier figure count well past the
   original brief's 120–140 cap. A self-check found draw calls only grew
   modestly (instancing means draw-call count doesn't scale with figure
   count) but did not measure actual frame time. Get a real FPS/frame-time
   read at high tier before treating this as safe; if it's bad, the fix is
   probably tier-scaling the new `defenderCount`/`engagedInfantryCount` ratios
   down rather than reverting the combat feature itself.
   0b. **(New) Rig-based crowd figures**: user asked for animated legs and "real
   figures, not blobs" — still capsule+sphere primitives everywhere except the
   5 named principals. `src/engine/characters/skeleton.ts`'s
   `poseJointPositions`/`CrowdLimbPose` (additive FK, unit-tested-free so far)
   is the groundwork; needs wiring into baked instanced pose-buckets
   (`bake.ts`'s `bakePoseBuckets` already exists but is unused) across
   `PhilistinePress`, `RoutingIsraelites`, `CrestRetinue`, `DefenderLine`,
   `EngagedPhilistines`. A new `ClipName` for fight/strike poses is needed
   (additive — don't break `'walk' | 'idle' | 'kneel' | 'mourn'` for other
   scenes). This is a substantial lift; the previous attempt at it failed
   mid-task on an account monthly-spend-limit cutoff, not a code problem —
   check spend limit status before re-attempting with a subagent.
1. **ADR-009 first-visit violence advisory** (small, self-contained UI slice):
   `gilboa-battle` currently has a plain `violenceMode` toggle in the Settings
   panel (`src/ui/hud/SettingsPanel.tsx`) but no first-visit modal/advisory
   explaining the standard/reduced choice before a viewer's first entry into a
   violence-bearing scene, which ADR-009 calls for. `ui-engineer` task — check
   how `showLabels`/other first-visit or persisted-preference UI is structured
   for the closest existing pattern to extend, not invent from scratch.
2. **Performance pass on `gilboa-battle`** (`performance-reviewer`, per the
   brief's "run early, not just at the end" instruction — this is "the end" of
   the first build pass): all 5 slices (population, pose, kit, dust) now render
   concurrently at high tier for the first time. Check draw-call count against
   the Amalekite scene's budget (`QUALITY_PROFILES`), and sanity-check frame
   time isn't degraded by `CrestRetinue`/`RoutingIsraelites`'s move from
   one-time `useEffect` placement to per-frame `useFrame` pose writes (Step 3).
3. **Fable-review-queue #13** (headdress citation page-verification) — still
   open, still blocking `gilboa-battle` → `released` (not blocking further
   build work). Needs primary-source page inspection, not just bibliographic
   lookup; batch with #12 (DEM data-sourcing ADR) if both are ready for a
   Fable pass.
4. **Milestone-scope items still open for `gilboa-battle` → `released`**: the
   scene's `beth-shan-walls` and `jabesh-burial` siblings are still fully
   `planned`/empty (`SceneDef`s exist in `src/data/scenes.ts` with no beats/
   viewpoints) — M3 world-director passes for those two scenes are a Fable-tier
   task per `docs/model-handoff.md`, not yet requested.
5. **Test-gap backlog** (small `test-engineer` task, carried forward from
   2026-07-08 biblical review, still not started): `integrity.test.ts` only
   scans `PASSAGES[].keyExcerpts` for the ESV excerpt budget — beat captions in
   `SCENES[].beats[]` are invisible to it. Add caption scanning.

## Small follow-ups (fit around the above, don't block it)

- **UI copy still says "not a game"** (`src/pages/LandingPage.tsx:121`,
  `src/ui/SiteChrome.tsx:32`, `src/pages/FeaturesPage.tsx:25`): reword to the
  ADR-011 atlas-first framing (small `ui-engineer` task; mirror the new
  README.md paragraph).
- **Quick Pages-live check** (carried forward): confirm
  `https://elinxie.github.io/books-of-samuel/` renders after the latest
  merge (expect `/books-of-samuel/assets/...` requests, not `/src/main.tsx`).

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI). In the 2026-07-09 remote web session, plain
  `/opt/pw-browsers/chromium` also worked directly.
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.
