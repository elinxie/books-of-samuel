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
    // 2026-08-23 Fable/world-director scope pass. 2 Samuel 5 stands alone as
    // one milestone — unlike M4/M5 it needs no bundling, because it contains
    // two full, distinct, buildable settings that the project has never
    // rendered (Jerusalem; the Valley of Rephaim). It resolves to **two
    // scenes plus an atlas extension**, the smallest coherent set:
    //   • 5:6–16 → `jerusalem-stronghold`. The milestone's load-bearing and
    //     most contested scene: the Jebusite stronghold on the southeastern
    //     ridge, the "you will not come in here" taunt, the *tsinnor* crux,
    //     the Millo, and the City of David naming — with Hiram's cedar and
    //     Tyrian craftsmen (5:11–12) folded in as closing beats rather than
    //     given a scene, since they are the same site and the same subject
    //     (the stronghold becoming a capital), and with 5:13–16's wives/sons
    //     list carried card-only, exactly as M5 handled 3:2–5.
    //   • 5:17–25 → `rephaim-valley`. Both Philistine engagements as one
    //     two-phase timeline, not two scenes and not narrated-only: each is
    //     two verses of action and neither stands alone (the M4/M5 bundling
    //     logic), and the text's own point is the contrast between the two
    //     answers David is given on the same ground. Deliberately a lighter
    //     violence treatment than `gilboa-battle` — the text gives one verb
    //     ("struck them"), no casualties and no named deaths, so no melee
    //     choreography is staged.
    //   • 5:1–5 (all Israel's covenant and the anointing over the united
    //     kingdom, at Hebron) gets **no fourth Hebron plaza scene**. It is
    //     compositionally a third repeat of the already-built
    //     `hebron-anointing`/`hebron-covenant` delegation-and-rite staging,
    //     while everything genuinely new about it is political geography —
    //     which the 2026-08-02 M4 review already ruled is atlas work, not
    //     scene work. Carried as `jerusalem-stronghold`'s opening cards plus
    //     a `/atlas` M6 phase (the two regions finally unify; the capital
    //     shifts Hebron → Jerusalem). This is the milestone's one genuinely
    //     contested call and is deliberately reversible — the Hebron geometry
    //     already exists, so adding the scene later is cheap — logged for
    //     confirmation as fable-review-queue #21.
    // Hard scope guard for the whole milestone: nothing from 2 Samuel 6
    // onward — no ark, no dynastic oracle, no Bathsheba, no temple — is
    // depicted or foreshadowed anywhere, including any gloss on the Solomon
    // and Nathan named in 5:14. Neither scene asserts a chronological order
    // relative to the other: 5:17's "stronghold" and the chapter's possibly
    // topical arrangement are disclosed, not resolved.
    // Briefs: docs/design/jerusalem-stronghold-brief.md,
    // docs/design/rephaim-valley-brief.md. Researcher gap cluster (Jerusalem/
    // Jebusite material culture and the extent-of-10th-century-Jerusalem
    // dispute, tsinnor philology, the Millo identification, Rephaim/
    // Baal-perazim geography, Phoenician cedar and craftsmen, the bakaim
    // species) opened as queue #22 — it gates named attributions and any move
    // past `design-placeholder`, not the builds. The tsinnor rendering bar is
    // queue #23; the depiction policy for narrated divine signs was queue #24.
    // M7 starts at 2 Samuel 6.
    // 2026-08-25 M6 sign-off (Sonnet; Fable retired 2026-08-24, see
    // CLAUDE.md's "Model policy — do not invoke Fable"): #21 and #23
    // re-confirmed as built (independently re-checked against the committed
    // code, not just trusted from prior notes); #24 ratified as ADR-013
    // (docs/architecture-decisions/adr-013-narrated-supernatural-depiction.md)
    // — narrated supernatural/divine signs are stated, never visualized,
    // project-wide going forward, not just for this scene. All three quoted
    // ESV spans (5:6b, 5:8a, 5:24) live-verified via WebSearch, matching
    // verbatim. Cascade executed per the M3–M5 precedent: `jerusalem-
    // stronghold`/`rephaim-valley` → released, `2sam-5` → released,
    // `jerusalem`/`valley-of-rephaim` → released, `f-2sam-5` → done, M6 →
    // released.
    status: 'released',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All Israel’s covenant with David and the anointing over the united kingdom at Hebron (2 Sam 5:1–5) — carried as context cards and a `/atlas` phase update, not a fourth Hebron scene (queue #21)',
      'The capture of the Jebusite stronghold and the founding of the City of David (`jerusalem-stronghold`) — the tsinnor crux, the Millo, and the extent of 10th-century Jerusalem all carried as `scholarlyViews`; no capture-route geometry rendered in any mode',
      'Hiram of Tyre’s cedar, carpenters, and masons, and David’s house shown under construction rather than finished — folded into `jerusalem-stronghold`, not a scene of its own',
      'The two Philistine engagements in the Valley of Rephaim as one two-phase scene (`rephaim-valley`) — a deliberately lighter battle treatment than `gilboa-battle`, with no invented divination apparatus and no visualized divine sign',
      'Atlas overlay extension: the two regions unify and the capital shifts from Hebron to Jerusalem — a `/atlas` M6 phase per ADR-011, not a 3D scene',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
