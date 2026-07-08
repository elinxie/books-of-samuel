# Scene brief — Besor crossing (`besor-crossing`, M2)

World-director pass, Fable, 2026-07-08. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`.

## Historical intent

The observer should come away understanding four things:

1. **The wadi as a logistical boundary.** Nahal Besor is the largest wadi system
   of the western Negev; for a force three days off a forced march from Aphek and
   fresh from a burned home, it is where exhaustion becomes arithmetic: a third of
   the men physically cannot continue (1 Sam 30:9–10).
2. **Staying is collapse, not cowardice.** The two hundred are "too exhausted to
   cross"; they guard the baggage. The text's own resolution (vv. 21–25) hinges on
   this distinction — the scene must not stage them as shirkers.
3. **The Egyptian servant episode as ANE slavery reality.** An abandoned sick
   slave — property discarded when he stopped being useful — is revived with
   water, bread, fig cake, and raisins, and negotiates an oath before cooperating
   (vv. 11–15). Quiet, human-scale beat; no melodrama.
4. **The spoil statute.** On the return leg, David rules that those who stayed
   with the baggage share alike with those who fought (vv. 21–25) — narrated as
   the origin of a lasting statute. This scene carries that beat (the return
   passes the same ford), so M2 doesn't need a separate spoil scene.

## Visual composition

- **Terrain:** an ADR-005 `channel` feature — broad braided wadi bed, roughly
  100–140 m bank to bank, cut 6–10 m into rolling loess country. Bed mostly dry
  gravel/sand braid with a few standing pools (season unstated in text —
  water level is a labeled placeholder, not an assertion). Banks: tamarisk and
  scrub thickening near the bed, thinning to steppe above (reuse
  `Vegetation.tsx` instancing with a moisture-keyed density gradient).
- **Focal points:** (a) the ford where the route crosses; (b) the baggage
  laager on the north bank — packs, donkeys, the two hundred settling;
  (c) the open field south of the bed where the Egyptian is found, slightly
  off-route so finding him reads as an incident, not a waypoint.
- **Sightlines:** from the north bluff the observer sees route-in from the
  northeast (Ziklag direction), the crossing, and the route-out fading
  southwest — the pursuit's geometry in one view.
- **No settlement geometry.** This is open country; the scene's richness is
  terrain, vegetation, and figures.

## Scale assumptions

- Figures at the established ~1:10 narrated ratio (register #7): six hundred
  → 60; two hundred stay → 20 on the north bank; four hundred cross → 40.
- Named markers: David, Abiathar (continuity from Ziklag), the Egyptian
  (label-based identity, principal-detail rig per ADR-010).
- Baggage train: pack **donkeys** (not carts, not camels): wheeled transport
  is unevidenced here and camels are reserved to the Amalekite flight beat
  (register #6). Needs a new claim (`claim-pack-donkeys`, basis
  `biblical-text` + `comparative-ane` — donkeys are the narrative's default
  pack animal, e.g. 1 Sam 25:18) before geometry lands.
- Distances stay **representative** (register #2 — route depends on the open
  Ziklag-candidate question). No on-screen kilometer figures; the route claim
  keeps its low-confidence note.

## Camera / observer experience

- Default viewpoint: north-bluff overlook (route geometry in one frame).
- Additional viewpoints: ford midpoint (water-level view, walk-mode
  emphasis), baggage laager (grief-adjacent quiet after Ziklag's intensity),
  south-bank field (Egyptian encounter).
- Timeline beats (implemented in `SceneDef`): arrival/exhaustion → two
  hundred stay → four hundred cross → Egyptian found → revival → oath and
  intelligence → departure south → _(time-skip card)_ → return reunion →
  spoil ruling. The time-skip must be explicit in the beat caption — the
  return happens days later; do not imply continuous time.
- Walk mode should make crossing the bed itself worthwhile: bank height,
  braid channels, and pool placement legible at eye level.

## Performance target

- Same budgets as Ziklag per quality tier (`QUALITY_PROFILES`), shifted from
  architecture to vegetation: no houses, so bank vegetation/rock instancing
  can run denser within the same instance counts. Figures ≤ Ziklag's counts.
- One `InstancedMesh` per repeated species/prop family; donkeys instanced.
- No new dependencies; no real-time water shader — a static low-poly pool
  mesh with a modest fresnel-ish material is enough at all tiers.

## Required source basis (before geometry is built)

- Existing: `claim-besor` (identification, high), `claim-600-men`,
  `claim-negev-terrain` (extend or add a Besor-specific terrain claim citing
  the same geography sources for the loess/braid form —
  `claim-besor-channel-form`, basis `scholarly-reconstruction`).
- New, narrated (basis `biblical-text`): `claim-two-hundred-stay`,
  `claim-egyptian-servant` (abandonment, revival, oath),
  `claim-spoil-statute` (vv. 21–25; phrase as narrated, keep David's ruling a
  summary — no long ESV quotation; budget is tight).
- New: `claim-pack-donkeys` (above).
- All captions paraphrase; **no new ESV excerpts** in this scene's beats
  (budget guard in `src/data/integrity.test.ts`).

## Placeholder policy

- Allowed placeholders: water level/season, exact ford position, pool
  placement, donkey model fidelity, baggage props. Each gets an
  `assets.ts` entry with `whyTemporary` before the scene is `released`.
- Not allowed: invented Amalekite tracks/props here (wrong scene), military
  kit beyond what Ziklag's figures already carry, any on-screen distance or
  date assertions.
