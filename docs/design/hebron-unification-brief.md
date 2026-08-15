# Scene brief — All Israel's covenant and anointing at Hebron (`hebron-unification`, M6)

World-director pass, Sonnet, provisional (fable-review-queue #21).
Implementation: Sonnet/`threejs-engineer` within this direction; deviations
that change historical meaning go back through `docs/fable-review-queue.md`.
First scene of Milestone 6.

**Provisional.** Fable's `fable-architect` call hit its monthly spend limit
before any work started this session (the same recurring constraint noted at
2026-07-22, 2026-08-02, and 2026-08-10). Written by Sonnet standing in for the
`world-director` role under that role's own documented fallback
(`docs/model-handoff.md`). Tracked as fable-review-queue #21, which also
covers the M6 scope call this brief implements (`src/data/milestones.ts`'s
`M6` comment) — that scope call, and everything below, needs a real Fable
read before this brief is treated as final creative direction and before the
scene ships past `in-progress`.

Scope guard: this brief covers **2 Samuel 5:1–5 only**. Nothing from 5:6
onward — the Jebusite conquest, the City of David, the Millo, Hiram of
Tyre's materials, the Philistine campaigns — may appear in this scene,
depicted or textually foreshadowed. That is `jerusalem-conquest`'s and
`baal-perazim-rephaim`'s territory, both separate briefs. This scene's
closing card may point forward to `jerusalem-conquest` only, as a named
pointer, never previewed (same discipline as `hebron-anointing`'s pointer to
`gibeon-pool` and `hebron-covenant`'s pointer to `hebron-gate`).

## Historical intent

The observer should come away understanding three things:

1. **This completes a process the atlas has been tracking since 2 Samuel 2,
   it does not start one.** `hebron-anointing` (M4, 2 Sam 2:1–7) staged a
   partial, contested coronation — Judah alone, over itself, while the rest
   of the kingdom was still Saul's house's to claim. `hebron-covenant` and
   `hebron-gate` (M5) then staged the political and violent process by which
   that rival claim collapsed: Abner's overture, his murder, David's public
   grief and disavowal. This scene is where those threads resolve: the other
   tribes now come to David, not the reverse. The observer who has walked the
   earlier Hebron scenes should feel this as a hinge closing, not a fresh
   beginning — the composition's whole job is to make the _culmination_ read
   as distinct from the _founding_.
2. **The text supplies its own legitimation, and it is worth surfacing
   directly.** 5:1b–2 has the assembled elders recite David's record
   themselves: "we are your bone and flesh," his prior field leadership of
   Israel's armies "even while Saul was king," and — the strongest claim in
   the verse — that the LORD had already said of him, "You shall be shepherd
   of my people Israel, and you shall be prince over Israel." This is not an
   invented dynastic claim the project is dressing up; it is the narrative's
   own stated basis for the kingship, put in the mouths of the very people
   ratifying it. It belongs on screen as dialogue/caption, not summarized
   away into a generic "and they made him king" card.
3. **A covenant is added to the anointing, and the sequence of both matters.**
   5:3 gives two distinct acts in order: first "King David made a covenant
   with them at Hebron before the LORD," then "they anointed David king over
   Israel." `hebron-anointing` staged only an anointing (2:4 names no
   covenant for Judah alone). This scene stages a covenant _and_ an
   anointing — a formal, mutual, oath-bound compact this time, not a purely
   ceremonial installation. The observer should be able to tell the two
   moments apart on screen.

### Distinction from `hebron-anointing` (do not restage it)

This scene must read as visibly and narratively different from `hebron-anointing`,
not as the same event with a bigger crowd:

- **Who is present.** `hebron-anointing`'s cast was "the men of Judah" — one
  tribe's own townspeople and elders, installing David over themselves. This
  scene's cast is "all the tribes of Israel" (5:1) and "all the elders of
  Israel" (5:3) — representatives arriving _from outside Judah_, not Hebron's
  own people. The `men-of-judah` character (M4) does not appear as this
  scene's principal cast; see Required source basis for the new group
  character this requires.
- **Direction of movement.** `hebron-anointing` staged a single approach
  column from the south (David's men and households coming up from the
  Negev/Ziklag direction) into a receiving town. `hebron-covenant` then
  inverted that once, for Abner alone, arriving from the north.
  `hebron-unification` inverts it again and generalizes it: Judah/Hebron is
  now the settled host, and multiple delegations converge on it from several
  directions (the central highlands, Benjamin/Ephraim, Gilead/Transjordan,
  the Galilee tribes) — not one column, several, meeting at one place. This
  multi-directional convergence, staged as visually distinct clusters
  arriving along different roads into the same gate plaza, is the single
  biggest compositional differentiator from `hebron-anointing` and should be
  designed first.
- **What is added to the ceremony.** 2:4 names a bare anointing. 5:3 names a
  covenant _before_ the anointing. The covenant-making is its own beat with
  its own (placeholder) physical form — see Resolved design calls — not
  folded silently into the anointing gesture.
- **What the caption says.** `hebron-anointing`'s every caption touching 2:4
  had to carry "over the house of Judah," never dropping the qualifier. This
  scene's captions touching 5:3 must carry the inverse qualifier — "over
  Israel" (5:3), i.e., the wider, no-longer-partial kingship — and should
  say so explicitly against the earlier, partial claim, so an observer who
  has seen `hebron-anointing` can register the change. `claim-judah-anointing`
  is cross-referenced by name in the new claim's `notes`, not silently
  superseded.
- **Register.** `hebron-anointing` was staged as a "first, local, incomplete
  step" (that brief's words) — deliberately bounded, inward-facing sightlines,
  no view toward the rest of the kingdom. This scene is the opposite: the
  whole point is that the rest of the kingdom is now _in the frame_, arriving.
  Where `hebron-anointing` used one deliberately outward sightline only for
  the Jabesh-messenger beat, this scene's default vantage is itself the
  outward-turned one throughout.

## Resolved design calls (this pass)

- **Reuse Hebron directly.** The `hebron` `LocationEntry` is `released`;
  reuse its terrain palette, town massing, and gate-plaza siting exactly as
  established by `hebron-anointing` and continued by `hebron-covenant`/
  `hebron-gate`/`hebron-reckoning`. No new regional palette, no re-derivation
  of the town. `claim-hebron-town-form` stays the released `design-placeholder`
  ("a modest highland hill town," Tell Rumeida's 10th-century gap is
  citably confirmed thin, queue #19c closed) — do not upgrade it and do not
  invent a grander plan just because this is now a bigger ceremony; a
  bigger crowd in front of a modest town is itself part of the point (this
  is still a highland chiefdom's capital, not yet a monumental one — keep
  that consistent with `claim-david-historical`'s disputed kingdom-scale
  framing).
- **Covenant physical form is a new, disclosed placeholder.** 5:3's "made a
  covenant with them... before the LORD" names no ritual mechanics — no
  sacrifice, no written document, no described gesture. Comparative ANE
  treaty/covenant conventions (oath-swearing, hand-clasping, sometimes a
  shared meal or a witnessed gesture before a cultic object) are the natural
  reference point, but — following `claim-anointing-rite-form`'s own
  precedent — `king-stager-2001` was checked for M4 and found not to cover
  ritual/investiture mechanics; assume the same gap holds here unless a
  researcher pass finds otherwise before build time. Stage the covenant as a
  simple, legible physical gesture (a raised-hand oath and/or a formal
  hand-clasp between David and a lead elder figure, witnessed by the
  assembly) — plain, unornamented, `design-placeholder`, not asserted as a
  known ANE covenant-ratification form.
- **Anointing rite form is reused, not reinvented.** The anointing itself
  (5:3b) is staged with the same physical choreography established at
  `hebron-anointing` — an unnamed elder figure pouring from a horn near
  David — reusing `claim-anointing-rite-form` by direct reference rather than
  forking a new claim. This is a deliberate visual echo: the same ritual
  form, performed again, now by all Israel's elders rather than Judah's
  alone. The horn is still the same textually-grounded prop precedent (1 Sam
  16:13's "horn of oil"), not a new invention.
- **The recitation (5:1b–2) is a dialogue/caption beat, not narration-only.**
  Unlike most of this project's context cards, this passage's legitimation
  language is worth putting in the mouths of the assembled elders on screen
  — an inspectable dialogue label at a close viewpoint, not just a top-of-scene
  card. This is the one deliberate exception to this scene's otherwise
  spare, card-forward economy, because the text itself stages it as speech.
- **The reign-length summary (5:4–5) is the scene's closing card, and is a
  distinct claim from the covenant/anointing action.** These two verses are
  a formulaic regnal notice (age at accession, total reign length, split
  between the Hebron-over-Judah years and the Jerusalem-over-all-Israel-
  and-Judah years) — the same kind of annalistic convention that recurs
  through Kings for other monarchs, not part of the narrated _scene_ action.
  It closes this scene as a numeric card (not staged, no geometry) precisely
  because it is the natural close of the Hebron era before the milestone
  moves to Jerusalem — see Camera/timeline beats. Kept as its own claim
  (`claim-david-reign-length`) rather than folded into the covenant claim's
  `notes`, because it is reusable by later scenes (`jerusalem-conquest`'s own
  closing beat picks up the "33 years at Jerusalem" figure this claim
  establishes) and because it deserves its own disclosure: 7 years 6 months
  (Hebron) + 33 years (Jerusalem) sums to 40.5, while 5:4 states the round
  total as "forty years" — the text itself rounds; this is not a
  discrepancy the project needs to resolve or flag as disputed, just
  disclosed plainly in the claim's `notes`.

## Visual composition

- **Terrain:** reuse the Judean-highland `TerrainSpec`/town massing
  established by `hebron-anointing` and continued through M5's three Hebron
  scenes. No new assets beyond what Resolved design calls above requires.
- **Focal masses:** (a) **the converging roads** — three to four visually
  distinct delegation clusters arriving along different approach roads from
  different directions (not literal, geographically precise per-tribe
  routing — a disclosed design choice, see Scale assumptions — but
  legibly _plural_, several streams meeting at one point, the scene's core
  visual argument); (b) **the gate plaza** — same siting as every prior
  Hebron scene, now dressed as the covenant/anointing ground, the scene's
  ceremonial center; (c) **David's receiving household/escort** — a
  stationary, already-present group at the plaza (the inverse of
  `hebron-anointing`'s arriving column: here Judah/David is host, not
  arrival); (d) **the elders**, a visually distinguished front-rank subset
  within the assembly (better dress/staffs, no invented individual names),
  singled out physically for the covenant and anointing beats without being
  an additive headcount.
- **Sightlines:** the default vantage is elevated and outward-turned — unlike
  `hebron-anointing`'s deliberately bounded, inward-facing frame, this scene
  should hold the town _and_ multiple approaching roads in view at once, so
  the "whole kingdom converging" reading is available at a glance. The
  covenant/anointing vantage is close, plaza-level, ceremonial — sequenced so
  the covenant gesture and the anointing gesture are visibly two distinct
  beats, not blurred into one motion. The recitation is staged at
  conversational proximity (comparable to `hebron-covenant`'s feast vantage),
  since it is the scene's one dialogue-forward beat.
- **Lighting:** daytime, a public civic/covenant ceremony — clear late-morning
  or midday light for legibility, matching `hebron-anointing`'s own lighting
  call. Hour unstated in text; disclosed `design-placeholder`, no dusk/dread
  staging (there is no tension to foreshadow here — this is the resolution
  beat, not a beat like `hebron-gate`'s that needs foreboding).

## Scale assumptions

The text gives no headcount for either "all the tribes of Israel" (5:1) or
"all the elders of Israel" (5:3) — both are disclosed design choices,
following the project's standing "no narrated count → representative
assembly" convention (`claim-judah-assembly-scale` in `hebron-anointing`,
`claim-gate-cast-scale` in `hebron-gate`).

- **Delegation assembly ("all the tribes of Israel," 5:1): ~180–220 figures**
  at high quality tier, staged as three to four distinguishable converging
  clusters (not one homogeneous crowd) — larger than `hebron-anointing`'s
  single-tribe 150–200-figure assembly would be if it were literally one
  cluster, but organized so the _composition_, not a blunt headcount jump,
  carries the "all Israel, not just Judah" reading. This is still a
  representative body of elders/delegates, not a literal national muster —
  any literal per-tribe count at Iron Age regional population estimates
  (`claim-david-historical`'s cited Finkelstein & Silberman figures) would
  run into the tens of thousands at minimum, several orders of magnitude
  unrenderable and, more importantly, not what "all the elders of Israel"
  actually asserts (a representative body, not a census).
- **Elders singled out for the covenant/anointing (5:3): ~30–40 figures**,
  called out from within/at the front of the delegation assembly above (not
  additive to the 180–220) — the same "distinguished subset, not a separate
  headcount" convention `hebron-anointing` used for Judah's own elder
  contingent within its townspeople assembly.
- **David's Hebron household/court presence receiving them: ~30–40 figures**
  — a disclosed design count, deliberately smaller than `hebron-anointing`'s
  ~60-figure arriving retinue (that scene rendered the standard ~1:10
  narrated ratio off the 600 fighting men for a column _arriving_; here
  David's side is a stationary court/household presence _receiving_, not a
  fresh muster, so the 1:10 ratio is not reapplied — `davids-band` is
  referenced by continuity, not re-ratioed).
- **Ambient Hebron town background: ~20–30 figures**, same convention as
  every prior Hebron scene (`hebron-covenant`, `hebron-gate`).
- **High-tier total ≈ 230–290 figures** — comparable to, but not exceeding,
  `hebron-anointing`'s 250–310-figure ceiling. Deliberately not a bigger raw
  number than the M4 scene: the differentiator is the multi-directional
  composition and the covenant-plus-anointing sequence (see Historical
  intent), not crowd-size escalation. This keeps the scene inside the
  M6 comment's "cheapest [of the three M6 scenes], reuses Hebron directly"
  build-order framing.
- No narrated numbers exist in 5:1–3 to ratio from; every count above is a
  disclosed design choice (`claim-unification-cast-scale`, parallel in form
  to `claim-judah-assembly-scale`/`claim-gate-cast-scale`/
  `claim-covenant-cast-scale`).

## Camera / observer experience

- **Default viewpoint** (`vp-convergence-ridge`): an elevated vantage north/
  east of the town, holding the town and two or more approach roads in one
  frame simultaneously — the scene's core "kingdom converging" image, and
  the direct visual inverse of `hebron-anointing`'s single bounded southern
  frame.
- Additional viewpoints: **the covenant/anointing plaza** (`vp-covenant-plaza`,
  walk-then-inspect emphasis — the same gate-plaza siting as every prior
  Hebron scene, close enough to read the covenant gesture and the anointing
  gesture as two distinct beats); **the recitation ground**
  (`vp-recitation`, close, conversational — where 5:1b–2's dialogue/caption
  is surfaced, comparable proximity to `hebron-covenant`'s feast vantage).
- **Timeline beats** (`depictsDeath: false` — no violence, no ADR-009
  advisory; suggested duration **~80s**, inside the brief's 60–100s target —
  shorter than every M5 Hebron scene and shorter than `hebron-anointing`
  itself, because this scene has no pre-history context cards to carry: 5:1–5
  _is_ the staged content, start to finish, with nothing before it to
  summarize):

  | Beat              | Text   | Treatment                                                                                                                                                                                                                  |
  | ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-convergence`   | 5:1a   | Staged: delegation clusters converge on Hebron from multiple directions. Default viewpoint holds the town and the roads together.                                                                                          |
  | `b-recitation`    | 5:1b–2 | Staged dialogue/caption beat at `vp-recitation`: the elders recite David's prior field leadership and the LORD's word ("shepherd... prince over Israel"). ESV excerpt candidate (see Required source basis).               |
  | `b-covenant`      | 5:3a   | Staged: David and the elders make a covenant "before the LORD" — the disclosed oath/hand-clasp gesture at `vp-covenant-plaza`. A visibly distinct beat from the anointing that follows.                                    |
  | `b-anointing`     | 5:3b   | Staged: the elders anoint David king over Israel, reusing `hebron-anointing`'s oil-horn gesture. Caption states explicitly: over **Israel**, no longer Judah alone — contrast with `claim-judah-anointing` named directly. |
  | `b-reign-summary` | 5:4–5  | Closing numeric card, not staged/no geometry: age 30 at accession; 7 years 6 months at Hebron over Judah; 33 years at Jerusalem over all Israel and Judah; 40 years total (the text's own rounding, disclosed).            |
  | `b-close`         | —      | Closing card: forward pointer to `jerusalem-conquest` only (the Jebusite conquest and City of David) — stated as a pointer, not previewed. **No 2 Samuel 5:6+ content.**                                                   |

- Walk mode should let the observer cross from one converging delegation
  cluster to another before reaching the plaza — a short, legible traversal,
  not a long route; this is a compact scene by design.

## Performance target

- ≈ 230–290 high-tier figures (see Scale assumptions), comparable to but not
  exceeding `hebron-anointing`'s established ceiling — the largest M6 crowd
  among the milestone's three scenes is expected to be `jerusalem-conquest`'s
  own build, not this one; this scene stays inside the "cheapest of the
  three, reuses Hebron directly" framing from the `M6` milestone comment.
- One `InstancedMesh` per repeated family: figure, terrace-wall segment,
  olive tree, town-block structure — all reused unchanged from
  `hebron-anointing`/`hebron-covenant`. New prop families are minimal: a
  small `asset-covenant-props` set (oath/hand-clasp staging, if any prop is
  needed beyond bare gesture) alongside the existing reused
  `asset-anointing-props` (oil horn).
- Reuse the ADR-010 procedural figure rig and its static/crowd pose-bucket
  system unchanged; mostly static "assembly" poses across the delegation
  clusters, the same cheap-per-figure profile `hebron-anointing`'s civic
  assembly already established.
- No new lights, no water, no fire. Run `performance-reviewer` once, after
  the delegation-cluster and plaza geometry lands; expected to pass at or
  below `hebron-anointing`'s already-cleared ceiling.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty
in `scenes.ts` until they exist. Claim consolidation is allowed per the
`hebron-covenant`/`hebron-gate` precedent (coverage matters, not count).

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`
  (stays the released `design-placeholder` — do not upgrade), `claim-dress`
  (shared, undifferentiated across all delegations and David's household),
  `claim-david-historical` (kingdom-scale framing — this scene's "all
  Israel" language should not be read as resolving the maximalist/minimalist
  dispute that claim carries; cross-reference explicitly in `notes`),
  `claim-judah-anointing` (the M4 predecessor this scene completes — cross-
  reference by name, do not silently supersede), `claim-anointing-rite-form`
  (the oil-horn gesture, reused directly for the 5:3b anointing beat, not
  forked), `claim-600-men`/`davids-band` (David's household/court presence,
  referenced by continuity, not re-ratioed — see Scale assumptions). The
  `hebron` location is `released` and already lists `hebron-unification` in
  `sceneIds`.
- **Optionally cross-referenced in captions (not restaged):**
  `claim-long-war`, `claim-abner-break`, `claim-covenant-feast` (M5's
  political process — Abner's overture and death — that made this scene's
  reunification possible; useful for a "how did we get here" caption
  aside, not required).
- **New, narrated (basis `biblical-text`):**
  - `claim-all-israel-covenant` (5:1–3, high confidence) — statement should
    cover, in order: the tribes' arrival, their recitation of David's prior
    leadership and the LORD's word ("shepherd... prince over Israel," 5:2),
    the covenant made before the LORD (5:3a), and the anointing over Israel
    (5:3b, contrasted explicitly with `claim-judah-anointing`'s "house of
    Judah only" scope). `notes` should state plainly that this is the wider
    anointing `claim-judah-anointing` already flagged as pending ("several
    chapters and years after" the M4 scene), now realized, and should not
    assert anything about the kingdom's territorial scale beyond what 5:1–3
    itself says (cross-reference `claim-david-historical`).
  - `claim-david-reign-length` (5:4–5, high confidence) — the regnal
    numbers (age 30 at accession; 7 years 6 months at Hebron over Judah; 33
    years at Jerusalem over all Israel and Judah; 40 years total). `notes`
    should disclose the text's own rounding (7.5 + 33 = 40.5, stated as
    "forty years"), note the formulaic/annalistic character of the notice
    (comparable to other regnal summaries elsewhere in Samuel–Kings), and
    flag that this claim is the authoritative source for the "33 years at
    Jerusalem" figure `jerusalem-conquest`'s own closing beat may reuse.
- **New, design (basis `design-placeholder`):**
  - `claim-covenant-rite-form` (speculative) — the physical choreography of
    "made a covenant... before the LORD" (5:3a): a disclosed oath/hand-clasp
    gesture between David and a lead elder figure, witnessed by the
    assembly. `notes` should record that `king-stager-2001` was checked at
    M4 for ritual/investiture mechanics and found not to cover it; a
    researcher pass should re-check before this claim is treated as
    permanently thin, following the `claim-anointing-rite-form` precedent.
  - `claim-unification-cast-scale` (speculative) — the disclosed design
    counts in Scale assumptions above, parallel in form to
    `claim-judah-assembly-scale`/`claim-covenant-cast-scale`/
    `claim-gate-cast-scale`.
- **Characters:** reuse `david`, `davids-band`. New light group entry
  `elders-of-israel` (kind `group`) for "all the tribes of Israel"/"all the
  elders of Israel" (5:1, 5:3) — unnamed in the text, no individual elders
  invented, same discipline as `men-of-judah`. Do **not** reuse
  `men-of-judah` as this scene's principal cast: that character's own
  summary is scoped to "over the house of Judah," the wrong body for this
  scene (though Judah's own presence is implicitly continuous with "all
  Israel" now — worth a cross-reference in `elders-of-israel`'s summary,
  not a shared character record). `claimIds`: `claim-all-israel-covenant`,
  `claim-unification-cast-scale`, `claim-dress`.
- **ESV excerpt budget:** `2sam-5` is shared across all three M6 scenes
  (unspent, ≤3 excerpts / ≤200 chars each / ≤500 chars total for the whole
  chapter — `2sam-5`'s passage note already flags 5:2b/5:3's covenant
  language as a likely candidate). This scene is the milestone's build-order
  first and the natural home for the strongest single line: **5:2b**, "You
  shall be shepherd of my people Israel, and you shall be prince over
  Israel" (short, ~85 characters, directly supports the `b-recitation`
  beat's dialogue staging). Recommend spending exactly one quote here and
  leaving the remaining two/≈415 characters for `jerusalem-conquest` (5:8's
  "blind and lame" line, caption-only per the `M6` milestone comment) and
  `baal-perazim-rephaim` (5:24's "sound of marching in the tops of the
  balsam trees" is the strongest candidate there) — flagged as candidates
  only; verify exact wording and finalize the cross-scene split at build
  time, same coordination discipline `hebron-covenant`/`hebron-gate` used
  for their shared `2sam-3` budget.

## Placeholder policy

- **Allowed placeholders:** the covenant gesture's exact physical form (oath/
  hand-clasp, who initiates, any witnessed object); the delegation clusters'
  exact routing and per-cluster composition (no literal per-tribe geographic
  assignment asserted); the elders' exact positions within the assembly;
  lighting hour; ambient-town activity; David's household/court presence's
  exact composition. Nothing here requires a placeholder beyond what Hebron
  scenes already carry — `claim-hebron-town-form` stays the only load-bearing
  town-level placeholder, unchanged from every prior Hebron scene.
- **Not allowed:** any 2 Samuel 5:6+ content (Jebusite conquest, City of
  David, Millo, Hiram of Tyre) depicted or foreshadowed beyond the closing
  pointer card; restaging `hebron-anointing`'s scene as this scene's template
  (same crowd composition, same single southern approach column, same
  caption omitting the "over Israel" vs. "over the house of Judah" contrast)
  — the Distinction-from-`hebron-anointing` section above is binding, not
  optional flavor; dropping the "over Israel" qualifier from any caption
  touching 5:3; asserting a literal per-tribe headcount or presenting the
  180–220 delegation figure as anything but representative; inventing named
  elders or named tribal representatives; treating the covenant gesture as a
  known, citable ANE ritual form rather than a disclosed placeholder unless
  a researcher pass finds a real source; any Jerusalem geometry anywhere in
  this scene (wrong location entirely — `jerusalem-conquest`'s territory).
