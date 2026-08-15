# Scene brief — the Jebusite conquest and the City of David (`jerusalem-conquest`, M6)

World-director pass, Sonnet, provisional (fable-review-queue #21), 2026-08-15.
Implementation: Sonnet/`threejs-engineer` within this direction; deviations
that change historical meaning go back through `docs/fable-review-queue.md`.
Second scene of Milestone 6 and its **load-bearing scene** — the project's
first Jerusalem geometry, and the first scene to stage a genuinely
unresolved, high-profile scale dispute (maximalist vs. minimalist readings
of 10th-century Jerusalem) directly in its terrain/settlement form rather
than only in a claim's prose. Because this brief was written under the
Fable-unavailable fallback, its staging calls — especially the
maximalist/minimalist resolution below — carry a **provisional** status and
must be re-checked at a real Fable pass before the scene ships past
`in-progress` (queue #21).

Scope guard: this brief covers **2 Samuel 5:6–12**, plus **5:13–16 as a
closing text card only** (no geometry, no new named characters — see
"Resolved design calls"). Nothing from **5:17 onward** (the Philistine
campaigns at Baal-perazim and the Valley of Rephaim — `baal-perazim-rephaim`,
the third M6 scene) or **2 Samuel 6+** (the ark's arrival, Uzzah's death,
David's dance — Milestone 7) may appear, depicted or foreshadowed, beyond a
brief closing forward-pointer. **1 Chronicles 11:6**'s parallel detail (Joab
volunteering to be "first to strike the Jebusites" and so becoming
commander) is explicitly **out of scope**: it is not in 2 Samuel 5, it
would require staging an on-screen killing this text does not narrate, and
this project's Samuel-focused source discipline treats Chronicles parallels
as citable context in claim `notes`, not stageable content (the same
treatment `jabesh-burial` gave 1 Chronicles 10:12). Do not stage it, name
Joab as present, or imply a duel/single-combat beat.

## Historical intent

The observer should come away understanding four things:

1. **This is a small, contested hilltop, not the Jerusalem the word evokes.**
   Everything a modern viewer associates with "Jerusalem" — the Temple
   Mount, the Old City walls, a skyline — postdates this scene by centuries
   to millennia. The 2 Samuel 5 city is a narrow ridge spur of a few
   hectares beside a modest spring. The scene's whole job is to reset that
   expectation before building on it, the same corrective `gilboa-battle`
   performed for "biblical battle" and `hebron-anointing` performed for
   "biblical capital."
2. **The text presents a taking, not a battle.** No combat deaths are
   narrated in 2 Samuel 5:6–12 (contrast the sustained, named-character
   violence of `gibeon-pool` and `hebron-gate`, both M4/M5). The Jebusites
   taunt David from a position of apparent confidence, and David's forces
   take "the stronghold of Zion" — the verb is `לָכַד` (lakad, "captured/
   seized"), not a verb of slaughter. `depictsDeath` is **`false`** for this
   scene: no first-visit violence advisory, no combat choreography, no
   wound/blood geometry in any form. This reading is confirmed, not just
   assumed — see "Resolved design calls."
3. **Two of the most obscure verses in the Hebrew Bible sit right at the
   center of this scene, and the honest move is to say so, not resolve
   them.** "The blind and the lame" (5:6, 5:8) and the *tsinnor* (5:8a) are
   both notoriously difficult; scholars have proposed several genuinely
   different readings of each without consensus. The scene's design
   discipline here is restraint: caption the difficulty, do not visualize
   a guessed answer as if it were settled staging.
4. **The chapter closes on dynastic legitimacy, not conquest triumphalism.**
   5:12's narratorial aside — David perceived that the LORD had established
   him as king "for the sake of his people Israel" — reframes the whole
   passage retrospectively: the taking of Jerusalem, the building program,
   and Hiram's alliance are presented as evidence of establishment, not as
   a king's personal military trophy. The scene's closing beat should carry
   that reframing, not end on a triumphal image of the captured city.

## Resolved design calls (this pass — all provisional, queue #21)

- **Maximalist vs. minimalist staging call — render at the modest,
  minimalist-leaning end, disclosed, neither view silently adopted.**
  Per the M6 scope comment and this project's anachronism discipline
  (prefer omission/placeholder over invention when evidence is thin), the
  built environment renders as: a small cluster of modest stone dwellings
  along the ridge crest; a stepped-terrace retaining system on the eastern
  slope (the least-disputed physical feature between the two views — both
  sides agree *some* Iron Age terracing exists there; they dispute its date,
  coherence, and relationship to any specific monumental building above
  it); and **no** rendering of Eilat Mazar's "Large Stone Structure" as a
  single coherent monumental building, and **no** structure labeled or
  implied as "David's palace." The dispute itself is **not resolved by this
  choice** — it is carried in full as `scholarlyViews` on a new
  `claim-jerusalem-town-form` (basis `design-placeholder`, confidence
  `low`, both `loc-view-jerusalem-maximalist` and
  `loc-view-jerusalem-minimalist` cited by their source cards). The
  reasoning for leaning minimalist in the *render* while disclosing both
  in the *claim*: (a) inventing monumental Solomonic-looking construction
  the excavators themselves dispute is a much larger anachronism risk than
  under-building a modest hill settlement; (b) a modest render is
  trivially compatible with *both* readings (the maximalist view does not
  claim the whole ridge was monumental, only the summit structure; the
  minimalist view is fully satisfied by a modest render) — this is the
  same "smallest claim consistent with all disclosed views" logic
  `claim-ziklag-location` used for its own three-candidate-site dispute;
  a monumental render would satisfy only one side. **This is the single
  most consequential call in this brief and the one most likely to be
  revised at a real Fable pass** — it is deliberately conservative, not
  because the maximalist reading is judged wrong, but because rendering it
  confidently would be the harder error to walk back later.
- **"The stronghold" is primarily topographic, not architectural — reuse
  the Beth-shan thin-fortification precedent.** 2 Samuel 5:7's "stronghold
  of Zion" is defensible largely because of the ridge's own terrain: steep
  valleys close on both the east (Kidron) and west (Tyropoeon), narrowing
  to a defensible spur. Rather than asserting a fortification *wall* either
  view would dispute, the perimeter reads as **conjoined dwelling walls
  along the crest edge** — the identical device `beth-shan-walls` used
  when fortification evidence was thin (register #11): a legible boundary
  without an asserted engineered wall/gate circuit. No gate structure is
  built (unlike `hebron-gate`'s chambered gateway, which had at least a
  generic-typology upgrade path) — 2 Samuel 5 does not require a gate beat,
  and inventing one here would be a second unforced anachronism risk on
  top of the settlement-scale question. `claim-jerusalem-town-form` covers
  this too.
- **The taunt is staged; "the blind and the lame" is caption-only,
  never visualized — hard rule, carried from the M6 scope pass.** Jebusite
  figures may appear on the crest/perimeter gesturing and jeering (the
  general act of taunting, not the specific content) as David's force
  approaches. The line itself — "you will not come in here, but the blind
  and the lame will turn you back" — is delivered as caption/text only. **No
  figure is ever modeled, posed, or implied as blind or lame, in this scene
  or anywhere else in the project**, for this beat or the 5:8b Temple-entry-
  exclusion echo some commentators connect to it. New claim
  `claim-jebusite-taunt` (basis `biblical-text`, confidence `high` for the
  narrated fact of a taunt, `low` for its meaning) carries `scholarlyViews`
  with an honestly hedged set of readings — e.g., scholars have proposed
  the line is a literal boast that even token defenders suffice, a
  proverbial saying about invincibility whose original force is lost, or a
  later editorial link to the disability-exclusion tradition at 5:8b — no
  named proponents are asserted here because none were page-verified in
  this session's source-card pass; flag as "checked, permanently thin"
  per the project's existing convention (register #17's precedent) rather
  than inventing attributions.
- **The *tsinnor* (5:8a) is caption-only, not staged as a specific
  physical route.** Reich and Shukron's own excavation (their named
  argument, cited via `reich-shukron-1999-warrens-shaft`) concludes Warren's
  Shaft was not usable as an access route until centuries after David's
  traditional date — the most famous popular staging of this verse
  (soldiers climbing a shaft into the city) is the position its own
  excavators argue against. Staging *any* specific route as "the tsinnor"
  would assert an answer this project cannot support. Resolution: David's
  force is shown approaching generically from the Kidron valley near the
  (uncontested-location) Gihon Spring and entering the stronghold from the
  slope — geography that is not disputed — without depicting a shaft,
  tunnel, or crawl as the entry mechanism. A caption at the spring
  viewpoint carries the *tsinnor* debate itself (word meaning disputed:
  water shaft/conduit, a weapon/grappling-hook reading, or a body-part
  idiom reading have all been proposed) and names Reich & Shukron's
  Warren's-Shaft-rejection specifically, without asserting a winner. New
  claim `claim-tsinnor-route` (basis `design-placeholder`, confidence
  `low`).
- **Hiram's house (5:11–12) stays a modest under-construction vignette,
  not a finished building.** Given the town-form dispute above, building a
  finished, confidently-detailed royal house here would be the same error
  twice. Resolution: a small vignette — a few cedar logs/timber stacked
  near the crest-edge dwellings, a handful of craftsmen at work on
  foundation courses — explicitly **not** labeled or composed to resemble
  Mazar's "Large Stone Structure," not asserted as complete, and small
  enough that most of this beat's weight is carried by caption rather than
  by geometry (per the brief's instruction, "even just a caption card" was
  an acceptable fallback — this brief chooses the light vignette over a
  bare card because Hiram's cedar and craftsmen are a physically concrete,
  low-anachronism-risk detail in their own right, distinct from the
  disputed building they're building). New claim `claim-hiram-alliance`
  (basis `biblical-text`, confidence `high` for the narrated fact, no
  dispute on the alliance itself).
- **5:13–16 is a closing text card only.** More sons and daughters born to
  David at Jerusalem — a genealogical list, not stageable action. No
  geometry, no new named `CharacterOrGroup` entries (the names are not
  needed anywhere else in this project's current scope). New claim
  `claim-jerusalem-sons-daughters` (basis `biblical-text`, confidence
  `high`) exists solely so the card has something to cite; it carries no
  visual weight.

## Visual composition

- **Terrain — new geometry, named explicitly:**
  - A `ridge` `TerrainSpec` feature (reusing the same engine feature kind
    `gilboa-battle` introduced) forming the narrow City of David spur,
    oriented roughly north–south, small in absolute scale — a few hundred
    meters long, tens of meters wide at the crest, not a broad hilltop.
  - Two flanking `channel` features (the Kidron valley to the east, the
    Tyropoeon/Central Valley to the west) cut deeper and steeper than any
    prior scene's valley work — the steepness *is* the "stronghold" claim,
    and should read clearly from the default viewpoint.
  - A `basin` + flat water-plane at the Gihon Spring, directly reusing the
    `gibeon-pool` technique (`asset-gibeon-pool-basin`/`asset-water-plane`
    precedent: shallow basin depression, static tinted water plane, no
    real-time water shader) — the spring's location is not disputed and is
    the scene's one confidently-placed water feature.
  - Terrace retaining walls on the eastern slope, adapting `hebron-
    anointing`'s `TerraceWalls.tsx` pattern to a steeper, narrower context
    — this is new *layout* work (the geometry technique is reused, the
    placement/scale is new and specific to this contested feature; see
    "Resolved design calls").
  - Palette: reuse the Judean-highland palette established by `hebron-
    anointing`'s `terrain.ts` (the `#c3ae85`/`#7c8256`/`#ad9a72` family) —
    same regional geology, no new palette needed. Rockier and more exposed
    at the crest than Hebron's terraced hillsides, since the City of David
    ridge is narrower and steeper.
- **New settlement geometry:** a small cluster of modest single-room/
  courtyard stone dwellings along the crest (new asset family — reuse the
  general highland-dwelling construction logic from `hebron-anointing`'s
  `TownAndPlaza.tsx` if its wall/roof primitives generalize, scaled down
  and thinned to a settlement of a few dozen structures at most, not
  Hebron's fuller town). No plaza, no gate, no monumental structure (see
  "Resolved design calls").
- **Focal masses, in sequence:** (a) **the approach** — David's force
  moving up from the Kidron/spring side, the ridge rising ahead; (b) **the
  taunting crest-line** — Jebusite figures along the perimeter, the
  taunt's staging ground; (c) **the taken crest** — the same ground,
  emptied of tension, now David's; (d) **the building-up vignette** — the
  Millo/terrace work and Hiram's small construction scene, near the crest
  edge.
- **Sightlines:** the default approach viewpoint should let the observer
  register the ridge's *smallness* against the depth of the flanking
  valleys — the "stronghold" reads as defensible terrain, not defensible
  architecture. A crest-top viewpoint looking out over both valleys is the
  scene's "reset your expectations" money shot, deliberately un-grand.
- **Lighting:** flat, unremarkable daylight throughout — the text gives no
  time-of-day cue and nothing in this scene calls for a dramatic lighting
  arc the way Gilboa's dawn-to-dusk death sequence did. Disclosed
  `design-placeholder`, consistent with `hebron-anointing`'s treatment.

## Scale assumptions

No headcount is narrated anywhere in 5:6–12. Following the project's
representative-crowd convention (register #7, ~1:10 for narrated forces
where a number exists, disclosed design counts where none does):

- **David's assault force:** disclosed design count ≈ **35–45 figures** —
  legible as an organized military party without implying a national-army
  size (the same "don't imply a number the text and the scale debate both
  withhold" discipline `gilboa-battle` used for `claim-battle-scale`).
  Smaller than Gilboa's combat figure counts (this is a taking, not a
  battle) but larger than `hebron-covenant`'s closed feast cast (this is a
  military action, however bloodless in the text).
- **Jebusite defenders on the crest (the taunt beat):** ≈ **10–15
  figures** — enough to read as a taunting line of defenders without
  implying a garrison size the minimalist-leaning town form doesn't
  support.
- **Ambient Jebusite/local population (post-conquest, building-up beat):**
  ≈ **15–25 figures** — small, consistent with the modest-settlement call
  above. These figures are never staged as combat victims, never shown
  being struck or killed (no such event is narrated), and are not
  distinguished visually from the taunting defenders — the same figures
  can plausibly represent both beats, since the text implies continuity of
  population, not replacement.
- **Hiram's building vignette:** ≈ **6–10 figures** (craftsmen/masons) —
  a small working group, not a construction crowd.
- **High-tier total ≈ 65–95 figures** — well below `gilboa-battle`'s
  ~120–140 combat ceiling and below `hebron-gate`'s ~100–140, consistent
  with this scene's "small hilltop, not a spectacle" historical intent.
  New claim `claim-jerusalem-cast-scale` (basis `design-placeholder`,
  confidence `speculative`) carries these numbers explicitly as disclosed
  design counts, not narrated totals.

## Camera / observer experience

- **Default viewpoint** (`vp-jerusalem-approach`): from the Kidron-valley
  side looking up at the ridge and spring — establishes the "small
  stronghold on a spur" read before the observer ever reaches the crest.
- Additional viewpoints: **the crest overlook** (`vp-crest-overlook`,
  looking out over both flanking valleys — the scale-reset shot,
  inspect emphasis); **the Gihon Spring** (`vp-gihon-spring`, where the
  *tsinnor* caption lives, inspect emphasis — a strong candidate for
  ADR-011's interactable-label affordance rather than a walked beat);
  **the building-up ground** (`vp-millo-terrace`, the terrace/Hiram
  vignette, walk emphasis at a slow pace during the montage beat).
- **Timeline beats** (`depictsDeath: false`; no first-visit advisory;
  suggested duration ~150s, faster-paced than `hebron-gate`'s funeral-pace
  180s — this is a march/taking/naming/building sequence, not a
  procession):

  | Beat             | Text     | Treatment                                                                                                                                                                                    |
  | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-context`       | —        | Brief recap card: David now anointed king over all Israel at Hebron (`hebron-unification`); forward pointer into this scene only, no new content.                                             |
  | `b-march`          | 5:6a     | David and his men move up from the Kidron/spring side toward the ridge. No violence.                                                                                                          |
  | `b-taunt`          | 5:6b, 5:8b | Jebusite figures line the crest, gesturing/jeering (staged); the "blind and the lame" line delivered as caption text only, no disabled figures. `claim-jebusite-taunt`'s hedge surfaced here. |
  | `b-taking`         | 5:7, 5:8a | David's force reaches and holds the crest; Jebusite figures disperse/step back — no depicted strike, no fall, no wound geometry (no combat is narrated). Tsinnor caption available at `vp-gihon-spring` in parallel. |
  | `b-naming`         | 5:9a     | Caption: the stronghold is called the City of David.                                                                                                                                            |
  | `b-buildup`        | 5:9b     | Montage: terrace/building activity from the Millo inward; ambient population present, unharmed, going about the settlement. Slow walk-pace at `vp-millo-terrace`.                             |
  | `b-hiram`          | 5:11     | Hiram's cedar and craftsmen arrive; the small under-construction vignette. No finished building shown.                                                                                         |
  | `b-establishment`  | 5:12     | Closing narratorial beat: David perceives the LORD has established him as king "for the sake of his people Israel" — ESV excerpt candidate (see below). No triumphal imagery.                 |
  | `b-close`          | 5:13–16  | Closing text card only: more sons and daughters born to David at Jerusalem (list, not staged). Forward pointer to `baal-perazim-rephaim` only. No 2 Samuel 6+ content.                         |

## Performance target

- ≈ 65–95 high-tier figures — a mostly static/slow-walk cast (no combat
  choreography, no rout dust, no procession bier), cheaper per-figure than
  either `gilboa-battle` or `hebron-gate`.
- New geometry families to budget as instanced meshes: the crest dwellings
  (one family, low count — a few dozen structures at most), the terrace
  retaining walls (adapted from `hebron-anointing`'s existing pattern),
  the Gihon Spring basin + water plane (direct reuse of the `gibeon-pool`
  technique — no new shader work), and Hiram's cedar/timber props (small,
  new, low-count).
- No new lights, no fire, no dust systems, no water shader beyond the
  already-declined flat-plane technique. Run `performance-reviewer` after
  the terrain + settlement geometry lands, before the figure population
  pass — this scene's cost driver is terrain/valley steepness (draw
  distance, shadow budget on steep slopes), not figure count.

## Required source basis (before geometry is built)

- **Existing, reuse:** `claim-david-historical` (anchor, the same scale-of-
  kingdom debate this scene's modest-render choice is consistent with);
  `claim-dress` (generic dress base for both David's men and Jebusite
  figures — no distinct Jebusite kit is attested in the sources this
  session gathered; reuse the generic base rather than inventing one).
- **New, identification (basis `scholarly-reconstruction`, confidence
  `high` for site location only):** `claim-jerusalem-identification` —
  the City of David ridge as the site, citing `rainey-notley-2006` and
  `mazar-2009-palace-of-david` per `loc-view-jerusalem-city-of-david-
  ridge`; explicitly does **not** carry the town-form dispute (that's
  `claim-jerusalem-town-form`, below).
- **New, disputed/design (basis `design-placeholder`, confidence `low`):**
  `claim-jerusalem-town-form` — the settlement scale/fortification
  question, carrying `loc-view-jerusalem-maximalist`
  (`cahill-2003-jerusalem-united-monarchy`, `mazar-2009-palace-of-david`)
  and `loc-view-jerusalem-minimalist`
  (`finkelstein-herzog-singer-avitz-ussishkin-2007`,
  `steiner-2003-kenyon-response`) as `scholarlyViews`, with the render
  disclosed as the minimalist-leaning conservative choice in `notes` (see
  "Resolved design calls" for the full reasoning to carry forward
  verbatim); `claim-tsinnor-route` — the 5:8a *tsinnor* crux, citing
  `reich-shukron-1999-warrens-shaft` as one named position within a wider
  unresolved debate, confidence `low`.
- **New, narrated (basis `biblical-text`):** `claim-jerusalem-conquest`
  (5:6a, 5:7, 5:9a — the march, the taking, the renaming; confidence
  `high` for the narrated fact); `claim-jebusite-taunt` (5:6b, 5:8b — the
  taunt and its obscure content; confidence `high` for the fact of a
  taunt, `low` for its meaning; `scholarlyViews` hedged per "checked,
  permanently thin" — no named proponents invented); `claim-jerusalem-
  millo-buildup` (5:9b — the building-up from the Millo inward; confidence
  `high` for the narrated fact, but the Millo's own physical form/
  identification stays undetermined in the sources this session gathered
  — note honestly as an open gap rather than linking it to the Stepped
  Stone Structure without a citable source); `claim-hiram-alliance`
  (5:11–12 — cedar, carpenters, masons, the house, and 5:12's
  establishment aside; confidence `high`, uncontested in the sources
  reviewed); `claim-jerusalem-sons-daughters` (5:13–16, closing card only,
  confidence `high`, no rendering weight).
- **New, design:** `claim-jerusalem-cast-scale` (the disclosed figure
  counts above, basis `design-placeholder`, confidence `speculative`).
- **Characters:** reuse `david`. **Add one light entry**
  (`CharacterOrGroup`, id/name/kind/summary/passageRefs/claimIds only, no
  heavy record — the `jonathan`/`sauls-armor-bearer` precedent from
  `gilboa-battle`): `hiram-king-of-tyre` (person — named, sends materials
  and craftsmen, referenced again likely in later Solomon-era chapters
  outside this project's current scope, but worth a stable id now). No
  named Jebusite individual is required or attested; the taunting/ambient
  Jebusite population stays anonymous, as does David's assault force
  beyond David himself.
- **ESV excerpt budget (`2sam-5`, shared across all three M6 scenes):**
  recommend **5:12** ("And David knew that the LORD had established him
  king over Israel, and that he had exalted his kingdom for the sake of
  his people Israel") as this scene's spend — it carries the chapter's
  interpretive weight and lands on this scene's closing beat. A short
  fragment of 5:8b ("the blind and the lame") is a plausible second
  candidate for the taunt caption, but given the caption-only/no-
  visualization sensitivity already governing that beat, recommend
  paraphrase there instead and reserve any literal quotation for a build-
  time call once the other two M6 scenes' spend is known. Final spend
  decision deferred to build time per standing practice.

## Placeholder policy

- **Allowed placeholders** (each needs an `assets.ts` entry with
  `whyTemporary` before `released`): the ridge/valley terrain form
  (`asset-terrain-jerusalem-ridge`, procedural, not DEM — same reasoning
  as `gilboa-battle`'s DEM-deferral); the crest dwelling cluster's exact
  form/count/placement; the terrace retaining-wall placement on the
  eastern slope; the Gihon Spring basin's exact dimensions (reusing the
  `gibeon-pool` basin/water-plane technique); the perimeter-as-conjoined-
  houses treatment (reusing the `beth-shan-walls` thin-fortification
  device); the exact approach route geometry; lighting hour (unstated in
  text); Hiram's vignette's exact form, scale, and craftsmen count; all
  disclosed figure counts.
- **Not allowed:** any visualization of "the blind and the lame" — no
  figure modeled, posed, or implied as blind or lame, anywhere in this
  scene; any confident resolution of the maximalist/minimalist town-scale
  dispute in the geometry itself (the render must stay legible as
  "modest, disclosed as one end of a live scholarly range," not as "this
  is what 10th-century Jerusalem looked like"); any monumental or
  Solomonic-scale city, wall circuit, or gate structure; any structure
  built, labeled, or composed to resemble Mazar's "Large Stone Structure"
  or presented as "David's palace"; staging Warren's Shaft or any other
  specific route as a confident answer to the *tsinnor* crux; any depicted
  combat death, wound, or blood geometry (none is narrated — `depictsDeath`
  stays `false`); staging 1 Chronicles 11:6's Joab-first-to-strike detail
  or naming Joab as present in this scene; any 2 Samuel 5:17+ or 2 Samuel
  6+ content, depicted or foreshadowed, beyond the closing forward-pointer
  to `baal-perazim-rephaim`; new named-character records for the 5:13–16
  sons/daughters list (text-card only); triumphal or conquest-glorifying
  staging anywhere in the sequence, consistent with the closing beat's
  reframing toward establishment/legitimacy rather than victory.
