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
    // 2026-08-13 SCOPE PASS — done by Sonnet under docs/model-handoff.md's
    // documented Fable-unavailable fallback policy (fable-architect's first
    // call this session hit the monthly spend limit, same recurring
    // constraint as the 2026-07-22 M4 and 2026-08-10 M5 sessions).
    // PROVISIONAL: needs a real Fable pass before any part of this scope is
    // treated as final; tracked in docs/fable-review-queue.md.
    //
    // Scene-breakdown reasoning: 5:1-5 (all-Israel's covenant/anointing of
    // David — his third, over the whole kingdom) happens at Hebron, already
    // fully built across three M4/M5 scenes; five verses of assembly action
    // is thinner even than hebron-covenant's M5 precedent and would
    // duplicate hebron-covenant's/hebron-anointing's own visual argument
    // (a gathered assembly ratifying David) for no new payoff — folded into
    // an opening context card on the first M6 scene rather than a fourth
    // Hebron scene. 5:13-16 (the wives/sons list) is likewise a context
    // card, not a scene: no site-specific action, no violence. That leaves
    // two genuine staged-action clusters, at two distinct sites: the
    // capture of Jerusalem and the building of David's house (5:6-12,
    // `jerusalem-capture` — the project's first wholly new major location
    // since Beth-shan, and its most archaeologically contested one) and the
    // two Philistine engagements (5:17-25, `rephaim-valley` — bundled into
    // one scene rather than two: they share one broad geography, one brief
    // span of narrated text, and one organizing idea, the contrast between
    // the two divine-inquiry answers, that only reads clearly held
    // together). Two scenes, not three or four. Plus an atlas extension:
    // /atlas gains an M6 phase showing the united kingdom (Judah + the
    // now-headless Israel-writ region from the M5 phase merge into one,
    // unbordered region under one king) — the M5 phase's own AtlasPage.tsx
    // lede already explicitly defers this exact question to 2 Samuel 5
    // ("out of scope for this milestone" — see AtlasPage.test.tsx), so this
    // extension resolves a forward pointer the app itself already made, not
    // a new invention. No 4th 3D scene for the political-geography content,
    // same reasoning as M4/M5's own atlas-overlay calls (ADR-011: a map can
    // carry uncertainty a scene cannot).
    //
    // Jerusalem's own identification is NOT disputed (unlike Ziklag/
    // Mahanaim) — what's genuinely, actively contested is the size and
    // character of the 10th-century BCE settlement itself (the Eilat Mazar
    // "Large Stone Structure"/"Palace of David" proposal vs. Finkelstein's
    // minimalist critique vs. Cahill/Na'aman middle-ground readings). The
    // brief explicitly forbids adopting Mazar's palace identification as
    // settled fact and mandates a conservative, disclosed-as-such render —
    // this is the single most load-bearing judgment call in this scope pass
    // and the one most worth a real Fable re-review (see
    // docs/fable-review-queue.md).
    //
    // Build order for Sonnet: `jerusalem-capture` first (new location,
    // establishes the ridge terrain/palette `rephaim-valley` then reuses as
    // an adjacent regional variant), then `rephaim-valley`, then the atlas
    // extension.
    status: 'planned',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All Israel anoints David king over the whole kingdom at Hebron (5:1–5) — carried as a context card, not a fourth Hebron scene',
      'David and his men take Jerusalem from the Jebusites and build the City of David inward from the Millo (5:6–10) (`jerusalem-capture`)',
      'Hiram of Tyre builds David a house; David perceives the LORD has established his kingdom (5:11–12) (`jerusalem-capture`); sons born to David in Jerusalem (5:13–16) carried as a context card',
      'The Philistines are defeated at Baal-perazim and again in the Valley of Rephaim, on two different divine instructions (5:17–25) (`rephaim-valley`)',
      'Atlas overlay extension: the united kingdom under one king — a `/atlas` M6 phase per ADR-011, not a 4th 3D scene',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
