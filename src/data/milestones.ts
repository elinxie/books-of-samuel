import type { Milestone } from './types';

export const MILESTONES: Milestone[] = [
  {
    id: 'M0',
    label: 'Milestone 0 — Repo foundation',
    status: 'released',
    passageRefs: [],
    goals: [
      'Stack chosen and documented (Vite + React + TypeScript + Three.js/R3F)',
      'GitHub Pages deployment workflow',
      'Research/source folder structure and ingestion policy',
      'Structured data model (passages, scenes, claims, sources, assets, milestones)',
      'Progress and feature tracking pages',
      'Unit + component + e2e smoke tests',
      'Continuation docs and subagent definitions',
    ],
  },
  {
    id: 'M1',
    label: 'Milestone 1 — 1 Samuel 30 vertical slice (Ziklag)',
    status: 'released',
    passageRefs: ['1 Samuel 30'],
    goals: [
      'Ziklag burned-settlement scene with smoke and ruin state',
      'Scripted return of David and the six hundred with timeline/replay',
      'Passage / location / period entry points',
      'Sources, scholarly notes, and label toggles',
      'First-person observer camera (walk + inspect modes)',
      'Quality modes (study / balanced / high)',
      'Initial bibliography and uncertainty register',
      'Citation verification pass on seeded source cards',
    ],
  },
  {
    id: 'M2',
    label: 'Milestone 2 — 1 Samuel 30 route and recovery',
    status: 'released',
    passageRefs: ['1 Samuel 30'],
    goals: [
      'Route from Ziklag toward the brook Besor',
      'Exhausted two hundred at the wadi',
      'Egyptian servant encounter',
      'Amalekite camp reconstruction (camel-use uncertainty surfaced)',
      'Recovery and spoil-distribution scenes',
      'DEM-based terrain investigation (re-scoped to M3 at the 2026-07-08 sign-off — see run log)',
    ],
  },
  {
    id: 'M3',
    label: 'Milestone 3 — 1 Samuel 31 Gilboa',
    // 2026-07-16 Fable sign-off: all three scenes built, reviewed, and approved
    // against docs/fable-review-checklist.md, with `released` gated only by the
    // page-verification items (fable-review-queue #13/#16/#17). 2026-07-19
    // Fable release pass: #16/#17 resolved 2026-07-16; #13 resolved this pass
    // (corroborated marker + disclosed extrapolation behind a scholarlyViews
    // dispute is a sufficient citation basis) — all three scenes `released`,
    // so M3 flips per the sign-off's own criterion. The gilboa real-hardware
    // perf check stays open as a non-blocking rider (docs/next-run.md).
    status: 'released',
    passageRefs: ['1 Samuel 31'],
    goals: [
      'Mount Gilboa battlefield geography',
      'Saul and his sons — honest, non-sensational death sequence with reduced-intensity mode',
      'Philistine aftermath and Beth-shan display',
      'Jabesh-gilead night retrieval route and burial',
      'Upgraded figures with period dress',
    ],
  },
  {
    id: 'M4',
    label: 'Milestone 4 — 2 Samuel 1–2',
    // 2026-08-02 Fable M4 review (queue #18 resolved): the 3-scene breakdown
    // and the atlas-overlay call for the 4th goal are CONFIRMED — no longer
    // provisional. All three scenes are built and approved as built; the
    // divided-kingdom atlas overlay (4th goal) is also built (`/atlas`).
    // 2026-08-02 Fable M4 release pass: queue #19's four citation gates all
    // closed (three affirmatively, Tell Rumeida as "checked, permanently thin"
    // per the #13 pattern) — all three scenes, both passages, and the
    // hebron/gibeon locations flipped to `released` together per the M2/M3
    // cascade precedent. Real-hardware perf + Pages-live checks stay
    // non-blocking riders (docs/next-run.md).
    status: 'released',
    passageRefs: ['2 Samuel 1', '2 Samuel 2'],
    goals: [
      'News of Saul’s death and David’s lament (`ziklag-lament`)',
      'David at Hebron; Judah anoints David (`hebron-anointing`)',
      'Abner/Ish-bosheth at Mahanaim; the pool of Gibeon and Asahel’s death (`gibeon-pool`)',
      'Early divided-kingdom political geography — built as an atlas/map UI overlay (`/atlas`, `AtlasPage`), not a 4th 3D scene, per the 2026-08-02 Fable review',
    ],
  },
  {
    id: 'M5',
    label: 'Milestone 5 — 2 Samuel 3–4',
    // 2026-08-03 Fable scope pass: 2 Sam 3 and 4 bundled into one milestone
    // (M4 precedent): 4 alone is too thin to stand — its murder site is the
    // unbuildable, disputed Mahanaim, leaving only the Hebron judgment
    // stageable — and 3–4 form one narrative unit (the collapse of the house
    // of Saul, closing at 4:12) with all staged action at the already-built
    // Hebron. Three scenes + an atlas extension; briefs in docs/design/
    // (hebron-covenant, hebron-gate, hebron-reckoning). M6 starts at 2 Sam 5.
    // 2026-08-10 M5 sign-off review (run on Opus standing in for Fable at the
    // user's explicit direction, Fable's monthly spend limit being hit — a
    // deliberate, authorized model substitution, not a provisional pass needing
    // a Fable re-review): all three scenes and the /atlas M5 phase reviewed
    // against docs/fable-review-checklist.md and APPROVED AS BUILT. M5 flips
    // planned → in-progress, not released; `released` gates on queue #20's
    // five closable citation/verification items, per the M3 #16/#17 and M4 #19
    // precedent. Two real defects found and fixed at the review (an ESV
    // paraphrase presented as a verbatim 3:1 quotation in the /atlas M5 lede;
    // atlasRegions' user-visible caption claiming a dashed outline the
    // renderer deliberately does not draw). ADR-009's dismemberment bar
    // verified holding in code, not just in captions.
    // 2026-08-12 Fable M5 release pass: queue #20's five citation gates + the
    // ADR-003 automation rider all closed (see docs/fable-review-queue.md #20
    // Resolved) — spot-checked at this pass: no forced basis/confidence
    // upgrades (herzog-1997 and king-stager-2001 both land at comparative-ane/
    // low with the regional-not-site-specific limit disclosed), and both
    // "checked, permanently thin" closures are genuine negative findings, not
    // shortcuts. Cascade executed per M3/M4 precedent: three scenes +
    // 2sam-3/2sam-4 → released, f-2sam-3-4 → done, M5 → released. hebron
    // location already released from M4, unchanged.
    status: 'released',
    passageRefs: ['2 Samuel 3', '2 Samuel 4'],
    goals: [
      'Abner’s overture and the covenant feast at Hebron (`hebron-covenant`)',
      'Joab’s killing of Abner at the Hebron gate; David’s disavowal, the funeral, and the lament (`hebron-gate`) — second application of ADR-009’s named-character-killing template',
      'Ish-bosheth’s assassination (narrated only — no Mahanaim geometry) and David’s judgment on Rechab and Baanah at Hebron (`hebron-reckoning`)',
      'Atlas overlay extension: the long war’s trend (2 Sam 3:1) and the collapse of the northern house — a `/atlas` phase update per ADR-011, not a 3D scene',
    ],
  },
  {
    id: 'M6',
    label: 'Milestone 6 — 2 Samuel 5',
    // 2026-08-14 Fable scope pass: M6 = 2 Samuel 5 ONLY (5:1-25), deliberately
    // NOT bundled with ch. 6. The M4/M5 bundling test cuts the other way here:
    // M5 bundled 3+4 because ch. 4 alone was too thin (its murder site is the
    // unbuildable Mahanaim); ch. 5 has the opposite problem — it is the
    // heaviest single-chapter build attempted so far, carrying the project's
    // first wholly new major site since M3 (Jerusalem / the City of David
    // spur: new landform, new settlement form, no continuity reuse available,
    // and every milestone after this one depends on its geometry) plus a
    // second new battlefield geography (the Valley of Rephaim). One chapter
    // standing alone has precedent (M3 = 1 Sam 31; M1 and M2 both = 1 Sam 30).
    // 2 Sam 6-7 (the ark brought up + Nathan's dynastic oracle) is the next
    // coherent unit and reuses this milestone's Jerusalem — M7 starts at
    // 2 Sam 6.
    // Three scenes + an atlas phase; briefs in docs/design/
    // (hebron-all-israel, jerusalem-stronghold, rephaim-valley). Build order:
    // hebron-all-israel first (full Hebron reuse, no new terrain, no death),
    // then jerusalem-stronghold (load-bearing), then rephaim-valley, then the
    // atlas phase — the M5 cheapest/lowest-risk-first convention.
    // Contested calls resolved at this pass, recorded in the briefs:
    // (a) 5:8's tsinnor ("water shaft") stays UNSTAGED — no infiltration route,
    // shaft, or tunnel is depicted anywhere; the philological and Warren's-Shaft
    // disputes are scholarlyViews + caption only, per the no-invented-method
    // restraint ADR-009 ratified at the M5 sign-off (hebron-reckoning, 4:12a).
    // (b) jerusalem-stronghold is therefore `depictsDeath: false`: 5:6-10
    // narrates no death, no casualty, and no assault method, and inventing one
    // would be precisely ADR-011's "unsourced invented certainty." (c) "The
    // blind and the lame" is caption-only with no staged figures, both readings
    // surfaced. (d) The City of David's 10th-century archaeology (Large Stone
    // Structure / Stepped Stone Structure / Millo) renders as a modest
    // fortified spur — explicitly not a portrait of any excavated structure and
    // explicitly not a palace — with the E. Mazar vs. Finkelstein-et-al. dispute
    // as scholarlyViews. (e) Hiram (5:11) is carried as scholarlyViews and never
    // dated against Tyrian regnal years; no ashlar or proto-Aeolic (later Iron
    // II) masonry. (f) 5:17-25's sequencing relative to the capture is
    // scholarlyViews; scenes run in canonical order and no Jerusalem geometry
    // appears in rephaim-valley, so no geometry answers the question. (g) No
    // force numbers are narrated at Rephaim, so all counts are disclosed design
    // choices (the claim-judah-assembly-scale pattern). (h) The captured
    // Philistine images (5:21 MT vs. 1 Chr 14:12) render only as covered carried
    // bundles, divergence as scholarlyViews. (i) 5:24's sound in the balsam tops
    // gets no supernatural visual effect of any kind.
    // Atlas ruling: the M6 phase carries BOTH existing allegiance regions under
    // one king with new captions — it does NOT merge them into a single shape,
    // draw a border, or expand either one. Merging would assert exactly the
    // contested territorial united-monarchy claim that claim-david-historical
    // keeps open. Jerusalem is plotted as a new, securely identified location.
    status: 'planned',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All the tribes of Israel come to Hebron; the elders’ covenant before the LORD and the anointing of David king over Israel (`hebron-all-israel`) — the M4 “house of Judah only” qualifier finally unwound by the text itself',
      'The taking of the stronghold of Zion from the Jebusites, the city of David and the Millo, and Hiram of Tyre’s embassy and house-building (`jerusalem-stronghold`) — the first wholly new major site since M3; no assault method is staged, 5:8’s tsinnor stays caption-only',
      'The two Philistine engagements in the Valley of Rephaim — Baal-perazim, then the flanking approach opposite the balsam trees (`rephaim-valley`) — the third ADR-009 battle scene, and the smallest, since the chapter narrates no numbers',
      'Atlas phase extension: both allegiance regions carried under one king and Jerusalem plotted — a `/atlas` phase update per ADR-011, not a 3D scene; no merged shape, no borders, no invented extent',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
