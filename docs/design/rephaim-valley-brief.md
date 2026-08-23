# Scene brief — the two Philistine engagements in the Valley of Rephaim (`rephaim-valley`, M6)

World-director pass, Fable, 2026-08-23. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second and last scene of Milestone 6, and the
project's second battle scene after `gilboa-battle` — deliberately a much lighter
violence treatment, for reasons the text itself supplies.

Scope guard: this brief covers **2 Samuel 5:17–25 in full**, staged as **one
scene with two phases**, not two scenes. The capture of Jerusalem, the Millo, the
Hiram building, and the household list (5:1–16) belong to `jerusalem-stronghold`,
a separate brief; **no Jerusalem geometry appears here** beyond, at most, an
undetailed horizon ridge (see Resolved design calls). **Nothing from 2 Samuel 6
onward may appear, depicted or textually foreshadowed** — no ark, no dynastic
oracle, no later Philistine campaigns (2 Sam 8, 21, 23). The closing card ends
where the chapter ends. This scene also must not assert that its campaigns follow
the capture of Jerusalem: the chapter's arrangement may be topical, and the
disclosure is shared with `jerusalem-stronghold`'s closing card.

## Historical intent

The observer should come away understanding four things:

1. **The campaign is the price of the union.** The narrative's own trigger is
   that "the Philistines heard that David had been anointed king over Israel"
   (5:17). A Judahite kinglet at Hebron was tolerable — 1 Samuel 27 has David as
   Achish's client — but a king over all Israel is a strategic problem. And the
   Valley of Rephaim runs up toward Jerusalem's western approaches: the geography
   itself shows a force striking at the new center. The observer who walked
   `jerusalem-stronghold` should recognize that this valley is the road to the
   place they just stood. (Order of events is disclosed, not asserted — see the
   scope guard.)
2. **Same enemy, same ground, two different answers — that contrast is the whole
   scene.** The text stages the second engagement as a deliberate non-repeat of
   the first: David inquires both times, and the second answer is not "go up" but
   circle around, take position behind them at the trees, and wait for a signal.
   Building this as one scene with the Philistines spreading across the _same_
   valley floor twice is what makes the contrast visible; two separate scenes
   would destroy the very thing worth rendering.
3. **The project does not visualize the sign, and says so on screen.** 5:24's
   sound of marching in the tops of the balsam trees is what the narrative
   states. Rendering a supernatural effect — a wind burst, a light, marching
   silhouettes in the canopy — would assert as observed fact something for which
   no observational basis exists, and would slide the project into the
   sanitized-illustration genre it defines itself against. The beat is a held
   wait among ordinary trees; the caption carries the text's claim as the text's
   claim. This is a new precedent for the project and is escalated for
   ratification as queue #24.
4. **A battle can be rendered honestly without rendering combat detail.** The
   text gives, for each engagement, an inquiry, an answer, and one verb: David
   "struck them." No casualty count, no named death, no description of the
   fighting, no rout narrative. `gilboa-battle`'s melee clash had a specific
   textual inference behind it (`claim-line-defense`: a rout presupposes a prior
   engagement) plus an explicit user direction; **nothing comparable exists
   here**, so nothing comparable is staged. Both engagements read at distance as
   mass movement — a line closing, a formation breaking, dust — and that is
   already more than the text describes.

## Resolved design calls (this pass)

- **One scene, two phases; neither engagement is narrated-only.** Separately each
  is two verses of action and would be the thinnest scene the project has built;
  together they are a single coherent narrative unit at a single setting — the
  same bundling logic that produced M4's and M5's scene boundaries. The second
  engagement is also the more distinctive of the two and must be staged, not
  merely captioned: the circling march and the wait are the only genuinely novel
  staging opportunity in the chapter.
- **Violence treatment: lighter than Gilboa, explicitly and on purpose.** No
  melee choreography, no per-figure fight-stance pose buckets, no strike/parry
  cycle, no close framing on any contact. Both engagements are read from the rim
  at documentary distance as formation movement and collapse. Falling figures are
  permitted in standard mode at silhouette distance only — a defeat with
  casualties _is_ what the text narrates, and rendering an entirely bloodless
  dispersal would understate it — but with no wound, blood, or dismemberment
  geometry of any kind, in any mode, as always.
- **`depictsDeath: true`; the ADR-009 advisory fires.** One choreography, two
  rendering treatments, per ADR-009: **reduced mode** holds a wider frame and
  elides the falls entirely, cutting from the advance to an emptied valley floor;
  captions state identically in both modes that David struck the Philistines and
  that they were driven from the valley. Reduction abstracts depiction, never
  facts.
- **No divination apparatus is invented.** 5:19 and 5:23 say only that David
  inquired of the LORD and that the LORD answered. **No ephod, no lots, no
  Urim/Thummim, no priest, no altar, no shrine, no gesture-language borrowed from
  other passages.** 1 Samuel 23:9 and 30:7 mention an ephod; this text does not,
  and importing it is exactly the harmonization-as-anachronism the project
  forbids. Stage the inquiry as a small, still, waiting group set apart from the
  force; the caption carries the question and the answer as the text's own words.
  The claim's `notes` may record that other passages describe an ephod and that
  this one does not — that is a disclosure, not a staging licence.
- **The divine sign is not visualized** (intent #3). No wind effect, no light, no
  canopy animation staged as a signal, no audio cue treated as the sign, no
  camera language implying a presence. Whatever ambient canopy motion the
  vegetation system already produces must not be timed, intensified, or framed to
  read as the sign; if that separation cannot be maintained, freeze the canopy
  for the beat instead. A disclosed claim (`claim-divine-sign-depiction`) states
  the policy on-screen. Queue #24.
- **Baal-perazim is staged but never identified.** The site is unlocated. The
  naming beat plays where the first engagement is staged, its position an openly
  disclosed placeholder within the valley setting. **No `LocationEntry` with
  coordinates, and no atlas pin** — plotting an unlocated place would manufacture
  a false identification, the same discipline that keeps Mahanaim unbuilt.
- **The images (5:21) are caption-only.** The Masoretic text has the Philistines
  abandon their images and David's men carry them off; 1 Chronicles 14:12 has
  them burned. Surface the divergence as `scholarlyViews`, in the same register
  as `hebron-reckoning`'s 4:6 MT/LXX handling. **Render no cult iconography.**
  Philistine cult material exists in the archaeological record, but nothing
  supports specific field-carried images at this engagement, and modeling any
  would assert an identification the evidence does not give. If anything renders
  at all, it is undifferentiated covered loads; preferably nothing renders.
- **The trees are a species the project does not name.** The _bĕkā'îm_ of
  5:23–24 are an unidentified plant (English versions render "balsam" or
  "mulberry"; the identification is a guess in either case). Render a generic
  small-canopy dryland grove, disclosed as a placeholder, with `borowski-1987` as
  the citation path for regional flora in general and **no species asserted**.
  Do not render mulberry (_Morus_) specifically — a later introduction risk — and
  do not model a distinctive resin/balsam tree.
- **The pursuit (5:25b) is a card, not geometry.** "From Geba to Gezer" (MT;
  the Septuagint and 1 Chronicles 14:16 read Gibeon for Geba) spans a corridor
  the scene cannot stage honestly. A closing card carries it, surfaces the
  textual variant, and cross-references the already-released `gibeon` location
  where relevant — without asserting which reading is right.
- **No Jerusalem geometry.** At most an undetailed ridge on the horizon for
  orientation, with **no built forms on it** — because the order of events is
  disclosed as unresolved, rendering the stronghold in any particular state here
  would quietly assert a chronology. Prefer a bare horizon.
- **No named commanders.** The text names no one but David. Do not stage Joab,
  Abishai, or any of the later "mighty men" traditions (2 Sam 23's Rephaim
  episode is a different, later passage and is out of scope).
- **No triumphal staging.** No victory tableau, no raised standards, no
  win-state framing, no scoreboard-like caption. ADR-011's affordance test and
  ADR-009's no-triumphalism rule both apply; the beats end on an emptied valley
  and a card, not on a celebration.

## Visual composition

- **Terrain:** a new `TerrainSpec` — a broad, open valley floor with a rising
  highland rim along one side. Derive palette and vegetation vocabulary from the
  Judean-highland spec (`hebron-anointing`, and the ridge spec
  `jerusalem-stronghold` builds from it); the landform is new, the region is not.
  The grove sits on the valley's flank, not in its middle.
- **Focal masses:** (a) **the Philistine spread** across the valley floor — the
  text's own verb ("spread themselves"), rendered as a wide, loose deployment
  rather than a tight block; (b) **David's force** on the rim/high ground;
  (c) **the grove** — small, ordinary, and visually unremarkable, which is the
  point; (d) **the flanking route** in phase two, a curve around the valley's
  edge and behind the Philistine position — the scene's one strong walk
  affordance.
- **Sightlines:** the default vantage is on the rim looking down the length of
  the valley, framing both engagements in the same geography — the contrast of
  intent #2 depends on the observer recognizing the ground the second time. A
  second vantage inside the grove for the wait beat: close, quiet, ordinary,
  with the valley visible through the trunks. A third on the valley floor for the
  naming beat.
- **Lighting:** hour unstated for both engagements — flat daylight throughout,
  disclosed `design-placeholder`. **Explicitly resist** staging the wait beat at
  dawn, dusk, or under dramatic light: the text gives no time of day, and
  atmospheric staging there would do exactly the work the no-visualized-sign rule
  forbids.

## Scale assumptions

Precedent, stated explicitly: Ziklag's ~1:10 ratio applies to **narrated counts**
(register #7); `gilboa-battle` used ~1:20 for an **unnarrated** force and
disclosed the result as a representative engagement, not a complete army.
2 Samuel 5 narrates no count for either side here, and register #4 (the scale of
David's early state is genuinely contested) forbids implying a national army — so,
as at Gilboa, **no ratio is claimed** and the staging is disclosed as
representative.

- **Philistine force: ≈ 55–70 figures** in phase one, **repositioned and reused**
  for phase two — not doubled. Both deployments never coexist; the second is the
  same instanced population moved, which is both the honest reading of "came up
  yet again" and the cheap one.
- **David's force: ≈ 45–60 figures**, likewise reused across both phases.
- **Principals: David + 3–4 unnamed figures** at the inquiry beats. No named
  commanders (see Resolved design calls).
- **High-tier total ≈ 110–140 figures** — at or below `gilboa-battle`'s measured
  band, and materially cheaper per figure (formation movement along shared route
  curves; no fight-stance pose buckets, which were Gilboa's expensive part).
  Hard cap: this scene must not exceed `gilboa-battle`'s high-tier instance count
  while that scene's real-hardware performance check remains open
  (`docs/next-run.md`).
- `claim-rephaim-cast-scale` carries all of the above as a disclosed design
  claim, in the form of `claim-gate-cast-scale`.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-rim`): the rim above the valley, both
  engagements staging in the same frame.
- Additional viewpoints: **the grove** (`vp-grove`, the wait beat — close,
  quiet, inspect emphasis); **the valley floor** (`vp-valley-floor`, the naming
  beat and the aftermath cards); **the flanking route** (`vp-flank-march`,
  walk/guided-path emphasis, ADR-011).
- **Timeline beats** (`depictsDeath: true`; ADR-009 advisory wires automatically;
  suggested duration ~170s). Only the two engagement beats fork by mode:
  - `b-philistines-hear` (5:17) — Card: the Philistines hear of the anointing
    and go up to seek David; David "went down to the stronghold."
    `scholarlyViews` surfaced here: which stronghold, and the topical-arrangement
    question. No geometry.
  - `b-spread` (5:18) — Staged: the Philistine deployment across the valley
    floor. Default viewpoint. Wide, loose, unhurried.
  - `b-inquiry-1` (5:19) — Staged still + card: David inquires, and is answered.
    A small waiting group, no apparatus, no rite.
  - `b-engagement-1` (5:20a) — **Standard:** the advance off the rim and the
    Philistine formation breaking, read at distance; falls at silhouette
    distance only, no contact detail. **Reduced:** wider frame, no falls; cut
    from the advance to the emptied floor. Captions identical.
  - `b-perazim` (5:20b) — Staged/card: David's saying about waters breaking
    through, and the naming of the place. Position disclosed as a placeholder.
  - `b-images` (5:21) — Card only: the abandoned images and what was done with
    them, with the MT / 1 Chronicles 14:12 divergence surfaced. No iconography
    renders.
  - `b-return` (5:22) — Staged: the Philistines spread in the valley again.
    Deliberate visual repetition — same ground, same framing, same default
    vantage. The repetition is the scene's hinge.
  - `b-inquiry-2` (5:23) — Staged still + card: the second inquiry and the
    different answer — do not go up; circle around; come at them opposite the
    trees.
  - `b-circling` (5:23b) — Staged: the flanking march around the valley's edge,
    at walking pace. Walk/guided-path emphasis; a single shared route curve with
    per-figure offsets (the `hebron-gate` procession pattern).
  - `b-sound` (5:24) — The held wait among ordinary trees. The sign is carried by
    caption and by stillness; **nothing is rendered that depicts it**. This
    scene's ESV excerpt spend. Hold the beat long enough that the waiting reads
    as waiting.
  - `b-engagement-2` (5:25a) — **Standard:** the attack from behind the
    Philistine position, same restraint and same distance as `b-engagement-1`.
    **Reduced:** same elision as before. Captions identical.
  - `b-pursuit` (5:25b) — Card: the Philistines struck from Geba (variant:
    Gibeon) to Gezer; not rendered, with the textual variant surfaced.
  - `b-close` — Closing card: states only what the chapter states, plus the
    order-of-events disclosure shared with `jerusalem-stronghold`. **No 2 Samuel
    6+ content of any kind, including no pointer.** The milestone ends here.

## Performance target

- ≈ 110–140 high-tier figures. One `InstancedMesh` per family (figure, tree,
  scrub, rock, dust). **No fight-stance pose buckets** — the single biggest
  saving relative to `gilboa-battle`, and a historical constraint before it is a
  performance one.
- Both mass movements (the phase-one advance, the phase-two flanking march) use a
  single shared route curve with per-figure offsets rather than per-figure
  pathing — the `hebron-gate` procession precedent, adequate at this fidelity.
- The Philistine population is one instanced group repositioned between phases,
  never two coexisting groups.
- Dust, if used, reuses `gilboa-battle`'s instanced-billboard approach with a
  shared material; **no new real-time lights**, no water, no fire.
- Run `performance-reviewer` once after the flanking-march beat lands — the one
  sustained moving mass, and the only real risk in this scene.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty in
`scenes.ts` until they exist. Consolidation is allowed per the `gibeon-pool`
precedent. **None of this is blocked on queue #22**; that pass upgrades
attributions and may lift specific claims off `design-placeholder`.

- **Existing, reuse:** `claim-david-historical` (register #4 — the anchor for not
  implying an army size; cross-reference, don't restate); `claim-dress`;
  `claim-philistine-kit` — **its queue-#13 constraint carries forward unchanged
  and must be restated in the build**: the disputed feathered/plumed headdress
  renders on principal-tier Philistine figures only, never on crowd or infantry,
  behind its existing `scholarlyViews` label; `claim-battle-scale` is
  cross-referenced **as the precedent for representative-not-complete staging
  only** — its derived ~3,000-combatant chain is specific to Gilboa and must not
  be reused or extended here. Source cards already on hand and directly usable:
  `rainey-notley-2006` (Valley of Rephaim identification and historical
  geography), `borowski-1987` (regional flora and agriculture),
  `finkelstein-silberman-2001` and `mazar-2005-chronology` (period framing),
  `master-2021-philistines-highlands` (Philistine activity inland),
  `mccarter-1984-ii-samuel` (the natural extension for 5:17–25's text-critical
  points), `esv-bible`.
- **New location:** `valley-of-rephaim` — the standard identification with the
  plain southwest of Jerusalem, entered with an honest confidence level and its
  own `identification.views` if the queue-#22 pass finds the identification
  contested. **Baal-perazim gets no location entry** (unlocated — see Resolved
  design calls).
- **New, narrated (basis `biblical-text`):** `claim-philistine-reaction` (5:17 —
  the anointing as trigger, David's withdrawal to "the stronghold";
  `scholarlyViews` on which stronghold and on the chapter's possibly topical
  arrangement, hedged until named); `claim-rephaim-first-engagement` (5:18–21 —
  the deployment, the inquiry and answer, the strike, the naming of
  Baal-perazim, the abandoned images with the MT / 1 Chronicles divergence);
  `claim-rephaim-second-engagement` (5:22–25 — the second deployment, the
  different instruction, the circling, the sign, the strike, and the pursuit with
  the Geba/Gibeon variant).
- **New, design (basis `design-placeholder`):** `claim-inquiry-depiction` (no
  apparatus rendered, and why; notes record that other passages mention an ephod
  and this one does not); `claim-divine-sign-depiction` (**the policy claim** —
  the sign is stated, never visualized; pending queue #24's ratification, this
  claim is where the policy is disclosed to the user); `claim-rephaim-terrain-form`
  (valley and rim as a disclosed approximation, modeled on
  `claim-gibeon-terrain-form`); `claim-bakaim-grove` (unidentified species,
  generic dryland tree, no species asserted); `claim-rephaim-cast-scale`.
- **Characters:** reuse `david`, `davids-band`, and the existing `philistines`
  group entry (do not create a duplicate). No new named characters; both forces
  are anonymous masses.
- **ESV excerpt budget (`2sam-5`, shared with `jerusalem-stronghold` — that
  scene spends at most two of the passage's three-quote handful):** **this scene
  gets exactly one**, and it should be 5:24's sound in the tops of the balsam
  trees, which the scene's central beat cannot do without. Verify exact ESV
  wording at build time via the WebSearch snippet cross-corroboration pattern
  that closed queue #20(e); do not enter it from memory (#19(b)).

## Placeholder policy

- **Allowed placeholders:** valley and rim landform; grove placement and its
  species-generic tree form; all figure counts, spacings, and positions; the
  flanking route's exact course; Baal-perazim's staged position; lighting hour;
  dust density; the horizon ridge's profile.
- **Not allowed:** melee or blow-by-blow combat choreography; fight-stance pose
  buckets; close or lingering framing on any contact; wound, blood, or
  dismemberment geometry in any mode; any visualized theophany — wind burst,
  light, canopy figures, timed or intensified foliage motion, or camera language
  implying a presence — at 5:24 or anywhere else; any divination apparatus
  (ephod, lots, altar, priest, shrine, rite); named commanders the text does not
  name; any 2 Samuel 23 "mighty men" material; specific Philistine cult-image
  iconography; siege equipment; a `LocationEntry`, coordinates, or atlas pin for
  Baal-perazim; rendering the Geba/Gibeon-to-Gezer pursuit; mulberry (_Morus_) or
  any asserted tree species; built forms on the Jerusalem horizon; triumphal,
  celebratory, or win-state staging for either side; any assertion that these
  campaigns follow or precede the capture of Jerusalem; any 2 Samuel 6+ content,
  depicted, foreshadowed, or pointed at in the closing card.
