# Scene brief — Hebron, anointing over Judah (`hebron-anointing`, M4)

World-director pass, Fable, 2026-07-20. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second scene of Milestone 4 (queue #18, ADR-013
scoping pass; brief 2/3, after `ziklag-lament-brief.md`).

Scope guard: this brief covers **2 Samuel 2:1–7 only** — the inquiry ("Shall I
go up?… To Hebron"), the move with the two wives and the men with their
households, the men of Judah anointing David king over the house of Judah, and
the message to Jabesh-gilead commending the burial of Saul. It is **one scene
with multi-beat structure** (queue #18: a separate arrival scene was rejected
as scope inflation). 2 Samuel 2:8–11 (Ish-bosheth, Mahanaim, the territories)
is **atlas-tier per ADR-013** — closing-card and map-layer material, never
staged here. The pool of Gibeon (2:12–32) is `gibeon-pool` territory. This is a
**new settlement build at a new location** — nothing in `src/scenes/` supplies
its geometry, and per queue #1's rider the Ziklag ring plan is **not a
template**: Hebron re-establishes its own period/regional appropriateness with
its own claims. `depictsDeath: false` — no violence in any beat, no advisory,
no standard/reduced split; the register is restrained transition, not aftermath.

## Historical intent

The observer should come away understanding four things:

1. **"Go up" is literal.** From Ziklag's semi-arid Negev fringe, Hebron is a
   hard climb into the southern Judean highlands — at roughly 900+ m, among
   the highest towns in the region. The project's settlement scenes so far
   have been Negev frontier (Ziklag), a Jezreel-edge tell (Beth-shan), and a
   Gilead wadi village (Jabesh); this is the first **Judean hill-country
   town**, and the observer who walked Ziklag's loess should feel the change:
   terraced limestone slopes, olives and vines, high horizons. David's move
   from Philistine-orbit frontier to the Judahite heartland **is** the
   political event, rendered as geography.
2. **This is a tribal elevation, not a royal coronation.** "The men of Judah
   came, and there they anointed David king over the house of Judah" (2:4) —
   one tribe, by its own men, in an ordinary hill town. No crown, throne,
   dais, palace, or court exists in the text or the archaeology of this
   moment; kingship over all Israel is five chapters and (per 2:11; 5:5)
   about seven and a half years away. The scene's restraint is the historical
   statement: study text frames this as the second of David's three
   anointings (1 Sam 16:13 private; 2 Sam 2:4 Judah; 2 Sam 5:3 all Israel).
3. **The kingdom begins as a settled community, not a court.** David comes up
   "with his men who were with him, everyone with his household," and they
   dwell "in the towns of Hebron" (2:3) — the text itself disperses the six
   hundred into the surrounding settlements rather than packing them into
   one town. The observer should read a population arriving and thinning out
   into a landscape, not a garrison occupying a citadel.
4. **The first royal act is a message, not a battle.** David's word to
   Jabesh-gilead (2:5–7) closes the loop the project rendered at
   `jabesh-burial`: he blesses their loyalty to Saul and announces his own
   anointing. It is diplomacy toward Saul's most loyal town — reaching for
   the north with words while Abner raises a rival king (closing card,
   ADR-013 map layer). The Jabesh events are **referenced, never re-staged**.

## Resolved design calls (this pass)

- **Settlement form — terraced highland hill-town, schematic, at an
  identified site. Not the Ziklag ring.** Hebron follows the Beth-shan
  precedent (secure identification, thin period-specific published record →
  schematic town massing, disclosed), not the Ziklag precedent (unlocated →
  generic composite). Form: stone-socle rectilinear houses (fieldstone base,
  mudbrick-and-timber upper implied at massing fidelity, flat roofs) stepped
  on agricultural/structural terraces along the upper slopes of a rounded
  spur; a simple gate area on the ascent road serving as the civic open
  space; no orthogonal planning, no enclosed-ring geometry. Iron I /
  early-IIA occupation at Tell Rumeida is attested but thinly published —
  the layout is explicitly schematic (`claim-hebron-town-form`, confidence
  low for specifics, with the site identification itself high). **ADR-006
  queue-#8 note: this is not a second enclosed-ring consumer — the
  settlement-layout extraction trigger does not fire.** Layout module still
  follows ADR-006 conventions (seeded spec arrays, not meshes).
- **The old wall — render the Middle Bronze megalithic line as a weathered
  relic, gated on a source card.** Tell Rumeida's excavated MB II cyclopean
  fortification is archaeologically real and its massive masonry would have
  been physically present in the Iron Age; whether it still functioned as a
  defense at this date is the uncertain part. Render **partial weathered
  megalithic wall segments** along stretches of the perimeter — an old wall
  standing in ruin/reuse, not a crisp functioning circuit — with the
  reuse-vs-relic question carried as `scholarlyViews` on
  `claim-hebron-old-wall` (hedged attribution, `TO VERIFY`). **Gate:** this
  element ships only if a checkable Hebron-archaeology source card lands at
  build (see Required source basis); the fallback if verification fails is
  to **omit the wall entirely** (anachronism discipline: omission over
  invention) — the composition below must read without it.
- **Anointing staging — open-air at the gate space, oil, an anonymous elder,
  nothing else.** Narrated: the men of Judah as collective actor, the
  anointing itself (2:4a). Reasonably inferred: oil poured on the head from
  a horn or flask (the verb's meaning; 1 Sam 10:1; 16:13; 2 Kgs 9:6 as the
  rite's attested form — `claim-anointing-rite-form`, basis `biblical-text`
  - `comparative-ane`); an open civic venue, staged at the gate area (the
    standard town civic space, cf. Ruth 4 — venue choice disclosed as
    placeholder). The one who pours is an **anonymous elder of Judah** — the
    text says only "they anointed"; no invented officiant identity, and
    explicitly **not Abiathar** (priestly officiation is unstated). David
    kneels or stands with head bowed; the assembly stands. **Prohibited in
    any form: crown, throne, dais, platform, palace or royal architecture,
    procession, trumpet blast, acclamation choreography, or any
    triumphal/ceremonial pageantry beyond the pour and the standing
    assembly.** ADR-011: no win-state framing — the caption notes the rival
    kingship forming in the north.
- **The inquiry is speech, not staged in place.** 2:1's inquiry precedes the
  journey (from Ziklag, contextually) and does not name its instrument; the
  ephod/Abiathar pattern is established from 1 Sam 30:7–8 but is **not
  asserted for this inquiry** — no ephod prop staged. The inquiry and its
  answers are carried by caption on the ascent beat
  (`claim-go-up-inquiry`), with the pattern cross-referenced in study text.
- **The two wives — named principals at the arrival, nothing invented
  after.** 2:2 names them with epithets ("Ahinoam of Jezreel," "Abigail the
  widow of Nabal of Carmel"); they have existed narratively since M2 only
  inside `people-of-ziklag`'s description. Add **`ahinoam` and `abigail` as
  person entries** — the project's first named, individually rendered women
  — at principal tier in the ascent/arrival beats, positioned with the
  household column near David. Their presence at the anointing itself is
  unstated: they are **not focal** in that beat (background at most), and
  they get no invented dialogue, gestures, or dress distinctions beyond the
  shared `claim-dress` treatment (queue-#11 precedent).
- **Dispersal carried by staging and caption, not modeled hamlets.** The
  "towns of Hebron" (2:3) are not built: the arrival column visibly thins —
  household groups peeling off along terrace paths toward the slopes and
  off-scene — with the caption stating the dispersal
  (`claim-households-dispersal`). No satellite village geometry.
- **Jabesh message — oral, by messengers, departure only.** Messengers in
  this period carry spoken words; **no scroll or writing prop** (an
  administrative-literacy assertion the text doesn't make). Two to three
  anonymous figures from the band are charged by David and depart through
  the gate on the north road; the message content is paraphrase + one short
  excerpt (below). The reception at Jabesh is **not rendered** — no reuse
  of `jabesh-burial` geometry; `claim-jabesh-retrieval` and the
  `men-of-jabesh` character are referenced (study/label cross-links to the
  released scene), not staged. No new messenger entity (anonymous, per the
  no-invented-identity precedent).
- **Time compression disclosed.** 2:1–7 spans an unstated stretch (the move,
  the coming of the men of Judah, the news, the dispatch); the scene
  compresses it into one continuous daylight staging. Hour unstated → single
  clear-day arc (morning ascent → midday anointing), ordinary daylight by
  design — **no golden-hour glory lighting**; the restraint is tonal policy
  (`claim-hebron-hour`, compression + hour both disclosed as placeholder).
- **ESV excerpt budget plan** (`integrity.test.ts`: ≤3 spans, ≤200 chars
  each, ≤500 total in beat captions): (1) the answer **"To Hebron."** (2:1,
  ascent beat); (2) **"And the men of Judah came, and there they anointed
  David king over the house of Judah."** (2:4a, anointing beat); (3) **"May
  you be blessed by the LORD, because you showed this loyalty to Saul your
  lord and buried him."** (2:5, message beat). That exhausts the span
  budget — everything else, including 2:7's kingship announcement, is
  paraphrase or reference.

## Visual composition

- **Terrain:** a rounded highland spur with a saddle, procedural heightfield
  (ADR-012: DEM refinement is a permitted future pass, source card first),
  ~900 m character carried by high horizon lines of successive hill ridges,
  exposed limestone, terraced slopes. Distinctly not Negev loess, not a
  Jordan-valley tell: gray-white stone, deeper greens.
- **Focal masses:** (a) **the town** — terraced house cluster on the upper
  slope, the scene's crown, readable as old and ordinary (weathered
  megalithic wall stretches, if sourced, giving it age); (b) **the gate
  space** — the open ground where the anointing happens, mid-slope on the
  ascent road, the scene's still center; (c) **the ascent road** — the
  southern approach axis, carrying the arrival column up through terraces
  and olive groves; (d) **agriculture** — olive terraces, vine plots, grain
  patches wrapping the slopes, doing the "settled heartland" work that
  Ziklag's burned fields could not.
- **Sightlines:** from the gate space (default viewpoint) the observer holds
  David, the pouring elder, and the assembled men of Judah in one frame with
  the terraced town rising behind — rite, community, and place in a single
  view. From the ascent road, the town crowns the skyline above the climbing
  column. From the overlook above the town, roofs step down toward folded
  hill country — the atlas establishing shot of highland Judah.
- **No monumental or royal silhouette.** Nothing in the massing may read as
  citadel, palace, or shrine; the largest structures are houses. The old
  wall, if present, reads as inheritance, not power.
- **Lighting arc:** clear morning (ascent/arrival) → high, plain midday
  (anointing, news, dispatch). Deliberately the brightest, most open scene
  of M4 — the counterweight to `ziklag-lament`'s dusk — without triumphal
  color grading.

## Scale assumptions

- **David's band:** the narrated six hundred (`claim-600-men`) at the
  standard disclosed ~1:10 ratio (register #7) ≈ **~60 male figures** in the
  arrival column, plus **~20–25 household figures** (women, children — an
  explicitly thinned, uncounted representation; the text counts no
  households). The column thins across the arrival beat via dispersal.
- **Men of Judah:** narrated as a collective, never counted — **~30–40
  assembly figures** at the anointing, a disclosed placeholder count (no
  ratio math applies to an uncounted crowd).
- **Hebron townspeople:** **~15–20** ambient figures on terraces and lanes.
- **Principals:** David (marker treatment), Ahinoam, Abigail, Abiathar
  (present with the band, non-officiating), the anonymous anointing elder,
  2–3 departing messengers ≈ **7–8**.
- Peak (arrival overlap) ≈ **110–130 figures** high tier; the anointing beat
  frames ~80–90. Comparable to `ziklag-lament`, well below Gilboa.

## Camera / observer experience

- **Default viewpoint** (`vp-gate-assembly`): edge of the gate space,
  slightly elevated, holding David, the elder, and the men of Judah against
  the terraced town.
- Additional viewpoints: **the ascent road** (`vp-ascent-road`, low on the
  southern approach — walk-mode emphasis; the climb is the point);
  **the overlook** (`vp-overlook`, above the town looking south over roofs
  and terraces to the hill country — the atlas shot); **the north road**
  (`vp-north-road`, the messengers' departure axis, framing the dispatch
  and the closing card's turn toward the north).
- Suggested duration ~150s; pacing guidance: **the anointing beat holds
  longest**; ascent and dispatch are compact — do not default to even
  spacing. `depictsDeath: false` — no advisory. ADR-007 applies: pure pose
  functions, scrub-safe, beat-invariant test required.
- **Timeline beats** (no violence in any beat; standard and reduced modes
  are identical throughout — single staging column):

  | Beat               | Text  | Staging                                                                                                                                                                                        |
  | ------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-ascent`         | 2:1–2 | the column climbing the southern road, town on the skyline; the inquiry and answer carried by caption (instrument unasserted; "To Hebron." excerpt); Ahinoam and Abigail with David            |
  | `b-arrival`        | 2:3   | the column reaches the gate area and visibly thins — household groups peel off toward terraces and off-scene; caption states the dwelling "in the towns of Hebron"                             |
  | `b-anointing`      | 2:4a  | the men of Judah assembled at the gate space; an anonymous elder pours oil over David's head; the assembly stands; 2:4a excerpt; caption notes second-of-three anointings, Judah only          |
  | `b-jabesh-news`    | 2:4b  | speech beat — David is told it was the men of Jabesh-gilead who buried Saul; caption cross-references the released `jabesh-burial` events, **not re-staged**                                   |
  | `b-jabesh-message` | 2:5–7 | David charges 2–3 messengers; they depart the north road; blessing excerpt + paraphrase of the kingship announcement (2:7); closing card → 2:8–11 rival kingship (map layer, ADR-013) → Gibeon |

- Walk mode should reward the terraces themselves: the ascent road, terrace
  paths between olive rows, the wall relics (if sourced), the gate space —
  embodied highland geography is this scene's discovery content.

## Performance target

- Budgets per `QUALITY_PROFILES`; target **≤ `ziklag-aftermath`'s per-tier
  draw calls**. No particle systems at all (first M4 scene with none). One
  `InstancedMesh` per repeated family (house, terrace wall segment,
  megalithic wall segment, figure bucket, olive, vine row, scrub, rock,
  prop). Terrain single mesh, procedural.
- Static single-directional + hemisphere lighting rig with at most a
  keyframed morning→midday mutation (jabesh-burial precedent); no new
  real-time lights; shadow budget unchanged.
- Run `performance-reviewer` after the first geometry slice; treat any
  regression against `ziklag-aftermath`-class scenes as a bug.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates the scene's
`claimIds`/`assetIds` then — the `SceneDef` arrays stay empty until they
exist. All captions paraphrase except the three budgeted excerpts above.

- **Blocking research item:** a **Hebron / Tell Rumeida archaeology source
  card** (candidates: Avi Ofer's excavations/survey publications or NEAEHL
  entry; Jeffrey Chadwick's Tell Rumeida work; Emanuel Eisenberg's salvage
  excavations — attributions here are from general knowledge, **not
  page-verified in this environment**; a `researcher` pass at build must
  land at least one checkable card with honest `confidenceNotes`/`TO
VERIFY` hedges). This card gates `claim-hebron-town-form`'s
  archaeology-basis wording and the old-wall element entirely. **Fallback if
  no card can be verified:** town form drops to `design-placeholder`
  (disclosed schematic, Beth-shan-style wording without the excavation
  citations) and the megalithic wall is **omitted** — the scene still ships.
- **Existing, reuse:** `claim-600-men`, `claim-david-historical`,
  `claim-dress`, `claim-chronology`, `claim-four-room` (highland pillared
  houses — a stronger fit here than at Ziklag; extend `notes` accordingly),
  `claim-jabesh-retrieval` (recap basis for 2:4b). Existing source cards:
  `rainey-notley-2006` (identification, geography), `faust-2012`,
  `king-stager-2001`, `borowski-1987` (highland agriculture), `esv-bible`.
- **New, setting:** `claim-hebron-identification` (Tell Rumeida, basis
  `scholarly-reconstruction`, high — mirrors the location entry);
  `claim-judean-highland-terrain` (elevation ~900+ m, limestone, terraced
  slopes, Mediterranean scrub/olive/vine cover — basis
  `scholarly-reconstruction`, high for landforms, with the ancient-cover
  caveat per `claim-negev-terrain`'s pattern and ADR-012's procedural-DEM
  note); `claim-hebron-town-form` (schematic terraced hill-town, Iron
  I/early-IIA occupation attested but thinly published — confidence low for
  specifics, disclosure explicit); `claim-hebron-old-wall` (MB cyclopean
  fortification real; Iron-age functional status disputed —
  `scholarlyViews`: continued-use reading vs. relic/ruin reading, both
  hedged `TO VERIFY`; ships only with the source card above);
  `claim-hebron-agriculture` (olive/vine/grain terraces; the region's later
  grape association noted in `notes` as tradition, not asserted — basis
  `archaeology`/`comparative-ane`, moderate); `claim-hebron-hour` (hour and
  single-day compression both `design-placeholder`, speculative).
- **New, narrated (basis `biblical-text`):** `claim-go-up-inquiry` (2:1–2 —
  inquiry and answer; instrument unstated, 1 Sam 30:7–8 pattern
  cross-referenced in `notes`, not asserted); `claim-households-dispersal`
  (2:3 — the men and households dwell "in the towns of Hebron"; supports
  the thinning-column staging); `claim-hebron-anointing` (2:4a — narrated;
  `notes`: one tribe only, no regalia narrated or attested, second of three
  anointings, rival northern kingship forming per 2:8–11);
  `claim-anointing-rite-form` (oil poured on the head from horn/flask per
  the rite's attested form in 1 Sam 10:1; 16:13; 2 Kgs 9:6; venue at the
  gate space and the anonymous elder disclosed as placeholder choices —
  split basis stated honestly); `claim-jabesh-message` (2:4b–7 — the news,
  the blessing, the kingship announcement; oral-messenger convention noted
  `comparative-ane` in notes; no writing asserted).
- **Characters:** reuse `david` (extend `passageRefs`), `davids-band`,
  `abiathar` (present, non-officiating), `people-of-ziklag` (the households
  — extend `passageRefs`/description for the move at build); reference
  `men-of-jabesh` (not staged). **Add:** `ahinoam` (person — Ahinoam of
  Jezreel), `abigail` (person — Abigail, widow of Nabal of Carmel),
  `men-of-judah` (group — the anointing assembly; the anonymous elder is a
  staging role within it, not an entity).
- **Assets (reuse):** `asset-figure-procedural`, `asset-david-marker`,
  `asset-olive-tree`, `asset-rocks`, `asset-gate-simple`,
  `asset-field-plots`, `asset-vegetation-gilead` (Mediterranean-scrub
  palette — reuse or lightly vary for the highlands; build call, disclose
  either way). **New (placeholders with `whyTemporary`):**
  `asset-terrain-hebron-hill`, `asset-highland-house` (stone-socle massing
  — distinct from the mudbrick `asset-house-block`), `asset-terrace-walls`,
  `asset-megalithic-wall` (only if sourced), `asset-oil-vessel` (horn/flask
  small prop), `asset-vineyard-plots`. Optional: `asset-pack-donkeys`
  reused in the arrival column (unnarrated baggage animals — allowed as a
  disclosed plausibility placeholder, or omitted; build call).

## Placeholder policy

- **Allowed placeholders:** the schematic town layout (house count, lane
  plan, terrace geometry); the gate-space venue for the anointing; the
  anonymous elder's staging; the oil-vessel form; hour and single-day
  compression; men-of-Judah and household figure counts; highland
  vegetation palette; pack animals in the column (if used); the weathered
  state of the megalithic wall (if sourced).
- **Not allowed:** crown, throne, dais, platform, palace, or any royal/
  monumental architecture; procession, trumpet, acclamation choreography,
  or triumphal lighting/music framing (ADR-011 — no win-state staging); a
  named or priestly officiant (no Abiathar-as-anointer); an ephod prop or
  any asserted inquiry instrument for 2:1; a scroll/writing prop for the
  message; rendering the Jabesh reception or any reuse of `jabesh-burial`
  geometry; staging 2:8–11 (Mahanaim/Ish-bosheth) in any visual form beyond
  the closing card (ADR-013); modeled satellite "towns of Hebron"; the
  megalithic wall without its source card; invented dress distinctions for
  Ahinoam/Abigail; on-screen distance or travel-time figures for the ascent
  or the messengers' journey (register #2 precedent); patriarchal-tradition
  sites (Mamre, Machpelah) as geometry — study-text mention only.
