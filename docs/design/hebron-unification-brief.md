# Scene brief — All Israel anoints David at Hebron (`hebron-unification`, M6)

**PROVISIONAL — Sonnet-fallback scope pass, 2026-08-22.** Fable's monthly spend
limit was hit on the first call this session (same recurring constraint as
2026-07-22/2026-08-10); this brief was written under `docs/model-handoff.md`'s
documented fallback policy, not by a Fable world-director pass. Logged as
`docs/fable-review-queue.md` #21 — needs a real Fable confirmation before any
scene built from it goes past `in-progress`, mirroring queue #18's M4
precedent exactly. Implementation: Sonnet/`threejs-engineer` may build from
this brief now (per the #18 precedent, provisional scope does not block
build work), but the whole M6 scope package needs Fable sign-off before
`released`.

Scope guard: this brief covers **2 Samuel 5:1–5** only. Everything from 5:6
onward (the Jebusite stronghold, City of David, Hiram, the Rephaim battles)
belongs to `jerusalem-city-of-david` and `rephaim-valley`, separate briefs.
First scene of Milestone 6, built first per the established
cheapest-scene-first build order.

## Historical intent

The observer should come away understanding two things:

1. **This is the formal, public completion of what `hebron-covenant` and
   `hebron-gate` set in motion.** All the tribes of Israel — not just Judah —
   come to David at Hebron (the same town, the same gate plaza the observer
   has already walked in `hebron-anointing`/`hebron-covenant`/`hebron-gate`)
   and state their case in three parts (5:1–2): kinship ("we are your bone
   and flesh"), military precedent (David already led Israel's armies under
   Saul), and prophetic mandate ("the LORD said to you, 'You shall be
   shepherd of my people Israel'"). This is the text's own summation of why
   David's kingship is legitimate, spoken by the north itself — stage it as
   direct, plain address, not pageantry.
2. **The covenant (5:3) is the formal instrument; the anointing (5:3) is the
   third time David is anointed in the text (1 Sam 16 privately, 2 Sam 2
   over Judah, this one over all Israel) — the text itself tracks a
   progression, and this scene is its capstone.** 5:4–5's regnal summary
   (thirty years old, seven years six months at Hebron, thirty-three years
   at Jerusalem) is the text's own bridge to the next scene — stage it as a
   closing card that points forward to Jerusalem, not as spoken dialogue.

## Resolved design calls (this pass — provisional, see queue #21)

- **Reuse `hebron-anointing`'s and `hebron-covenant`'s Hebron massing,
  palette, and gate plaza directly.** This is the same place; the third or
  fourth time the observer has seen it (per the `hebron-anointing` →
  `hebron-covenant` → `hebron-gate` → `hebron-reckoning` continuity chain).
  Do not re-invent Hebron. No new terrain work.
- **"All the elders of Israel" (5:3) render as a delegation, not a mass
  crowd.** The text names elders specifically, distinct from
  `hebron-anointing`'s "all the men of Judah" civic assembly (which was a
  populace scene) and from `hebron-covenant`'s twenty-man escort (a named,
  literal count). Here the count is unstated — stage a delegation scaled
  larger than Abner's twenty (representing all twelve tribes, not one
  emissary) but smaller than a full civic assembly (elders, not the whole
  populace) — a disclosed design choice, own claim, not reused from either
  precedent's counts.
- **The covenant ceremony itself (5:3a, "David made a covenant with them...
  before the LORD") stays undetailed.** The text does not describe a rite;
  do not invent oath gestures, physical tokens, or liturgical staging beyond
  what `claim-anointing-rite-form`'s existing `design-placeholder` already
  covers for anointing specifically (reuse that claim; the covenant-making
  itself gets its own thin `design-placeholder` claim if the implementer
  finds no citable ANE covenant-ratification gesture worth adding —
  check `king-stager-2001` first, same as the M5 feast-form upgrade path).
- **5:4–5's regnal summary is a caption card, not staged action.** No
  timelapse, no aging effects on David's model — the project has not
  attempted visual aging anywhere and shouldn't start here for a two-verse
  chronological aside.
- **No Jerusalem content of any kind.** This scene ends at Hebron; the move
  north is `jerusalem-city-of-david`'s opening, not this scene's closing
  vista. Do not stage a "looking toward Jerusalem" shot — David does not yet
  possess it.

## Visual composition

- **Terrain:** reuse the Judean-highland `TerrainSpec` and Hebron town/gate
  massing from `hebron-anointing`/`hebron-covenant` unchanged.
- **Focal masses:** (a) the gate plaza, now hosting a formal
  delegation-and-covenant scene rather than a feast or a killing — the
  fourth distinct use of the same space, worth letting the observer notice
  the contrast; (b) the assembled Israelite elders' delegation, distinct in
  dress/grouping from `hebron-anointing`'s Judah-only assembly (undyed vs.
  regional variation is already established project convention — reuse
  `claim-dress`, no new textile claim needed since tribal-dress
  differentiation this early is itself contested and out of scope).
- **Sightlines:** default vantage centers the gate plaza with the elders'
  delegation and David facing each other — a negotiation-concluded framing,
  calmer and more formal than `hebron-covenant`'s feast, more public than
  `hebron-gate`'s procession.
- **Lighting:** daytime, disclosed `design-placeholder` hour, matching
  precedent.

## Scale assumptions

- **Elders' delegation: disclosed design count ≈ 30–50** — "all the elders
  of Israel" (5:3) is a stated but unquantified group; scaled to read as
  representative-of-all-tribes without becoming a full civic crowd. Own
  claim, `claim-unification-cast-scale`, parallel in form to
  `claim-covenant-cast-scale`/`claim-judah-assembly-scale`.
- **David's household/escort: reuse `hebron-covenant`'s existing figures**,
  no new count needed — the scene is short and shares Hebron's standing
  cast.
- **High-tier total ≈ 50–70 figures** — smallest or near-smallest M6 scene by
  design, matching the project's cheapest-scene-first build-order
  convention.

## Camera / observer experience

- **Default viewpoint** (`vp-gate-plaza`, reused id from prior Hebron
  scenes if the engine convention allows scene-local reuse of viewpoint
  framing, otherwise a new `vp-unification-plaza` at the same physical
  vantage): the delegation-and-covenant framing.
- Additional viewpoint: **the anointing moment itself** (`vp-anointing`,
  close, inspect emphasis) — the third-anointing capstone beat.
- **Timeline beats** (`depictsDeath: false`; suggested duration ~100–120s,
  the shortest M6 scene):

  | Beat           | Text  | Treatment                                                                                                                                                     |
  | -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-delegation` | 5:1–2 | Staged: the elders' delegation arrives and states its case (kinship, precedent, mandate). Default viewpoint.                                                  |
  | `b-covenant`   | 5:3a  | Staged: the covenant made "before the LORD" — undetailed rite, per Resolved design calls.                                                                     |
  | `b-anointing`  | 5:3b  | Staged: David anointed king over Israel. `vp-anointing`.                                                                                                      |
  | `b-close`      | 5:4–5 | Closing card: the regnal summary, forward pointer to `jerusalem-city-of-david` only (in-milestone pointer). **No Jerusalem geometry, no 2 Sam 5:6+ content.** |

## Performance target

- ≈ 50–70 high-tier figures, static/idle pose buckets, single `InstancedMesh`
  per repeated family. Cheapest or near-cheapest M6 scene. No new terrain,
  no new major asset families beyond the delegation figures themselves
  (reuse existing character geometry/dress).
- `performance-reviewer` pass optional given the low figure count and full
  asset reuse — same "not a gate" call as `hebron-reckoning`'s.

## Required source basis (before geometry is built)

Implementer creates these records at build time; `SceneDef` arrays stay
empty in `scenes.ts` until they exist.

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`
  (stays `design-placeholder`), `claim-dress`, `claim-david-historical`,
  `claim-judah-anointing` (the scene's direct predecessor — cross-reference
  as the covenant this scene completes), `claim-anointing-rite-form` (stays
  `design-placeholder`). `hebron` location's `sceneIds` gains this scene.
- **New, narrated (basis `biblical-text`):** `claim-israel-covenant` (5:1–3,
  the delegation's three-part case and the covenant); `claim-third-anointing`
  (5:3b–5, the anointing and regnal summary; notes should track this as the
  text's third and final anointing of David, cross-referencing 1 Sam 16 and
  `claim-judah-anointing`).
- **New, design (basis `design-placeholder`):** `claim-unification-cast-scale`
  (the disclosed delegation count); a covenant-ratification-gesture claim
  only if the implementer invents any specific physical gesture beyond
  standing/speaking — check `king-stager-2001` for a citable ANE covenant
  gesture before inventing one; if none is found, state plainly in the
  covenant claim's notes that no gesture is staged.
- **Characters:** reuse `david`, `davids-band`. New light entry:
  `elders-of-israel` (group character, no invented named individuals — same
  discipline as `men-of-judah`).
- **ESV excerpt budget:** `2sam-5` is a fresh passage shared across all
  three M6 scenes — budget its ≤3-quote allowance across all three at build
  time (this scene's strongest candidate is 5:2's "you shall be shepherd of
  my people Israel," the prophetic-mandate line; use at most one quote here
  and leave the rest for `jerusalem-city-of-david`, which needs it more for
  the "you shall not come in here" taunt and the naming of the City of
  David).

## Placeholder policy

- **Allowed placeholders:** covenant-gesture staging (or its explicit
  absence); elders' delegation exact count and positions; lighting hour.
- **Not allowed:** any Jerusalem geometry or "looking toward Jerusalem"
  framing; any Rephaim/Philistine content; invented named elders; divergence
  from established Hebron massing/palette; any visual aging of David's
  model to represent 5:4–5's chronological summary.
