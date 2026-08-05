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
    status: 'planned',
    passageRefs: ['2 Samuel 3', '2 Samuel 4'],
    goals: [
      'Abner’s overture and the covenant feast at Hebron (`hebron-covenant`)',
      'Joab’s killing of Abner at the Hebron gate; David’s disavowal, the funeral, and the lament (`hebron-gate`) — second application of ADR-009’s named-character-killing template',
      'Ish-bosheth’s assassination (narrated only — no Mahanaim geometry) and David’s judgment on Rechab and Baanah at Hebron (`hebron-reckoning`)',
      'Atlas overlay extension: the long war’s trend (2 Sam 3:1) and the collapse of the northern house — a `/atlas` phase update per ADR-011, not a 3D scene',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
