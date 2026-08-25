import type { FeatureEntry } from './types';

export const FEATURES: FeatureEntry[] = [
  // Done in the current release
  {
    id: 'f-landing',
    title: 'Landing page with entry selectors',
    description: 'Enter by passage, location, or historical period.',
    status: 'done',
    milestoneId: 'M0',
  },
  {
    id: 'f-observer-camera',
    title: 'First-person observer camera',
    description: 'Invisible neutral observer: walk (pointer-lock, WASD) and inspect (orbit) modes.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-ziklag-scene',
    title: 'Ziklag aftermath scene',
    description: 'Burned frontier town with smoke, ruin state, fields, and labels.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-reenactment',
    title: 'Scripted reenactment: the return of the six hundred',
    description: 'Timeline-driven return, grief, inquiry, and departure beats (1 Sam 30:1–9).',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-timeline',
    title: 'Timeline / replay controls',
    description: 'Play, pause, restart, scrub, and speed control over the scene script.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-teleport',
    title: 'Teleport menu',
    description: 'Jump between viewpoints within a scene; scene list shows planned regions.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-toggle-sources',
    title: 'Sources toggle',
    description: 'Show/hide source and basis badges throughout the UI.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-toggle-notes',
    title: 'Scholarly notes toggle',
    description: 'Show/hide scholarly views and uncertainty notes in labels and panels.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-toggle-labels',
    title: 'Labels toggle',
    description: 'Show/hide in-scene labels to simply inhabit the scene.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-quality-modes',
    title: 'Quality modes',
    description: 'Study (performance), Balanced, and High-fidelity rendering profiles.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-basis-badges',
    title: 'Evidence-basis distinction',
    description:
      'Visible distinction between biblical text, archaeology, comparative ANE, scholarly reconstruction, and placeholder design.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-certainty-panel',
    title: '“What is certain vs reconstructed?” panel',
    description: 'Per-scene claim list grouped by confidence with scholarly alternatives.',
    status: 'done',
    milestoneId: 'M1',
  },
  {
    id: 'f-progress-page',
    title: 'Progress page',
    description: 'Coverage by biblical chapter and by release milestone.',
    status: 'done',
    milestoneId: 'M0',
  },
  {
    id: 'f-features-page',
    title: 'Feature list page',
    description: 'This list, grouped by status.',
    status: 'done',
    milestoneId: 'M0',
  },
  {
    id: 'f-sources-page',
    title: 'Bibliography / sources page',
    description: 'Source cards, ESV attribution, and copyright/permissions statement.',
    status: 'done',
    milestoneId: 'M0',
  },
  {
    id: 'f-method-page',
    title: 'Reconstruction method page',
    description: 'How claims, confidence levels, and scholarly disputes drive the scenes.',
    status: 'done',
    milestoneId: 'M0',
  },

  // In progress
  {
    id: 'f-citation-verification',
    title: 'Citation verification pass',
    description: 'Verify seeded bibliographic details and proponent attributions.',
    status: 'in-progress',
    milestoneId: 'M1',
  },

  // Planned
  {
    id: 'f-theological-commentary',
    title: 'Theological commentary layer',
    description:
      'Deliberately deferred; will be a separate toggle, distinct from historical reconstruction.',
    status: 'planned',
    milestoneId: 'M4',
  },
  {
    id: 'f-besor-scene',
    title: 'Brook Besor scene',
    description: 'Wadi crossing, the exhausted two hundred, the Egyptian servant.',
    status: 'done',
    milestoneId: 'M2',
  },
  {
    id: 'f-amalekite-camp',
    title: 'Amalekite camp scene',
    description: 'Raiders’ camp, twilight attack, recovery of the captives.',
    status: 'done',
    milestoneId: 'M2',
  },
  {
    id: 'f-spoil-rule',
    title: 'Spoil distribution scene',
    description:
      'The Besor statute: those with the baggage share alike. Staged as the closing beats of the besor-crossing scene rather than a separate scene.',
    status: 'done',
    milestoneId: 'M2',
  },
  {
    id: 'f-gilboa',
    title: 'Mount Gilboa battle',
    description: 'Honest, non-sensational rendering with reduced-intensity mode.',
    status: 'done',
    milestoneId: 'M3',
  },
  {
    id: 'f-beth-shan',
    title: 'Beth-shan display scene',
    description: 'The city and the wall; Egyptian-garrison history context.',
    status: 'done',
    milestoneId: 'M3',
  },
  {
    id: 'f-jabesh',
    title: 'Jabesh-gilead retrieval',
    description: 'Night route across the Jordan and the burial under the tamarisk.',
    status: 'done',
    milestoneId: 'M3',
  },
  {
    id: 'f-2sam',
    title: '2 Samuel 1–2 scenes',
    description: 'Lament, Hebron anointing, divided-kingdom geography.',
    // All three M4 scenes built; approved as built at the 2026-08-02 Fable
    // review (queue #18 resolved). The divided-kingdom atlas overlay
    // (/atlas) also landed per that review's binding design constraints.
    // Done at the 2026-08-02 Fable M4 release pass: queue #19's four
    // citation gates all closed and the full M4 cascade flipped together.
    status: 'done',
    milestoneId: 'M4',
  },
  {
    id: 'f-2sam-3-4',
    title: '2 Samuel 3–4 scenes',
    description:
      'The Hebron covenant feast, the killing of Abner at the gate, and the reckoning with Rechab and Baanah — plus the /atlas overlay’s 2 Samuel 3–4 phase.',
    // Added at the 2026-08-10 M5 sign-off review. M5 had no feature entry at
    // all (M3 used three per-scene features, M4 one shared `f-2sam` scoped to
    // "2 Samuel 1–2 scenes" and now `done`), so M5's scene work was invisible
    // on the Features page. All three scenes plus the atlas phase are built and
    // approved as built; `done` gates on queue #20, per the M4 `f-2sam`
    // precedent. 2026-08-12 Fable M5 release pass: queue #20 fully closed —
    // done.
    status: 'done',
    milestoneId: 'M5',
  },
  {
    id: 'f-2sam-5',
    title: '2 Samuel 5 scenes',
    description:
      'The Jebusite stronghold and the founding of the City of David, the two Philistine engagements in the Valley of Rephaim — plus the /atlas overlay’s 2 Samuel 5 phase (capital shift, region unification).',
    // Added 2026-08-25, same gap as f-2sam-3-4's: M6 had no feature entry at
    // build time. Both scenes plus the atlas phase are built and released
    // together at the 2026-08-25 M6 sign-off/release pass (queue #21/#22/#23
    // confirmed, #24 resolved as ADR-013) — done from the start, per the
    // f-2sam-3-4 precedent of adding the entry once the milestone's status
    // is already settled rather than mid-build.
    status: 'done',
    milestoneId: 'M6',
  },
  {
    id: 'f-dem-terrain',
    title: 'Real-elevation terrain',
    description:
      'DEM-derived landscapes for identified sites. Re-scoped M2 → M3 at the M2 sign-off: no M2 scene is at an identified site (Ziklag disputed, the camp unlocatable), and the asset records already target M3 for DEM replacements.',
    status: 'planned',
    milestoneId: 'M3',
  },
  {
    id: 'f-period-figures',
    title: 'Period-dressed figures',
    description:
      'Procedural skinned figures with period dress landed ahead of schedule (ADR-010, src/engine/characters); remaining M3 work is historical-detail review of dress/gear and pack animals.',
    status: 'in-progress',
    milestoneId: 'M3',
  },
  {
    id: 'f-esv-api',
    title: 'ESV API full-text integration',
    description: 'Full passage text via Crossway’s ESV API with compliant attribution.',
    status: 'planned',
    milestoneId: 'M4',
  },
  {
    id: 'f-overview-map',
    title: 'Regional overview map',
    description:
      'Political geography of Israel, Judah, Philistia, and the Amalekite fringe with confidence shading.',
    // A first, narrower version of this idea shipped under f-2sam/M4 instead:
    // the divided-kingdom atlas overlay (`/atlas`, `AtlasPage`) covers only
    // Israel vs. Judah (2 Sam 2:8–11), not Philistia or the Amalekite fringe.
    // This feature stays `planned` for that wider scope.
    status: 'planned',
    milestoneId: 'M3',
  },
];
