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

## Milestone 5 — 2 Samuel 3–4: **released** (scoped + briefed 2026-08-03; all three scenes + the atlas phase built 2026-08-10; sign-off review 2026-08-10, approved as built; queue #20 closed 2026-08-12; Fable release pass 2026-08-12)

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

**`hebron-covenant` built 2026-08-10 (Sonnet, commit `5e735e6`, branch
`claude/focused-mccarthy-97j7ef`, PR #55 draft):** first of the three M5
scenes, `status: 'in-progress'`, `depictsDeath: false`. Reuses
`hebron-anointing`'s Hebron terrain/town-form/terrace constants directly — no
new terrain spec, continuing the hard continuity rule. Abner's twenty
delegation rendered literally 1:1 (3:20a's own count); David's-side feast
presence and ambient town background at disclosed design counts (~15–25 /
~20–30 high-tier); ≈71 figures total, the smallest cast of any scene built so
far (a closed diplomatic meal, not a crowd event). The threefold "he went in
peace" formula's first occurrence (3:21b) is staged straight, no ominous
framing — the brief's central instruction. New claims: `claim-long-war`,
`claim-abner-break`, `claim-abner-overture`, `claim-covenant-feast`,
`claim-feast-form` (design-placeholder), `claim-covenant-cast-scale`
(design-placeholder). Michal, Paltiel, and the Rizpah accusation stay
text-only per the brief — three new referenced-only characters
(`michal`/`paltiel`/`rizpah`), no geometry for any of them. New passage
`2sam-3` (`in-progress`); `hebron` location's `sceneIds` extended. One new
asset (`asset-feast-props`, table in `docs/asset-roadmap.md`). `2sam-3`'s ESV
excerpt budget used one quote (3:21a), deliberately reserving the rest for
`hebron-gate`'s lament. Full gate green: format, lint, typecheck, 400 vitest,
build, 9/9 e2e. See `docs/run-log.md`'s 2026-08-10 entry.

**`hebron-gate` built 2026-08-10 (Sonnet, commit `50f4253`, branch
`claude/focused-mccarthy-97j7ef`, PR #55 draft):** second of the three M5
scenes and the milestone's load-bearing one, `status: 'in-progress'`,
`depictsDeath: true`. Second application of ADR-009's named-character-killing
template (first was Asahel, `gibeon-pool`): documentary distance throughout,
no wound/blood geometry in any mode, the drawing-aside gesture (3:27) staged
as the one specific gesture, reduced mode elides the strike entirely (cuts
from the aside straight to the aftermath card — verified by a pose test, not
just asserted). David's curse (3:29) is stated plainly in caption, in the
text's own harshness, never visualized. The refuge-city irony (Josh 20:7) is
deliberately omitted — no named citation exists yet, per the brief's
no-uncited-editorial rule. The gate itself is a modest two-chamber passage,
disclosed `design-placeholder`, explicitly not a monumental six-chamber type.
Reuses `hebron-anointing`/`hebron-covenant`'s Hebron continuity (same
gate-plaza that hosted the anointing and received Abner in peace); the one
new structure is the gate-passage interior (`asset-hebron-gate-passage`).
~127 figures at high tier (raid party ~22, mourning assembly ~79, ambient
~22, 4 principals — David/Joab/Abner/Abishai; the strike is staged as Joab's
alone, per 3:27, though Abishai is present per 3:30's shared culpability),
the largest M5 scene. New claims: `claim-joab-return-protest`,
`claim-abner-killing` (the milestone's most important claim —
`scholarlyViews` carrying blood-vengeance-for-Asahel with the
battlefield-killing legal complication noted, and political
rival-elimination as a separate reading, both hedged "e.g., scholars
following..." pending a researcher pass), `claim-david-disavowal`,
`claim-abner-funeral`, `claim-public-response` (`scholarlyViews`: Davidic-
apologia reading vs. plain-report reading, hedged pending
`mccarter-1984-ii-samuel`'s coverage extension to 2 Sam 3), `claim-hebron-
gate-form` (design-placeholder), `claim-abner-tomb-form` (design-placeholder,
simple rock-cut entry — the medieval "Tomb of Abner" tradition explicitly not
adopted), `claim-gate-cast-scale` (design-placeholder). No new characters
(reuses `david`/`joab`/`abner`/`abishai`). `2sam-3`'s ESV budget: this scene
spent the two quotes `hebron-covenant` reserved for it (3:33b–34a's lament
core, 3:38), for a shared passage total of three — both entered from memory,
not live-source-verified (no outbound Bible-text access in this sandbox, the
same standing caveat as every scene's quotes since `ziklag-lament`). A new
e2e test confirms the ADR-009 first-visit advisory fires for `hebron-gate`
specifically, mirroring the existing `gilboa-battle` coverage. Full gate
green: format, lint, typecheck, 444 vitest, build, 10/10 e2e (independently
re-verified after the build). See `docs/run-log.md`'s 2026-08-10 entry.

**`hebron-reckoning` built 2026-08-10 (Sonnet, commit `9fa2784`, branch
`claude/focused-mccarthy-97j7ef`, PR #55 draft):** third and last of the
three M5 scenes, closing the milestone, `status: 'in-progress'`,
`depictsDeath: true`. Third application of ADR-009's named-killing template,
and the strictest yet — the hands-and-feet display (4:12a) renders not at
all, caption-only; a grep of the whole scene folder confirms no
geometry-producing code anywhere references hands/feet/dismemberment, only
comments and captions, and `AssassinPose` deliberately has no
strike/gesture field at all (unlike `gibeon-pool`'s `reverseGrip`/
`strikeExtend` or `hebron-gate`'s `strikeLean`), since 4:12a gives no method
to invent. The head renders only as a small covered/wrapped bundle
(`buildWrappedFormGeometry`, the Jabesh-bone-bundle device at small scale).
Ish-bosheth's murder (4:5–7) is cards-only — no Mahanaim geometry anywhere —
and the 4:6 MT/LXX entry divergence (MT: fetching-wheat pretext; LXX: a
drowsing wheat-cleaning doorkeeper) is surfaced honestly as `scholarlyViews`,
hedged pending a researcher pass extending `mccarter-1984-ii-samuel` to
2 Sam 4. This scene is `ziklag-lament`'s deliberate textual twin — David
retells the Ziklag episode himself (4:10) — cross-linked in claim notes
rather than restated. Reuses `hebron-anointing`/`hebron-gate`'s Hebron/tomb
continuity directly (the burial in Abner's tomb is the compositional echo of
`hebron-gate`'s burial, same ground, days apart — the milestone's closing
image); one new feature, the pool of Hebron (basin + flat unlit water plane,
no shader, modeled exactly on `gibeon-pool`'s convention,
`claim-hebron-pool-feature`, Birket es-Sultan explicitly not adopted). ~33
figures at high tier (attendants ~12, ambient ~18, David/Rechab/Baanah as
principals), by far the smallest and cheapest M5 scene, conversation-scale
like `ziklag-lament` — the execution is attributed to "the young men" at
David's command, kept as the small textual detail it is (David commands,
attendants act). New passage `2sam-4` (`in-progress`, first M5 scene under
it — M5's second new passage after `2sam-3`). New claims:
`claim-ish-bosheth-assassination`, `claim-david-judgment`,
`claim-hebron-pool-feature` (design-placeholder), `claim-reckoning-cast-scale`
(design-placeholder). New characters: `rechab`, `baanah` (staged persons, the
assassins — not villain-cartooned beyond what the text states),
`mephibosheth` (referenced-only, confined strictly to 2 Sam 4:4's own
parenthesis, no forward pointer to 2 Sam 9). `2sam-4`'s fresh ESV budget:
4:11a ("wicked men have killed a righteous man in his own house on his
bed...") plus the 4:10 Ziklag retelling fragment — again entered from
memory, not live-source-verified. The closing card states only what 4:12
states (the house of Saul's last king dead and buried at Hebron) — no
2 Sam 5+ content anywhere, checked directly against the literal caption
string, not just trusted from the build report. A new e2e test confirms the
ADR-009 advisory fires for `hebron-reckoning` specifically, completing
first-visit-advisory coverage for all three M5 scenes. Full gate green:
format, lint, typecheck, 478 vitest, build, 11/11 e2e (independently
re-verified after the build).

**All three M5 scenes are built, and the `/atlas` M5 phase extension is
also now done** (not a 4th scene, per the M4 precedent): a phase toggle on
`/atlas` adds the 2 Sam 3–4 long-war trend and renders the Israel-writ
region as `headless` ("no king," fainter fill, no stroke — never removed,
reassigned, or merged toward Judah's region) once Ish-bosheth is dead with
no heir positioned to rule, without asserting a unified kingdom or that
David now rules the north (2 Samuel 5 stays entirely out of scope, held by
dedicated structural tests). New claim `claim-atlas-m5-phase`. Full gate
green: format, lint, typecheck, 484 vitest, build, 12/12 e2e. **All M5
build work is now complete.**

**M5 sign-off review done 2026-08-10 — approved as built; M5 is now
`in-progress`.** The review ran on **Opus standing in for Fable** at the
user's explicit direction (Fable's monthly spend limit was still hit); this
was a deliberate, authorized model substitution and a full Fable-tier
`docs/fable-review-checklist.md` pass, not a provisional one, so it needs no
Fable re-review. Every checklist section passed: historical plausibility
(both contested questions carried as genuinely non-adjudicating
`scholarlyViews` — Joab's motive, and apologia-vs-plain-report), anachronism
(two-chamber not six-chamber gate; the medieval "Tomb of Abner" tradition and
Birket es-Sultan both explicitly not adopted; no invented banquet-hall
architecture), visual coherence, performance, tests, source traceability with
its known hedges, and ADR-011. ADR-009's dismemberment bar was verified
against the code rather than the build reports: `hebron-reckoning`'s
`AssassinPose` has no strike/gesture field at all, and hands/feet appear only
in comments and captions. The `~79`-figure `MourningAssembly` perf worry was
**cleared, not carried** — one draw call, 79 matrix updates per frame, an
order of magnitude under `gilboa-battle`'s measured precedent.

Two real defects were found and fixed at the review, both only visible in the
code: `/atlas`'s M5 lede presented a _paraphrase_ of 2 Samuel 3:1 inside
quotation marks with a verse citation (now unquoted narration — and ADR-003
gained a "quoted means verbatim" rule plus page/UI copy as a third budgeted
surface, since the enforced test never scanned page prose); and
`atlasRegions.ts`'s user-visible legend caption claimed the headless region
carried a "dashed outline" that `DividedKingdomMap` deliberately does not
draw. New feature entry `f-2sam-3-4` (`in-progress`) was added — M5 had none,
so its scene work was invisible on the Features page. Uncertainty-register
rows #16/#17 added for M5's two genuine disputes.

**M5 released 2026-08-12 (Fable release pass):** queue #20's five
citation/verification items + the ADR-003 automation rider all closed
2026-08-12 (researcher pass on McCarter/Herzog/King & Stager; Hebron water
installations closed "checked, permanently thin"; all five M5 quoted spans
live-verified verbatim against ESV text). The Fable release pass spot-checked
the claim edits (no forced upgrades; genuine dead-end closures) and executed
the cascade: `hebron-covenant`/`hebron-gate`/`hebron-reckoning` → `released`,
`2sam-3`/`2sam-4` → `released`, `f-2sam-3-4` → `done`, `M5` → `released`.
Full detail: `docs/fable-review-queue.md`'s 2026-08-12 status-flip note.

## Milestone 6 — 2 Samuel 5: **released** (scoped + briefed 2026-08-23; both scenes + atlas phase built 2026-08-24; Sonnet review-tier sign-off 2026-08-24; queue #24 closed as ADR-013 and release cascade executed 2026-08-25)

Scope decision (Fable/`world-director`, 2026-08-23): unlike M4/M5, no
bundling needed — 2 Sam 5 contains two full, distinct, buildable settings the
project has never rendered. Two scenes + an atlas extension:

- `jerusalem-stronghold` (2 Sam 5:6–16) — the milestone's load-bearing scene:
  the Jebusite stronghold's capture, the _tsinnor_ crux (rendered as a
  genuine unresolved crux, no capture-route geometry in any mode), the Millo
  (named as a question, never labeled in geometry), the City of David
  naming, Hiram's cedar/craftsmen folded in as a construction-not-palace
  closing beat, 5:13–16 card-only. `depictsDeath: false`.
  `docs/design/jerusalem-stronghold-brief.md`.
- `rephaim-valley` (2 Sam 5:17–25) — both Philistine engagements as one
  two-phase scene, deliberately lighter violence than `gilboa-battle` (no
  melee choreography, no invented divination apparatus, the divine sign at
  5:24 stated on-screen but never visualized). `depictsDeath: true`, ADR-009
  advisory wired. `docs/design/rephaim-valley-brief.md`.
- 5:1–5 (all-Israel covenant/anointing at Hebron) gets no fourth Hebron
  scene — cards + a `/atlas` M6 phase instead (capital shift Hebron →
  Jerusalem, the two regions unify), per the 2026-08-02 M4 precedent that
  this kind of political-geography change is atlas work. Logged as
  fable-review-queue #21 for confirmation at the M6 review.

Four new fable-review-queue items (#21–#24, none block build work): #21 the
5:1–5 treatment above; #22 a Jerusalem/Jebusite-period source-card gap
cluster (folds into a future `researcher` pass); #23 the _tsinnor_
identification + no-invented-capture-route bar; #24 the new narrated-
divine-sign depiction policy, escalated for ratification. Neither scene may
render any 2 Samuel 6+ content, and neither asserts a chronological order
relative to the other. Full detail: `docs/run-log.md`'s 2026-08-23 entry.

**Build 2026-08-24 (scheduled/automated Sonnet session):** both scenes and
the atlas M6 phase are built and gate-green — `jerusalem-stronghold` (~120
figures), `rephaim-valley` (~131 figures, standard/reduced-mode fork), the
merged-region/moved-capital atlas phase. Queue #22's researcher pass closed
(7 new source cards). `fable-architect` hit its monthly spend limit;
Sonnet-fallback sign-off confirmed #21/#23 as built but left #24 (narrated
divine-sign depiction policy) open as genuinely Fable-tier — **no status
flips made**, everything stayed `in-progress`/`planned` pending a dedicated
pass. Full detail: `docs/run-log.md`'s 2026-08-24 entry,
`docs/fable-review-queue.md`'s #21/#23/#24 rows.

**Queue #24 closed / M6 released, 2026-08-25 (Sonnet, no Fable involved —
Fable was retired project-wide by user directive 2026-08-24, see
`docs/model-handoff.md`).** `docs/architecture-decisions/adr-013-narrated-
supernatural-depiction.md` ratifies `rephaim-valley`'s "stated, never
visualized" default as project-wide policy for any narrated divine/
supernatural event with no described physical mechanism (governs the
supernatural mechanism only — composes with, does not replace, ADR-009's
death-depiction rules for a text's separately-stated worldly outcome, e.g.
Uzzah's death in 2 Sam 6). `claim-divine-sign-depiction`'s notes now point
to ADR-013 instead of carrying an open ratification question. With #21/#23
re-confirmed unchanged since 2026-08-24 and #24 now closed, the queue's Open
table is empty and the release cascade ran per the M3/M4/M5 precedent:
`jerusalem-stronghold`/`rephaim-valley` → `released`; `2sam-5` → `released`;
`jerusalem`/`valley-of-rephaim` → `released`; new feature `f-2sam-5` added
directly as `done` (M6 had no feature entry at build time, the same gap
M5's sign-off found and fixed for `f-2sam-3-4`); `M6` → `released`. Full
`npm run verify` gate green after the flips (format, lint, 546 vitest,
build, 16/16 e2e). Non-blocking riders carried forward, unchanged: live ESV
wording verification for M6's three quotes (5:6b, 5:8a, 5:24); the
real-hardware perf check of `gilboa-battle` at high tier + the Pages-live
check. Full detail: `docs/fable-review-queue.md`'s 2026-08-25 status-flip
note, `docs/run-log.md`'s 2026-08-25 entry.

M7 (2 Samuel 6 onward) has no scope or briefs yet — needs a scoping pass
before any build work, now Sonnet's to run directly (no model to wait on).

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
