import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import { TOWN_CENTER } from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-gate (ADR-006 conventions).
 * 1 unit = 1 meter; same axis convention as hebron-anointing/hebron-covenant
 * (-z north, +z south, +x east). `TOWN_CENTER`/`GATE_PLAZA_CENTER` (and, via
 * the reused `TownAndPlaza`/`TerraceWalls`/`Vegetation` components, the town
 * massing and terrace rings themselves) are imported directly from
 * hebron-anointing rather than redefined here — the "identical Hebron
 * continuity rule" hebron-covenant established and this scene's brief
 * repeats. This is the same place a third time: the anointing (M4), the
 * covenant feast (hebron-covenant), and now the killing at its own gate.
 *
 * The one genuinely new structure is the gate passage itself (below) — the
 * brief's "modest chambered gateway," disclosed `design-placeholder`
 * (claim-hebron-gate-form), explicitly not a monumental six-chamber
 * Solomonic-type gate. It sits at the same location hebron-anointing's
 * simple two-post gate marker already occupies (`GATE_POSTS`,
 * [±9, -42]) — that marker keeps rendering (TownAndPlaza is reused
 * unmodified) as the wider plaza-facing boundary; this scene's passage
 * structure is the narrower, deeper "midst of the gate" 3:27 requires,
 * nested just inside it.
 */

export interface FigureSlot {
  x: number;
  z: number;
  yaw: number;
}

// ---------------------------------------------------------------------------
// The gate passage (claim-hebron-gate-form, asset-hebron-gate-passage): a
// short roofed corridor between the town cluster (north, TOWN_CENTER) and
// the open gate plaza (south, GATE_PLAZA_CENTER), with two small flanking
// chamber recesses — "two-chamber," not the six-chamber Solomonic-type gate
// the brief explicitly rules out. The corridor's own long axis runs
// north-south; its interior (the roofed span, including the chamber mouths)
// reads as the "gateway's interior shadow" the aside is staged into.

export const GATE_PASSAGE_CENTER: [number, number] = [0, -42];
/** Plaza-facing (outer, south) threshold. */
export const GATE_PASSAGE_SOUTH_Z = -38;
/** Town-facing (inner, north) threshold. */
export const GATE_PASSAGE_NORTH_Z = -46;
export const GATE_CORRIDOR_HALF_WIDTH = 2.2;
export const GATE_CHAMBER_WEST_CENTER: [number, number] = [-5.5, -42];
export const GATE_CHAMBER_EAST_CENTER: [number, number] = [5.5, -42];
/** Roof span — covers the corridor and both chamber mouths, the one
 * continuous shaded interior. */
export const GATE_ROOF_HALF_SPAN_X = 8.5;

/** "The midst of the gate" (3:27) — where Joab draws Abner aside, into the
 * west chamber's mouth, off the direct plaza-to-town sightline and under
 * the roof's shade. Not the chamber's exact back wall (that would read as
 * hiding, an invented detail the text doesn't give) — the threshold of its
 * shadow is enough to stage "aside" honestly. */
export const ASIDE_POINT: [number, number] = [-4.2, -42];

/** The passage's two thresholds, where Abner and Joab enter/exit. */
export const GATE_SOUTH_THRESHOLD: [number, number] = [0, GATE_PASSAGE_SOUTH_Z];
export const GATE_NORTH_THRESHOLD: [number, number] = [0, GATE_PASSAGE_NORTH_Z];

// ---------------------------------------------------------------------------
// Principal stand positions near the plaza (b-joab-returns through
// b-david-hears): David and Joab's protest exchange, well outside the
// gate's interior shadow — David is never staged with a sightline into the
// aside/strike ("but David did not know it," 3:26b).

export const DAVID_GATE_POS: [number, number] = [10, -17];
export const JOAB_PROTEST_POS: [number, number] = [4, -20];
/** Where Joab waits, just outside the gate's south threshold, before
 * Abner re-enters the scene (b-recall through the start of b-gate-aside). */
export const JOAB_GATE_WAIT_POS: [number, number] = [1.4, -36];
/** Abishai's position near the gate (3:30's shared culpability) — present,
 * never the one who strikes. */
export const ABISHAI_GATE_POS: [number, number] = [3, -39];
/** Abishai's held position for the rest of the scene once the funeral
 * beats begin — a background presence, never tracked to the graveside. */
export const ABISHAI_HOLD_POS: [number, number] = [24, -26];

// ---------------------------------------------------------------------------
// Joab's returning raid party (3:22, "from a raid, bringing much spoil") —
// a short arrival route from the north-east, distinct from hebron-anointing's
// southern approach and hebron-covenant's northern road, ending at a
// gathering cluster near the plaza.

export const RAID_GATHER_CENTER: [number, number] = [24, -20];

export const RAID_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(230, 0, -170),
    new THREE.Vector3(150, 0, -105),
    new THREE.Vector3(88, 0, -52),
    new THREE.Vector3(48, 0, -26),
    new THREE.Vector3(24, 0, -20),
  ],
  false,
  'catmullrom',
  0.5,
);

export interface RoadPoint {
  x: number;
  z: number;
  yaw: number;
}

export function raidRoadPointAt(u: number): RoadPoint {
  const c = Math.min(1, Math.max(0, u));
  const pos = RAID_ROAD_CURVE.getPointAt(c);
  const tan = RAID_ROAD_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, c)));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

export const RAID_ROAD_START: RoadPoint = raidRoadPointAt(0);
export const RAID_ROAD_END: RoadPoint = raidRoadPointAt(1);

// ---------------------------------------------------------------------------
// The tomb ground (claim-abner-tomb-form): a modest rock-cut entry on the
// town hill's east flank — explicitly not the medieval "Tomb of Abner"
// tradition/site.

export const TOMB_POS: [number, number] = [58, -60];
export const TOMB_ENTRY_YAW = Math.atan2(
  TOWN_CENTER[0] - TOMB_POS[0],
  TOWN_CENTER[1] - TOMB_POS[1],
);

// ---------------------------------------------------------------------------
// The procession route (3:31-32a): from the gate passage (where Abner
// fell) out through the plaza and around to the tomb — "the funeral's
// spine," per the brief.

export const PROCESSION_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(ASIDE_POINT[0], 0, ASIDE_POINT[1]),
    new THREE.Vector3(0, 0, -34),
    new THREE.Vector3(16, 0, -22),
    new THREE.Vector3(40, 0, -30),
    new THREE.Vector3(58, 0, -55),
    new THREE.Vector3(TOMB_POS[0], 0, TOMB_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

export function processionPointAt(u: number): RoadPoint {
  const c = Math.min(1, Math.max(0, u));
  const pos = PROCESSION_CURVE.getPointAt(c);
  const tan = PROCESSION_CURVE.getTangentAt(Math.max(0.001, Math.min(0.999, c)));
  return { x: pos.x, z: pos.z, yaw: Math.atan2(tan.x, tan.z) };
}

export const PROCESSION_END_POINT: RoadPoint = processionPointAt(1);

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
// Rejection-sampled annulus helper (ADR-006 convention, duplicated locally
// per "layout code stays local" — see docs/architecture.md).

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

/** Joab's raid party's gathering slots — a disclosed design count (no
 * narrated headcount for the raid party itself, only "much spoil"),
 * ≈15-25 figures at high quality tier (claim-gate-cast-scale). */
export function buildRaidPartySlots(count: number, seed = 44101): [number, number][] {
  return rejectionSampleAnnulus(count, seed, RAID_GATHER_CENTER, 3, 16, 1.8);
}

/** The mourning assembly's starting/standing slots, gathered around the
 * plaza before the procession beat — "all the people" (3:31-32, 35-36),
 * a disclosed representative crowd, ≈60-90 figures at high quality tier,
 * smaller than hebron-anointing's civic-founding assembly (a funeral, not
 * a founding). */
export const MOURNING_GATHER_CENTER: [number, number] = [8, -12];
export function buildMourningGatherSlots(count: number, seed = 44201): [number, number][] {
  return rejectionSampleAnnulus(count, seed, MOURNING_GATHER_CENTER, 6, 46, 2.0);
}

/** The mourning assembly's final slots around the tomb ground, settled
 * there by the burial-weep beat and held through the rest of the scene. */
export function buildTombGatherSlots(count: number, seed = 44202): [number, number][] {
  return rejectionSampleAnnulus(count, seed, TOMB_POS, 4, 24, 2.0);
}

/** Ambient townsfolk — "a working town" continuing around the killing and
 * funeral, deliberately far below the mourning assembly's scale. Disclosed
 * design-choice count, scaled by quality tier. */
export function buildTownBackgroundSlots(count: number, seed = 44301): [number, number][] {
  return rejectionSampleAnnulus(count, seed, TOWN_CENTER, 16, 68, 2.4);
}
