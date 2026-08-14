# Scene brief — The two Philistine engagements in the Valley of Rephaim (`rephaim-valley`, M6)

World-director pass, Fable, 2026-08-14. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Third and last scene of Milestone 6, and the
milestone's only scene carrying an ADR-009 load.

Scope guard: this brief covers **2 Samuel 5:17–25** — the Philistines hearing of
the all-Israel anointing and going up to seek David, David going down to the
stronghold, the two occupations of the Valley of Rephaim, the two inquiries and
their two different answers, the engagement at Baal-perazim, the abandoned
images, the flanking approach opposite the balsam trees, and the striking of the
Philistines from Geba to Gezer. It stops at 5:25. The Hebron anointing (5:1–5)
is `hebron-all-israel`; the capture of Jerusalem and everything through 5:16 is
`jerusalem-stronghold`. **No Jerusalem geometry may appear in this scene** (see
the sequencing call below — this is a historical constraint, not just a scope
convenience), and **nothing from 2 Samuel 6 onward may appear, depicted or
foreshadowed.** The closing card states only what 5:25 states.

## Historical intent

The observer should come away understanding three things:

1. **Two engagements, not one, and the difference between them is the point.**
   The same enemy occupies the same valley twice, and David asks twice and is
   answered differently each time: go up (5:19), and then do not go up — circle
   around to their rear and come at them opposite the balsam trees (5:23). The
   narrative is deliberately structured as a repetition with a variation, and
   compressing the two into a single battle would destroy the only thing the
   passage is actually careful about. Stage them as two distinct beat blocks
   with visibly different approach geometry.
2. **This is the Philistines reacting to the united monarchy — and the
   reversal is worth feeling.** 5:17 is explicit that they move because they
   heard David had been anointed king over Israel. An observer who walked
   `gilboa-battle` watched a Philistine army destroy Israel's king and his sons
   on Gilboa; an observer who walked M1–M2 watched David live as a Philistine
   client at Ziklag. Now he is the target. The scene should let that land
   through continuity of place-type, dress, and staging conventions — **not
   through a caption telling the observer to feel it**, and not through
   triumphal framing.
3. **The chapter narrates no numbers, no casualties, and no names.** Not one
   combatant is named on either side, no force size is given, no losses are
   counted. That is a genuinely different evidentiary situation from Gilboa
   (which at least has a narrated outcome for named individuals), and it should
   produce a genuinely smaller, quieter, less resolved battle scene. Restraint
   here is accuracy, not squeamishness.

## Resolved design calls (this pass)

- **The sequencing question is carried, not answered.** 5:17's "David went down
  to the stronghold" is a real crux: "went down" fits a descent to a refuge such
  as Adullam (the same idiom as 1 Sam 22:1) better than an ascent to the
  just-taken Zion, and many readers take the Rephaim campaigns to precede — or
  at least to be narratively displaced from — the capture of Jerusalem. The
  project's default is canonical order, so the scenes run in the text's order;
  but **no geometry may answer the question**. Concretely: the stronghold of
  5:17 is **not** rendered, Jerusalem does not appear in any frame or sightline,
  and no caption says David set out from Jerusalem. The dispute goes in
  `scholarlyViews`. This is the `hebron-reckoning` / Mahanaim precedent — a
  place the narrative names that the project deliberately declines to build.
- **No supernatural visual effect at 5:24.** "The sound of marching in the tops
  of the balsam trees" gets **no** apparition, no glow, no spectral host, no
  particle effect, no shimmer. ADR-011 keeps fantasy systems off the allow-list,
  and the project's commentary policy keeps theological content separated and
  off by default. The cue is carried by caption. The most the rendering may do
  is wind motion in the canopy, using whatever the existing vegetation system
  already does — and even that must not be timed to read as an event. This is a
  hard line; it is exactly the beat where an implementer will be tempted.
- **The captured images (5:21) render as covered carried bundles only.** The
  Philistines "left their idols there, and David and his men carried them away."
  Two constraints: (i) **no modeled deity images** — Philistine cult statuary in
  this period is not something the project can render from evidence, and
  inventing one would be an anachronism with a religious-content edge; render
  wrapped, anatomically and iconographically unresolved carried forms, in the
  spirit of `buildWrappedFormGeometry`'s treatment of the dead, at distance and
  briefly; (ii) the **MT / 1 Chronicles 14:12 divergence** (carried away vs.
  burned, with the Greek tradition also witnessing a burning) is a genuine
  textual divergence and goes in `scholarlyViews`, exactly as the 2 Sam 4:6
  MT/LXX divergence did on `claim-ish-bosheth-assassination`. No burning is
  rendered either way.
- **Baal-perazim is named, not built.** 5:20's place-name comes from David's own
  wordplay on the LORD "breaking through" — the naming is the verse's content.
  The site is unlocated. Carry the naming in caption at the point the text
  gives it; do not create a separate location record or distinct site geometry
  for it, and do not stage a monument, marker, or altar (none is narrated).
- **The valley identification is disputed and gets a disputed location entry.**
  The Valley of Rephaim is conventionally placed in the broad valley running
  southwest from Jerusalem, and that identification is reasonably well
  established in the standard historical geographies but not beyond question.
  Create the `valley-of-rephaim` location with `identification.disputed: true`
  and the conventional view carried at moderate confidence, sourced from the
  atlas-level reference the project already holds — not overstated.
- **The Geba/Gibeon variant is a note.** MT reads "from Geba to Gezer"; the
  Greek tradition and 1 Chronicles 14:16 read Gibeon. Carry it as a `notes`-level
  textual variant on the pursuit claim. **Gibeon is already a built, released
  location in this project** (`gibeon-pool`, M4) — that makes the variant
  interesting and makes it tempting to reuse the geometry. Do not: the pursuit's
  extent is caption and atlas material, not staged terrain. No Gibeon geometry,
  no Gezer geometry.
- **The balsam trees are a generic grove.** The species behind Hebrew _bekaim_
  is uncertain (balsam, mulberry, and aspen have all been proposed). Render a
  generic broadleaf grove, disclose the uncertainty in the claim, and assert no
  species. Reuse existing vegetation instancing rather than authoring a new
  species asset.
- **ADR-009: this is a crowd-battle scene, not a named-killing scene.**
  `gilboa-battle` is the applicable precedent, not the §Named-character-killings
  template — the text names no combatant and narrates no individual death, so
  there is no specific non-graphic detail to show as gesture and nothing to
  build a held reaction beat around. Standard mode: documentary distance, no
  wound or blood geometry in any mode, no lingering framing, the rout read at
  distance. Reduced mode: strike moments elided, wider frames, the fallen
  lowering and becoming still; facts identical in both modes' captions.
  `depictsDeath: true`; the first-visit advisory wires automatically.
- **No triumphalism, in either engagement.** 5:20's "the LORD has broken
  through my enemies before me like a bursting flood" is **David's own naming
  speech** and is carried as his words. No victory staging, no raised weapons,
  no trophy imagery beyond the covered bundles 5:21 states, no captured-standard
  device, no acclamation crowd. The project's rule that killings inside Israel
  get no triumphal staging for any side applies with equal force to killings
  outside it.

## Visual composition

- **Terrain:** a broad, open, cultivable valley with gentle flanking slopes and
  a grove on one flank — the second new landform of the milestone, and much
  simpler than `jerusalem-stronghold`'s. **Reuse the Judean-highland palette**
  again (this valley is on the same hill country's western approaches); no new
  regional palette. ADR-005 `flatten` plus gentle flanking relief should be
  sufficient; do not build a dramatic gorge.
- **Focal masses:** (a) **the Philistine occupation of the valley floor** —
  "spread out," staged as a dispersed occupation of open ground, twice, with
  visibly different dispositions; (b) **the approach ground** David's force uses
  — frontal and higher in the first engagement, lateral and screened in the
  second; (c) **the balsam grove** on the flank, the second engagement's hinge;
  (d) **the emptying field** in the pursuit beat, the last image.
- **Sightlines:** the default vantage looks across the valley floor from the
  approach side, so that both dispositions can be compared from the same frame —
  the scene's whole argument is the comparison, and the camera should make it
  available without narration. The grove vantage is low and screened: the
  observer should be able to tell that the second approach is not visible from
  where the first one came, because that is what the instruction in 5:23 is
  about.
- **Lighting:** daytime, hour unstated, disclosed. Both engagements in
  comparable light — a light change between them would suggest a narrative
  intensification the text does not give. No storm light, no dust-and-fire
  spectacle. `gilboa-battle`'s rout dust may be reused at reduced intensity for
  the pursuit beat only.

## Scale assumptions

- **No narrated count exists anywhere in 5:17–25.** No ratio applies; every
  figure count is a disclosed design choice, per the `jabesh-burial` /
  `claim-judah-assembly-scale` no-ratio convention.
- **David's force: ≈ 60–80 figures** — anchored on the established ~600 at the
  standard ~1:10 ratio (`claim-600-men` by reference), with the disclosure that
  the text does not say this was that force.
- **Philistine force: ≈ 60–90 figures** per occupation, reusing the same
  instanced population between the two engagements rather than doubling it.
- **High-tier total ≈ 120–170 figures** — roughly half `gilboa-battle`'s
  measured ~325, and deliberately so: Gilboa had a narrated national defeat and
  a derived (disclosed, speculative) order-of-magnitude estimate behind it;
  this chapter has neither. Do not scale up to match the earlier battle's
  visual weight.
- Reuse `gilboa-battle`'s pose-bucket infrastructure and figure ratios rather
  than authoring new combat animation. The M3 real-hardware perf rider is still
  open (`docs/next-run.md`) — that is a reason to stay well under Gilboa's
  figure count here, not a reason to delay this scene.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-approach`): across the valley floor from the
  approach side, both dispositions comparable from one frame.
- Additional viewpoints: **the grove flank** (`vp-balsams`, low and screened,
  the second engagement's hinge — and the frame that makes the 5:23 instruction
  legible as tactics); **the valley floor** (`vp-field`, walk emphasis, ground
  level among open cultivable land — the same ordinary ground the fighting
  happens on); **the pursuit vantage** (`vp-pursuit`, looking northwest along
  the line of withdrawal, the field emptying).
- **Timeline beats** (`depictsDeath: true`; standard default per ADR-009,
  advisory wires automatically; suggested duration ~170s):

  | Beat                 | Text  | Standard                                                                                                                                                                                                                           | Reduced                                                                                               |
  | -------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
  | `b-philistines-hear` | 5:17a | Card + staging: the Philistines hear that David has been anointed king over Israel and go up to seek him. The reversal stated as fact, not as commentary.                                                                          | identical                                                                                             |
  | `b-stronghold-card`  | 5:17b | **Card only.** "David went down to the stronghold" — the sequencing crux stated here, at the point the text creates it. **No stronghold and no Jerusalem geometry.**                                                               | identical                                                                                             |
  | `b-spread-out`       | 5:18  | Staged: the Philistines spread out in the valley. Dispersed occupation of open ground, not a formed battle line.                                                                                                                   | identical                                                                                             |
  | `b-inquiry-1`        | 5:19  | Staged minimally: the inquiry and its answer, in the same restrained register as `hebron-anointing`'s inquiry beat. No new oracular apparatus invented.                                                                            | identical                                                                                             |
  | `b-baal-perazim`     | 5:20  | The frontal engagement at documentary distance; the Philistines give way. David names the place, in his own words. No wound or blood geometry; no triumphal staging.                                                               | Strike moments elided; wider frame; the fallen lower and become still. Caption states the same facts. |
  | `b-images`           | 5:21  | Brief, distant: the abandoned images carried off as covered, unresolved bundles. Caption carries the MT / 1 Chronicles 14:12 divergence. **No modeled deity image, no burning.**                                                   | identical                                                                                             |
  | `b-return`           | 5:22  | Staged: the Philistines come up and spread out in the valley again. The repetition is the passage's structure — do not compress or shorten it to save time.                                                                        | identical                                                                                             |
  | `b-inquiry-2`        | 5:23  | Staged minimally: the second inquiry and the different answer — do not go up; circle to their rear; come at them opposite the balsam trees.                                                                                        | identical                                                                                             |
  | `b-balsams`          | 5:24  | The wait on the screened flank by the grove. The cue in the treetops is **caption-carried only**; at most ordinary wind in the canopy. **No effect of any kind.** Hold this beat still and quiet.                                  | identical                                                                                             |
  | `b-pursuit`          | 5:25  | The flanking strike and the field emptying toward the northwest. Extent ("from Geba to Gezer," with the Gibeon variant noted) is caption and atlas material — **no Geba, Gibeon, or Gezer geometry.** Reduced rout dust permitted. | Strike moments elided; the withdrawal read at wider distance.                                         |
  | `b-close`            | —     | Closing card stating only what 5:25 states. **No 2 Samuel 6+ content, no ark, no forward pointer past the chapter.** A pointer to the `/atlas` M6 phase is permitted, since the atlas covers this chapter's own geography.         | identical                                                                                             |

## Performance target

- ≈ 120–170 high-tier figures, roughly half of `gilboa-battle`'s measured load,
  with the same instancing strategy and pose-bucket approach. Reuse
  `gilboa-battle`'s combat pose buckets rather than authoring new ones; if the
  bucket count can be reduced (4 rather than 6–8), do it here — that is one of
  the named mitigations from the still-open M3 perf rider, and this scene is a
  low-risk place to try it.
- One `InstancedMesh` per family: figure, grove tree, scrub, rock, terrace
  fragment. New geometry is minimal: the valley landform and the grove. Reuse
  vegetation and rock assets.
- Rout dust reused from `gilboa-battle` at reduced intensity, pursuit beat only.
  No fire, no water, no new real-time lights.
- Run `performance-reviewer` once, after both engagements are staged and the
  populations are live simultaneously in the timeline.

## Required source basis (before geometry is built)

- **New location, `valley-of-rephaim`** (created at build time):
  `identification.disputed: true`, with the conventional southwest-of-Jerusalem
  identification as the leading view at moderate confidence, sourced from
  `rainey-notley-2006` (the project's standing historical-geography reference —
  check that it actually covers the valley before citing it; if it does not,
  the view stays hedged and a `researcher` pass adds a card). **Do not** create
  location records for Baal-perazim (unlocated), Geba, or Gezer; none is built
  and none is staged.
- **Existing, reuse:** `claim-dress` (shared regional dress),
  `claim-philistine-kit` (the released `comparative-ane`/`low` claim with its
  `scholarlyViews` dispute — reuse it **exactly as released**, including the
  principals-only rule for the disputed headdress; do not widen its application
  here), `claim-600-men` (by reference), `claim-chronology`,
  `claim-david-historical`, `claim-all-israel-anointing` (5:17's stated cause).
- **New, narrated (basis `biblical-text`):** `claim-rephaim-campaigns` (5:17–25
  — **the scene's central claim**; statement covers both occupations, both
  inquiries, and both answers, and states that the text names no combatant,
  gives no force size, and counts no casualties; `scholarlyViews` carry the
  5:17 sequencing crux — canonical order vs. narrative displacement relative to
  the capture of Jerusalem — with hedged attributions until a researcher pass
  lands names; `notes` carry the Geba/Gibeon textual variant and record that no
  stronghold or Jerusalem geometry is staged, and why); `claim-captured-images`
  (5:21; `scholarlyViews` on the MT / 1 Chronicles 14:12 divergence; `notes`
  record the no-modeled-image and no-burning depiction constraints).
- **New, design (basis `design-placeholder`):** `claim-rephaim-terrain-form`
  (the valley landform as a disclosed approximation — the identification is
  disputed and no site-specific reconstruction is asserted);
  `claim-balsam-grove-form` (the grove; species deliberately not asserted);
  `claim-rephaim-cast-scale` (the disclosed counts above; must state that no
  count is narrated and that the scene is deliberately smaller than
  `gilboa-battle` for that reason).
- **Characters:** reuse `david`, `davids-band`, and the existing Philistine
  group entry. **No new named characters** — the text names none, and none may
  be invented. Do not stage Joab or Abishai as named principals; the chapter
  does not place them here.
- **ESV excerpt budget:** one quote from this scene's share of `2sam-5`'s three
  (see `hebron-all-israel-brief.md` for the allocation). 5:20b's naming speech
  is the natural candidate. **Live-verify wording via the `WebSearch` pattern at
  build time** (queue #20(e)).
- **Researcher gaps (non-blocking to the build, gating `released`):** named
  attributions for the 5:17 sequencing views; confirmation that
  `rainey-notley-2006` covers the Valley of Rephaim's identification (and a new
  card if it does not); a citable treatment of the _bekaim_ species question if
  the claim is to move past `design-placeholder`; a named treatment of the
  MT / 1 Chronicles 14:12 divergence — noting that the parallel 2 Sam 4:6
  MT/LXX attempt closed "checked, permanently thin," so a negative finding here
  is an acceptable outcome, not a failure.

## Placeholder policy

- **Allowed placeholders:** the valley's exact profile and extent; the grove's
  position, size, and species; both forces' dispositions and counts; the
  approach routes; the inquiry's staging; lighting hour; the covered bundles'
  form; the pursuit's staged direction.
- **Not allowed:** wound, blood, or gore geometry in any mode; close or
  lingering framing on any strike; any supernatural, spectral, luminous, or
  particle effect at 5:24, or any canopy motion timed to read as an event; any
  modeled Philistine deity image, cult statue, or standard; any burning of the
  images; any Jerusalem, stronghold, Baal-perazim, Geba, Gibeon, or Gezer
  geometry; any staging or caption asserting that David set out from Jerusalem;
  compressing the two engagements into one; inventing named combatants on
  either side; asserting any force size, casualty count, or outcome the text
  does not give; widening `claim-philistine-kit`'s disputed headdress beyond its
  released principals-only application; triumphal staging, acclamation, raised
  weapons, or trophy imagery; scaling the scene up toward `gilboa-battle`'s
  figure count for visual weight; any 2 Samuel 6+ content in any form, depicted
  or foreshadowed.
