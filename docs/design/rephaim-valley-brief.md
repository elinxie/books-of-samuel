# Scene brief — the Philistines at Baal-perazim and the Valley of Rephaim (`rephaim-valley`, M6)

**PROVISIONAL — Fable unavailable this session (monthly spend limit hit on the
first `fable-architect` call).** Written by Sonnet standing in for the
`world-director` role under `docs/model-handoff.md`'s documented fallback
policy. Tracked in `docs/fable-review-queue.md` (new M6 item) — needs a real
Fable read before any part of this is treated as final creative direction,
and before this scene ships past `in-progress`. Implementation:
Sonnet/`threejs-engineer` within this direction; deviations that change
historical meaning go back through the queue. Second and last scene of
Milestone 6.

Scope guard: this brief covers **2 Samuel 5:17–25 in full** — both Philistine
engagements. It does **not** cover 5:1–16 (`jerusalem-capture`'s territory) or
anything from 2 Samuel 6 onward (the ark procession — the next milestone's
subject; no forward pointer beyond a bare text note). **Location note:**
`locationId` is `valley-of-rephaim`. Baal-perazim (5:20) is treated as a site
within or immediately adjacent to the Valley of Rephaim, per the `valley-of-
rephaim` `LocationEntry`'s own disclosed identification uncertainty — do not
invent a separate, independently-located Baal-perazim geometry distinct from
this scene's one terrain.

## Historical intent

The observer should come away understanding four things:

1. **Two engagements, two different divine answers — that contrast is the
   scene's real subject, not the battles themselves.** 5:19 and 5:23 both
   open with David inquiring of the LORD before acting — but the answers
   differ. The first time: a direct, simple assurance ("Go up, for I will
   certainly give the Philistines into your hand"). The second time: a
   specific, indirect tactical instruction (circle around, wait for a sign —
   the sound of marching in the treetops — then strike). Compose the two
   inquiry beats so the observer can hold them side by side and notice the
   LORD's guidance is not a repeatable formula. This is the scene's
   organizing idea; stage it more deliberately than the combat itself.
2. **This is the project's first clean, narrated military victory — hold the
   documentary tone that has governed every prior battle scene, not a
   celebratory one.** `gilboa-battle` staged a loss; `gibeon-pool` staged a
   civil war where the "winning" side (Judah) still killed fellow
   Israelites. This is a foreign-enemy engagement David's forces win
   outright, twice. ADR-011's constraint against win/loss states that
   distort the material still applies fully: no triumphal staging, no
   trophies, no "victory" framing — render it factually, the way the text
   reports it, without editorializing it into a spectacle.
3. **The idols-abandoned detail (5:21) is a real narrative inversion worth
   surfacing, kept to what 2 Samuel itself says.** The Philistines' gods are
   captured (well — left behind and carried off) here, an inversion of the
   ark's earlier capture by the Philistines. 2 Samuel 5:21 says only that
   the Philistines left their idols and "David and his men carried them
   away." **The burning of these idols is a 1 Chronicles 14:12 addition, not
   a 2 Samuel 5 detail** — do not stage or caption it as fact; if mentioned
   at all, it belongs in a claim's `notes` as a hedged cross-reference, not
   in a beat caption. Note also: the ark narrative itself (1 Samuel 4–5)
   predates this project's own content, which begins at 1 Samuel 27 — there
   is no existing in-app claim or scene to cross-link this inversion to;
   frame it as textual/literary background in caption prose only, not as a
   cross-referenced claim ID that doesn't exist.
4. **The pursuit from Geba to Gezer (5:25) is a rout, and gets the same
   restraint every prior rout in this project has gotten.** No named
   individual Philistine casualties exist in this passage (unlike Asahel or
   Abner) — this is closer to Gilboa's anonymous rout than to any named-
   character killing. `depictsDeath: true`; ADR-009's standard/reduced
   split applies at the rout level (distance, dust/motion carrying the mass,
   no gore, no dismemberment in either mode), not at an individual level.

## Resolved design calls (this pass)

- **Both engagements render as one scene, not two.** They share one broad
  geography (the Valley of Rephaim, with Baal-perazim inside or immediately
  adjacent to it — see the `valley-of-rephaim` `LocationEntry`), one narrow
  span of narrated action (nine verses total), and one organizing idea (the
  inquiry-answer contrast, point 1 above) that only reads clearly if both
  engagements are held in the same scene. Splitting them into two scenes
  would duplicate terrain/asset work for a second site the text itself
  barely distinguishes from the first ("the Philistines came up **yet
  again**," 5:22 — the text's own framing treats this as a second round at
  essentially the same theater, not a new campaign). This mirrors the
  M4/M5 discipline of not inventing a scene the text's own scale doesn't
  support (cf. `hebron-anointing`'s single-scene treatment of 2:1–7 rather
  than splitting the inquiry from the anointing from the Jabesh message).
- **No named Philistine commander or individual.** Unlike Goliath earlier in
  the narrative (outside this project's scope) or the champions at Gibeon,
  this passage names no individual on the Philistine side. Do not invent one.
- **The "sound of marching in the treetops" sign (5:24) is staged as an
  environmental/audio cue, not a visual spectacle.** Wind through a grove
  (see below), a rustle/marching-like sound design moment, held as a genuine
  beat the observer waits through alongside the staged figures — not a
  glowing/obviously-supernatural visual effect. This keeps the "sign" honest
  to the text's own restraint (it describes a sound, not a vision) without
  either flattening it to nothing or over-dramatizing it.
- **The "balsam"/"mulberry" trees (5:23–24, Hebrew _bĕkāʾîm_) are a botanically
  uncertain species — render a generic grove, disclosed.** Translations vary
  (balsam, mulberry, baca-trees — the ESV's own footnote tradition reflects
  real uncertainty), and no consensus botanical identification exists. Do
  not commit to a specific species' foliage/silhouette as historically
  confirmed; use the project's existing scrub/tree instancing (extend, don't
  reinvent) with a generic small-tree grove read, captioned as a disclosed
  placeholder.
- **No invented dress differentiation beyond the existing Philistine/
  Israelite kit split already established at Gilboa.** Reuse
  `claim-philistine-kit`/`claim-israelite-muster-kit` as-is (already carries
  its own `scholarlyViews` dispute label on the feathered-headdress motif,
  principal-tier only) — do not add new kit claims for this scene.

## Visual composition

- **Terrain:** a broad, open valley floor southwest of Jerusalem — flatter
  and more agricultural than the City of David ridge (`jerusalem-capture`)
  or Hebron's terraced hills, consistent with the Valley of Rephaim's real
  topography (a wide, gently sloping agricultural basin). Reuse the Judean-
  highland palette family for consistency with `jerusalem-capture`
  (adjacent, same regional light/stone/vegetation language) but with an open-
  valley-floor variant rather than a ridge or terraced-hill form. One new
  terrain feature: the tree grove for the second engagement's flanking
  maneuver (see Resolved design calls).
- **Focal masses, staged in sequence (two engagements, distinct ground):**
  1. **Baal-perazim** — the first, direct engagement: David's force advances
     and strikes; compose as a straightforward field clash, no elaborate
     tactics, matching the oracle's own simplicity ("go up... I will give
     them into your hand").
  2. **The abandoned-idols ground** — a small, distinct beat at the same
     field: Philistine cultic objects left behind, David's men gathering
     them. A quiet aftermath moment, not a triumphal display.
  3. **The tree grove** — the second engagement's staging ground, distinct
     terrain feature, where the circling maneuver and the treetop sign are
     staged.
  4. **The flanking route and strike** — the wider pursuit implied by "from
     Geba to Gezer" (5:25), carried mostly by camera motion/dust rather than
     literal geometry spanning that real, considerable distance (Geba and
     Gezer are well apart — do not attempt to model the full route; stage
     the strike-and-pursuit at the valley/grove and let the caption carry
     the stated extent of the rout).
- **Sightlines:** the Baal-perazim vantage is a wide field view, direct and
  plain, matching the oracle's directness. The grove vantage is closer,
  more enclosed, building tension before the sign — a deliberate contrast
  in camera language between the two engagements, reinforcing the
  historical-intent point about two different kinds of divine guidance.
- **No triumphal staging anywhere** — same rule as every prior battle scene,
  extended explicitly to a scene where, unlike Gilboa or Gibeon, the
  narrated outcome is an unambiguous, clean win. The discipline matters more
  here, not less: a documentary tone must not slip into a victory-lap tone
  just because the text finally hands the project a clear winner.

## Scale assumptions

- **David's force:** reuse the established ~600 at the standard ~1:10 ratio
  → ~60 figures (`claim-600-men`, reused by reference), split across the two
  engagements as the implementer judges reads best (not necessarily an even
  30/30 split — the text gives no basis to weight one engagement over the
  other, so an even or near-even split is the honest default).
- **The Philistine force(s):** no headcount narrated for either engagement.
  Disclosed design choice (`claim-rephaim-battle-scale`, parallel in form to
  `claim-battle-scale`/`claim-gibeon-battle-scale`), deliberately **at or
  below** Gibeon's already-modest 90–115 combat-figure precedent and well
  below Gilboa's 120–140 cap — this is described in two and three verses per
  engagement respectively, the thinnest narrated combat scale in the project
  so far. Target ≈ 30–45 figures per engagement.
- **High-tier total ≈ 90–110 figures** across both engagements combined
  (David's ~60 + Philistine ~60–90, with some figures read across both
  beats via the pose-bucket system rather than doubled) — state explicitly
  in the scene's scholarly notes that this is a disclosed design choice, not
  derived from any stated army size.

## Camera / observer experience

- **Default viewpoint** (`vp-baal-perazim-field`): the open valley field,
  where the first engagement is staged.
- Additional viewpoints: **the idols ground** (`vp-idols`, close, inspect
  emphasis, the small aftermath beat); **the grove** (`vp-grove`, enclosed,
  tension-building, where the circling maneuver and the sign are staged —
  a good candidate for ADR-011's guided-path affordance, following the
  circling route on foot); **the strike ground** (`vp-strike`, wider,
  dust/motion-carried, the second engagement's rout).
- **Timeline beats and violence treatment** (standard is the default per
  ADR-009, gated by the one-time advisory; `depictsDeath: true`):

  | Beat                  | Text      | Standard                                                                                                                                                                                                                                                                                                      | Reduced                                                                                       |
  | --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
  | `b-philistines-hear`  | 5:17a     | Opening card: the Philistines hear David is anointed king over all Israel and come up seeking him. No geometry beyond a card.                                                                                                                                                                                 | identical                                                                                     |
  | `b-david-strongholds` | 5:17b     | Caption beat: David goes down to the stronghold (referenced, not restaged — this is `jerusalem-capture`'s territory). No new geometry.                                                                                                                                                                        | identical                                                                                     |
  | `b-spread-out-1`      | 5:18      | Staged: the Philistines arrive and spread out in the Valley of Rephaim. Default viewpoint establishing shot, no violence yet.                                                                                                                                                                                 | identical                                                                                     |
  | `b-inquiry-1`         | 5:19      | Staged: David inquires of the LORD; the direct answer ("Go up, for I will certainly give the Philistines into your hand"). Dialogue beat, no violence — compose deliberately plainly, matching the oracle's own directness.                                                                                   | identical                                                                                     |
  | `b-baal-perazim`      | 5:20      | Staged: the engagement itself, direct field clash at distance, dust/motion carrying the mass (same restrained treatment as prior rout/clash beats); David's naming line delivered as caption ("the LORD has broken through my enemies before me like a breaking flood"). No gore, no named individual deaths. | The clash is shown at wider distance; individual moments elided, read by crowd thinning only. |
  | `b-idols-abandoned`   | 5:21      | Staged: a quiet aftermath — Philistine cultic objects left in the field, David's men gathering them. No violence. **No burning staged** (Chronicles-only detail, see Resolved design calls).                                                                                                                  | identical                                                                                     |
  | `b-spread-out-2`      | 5:22      | Staged: the Philistines come up "yet again" and spread out in the valley — establishing shot for the second engagement, echoing `b-spread-out-1`'s composition deliberately (same place, again).                                                                                                              | identical                                                                                     |
  | `b-inquiry-2`         | 5:23a     | Staged: David inquires again; this time the answer is different and specific — do not go up directly, circle around. Compose this beat to contrast visibly with `b-inquiry-1` (see Historical intent #1).                                                                                                     | identical                                                                                     |
  | `b-circle-grove`      | 5:23b     | Staged: the circling maneuver toward the tree grove. Walk/follow camera, guided-path candidate. No violence yet.                                                                                                                                                                                              | identical                                                                                     |
  | `b-treetop-sign`      | 5:24a     | Staged: the wait for the sign — sound of marching in the treetops — held as a genuine beat, audio/environmental, no visual spectacle. The tension beat of the scene.                                                                                                                                          | identical                                                                                     |
  | `b-strike`            | 5:24b–25a | Staged: "the LORD has gone out before you" — the strike itself, same restrained clash/dust treatment as `b-baal-perazim`. No gore, no named individual deaths, in either mode.                                                                                                                                | Elided to the aftermath; caption states the strike happened and the sign that preceded it.    |
  | `b-geba-gezer`        | 5:25b     | Text-only closing beat: the pursuit "from Geba to Gezer" delivered as caption — a real geographic extent (well beyond this scene's built terrain), not attempted as literal traversed geometry.                                                                                                               | identical                                                                                     |
  | `b-close`             | —         | Closing card: bare forward pointer to the next narrated event only (the ark's procession, 2 Samuel 6) — stated as a pointer with no preview of its content, matching the M4/M5 in-milestone-pointer convention extended across a milestone boundary since this is the milestone's last scene.                 | identical                                                                                     |

  Explicitly, matching every prior battle scene's precedent: **no
  dismemberment in any mode, no blood/gore geometry in any mode**, no
  lingering close-up framing on any death, no named individual Philistine
  casualties (none are given in the text).

## Performance target

- Combat figures: ≈ 90–110 high-tier total across both engagements (see
  Scale assumptions) — at or below Gibeon's 90–115 precedent, the smallest
  combat scale in the project relative to narrated text length.
- One `InstancedMesh` per repeated family: figure, spear/sword (reuse
  existing kit), dust/motion sprites (reuse `asset-dust-motion` from
  Gilboa), the new grove's tree instancing (extend existing
  scrub/vegetation instancing, do not build a new vegetation system), idol/
  cultic-object props (small, new — `asset-philistine-idol-props`, minimal
  and undetailed, disclosed placeholder; no attempt to render specific
  attested Philistine cult-object iconography without a citation).
- No new lights, no water, no fire. Run `performance-reviewer` once after
  the two engagement grounds and the grove land — the grove's tree
  instancing is the one genuinely new asset family most likely to need
  tuning.

## Required source basis (before geometry is built)

Sonnet creates these records at build time; `SceneDef`/location `claimIds`
arrays stay empty until they exist. **Candidate sources below are named for
a `researcher` pass to verify — none are confirmed as cited yet.**

- **Existing, reuse:** `claim-dress`, `claim-philistine-kit`,
  `claim-israelite-muster-kit`, `claim-600-men`, `claim-david-historical`.
  The `jerusalem-capture` scene's own claims are referenced in this scene's
  `b-david-strongholds` card, not duplicated.
- **New, identification:** `claim-rephaim-identification` (basis
  `scholarly-reconstruction`, confidence **high** for the valley itself —
  toponymic continuity is strong, the name survives directly in the modern
  Jerusalem neighborhood/street name Emek Refaim/German Colony area, and
  standard historical-geography references place it securely southwest of
  the Old City along the Bethlehem road; candidate source:
  `rainey-notley-2006`) and `claim-baal-perazim-identification` (basis
  `scholarly-reconstruction`, confidence **low** — no independently fixed
  site for Baal-perazim beyond "within or adjacent to the Valley of
  Rephaim"; do not invent a specific named hill or ruin without a checked
  source. Candidate sources to check: `rainey-notley-2006`'s own treatment
  of Baal-perazim specifically, plus general historical-geography surveys —
  Yohanan Aharoni's classic historical geography and Nadav Na'aman's
  Philistine-border-warfare articles are plausible candidates worth a
  researcher check, unverified here).
- **New, narrated (basis `biblical-text`):** `claim-philistine-response`
  (5:17 — the Philistines' response to the anointing, and David's move to
  the stronghold, cross-referencing `jerusalem-capture` rather than
  restaging it); `claim-baal-perazim-battle` (5:18–20 — the first inquiry,
  the engagement, and the naming); `claim-idols-abandoned` (5:21 — notes
  must state explicitly that burning is a 1 Chronicles 14:12 addition, not
  staged or asserted here); `claim-rephaim-second-battle` (5:22–25 — the
  second inquiry's different answer, the grove/sign, the strike, and the
  Geba-to-Gezer pursuit delivered as text).
- **New, design (basis `design-placeholder`):** `claim-rephaim-battle-scale`
  (the disclosed figure-count design choices above); `claim-bekaim-grove`
  (the botanically uncertain tree species — disclosed generic grove
  rendering; check `king-stager-2001` or a dedicated regional-botany source
  for any citable identification before inventing a specific species, likely
  to stay `design-placeholder`); `claim-treetop-sign-staging` (the audio/
  environmental staging of the sign, explicitly not a visual-effects
  spectacle).
- **Characters:** reuse `david`, `davids-band`, `philistines` (existing
  group entry). No new named individuals — the text names none on either
  side for this passage.
- **ESV excerpt budget:** `2sam-5` is shared with `jerusalem-capture` — see
  that brief's note on sequencing. This scene should carry the bulk of the
  passage's quote budget: recommend 5:20b ("The LORD has broken through my
  enemies before me like a breaking flood") and 5:24b ("for then the LORD
  has gone out before you to strike down the army of the Philistines"),
  leaving room under the ≤3-quote/≤500-char cap (ADR-003) for
  `jerusalem-capture`'s single 5:12 quote if built first. Verify exact ESV
  wording and character counts, and check the other scene's build state,
  before finalizing at implementation time.

## Placeholder policy

- **Allowed placeholders:** the grove's tree species/foliage (disclosed,
  botanically uncertain); Baal-perazim's exact site within the valley
  (disclosed, low confidence); exact figure positions/contingent groupings
  for both engagements; the idol props' form (undetailed, disclosed); the
  sound design for the treetop sign; lighting hour (unstated in text).
- **Not allowed:** staging the idols' burning (1 Chronicles-only, not this
  scene's anchor text); crediting the pursuit's full Geba-to-Gezer extent as
  literally traversed/modeled geometry; any named individual Philistine
  casualty (none is narrated); triumphal/victory-lap staging of either
  engagement despite this being the project's first clean narrated win; any
  visually spectacular/obviously-supernatural rendering of the treetop sign;
  any content from `jerusalem-capture`'s scope (5:1–16) restaged here beyond
  a bare caption cross-reference; any 2 Samuel 6 (ark procession) content,
  depicted or textually foreshadowed, beyond a bare closing-card forward
  pointer with no preview of its content; new kit-differentiation claims
  beyond the existing Gilboa-established Philistine/Israelite split.
