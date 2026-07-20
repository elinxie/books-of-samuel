# Scene brief — Ziklag, the news and the lament (`ziklag-lament`, M4)

World-director pass, Fable, 2026-07-20. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First scene of Milestone 4 (queue #18, ADR-013
scoping pass).

Scope guard: this brief covers **2 Samuel 1 in full** — the Amalekite
messenger's arrival at Ziklag, his report and his claim to have killed Saul,
the mourning and fast until evening, the execution of the messenger, and
David's lament over Saul and Jonathan. Nothing here re-renders Gilboa: the
messenger's version of Saul's death is **speech, never depicted** (see the
no-flashback call below). Hebron (2 Sam 2:1–4) is closing-card material only —
`hebron-anointing` territory. This is a **new scene at the same location** as
the released `ziklag-aftermath` (M2/M1, 1 Sam 30), not a retrofit of it —
released scenes are complete and do not get new beats (queue #18).

## Historical intent

The observer should come away understanding four things:

1. **The kingdom's turning point arrives as news, not as an event.** Ziklag
   and Gilboa are held apart by roughly three days' hard travel; David has
   been back two days when a runner comes in from the north with torn clothes
   and dirt on his head (1:1–2). The observer stands where 1 Samuel becomes
   2 Samuel: in a half-ruined frontier town, hearing about the battle the
   project rendered at Gilboa — the same defeat, now at the receiving end of
   its report. Standing in the **same settlement** as `ziklag-aftermath`,
   days later, smoke gone and families recovered (1 Sam 30:18–19), is itself
   the historical statement: time has passed, life has resumed, and the news
   still lands on a town in ruins.
2. **The two accounts of Saul's death are the text's own problem — and the
   scene stages only the telling.** 1 Samuel 31 narrates suicide; the
   Amalekite claims a mercy-killing at Saul's request (1:6–10), producing the
   crown and armlet as proof. The dominant reading (so e.g. Keil &
   Delitzsch, Gill) is that he is a battlefield scavenger lying for reward;
   a source-critical minority reads an independent tradition. We do not
   adjudicate visually: only the report itself is staged, and the
   contradiction is carried as `scholarlyViews` on `claim-amalekite-account`,
   surfaced in study text — the same discipline as the Jabesh burning debate.
3. **The execution as the narrative presents it — and no more.** This is the
   project's first killing ordered by David himself, not by an enemy. The
   text's own frame is juridical: the man's testimony convicts him of
   striking "the LORD's anointed" — the inviolability David has twice upheld
   at his own cost (1 Sam 24; 26). Captions state that rationale in the
   text's terms; the scene neither heroizes nor editorializes, and the
   scholarly reading of the episode as part of the narrative's defense of
   David (the "apology of David" frame) belongs in study text, not staging.
   ADR-009 governs the rendering: documentary distance, no gore or
   dismemberment in any mode (see the framing call below).
4. **The lament is literature, and mourning gets the same seriousness as
   battle.** The Song of the Bow (1:17–27) is widely treated as among the
   oldest Hebrew poetry in the corpus, cited by the narrator to the Book of
   Jashar and ordered taught to Judah (1:18). It closes the chapter and the
   scene at evening — the Ziklag counterpart to Jabesh's quiet. On-screen it
   is paraphrase-first with at most two short ESV excerpts (ADR-003 hard
   budget); the full poem is never displayed.

## Resolved design calls (this pass)

- **Settlement geometry — reuse by import, do not fork.** The Ziklag ring is
  a released, deterministic layout (`src/scenes/ziklag/layout.ts` — seeded
  spec arrays, not meshes). The new scene folder (`src/scenes/ziklag-lament/`)
  **imports the same house/wall/gate/plaza/field/well specs and terrain spec**
  rather than duplicating them; if cross-folder imports are ugly, lift the
  shared specs into a module both scenes import — but the footprint, seed,
  and ruin state must be **identical**, and the released scene's modules must
  not change behavior. Same composite-site disclosure applies unchanged
  (register #1, `claim-ziklag-location`): this is still not a portrait of any
  candidate tell.
- **Days-after state — smoke off, ruin unrepaired, habitation resumed.** The
  narrated chain (three days' return from Aphek, the pursuit and battle, the
  return, two days at Ziklag — 1 Sam 30:1, 11–20; 2 Sam 1:1) puts this
  roughly a week or more after the burning, without an exact figure — assert
  none on screen. The text says nothing about rebuilding, so the collapsed/
  roofless house states stay **exactly as released** (repair would be
  invention); the delta is: no smoke system, ambient townspeople present
  (the recovered families), and light habitation staging — cleared lanes,
  salvage/timber piles — as a disclosed `design-placeholder`
  (`claim-ziklag-interval`).
- **No flashback, ever.** Rendering the Amalekite's claimed version of
  Saul's death would visually adopt one side of a genuine textual/critical
  dispute — and contradict the project's own released Gilboa scene. His
  account exists only as a speech beat; the crown and armlet are the only
  physical correlates staged.
- **Crown and armlet — narrated props, placeholder forms.** 1:10 makes them
  load-bearing (the proof-tokens of the claim, physically handed to David).
  Existence is `biblical-text`; no Iron I/IIA Israelite regalia is attested
  archaeologically, so form is a simple diadem band + arm band,
  `design-placeholder`, small-prop scale (`asset-crown-armlet`), with the
  no-evidence note on the label.
- **Execution framing — ADR-009 machinery unchanged, one added rule,
  proposed for ratification at M4 sign-off.** Gilboa's deaths were
  battlefield, Jabesh's handling funerary; this is a summary execution
  ordered by the protagonist. ADR-009's rendering rules cover it fully (one
  choreography, two treatments, documentary distance, no wound/blood/gore
  geometry in any mode, reduction abstracts depiction never facts). What it
  doesn't yet codify is framing, so this brief adds: **protagonist-ordered
  killings get strictly neutral presentation** — captions carry the narrated
  rationale in the text's own terms, without endorsement or condemnation; no
  staging that reads as approval or resolution (no assembled-crowd reaction
  choreography, no lighting/music cue treating the act as catharsis — the
  assembly stays in mourning posture throughout); the apology-of-David
  scholarly frame is study text, not staging. Ratify this wording into
  ADR-009 at M4 sign-off, parallel to the M3 funerary extension. The
  executioner stays an anonymous member of the band ("one of the young men,"
  1:15) — no invented identity.
- **Lament presentation inside the ESV budget.** `integrity.test.ts` caps
  quoted spans in beat captions at 3 per scene, ≤200 chars each, ≤500 total.
  Budget plan: quote the refrain "How the mighty have fallen!" **once** (the
  lament beat), and at most one more short span (recommended: the judgment
  beat's "Your blood be on your head, for your own mouth has testified
  against you," 1:16). Everything else — including the refrain's second and
  third occurrences — is paraphrase or reference. Any richer lament study
  panel must be genuinely original prose about the poem (structure, Book of
  Jashar, "taught to Judah"), not reworded ESV.
- **No invented Amalekite dress.** The messenger's torn clothes and dirt on
  his head are narrated mourning signs (1:2) — carried by pose (prostration,
  1:2b) and caption at current figure fidelity, not by distress texturing.
  His Amalekite identity (and its irony after 1 Sam 30) is label/study
  material; Amalekites remain archaeologically anonymous
  (`claim-amalekite-raiders`) and get no distinct kit (queue #11 precedent).
- **Characters — reuse `david`, `davids-band`, `people-of-ziklag`; add one.**
  Verified in `src/data/characters.ts`: all three exist from M1/M2. Add only
  `amalekite-messenger` (person — unnamed; self-described "son of a
  sojourner, an Amalekite," 1:13). Update `david`'s `passageRefs` to include
  2 Samuel 1 at build. No other new entities; no named executioner.

## Visual composition

- **Terrain and settlement:** identical to `ziklag-aftermath` — Negev loess
  terrain, the enclosed ring, north gate, fields, well, threshing floor. The
  compositional identity is deliberate; the observer who saw M1 should
  recognize the place instantly and read the differences (no smoke, people
  among the ruins) as elapsed time.
- **Focal masses:** (a) **the north road** — the messenger's approach axis
  (reuse the released `APPROACH_CURVE`), one running figure against the same
  road the six hundred came in by; (b) **the open center** — David with the
  assembly, the messenger prostrate before him, the scene's still center
  through report, mourning, and judgment; (c) **ambient habitation** — small
  family/salvage groups among the ring houses, thinning toward the walls,
  which keep the town alive without crowding the center.
- **Sightlines:** from the plaza edge (default viewpoint), the observer holds
  David, the prostrate messenger, and the assembly in one frame with the
  ruined ring behind them — report, grief, and setting in a single view.
  From the released overlook coordinates, the before/after echo of M1's
  money shot: same town, no smoke.
- **Lighting arc:** day (arrival, report) → failing light (the fast "until
  evening," 1:12 — the one narrated hour) → evening/dusk (judgment, lament).
  Arrival hour is a disclosed `design-placeholder`; the evening terminus is
  narrated. The lament plays against dusk — somber, not staged as spectacle.
- **No triumphal or judicial staging.** No dais, no tribunal furniture, no
  crowd semicircle around the execution — the act happens at the edge of the
  assembly's grief, at documentary distance, and the composition returns to
  the mourning center.

## Scale assumptions

- **David's band:** the narrated six hundred (`claim-600-men`) at the
  standard disclosed ~1:10 ratio (register #7) ≈ **~60 assembly figures** in
  and around the open center.
- **Townspeople/families:** narrated as recovered in full (1 Sam 30:18–19)
  but never counted; ~**20–30** ambient figures among the houses, an
  explicitly thinned representation, disclosed — no family headcount is
  asserted.
- **Principals:** David (marker treatment), the Amalekite messenger, one
  anonymous young man of the band (the executioner beat), ≈ **3**.
- High-tier total ≈ **85–95 figures** — below Gilboa by a wide margin,
  comparable to `ziklag-aftermath`. The scene's weight is staging and
  restraint, not crowd size.

## Camera / observer experience

- **Default viewpoint** (`vp-assembly`): plaza edge, slightly elevated,
  holding David, the prostrate messenger, and the assembly against the ring.
- Additional viewpoints: **the north road** (`vp-north-road`, the runner's
  approach — walk-mode emphasis along the same road as M1's return); **the
  overlook** (`vp-overlook`, **reuse the released coordinates**
  `[120, 26, -160] → [0, 6, 0]` for the deliberate before/after echo); **the
  evening center** (`vp-evening-center`, low and close to the assembly for
  the mourning and lament beats — close to grief, held at documentary
  distance from the execution by placement).
- Suggested duration ~150s, matching siblings; pacing guidance: the mourning
  beat holds longest, the judgment beat is compact — do not default to even
  spacing. `depictsDeath: true`; first-visit advisory applies. ADR-007
  applies: pure pose functions, scrub-safe, beat-invariant test required.
- **Timeline beats and violence treatment** (ADR-009 + the framing rule
  above; standard is the default):

  | Beat           | Text    | Standard                                                                                                                                                                                        | Reduced                                                                        |
  | -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
  | `b-days-after` | 1:1     | establishing: Ziklag days after the raid, smoke gone, families recovered (recap card: 1 Sam 30:18–19); no violence                                                                              | identical                                                                      |
  | `b-messenger`  | 1:2     | a lone runner in from the north road; falls prostrate before David; mourning signs carried by pose + caption                                                                                    | identical                                                                      |
  | `b-report`     | 1:3–10  | speech beat — the report of the rout and the deaths, the mercy-killing claim, the crown and armlet handed over; **no flashback rendering in any mode**; caption surfaces the 1 Sam 31 tension   | identical                                                                      |
  | `b-mourning`   | 1:11–12 | garments torn (pose-level), weeping and fasting for Saul, Jonathan, and the fallen; time compresses to evening; no violence                                                                     | identical                                                                      |
  | `b-judgment`   | 1:13–16 | David's question and sentence; the young man strikes at documentary distance; death read by the silhouette going down — **no blade-entry, no blood, no wound geometry**; no crowd reaction beat | the strike elided — cut from the sentence to the still form; caption identical |
  | `b-lament`     | 1:17–27 | the lament at dusk, the assembly still; the refrain quoted once, the rest paraphrased; Book of Jashar noted; closing card → Hebron (2 Sam 2:1), **not depicted**                                | identical                                                                      |

- The executed man's body: the text narrates nothing after 1:16 — stage no
  removal or disposal; the composition simply moves to the lament's framing
  and does not linger. Walk mode should reward re-walking M1's ground: the
  north road, the gate, the center, the lived-in ruin.

## Performance target

- Budgets per `QUALITY_PROFILES`; target **≤ `ziklag-aftermath`'s per-tier
  draw calls** — this scene drops the smoke particle system and adds only
  small-prop instancing (salvage piles, crown/armlet). One `InstancedMesh`
  per repeated family (house, wall segment, figure, scrub, tree, rock, prop).
- Day→evening arc is a keyframed mutation of the existing single-directional
  - hemisphere rig (the jabesh-burial precedent); **no new real-time lights**,
    shadow budget unchanged.
- Run `performance-reviewer` after the first geometry slice lands — expected
  to pass easily; treat any regression against the released Ziklag scene as
  a bug.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates the scene's
`claimIds`/`assetIds` then — the `SceneDef` arrays stay empty until they
exist. All captions paraphrase except the two budgeted excerpts above
(`integrity.test.ts` scans beat captions).

- **Existing, reuse:** `claim-ziklag-location`, `claim-ziklag-scale`,
  `claim-oval-plan`, `claim-mudbrick`, `claim-four-room`, `claim-600-men`,
  `claim-david-historical`, `claim-negev-terrain`, `claim-agriculture`,
  `claim-dress`, `claim-wall-gate`, `claim-well`, `claim-ziklag-raided`
  (context recap). **Not reused:** `claim-smoke-duration`, `claim-time-of-day`
  (both M1-arrival-specific — this scene gets its own interval/hour claims).
- **New, setting:** `claim-ziklag-interval` (basis `design-placeholder`,
  speculative — the days-after state: smoke gone, ruin unrepaired because
  rebuilding is unstated, habitation staging; the narrated day-chain in
  `notes`, no exact interval asserted); `claim-lament-hour` (basis
  `biblical-text` for the "until evening" terminus, `design-placeholder` for
  the arrival hour — one claim, split honestly in the statement/notes).
- **New, narrated (basis `biblical-text`):** `claim-messenger-arrival`
  (1:1–4 — the runner, the mourning signs, the prostration);
  `claim-amalekite-account` (1:5–10 — the claim of mercy-killing **and** the
  tension with 1 Sam 31:3–5; `scholarlyViews`: lying-scavenger reading
  [proponents: Keil & Delitzsch via `keil-delitzsch-1866`, Gill via
  `gill-exposition-1763` — verify both cards' 2 Sam 1 coverage at build,
  hedge if unconfirmed] vs. independent-tradition/source-critical reading
  [hedged attribution, "e.g., source-critical readings…", flag `TO VERIFY`
  unless a card is added]; the no-flashback design call in `notes`);
  `claim-crown-armlet` (1:10 — narrated tokens; form disclosed as
  placeholder, no attested regalia); `claim-mourning-fast` (1:11–12 —
  tearing, weeping, fasting until evening; `king-stager-2001` for mourning
  customs as `comparative-ane` support); `claim-messenger-execution`
  (1:13–16 — the narrated juridical rationale, David's prior sparing of Saul
  cross-referenced; the apology-of-David scholarly frame in `notes` with
  hedged attribution — a dedicated source card is optional, not a build
  blocker, per the standing deprioritize-deep-bibliography note);
  `claim-lament-song` (1:17–27 — the Song of the Bow, Book of Jashar
  citation, taught to Judah, antiquity of the poetry noted with hedged
  attribution; the excerpt-budget presentation decision in `notes`).
- **Characters:** reuse `david` (extend `passageRefs`), `davids-band`,
  `people-of-ziklag`; **add** `amalekite-messenger` (person — unnamed,
  self-described sojourner's son; light entry, claimIds pointing at the
  account/execution claims).
- **Assets (reuse):** `asset-terrain-negev`, `asset-house-block`,
  `asset-perimeter-wall`, `asset-gate-simple`, `asset-figure-procedural`,
  `asset-david-marker`, `asset-vegetation-scrub`, `asset-olive-tree`,
  `asset-rocks`, `asset-well`, `asset-threshing-floor`, `asset-field-plots`.
  **Not reused:** `asset-smoke-particles`. **New (placeholders with
  `whyTemporary`):** `asset-crown-armlet`, `asset-salvage-piles` (habitation
  staging), plus any new pose buckets (prostration, strike/fall — reuse the
  Gilboa fall-pose pattern where possible rather than authoring new ones).

## Placeholder policy

- **Allowed placeholders:** the settlement composite itself (unchanged M1
  disclosure); the days-after habitation staging (salvage piles, cleared
  lanes); crown and armlet forms; arrival hour and beat pacing; mourning and
  prostration pose fidelity; torn-garment representation limits (pose +
  caption, not texturing); ambient-family figure count; the executioner's
  staging position.
- **Not allowed:** any flashback or visual depiction of the Amalekite's
  claimed version of Saul's death, in any mode; blood, wound, or gore
  geometry in any mode; staged crowd approval, tribunal furniture, or any
  framing that presents the execution as triumph or catharsis; rebuilt or
  repaired structures (unstated — the ruin state stays as released);
  invented Amalekite ethnic dress or an invented name/identity for the
  messenger or executioner; on-screen distance or travel-time figures for
  the messenger's journey (register #2 precedent); the lament rendered
  beyond the two budgeted excerpts, or a "study panel" that is reworded ESV
  rather than original prose; staged disposal of the executed man's body;
  any change to the released `ziklag-aftermath` scene's behavior.
