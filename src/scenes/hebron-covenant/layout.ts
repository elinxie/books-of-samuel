import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';
import {
  GATE_PLAZA_CENTER,
  GATE_POSTS,
  TERRACE_SEGMENTS,
  TOWN_CENTER,
  TOWN_HOUSES,
} from '../hebron-anointing/layout';

/**
 * Deterministic, scene-local layout for hebron-covenant (ADR-006
 * conventions). This is literally the same Hebron as `hebron-anointing` — the
 * town massing, terrace walls, and gate posts are imported directly, not
 * regenerated (`TOWN_CENTER`/`GATE_PLAZA_CENTER`/`GATE_POSTS`/`TOWN_HOUSES`/
 * `TERRACE_SEGMENTS`, per the brief's "do not re-invent Hebron"). This file
 * only adds the staging this scene needs: the northern approach/departure
 * road (the deliberate inverse of hebron-anointing's southern approach —
 * Abner comes from the direction of Israel/Benjamin territory, north of
 * Judah), the feast ground, and the crowd slot pools for Abner's twenty,
 * David's escort, and the town's ambient background. 1 unit = 1 meter;
 * positions are x/z only, height sampled from terrain.ts at render time.
 */

export { GATE_PLAZA_CENTER, GATE_POSTS, TERRACE_SEGMENTS, TOWN_CENTER, TOWN_HOUSES };

// ---------------------------------------------------------------------------
// Focal centers (brief, "Visual composition" (a)-(d)).

/** Where David and Abner meet as the party arrives/is received, and where
 * David stops to watch the departure — just inside the gate plaza. */
export const ARRIVAL_MEET_POS: [number, number] = [4, -16];
/** Where David stands/waits before Abner's party arrives — he already lives
 * at Hebron (hebron-anointing); nothing about this scene moves his household. */
export const DAVID_REST_POS: [number, number] = [-4, -22];
/** Abner's twenty stand here briefly once received, before moving to the
 * feast ground. */
export const GATE_LINEUP_CENTER: [number, number] = [10, -10];

/** The feast ground: a courtyard space distinct from, but close to, the gate
 * plaza — "a prepared open-air meal in a courtyard/plaza space consistent
 * with hebron-anointing's existing town rendering" (brief). No hall, no
 * throne room (claim-feast-form, claim-hebron-town-form). West of the gate
 * plaza, beyond the terrace rings (which stop at radius 60 from TOWN_CENTER;
 * this sits at ~71), open ground. */
export const FEAST_GROUND_CENTER: [number, number] = [-30, -6];
/** David's side of the feast, west of center; Abner's side, east of center —
 * "a rival kingdom's strongman received at table" (brief, "Historical
 * intent"), the two sides facing each other across the shared ground. */
export const DAVID_FEAST_SIDE_CENTER: [number, number] = [-36, -6];
export const ABNER_FEAST_SIDE_CENTER: [number, number] = [-24, -6];
export const DAVID_FEAST_POS: [number, number] = [-34, -6];
export const ABNER_FEAST_POS: [number, number] = [-26, -6];

// ---------------------------------------------------------------------------
// The northern road: the deliberate inverse of hebron-anointing's southern
// approach column (David came up from the Negev; the north now comes to
// him). Used twice — b-arrival and the b-peace departure — the scene's
// symmetry axis. Offset west of the town hill/terrace ring (which occupies
// roughly the near-full-circle less the due-north wedge) so it never crosses
// TOWN_HOUSES or TERRACE_SEGMENTS.

export const NORTH_ROAD_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-90, 0, -260),
    new THREE.Vector3(-100, 0, -175),
    new THREE.Vector3(-90, 0, -95),
    new THREE.Vector3(-50, 0, -32),
    new THREE.Vector3(-15, 0, -18),
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

/** Abner's twenty stand here briefly right after arriving (b-arrival),
 * before walking to the feast ground — a literal 3:20 count, buffered. */
export const GATE_LINEUP_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  230101,
  GATE_LINEUP_CENTER,
  2,
  11,
  1.8,
);

/** Abner's twenty, seated at the feast ground on Abner's side. */
export const ABNER_SEAT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  230102,
  ABNER_FEAST_SIDE_CENTER,
  2,
  8,
  1.8,
);

/** David's escort — a disclosed design count (~15-25 at high tier, brief's
 * "Scale assumptions"), not a headcount the text gives — gathered on David's
 * side of the feast ground. */
export const DAVID_ESCORT_SEAT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  30,
  230103,
  DAVID_FEAST_SIDE_CENTER,
  2,
  8,
  1.8,
);

/** Town background: ambient townsfolk on an ordinary day (~20-30 at high
 * tier, deliberately far below hebron-anointing's civic assembly), scattered
 * near their homes rather than gathered for the feast. */
export const TOWN_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  36,
  230104,
  TOWN_CENTER,
  10,
  58,
  2.2,
);

// ---------------------------------------------------------------------------
// Feast dressing (new asset-feast-props, claim-feast-form): a small,
// deterministic scatter of low mats and shared vessels between the two
// sides — "mats/low tables, shared vessels" (brief). One instanced prop
// family, disclosed placeholder.

export interface FeastPropSpec {
  x: number;
  z: number;
  rot: number;
  kind: 'mat' | 'vessel';
}

export const FEAST_PROPS: FeastPropSpec[] = (() => {
  const rng = mulberry32(230201);
  const out: FeastPropSpec[] = [];
  const [cx, cz] = FEAST_GROUND_CENTER;
  for (let i = 0; i < 6; i++) {
    const x = cx + (rng() - 0.5) * 15;
    const z = cz + (rng() - 0.5) * 6;
    out.push({ x, z, rot: rng() * Math.PI, kind: 'mat' });
  }
  for (let i = 0; i < 9; i++) {
    const x = cx + (rng() - 0.5) * 13;
    const z = cz + (rng() - 0.5) * 5;
    out.push({ x, z, rot: rng() * Math.PI, kind: 'vessel' });
  }
  return out;
})();
