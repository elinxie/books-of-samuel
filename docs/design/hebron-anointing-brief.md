# Scene brief — Hebron, the anointing over Judah (`hebron-anointing`, M4)

**PROVISIONAL — Fable unavailable this session (monthly spend limit hit
mid-session).** Written by Sonnet standing in for the `world-director` role
under that role's own stated fallback policy. Tracked in
`docs/fable-review-queue.md` #18 (the M4 scene-breakdown decision this brief
implements) — needs a real Fable read before any part of it is treated as
final creative direction, and before the scene ships past `in-progress`.
Implementation: Sonnet/`threejs-engineer` within this direction; deviations
that change historical meaning go back through the queue.

Scope guard: this brief covers **2 Samuel 2:1–7 only** — David's inquiry, the
move to Hebron with his men and their households, the anointing over the
house of Judah, and the message to Jabesh-gilead. It stops there. Abner's
installation of Ish-bosheth at Mahanaim and the war at the pool of Gibeon
(2 Sam 2:8–32) is `gibeon-pool`, a separate brief — **no Abner, no
Ish-bosheth, no battle geometry, no Mahanaim geometry anywhere in this
scene.** The burial of Saul at Jabesh-gilead is already rendered in the M3
scene `jabesh-burial` — this scene renders David's side of that thread (he
hears of it and sends a commendation) as a **messenger dispatch**, not a
flashback re-render of the burial, the pyre, or the wall.

## Historical intent

The observer should come away understanding three things:

1. **This is a coronation, but a partial and contested one.** "The men of
   Judah came and anointed David king over the house of Judah" (2:4) — not
   over Israel. The text is precise about this, and the scene's entire job is
   to make that precision legible: one tribe's elders and townspeople, in one
   tribal hill town, install David over themselves alone. The rest of the
   former kingdom is still Saul's house's to claim — which the very next
   scene (`gibeon-pool`) shows happening at Mahanaim, in direct rivalry. The
   composition should never let the observer read this as "David becomes
   king" in the full sense; it is a first, local, incomplete step, and the
   later, wider anointing "king over all Israel" is still three chapters and
   several years away (2 Sam 5:3) — a fact worth carrying in a claim's
   `notes`, not asserted as achieved here.
2. **A political founding grows out of a following, not a conquest.** David
   arrives with "his men and their households" (2:2–3) — the same core group
   the observer has followed since Ziklag. The scene should read as that
   following's men settling into a place and being locally ratified by it,
   not as a foreign army occupying a city. Hebron's own elders/townspeople are
   the actors performing the anointing; David and his men are received, not
   conquering.
3. **Loyalty is repaid in both directions, off-scene as much as on.** David's
   message to Jabesh-gilead (2:5–7) closes a loop the observer already saw
   half of at `jabesh-burial` and `ziklag-lament`: Jabesh honored Saul's
   corpse at real risk; David, now a king (of Judah), publicly commends them
   for it and signals his own new status to them. This is a diplomatic/
   political beat, not a devotional one — stage it as correspondence between
   two political actors, not as a shared mourning ritual (that already
   happened, elsewhere, in different scenes).

## Visual composition

- **Terrain:** ADR-005 `hills`, a Judean-highland palette — the project's
  **fifth regional palette** (Negev loess → Gilboa garrigue → Beth-shean
  valley green → Gilead hills → now Judean hill country): terraced limestone
  slopes, olive groves and vine terracing (reuse/extend `asset-olive-tree`;
  new `asset-terrace-walls` for the dry-stone agricultural terracing
  characteristic of the Judean hills), rockier and more intensively terraced
  than Gilead's oak-and-scrub flank. Hebron sits on a hill (Tell Rumeida)
  above its own spring-fed valley; the town itself is modest-scale, not a
  royal capital — this is a first stop, not Jerusalem.
- **Focal masses:** (a) **the approach column** — David's men and households
  climbing the highland road from the south, the direction of the Negev and
  Ziklag, tying this scene geographically to the whole M1–M2 arc; (b) **the
  town and its gate plaza** — Hebron itself, modest and hill-set, with an open
  ground outside/near the gate where the assembly gathers (this plaza is the
  scene's ceremonial center, its equivalent of Ziklag's open center or
  Beth-shan's gate plaza); (c) **the household encampment** — a satellite
  cluster of tents/lean structures around the town, staging "they lived in
  the towns of Hebron" (2:3) as a dispersed settling-in rather than a single
  walled interior; (d) **the assembly** — Hebron's and the surrounding
  Judahite towns' elders and townspeople, gathered for the anointing, the
  largest single mass in the scene.
- **Sightlines:** the default vantage looks down from an approach ridge so
  the whole political geography reads in one frame — town, gate plaza,
  household camp, assembly — with the highland terracing framing it and nc
  view northward toward the rest of the former kingdom. That deliberate
  framing choice (bounded, inward-facing, no long sightline toward the
  Jezreel/Transjordan direction Saul's house still holds) is itself part of
  the "partial kingdom" argument — compose it first. The anointing-plaza
  vantage is close and ceremonial; the messenger-departure vantage opens
  outward along the road toward Gilead/the Jordan (the direction Jabesh lies)
  for the closing beat, the scene's one deliberate "outward" sightline.
- **Lighting:** daytime throughout — this is a public civic ceremony, not a
  night/dusk scene like Ziklag's return or Jabesh's retrieval. Hour unstated
  in the text; default to clear late-morning light for legibility, disclosed
  `design-placeholder`.

## Scale assumptions

The text gives **one** hard number carried forward from earlier scenes (the
600 men) and **no number at all** for the anointing assembly. Two different
scale problems, two different disclosed treatments:

- **David's men:** the established ~600 fighting men (1 Sam 27:2; 30:9–10),
  rendered at the project's standard **~1:10 narrated ratio** (register #7,
  confirmed standard for narrated crowds) → **~60 figures**, consistent with
  the Ziklag precedent (`claim-600-men`, reused by reference in this scene's
  notes, not duplicated).
- **Households:** 2:2–3 states his men brought "their households" but gives
  no count. Disclosed **design choice**, not derived from any ratio: render a
  visually distinct household column/camp at roughly **~40–50 figures**
  (mixed adults and children), sized to read as "a following's families," not
  asserted as a real headcount or a fixed multiple of the 600.
- **The anointing assembly ("the men of Judah," 2:4):** this is the scale
  problem worth stating plainly. A literal rendering of "the tribe of Judah"
  would be several thousand people at minimum on any regional population
  estimate the project has already cited (`claim-david-historical`'s
  Finkelstein & Silberman highland figures) — unrenderable and, more
  importantly, **not what the text asserts**: it names no number and no
  mechanism (a levy? a self-selected gathering of local elders and
  townspeople? Hebron alone or its satellite towns too?). Following the
  `jabesh-burial` precedent for beats with **no narrated count to ratio
  from** ("no ratio applies... disclosed design choice"), this scene renders
  a **representative civic assembly** — Hebron's own townspeople plus a
  visible elder contingent, explicitly labeled as standing for "the men of
  Judah," not a census or a full tribal muster. Target **~150–200 figures**
  at high tier — deliberately the **largest crowd of the three M4 scenes**
  (`ziklag-lament`'s household/retinue-scale grief and `gibeon-pool`'s
  duel-scale skirmish are both smaller), because a public political founding
  is the one M4 beat that is structurally a crowd event, but it stays an
  order of magnitude below any literal tribal count and the scene's label
  says so.
- **High-tier total ≈ 250–310 figures** (60 + 40–50 + 150–200), the
  performance ceiling this scene should be benchmarked against; thin by
  quality tier as elsewhere.
- Hebron's own settlement size at this period is **not asserted** beyond "a
  modest hill town" — see Required source basis below; this is exactly the
  kind of claim that needs a real citation before the town's footprint is
  drawn at any specific scale.

## Camera / observer experience

- **Default viewpoint** (`vp-approach-ridge`): an elevated approach ridge
  south of the town, looking north across the gate plaza and household camp
  toward Hebron on its hill — the whole political geography of the scene in
  one frame, deliberately bounded (no view toward the rest of the former
  kingdom).
- Additional viewpoints: **the gate plaza** (`vp-anointing-plaza`, walk
  emphasis — where the anointing itself is staged, closer and ceremonial);
  **the household camp** (`vp-household-camp`, the "towns of Hebron"
  settling-in, families and dependents rather than fighting men);
  **the messenger road** (`vp-messenger-departure`, looking outward along the
  road toward Gilead/the Jordan — the scene's one deliberately outward
  sightline, used for the closing beat and pointing, unshown, toward Jabesh).
- **Timeline beats** (no violence in this scene — `depictsDeath: false`; no
  ADR-009 treatment needed):

  | Beat               | Text   | Treatment                                                                                                                                                                                                                                                                                                               |
  | ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `b-inquiry`        | 2:1    | Opening card + a brief, minimally-staged inquiry gesture (David with Abiathar/the ephod — the same practice established at Ziklag, 1 Sam 30:7–8); text does not fix the inquiry's location, so this beat carries no new terrain and no Ziklag-geometry reuse.                                                           |
  | `b-arrival`        | 2:2–3a | The column — David's men and their households — climbs the highland road and comes into view of Hebron. Default viewpoint.                                                                                                                                                                                              |
  | `b-settling`       | 2:3b   | Households disperse into the satellite camp around the town ("the towns of Hebron"); a quieter, domestic beat.                                                                                                                                                                                                          |
  | `b-anointing`      | 2:4    | The elders/townspeople of Judah anoint David at the gate plaza. The scene's ceremonial center; camera favors `vp-anointing-plaza`. Caption states explicitly: king over the **house of Judah**, not Israel.                                                                                                             |
  | `b-jabesh-message` | 2:5–7  | David dispatches messengers to Jabesh-gilead with his commendation and the news of his new, partial kingship. Staged as correspondence — messengers given the message and sent off toward the Jordan/Gilead direction (`vp-messenger-departure`); **no Jabesh geometry, no burial flashback, no travel/arrival shown.** |
  | `b-close`          | —      | Closing card, not depicted: Abner's installation of Ish-bosheth at Mahanaim and the war at the pool of Gibeon (2 Sam 2:8–32) — forward pointer to `gibeon-pool` only.                                                                                                                                                   |

- Walk mode should let the observer cross the actual social geography: from
  the household camp to the gate plaza to the outward-facing road, the same
  kind of ground-level legibility Jabesh used for its wadi climb. Suggested
  duration ~170s, in line with its M3/M4 siblings.

## Performance target

- Budget against the largest M4 crowd (~250–310 high-tier figures, see
  Scale assumptions) — closer in order of magnitude to Gilboa's combat crowd
  (M3, 120–140) than to Jabesh's or Ziklag's smaller casts, though it is a
  static/ceremonial crowd, not a moving battle line, which should make it
  cheaper per figure (fewer simultaneous animated pose transitions, more
  static "assembly" pose buckets).
- One `InstancedMesh` per repeated family: figure, terrace-wall segment,
  olive tree, tent/household-camp structure, town-block structure, anointing
  props (oil vessel). Reuse `asset-figure-procedural` (existing ADR-010 rig)
  and its static/crowd pose-bucket system rather than adding new animation
  infrastructure.
- No new real-time lights; daytime single-directional + hemisphere rig,
  matching every prior scene. No water/fire systems needed (no wadi, no
  pyre, no torches in this scene — a genuine simplification versus Jabesh).
- Run `performance-reviewer` after the first geometry slice lands, given the
  assembly crowd is this scene's one real cost driver.

## Required source basis (before geometry is built)

Sonnet creates these records at build time and populates the scene's
`claimIds`/`assetIds` then — arrays stay empty in `scenes.ts` until they
exist, same discipline as every prior scene.

- **Existing, reuse:** `claim-dress` (base dress), `claim-chronology`
  (period framing — this scene should use periodId `iron-iia`, not
  `iron-i-iia-transition`; 2 Samuel 2 is past Saul's death, into the early
  monarchy proper), `claim-david-historical` (anchor for both the Tel Dan
  corroboration and the contested kingdom-scale debate — this scene's
  "partial kingship" framing should cross-reference it explicitly in
  `notes`), `claim-600-men` (David's fighting men, reused by reference, not
  duplicated). The `hebron` `LocationEntry` already exists in
  `src/data/locations.ts` (`identification.views`, `disputed: false`,
  Tell Rumeida, `sourceIds: ['rainey-notley-2006']`) — this scene is what
  should populate its currently-empty `sceneIds: []`, though editing
  `locations.ts` itself is a `researcher`/build-time task, not this brief's.
- **New, identification/terrain (flag for `researcher` before this is more
  than a placeholder):** `claim-hebron-identification` (basis
  `scholarly-reconstruction`, high — Tell Rumeida, `rainey-notley-2006`,
  matching the location entry). **Open gap:** checked `sources/source-cards/`
  and found **no dedicated source card for Hebron/Tell Rumeida excavation
  results** — `rainey-notley-2006` supports the site _identification_ (it is
  the standard atlas reference and already covers this) but says nothing
  specific about excavated early Iron IIA town form, fortification, or size
  at Tell Rumeida. A `researcher` pass should check for a citable source
  (e.g., published Tell Rumeida/Hebron excavation or survey reports — the
  site has seen renewed excavation activity in recent decades) before
  `claim-hebron-town-form` can move past `design-placeholder`. Until then:
  `claim-hebron-town-form` (basis `design-placeholder`, speculative — "a
  modest highland hill town," no wall plan, no gate-tower form asserted as
  excavated) is the honest default, following the Jabesh/Beth-shan pattern
  of disclosing exactly this kind of gap rather than inventing a plan.
- **New, narrated (basis `biblical-text`):** `claim-hebron-inquiry` (2:1 —
  the oracular inquiry; notes should note the mechanism [ephod/Abiathar] is
  inferred from the identical practice at 1 Sam 30:7–8, not restated in 2:1
  itself); `claim-david-move-hebron` (2:2–3 — the move of men and households;
  notes disclose the household-count design choice from Scale assumptions);
  `claim-judah-anointing` (2:4 — **the single most important claim in this
  scene**; statement must say plainly that this anoints David over the
  _house of Judah only_, not Israel, and `notes` must cross-reference the
  later, wider anointing at 2 Sam 5:3 without asserting it happened here);
  `claim-jabesh-commendation` (2:5–7 — David's message; notes cross-reference
  `claim-jabesh-retrieval`/`jabesh-burial` as the event being commended, and
  state explicitly that this scene does not re-render it).
- **New, design (basis `design-placeholder`):** `claim-anointing-rite-form`
  (the physical choreography of the anointing itself — who pours the oil,
  what vessel, what the elders/assembly do — 2:4 narrates the fact of
  anointing but not its ritual mechanics; comparative ANE covenant/kingship
  investiture parallels can inform this at `comparative-ane` basis if a
  source is found — check `king-stager-2001` — otherwise stays
  `design-placeholder`); `claim-judah-assembly-scale` (the representative-
  assembly sizing decision from Scale assumptions, parallel in form to
  `claim-battle-scale`/the Jabesh no-ratio disclosure — confidence n/a,
  design choice).
- **Characters:** reuse `david` and `men-of-jabesh` (existing entries, light
  records). Add a light group entry `men-of-judah` (kind `group`; the text
  names no individual elders — do not invent named elders).
- **Assets (placeholders with `whyTemporary`):** `asset-terrain-hebron-hills`
  (Judean highland heightfield, procedural, not DEM — same ADR-012-consistent
  deferral as every prior scene), `asset-hebron-town-form` (the modest
  hill-town/gate-plaza structure — disclosed placeholder pending the
  researcher citation gap above), `asset-terrace-walls` (Judean
  agricultural terracing, new), `asset-household-camp` (tent/lean-structure
  cluster), `asset-anointing-props` (oil vessel/horn), reuse
  `asset-figure-procedural`, `asset-olive-tree`, `asset-rocks`.

## Placeholder policy

- **Allowed placeholders:** Hebron's town/gate footprint, wall presence, and
  exact size (disclosed pending the researcher citation gap — do not invent
  a specific excavated plan); the household camp's arrangement; the
  anointing rite's physical choreography (oil vessel, elder gesture,
  positions); the assembly crowd's exact composition and positions; terrace/
  olive placement; lighting hour (unstated in text); the messenger-departure
  staging.
- **Not allowed:** any Abner, Ish-bosheth, or Mahanaim geometry (wrong scene
  — `gibeon-pool`'s territory, hard scope guard); any battle/skirmish
  staging; re-rendering the Jabesh burial, pyre, wall, or bone-bundle
  geometry (wrong scene — `jabesh-burial`/`beth-shan-walls`'s territory; this
  scene only stages David's message _about_ it); framing or captioning the
  anointing as making David "king" in an unqualified sense — every caption
  touching 2:4 must carry "over the house of Judah" or equivalent, never
  drop the qualifier; asserting a literal tribal population count for the
  assembly crowd, or presenting the ~150–200 figure as anything but
  representative; inventing named Judahite elders; adopting any single
  Tell Rumeida excavation phase as "the" Davidic-era town plan without a
  real citation (the researcher gap above must close first, or the
  `design-placeholder` label stays); softening the "partial, contested
  kingship" framing that is this scene's entire historical point.
