# Scene brief — All Israel anoints David at Hebron (`hebron-all-israel`, M6)

**PROVISIONAL — Sonnet scope pass under the `docs/model-handoff.md` Fable-unavailable
fallback (2026-08-13; Fable hit its monthly spend limit mid-attempt on this exact
task — see `docs/fable-review-queue.md`). Needs a real Fable confirmation before
any scene built from this brief can leave `in-progress`, per the M4 precedent
(queue #18).** Implementation: Sonnet/`threejs-engineer` within this direction;
deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First of two scenes proposed for Milestone 6.

Scope guard: this brief covers **2 Samuel 5:1–5 only**. Nothing from 5:6 onward
(the capture of Jerusalem, Hiram's alliance, the family list, the Philistine
battles) appears here — that is `jerusalem-stronghold`'s scope. Nothing from
2 Samuel 6 onward (the ark's move to Jerusalem) may appear, depicted or
foreshadowed. The scene ends where the text's unit ends: David made king over
Israel by covenant, at Hebron.

## Historical intent

1. **This is the direct sequel/contrast to `hebron-anointing` (M2/M4's opening
   scene), and the text frames it that way.** 5:1–2 has "all the tribes of
   Israel" come to David at Hebron and explicitly invoke his prior military
   leadership under Saul and the LORD's own word ("you shall be shepherd of my
   people Israel"). Where `hebron-anointing` anointed David over Judah alone
   (2:4, with the qualifier "house of Judah only" carried in every relevant
   caption per that scene's brief), this scene closes the gap the whole of
   M3–M5 was built on: Abner's death, Ish-bosheth's death, and now no rival
   remains. Captions should cross-reference `hebron-anointing`'s claims rather
   than restate them, the same way M5's scenes cross-referenced M4's.
2. **A covenant, not just an acclamation.** 5:3 states David made a covenant
   with the elders of Israel at Hebron before the LORD, and they anointed him
   — the same two-step form (covenant then anointing) worth staging distinctly
   rather than compressing into one gesture.
3. **The text itself supplies a reign-length summary (5:4–5) — a natural
   closing card**, not something to visualize: seven years six months at
   Hebron over Judah, thirty-three years at Jerusalem over all Israel and
   Judah. This is the textual hinge to the whole rest of the milestone (the
   observer should understand Hebron's chapter as king's-seat is ending here).

## Resolved design calls (this pass — PROVISIONAL, flag for Fable confirmation)

- **Reuse `hebron-anointing`'s Hebron terrain/town/gate-plaza constants
  directly**, per the hard continuity rule already established for every M3–M5
  Hebron scene. No new ground.
- **"All the tribes of Israel" (5:1) is staged as a larger, visibly broader
  representative assembly than `hebron-anointing`'s Judah-only crowd** —
  not a literal twelve-tribe headcount (no source supports a real census-scale
  gathering, and inventing one would misrepresent the text's own summary
  language as a demographic fact). Follow the `men-of-judah` convention
  exactly: a new collective, unnamed character (`elders-of-israel` or similar,
  implementer's call at build time), no invented named elders, framed as a
  representative civic/tribal assembly. The qualifier that this now includes
  the northern tribes (contrast with M4's Judah-only anointing) belongs in
  every relevant caption, mirroring how the "house of Judah only" qualifier
  was carried before.
- **The covenant and the anointing are staged as two distinct beats**, not
  compressed — 5:3's own two verbs ("made a covenant... and they anointed").
- **The reign-length summary (5:4–5) is a closing card only** — no timeskip
  visualization, no aging of David's figure. States the numbers as the text
  states them.
- **No Jerusalem content of any kind** — not even a establishing shot, a
  distant silhouette, or a caption tease. The city has not yet been taken in
  the text's own sequence; that belongs entirely to the next scene.

## Visual composition

- **Terrain/town:** `hebron-anointing`'s palette/massing, unchanged.
- **Focal masses:** (a) the approach ground where tribal representatives
  arrive — reuse the gate-plaza continuity already established across four
  prior Hebron scenes; (b) David's receiving ground for the covenant; (c) the
  anointing itself, distinct beat/staging from the covenant.
- **Sightlines:** wider and more populous framing than `hebron-anointing`'s
  crowd, to carry the "all Israel" contrast honestly without overclaiming a
  specific number.
- **Lighting:** no text-fixed time cue in 5:1–5; a straightforward daytime
  treatment is the defensible default (disclosed as a design choice, not
  asserted as text) — no need to invent drama the text doesn't supply.

## Scale assumptions

- **Principals:** David; the "elders of Israel" collective character
  (unnamed, no invented named individuals — same discipline as
  `men-of-judah`).
- **Assembly: larger than `hebron-anointing`'s ≈150–200-figure Judah crowd,
  but still a disclosed design count, not a demographic claim** —
  recommend a modest multiple (e.g. ≈200–300 high-tier) with an explicit
  `claim-all-israel-cast-scale` (design-placeholder) stating plainly this is
  not a census. Static/baked crowd, same performance discipline as
  `hebron-anointing`'s assembly (fully static InstancedMesh, zero per-frame
  cost) — this is the milestone's cheapest scene to render regardless of cast
  size, since nothing here is animated combat or procession choreography.

## Camera / observer experience

- **Default viewpoint:** the covenant/receiving ground, continuity with prior
  Hebron scenes' plaza framing.
- Additional viewpoints: the approach ground (arrival of tribal
  representatives); the anointing ground (may be the same physical space,
  distinct camera framing).
- **Timeline beats** (`depictsDeath: false`; suggested duration ~60–80s, the
  shortest M6 scene — no violence, no crowd choreography beyond static
  assembly):

  | Beat          | Text  | Content                                                                                                        |
  | ------------- | ----- | -------------------------------------------------------------------------------------------------------------- |
  | `b-arrival`   | 5:1   | Tribal representatives arrive at Hebron; their own words to David (shepherd/commander framing).                |
  | `b-covenant`  | 5:3a  | David makes a covenant with the elders of Israel before the LORD — distinct staged beat.                       |
  | `b-anointing` | 5:3b  | The anointing itself — cross-reference `hebron-anointing`'s equivalent beat, don't restage its own claim text. |
  | `b-close`     | 5:4–5 | Closing card: the reign-length summary, stated as the text states it. No 2 Sam 5:6+ pointer.                   |

## Performance target

- Cheapest scene of the milestone by construction — one large but fully
  static assembly InstancedMesh, reused gate-plaza/terrain geometry, no
  combat, no fire, no new lights. No `performance-reviewer` risk expected;
  confirm at build time regardless per project convention.

## Required source basis (before geometry is built) — flagged gaps for a researcher pass

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`,
  `claim-david-historical`; cross-reference `hebron-anointing`'s
  `claim-judah-anointing` rather than duplicate its text.
- **New, narrated (basis `biblical-text`):** `claim-all-israel-covenant`
  (5:1–3 — the tribal approach, the covenant, the anointing, all as the text
  states them).
- **New, design (basis `design-placeholder`):** `claim-all-israel-cast-scale`
  (disclosed assembly-size design count, explicitly not a census figure — see
  the M2 `claim-battle-scale` precedent for how to disclose a speculative
  scale assumption honestly).
- **FLAGGED FOR RESEARCHER PASS (not yet checked, this is a provisional
  Sonnet-authored brief with no source-verification tools used):** whether any
  named scholarly treatment discusses the historicity/scale of an "all
  Israel" covenant assembly at this specific narrative moment (comparable to
  how `claim-battle-scale`'s demographic chain cites Finkelstein & Silberman's
  regional population figures) — if nothing lands, the design-placeholder
  disclosure stands as-is, same as several other M1–M5 cast-scale claims.

## Placeholder policy

- **Allowed placeholders:** assembly size/composition (disclosed,
  non-census); covenant/anointing staging detail beyond the text's bare verbs;
  lighting.
- **Not allowed:** any invented named northern-tribe elders; any Jerusalem
  content in any form; asserting a specific tribal headcount as fact; any
  content past 5:5 beyond the bare reign-length numbers the text itself
  states.
