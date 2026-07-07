# Progress

Keep this concise — status, not narrative. Detailed roadmap lives in
`src/data/milestones.ts` (rendered at `/progress` in-app).

## Milestone 0 — Repo foundation: **done**

- Stack chosen + documented (`docs/architecture.md`, ADR-001).
- Data model implemented (`src/data/types.ts` + seeded content).
- Research/source folder structure + ingestion policy.
- Progress/features/sources/method pages.
- Unit tests (31 passing: data integrity, source cards, store, reenactment timing).
- Playwright smoke suite (6 passing).
- CI + GitHub Pages deploy workflows.
- Continuation docs, subagents, slash commands (this pass).

## Milestone 1 — 1 Samuel 30 vertical slice (Ziklag): **in progress, functionally complete**

Done:

- Ziklag burned-settlement scene: terrain, houses, wall/gate, smoke, vegetation,
  well, fields, threshing floor — all labeled placeholders.
- Scripted reenactment (return, grief, mutiny talk, David strengthens himself,
  Abiathar/ephod inquiry, departure south) driven by a pure, unit-tested pose
  function, scrubbable via the timeline.
- First-person observer camera: inspect (orbit) and walk (pointer-lock WASD) modes.
- Quality modes (study/balanced/high) wired through every instanced system.
- Sources / scholarly-notes / labels toggles; theological-commentary toggle present
  but disabled ("coming later").
- Teleport panel (viewpoints + scene/region index).
- "Certain vs. reconstructed" panel grouped by confidence.
- Entity inspector with claim cards + scholarly views + source citations.
- 16 source cards seeded; ESV excerpt budget enforced by test.

Remaining for a clean M1 close-out:

- One short final checklist pass (`docs/fable-review-checklist.md`) before
  flipping `M1` to `released` in `src/data/milestones.ts` — this is a Fable
  milestone-sign-off task (`docs/model-handoff.md` priority 1), not Sonnet's to
  self-certify. The creative-direction review items (plan type, figure ratio,
  lighting) were all resolved at the 2026-07-07 Fable session
  (`fable-review-queue.md` Resolved), which also landed ADR-005…ADR-009 (terrain
  generalization, layout conventions, reenactment pattern, asset pipeline,
  violence default). ADR-005's consumer migration (store-held active `Terrain`,
  scene registry, `SceneEntityDef` decoupling) is done too — see
  `docs/architecture-decisions/adr-005-terrain-generalization.md`. Citation
  verification (queue item 4) closed 2026-07-07 (Sonnet) — see
  `docs/fable-review-queue.md` Resolved and the source cards.

## Milestone 2–4: **planned**, not started. See `src/data/milestones.ts` for goals.

## Visual-fidelity roadmap (parallel track, not milestone-gated)

See `docs/visual-fidelity-roadmap.md`. Slices landed 2026-07-07:

- Ziklag ground-color zones key off real layout data (`SMOKE_ORIGINS`,
  `GATE_TOWERS`) instead of one uniform ash disk — darker scorch patches
  under individually-burned houses (severity-scaled), a lighter worn-dust
  halo at the gate approach. Covered by isolated-comparison tests in
  `src/scenes/ziklag/terrain.test.ts`.
- Settlement material variation: house walls/socles and perimeter-wall
  segments in `Settlement.tsx` get per-mesh seeded hue/roughness jitter
  instead of two flat repeated tones (houses aren't instanced, so this is a
  material array, not `instanceColor`).

## Repo note: companion reader at `/reader/`

A separate Claude Code session had independently built and merged (into `main`,
before this branch's PR) an unrelated static KJV/WEB full-text reader under the
same repo. Reconciled per user direction: it now lives at `/reader/` as a
companion full-text tool (its own README, own Python toolchain, not part of this
project's stack) — see `docs/architecture.md` § "The `reader/` companion" and
`docs/run-log.md` for the full story. Root `LICENSE` (MIT) came from that merge
and now covers the whole repo's code.

## Build/test status as of last run

- `npm run format:check` — pass
- `npm run lint` — pass
- `npm run test` (vitest) — 38/38 pass (31 + 7 terrain tests: ADR-005's 8 minus
  the deprecated-delegate test removed when `terrainHeight`/`buildTerrainGeometry`
  were deleted in the consumer migration)
- `npm run build` — pass (also copies `reader/index.html` → `dist/reader/index.html`)
- `npm run e2e` (playwright) — 7/7 pass (sandboxed env needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium`; unnecessary in normal CI)
