# Scene brief — Ish-bosheth's death and David's judgment at Hebron (`hebron-reckoning`, M5)

World-director pass, Fable, 2026-08-03. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Third and last scene of Milestone 5.

Scope guard: this brief covers **2 Samuel 4 in full**. The murder of Ish-bosheth
(4:5–7) happens at his house — implicitly at Mahanaim, a disputed site the
project deliberately never builds (standing rule since `gibeon-pool`): it is
**narrated by card, never staged**. Staged action is confined to Hebron:
the assassins' arrival with their trophy (4:8), David's reply (4:9–11), the
execution and its aftermath (4:12). **Nothing from 2 Samuel 5 onward may appear,
depicted or textually foreshadowed** — no all-Israel anointing, no Jerusalem, no
closing tease that "the way is now clear." The milestone ends where the chapter
ends: at a tomb in Hebron. The closing card states only what 4:12 states.

## Historical intent

The observer should come away understanding four things:

1. **This scene is `ziklag-lament`'s deliberate twin — and the text says so.**
   4:10 has David himself retell the Ziklag episode: "when one told me, 'Behold,
   Saul is dead,' and thought he was bringing good news, I seized him and killed
   him at Ziklag." Two men arrive claiming credit for a rival's death and
   expecting reward; David executes them, exactly as he executed the Amalekite —
   but this time the killing they report is _real and theirs_, which David's own
   words treat as far worse ("wicked men have killed a righteous man in his own
   house on his bed," 4:11). Captions and the inspector should cross-link the
   two scenes explicitly; the parallel is the text's own structure, not the
   project's editorializing.
2. **The house of Saul ends in murder, not battle — and David disavows it
   again.** The chapter opens with Ish-bosheth's courage failing at the news of
   Abner's death (4:1) and closes with his head buried in Abner's tomb (4:12).
   Together with `hebron-gate`, this is the milestone's repeated pattern: every
   death that clears David's path is one David publicly condemns and punishes.
   Whether that insistence is accurate report or apologetic shaping is the same
   scholarly dispute already carried on `hebron-gate`'s `claim-public-response`
   — cross-reference it; do not restate a second, divergent version.
3. **The victims of this chapter get the text's own dignity markers.**
   Ish-bosheth is killed defenseless at noon rest; David calls him "a righteous
   man." The parenthesis on Mephibosheth (4:4) — a lame five-year-old, the last
   of the line — is the text's own aside on what remains of Saul's house; carry
   it as a card exactly where the text places it, with no forward pointer to
   2 Samuel 9.
4. **Justice here is swift, harsh, and period-real — rendered under ADR-009's
   full restraint.** The execution of Rechab and Baanah, the cutting off of
   hands and feet, and the display beside the pool of Hebron are narrated
   facts; the beheading of Ish-bosheth and the carrying of his head are
   narrated facts. ADR-009's absolute bar (no dismemberment geometry, ever, in
   any mode) governs all of it: the facts are carried fully in captions, the
   geometry never shows severed anatomy (see Resolved design calls).

## Resolved design calls (this pass)

- **The murder is cards-only.** 4:5–7 (the noon entry, the murder in bed, the
  beheading, the night flight down the Arabah) renders no geometry: Mahanaim
  is disputed/unbuilt, and the project does not stage events at sites it
  cannot honestly place. The cards must also carry the **4:6 text-critical
  divergence honestly**: the Masoretic text and the Septuagint tell the entry
  differently (MT: the assassins come in as if fetching wheat; LXX: a
  doorkeeper had been cleaning wheat and drowsed). This is a genuine textual
  dispute, not a harmonization problem — surface it as `scholarlyViews` on
  the assassination claim (**requires extending `mccarter-1984-ii-samuel`'s
  coverage to 2 Samuel 4** via a researcher pass for named attribution; hedge
  until then).
- **The head is never rendered as anatomy.** When the assassins present "the
  head of Ish-bosheth" (4:8), render a small covered/wrapped bundle (the
  `buildWrappedFormGeometry` small-scale treatment already used for the
  Jabesh bone bundle) — identifiable by caption, never by geometry. Same at
  the burial beat.
- **The execution follows the ADR-009 named-killing template** (third
  application, first as a judicial act): documentary distance; no wound/blood
  geometry in any mode; the strike itself elided or silhouette-distant even
  in standard mode (the text gives no method detail to show as gesture — so
  none is invented); reduced mode cuts from the command to the aftermath
  card. The reaction beat is David's spoken verdict itself, already delivered.
- **The hands-and-feet display is caption-only, absolutely.** ADR-009's
  dismemberment bar is unconditional. No severed-anatomy geometry, no shrouded
  shapes hanging by the pool standing in for it, in any mode — unlike
  Beth-shan's whole-body wrapped display forms, there is no honest
  non-anatomical way to render this display, so it is not rendered at all.
  The caption states plainly what 4:12 states. The pool renders; the display
  does not.
- **The pool of Hebron is a modest basin, placeholder form.** 4:12 names it
  as a known landmark; nothing about its form survives usably. Reuse the
  `gibeon-pool` conventions exactly: shallow basin depression + flat
  unlit/minimally-lit water plane, no water shader, disclosed dimensional
  placeholder. Do **not** adopt the extant Birket es-Sultan pool in modern
  Hebron as site or form — it is much later and adopting it would be an
  anachronism dressed as corroboration. If a researcher pass finds a serious
  treatment of Iron Age water installations at Hebron, the claim can cite it;
  until then `design-placeholder`.
- **The burial closes the loop in Abner's tomb.** 4:12b buries Ish-bosheth's
  head "in the tomb of Abner at Hebron" — the same tomb `hebron-gate` built.
  Reuse that scene's tomb placement/form constants; the compositional echo
  (two burials, same ground, days apart) is the milestone's closing image.
- **Conversation-scale cast.** This is a judgment scene, not a crowd event —
  the `ziklag-lament` small-cast convention applies (its structural twin).

## Visual composition

- **Terrain/town:** same Hebron continuity rule as the other two M5 scenes —
  reuse `hebron-anointing`'s palette and massing; the pool basin (near the
  town, placeholder placement) and nothing else is new ground.
- **Focal masses:** (a) **the arrival road** — the assassins coming up from
  the Arabah direction (east/northeast) after their narrated night march;
  (b) **David's receiving ground** — courtyard/plaza space, continuity with
  the feast and disavowal beats of the sibling scenes; (c) **the pool of
  Hebron** — the judgment's aftermath site, named by the text; (d) **the
  tomb ground** — shared with `hebron-gate`.
- **Sightlines:** the presentation beat frames the assassins small before
  David — petitioners expecting reward — with the bundle carried low, not
  brandished (no trophy framing; the text's own tone is revulsion). The
  execution at documentary distance near the pool; the burial vantage
  repeats `hebron-gate`'s tomb framing deliberately.
- **Lighting:** the text fixes the murder at midday rest (narrated, card
  only) and the march overnight; the Hebron arrival plays naturally as early
  morning — a defensible inference from "all night" (4:7), disclosed as a
  design choice in notes rather than asserted as text.

## Scale assumptions

- **Principals:** David, Rechab, Baanah. `ish-bosheth` is referenced (his
  death narrated, his head a covered bundle) — never staged as a figure in
  this scene. Mephibosheth card-only.
- **David's attendants/guard: disclosed design count ≈ 8–14.** The execution
  is attributed to "the young men" at David's command (4:12) — a small
  detail worth keeping: David commands, attendants act.
- **Ambient town: ≈ 10–20**, static.
- **High-tier total ≈ 20–35 figures** — the smallest M5 scene;
  conversation-scale per `ziklag-lament` precedent, no crowd claims needed
  beyond a light `claim-reckoning-cast-scale` disclosure.

## Camera / observer experience

- **Default viewpoint** (`vp-receiving-ground`): David's courtyard/plaza
  ground where the presentation and verdict play.
- Additional viewpoints: **the arrival road** (`vp-arabah-road`, the
  assassins' approach); **the pool** (`vp-hebron-pool`, execution aftermath
  at distance + the caption-carried display); **the tomb** (`vp-tomb-close`,
  the burial and the milestone's final frame).
- **Timeline beats** (`depictsDeath: true`; suggested duration ~140s):

  | Beat              | Text   | Standard                                                                                                                                                                                                   | Reduced                                                                                         |
  | ----------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
  | `b-courage-fails` | 4:1–3  | Opening card: the news of Abner's death reaches Ish-bosheth; his courage fails, Israel is dismayed; Rechab and Baanah introduced (captains, Beerothites). No geometry.                                     | identical                                                                                       |
  | `b-mephibosheth`  | 4:4    | Card: the text's own parenthesis — Jonathan's son, lame from the flight at the Jezreel news, five years old. No staging, no forward pointer.                                                               | identical                                                                                       |
  | `b-murder-card`   | 4:5–7  | Cards only: the noon rest, the entry (**4:6 MT/LXX divergence surfaced**), the murder in bed, the beheading, the night flight by the Arabah. No Mahanaim geometry; no murder staging; no anatomy.          | identical                                                                                       |
  | `b-arrival`       | 4:8a   | Staged: the two arrive up the Arabah road at first light, carrying a small covered bundle, low. No trophy framing.                                                                                         | identical                                                                                       |
  | `b-presentation`  | 4:8b   | The presentation and their claim ("the LORD has avenged my lord the king...") — carried as their words, petitioners before David.                                                                          | identical                                                                                       |
  | `b-verdict`       | 4:9–11 | David's reply: the Ziklag retelling (cross-link `ziklag-lament`), the "righteous man... in his own house on his bed" verdict. Dialogue beat; ESV excerpt spend here.                                       | identical                                                                                       |
  | `b-execution`     | 4:12a  | At David's command, the young men execute the two — documentary distance near the pool, strike elided/silhouette-distant, no method invented. Caption carries the hands-and-feet display **as text only**. | Cut from the command to the aftermath card; caption states the execution and the display facts. |
  | `b-burial`        | 4:12b  | The covered bundle buried in the tomb of Abner at Hebron — the same tomb, the same framing as `hebron-gate`'s burial. The milestone's final image.                                                         | identical                                                                                       |
  | `b-close`         | —      | Closing card: states only what the chapter states — the house of Saul's last king is dead and buried at Hebron. **No 2 Samuel 5+ pointer of any kind.**                                                    | identical                                                                                       |

## Performance target

- ≈ 20–35 high-tier figures — trivially cheap next to its siblings. One
  `InstancedMesh` per family; the pool basin/water plane reuses the
  `gibeon-pool` approach (no shader), the tomb and town reuse `hebron-gate`/
  `hebron-anointing` assets, the covered bundle reuses `wrappedForm.ts`.
- No new lights, no fire. A single `performance-reviewer` pass at the end of
  the milestone (this scene will not be the risk; the `hebron-gate`
  procession is).

## Required source basis (before geometry is built)

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`,
  `claim-dress`, `claim-david-historical`; cross-reference
  `claim-execution-messenger` (`ziklag-lament`) from the verdict claim's notes
  (the text's own 4:10 parallel), and `hebron-gate`'s `claim-public-response`
  for the apologia dispute (reference, don't duplicate).
- **New, narrated (basis `biblical-text`):** `claim-ish-bosheth-assassination`
  (4:1–8 — courage fails, the captains, the murder, the flight, the
  presentation; notes: Mahanaim narrated-only per the standing rule;
  `scholarlyViews` on the 4:6 MT/LXX entry divergence, hedged until the
  McCarter extension lands; the Mephibosheth parenthesis carried here or as
  its own light claim, implementer's call); `claim-david-judgment` (4:9–12 —
  the Ziklag retelling, the verdict, the execution, the display _as narrated
  text_, and the burial in Abner's tomb; notes state explicitly that the
  display is caption-only under ADR-009's dismemberment bar and that the head
  renders only as a covered bundle).
- **New, design (basis `design-placeholder`):** `claim-hebron-pool-feature`
  (4:12 names the pool — `biblical-text` high for its existence as a
  landmark; form/placement `design-placeholder`, Birket es-Sultan explicitly
  not adopted, no water shader — model the claim structure on
  `claim-gibeon-pool-form`/`claim-gibeon-terrain-form`);
  `claim-reckoning-cast-scale` (disclosed small-cast counts above).
- **Characters:** reuse `david`, `ish-bosheth` (referenced-only, as always).
  New: `rechab` and `baanah` (persons, staged); `mephibosheth` (light,
  referenced-only — summary confined to what 2 Sam 4:4 says).
- **ESV excerpt budget (`2sam-4`, fresh passage):** recommend 4:11a ("How
  much more, when wicked men have killed a righteous man in his own house on
  his bed...") as the primary spend; optionally the 4:10 Ziklag retelling
  fragment if budget allows. Live-source wording check at build time (#19b
  lesson).

## Placeholder policy

- **Allowed placeholders:** pool basin form/placement (disclosed); receiving-
  ground staging; arrival-road course; attendant count/positions; the
  morning-arrival lighting inference (disclosed as design choice).
- **Not allowed:** any Mahanaim geometry or murder staging; any severed-
  anatomy geometry in any mode — the head renders only as a covered bundle,
  the hands-and-feet display renders not at all (caption only); trophy or
  brandishing framing of the bundle; invented execution method detail;
  close-up framing on the execution; adopting Birket es-Sultan; a water
  shader; staging Ish-bosheth or Mephibosheth as figures; villain-cartooning
  Rechab and Baanah beyond what the text states (their words and acts are
  damning enough as narrated); any second, divergent statement of the
  apologia dispute (cross-reference `hebron-gate`'s claim instead); any
  2 Samuel 5+ content, depicted, foreshadowed, or teased in the closing card
  — the milestone ends at the tomb.
