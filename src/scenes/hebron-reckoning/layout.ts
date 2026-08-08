import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  DAVID_PLAZA_POS,
  GATE_LINTEL_Y,
  GATE_PASSAGE_CENTER,
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  GATE_WALLS,
  TERRACE_SEGMENTS,
  TOMB_ENTRANCE_INSET,
  TOMB_POS,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
  TOWN_HOUSES,
} from '../hebron-gate/layout';

/**
 * Deterministic, scene-local layout for hebron-reckoning (ADR-006
 * conventions, mirroring hebron-gate/ziklag-lament's layout.ts). 1 unit = 1
 * meter, same axis convention as the other two Hebron M5 scenes: -z is
 * north (uphill, toward the town), +z is south, +x is east. Mandatory
 * visual continuity (docs/design/hebron-reckoning-brief.md, "Visual
 * composition"): the town/terrace/gate-plaza massing and the tomb ground —
 * `TOWN_HOUSES`, `TERRACE_SEGMENTS`, `TOWN_CENTER`, `GATE_PLAZA_CENTER`,
 * `GATE_PASSAGE_CENTER`, `GATE_WALLS`, `GATE_LINTEL_Y`, `TOMB_POS`,
 * `TOMB_ENTRANCE_INSET`, `TOWN_AMBIENT_SLOTS` — are imported and re-exported
 * unchanged from hebron-gate (which itself re-exports most of these from
 * hebron-anointing). The burial "reuses hebron-gate's exact tomb
 * placement/form constants" per the brief; this is the mechanism.
 *
 * The receiving ground reuses `DAVID_PLAZA_POS` exactly — the same
 * courtyard/plaza that hosted the anointing (hebron-anointing), the
 * covenant feast (hebron-covenant), and David's disavowal (hebron-gate) now
 * receives the assassins and hosts the verdict.
 *
 * Genuinely new ground (the brief's hard scope: "the pool basin ... and
 * nothing else is new ground"): the pool of Hebron and the assassins'
 * Arabah-road approach.
 */
export {
  DAVID_PLAZA_POS,
  GATE_LINTEL_Y,
  GATE_PASSAGE_CENTER,
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  GATE_WALLS,
  TERRACE_SEGMENTS,
  TOMB_ENTRANCE_INSET,
  TOMB_POS,
  TOWN_AMBIENT_SLOTS,
  TOWN_CENTER,
  TOWN_HOUSES,
};

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

export function samplePath(
  curve: THREE.CatmullRomCurve3,
  step = 7,
): { pos: THREE.Vector3; yaw: number }[] {
  const length = curve.getLength();
  const n = Math.max(1, Math.floor(length / step));
  const out: { pos: THREE.Vector3; yaw: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const pos = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    out.push({ pos, yaw: Math.atan2(tan.x, tan.z) });
  }
  return out;
}

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 100,
): [number, number][] {
  const rng = mulberry32(seed);
  const slots: [number, number][] = [];
  let guard = 0;
  while (slots.length < count && guard++ < count * guardMul) {
    const angle = rng() * Math.PI * 2;
    const r = rMin + rng() * (rMax - rMin);
    const x = center[0] + Math.cos(angle) * r;
    const z = center[1] + Math.sin(angle) * r;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > minSpacing ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
}

// ---------------------------------------------------------------------------
// The pool of Hebron (4:12, `claim-hebron-pool-feature`): a modest basin
// east of the town, well clear of the town-house scatter. Must match
// `terrain.ts`'s basin feature exactly — this file is the source of truth,
// terrain.ts imports these constants rather than repeating the numbers.

export const POOL_CENTER: [number, number] = [170, -25];
export const POOL_RADIUS = 8;
export const POOL_FLAT_RADIUS = 3.4;

/** Where the two condemned are brought for the execution (4:12a) — a few
 * meters off the pool's own rim, at documentary distance, never staged at
 * the waterline itself. */
export const EXECUTION_GROUND: [number, number] = [POOL_CENTER[0] - 7, POOL_CENTER[1] + 5];

// ---------------------------------------------------------------------------
// The receiving ground: David's own plaza (reused, `DAVID_PLAZA_POS`),
// where the presentation, verdict, and command to execute all play.

/** Where Rechab and Baanah stand once they arrive, presenting the bundle
 * low, before David — a petitioners' distance, not thrust into his hands. */
export const PRESENTATION_POS: [number, number] = [5, -13];
export const RECHAB_STAND_POS: [number, number] = [4.2, -12.4];
export const BAANAH_STAND_POS: [number, number] = [6.2, -13.4];

// ---------------------------------------------------------------------------
// The Arabah road: the assassins' approach at first light (4:8a), entering
// from the east/northeast — a disclosed design choice (the text narrates
// only "they came... all night," 4:7b), kept visually distinct from
// hebron-anointing's south approach column and hebron-gate's own raid-return
// road so all three reads stay legible on the same shared ground. Threads
// past the pool of Hebron before reaching the plaza — the same ground the
// execution later returns to.

export const ARABAH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(360, 0, -95),
    new THREE.Vector3(270, 0, -78),
    new THREE.Vector3(200, 0, -55),
    new THREE.Vector3(POOL_CENTER[0] + 14, 0, POOL_CENTER[1] - 12),
    new THREE.Vector3(90, 0, -22),
    new THREE.Vector3(30, 0, -16),
    new THREE.Vector3(8, 0, -14),
  ],
  false,
  'catmullrom',
  0.5,
);

// ---------------------------------------------------------------------------
// David's attendants/guard (4:12a, "the young men"): a disclosed
// design-choice headcount, 8-14 at high tier (`claim-reckoning-cast-scale`).
// Gathered near the receiving ground throughout, behind/around David rather
// than on top of the presentation spot; a designated pair (`poses.ts`'s
// `ATTENDANT_ESCORT_INDICES`) escorts the condemned to the pool ground and
// carries out the execution. The bundle's own carry to the tomb
// (`bundlePose`) is animated directly, the same no-literal-bearer
// simplification `hebron-gate`'s `Bier.tsx` already uses for Abner's bier.

export const ATTENDANT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  20,
  241001,
  [DAVID_PLAZA_POS[0] - 8, DAVID_PLAZA_POS[1] - 4],
  3,
  12,
  1.9,
);

// ---------------------------------------------------------------------------
// Ambient town (`claim-reckoning-cast-scale`, ~10-20 at high tier): reuses
// hebron-gate's own `TOWN_AMBIENT_SLOTS` (imported above) — the same working
// town, days on from the killing of Abner, going about its own life while
// this second reckoning plays out at the plaza and the pool.
