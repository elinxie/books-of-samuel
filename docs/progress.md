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

## Milestone 3–4: **planned**, not started. See `src/data/milestones.ts` for goals.

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
scene's path to `released`, not the build. Next: Sonnet/`threejs-engineer`
build of both scenes per their briefs.

**Cross-cutting, done 2026-07-14 (project-wide, not scene-specific):** ADR-009's
first-visit violence advisory is built (`src/ui/ViolenceAdvisory.tsx`,
`SceneDef.depictsDeath` flag, wired for `gilboa-battle`) — the advisory
triggers per scene data, ready for `beth-shan-walls`/`jabesh-burial` to opt in
when built. `integrity.test.ts`'s ESV excerpt-budget check now also scans
`SCENES[].beats[].caption`, not just `PASSAGES[].keyExcerpts`.

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

- `npm run format:check` — pass (Sonnet, 2026-07-14)
- `npm run lint` — pass (Sonnet, 2026-07-14)
- `npm run test` (vitest) — 151/151 pass (Sonnet, 2026-07-14)
- `npm run build` — pass (Sonnet, 2026-07-14)
- `npm run e2e` (playwright) — 8/8 pass (Sonnet, 2026-07-14, sandboxed with
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`)
- Branch `claude/focused-mccarthy-ckjcuh`, not yet merged at time of this
  status line. See `docs/run-log.md`'s 2026-07-14 entry for what's on it.
- PR #13 (besor-crossing) merged into `main` as `5fceb3f` 2026-07-08.
