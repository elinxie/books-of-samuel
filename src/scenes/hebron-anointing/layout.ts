import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for hebron-anointing (ADR-006
 * conventions, mirroring jabesh-burial/gilboa-battle's layout.ts). 1 unit =
 * 1 meter. -z is north (toward the rest of the former kingdom, deliberately
 * unshown from the default viewpoint — see docs/design/hebron-anointing-brief.md,
 * "Sightlines"); +z is south, the direction of the Negev/Ziklag, where the
 * approach column comes from; +x is east, the direction the messenger road
 * opens outward toward Gilead/the Jordan. Positions are x/z only — height is
 * sampled from terrain.ts at render time, never baked in here.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" (a)-(d)).

/** Tell Rumeida / the town hill (terrain.ts's mound center). */
export const TOWN_CENTER: [number, number] = [0, -70];
/** The open ground outside/near the gate where the assembly gathers. */
export const GATE_PLAZA_CENTER: [number, number] = [0, -14];
export const DAVID_PLAZA_POS: [number, number] = [0, -18];
export const ELDER_PLAZA_POS: [number, number] = [4, -21];
/** Two satellite household clusters flanking the plaza — "the towns of
 * Hebron" (2:3b) staged as a dispersed settling-in, not a single walled
 * interior. */
export const HOUSEHOLD_CAMP_CENTERS: [number, number][] = [
  [-95, -20],
  [92, -16],
];
/** South approach ridge, vp-approach-ridge's vantage. */
export const APPROACH_RIDGE_POS: [number, number] = [0, 165];
/** Where the messenger road exits the composition, east/outward. */
export const MESSENGER_EXIT_POS: [number, number] = [300, -30];
/** Simple two-post gate marker between the town cluster and the plaza. */
export const GATE_POSTS: [number, number][] = [
  [-9, -42],
  [9, -42],
];

// ---------------------------------------------------------------------------
// Routes.

/** The highland road David's men and their households climb from the south
 * (b-arrival, b-settling) — south (near the ridge) up through the valley to
 * the gate plaza. */
export const APPROACH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(24, 0, 260),
    new THREE.Vector3(8, 0, 175),
    new THREE.Vector3(-14, 0, 95),
    new THREE.Vector3(-2, 0, 35),
    new THREE.Vector3(4, 0, -2),
    new THREE.Vector3(0, 0, -14),
  ],
  false,
  'catmullrom',
  0.5,
);

/** The road the messengers to Jabesh-gilead depart along (b-jabesh-message)
 * — east from the plaza, opening outward. No arrival/travel beyond this
 * scene's own ground is ever shown (brief's hard scope guard: no Jabesh
 * geometry). */
export const MESSENGER_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, -14),
    new THREE.Vector3(60, 0, -18),
    new THREE.Vector3(140, 0, -14),
    new THREE.Vector3(220, 0, -20),
    new THREE.Vector3(300, 0, -30),
  ],
  false,
  'catmullrom',
  0.5,
);

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

// ---------------------------------------------------------------------------
// Town massing: a modest hill-town cluster on the north/upslope side of the
// gate, disclosed placeholder (claim-hebron-town-form) — no wall plan or
// gate-tower form asserted as excavated.

export interface HouseSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
  h: number;
}

const TOWN_HOUSE_TARGET = 14;
const TOWN_HOUSE_MIN_SPACING = 10;
const TOWN_SCATTER_MIN_R = 14;
const TOWN_SCATTER_MAX_R = 55;

export const TOWN_HOUSES: HouseSpec[] = (() => {
  const rng = mulberry32(220201);
  const houses: HouseSpec[] = [];
  let guard = 0;
  while (houses.length < TOWN_HOUSE_TARGET && guard++ < TOWN_HOUSE_TARGET * 200) {
    const angle = rng() * Math.PI * 2;
    const r = TOWN_SCATTER_MIN_R + rng() * (TOWN_SCATTER_MAX_R - TOWN_SCATTER_MIN_R);
    const x = TOWN_CENTER[0] + Math.cos(angle) * r;
    const z = TOWN_CENTER[1] + Math.sin(angle) * r * 0.85;
    // Keep the plaza-facing (south, +z) foot of the hill clear for the gate
    // and the open ground beyond it.
    if (z > TOWN_CENTER[1] + 30) continue;
    if (houses.some((h) => (h.x - x) ** 2 + (h.z - z) ** 2 < TOWN_HOUSE_MIN_SPACING ** 2)) {
      continue;
    }
    houses.push({
      x,
      z,
      rot: rng() * Math.PI,
      w: 3.4 + rng() * 2.2,
      d: 3.0 + rng() * 1.9,
      h: 2.1 + rng() * 0.6,
    });
  }
  return houses;
})();

// ---------------------------------------------------------------------------
// Terrace walls: dry-stone agricultural terracing on the town's south-facing
// (observer-facing) flank — new asset-terrace-walls. Concentric partial arcs
// around the town hill, each built from short tangential wall segments.

export interface TerraceSegment {
  x: number;
  z: number;
  yaw: number;
  len: number;
}

const TERRACE_RADII = [24, 36, 48, 60];
const TERRACE_ANGULAR_SPAN = 1.7; // radians either side of due-south
const TERRACE_SEGMENTS_PER_RING = 16;

export const TERRACE_SEGMENTS: TerraceSegment[] = (() => {
  const rng = mulberry32(220202);
  const out: TerraceSegment[] = [];
  for (const r of TERRACE_RADII) {
    for (let i = 0; i < TERRACE_SEGMENTS_PER_RING; i++) {
      const theta =
        -TERRACE_ANGULAR_SPAN + (i / (TERRACE_SEGMENTS_PER_RING - 1)) * 2 * TERRACE_ANGULAR_SPAN;
      const x = TOWN_CENTER[0] + Math.sin(theta) * r;
      const z = TOWN_CENTER[1] + Math.cos(theta) * r + (rng() - 0.5) * 2;
      out.push({ x, z, yaw: theta, len: 3.6 + rng() * 1.4 });
    }
  }
  return out;
})();

// ---------------------------------------------------------------------------
// Household camp structures (tents/lean-shelters, asset-household-camp) —
// separate from the household figures below, one per satellite cluster.

export interface CampStructure {
  x: number;
  z: number;
  rot: number;
  s: number;
}

const CAMP_STRUCTURES_PER_CLUSTER = 8;

export const HOUSEHOLD_CAMP_STRUCTURES: CampStructure[] = (() => {
  const rng = mulberry32(220203);
  const out: CampStructure[] = [];
  for (const [cx, cz] of HOUSEHOLD_CAMP_CENTERS) {
    let guard = 0;
    const placed: [number, number][] = [];
    while (
      placed.length < CAMP_STRUCTURES_PER_CLUSTER &&
      guard++ < CAMP_STRUCTURES_PER_CLUSTER * 100
    ) {
      const angle = rng() * Math.PI * 2;
      const r = 4 + rng() * 20;
      const x = cx + Math.cos(angle) * r;
      const z = cz + Math.sin(angle) * r;
      if (placed.some(([px, pz]) => (px - x) ** 2 + (pz - z) ** 2 < 6 ** 2)) continue;
      placed.push([x, z]);
      out.push({ x, z, rot: rng() * Math.PI, s: 0.85 + rng() * 0.4 });
    }
  }
  return out;
})();

// ---------------------------------------------------------------------------
// Crowd gathering slots (rejection-sampled, ADR-006 convention).

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 80,
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

/** David's approach-column retinue, gathered south-west of the plaza once
 * arrived — kept visually distinct from the assembly gathering at the plaza
 * itself (three distinct crowd-scale treatments, brief's "Scale
 * assumptions": never conflate David's ~600 men with the Judah assembly). */
export const RETINUE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  96,
  220301,
  [-56, 26],
  4,
  30,
  2.1,
);

/** The two household-camp gatherings ("the towns of Hebron", 2:3b) — a
 * disclosed design-choice headcount, not a ratio of the six hundred. */
export const HOUSEHOLD_SLOTS: [number, number][] = [
  ...rejectionSampleAnnulus(34, 220401, HOUSEHOLD_CAMP_CENTERS[0], 3, 24, 2.0),
  ...rejectionSampleAnnulus(34, 220402, HOUSEHOLD_CAMP_CENTERS[1], 3, 22, 2.0),
];

/** The representative Judah assembly gathered at/around the gate plaza —
 * explicitly labeled representative (claim-judah-assembly-scale), never a
 * literal tribal muster. Present throughout the scene (Hebron's own
 * townspeople; they do not "arrive" over the approach road). */
export const ASSEMBLY_SLOTS: [number, number][] = rejectionSampleAnnulus(
  224,
  220501,
  [0, -6],
  9,
  62,
  2.0,
);
