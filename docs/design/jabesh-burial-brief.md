# Scene brief — Jabesh-gilead, the night retrieval and burial (`jabesh-burial`, M3)

World-director pass, Fable, 2026-07-14. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Third and closing scene of Milestone 3.

Scope guard: this brief covers **1 Samuel 31:11–13 from the Jabesh side** — the
column coming home through the night, the burning, the burial of the bones under
the tamarisk, and the seven-day fast. The taking-down of the bodies at
Beth-shan's wall (31:12a) renders in `beth-shan-walls` (the world that contains
the wall); this scene recaps it in its opening card and never rebuilds Beth-shan
geometry. Forward links (the Amalekite messenger, David's lament, David's
blessing of Jabesh — 2 Sam 1:1–16; 1:17–27; 2:4–7) are closing-card material
only, M4 territory.

## Historical intent

The observer should come away understanding four things:

1. **Covenant loyalty repaid, at cost.** Jabesh-gilead is the town Saul's first
   act as king rescued from Nahash the Ammonite (1 Sam 11). Its men walk all
   night, cross the Jordan, take the bodies from a hostile city's wall, and
   walk back. The narrative's own frame for this is loyal daring — "all the
   valiant men" — and David later blesses it explicitly (2 Sam 2:5–7). The
   scene's job is to make the observer feel why _this_ town, across the river,
   is the one that moves.
2. **An unlocated site, rendered honestly.** Jabesh-gilead's identification is
   genuinely disputed (register #8: Tell el-Maqlub vs. Tell Abu al-Kharaz,
   neither adopted). Like Ziklag, this scene is a **disclosed composite** — a
   representative lower–Wadi Yabis setting on Gilead's western flank, the
   topographic common denominator of both candidates (the wadi corridor, hill
   country over the Jordan valley) — and **not a portrait of either tell**.
   This is the counterweight to Beth-shan in the same milestone: one scene
   shows what an identified, excavated site lets us assert; this one shows the
   discipline of not pretending.
3. **The burning is anomalous, and the scene says so.** "They came to Jabesh
   and burned them there" (31:12) — cremation is exceptional against normal
   Israelite burial practice, 1 Chronicles 10:12 omits it, and commentators
   have long debated why (honorable treatment of mutilated and days-exposed
   bodies, prevention of further desecration, textual emendation proposals).
   We depict the burning with restraint (see the beat table) and carry the
   debate as `scholarlyViews` on `claim-burning-bodies` — surfaced, not
   silently normalized and not silently skipped.
4. **Mourning gets the same seriousness as battle.** Bones buried under the
   tamarisk (31:13 — echoing the tamarisk Saul sat beneath in 1 Sam 22:6; the
   Chronicler says "the oak/terebinth," a variant worth a label note), then a
   seven-day fast. Gilboa ended in silence; this scene _is_ the silence, given
   its own duration. It closes 1 Samuel: the kingdom's first act answered by
   its last kindness. No spectacle anywhere — this is deliberately the
   quietest scene in the project so far.

## Resolved design calls (this pass)

- **Composite setting, register #8 updated but not closed.** Terraced
  hill-flank ground above a modest perennial wadi (the Wadi Yabis form), a
  small **unwalled cluster village** on a terrace — explicitly not the Ziklag
  enclosed ring (ADR-006's rider: layout type re-justified per scene; a small
  open Gilead village is a different settlement form, `claim-jabesh-town-form`,
  `design-placeholder`). Both candidate identifications stay surfaced on the
  location label; the register row's "current default" now reads composite.
- **Pyre treatment — a disciplined extension of ADR-009.** ADR-009's text
  covers deaths and the wall display, not funerary burning; this brief extends
  its principles to the pyre and queues the wording for ratification into the
  ADR at M3 sign-off (queue #17): **in both modes the wrapped forms are laid
  and fully covered by the pyre timber before any flame renders. No burning
  human silhouette, no charring detail, in any mode, ever.** Standard shows
  the covered pyre lit and burning at documentary distance; reduced holds
  wider and cuts from lighting to embers. Facts identical in both modes'
  captions.
- **Bones as a wrapped bundle, never skeletal geometry.** 31:13's
  bone-gathering renders as a cloth-wrapped bundle handled with care; no bone
  meshes in any mode. Same logic as the display forms at Beth-shan: distance
  and wrapping carry the fact without anatomical rendering.
- **No named individuals, no Philistine presence.** The text names no one at
  Jabesh and narrates no pursuit or interference — do not invent elders,
  leaders, or a Philistine threat beat. Leadership reads by staging only.
- **March distance stays representative.** The all-night round trip is
  narrated; its length depends on the unresolved site question (and on the
  Jordan crossing, which is off-scene). No on-screen kilometer or duration
  figures — same rule as the Besor route (register #2 precedent).
- **Fire tech is reused, not reinvented.** Torches and pyre flame use the
  amalekite-camp emissive sprite approach (shared material, no real lights).
  The pyre is the one large fire the project has rendered; it stays a light
  source in appearance only.

## Visual composition

- **Terrain:** ADR-005 `hills` + a `channel` feature for the wadi — narrower
  and greener than the Besor braid, a perennial stream line in hill country.
  Palette: Gilead Mediterranean hill flank — the project's **fourth regional
  palette** (Negev loess → Gilboa garrigue → Beth-shean valley green → Gilead
  hills): oaks and scrub on the slopes, a tamarisk/oleander line along the
  water, terraced plots near the village.
- **Focal masses:** (a) **the wadi path** climbing from the west — the
  direction of the Jordan valley and Beth-shan, the axis the column arrives
  along; (b) **the village terrace** — a loose cluster of small mudbrick
  houses, no wall; (c) **the pyre ground** just outside the village; (d) **the
  tamarisk** — a single mature tree, the scene's landmark and its final
  resting point (`asset-tamarisk-tree`; the Chronicles terebinth variant on
  its label).
- **Sightlines:** from the village edge at night, the torches of the returning
  column string down the dark wadi path with the valley behind them — the
  money shot; compose it first. By day, the western view from the terrace
  opens toward the Jordan valley (Beth-shan's direction), tying the two scenes
  geographically.
- **Lighting arc:** deep night (arrival by torchlight) → grey dawn (the town
  receives them) → morning (pyre) → dusk (burial) → a compressed day-cycle
  shimmer under the seven-day-fast card → still evening (close). Hours beyond
  "night" and "seven days" are disclosed `design-placeholder`.

## Scale assumptions

- The text gives **no numbers** at Jabesh — "all the valiant men" and "all"
  who fasted. No ratio applies (there is no narrated count to scale from —
  unlike the six hundred or the four hundred). Disclosed design choices:
  - **Retrieval party:** ~10–12 figures bearing four biers.
  - **Townspeople:** ~30–40 receiving, mourning, at the burial and fast.
  - High-tier total ≈ **45–55 figures** — deliberately the smallest cast of
    M3. The scene's cost is vegetation, terrain, and night lighting, not
    crowds.
- Village size: a hamlet-scale cluster (~8–12 structures), representative of a
  small Gilead town, disclosed placeholder — no settlement-size assertion for
  a site we cannot even locate.

## Camera / observer experience

- **Default viewpoint** (`vp-village-edge`): the village edge at night,
  looking west down the wadi path as the torches come home.
- Additional viewpoints: **the wadi path** (`vp-wadi-path`, walk-mode emphasis
  — climbing the last stretch the bearers climbed); **the pyre ground**
  (`vp-pyre-ground`, held at documentary distance by placement); **the
  tamarisk** (`vp-tamarisk`, the burial and the fast); **the west terrace**
  (`vp-west-terrace`, the daylight sightline toward the Jordan valley and
  Beth-shan).
- **Timeline beats and violence/mourning treatment** (ADR-009 as extended
  above; the first-visit advisory applies — the scene depicts the handling and
  burning of the dead even though no violence occurs in it):

  | Beat            | Text     | Standard                                                                                                                                      | Reduced                                                                             |
  | --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
  | `b-night-march` | 31:11–12 | opening card recaps the wall retrieval (rendered in `beth-shan-walls`, not here); the column arrives by torchlight bearing four covered biers | identical (the forms are wrapped in both modes)                                     |
  | `b-received`    | 31:12    | grey dawn; the town comes out; grief poses, quiet — no wailing choreography beyond the pose system's restraint                                | identical                                                                           |
  | `b-pyre`        | 31:12b   | the biers laid, fully covered by timber, then lit; flame and smoke at documentary distance; caption states the burning and its strangeness    | wider frame; cut from lighting to embers; caption identical                         |
  | `b-bones`       | 31:13a   | the bones gathered as a cloth-wrapped bundle, handled with care; **no skeletal geometry**                                                     | the gathering elided; the bundle simply present at the next beat; caption identical |
  | `b-tamarisk`    | 31:13a   | burial beneath the tamarisk; the mound closed; no violence                                                                                    | identical                                                                           |
  | `b-seven-days`  | 31:13b   | time-compression card — seven days of fasting; the village in stillness under a compressed day-cycle                                          | identical                                                                           |
  | `b-close`       | —        | still evening; closing card: the news will reach David (2 Sam 1), and David will bless Jabesh for this (2 Sam 2:5–7) — **not depicted**       | identical                                                                           |

- Walk mode should make the ground itself carry the story: the last climb of
  the path, the terrace, the distance from pyre ground to tamarisk. Suggested
  duration ~150s, matching its siblings.

## Performance target

- The smallest M3 scene; budgets per `QUALITY_PROFILES`, target ≤ the Besor
  scene's per-tier draw calls (its nearest analogue: open terrain + vegetation
  - modest crowd). One `InstancedMesh` per repeated family (house, tree
    species, scrub, rock, torch sprite, figure, bier).
- Night lighting per the amalekite-camp precedent: keyframed single
  directional + hemisphere, emissive sprites for torches/pyre, **no new
  real-time lights**, shadow budget unchanged.
- The seven-day compression's day-cycle lighting must stay a keyframed rig
  mutation (refs per frame), not new lights or per-frame material rebuilds.
- Run `performance-reviewer` after the first geometry slice lands.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates `claimIds`/`assetIds` then.
All captions paraphrase; **no new ESV excerpts** (budget guard in
`src/data/integrity.test.ts`; beat captions still aren't scanned by the test —
be disciplined manually).

- **Existing, reuse:** `claim-dress` (base dress), `claim-chronology` (period
  framing), and `claim-jabesh-retrieval` (31:11–12a, created for
  `beth-shan-walls` and **shared** — one claim, two scenes).
- **New, identification (disputed):** `claim-jabesh-location` (basis
  `scholarly-reconstruction`, low; `scholarlyViews`: Tell el-Maqlub
  [moderate — Wadi Yabis name continuity, Eusebius' distance notice] vs. Tell
  Abu al-Kharaz [low — e.g., Fischer]; composite-setting disclosure in
  `notes`; `rainey-notley-2006`; keep proponent attribution hedged where not
  page-verified).
- **New, terrain/setting:** `claim-gilead-terrain` (basis
  `scholarly-reconstruction`, moderate; Wadi Yabis corridor form, Gilead hill
  flank; `rainey-notley-2006`); `claim-jabesh-town-form` (basis
  `design-placeholder`; unwalled hamlet cluster, ADR-006 per-scene
  justification).
- **New, narrated (basis `biblical-text`):** `claim-night-march` (31:11–12 —
  the all-night walk; plausibility discussed without asserting distance;
  depends on the open site question); `claim-burning-bodies` (31:12b —
  narrated burning; `scholarlyViews` carry the cremation anomaly, the
  1 Chr 10:12 omission, and proposed explanations with hedged attribution —
  **citation verification queued #17**; `king-stager-2001` for normal burial
  practice as the baseline the act departs from); `claim-tamarisk-burial`
  (31:13a — bones under the tamarisk; Chronicles terebinth variant and the
  1 Sam 22:6 tamarisk echo in `notes`); `claim-seven-day-fast` (31:13b —
  mourning rite, seven-day parallels noted; `king-stager-2001`).
- **Characters:** reuse the `men-of-jabesh` group entry created for
  `beth-shan-walls`; add no named individuals (none are named).
- **Assets (placeholders with `whyTemporary`):** `asset-terrain-jabesh-wadi`,
  `asset-tamarisk-tree`, `asset-pyre`, `asset-bier-props` (shared with
  Beth-shan), `asset-village-cluster`, a Gilead vegetation extension (new
  `asset-vegetation-gilead` or a disclosed broadening of
  `asset-vegetation-scrub` + `asset-olive-tree` for oaks), reuse
  `asset-figure-procedural`, `asset-rocks`, and the fire-sprite technique for
  torches/pyre (disclosed reuse of `asset-camp-fire` tech or a new
  `asset-torch-sprites` shared with Beth-shan).

## Placeholder policy

- **Allowed placeholders:** the entire village form (unlocated site — the
  composite is the point, disclosed as at Ziklag); wadi microrelief and water
  presence/season; tamarisk size and placement; pyre construction; bier and
  torch props; terraced-plot hints; all lighting hours; the retrieval party's
  size.
- **Not allowed:** adopting either candidate tell's plan or setting as "the"
  Jabesh (register #8 is open — the composite must stay a composite until it
  resolves); skeletal or bone geometry in any mode; a burning human silhouette
  or charring detail in any mode; invented named elders or leaders; any
  Philistine pursuit/interference drama; on-screen distance or march-duration
  assertions; softening the burning out of the captions (reduction abstracts
  depiction, never facts — the anomaly is stated in both modes).
