# Scene brief — Ziklag, the lament for Saul and Jonathan (`ziklag-lament`, M4)

**PROVISIONAL.** World-director pass by Sonnet, standing in under this role's
documented fallback ("If Fable is unavailable, fall back to `sonnet`... but
mark the resulting scene brief as provisional... for a later Fable pass") —
Fable hit its monthly spend limit mid-session. Tracked in
`docs/fable-review-queue.md` #18 alongside the other two M4 briefs. Every
creative call below should be read as Sonnet's best-effort application of this
project's existing conventions (Ziklag/Besor/Gilboa/Jabesh briefs), not a
Fable ruling — it needs a real Fable read before the scene ships past
`in-progress`.

First scene of Milestone 4. Reuses the existing `ziklag` `LocationEntry` — same
site as `ziklag-aftermath` (M1), a few narrative days later.

**Scope guard:** this brief covers **2 Samuel 1 only** — the Amalekite
messenger's arrival, his account of Saul's death, the royal tokens, David's
and the men's mourning, the messenger's execution, and the Song of the Bow
(1:19–27). It does **not** cover Hebron or David's anointing (2 Sam 2:1–7,
`hebron-anointing`, a separate brief) or Abner/Ish-bosheth/the pool of Gibeon
(2 Sam 2:8–32, `gibeon-pool`, also separate). The scene must not depict Hebron
geometry, an anointing, or any 2 Sam 2 event, even as a forward-looking shot —
closing cards may gesture forward in text only, exactly as `jabesh-burial`'s
closing card gestured to this scene without building it.

**Cross-check constraint (load-bearing for this brief):** 1 Samuel 31:4,
already rendered in `gilboa-battle`, narrates Saul falling on his own sword,
unaided, after his armor-bearer refuses to strike him. The Amalekite's account
to David — that Saul, still alive and leaning on his spear, asked to be
finished off and the Amalekite complied (2 Sam 1:6–10) — does not match that.
The scene's single hardest job is making this discrepancy **legible as a
discrepancy** to the observer, without smoothing it into a harmonized single
story and without visually corroborating the messenger's account as if it
happened. See "Not allowed," below — this is the one placeholder-policy item
that most needs to survive implementation intact.

## Historical intent

The observer should come away understanding four things:

1. **A messenger's story, not a second eyewitness account.** The Amalekite's
   claim is presented by the narrative itself as a claim, made by a man with
   an obvious motive (reward, standing with the man about to become king) and
   an Amalekite identity that a Ziklag audience has every reason to distrust —
   this is the same raiding people David's men buried their grief against in
   1 Samuel 30, now arriving asking for credit. Whether the account is
   invented outright, an opportunistic looter's exaggeration of finding Saul
   already dead, or a garbled secondhand report, the text does not resolve —
   and the scene should not resolve it either. It should simply not be staged
   as corroborated fact.
2. **David executes him for a confession, not (necessarily) for a proven
   killing.** David's own words to the messenger are pointed: "your own mouth
   has testified against you, saying, 'I have killed the LORD's anointed'"
   (1:16). The judgment turns on the self-incriminating claim to have struck
   "the LORD's anointed" — the same principle David invoked to spare Saul
   twice while a fugitive (1 Sam 24:6, 26:9–11) — not on a forensic
   determination of what actually happened on Gilboa. This is a throughline
   worth surfacing: David's restraint toward Saul's person is consistent
   whether Saul is alive and hunting him or dead and slandered by a man
   claiming credit for killing him.
3. **The grief is not political theater.** Before any judgment, David and his
   men tear their clothes and mourn "until evening" (1:11–12) — for Saul, for
   Jonathan, for "the people of the LORD," for "the nation of Israel." The
   scene should let this register as real before the observer sees David turn
   to judgment and then to composed lament; staging the grief-then-judgment
   sequence out of order, or compressing the grief into a beat that reads as
   pretext, would misrepresent the text's own pacing.
4. **The lament is literature, commissioned as literature.** David orders the
   Song of the Bow taught to the sons of Judah (1:18) and it is preserved (the
   text says) in the Book of Jashar — itself a lost source the Bible cites
   more than once (cf. Joshua 10:13), a detail worth a caption note as
   evidence of Israel's own now-vanished literary tradition. The poem mourns
   Saul and Jonathan together, refusing to let David's rise eclipse grief for
   a defeated rival king — "in life and in death they were not divided"
   (1:23) is about the father and son, not about David's feelings toward
   Saul, and the observer should come away having actually encountered lines
   of the poem, not only a summary that it existed.

## Resolved design calls (this pass)

- **The false claim is carried by caption/cross-reference only, never by
  corroborating visuals.** No flashback, no reenactment inset, no staged
  tableau of the Amalekite standing over a wounded Saul on Gilboa. The
  Amalekite tells his story standing at Ziklag; the camera stays with the
  telling. The caption for the relevant beat explicitly names the
  discrepancy against 1:4/`gilboa-battle` (see the beat table). This is a
  harder discipline than it sounds — the natural reenactment instinct (every
  prior M1–M3 scene dramatizes the event a passage narrates) does not apply
  to a claim the narrative itself frames as unverified.
- **Reused settlement, advanced state.** Same `ziklag` geometry conventions as
  `ziklag-aftermath` (ADR-006 ring-type layout, mudbrick/four-room houses,
  perimeter, gate) — no new settlement-form claim needed, this is literally
  the same town three narrative days later (1 Sam 30's resolution: captives
  and goods recovered "nothing was missing," so families are back). Damage
  state should read as **recovering, not actively burning**: char and repair
  scaffolding on some structures, no smoke plumes (`claim-smoke-duration`'s
  timeframe from M1 has long since elapsed), no active grief-crowd staging
  left over from the M1 scene. This is a continuity note for whoever builds
  it, not a new claim — reuse `asset-house-block`/`asset-perimeter-wall`/
  `asset-gate-simple` with damage-state dressing, not new geometry families.
- **Dated, for once.** 2 Sam 1:1–2 gives an actual day count: David has been
  back at Ziklag two days; the messenger arrives "on the third day." Use this
  directly in the arrival beat's caption instead of a hedged placeholder —
  one of the few moments in this project where the text hands us a real
  timeline instead of an unstated one.
- **Evening light has textual footing here, not just design convenience.**
  The mourning in 1:12 runs "until evening." Recommend the grief → judgment →
  lament sequence arc toward and through dusk, distinct from
  `ziklag-aftermath`'s speculative late-afternoon placeholder
  (`claim-time-of-day`, register #3) — this scene's lighting choice gets its
  own claim with a real anchor (see sources, below), not a borrowed
  speculative one.
- **No 1:10 crowd ratio here — this is a witness cluster, not a mustered
  army.** Register #7's ~1:10 narrated-army convention doesn't apply to a
  scene where the text never gives a headcount for who's present at the
  telling. See "Scale assumptions."
- **Execution gets the same ADR-009 discipline as Gilboa's death sequence.**
  One choreography, two treatments, no blood/gore/dismemberment in either
  mode — see the beat table.

## Visual composition

- **Terrain/settlement:** fully reused `ziklag` geometry, damage-state dressed
  per above. No new terrain feature.
- **Focal points, in sequence rather than simultaneously composed (this is a
  small, sequential scene, not a wide-shot-first scene like Gilboa):**
  1. **The gate approach** — the messenger arriving alone, on foot, clothes
     torn, dirt on his head (1:2) — the mourning gesture should be legible
     _before_ any words, exactly as the text stages it (the town reads the
     bad news off his body before he speaks).
  2. **The plaza** — where he falls to the ground before David (1:2), gives
     his report, and produces the crown and armlet (1:10). This is the same
     open center used in `ziklag-aftermath`'s `vp-plaza`.
  3. **A modest rise near the wall, at dusk** — a deliberately separate,
     quieter space for the lament itself, apart from the plaza's
     interrogation/judgment beats — the poem gets its own place in the frame,
     not a continuation of the same shot. This is new staging within existing
     terrain, not new geometry.
- **Sightlines:** default to a mid-distance plaza framing that holds David,
  the messenger, and the small witness cluster together — an intimate
  three-scale composition (principal / secondary principal / small group),
  the first scene in the project built around conversation rather than
  movement or mass. The lament-rise viewpoint should let the observer see the
  witness cluster's backs turned slightly toward David, listening, the town
  wall and darkening sky behind him — composed stillness, not a stage.
- **No new regional palette** — same Negev frontier-town dressing as M1.

## Scale assumptions

- **Cast:** the messenger (1), David (1, reuse `asset-david-marker`), and a
  **small witness cluster of David's men, ~6–10 figures** — enough to read as
  "his men" (plural, per 1:11–12's "all the men who were with him") without
  implying a mustered or complete count of anyone. This is explicitly **not**
  a scaled fraction of the narrated six hundred (register #7's ~1:10
  convention would yield ~60, which is the wrong register entirely for an
  intimate courtyard scene) — state this explicitly in the scene's scholarly
  notes as a distinct scale convention: **small named/witness casts use a
  disclosed small headcount, not a ratio**, precedent set by `jabesh-burial`'s
  "no ratio applies" retrieval party and now extended to conversation-scale
  scenes generally.
- **Named/labeled figures:** David (existing marker), the Amalekite messenger
  (**new** — see Characters, below), Abiathar (optional continuity cameo from
  `besor-crossing`/`ziklag-aftermath`; not required by the text of 2 Sam 1,
  include only if it doesn't crowd the small-cast composition).
- **Props, not crowds, carry royal weight:** the crown and armlet (1:10) are
  small hand-held/presented objects, not new large geometry — one or two new
  instanced prop meshes at most.

## Camera / observer experience

- **Default viewpoint** (`vp-plaza`, reused from `ziklag-aftermath`'s
  convention): mid-distance framing of the report/judgment sequence.
- Additional viewpoints: **gate approach** (`vp-gate`, reused convention —
  walk-mode emphasis, approaching behind the messenger to notice the torn
  clothes before the words); **the lament rise** (`vp-lament`, new — walk
  emphasis strongly encouraged; this is the beat the observer should be
  invited to approach quietly rather than jump-cut into).
- **This is the project's first character-and-dialogue-driven scene** —
  action is minimal; the job is giving the observer time with a small number
  of figures and with poetry. Recommend:
  - Longer per-beat dwell time than any prior scene's action beats,
    especially through the lament sequence — captions should not auto-advance
    faster than a patient reader would want to actually read the lines.
  - No invented musical performance. The text says the lament was sung and
    taught (1:17–18); do not synthesize a reconstructed melody, chant, or
    vocal performance implying we know how it sounded — that would assert
    fidelity this project has no basis for. Deliver the poem through
    text/caption exactly as every other scene delivers narrated speech, at a
    slower pace, not through an invented audio performance.
  - Camera holds, not motion, through the lament beats — the poem is the
    content; the camera's job is to get out of the way of it.
- Suggested duration: **~200s** — longer than `ziklag-aftermath` (150s)
  despite a much smaller cast, because the poem beats need real dwell time,
  not because there is more to build.

## Performance target

- The **cheapest scene shipped so far.** Reused terrain/settlement assets, a
  cast an order of magnitude smaller than any prior scene (~8–12 figures vs.
  `jabesh-burial`'s ~45–55, itself already the smallest prior cast), and at
  most one or two new small prop meshes (crown, armlet). No new vegetation
  system, no new terrain feature, no new lighting technique beyond a dusk
  keyframe arc (reuse the day-cycle keyframing approach from
  `jabesh-burial`'s seven-day-fast card, scaled down to a single evening).
- One `InstancedMesh` per repeated family as always; at this cast size the
  draw-call ceiling is a non-issue — the `performance-reviewer` pass should
  be quick and can focus on confirming nothing regressed, not on tuning a
  new budget.

## Required source basis (before geometry is built)

Sonnet (or whoever implements) creates these records at build time and
populates the scene's `claimIds`/`assetIds` — the `SceneDef` arrays stay
empty in `scenes.ts` until they exist, per the standard checklist in
`docs/reconstruction-method.md`.

- **Reuse:** `claim-ziklag-location`, `claim-ziklag-scale`, `claim-oval-plan`,
  `claim-mudbrick`, `claim-four-room`, `claim-wall-gate`, `claim-dress`,
  `claim-david-historical`, `claim-negev-terrain`; `claim-600-men` (for
  continuity of "David's men" as a concept, not for a headcount ratio here —
  say so in the claim's scene-specific usage note).
- **New, narrated (basis `biblical-text`):**
  - `claim-amalekite-messenger-account` (1:1–10) — the messenger's arrival and
    his account of Saul's death, **explicitly noting in `notes` that this
    account does not match 1 Sam 31:4's own narration** (already asserted at
    `high` confidence in `gilboa-battle`'s `claim-armor-bearer-refusal`/
    `claim-saul-death`). Carry the "why the discrepancy" question as
    `scholarlyViews` with at least two named readings — e.g., the account as
    self-serving fabrication for reward/favor with the incoming king, vs. the
    messenger as a battlefield looter who found Saul already dead and
    embellished a killing claim onto a genuine detail (finding the body,
    taking the crown and armlet) — and flag that a real commentary citation
    (a standard critical Samuel commentary, e.g. P. Kyle McCarter's Anchor
    Bible _II Samuel_, not yet in `sources/source-cards/`) is needed before
    this claim ships past placeholder attribution; hedge any proponent name
    as "e.g." per `docs/reconstruction-method.md`'s attribution-hedging rule
    until page-verified.
  - `claim-lords-anointed-principle` — the recurring principle that David will
    not treat harm to Saul's person as praiseworthy, spanning 1 Sam 24:6,
    26:9–11, and 2 Sam 1:14, 16; this is what the execution turns on.
  - `claim-execution-messenger` (1:14–16) — David's judgment and the
    execution, phrased as narrated, not editorialized.
  - `claim-royal-tokens` (1:10) — the crown and armlet as physical proof
    brought to David; note in `notes` that **the fact of royal insignia is
    biblical-text/high confidence, but their specific form/appearance is
    unattested and stays `design-placeholder`** (no securely identified Iron
    Age Israelite royal regalia exists to model from).
  - `claim-mourning-dress` (1:2, 11–12) — torn garments and dust as an ANE
    mourning gesture; basis `biblical-text` + `comparative-ane`, reuse
    `king-stager-2001`. Fold the "fasted until evening" detail into this
    claim's notes rather than opening a separate claim.
  - `claim-song-of-the-bow` (1:17–27) — the lament as a real, commissioned
    literary composition, taught to Judah and (the text says) preserved in
    the Book of Jashar; note the Book of Jashar as a lost source the Bible
    itself cites elsewhere (Joshua 10:13) as a genuinely interesting
    historiographical detail, without asserting anything about the Book of
    Jashar's nature beyond what's textually given.
  - `claim-lament-evening` — the dusk lighting arc, anchored to 1:12's "until
    evening" rather than an unstated placeholder; basis `biblical-text` for
    the anchor, confidence noted as `moderate` for extending a single
    morning-to-evening mourning detail into the lighting arc of the whole
    scene (the lament itself, later in the chapter, isn't explicitly timed to
    the same evening).
- **Characters:** add `amalekite-messenger` (`id: 'amalekite-messenger'`,
  `kind: 'person'`) — summary covering his arrival, his account's discrepancy
  with `gilboa-battle`'s own narration, and his execution; `passageRefs:
['2 Samuel 1:1–16']`; `claimIds` pointing at
  `claim-amalekite-messenger-account` and `claim-execution-messenger`. This is
  a data-entry task for the implementer, not done in this brief. Optionally
  extend `davids-band`'s `passageRefs`/summary to note its small-witness-
  cluster appearance here (or leave it, since the group entry is already
  general enough to cover this).
- **ESV excerpt budget — read this carefully before writing beat captions.**
  ADR-003/`integrity.test.ts` enforce two _independent_ budgets (≤3 quotes,
  ≤200 chars each, ≤500 total) — one on `passages.ts`'s `2sam-1.keyExcerpts`,
  one on this scene's beat-caption quoted spans. **Treat them as one shared
  "handful," not two separate allowances to max out independently** — that
  would violate ADR-003's spirit even if it technically passed both tests.
  Recommendation: leave `2sam-1.keyExcerpts` empty (the passage summary stays
  prose) and spend the full handful — **exactly 3 quotes** — inside this
  scene's own beat captions, where the poem is actually being delivered:
  1. The refrain, at its climactic final occurrence (1:27 — "How the mighty
     have fallen, and the weapons of war perished!" or the shorter 1:19 form
     — pick one occurrence, not both).
  2. The central relational line about Saul and Jonathan together (1:23 —
     "beloved and lovely... in life and in death they were not divided" or
     similar).
  3. David's personal address to Jonathan (1:26 — "I am distressed for you,
     my brother Jonathan...").
     **Verify exact ESV wording and character counts against the actual ESV text
     at implementation time** — the phrasing above is this brief's best
     recollection of the content and intent, not a certified verbatim quote;
     confirm before entering it into `scenes.ts`, and trim/choose alternate
     clauses if any candidate exceeds 200 characters. All other lament content —
     the address to the mountains of Gilboa, the eagles/lions imagery, the call
     to the daughters of Israel — is delivered as original-words paraphrase in
     captions, not quotation. This is the first scene where the excerpt budget
     is a genuine creative constraint rather than a formality — treat the
     paraphrase captions as carrying the poem's _content_ faithfully even where
     they can't carry its _words_.

## Placeholder policy

- **Allowed placeholders** (each gets an `assets.ts` entry with
  `whyTemporary` before `released`): the messenger's exact dress/appearance
  beyond "Amalekite" and "torn clothes, dust on his head" (reuse the existing
  procedural rig with a mourning-gesture pose, `asset-figure-procedural`);
  crown and armlet prop fidelity/exact form (`claim-royal-tokens`'s
  design-placeholder note); exact plaza/gate/lament-rise staging positions;
  the settlement's damage-state dressing (how charred vs. repaired specific
  structures look); the dusk lighting arc's exact hour progression.
- **Not allowed — the load-bearing constraint of this brief:** **no visual
  corroboration of the Amalekite's account of killing Saul** — no flashback,
  no reenactment inset, no staged tableau on a "Gilboa" backdrop, ever, in
  any mode. The account is delivered as speech, at Ziklag, full stop; the
  discrepancy with `gilboa-battle` is carried by caption text alone. Also not
  allowed: rebuilding any Gilboa/Beth-shan/Jabesh geometry (those scenes
  exist; reference them only in text); any Hebron or 2 Sam 2 content
  (wrong scene); blood/gore/dismemberment in the execution beat in any mode
  (ADR-009, both treatments already established); an invented/synthesized
  musical performance of the lament asserting a reconstructed melody; a
  scaled-army-ratio witness crowd (wrong register for this scene, see "Scale
  assumptions"); exceeding the shared 3-quote ESV excerpt handful described
  above, in either `passages.ts` or the scene's captions, individually or
  combined in spirit.

### Execution beat — ADR-009 treatment

| Beat               | Text     | Standard                                                                                                            | Reduced                                                                                                  |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `b-judgment`       | 1:14–15a | David's verdict spoken; no violence yet                                                                             | identical                                                                                                |
| `b-execution`      | 1:15b    | one of the witness cluster strikes the messenger at documentary distance; no wound/blood geometry, no close framing | the strike is elided — cut from the verdict to the aftermath (the still figure); fact carried by caption |
| `b-messenger-dead` | 1:16     | David's closing words to the dead man, spoken over him; no lingering on the body                                    | identical                                                                                                |

Same restraint precedent as `gilboa-battle`'s `b-saul-death`/`b-armorbearer-follows`
and `jabesh-burial`'s covered-before-flame extension: the act is understood,
never shown graphically, in either mode.
