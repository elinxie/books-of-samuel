# Scene brief — the capture of Jerusalem and the Philistine battles (`jerusalem-stronghold`, M6)

**PROVISIONAL — Sonnet scope pass under the `docs/model-handoff.md` Fable-unavailable
fallback (2026-08-13; Fable hit its monthly spend limit mid-attempt on this exact
task — see `docs/fable-review-queue.md`). Needs a real Fable confirmation before
any scene built from this brief can leave `in-progress`, and specifically before
any of this brief's contested-archaeology calls (below) are treated as settled.**
Implementation: Sonnet/`threejs-engineer` within this direction; deviations that
change historical meaning go back through `docs/fable-review-queue.md`. Second
and last scene proposed for Milestone 6, the milestone's load-bearing one — this
is the project's first scene at Jerusalem, a site every future milestone from
here on will build on top of.

Scope guard: this brief covers **2 Samuel 5:6–25 in full** — the capture of the
Jebusite stronghold (5:6–10), Hiram's alliance and house-building (5:11–12,
folded as a card, not a staged beat — see below), the family list (5:13–16,
closing card only), and the two Philistine battles at Baal-perazim and the
Valley of Rephaim (5:17–25, folded as narrated beats — see below). **Nothing
from 2 Samuel 6 onward (the ark's procession into Jerusalem) may appear,
depicted or foreshadowed** — this is the standing discipline every M3–M5 brief
has held (compare `hebron-reckoning-brief.md`'s bar on 2 Sam 5+ content). The
milestone, and the project's Jerusalem content, ends where 5:25 ends: the
Philistines driven back, the city taken, nothing more asserted.

## Historical intent

The observer should come away understanding, honestly, that this is the single
most historically and archaeologically contested site the project has built:

1. **The capture itself is a compact, almost cryptic narrative** (5:6–9): the
   Jebusites' taunt ("the blind and the lame will turn you back"), David's
   captured stronghold becoming "the city of David," the obscure reference to
   the "water shaft" (_tsinnor_, 5:8) by which Joab (per the parallel in
   1 Chronicles 11:6, not itself quoted here) reportedly gained entry, and the
   building "from the Millo inward" (5:9). Nearly every specific noun in this
   passage — the taunt's real meaning, the tsinnor's identity/function, the
   Millo's nature — is genuinely disputed among scholars, not merely
   under-researched. The scene must carry that dispute honestly rather than
   resolve it visually.
2. **The archaeology of "David's Jerusalem" is a live, high-profile scholarly
   fight, not settled background.** The City of David ridge (south of the
   later Temple Mount, above the Gihon spring) is the accepted general
   location; beyond that, almost nothing is uncontested. Eilat Mazar's
   excavated "Large Stone Structure" has been proposed as David's palace or
   an associated administrative building; other archaeologists (prominently
   Israel Finkelstein and colleagues) read the same stratigraphy differently —
   different date ranges, different functional identifications, and a
   broader "low chronology"/minimalist position questioning whether an Iron
   IIA Jerusalem was populous or built-up enough to be a credible kingdom
   capital at all in David's generation, versus a modest highland stronghold
   that grew into a real capital later, under Solomon or after. This scene
   must not resolve that dispute by rendering a confident monumental palace,
   and must not resolve it the other way by omitting a city entirely — the
   textual claim (David took a stronghold and built there) stays
   `biblical-text`/high; anything about its architectural form or scale is
   `scholarlyViews`/`design-placeholder`, exactly like `claim-hebron-town-form`
   and `claim-david-historical` already model for exactly this kind of
   dispute elsewhere in the project.
3. **Everything after the capture (5:11–25) is genuinely thin, list-like
   textual material — not scene-scale action**, and should be carried as
   narrated cards within this scene rather than invented into staged
   spectacle. This mirrors the M4 precedent of folding 2:8–11's thin
   installation narrative into a context card rather than building a
   standalone scene for it.

## Resolved design calls (this pass — PROVISIONAL, flag for Fable confirmation)

- **A new `TerrainSpec`/regional palette is required — Jerusalem is not
  Hebron.** The City of David ridge is a narrow spur bounded by the Kidron
  Valley (east) and the Tyropoeon/Central Valley (west), near the Gihon
  spring. Render this narrow-ridge/steep-valley topography honestly rather
  than reusing any prior scene's massing; this is new ground work for
  `threejs-engineer`, flagged here rather than solved (visual composition
  detail below is a starting point, not a final spec).
- **The stronghold/city is rendered as a modest, disclosed placeholder
  settlement on the ridge — not a monumental palace, not an empty hilltop.**
  Follow the same discipline as `claim-hebron-town-form`: a small Iron Age
  highland settlement footprint, honestly thin, explicitly not asserting a
  specific building (no "Large Stone Structure" geometry rendered as
  confirmed fact). If a future researcher/Fable pass wants to render a
  specific proposed structure, it must be labeled `scholarlyViews` with named
  proponents on both sides, never silently adopted as the default render.
- **The "blind and the lame" taunt (5:6, 5:8b) is carried as text/dialogue
  only, never visualized as mockery pageantry.** This is disability-mocking
  speech in the source text; the project's existing discipline for harsh
  speech (David's curse on Joab, `hebron-gate`) is to state it plainly in
  caption and never stage it as spectacle — apply that here without
  exception. Do not render disabled defenders as a taunt prop or a visual
  gag under any circumstances, in any mode.
- **The water-shaft (_tsinnor_) detail is caption-only, `scholarlyViews`
  hedged, never staged as an infiltration sequence.** Whether it identifies
  with the excavated "Warren's Shaft" is genuinely disputed (some scholars
  doubt Warren's Shaft was usable/known in this period at all); do not stage
  a sneak-through-the-shaft action beat as if the identification were settled
  — narrate it as the text's own claim, flag both readings.
- **The capture itself (the actual taking of the stronghold) is narrated by
  card, not staged as combat.** The text gives no siege/battle detail to
  stage (unlike Gilboa or Gibeon-pool, there is no described clash) — inventing
  one would be exactly the kind of unsourced action the project's discipline
  forbids. This keeps the scene's violence content, if any, confined to the
  two later Philistine battles (below), and even those stay abstracted per
  ADR-009's standing defaults, not a new large combat set-piece.
- **Hiram's alliance (5:11–12) is a card, not a staged embassy beat.** Two
  verses, no scene-scale action described (messengers, cedar, craftsmen sent
  — a diplomatic/trade notice, not a described meeting). Render as a closing
  card within this scene, cross-referencing that Phoenician material culture
  is outside this project's current source base — flag for a researcher pass
  rather than inventing Phoenician architecture/craft detail.
- **The family list (5:13–16) is a closing card, no geometry** — a list of
  names and a summary statement (more concubines and wives, more sons and
  daughters born at Jerusalem), no invented visualization of a household
  scene. Mirrors how `hebron-reckoning` carried the Mephibosheth parenthesis
  (4:4) as a card exactly where the text places it.
- **The two Philistine battles (5:17–25) are narrated beats, not a staged
  combat set-piece.** Baal-perazim's precise location is not confidently
  identified by this project (flagged for a researcher pass — some
  identifications place it near the Valley of Rephaim southwest of
  Jerusalem, but this is not yet checked here); the Valley of Rephaim itself
  is more confidently located in that same general area but still not a
  site this project has verified to the standard `gilboa-battle`/`gibeon-pool`
  needed before staging real geometry there. Per the project's standing rule
  for unconfident/unbuilt geography (Mahanaim, held narrated-only across
  M4–M5), **do not build battlefield geometry for either engagement.** Render
  both as narrated cards from an in-city or approach vantage (the observer
  hears/learns of the victories rather than walking the battlefield),
  preserving the textually vivid details (the "sound of marching in the tops
  of the balsam trees" sign, 5:24; the burning of the Philistines' abandoned
  idols, 5:21) as caption text. This is the single biggest scope-reduction
  call in this brief and the one most likely to be revisited by a real Fable
  pass — flagged explicitly for that review.

## Visual composition

- **Terrain:** narrow ridge spur, steep valleys east/west, spring at the
  ridge's northern/lower end (Gihon) — new `TerrainSpec`, not detailed
  further here; `threejs-engineer` should treat this as its own
  world-director-adjacent design problem at build time given how new the
  ground is, and flag anything that needs a second design pass.
- **Focal masses:** (a) the ridge settlement itself, modest and disclosed;
  (b) the spring/water-shaft area, held at documentary distance, no
  infiltration staging; (c) a David's-building vantage for the closing "from
  the Millo inward" card.
- **Sightlines:** should read as a small, defensible highland stronghold
  becoming a working capital — not a monumental establishing shot. Avoid any
  triumphal/epic framing that would read as adjudicating the archaeology
  dispute in the maximalist direction.
- **Lighting:** no text-fixed time cues; a straightforward daytime default,
  disclosed as design choice.

## Scale assumptions

- **Principals:** David, Joab (referenced per the Chronicles cross-reference
  for the water-shaft detail — his role is not stated in 2 Samuel's own
  text of 5:6–9, only in 1 Chronicles 11:6; caption should disclose this
  cross-book sourcing honestly rather than silently importing Chronicles'
  detail as if 2 Samuel stated it).
- **Ambient stronghold population: modest, disclosed design count** —
  recommend the lower end of prior settlement scenes (`hebron-anointing`'s
  town-background register, not its full assembly scale) since this is a
  newly-taken, still-small stronghold, not yet a populous capital. A
  `claim-jerusalem-cast-scale` (design-placeholder) should state this
  explicitly.
- **No combat crowd** — the battles are cards, not staged engagements, per
  the Resolved design calls above.

## Camera / observer experience

- **Default viewpoint:** the ridge settlement, overlooking the spring/valley
  system.
- Additional viewpoints: a Millo/building-vantage for the closing beats; a
  spring-area viewpoint held at documentary distance (no shaft-interior
  staging).
- **Timeline beats** (`depictsDeath: false` — no staged killing anywhere in
  this scene, only narrated battle outcomes; suggested duration ~90–120s):

  | Beat             | Text      | Content                                                                                                                                                                                        |
  | ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-taunt`        | 5:6, 5:8b | Card/dialogue: the Jebusites' taunt, stated as text, never staged as mockery pageantry.                                                                                                        |
  | `b-capture`      | 5:7, 5:9  | Card: the stronghold taken, renamed the city of David, building "from the Millo inward" — no siege geometry.                                                                                   |
  | `b-tsinnor`      | 5:8a      | Card, `scholarlyViews` hedged: the water-shaft detail, Joab's role per the Chronicles cross-reference disclosed as such.                                                                       |
  | `b-hiram`        | 5:11–12   | Card: Hiram's alliance, cedar and craftsmen, David's own recognition his kingdom was established.                                                                                              |
  | `b-household`    | 5:13–16   | Closing-style card: the family list, stated as the text states it, no staging.                                                                                                                 |
  | `b-baal-perazim` | 5:17–21   | Narrated card: the first Philistine engagement, the "burst forth like a bursting flood" language, the burned idols — no battlefield geometry.                                                  |
  | `b-rephaim`      | 5:22–25   | Narrated card: the second engagement, the balsam-tree marching sign, driven back to Gezer — no battlefield geometry.                                                                           |
  | `b-close`        | —         | Closing card for the milestone: Jerusalem now David's seat over a united Israel and Judah, per 5:5's own summary. No 2 Sam 6+ pointer of any kind (the ark's move is explicitly out of scope). |

## Performance target

- No combat crowd, no procession choreography — this scene's cost should sit
  well under `hebron-gate`'s (the milestone's most expensive M5 scene) by
  construction. New terrain work is the main open cost question; flag for a
  `performance-reviewer` pass once built, same as every prior milestone.

## Required source basis (before geometry is built) — flagged gaps for a researcher pass

- **New, narrated (basis `biblical-text`):** `claim-jerusalem-capture`
  (5:6–10, the capture/renaming/building, with the taunt and tsinnor detail
  hedged as above); `claim-hiram-alliance` (5:11–12); `claim-david-household-jerusalem`
  (5:13–16); `claim-philistine-battles-post-capture` (5:17–25, both
  engagements, narrated-only per the Resolved design calls).
- **New, design (basis `design-placeholder`):** `claim-jerusalem-stronghold-form`
  (the settlement's physical form — explicitly the highest-stakes
  design-placeholder claim in the project so far, given the scale of scholarly
  dispute; needs `scholarlyViews` with named proponents on the
  maximalist/minimalist question, not just a single hedge); `claim-jerusalem-cast-scale`.
- **FLAGGED FOR RESEARCHER PASS — this brief is Sonnet-authored under the
  Fable-unavailable fallback with no source-verification tools used, and this
  scene carries more open citation need than any prior scene:**
  - Named, checkable treatments of the Large Stone Structure/Stepped Stone
    Structure debate (Eilat Mazar's excavation reports and publications on
    one side; Israel Finkelstein and colleagues' stratigraphic
    re-readings/critiques on the other) — this is the single most important
    citation gap in the whole milestone.
  - Warren's Shaft's identification (or non-identification) with the 5:8
    tsinnor — named scholarly discussion of both the "it's not even the
    right shaft/period" skeptical position and any defenses of the
    identification.
  - The Millo's identification (commonly associated with the Stepped Stone
    Structure or a terracing/infill system) — needs a named citable source
    before any specific claim beyond "the text names a building project."
  - Any citable identification (even a disputed one, on the model of the
    project's existing 3-candidate Ziklag treatment) for Baal-perazim and/or
    a firmer citation for the Valley of Rephaim's location.
  - Phoenician/Tyrian material culture for the Hiram alliance card (cedar
    trade, craftsmen exchange) — currently outside the project's source base
    entirely.

## Placeholder policy

- **Allowed placeholders:** stronghold form/scale (heavily disclosed,
  `scholarlyViews`-hedged); ambient population count; terrain massing detail
  beyond the ridge/valley topography itself; lighting.
- **Not allowed:** any specific named archaeological structure (Large Stone
  Structure, Stepped Stone Structure, a "David's palace") rendered as
  confirmed fact; any siege/infiltration/shaft-interior staged action; any
  battlefield geometry for either Philistine engagement; taunt-as-spectacle
  staging of any kind, in any mode; silently importing 1 Chronicles detail
  into 2 Samuel's own claim text without disclosing the cross-book source;
  any 2 Samuel 6+ content, depicted, foreshadowed, or teased.
