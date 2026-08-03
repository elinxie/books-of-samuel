# Scene brief — Abner's overture and the covenant feast at Hebron (`hebron-covenant`, M5)

World-director pass, Fable, 2026-08-03. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First scene of Milestone 5.

Scope guard: this brief covers **2 Samuel 3:1–21**, with staged action beginning
at 3:20 (Abner's arrival at Hebron with twenty men) and ending at 3:21 ("and he
went in peace"). Everything before 3:20 — the long-war summary (3:1), the sons
born at Hebron (3:2–5), the Rizpah accusation and Abner's break with Ish-bosheth
at Mahanaim (3:6–11), the messenger negotiation and Michal's return (3:12–16),
and Abner's consultation with the elders of Israel and Benjamin (3:17–19) — is
delivered as context cards/captions, **not staged** (see Resolved design calls).
Joab's return, the killing of Abner at the gate, and everything from 3:22 onward
belongs to `hebron-gate`, a separate brief. **Nothing from 2 Samuel 5 onward —
the all-Israel anointing, Jerusalem, the Philistine wars — may appear in this
scene, depicted or textually foreshadowed.** This scene's closing card may point
forward to `hebron-gate` only (in-milestone pointer, per `hebron-anointing`'s
precedent), never past the milestone.

## Historical intent

The observer should come away understanding three things:

1. **The civil war ends by defection and negotiation, not by battle.** 3:1
   frames a "long war" in which David grows stronger — but the actual transfer
   of the north begins with Abner, the man who _made_ Ish-bosheth king, switching
   sides over a personal-political rupture (3:6–11). The scene's staged center is
   diplomacy: a rival kingdom's strongman received at table. The observer who
   walked `gibeon-pool` should recognize that the man being feasted here is the
   same man who killed Asahel there — and that David receives him anyway. That
   tension (statecraft over vendetta) is the scene's whole subject, and it is
   what `hebron-gate` will then shatter.
2. **"He went in peace" is load-bearing.** 3:21–23 repeats the peace formula
   three times ("he went in peace" / "he had gone in peace" / "he has gone in
   peace") — the narrative hammering that Abner left Hebron under safe-conduct
   before telling us what Joab did. This scene owns the first occurrence: hold
   on the departure, let it read as a settled, public, peaceable dismissal. No
   dread staging, no ominous music-video framing — the text's own irony works
   only if the peace is staged straight.
3. **The rupture that brought Abner here is narrated, not adjudicated.** 3:7's
   accusation (that Abner went in to Saul's concubine Rizpah) is put in
   Ish-bosheth's mouth; the text never states whether it was true, and Abner's
   reply is indignation, not denial or confession. Captions must carry the
   accusation as the narrative presents it — an accusation with royal-claim
   overtones (cf. the political meaning of taking a king's concubine) — without
   asserting what actually happened. Narrated-vs-corroborated discipline at its
   most delicate.

## Resolved design calls (this pass)

- **Staged action begins at 3:20.** 3:1–19 happens across multiple sites the
  project cannot or should not build: Mahanaim (disputed, narrated-only —
  standing rule from `gibeon-pool`), Bahurim (unbuilt, unneeded), and unnamed
  places of consultation. All of it is card/caption material. Do not stage the
  Rizpah confrontation, the messenger exchanges, or the elders' councils.
- **Michal's return is text-only, not staged.** 3:13–16 narrates the demand,
  the transfer from Paltiel, and Paltiel's weeping follow to Bahurim — but never
  places Michal at the Hebron feast or in Abner's arriving party. Staging her
  arrival would assert something the text doesn't say; staging Paltiel's grief
  would require inventing an entire route setting for a two-verse vignette at an
  unlocated site. Both are carried by a context card at the point the text
  states them, with the human weight of 3:16 ("weeping after her all the way")
  carried as a short caption, not a render. `michal` and `paltiel` get light
  character entries (referenced-only) so the inspector can surface them.
- **The Rizpah card is factual and unsensational.** State the accusation, its
  political meaning, and Abner's oath (3:9–10, transferring the kingdom "from
  Dan to Beersheba") — nothing staged, nothing illustrated, no invented
  visualization of Rizpah herself in this scene. `rizpah` gets a light
  referenced-only character entry (she matters textually later, 2 Sam 21, but
  that is far outside this milestone).
- **Abner's twenty men render literally, 1:1** (3:20's exact count) — same
  register as `gibeon-pool`'s twelve-a-side champions: a named, countable,
  renderable number taken directly from the text, no ratio, no disclosure needed
  beyond "this is the stated count."
- **The feast is modest and open-air.** The text says only "David made Abner
  and the men who were with him a feast" (3:20) — no hall, no throne room, no
  palace. Hebron's town form is a released, honest `design-placeholder` ("a
  modest highland hill town," Tell Rumeida evidence permanently thin — queue
  #19c); inventing banquet architecture now would silently upgrade it. Stage the
  feast as a prepared open-air meal in a courtyard/plaza space consistent with
  `hebron-anointing`'s existing town rendering — mats/low tables, shared vessels,
  seated groups. Physical form is a new `design-placeholder` claim
  (`claim-feast-form`), upgradeable to `comparative-ane` only if a researcher
  pass finds meal/feasting material culture in `king-stager-2001` worth citing.
- **Visual continuity with `hebron-anointing` is mandatory.** Same town
  placeholder massing, same Judean-highland palette, same terracing — this is
  the same place a few years later. Do not re-invent Hebron. Reuse the
  `hebron-anointing` terrain spec and layout constants (per ADR-006, layout code
  stays scene-local, but constants may be imported/shared rather than diverging).

## Visual composition

- **Terrain:** reuse the Judean-highland `TerrainSpec` palette established by
  `hebron-anointing` (terraced limestone, olive/vine terracing,
  `asset-terrace-walls`, `asset-olive-tree`). No new regional system.
- **Focal masses:** (a) **the approach road from the north** — Abner's party of
  twenty-plus-one arriving from the direction of Israel/Benjamin territory, the
  deliberate inverse of `hebron-anointing`'s southern approach column (David
  came up from the Negev; the north now comes to him); (b) **the town and gate
  plaza** — same massing as `hebron-anointing`; (c) **the feast ground** — a
  courtyard/plaza space dressed for the meal, the scene's ceremonial center;
  (d) **the departure road** — the same northern road, used twice (arrival and
  the peace departure), the scene's symmetry axis.
- **Sightlines:** default vantage holds the northern road and the town in one
  frame, so arrival and departure both read against the same geography. The
  feast vantage is close, seated-eye-level, conversational — the project's first
  staged shared meal; let it feel like one. The departure beat holds the frame
  on Abner's party diminishing up the northern road: peaceable, unhurried,
  watched.
- **Lighting:** daytime; hour unstated in text — default to steady midday/early
  afternoon, disclosed `design-placeholder`. No dusk foreshadowing.

## Scale assumptions

- **Abner's party: 21 figures literal** (Abner + twenty men, 3:20).
- **David's side at the feast: disclosed design count ≈ 15–25** (David, an
  escort/household presence drawn from the established following — no narrated
  count for who attended; say so).
- **Town background: ≈ 20–30 figures** (ambient townsfolk, static/cheap — this
  is a working town on an ordinary day, not an assembly; deliberately far below
  `hebron-anointing`'s 150–200 civic crowd, and the contrast is meaningful:
  that was a public founding, this is a closed political meal).
- **High-tier total ≈ 60–80 figures** — the smallest M5 crowd; a diplomatic
  scene, not a crowd event.
- No narrated numbers exist beyond the twenty; every other count is a disclosed
  design choice (`claim-covenant-cast-scale`, parallel in form to
  `claim-judah-assembly-scale`).

## Camera / observer experience

- **Default viewpoint** (`vp-north-road`): elevated over the northern approach,
  town beyond — arrival and departure both stage through this frame.
- Additional viewpoints: **the feast ground** (`vp-feast`, close, seated-level,
  inspect emphasis); **the gate plaza** (`vp-gate-plaza`, walk emphasis,
  continuity anchor with `hebron-anointing`); **the departure road**
  (`vp-departure`, holding the peace formula beat).
- **Timeline beats** (`depictsDeath: false` — no violence, no death, no ADR-009
  advisory in this scene; suggested duration ~150s):

  | Beat         | Text    | Treatment                                                                                                                                                                                          |
  | ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-long-war` | 3:1–5   | Opening card: the long war, David stronger, the house of Saul weaker; the sons born at Hebron listed as the text lists them (no forward commentary on Amnon/Absalom). No geometry beyond the card. |
  | `b-break`    | 3:6–11  | Context card: the Rizpah accusation (narrated, not adjudicated — see Resolved design calls), Abner's oath, Ish-bosheth's fear. Mahanaim referenced, never built.                                   |
  | `b-overture` | 3:12–16 | Context card: Abner's messengers, David's Michal condition, the transfer from Paltiel, the weeping follow to Bahurim, Abner's "Go, return." Text-only; nothing staged.                             |
  | `b-elders`   | 3:17–19 | Context card: Abner's word to the elders of Israel and to Benjamin — the north's own consent gathered before the visit. Text-only.                                                                 |
  | `b-arrival`  | 3:20a   | Staged: Abner and the twenty come up the northern road and are received. Default viewpoint.                                                                                                        |
  | `b-feast`    | 3:20b   | Staged: the shared meal, `vp-feast`. Quiet, formal, watchful — a working negotiation, not a celebration.                                                                                           |
  | `b-pledge`   | 3:21a   | Abner's pledge to gather all Israel to a covenant, "that you may reign over all that your heart desires." Dialogue beat at the feast ground.                                                       |
  | `b-peace`    | 3:21b   | Staged: the dismissal and departure north — "and he went in peace." Hold the frame; no dread staging. This is the scene's final image.                                                             |
  | `b-close`    | —       | Closing card: forward pointer to `hebron-gate` only (Joab's return and what followed at the gate) — stated as a pointer, not previewed. **No 2 Samuel 5+ content.**                                |

## Performance target

- ≈ 60–80 high-tier figures, mostly static/idle pose buckets — cheapest M5
  scene by design. One `InstancedMesh` per repeated family (figure, terrace
  wall, olive, town structure, feast props).
- Reuse `hebron-anointing`'s terrain/town/vegetation assets and the ADR-010
  procedural rig unchanged; the feast dressing (mats, vessels) is the only new
  prop family and should be a single small instanced set
  (`asset-feast-props`).
- No new lights, no water, no fire. Run `performance-reviewer` once, after the
  feast set piece lands; expected to pass easily.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay empty
in `scenes.ts` until they exist. Claim consolidation is allowed per the
`gibeon-pool` precedent (coverage matters, not count).

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`
  (stays the released `design-placeholder` — do not upgrade), `claim-dress`
  (shared, undifferentiated — both parties Israelite, same rule as
  `gibeon-pool`), `claim-david-historical` (kingdom-scale framing),
  `claim-judah-anointing` (the standing "house of Judah only" context this
  scene begins to unwind). The `hebron` location is `released`; this scene
  adds itself to its `sceneIds`.
- **New, narrated (basis `biblical-text`):** `claim-long-war` (3:1–5; notes
  cross-reference the `/atlas` overlay as where the trend is mapped);
  `claim-abner-break` (3:6–11; notes carry the narrated-not-adjudicated
  discipline on the Rizpah accusation and the concubine-claim political
  reading — hedged "commonly noted by commentators" until a researcher pass
  attaches a named citation, e.g. McCarter); `claim-abner-overture` (3:12–19;
  notes state Michal/Paltiel are carried as text, staging none, and why);
  `claim-covenant-feast` (3:20–21; the arrival, feast, pledge, and peace
  formula — notes flag the threefold repetition and that this scene stages
  occurrence one).
- **New, design (basis `design-placeholder`):** `claim-feast-form` (open-air
  meal staging; upgrade path to `comparative-ane` via `king-stager-2001` if a
  researcher pass finds citable meal/feasting material — check before
  inventing vessel forms); `claim-covenant-cast-scale` (the disclosed design
  counts above).
- **Characters:** reuse `david`, `abner`, `davids-band`. New light entries:
  `michal` (referenced-only), `paltiel` (referenced-only), `rizpah`
  (referenced-only). Do not invent named members of the twenty.
- **ESV excerpt budget:** `2sam-3` is shared between this scene and
  `hebron-gate` — treat the passage's ≤3-quote budget as one shared handful
  and **spend it in `hebron-gate`** (the lament needs it more). This scene
  should use at most one short quote (3:21's "you may reign over all that
  your heart desires" or 3:12's "To whom does the land belong?") and may use
  none; verify wording and counts at build time.

## Placeholder policy

- **Allowed placeholders:** feast dressing/vessel forms (disclosed); exact
  courtyard staging; the twenty's positions; lighting hour; ambient-town
  activity; the northern road's exact course.
- **Not allowed:** any staging of 3:1–19's events (Rizpah confrontation,
  Michal's transfer, Paltiel's follow, elders' councils — cards only); Michal
  or Paltiel geometry anywhere; any Mahanaim or Bahurim geometry; banquet-hall
  or palace architecture at Hebron (the town-form placeholder stays modest);
  divergence from `hebron-anointing`'s established Hebron massing/palette;
  dread/foreboding staging of the departure (the peace must read straight);
  any Joab presence (the text is explicit he was away, 3:22); any 2 Samuel
  3:22+ content beyond the closing pointer card; any 2 Samuel 5+ content in
  any form, depicted or foreshadowed.
