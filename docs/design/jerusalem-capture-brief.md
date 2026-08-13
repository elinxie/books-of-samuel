# Scene brief — the capture of Jerusalem and David's house (`jerusalem-capture`, M6)

**PROVISIONAL — Fable unavailable this session (monthly spend limit hit on the
first `fable-architect` call).** Written by Sonnet standing in for the
`world-director` role under `docs/model-handoff.md`'s documented fallback
policy. Tracked in `docs/fable-review-queue.md` (new M6 item) — needs a real
Fable read before any part of this is treated as final creative direction,
and before this scene ships past `in-progress`. Implementation:
Sonnet/`threejs-engineer` within this direction; deviations that change
historical meaning go back through the queue. First scene of Milestone 6.

Scope guard: this brief covers **2 Samuel 5:1–16**, with staged action at
**5:6–12** (the capture and the house Hiram builds). 5:1–5 (all-Israel comes
to Hebron, cites the "shepherd my people" oracle, covenants with David, and
anoints him a third time — over all Israel) and 5:13–16 (the wives/concubines
and sons born at Jerusalem) are delivered as **context cards**, not staged:
5:1–5 happens at Hebron, a location already fully built across three M4/M5
scenes, and this brief judges five verses of assembly-and-anointing — thinner
even than `hebron-covenant`'s already-modest M5 precedent — not worth a
fourth Hebron scene; 5:13–16 is a list with no site-specific action. **Nothing
from 2 Samuel 5:17 onward (the Philistine wars) or 2 Samuel 6 onward (the ark
procession) may appear, depicted or textually foreshadowed** — the ark's
arrival in Jerusalem is the next milestone's subject and must not be
previewed here even as a forward pointer beyond a bare "what comes next" text
note.

**This is the most archaeologically contested site the project has built
yet.** Every other identified location so far (Hebron, Gibeon, Beth-shan,
Gilboa) has debate about **content** (town form, wall dating, headdress
attribution) but not about whether the identification itself is secure.
Jerusalem's location is not remotely in question — it is the one thing in
this brief that is _not_ disputed. What is genuinely, actively disputed among
excavators is **the size, character, and even existence of a distinct
10th-century BCE settlement there** — whether 2 Samuel 5's Jerusalem was a
real regional capital or a small hill town later retrojected into one. Treat
this with at least as much care as the Beth-shan wall/Gibeon pool dating
questions, not more casually just because the site itself is famous and
secure.

## Historical intent

The observer should come away understanding four things:

1. **The site's identification is certain; the 10th-century settlement's
   scale and character are not — and the scene must hold both facts legibly
   at once.** Do not let the observer read "Jerusalem" as automatically
   meaning a great capital city. The scene's default framing should be
   deliberately modest — a hill spur, a wall, a stronghold taken and then
   built up from, not a skyline. Any grander reading belongs to the disputed
   `scholarlyViews`, not to the base render.
2. **The capture itself is narrated with almost no combat detail — treat
   that thinness honestly rather than inventing a siege.** 5:6–7 gives two
   verses: the Jebusites' taunt that "the blind and the lame will turn you
   back," and then simply "nevertheless, David took the stronghold of Zion."
   No breach is described, no casualties are named, no duration is given.
   This is categorically different from `gibeon-pool`'s detailed champions'
   contest or `gilboa-battle`'s death sequence — there is nothing here to
   choreograph. **`depictsDeath: false`** for this scene; render the capture
   as a swift, narrated event (approach, a brief contested threshold, the
   stronghold held), not a staged siege or breach sequence with invented
   combat beats.
3. **The obscure "blind and lame" line is disputed and should not be
   visualized as content — only narrated as text.** Reputable readings
   include: a Jebusite taunt that their walls were so strong even disabled
   defenders could hold them; apotropaic figurines or images of the blind and
   lame set on the walls as protective/mocking images (a documented ANE
   practice in some readings); and a later editorial aside explaining why "the
   blind and the lame" were barred from "the house" (5:8b, likely a later note
   about temple access, not a Davidic-era statement at all). **Do not stage
   disabled figures — real, symbolic, or otherwise — anywhere in this scene.**
   The line is textually obscure and its content is not something this
   project should render even abstractly; carry it as a caption plus
   `scholarlyViews`, nothing visual.
4. **Two real historical anchors — the Tyre alliance and the "LORD has
   established him" line — are comparatively solid ground and deserve
   confident staging.** Phoenician cedar-and-labor exchange for royal
   building projects is a well-attested ANE pattern (cf. later, better-
   documented Solomon-Hiram exchanges); render Hiram's gift straightforwardly
   as timber, carpenters, and masons arriving, not hedged the way the
   settlement-extent question must be.

## Resolved design calls (this pass)

- **5:1–5 is a context card, not a scene.** All-Israel's covenant and
  anointing happens at Hebron — already built, already released, three scenes
  deep. Restaging it a fourth time for five verses of assembly action would
  duplicate `hebron-covenant`'s and `hebron-anointing`'s own visual argument
  (a gathered assembly ratifying David) without adding anything the observer
  hasn't already seen done more thoroughly. The card should state plainly that
  this is David's **third** anointing (house of Judah alone, 2:4; then this
  one, over all Israel) and cross-reference `claim-judah-anointing` and the
  `/atlas` M5 phase's own explicit forward pointer to this exact verse (see
  `AtlasPage.tsx`'s M5 lede, which already defers "the all-Israel anointing…
  belongs to 2 Samuel 5"). The oracle citation ("you shall shepherd my people
  Israel," 5:2, echoing 1 Sam 16's earlier private anointing) belongs in the
  card's caption text, not staged as a flashback.
- **The Joab-up-the-water-shaft detail is a Chronicles-only addition, not a 2
  Samuel fact — do not stage it as settled.** 1 Chronicles 11:6 names Joab as
  first to strike the Jebusites, winning him the command; 2 Samuel 5 itself
  names no one. This project's passages are anchored to 1–2 Samuel
  specifically (`Passage.book` only accepts those two books); Chronicles
  material may be mentioned as an informational cross-reference in a claim's
  `notes`, never as a staged, attributed action and never as an ESV-quoted
  excerpt. Do not render any figure "climbing a shaft" as a named, credited
  act.
- **"The water shaft" (5:8, Hebrew _tsinnor_) is not identified with Warren's
  Shaft as settled fact.** Older popular treatments (and some older
  scholarship) linked this verse directly to the excavated shaft/tunnel
  system Charles Warren found in 1867; that specific identification is now
  widely doubted (translation of _tsinnor_ itself is disputed — a water
  channel/tunnel, or possibly a weapon/grappling implement, are both argued),
  and Warren's Shaft's own function and date are independently contested in
  the excavation literature. Carry this as `scholarlyViews`, not a rendered
  water-system feature tied to any specific excavated shaft.
- **The Millo (5:9) is a term of uncertain physical referent — do not render
  a specific "the Millo" structure.** Some readings tie it to the Stepped
  Stone Structure/terrace system found on the City of David's eastern slope;
  others read it as a generic term ("filling") for a terracing or
  infill-construction technique without a single fixed excavated referent.
  Stage "built the city all around, from the Millo inward" (5:9b) as generic
  terracing/building activity at the settlement's edge, not as a labeled,
  singular monument.
- **Do not adopt Eilat Mazar's "Large Stone Structure" = "Palace of David"
  identification as settled fact anywhere in this scene — geometry, captions,
  or claim `statement` text.** This is a live, actively contested proposal
  (see Required source basis), not a consensus reading. If any structure in
  this scene is meant to evoke "David's house" (5:11), it must be captioned
  as a disclosed, deliberately unspecific placeholder — a modest
  cedar-and-stone dwelling appropriate to Hiram's gift — never labeled or
  geometrically detailed as a confirmed excavated palace.
- **Render the settlement itself conservatively — modest, not monumental —
  as the honest middle path given the dispute, not a silent endorsement of
  the minimalist reading.** The claim's `notes` must say explicitly that this
  choice is deliberate restraint given genuine dispute, not a verdict that
  the minimalist view is correct. A future researcher/Fable pass may revise
  this if citation work changes the picture; it should not be revised by
  quietly making the render bigger without a documented reason.

## Visual composition

- **Terrain:** a new regional variant — the City of David ridge: a narrow,
  steep-sided spur running north–south above the Kidron valley, with the
  Gihon spring at its eastern foot (referenced in the terrain form, not
  rendered as its own labeled water feature unless a later claim supports
  it). Use ADR-005's existing `ridge` `TerrainSpec` kind (already used
  elsewhere in the engine) rather than inventing a new terrain primitive —
  this site is geomorphologically exactly what that primitive already models.
  Palette: Judean highland stone, consistent with Hebron's established
  palette family but rockier/steeper, no terracing/olive groves (this is a
  defensive ridge-top site, not agricultural hill country).
- **Focal masses:** (a) **the approach** — David's men coming up from the
  south/Hebron direction, echoing `hebron-anointing`'s and
  `hebron-covenant`'s road-approach convention; (b) **the stronghold** — a
  modest walled/terraced high point on the ridge (Zion), taken in the
  capture beat; (c) **the expanding settlement** — modest building activity
  spreading inward/downward from the high point, staging 5:9's "built all
  around, from the Millo inward" as ongoing construction rather than a
  finished city; (d) **the timber delivery** — Hiram's cedar, carpenters, and
  masons arriving, a distinct smaller set piece (not a full construction
  site, just the delivery and the beginning of building David's house).
- **Sightlines:** default vantage looks up at the ridge from the southern
  approach, so the modest scale of the stronghold reads honestly against the
  observer's likely prior expectation of "Jerusalem" as something grander —
  compose this contrast deliberately. A second vantage holds the Kidron-side
  view (steep slope, spring referenced below), useful context for why this
  spur was defensible. No monumental skyline framing anywhere.
- **Lighting:** daytime; hour unstated — default clear midday light, disclosed
  `design-placeholder`, matching the project's standard treatment for
  unstated timing in non-violent civic/political scenes.

## Scale assumptions

- **David's men:** reuse the established ~600 at the standard ~1:10 ratio →
  ~60 figures (`claim-600-men`, reused by reference).
- **Jebusite defenders/inhabitants:** the text gives no count. No combat
  detail exists to size a defending force against, so render a small, modest
  ambient presence (≈15–25 figures) legible as "a fortified hill town's
  population," not a garrison staged for a fight that the text doesn't
  narrate.
- **Hiram's delegation:** small and specific — carpenters and masons, no
  count given; render as a distinct small work party (≈10–15 figures), not a
  crowd.
- **High-tier total ≈ 85–100 figures** — smaller than any prior M4/M5 crowd
  scene, consistent with this being a capture-and-building narrative with no
  assembly, no battle, and no funeral.
- Jerusalem's own settlement footprint at this period is **not asserted**
  beyond "a modest fortified ridge-top town, actively under construction" —
  see Required source basis; this is exactly the claim that needs the most
  careful, most conservative treatment in the whole brief.

## Camera / observer experience

- **Default viewpoint** (`vp-southern-approach`): the ridge seen from the
  Hebron-direction road, the "smaller than you expected" framing.
- Additional viewpoints: **the stronghold height** (`vp-zion-height`, close,
  where the capture beat and the Millo-inward building beat are staged);
  **the Kidron slope** (`vp-kidron-slope`, looking down/east, defensible-
  terrain context, spring referenced not rendered as a distinct feature
  unless a later claim supports doing so); **the timber delivery ground**
  (`vp-hiram-delivery`, where Hiram's gift and the house-building beat are
  staged).
- **Timeline beats** (`depictsDeath: false` — no violence; no ADR-009
  advisory needed; suggested duration ~160s):

  | Beat              | Text    | Treatment                                                                                                                                                                                                                                                                                                                               |
  | ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-all-israel`    | 5:1–5   | Opening context card: all Israel comes to David at Hebron, cites the shepherd oracle, covenants with him, and anoints him king over all Israel — David's third anointing. No geometry; cross-references `claim-judah-anointing` and the `/atlas` M5 pointer.                                                                            |
  | `b-approach`      | 5:6a    | Staged: David and his men come up toward the ridge. Default viewpoint.                                                                                                                                                                                                                                                                  |
  | `b-taunt`         | 5:6b    | Staged/caption-heavy: the Jebusites' taunt is delivered as text over a distant view of the fortified height — no disabled figures staged, no combat. `scholarlyViews` on the taunt's meaning surfaced here.                                                                                                                             |
  | `b-capture`       | 5:7     | Staged: the stronghold is taken — a brief, documentary-distance threshold moment (figures crossing into the height), not a breach sequence. No named individual credited (the Chronicles/Joab detail is not staged, see Resolved design calls).                                                                                         |
  | `b-water-shaft`   | 5:8     | Context card: the "water shaft" line and its disputed meaning, and the later editorial aside about "the blind and the lame." `scholarlyViews` surfaced; nothing rendered beyond the existing terrain.                                                                                                                                   |
  | `b-city-of-david` | 5:9     | Staged: building activity spreading from the height inward — the "Millo" building beat, generic terracing/construction, not a labeled monument. `vp-zion-height`.                                                                                                                                                                       |
  | `b-david-greater` | 5:10    | Caption beat: "David became greater and greater, for the LORD, the God of hosts, was with him." No new geometry.                                                                                                                                                                                                                        |
  | `b-hiram`         | 5:11    | Staged: Hiram's cedar, carpenters, and masons arrive; the beginning of David's house. `vp-hiram-delivery`.                                                                                                                                                                                                                              |
  | `b-perceives`     | 5:12    | Caption beat: David perceives the LORD has established his kingdom, exalted for Israel's sake. Closing sentiment of the capture-and-building arc.                                                                                                                                                                                       |
  | `b-household`     | 5:13–16 | Closing context card: more concubines and wives taken in Jerusalem; the sons born there listed as the text lists them (Shammua, Shobab, Nathan, Solomon, and the rest) — no forward commentary on any of them (Solomon's later role, Nathan the prophet's namesake confusion, Absalom's half-siblings, etc. all stay out). No geometry. |
  | `b-close`         | —       | Closing card: bare forward pointer to the next narrated events only (the Philistine response, 5:17–25, this milestone's other scene) — no 2 Samuel 6/ark content in any form.                                                                                                                                                           |

## Performance target

- Budget ≈ 85–100 high-tier figures (see Scale assumptions) — smaller than
  every M4/M5 crowd scene; mostly static/idle pose buckets (approach walk,
  ambient town, work-party idle), no combat animation needed.
- One `InstancedMesh` per repeated family: figure, ridge terrain, wall/
  terrace segment, construction-in-progress prop set (timber stacks, partial
  wall courses), cedar-log props for the Hiram beat. Reuse
  `asset-figure-procedural` and existing static/crowd pose-bucket
  infrastructure.
- No new lights, no water/fire systems. If the Gihon spring is referenced
  visually at all, treat it as a simple flat water-plane feature reusing
  `gibeon-pool`'s exact no-shader convention — do not build a new water
  system for a feature this brief does not require staging in detail.
- Run `performance-reviewer` once after the ridge terrain and stronghold
  massing land — expected to pass easily given the modest figure count.

## Required source basis (before geometry is built)

Sonnet creates these records at build time; `SceneDef`/location `claimIds`
arrays stay empty until they exist, per standing convention. **Candidate
sources below are named for a `researcher` pass to verify — none are
confirmed as cited yet; do not treat any of these attributions as settled
until that pass runs.**

- **Existing, reuse:** `claim-dress`, `claim-david-historical` (kingdom-scale
  framing — explicitly cross-reference this scene's own settlement-extent
  dispute as a specific instance of that wider debate), `claim-600-men`,
  `claim-judah-anointing` (the "house of Judah only" claim this scene's
  opening card explicitly resolves — "over all Israel" now).
- **New, identification (not disputed):** `claim-jerusalem-identification`
  (basis `scholarly-reconstruction`/`archaeology`, confidence high — the City
  of David ridge, secure through more than a century of excavation and
  unbroken toponymic continuity; candidate source: `rainey-notley-2006`,
  already used project-wide for standard identifications).
- **New, the load-bearing disputed claim:** `claim-jerusalem-10th-c-settlement`
  (basis `scholarly-reconstruction`, confidence **low**, mandatory
  `scholarlyViews` — do not collapse to one side):
  - A "substantial capital" / maximalist-leaning view: Eilat Mazar's City of
    David excavations, proposing a "Large Stone Structure" and adjoining
    "Stepped Stone Structure" as monumental 10th-century public
    architecture (her own popular/academic reports read this as consistent
    with a real United Monarchy capital). **Candidate source, unverified:**
    Eilat Mazar's excavation reports/monographs (e.g. her Shalem Press
    volumes on the City of David excavations) — page-verify before citing.
  - A "small town" / minimalist-leaning view: Israel Finkelstein's published
    critiques arguing 10th-century Jerusalem was thinly settled, that the
    Stepped Stone Structure's date is not securely tied to David's reign, and
    that a "United Monarchy capital" reading over-interprets sparse remains;
    Margreet Steiner's excavation-based skepticism (from her work on the
    earlier Kenyon-era City of David excavations) is a second, independent
    minimalist-leaning voice worth checking. **Candidate sources,
    unverified:** Finkelstein's Jerusalem-focused articles (e.g. on "the rise
    of Jerusalem" in the 10th century), Steiner's City of David excavation
    volumes/articles — page-verify before citing.
  - A middle-ground view: Jane Cahill's essay defending an earlier
    (Davidic-era-compatible) date for the Stepped Stone Structure on pottery-
    typology grounds against Finkelstein's critique — a direct, named
    scholarly exchange worth citing on both sides if verified; Nadav
    Na'aman's "cow town or royal capital" framing (a memorably-titled piece
    arguing for a real but modest administrative center, not either extreme).
    **Candidate sources, unverified:** Cahill's "Jerusalem at the Time of the
    United Monarchy" (in the Vaughn & Killebrew-edited volume on Jerusalem in
    Bible and archaeology, if this citation is verified accurately), Na'aman's
    Jerusalem/Iron Age Judah articles — page-verify before citing. Ann
    Killebrew (co-editor of that same volume) is a further candidate for a
    synthesizing/moderating citation.
  - Notes must state plainly: this project's render is a deliberately
    conservative middle path (a modest fortified ridge-top town, actively
    under construction) chosen because the dispute is genuinely live, not
    because either side has been adjudicated.
- **New, narrated (basis `biblical-text`):** `claim-all-israel-anointing`
  (5:1–5, confidence high — cross-references `claim-judah-anointing` as the
  earlier, partial anointing this one completes); `claim-jerusalem-capture`
  (5:6–7, confidence high for the narrated fact, explicitly low/no confidence
  for any combat detail since none is given); `claim-blind-lame-taunt` (5:6b,
  5:8b — `scholarlyViews` on meaning as described in Historical intent #3;
  explicitly states nothing is visualized); `claim-water-shaft` (5:8a —
  `scholarlyViews` on _tsinnor_'s meaning and the Warren's Shaft
  identification's contested status); `claim-millo` (5:9 — the generic-
  terracing reading vs. the Stepped Stone Structure identification, as
  `scholarlyViews`, cross-referencing `claim-jerusalem-10th-c-settlement`
  rather than duplicating it); `claim-hiram-alliance` (5:11a, confidence
  moderate-to-high — the Tyre cedar/labor exchange pattern is comparatively
  well-attested via later, better-documented Solomon-Hiram parallels;
  `comparative-ane` corroboration candidate: check `king-stager-2001` or a
  dedicated Phoenician-trade source for a citable parallel before upgrading
  past `biblical-text` alone); `claim-jerusalem-sons` (5:13–16, confidence
  high, context-card only — notes explicitly state no forward commentary on
  any named son is added).
- **New, design (basis `design-placeholder`):** `claim-jerusalem-town-form`
  (the deliberately conservative modest-settlement render — notes must state
  the restraint rationale explicitly, per Resolved design calls);
  `claim-davids-house-jerusalem` (the unspecified cedar-and-stone dwelling
  standing in for "David's house," 5:11b — explicitly not labeled or shaped
  as any specific excavated structure, and explicitly not adopting Mazar's
  "Large Stone Structure" identification); `claim-jerusalem-cast-scale` (the
  disclosed figure-count design choices above).
- **Characters:** reuse `david`, `davids-band`. No new named individuals are
  required by this scene's scope (Hiram is a political actor referenced by
  name in the text but does not need a full `person` entry unless the
  implementer judges a light entry useful for the inspector — if added, keep
  it minimal: id/name/kind/summary/passageRefs/claimIds only, no invented
  biography).
- **ESV excerpt budget:** `2sam-5` is a **shared passage** between this scene
  and `rephaim-valley` — check whether `rephaim-valley`'s build already
  populated `2sam-5.keyExcerpts` before adding anything here; the ≤3-quote/
  ≤500-char budget (ADR-003) is per-passage. Recommend this scene spend at
  most **one** short quote — 5:12 ("David knew that the LORD had established
  him king over Israel...") — and leave the remaining budget to
  `rephaim-valley`, which has more quotable material (5:20b, 5:24). Verify
  exact ESV wording and character counts at build time.

## Placeholder policy

- **Allowed placeholders:** Jerusalem's exact fortification form, footprint,
  and building layout (disclosed pending the researcher citation pass on the
  10th-century-settlement dispute above — do not adopt any single excavation
  proposal, maximalist or minimalist, as "the" plan); the Millo's physical
  form; "David's house"'s exact form (explicitly not the disputed "Large
  Stone Structure"); lighting hour; ambient-town composition; the exact
  course of the southern approach road.
- **Not allowed:** any staging of the "blind and the lame" taunt's content —
  no disabled figures, real or symbolic, anywhere in this scene; adopting
  Eilat Mazar's "Large Stone Structure" = "Palace of David" identification as
  settled fact in geometry, caption, or claim `statement` text; identifying
  the rendered "water shaft" feature (if any is built at all) with Warren's
  Shaft as a confirmed match; crediting Joab (or anyone) by name with
  breaching the defenses — that is a 1 Chronicles 11:6 detail, not a 2 Samuel
  5 one, and may appear only as a hedged informational aside in a claim's
  `notes`; any monumental/skyline-scale rendering of 10th-century Jerusalem
  that silently resolves the settlement-extent dispute in the maximalist
  direction; staging the Rizpah/Michal/Paltiel/gate-killing content from
  M5 (wrong milestone); any 2 Samuel 5:17–25 (Philistine war) content —
  wrong scene, `rephaim-valley`'s territory; any 2 Samuel 6 (ark procession)
  content, depicted or textually foreshadowed, beyond a bare closing-card
  forward pointer with no preview of its content.
