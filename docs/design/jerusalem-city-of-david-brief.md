# Scene brief — The Jebusite stronghold, the City of David, and Hiram's alliance (`jerusalem-city-of-david`, M6)

**PROVISIONAL — Sonnet-fallback scope pass, 2026-08-22.** Same fallback-policy
caveat as `hebron-unification-brief.md` — see its header and
`docs/fable-review-queue.md` #21. This is the milestone's load-bearing scene
and the single most historically contested new claim-set the project has
taken on since the atlas launched; **its `scholarlyViews`/`design-placeholder`
calls below need real Fable confirmation before this scene ships past
`in-progress`**, more urgently than the other two M6 briefs.

Scope guard: this brief covers **2 Samuel 5:6–12**: the capture of the
Jebusite stronghold (5:6–9), the note that David grew great because "the
LORD... was with him" (5:10), and Hiram's alliance and palace-building
(5:11–12), staged as a coda. The Jerusalem-born-children list (5:13–16)
is carried as a closing card here (card-only, same discipline as M5's
Michal treatment — do not stage a harem/household scene). **The Rephaim
battles (5:17–25) belong to `rephaim-valley`, a separate brief — do not
stage or foreshadow them here.** Second scene of M6; build after
`hebron-unification`, since this scene is the milestone's most
research-dependent and highest-risk build.

## Historical intent

The observer should come away understanding four things, in order of how
load-bearing they are:

1. **This is the single most archaeologically contested location and event
   the project has ever staged, and the scene must say so plainly.** Every
   prior location (Ziklag, the Besor, Gilboa, Beth-shan, Jabesh-gilead,
   Gibeon, Hebron) has an identification that is either settled or narrowly
   disputed among two or three candidate sites. Jerusalem/the City of David
   is different in kind: the _general location_ (the southeastern ridge
   below the present Temple Mount, above the Gihon Spring — Silwan/Wadi
   Hilweh, City of David archaeological park) is not seriously disputed, but
   almost everything about _what David's Jerusalem actually looked like_ —
   its size, fortification, monumentality, even whether it was a real
   political capital or a modest highland town at this date — is the
   subject of one of biblical archaeology's most active live disputes (the
   "high" vs. "low" Iron Age chronology debate, plus the specific
   contest over the Large Stone Structure/Stepped Stone Structure
   excavated by Eilat Mazar). This scene's whole design discipline is
   built around disclosing that dispute honestly rather than picking a side
   silently in the geometry.
2. **The "water shaft" line (5:8) has a translation and an archaeological
   problem, both open.** The Hebrew _ṣinnôr_, traditionally rendered "water
   shaft/gutter," has long been popularly linked to the rock-cut vertical
   shaft discovered by Charles Warren in 1867 ("Warren's Shaft") as the
   route by which Joab's men supposedly infiltrated the city. Later
   excavation (Reich and Shukron's re-survey of the City of David water
   systems, 1990s–2000s) found that Warren's Shaft was not actually usable
   as a functioning water-access route in the Iron Age the way earlier
   scholars assumed, and the word _ṣinnôr_ itself is contested at the
   translation level (proposals range from a water channel/shaft to a
   grappling hook or weapon, to a term of unclear meaning entirely). This
   is not a minor footnote — it is one of the most literally _load-bearing_
   disputes for how the capture itself gets staged. Default to the least
   specific defensible staging (see Resolved design calls) rather than
   visually committing to the Warren's-Shaft-infiltration reading.
3. **The Millo (5:9) is a named but unidentified feature.** The text says
   David "built the city all around from the Millo inward" — _millo_ means
   roughly "filling"; candidate identifications include terracing
   supporting the eastern slope (a role some scholars connect to the
   Stepped Stone Structure), a specific fortification, or an artificial
   platform, but no scholarly consensus names a single excavated feature as
   "the Millo." Treat it as a named, textually real but archaeologically
   unidentified feature — label, don't render as a specific structure.
4. **Hiram's alliance (5:11–12) is the text's first international
   relations beat, deliberately modest.** Two verses: cedar timber,
   carpenters, and masons from Tyre build David "a house." No palace
   architecture is described. This should read as the _beginning_ of
   something (foreign-relations legitimacy, building-material trade) rather
   than a completed monumental palace — the text itself is terse here, and
   the "Davidic palace" identification (Eilat Mazar's Large Stone Structure,
   published 2005–2009) is itself one of the most disputed claims in the
   whole field (disputed on dating, function, and even whether it is one
   structure or a composite of several building phases — critics include
   Israel Finkelstein, David Ussishkin, and others; defenders include Mazar
   herself and some collaborators). Do not render a specific "David's
   palace" structure as settled fact.

## Resolved design calls (this pass — provisional, see queue #21)

- **The stronghold/City of David renders as a fortified hill settlement on
  the southeastern ridge, deliberately generic in exact wall/gate
  layout — a new `design-placeholder`, same register as Hebron's "modest
  highland hill town" (queue #19c precedent: an honestly disclosed
  placeholder that survives scrutiny is a valid project state, not a
  failure to research).** Do not render a specific named structure (no
  "Stepped Stone Structure," no "Large Stone Structure," no "Warren's
  Shaft" as a labeled, walkable feature) as if its Davidic-era identity
  were settled. If the implementer wants to include a stepped/terraced
  slope feature for visual interest (the eastern ridge genuinely does step
  down toward the Kidron), it must be captioned as an unidentified
  terracing feature, cross-referencing the Millo dispute in its claim
  notes, not asserted as "the" Millo or "the" Stepped Stone Structure by
  name.
- **The capture itself (5:6–9) stages as a night/dawn infiltration and
  assault reaching the stronghold's interior, without visually committing
  to the water-shaft route.** Show attackers reaching the walls/gate and
  the defenders' taunt (5:6, "you will not come in here, but the blind and
  the lame will ward you off" — the Jebusites' own boast, staged as
  spoken/captioned mockery, not as a literal blind-and-lame defense line;
  don't render disabled defenders as a literal tableau, that risks reading
  as caricature rather than idiom) — then cut to the captured stronghold,
  renamed. If the implementer wants one specific visual route for the
  infiltration (useful for staging clarity), a narrow rock-cut passage
  read as "an unidentified access route, popularly but disputedly linked to
  Warren's Shaft" is acceptable **only with that dispute stated in the
  claim's notes and, ideally, in an on-screen label** — never presented as
  simply "Warren's Shaft" unlabeled.
- **`depictsDeath` for this scene: true, but restrained.** The capture is a
  military assault with implied casualties (unlike `hebron-unification`'s
  peaceable ceremony); ADR-009's standard applies — the beat can show
  onset/struggle without gore geometry, following `amalekite-camp`'s
  onset-only precedent rather than `gilboa-battle`'s or `hebron-gate`'s
  named-character-killing intensity (no individual named victim is
  identified in this text — this is a generic military-capture beat, not a
  named killing, so ADR-009's dismemberment-bar template doesn't apply the
  same way; ordinary combat-onset restraint does).
- **Hiram's palace-building (5:11–12) stages as a modest coda: timber
  delivery, masons/carpenters at work on a house-scale structure — not a
  completed monumental palace.** No specific "David's palace" structure
  gets a name or a claim asserting the Large Stone Structure identification
  as fact; if the implementer wants to visually gesture at a
  larger-than-ordinary residence under construction, its claim notes must
  carry the Mazar identification as a **disputed, named scholarly view**
  (basis `scholarly-reconstruction` at most, confidence `low`, both the
  proponent and critic positions named), not the sole account.
- **The Jerusalem-born-children list (5:13–16) is a closing card, not a
  staged household/harem scene** — same discipline as `hebron-covenant`'s
  Michal treatment. State the list as the text states it (more wives and
  concubines, sons and daughters born, including Solomon by name if the
  implementer chooses to flag the forward pointer — but no illustration of
  any of them, and no forward-pointing detail about Solomon beyond what
  5:14 itself states).
- **No Rephaim/Philistine content of any kind** — that is `rephaim-valley`'s
  scope entirely; this scene's closing card may point forward to it by
  name only.

## Visual composition

- **Terrain:** new regional `TerrainSpec` — the project's first Jerusalem
  geography. The historically real, load-bearing terrain facts to encode:
  a narrow ridge (the southeastern hill / City of David spur) with steep
  valleys on both sides (Kidron to the east, the Tyropoeon/Central Valley
  to the west), the Gihon Spring at the base of the eastern slope
  (Jerusalem's water source — cross-reference in the water-system claim
  regardless of the ṣinnôr dispute, since the spring's location and
  importance is _not_ disputed even though the shaft/access-route question
  is), and the ridge's small footprint relative to the later, much larger
  city (this is a small hilltop stronghold at this date under any scholarly
  reading, "high" or "low" chronology alike — the dispute is about degree
  of monumentality, not about the settlement being modest in area). Do not
  render the Temple Mount or any Solomonic-era structures — those are
  centuries and (per the milestone-order rule) chapters away.
- **Focal masses:** (a) the ridge stronghold itself, walls/gate, deliberately
  modest per the placeholder policy; (b) the Gihon Spring/eastern slope
  access area, staged ambiguously per the ṣinnôr dispute above; (c) the
  building-coda area for Hiram's timber/construction beat, visually
  distinct from (a) as a smaller, separate work-site, not integrated into
  the fortification itself (the text doesn't say where "a house" was built
  relative to the captured stronghold, and conflating them would silently
  assert a specific plan).
- **Sightlines:** default vantage should let the observer read the ridge's
  narrowness and the surrounding valleys — the terrain _is_ the argument
  for why this spot was defensible and worth taking, and it should be
  legible without a caption. A second vantage holds the spring/slope area
  close, inspect-emphasis, for the water-system dispute material.
- **Lighting:** the capture beat may use a dawn/half-light treatment (a
  reasonable, disclosed staging choice for an infiltration-and-assault
  beat, distinct from `gilboa-battle`'s full-daylight battle and
  `ziklag-lament`'s burned-settlement grief lighting) — state this as a
  `design-placeholder` lighting choice, not a textually stated hour. The
  Hiram coda reverts to ordinary daytime.

## Scale assumptions

- **Jebusite defenders: disclosed design count ≈ 20–40** — the text gives
  no number; scaled as a garrison defending a small stronghold, not a full
  army (consistent with the terrain's small footprint).
- **David's assault force: disclosed design count ≈ 40–60** — reuse the
  established Davidic-band figure pool where possible rather than inventing
  a new large cast; this is a raid-scale capture, not a set-piece battle
  (that register is reserved for `rephaim-valley`).
- **Hiram's builders: disclosed design count ≈ 10–15** — carpenters and
  masons, a work-crew scale, not a crowd.
- **High-tier total ≈ 80–120 figures** — larger than `hebron-unification`,
  smaller than a full Gilboa-scale battle; this is a capture-and-founding
  scene, not the milestone's biggest combat set piece (that's
  `rephaim-valley`).

## Camera / observer experience

- **Default viewpoint** (`vp-ridge-overview`): the ridge/valley geography,
  establishing why this site mattered before any action starts.
- Additional viewpoints: **the spring/slope access area**
  (`vp-gihon-slope`, inspect emphasis, water-system dispute material);
  **the captured stronghold interior** (`vp-city-of-david`, the renaming
  beat); **the building coda** (`vp-hiram-works`, walk emphasis).
- **Timeline beats** (`depictsDeath: true` — first M6 ADR-009 advisory
  trigger, restrained per Resolved design calls above; suggested duration
  ~180s, the milestone's longest scene):

  | Beat              | Text     | Treatment                                                                                                                                                                                                                                       |
  | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-approach`      | 5:6a     | Staged: David and his men march against the Jebusites at Jerusalem. `vp-ridge-overview`.                                                                                                                                                        |
  | `b-taunt`         | 5:6b     | Staged/captioned: the Jebusites' "you will not come in here" boast — spoken/caption emphasis, not a literal disabled-defenders tableau.                                                                                                         |
  | `b-capture`       | 5:7–8a   | Staged: the assault and capture, restrained per ADR-009 onset-only convention; the ṣinnôr line carried as caption with the translation/archaeological dispute disclosed, not resolved by the render. `vp-gihon-slope` available for inspection. |
  | `b-city-of-david` | 5:7, 5:9 | Staged: the stronghold renamed "the city of David"; the Millo referenced by caption as a named-but-unidentified feature. `vp-city-of-david`.                                                                                                    |
  | `b-growth`        | 5:10     | Card: "David became greater and greater, for the LORD... was with him." No geometry beyond the card.                                                                                                                                            |
  | `b-hiram`         | 5:11–12  | Staged: timber delivery and construction coda. `vp-hiram-works`; disputed palace-identification handled per Resolved design calls.                                                                                                              |
  | `b-household`     | 5:13–16  | Closing card: the Jerusalem-born-children list, card-only.                                                                                                                                                                                      |
  | `b-close`         | —        | Closing card: forward pointer to `rephaim-valley` only (in-milestone pointer). **No 2 Sam 5:17+ content depicted.**                                                                                                                             |

## Performance target

- ≈ 80–120 high-tier figures; new terrain system (first Jerusalem
  `TerrainSpec`) is the main new engine cost, not figure count. One
  `InstancedMesh` per repeated family, matching every prior scene's
  convention.
- Run `performance-reviewer` after the terrain lands, given it's a new
  regional system (not just new figures on a reused palette, unlike most
  scenes since M2) — same discipline as when `hebron-anointing` introduced
  the Judean-highland system.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay
empty in `scenes.ts` until they exist. **This scene's citations matter more
than any prior scene's — do not let placeholder claims outnumber cited ones
without a documented researcher-gap note, and do not silently upgrade any
of the disputed items below past `low` confidence.**

- **New, narrated (basis `biblical-text`):** `claim-jerusalem-capture`
  (5:6–7, the march, taunt, and capture); `claim-city-of-david-naming`
  (5:7, 5:9, the renaming and the Millo reference — notes must state the
  Millo is a named-but-unidentified feature, not render it as a specific
  structure); `claim-davidic-growth` (5:10); `claim-hiram-alliance`
  (5:11–12); `claim-jerusalem-household` (5:13–16, card-only, notes state
  no staging).
- **New, geography/identification (basis likely `scholarly-reconstruction`
  or `comparative-ane`, confidence `moderate` for the general site location,
  `low` for anything specific):** `claim-jerusalem-site-identification`
  (the southeastern ridge/City of David general location — this part is
  genuinely not seriously disputed among scholars and can land at
  `moderate`/`high` confidence with a citation, likely `rainey-notley-2006`
  or a dedicated Jerusalem-archaeology source card the researcher pass
  should add); `claim-jerusalem-stronghold-form` (**must stay
  `design-placeholder`** — no citable consensus on 10th-century BCE
  fortification specifics exists to upgrade this, per the "high/low
  chronology" dispute noted above; do not upgrade without a researcher pass
  finding a genuinely citable, non-partisan source, and even then it likely
  needs `scholarlyViews` rather than a single confidence value).
- **New, contested (basis `scholarly-reconstruction`, confidence `low`,
  `scholarlyViews` required, not optional):** `claim-jerusalem-water-system`
  (the ṣinnôr/Warren's Shaft dispute — at minimum two views: the
  traditional Warren's-Shaft-infiltration reading, and the
  Reich-and-Shukron-informed skeptical reading that the shaft wasn't a
  functioning Iron Age water-access route and/or that ṣinnôr's meaning is
  itself unsettled); `claim-davidic-palace` (the Large Stone
  Structure/Eilat Mazar identification — at minimum two views: Mazar's own
  published identification, and the Finkelstein/Ussishkin-line skepticism
  on dating and function; **do not build this claim's render as if either
  view were the settled account** — the coda staging in Resolved design
  calls above already keeps the geometry generic enough not to need
  resolving this to build).
- **New, design (basis `design-placeholder`):** `claim-jerusalem-capture-scale`
  (the disclosed defender/assault-force/builder counts above).
- **Characters:** reuse `david`, `davids-band`. New light entries:
  `jebusite-defenders` (group character, no invented named individuals —
  the text names no Jebusite defender); `hiram-of-tyre` (referenced-only —
  the text names Hiram but does not stage him personally arriving; his
  builders are the staged group, he himself is a referenced political
  actor, same register as `mephibosheth`'s referenced-only entry in
  `hebron-reckoning`).
- **Location:** new `LocationEntry`, id `jerusalem` (or a more specific id
  if the implementer prefers `city-of-david`, but `jerusalem` matches how
  `hebron`/`gibeon`/etc. are named for their broader place, not their
  specific excavated feature) — `identification.disputed: false` for the
  general site (southeastern ridge), but the entry's `summary`/claim links
  must make clear that "not disputed" describes _location_, not
  _what David's Jerusalem looked like_, which is exactly what the
  claims above carry as contested.
- **New source cards (researcher-gap, non-blocking to build but blocking
  to `released`):** the project has no dedicated Jerusalem/City of David
  archaeology source card yet. A `researcher` pass should add at least one
  covering (a) the general site identification, (b) the Reich-and-Shukron
  water-system re-survey findings, and (c) the Eilat Mazar Large Stone
  Structure publication plus at least one critical response (Finkelstein
  or Ussishkin) — without (c) specifically, `claim-davidic-palace` cannot
  cite a second view by name and must stay more heavily hedged
  ("critics dispute the dating and function" without a named critic) until
  that pass runs.
- **ESV excerpt budget:** `2sam-5` is shared across all three M6 scenes;
  this scene is the heaviest user — likely 5:6's taunt and 5:9's naming, at
  minimum. Check `hebron-unification`'s spend before finalizing wording/
  count here.

## Placeholder policy

- **Allowed placeholders:** stronghold exact wall/gate form; the
  infiltration route's exact staging (if any is shown); lighting hour;
  Jebusite-defender and assault-force exact counts and positions; the
  building coda's exact structure form (explicitly _not_ labeled as "the
  palace" or tied to a named excavated structure).
- **Not allowed:** rendering Warren's Shaft, the Stepped Stone Structure, or
  the Large Stone Structure by name as settled Davidic-era features; a
  literal blind-and-lame defender tableau; any Solomonic-era or
  Temple-Mount geometry; any named individual Jebusite defender; staging
  Hiram himself as physically present; any Rephaim/Philistine content or
  foreshadowing; a single silently-chosen confidence value on the
  water-system or palace-identification claims where `scholarlyViews` is
  required instead; any 2 Samuel 5:17+ content beyond the closing pointer
  card; any content past 2 Samuel 5 in any form.
