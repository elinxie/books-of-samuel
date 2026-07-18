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

## Milestone 2 — 1 Samuel 30 route and recovery: **released** (2026-07-08 Fable sign-off, gate green)

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

M2 close-out: Fable ran `docs/fable-review-checklist.md` 2026-07-08 over both
scenes — pass. Flips: M2 milestone, both scenes, `brook-besor` location, and
the `1sam-30` passage all `released`; features besor/camp/spoil-rule `done`.
Scope call: `f-dem-terrain` re-scoped M2 → M3 (no M2 scene is at an identified
site). Queue #11 (Egyptian dress) resolved — conservative shared-dress kept,
revisit at the M3 modeled-figure dress review. See `docs/run-log.md`.

## Milestone 3–4: M3 **released** (2026-07-18 Fable sign-off, gate green)

M3 flipped `released` in `src/data/milestones.ts` 2026-07-18: the last
release gate (queue #13, Philistine headdress attribution) was ruled
sufficient (queue #16/#17 had already cleared 2026-07-16). All three scenes
(`gilboa-battle`, `beth-shan-walls`, `jabesh-burial`) → `released`; features
`f-gilboa`/`f-beth-shan`/`f-jabesh` → `done`; passage `1sam-31` →
`released`. Full ruling: `docs/fable-review-queue.md` Resolved #13 (Open
table now empty); `docs/run-log.md` 2026-07-18 entry. See `src/data/
milestones.ts` for goals.

`gilboa-battle` world-director brief done 2026-07-09 (Fable):
`docs/design/gilboa-battle-brief.md`, `SceneDef` beats/viewpoints filled in
`src/data/scenes.ts` (brief-only pass; build followed below). Scope: 1 Sam
31:1–6 only (rout + death sequence); wall-display/stripping belongs to
`beth-shan-walls`. Key calls: `ridge` `TerrainSpec` feature required (ADR-005; engine primitive
and first Gilboa terrain spec landed 2026-07-09); procedural terrain for v1, DEM deferred (queue #12
opened); Israelite/Philistine dress differentiated conservatively, plumed
Philistine headdress on principals only behind a dispute label (queue #13
opened, must clear before `released`); ADR-010's procedural rig already
satisfies the "modeled-figure pilot" — no new glTF hero needed, just kit
attachments + fallen pose buckets. `gilboa-battle` built 2026-07-09 (Sonnet,
`status: 'in-progress'`): real limbed crowd figures (not capsule+sphere),
mutual-combat clash beat, rout dust, ~325 figures at high tier. Sandboxed
relative perf check found a ~1.5x frame-time regression vs. pre-slice
(GPU-less SwiftShader renderer — real signal, not proof-on-real-hardware);
real-hardware check still open (`docs/next-run.md` item 0).

Two more M3 world-director briefs done 2026-07-14 (Fable, `world-director`
subagent): `docs/design/beth-shan-walls-brief.md` and
`docs/design/jabesh-burial-brief.md` — briefs only, both scenes stay
`planned`/empty in `src/data/scenes.ts` (no beats/viewpoints yet). Beth-shan:
the project's first identified/excavated site (Tel Beth-Shean); wall rendered
as narrated-but-archaeologically-thin; four wrapped/undetailed body forms (no
severed head/dismemberment ever); Philistine-control disputed via
`scholarlyViews`; ~55-70 figures at high tier. Jabesh-gilead: stays a
disclosed composite (site identification unresolved, register #8); extends
ADR-009's principles to funerary burning (covered-before-flame, no
burning-body silhouette ever — queued for ADR-009 wording ratification);
bones as a wrapped bundle, not skeletal geometry; ~45-55 figures, smallest M3
cast. New queue items opened: #16 (Beth-shan archaeological-horizon
page-verification against `mazar-beth-shean-2006`) and #17 (Jabesh pyre
ADR-009 extension + cremation-scholarship citations) — both gate only their
scene's path to `released`, not the build.

**Both scenes built 2026-07-15 (Sonnet)**, closing out M3's scene builds:
`status: 'in-progress'`, `depictsDeath: true` (violence advisory wires
automatically). `beth-shan-walls` (commit `6e48f90`): tell terrain + dense
summit-quarter house massing, narrated-but-thin wall/gate, four
wall-display forms + up to 2 labeled Egyptian monuments, escort/retrieval
reenactment (8 beats, 5 viewpoints) — 57 figures at high tier (36 town + 12
escort + 9 retrieval). `jabesh-burial` (commit `68813b6`): Wadi Yabis
terrain + open unwalled hamlet layout, night retrieval → covered-before-
flame pyre → bone-bundle burial → seven-day fast (7 beats, 5 viewpoints) —
47 figures at high tier (11 retrieval column + 36 villagers); reuses
`claim-jabesh-retrieval`/`men-of-jabesh` and `buildWrappedFormGeometry` from
beth-shan-walls by id rather than duplicating. New shared engine piece:
`src/engine/characters/wrappedForm.ts` (`buildWrappedFormGeometry`) for
wrapped-silhouette bodies (display forms, biers, bone bundle). Performance-
reviewed: beth-shan-walls clean, no fixes; jabesh-burial had one fix
(`c5aac8f`, hoisted 4 per-frame `Color.clone()` calls in the seven-day
shimmer branch to module-scope scratch objects). Full `npm run verify`
(format/lint/269 vitest/build/8 e2e) green. Queue #16/#17 stay open — gate
`released` only, not the build; not resolved by this pass. Non-blocking
judgement calls flagged for a later review (see `docs/next-run.md`):
beth-shan-walls picked the lower value from the brief's dual-value
confidence ranges (`moderate/low`→`moderate`, `low/moderate`→`low`);
jabesh-burial chose evenly-paced beat timing (brief specifies beat order,
not seconds).

**M3 Fable sign-off, 2026-07-16** (branch `claude/focused-mccarthy-o8d4os`):
full `docs/fable-review-checklist.md` pass over all three scenes — approved
as built. M3 → `in-progress` (not `released`: queue #13/#16/#17
page-verification gates stay open); `f-gilboa`/`f-beth-shan`/`f-jabesh` →
`in-progress`. Queue #12 resolved (ADR-012, DEM sourcing policy), #14
resolved (battle-scale chain approved), #15 stale duplicate removed, #17
narrowed (ADR-009 funerary-burning extension ratified; citations remain).
All build-agent-flagged ambiguities approved as shipped. `npm run verify`
green this session. Full detail: `docs/run-log.md` 2026-07-16 entry.

**Cross-cutting, done 2026-07-14 (project-wide, not scene-specific):** ADR-009's
first-visit violence advisory is built (`src/ui/ViolenceAdvisory.tsx`,
`SceneDef.depictsDeath` flag) — now wired for `gilboa-battle`,
`beth-shan-walls`, and `jabesh-burial`. `integrity.test.ts`'s ESV
excerpt-budget check now also scans `SCENES[].beats[].caption`, not just
`PASSAGES[].keyExcerpts`.

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

- `npm run format:check` — pass (Sonnet session, 2026-07-18)
- `npm run lint` — pass (Sonnet session, 2026-07-18)
- `npm run test` (vitest) — 269/269 pass (Sonnet session, 2026-07-18)
- `npm run build` — pass (Sonnet session, 2026-07-18)
- `npm run e2e` (playwright) — 8/8 pass (Sonnet session, 2026-07-18, sandboxed
  with
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`)
- PR #35 (queue #13/#16/#17 citation pass) merged into `main` (`b65136f`);
  M3 release ruling (this session) lands on top, same branch pattern.
- PR #30 (both remaining M3 scene builds) merged into `main` (`bebb88e`);
  `main` at `3d72f3d` at the time of the M3 sign-off.
- PR #13 (besor-crossing) merged into `main` as `5fceb3f` 2026-07-08.
