import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic placeholder layout for the Amalekite-camp scene. 1 unit = 1
 * meter. A shallow open basin south of the Besor drainage: the raider camp
 * sprawls in loose clusters around fires across the basin floor; a low rise
 * to the north (negative z) is the scout's vantage David attacks from; the
 * four hundred escapees flee east (positive x). See
 * docs/design/amalekite-camp-brief.md, claim-camp-sprawl, claim-camp-scale.
 */

export interface CampCluster {
  center: [number, number];
  radius: number;
}

/** 14 loose fire clusters over several hundred meters (brief: 10–14). */
export const CLUSTERS: CampCluster[] = [
  { center: [-120, 40], radius: 9 },
  { center: [-85, -10], radius: 8 },
  { center: [-70, 95], radius: 10 },
  { center: [-40, 30], radius: 9 },
  { center: [-15, -25], radius: 8 },
  { center: [5, 25], radius: 9 }, // the feast-cluster viewpoint looks here
  { center: [15, 90], radius: 10 },
  { center: [55, 5], radius: 8 },
  { center: [70, 60], radius: 9 },
  { center: [100, 20], radius: 8 }, // eastern edge
  { center: [125, 85], radius: 9 },
  { center: [-140, 130], radius: 9 },
  { center: [45, 140], radius: 9 },
  { center: [90, -35], radius: 8 }, // eastern edge, north
];

/** The captives are held as a distinct grouped cluster among the sprawl. */
export const CAPTIVE_POS: [number, number] = [28, 42];

/** Fire points: one per cluster plus a small guard fire by the captives. */
export const FIRE_POINTS: [number, number][] = [...CLUSTERS.map((c) => c.center), [20, 50]];

/** Where David's force stages below the rise before the strike. */
export const STAGE_CENTER: [number, number] = [0, -75];
export const DAVID_STAGE: [number, number] = [0, -68];
export const EGYPTIAN_WAIT: [number, number] = [7, -72];

/** North approach: down from behind the scout's rise to the staging line. */
export const APPROACH_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(10, 0, -260),
    new THREE.Vector3(5, 0, -200),
    new THREE.Vector3(0, 0, -150),
    new THREE.Vector3(-1, 0, -105),
    new THREE.Vector3(0, 0, -70),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Camel flight direction: east and slightly north, past the east-edge viewpoint. */
export const FLIGHT_DIR: [number, number] = (() => {
  const len = Math.hypot(1, -0.2);
  return [1 / len, -0.2 / len];
})();

/** Eastern clusters the escapees mount from. */
const FLIGHT_BASES: [number, number][] = [
  [55, 5],
  [100, 20],
  [125, 85],
  [90, -35],
];

export interface CamelStart {
  x: number;
  z: number;
  delay: number;
  phase: number;
}

/** Deterministic camel mount points with staggered departure. */
export const CAMEL_STARTS: CamelStart[] = (() => {
  const rng = mulberry32(4017);
  const out: CamelStart[] = [];
  for (let i = 0; i < 48; i++) {
    const [bx, bz] = FLIGHT_BASES[i % FLIGHT_BASES.length];
    out.push({
      x: bx + (rng() * 2 - 1) * 14,
      z: bz + (rng() * 2 - 1) * 12,
      delay: rng() * 6,
      phase: rng() * Math.PI * 2,
    });
  }
  return out;
})();

/** Staging slots for the attackers below the rise, collision-spaced. */
export const ATTACKER_SLOTS: [number, number][] = (() => {
  const slots: [number, number][] = [];
  const rng = mulberry32(4021);
  let guard = 0;
  while (slots.length < 44 && guard++ < 4000) {
    const x = STAGE_CENTER[0] + (rng() * 2 - 1) * 30;
    const z = STAGE_CENTER[1] + (rng() * 2 - 1) * 14;
    if (slots.every(([sx, sz]) => (sx - x) ** 2 + (sz - z) ** 2 > 1.7 ** 2)) {
      slots.push([x, z]);
    }
  }
  return slots;
})();

/** Seated captive slots — a tight grid with jitter, guarded near one fire. */
export const CAPTIVE_SLOTS: [number, number][] = (() => {
  const rng = mulberry32(4023);
  const out: [number, number][] = [];
  for (let i = 0; i < 24; i++) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    out.push([
      CAPTIVE_POS[0] + (col - 2.5) * 1.7 + (rng() - 0.5) * 0.8,
      CAPTIVE_POS[1] + (row - 1.5) * 1.7 + (rng() - 0.5) * 0.8,
    ]);
  }
  return out;
})();

export interface PropSlot {
  x: number;
  z: number;
  yaw: number;
  scale: number;
}

/** Shelter/prop placement around each cluster: awnings, windbreaks, heaps, posts. */
function propRing(seed: number, perCluster: number, rMin: number, rMax: number): PropSlot[] {
  const rng = mulberry32(seed);
  const out: PropSlot[] = [];
  for (const cluster of CLUSTERS) {
    const n = perCluster - (rng() < 0.4 ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const angle = rng() * Math.PI * 2;
      const r = cluster.radius * (rMin + rng() * (rMax - rMin));
      out.push({
        x: cluster.center[0] + Math.cos(angle) * r,
        z: cluster.center[1] + Math.sin(angle) * r,
        yaw: rng() * Math.PI * 2,
        scale: 0.85 + rng() * 0.4,
      });
    }
  }
  return out;
}

export const AWNING_SLOTS: PropSlot[] = propRing(4031, 3, 0.7, 1.1);
export const WINDBREAK_SLOTS: PropSlot[] = propRing(4033, 2, 0.9, 1.4);
export const HEAP_SLOTS: PropSlot[] = propRing(4037, 2, 0.35, 0.7);
export const POST_SLOTS: PropSlot[] = propRing(4039, 3, 1.2, 1.7);

export interface PenSpot {
  x: number;
  z: number;
}

/** Livestock pens sit just outside alternating clusters, away from the basin center. */
export const PEN_CENTERS: PenSpot[] = CLUSTERS.filter((_, i) => i % 2 === 0).map((c) => {
  const len = Math.hypot(c.center[0] - 10, c.center[1] - 45) || 1;
  return {
    x: c.center[0] + ((c.center[0] - 10) / len) * (c.radius + 8),
    z: c.center[1] + ((c.center[1] - 45) / len) * (c.radius + 8),
  };
});

/** Distance from (x, z) to the nearest cluster center — drives grazing wear. */
export function distanceToCamp(x: number, z: number): number {
  let best = Infinity;
  for (const c of CLUSTERS) {
    const d = Math.hypot(x - c.center[0], z - c.center[1]);
    if (d < best) best = d;
  }
  return best;
}
