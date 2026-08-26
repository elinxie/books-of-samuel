# Scene brief — the new cart and the death of Uzzah (`perez-uzzah`, M7)

World-director pass, Sonnet, 2026-08-26 (per `CLAUDE.md`'s "Model policy — do not
invoke Fable": this pass carries the architecture/creative authority formerly
routed to Fable). Implementation: Sonnet/`threejs-engineer` within this
direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First of two scenes in Milestone 7, and the
project's first-ever staging of the ark of the covenant as a physical object.

Scope guard: this brief covers **2 Samuel 6:1–11**. The gathering at 6:1, the
departure from Baale-judah/Kiriath-jearim, the new cart, Uzzah's death, the
naming of Perez-uzzah, and the diversion to Obed-edom's house all stage here.
**Nothing from 6:12 onward appears** — no return to fetch the ark, no dance, no
Michal — that is `ark-into-jerusalem`, a separate brief and scene reusing
`jerusalem-stronghold`'s terrain. **Nothing from 2 Samuel 7 onward — the
dynastic oracle, the temple, Bathsheba — appears anywhere, depicted or
foreshadowed.** The chapter's own narrative is sequential here (the three
months at Obed-edom's house is a stated span, not a disclosed-topical-order
question like M6's chapter 5), so this scene's closing card may point forward
to `ark-into-jerusalem` as a straightforward continuation, not a hedged one.

## Historical intent

The observer should come away understanding five things:

1. **The new cart is the story's first, quiet irregularity — and the text
   itself doesn't say so.** David gathers "all the chosen men of Israel,
   thirty thousand," goes to Baale-judah (Kiriath-jearim) to bring up the ark,
   and sets it on a new cart, with Uzzah and Ahio — sons of Abinadab, in whose
   house on the hill the ark has rested — driving it. This is the same
   transport method the Philistines used to send the ark back in 1 Samuel 6, a
   different text. 2 Samuel 6 itself gives no explicit statement connecting
   the cart to what follows; the "should have been carried on the shoulders of
   Levites" reading is explicit in 1 Chronicles 15:2, 13, a later retelling
   with its own theological emphasis. The observer should be able to notice
   the cart without the scene telling them what to think about it.
2. **The procession is genuinely joyful before it goes wrong.** "David and all
   the house of Israel were making merry before the LORD, with songs and
   lyres and harps and tambourines and castanets and cymbals" (6:5) — the
   project's first extended depiction of Israelite music. This is not a somber
   ritual cortege; it is a celebration, and that is what makes the interruption
   land.
3. **Uzzah's death is the text's own crux, and the project renders exactly
   what the text gives — an act, a stated divine cause, and a death — never
   the cause itself.** ADR-013 names 2 Samuel 6:7 as "the clearest future test"
   of the stated-never-visualized line for narrated supernatural events: the
   death is depictable under ADR-009, the divine strike that the text says
   caused it is not. This scene is that test, worked through for the first
   time. See Resolved design calls.
4. **David's reaction keeps two feelings the text keeps, not one.** 6:8 has
   David angry; 6:9 has David afraid, asking "How can the ark of the LORD come
   to me?" Anger and fear are not the same response, and the text does not
   resolve them into a single verdict on what David did wrong, if anything.
   Neither should the scene.
5. **The chapter's own juxtaposition — danger and blessing in the same object
   — sets up the whole of `ark-into-jerusalem`.** The ark that killed Uzzah
   blesses Obed-edom's household for three months (6:11). The text places
   these two facts back to back without comment; so does this scene's closing
   card, which is also where the observer is handed forward into the second
   scene.

## Resolved design calls (this pass)

- **The ark's physical form (first appearance in the project; governs both M7
  scenes).** No prior scene in this project has staged the ark — the project's
  timeline begins at 1 Samuel 30, after the ark narratives of 1 Samuel 4–7.
  There is no archaeological corroboration for this or any comparable object,
  and 2 Samuel 6 itself gives no construction detail. The only descriptive
  basis anywhere in the biblical text is Exodus 25:10–22 (and Deuteronomy
  10:1–5): an acacia-wood chest overlaid with gold, carried on poles, with two
  cherubim on its cover. This is a genuinely new sourcing move for the
  project — citing a Torah passage for an object's own established form,
  distinct from the Samuel/Chronicles same-event-retold-differently pattern
  used elsewhere (Joab at Jerusalem's capture, the 4:6 MT/LXX divergence).
  **Resolved:** render a plain rectangular gold-toned chest with visible
  carrying poles — basis `biblical-text` (Exodus, not Samuel), confidence
  `moderate` for the general form, with notes stating plainly that this is a
  cross-book citation, not corroborated by any excavated comparandum, and that
  2 Samuel 6 does not itself redescribe the object. **No cherubim geometry
  renders, in any mode** — the text names them but gives no visual detail
  beyond "cherubim," rendering specific ancient Near Eastern
  composite-creature iconography here would be inventing an artistic program
  no evidence attests for this specific object, the same restraint that keeps
  Jebusite/Tyrian dress undifferentiated. Flagged as **queue #26** — a new
  sourcing precedent worth a second look.
- **Uzzah's death: a new template variant, not a literal reuse of the
  Asahel/Abner/Ish-bosheth pattern.** Every prior ADR-009 named-killing case
  has an assailant with a gesture to render (Asahel's reversed spear grip,
  Abner's strike in the gate, the execution of Rechab and Baanah). Uzzah's
  death has no assailant, no strike, no method the text gives at all — only an
  act (he put out his hand and took hold of the ark, because the oxen
  stumbled) and a stated cause the project cannot render (God struck him
  down). **Resolved:** the text's own specific, non-graphic detail is shown as
  gesture, per the ADR-009 precedent (Uzzah's hand reaching toward the ark) —
  then he collapses and falls beside the ark, at documentary distance, with
  **no wound geometry** (there is none to invent), **no visual effect standing
  in for the divine strike** (per ADR-013: no light, glow, wind burst, particle
  effect, camera push-in, or audio cue implying causation), and no held
  reaction beat borrowed from a human onlooker's shock (2:23's "stood still"
  precedent doesn't transfer cleanly here — the procession's reaction is
  carried by the following beat's stillness and David's stated anger and fear,
  not a mid-beat freeze). The caption states the text's full causal claim in
  both modes: "the anger of the LORD was kindled against Uzzah, and God struck
  him down there because of his error, and he died there beside the ark of
  God." **Reduced mode:** elides the reach-and-fall entirely — cut from the
  stumbling oxen directly to a held, still aftermath frame (the cart stopped,
  the procession frozen); caption states the same fact identically. Flagged
  as **queue #25** — the ADR-013 test case worked through, escalated for a
  second look since it is the project's first death with no assailant to
  render.
- **The cart-vs-carrying-method question is disclosed, not resolved, and not
  imported from Chronicles.** `scholarlyViews` on the narrated claim carries
  both the plain reading (2 Samuel 6 states an act and a cause, nothing about
  transport method being itself the fault) and the widely-held reading that
  connects the cart to Numbers 4:15's prohibition and 1 Chronicles 15:2, 13's
  explicit correction — attributed once sourced, hedged until then. **The
  scene does not choreograph a "wrong way" being corrected** — that
  correction happens off-screen between the two M7 scenes (`ark-into-jerusalem`
  opens with the ark already resting at Obed-edom's house and proceeds to
  Jerusalem; 1 Chronicles 15's shoulder-carried procession is a separate
  chapter in a separate book and is not staged here or there).
- **Music and instruments render as generic, disclosed placeholder forms.**
  6:5 names songs, lyres, harps, tambourines, castanets, and cymbals — the
  project's first extended depiction of Israelite music. Render recognizable
  generic silhouette forms for each named category (a small lyre/harp-type
  stringed instrument, a frame drum, hand-held rattles/castanets, small
  cymbals) without asserting specific construction, tuning, or decoration
  details no evidence supports. `king-stager-2001` is the first place to check
  for comparative material-culture coverage; if it doesn't cover instruments
  specifically, this closes as a genuine researcher gap (see Required source
  basis) rather than being forced.
- **Scale departs from a literal 1:10 reading of "thirty thousand," and says
  so.** 6:1 narrates a specific count, but 1:10 of 30,000 is 3,000 — a
  battle-scale figure count for what is a joyful procession, not a muster, and
  would risk colliding with `gilboa-battle`'s still-open real-hardware
  performance check while also being visually misleading (a procession that
  reads as an army). **Resolved:** the marching column renders as a disclosed
  representative gathering, the same departure `claim-judah-assembly-scale`
  already established for "the men of Judah" — a design count stated plainly
  as not a literal muster, not a ratio of the narrated number. See Scale
  assumptions.
- **Kiriath-jearim (Baale-judah) gets a full `LocationEntry`; the threshing
  floor of Nacon/Perez-uzzah and Obed-edom's house do not.** Kiriath-jearim
  has a standing identification with Deir el-Azhar/Tell el-Azhar (modern Abu
  Ghosh) that the field treats as reasonably secure — the same
  `identification.disputed: false` treatment `jerusalem` received, though
  **the project currently has no dedicated source card for Kiriath-jearim at
  all**, a genuine researcher gap flagged below. Perez-uzzah's precise site is
  not independently known beyond "on the way" from Kiriath-jearim, and Obed-
  edom's house location is unknown entirely — both are staged (the naming
  beat and the diversion beat require geometry) but get **no `LocationEntry`,
  no coordinates, no atlas pin**, exactly the `rephaim-valley` treatment of
  Baal-perazim: plotting an unlocated place would manufacture a false
  identification. Their positions are disclosed placeholders within this
  scene's own terrain (a route corridor west of Jerusalem), not independently
  located.
- **David's fear (6:9) is carried as a spoken question, not resolved by the
  render.** "How can the ark of the LORD come to me?" is staged as dialogue/
  card, held on David's stillness — no visual answer is supplied; the question
  stays a question, and the scene's closing card hands it forward
  unresolved into `ark-into-jerusalem`.

## Visual composition

- **Terrain:** a new `TerrainSpec` — a modest hill settlement (Kiriath-jearim)
  giving onto an open route corridor running east toward Jerusalem, through
  gentle highland terrain. Derive palette and vegetation vocabulary from the
  established Judean-highland spec (`hebron-anointing`, `jerusalem-stronghold`)
  rather than inventing a new material language.
- **Focal masses:** (a) **the house on the hill** at Kiriath-jearim, where the
  ark has rested and where the new cart is loaded; (b) **the procession
  column** moving along the route, the ark visible on the cart at its center,
  musicians and celebrants around it; (c) **the threshing floor** where the
  stumble and the death happen — an open, unremarkable flat working-ground,
  not a monument; (d) **Obed-edom's house**, a modest household structure at
  the diversion point.
- **Sightlines:** the default vantage travels with the procession — a
  following/parallel framing that keeps the ark in view as the column's focal
  point throughout. At the death beat, the camera holds at documentary
  distance from the cart, never closing in; the same restraint
  `jerusalem-stronghold` and `rephaim-valley` used for their own restrained
  beats.
- **Lighting:** daytime, hour unstated — steady midday, disclosed
  `design-placeholder`, matching the established M6 convention of resisting
  atmospheric/dramatic light at a beat the project is being deliberately
  restrained about.

## Scale assumptions

Precedent, stated explicitly and departed from on purpose (see Resolved design
calls): 6:1 narrates "thirty thousand," but this scene does **not** apply
register #7's ~1:10 ratio to that figure. Instead, following
`claim-judah-assembly-scale`'s precedent (that claim's own explicit departure
from a literal reading of "the men of Judah" for the same reasons —
performance and legibility, disclosed rather than hidden), the procession
renders as a representative gathering.

- **Marching column: disclosed design count ≈ 150–200 figures** — David, the
  ark and its cart, and a representative procession, not a literal 30,000 or
  even a literal 1:10 (3,000) rendering of it.
- **Dedicated musician figures: ≈ 10–15**, drawn from the column total, not
  additional — a visible subset carrying the named instrument forms.
- **Principals:** David, Uzzah, Ahio, Obed-edom (referenced through 6:10–11,
  staged briefly at the diversion beat). Abinadab is named as the house's
  owner but needs no character record — no action is attributed to him beyond
  the house being his.
- **Ambient Kiriath-jearim settlement: ≈ 10–20**, static.
- **Obed-edom's household: ≈ 5–10**, static, at the diversion beat.
- **High-tier total ≈ 180–235 figures** — below `gilboa-battle`'s measured
  band and cheaper per figure (procession/walk poses, no combat choreography).
  Hard cap: this scene must not exceed `gilboa-battle`'s high-tier instance
  count while that scene's real-hardware performance check is still open
  (`docs/next-run.md`).
- `claim-ark-procession-cast-scale` carries all of the above as a disclosed
  design claim, in the form of `claim-judah-assembly-scale`.

## Camera / observer experience

- **Default viewpoint** (`vp-procession-route`): traveling with the column
  along the route, the ark in frame throughout.
- Additional viewpoints: **Kiriath-jearim** (`vp-kiriath-jearim`, the
  departure, inspect emphasis on the house and the new cart); **the threshing
  floor** (`vp-nacon`, documentary distance on the death beat, never closer);
  **Obed-edom's house** (`vp-obed-edom`, the diversion and the closing card).
- **Walk emphasis:** the procession route is a strong candidate for ADR-011's
  guided-path affordance, at celebratory pace for the first half of the
  timeline — explicitly not framed as a funeral-pace walk (contrast
  `hebron-gate`'s procession); the pace changes only after the death beat,
  where the column's movement becomes subdued rather than festive, carried by
  pose/pacing changes, not by new geometry.
- **Timeline beats** (`depictsDeath: true`; ADR-009 advisory wires
  automatically; suggested duration ~160s):
  - `b-gathering` (6:1) — Opening card: David again gathers all the chosen
    men of Israel, thirty thousand. No geometry; the card states the narrated
    count and that the scene renders a disclosed representative gathering, not
    a literal muster (cross-reference `claim-judah-assembly-scale`).
  - `b-departure` (6:2) — Staged: David and the people set out from Baale-
    judah (Kiriath-jearim) to bring up the ark of God, "which is called by the
    name of the LORD of hosts who sits enthroned on the cherubim." Default
    viewpoint established.
  - `b-new-cart` (6:3–4) — Staged: the ark set on a new cart from the house of
    Abinadab on the hill; Uzzah and Ahio driving, Ahio going before the ark.
    Card surfaces the cart-vs-carrying-method question as `scholarlyViews`,
    without adopting either reading in the geometry.
  - `b-music` (6:5) — Staged: the procession making merry with songs, lyres,
    harps, tambourines, castanets, and cymbals. Walk/guided-path emphasis;
    instrument forms as disclosed placeholders.
  - `b-stumble` (6:6) — Staged: at the threshing floor of Nacon, the oxen
    stumble; Uzzah puts out his hand and takes hold of the ark. The reaching
    gesture — the text's own specific, non-graphic detail — is shown, at
    documentary distance.
  - `b-strike` (6:7) — **Standard:** Uzzah collapses and falls beside the ark,
    documentary distance, no wound geometry, no visual stand-in for the divine
    cause (ADR-013) — no light, glow, wind, or camera language implying
    presence. Caption states the text's full claim: the LORD's anger, the
    strike, the death "there beside the ark of God." **Reduced:** elides the
    reach-and-fall; cuts from the stumbling oxen to a held, still aftermath
    frame. Captions identical in both modes.
  - `b-perez-uzzah` (6:8) — Staged/card: David's anger; the naming of the
    place Perez-uzzah, "to this day." Position disclosed as a placeholder
    (no `LocationEntry`, no atlas pin, per Baal-perazim's precedent).
  - `b-david-afraid` (6:9) — Card + staged stillness: David's fear of the
    LORD that day, and his question, "How can the ark of the LORD come to
    me?" ESV excerpt spend for this scene. The question is held unresolved.
  - `b-diversion` (6:10) — Staged: David unwilling to bring the ark to himself
    in the city of David; it is diverted to the house of Obed-edom the
    Gittite. New set, disclosed placeholder position along the route.
  - `b-blessing-obed-edom` (6:11) — Card + brief static tableau: the ark
    remains three months in Obed-edom's house; the LORD blesses him and his
    household. A time-passage card, not an extended staging.
  - `b-close` — Closing card: states only what 6:1–11 states. Points forward
    to `ark-into-jerusalem` as a straightforward continuation (the three-month
    span is the text's own stated bridge, not a disclosed-order question).
    **No 2 Samuel 6:12+ staging, and no 2 Samuel 7+ content of any kind.**

## Performance target

- ≈ 180–235 high-tier figures, mostly walk/idle pose buckets; one
  `InstancedMesh` per repeated family (figure, instrument prop, cart/oxen,
  house structure, terrain vegetation).
- The procession's shared route curve with per-figure offsets reuses the
  `hebron-gate`/`rephaim-valley` procession pattern — adequate at this
  fidelity, and the cheapest way to move ~150–200 figures along a single path.
- The ark itself is a single low-poly instanced prop (chest + poles), reused
  unchanged into `ark-into-jerusalem`.
- No new lights, no fire, no particle systems (ADR-013 explicitly forbids any
  particle/light effect standing in for the strike). Reuse the ADR-010
  procedural rig unchanged.
- Hard ceiling: at or below `gilboa-battle`'s high-tier instance count while
  its real-hardware check remains open.
- Run `performance-reviewer` after the terrain and the procession route land,
  before the death-beat pose work — the `jerusalem-stronghold` lesson (budget
  the moving mass early, not at the end).

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty
in `scenes.ts` until they exist. Claim consolidation is allowed per the
`gibeon-pool` precedent.

- **Existing, reuse:** `claim-david-historical`, `claim-dress`,
  `claim-judah-assembly-scale` (the representative-gathering precedent this
  scene extends — cross-reference, don't restate). Source cards already on
  hand: `rainey-notley-2006` (historical geography — the interim citation for
  Kiriath-jearim pending a dedicated card), `king-stager-2001` (household/
  material culture — first check for both the four-room house form at
  Kiriath-jearim and the music-instrument gap), `esv-bible`.
  `mccarter-1984-ii-samuel` currently extends only through 2 Samuel 5 (per
  queue #22's researcher pass) and needs extending to 2 Samuel 6 — the
  cheapest route to named attribution on the cart-vs-carrying-method dispute
  and the death's own textual details; flag as a new researcher item if not
  done by build time.
- **New location:** `kiriath-jearim` — `identification.disputed: false` for
  Deir el-Azhar/Tell el-Azhar (Abu Ghosh vicinity), `approxCoordinates`
  confidence `moderate` pending a dedicated source card (the project has none
  yet for this site specifically — genuine researcher gap, see below).
  **No `LocationEntry`** for the threshing floor of Nacon/Perez-uzzah or for
  Obed-edom's house (both unlocated; see Resolved design calls).
- **New, narrated (basis `biblical-text`):** `claim-ark-procession-departure`
  (6:1–5 — the gathering, the new cart, the music; `scholarlyViews` on the
  cart-vs-carrying-method question, hedged until named); `claim-uzzah-death`
  (6:6–8 — the stumble, the reaching gesture, the divine strike stated exactly
  as the text states it, the death, David's anger, the Perez-uzzah naming;
  notes state explicitly that this claim is governed by ADR-013 — the
  causation is stated, never rendered — and cross-reference the ADR-009
  no-assailant-death template variant); `claim-david-fear-diversion` (6:9–10 —
  David's fear, his question, the diversion to Obed-edom's house);
  `claim-obed-edom-blessing` (6:11 — the three-month span, the stated
  blessing).
- **New, design (basis `design-placeholder` unless sourced):**
  `claim-ark-physical-form` (the chest/poles/gold-overlay form per Exodus
  25:10–22 — basis `biblical-text` citing Exodus rather than Samuel, confidence
  `moderate`, notes disclosing the cross-book sourcing decision and the
  no-cherubim-geometry rule explicitly; queue #26); `claim-uzzah-death-
depiction` (the rendering-policy claim itself — cross-references ADR-013
  and ADR-009's no-assailant variant; queue #25); `claim-kiriath-jearim-form`
  (the hill-settlement form, comparative `king-stager-2001` four-room house);
  `claim-music-instruments` (the generic instrument forms; checked against
  `king-stager-2001` first — if no coverage, close as a genuine researcher
  gap, not forced); `claim-ark-procession-cast-scale` (the disclosed
  representative-gathering departure from a literal reading of "thirty
  thousand," modeled on `claim-judah-assembly-scale`).
- **Characters:** reuse `david` (extend `passageRefs` to include 2 Samuel 6).
  New: `uzzah` (staged, dies), `ahio` (staged, walks before the ark),
  `obed-edom` (staged at the diversion and blessing beats; referenced again at
  the opening of `ark-into-jerusalem`). No character record for Abinadab (see
  Scale assumptions).
- **ESV excerpt budget (`2sam-6`, a fresh passage, shared with
  `ark-into-jerusalem`):** the ≤3-quote handful is split explicitly — **this
  scene spends exactly one** (recommended: 6:9's "How can the ark of the LORD
  come to me?"), and **two are reserved for `ark-into-jerusalem`** (Michal's
  rebuke and David's reply, which that scene cannot do without). Verify exact
  ESV wording at build time via the WebSearch snippet cross-corroboration
  pattern that closed queue #20(e) and #19(b) — direct fetches to Bible-text
  sites remain sandbox-blocked.

## Placeholder policy

- **Allowed placeholders:** Kiriath-jearim's town form and extent; the route
  corridor's exact course; the threshing floor's form and position; Obed-
  edom's house form and position; the ark's exact dimensions and decoration
  beyond the basic chest-and-poles form; instrument forms; all figure counts
  and positions; vegetation distribution; lighting hour.
- **Not allowed:** any wound, blood, or dismemberment geometry, in any mode —
  there is none to invent, and ADR-009's bar is unconditional regardless; any
  visual effect standing in for the divine strike — no light, glow, wind
  burst, particle effect, timed environmental animation, or camera language
  (push-in, reveal, hold-on-nothing) implying an unseen actor, in any mode, at
  6:7 or anywhere else in this scene (ADR-013); cherubim geometry on the ark,
  in any mode; adopting 1 Chronicles 15's Levites-carrying-by-poles detail as
  though 2 Samuel 6 itself states it, or staging any "correct" alternative
  transport method being performed on-screen; asserting a specific reason
  "why" Uzzah died beyond the text's own stated act and stated cause — no
  editorializing toward "he deserved it" or "this was unjust," in caption or
  staging; a named priest or specific Levitical office (the text names none at
  this point); a `LocationEntry`, coordinates, or atlas pin for the threshing
  floor of Nacon/Perez-uzzah or for Obed-edom's house; any assertion that the
  cart itself was the stated cause of death, where the text does not say so;
  any 2 Samuel 6:12+ staging (that is `ark-into-jerusalem`); any 2 Samuel 7+
  content — the dynastic oracle, the temple, Bathsheba — depicted,
  foreshadowed, or glossed, anywhere.
