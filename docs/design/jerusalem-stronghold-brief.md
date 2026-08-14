# Scene brief — The stronghold of Zion and the city of David (`jerusalem-stronghold`, M6)

World-director pass, Fable, 2026-08-14. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second scene of Milestone 6 and its load-bearing
one — the project's first wholly new major site since M3, and the site every
milestone after this one will be built on. Build it second, after
`hebron-all-israel` has re-established the continuity pattern, and treat its
geometry as infrastructure, not as one scene's set.

Scope guard: this brief covers **2 Samuel 5:6–16** — the approach to Jerusalem,
the Jebusite taunt, David's word about the tsinnor, the taking of the stronghold
of Zion, the naming of the city of David, the building from the Millo inward,
Hiram of Tyre's embassy and the house it built, the narrative's own assessment
at 5:12, and the list of the children born in Jerusalem. The all-Israel
anointing at Hebron (5:1–5) is `hebron-all-israel`; the Philistine campaigns
(5:17–25) are `rephaim-valley`. **Nothing from 2 Samuel 6 onward may appear,
depicted or foreshadowed** — no ark, no tent, no threshing floor, no temple, no
Temple Mount, no northern hill development of any kind, and no forward pointer
to Solomon, Bathsheba, or the temple. The closing card may point to
`rephaim-valley` only.

## Historical intent

The observer should come away understanding four things:

1. **This is a capture the text does not narrate.** 5:6–9 gives a taunt, a
   cryptic instruction, and a result — "David took the stronghold of Zion, that
   is, the city of David." There is no assault, no siege, no casualty, no
   duration, no method, and no named participant. The scene's central discipline
   is to **leave that gap open and make the gap itself legible**, rather than
   filling it with the assault every illustrated Bible has invented. This is the
   clearest test the project has yet faced of the no-invented-method restraint
   that ADR-009 ratified at the M5 sign-off over `hebron-reckoning`'s 4:12a, and
   it should be built as the flagship application of that restraint, not as an
   awkward omission.
2. **Jerusalem is chosen, and its geography is the argument.** The town sits on
   a narrow spur between two valleys, above a single spring, on the seam between
   Judah and Benjamin — not any tribe's own town, taken by "the king and his
   men" (5:6, David's personal following, the group the observer has walked
   with since Ziklag) and held as his personal holding, "the city of David." A
   king just made king over two constituencies at Hebron takes a capital that
   belongs to neither. Compose the landform so an observer can read that
   without being told it.
3. **Here the archaeology is abundant and violently contested — the exact
   inverse of Hebron.** At Tell Rumeida the project's problem was a vacuum
   (queue #19c: checked, permanently thin). On the southeastern ridge the
   problem is that a great deal has been excavated and almost nothing about its
   10th-century interpretation commands agreement. The scene must therefore be
   careful in the opposite direction: not "we have nothing, so we disclose a
   placeholder," but "we have a great deal and must not portray any one
   excavator's reading as the site." **Nothing in this scene may be a portrait
   of a specific excavated structure.**
4. **Hiram's cedar is the project's first foreign-relations beat — and a
   chronological problem.** A Tyrian king sending timber and craftsmen is the
   text's own marker that David's position is now recognized abroad. It is also
   the chapter's hardest chronological crux, and the scene must carry it as a
   crux rather than quietly dating it.

## Resolved design calls (this pass)

- **The tsinnor (5:8) is not staged. At all.** No water shaft, no vertical
  shaft, no tunnel, no channel interior, no climbing figures, no entry route of
  any kind renders in any mode. Two independent reasons, both sufficient:
  (i) the Hebrew term is rare and its meaning genuinely unsettled — "water
  shaft," "watercourse/gutter," "hook/grappling instrument," and a
  comparative-Semitic "windpipe/throat" reading have all been proposed, and the
  clause's syntax is difficult on any of them; (ii) the popular identification
  of the entry route with **Warren's Shaft** — the vertical shaft in the eastern
  slope, known since Warren's 19th-century survey — has been substantially
  undercut by the later excavations at the Gihon (Reich and Shukron), which
  argued the shaft was not a functioning water-access route in the relevant
  period. Staging any route would pick a winner in a live philological **and**
  archaeological dispute simultaneously. Carry both disputes as `scholarlyViews`
  on the capture claim, and let a caption say plainly that the text's own
  account is elliptical and the project declines to invent one. **This is the
  milestone's most important single call — do not soften it into "a suggestion
  of a shaft."**
- **The capture renders as approach → taunt → held gap → aftermath.** Staged:
  the king and his men arriving before the spur; the taunt delivered from the
  wall at documentary distance; then a held card on the stronghold itself,
  stating what the text states and what it does not; then the aftermath, David
  in possession, the place named. No breach, no ladders, no ram, no fire, no
  bodies, no fighting, no wounded, no captives.
- **`depictsDeath: false`.** The text narrates no death and no casualty in
  5:6–16, and the scene depicts none. Do not set this flag `true` by reflex
  because the chapter contains the word "strike" — the ADR-009 advisory is
  driven by what is depicted, and this scene depicts nothing that triggers it.
  (`rephaim-valley` carries M6's ADR-009 load.)
- **"The blind and the lame" is caption-only, with no staged figures.** 5:6's
  taunt and 5:8's proverb are both textually and interpretively contested
  (a boast about the walls' strength; an invocation of oath-tokens or cult
  objects; a proverb the narrative reports etiologically), and the verse has an
  ugly reception history when read as a statement about disabled people. Carry
  the readings as `scholarlyViews`; report 5:8b as the narrative's own
  etiological notice, attributed to the narrative; **do not stage disabled
  figures on the walls or anywhere else**, and do not let any caption adopt the
  taunt or the proverb in the project's own voice.
- **1 Chronicles 11:6 is a note, not a scene.** The Chronicles parallel adds
  that whoever struck first would be chief, and that Joab went up first and
  became chief. That is a divergent parallel account; carry it once in a claim
  `note` as a cross-canonical divergence (the `claim-burning-bodies` /
  1 Chr 10:12 precedent), and **do not stage Joab climbing, entering, or
  striking anything.**
- **The stronghold renders as a modest fortified spur settlement — never a
  palace, never a portrait.** The southeastern ridge above the Gihon is where
  the pre-Davidic town was, and that much is broadly accepted. What belongs to
  the 10th century is not: the **Stepped Stone Structure** and the **Large Stone
  Structure** (published by Eilat Mazar as a Davidic palace) have been
  challenged on dating and on whether they are even one building (Finkelstein,
  Herzog, Ussishkin, and Singer-Avitz among the critics), against a longer
  excavation history including Kenyon and Shiloh. Render: a compact walled
  settlement on the spur with terraced substructure supporting building
  platforms on the steep eastern flank — the terracing being the element whose
  general existence is least disputed. Claim it `design-placeholder`, state in
  the claim and in an on-screen caption that it is **not** a reconstruction of
  the Large Stone Structure, the Stepped Stone Structure, or any excavated
  building, and carry the dating dispute as `scholarlyViews`. **No palace, no
  throne room, no monumental gate, no courtyard complex.**
- **The Millo is the text's own word and stays at that level.** 5:9's "he built
  the city all around from the Millo inward" is rendered as terraced fill and
  retaining/support works on the slope — i.e. as what the Hebrew term most
  plausibly denotes (a filling) — with the common scholarly identification of
  the Millo with the Stepped Stone Structure carried as **one view among
  others**, not adopted. Do not label any geometry "the Millo" as an excavated
  identification.
- **The Gihon spring renders; its fortifications are conditional.** The spring
  is the reason the site exists and should be visible in the composition (flat
  water plane, no shader — the `gibeon-pool` convention). The massive Middle
  Bronze fortifications excavated around the spring (Reich and Shukron's
  "Spring Tower" / "Pool Tower") are, on their published dating, centuries
  older than this scene and could plausibly have still been standing — which
  would make them **better evidenced than any Iron Age wall the project could
  invent here**. This is a genuinely attractive rendering direction and it is
  therefore conditionally approved: render the reused earlier fortification
  mass **only if the researcher pass lands a citable source for its dating and
  its standing state**, disclosed in the claim as reused earlier construction
  and explicitly **not** as Davidic building. If the citation does not land,
  render generic disclosed defenses instead and say so. Do not ship the
  reused-MB-fortification reading on this brief's assertion alone — it is
  flagged `TO VERIFY`.
- **Hiram (5:11) is staged minimally and never dated.** Stage a Tyrian party
  arriving with cedar timber, and carpenters and masons at work on a house
  under construction. Do not date the embassy, do not name a regnal year, and do
  not assert simultaneity with any particular Tyrian king's reign. The
  chronological crux — a Hiram of Tyre is conventionally placed largely in
  Solomon's reign rather than David's — gets `scholarlyViews` carrying at least:
  (i) the notice as a summary or anticipatory placement positioned thematically
  rather than chronologically, (ii) an earlier or longer Tyrian reign than the
  conventional reconstruction allows, and (iii) the notice as a later
  retrojection reflecting Solomonic-era relations. Attributions stay hedged
  ("e.g., scholars following...") until a researcher pass attaches names.
- **The house is timber-and-stone and modest.** Cedar beams, a stone
  substructure, a rectangular plan. **No fine ashlar masonry, no dressed
  header-and-stretcher courses, no proto-Aeolic/palmette capitals** — those are
  later Iron II forms and would be the milestone's worst anachronism, made
  worse by being the kind of thing a "Phoenician builders" prompt naturally
  produces. `design-placeholder`, disclosed.
- **5:13–16 is card-only.** The wives, concubines, and the sons born at
  Jerusalem are listed as the text lists them, with **no forward commentary of
  any kind** — not on Solomon, not on Bathsheba, not on the succession. This is
  the `hebron-covenant` `b-long-war` precedent (the sons born at Hebron listed
  without forward commentary on Amnon or Absalom) and it is a hard rule.
- **5:12 is attributed to the narrative.** "David knew that the LORD had
  established him king over Israel, and that he had exalted his kingdom for the
  sake of his people Israel" is the narrative's own theological assessment.
  Carry it phrased as the narrative's, per the narrated-vs-corroborated rule and
  the commentary policy — the project does not assert it and does not comment on
  it.
- **The Jebusites get no invented ethnic markers.** Extra-biblical evidence for
  a distinct "Jebusite" material culture is not something the project can cite;
  render the town's inhabitants in the same shared regional dress as everyone
  else (`claim-dress`), exactly as `gibeon-pool` refused invented side uniforms.
  No Jebusite cult imagery, no distinctive architecture asserted as Jebusite.

## Visual composition

- **Terrain:** a narrow spur descending southward between two valleys, with a
  spring on its eastern flank and higher ground to the north. **Reuse the
  Judean-highland palette** established by `hebron-anointing` — Jerusalem is in
  the same hill country, and this is a new landform, not a new region. That
  reuse is a real saving and it is also the historically correct call; do not
  introduce a sixth regional palette. The landform itself is new and is the
  scene's main terrain work (ADR-005: a ridge/spur with flanking channels,
  composed from existing feature primitives if they suffice; a new primitive is
  acceptable if they do not, but it needs its own justification in the ADR-005
  sense, not a silent addition).
- **Focal masses:** (a) **the spur and its stronghold** — compact, walled,
  terraced on the eastern flank, the scene's subject; (b) **the two valleys**,
  which are what make the site defensible and must read as such from the
  default vantage; (c) **the spring and its approach** on the eastern slope;
  (d) **the house works** — the Hiram beat's timber, stone, and scaffolding, on
  a level terrace within the settlement; (e) **David's following**, arriving in
  the first beats and in possession in the later ones.
- **Sightlines:** the default vantage looks north up the spur from the valley
  junction to the south, so that the settlement, both valleys, and the higher
  ground beyond all read in one frame — the whole reason the site was worth
  taking. A second vantage on the eastern slope holds the spring and the
  terracing. **The northern higher ground stays empty** in every frame: nothing
  built, nothing marked, no platform, no foundation, no hint. That emptiness is
  a deliberate, load-bearing scope guard, and it should be explicitly checked at
  review.
- **Lighting:** daytime, hour unstated, disclosed `design-placeholder`. Flat,
  documentary light for the taunt and the held gap — **resist entirely** the
  siege-drama lighting vocabulary (storm light, dusk assault, torchlight). The
  house-works beat may sit later in the day for legibility of the timber, but
  the shift must not read as narrative climax.

## Scale assumptions

The chapter gives **no number of any kind** in 5:6–16 except the children's
names. Every count here is a disclosed design choice.

- **David's following ("the king and his men," 5:6):** the established ~600 at
  the project's standard ~1:10 narrated ratio → **≈ 60 figures**
  (`claim-600-men` reused by reference, not duplicated).
- **The town's inhabitants:** **≈ 30–50 figures**, mostly on and behind the
  wall in the early beats and dispersing into ordinary town activity in the
  later ones. The text says nothing about what became of them; the staging must
  not imply either massacre or expulsion, and must not imply continuity of
  population either. Ordinary presence, no narrative asserted.
- **The Tyrian party:** **≈ 15–25 figures** (messengers, carpenters, masons).
- **Construction workers on the house and the terracing:** **≈ 20–30**.
- **High-tier total ≈ 130–180 figures** — smaller than `hebron-all-israel` and
  far below `gilboa-battle`. **This scene's cost driver is static geometry, not
  crowd**, which makes it the first of its kind in the project and the reason
  its performance target below is framed differently from every prior scene's.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-junction`): south of the spur at the
  valleys' junction, looking north — landform, settlement, and the whole
  strategic argument in one frame.
- Additional viewpoints: **the eastern slope and spring** (`vp-spring`, holding
  the Gihon, the terracing, and the slope's steepness — the frame that makes
  the tsinnor question legible **without answering it**); **inside the taken
  stronghold** (`vp-stronghold`, walk emphasis, the aftermath beats and the
  ordinary life of a small fortified town); **the house works**
  (`vp-house-works`, the Hiram beat, close enough to read timber and stone as
  materials).
- Walk mode should let the observer climb from the spring up the eastern
  terracing into the settlement — the site's real geography, and a better
  teacher about why the place was hard to take than any staged assault would be.
  This is a strong ADR-011 guided-path candidate; keep it optional.
- **Timeline beats** (`depictsDeath: false`; suggested duration ~190s):

  | Beat              | Text    | Treatment                                                                                                                                                                                                                                        |
  | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | `b-approach`      | 5:6a    | Staged: the king and his men come to Jerusalem; the spur, the valleys, and the walled town read from the default vantage. No siege apparatus of any kind.                                                                                        |
  | `b-taunt`         | 5:6b    | Staged at documentary distance: the taunt from the wall. Caption carries the text's words and both readings of them; **no disabled figures staged**, nothing adopted in the project's voice.                                                     |
  | `b-instruction`   | 5:8     | **Card only.** David's word about the tsinnor, the term's contested meaning, and the Warren's-Shaft dispute — stated plainly, with the project's refusal to stage a route stated on-screen as a method note. **Nothing is staged in this beat.** |
  | `b-taken`         | 5:7     | The held gap: a still frame on the stronghold while the card states that David took it, and that the narrative supplies no account of how. The scene's thesis beat; hold it, do not rush it.                                                     |
  | `b-city-of-david` | 5:9     | Staged: David in possession; the place named the city of David; building from the Millo inward — terracing and retaining works read as works in progress. Caption states the Millo's contested identification without adopting one.              |
  | `b-hiram`         | 5:11    | Staged: the Tyrian party arrives with cedar; carpenters and masons at work; the house rising. Caption carries the chronological crux as a crux. **No fine ashlar, no capitals, no dating.**                                                      |
  | `b-established`   | 5:12    | Card/caption: the narrative's own assessment that the LORD had established him and exalted his kingdom — attributed to the narrative, not asserted, not commented on.                                                                            |
  | `b-household`     | 5:13–16 | Card only: the wives and concubines taken at Jerusalem and the children born there, listed as the text lists them. **No forward commentary on any name — none on Solomon, none on Bathsheba, none on the succession.**                           |
  | `b-close`         | —       | Closing card: forward pointer to `rephaim-valley` only, stated as a pointer. **No 2 Samuel 6+ content, no ark, no temple, no Solomon.**                                                                                                          |

## Performance target

- ≈ 130–180 high-tier figures — modest, and not the constraint. **Budget this
  scene by geometry and draw calls, not by figure count.** The terraced spur,
  the wall circuit, the settlement structures, the retaining works, and the
  house-under-construction are the cost, and they are mostly static.
- One `InstancedMesh` per repeated family: terrace/retaining-wall segment,
  town structure, wall segment, timber member, scaffold element, figure. The
  terracing will be the largest instanced family the project has built —
  benchmark it first, before the rest of the settlement lands, and shape the
  rest of the build around that measurement.
- Reuse the Judean-highland terrain palette, `asset-terrace-walls`,
  `asset-olive-tree`, `asset-rocks`, `asset-figure-procedural`. New asset
  families: the spur terrain, the stronghold/settlement form, the spring, the
  timber/house works, and (conditionally) the reused earlier fortification mass.
- The spring is a flat water plane, no shader (`gibeon-pool` convention). No
  fire, no new real-time lights.
- **Run `performance-reviewer` twice on this scene** — once after the terrain
  and terracing land, once after the full settlement does. This is the only M6
  scene where a perf pass is a real gate rather than a formality, and it is
  worth doing early because every later milestone inherits this geometry.

## Required source basis (before geometry is built)

- **New location, `jerusalem`** (`src/data/locations.ts`, created at build
  time): name Jerusalem, altNames including "City of David" and "the stronghold
  of Zion," region "Central highlands, Judah/Benjamin seam,"
  `identification.disputed: false` (the southeastern ridge above the Gihon is
  the standard identification of the pre-Davidic town), high-confidence
  coordinates. The disputes at this site are about **dating and interpretation
  of what is excavated**, not about where the town was — keep that distinction
  clean: the location record is not disputed; the claims about its 10th-century
  form are.
- **Existing, reuse:** `claim-dress`, `claim-600-men` (by reference),
  `claim-david-historical` (**mandatory** cross-reference — the kingdom-scale
  dispute bears directly on how this capital is read), `claim-chronology`
  (`periodId: 'iron-iia'`), `claim-all-israel-anointing` (from
  `hebron-all-israel`, as the political fact this capture follows).
- **New, narrated (basis `biblical-text`):** `claim-jerusalem-capture` (5:6–9 —
  **the milestone's most important claim**; statement says what the text says
  and explicitly records what it does not say; `scholarlyViews` carrying at
  minimum (i) the tsinnor's contested meaning across the proposed renderings,
  (ii) the Warren's-Shaft entry theory and its later archaeological challenge,
  and (iii) the readings of "the blind and the lame" — hedged attributions until
  the researcher pass lands names; `notes` record the 1 Chr 11:6 divergence and
  the project's explicit refusal to stage a method, citing the ADR-009
  no-invented-method restraint); `claim-city-of-david-naming` (5:9 — the naming
  and the building from the Millo inward); `claim-hiram-embassy` (5:11 —
  timber, craftsmen, and the house; `scholarlyViews` on the chronological crux
  as above); `claim-jerusalem-household` (5:13–16 — card-only; `notes` state the
  no-forward-commentary rule explicitly so a later editor does not "improve"
  it).
- **New, design (basis `design-placeholder`):** `claim-jerusalem-stronghold-form`
  (the spur settlement, wall, and terracing; must state in both `statement` and
  `notes` that it is not a reconstruction of the Large Stone Structure, the
  Stepped Stone Structure, or any excavated building, and must carry the
  10th-century dating dispute as `scholarlyViews`); `claim-millo-form` (the
  terraced fill/support works, with the Millo-as-Stepped-Stone-Structure
  identification as one view, not adopted); `claim-davids-house-form` (the
  timber-and-stone house; explicitly excludes ashlar and proto-Aeolic forms as
  later Iron II); `claim-jerusalem-cast-scale` (the disclosed counts above).
  `claim-gihon-fortification-reuse` is created **only if** the researcher pass
  below lands its citation — otherwise the defenses fold into
  `claim-jerusalem-stronghold-form` as generic disclosed placeholder.
- **Characters:** reuse `david`, `davids-band`, `joab` (referenced-only in the
  1 Chr 11:6 note — **not staged**). New light entries: `jebusites` (kind
  `group`), `hiram-of-tyre` (kind `person`, referenced-only — the text does not
  place him at Jerusalem; only his messengers come).
- **ESV excerpt budget:** one quote from this scene's share of `2sam-5`'s
  three (see `hebron-all-israel-brief.md` for the allocation). 5:6b's taunt or
  5:12's assessment are the candidates; the taunt is the stronger choice because
  its exact wording is doing interpretive work. **Live-verify wording via the
  `WebSearch` pattern at build time** (queue #20(e)).
- **Researcher gaps — the largest bibliographic gap in the project to date.**
  `sources/source-cards/` currently contains **no card touching Jerusalem at
  all.** A `researcher` pass must add cards covering: the City of David
  excavation history (Kenyon; Shiloh; Reich and Shukron; E. Mazar's Large Stone
  Structure publications) **and** the published critique of the Davidic-palace
  identification (Finkelstein, Herzog, Ussishkin, Singer-Avitz); the Warren's
  Shaft question and the Gihon fortifications' dating; the tsinnor philology;
  and Tyrian/Phoenician chronology for 5:11. Named scholars are given here at
  the level of "this is the literature a researcher pass should verify" — **no
  page numbers, venues, or dates are asserted by this brief**, and none may be
  invented at build time. Until cards land, every affected claim stays hedged.
  None of this blocks the build; all of it gates `released`.

## Placeholder policy

- **Allowed placeholders:** the spur settlement's footprint, wall line, and
  structure forms (disclosed, non-portrait); the terracing's extent and
  construction; the Millo works; the house's plan and construction state; the
  spring's basin form; the Tyrian party's composition and goods; the town
  population's ordinary activity; lighting hour; the exact valley profiles.
- **Not allowed:** any depicted assault, breach, siege apparatus, casualty,
  body, or captive; any water shaft, vertical shaft, tunnel, channel interior,
  climbing figure, or entry route of any kind, in any mode, however
  "suggestive"; any staged disabled figures, or adoption of 5:6/5:8's language
  in the project's voice; staging Joab (or anyone) as first up the wall; any
  palace, throne room, monumental gate, or courtyard complex; any geometry
  presented as the Large Stone Structure, the Stepped Stone Structure, or a
  named excavated building; labeling any geometry "the Millo" as an established
  identification; fine ashlar masonry, dressed header-and-stretcher courses, or
  proto-Aeolic/palmette capitals; dating Hiram's embassy or asserting
  simultaneity with a named Tyrian reign; the reused-Middle-Bronze-fortification
  rendering shipping without its citation; invented Jebusite dress, cult
  imagery, or ethnically marked architecture; implying either a massacre or an
  expulsion of the town's population; **any construction, platform, marking, or
  hint on the higher ground north of the spur**; any ark, tent, threshing floor,
  temple, or Temple Mount content; any forward commentary on Solomon,
  Bathsheba, or the succession attached to the 5:13–16 name list; any
  2 Samuel 5:17+ content beyond the closing pointer; any 2 Samuel 6+ or 1 Kings
  content in any form, depicted or foreshadowed.
