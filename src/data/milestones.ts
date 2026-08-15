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
    // 2026-08-15 scope pass — Sonnet, PROVISIONAL (fable-review-queue #21):
    // Fable's fable-architect call errored on the monthly spend limit before
    // any work started (same recurring constraint as 2026-07-22/2026-08-10);
    // proceeded under docs/model-handoff.md's documented fallback rather than
    // blocking. Unlike M4/M5, chapter 5 alone is NOT thin — it holds three
    // distinct stageable episodes (all-Israel covenant at Hebron 5:1-5; the
    // Jebusite conquest and City of David founding 5:6-12; two Philistine
    // campaigns 5:17-25) plus a thin genealogical list (5:13-16, folded as a
    // closing caption, no separate scene) — so M6 = 2 Sam 5 alone, no
    // bundling. Chapter 6 (the ark's arrival, Uzzah's death, David's dance)
    // is its own clear narrative unit and becomes M7; chapter 7 (Nathan's
    // oracle/Davidic covenant) has no stageable physical action and is
    // deferred past M7 without a build commitment yet — likely a
    // captions/study-page treatment rather than a scene, a call for a real
    // Fable pass once M7 is scoped, not decided here.
    //
    // Three scenes, one new location (`jerusalem`, first Jerusalem geometry
    // in the project) plus one new placeholder location
    // (`valley-of-rephaim`), and an atlas extension:
    // 1. `hebron-unification` (5:1-5) — all Israel's elders come to David at
    //    Hebron; distinct from M4's `hebron-anointing` (Judah only) — this is
    //    the reunification the M4/M5 atlas's divided-kingdom regions have
    //    been tracking toward. Reuses Hebron terrain/town-form directly.
    // 2. `jerusalem-conquest` (5:6-12) — the Jebusite stronghold taken, "the
    //    blind and the lame" taunt (5:6, 5:8 — one of Samuel's most textually
    //    obscure verses; caption-only with scholarlyViews, never visualized,
    //    no disabled figures staged), the City of David naming, the Millo,
    //    and Hiram of Tyre's cedar/craftsmen folded in as a closing beat
    //    (5:11-12) rather than a separate scene. First use of the new
    //    `jerusalem` location (researched this session: 5 new source cards,
    //    the maximalist-vs-minimalist 10th-century-scale dispute carried as
    //    the location's own scholarlyViews, resolved by neither this pass nor
    //    the brief — render at the modest, disclosed-placeholder end of the
    //    range per the project's anachronism discipline, not the monumental
    //    end). 5:13-16's sons/daughters list folds into this scene's closing
    //    card as text only — no new named characters, no genealogy geometry.
    // 3. A Philistine-battle scene covering both campaigns (5:17-21
    //    Baal-perazim, 5:22-25 Valley of Rephaim) — one scene, not two
    //    (each campaign is brief in the text; splitting would thin both).
    //    Uses the new `valley-of-rephaim` placeholder location — the general
    //    region (the plain southwest of the City of David) is reasonably
    //    placed, but Baal-perazim's precise site is not independently fixed;
    //    disclosed as `design-placeholder`. Scale should stay well under
    //    `gilboa-battle`'s ~325-figure ceiling — the text describes a rout
    //    ("breach of waters") and a divinely-signaled advance, not sustained
    //    mutual combat; no new named-character killing, so ADR-009's
    //    named-killing template does not apply here.
    // 4. Atlas extension: M6 is where the M4/M5 divided-kingdom regions
    //    finally unify — the M5 atlas's hard "no unified/merged kingdom
    //    drawn" guard is explicitly lifted here, not before. `ui-engineer`
    //    work once the three scenes are built.
    //
    // Build order recommendation (docs/next-run.md carries the authoritative
    // copy): `hebron-unification` first (cheapest, reuses Hebron directly,
    // no new location risk), then `jerusalem-conquest` (the milestone's
    // load-bearing scene — new location, most historically contested), then
    // the Philistine-battle scene, then the atlas extension.
    //
    // Provisional flag: this scope call, the location's maximalist/
    // minimalist framing, and the "blind and the lame" caption-only call all
    // need a real Fable pass before any M6 scene ships past `in-progress`
    // (fable-review-queue #21) — same discipline as M4's 2026-07-22 fallback.
    status: 'planned',
    passageRefs: ['2 Samuel 5'],
    goals: [
      'All Israel anoints David king at Hebron, ending the Judah/Israel split (`hebron-unification`)',
      'The Jebusite conquest of Jerusalem and the founding of the City of David (`jerusalem-conquest`)',
      'The Philistine campaigns at Baal-perazim and the Valley of Rephaim',
      'Atlas extension: the divided-kingdom regions unify',
    ],
  },
];

export const MILESTONES_BY_ID: ReadonlyMap<string, Milestone> = new Map(
  MILESTONES.map((m) => [m.id, m]),
);
