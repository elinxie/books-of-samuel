# Scene brief — the pool of Gibeon (`gibeon-pool`, M4)

**PROVISIONAL — written by Sonnet, not Fable.** The world-director pass for
this scene was attempted twice (2026-07-20) and both attempts were cut off by
the org's monthly API spend limit before producing a brief — the second
attempt failed immediately with no file written. Per `docs/model-handoff.md`'s
documented fallback ("implement the most defensible option, mark it clearly as
provisional... don't block the whole project on Fable availability"), this
brief was written directly by the Sonnet orchestrating session instead of
re-attempting Fable. It follows the same structure and design discipline as
`ziklag-lament-brief.md` and `hebron-anointing-brief.md` (both genuine
Fable passes, same day) as closely as possible, but the specific violence-
choreography call below (the twelve-a-side contest, a new reciprocal-killing
pattern not yet used anywhere in the project) is exactly the kind of judgment
call `docs/model-handoff.md` reserves for Fable. **Logged as an open item in
`docs/fable-review-queue.md` for confirmation before this scene ships
`released`** — it is not blocked from being built in the meantime (M3
precedent: scenes build ahead of their citation/judgment gates and ship
`in-progress`).

Third scene of Milestone 4 (queue #18, ADR-013 scoping pass; brief 3/3, after
`ziklag-lament-brief.md` and `hebron-anointing-brief.md`). Implementation:
Sonnet/`threejs-engineer` within this direction; any deviation that changes
historical or violence-depiction meaning goes back through
`docs/fable-review-queue.md`.

Scope guard: this brief covers **2 Samuel 2:12–32 in full** — the meeting at
the pool, Abner's challenge, the twelve-a-side contest, the battle that
follows, Asahel's pursuit and death, the evening halt, and both sides'
withdrawal. This is the last M4 scene and closes the milestone; 2 Samuel 3
(the "long war," Abner's death) is **not** scoped here — the closing card
gestures forward without committing to any M5 content or geometry.

## Historical intent

The observer should come away understanding four things:

1. **The pool is a real, dramatic feature at a securely identified site — but
   the identification of it specifically as "the pool of Gibeon" is a
   reasonable match, not a certainty.** El-Jib's excavations (Pritchard,
   1956–62) recovered a genuine rock-cut cylindrical shaft with a spiral
   stepped descent, cut into bedrock for water access — a striking piece of
   Iron Age hydraulic engineering, and a plausible referent for 2:13's "pool."
   It is not the only water feature at the site, and no inscription ties this
   specific installation to this specific battle. The scene renders it as the
   centerpiece it deserves to be, with confidence stated honestly on the
   label (matching `gibeon`'s `LocationEntry` wording, `src/data/
locations.ts`).
2. **The twelve-a-side contest is the strangest violence the project has
   staged: formal, mutual, and simultaneous.** Every other death rendered so
   far (Gilboa's rout, the armor-bearer's refusal, Ziklag's execution) is
   asymmetric — one side striking, one side struck, or a single actor's
   choice. 2:14–16 narrates twenty-four men, in pairs, each gripping his
   opponent's head and driving a sword into his opponent's side, all of them
   dying together — a killing so mutual and synchronized the place is named
   for it (Helkath-hazzurim, "field of blades/sword-edges"). The text's own
   flatness — no glorification, immediately followed by "the battle was very
   fierce that day" as if the contest settled nothing — is the point, and
   the staging should carry that flatness rather than build it into a
   spectacle.
3. **Asahel's death gets the same individual weight as the armor-bearer's
   refusal at Gilboa.** The text slows down for him specifically: introduced
   by name with a distinguishing detail ("swift of foot as a wild gazelle,"
   2:18), and Abner's reluctance is narrated at length — two direct
   warnings, an appeal to their future relationship with Joab, before the
   backward spear-thrust that kills him. This is not anonymous battle
   attrition; it is one named man's death, witnessed and regretted by his
   killer in the text's own account, and it seeds the blood-feud that
   surfaces again in 2 Samuel 3.
4. **A combatant chooses to stop.** Abner's "shall the sword devour forever?"
   (2:26) is a rare moment in Samuel where a war is halted by a question, not
   a victory. Joab's answer — he blows the horn, the men stop pursuing — is
   restraint honored on both sides, immediately undercut by the casualty
   count that follows (2:30–31: 19 of Joab's men plus Asahel, against 360 of
   Abner's). The scene should close on the halt and the count, not on a
   triumphal note; Joab's tactical advantage is a narrated fact, never staged
   as a win state (ADR-011).

## Resolved design calls (this pass)

- **The pool — centerpiece, honestly hedged.** Render the rock-cut,
  stepped-descent cylindrical shaft as the scene's visual anchor at the
  meeting-ground beat. `claim-gibeon-pool-identification`: basis
  `archaeology` + `biblical-text`, confidence **moderate** (not high — the
  site identification is secure, but this specific feature's identification
  with 2:13's pool is a proposed match among the site's water features, per
  `gibeon`'s existing `LocationEntry` wording). Label states the hedge
  plainly, matching the location entry's own phrasing rather than upgrading
  it.
- **The contest — one new pose pattern, staged for flatness not spectacle.**
  Twenty-four principal-tier figures, twelve mirrored pairs, act
  **simultaneously**, not as a sequence of duels. **Standard mode:** each
  pair closes to a grip-and-thrust posture (hand to opponent's head/shoulder,
  weapon-arm drawn back) held for a beat, then both figures of every pair
  collapse together — no blade-entry frame, no contact-moment geometry (same
  bar as Gilboa's suicide beat: before-and-after render, not the instant
  itself). Camera at documentary mid-distance, wide enough to read "twelve
  pairs, all at once" as a composition, not close enough to read any single
  face. **Reduced mode:** elide the grip-and-thrust posture entirely — cut
  from the challenge beat directly to two lines of twenty-four fallen figures
  at a wider frame, per ADR-009's existing "reduced: dying lower to the
  ground and become still, camera beats keep wider distance" rule. Both
  modes state the mechanism (mutual grip, thrust to the side, Helkath-
  hazzurim's naming) identically in caption — reduction abstracts the
  depiction, never the fact, per ADR-009. **No triumphal or ceremonial
  staging** — no assembled-crowd spectator arc around the contest ground; the
  two companies stand at a distance, watching, not cheering (2:14 frames it
  as Abner's proposal, accepted flatly by Joab: "Let them arise").
  **Flag for Fable confirmation:** this is a genuinely new choreography shape
  (reciprocal/simultaneous, not attacker-defender) — ratify or revise at the
  next Fable pass, same path as Gilboa's `claim-line-defense` melee
  (queue #15 precedent).
- **The wider battle (2:17) — compressed, not modeled at narrated scale.**
  "The battle was very fierce" is rendered as a brief background melee beat
  reusing Gilboa's swing/block/stagger choreography pattern at **modest
  figure count** (not the 360+19 the casualty count implies — see below), a
  compressed device disclosed exactly as `claim-battle-scale` disclosed
  Gilboa's figure ratios: order-of-magnitude staging, not a headcount claim.
  This beat is backdrop to Asahel's pursuit, not the scene's focus.
- **Asahel's death — full individual-beat treatment.** Three-part staging
  matching the text's own pacing: (1) the pursuit, Asahel breaking off after
  Abner alone, ignoring Abishai and Joab; (2) **Abner's two warnings**,
  staged as a held confrontation — Abner turned, weapon lowered, a
  gesture-only refusal beat (mirroring the armor-bearer-refuses pattern at
  Gilboa: a character's choice rendered through posture and pause before
  anything else happens); (3) the backward spear-thrust, at documentary
  distance, no blade-entry frame — reduced mode elides the thrust itself,
  cutting to Asahel fallen, exactly as the contest beat does. Caption quotes
  Abner's warning (excerpt below) in full weight — this is the beat's
  emotional center, not the strike.
- **The evening halt — a dialogue beat, not an action beat.** Abner and Joab
  face each other across the pursuit distance (the hill of Ammah, 2:24);
  Abner's question is excerpted; Joab's horn-signal recall is staged as the
  visible action (the pursuing men stopping, turning back) rather than
  narrated dialogue. No handshake, no reconciliation gesture invented — the
  text records a tactical halt, not a resolution (2 Sam 3's "long war"
  follows). Both companies withdraw at night, separately, without an
  on-screen march (caption states destinations: Joab to Hebron, Abner to
  Mahanaim — the latter cross-referencing the ADR-013 map layer, not staged).
- **Casualty count — stated, not modeled.** 2:30–31's numbers (19 of Joab's
  men plus Asahel; 360 of Abner's men) are **narrated as a caption/statistic
  at the closing beat**, not rendered as ~380 individual bodies — modeling
  the full count would be a performance and taste mismatch with the
  restraint shown everywhere else in the project (register #2's precedent
  against invented on-screen precision applies in spirit: the _count_ is
  textual and gets stated plainly, but the battlefield itself is not
  populated to match it literally). `claim-gibeon-casualties` states this
  explicitly in `notes`.
- **New named characters — Joab, Abner, Asahel, Abishai.** None exist yet in
  `src/data/characters.ts` (checked — only `david`/`davids-band`/`abiathar`/
  antagonist and M1–M3 entities are present). Add all four as `person`
  entities, principal tier: **Joab** (David's commander, will recur through
  the war narratives — this scene is his introduction at scene-scale);
  **Abner** (Ish-bosheth's commander, Saul's former general — recurs at his
  death in 2 Sam 3); **Asahel** (Joab's youngest brother, dies this scene —
  `passageRefs` closes at 2 Sam 2); **Abishai** (Joab's other brother,
  present at the pursuit per 2:24 but does not kill or die here — lighter
  entry, recurs later). Ish-bosheth himself is **not staged** — he is not
  narrated as physically present at Gibeon (only "the servants of
  Ish-bosheth," 2:12) and stays off-scene per ADR-013's atlas-tier treatment,
  referenced only via the closing card and the `mahanaim` location. Abner's
  and Ish-bosheth's men render as an anonymous group
  (`servants-of-ish-bosheth`, new group entity, mirroring `davids-band`'s
  shape) — no invented unit identity beyond the text's "servants."
- **Closing card — gestures forward, does not scope M5.** States plainly (2
  Sam 3:1's own words, paraphrased): the war between the two houses continued
  and grew long, David's house grew stronger and Saul's house weaker. No
  named future event (Abner's death, Ish-bosheth's death, Jerusalem) is
  previewed — the closing card matches Gilboa's precedent (pointed forward to
  Beth-shan "without depicting it") in restraint, not in specific content.

## Visual composition

- **Terrain:** the central Benjamin plateau — gentler, more open than
  Hebron's terraced highlands or Gilboa's ridge; low rolling hill country,
  agricultural terraces at a lighter grade, the pool installation as the
  site's one dramatic vertical feature (a cut shaft descending into
  bedrock). Distinct again from every prior M3/M4 terrain type.
- **Focal masses:** (a) **the pool** — the meeting-ground beat's anchor,
  the two companies arrayed on either side across open ground; (b) **the
  contest ground** — a cleared space adjacent to the pool, the twelve pairs
  staged in a shallow arc readable from the default viewpoint; (c) **the
  pursuit route** — a ridge/wadi line running toward the wilderness of
  Gibeon, carrying Asahel's chase and Abner's confrontation; (d) **the hill
  of Ammah** — a modest rise where the halt beat plays, visually separate
  from the pool so the observer feels the day's distance traveled.
- **Sightlines:** from the pool-edge default viewpoint, the observer holds
  both companies and the pool in one frame — the meeting, then the contest,
  read as a single held composition before the wider battle breaks it apart.
  From the pursuit ridge, a longer sightline toward open country carries the
  chase's distance. From the hill of Ammah, the two companies read as
  separated masses at dusk — the halt's visual argument.
- **Lighting arc:** day (meeting, contest, battle) → lengthening shadows
  (pursuit, Asahel's death) → dusk (the halt, "the sun went down," 2:24
  supports this literally — one of the few M4 beats with a narrated hour) →
  night withdrawal implied by caption, not rendered as a night scene.
  Restrained, not somber-for-effect — this is battle, not funerary framing.

## Scale assumptions

- **The contest:** exactly **24** principal-tier figures (12 per side,
  narrated count — the one beat in this scene with a precise, non-disclosed
  number).
- **Company retinues (meeting/contest-ground beat):** each side's "servants"
  are otherwise uncounted; **~25–35 ambient figures per side** (~50–70
  total), a disclosed placeholder crowd, present as witnesses/reserve, not
  fighting in the contest beat.
- **The wider battle beat:** compressed — **~40–60 total figures** in the
  background melee (reused Gilboa-pattern choreography at reduced count),
  explicitly _not_ scaled to the 379-casualty total (see the casualty-count
  design call above).
- **Principals:** Joab, Abner, Asahel, Abishai (marker/principal treatment,
  David-style) ≈ **4**.
- Peak (meeting/contest overlap) ≈ **95–115 figures** high tier — comparable
  to `ziklag-lament` and `hebron-anointing`, below Gilboa.

## Camera / observer experience

- **Default viewpoint** (`vp-pool`): pool-edge, holding both companies and
  the shaft in one frame.
- Additional viewpoints: **the contest ground** (`vp-contest-ground`, closer
  to the twelve-pair arc, documentary distance maintained); **the pursuit
  ridge** (`vp-pursuit-ridge`, walk-mode emphasis along the chase line);
  **the hill of Ammah** (`vp-hill-ammah`, the evening halt, both companies
  visible as separated masses at dusk).
- Suggested duration ~150–160s (the longest beat count of the three M4
  scenes); pacing guidance: **Asahel's warning-and-death beat holds
  second-longest after the contest** — do not default to even spacing.
  `depictsDeath: true`; first-visit advisory applies (already answered if
  the observer has visited Gilboa/Beth-shan/Jabesh/`ziklag-lament` — the
  setting persists per ADR-009). ADR-007 applies throughout.
- **Timeline beats and violence treatment** (standard is the default):

  | Beat              | Text    | Standard                                                                                                                                | Reduced                                                              |
  | ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
  | `b-meeting`       | 2:12–13 | the two companies arrive and face each other across the pool; no violence                                                               | identical                                                            |
  | `b-challenge`     | 2:14    | Abner's proposal, Joab's flat acceptance ("Let them arise"); speech beat, excerpt below                                                 | identical                                                            |
  | `b-contest`       | 2:15–16 | twelve pairs close, grip-and-thrust posture held, simultaneous collapse; no blade-entry frame; caption states Helkath-hazzurim's naming | posture elided — cut straight to the twenty-four fallen, wider frame |
  | `b-battle`        | 2:17    | brief background melee, compressed figure count, backdrop to the pursuit beat                                                           | identical choreography, wider camera                                 |
  | `b-pursuit`       | 2:18–19 | Asahel breaks off after Abner alone, ignoring Joab and Abishai; no violence                                                             | identical                                                            |
  | `b-asahel-warned` | 2:20–22 | Abner turns, two warnings staged as a held gesture-and-pause confrontation; excerpt below                                               | identical                                                            |
  | `b-asahel-death`  | 2:23    | the backward spear-thrust at documentary distance, no blade-entry frame; Asahel falls; the pursuit stalls around his body per the text  | the thrust elided — cut from the warning directly to Asahel fallen   |
  | `b-halt`          | 2:24–28 | the hill of Ammah at dusk; Abner's question excerpted; Joab's horn-signal, pursuit visibly stops                                        | identical                                                            |
  | `b-withdrawal`    | 2:29–32 | night withdrawal by caption only (not rendered as night geometry); casualty statistic stated; closing card → 2 Sam 3, not depicted      | identical                                                            |

- Walk mode should reward the pool itself (steps descending into the shaft,
  where geometry allows) and the pursuit ridge's distance — the day's
  geography, not the violence, is the embodied-discovery content here.

## Performance target

- Budgets per `QUALITY_PROFILES`; target **comparable to `ziklag-lament`/
  `hebron-anointing`** (~95–115 peak figures, similar draw-call range) —
  well below Gilboa despite this being the most violence-dense M4 scene, per
  the compressed-battle design call above.
- Reuse Gilboa's `sampleFightPoses`/pose-bucket infrastructure
  (`engine/characters/animation.ts`) for the background battle beat rather
  than authoring new fight animation from scratch; the contest beat needs
  **one new pose pattern** (mirrored grip-and-thrust, held-then-collapse),
  the only genuinely new animation this scene requires.
- Static single-directional + hemisphere rig with a day→dusk keyframed
  mutation (established M3/M4 pattern); minimal dust only in the battle beat
  if reused from Gilboa's rout-dust system, disclosed as sparing reuse, not
  a new atmosphere pass.
- Run `performance-reviewer` after the first geometry slice lands.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates the scene's
`claimIds`/`assetIds` then — the `SceneDef` arrays stay empty until they
exist. All captions paraphrase except the three budgeted excerpts below.

- **Blocking research item:** a **Gibeon/el-Jib excavation source card**
  (candidate: James B. Pritchard's excavation publications — _Hebrew
  Inscriptions from Gibeon_, 1959; _Gibeon's History in Light of
  Excavation_, 1962/1964; a summary entry may exist in Rainey & Notley or a
  NEAEHL-style reference already on hand — **not page-verified in this
  environment**, same honesty bar as the hebron-anointing brief's blocking
  item). A `researcher` pass at build must land at least one checkable card
  before `claim-gibeon-pool-identification` cites specific excavation
  details (shaft depth, step count, dating). **Fallback if unverifiable:**
  render the pool as a schematic rock-cut shaft under `design-placeholder`
  without specific excavation-report figures — the scene still ships.
- **Existing, reuse:** `rainey-notley-2006` (already cited on the `gibeon`
  `LocationEntry`), `esv-bible`. `claim-david-historical` (extend
  `passageRefs`).
- **New, setting:** `claim-gibeon-identification` (site identification,
  basis `archaeology`, high — mirrors the location entry's Pritchard
  attribution); `claim-gibeon-pool-identification` (the specific pool
  feature, basis `archaeology` + `biblical-text`, confidence **moderate**,
  hedged per the design call above); `claim-benjamin-plateau-terrain` (basis
  `scholarly-reconstruction`, high for landforms, ancient-cover caveat per
  the established pattern).
- **New, narrated (basis `biblical-text`):** `claim-gibeon-meeting` (2:12–13
  — the two companies, the pool); `claim-contest-helkath-hazzurim` (2:14–16
  — Abner's challenge, the mutual-grip contest, the naming; `notes` records
  the new-choreography flag for Fable confirmation); `claim-gibeon-battle`
  (2:17 — the wider engagement; `notes` states the figure-count compression
  explicitly, same disclosure discipline as `claim-battle-scale`);
  `claim-asahel-pursuit` (2:18–23 — the chase, Abner's warnings, the death;
  `notes` cross-references the blood-feud setup for 2 Sam 3); `claim-gibeon-
halt` (2:24–28 — the hill of Ammah, Abner's question, Joab's recall);
  `claim-gibeon-casualties` (2:30–31 — the narrated counts; `notes` states
  plainly that the battlefield is not modeled to match the count literally);
  `claim-gibeon-withdrawal` (2:29, 2:32 — night withdrawal to Mahanaim/
  Hebron, Asahel's burial at Bethlehem noted in `notes` only, not staged).
- **Characters:** add `joab`, `abner`, `asahel`, `abishai` (all `person`,
  principal tier); add `servants-of-ish-bosheth` (`group`, mirrors
  `davids-band`'s shape). Reuse `david` (context only — not present at
  Gibeon; extend `passageRefs` for the closing-card reference).
  Ish-bosheth is **referenced, not added as a staged character** (ADR-013 —
  he is not narrated as present at this event).
- **Assets (reuse):** `asset-figure-procedural`, `asset-david-marker`
  (pattern reused for Joab/Abner marker treatment), Gilboa's fight-pose
  bucket infrastructure, `asset-rocks`, `asset-vegetation-scrub`,
  `asset-field-plots`. **New (placeholders with `whyTemporary`):**
  `asset-terrain-gibeon-plateau`, `asset-gibeon-pool` (the rock-cut shaft —
  gated on the blocking research item above), `asset-sword-simple` (small
  prop, shared across combat-capable characters if not already present —
  check `src/engine` for an existing weapon prop before authoring a new
  one).

## Placeholder policy

- **Allowed placeholders:** the pool's exact excavated dimensions/step count
  (pending the source card; schematic otherwise); ambient
  company-retinue figure counts; the compressed battle beat's figure count
  relative to the narrated 380-scale casualty total; hour/lighting-arc
  specifics beyond the one narrated dusk cue (2:24); the contest ground's
  exact layout relative to the pool.
- **Not allowed:** any blade-entry, wound, or gore geometry in any mode, in
  any beat (the contest and Asahel's death both stop at posture-level, same
  bar as every prior scene); modeling the full casualty count as individual
  battlefield bodies; a crowd-spectator/cheering arc around the contest;
  framing Joab's tactical outcome as a win state or the halt as a
  reconciliation (ADR-011); invented dialogue beyond the excerpted/
  paraphrased text; staging Ish-bosheth as physically present; night-geometry
  rendering of the withdrawal (caption only); any content that pre-commits
  M5 scope beyond the closing card's plain paraphrase of 2 Sam 3:1.

## ESV excerpt budget plan

(`integrity.test.ts`: ≤3 spans, ≤200 chars each, ≤500 total in beat
captions.)

1. **"Let the young men arise and compete before us."** (2:14, `b-challenge`)
2. **"Turn aside from following me... How then could I lift up my face to
   your brother Joab?"** (2:22, condensed with an ellipsis to stay under the
   per-span character cap — confirm exact trimmed wording against the ESV
   text at build time; `b-asahel-warned`)
3. **"Shall the sword devour forever? Do you not know that the end will be
   bitter?"** (2:26, `b-halt`)

Everything else — including the casualty statistic and the closing card — is
paraphrase.
