# Scene brief — the pool of Gibeon, Abner, Joab, and the death of Asahel (`gibeon-pool`, M4)

**PROVISIONAL — Fable unavailable this session (monthly spend limit hit
mid-session).** Written by Sonnet standing in for the `world-director` role
under that role's own stated fallback policy. Tracked in
`docs/fable-review-queue.md` #18 (folded into the same cell as the
`ziklag-lament` and `hebron-anointing` M4 updates) — needs a real Fable read
before any part of it is treated as final creative direction, and before the
scene ships past `in-progress`. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back
through the queue. Third and last of the three M4 scenes.

Scope guard: this brief covers **2 Samuel 2:8–32 in full**, ending at 2:32
(Asahel's burial at Bethlehem, and Joab's night march arriving at Hebron by
daybreak). It does **not** cover anything from 2 Samuel 3 onward — Abner's
later negotiation with David, his assassination by Joab, or any resolution of
the house-of-Saul/house-of-David conflict. Those are out of scope for this
scene and for this milestone; no forward-pointing card in this scene should
even gesture at them (unlike some prior closing cards' forward text-pointers,
there is no confirmed next scene/milestone to point to yet, and 2 Samuel 3's
content is heavy enough — Abner's death at Joab's hand, in revenge for
Asahel — that naming it here risks reading as a spoiler-tease rather than an
honest scope note; leave it out entirely). `hebron-anointing`'s closing card
already points forward to this scene in text only; this scene does not need
to reciprocate.

**Location note (load-bearing):** `locationId` for this `SceneDef` is
`gibeon` — where the action happens. **Mahanaim is narrated only** (2:8,
2:12, 2:29 — Abner comes from there, and returns there after the battle) and
is **not built** in this scene. The `mahanaim` `LocationEntry` is disputed
with no confident site (two low-confidence Jabbok-valley candidates, see
`src/data/locations.ts`) and should keep `sceneIds: []`; do not add
`gibeon-pool` to it. Handle Mahanaim entirely through text/caption reference
— an opening context card citing the location entry's own disclosed
uncertainty is enough. This mirrors how `hebron-anointing` handled Jabesh
(referenced, not rebuilt) and how `ziklag-lament` referenced Gilboa without
rebuilding it.

## Historical intent

The observer should come away understanding four things:

1. **This is civil war, not a foreign-enemy battle — the tribal fracture is
   the point.** 2:9 gives Ish-bosheth's writ ("Gilead, the Ashurites,
   Jezreel, Ephraim, Benjamin, and all Israel") against 2:10b's plain
   counter-statement ("but the house of Judah followed David"). Every prior
   battle scene in this project (`gilboa-battle`) staged Israel against a
   foreign coalition; this scene stages Israelites against Israelites — men
   who may well have stood shoulder to shoulder against the Philistines at
   Gilboa two years earlier are now killing each other at a well outside
   Gibeon. The composition, captions, and (see below) dress treatment should
   make this legible as fracture, not conquest: no invented "Judah kit" vs.
   "Benjamin kit" uniform distinguishing the two sides visually — the text
   gives no such marker, and inventing one would manufacture exactly the kind
   of tribal-uniform anachronism `docs/reconstruction-method.md` warns
   against. Sides are legible by grouping, position, and who the named
   figures stand with, not by invented insignia.
2. **The contest that starts it is small, specific, and mutually fatal — not
   a device.** 2:14–16 gives an exact number (twelve a side) and an
   unusually specific killing method (each man seizes his opponent by the
   head and drives a sword into his side — a simultaneous, paired killing,
   twelve times over) and even a place-name coined from the result
   (Helkath-hazzurim, "the field of sword-edges/of the strong men," at
   Gibeon). This is the most choreographically specific violence the project
   has rendered — more specific than anything in Gilboa — and needs its own
   careful ADR-009 treatment (below), not a generic melee.
3. **A real, disproportionate casualty count, delivered as text, not as a
   corpse count on screen.** 2:30–31 gives real numbers: nineteen of David's
   servants plus Asahel (twenty total) against **three hundred and sixty**
   of Benjamin/Abner's men — an almost 18:1 kill ratio. This is one of the
   few moments in Samuel where the text hands the project an actual
   battlefield statistic instead of a round or rhetorical number. Deliver it
   as exactly that — stated text, at the point in the timeline the text
   states it (after the pursuit is called off, 2:29–31) — rather than
   attempting to render 360 individual fallen figures, which would be both a
   performance problem and a tone violation of ADR-09's restraint. The
   disproportion itself is worth surfacing (Judah's side won overwhelmingly
   despite Abner's plea coming from the losing side, not a battle of equals),
   distinct from anything the two wider contingents' rendered figure counts
   should try to visually prove.
4. **Restraint stops the killing, not exhaustion or a treaty.** Abner's plea
   ("Shall the sword devour forever? … how long will you refrain from telling
   your people to turn from the pursuit of their brothers?", 2:26) and Joab's
   compliance (he blows the trumpet and the pursuit stops, 2:27–28) is a
   deliberate echo of the restraint theme `ziklag-lament` already established
   for David toward Saul's person — here it's Abner (Saul's own general)
   invoking common kinship ("their brothers") to a numerically overwhelming
   opposing force, and Joab (who has just lost his youngest brother to this
   same Abner) grants it anyway. This is a genuine moment of restraint inside
   a civil war, not a tactical retreat, and the staging should let it read as
   a real ethical choice, on both sides — Abner's plea and Joab's
   compliance — not as combat simply petering out.

## Resolved design calls (this pass)

- **The pool gets built as an actual feature — this is a rare, real
  text/archaeology convergence worth foregrounding, with a dating caveat
  disclosed, not smoothed over.** `pritchard-gibeon-1962` (already added this
  session, see `sources/source-cards/pritchard-gibeon-1962.json`) confirms
  Pritchard's excavation at el-Jib found an actual rock-cut pool and
  stepped water-tunnel system at the identified site — one of the more
  striking text-to-feature matches in the whole project (2:13 names "the
  pool of Gibeon" as the specific place; the site's own name is independently
  secured by the inscribed jar handles). **But the source card's own
  `confidenceNotes` flags this as assembled from secondary/tertiary
  summaries, not primary-copy inspection, and — critically — neither the
  card nor the location entry states when the excavated pool was actually
  cut.** Whether the monumental rock-cut pool visible in the excavated record
  existed in its current form as early as the early Iron IIA setting of
  2 Samuel 2 (conventionally the early monarchy, roughly early 10th century
  BCE on any chronology this project has cited) or is a later Iron II
  expansion that postdates the narrated event is a **genuine open question
  this brief cannot resolve** — flagged below for `researcher`. Render a
  modest pool/water-basin feature (not asserted at Pritchard's exact
  excavated dimensions — 2:13's "pool of Gibeon" only requires a body of
  water at the site, not a specific monumental form) with the identification
  corroboration and the dating caveat both disclosed on the claim. This is
  the single most interesting sourcing question in this brief; do not let it
  get flattened into either "confirmed" or "omit."
- **No new water-rendering shader.** The engine currently has no dedicated
  water/reflection system (`src/engine/terrain.ts`'s `TerrainSpec` supports
  `mound`, `ridge`, and `channel` only; `gilboa-battle` and `jabesh-burial`
  both explicitly declined a water shader for their own scenes). Do not build
  one for this scene either. Represent the pool as a shallow basin
  depression (extend `TerrainSpec` with a `basin` kind, or approximate with
  an inverted `mound`/a `channel` ring — implementer's call) plus a flat,
  unlit or minimally-lit tinted plane for the water surface — no reflection,
  no refraction, no animated ripple shader. This is a disclosed fidelity
  placeholder (`asset-water-plane`), not a historical claim.
- **No invented dress differentiation between the two sides.** Unlike
  Gilboa's Israelite/Philistine kit split (warranted because one side was
  genuinely foreign and the text names archers as a distinct element), both
  sides here are Israelite. Reuse `claim-dress` as-is for everyone, no new
  kit claim. If the two sides need to be visually legible in the wide shot
  (they do, compositionally), do it with grouping, banners/standards are
  **not** attested and should not be invented either — use camera staging
  and positional grouping only.
- **The champions' contest is rendered literally (1:1), not by ratio.** The
  text gives an exact, small number — twelve a side, 24 total — small enough
  to render at full literal count without a performance concern. This is
  not a "narrated army" needing the ~1:10 convention (register #7); it is a
  named, countable event, in the same register as `jabesh-burial`'s
  small retrieval party or `ziklag-lament`'s witness cluster — a **disclosed
  small headcount taken directly from the text**, not a design choice at all
  here, since the text's number is both exact and renderable.
- **The two wider contingents get a disclosed, deliberately modest design
  count — smaller than Gilboa's, and explicitly not derived from the 360/20
  casualty figures.** The text gives no headcount for either side's total
  force. Following the `claim-battle-scale`/`claim-judah-assembly-scale`
  precedent (disclosed design choice, not a ratio of any asserted "true"
  number), and because this is one contingent-level clash inside a civil war
  rather than the kind of full national muster Gilboa staged, render totals
  noticeably below Gilboa's already-modest 120–140 high-tier combat figures.
  See Scale assumptions.
- **Asahel's death sets the precedent for future individual-character
  killings (not suicide) — distance, restraint, and a held reaction beat.**
  This is the project's first rendering of one named character killing
  another named character up close (Saul's death in `gilboa-battle` was a
  suicide, rendered at documentary distance with the armor-bearer's refusal
  as the emotional pivot). See the dedicated section below.

## Visual composition

- **Terrain:** ADR-005 `hills`, a central Benjamin-highlands palette — drier
  and more open than Judean Hebron's terracing, rockier high ground typical
  of the Gibeon plateau north of Jerusalem. No new regional vegetation
  system beyond what Gilboa/Hebron already established (scrub, rock,
  occasional terrace fragments); the pool basin is the one genuinely new
  terrain feature.
- **Focal masses, staged in sequence (this scene has real narrative
  geography — pool, spreading battlefield, pursuit route, hilltop — more
  like a journey than a single wide shot):**
  1. **The pool itself** — the two companies arriving and sitting "one on
     one side of the pool and the other on the other side" (2:13), a
     genuinely striking staged-confrontation detail worth composing exactly
     as described: two groups facing each other across still water, before
     a blow is struck. This is the establishing shot; compose it first.
  2. **The champions' ground**, at or immediately beside the pool — the
     twelve-vs-twelve, a distinct smaller-scale set piece within the wider
     space, close enough to the pool that the observer can hold both in one
     frame from the default viewpoint.
  3. **The spreading battlefield** — once the contest ignites the wider
     clash (2:17), the fight spreads beyond the pool's immediate ground;
     dust and motion carry this the same way Gilboa's rout did.
  4. **The pursuit route** — open ground away from Gibeon, the direction
     Abner's contingent flees, where Asahel's chase and death happen,
     distinct from the pool ground.
  5. **The hill of Ammah** — a modest rise where Abner's rallying
     Benjaminite band gathers and the pursuit is called off; composed so the
     Benjaminites are physically above the pursuers on the hill, a
     deliberate visual irony worth keeping (the side that is losing badly by
     the numbers, per 2:30–31, holds the high ground and is the one asking
     for mercy — height does not equal the military outcome here; do not
     "fix" this into a more conventionally heroic composition).
- **Sightlines:** the default pool vantage should read as a held, almost
  diplomatic tableau before any violence — two councils across water — so
  the contest's sudden escalation lands as a real rupture. The pursuit
  should be shot with a following/walk-emphasis camera low enough to feel
  the chase's urgency; the hill of Ammah vantage looks up at the rallying
  band from the pursuers' side, then holds on Abner's plea.
- **No triumphal staging anywhere** — this is Gilboa's rule extended: no
  trophies, standards, or victory framing for either side, even though one
  side clearly and heavily wins. A civil-war internal skirmish rendered as a
  triumph would misrepresent both the text's own tone (Abner's grief-tinged
  plea, Joab's compliance) and the project's standing violence policy.

## Scale assumptions

- **The champions: 24 figures, rendered literally 1:1** (twelve for
  Benjamin/Ish-bosheth, twelve for David/Judah) — the text's own exact
  number, small enough to need no ratio and no design-choice disclosure
  beyond "this is the stated count."
- **The two wider contingents: disclosed design counts, not a ratio of any
  asserted true army size** (no headcount is narrated for either force) —
  target **Abner's Israel/Benjamin contingent ≈ 35–45 figures**, **Joab's
  Judah contingent ≈ 30–40 figures**, deliberately smaller than either side
  of Gilboa's already-modest crest/press/rout groupings, because this is a
  contingent-level clash between two commanders' followings at one town, not
  a national muster.
- **The rallying Benjaminite band at the hill of Ammah (2:25): ≈ 12–18
  figures** — a distinct smaller cluster, drawn from (not additive to)
  Abner's wider contingent as it regroups.
- **Named principals (all new, see Characters below), not counted against
  the crowd totals: Abner, Ish-bosheth (referenced/context only — he does not
  appear at Gibeon in the text and should not be staged there), Joab,
  Abishai, Asahel.**
- **High-tier total ≈ 90–115 combat figures** (24 champions + 35–45 + 30–40,
  with the hilltop band drawn from the existing contingent, not added on
  top) — noticeably below Gilboa's 120–140, consistent with this being an
  internal contingent-level skirmish rather than a full army-vs-army battle.
  State this explicitly in the scene's scholarly notes, parallel to how
  Gilboa disclosed its own rout as "deliberately thinned."
- **The 360/20 casualty figures (2:30–31) are delivered as caption text at
  the point the narrative states them, never as a literal on-screen corpse
  tally.** Do not scale, cross-check, or "true up" the rendered contingent
  sizes against these numbers — they are a real textual detail belonging to
  the story's own reckoning after the fact, not a target the rendered crowd
  needs to visually prove. Say so explicitly in `claim-gibeon-casualties`'
  notes: the disclosed figure counts above are a design choice for staging
  legibility, and the real casualty numbers are carried by text alone.

## Camera / observer experience

- **Default viewpoint** (`vp-pool`): an elevated vantage over the pool
  showing both companies seated on opposite banks — the two-councils-across-
  water tableau, composed first.
- Additional viewpoints: **the champions' ground** (`vp-champions`, close
  inspect-emphasis, at/beside the pool); **the spreading battlefield**
  (`vp-battle-spread`, wider, dust/motion-carried); **the pursuit route**
  (`vp-pursuit`, walk/follow-emphasis — a good candidate for ADR-011's
  guided-path affordance, following the chase away from Gibeon); **the hill
  of Ammah** (`vp-ammah-hill`, looking up at the rallying band, then holding
  on Abner's plea — documentary distance, not intimate, matching Gilboa's
  `vp-death-knoll` precedent).
- **Timeline beats and violence treatment** (standard is the default per
  ADR-009, gated by the one-time advisory; `depictsDeath: true`):

  | Beat                  | Text    | Standard                                                                                                                                                                                                                                                                                                                                                                                                    | Reduced                                                                                                                                                |
  | --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | `b-context`           | 2:8–10  | Opening card: Abner has installed Ish-bosheth over the northern tribes at Mahanaim (referenced, not built), two years in; Judah follows David. No geometry beyond the card; no violence.                                                                                                                                                                                                                    | identical                                                                                                                                              |
  | `b-arrival`           | 2:12–13 | Both companies arrive and sit opposite each other across the pool. Default viewpoint. No violence.                                                                                                                                                                                                                                                                                                          | identical                                                                                                                                              |
  | `b-proposal`          | 2:14    | Abner proposes the contest; Joab agrees. Dialogue beat, no violence.                                                                                                                                                                                                                                                                                                                                        | identical                                                                                                                                              |
  | `b-champions`         | 2:15–16 | The twelve pairs grapple (head-grasp gesture, legible without violence detail) and fall together at documentary distance; **no blade-entry geometry, no blood, no dismemberment**. Caption names Helkath-hazzurim.                                                                                                                                                                                          | The pairing is shown; the mutual fall is elided — cut from the grapple to all twenty-four fallen (still); caption carries the fact and the place-name. |
  | `b-battle-spreads`    | 2:17    | The wider clash ignites; figures crumple/fall at distance in the drift, dust/motion carries the mass (same treatment as Gilboa's `b-rout`); no gore.                                                                                                                                                                                                                                                        | The clash is shown at wider distance; individual falls are elided, read only by the crowd thinning.                                                    |
  | `b-asahel-pursuit`    | 2:19–20 | Asahel alone pursues Abner; the "Is that you, Asahel?" / "It is I" exchange, at speed. No violence yet. Walk/follow camera.                                                                                                                                                                                                                                                                                 | identical                                                                                                                                              |
  | `b-abner-warns`       | 2:21–22 | Abner's two warnings to turn aside, visibly reluctant — play Abner as trying to avoid this, not as a hunter. No violence.                                                                                                                                                                                                                                                                                   | identical (emotional pivot, same in both modes — Abner's reluctance is load-bearing, matching the armor-bearer-refusal precedent)                      |
  | `b-asahel-death`      | 2:23    | Abner halts, reverses his spear grip (the "backward"/butt-end thrust is the one specific, legible, non-graphic detail worth showing — the reversed grip itself, not penetration), strikes; camera holds/cuts at contact; Asahel's fall read by silhouette collapsing, no wound geometry, no blood. Held reaction beat: bystanders stop and stand still (2:23b), read through stillness/posture, not replay. | Elided entirely — cut from Abner turning to Asahel already fallen and still; caption states the fact and the method (a backward spear-thrust) in text. |
  | `b-pursuit-continues` | 2:24    | Joab and Abishai continue toward the hill of Ammah as the sun goes down (2:24's own lighting detail — use it directly, not a placeholder hour). No violence.                                                                                                                                                                                                                                                | identical                                                                                                                                              |
  | `b-standoff`          | 2:25    | The Benjaminites rally into a band atop the hill. Establishing shot, no violence — a standoff, not combat.                                                                                                                                                                                                                                                                                                  | identical                                                                                                                                              |
  | `b-abner-plea`        | 2:26    | Abner's plea, delivered from the hill. Dialogue beat, no violence — the restraint turning point.                                                                                                                                                                                                                                                                                                            | identical                                                                                                                                              |
  | `b-joab-halts`        | 2:27–28 | Joab's reply, the trumpet sounds, the pursuit stops. No violence.                                                                                                                                                                                                                                                                                                                                           | identical                                                                                                                                              |
  | `b-casualty-count`    | 2:29–31 | Text-only card: Abner's night march back to Mahanaim (referenced, not shown); the casualty tally (nineteen of David's servants plus Asahel; three hundred sixty of Benjamin/Abner's men) delivered as caption text, not a rendered corpse count.                                                                                                                                                            | identical                                                                                                                                              |
  | `b-close`             | 2:32    | Text-only closing cards: Asahel taken up and buried in his father's tomb at Bethlehem; Joab and his men march through the night and reach Hebron by daybreak. **No Bethlehem or Hebron geometry** — both out of this scene's `locationId` scope.                                                                                                                                                            | identical                                                                                                                                              |

  Explicitly, matching Gilboa and Ziklag's precedent: **no dismemberment in
  any mode, no blood/gore geometry in any mode**, no lingering close-up
  framing on any death. `b-asahel-death` is the load-bearing beat of the
  whole scene and gets the most deliberate treatment — see below.

### Asahel's death — the precedent this sets

This is the project's first rendering of one named character killing
another named character at close range (as distinct from Saul's suicide in
`gilboa-battle`, or the anonymous rout deaths at Gilboa/here). Decided
precedent, to carry forward to future individual killings not yet built
(Abner's own death in 2 Samuel 3, Amasa's in 2 Samuel 20, etc.):

1. **Documentary distance and no wound geometry, same as every prior death
   in this project — this scene does not loosen ADR-009, it applies it to a
   new situation.** The camera does not move in close for the strike; no
   blade-entry, no blood, no dismemberment, in either mode.
2. **The text's one specific, legible, non-graphic detail gets shown: the
   reversed spear grip.** 2:23 specifies Abner struck Asahel with the
   _back end_ of the spear — an unusual, specific detail (probably meaning
   Abner didn't even turn to fight properly, or that the butt-spike itself
   was lethal at that force) that is choreographically distinct from a
   normal forward spear-thrust. Showing the grip reversal is a detail the
   text actually gives us, and it can be shown as a gesture without showing
   penetration — this is the right level of specificity, matching how
   Gilboa showed the armor-bearer's refusal gesture without showing Saul's
   blade entering.
3. **A held reaction beat carries the emotional weight, not visual
   detail.** 2:23b is unusually explicit that "all who came to the place
   where Asahel had fallen and died, stood still" — the text itself gives us
   a beat of collective shock and stillness. Use it as a literal camera
   hold: bystanders stop, no motion, no captions rushing past it. This
   becomes the template for future named-character deaths: **distance +
   restraint + a held reaction beat**, in place of graphic detail, carries
   the weight.
4. **Abner is staged as reluctant, not villainous or triumphant — this
   matters for historical honesty, not just tone.** The text gives Abner two
   warnings and a line explaining exactly why he doesn't want to do this
   ("how then could I hold up my face to your brother Joab?", 2:22) — dramatic
   irony, since Joab will in fact hold this against him. Do not stage Abner
   as an aggressor hunting Asahel down; stage him as a man repeatedly trying
   to avoid a killing he sees coming and can't prevent. Do not stage Asahel
   as reckless or foolish either — the text frames his refusal to turn aside
   as loyal zeal ("swift as a gazelle," 2:18), not folly. Both readings stay
   available to the observer; the scene should not editorialize either man
   into villain or fool.
5. **Reduced mode elides the strike itself, not the fact or the method.**
   Cut from Abner turning to Asahel already down and still; the caption
   states plainly that Abner struck Asahel with the back of his spear and he
   died. Reduction abstracts depiction, never facts, per ADR-009 exactly as
   established for Gilboa and Ziklag.

## Performance target

- Combat figures: ≈ 90–115 high-tier total (see Scale assumptions) —
  noticeably cheaper than Gilboa's 120–140, and the champions' contest (24
  figures, tightly grouped, pose-bucket-driven pairs) is the cheapest and
  most reusable new pose-function work: 12 paired grapple/fall cycles sharing
  one animation function parameterized by pair offset.
- One `InstancedMesh` per repeated family, as always: figure, spear, sword,
  shield (if any — see Required source basis; kit is otherwise
  undifferentiated from `claim-dress`), dust/motion sprites (reuse
  `asset-dust-motion` from Gilboa), rock, scrub.
- **The pool basin and water plane are the one new geometry family.** Budget
  it as a single static mesh (basin) plus one flat plane (water surface,
  unlit or minimally lit, no reflection/refraction) — cheap, no new
  real-time lights, no new shader technique. Confirm with
  `performance-reviewer` that this doesn't reintroduce any of the concerns
  the Gilboa/Jabesh briefs explicitly declined a water shader to avoid.
- No new vegetation system beyond Gilboa/Hebron's existing highland scrub
  instancing. Run `performance-reviewer` after the pool-ground and
  champions' set piece land first — that's the one genuinely new asset
  family and the one most likely to need tuning.

## Required source basis (before geometry is built)

Sonnet (or whoever implements) creates these records at build time; `SceneDef`
arrays stay empty in `scenes.ts` until they exist.

- **Existing, reuse:** `claim-dress` (shared, undifferentiated dress for both
  sides — deliberately, see Resolved design calls); `claim-david-historical`
  (anchor for the civil-war/contested-kingdom-scale framing, cross-referenced
  from `claim-mahanaim-installation` below); the `gibeon` `LocationEntry`'s
  own `identification.views` (already populated this session, Tell el-Jib,
  `pritchard-gibeon-1962` + `rainey-notley-2006`, high confidence) — this
  scene populates its `claimIds`, not a duplicate identification claim.
- **New, identification/terrain:** `claim-gibeon-pool-feature` (basis
  `biblical-text` for the pool's narration at high confidence, plus
  `archaeology` for Pritchard's excavated rock-cut pool/water-tunnel system
  at the identified site, at **moderate-to-low** confidence pending the
  dating question below; `sourceIds: ['pritchard-gibeon-1962',
'rainey-notley-2006']`). **Flag for `researcher` before this claim can move
  past a heavily-hedged placeholder: does Pritchard's own stratigraphy (or
  later reassessment) date the pool/tunnel's construction to a phase
  contemporary with or before the early Iron IIA setting of 2 Samuel 2, or
  is it a later Iron II (e.g., 9th–8th century) construction that postdates
  the narrated event?** This is a genuinely open, checkable question (unlike
  Mahanaim's identification, which has no confident answer at all) and
  belongs in `docs/uncertainty-register.md` as a new row once the claim
  exists. `claim-gibeon-terrain-form` (basis `design-placeholder`; the
  procedural basin/water-plane approximation and the no-water-shader
  disclosure, parallel to `claim-gilboa-terrain-form`).
- **New, narrated (basis `biblical-text`):**
  - `claim-mahanaim-installation` (2:8–10 — Abner's installation of
    Ish-bosheth over the northern tribes at Mahanaim, the two-year reign, and
    the house-of-Judah/house-of-Israel split; notes cross-reference
    `claim-judah-anointing` from `hebron-anointing` explicitly as the mirror
    event, and state that Mahanaim itself is referenced, not rendered, per
    the disputed, low-confidence `mahanaim` `LocationEntry`).
  - `claim-champions-contest` (2:14–16 — the proposal, the twelve-vs-twelve,
    the paired mutual killing, and the Helkath-hazzurim naming).
  - `claim-gibeon-battle` (2:17 — the wider battle and Israel's rout before
    David's servants; notes state the civil-war framing explicitly).
  - `claim-asahel-pursuit-death` (2:18–23 — Asahel's introduction as
    Zeruiah's son and swift as a gazelle, the pursuit, Abner's two warnings,
    and the backward-spear-thrust death; notes carry the "reluctant killer"
    reading and the 2:22 dramatic-irony line, without gesturing at 2 Samuel
    3's payoff).
  - `claim-ammah-standoff` (2:24–28 — the pursuit to the hill of Ammah, the
    rallying Benjaminite band, Abner's plea, and Joab's trumpet halt; notes
    cross-reference `claim-lords-anointed-principle` from `ziklag-lament` as
    a parallel restraint-toward-kin theme, not the same claim).
  - `claim-gibeon-casualties` (2:29–31 — the exact casualty figures, nineteen
    plus Asahel against three hundred sixty, and Abner's night march back to
    Mahanaim; notes state explicitly that these numbers are delivered as
    text only, never as a rendered corpse tally, and are not used to size
    the rendered contingents).
  - `claim-asahel-burial-hebron-march` (2:32 — the burial at Bethlehem and
    the night march reaching Hebron by daybreak; notes state that neither
    location is rendered in this scene, consistent with this scene's
    `locationId` staying `gibeon` throughout).
- **New, design (basis `design-placeholder`):** `claim-gibeon-battle-scale`
  (the disclosed figure-count design choice for the two wider contingents
  and the hilltop band — parallel in form to `claim-battle-scale`/
  `claim-judah-assembly-scale`; confidence n/a, design choice; notes state
  explicitly that the total is deliberately smaller than Gilboa's and is not
  derived from the 360/20 casualty figures).
- **Characters (light entries — id/name/kind/summary/passageRefs/claimIds
  only):** none of `abner`, `ish-bosheth`, `joab`, `abishai`, or `asahel`
  exist yet in `src/data/characters.ts` — all five are new. Add:
  - `abner` (person — Saul's former commander, installs Ish-bosheth,
    proposes the contest, kills Asahel reluctantly, pleads for restraint).
  - `ish-bosheth` (person — referenced/context only; does **not** appear at
    Gibeon in the text and should not be staged there).
  - `joab` (person — David's commander, agrees to the contest, present
    through the pursuit and the halt).
  - `abishai` (person — Joab's brother, joins the pursuit of Abner).
  - `asahel` (person — Joab's youngest brother, "swift as a gazelle," killed
    by Abner; this is the character entry that needs the most care in its
    summary given the individual-death precedent above).
- **ESV excerpt budget:** `2sam-2` is a **shared passage** between
  `hebron-anointing` and `gibeon-pool` — check whether `hebron-anointing`'s
  build already populated `2sam-2.keyExcerpts` before adding anything here;
  the budget (≤3 quotes, ≤200 chars each, ≤500 total) is per-passage, and
  `integrity.test.ts` checks each scene's own beat-caption quotes
  independently, but treat both together as one shared "handful" in spirit,
  same discipline as `ziklag-lament`'s note. Recommend spending this scene's
  own quote budget (not the passage's) on: Abner's plea (2:26, "Shall the
  sword devour forever?..."), Abner's dramatic-irony line (2:22, "how then
  could I hold up my face to your brother Joab?"), and — if a third is
  wanted — the brief "Is that you, Asahel?" / "It is I" exchange (2:20).
  Verify exact ESV wording and character counts at implementation time; trim
  or drop the third if any candidate exceeds budget.

## Placeholder policy

- **Allowed placeholders** (each gets an `assets.ts` entry with
  `whyTemporary` before `released`): the pool basin's exact form/dimensions
  (disclosed pending the researcher dating question above — do not adopt
  Pritchard's excavated monumental dimensions as "the" 2 Samuel-era pool
  without that check); the water surface's rendering fidelity
  (`asset-water-plane`, flat/unlit, no shader); exact figure positions and
  contingent groupings; the champions' grapple/fall pose-function fidelity;
  the hill of Ammah's exact form; lighting hour for every beat except
  `b-pursuit-continues` (2:24 states sundown directly — use it, not a
  placeholder); the reversed-spear-grip pose fidelity.
- **Not allowed:** any Ish-bosheth or battle geometry at Mahanaim (wrong
  location — Mahanaim is disputed/low-confidence and referenced only, never
  built); any Bethlehem or Hebron geometry for the `b-close` beat (out of
  this scene's `locationId` scope); any content from 2 Samuel 3 onward,
  depicted or textually foreshadowed, including Abner's eventual death; a
  rendered corpse tally matching the 360/20 casualty figures; an invented
  visual "Judah kit" vs. "Benjamin/Israel kit" uniform distinction; any
  banners, standards, or insignia not attested in the text; blood/gore/
  dismemberment geometry in the champions' contest or Asahel's death, in
  either mode; close-up or lingering camera framing on any death; staging
  Abner as a villain or Asahel as reckless (both readings must stay
  available, per the text's own framing); triumphal staging for either side
  despite the lopsided casualty count; a real-time water reflection/
  refraction shader (explicitly declined, matching Gilboa/Jabesh's own
  precedent); adopting Pritchard's excavated pool as confirmed-contemporary
  with 2 Samuel 2 without the dating check above.
