# Scene brief — the two Philistine battles (`baal-perazim-rephaim`, M6)

**Scope pass: Sonnet, 2026-08-22 — PROVISIONAL, not yet Fable-reviewed.** Same
fallback circumstance as the two sibling briefs — see
`hebron-all-israel-brief.md`'s header and `docs/fable-review-queue.md` #21.
Third and last of M6's three scenes.

Scope guard: this brief covers **2 Samuel 5:17–25 only**, closing Milestone 6.
Nothing from 2 Samuel 6 onward (the ark) may appear, depicted or foreshadowed.
The closing card states only what 5:25 states.

## Historical intent

The observer should come away understanding:

1. **The Philistines move first, and only after David is anointed over all
   Israel** (5:17) — narratively, a united kingdom is now a threat to
   Philistine interests in a way a divided one was not; this is the text's
   own causal logic, not this project's inference.
2. **Both battles are fought only after David inquires of the LORD** — this is
   the chapter's structuring device (5:19, 5:23) and should be a load-bearing
   staged/dialogue beat in both battles, not a skipped formality. Contrast
   with `gilboa-battle`, where no such inquiry frames Saul's battle — the
   difference in divine-consultation framing between Saul's and David's
   battles is worth surfacing in caption/inspector notes as the text's own
   contrast, not the project's editorializing.
3. **Baal-perazim ends with captured Philistine idols, which David's men burn
   or carry off** (5:21; the parallel account at 1 Chron 14:12 has them
   burned — 2 Samuel itself says David's men "carried them away," a real
   textual variant worth a light `scholarlyViews` note if a researcher pass
   finds a named commentary discussing it, otherwise state plainly what 2
   Samuel itself says without importing the Chronicles detail as fact).
4. **The second battle (Valley of Rephaim) is won by a specific tactical/
   theophanic instruction** — circle around, attack from the balsam/mulberry
   trees when "you hear the sound of marching in the tops of the balsam
   trees" (5:24) — a distinctive sensory detail worth staging as a sound/
   camera cue rather than glossed over.
5. **Scale stays proportionate and does not attempt to out-scale
   `gilboa-battle`.** These are Philistine incursions repelled, not a set-
   piece final battle; over-scaling would misrepresent the text's own
   comparatively brief treatment (nine verses for two engagements, versus
   `gilboa-battle`'s much fuller narrative basis).

## Resolved design calls (this pass, provisional)

- **Two distinct battle beats, one scene** — same "two engagements, one
  scene" pattern local precedent allows (cf. how `gilboa-battle` handles a
  multi-phase single battle); Baal-perazim and Rephaim are staged as two
  separate, smaller engagements within the same scene rather than two
  separate scenes, since neither individually carries enough distinct
  material to justify a standalone scene (avoiding the thinness problem M4/M5
  already reasoned through for chapter-bundling).
- **Divine inquiry is staged as a distinct dialogue beat before each
  battle**, not summarized away — this is the chapter's own structuring
  device and the load-bearing historical-intent point above.
- **No idol geometry beyond a modest, undetailed cluster.** 5:21 mentions
  captured Philistine images; render as small unmarked cultic-object forms
  (no specific deity iconography asserted — this project has no source
  basis for identifying which Philistine deities' images these were),
  `design-placeholder`, burned or carried off per whichever reading the
  claim settles on (see notes above — default to 2 Samuel's own "carried
  away" unless research finds reason to note the Chronicles variant).
- **The marching-sound cue is staged as an audio/camera moment** at the
  Rephaim engagement, not a visual special effect — keep it understated,
  consistent with this project's general avoidance of supernatural
  spectacle rendering (no glowing trees, no visualized divine presence).
- **Reuse Judean-highland terrain conventions** for the Rephaim valley
  (adjacent to Jerusalem geographically); balsam/mulberry trees rendered as
  a generic tree-stand feature, not a botanically over-specified claim
  (species identification of the Hebrew term itself is disputed in
  translation literature — treat as `design-placeholder` vegetation).
- **`depictsDeath: true`** — this is a real battle scene; ADR-009's
  standard/reduced-mode restraint applies (documentary distance, no
  gratuitous wound geometry), same discipline as `gilboa-battle`, scaled to
  this chapter's smaller cast.

## Visual composition

- **Terrain:** open valley ground (Rephaim) with a tree-stand feature for the
  balsam/mulberry detail; Baal-perazim staged as a nearby, slightly different
  vantage within the same broader terrain (not a second full terrain build).
- **Focal masses:** (a) the first engagement's break-through ground
  (Baal-perazim); (b) the captured-idols cluster; (c) the circling maneuver
  and tree-stand for the second engagement.
- **Sightlines:** the inquiry beats framed as David alone or with a small
  attendant group, apart from the host, addressing the LORD — a deliberately
  quieter register than the battle beats that follow.
- **Lighting:** no strong textual time marker; default daylight.

## Scale assumptions

- **Principals:** David; Philistine host referenced/staged at
  moderate-crowd scale (not `gilboa-battle`'s ~325-figure scale — these are
  repelled incursions, not the final catastrophic battle of Saul's line).
- **Israelite host: ≈ 60–100.** **Philistine host: ≈ 60–100.** Total
  battle-cast figures should land well under `gilboa-battle`'s precedent —
  disclosed via a `claim-battles-cast-scale` note, same discipline as prior
  scale-disclosure claims (`claim-battle-scale`, `claim-gate-cast-scale`,
  etc.).
- **High-tier total ≈ 130–210 figures across both engagements** — moderate,
  smaller than `hebron-gate`'s ~127-figure single engagement plus procession,
  proportionate to the text's brief treatment.

## Camera / observer experience

- **Default viewpoint** (`vp-baal-perazim`): the first engagement's ground.
- Additional viewpoints: **the inquiry ground** (`vp-inquiry`, used for both
  divine-consultation beats, possibly the same physical vantage reused);
  **the Rephaim tree-stand** (`vp-rephaim-trees`, the circling-maneuver
  engagement and the marching-sound cue).
- **Timeline beats** (`depictsDeath: true`; suggested duration ~150–170s):

  | Beat                   | Text  | Standard                                                                                                                                                                                                                      | Reduced                               |
  | ---------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
  | `b-philistines-muster` | 5:17  | Card/staged: the Philistines hear David is anointed over all Israel and come up seeking him; David goes down to the stronghold.                                                                                               | identical                             |
  | `b-first-inquiry`      | 5:19  | Dialogue beat: David inquires of the LORD; the answer ("Go up, for I will surely give the Philistines into your hand").                                                                                                       | identical                             |
  | `b-baal-perazim`       | 5:20  | The engagement itself, documentary distance, ADR-009 standard restraint; David's naming of the site ("the LORD has broken through my enemies before me like a breaking flood").                                               | strike/clash elided, cut to aftermath |
  | `b-idols-taken`        | 5:21  | The captured images, modest undetailed cluster, carried away.                                                                                                                                                                 | identical                             |
  | `b-second-inquiry`     | 5:23  | Second dialogue beat: the Philistines muster again in the Valley of Rephaim; David inquires again; the answer this time is a maneuver, not a direct advance ("circle around... come against them opposite the balsam trees"). | identical                             |
  | `b-marching-sound`     | 5:24  | The audio/camera cue: "when you hear the sound of marching in the tops of the balsam trees, then rouse yourself."                                                                                                             | identical                             |
  | `b-rephaim-strike`     | 5:25a | The circling attack, documentary distance, ADR-009 restraint.                                                                                                                                                                 | strike/clash elided, cut to aftermath |
  | `b-close`              | 5:25b | Closing card: David struck down the Philistines from Geba to Gezer. Milestone-closing card — no 2 Samuel 6 content of any kind.                                                                                               | identical                             |

## Performance target

- ≈ 130–210 high-tier figures across two engagements — moderate, well under
  `gilboa-battle`'s precedent. Likely reuse of existing crowd-instancing/
  pose-bucket patterns from `gilboa-battle`/`hebron-gate` rather than new
  engine work. A `performance-reviewer` pass is worth scheduling given two
  distinct battle crowds in one scene, even at this reduced scale.

## Required source basis (before geometry is built)

- **Existing, reuse:** `claim-david-historical`; Philistine
  military-material-culture claims already established for `gilboa-battle`
  (kit/dress conventions), if applicable to this later, still-early period —
  flag for a `researcher`/`archaeology-reviewer` check on whether Gilboa-era
  Philistine kit assumptions still hold ~decades later at this narrative
  point, rather than assuming continuity by default.
- **New, narrated (basis `biblical-text`):** `claim-baal-perazim-battle`
  (5:17–21 — the muster, the first inquiry, the engagement, the naming, the
  captured idols; light `scholarlyViews` note on the burned-vs-carried-away
  variant if a named commentary is found, otherwise state 2 Samuel's own
  wording plainly); `claim-rephaim-battle` (5:22–25 — the second muster, the
  second inquiry, the circling maneuver, the marching-sound cue, the strike
  from Geba to Gezer).
- **New, design (basis `design-placeholder`):** `claim-baal-perazim-siting`
  (cross-reference the `valley-of-rephaim` location record's disclosed
  uncertainty on Baal-perazim's precise siting — do not duplicate the
  location-level dispute inside the claim, just point to it);
  `claim-captured-idols-form` (undetailed cultic-object placeholder, no
  deity iconography asserted); `claim-battles-cast-scale` (the disclosed
  ≈130–210 figure count above).
- **Characters:** reuse `david`, `philistines` (existing group character from
  M3). No new named individuals required by the text.
- **Known researcher gaps:** a check on whether `master-2021-philistines-
highlands` (already in the bibliography) or another source can confirm
  Philistine material-culture continuity into this slightly later period;
  any named commentary on the burned-vs-carried-away idol variant; any
  source discussing Baal-perazim's proposed siting more specifically (likely
  permanently thin, same evidentiary category as several prior
  "checked, permanently thin" closures).
- **ESV excerpt budget (`2sam-5`, shared across all three M6 scenes — this
  scene is the third draw on the same passage budget, so spend carefully
  against what `hebron-all-israel`/`jerusalem-capture` already used):**
  recommend 5:20b ("the LORD has broken through my enemies before me like a
  breaking flood") as this scene's spend, or 5:24a (the marching-sound
  instruction) if budget allows a second short fragment. Live-source wording
  check at build time.

## Placeholder policy

- **Allowed placeholders:** Baal-perazim's precise siting within the Rephaim
  valley area (disclosed, cross-referenced to the location record); captured-
  idol form (undetailed, no iconography); balsam/mulberry tree-species
  rendering; battle-cast counts/positions.
- **Not allowed:** out-scaling `gilboa-battle`'s cast or treating either
  engagement as a set-piece final battle; asserting a specific deity
  identification for the captured images; asserting the Chronicles
  burned-idols detail as 2 Samuel's own text; visualized divine presence or
  special-effect treatment of the marching-sound cue; any 2 Samuel 6 (ark)
  content, depicted or foreshadowed, anywhere including the closing card;
  gratuitous wound/blood geometry beyond ADR-009's standard restraint.
