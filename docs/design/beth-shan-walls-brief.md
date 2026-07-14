# Scene brief — Beth-shan, the display on the wall (`beth-shan-walls`, M3)

World-director pass, Fable, 2026-07-14. Implementation: Sonnet/`threejs-engineer`
within this direction; deviations that change historical meaning go back through
`docs/fable-review-queue.md`. Second scene of Milestone 3.

Scope guard: this brief covers **1 Samuel 31:8–12a from the Beth-shan side** —
the arrival of the Philistine aftermath at the city, the display of the bodies
on the wall, the news crossing the valley, and the night retrieval **at the
wall**. The stripping and beheading on Gilboa (31:8–9) are events at Mount
Gilboa and are carried here by arrival context and captions, never re-staged.
The march home, the burning, the burial, and the fast (31:12b–13) belong to
`jabesh-burial`.

**Scope-line adjustment, stated openly:** the Gilboa brief's scope note said
"the night retrieval and burial belong to `jabesh-burial`." This pass draws the
line at physical location instead: the taking-down of the bodies (31:12a)
happens **at Beth-shan's wall**, which only this scene's world contains, so it
renders here; `jabesh-burial` opens with the column arriving home and recaps
the retrieval in its opening card. One event, staged once, in the world where
it happened — not silently dropped and not staged twice.

## Historical intent

The observer should come away understanding four things:

1. **This is a real, excavated city — and that raises the honesty bar.**
   Beth-shan is the project's **first securely identified, excavated urban
   site** (Tel Beth-Shean; Mazar's 1989–1996 excavations, `mazar-beth-shean-2006`).
   Unlike Ziklag's disclosed composite, composition here can and must track a
   real tell: the steep mound above the Harod stream at the Jezreel–Jordan
   valley junction, the town on the summit, the long Egyptian-garrison past.
   But identification cuts both ways: where the Iron I evidence is thin — most
   pointedly, **no substantial Iron I fortification wall is clearly attested**,
   while the text narrates a wall — the scene surfaces the tension in the claim
   rather than smoothing it (`claim-beth-shan-wall`, see below).
2. **The display is a propaganda act, not a spectacle.** The text's own emphasis
   is communication: messengers sent "to carry the good news" through Philistine
   country, armor to the temple of Ashtaroth, bodies fastened where travelers
   see them (31:9–10). The observer should read the wall as a message regime —
   the defeat of Israel's king published to a valley crossroads — and the
   default viewpoint (the valley road) makes them read it exactly as a traveler
   would. ADR-009 governs everything drawn (see the beat table); the horror is
   carried by fact and distance, never by detail.
3. **Who held Beth-shan is genuinely uncertain.** The narrative implies the
   Philistines could use the city; the excavated material culture of the
   post-Egyptian town is substantially Canaanite, with little classic Philistine
   signature, and scholars debate garrison vs. a local city within a Philistine
   orbit. Render a **local Canaanite town population** with a **Philistine
   detachment/escort** as the visiting element, and carry the debate as
   `scholarlyViews` on `claim-beth-shan-control` — do not paint the city
   "Philistine."
4. **The retrieval answers the display.** The scene's arc runs day → dusk →
   night: the wall published by daylight; the news crossing the Jordan at dusk
   (31:11, a card + the eastern sightline); the valiant men of Jabesh at the
   wall in the dark (31:12a); the wall **empty before dawn**. The text narrates
   no fight and none is invented — the courage is in the walking, the climbing,
   and the carrying. A closing card points to Jabesh without depicting it.

## Resolved design calls (this pass)

- **The wall renders as narrated, disclosed as archaeologically thin.** A
  modest mudbrick-on-stone perimeter — reading as the conjoined outer faces of
  edge buildings as much as a freestanding fortification — along the tell brow
  above the gate approach. `claim-beth-shan-wall` carries the narrated basis
  (31:10, 12) plus the corroboration gap in `notes`, and the **2 Samuel 21:12
  variant** ("the public square of Beth-shan") as a `scholarlyViews` entry. The
  variant also motivates the staging: the display sits on the wall face **above
  the gate plaza**, so both readings point at the same spot. Do not present the
  wall as an excavated-verified fortification.
- **The temple of Ashtaroth is NOT built.** 31:10 does not locate the temple;
  1 Chronicles 10:10 names a temple of Dagon for the head; Rowe's famous
  identification of the excavated Level V twin temples at Beth-shan with these
  very shrines is no longer accepted as demonstrated. The armor beat is carried
  by the messenger departure and its caption — armor borne away, destination
  stated, building never asserted on-site. The twin-temple question goes in
  `claim-armor-ashtaroth`'s `scholarlyViews`, and its verification joins queue
  #16. Omission over invention (anachronism discipline).
- **No severed head, no headless geometry — in any mode, ever.** The beheading
  (31:9) is stated plainly in captions (ADR-009: reduction abstracts depiction,
  never facts) but the display forms render as **bound, wrapped human
  silhouettes at wall-top distance, anatomically unresolved** — the render
  neither depicts nor visually contradicts the mutilation. A headless silhouette
  would be dismemberment rendering, which ADR-009 bans outright; a
  conspicuously intact body would falsify the text. Distance and wrapping are
  the honest solution. No trophy-carry of the head is rendered in the
  procession either — the armor is the visible object; the caption carries the
  rest.
- **Four forms on the wall.** 31:10 says "his body"; 31:12 says the men took
  "the body of Saul and the bodies of his sons" from the wall. Render four
  forms per 31:12 and note the singular/plural progression in the claim's
  `notes` rather than silently harmonizing.
- **Curated Egyptian monuments — allowed, labeled, verification queued.** The
  excavations famously recovered Egyptian monuments (Seti I stelae, a statue of
  Ramesses III) in later, Iron-age contexts, suggesting they remained visible
  in the post-garrison town. One or two weathered basalt monuments near the
  summit are the single strongest "this is a real place with a real past"
  detail available to this scene and are allowed as labeled,
  `archaeology`-basis elements — **but the curated-into-Iron-I reading must be
  page-verified against `mazar-beth-shean-2006` before `released`** (queue #16;
  the source card itself says "volume details to verify before M3 scene
  design"). If verification fails, they come out — they are additive, not
  load-bearing.
- **No invented guard fight at the retrieval.** The text narrates none. Night,
  quiet, ropes, biers. Any "stealth sequence" dramatization (alerted sentries,
  chases) is out — it would be invented narrative, and ADR-011's affordances
  never override textual integrity.

## Visual composition

- **Terrain:** a steep, high tell (`mound` feature with a `flatten`ed summit)
  above the junction of the Harod and Jordan valleys — the northern/western
  approach lower and open (the road from Gilboa/Jezreel), the ground falling
  away **east toward the Jordan valley** (the Jabesh sightline). Palette: a
  well-watered valley floor (greener than any scene so far — third regional
  palette after Negev loess and Gilboa garrigue), basalt field stones, pale
  mudbrick. The Harod stream is implied by a vegetation line (tamarisk/reeds),
  not a water shader.
- **The town:** a dense summit quarter — small conjoined mudbrick houses,
  narrow lanes, NOT the Ziklag enclosed ring (ADR-006's rider: layout type must
  be re-justified per scene; a tell city is a different form, scene-local
  layout code, no extraction trigger). Town massing is a labeled placeholder
  informed by the excavated Iron I domestic quarters (`claim-beth-shan-town-form`).
- **Focal masses:** (a) **the wall face above the gate plaza** with the four
  wrapped forms — the composition's fixed point through every beat; (b) the
  **gate plaza** below it — townspeople, the Philistine escort, the arrival and
  departure of the procession; (c) the **valley road** running in from the
  west — the axis along which the display is meant to be read.
- **Sightlines:** from the valley road, the tell rises with the wall line and
  the forms legible against the sky — the propaganda shot; compose it first.
  From the summit's eastern brow, the Jordan valley opens toward Gilead — the
  sightline the news travels (31:11) and the direction the retrieval party
  comes from and leaves by.
- **Lighting arc:** midday arrival → dusk (news card) → deep night (retrieval,
  torch sprites per the amalekite-camp pattern — emissive, no new real lights)
  → grey pre-dawn (the empty wall). Hours are disclosed `design-placeholder`
  (the text gives day/night only).

## Scale assumptions

- The Iron I town is modest — a few hectares of summit. **No population figure
  is asserted** (and nothing here touches register #4's kingdom-scale debate).
  Rendered presence, disclosed as representative, not census:
  - **Townspeople:** ~30–40 in the gate plaza and lanes at high tier.
  - **Philistine detachment/escort:** ~10–14, kit per `claim-philistine-kit`
    (reuse — including its headdress dispute discipline: principal-tier only).
  - **Retrieval party:** ~8–10 men of Jabesh at night (the text says "all the
    valiant men" with no number; this is a disclosed design choice, not a
    ratio — there is no narrated count to scale from).
  - High-tier total ≈ **55–70 figures** — well under Gilboa; this scene's
    budget load is architecture, like Ziklag.
- The tell's height/steepness is representative (relative topography honest,
  microrelief procedural); DEM remains deferred under queue #12, which covers
  identified sites generally — note `f-dem-terrain` was already re-scoped to M3
  and Beth-shan is a natural candidate when #12 resolves.

## Camera / observer experience

- **Default viewpoint** (`vp-valley-road`): on the western approach road,
  looking up at the tell, the wall line, and the display — the message read the
  way it was meant to be read.
- Additional viewpoints: **the gate plaza** (`vp-gate-plaza`, below the wall
  face — the 2 Sam 21:12 "public square" vantage); **the wall walk**
  (`vp-wall-walk`, walk-mode emphasis along the brow — the display point
  passed at respectful distance, never a lingering close-up); **the eastern
  brow** (`vp-east-brow`, the Jordan valley and the Jabesh direction);
  **the night ground** (`vp-night-ground`, below the wall at the retrieval
  hour).
- **Timeline beats and violence treatment** (ADR-009; standard is the default
  behind the first-visit advisory — note the advisory UI itself is still an
  open `next-run.md` item and must exist before this scene ships):

  | Beat           | Text     | Standard                                                                                                                                                              | Reduced                                                                                                                             |
  | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  | `b-next-day`   | 31:8–9   | opening card: the stripping and beheading on Gilboa, stated plainly, **not depicted**; the procession appears far off on the valley road                              | identical                                                                                                                           |
  | `b-procession` | 31:9–10  | the escort arrives at the gate bearing Saul's armor; townspeople gather; **no head rendered, no violence**                                                            | identical                                                                                                                           |
  | `b-messengers` | 31:9–10a | messengers depart with the armor and the news; caption names the temple of Ashtaroth without locating or depicting it                                                 | identical                                                                                                                           |
  | `b-display`    | 31:10b   | the four wrapped forms are raised and fastened to the wall face, seen from plaza distance — still silhouettes, no anatomical detail, no close-up, no rope/nail detail | the wall renders **without body forms**; the caption states what was done (per ADR-009's own wording)                               |
  | `b-wall-watch` | 31:10    | daylight over the town under the display; the forms motionless; life below continues uneasily                                                                         | wall bare; caption carries the fact                                                                                                 |
  | `b-news-east`  | 31:11    | dusk; card — across the Jordan, Jabesh-gilead hears what was done; camera draws the eastern sightline; no violence                                                    | identical                                                                                                                           |
  | `b-retrieval`  | 31:12a   | night; the men of Jabesh at the wall by torchlight; the forms lowered and borne away as wrapped biers — quiet, no fight, documentary distance                         | the men come and go with covered biers; nothing was on the wall to lower, so the beat reads as the carrying-out; captions identical |
  | `b-empty-wall` | 31:12a   | grey pre-dawn; the wall empty in both senses; forward card to Jabesh, **not depicted**                                                                                | identical                                                                                                                           |

- Walk mode should make the tell worth climbing: the gate ramp, the lanes, the
  brow, and the eastern view legible at eye level. Suggested duration ~150s,
  matching the M3 sibling.

## Performance target

- Budgets per `QUALITY_PROFILES`, target ≤ Ziklag's per-tier draw calls —
  this is an architecture scene: instance every repeated family (house block,
  wall segment, monument, torch sprite, figure, kit piece, scrub, rock);
  per-mesh material jitter only where meshes are already non-instanced, per
  the Ziklag precedent.
- Night beats reuse the amalekite-camp lighting approach: keyframed single
  directional + hemisphere rig, emissive torch/fire sprites, **no new
  real-time lights**, shadow budget unchanged.
- Figure count is low; do not let town geometry absorb the savings — run
  `performance-reviewer` after the first geometry slice, not at the end.

## Required source basis (before geometry is built)

Sonnet creates these records at build and populates `claimIds`/`assetIds` then.
All captions paraphrase; **no new ESV excerpts** (budget guard in
`src/data/integrity.test.ts`) — and note the excerpt-budget test still doesn't
scan beat captions (open backlog item), so be disciplined manually.

- **Existing, reuse:** `claim-philistine-kit` (escort kit + headdress dispute
  discipline), `claim-dress` (townspeople base), `claim-chronology` (period
  framing).
- **New, identification/site (basis `archaeology`):**
  `claim-beth-shan-identification` (high; `mazar-beth-shean-2006`,
  `rainey-notley-2006` — secure ID, excavated tell);
  `claim-beth-shan-town-form` (moderate/low; Iron I summit town, dense domestic
  quarter, Egyptian garrison ended generations earlier; massing specifics
  disclosed placeholder); `claim-egyptian-monuments` (moderate, **verification
  queued #16**; curated stelae/statue visible in the Iron-age town).
- **New, narrated with corroboration tension:** `claim-beth-shan-wall` (basis
  `biblical-text`, 31:10/12; `notes` carry the thin Iron I fortification
  evidence; `scholarlyViews` carry the 2 Sam 21:12 "public square" variant).
- **New, narrated (basis `biblical-text`):** `claim-body-display` (31:9–10,
  12 — display, the four bodies, the ADR-009 treatment noted);
  `claim-armor-ashtaroth` (31:9–10 — armor and messengers; temple location
  unstated; 1 Chr 10:10 Dagon variant and the Rowe twin-temple question in
  `scholarlyViews`); `claim-jabesh-retrieval` (31:11–12a — the news, the night
  walk, the taking-down; **shared with `jabesh-burial`**).
- **New, disputed control:** `claim-beth-shan-control` (basis
  `scholarly-reconstruction`, low/moderate; `scholarlyViews`: Philistine
  garrison/control vs. Canaanite city in a Philistine orbit;
  `mazar-beth-shean-2006`, `mazar-1990`, `finkelstein-silberman-2001`).
- **Characters (light entries):** add `men-of-jabesh` (group — no individual
  is named in the text; do not invent named leaders). Saul's entry is not
  re-staged as a living figure here; the forms are referenced via
  `claim-body-display`.
- **Assets (placeholders with `whyTemporary`):** `asset-terrain-beth-shan-tell`,
  `asset-tell-town-blocks`, `asset-beth-shan-wall`, `asset-display-forms`
  (the wrapped silhouettes — name it soberly, treat it soberly),
  `asset-egyptian-monuments`, `asset-bier-props`, reuse
  `asset-figure-procedural`, `asset-military-kit-philistine`,
  `asset-vegetation-scrub`, `asset-rocks`, and the camp fire-sprite technique
  for torches (new `asset-torch-sprites` or a disclosed reuse of
  `asset-camp-fire`).

## Placeholder policy

- **Allowed placeholders:** tell microrelief (procedural; DEM deferred under
  queue #12); town-block massing and lane layout; wall course, height, and
  construction detail; gate form; monument placement and weathering; the
  display rigging (the text says only "fastened" — keep the mechanism abstract,
  ropes implied, no nail/spike detail in any mode); torch props; bier props;
  lighting hours.
- **Not allowed:** a severed head or headless geometry in **any** mode, in any
  beat; gore, blood decals, or carrion-bird dressing on the forms; the temple
  of Ashtaroth (or Dagon) asserted or depicted at Beth-shan; an invented guard
  fight or stealth dramatization at the retrieval; the city presented as
  straightforwardly "Philistine" (control is disputed — label it); an asserted
  population or garrison count; the wall presented as an excavated-verified
  Iron I fortification; any triumphal staging that outruns the text's own
  grim brevity.
