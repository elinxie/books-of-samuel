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

## Milestone 3 — 1 Samuel 31 Gilboa: **released** (2026-07-19 Fable release pass; built and approved 2026-07-16, gates #13/#16/#17 since cleared)

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

**Citation-gate clearance, 2026-07-16 (three parallel researcher passes):**
queue #16 (Beth-shan archaeological horizon) and #17 (Jabesh cremation
scholarship) resolved via corroborated secondary sources with narrow
disclosed `TO VERIFY` pagination hedges (queue-#4 precedent); #13 (Philistine
headdress) narrowed to a precisely characterized question — corroborated
Philistine self-representation on the coastal plain (Ashkelon krater, Ekron
linchpin), but no direct highland/Iron IIA attestation. Seven new source
cards across the three passes.

**M3 release close-out, 2026-07-19 (Fable):** all three scenes → `released`.
`beth-shan-walls` and `jabesh-burial` flip on the resolved #16/#17 gates.
`gilboa-battle` flips on a Fable ruling resolving #13: the corroborated-but-
geographically-adjacent citation state is sufficient because the residual
highland/Iron IIA gap is a permanent evidentiary state (not closable
research) and the render already carries it honestly — principal-tier-only
headdress behind `claim-philistine-kit`'s two-view `scholarlyViews` dispute,
basis `comparative-ane`, confidence `low`. Cascade per the 2026-07-16
sign-off's criterion and M2 precedent: M3 milestone → `released`;
`f-gilboa`/`f-beth-shan`/`f-jabesh` → `done`; `1sam-31` passage and the
`mount-gilboa`/`beth-shan`/`jabesh-gilead` locations → `released`. Queue
Open table now empty. Still open, non-blocking (ruled so both at the
2026-07-16 sign-off and again here): the real-hardware performance check of
`gilboa-battle` at high tier — top item in `docs/next-run.md`. `f-dem-terrain`
stays `planned` (non-gating per ADR-012).

**Cross-cutting, done 2026-07-14 (project-wide, not scene-specific):** ADR-009's
first-visit violence advisory is built (`src/ui/ViolenceAdvisory.tsx`,
`SceneDef.depictsDeath` flag) — now wired for `gilboa-battle`,
`beth-shan-walls`, and `jabesh-burial`. `integrity.test.ts`'s ESV
excerpt-budget check now also scans `SCENES[].beats[].caption`, not just
`PASSAGES[].keyExcerpts`.

## Milestone 4 — 2 Samuel 1–2: **released** (2026-08-02 Fable release pass)

The scope decision, all three world-director briefs, and all three scene
builds were done by Sonnet under `docs/model-handoff.md`'s Fable-unavailable
fallback (2026-07-22). **The real Fable review ran 2026-08-02 and confirmed
the entire package** (queue #18 → Resolved): the 3-scene breakdown, all three
briefs' creative calls, and the builds' fidelity to them — approved as built,
with two small content corrections applied at review (`gibeon-pool` retitled
to name Abner/Joab rather than the never-staged Ish-bosheth; `ziklag-lament`'s
`b-account` caption rephrased to contrast the messenger's story with "the
narrative's own account" instead of asserting "how Saul actually died"). The
Asahel-death restraint template was ratified into ADR-009 (§Named-character
killings) as the standard for all future named-character killings.

3-scene breakdown (confirmed): `ziklag-lament` (2 Sam 1), `hebron-anointing`
(2 Sam 2:1–7), `gibeon-pool` (2 Sam 2:8–32, built 2026-08-02 session, commit
`d810db3`+`edcade8` — pool-across-water tableau, literal 1:1 champions,
Asahel death per the ADR-009 template, ~90–115 high-tier combat figures). The
milestone's 4th goal (divided-kingdom political geography) is **confirmed as
an atlas/map UI overlay, not a 4th 3D scene** — `ui-engineer` may proceed;
design constraints (soft allegiance regions, no invented border lines,
Mahanaim's dispute surfaced, schematic disclosure, toggleable) are in queue
#18's resolution. New `gibeon` (settled identification) and `mahanaim`
(disputed, narrated-only — no scene there) locations added.

Release (2026-08-02 Fable release pass): queue **#19**'s four citation gates
all closed the same day — (a) named Gill/Keil attributions on the
messenger-account `scholarlyViews` plus a McCarter card, per the #17
precedent; (b) live ESV wording check that caught and fixed a real 1:26
caption error (budget re-verified, 249/500); (c) Tell Rumeida town-form
closed as "checked, permanently thin" under the #13 permanent-evidentiary-
state standard — three citable sources confirm the 11th–10th-century gap,
so `claim-hebron-town-form`'s disclosed `design-placeholder` stands as the
honest, releasable rendering; (d) the Gibeon pool's construction
affirmatively dated Iron I/10th c. BCE (Pritchard + Tamburrini 2021),
`claim-gibeon-pool-form` raised low → moderate. The divided-kingdom atlas
overlay (`/atlas`, `AtlasPage`, `claim-divided-kingdom-atlas-overlay`) was
verified landed before treating M4 complete. Cascade flipped together per
the M2/M3 precedent: all three scenes, `M4`, `f-2sam` (→ `done`),
`2sam-1`/`2sam-2`, and the `hebron`/`gibeon` locations → `released`; the
`ziklag` location also flipped (both its scenes now released — closes an
M1/M2-era oversight). `mahanaim` stays `planned` (never built, disputed
site). Non-blocking riders carried forward: real-hardware perf check,
Pages-live check, `TO VERIFY` pagination hedges.

`ziklag-lament`: the project's first conversation-scale scene (~12 figures,
not a crowd ratio); its hardest constraint — the Amalekite messenger's
claim to have killed Saul must never be visually corroborated against
`gilboa-battle`'s own 1 Sam 31:4 — is enforced by a dedicated test.
`hebron-anointing`: the largest M4 crowd (≈303 figures high-tier), a new
Judean-highland terrain palette (the project's fifth), and a hard framing
constraint (David anointed over the house of Judah only, never Israel,
carried in every relevant caption) — the ~150–200-figure assembly crowd is
fully static/baked for performance. Both gates independently re-verified
(not just taken from build-agent reports): format/lint/typecheck/315
vitest/build/8-8 e2e, all green. All brief-flagged character/claim gaps
across all three briefs are filled (`amalekite-messenger`, `abner`,
`ish-bosheth`, `joab`, `abishai`, `asahel`, `men-of-judah` + their claims).
See `docs/run-log.md`'s 2026-07-22 entries for full detail.

## Milestone 5 — 2 Samuel 3–4: **in-progress** (two of three scenes built 2026-08-07)

`hebron-gate` built 2026-08-07 (Sonnet/`threejs-engineer`, commit `7aa0ae1`,
on top of `hebron-covenant`): status `in-progress`, `depictsDeath: true`, 13
beats, 5 viewpoints — the milestone's load-bearing scene and ADR-009's
named-character-killing template's second application (first:
`gibeon-pool`/Asahel). Documentary-distance staging throughout: no
wound/blood/weapon geometry in any mode (independently re-checked by the
orchestrating session via grep, not just the build report — confirmed
clean); the drawing-aside (3:27a) is the one shown gesture, the strike is
never animated, only Abner's own collapse; strike staged as Joab's alone
even though 3:30 names Abishai (structurally enforced — Abishai's pose
function has no fall-transform); reduced mode actually elides the strike
(`fallDuration` reaches ~1 at ~12% of standard duration); "but David did not
know it" structurally enforced (David's position never nears the killing
ground before he hears of it). No monumental six-chamber gate, no medieval
Tomb-of-Abner adoption, no 2 Sam 4+/5+/1 Kings leakage (also independently
re-checked, clean). 8 new claims incl. `claim-abner-killing` and
`claim-public-response` (both `scholarlyViews`, hedged pending the
McCarter-extension researcher pass); 2 new placeholder assets
(`asset-hebron-gate-passage`, `asset-bier`). `2sam-3` now spends its ESV
excerpt budget (3:33b–34a lament core + 3:38, 164 chars) — **not
live-verified against ESV.org** (this sandbox's network proxy blocks
esv.org/biblegateway.com, confirmed again this session via `WebFetch`; same
sandbox limitation as `ziklag-lament`'s 2026-07-22 quotes) but cross-checked
against the orchestrating session's own knowledge and reads correct; flag
for a live-source check before `released`, same as the standing
`ziklag-lament` item. High-tier figure total ≈124 (within the 100–140
band). One rider for `performance-reviewer`: the mourning assembly is a
single rigid-pose `InstancedMesh` even while it moves during the procession
beat — worth a look, not yet reviewed. Independently re-verified gate: 426
vitest, 9/9 e2e, build clean.

`hebron-covenant` built 2026-08-07 (Sonnet/`threejs-engineer`, commit
`fd1834f`): status `in-progress`, `depictsDeath: false`, 9 beats (4 context
cards for 3:1–19, then staged arrival/feast/pledge/peace, closing pointer to
`hebron-gate`), 4 viewpoints. Reuses `hebron-anointing`'s `TownAndPlaza`/
`TerraceWalls`/`Vegetation` components directly (not just constants — flagged
as a step beyond ADR-006's literal wording, worth a look at the next Fable
pass but not blocking). Abner's twenty render literal 1:1; David's escort and
town background are disclosed design counts (~60–80 figures high-tier,
smallest M5 crowd by design). 6 new claims (`claim-long-war`,
`claim-abner-break`, `claim-abner-overture`, `claim-covenant-feast`,
`claim-feast-form`, `claim-covenant-cast-scale`); 3 new referenced-only
characters (`michal`, `paltiel`, `rizpah` — no geometry, no invented named
members of the twenty); no Joab, no palace/banquet architecture (verified by
grep, not just trusted from the build report). New `2sam-3` passage entry,
`in-progress`, deliberately zero ESV `keyExcerpts` — the shared 2sam-3 quote
budget is left for `hebron-gate`. Gate independently re-verified by the
orchestrating session after the build: 392 vitest, 9/9 e2e, build clean.
`claim-abner-break` does not yet cite `mccarter-1984-ii-samuel` (that source
card's `relevantPassages` only covers 2 Sam 1) — folds into the researcher
pass below. `hebron-gate` and `hebron-reckoning` still `planned`/empty.

**Previously:** scoped + briefed 2026-08-03, Fable world-director pass, no
build yet.

Scope decision (Fable, 2026-08-03): chapters 3 and 4 bundled into one
milestone, M4-style. Reasoning: 2 Sam 4 alone cannot sustain a milestone —
its murder site is the deliberately-unbuilt, disputed Mahanaim, leaving only
the Hebron judgment stageable; 3–4 form one narrative unit (the collapse of
the house of Saul, closing at 4:12 with the burial in Abner's tomb); and all
staged action shares the already-built Hebron, so one milestone amortizes the
geometry reuse. M6 will start at 2 Samuel 5 (all-Israel anointing, Jerusalem
— genuinely new scope).

Three scenes, all at Hebron (hard continuity rule: reuse `hebron-anointing`'s
palette/massing/layout constants), plus an atlas extension:

- `hebron-covenant` (2 Sam 3:1–21, staged from 3:20) — Abner's twenty-man
  delegation (literal 1:1), the feast, the threefold "he went in peace."
  Michal/Paltiel and the Rizpah accusation carried as cards, not staged.
  `docs/design/hebron-covenant-brief.md`.
- `hebron-gate` (2 Sam 3:22–39) — the recall (cistern of Sirah narrated),
  the killing in the midst of the gate under ADR-009's named-character-
  killing template (2nd application), David's disavowal and curse, the
  funeral procession with Joab commanded to mourn, the lament, the fast.
  Motive framing (blood vengeance vs. rival elimination) and the
  Davidic-apologia reading both carried as `scholarlyViews`, never
  editorialized. `docs/design/hebron-gate-brief.md`.
- `hebron-reckoning` (2 Sam 4) — the assassination narrated by cards only
  (no Mahanaim geometry; 4:6 MT/LXX divergence surfaced), the assassins'
  arrival, David's judgment (the text's own 4:10 cross-link to
  `ziklag-lament`), the execution, and the burial of the head (covered
  bundle only — never anatomy) in Abner's tomb. Hands-and-feet display is
  caption-only under ADR-009's unconditional dismemberment bar.
  `docs/design/hebron-reckoning-brief.md`.
- Atlas extension: `/atlas` gains the 2 Sam 3–4 phase (long-war trend,
  northern collapse) — UI work per ADR-011, not a 4th scene.

Build order: `hebron-covenant` → `hebron-gate` → `hebron-reckoning` → atlas
extension. Researcher gaps (non-blocking to build, gating named attributions
before release) listed in `docs/next-run.md`: McCarter coverage extension to
2 Sam 3–4, Herzog gate typology, King & Stager feasting/mourning material,
Hebron water installations. No new fable-review-queue items — the contested
staging calls were resolved in the 2026-08-03 Fable pass and recorded in the
briefs; release gates open at the M5 review per M3/M4 precedent.

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

- `npm run format:check` — pass (Fable session, 2026-07-19)
- `npm run lint` — pass (Fable session, 2026-07-19)
- `npm run test` (vitest) — pass (Fable session, 2026-07-19)
- `npm run build` — pass (Fable session, 2026-07-19)
- `npm run e2e` (playwright) — 8/8 pass (Fable session, 2026-07-19, sandboxed
  with `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium`)
- PR #30 (both remaining M3 scene builds) merged into `main` (`bebb88e`);
  `main` at `3d72f3d` at the time of the M3 sign-off.
- PR #13 (besor-crossing) merged into `main` as `5fceb3f` 2026-07-08.
