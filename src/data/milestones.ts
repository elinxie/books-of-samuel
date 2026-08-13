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
    // 2026-08-13 Fable scope pass: M6 = 2 Sam 5 ALONE — the M4/M5 bundling
    // precedent triggers only when a lone chapter is too thin, and ch. 5 is
    // the opposite case: three stageable events at two buildable sites
    // (all-Israel anointing at the already-built Hebron; the capture and
    // occupation of Jerusalem — the project's first Jerusalem content and
    // first identified-site archaeology-heavy scene since Beth-shan/Gibeon;
    // both Philistine engagements in the identifiable Valley of Rephaim).
    // 2 Sam 6 (the ark) is deliberately NOT bundled in: its own narrative
    // unit (the three-month Obed-edom gap breaks continuity) with its own
    // hard Fable-tier calls (Uzzah's death, Michal) — it starts M7.
    // Three scenes + an atlas phase extension (M4/M5 pattern). Briefs are
    // DEFERRED to a follow-up world-director pass (deliberate deviation from
    // M5's same-session briefs: Jerusalem needs new location + source-card
    // groundwork first). Binding scope constraints set now, at milestone
    // level, for the Jerusalem brief: the tsinnor/Warren's Shaft
    // capture-route dispute is NEVER staged as the method (scholarlyViews
    // only; no invented assault, per ADR-009's ratified no-invented-method
    // reading — the text gives no battle description); the Stepped Stone
    // Structure may inform terrace geometry only with the Kenyon/Steiner vs.
    // E. Mazar/Faust dating dispute surfaced as scholarlyViews; the "Large
    // Stone Structure = David's palace" identification (E. Mazar) is NOT
    // adopted — card/label only; "Millo" rendered only as the disclosed
    // terracing reading behind a scholarlyViews label; the "blind and lame"
    // taunt (5:6, 8) is a genuine text crux — caption-only, scholarlyViews,
    // never staged literally. Baal-perazim has no confident identification —
    // it stays a named spot within the Rephaim valley scene (Mahanaim-style
    // restraint applied inside the scene, not by omitting the battles, since
    // the valley itself is an identifiable geographic setting). Hiram's
    // builders (5:11-12) fold into `jerusalem-stronghold`'s closing beats
    // (besor-crossing spoil-statute precedent); 5:13-16 (wives/sons) is
    // cards-only, never staged.
    status: 'planned',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All Israel comes to David at Hebron; the elders’ covenant and the all-Israel anointing (`hebron-kingship`, 2 Sam 5:1–5) — resolves `claim-judah-anointing`’s "house of Judah only" qualifier into all-Israel kingship; the callback carried explicitly in captions',
      'The stronghold of Zion taken; David occupies and builds the City of David (`jerusalem-stronghold`, 2 Sam 5:6–12, Hiram’s builders folded in as closing beats; new `jerusalem` location — the project’s first Jerusalem content, contested archaeology carried as scholarlyViews per the scope constraints above)',
      'Both Philistine engagements in the Valley of Rephaim — Baal-perazim and the balsam-trees advance (`rephaim-valley`, 2 Sam 5:17–25); the abandoned idols (5:21) staged honestly; divine-sign staging (5:23–24) resolved at the brief',
      'Atlas overlay extension: the M6 phase — the headless northern region resolves into all-Israel kingship and Jerusalem is plotted as the new capital (`/atlas` phase update per ADR-011, not a 4th 3D scene; M5’s "2 Samuel 5 out of scope" structural test guards get deliberately superseded by the new phase, not weakened)',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
