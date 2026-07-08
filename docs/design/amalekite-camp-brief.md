# Scene brief — Amalekite camp (`amalekite-camp`, M2)

World-director pass, Fable, 2026-07-08. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`.

## Historical intent

1. **A raider economy, not an army.** The camp is a dispersed pastoral-raider
   sprawl "spread abroad over all the land, eating and drinking and dancing"
   over spoil from Philistine and Judahite country (1 Sam 30:16) — livestock,
   captives, loot; loose clusters around fires, not ranks, ramparts, or a
   command tent. `claim-amalekite-raiders` (exists) is the anchor.
2. **The strike is narrated honestly, without spectacle.** David attacks "from
   twilight until the evening of the next day" (v. 17). We render onset and
   aftermath and compress the middle behind an explicit time-compression beat
   card. No blow-by-blow choreography, no gore geometry — this stays within
   the observer scope (no combat mechanics) and previews ADR-009's restraint
   norms before Gilboa formalizes them.
3. **The captives are recovered alive.** "Nothing was missing… David brought
   back all" (vv. 18–19). The reunion beat is the emotional resolution of the
   Ziklag scene's grief — stage it as the point of the whole pursuit.
4. **The camel dispute is surfaced, not hidden.** Four hundred young men flee
   on camels (v. 17) — rendered per the resolved Fable decision (register #6):
   flight beat only, no ambient herds, minimal early tack, dispute chip on
   the label.

## Visual composition

- **Terrain:** a shallow open basin south of the Besor drainage — low relief,
  same loess/steppe palette as the Besor scene for regional continuity; no
  `channel` feature (the wadi is off-scene). Scattered scrub, heavily grazed
  near the camp (a `ColorZone` of worn ground under the camp sprawl).
- **The sprawl:** 10–14 loose clusters over several hundred meters, each a
  fire point + windbreak/awning shelters + spoil heaps + tether lines. At
  dusk the fire points are the scene's visual signature — the observer reads
  the camp's size by its fires, exactly as a scout would.
- **Shelters are the anachronism trap:** the classic black goat-hair bedouin
  tent is not securely attested this early. Render low ridge-awnings and
  brush windbreaks instead, labeled `design-placeholder`
  (`asset-camp-shelter-placeholder`) — suggestive, not asserting a documented
  tent form. No distinctive "Amalekite" dress, standards, or emblems —
  undocumented; reuse the generic dress palettes with the disclosure note.
- **Livestock:** mixed flocks (sheep/goats) and some cattle (v. 20 "flocks
  and herds"), instanced, penned/tethered near clusters.

## Scale assumptions

- Text gives no camp headcount; the only number is the four hundred who
  escape. Assumption (design choice, disclosed n/a-confidence): a camp
  meaningfully larger than its escapees — nominal ~700–800 → ~70–80 figures
  at high tier at the ~1:10 ratio, scaled down by tier. Captives (Ziklag's
  women/children among them) as a distinct grouped cluster, ~20 figures.
- Camels: nominal 400 → ~40 at high tier, **flight beat only** (register #6),
  entering as mounts from the eastern edge of the sprawl.
- David's four hundred → 40 attackers entering from the north at twilight.

## Camera / observer experience

- Default viewpoint: scout's rise north of the basin at dusk — the fire-point
  sprawl in one frame (this is the money shot; compose it first).
- Additional viewpoints: inside a feast cluster (pre-strike normalcy);
  captive cluster (the stakes); eastern edge (camel flight sightline).
- Timeline beats: dusk approach → the sprawl feasting → strike at twilight
  (onset only: alarm, scatter, firelight motion) → **time-compression card**
  ("until the evening of the next day", v. 17) → camel flight of the four
  hundred → recovery and reunion → driving flocks and herds north. Lighting
  rides the beats: dusk → night firelight → next-day evening. Fires are
  emissive sprites/billboards, not real lights — the single-directional +
  hemisphere rig stays.
- Violence rendering: attackers close, figures fall _out of frame focus_ /
  crumple at distance; no dismemberment, no blood decals in any mode. If a
  reviewer judges even this too graphic, the fallback is aftermath-only
  (strike beat cuts from alarm straight to the compression card) — decide at
  build with a screenshot pass, note the choice in the scene entry.

## Performance target

- The sprawl is the draw-call risk: every repeated family (shelter, fire,
  spoil heap, tether post, sheep, goat, cow, camel, figure) is one
  `InstancedMesh`; fire sprites in one instanced billboard system with a
  shared material. Target ≤ Ziklag's draw-call count per tier even though
  the area is larger; cull by cluster if needed.
- Night-lighting must not multiply lights: emissive + a slightly raised
  hemisphere floor at night; verify shadow budget unchanged.
- Run `performance-reviewer` after the first geometry slice lands, not at
  the end.

## Required source basis (before geometry is built)

- Existing: `claim-amalekite-raiders` (with the camel `scholarlyViews`),
  `claim-negev-terrain`.
- Pre-authorized by register #6 (create at build): `claim-camel-depiction`,
  `asset-camel-placeholder`.
- New, narrated (basis `biblical-text`): `claim-camp-sprawl` (v. 16),
  `claim-strike-timing` (v. 17 + explicit time-compression disclosure),
  `claim-full-recovery` (vv. 18–19), `claim-livestock-spoil` (v. 20).
- New, design: `claim-camp-shelters` (`design-placeholder` basis with the
  goat-hair-tent caveat above); `claim-camp-scale` (n/a-confidence design
  choice documented per the scale section).
- All captions paraphrase; no new ESV excerpts.

## Placeholder policy

- Allowed: shelter forms, fire props, spoil heaps, livestock models, camel
  model and tack (minimal — no frame saddle), camp layout specifics.
- Not allowed: named-culture material culture (Amalekite emblems/dress),
  fortifications, any implication the camp form is archaeologically
  documented — nomadic raider camps leave almost no excavated signature, and
  the brief's honesty depends on saying so in the scene's scholarly notes.
