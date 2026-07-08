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

## Milestone 1 — 1 Samuel 30 vertical slice (Ziklag): **released** (2026-07-08 Fable sign-off, gate green)

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

M1 close-out: closed 2026-07-08 — Fable ran `docs/fable-review-checklist.md`
(full gate green; procedural character system merged via codex PR #8/#9
reviewed clean — no anachronistic gear, honest placeholder disclosure) and
flipped `M1` to `released` in `src/data/milestones.ts`. Rider: run
`performance-reviewer` over `src/engine/characters` instancing/bake path with
the next scene-content slice. See `docs/run-log.md`.

## Milestone 2 — 1 Samuel 30 route and recovery: **planned**, both scenes built — Fable sign-off now due

World-director briefs: `docs/design/besor-crossing-brief.md` and
`docs/design/amalekite-camp-brief.md`, `SceneDef` beats/viewpoints filled in
`src/data/scenes.ts` for both (2026-07-08 Fable pass).

`besor-crossing` built 2026-07-08 (Sonnet): scene status `in-progress` (not
`released` — no Fable M2 sign-off yet, matches the M1/Ziklag pattern). ADR-005
`channel` terrain feature (braided wadi bed, ~130m wide, 8m deep), crowd
reenactment at the ~1:10 ratio (two hundred/four hundred split, ADR-007 pure
pose functions), principal figures (David/Abiathar/Egyptian) now get a
segmented merged-silhouette body (`bodyGeometry.ts`, ~13 primitives via
`mergeGeometries`, vertex-colored) instead of a single capsule — still a
**static** silhouette posed as a rigid group per frame, no bone-driven
animation (`applyClipPose` remains an unimplemented stub). 5 new claims, 3 new
placeholder assets (see `docs/asset-roadmap.md`). Reviewed clean by
archaeology-reviewer, biblical-text-reviewer, performance-reviewer (real fixes
applied, not rubber-stamps — see `docs/run-log.md`); this also closes the M1
sign-off rider (performance review of `src/engine/characters`). One
non-blocking creative-direction item queued:
`docs/fable-review-queue.md` #11 (Egyptian servant dress distinction).

`amalekite-camp` built 2026-07-08 (this session): scene status `planned` →
`in-progress`. Shallow-basin terrain (flatten + scout's-rise mound, worn
grazed ColorZones keyed to cluster layout), 14-cluster fire sprawl (instanced
emissive fires — not real lights), ridge-awning/windbreak shelters
(deliberately not goat-hair tents, `claim-camp-shelters`), spoil heaps/tether
posts, instanced livestock (new `livestockCount` quality-tier field), crowd
reenactment (raiders feast→scatter→crumple-at-distance, attackers, captive
cluster, ADR-007 pure pose functions), camel flight per the resolved register
#6 call (flight beat only, camel+rider merged instanced geometry, pad tack,
dispute on the label), beat-driven lighting (dusk → night firelight → dark
compression trough → next-day evening; single directional + hemisphere rig
throughout), David + Egyptian-guide principals. 7 new claims, 6 new
placeholder assets. Violence per the brief: onset only, no gore geometry, the
fallen not rendered past the compression card. Reviewed by
archaeology/biblical-text/performance reviewers — see `docs/run-log.md`.

M2 milestone stays `planned` in data until Fable runs
`docs/fable-review-checklist.md` and signs off — **that sign-off is now due**
(both scenes built, matching the M1 pattern).

## Milestone 3–4: **planned**, not started. See `src/data/milestones.ts` for goals.

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

## Cross-session infrastructure

- Checkpoint scaffolding (2026-07-08): `scripts/session-usage.mjs` (context
  %/token/cost tracking read from the Claude Code transcript) wired into
  `.claude/settings.json` as statusline + Stop/SessionStart/PreCompact hooks;
  `docs/checkpoint-protocol.md` sets the commit-and-push-per-slice rule.
  Cross-agent handoff docs (`AGENTS.md`, `docs/web-handoff.md`) let Codex and
  Claude Code web sessions resume without this session's chat memory.

## Build/test status as of last run

- `npm run format:check` — pass
- `npm run lint` — pass
- `npm run test` (vitest) — 70/70 pass (up from 51; amalekite-camp terrain +
  reenactment coverage, entity integrity)
- `npm run build` — pass (also copies `reader/index.html` → `dist/reader/index.html`)
- `npm run e2e` (playwright) — 7/7 pass (sandboxed env needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`;
  unnecessary in normal CI)
- Full `npm run verify` gate green 2026-07-08 (amalekite-camp session).
- PR #13 (besor-crossing) merged into `main` as `5fceb3f` 2026-07-08.
