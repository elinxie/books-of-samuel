# Scene brief — the Philistine campaigns at Baal-perazim and the Valley of Rephaim (`baal-perazim-rephaim`, M6)

World-director pass, Sonnet, provisional (fable-review-queue #21). Written under
the `world-director` role's own stated fallback because Fable's `fable-architect`
call hit its monthly spend limit before any work started this session (same
recurring constraint noted in `src/data/milestones.ts`'s M6 comment for
2026-07-22/2026-08-10/2026-08-15). Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning, and the whole
brief itself, need a real Fable read before any part of it is treated as final
creative direction, and before the scene ships past `in-progress`. Third and
last of the three M6 scenes.

Scope guard: this brief covers **2 Samuel 5:17–25 only** — both Philistine
campaigns against David after his anointing over all Israel. Nothing from
2 Samuel 6 onward (the ark's arrival at Jerusalem, Uzzah's death, David's dance)
may appear, depicted or foreshadowed, beyond a closing text-only forward pointer
to M7. Nothing from `hebron-unification` (5:1–5) or `jerusalem-conquest`
(5:6–16) is restaged here — this scene's `locationId` is `valley-of-rephaim`,
not `jerusalem` or `hebron`, and no new Jerusalem geometry is built for this
scene (see "the stronghold" note below). 5:17b's "David went down to the
stronghold" is a one-clause transition, not an invitation to rebuild Jerusalem.

## Historical intent

The observer should come away understanding three things:

1. **Two campaigns, two different divine answers — obedience is the
   throughline, not battlefield genius.** The first campaign gets a
   straightforward "yes, go up" (5:19b: "Go up, for I will surely give the
   Philistines into your hand"). The second campaign, against the same
   opponent in the same valley, gets a deliberately different, more
   circuitous instruction: do not attack directly, circle around behind them,
   and wait for an audible sign — "the sound of marching in the tops of the
   balsam trees" — as confirmation that the LORD has already gone out ahead
   to strike (5:23–24). The text closes the loop explicitly: "David did as
   the LORD commanded him" (5:25a) — the same verb of compliance both times.
   The composition should make the _contrast in instructions_ legible, not
   just render two similar routs back to back; that contrast is the scene's
   real content. David is shown consulting before acting both times, not
   improvising.
2. **This is a rout and a divinely-signaled advance, not a clash of
   equals.** Both campaigns compress fast in the text — a "spread out," an
   inquiry, and a result ("breach of waters" in 5:20; "struck down... from
   Geba to Gezer" in 5:25). Neither campaign narrates sustained hand-to-hand
   fighting, a wound, or a named death on either side. The staging should
   read as brief and decisive both times — closer in register to Gilboa's
   `b-rout` beat (dust and motion carrying a collapse) than to its melee
   beats, and lighter still than `gibeon-pool`'s champions' contest or
   Asahel's death. This is explicitly **not a second Gilboa**; see "Scale and
   intensity vs. Gilboa/Gibeon" below.
3. **A small, easy-to-miss detail deserves real attention: the abandoned
   idols (5:21).** "The Philistines left their idols there, and David and his
   men carried them away" is a single clause with real content — a defeated
   army's cult objects taken as spoil, distinct from and quieter than a
   victory parade. It is staged, not caption-only (see Resolved design calls),
   but staged with the same restraint as everything else in this scene: no
   triumphal display, no destruction shown (their fate beyond being carried
   off is outside 2 Samuel's own text and out of scope — see Placeholder
   policy).

## Scale and intensity vs. Gilboa and Gibeon (read this before designing geometry)

This scene must feel lighter than both of the project's prior battle scenes,
not merely smaller:

- **No named-character killing.** ADR-009's individual-killing template
  (Asahel/Abner/Amasa) does not apply — the text names no casualty on either
  side. There is no reversed-spear-grip-style gesture beat, no held reaction
  beat over a fallen named individual, no character entry that needs the
  care `asahel`'s did.
- **No sustained melee choreography.** Gilboa staged a line clash before its
  rout; Gibeon staged a twelve-a-side paired killing contest before its wider
  clash. Neither device exists here — the text moves straight from
  "spread out" to inquiry to result. Do not invent a clash beat to fill the
  gap; a rout can be legible without one (Gilboa's own `b-rout` already
  proved this at documentary distance).
- **No casualty numbers, named or counted.** Unlike Gibeon's 360/20, this
  passage gives no figures at all. Nothing should imply a specific count of
  dead on-screen or in caption.
- **A materially smaller figure ceiling** — see Scale assumptions.
- **One genuinely calm, non-combat beat** (the balsam-grove sign, 5:24) sits
  at the emotional center of the second campaign — nothing comparable exists
  in Gilboa or Gibeon, both of which build toward and through violence
  continuously. Give it real quiet; do not rush past it to get to the strike.

## Resolved design calls (this pass)

- **One scene, two campaigns, one shared location and figure pool — not two
  builds.** Per the M6 scope comment, this is deliberately one scene. To keep
  the combined build cheap and to avoid asserting the two Philistine musters
  were different in composition (the text gives no reason to think so),
  **reuse the same Philistine and Israelite figure pools for both
  campaigns**, restaged between beat-groups rather than doubling the
  instance count. The second muster (5:22, "yet again") should read as a
  clearly distinct event in staging/camera/caption, not as a distinct crowd.
- **"The stronghold" (5:17b) is referenced, not rebuilt.** The Hebrew
  _metsudah_ echoes 5:7's "stronghold of Zion" — the most natural reading is
  that David goes down from the newly-taken Jerusalem heights to a
  defensible position, plausibly the same stronghold — but this project has
  not adopted that identification as certain, and some readings connect the
  phrase to an earlier refuge by narrative habit (e.g., Adullam) rather than
  the just-conquered site. Handle this as a one-line transition caption with
  the ambiguity disclosed in the claim's notes; **no new Jerusalem geometry,
  no cave/fortress model.** This mirrors how `gibeon-pool` referenced
  Mahanaim without building it.
- **The idols are staged, briefly, as an "abandoned camp" beat — not
  caption-only, not a trophy display.** 5:21 is concrete and physical
  ("carried them away"); reducing it to a caption would lose the one
  visually distinctive detail this campaign offers beyond the rout itself.
  Stage a small, calm retrieval: a handful of David's men gathering
  generic, small ANE-style cult-figurine forms among abandoned Philistine
  gear at the edge of the routed camp. No close inspection of the objects'
  iconography, no destruction, no march-past display — restraint matches
  the "no triumphal staging" rule carried forward from Gilboa and Gibeon.
- **The balsam/mulberry trees get the scene's one dedicated atmospheric
  beat.** 5:23–24's בְּכָאִים (_bekaim_) is a genuine, longstanding
  translation dispute (ESV "balsam trees," KJV "mulberry trees," other
  renderings "poplar/aspen," a "weeping trees" reading tied to the root
  _bakah_) — see Required source basis. Render a generic stand of
  narrow-leaved trees (species left deliberately non-specific, disclosed
  placeholder) with an animated canopy (vertex sway / rustle) as the visual
  carrier of "the sound of marching" — the scene's one Hebron-gate-style
  fixed sensory cue, except here the text fixes a _sound_, not a light
  condition, and the engine has no established spatial-audio system, so the
  primary carrier is visual motion plus the beat caption stating the sound
  explicitly. An ambient audio cue is a legitimate optional enhancement
  (flag for `threejs-engineer` to assess feasibility) but is not required
  for this scene to ship.
- **Geba-to-Gezer (5:25) is an atlas route, not in-scene geometry.** The
  pursuit corridor runs well beyond the Valley of Rephaim — Geba lies north
  of Jerusalem in Benjamin, Gezer lies west in the Shephelah — neither is a
  built or scoped location in this project. Follow the `routes.ts` pattern
  already established (`route-ziklag-besor`, `route-jabesh-beth-shan`): add
  a new `RouteDef` (e.g. `route-baal-perazim-geba-gezer`) for the `/atlas`
  overlay, and close the scene's final combat beat with a wide, receding
  shot plus a caption naming the extent, not a rendering of either town.
  Geba and Gezer do not need full `LocationEntry` records for this scene;
  if the route is added, they need at minimum a referenced-only stub
  (parallel to Mahanaim's pattern) — flagged for whoever builds the route,
  not required to unblock this scene's own geometry.
- **ADR-011 affordance considered, deliberately deferred, not rejected.**
  The two inquiries' contrasting instructions are a genuinely good fit for
  a light "what would you expect the answer to be?" interactable-label
  affordance before each reveal (passes the ADR-011 test: deepens scene
  comprehension of _why_ the tactics differ; fully ignorable — the scripted
  reenactment plays either way; never rewards guessing anything the text
  doesn't itself state, since the "reveal" is always the text's own answer).
  This is flagged as a **v1.1 polish candidate**, not part of this build's
  critical path — building the straight scripted reenactment first keeps
  the initial build small and testable; the affordance can be layered on
  without touching the underlying beat timeline.

## Visual composition

- **Terrain:** an open plain, not a ridge (Gilboa) or a rocky plateau with a
  basin (Gibeon) — the Valley of Rephaim is the fertile lowland immediately
  southwest of the City of David ridge. Use gentle `flatten`/`ramp`
  `TerrainSpec` features rather than `mound`/`ridge`/`basin` — the terrain's
  flatness _is_ the point of contrast with the project's prior two
  battlefields, and should read that way from the default viewpoint. Keep
  dressing modest: open grass/light scrub with a few cultivated-looking
  patches at most, disclosed as an undocumented but plausible lowland-plain
  treatment (no specific Iron Age field-system evidence is claimed).
- **Focal masses:**
  1. **The valley floor "spread"** — both campaigns' establishing shot: the
     Philistine force deployed ("spread out," 5:18/5:22) across the open
     plain, legible as a real muster without needing Gilboa's crest-height
     framing.
  2. **The balsam grove** — a distinct stand of trees along one edge/rise
     of the plain, close enough to the second campaign's action that
     "opposite the balsam trees" (5:23) reads as a real spatial instruction,
     not a vague direction.
  3. **The circling route** — the ground David's force crosses to get
     behind the Philistine line in the second campaign, distinct from and
     roughly perpendicular to the first campaign's direct approach — the
     one place this scene should let the observer feel the _difference in
     tactics_ geometrically, not just hear it in a caption.
  4. **The abandoned camp** — a modest cluster of dropped gear and the
     idol-figurine props, at the edge of the routed ground after the first
     campaign's strike.
- **Sightlines:** the default vantage (`vp-valley-overlook`) holds the
  plain and the balsam grove in one frame so both campaigns can establish
  from the same shot without new geometry. The balsam-grove vantage is
  close and still — the visual opposite of the wide overlook — deliberately
  quiet before the second campaign's strike.
- **No triumphal staging anywhere**, matching Gilboa/Gibeon's standing rule
  — no trophies, standards, or victory framing, even at the idol-retrieval
  beat.
- **Lighting:** daytime; hour unstated in text — steady daylight, disclosed
  `design-placeholder`, no dusk/dawn arc needed (this scene is short and
  does not need Gilboa's day-arc device).

## Scale assumptions

- **No headcount is narrated for either campaign** — both "spread out" and
  give no numbers, unlike Gibeon's exact twelve-a-side and 360/20, or
  Ziklag's "six hundred men." Every count here is a disclosed design
  choice, following the `claim-battle-scale`/`claim-gibeon-battle-scale`
  precedent.
- **Target: well under Gilboa's ~325-figure ceiling, and below
  `gibeon-pool`'s already-modest ~90–115 total** — this passage describes
  two brief routs, not a national battle or even a sustained contingent
  clash. Proposed figures:
  - **Israelite force (David's men): ≈ 25–35 figures.**
  - **Philistine force: ≈ 35–45 figures** (a real muster, "spread out"
    twice, but not Gilboa's national-coalition scale).
  - **One shared pool restaged for both campaigns** (not additive) — high-
    tier combat total **≈ 60–80 figures**, well under both Gilboa's ceiling
    and Gibeon's civil-war-skirmish scale, appropriate to two short,
    decisive routs rather than sustained mutual combat.
  - **Idol-retrieval detail: ≈ 4–6 figures**, drawn from the existing
    Israelite pool, not additive.
- State explicitly in the scene's scholarly notes (parallel to Gilboa's and
  Gibeon's own disclosures): these counts are a design choice for staging
  legibility, not a claim about either army's true size, and the shared
  pool across both campaigns is a deliberate economy, not an assertion that
  the two musters were identical in composition.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-overlook`): elevated over the open
  plain, holding the Philistine "spread" and the balsam grove in one frame
  — reused, unchanged, for both campaigns' establishing shots.
- Additional viewpoints: **the rout draw** (`vp-rout-draw`, campaign 1's
  climax, dust/motion-carried, following Gilboa's `b-rout`/Gibeon's
  `b-battle-spreads` precedent); **the abandoned camp**
  (`vp-abandoned-camp`, close inspect-emphasis, the idol-retrieval beat);
  **the flanking circle** (`vp-flank-circle`, campaign 2, walk/follow-
  emphasis tracing David's route behind the Philistine line — a strong
  candidate for the deferred ADR-011 guided-path affordance); **the balsam
  grove** (`vp-balsam-grove`, close, inspect/hold-emphasis, the scene's
  quiet sensory centerpiece); **the extended strike**
  (`vp-strike-geba-gezer`, wide, receding, closing on the atlas-route
  pointer rather than modeled geography).
- **One scene, two clearly separated beat-groups**, sharing the default
  vantage and figure pool but with distinct climaxes and captions marking
  the second muster as a new event ("yet again," 5:22). Suggested total
  duration **≈ 110–130s** — shorter than Gilboa's 150s, reflecting the
  passage's own compression.
- **Timeline beats and violence treatment** (`depictsDeath: true` — see
  reasoning below; standard is the default per ADR-009, gated by the
  one-time advisory):

  | Beat           | Text         | Standard                                                                                                                                                                                                                  | Reduced                                                                                              |
  | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | `b-seek`       | 5:17a        | Opening card: the Philistines hear a king now rules a united Israel and come up to seek David. No geometry beyond the card; no violence.                                                                                  | identical                                                                                            |
  | `b-stronghold` | 5:17b        | Brief transition: David goes down to "the stronghold" (referenced, not built — see Resolved design calls). Camera move only; no violence.                                                                                 | identical                                                                                            |
  | `b-spread-1`   | 5:18         | Establishing shot at `vp-valley-overlook`: the Philistines spread out across the valley. No violence.                                                                                                                     | identical                                                                                            |
  | `b-inquiry-1`  | 5:19         | Dialogue/prayer beat: David inquires of the LORD ("Shall I go up… will you give them into my hand?"); the answer, "Go up." Inferred ephod practice, no new object modeled (see Required source basis). No violence.       | identical                                                                                            |
  | `b-rout-1`     | 5:20a        | The engagement and rout at distance, dust/motion carrying the collapse — same register as Gilboa's `b-rout`/Gibeon's `b-battle-spreads`; no wound/blood/gore geometry, no melee choreography.                             | Wider distance still; the crowd thins and drains, falls elided entirely.                             |
  | `b-naming`     | 5:20b        | David names the place Baal-perazim; dialogue/caption beat carries the "breaking flood" line (candidate ESV quote — see below). No violence.                                                                               | identical                                                                                            |
  | `b-idols`      | 5:21         | `vp-abandoned-camp`: a handful of David's men calmly gather generic cult-figurine props among abandoned gear at the routed camp's edge. No violence; no triumphal framing.                                                | identical                                                                                            |
  | `b-spread-2`   | 5:22         | Establishing shot, `vp-valley-overlook` reused: the Philistines come up "yet again" and spread out. Caption marks this explicitly as a second, distinct muster. No violence.                                              | identical                                                                                            |
  | `b-inquiry-2`  | 5:23         | Dialogue/prayer beat: David inquires again; this time told **not** to go up directly, but to circle around behind them, opposite the balsam trees. Held beat — the contrast with `b-inquiry-1` is the point. No violence. | identical                                                                                            |
  | `b-circle`     | 5:23b–24a    | `vp-flank-circle`, walk/follow-emphasis: David's force moves quietly behind the Philistine line toward the balsam grove. No violence.                                                                                     | identical                                                                                            |
  | `b-sign`       | 5:24         | `vp-balsam-grove`, held and quiet: the canopy stirs; caption states the sound of marching in the treetops as the LORD's own sign that He has gone out ahead. The scene's one non-combat centerpiece beat. No violence.    | identical (this beat carries no violence in either mode and should not be shortened in reduced mode) |
  | `b-strike-2`   | 5:25         | Brief rout/pursuit at documentary distance (dust/motion, no gore), widening to a receding shot; caption states David struck the Philistines "from Geba to Gezer" and points to the atlas route. No melee choreography.    | Wider distance only; pursuit read by the crowd draining off-frame, no individual falls shown.        |
  | `b-obedience`  | 5:19b, 5:25a | Closing caption threading both campaigns: "David did as the LORD commanded him" — stated once as the scene's throughline, not re-litigated per beat.                                                                      | identical                                                                                            |
  | `b-close`      | —            | Closing card: forward pointer to M7 (2 Samuel 6, the ark's arrival) stated as a pointer only, **not depicted or previewed**.                                                                                              | identical                                                                                            |

  Explicitly, matching Gilboa/Gibeon's precedent: **no dismemberment or
  blood/gore geometry in any mode**, no close or lingering framing on any
  falling figure, no melee choreography rivaling Gilboa's line-clash or
  Gibeon's champions' contest. Both rout beats (`b-rout-1`, `b-strike-2`)
  should be the _shortest_ violence beats this project has built — a
  collapse read by motion and dust, not a fight.

### `depictsDeath` call and reasoning

Set **`depictsDeath: true`**. Reasoning: although no individual, named
casualty is narrated on either side (unlike Gilboa's Saul/sons or Gibeon's
Asahel), both campaigns describe an armed force being routed and struck down
("the LORD has broken through my enemies... like a breaking flood," 5:20;
"David struck down the Philistines from Geba to Gezer," 5:25, using the same
lethal-strike verb — _nakah_ — used elsewhere in Samuel for killing in
battle, not mere pursuit). A "breach of waters" rout and a strike extending
across a wide geographic corridor both imply real casualties among an
engaged military force, even though the text declines to count or name them.
The scene renders combat-with-implied-death at documentary distance under
ADR-009's standard restraint (falls-at-distance, dust/motion, no wound
geometry), which is exactly the category the advisory exists to flag. The
alternate reading — `false`, because no specific death is narrated the way
Gilboa's or Asahel's are — is legitimate and was seriously considered; it is
rejected here because the advisory's purpose is to flag _combat content_,
not only _named-individual_ death, and both rout beats are unambiguously
combat with implied fatalities, however restrained the treatment.

## Performance target

- **≈ 60–80 high-tier combat figures total**, one shared pool restaged
  across both campaigns (not additive) — see Scale assumptions. This is the
  cheapest battle-register scene built so far.
- One `InstancedMesh` per repeated family: figure, spear, shield, bow (reuse
  `claim-israelite-muster-kit` and `claim-philistine-kit`'s existing kit
  attachment meshes from Gilboa — no new kit forms needed), balsam-grove
  trees (new small family, `asset-balsam-grove`), idol-figurine props (new
  small family, `asset-philistine-idols-captured`), dust/motion sprites
  (reuse `asset-dust-motion` from Gilboa, unchanged).
- **No headdress on crowd-tier Philistine figures**, matching Gilboa's own
  principal-tier-only rule for the disputed plumed marker (there are no
  Philistine "principals" named in this passage, so the headdress likely
  does not appear in this scene at all unless a generic officer-tier figure
  is introduced — implementer's call, default to omitting it here).
- **No new terrain shader, no water, no new real-time lights.** The canopy-
  sway animation on the balsam grove is a vertex/shader-level motion effect
  on an existing instanced mesh family, not a new lighting or particle
  system; keep it cheap.
- Run `performance-reviewer` once, after the valley-floor and balsam-grove
  set pieces land — expected to pass easily given the reduced figure count.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay
empty in `scenes.ts` until they exist.

- **Existing, reuse:** `claim-david-historical` (kingdom-scale framing
  anchor); `claim-hebron-inquiry` (cited as direct precedent for inferring
  the same ephod/Abiathar inquiry practice here, established at 1 Samuel
  30:7–8 and already reused at 2 Samuel 2:1 — do not model a new object,
  follow the same inference pattern); `claim-israelite-muster-kit` and
  `claim-philistine-kit` (both established at Gilboa — reuse their existing
  kit forms rather than defining new ones; the Philistine headdress dispute
  carried by `claim-philistine-kit`'s `scholarlyViews` stays as-is and is
  not re-litigated here). The `valley-of-rephaim` `LocationEntry` already
  exists (added this session) and already lists `sceneIds: ['baal-perazim-
rephaim']`; this scene populates its `claimIds`.
- **New, narrated (basis `biblical-text`):**
  - `claim-baal-perazim-victory` (5:17–21 — the Philistines' search, the
    stronghold transition, the first "spread out," the inquiry and its "go
    up" answer, the rout and the Baal-perazim naming, and the abandoned
    idols carried off; notes disclose the "stronghold" identification
    ambiguity per the Resolved design calls above, and state explicitly
    that the idols' subsequent fate — 1 Chronicles 14:12's addition that
    they were burned — is outside 2 Samuel's own text and out of this
    scene's scope).
  - `claim-rephaim-second-campaign` (5:22–25 — the second, explicitly
    repeated "spread out," the second inquiry and its contrasting
    circle-and-wait-for-a-sign answer, the balsam-tree sign, and the strike
    from Geba to Gezer; notes state the "David did as the LORD commanded
    him" throughline explicitly and cross-reference `claim-baal-perazim-
victory` as the contrasting first instance, not a duplicate claim).
- **New, terrain/design (basis `design-placeholder`):**
  - `claim-valley-of-rephaim-terrain-form` (the plain/lowland approximation
    — `flatten`/`ramp` features, no specific Iron Age field-system or
    agricultural evidence asserted; explicitly distinguishes this terrain
    treatment from Gilboa's `ridge` and Gibeon's `basin`).
  - `claim-rephaim-battle-scale` (the disclosed 60–80-figure, shared-pool
    design count above; parallel in form to `claim-battle-scale`/
    `claim-gibeon-battle-scale`; confidence n/a, design choice; notes state
    explicitly that the total is deliberately below both prior battle
    scenes and is not derived from any narrated number, since none exists).
  - `claim-philistine-idols-captured` (the generic ANE cult-figurine prop
    form used for the abandoned idols — basis `design-placeholder`/
    `comparative-ane` at low-to-moderate confidence; notes should flag for
    `researcher`: does `king-stager-2001` or the Philistine-material-culture
    source cards from queue #14 — `master-2021-philistines-highlands`,
    `stager-mountjoy-2007-ashkelon-krater` — document an attested Philistine
    cultic-figurine type, e.g. the Ashdoda-type seated figurine from
    Ashdod, specific enough to cite here rather than a wholly generic ANE
    form? Until checked, keep the form deliberately generic and undetailed;
    do not assert Ashdoda or any specific type without that check).
- **New, botanical/interpretive dispute (basis `biblical-text` for the
  narrated sign at `high` confidence; the species identification itself
  needs a `scholarlyViews` block):**
  - `claim-balsam-trees-sign` (5:23–24 — the narrated sign is high-
    confidence "the text says this"; the species identification of בְּכָאִים
    is genuinely disputed — ESV "balsam trees," KJV "mulberry trees," and
    other renderings including "poplar/aspen" or a "weeping trees" reading
    tied to the root _bakah_ — carry at least two views with a `TO VERIFY`
    hedge on named proponents until a researcher pass attaches citable
    sources; the rendered tree form stays a generic, non-species-committed
    placeholder pending that pass, per `asset-balsam-grove`'s
    `whyTemporary`). Consider also flagging in `docs/uncertainty-register.md`
    at build time — this looks like a genuine new register-worthy question
    (whether the "sound of marching" itself is meant naturalistically-but-
    providentially or reflects an older tradition of a heard-but-unseen
    divine host is a related, separate interpretive question worth a hedge
    in the same claim's notes, not a second claim).
- **New, atlas (not blocking this scene's geometry):** `route-baal-perazim-
geba-gezer` in `src/data/routes.ts`, following the `route-ziklag-besor`/
  `route-jabesh-beth-shan` pattern; Geba and Gezer need at minimum
  referenced-only `LocationEntry` stubs (parallel to Mahanaim's pattern) if
  the route is added. Flagged for whoever does the atlas-extension pass
  (M6's fourth item per the milestone comment), not required to unblock
  this scene's own build.
- **Characters:** no new named individuals. Reuse `david` and `davids-band`
  only; the Philistine force stays entirely anonymous, consistent with the
  text.
- **ESV excerpt budget:** `2sam-5` is shared across all three M6 scenes
  (unspent as of this brief). Recommend this scene spend at most **one**
  quote: **5:20b, "the LORD has broken through my enemies before me like a
  breaking flood"** — the most textually vivid line in the passage and the
  direct source of the place-name Baal-perazim, so it earns its place at
  the `b-naming` beat. A second candidate, **5:24's "the sound of marching
  in the tops of the balsam trees,"** would suit the `b-sign` beat well if
  budget allows once `hebron-unification` and `jerusalem-conquest`'s own
  spends are known — verify exact wording, character counts, and the
  shared-passage total against `integrity.test.ts`'s budget at build time
  before committing to both.

## Placeholder policy

- **Allowed placeholders** (each gets an `assets.ts` entry with
  `whyTemporary` before `released`): the plain/lowland terrain form
  (`asset-terrain-valley-of-rephaim`); Baal-perazim's precise site within
  the valley (inherited directly from the `valley-of-rephaim` location
  entry's own disclosed placeholder — this scene does not narrow it further
  than the location entry already does); the balsam-grove tree species and
  exact form (`asset-balsam-grove`, non-species-committed pending the
  researcher pass above); the idol-figurine prop form
  (`asset-philistine-idols-captured`, generic pending the same pass); exact
  figure positions and both musters' groupings; lighting hour (steady
  daylight, unstated in text); "the stronghold"'s exact identification
  (referenced only, never built); the circling route's exact ground path.
- **Not allowed:** any new Jerusalem/City-of-David geometry for the
  `b-stronghold` beat (referenced only — that geometry belongs to
  `jerusalem-conquest`); any Geba or Gezer settlement geometry (atlas route
  only); any depiction of the idols' destruction (1 Chronicles 14:12's
  burning detail is outside 2 Samuel and out of this scene's textual
  scope); any named-individual killing on either side (none is narrated);
  any melee/hand-to-hand choreography rivaling Gilboa's line-clash or
  Gibeon's champions' contest; any casualty count, named or numeric, stated
  or implied on screen; blood/gore/dismemberment geometry in either
  violence mode; close or lingering camera framing on any falling figure;
  triumphal staging, trophies, or standards at the idol-retrieval beat or
  anywhere else; any 2 Samuel 6+ content, depicted or foreshadowed, beyond
  the closing text-only pointer to M7; a specific botanical species
  asserted for the balsam/mulberry trees without the researcher
  citation-check called for above.
