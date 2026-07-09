# Scene brief — Mount Gilboa, the death of Saul (`gilboa-battle`, M3)

World-director pass, Fable, 2026-07-09. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First scene of Milestone 3.

Scope guard: this brief covers **1 Samuel 31:1–6 only** — the rout and the death
sequence on the ridge. The stripping of the slain (31:8), the armor in the temple
of Ashtaroth, and the display of the bodies on the wall (31:9–10) are **next-day**
events by the text's own reckoning and belong to `beth-shan-walls`, a separate
world-director pass. The night retrieval and burial belong to `jabesh-burial`.
Nothing in this scene depicts a wall, a severed head, or the aftermath march.

## Historical intent

The observer should come away understanding four things:

1. **The topography is the reason.** Gilboa is a real, securely identified ridge
   (Jebel Faqqu'a) on the eastern rim of the Jezreel Valley (`claim-gilboa-topography`,
   anchor). Israel held the high ground; the Philistines pressed up from the plain
   near Shunem (1 Sam 28:4). The scene's whole geometry — high crest, open valley
   below, an eastern escape slope — is what makes the rout legible as a rout. This
   is the project's **first identified, non-composite battlefield** (unlike Ziklag
   or the Amalekite camp), and the terrain should carry that difference.
2. **A defeat, staged around a death — not a battle simulator.** The text opens
   with the line already broken: "the men of Israel fled… and fell down slain on
   Mount Gilboa" (31:1). We render a rout in progress and the death sequence as its
   spine; the pitched clash is onset/context, compressed — the same restraint the
   Amalekite strike used. No combat mechanics, no win/loss framing (hard constraint).
3. **The death sequence is human, not spectacular.** Three sons overtaken (31:2),
   the king found by archers and badly wounded (31:3), the armor-bearer who **will
   not** strike his king "for he feared greatly" (31:4), Saul's suicide, and the
   armor-bearer following him (31:5). ADR-009 governs the rendering: honest, at
   documentary distance, no gore geometry, no dismemberment in any mode. The
   armor-bearer's refusal is the emotional pivot and is identical in both modes.
4. **The ridge empties.** The scene ends on 31:6 — Saul, his three sons, his
   armor-bearer, and his men dead "on the same day together" — and the ridge going
   quiet at dusk. A closing card points forward to Beth-shan ("on the next day the
   Philistines came…") **without depicting it**. The silence is the point, not the
   spectacle that follows it.

## Resolved design calls (this pass)

- **Ridge terrain feature — REQUIRED, add it.** Implement the `ridge` `TerrainSpec`
  feature (elongated rise between two points) anticipated by ADR-005. Do **not**
  approximate the ridge by stacking `mound` features — that misrepresents the one
  thing this site is about. Threejs-engineer/Sonnet implementation task, blocking
  geometry.
- **DEM vs. procedural — procedural `ridge` + `hills` for v1; DEM deferred.**
  Reasons: (a) DEM sourcing/licensing is untouched territory for this repo —
  introducing SRTM/ASTER elevation data is its own data-provenance decision
  (license, attribution, vertical datum, resampling) and should not block the first
  build; (b) the historical claim is _relative_ topography (ridge above valley,
  eastern escape slope), which a parameterized `ridge` conveys honestly at
  observation scale; (c) a survey-grade DEM Gilboa would imply a precision the rest
  of the scene (figures, kit) does not have — a fidelity mismatch that would read as
  a false assertion. The procedural ridge is disclosed as a `design-placeholder` for
  microrelief (`claim-gilboa-terrain-form`). **A dedicated DEM data-sourcing +
  licensing ADR is opened in `docs/fable-review-queue.md`** as genuinely open,
  Fable-tier work — DEM is a later refinement, not a v1 requirement.
- **Dress review — differentiate now, conservatively.** Gilboa is the first scene
  where distinct kit carries real meaning: Israelite muster vs. Philistine coalition,
  and the archers are named in the text (31:3), so bows are load-bearing, not
  decorative. Verdict: Israelite combatants keep the generic tunic/cloak base
  (`claim-dress`) plus simple, **non-uniform** arms — spears, shields, some bows;
  Saul and his sons get marginally more kit as principals (`claim-israelite-muster-kit`).
  Philistines get a distinct kit profile — round shields, straight swords, and a
  forward **archer element** (`claim-philistine-kit`). The one genuinely contested
  element is the plumed/feathered headdress (the Medinet Habu "Sea Peoples" marker):
  it is the single most recognizable and most-discussed Philistine signifier, so
  omitting it entirely is its own distortion, but the ethnic/temporal application is
  contested (Egyptian propaganda relief, c. 1175 BCE; persistence into Iron I/IIA
  highland warfare debated). Call: render it **on Philistine principal-tier figures
  only** (not crowd), behind a dispute label carried as `scholarlyViews` on
  `claim-philistine-kit`. **Source page-verification of the plumed-headdress
  attribution is queued** (parallel to register #10's citation-verification pattern)
  and must clear before the scene ships `released`.
- **Modeled-figure pilot — already substantially satisfied; do NOT schedule
  redundant work.** Verified: ADR-010 (procedural skinned characters) landed at M1
  sign-off; `src/engine/characters/` already carries a stable 17-bone skeleton,
  principal + crowd detail tiers, and baked static pose buckets, and
  `besor-crossing` already renders principals with a segmented merged-silhouette
  body (`bodyGeometry.ts`), not a single capsule. The next-run "modeled-figure
  pilot" item is met by this system. Gilboa does **not** need a from-scratch glTF
  hero figure to proceed. What Gilboa newly requires on the existing rig is:
  (a) **military-kit attachment meshes** (spear/shield/bow/round-shield/straight-
  sword/headdress) as instanced attachments, not new body models; and (b) **fallen/
  prone and combat pose buckets** plus the death-sequence pose functions (ADR-007,
  pure pose functions, scrub-safe, beat-invariant test required). The ADR-008
  Blender→glTF pipeline stays available for a later bespoke Saul/Jonathan hero
  refinement, but it is **off the Gilboa critical path**.
- **Violence rendering, per beat (ADR-009) — see the timeline in "Camera /
  observer experience."** One choreography, two treatments; reduction abstracts
  depiction, never facts; no dismemberment or blood geometry in any mode.

## Visual composition

- **Terrain:** a `ridge` feature running roughly west–east across the scene, crest
  near the origin, the **Jezreel plain falling away to the north** (negative z, lower
  ground, the Philistine approach) and an **eastern escape slope descending** (positive
  x) toward the Beth-shan/Jordan side — the direction the rout drains. Palette is a
  dry limestone garrigue/scrub ridge (reuse `Vegetation.tsx` scrub instancing and
  `asset-rocks`, thinning to bare rock on the crest), distinct from the Negev loess
  of the M1/M2 scenes so the regional shift reads. No settlement geometry.
- **Focal masses:** (a) **the crest death-group** near origin — Saul, his three
  sons, his armor-bearer, and a thin bodyguard/retinue, the composition's still
  center; (b) **the Philistine press** climbing the northern slope, with the **archer
  element** as a distinct forward line (they are the agents of 31:3 and must be
  legible); (c) **the rout draw** — Israelite figures streaming down the eastern
  slope, reading by motion and dust more than by count.
- **Sightlines:** from the facing spur (default viewpoint) the observer sees, in one
  frame, the crest group high against the valley haze, the Philistine climb below-
  left, and the eastern rout below-right — the whole defeat's geometry at once. This
  is the money shot; compose it first.
- **Dust and motion, not gore, carry the battle.** A rout-dust system (instanced
  billboards/sprites with a shared material, in the manner of the Amalekite fire
  sprites — `asset-dust-motion`) reads the mass movement. The wider clash is not
  modeled blow-by-blow; the eye reads scale from dust and the emptying ridge.
- **No emblems of victory.** No trophies, standards, or triumphal staging — this is
  a defeat rendered honestly. Lighting rides the arc from a hard dawn (lines drawn)
  to a somber dusk (silence), the hour itself a disclosed `design-placeholder`
  (unstated in text), serving form legibility and honest gravity, not melodrama.

## Scale assumptions

- **The text gives no headcount** for either force, and register #4 (the scale of
  Saul's kingdom is genuinely contested) means the scene must **not** imply a
  specific national army size. We therefore stage the **ridge-crest engagement**,
  not a national army, and disclose this explicitly (`claim-battle-scale`, anchored
  to `claim-david-historical` for the scale debate).
- Rendered figures at high tier, at the disclosed ~1:10 narrated ratio (register #7)
  for the groups we _do_ render, thinning by quality tier:
  - **Crest group** (principal/mid): Saul, Jonathan, Abinadab, Malchi-shua, the
    armor-bearer, + ~10–15 bodyguard/retinue ≈ **~16–20 figures**.
  - **Philistine force:** archer element ~**12–16** (named, required) + pursuing
    infantry ~**40–50** + a few kit-differentiated principals ~**4–6**.
  - **Routing Israelites:** ~**40–50** streaming down the eastern slope.
  - High-tier total ≈ **120–140 combat figures** — in-band with the Amalekite scene
    when tiered down, and capped at or below its per-tier draw-call budget.
- **The rout is deliberately thinned:** we do not assert the crowd is complete. The
  scene reads the defeat by motion, dust, and the emptying ridge — not by a headcount.
  State this in the scene's scholarly notes; it is the honesty hinge of the scale call.

## Camera / observer experience

- **Default viewpoint** (`vp-facing-spur`): a facing spur north across the saddle,
  elevated, looking south at the crest with the Jezreel Valley behind — the whole
  defeat's geometry in one frame.
- Additional viewpoints: **the crest line** (`vp-crest-line`, walk emphasis — the
  high-ground sightline down onto the Philistine climb); **behind the archers**
  (`vp-archers`, looking up at the crest, 31:3); **the death knoll** (`vp-death-knoll`,
  a restrained close vantage on Saul + armor-bearer, slightly high and to the side —
  documentary distance, deliberately _not_ intimate); **the eastern draw**
  (`vp-eastern-draw`, watching the rout drain down-slope).
- **Timeline beats and violence treatment** (implemented in `SceneDef`; standard is
  the default per ADR-009, gated by the one-time advisory):

  | Beat                    | Text       | Standard                                                                                                                                                                                                                      | Reduced                                                                                                       |
  | ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
  | `b-lines`               | 28:4; 31:1 | lines drawn; no violence                                                                                                                                                                                                      | identical                                                                                                     |
  | `b-rout`                | 31:1       | figures crumple/fall at distance in the drift downslope; no gore                                                                                                                                                              | the rout thins and drains; falls elided                                                                       |
  | `b-sons`                | 31:2       | the three fall in the melee at mid-distance; deaths read by the line collapsing over them; no wound/blood geometry                                                                                                            | the melee closes and the beat card carries the fact; the three shown fallen (still), never shown being struck |
  | `b-archers`             | 31:3       | arrow volley; Saul staggers/goes to one knee; **no wound geometry, no blood**                                                                                                                                                 | the volley is shown; Saul's hit is elided — he is simply down/faltering by the next beat                      |
  | `b-armorbearer-refuses` | 31:4a      | the refusal — gesture/dialogue beat; **no violence**                                                                                                                                                                          | **identical** (emotional pivot, same in both modes)                                                           |
  | `b-saul-death`          | 31:4b      | Saul kneels, plants the sword; camera holds at documentary distance / turns to the armor-bearer's face; the fall is read by silhouette going down — **the act understood, never shown graphically; no blade-entry, no blood** | **elided** — cuts from the decision to the aftermath (the still figure); fact carried by caption              |
  | `b-armorbearer-follows` | 31:5       | same restrained treatment as Saul's; implied at distance                                                                                                                                                                      | elided                                                                                                        |
  | `b-silence`             | 31:6       | the emptied ridge at dusk; forward card to Beth-shan, **not depicted**; no violence                                                                                                                                           | identical                                                                                                     |

  Explicitly: **no dismemberment in any mode**, in any beat — the beheading (31:9)
  is next-day and out of scope. Walk mode should make the topography worth crossing:
  crest height, the northern climb, and the eastern draw legible at eye level.

## Performance target

- Same per-tier draw-call ceiling as the Amalekite scene (`QUALITY_PROFILES`).
  Every repeated family — figure, spear, shield, bow, round shield, straight sword,
  headdress, rock, scrub, dust sprite — is one `InstancedMesh`; kit attachments
  instance onto the existing ADR-010 rig rather than spawning new body meshes.
- Dust in one instanced billboard system with a shared material; **no new real-time
  lights** for it (emissive/billboard only) and no water shader. The single-
  directional + hemisphere rig stays; verify shadow budget unchanged.
- Cull the rout and the Philistine press by cluster if the crest group pushes the
  budget. Run `performance-reviewer` after the first geometry slice lands, not at
  the end.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates the scene's `claimIds`/`assetIds`
then — the `SceneDef` arrays stay empty until they exist. All captions paraphrase;
**no new ESV excerpts** (budget guard in `src/data/integrity.test.ts`).

- **Existing, reuse:** `claim-david-historical` (anchor for the not-asserting-army-
  size call, register #4), `claim-dress` (generic dress base), `claim-negev-terrain`
  is **not** reused (wrong region — Gilboa gets its own terrain claim).
- **New, identification/terrain:** `claim-gilboa-topography` (basis
  `scholarly-reconstruction`/`archaeology`, high; `rainey-notley-2006` — secure ID,
  ridge above the Jezreel plain, Philistine approach from Shunem);
  `claim-gilboa-terrain-form` (basis `design-placeholder`, the procedural `ridge`
  approximation and the DEM-deferral disclosure).
- **New, narrated (basis `biblical-text`):** `claim-gilboa-rout` (31:1),
  `claim-sons-killed` (31:2, names Jonathan/Abinadab/Malchi-shua),
  `claim-saul-wounded-archers` (31:3), `claim-armor-bearer-refusal` (31:4–5, the
  refusal, Saul's suicide, and the armor-bearer following — one claim), `claim-saul-
death` (31:6, the deaths "on the same day together").
- **New, material culture (disputed):** `claim-philistine-kit` (basis
  `comparative-ane`/`archaeology`, `king-stager-2001`, `yadin-1963`; moderate/low
  with a `scholarlyViews` block carrying the **plumed-headdress ethnic/temporal
  dispute**); `claim-israelite-muster-kit` (basis `biblical-text` + `comparative-ane`,
  `yadin-1963`, `king-stager-2001`; moderate — non-uniform arms).
- **New, design:** `claim-battle-scale` (n/a-confidence design choice — stage the
  death sequence not a national army, ~1:10 for rendered groups, rout by motion not
  headcount, no army size asserted).
- **Characters (light entries — `CharacterOrGroup` needs only id/name/kind/summary/
  passageRefs/claimIds; no heavy record):** the `saul` entry exists. **Add:**
  `jonathan` (person — major figure), `abinadab-son-of-saul` and `malchi-shua`
  (persons — the text names all three), and `sauls-armor-bearer` (person — his
  refusal is a load-bearing beat). These carry label-based identity + claimIds; no
  full-model requirement.

## Placeholder policy

- **Allowed placeholders** (each gets an `assets.ts` entry with `whyTemporary`
  before `released`): ridge microrelief (procedural, not DEM); all military-kit
  forms (`asset-military-kit-israelite`, `asset-military-kit-philistine`); the
  plumed-headdress form and attribution (principal-tier only, behind the dispute
  label); rout-dust props (`asset-dust-motion`); fallen/prone pose fidelity
  (`asset-figure-fallen` pose bucket on the existing rig); exact figure positions;
  lighting hour (dawn→dusk arc, unstated in text); scrub/rock placement. Terrain:
  `asset-terrain-gilboa-ridge`. Named principal: `asset-saul-marker` (reuse the
  `asset-david-marker` treatment pattern). Base figure: `asset-figure-procedural`
  (existing ADR-010 rig, reuse).
- **Not allowed:** any dismemberment or beheading (out of scope, next-day, Beth-shan);
  blood decals or gore geometry in **any** mode; the wall-display, the temple of
  Ashtaroth, or the stripping of the slain (wrong scene); an asserted national army
  size or any on-screen headcount presented as "the true number"; DEM-grade
  topography presented as survey-accurate; a documented "Philistine uniform" (the
  kit is comparative and partly disputed — it must be labeled, and the honesty of
  the scene depends on the scholarly notes saying so); combat mechanics, win/loss
  framing, or any triumphal staging.
