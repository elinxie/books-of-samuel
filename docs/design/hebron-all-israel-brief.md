# Scene brief — the third anointing at Hebron (`hebron-all-israel`, M6)

**Scope pass: Sonnet, 2026-08-22 — PROVISIONAL, not yet Fable-reviewed.** The
scheduled Fable world-director pass for M6 failed on "You've hit your monthly
spend limit" before making any scope decision (docs/model-handoff.md's
fallback policy applies: implement the most defensible option, mark
provisional, keep moving). This brief and its scope call need a real Fable
pass before `hebron-all-israel` goes past `in-progress` — see
`docs/fable-review-queue.md` #21. First of M6's three scenes.

Scope guard: this brief covers **2 Samuel 5:1–5 only**. Nothing from 5:6
onward (Jerusalem, the Jebusite conquest, Hiram, the battles) may appear,
depicted or foreshadowed. The scene closes with the regnal summary (5:4–5,
Hebron 7½ years / total 40 years) as a card — no forward pointer beyond
stating the reign continues.

## Historical intent

The observer should come away understanding:

1. **This is the third and last anointing, and the text marks it as such.**
   David was anointed privately by Samuel (1 Sam 16, not built), publicly over
   Judah alone at Hebron (2 Sam 2:1–7, `hebron-anointing`), and now publicly
   over all Israel, still at Hebron (5:1–3). The elders' own words carry the
   theological throughline: "the LORD said to you, 'You shall be shepherd of
   my people Israel'" (5:2) — a direct citation of Samuel's earlier oracle,
   worth surfacing in caption/inspector as a deliberate textual echo, not
   invented framing.
2. **A covenant, not a coronation pageant.** 5:3 states plainly: "the elders
   of Israel came to the king at Hebron, and King David made a covenant with
   them at Hebron before the LORD, and they anointed David king over Israel."
   No triumphal-entry imagery, no crowd spectacle beyond what a delegation of
   elders implies — this mirrors `hebron-covenant`'s (M5) restrained register,
   not `gilboa-battle`'s scale.
3. **This closes the Hebron era.** The regnal summary (5:4–5) is the text's
   own bridge to Jerusalem — reuse it as the closing card, stated plainly, no
   editorializing about what comes next beyond the bare fact that the capital
   moves.

## Resolved design calls (this pass, provisional)

- **Delegation scale stays small and undramatized**, matching
  `hebron-covenant`'s convention for "the elders of Israel" (a bounded named
  group, not a mass assembly like `hebron-anointing`'s Judah crowd — the text
  names elders, a leadership body, not "all the people").
- **The covenant ceremony itself is not over-specified.** No source in this
  project's bibliography describes a 10th-century-BCE Israelite covenant-
  ratification rite in enough material detail to stage convincingly; treat any
  gesture (hand-clasp, oath posture) as `design-placeholder`, same restraint
  as `claim-anointing-rite-form` (M4) and `claim-feast-form` (M5).
- **Reuse Hebron continuity completely** — same terrain/town-form/palette
  constants as `hebron-anointing`/`hebron-covenant`/`hebron-gate`/
  `hebron-reckoning`; this is the fifth and last scene to draw on that
  continuity before the milestone moves to Jerusalem. No new Hebron ground.
- **`depictsDeath: false`** — no killing in this scene.

## Visual composition

- **Terrain/town:** identical Hebron reuse as all four prior Hebron scenes.
- **Focal mass:** the gate-plaza ground already established (same location as
  `hebron-covenant`'s feast and `hebron-gate`'s recall) — continuity of place
  reinforces that this is the same city closing out its role.
- **Sightlines:** the elders arriving as a small, dignified delegation; David
  and the covenant-making at plaza center; no crowd framing.
- **Lighting:** no textual time-of-day marker; default to the same daylight
  convention as the sibling Hebron scenes, disclosed as a design choice.

## Scale assumptions

- **Principals:** David; a small named-by-role delegation ("elders of
  Israel," disclosed count).
- **Elders/delegation: ≈ 12–24**, matching the scale of a leadership
  delegation, not a tribal-assembly crowd (contrast `hebron-anointing`'s
  ~150–200-figure Judah assembly, which staged "all the house of Judah," a
  materially different textual claim from "the elders of Israel").
- **Ambient town: ≈ 10–20**, static, reused Hebron dressing.
- **High-tier total ≈ 25–45 figures** — smallest or near-smallest M6 scene,
  conversation/covenant-scale.

## Camera / observer experience

- **Default viewpoint** (`vp-covenant-plaza`): the same gate-plaza ground as
  the sibling scenes.
- Additional viewpoint: **the elders' approach** (`vp-elders-approach`), a
  short arrival vantage.
- **Timeline beats** (`depictsDeath: false`; suggested duration ~60–80s):

  | Beat              | Text  | Content                                                                                                                                             |
  | ----------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-elders-arrive` | 5:1   | The elders/tribes of Israel arrive, stating their kinship claim ("we are your bone and flesh").                                                     |
  | `b-shepherd-word` | 5:2   | The elders cite the LORD's word to David — the direct echo of the earlier private oracle.                                                           |
  | `b-covenant`      | 5:3a  | David makes a covenant with them at Hebron before the LORD — the ceremony itself, undramatized.                                                     |
  | `b-anointing`     | 5:3b  | The third anointing.                                                                                                                                |
  | `b-close`         | 5:4–5 | Closing regnal-summary card (age 30 at accession; 40-year reign, 7½ Hebron / 33 Jerusalem). No 5:6+ pointer beyond the bare fact the capital moves. |

## Performance target

- ≈ 25–45 high-tier figures — cheap. One `InstancedMesh` for the delegation,
  full reuse of existing Hebron terrain/town assets. No new lights, no new
  structures. Not expected to need a dedicated `performance-reviewer` pass.

## Required source basis (before geometry is built)

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`,
  `claim-david-historical`, `claim-judah-anointing` (cross-reference as the
  first anointing in the same sequence).
- **New, narrated (basis `biblical-text`):** `claim-all-israel-anointing`
  (5:1–5 in full — the kinship claim, the shepherd-word citation, the
  covenant, the third anointing, the regnal summary); notes should state
  explicitly this is the third of three anointings and cross-link
  `claim-judah-anointing`.
- **New, design (basis `design-placeholder`):** `claim-covenant-rite-form-2`
  or fold into a note on `claim-all-israel-anointing` — the ceremony gesture
  itself has no citable material-culture source; consider whether this can
  simply cross-reference `claim-anointing-rite-form`'s existing
  design-placeholder disclosure rather than duplicating a claim.
- **Characters:** reuse `david`. New: `elders-of-israel` (group, named-by-role
  per the text, not individually invented — same discipline as
  `men-of-judah`).
- **ESV excerpt budget (`2sam-5`, fresh passage — shared across all three M6
  scenes, budget across all three, not per-scene):** recommend 5:2b ("the
  LORD said to you, 'You shall be shepherd of my people Israel...'") as this
  scene's primary spend, since it is the textual echo the historical intent
  rests on. Live-source wording check at build time (standing #19b lesson).

## Placeholder policy

- **Allowed placeholders:** covenant-gesture form (disclosed); delegation
  count/positions.
- **Not allowed:** any crowd-scale staging beyond a leadership delegation
  (that would misrepresent "elders" as "all the people," a different textual
  claim already spent on `hebron-anointing`); any Jerusalem/Jebusite/Hiram/
  battle content, depicted or foreshadowed, anywhere including the closing
  card; inventing named individual elders.
