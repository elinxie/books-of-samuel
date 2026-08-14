# Scene brief — All Israel anoints David at Hebron (`hebron-all-israel`, M6)

World-director pass, Fable, 2026-08-14. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. First scene of Milestone 6, and the milestone's
cheapest and lowest-risk build — it is deliberately first so that the Hebron
continuity pattern is re-established before the expensive new Jerusalem site is
attempted.

Scope guard: this brief covers **2 Samuel 5:1–5** — the coming of all the tribes
of Israel to Hebron, their three stated grounds for wanting David, the covenant
the elders make with him before the LORD, the anointing of David as king over
Israel, and the regnal summary. It stops at 5:5. The Jebusite stronghold, the
city of David, the Millo, Hiram of Tyre, and everything from 5:6 onward belongs
to `jerusalem-stronghold`, a separate brief. **No Jerusalem geometry of any
kind may appear in this scene** — not on the horizon, not in a sightline, not as
a distant silhouette, and not as a foreshadowing caption. The closing card may
point forward to `jerusalem-stronghold` only, as a pointer, never as a preview.

## Historical intent

The observer should come away understanding three things:

1. **The qualifier finally comes off — and the text is the one that removes
   it.** Every caption in `hebron-anointing` (M4) that touched 2 Samuel 2:4
   carried "over the house of Judah," never "king" without qualification. That
   was a hard rule for two milestones. 5:3 is where the narrative itself lifts
   it: "they anointed David king over Israel." The single most valuable thing
   this scene can do is make that continuity legible — same town, same plaza,
   same rite, a different and larger constituency, several years and one civil
   war later. An observer who has walked `hebron-anointing` should recognize
   the ground under their feet and see what has changed about who is standing
   on it.
2. **This kingship is constituted by covenant, not by conquest.** The north was
   not taken. Its own tribes come south to Hebron, and 5:3 records a covenant
   made "before the LORD" between the king and the elders before the anointing.
   The tribes state their own three grounds (5:1–2): kinship ("we are your bone
   and flesh"), David's military record under Saul ("it was you who led out and
   brought in Israel"), and a divine designation they quote as already given.
   These are presented as **the tribes' stated grounds**, in their own mouths —
   the scene's captions report what they say, and do not ratify it as the
   project's own historical or theological verdict.
3. **The political claim just got much bigger; the archaeology did not.** This
   is the narrative beginning of the united monarchy, and it is the single most
   contested thing in the historiography of the period — whether an early
   Israelite state of any real scale existed here at all
   (`claim-david-historical` already carries the dispute and must be
   cross-referenced from this scene's central claim). The composition must
   resist letting the political claim inflate the rendering: Hebron's town form
   is a disclosed, released `design-placeholder` ("a modest highland hill
   town"), and it stays exactly that. Nothing about this scene may silently
   upgrade Hebron into a royal capital because the assembly got larger.

## Resolved design calls (this pass)

- **Hard Hebron continuity rule, fourth application.** Reuse
  `hebron-anointing`'s Judean-highland `TerrainSpec` palette, town massing,
  terracing, and layout constants directly, exactly as `hebron-covenant`,
  `hebron-gate`, and `hebron-reckoning` did. Do not re-invent, re-scale, or
  "improve" the town. If any part of the town needs to change to accommodate a
  larger assembly, extend the plaza's usable ground, not the settlement.
- **The delegation arrives up the northern road** — the same approach
  `hebron-covenant` established for Abner's twenty and used twice more since.
  The echo is deliberate and load-bearing: the last northern delegation to come
  down that road came with Abner, and it ended at the gate. **Stage the echo;
  do not caption it.** No caption may draw the comparison for the observer —
  the geography does that work, and spelling it out would be the project
  editorializing where the text does not.
- **Scale is a disclosed design choice, not a ratio.** "All the tribes of
  Israel" (5:1) and "all the elders of Israel" (5:3) give no number. The
  standing convention for beats with no narrated count to ratio from is the
  `claim-judah-assembly-scale` / `jabesh-burial` pattern: render a
  representative assembly, label it as representative, assert no headcount.
- **1 Chronicles 12:23–40's tribal muster numbers are NOT imported.** The
  Chronicles parallel gives very large, itemized per-tribe figures for the
  gathering at Hebron. They are a divergent parallel account, not this
  narrative's own testimony, and using them to size the crowd would be the
  exact "narrated number" temptation the project's scale discipline exists to
  refuse. They may be mentioned once, in a claim `note`, as a divergent
  parallel — never in a caption as this scene's scale, and never as geometry.
- **The covenant rite reuses `claim-anointing-rite-form`; it does not spawn a
  second rite claim.** 5:3 narrates that a covenant was made and that David was
  anointed, and narrates neither rite's mechanics. The M4 researcher pass
  already checked `king-stager-2001` for investiture/covenant rite material and
  found no coverage (recorded on that claim) — do not re-run that check hoping
  for a different answer, and do not invent a covenant ceremony (no tablets, no
  cut animals, no sworn-oath choreography) to fill the gap. Reuse the existing
  disclosed placeholder and extend its `notes` to cover this second, larger
  application.
- **The regnal summary (5:4–5) is card-only.** Thirty years old, forty years
  reigning, seven years and six months at Hebron, thirty-three in Jerusalem.
  Carry the figures as the text gives them, with a `notes`-level observation
  that round/schematic regnal figures of this kind are widely regarded as
  formulaic and that the chapter's internal chronology is debated — stated as a
  scholarly observation, not as the project's correction of the text. No
  timeline device, no visualization, no dates asserted (the high/low chronology
  dispute, register #5, stays untouched).
- **`depictsDeath: false`.** No violence, no death, no ADR-009 advisory.

## Visual composition

- **Terrain and town:** unchanged from `hebron-anointing`. No new regional
  palette, no new landform, no new structures. This is the project's first
  scene that should introduce essentially no new geometry families at all — and
  that is the point of building it first.
- **Focal masses:** (a) **the northern road and the arriving delegation** —
  tribal elders and their retinues coming down from the north, the largest
  arriving group the site has received; (b) **the gate plaza** — the same
  ceremonial ground as the M4 anointing and the M5 feast, now holding a wider
  constituency; (c) **the covenant/anointing ground** at the plaza's center,
  the scene's ceremonial focus; (d) **the Judahite townspeople** — Hebron's own
  population present as hosts, visually continuous with `hebron-anointing`'s
  assembly but no longer the whole of it. The composition's argument is
  additive: the M4 crowd is still there, and a second, northern crowd has
  joined it.
- **Sightlines:** the default vantage should hold the northern road and the
  plaza in one frame, so the arrival reads as coming from the territory that
  was Ish-bosheth's. `hebron-anointing`'s deliberately bounded, inward-facing
  framing (no long sightline north) is the one composition rule this scene may
  and should relax — that framing was itself an argument about a partial
  kingdom, and the argument has now changed. Open the northern sightline; that
  opening is the scene's visual thesis.
- **Lighting:** daytime, hour unstated, disclosed `design-placeholder` — match
  `hebron-anointing`'s clear late-morning civic light for continuity. No dusk,
  no dramatic light, nothing triumphal.

## Scale assumptions

- **The northern delegation ("all the tribes of Israel," "all the elders of
  Israel"): disclosed representative assembly ≈ 100–130 figures**, including a
  visible elder contingent. No narrated count exists; do not invent named
  elders (the standing `men-of-judah` rule).
- **Hebron's own townspeople and David's following: ≈ 60–90 figures**, reusing
  `hebron-anointing`'s static assembly pose buckets where possible.
- **Principals:** David only. The text names no one else present. Do not stage
  Joab, Abishai, or Abiathar as principals here — the text gives them no part
  in 5:1–5, and staging them would assert a court composition the chapter does
  not supply.
- **High-tier total ≈ 170–220 figures** — comparable to `hebron-anointing`'s
  150–200 and deliberately **not an order of magnitude larger**. A bigger crowd
  would be an unsourced assertion about the scale of the polity being founded,
  which is exactly the live dispute this scene must not pre-judge. Say so in
  the cast-scale claim.
- Almost the entire cast is static or slow-moving assembly; budget like
  `hebron-anointing`'s baked pose-bucket assembly, not like a battle crowd.

## Camera / observer experience

- **Default viewpoint** (`vp-north-road`): reuse or closely mirror
  `hebron-covenant`'s northern-road vantage, framing the arrival against the
  town — the continuity anchor and the scene's thesis frame in one.
- Additional viewpoints: **the gate plaza** (`vp-plaza`, walk emphasis, the
  M4/M5 continuity anchor); **the covenant ground** (`vp-covenant`, close and
  ceremonial, where 5:3 is staged); **the elders' vantage** (`vp-elders`,
  looking back from the delegation toward the king — the one frame that puts
  the observer on the northern tribes' side of the transaction).
- Guided-path affordance (ADR-011 allow-list) is a good fit for the arrival
  walk from the northern road to the plaza; keep it optional and ignorable.
- **Timeline beats** (`depictsDeath: false`; suggested duration ~150s):

  | Beat            | Text  | Treatment                                                                                                                                                                                                                                                                                         |
  | --------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-tribes-come` | 5:1a  | Staged: the delegation of all the tribes comes down the northern road into Hebron and is received. Default viewpoint.                                                                                                                                                                             |
  | `b-bone-flesh`  | 5:1b  | Dialogue beat at the plaza: the kinship ground, "we are your bone and flesh," carried as the tribes' own words. ESV excerpt candidate (see budget).                                                                                                                                               |
  | `b-grounds`     | 5:2   | Dialogue beat: the military-record ground ("you who led out and brought in Israel") and the divine designation the tribes quote as already given — reported as their statement, never as the project's assertion.                                                                                 |
  | `b-covenant`    | 5:3a  | Staged: the elders and the king make a covenant at Hebron before the LORD. Rite mechanics are the disclosed placeholder — restrained, formal, no invented ceremonial apparatus.                                                                                                                   |
  | `b-anointing`   | 5:3b  | Staged: they anoint David king **over Israel**. The scene's center. Caption must state explicitly what has changed relative to 2 Samuel 2:4 — this is over Israel, where that one was over the house of Judah only — and must not overstate it into a claim about the polity's territorial scale. |
  | `b-regnal`      | 5:4–5 | Card only: the regnal figures as the text gives them, with the formulaic-figures and disputed-chronology note. No geometry, no timeline device.                                                                                                                                                   |
  | `b-close`       | —     | Closing card: forward pointer to `jerusalem-stronghold` only, stated as a pointer, not previewed. **No 2 Samuel 5:6+ content, no Jerusalem, no 2 Samuel 6+ content.**                                                                                                                             |

## Performance target

- ≈ 170–220 high-tier figures, overwhelmingly static assembly pose buckets —
  the `hebron-anointing` cost profile, which is already measured and shipped.
- **New geometry families: ideally zero.** Reuse `asset-figure-procedural`,
  `asset-terrace-walls`, `asset-olive-tree`, `asset-hebron-town-form`,
  `asset-anointing-props`, `asset-rocks`. If the covenant beat needs any prop
  at all, it should reuse `asset-anointing-props` rather than adding a family.
- No new lights, no water, no fire, no new terrain spec.
- A `performance-reviewer` pass is optional here, not a gate — the M5 sign-off
  already cleared a ~79-figure animated procession and a ~180-figure baked
  assembly on this exact site and rig.

## Required source basis (before geometry is built)

Records are created at build time; `SceneDef` arrays stay empty in `scenes.ts`
until they exist. Claim consolidation is allowed per the `gibeon-pool`
precedent — coverage matters, not count.

- **Existing, reuse:** `claim-hebron-identification`, `claim-hebron-town-form`
  (stays the released `design-placeholder` — do not upgrade),
  `claim-anointing-rite-form` (extend `notes` for this second application; do
  not create a second rite claim), `claim-dress`, `claim-600-men` (by
  reference), `claim-judah-anointing` (the M4 partial-kingship claim this scene
  completes — cross-reference both ways), `claim-david-historical` (the
  kingdom-scale dispute, **mandatory** cross-reference from this scene's
  central claim). The `hebron` location is `released`; this scene adds itself
  to its `sceneIds`.
- **New, narrated (basis `biblical-text`):** `claim-all-israel-anointing` (5:1–3
  — **the scene's central claim**; statement must say what the text says: the
  tribes come, state their grounds, a covenant is made before the LORD, and
  David is anointed king over Israel. `notes` must (i) cross-reference
  `claim-judah-anointing` as the partial anointing this supersedes, (ii)
  cross-reference `claim-david-historical` so that the scale of what is being
  founded stays an open question rather than an implication of the ceremony,
  and (iii) record that 1 Chronicles 12:23–40's muster figures were
  deliberately not used for scale); `claim-davidic-regnal-summary` (5:4–5;
  `notes` carry the formulaic-figures observation and the chronology dispute).
- **New, design (basis `design-placeholder`):** `claim-all-israel-cast-scale`
  (the disclosed counts above; must state explicitly that the assembly size is
  not evidence about the polity's size, parallel in form to
  `claim-judah-assembly-scale`).
- **Characters:** reuse `david`, `men-of-judah`, `davids-band`. New light group
  entry `elders-of-israel` (kind `group`) — **no invented named elders.**
- **ESV excerpt budget:** `2sam-5` is a **new passage shared by all three M6
  scenes**, so its ≤3-quote / ≤500-char budget is one shared handful. The M6
  allocation is **one quote per scene**. This scene's allocation is 5:1b or
  5:3's anointing clause — pick one, not both. **Verify exact wording via the
  live-source `WebSearch` check at build time** (the queue-#20(e) pattern:
  direct fetch to Bible-text sites is sandbox-blocked, search-result snippets
  are not).

## Placeholder policy

- **Allowed placeholders:** the covenant and anointing rite's physical
  choreography (reusing the existing disclosed placeholder); the delegation's
  composition, dress variation, and positions; the elder contingent's
  arrangement; lighting hour; the northern road's exact course; ambient-town
  activity.
- **Not allowed:** any Jerusalem geometry, silhouette, sightline, or caption,
  anywhere, in any beat; any upgrade to Hebron's massing, footprint,
  fortification, or grandeur on account of the larger political claim; any
  throne, dais, regalia, crown, or court apparatus (none is narrated, and all
  of it would be invented monarchic staging); invented named elders; using
  1 Chronicles 12's muster figures to size the crowd; presenting the assembly
  size as evidence about the kingdom's scale; captioning the northern-road echo
  of Abner's arrival for the observer; any assertion that the anointing
  established a territorial state of any particular extent; any triumphal or
  coronation-spectacle framing; any 2 Samuel 5:6+ content beyond the closing
  pointer; any 2 Samuel 6+ content in any form, depicted or foreshadowed.
