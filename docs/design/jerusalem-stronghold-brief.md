# Scene brief — the Jebusite stronghold and the City of David (`jerusalem-stronghold`, M6)

World-director pass, Fable, 2026-08-23. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First scene of Milestone 6, and the milestone's
load-bearing and most contested one — the project's first geometry at Jerusalem,
on a site whose 10th-century character is one of the central disputes of the
field.

Scope guard: this brief covers **2 Samuel 5:1–16**, with staged action beginning
at 5:6 (David and his men going to Jerusalem against the Jebusites) and ending at
5:12. Everything before 5:6 — all Israel's approach to David at Hebron, the
covenant, the anointing over the united kingdom (5:1–3), and the regnal summary
(5:4–5) — is delivered as **context cards, not staged**, and **no Hebron geometry
appears in this scene** (see Resolved design calls and queue #21). 5:13–16's
wives and sons list is card-only. The Philistine campaigns of 5:17–25 belong to
`rephaim-valley`, a separate brief; this scene's closing card may point forward
to that scene only, and must disclose rather than resolve the order-of-events
question. **Nothing from 2 Samuel 6 onward — the ark, the tent, the dynastic
oracle, Bathsheba, the temple — may appear in this scene, depicted or textually
foreshadowed, including any gloss on the Solomon and Nathan named in 5:14.**

## Historical intent

The observer should come away understanding five things:

1. **The capital is chosen precisely because it belongs to no tribe.** Jerusalem
   is taken as a Jebusite enclave sitting on the seam between Judah and Benjamin
   — outside both the Judahite base that made David king at Hebron and the
   northern tribes that had just come over to him. A king of a freshly united
   kingdom takes a city that is nobody's ancestral town and holds it as his own.
   That political logic is what the `/atlas` M6 phase maps and what this scene
   makes physical: the observer who walked four scenes at Hebron should feel the
   move as a deliberate relocation, not a promotion. (This reading is standard in
   commentaries; it must be attributed to a named commentator once the queue-#22
   researcher pass lands, and hedged as "commonly noted" until then — the
   `claim-abner-break` precedent.)
2. **The terrain is the argument.** The southeastern ridge is small, narrow, and
   steep-sided — the Kidron falling away east, the central valley west, the ridge
   climbing to a saddle at its north end — with its water source, the Gihon, at
   the foot of the eastern slope rather than inside the walls. Standing below it
   is what makes "the blind and the lame will keep you out of here" legible as a
   boast about ground, not a joke. This is the thing walking the scene teaches
   that no caption can, and it is the scene's primary reason to exist in 3D.
3. **How David took the stronghold is not known, and the project renders no
   answer.** 5:8's _tsinnôr_ is one of the genuinely open cruxes of the book: the
   word's meaning is disputed (water shaft, conduit, hook/grappling implement,
   and other proposals), the traditional identification with the Warren's Shaft
   system has been challenged on archaeological grounds, and 2 Samuel 5 does not
   even name who went up (1 Chronicles 11:6 does; that is a different text). The
   scene stages the approach and the aftermath and leaves the assault in the gap
   the narrative itself leaves ("nevertheless David took the stronghold"). See
   Resolved design calls; queue #23.
4. **What 10th-century Jerusalem actually was is contested, and the render sits
   deliberately at the conservative end.** Readings range from a modest
   fortified stronghold on a small ridge to a more substantial administrative
   center; the excavated evidence (the terrace systems of the eastern slope, the
   structures identified by some excavators as monumental, the chronology of all
   of it) is argued over. The scene renders small and says why, rather than
   rendering large and hedging in a caption — under-rendering is recoverable,
   over-rendering silently picks a side.
5. **The city becomes a capital by being built, and the building is foreign
   work.** 5:11's cedar, carpenters, and masons come from Tyre. The observer
   should see a construction site, not a palace — the text's own claim is that a
   house was built, and construction-in-progress is the honest visual form for a
   building whose archaeological identification is disputed.

## Resolved design calls (this pass)

- **5:1–5 is cards + atlas, not a fourth Hebron scene.** The all-Israel covenant
  and anointing is compositionally the same staging the project has already
  rendered twice at the same plaza (`hebron-anointing`'s tribal assembly and
  anointing; `hebron-covenant`'s northern delegation and covenant) and would add
  no historical understanding a caption cannot carry. What is genuinely new about
  it — two political regions becoming one, and the capital moving — is
  cartographic, which the 2026-08-02 M4 review already ruled is atlas work. So:
  opening cards here, plus a `/atlas` M6 phase (below). This is a real judgment
  call against a real alternative, it is logged as **queue #21**, and it is
  cheaply reversible because the Hebron geometry already exists. Implementers
  must not quietly reverse it by staging Hebron in this scene.
- **The capture mechanism renders not at all, in any mode.** No water shaft, no
  tunnel, no spring-side infiltration, no scaling, no siege equipment, no assault
  choreography. This extends the restraint the 2026-08-10 sign-off ratified for
  killings the text narrates without method detail (`hebron-reckoning`'s
  `AssassinPose` deliberately having no strike field) from killing-method to
  assault-method: where the text gives no method, none is invented. The beat
  holds on the ridge and the caption states that the stronghold was taken. Queue
  #23 governs any future change.
- **`depictsDeath: false`, and the reason is stated in the scene notes.** No
  death, no fighting, and no handling of the dead is staged anywhere in this
  scene, so ADR-009's advisory does not fire. Captions still state plainly that
  the stronghold was taken by force and that 5:8 speaks of striking the
  Jebusites — reduction of depiction never reduces the facts, and here the
  depiction is absent because the narrative's own camera is absent, not because
  the event is being softened.
- **The taunt is spoken and captioned, never enacted.** No figures are staged
  performing "the blind and the lame" — not Jebusite defenders posed as disabled,
  not David's men mocking them. The saying's meaning is genuinely disputed (a
  boast that even the weakest defenders would suffice; a ritual/apotropaic act;
  a later etiology attached to the exclusion proverb 5:8 itself reports), staging
  any one reading picks a winner, and rendering disabled figures as a defensive
  gimmick would be both an unsourced reading and gratuitous. Carry the readings
  as `scholarlyViews`; report 5:8c's proverb as the text's own aside, without
  endorsing it and without extending it to any later practice.
- **The Millo is named as a question, not identified in geometry.** 5:9 names it
  and explains nothing. The eastern slope of this ridge genuinely required
  terracing to be built on, so terracing renders as terrain form — but **no
  rendered element is labeled "the Millo,"** and the identification with the
  excavated stepped/terrace structures (a named proposal with a contested
  dating, not a consensus) is carried in the claim layer and explicitly not
  adopted by the geometry. A card at the terrace vantage states what the word
  means (something like "the filling"), what has been proposed, and that the
  project has not chosen.
- **The Gihon renders; no water system does.** A modest spring outflow at the
  foot of the eastern slope, using `gibeon-pool`'s convention exactly (shallow
  basin, flat unlit/minimally-lit water plane, no shader, disclosed dimensional
  placeholder). No shaft, no tunnel, no channel, and no monumental spring
  fortifications — the excavated spring defenses are real but their standing
  state and use in this specific window is a separate question the project has
  not researched; the queue-#22 pass may change that, and until it does, nothing
  monumental renders at the spring.
- **Fortification form is conservative and disclosed.** A modest stone circuit
  enclosing a small summit area at the ridge's high end, with a simple gateway.
  **No monumental six-chamber gate** — the same `herzog-1997` typology reasoning
  that governed `claim-hebron-gate-form` applies here and applies harder, since
  Jerusalem is exactly the site where an over-built rendering would be read as a
  position in the extent dispute. No casemate system, no glacis, no towers
  without a citation.
- **The Hiram beat renders construction, not architecture.** Timber baulks,
  dressed stone courses, masons and carpenters working, a partially raised
  structure. **No finished cedar palace**, no 9th–8th-century royal-architecture
  vocabulary (proto-Aeolic capitals, decorative ashlar programs, window
  balustrades), and no identification of any rendered building with any excavated
  structure proposed as David's palace. The unfinished state is the honest form.
- **Tyrian craftsmen carry no invented Phoenician dress.** Reuse the shared,
  undifferentiated `claim-dress` treatment and differentiate the party only by
  what they are doing and handling (tools, timber, stone) — the same
  no-invented-side-uniforms rule ratified at `gibeon-pool`. Hiram himself is
  never staged; he sends messengers, and the text says nothing about his
  appearing.
- **Joab is not staged at the capture.** 2 Samuel 5 names no one who went up;
  1 Chronicles 11:6 names Joab. That is a different text with a different
  emphasis, and staging it here would silently harmonize. It may appear as a
  cross-canonical note in claim `notes`, attributed, once queue #22 supplies a
  commentator — the same standard applied to (and ultimately withheld from) the
  refuge-city note in `hebron-gate`.
- **5:13–16 is card-only**, listed as the text lists it — the `hebron-covenant`
  treatment of 3:2–5, exactly. No geometry, no household staging, no forward
  commentary on any name in the list. The claim's `notes` may record that the
  narrative presents royal polygyny as ordinary practice without the text
  commenting on it here; nothing more.
- **The order of events is disclosed, not resolved.** 5:17 has the Philistines
  react to the anointing, and the "stronghold" David goes down to there may or
  may not be this one; commentators have long read chapter 5 as topically rather
  than strictly chronologically arranged. Neither this scene nor `rephaim-valley`
  asserts that one happened before the other. The closing card says so plainly.

## Companion atlas extension (not part of this scene, same milestone)

A `ui-engineer` slice extends `/atlas` with an M6 phase, per ADR-011 and the M4/M5
overlay precedent, under the same constraints that governed those: soft labeled
regions keyed to the text's own name-lists, **never hard border lines**, the whole
overlay disclosed as schematic. What changes at M6: the two regions carried since
M4 (Judah; the northern writ, headless since M5) **merge into one labeled region**
under a single king, and the capital marker moves from Hebron to Jerusalem. Two
guards: the merge is captioned as a change of allegiance under one king, not as a
mapped territorial extent — 2 Samuel 5 gives a covenant and an anointing, not a
border; and Jerusalem is plotted at its secure coordinates while the _extent_
dispute stays in the claim layer, not the map. A new claim
(`claim-atlas-m6-phase`) cross-references rather than re-derives the scene claims,
per `claim-atlas-m5-phase`'s precedent.

## Visual composition

- **Terrain:** a new `TerrainSpec` — a narrow, steep-sided ridge between two
  valleys, rising to a saddle at the north. Derive its palette and vegetation
  vocabulary from the Judean-highland spec established by `hebron-anointing`
  (limestone, terracing, olive) rather than inventing a new material language;
  the landform is new, the region is not.
- **Focal masses:** (a) **the ridge in profile**, seen from across the eastern
  valley — the scene's establishing mass and the whole argument of intent #2;
  (b) **the stronghold enclosure** at the ridge's high end — small, modest,
  deliberately unimpressive; (c) **the terraced eastern slope** — the ground the
  Millo question is about; (d) **the Gihon outflow** at the slope's foot — where
  the _tsinnôr_ card is delivered, at the exact place the dispute is about, with
  nothing rendered that resolves it; (e) **the construction ground** for the
  Hiram beat, inside or beside the enclosure.
- **Sightlines:** the default vantage is **from outside and below**, across the
  valley — an approaching observer's view, which is what makes the site's
  defensibility read. The scene's structural device is a before/after pair: the
  same ridge framed from outside (Jebusite stronghold) and then from inside
  (David's city), with the taking itself unrendered between them. Keep both
  framings recognizably the same geography.
- **Lighting:** daytime; hour unstated in the text — steady midday/early
  afternoon, disclosed `design-placeholder`. No siege-drama light, no dawn
  assault framing, no golden-capital framing at the naming beat.

## Scale assumptions

Precedent, stated explicitly: Ziklag's ~1:10 figure ratio applies to **narrated
counts** (register #7); `gilboa-battle`'s ~1:20 battle scale applies to an
**unnarrated** force and was disclosed as a representative engagement rather than
a complete army. 2 Samuel 5 narrates no count for David's force, for the
Jebusites, or for Hiram's workmen — so, as at Gilboa and at
`claim-judah-assembly-scale`, **no ratio is claimed**: every count below is a
disclosed design choice for legibility.

- **David's force: ≈ 40–60 figures** — an approach column at the capture beats,
  redistributed as an occupying presence afterward. Deliberately not an army: the
  text calls them "the king and his men."
- **Jebusite inhabitants: ≈ 25–40 figures** — a small stronghold population.
  This number is itself a historical statement and must be disclosed as one:
  rendering a populous city would silently take the maximalist side of the
  extent dispute this scene is supposed to carry openly.
- **Hiram's craftsmen: ≈ 10–15 figures**, plus timber and stone as props.
- **Ambient household/settlement after the occupation: ≈ 20–30 figures**, static.
- **High-tier total ≈ 100–130 figures** — below `gilboa-battle`'s measured band,
  and cheaper per figure (no combat pose buckets). Hard cap: this scene must not
  exceed `gilboa-battle`'s high-tier instance count while that scene's
  real-hardware performance check is still open (`docs/next-run.md`).
- `claim-stronghold-cast-scale` carries all of the above as a disclosed design
  claim, in the form of `claim-covenant-cast-scale`/`claim-gate-cast-scale`.

## Camera / observer experience

- **Default viewpoint** (`vp-kidron-east`): across the eastern valley, the ridge
  in full profile — the approach, the taunt, and the aftermath all stage against
  this frame.
- Additional viewpoints: **the spring** (`vp-gihon`, at the foot of the eastern
  slope — the _tsinnôr_ card's home, inspect emphasis); **inside the enclosure**
  (`vp-stronghold`, the occupation, naming, and the milestone's quietest frame);
  **the terraces** (`vp-terraces`, the Millo card, walk emphasis); **the
  construction ground** (`vp-building-ground`, the Hiram beats).
- **Walk emphasis is unusually strong here.** The ascent from the spring up the
  eastern slope to the enclosure is the best embodied-understanding walk the
  project has had — it teaches the gradient that intent #2 is about — and is a
  good candidate for ADR-011's guided-path affordance. **It must be framed
  explicitly as an observer's ascent after the capture, never as a reenactment of
  an assault route**, in both the path's own copy and the surrounding captions;
  otherwise the walk quietly asserts the very mechanism the scene refuses to
  render.
- **Timeline beats** (`depictsDeath: false`; suggested duration ~170s). No
  reduced-mode fork is needed anywhere in this scene, since nothing violent is
  depicted:
  - `b-all-israel` (5:1–3) — Opening card: all the tribes come to David at
    Hebron, the elders' covenant "before the LORD," the anointing over Israel.
    No geometry; explicitly cross-references `hebron-anointing` and
    `hebron-covenant` in the inspector, and points at the `/atlas` M6 phase as
    where the political change is mapped.
  - `b-regnal` (5:4–5) — Card: David's age at accession and the reign's
    division between Hebron and Jerusalem. A chronology card, no geometry; the
    figures are the text's own and are reported as such, with no attempt to fix
    absolute dates (register #5).
  - `b-approach` (5:6a) — Staged: the king and his men come up toward the ridge;
    default viewpoint. The city is intact, inhabited, and clearly held by
    someone else.
  - `b-taunt` (5:6b) — Staged/spoken: the Jebusite answer, delivered from the
    wall line at distance. Nothing enacted (see Resolved design calls). ESV
    excerpt candidate.
  - `b-taking` (5:7) — **The narrative's own gap.** Hold on the ridge; the
    caption states that David took the stronghold of Zion, "that is, the city of
    David." No assault renders, in any mode.
  - `b-tsinnor` (5:8) — Card at `vp-gihon`: what the verse says, what _tsinnôr_
    might mean, why the traditional identification is contested, and that the
    project renders no answer. The milestone's single most important claim
    surface. `scholarlyViews`, hedged until queue #22 supplies names.
  - `b-dwelling` (5:9a) — Staged: David in the stronghold; the naming as the
    city of David. Interior vantage; the before/after pair closes here.
  - `b-millo` (5:9b) — Card at `vp-terraces`: the building "from the Millo
    inward," what the word means, the proposed identification, and the project's
    non-adoption of it in geometry.
  - `b-greater` (5:10) — Short card: the narrative's own summary that David
    became greater and greater. Reported as the narrative's framing, not as a
    measured historical trajectory (cross-reference `claim-david-historical`).
  - `b-hiram` (5:11) — Staged: messengers from Tyre, cedar timber, carpenters
    and masons, a house going up. Construction, not architecture.
  - `b-perceived` (5:12) — Card: David perceived that the LORD had established
    him king. Carried as the narrative's statement about David's own perception,
    in the narrated-not-asserted register.
  - `b-household` (5:13–16) — Card only: more wives and concubines, more sons
    and daughters, the Jerusalem-born sons listed as the text lists them. **No
    gloss on any name.**
  - `b-close` — Closing card: states only what 5:1–16 states, plus the honest
    disclosure that the chapter's arrangement may be topical and that
    `rephaim-valley`'s campaigns are not asserted to follow these events.
    In-milestone forward pointer only. **No 2 Samuel 6+ content.**

## Performance target

- ≈ 100–130 high-tier figures, mostly static/idle pose buckets; one
  `InstancedMesh` per repeated family (figure, terrace wall, wall course, olive,
  structure, timber, construction prop).
- **The new terrain is the real cost here, not the figures.** A steep narrow
  ridge with terraced flanks is the most geometrically demanding landform the
  project has attempted; budget for it explicitly and run `performance-reviewer`
  **after the terrain and terracing land**, before the figure work, rather than
  at the end (the `gilboa-battle` lesson).
- Spring uses the `gibeon-pool` no-shader convention. No new lights, no fire, no
  particle systems. Reuse the ADR-010 procedural rig unchanged.
- Hard ceiling: at or below `gilboa-battle`'s high-tier instance count while its
  real-hardware check remains open.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty in
`scenes.ts` until they exist. Claim consolidation is allowed per the `gibeon-pool`
precedent (coverage matters, not count). **None of this is blocked on queue #22** —
the existing cards below give every claim a real citation floor; #22 upgrades
attributions and may lift specific claims off `design-placeholder`.

- **Existing, reuse:** `claim-david-historical` (the kingdom-scale dispute is the
  frame for the city-extent dispute — cross-reference, don't restate),
  `claim-dress`, `claim-judah-anointing` (the "house of Judah only" qualifier
  this scene's opening card finally lifts — say so), `claim-hebron-identification`
  (referenced by the opening cards only). Source cards already on hand and
  directly usable: `rainey-notley-2006` (identification/historical geography),
  `herzog-1997` (fortification and gate typology — the do-not-build-monumental
  constraint), `king-stager-2001` (building materials, houses, construction),
  `mazar-1990` and `mazar-2005-chronology` (Iron Age archaeology and the
  chronology framing), `finkelstein-silberman-2001` (the conservative/minimal
  reading of early-monarchy Jerusalem), `mccarter-1984-ii-samuel` (already
  extended to 2 Samuel 3–4; 2 Samuel 5 is the natural next extension and is the
  cheapest route to a named _tsinnôr_ attribution), `esv-bible`.
- **New location:** `jerusalem` — `identification.disputed: false` for the
  southeastern ridge/City of David (the identification of the site is secure; it
  is the _character and extent_ of the 10th-century settlement that is disputed,
  and that belongs in claims, not in `identification.views`). `approxCoordinates`
  confidence `high`. Include the location in the atlas extension.
- **New, narrated (basis `biblical-text`):** `claim-all-israel-covenant`
  (5:1–5 — the tribes' approach, the elders' covenant, the anointing, the regnal
  summary; notes carry the M4/M5 cross-references and the atlas pointer);
  `claim-jerusalem-capture` (5:6–7 — the approach, the taunt, the taking;
  `scholarlyViews` on the blind-and-lame saying, at least: a boast about the
  strength of the position, a ritual/apotropaic reading, and an etiological
  reading of the proverb in 5:8c — each hedged until named);
  `claim-tsinnor-crux` (5:8 — **the milestone's most important claim**, its own
  record rather than a note, with `scholarlyViews` covering at minimum the
  water-shaft/conduit reading, the hook/implement reading, and the position that
  the term's meaning is simply not recoverable; notes must state that the
  archaeological identification with the shaft system has been challenged, that
  2 Samuel 5 names no one who went up, and that the project renders no
  mechanism); `claim-city-of-david-naming` (5:7, 9 — the stronghold of Zion, the
  naming, the building from the Millo inward); `claim-hiram-building` (5:11–12 —
  Tyrian materials and craftsmen, the house, David's perception);
  `claim-jerusalem-household` (5:13–16).
- **New, design (basis `design-placeholder` unless queue #22 lifts them):**
  `claim-jebusite-stronghold-form` (the enclosure and circuit; **carries the
  extent dispute as `scholarlyViews`** — modest stronghold vs. substantial
  administrative center — and states that the render sits at the conservative
  end deliberately); `claim-millo-identification` (`scholarlyViews`: the terrace/
  stepped-structure proposal with its dating dispute vs. other and unknown
  referents; notes state explicitly that no rendered element is identified as the
  Millo); `claim-gihon-spring` (existence and location `archaeology`/`high`; the
  rendered form a disclosed placeholder; notes state that no water system renders
  and why); `claim-jerusalem-terrain-form` (the ridge/valley landform as a
  disclosed approximation, modeled on `claim-gibeon-terrain-form`);
  `claim-stronghold-cast-scale`.
- **Characters:** reuse `david`, `davids-band`. New: `jebusites` (group,
  staged); `hiram` (referenced-only, never staged); Tyrian craftsmen as an
  unnamed group. **Do not** create or stage `joab` in this scene (see Resolved
  design calls), and do not invent named Jebusites.
- **ESV excerpt budget (`2sam-5`, a fresh passage, shared with
  `rephaim-valley`):** the ≤3-quote handful is split explicitly — **this scene
  spends at most two** (recommended: 5:6b's taunt, and the _tsinnôr_ clause of
  5:8a, whose ESV rendering is itself part of what the scene is about), and
  **one is reserved for `rephaim-valley`** (5:24's sound in the tops of the
  balsam trees, which that scene cannot do without). Verify exact ESV wording at
  build time via the WebSearch snippet cross-corroboration pattern that closed
  queue #20(e) — direct fetches to Bible-text sites are still sandbox-blocked,
  and #19(b) proved recalled wording is not reliable.

## Placeholder policy

- **Allowed placeholders:** the enclosure's plan, extent, and wall course; the
  gateway's form (modest only); terrace geometry and extent; the spring outflow's
  form and dimensions; house and construction forms; the approach road's course;
  lighting hour; all figure counts and positions; vegetation distribution; the
  ridge landform's exact profile (a disclosed approximation, not a survey).
- **Not allowed:** any water-shaft, tunnel, conduit, or infiltration geometry or
  animation, in any mode, including as an unlabeled terrain feature; Warren's
  Shaft or any named excavated water feature rendered as a scene element; any
  assault choreography, scaling, breaching, or siege equipment (siege technology
  for this period and polity is unattested and would be pure invention);
  labeling any rendered element "the Millo," or rendering any structure as an
  identified excavated building (including any structure proposed as David's
  palace); a monumental or six-chamber gate, casemate circuit, glacis, or
  towers without a citation; a finished cedar palace or any 9th–8th-century
  royal-architecture vocabulary; monumental spring fortifications; figures
  enacting the blind-and-lame taunt in any way; Joab staged at the capture;
  invented Phoenician/Tyrian dress or iconography; Hiram staged in person; any
  Hebron geometry (5:1–5 is cards, per queue #21); any depiction of death,
  wounding, or bodies anywhere in this scene; any 2 Samuel 6+ content — ark,
  tent, oracle, Bathsheba, temple — depicted, foreshadowed, or glossed, including
  on the names in 5:14; any assertion that these events precede or follow
  `rephaim-valley`'s campaigns.
