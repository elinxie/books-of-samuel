# Scene brief — Nathan's oracle and David's prayer (`nathans-oracle`, M8)

World-director pass, Sonnet, 2026-08-27 (per `CLAUDE.md`'s "Model policy — do not
invoke Fable": this pass carries the architecture/creative authority formerly
routed to Fable). Implementation: Sonnet/`threejs-engineer` within this
direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Sole scene of Milestone 8, and the smallest and
least action-heavy scene the project has built to date.

Scope guard: this brief covers **2 Samuel 7 in full (7:1–29)**. David's wish to
build a house for the ark (7:1–3), Nathan's night oracle (7:4–17), Nathan's
report (7:17), and David's prayer before the LORD (7:18–29) all stage here.
**Nothing from 2 Samuel 8 onward appears** — no named wars, no officials list,
and above all no naming or visual identification of Solomon (already born per
5:14, but not named or implied here — the "offspring" of 7:12 stays exactly as
unspecified on screen as it is in the text), no Bathsheba, no actual
construction of a temple, and no resolution of whether the throne promise is
kept, broken, or complicated. The scene renders only what 7:1–29 itself states
and stops exactly there.

## Historical intent

The observer should come away understanding four things:

1. **This is the theological hinge of the whole book, staged with the most
   restraint the project has ever used — the weight is carried by what is
   said, not by any visual amplification.** No triumphal framing, no light,
   no visual cue treats the promise as more certain or more momentous than
   the text's own plain report of a conversation and a prayer. The observer
   who has just walked through two milestones of procession, death, dance,
   and confrontation arrives here to find the camera holding almost entirely
   still — that stillness is deliberate, not a placeholder awaiting a future
   upgrade.
2. **David's plan and God's answer trade places on the word "house."** David
   wants to build the LORD a house (a temple, 7:2); the LORD answers by
   promising to build David a house (a dynasty, 7:11b) instead. The text's
   own wordplay is the chapter's structure, not a project gloss — captions
   should let a careful observer notice it without editorializing it into a
   stated "lesson."
3. **Nathan is wrong once, corrected directly, and the text keeps both
   moments in view.** 7:3 has Nathan tell David to go ahead, "for the LORD is
   with you" — a reasonable pastoral answer, given without consulting the
   LORD first. That same night the LORD corrects the plan outright (7:5–7).
   The scene does not soften Nathan's initial answer into a hedge, and does
   not treat the correction as a rebuke of Nathan personally (the text
   addresses David, not Nathan's judgment) — both are rendered exactly as
   the text gives them.
4. **David's prayer is the text's own extended act of self-examination, not
   a triumphant acceptance speech.** Its opening question — "Who am I, O
   Lord GOD, and what is my house, that you have brought me thus far?"
   (7:18b) — sets the register for everything that follows: rehearsal of
   what has already been done, astonishment, and petition ("confirm it
   forever," 7:25), not self-congratulation. The seated, still posture
   staged for this beat is the visual expression of that register.

## Resolved design calls (this pass)

- **One small scene, not a cards-only atlas treatment — a genuinely close
  call, decided here and flagged provisional (queue #27).** The alternative
  seriously considered: 2 Samuel 7 has no crowd, no procession, no death, no
  journey between distinct sites, and every fact in it could be carried
  honestly by a card sequence alone, with nothing lost — this is not a
  rationalization, it is true. What the scene adds over cards: (a) the
  **spatial callback** of standing in the same enclosure `jerusalem-stronghold`
  and `ark-into-jerusalem` already built, seeing David's house finally
  complete after two milestones of watching it under construction, and
  watching David walk to and sit at the same tent he danced in front of —
  an observation specific to inhabiting a place, not reducible to a caption;
  (b) the **near-zero marginal cost** of building it, since almost every
  asset (terrain, palette, enclosure, tent) is a straight reuse and the only
  new geometry is finishing an already-existing structure and two named
  figures in seated/conversational poses. Both of those reasons are genuine,
  not merely "every milestone gets a scene" inertia — but this is still the
  place in the project where the ADR-011 decision test comes closest to a
  "no," and a future reviewer could reasonably reverse this call toward
  cards-only without needing to unbuild anything expensive. Confirm or
  reverse at the M8 build/sign-off review, the same way #21 was confirmed at
  M6's.
- **Nathan's oracle (7:4–17) is carried entirely by caption/card; the
  reception beat itself is staged as ordinary night stillness, nothing
  more — the purest application of ADR-013 to date (queue #28).** Every
  prior ADR-013 case had some physical thing to withhold an effect from (a
  natural phenomenon at 5:24, a resulting death at 6:7); this passage has
  none — "the word of the LORD came to Nathan" leaves no observable trace of
  any kind, not even a natural correlate a viewer could misread as
  coincidence. **Resolved:** Nathan is shown settled for the night — resting,
  as anyone in his position would be at that hour — with no receptive
  posture, no upward gaze, no listening gesture, no light, glow, or sound
  cue, and no camera language (push-in, hold, reveal) implying a presence.
  The entire content of the oracle — the rejection of the temple plan, the
  recollection of David's rise from the pasture, the promise of rest from
  enemies, the promise to raise up David's offspring and establish his
  kingdom, the father-son language, the assurance that steadfast love will
  not depart even after discipline, and the throne "established forever" —
  is carried by card/caption exactly as the text states it, in the text's
  own first-person divine voice ("Thus says the LORD..."), not paraphrased
  into third-person summary.
- **David's house is shown complete for the first time — on 7:1's own
  textual license, not a discretionary upgrade.** `claim-hiram-building`
  (M6) and its explicit M7 restatement ("reused unchanged, not advanced
  toward completion") have held the house under construction across two
  milestones because neither chapter gave a reason to change it. 7:1 itself
  now does: "Now when the king lived in his house, and the LORD had given
  him rest from all his surrounding enemies..." states plainly that David is
  living in a finished house. **Resolved:** the exterior is rendered
  complete (walls closed, roof finished, scaffolding/craftsmen removed) —
  still a `design-placeholder` for interior layout, decoration, and exact
  scale, exactly as the under-construction version was a placeholder for its
  own final form; nothing about interior specifics is newly asserted. A new
  claim (`claim-davids-house-complete`, cross-referencing `claim-hiram-
building`) carries this narrow, textually licensed change; render the
  reception beat (7:1–3) in an exterior courtyard/entrance space consistent
  with the four-room-house comparative form already used for the Kiriath-
  jearim and household staging in M7, not an invented interior.
- **"Rest from his surrounding enemies" (7:1b) is stated, never depicted.**
  This is the chapter's own use of language the M6/M7 hard scope guards
  explicitly forbade earlier scenes from reaching forward to — here, finally,
  it is the text directly in front of the scene, not a foreshadowing gloss.
  It is carried as a card stating the text's own summary claim, with **no
  battle, siege, or victory imagery of any kind** — 2 Samuel 8's specific wars
  are a separate chapter, out of scope, and the text itself gives no detail
  here beyond the general statement.
- **"Sits before the LORD" (7:18a) is staged as a deliberate, disclosed
  posture — a seated king at the tent, not enthroned, not standing.** The
  text's own choice of word ("sat," not "stood" or "bowed") is worth
  preserving visually since it is unusual for a king in a formal religious
  moment; the scene stages David seated just outside or at the entrance of
  the tent (reused from `ark-into-jerusalem` unchanged, per that scene's own
  no-interior-tabernacle-furnishing restraint) rather than asserting entry
  into an interior the project has never modeled and has no basis to
  invent. This is a staging choice reflecting the text's own word choice,
  disclosed as such — not an interpretive claim about what "before the LORD"
  theologically means.
- **David's prayer (7:18b–29) is card-carried over a held, largely static
  camera on David's seated stillness — no gesture is invented beyond
  ordinary prayer posture (head inclined, hands open or at rest).** The
  prayer is long; the scene does not attempt to stage or dramatize its
  content beat by beat. Camera holds, cards advance through its structure
  (astonishment/self-examination, rehearsal of the promise, petition), ESV
  excerpt spend concentrated here and at the oracle's peak line (see
  Required source basis).
- **The compositional-layering question (redaction criticism) is disclosed
  in claim notes only, not staged, and not resolved — queue #29, a new
  category of scholarly dispute for this project.** Critical scholarship
  widely reads parts of the oracle (most often 7:13a, "he shall build a
  house for my name," which anticipates Solomon and the temple) as a later
  theological expansion within an earlier promise-oracle core. This is a
  dispute about compositional history, not identification, historicity,
  translation, or causation — a genuinely new shape of uncertainty next to
  everything `scholarlyViews` has carried before. **Resolved for this pass:**
  the scene renders the received text as a single narrated event, matching
  the project's standing practice everywhere else (narrate the text as it
  stands; do not visually stage a reconstructed compositional history). If
  a named critical-commentary citation is found at build time (`mccarter-
1984-ii-samuel`, once extended to 2 Samuel 7, is the first place to check —
  this exact question is central to any serious modern commentary on this
  chapter), it is carried as a `scholarlyViews` entry on `claim-nathan-
oracle`, hedged; if not found by build time, it stays a disclosed
  `design-placeholder`-adjacent note, not forced.
- **Conversation-scale cast, the smallest of any scene to date.** David and
  Nathan alone for every staged beat; no crowd claim of any kind is needed.
  A light, optional ambient population reused from `jerusalem-stronghold`'s
  existing figures (not newly authored) may populate the establishing shot
  of the house/enclosure for visual continuity with the already-populated
  capital, but nothing about this event requires or implies onlookers, and
  none should be staged reacting to it.

## Visual composition

- **Terrain:** entirely reused from `jerusalem-stronghold`/`ark-into-
jerusalem` — the ridge, the stronghold enclosure, and the tent — unchanged.
  The only new geometry is David's house finished (closing off the under-
  construction state) and two figures in seated/conversational poses. No new
  `TerrainSpec`.
- **Focal masses:** (a) **David's house, now complete** — the reception
  ground for 7:1–3 and 7:17 (Nathan's report); (b) **a quiet corner of the
  same enclosure at night**, unremarkable, for Nathan's stillness beat —
  disclosed as a placeholder position, not a newly located structure; (c)
  **the tent**, reused unchanged, for 7:18–29.
- **Sightlines:** the default vantage sits close and low, conversation-scale,
  the two figures seated or standing near each other rather than any
  formal audience-hall framing — this is two men talking, not a court
  scene. At the tent, the camera holds at a respectful middle distance on
  David's seated stillness, never pushing in tight enough to read as probing
  an interior the project does not model.
- **Lighting:** genuinely textually grounded for once, not a blanket
  `design-placeholder` — 7:1–3 and 7:17–29 play in daytime (unstated hour,
  disclosed as a reasonable default); 7:4's "that same night" beat is the
  project's first scene beat with an explicit narrated time of day: rendered
  as an ordinary, unremarkable night — ambient darkness, no dramatic
  moonlight or staged glow, matching ADR-013's restraint exactly.

## Scale assumptions

- **Principals only: David, Nathan.** No named or unnamed additional
  figures are required by the text at any beat.
- **Optional ambient continuity population: ≤10, static, reused from
  `jerusalem-stronghold`**, in the house establishing shot only — not staged
  reacting to any beat, not present at the tent.
- **High-tier total ≈ 2–12 figures** — by a wide margin the smallest scene
  the project has built; no crowd, procession, or cast-scale claim is
  needed. If any disclosure is written at all, a one-line note on
  `claim-nathan-oracle-house-request` stating the cast is exactly two
  principals is sufficient — there is no ratio or representative-gathering
  question to resolve here, unlike every prior milestone.

## Camera / observer experience

- **Default viewpoint** (`vp-davids-house`): the completed house's
  reception ground, where 7:1–3 and 7:17 play.
- Additional viewpoints: **the night corner** (`vp-night-stillness`, 7:4–17,
  held/static, inspect emphasis only — there is nothing to walk toward);
  **the tent** (`vp-tent-prayer`, reused `ark-into-jerusalem` framing,
  7:18–29, held/static).
- **Walk emphasis:** minimal by design — this is the project's first
  stillness-emphasis scene rather than a walk/procession one. A short,
  optional guided path from the house to the tent (`b-walk-to-tent`) is the
  only movement beat; an observer who wants to simply stand and read every
  card can do so without missing anything (ADR-011's "can still ignore it"
  test, satisfied trivially here).
- **Timeline beats** (`depictsDeath: false`; no reduced-mode fork needed for
  any beat — nothing violent or graphic is depicted anywhere in this scene;
  suggested duration ~110s, the shortest of any scene, deliberately, since
  padding a two-person, mostly-verbal chapter to match prior scenes' length
  would misrepresent its own pace):
  - `b-open` (7:1) — Card: David settled in his (now complete) house; the
    LORD has given him rest from his surrounding enemies — stated plainly,
    no battle imagery. Default viewpoint established.
  - `b-david-wish` (7:2) — Staged: David tells Nathan, "See now, I dwell in
    a house of cedar, but the ark of God dwells in a tent." Conversation-
    scale dialogue.
  - `b-nathan-assent` (7:3) — Staged: Nathan's reply, "Go, do all that is in
    your heart, for the LORD is with you." Held beat — Nathan speaks without
    yet consulting the LORD; the text does not editorialize this as an
    error and neither does the caption.
  - `b-night-word` (7:4–17) — Staged/card: night falls; Nathan settled in
    ordinary stillness (no receptive posture, ADR-013). Card carries the
    oracle's full content in the text's own first-person voice: the
    rejection of the temple plan (7:5–7), the recollection of David's rise
    (7:8–9a), the promise of a name, a place for Israel, and rest (7:9b–11a),
    the promise to build David a house and raise up his offspring, whose
    kingdom's throne will be established forever (7:11b–13), the father-son
    discipline language with steadfast love that will not depart (7:14–15),
    and the closing line, "your house and your kingdom shall be made sure
    forever before me. Your throne shall be established forever" (7:16). ESV
    excerpt spend at 7:16 (see Required source basis).
  - `b-report` (7:17) — Staged: Nathan returns and speaks to David "in
    accordance with all these words and all this vision" — a brief
    conversation-scale beat back at the house, not a restaging of the
    oracle's content (already carried at `b-night-word`).
  - `b-walk-to-tent` — Staged, optional guided path: David goes from his
    house to the tent housing the ark. Continuity shot through the reused
    enclosure terrain.
  - `b-david-sits` (7:18a) — Staged: "Then King David went in and sat before
    the LORD" — the seated posture itself is the beat; camera holds.
  - `b-prayer` (7:18b–29) — Card-carried over the held shot: David's prayer
    in full structure — the opening self-examination ("Who am I, O Lord
    GOD..."), the rehearsal of what the LORD has done and promised, the
    petition that the word spoken be confirmed forever, and the closing
    affirmation ("you are God, and your words are true..."). ESV excerpt
    spend at 7:18b and optionally 7:28–29 (see Required source basis).
  - `b-close` — Closing card: states only what 7:1–29 states — the promise
    made, nothing about its fulfillment, complication, or later history.
    **No 2 Samuel 8+ content of any kind** — no named wars, no officials
    list, no Solomon named or implied, no Bathsheba, no temple built.

## Performance target

- ≈ 2–12 high-tier figures — trivially cheap, the cheapest scene in the
  project by a wide margin. No new `InstancedMesh` population families are
  needed beyond the two principal figures (reusing the existing figure rig)
  and, optionally, a handful of reused ambient household figures for the
  house establishing shot.
- New pose work is limited to seated/conversational poses for two named
  figures (David, Nathan) — no new choreography families, no combat/
  procession/crowd systems.
- The house-completion geometry is a modest exterior finish pass on an
  already-existing structure (closing walls/roof, removing scaffolding/
  craftsmen), not a new building type.
- No new lights, no fire, no particle systems, no water. Reuse the ADR-010
  procedural rig unchanged. The night beat uses ambient darkness only — no
  new lighting rig, no moonlight effect standing in for anything.
- No dedicated `performance-reviewer` pass is anticipated to be necessary
  given the figure count, but run one anyway if the optional ambient
  population or the house-finish geometry turns out to be more expensive
  than expected — cheap insurance at this scale.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty
in `scenes.ts` until they exist. Claim consolidation is allowed per the
`gibeon-pool` precedent — this scene's small cast and low claim count make
consolidation especially natural here.

- **Existing, reuse:** `claim-hiram-building` (cross-referenced, not
  restated, by the new completion claim below), `claim-ark-tent-form` (the
  tent, unchanged), `claim-jebusite-stronghold-form` (terrain reuse),
  `claim-city-of-david-naming`, `claim-dress`, `claim-david-historical`.
  Source cards already on hand: `esv-bible`, `rainey-notley-2006`,
  `king-stager-2001` (four-room-house comparative form, already used for
  the reception-ground staging convention). `mccarter-1984-ii-samuel`
  currently extends only through 2 Samuel 6 and needs extending to 2 Samuel
  7 — the cheapest route both to a named attribution on the redaction-
  critical question (queue #29) and to any named treatment of the
  chapter's covenant-theology significance; flag as a new researcher item
  if not done by build time.
- **New, narrated (basis `biblical-text`):** `claim-nathan-oracle-house-
request` (7:1–3 — David's wish, Nathan's initial assent, the cast-scale
  disclosure that this scene has exactly two principals); `claim-nathan-
oracle` (7:4–17 — the full oracle content, explicitly governed by ADR-013 in
  its notes: the communication event itself is stated, never visualized,
  and this is disclosed as the purest test case to date since there is no
  physical correlate of any kind to withhold; `scholarlyViews` slot reserved
  for the redaction-critical reading per queue #29, hedged until a named
  citation lands); `claim-nathan-report` (7:17 — Nathan's report to David;
  may be consolidated into `claim-nathan-oracle` at the implementer's
  discretion, since it stages no new content); `claim-david-prayer` (7:18–29
  — the full structure of David's prayer as the text gives it).
- **New, design (basis `design-placeholder` unless sourced):**
  `claim-davids-house-complete` (the house shown finished — basis
  `biblical-text` citing 7:1 for the fact of completion, `design-placeholder`
  for interior/decorative specifics, cross-referencing `claim-hiram-
building` explicitly and stating the two-milestone under-construction
  history it supersedes); `claim-oracle-depiction` (the ADR-013 rendering-
  policy claim itself for this specific beat — cross-references ADR-013 and
  its two prior applications, queue #24/#25, and states explicitly why this
  case has no physical correlate to withhold, unlike either prior one;
  queue #28).
- **Characters:** reuse `david` (extend `passageRefs` to 2 Samuel 7). New:
  `nathan` (the prophet) — **explicitly note in the character record's
  notes that this is a different person from the Nathan named among
  David's sons at 2 Samuel 5:14** (card-only there, no character record
  exists for that Nathan, but future captions must not conflate the two).
- **ESV excerpt budget (`2sam-7`, a fresh passage, ≤3-quote handful, all
  spent within this one scene since it is the passage's only scene):**
  recommended split — **7:16** ("your house and your kingdom shall be made
  sure forever before you. Your throne shall be established forever.") at
  the oracle's peak line; **7:18b** ("Who am I, O Lord GOD, and what is my
  house, that you have brought me thus far?") at the prayer's opening;
  optionally a third from **7:28–29** if budget allows ("And now, O Lord
  GOD, you are God, and your words are true, and you have promised this
  good thing to your servant."). Verify exact ESV wording at build time via
  the WebSearch snippet cross-corroboration pattern that closed queue
  #20(e)/#19(b) — direct fetches to Bible-text sites remain sandbox-blocked;
  do not enter any quote from memory (#19(b)'s lesson, restated every
  milestone since for a reason).

## Placeholder policy

- **Allowed placeholders:** the exact form/dimensions of the completed
  house's exterior beyond "finished, cedar, modest by comparative
  standards"; the interior of the house (not modeled — staging stays in an
  exterior courtyard/entrance space); the night-stillness beat's exact
  position within the enclosure (disclosed, no atlas pin, same treatment as
  Perez-uzzah's threshing floor); the optional ambient population's count
  and positions; lighting hour for the daytime beats.
- **Not allowed:** any visual effect standing in for the oracle's reception
  — no light, glow, wind, particle effect, environmental animation, audio
  cue, or camera language (push-in, hold-on-nothing, reveal) implying a
  presence or an unseen actor, at `b-night-word` or anywhere else in this
  scene (ADR-013); any receptive/visionary posture invented for Nathan (no
  clutching, no upward gaze, no trance framing) — he is shown at ordinary
  rest, nothing more; any depiction of David's "rest from his surrounding
  enemies" (7:1b) as battle, siege, or victory imagery — stated by card
  only; any interior of the ark's tent, or any furnishing invented for it
  beyond what `ark-into-jerusalem` already established; any figure, name, or
  visual cue identifying Solomon or any specific son as the promised
  "offspring" of 7:12 — the text does not name him here and neither does
  the scene; any depiction, mention, or visual foreshadowing of Bathsheba,
  the temple's actual construction, 2 Samuel 8's wars, or any later
  fulfillment or complication of the throne promise, in any card, caption,
  or staging, including the closing card; conflating the prophet Nathan
  with the identically named son of David from 2 Samuel 5:14, in any
  caption or character record; staging the redaction-critical reading of
  the oracle as a visual "layering" of the geometry or a split event — it
  stays a claim-notes-only disclosure per queue #29; a crowd, procession, or
  any cast-scale claim beyond the two-principal disclosure — there is no
  narrated crowd anywhere in this chapter and none should be invented.
