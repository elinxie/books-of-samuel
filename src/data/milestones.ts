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
    status: 'planned',
    passageRefs: ['2 Samuel 1', '2 Samuel 2'],
    goals: [
      'News of Saul’s death and David’s lament',
      'David at Hebron; Judah anoints David',
      'Ish-bosheth / Abner political geography',
      'Early divided-kingdom context view',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
