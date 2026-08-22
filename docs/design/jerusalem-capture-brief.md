# Scene brief — the Jebusite stronghold taken, the City of David (`jerusalem-capture`, M6)

**Scope pass: Sonnet, 2026-08-22 — PROVISIONAL, not yet Fable-reviewed.** Same
fallback circumstance as the sibling brief `hebron-all-israel-brief.md`: the
scheduled Fable pass errored on the monthly spend limit before deciding
anything. This brief needs a real Fable pass before `jerusalem-capture` goes
past `in-progress` — see `docs/fable-review-queue.md` #21. **This brief
carries the milestone's single most consequential open call and must not be
treated as settled scope**: see "The load-bearing open call" below before any
geometry is built. Second of M6's three scenes; the milestone's centerpiece
(first-ever Jerusalem scene).

Scope guard: this brief covers **2 Samuel 5:6–16**. Nothing from 5:17 onward
(the Philistine battles) may appear, depicted or foreshadowed. Nothing from
2 Samuel 6 (the ark) may appear — that narrative is out of scope for M6
entirely, deliberately left to open M7.

## The load-bearing open call — read this before building anything

10th-century-BCE Jerusalem's material scale is one of the most genuinely,
currently contested questions in Israelite archaeology — not a routine
citation gap like most of this project's `design-placeholder` items. Two
real scholarly camps exist:

- **"Low chronology" / minimalist reading** (associated with Israel
  Finkelstein and others): at the traditional United Monarchy date, the City
  of David ridge was a small, largely unfortified highland settlement — a
  "little village," not a monumental capital. On this reading, David's
  conquest is a real event but the town he takes and Solomon later expands is
  modest.
- **Traditionalist / substantial-city reading** (associated with excavators
  including Eilat Mazar and, in earlier City of David seasons, Yigal Shiloh
  and Jane Cahill): identifies the Stepped Stone Structure and adjacent
  material as evidence of real Iron Age monumental construction consistent
  with a functioning royal capital at or near this date, and takes 5:9–11
  (Millo, Hiram's palace) as corroborated rather than merely narrated.

**This project has not yet adopted a source card for either side of this
dispute**, and a Sonnet-fallback pass is the wrong place to pick one — this
is exactly the kind of contested historical/design call `docs/model-
handoff.md` reserves for Fable. The provisional design below therefore:

1. Stages the stronghold/City-of-David terrain at a **deliberately modest,
   disclosed scale** — closer to the minimalist reading's "small hill
   settlement" than to a monumental palace-city — because a modest build can
   be honestly expanded later if the traditionalist reading is adopted, while
   an initially monumental build could not be honestly walked back without
   re-doing the scene.
2. Requires the eventual claim (`claim-jerusalem-fortification-scale` or
   similar) to carry **both readings as `scholarlyViews`**, not a
   silently-chosen answer.
3. Flags this explicitly in `docs/fable-review-queue.md` #21 as the item
   most needing a real Fable ruling — a builder should not proceed past this
   brief's conservative default without either (a) a Fable confirmation of
   this modest-scale approach, or (b) a Fable ruling to build the
   traditionalist reading instead.

## Historical intent

The observer should come away understanding:

1. **The Jebusites held this stronghold before David, and the text preserves
   their own taunt.** "You will not come in here, but the blind and the lame
   will turn you away" (5:6) — a boast of the site's natural defensibility,
   not a literal claim about David's soldiers being disabled. David's reply
   about "the lame and the blind, who are hated by David's soul" (5:8) is a
   genuinely difficult verse with a real history of divergent scholarly
   readings (a proverbial taunt-echo vs. later exclusionary application);
   present as `scholarlyViews`, do not resolve it for the observer.
2. **The water shaft/tsinnor is the operative detail, and its precise
   engineering is disputed.** 5:8 credits Joab's approach via "the water
   shaft" (traditionally associated with the Gihon Spring water system,
   commonly called "Warren's Shaft" after its 19th-century discoverer,
   Charles Warren) as the route into the city. Whether the shaft as excavated
   was actually usable/known at this date is itself debated in the
   literature (later hydrological/dating studies by Reich and Shukron have
   complicated the older Warren's-Shaft-as-tsinnor identification). Render
   the water-system feature as a **disclosed `design-placeholder`** — a
   modest rock-cut shaft feature near the spring, not an asserted match to
   any specific excavated installation — and surface the dispute in claim
   notes rather than picking a winner.
3. **Renamed, refortified, and made capital — inward from the Millo.** 5:9
   states David "built the city all around from the Millo inward" — the Millo
   itself (a fill/terrace structure, exact form disputed) should render as a
   modest terraced/filled slope feature, `design-placeholder`, not a named
   monumental structure.
4. **The Hiram alliance is a real, externally attested contact, staged
   modestly.** Hiram of Tyre sending cedar, carpenters, and masons to build
   David a house (5:11) is the text's own account of Phoenician material and
   technical input into early Israelite state-building — a historically
   plausible and often-cited detail (Phoenician cedar trade and craftsmanship
   are independently well attested in the broader Iron Age Levant, even where
   this specific transaction is not independently inscribed). Stage Tyrian
   representatives/craftsmen as a small referenced group, not staged
   individuals beyond what the text names (Hiram himself may be
   referenced-only — no depicted embassy scene beyond a modest arrival/
   building-materials beat, unless a researcher pass finds strong reason to
   expand it).
5. **The theological reading is the text's own, not invented:** "David knew
   that the LORD had established him king over Israel, and that he had
   exalted his kingdom for the sake of his people Israel" (5:12) — carry as
   dialogue/caption, not staged spectacle.
6. **The wives/sons list (5:13–16) is list-only, not staged.** No named
   individual should be invented beyond the text's own list; do not stage a
   harem scene. Render as a closing-card enumeration (Shammua, Shobab, Nathan,
   Solomon, Ibhar, Elishua, Nepheg, Japhia, Elishama, Eliada, Eliphelet), with
   a plain note that "more concubines and wives" (5:13) is the text's own
   phrasing, not a project embellishment. **Solomon's name here is a bare
   list entry** — no forward-pointing content toward his reign; treat exactly
   like `hebron-reckoning`'s restraint on not pointing forward to Mephibosheth's
   future chapter.

## Resolved design calls (this pass, provisional — flag for Fable per above)

- **Terrain/town scale: modest hill stronghold**, per the load-bearing call
  above. Reuse general Judean-highland terrain conventions
  (`hebron-anointing`'s palette family) adapted for a ridge/spring-adjacent
  site rather than inventing a new regional palette from scratch, unless a
  `world-director`/`threejs-engineer` finds this genuinely doesn't fit
  Jerusalem's actual topography (steep-sided ridge above the Kidron/Gihon) —
  a **new `TerrainSpec` may be warranted** given how topographically distinct
  the City of David ridge is from every prior scene's setting; flag this as a
  build-time judgment call, not fixed by this brief.
- **The taunt/reply (5:6, 5:8b) plays as dialogue/caption only** — no
  disabled or wounded figures are ever staged to literalize "the blind and
  the lame." This is a hard placeholder-policy bar, not a soft preference:
  literalizing the taunt would be both historically indefensible (the verse
  is near-universally read as idiomatic/proverbial, not a physical-access
  claim about David's actual soldiers) and needlessly demeaning to render.
- **The water shaft is a modest rock-cut feature near a spring**, disclosed
  placeholder, no specific excavated-installation claim.
- **The Millo is a modest terraced/filled slope**, disclosed placeholder.
- **Hiram's palace-building is staged as materials/craftsmen arriving and
  simple construction activity**, not a finished monumental palace reveal —
  the text narrates the sending, not a completed-building spectacle; a
  modest structure-in-progress or newly modest-finished house is sufficient.
- **`depictsDeath`: provisionally `false`** — 5:6–10 does not narrate an
  on-camera battle or named killing (unlike `gibeon-pool`/`hebron-gate`); the
  capture is narrated as achieved via the water-shaft approach, not staged
  combat. If a researcher/Fable pass finds reason to stage a skirmish, this
  flips and ADR-009's template would need to apply — flag, don't invent
  combat geometry pre-emptively.

## Visual composition

- **Terrain:** a steep ridge above a spring/valley cut (Kidron-analogue),
  modest fortification-scale per the load-bearing call. New `TerrainSpec`
  candidate (build-time call).
- **Focal masses:** (a) the approach to the water shaft/spring; (b) the
  Millo/terraced slope; (c) a modest building-site for "David's house" with
  Hiram's cedar and craftsmen; (d) a plain domestic ground implying the
  wives/sons list (no staged figures beyond ambient dressing).
- **Sightlines:** the water-shaft approach framed as the operative tactical
  detail Joab exploits, not a dramatized action sequence; the Hiram materials
  arriving as a modest caravan/delivery beat.
- **Lighting:** no textual time marker; default daylight, disclosed as a
  design choice.

## Scale assumptions

- **Principals:** David, Joab (referenced or lightly staged directing the
  approach — his own men are said to strike the Jebusites, 5:8, itself
  narrated rather than shown as combat per the `depictsDeath: false` call
  above).
- **Jebusite defenders: referenced/card-only or a small ambient presence at
  the stronghold**, not a staged battle crowd (consistent with
  `depictsDeath: false`).
- **Tyrian craftsmen/materials party: ≈ 8–15**, small and modest.
- **Ambient town: ≈ 15–30**, static, modest scale per the load-bearing call.
- **High-tier total ≈ 30–55 figures** — moderate, smaller than any M5 crowd
  scene, consistent with the deliberately modest scale decision.

## Camera / observer experience

- **Default viewpoint** (`vp-water-shaft`): the spring/shaft approach, the
  scene's operative historical detail.
- Additional viewpoints: **the Millo/terrace** (`vp-millo-terrace`); **the
  building site** (`vp-davids-house`, Hiram's materials and craftsmen);
  **an overlook** (`vp-city-of-david-overlook`) framing the modest stronghold
  as a whole.
- **Timeline beats** (`depictsDeath: false`, provisional; suggested duration
  ~150s):

  | Beat                 | Text    | Content                                                                                                                                |
  | -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-jebusite-taunt`   | 5:6     | Card/dialogue: the Jebusites' taunt on the stronghold's defensibility. No literalized disabled figures.                                |
  | `b-water-shaft`      | 5:7–8a  | Staged: the approach via the water shaft — the tactical detail, documentary distance.                                                  |
  | `b-david-reply`      | 5:8b    | Card/dialogue: David's reply, carried as text with the scholarly dispute noted in the inspector, not resolved.                         |
  | `b-city-of-david`    | 5:9     | The city taken, renamed, built inward from the Millo — the terrace/fill feature shown.                                                 |
  | `b-hiram-alliance`   | 5:11    | Hiram's cedar, carpenters, and masons arrive; a modest house takes shape.                                                              |
  | `b-lord-established` | 5:12    | Dialogue/caption: David's own theological reading of the moment.                                                                       |
  | `b-close`            | 5:13–16 | Closing card: the wives/concubines/sons list, enumerated plainly, Solomon a bare list entry with no forward pointer. No 5:17+ content. |

## Performance target

- ≈ 30–55 high-tier figures — moderate. New terrain likely warranted (ridge/
  spring topography genuinely differs from every prior scene); flag for a
  `performance-reviewer` pass given the new terrain type, even though figure
  count itself is modest.

## Required source basis (before geometry is built)

- **Existing, reuse where applicable:** `claim-david-historical`.
- **New, narrated (basis `biblical-text`):** `claim-jerusalem-capture`
  (5:6–10 — the taunt, the water-shaft approach, the renaming, the Millo;
  `scholarlyViews` required on both the "lame and blind" reading and the
  water-shaft/tsinnor engineering-identification dispute);
  `claim-hiram-alliance` (5:11–12 — the cedar/craftsmen/house, the
  theological reading); `claim-jerusalem-wives-sons` (5:13–16 — list-only,
  no invented individuals, note that "more concubines and wives" is the
  text's own unspecified phrasing).
- **New, design (basis `design-placeholder`):** `claim-jerusalem-town-form`
  (the modest ridge-stronghold scale itself — **this is the claim that must
  carry the load-bearing dispute above as `scholarlyViews` once a Fable pass
  rules on it; until then, keep confidence low and the notes field explicit
  that this is an unresolved scholarly fight, not a settled placeholder**);
  `claim-water-shaft-form`; `claim-millo-form`; `claim-jerusalem-cast-scale`.
- **Characters:** reuse `david`, `joab`. New: `jebusites` (group,
  referenced/lightly staged); `hiram-of-tyre` (referenced-only —
  no depicted embassy beyond materials/craftsmen arriving, unless research
  supports more); `tyrian-craftsmen` (group, staged, small).
- **Known researcher gaps — fold into a `researcher` pass, do not invent
  citations in the meantime:**
  - A City of David archaeology source card (e.g., covering the Stepped
    Stone Structure, Gihon Spring water-system excavations by Reich and
    Shukron, or a synthesis volume) — none exists yet in
    `sources/source-cards/`. This is the single most important researcher
    gap in the whole milestone; it directly feeds the load-bearing call
    above.
  - A Phoenician/Tyre-alliance source (e.g., a history of Tyre or Phoenician
    material culture/trade synthesis) for `claim-hiram-alliance`'s material
    plausibility.
  - `king-stager-2001` (already in the bibliography) may cover general Iron
    Age domestic/construction material culture relevant to the modest
    building-site beat — check before assuming a new card is needed.
- **ESV excerpt budget (`2sam-5`, shared across all three M6 scenes):**
  recommend 5:8b (the "lame and blind" reply) or 5:12 (the theological
  reading) as this scene's spend — implementer's call between the two,
  given the shared-passage budget. Live-source wording check at build time.

## Placeholder policy

- **Allowed placeholders:** stronghold/town-form scale (disclosed, pending
  Fable ruling); water-shaft form; Millo form; building-site staging;
  Tyrian-craftsmen count/positions.
- **Not allowed:** literalizing the "blind and lame" taunt as staged disabled
  figures; asserting either side of the 10th-century-Jerusalem-scale dispute
  as settled fact anywhere in claim text or captions; a specific claimed match
  to any named excavated water installation; a completed monumental palace
  reveal; staging Solomon or any son as more than a list entry; inventing
  named wives/concubines beyond what 5:13 states; any 2 Samuel 5:17+ or
  2 Samuel 6 content, depicted or foreshadowed, anywhere including the
  closing card; any staged combat/death geometry (see `depictsDeath` call
  above — flag for Fable rather than building it in if this needs revisiting).
