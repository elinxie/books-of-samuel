import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { GATE_PLAZA_CENTER, TOWN_CENTER } from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-covenant (ADR-006
 * conventions). `TOWN_CENTER` and `GATE_PLAZA_CENTER` are imported directly
 * from hebron-anointing/layout, not re-derived — same town, the same one
 * rendered gate, a few years later (docs/design/hebron-covenant-brief.md,
 * "Resolved design calls": "Reuse the hebron-anointing terrain spec and
 * layout constants ... Do not re-invent Hebron"). `TownAndPlaza.tsx`,
 * `TerraceWalls.tsx`, and `Vegetation.tsx` are reused directly (imported,
 * unmodified) from hebron-anointing in `HebronCovenantScene.tsx`, so this
 * file does not re-derive `TOWN_HOUSES`/`TERRACE_SEGMENTS` either — only the
 * geometry genuinely new to this scene lives here: the northern approach/
 * departure road (the brief's deliberate inverse of hebron-anointing's
 * southern approach column) and the feast ground, a courtyard distinct from,
 * but near, the reused gate plaza.
 *
 * Same axis convention as hebron-anointing: 1 unit = 1 meter, -z is north,
 * +z is south, +x is east. Abner's party approaches from large negative z
 * (deep in the former Israel-writ north) and departs the same way.
 */

export { TOWN_CENTER, GATE_PLAZA_CENTER };

// ---------------------------------------------------------------------------
// The northern road (b-arrival, 3:20a; b-peace, 3:21b) — the scene's
// symmetry axis, used in both directions. Ends at the reused
// GATE_PLAZA_CENTER: the same one gate hebron-anointing's southern approach
// column arrived at, reached from the opposite direction this time.

export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(16, 0, -300),
    new THREE.Vector3(-6, 0, -230),
    new THREE.Vector3(-26, 0, -160),
    new THREE.Vector3(-18, 0, -95),
    new THREE.Vector3(-6, 0, -40),
    new THREE.Vector3(0, 0, -14),
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

/** A point along the road at fraction `u` (0 = far north, 1 = gate plaza).
 * `reverse` flips the returned yaw to face back the way it came (for the
 * b-peace departure, walked at decreasing u) rather than recomputing a
 * mirrored curve. Exported for unit tests. */
export function roadPointAt(u: number, reverse = false): { x: number; z: number; yaw: number } {
  const cu = Math.min(1, Math.max(0, u));
  const pos = NORTH_ROAD_CURVE.getPointAt(cu);
  const tan = NORTH_ROAD_CURVE.getTangentAt(Math.min(0.999, Math.max(0.001, cu)));
  const yaw = reverse ? Math.atan2(-tan.x, -tan.z) : Math.atan2(tan.x, tan.z);
  return { x: pos.x, z: pos.z, yaw };
}

// ---------------------------------------------------------------------------
// The feast ground (b-feast/b-pledge, 3:20b-21a): a courtyard/plaza space
// dressed for the meal, distinct from — but close to — the reused gate
// plaza (brief's focal mass (c)). Modest and open-air; no hall or palace
// geometry (claim-feast-form). Two facing sides, deliberately echoing
// gibeon-pool's "one side of the pool, the other" staging for two councils
// facing each other — reused here for a shared meal instead of a
// confrontation, the same visual grammar carrying a very different meaning.

export const FEAST_GROUND_CENTER: [number, number] = [34, -26];
/** Abner's side — nearer the direction his party arrives from. */
export const ABNER_SIDE_CENTER: [number, number] = [34, -35];
/** David's side, facing Abner's across the dressed ground. */
export const DAVID_SIDE_CENTER: [number, number] = [34, -17];
/** Abner's own seat, at the head of his men, closest to David's side. */
export const ABNER_HEAD_POS: [number, number] = [34, -30];
/** David's own position, at the head of his escort, closest to Abner's side. */
export const DAVID_HEAD_POS: [number, number] = [34, -22];

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

/** Abner's twenty men's feast-ground slots — rendered literally 1:1
 * (2 Samuel 3:20's own exact count, claim-covenant-feast); Abner himself is
 * a separate principal rig at ABNER_HEAD_POS, not one of these twenty. */
export const ABNER_MEN_SLOTS: [number, number][] = rejectionSampleAnnulus(
  20,
  53101,
  ABNER_SIDE_CENTER,
  2,
  7.5,
  1.7,
);

/** David's escort/household presence at the feast — a disclosed design
 * count (claim-covenant-cast-scale), not a headcount the text gives. David
 * himself is a separate principal rig at DAVID_HEAD_POS, not one of these
 * slots. */
export const DAVID_ESCORT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  53102,
  DAVID_SIDE_CENTER,
  2,
  8.5,
  1.7,
);

// ---------------------------------------------------------------------------
// Ambient town background (claim-covenant-cast-scale): a working town on an
// ordinary day, deliberately far below hebron-anointing's 150-200-figure
// civic-assembly scale — a closed political meal, not a public founding.

export const TOWN_BACKGROUND_SLOTS: [number, number][] = rejectionSampleAnnulus(
  36,
  53103,
  TOWN_CENTER,
  16,
  58,
  3.2,
);
