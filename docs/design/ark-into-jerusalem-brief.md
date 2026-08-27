# Scene brief — the ark brought up with gladness, David's dance, and Michal's

contempt (`ark-into-jerusalem`, M7)

World-director pass, Sonnet, 2026-08-26 (per `CLAUDE.md`'s "Model policy — do
not invoke Fable"). Implementation: Sonnet/`threejs-engineer` within this
direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second and last scene of Milestone 7.

Scope guard: this brief covers **2 Samuel 6:12–23**. It picks up at the exact
point `perez-uzzah` leaves off — the ark resting at Obed-edom's house — and
**reuses `jerusalem-stronghold`'s terrain, enclosure, and palette rather than
building new Jerusalem geometry**, per the M6-precedent reuse discipline (M5's
scenes reusing Hebron). **Nothing from 2 Samuel 7 onward — the dynastic oracle,
the temple, Bathsheba — appears anywhere, depicted or foreshadowed**, including
any forward gloss on David's "house" (7:1's opening plays directly off 6:20's
language about David's household, and the temptation to gesture at it must be
resisted explicitly). The milestone ends where the chapter ends: on Michal's
childlessness, stated as the text states it.

## Historical intent

The observer should come away understanding four things:

1. **The same ground, the same object, and the opposite outcome — that
   contrast is the reason this scene reuses `jerusalem-stronghold`'s terrain
   rather than building new ground.** The observer who walked the ridge, the
   enclosure, and the unfinished house in `jerusalem-stronghold`, and who then
   watched Uzzah die beside this same ark in `perez-uzzah`, arrives here to see
   the ark brought into that same city "with gladness." The danger and the
   blessing the text places back to back at 6:11 resolve into a single scene
   built on already-familiar ground — that continuity is the point, not a
   cost-saving shortcut that happens to also be historically apt.
2. **David crosses a status line on purpose, and the text stages it as a
   contrast with Michal, not as an accident.** David dances "before the LORD
   with all his might," wearing a linen ephod rather than royal regalia — a
   king performing an unrestrained, non-elite, cultic-adjacent role in public.
   6:16 and 6:20–23 frame Michal's aristocratic disdain directly against this;
   the text keeps both David's self-description ("I will celebrate before the
   LORD... I will be abased in your eyes") and Michal's contempt in view
   without adjudicating between them, and so does this scene.
3. **The chapter closes on an unresolved domestic rupture, not a
   reconciliation — and the project renders no reconciliation that isn't
   there.** 6:20–23 is a real argument with no narrated resolution; 6:23's
   closing note (Michal had no child to the day of her death) is stated by the
   text with no stated cause. Neither divine judgment nor a specific
   naturalistic explanation is asserted by 2 Samuel 6 itself, and the scene
   must not assert one either.
4. **The gladness is real and stages fully — the restraint here is about
   visual grammar, not about withholding joy.** Unlike M6's battle scenes,
   nothing here calls for muting celebration: the text affirms the dancing,
   the shouting, the trumpet, the sacrifices, and the communal food
   distribution to "the whole multitude of Israel, both men and women" (6:19)
   as genuinely joyful. What must be resisted is a specific visual grammar —
   royal/military triumph (crowns, raised standards, conquest-parade framing)
   — because the text's own emphasis at this exact moment is David's
   self-abasement, not self-glorification, and a triumphal render would
   contradict the text it is illustrating.

## Resolved design calls (this pass)

- **Reuse `jerusalem-stronghold`'s terrain, enclosure geometry, palette, and
  the unfinished-house asset — unchanged.** The house Hiram's craftsmen were
  building in `jerusalem-stronghold` (5:11–12) is reused in its same
  under-construction state, not advanced toward completion. The text gives no
  timeline connecting the two beats, and rendering it more finished here would
  assert a specific construction schedule the project has no basis for;
  rendering it exactly as it stood keeps the claim honest and is also the
  cheap, correct choice. Michal's window (6:16) is a usable opening in this
  same structure — a partially built house can still have occupied,
  functional rooms, which is itself an ordinary and unremarkable state, not a
  design compromise requiring its own disclosure beyond what
  `claim-hiram-building` already carries.
- **The ark's physical form is the same asset established in `perez-uzzah`,
  unchanged.** See that brief's Resolved design calls and `claim-ark-physical-
form`; no new decision needed here beyond cross-referencing it.
- **A new small structure: the tent David pitched for the ark (6:17).**
  Rendered as a simple, disclosed-placeholder woven/leather tent form at the
  enclosure's central or high point — modest, not monumental, and
  **explicitly not the tabernacle at Gibeon** (1 Chronicles 16:39 states the
  tabernacle and its altar remained at Gibeon at this time — a different
  structure in a different text, not staged here or implied present in
  Jerusalem). `claim-ark-tent-form` carries this distinction explicitly in its
  notes.
- **Sacrifice is depicted with the same restraint principle ADR-009 applies to
  human death, extended by clear analogy — this is the project's first
  staged sacrificial offering.** 6:13 has David sacrifice an ox and a fattened
  animal every six paces. **Resolved:** living animals and ritual activity
  (an altar/offering ground, smoke, an anonymous officiant or two) convey the
  offering; **the act of slaughter itself is elided or held off-camera in both
  modes** — no wound, blood, or carcass geometry, matching the honesty-without-
  gore standard the project already applies to every other depiction of
  killing. This is a reasoned extension of existing policy, not a new ADR;
  flagged in this brief's notes rather than escalated to the queue, since the
  underlying principle ("violence shown honestly, never gratuitously," per
  `CLAUDE.md`) already covers it without a genuinely contested judgment call.
  No priest or Levitical office is named at this point in the text; render an
  unnamed officiant, not a specific priestly figure invented from later texts.
- **The dance is staged fully; the alleged exposure is never rendered, in any
  mode.** David's dancing "with all his might" (6:14) is a real, joyful,
  vigorous physical act and stages as one — leaping, whirling motion at
  documentary-to-full distance, never close or lingering framing. Michal's
  charge — that David "uncovered himself today before the eyes of his
  servants' female servants, as one of the vulgar fellows shamelessly
  uncovers himself" (6:20b) — is a genuinely disputed reading (a literal
  wardrobe malfunction from vigorous movement in a linen ephod vs. a
  rhetorical, status-charged exaggeration reflecting Michal's own contempt
  rather than a literal event) and the scene does not adjudicate it: **David's
  figure stays fully clothed in the linen ephod in every mode and at every
  camera distance; no exposure, partial or implied, is ever modeled or
  suggested by framing.** Michal's accusation is carried entirely by her
  spoken words and the caption — the same "spoken, never enacted" discipline
  `jerusalem-stronghold` used for the blind-and-lame taunt. `scholarlyViews`
  on the claim carries both readings, hedged until named.
- **Michal is staged as a figure for the first time in the project.** Every
  prior appearance (`hebron-covenant`'s transfer from Paltiel) was
  referenced-only by design; this scene is the first place the text itself
  puts her in a scene the project can honestly stage (at a window, then in a
  direct confrontation). Her character record moves from referenced-only to
  staged at build time; no new claim is needed for this transition beyond the
  narrated claims below.
- **6:23's causation is stated, not supplied.** "Michal the daughter of Saul
  had no child to the day of her death" is rendered as a closing card stating
  exactly that fact, with **no visual or textual assertion of a specific
  cause** — not divine judgment, not an implied end to marital relations, not
  any other reading. If a named commentator's reading is found at build time,
  it is carried as a `scholarlyViews` entry, hedged; if none is found, the
  claim states the bare fact only and discloses that the text itself gives no
  cause.
- **No royal/triumphal visual grammar, despite genuine celebration.** No
  crowns, no raised standards, no conquest-parade framing, no scoreboard-like
  captions. The offerings, the dance, the trumpet, and the food distribution
  read as a communal religious festival, not a monarch's victory procession —
  ADR-011's affordance test and the M6 no-triumphalism precedent both apply
  here even though, unlike M6's battles, there is no defeated party to avoid
  gloating over; the discipline is about visual language, not about muting
  the text's own affirmed joy.
- **The food distribution (6:19b) stages as a genuinely communal beat**, not
  an elite banquet — bread, a portion of meat, and a raisin cake reaching
  ordinary figures throughout the crowd, "both men and women," a deliberate
  visual contrast with any hierarchy-first framing.

## Visual composition

- **Terrain:** reused from `jerusalem-stronghold` — the ridge, the
  stronghold enclosure, the terraced eastern slope, and the unfinished
  house — unchanged. New elements are limited to: the tent, an offering
  ground/altar, and Michal's window as a functional opening in the existing
  house asset.
- **Focal masses:** (a) **the enclosure interior**, where the tent stands and
  the dance and sacrifices play — the scene's default ground; (b) **the ark
  and tent**, the settling point the whole procession moves toward; (c) **the
  offering ground**, adjacent, where the sacrificial activity is staged with
  restraint; (d) **Michal's window**, a fixed vantage point on the existing
  house asset; (e) **the confrontation ground**, just outside or within the
  household, conversation-scale.
- **Sightlines:** the default vantage sits inside the enclosure, framing the
  tent and the dancing crowd together — deliberately the "inside" half of
  `jerusalem-stronghold`'s own before/after pair, now populated and joyful
  rather than a construction site. The window beat cuts to an exterior
  framing that includes both David dancing below and Michal's figure at the
  opening, in the same shot, so the contrast the text stages is visually
  legible without needing intercut close-ups.
- **Lighting:** daytime, hour unstated — steady, matching
  `jerusalem-stronghold`'s convention exactly (continuity of ground, continuity
  of light), disclosed `design-placeholder`.

## Scale assumptions

- **The procession/marching column is the same instanced population
  established in `perez-uzzah`, reused and repositioned, not doubled** — the
  `rephaim-valley` precedent for a population that moves between beats rather
  than coexisting as two groups. Disclosed design count ≈ 150–200 (see
  `perez-uzzah`'s `claim-ark-procession-cast-scale`, cross-referenced here, not
  restated).
- **Ambient Jerusalem population: reuse `jerusalem-stronghold`'s ≈ 20–30
  static ambient household/settlement figures**, now active as onlookers and
  recipients at the distribution beat rather than static background.
- **Principals:** David, Michal (first staged appearance). One or two unnamed
  officiants at the offering ground. No named priest or Levite (the text
  names none here).
- **High-tier total ≈ 190–250 figures** — the reused procession plus reused
  Jerusalem ambient plus the distribution-beat crowd activity, still below
  `gilboa-battle`'s measured band. Hard cap: this scene must not exceed
  `gilboa-battle`'s high-tier instance count while that scene's real-hardware
  performance check is still open (`docs/next-run.md`).
- `claim-ark-into-jerusalem-cast-scale` carries the above as a disclosed
  design claim, cross-referencing `perez-uzzah`'s cast-scale claim rather than
  re-deriving it.

## Camera / observer experience

- **Default viewpoint** (`vp-enclosure-tent`): inside the stronghold
  enclosure, the tent and the dancing crowd in frame — the populated
  counterpart to `jerusalem-stronghold`'s quiet `vp-stronghold`.
- Additional viewpoints: **the offering ground** (`vp-offering-ground`, the
  sacrifice beat, restrained/inspect emphasis); **the window** (`vp-michal-
window`, the dual-framing shot of David below and Michal above); **the
  household ground** (`vp-household-close`, the confrontation, conversation-
  scale, modeled on `hebron-reckoning`'s `vp-receiving-ground`).
- **Timeline beats** (`depictsDeath: false`; suggested duration ~150s). No
  reduced-mode fork is needed for any beat in this scene — nothing violent is
  depicted (the sacrifice beat's restraint is handled by staging choice, not a
  mode fork, since ADR-009's mode split is specifically for narrated deaths
  and this project has never treated animal sacrifice as needing the same
  dual-mode machinery; if a future scene needs a bloodier sacrifice depiction
  this convention should be revisited then, not here):
  - `b-report` (6:12a) — Opening card: David is told the LORD has blessed the
    house of Obed-edom because of the ark. Cross-references `perez-uzzah`'s
    closing beat directly.
  - `b-departure-2` (6:12b) — Staged: David goes and brings up the ark from
    Obed-edom's house to the city of David "with gladness." Continuity shot
    from the reused Obed-edom set into the reused Jerusalem terrain.
  - `b-sacrifice-steps` (6:13) — Staged: after six paces, an ox and a fattened
    animal are sacrificed. Offering-ground vantage; ritual activity conveyed,
    slaughter elided in every mode.
  - `b-dance` (6:14–15) — Staged: David dances before the LORD with all his
    might, wearing a linen ephod; all Israel brings up the ark with shouting
    and the sound of the horn. Default viewpoint. Fully clothed throughout;
    no exposure rendered.
  - `b-window` (6:16) — Staged: Michal watches through the window — her first
    staged appearance — sees David leaping and dancing, and despises him in
    her heart. Rendered as a still, distant figure at the opening; her
    internal reaction carried by caption, not by any invented gesture beyond
    stillness/withdrawal from the window.
  - `b-tent-placement` (6:17–19a) — Staged: the ark set in its place inside
    the tent; burnt offerings and peace offerings before the LORD; David
    blesses the people in the name of the LORD of hosts.
  - `b-distribution` (6:19b) — Staged: bread, a portion of meat, and a raisin
    cake distributed to each of the whole multitude of Israel, men and women;
    the people return home. Communal framing, no hierarchy-first staging.
  - `b-return-household` (6:20a) — Card/staged: David returns to bless his
    own household.
  - `b-confrontation` (6:20b–22) — Staged, conversation-scale: Michal comes
    out to meet him and delivers her rebuke (ESV excerpt #1); David's reply
    (ESV excerpt #2). No exposure enacted at any point; the whole exchange is
    dialogue and caption, at the household-ground vantage.
  - `b-close` (6:23) — Closing card: Michal had no child to the day of her
    death, stated as the text's own bare fact, with no cause asserted (see
    Resolved design calls). **The milestone ends here. No 2 Samuel 7+ content
    of any kind — no dynastic oracle, no temple, no Bathsheba, no gloss on
    David's "house" — depicted, foreshadowed, or pointed at, even obliquely.**

## Performance target

- ≈ 190–250 high-tier figures, mostly reused instanced populations from
  `perez-uzzah` and `jerusalem-stronghold` repositioned rather than newly
  authored. One `InstancedMesh` per family (figure, tent, altar/offering prop,
  distribution prop, terrain elements already established).
- The ark asset, the procession route-curve pattern, and the terrain are all
  reused, not rebuilt — this scene's marginal geometry cost should be small
  relative to either of its two source scenes.
- No new lights, no fire, no particle systems. Reuse the ADR-010 procedural
  rig unchanged.
- Hard ceiling: at or below `gilboa-battle`'s high-tier instance count while
  its real-hardware check remains open.
- Run `performance-reviewer` once after the reused-population repositioning
  and the distribution-beat crowd activity land — the one place this scene
  adds meaningfully to on-screen figure activity relative to a static reuse.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty
in `scenes.ts` until they exist. Claim consolidation allowed per the
`gibeon-pool` precedent.

- **Existing, reuse:** `claim-jebusite-stronghold-form` (cross-reference the
  conservative render, don't restate), `claim-hiram-building` (the
  under-construction house, reused unchanged), `claim-city-of-david-naming`,
  `claim-ark-physical-form` (from `perez-uzzah`), `claim-dress`,
  `claim-david-historical`, `claim-ark-procession-cast-scale` (from
  `perez-uzzah`, cross-referenced for the reused population). Source cards
  already on hand: `king-stager-2001` (household/courtyard conventions for the
  distribution beat), `rainey-notley-2006`, `esv-bible`.
  `mccarter-1984-ii-samuel` needs extending to 2 Samuel 6 (same gap noted in
  `perez-uzzah`) for named attribution on the exposure-reading dispute and the
  6:23 causation question.
- **New, narrated (basis `biblical-text`):** `claim-ark-arrival-jerusalem`
  (6:12–15 — the departure from Obed-edom's house, the sacrifices every six
  steps, the dance, the shouting and trumpet); `claim-ark-tent-offerings`
  (6:17–19 — the tent, the burnt and peace offerings, the blessing in the name
  of the LORD of hosts, the distribution to the whole multitude);
  `claim-michal-confrontation` (6:16, 20–23 — Michal watching and despising
  David in her heart, the confrontation dialogue, David's reply, and the
  closing childlessness fact; `scholarlyViews` on **both** the
  literal-vs-rhetorical reading of "uncovered himself" **and** the
  6:23 causation question, both hedged pending named attribution).
- **New, design (basis `design-placeholder`):** `claim-ark-tent-form` (the
  tent's form; notes explicitly distinguish it from the Gibeon tabernacle of
  1 Chronicles 16:39); `claim-sacrifice-depiction` (the animal-sacrifice
  restraint policy — slaughter elided in every mode, notes cross-referencing
  ADR-009's general principle as the basis for the extension);
  `claim-dance-depiction` (the resolved design call on the dance/exposure
  question — fully clothed in every mode, no exposure rendered, the
  accusation carried by caption/dialogue only); `claim-ark-into-jerusalem-
cast-scale`.
- **Characters:** reuse `david` (extend `passageRefs`), `michal` (transition
  from referenced-only to staged; extend `claimIds` to the new narrated
  claims above), `obed-edom` (referenced at the opening beat, from
  `perez-uzzah`). No new named characters.
- **ESV excerpt budget (`2sam-6`, shared with `perez-uzzah` — that scene
  spends exactly one of the passage's three-quote handful):** **this scene
  gets exactly two**: 6:20b's rebuke ("How the king of Israel honored himself
  today, uncovering himself today before the eyes of his servants' female
  servants, as one of the vulgar fellows shamelessly uncovers himself!") and
  6:21–22's reply ("I will celebrate before the LORD... I will be abased in my
  own eyes..."). Verify exact ESV wording at build time via the WebSearch
  snippet cross-corroboration pattern that closed queue #20(e); do not enter
  either quote from memory (#19(b)'s lesson).

## Placeholder policy

- **Allowed placeholders:** the tent's form and exact placement; the offering
  ground's form and position; Michal's window's exact position on the reused
  house asset; the confrontation ground's exact staging; all figure counts,
  spacings, and positions beyond the reused populations; lighting hour
  (matched to `jerusalem-stronghold`'s existing choice).
- **Not allowed:** any exposure, partial nudity, or camera framing implying
  either, in any mode, at any distance, at the dance beat or anywhere else in
  this scene; any wound, blood, or carcass geometry at the sacrifice beat, in
  any mode; the Gibeon tabernacle rendered, referenced as present, or implied
  to be in Jerusalem at this time; advancing David's house past the
  under-construction state `jerusalem-stronghold` established, or rendering
  any finished/monumental palace; royal or military triumphal visual grammar
  (crowns, raised standards, conquest-parade framing, win-state captions);
  asserting a specific cause for Michal's childlessness beyond 6:23's bare
  statement, in caption or staging; a named priest or specific Levitical
  office invented from a later text; cherubim geometry on the ark (see
  `perez-uzzah`); doubling the procession population instead of reusing and
  repositioning it; any 2 Samuel 7+ content — the dynastic oracle, the
  temple, Bathsheba, or any gloss on David's "house" or "rest from his
  enemies" — depicted, foreshadowed, or pointed at, anywhere, including in the
  closing card.
