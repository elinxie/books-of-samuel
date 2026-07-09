# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-09, post-Gilboa-build-pass)

`gilboa-battle` (`status: 'in-progress'`) is now a real, playable scene:
terrain shell, ~127-figure battlefield population, beat-driven pose
choreography (death sequence + rout), military-kit attachments (incl. the
disputed Philistine headdress, principal-tier only, behind a `scholarlyViews`
label), and a rout-dust atmosphere pass. Full detail: `docs/run-log.md`'s
2026-07-09 "Gilboa build, Steps 1–5" entry. Five commits, each independently
build/lint/vitest-checked; full gate (vitest 117/117, build, e2e 7/7, plus a
manual console-error check of `/observe/gilboa-battle` specifically) run once
at the end. `npm run verify` as a single command was not invoked — its
constituent checks were run individually instead (see run-log for exact
commands); re-run the actual `npm run verify` script next session to confirm
nothing about the combined gate itself (e.g. its own script wiring) has drifted.

## Next session: pick in this order

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
