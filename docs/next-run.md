# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-14, four independent slices, branch `claude/focused-mccarthy-ckjcuh`)

Landed and gate-green (format:check, lint, 151 vitest, build, 8/8 e2e), not yet
merged at doc-sync time: ADR-009 first-visit violence advisory built
(`src/ui/ViolenceAdvisory.tsx`, `SceneDef.depictsDeath`, wired for
`gilboa-battle`); ESV excerpt-budget test now also scans beat captions
(`src/data/integrity.test.ts`); "not a game" copy reworded to ADR-011 framing
(`LandingPage.tsx`/`SiteChrome.tsx`/`FeaturesPage.tsx`); two new M3
world-director briefs (`docs/design/beth-shan-walls-brief.md`,
`docs/design/jabesh-burial-brief.md` — briefs only, scenes still `planned`/
empty). Full detail: `docs/run-log.md`'s 2026-07-14 entry.

## State before this slice (2026-07-10, rig-conversion/melee-combat branch merged to main)

`claude/resolve-merge-conflicts-nqbqn8` had continued past what PR #23
actually merged (PR #23 only captured an earlier ancestor of the branch —
the simple gilboa-battle build) — 12 more commits (melee-combat, full
rig-conversion to real limbed figures, sandboxed performance measurement)
were sitting unmerged on that branch. Merged cleanly onto `main` (no
conflicts) via `claude/continue-unmerged-work-4xucqr`; full gate re-run and
green: format, lint, 144 vitest, build, 7 e2e. See "State right now
(2026-07-09, post rig-conversion slice)" below for the actual content —
nothing about it has changed, just confirming it's now on `main`. Item 0
below (real-hardware perf check) is still open; this session's gate re-run
was sandboxed/software-rendered same as before.

## State right now (2026-07-09, post rig-conversion slice)

**All five Gilboa crowd components now use real limbed figures**
(`buildCrowdLimbedGeometry`, `src/engine/characters/bodyGeometry.ts`), not
capsule+sphere blobs — the last two (`CrestRetinue`, `PhilistinePress`) were
converted this slice, completing what the melee-combat slice below started.
`DefenderLine`/`EngagedPhilistines`/`RoutingIsraelites` additionally animate
legs via baked walk-cycle/fight-stance pose buckets (`sampleWalkPoses`/
`sampleFightPoses`, `engine/characters/animation.ts`), cycling through 6-8
InstancedMesh buckets per component selected by phase each frame
(`mesh.count` set to actual per-bucket occupancy). `CrestRetinue`/
`PhilistinePress` stay single-bucket (static/idle formations, no stride to
animate). Full detail across 4 commits in `docs/run-log.md`.

**Performance: measured, not just estimated — real signal, but incomplete.**
Frame-time sampled via a headless-Chromium `requestAnimationFrame` harness
(`performance.now()` deltas, high quality tier), comparing this session's
final state against a `git worktree` checkout of `2a41aca` (the pre-session
Gilboa build) at the same scene point (rout window, the one beat that exists
unchanged in both versions): **avg frame time went from ~222ms to ~333ms, a
~1.5x regression** — real but milder than the naive worst-case math below
would suggest (figure count ~2.5x, per-figure triangles ~4x, draw calls
roughly doubled ~20→~40; costs don't compound linearly here, and a large
fixed cost — terrain/vegetation/dust, unchanged by this session — dilutes
the relative impact).

**This sandbox has no GPU** (`WEBGL_debug_renderer_info` reports `SwiftShader
Device`, a pure CPU software rasterizer) — the absolute numbers (~3-4.5 fps
either way) are meaningless for real hardware and were not reported as if
they were. The ~1.5x _relative_ regression is a real, transferable signal,
but software-rasterizer bottlenecks (fill rate, per-pixel cost) don't
necessarily scale the same way a real GPU's would (GPUs handle instanced
draw-call/triangle scaling far more gracefully) — so this is genuine
evidence the change isn't catastrophic, not proof it's fine on an actual
device. **Someone should still check the live/deployed scene on real
hardware before calling this fully safe** — that's the one thing no
sandboxed session here can substitute for.

If a real-device check does turn up a problem, the fix is likely: fewer pose
buckets (e.g. 4 instead of 6-8), reduced `defenderCount`/
`engagedInfantryCount`/general figure-count ratios, or geometry LOD (fall
back to capsules below a distance threshold) — not necessarily reverting the
real-figure/leg-animation work itself, since the measured regression is
modest relative to how large the underlying changes were.

## State before the rig-conversion slice (2026-07-09, post melee-combat slice)

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

## State right now (2026-07-14, PR #25 follow-up)

`gilboa-battle` gained an archer arrow-volley beat (`ArrowVolley.tsx`, instanced,
reuses the `RoutDust` pattern) plus a Fable-approved resolution of queue #15
(melee-clash beat approved as-is, two housekeeping riders applied — `b-lines`
caption reworded, `claim-line-defense` relabeled `design-placeholder`). PR #25
merged with CI red (`format:check` failing on `docs/fable-review-queue.md`,
introduced by the Fable pass's edit); this slice reformats that file only.

Follow-up not yet done: the arrow-volley roster is a flat 36 arrows at every
quality tier (`archerCount` at `study`/`high` both exceed
`ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE`=12) — contrary to ADR-004's expectation
that `study` scales down. Cost is negligible either way; bundle with the
open real-hardware perf check (item 0 below) rather than fixing standalone.

## Next session (Sonnet): build `beth-shan-walls` and `jabesh-burial`

Items 1, "not a game" copy, and the test-gap backlog (formerly items 1/4/
small-follow-up below) are **done** as of 2026-07-14 — see `docs/run-log.md`.
Remaining:

0. **(Still open) Real-hardware performance check.** A sandboxed relative
   measurement is done (see the 2026-07-09 state note further down: ~1.5x
   frame-time regression, milder than the raw figure/triangle/draw-call
   multipliers alone would suggest) — but it was taken on a GPU-less software
   renderer (SwiftShader), so it's evidence the change isn't catastrophic, not
   proof it's fine on a real device. Someone should load the actual deployed
   scene on real hardware at high quality tier before calling this settled. If
   it turns out bad: fewer pose buckets (4 instead of 6-8), lower
   `defenderCount`/`engagedInfantryCount`/figure-count ratios, or a
   capsule-fallback LOD at distance are the likely fixes — probably not
   reverting the real-figure/leg-animation work itself, given how modest the
   measured regression was relative to how large the underlying changes were.
1. **Fable-review-queue #13** (headdress citation page-verification) — still
   open, still blocking `gilboa-battle` → `released` (not blocking further
   build work). Needs primary-source page inspection, not just bibliographic
   lookup; batch with #12 (DEM data-sourcing ADR) if both are ready for a
   Fable pass.
2. **Build `beth-shan-walls` and `jabesh-burial`** — both now have completed
   M3 world-director briefs (`docs/design/beth-shan-walls-brief.md`,
   `docs/design/jabesh-burial-brief.md`, 2026-07-14) but are still fully
   `planned`/empty in `src/data/scenes.ts` (no beats/viewpoints). This is the
   next Sonnet/`threejs-engineer` build task, mirroring how `gilboa-battle`'s
   build followed its brief. Each scene carries its own non-blocking-to-build
   queue item that gates only its path to `released`, not the build itself:
   Beth-shan → queue #16 (archaeological-horizon page-verification against
   `mazar-beth-shean-2006`); Jabesh → queue #17 (ADR-009 funerary-burning
   extension ratification + cremation-scholarship citations). Build per each
   brief's calls (wall as narrated-but-thin, four wrapped body forms, no
   dismemberment for Beth-shan; covered-before-flame pyre, wrapped bone bundle
   for Jabesh) and leave the queue items open for a later Fable pass.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- **Quick Pages-live check**: still open — the sandbox's network proxy
  returns a policy-level 403 (`connect_rejected`, confirmed via
  `/root/.ccr/__agentproxy/status`) for `elinxie.github.io`, not a transient
  error. This is a sandbox-network-policy block, not something fixable from
  inside this environment; needs checking from a session/environment with
  outbound access to that host (2026-07-14).
- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI). In the 2026-07-09 remote web session, plain
  `/opt/pw-browsers/chromium` also worked directly.
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.
