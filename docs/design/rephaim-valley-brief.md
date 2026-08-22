# Scene brief — Two Philistine battles at the Valley of Rephaim (`rephaim-valley`, M6)

**PROVISIONAL — Sonnet-fallback scope pass, 2026-08-22.** Same fallback-policy
caveat as the other two M6 briefs — see `hebron-unification-brief.md`'s
header and `docs/fable-review-queue.md` #21.

Scope guard: this brief covers **2 Samuel 5:17–25**: the Philistines'
response to David's kingship over all Israel, two battles at the Valley of
Rephaim, and the "sound of marching in the tops of the balsam trees" divine
sign. Third and last scene of M6, built after `jerusalem-city-of-david`
(this scene's location — the valley approaches to Jerusalem from the
southwest — depends on the observer already having Jerusalem's geography
established). This closes the milestone; its closing card may not point
past 2 Samuel 5 in any form.

## Historical intent

The observer should come away understanding three things:

1. **The Philistines attack only once David is king over _all_ Israel, not
   merely Judah** (5:17 — "when the Philistines heard that David had been
   anointed king over Israel, all the Philistines went up to search for
   David"). This is a direct causal beat: a unified kingdom is a threat the
   fragmented one wasn't. Stage the Philistine advance as a response to
   news of the anointing (`hebron-unification`), not an unmotivated raid —
   the scene's opening card should make that causal link explicit.
2. **The text stages two distinct battles with two distinct divine-guidance
   patterns, and the difference matters.** The first battle (5:17–21):
   David inquires of the LORD, is told to go up, wins, and names the place
   Baal-perazim ("the LORD has broken through my enemies before me like a
   breaking flood") — a direct-assault victory. The second (5:22–25): the
   Philistines return, David inquires again, and is told _not_ to attack
   head-on but to circle behind and wait for "the sound of marching in the
   tops of the balsam trees" as the signal to attack — a wait-for-a-sign,
   flanking-maneuver victory, explicitly different tactics for what looks
   like the same military situation. The scene should let the observer
   notice the deliberate narrative pairing (repeated Philistine incursion,
   repeated inquiry, different divine answer each time) rather than
   collapsing the two into one generic "David beat the Philistines twice"
   beat.
3. **The idols left behind and burned (5:21) are a specific, textually
   real detail, not invented set-dressing** — the Philistines "left their
   idols there, and David and his men carried them away" (the parallel
   account, 1 Chronicles 14:12, adds that David ordered them burned; 2
   Samuel itself only says "carried away" — the burning is a
   cross-book detail, flag it as such rather than presenting it as if 2
   Samuel said it directly). This is the project's first staged
   Philistine cultic-object detail; keep it modest and undetailed (no
   invented iconography for what the idols depict — the text gives no
   description) rather than an opportunity for elaborate prop design.

## Resolved design calls (this pass — provisional, see queue #21)

- **Location: the Valley of Rephaim, generically placed southwest of
  Jerusalem** (the biblical valley of that name is conventionally located
  in that direction, toward Bethlehem, but has no single excavated
  identification the way Gilboa or Beth-shan do — treat this as a
  `design-placeholder` valley/terrain feature adjoining the Jerusalem
  terrain system built for `jerusalem-city-of-david`, not a new fully
  independent regional system). Reuse the Judean-highland terrain palette
  with a valley/lowland variant rather than inventing a sixth regional
  system from scratch.
- **Battle scale: deliberately smaller than `gilboa-battle`.** This is not
  the project's next set-piece battle at Gilboa's scale — the text gives no
  casualty numbers, no named individual duels, and no drawn-out combat
  description for either engagement; both battles read as fast, decisive
  routs ("the LORD has broken through," "and David struck down the
  Philistines from Geba/Gibeon as far as Gezer" per 5:25 — a pursuit
  summary, not a battle-by-battle narration). Stage both as brief
  engage-and-rout beats, closer in register to `gilboa-battle`'s rout
  window alone than to its full multi-phase melee-combat sequence. Reuse
  `gilboa-battle`'s combat pose-function conventions
  (`sampleFightPoses`/`sampleWalkPoses`, `engine/characters/animation.ts`)
  directly rather than inventing new combat animation — this is the
  project's second combat scene, and consistency with the first matters
  more than novelty.
- **The two battles are staged as two distinct beats with a clear
  before/after (regrouping) beat between them**, not as one merged combat
  sequence — the text's own structure (inquiry → battle → naming; second
  incursion → inquiry → different tactic → battle → pursuit) is the
  scene's spine.
- **"The sound of marching in the tops of the balsam trees" (5:23–24)
  stages as an audible/environmental cue** (wind through tree canopy,
  timed with a lighting or particle shift as the "sign") **rather than a
  literal visible divine figure or army** — the text specifies a sound, not
  a vision; do not invent a visual theophany.
- **The idols (5:21) render as a small number of generic, undetailed
  cultic objects** (a handful of instanced small props — figurine-scale,
  not monumental) carried/gathered at the first battle's aftermath; the
  Chronicles-sourced burning detail, if staged at all, must be captioned as
  drawn from the parallel account, not presented as 2 Samuel's own text.
  Simpler and equally defensible: omit the burning as staged action
  entirely and carry it only as an optional caption note — the implementer
  should default to omission unless a clean staging opportunity is obvious,
  per the project's "when period evidence/textual warrant is thin, omit or
  label placeholder rather than invent" discipline (`CLAUDE.md`).
- **No named Philistine commander or individual duel** — the text names no
  Philistine leader in this passage (unlike `gilboa-battle`'s named Saul/
  Jonathan or `hebron-gate`'s named Abner) — this stays a generic-forces
  engagement on both sides.
- **`depictsDeath: true`** — combat with implied casualties on both sides;
  ADR-009's standard restraint applies (no gore geometry, reduced-intensity
  mode available per the standing project-wide policy), same register as
  `gilboa-battle`'s established convention, scaled down.

## Visual composition

- **Terrain:** a valley/lowland variant of the Judean-highland palette,
  adjoining (not overlapping) the Jerusalem ridge terrain from
  `jerusalem-city-of-david` — establish it as visibly connected geography
  (the observer should be able to orient "this valley is near the city I
  just walked"), balsam/mulberry-type tree cover for the canopy-sound beat
  (`asset-balsam-canopy`, new placeholder asset, disclosed generic
  Levantine tree form — the exact species identification of the Hebrew
  _bekaʾim_ is itself debated among translators/botanists, "balsam,"
  "mulberry," and "aspen" all appear across translations; state this
  translation uncertainty in the claim notes rather than committing to one
  species visually beyond a generic broadleaf canopy).
- **Focal masses:** (a) the first battle's engagement ground, ending at the
  Baal-perazim naming beat with the gathered idols; (b) a regrouping/
  return-of-the-Philistines transition; (c) the second battle's flanking
  maneuver, staged so the observer can see David's force circling behind
  rather than advancing head-on — the tactical difference from battle one
  should be legible in the blocking, not just the caption; (d) the pursuit
  beat (5:25), a brief traveling/rout shot rather than a new full combat
  sequence.
- **Sightlines:** default vantage should read as open valley/agricultural
  lowland, distinct from Gilboa's mountain slope and Hebron's terraced
  highland town — give the observer a genuinely different landscape
  register for the project's second battle.
- **Lighting:** daytime for both battles (no hour stated); the
  balsam-canopy sign beat may use a brief environmental shift (wind/light
  flicker) as the "sign" cue, disclosed `design-placeholder` staging choice.

## Scale assumptions

- **Philistine force per battle: disclosed design count ≈ 60–100** —
  smaller than Gilboa's ~325-figure full battle; "all the Philistines"
  (5:17) is a summary phrase, not a count, and this is a two-battle
  skirmish-scale campaign in the text's own economical telling, not a
  climactic set-piece.
- **David's force per battle: disclosed design count ≈ 60–100**, matched
  scale to the Philistine side (unlike Gilboa's defender/attacker
  asymmetry, this is a roughly even-forces reading — the text gives no
  ratio).
- **High-tier total ≈ 130–200 figures across both battles** (figures can be
  substantially reused/re-posed between the two battle beats rather than
  doubled) — the milestone's largest scene by figure count, but still well
  under Gilboa's ~325, matching the "brief engage-and-rout, not full
  melee" register decided above.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-overview`): the valley geography, the
  causal opening card (Philistines respond to the anointing).
- Additional viewpoints: **the first battle/Baal-perazim naming**
  (`vp-baal-perazim`); **the balsam-canopy sign** (`vp-balsam-grove`,
  inspect emphasis, the environmental-cue beat); **the second battle/
  flanking maneuver** (`vp-flank`, walk emphasis, tactical-legibility
  priority).
- **Timeline beats** (`depictsDeath: true`, ADR-009 advisory fires — first
  time since `jerusalem-city-of-david` in the same milestone, note in the
  advisory copy this is the second M6 combat scene if the UI convention
  distinguishes repeat visits; suggested duration ~150–180s):

  | Beat             | Text      | Treatment                                                                                                                                                                  |
  | ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-response`     | 5:17      | Opening card: the Philistines respond to news of the all-Israel anointing. Causal link to `hebron-unification` stated explicitly.                                          |
  | `b-inquiry-one`  | 5:19a     | Card/dialogue beat: David inquires of the LORD, told to go up.                                                                                                             |
  | `b-battle-one`   | 5:19b–20  | Staged: the first engagement, brief engage-and-rout. `vp-valley-overview`/`vp-baal-perazim`.                                                                               |
  | `b-baal-perazim` | 5:20b     | Staged: the naming, the gathered idols. `vp-baal-perazim`.                                                                                                                 |
  | `b-regroup`      | 5:22      | Card/transition: the Philistines return and spread out again in the valley.                                                                                                |
  | `b-inquiry-two`  | 5:23a     | Card/dialogue beat: David inquires again, told not to go up directly but to circle behind.                                                                                 |
  | `b-sign`         | 5:23b–24  | Staged: waiting near the balsam trees for the sound of marching. `vp-balsam-grove`.                                                                                        |
  | `b-battle-two`   | 5:24b–25a | Staged: the flanking attack, brief engage-and-rout, tactically distinct blocking from battle one. `vp-flank`.                                                              |
  | `b-pursuit`      | 5:25b     | Staged: brief pursuit shot, Geba/Gibeon to Gezer (a travel/rout beat, not a new combat sequence).                                                                          |
  | `b-close`        | —         | Closing card: milestone-closing card. **No 2 Samuel 6+ content in any form**, depicted or foreshadowed — the ark's return to Jerusalem is M7's opening, not a teaser here. |

## Performance target

- ≈ 130–200 high-tier figures across two battle beats, reusing
  `gilboa-battle`'s `sampleFightPoses`/`sampleWalkPoses` bucket convention
  directly — this keeps the new-engine-cost surface small despite being the
  milestone's largest figure count (the reuse is the point: no new combat
  animation system, just a new terrain/valley dressing and a smaller cast).
  One `InstancedMesh` per repeated family, matching every prior scene.
- Run `performance-reviewer` after both battle beats land — this is the
  project's first scene with two separate combat sequences in one scene,
  worth checking that the pose-bucket system's per-frame cost doesn't
  double naively when two battle windows exist in one timeline even if
  they don't render simultaneously.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay
empty in `scenes.ts` until they exist.

- **Existing, reuse:** `claim-david-historical`, `claim-dress` (Philistine
  military dress — reuse the `gilboa-battle` Philistine kit/headdress
  claim and its existing `scholarlyViews` dispute label rather than
  re-deriving it), `claim-battle-scale`'s general combat-staging
  conventions (cite as precedent, don't re-derive the ratio logic — this
  scene's own scale is smaller and gets its own disclosed-count claim, see
  below).
- **New, narrated (basis `biblical-text`):** `claim-philistine-response`
  (5:17, the causal link to the anointing); `claim-baal-perazim-battle`
  (5:18–20, the first battle and naming); `claim-rephaim-second-battle`
  (5:22–25, the second battle, the balsam-canopy sign, and the pursuit).
- **New, cross-book (basis `biblical-text`, notes must disclose the
  cross-reference explicitly):** `claim-idol-burning` **only if** the
  implementer stages the Chronicles-sourced burning detail; if the burning
  is omitted per the Resolved design calls' default, this claim is
  unnecessary — a plain `claim-idols-captured` (5:21, "carried away") on
  its own is sufficient and simpler.
- **New, design (basis `design-placeholder`):** `claim-rephaim-valley-form`
  (the valley's exact terrain/vegetation form — no specific excavated
  identification exists to cite); `claim-rephaim-cast-scale` (the disclosed
  per-battle figure counts above); `claim-balsam-canopy-form` (species
  uncertainty disclosed per Visual composition above).
- **Characters:** reuse `david`, `davids-band`, and the Philistine
  group-character entry established by `gilboa-battle` if one exists (check
  `characters.ts` — reuse its id rather than creating a duplicate
  Philistine-forces entry).
- **ESV excerpt budget:** `2sam-5` is shared across all three M6 scenes;
  check `hebron-unification`'s and `jerusalem-city-of-david`'s spend before
  finalizing wording here. Strongest candidates: 5:20's "the LORD has
  broken through my enemies before me like a breaking flood" (the naming
  line) and 5:24's "sound of marching in the tops of the balsam trees" (the
  sign line) — likely the two most quote-worthy lines in the whole
  milestone; if the budget is tight by this point, this scene should get
  priority on 5:24 specifically, since no caption substitute captures the
  sensory-sign detail as well as the text's own phrasing.

## Placeholder policy

- **Allowed placeholders:** valley terrain/vegetation exact form; balsam-tree
  species-level visual choice (kept generic per the translation-uncertainty
  note); Philistine and Israelite force exact counts and positions; the
  idols' exact physical form (kept generic, undetailed); lighting/
  environmental-cue staging for the sign beat.
- **Not allowed:** a named individual Philistine commander or any single
  Philistine-side duel; a visible divine figure or theophany for the
  balsam-canopy sign (sound only); presenting the Chronicles-sourced
  idol-burning as if 2 Samuel itself states it; any Gilboa-scale (~300+
  figure) combat intensity — this is a smaller campaign by explicit design;
  detailed cultic iconography for the idols; any 2 Samuel 6+ content,
  depicted or foreshadowed, in the closing card or anywhere else in the
  scene.
