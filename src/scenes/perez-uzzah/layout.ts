import * as THREE from 'three';
import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local layout for perez-uzzah (ADR-006 conventions,
 * mirroring rephaim-valley/hebron-gate's layout.ts). 1 unit = 1 meter,
 * positions are x/z only (height sampled from terrain.ts at render time).
 * Kiriath-jearim's hill sits at the west end (x around -190); the route
 * corridor runs east through the threshing floor of Nacon/Perez-uzzah (a
 * disclosed placeholder point, no LocationEntry) to Obed-edom's house (also
 * a disclosed placeholder, the diversion point) — see
 * docs/design/perez-uzzah-brief.md, "Visual composition" and "Resolved
 * design calls".
 *
 * This file deliberately does not give the threshing floor or Obed-edom's
 * house a claimed, located identity distinct from "somewhere on the route
 * corridor west of Jerusalem" — the same Baal-perazim precedent
 * rephaim-valley's layout.ts documents: no LocationEntry, no atlas pin,
 * just a staged point used for this scene's own geometry and camera work.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

function rejectionSampleAnnulus(
  count: number,
  seed: number,
  center: [number, number],
  rMin: number,
  rMax: number,
  minSpacing: number,
  guardMul = 120,
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
// Kiriath-jearim (Baale-judah): the hill settlement, the house of Abinadab
// where the ark has rested and the new cart is loaded (6:3-4), and the
// gathering ground the procession departs from.

export const KIRIATH_JEARIM_CENTER: [number, number] = [-190, 0];

/** The house on the hill (claim-kiriath-jearim-form) — where the ark rested
 * and the new cart is loaded (b-new-cart). Near the hill's own crest, set
 * apart from the wider ambient settlement scatter below it. */
export const ABINADAB_HOUSE_POS: [number, number] = [-196, -16];

/** Where the marching column gathers before departure (b-gathering,
 * b-departure) — at the hill's base, between the house and the route. */
export const DEPARTURE_GATHER_CENTER: [number, number] = [-168, 14];

/** The route corridor's own starting point (b-music onward). */
export const ROUTE_START: [number, number] = [-150, 6];

// ---------------------------------------------------------------------------
// The threshing floor of Nacon / Perez-uzzah (b-stumble, b-strike,
// b-perez-uzzah, 6:6-8): one staged point, unlocated, no LocationEntry, no
// atlas pin — the Baal-perazim precedent. The naming (6:8) attaches to this
// same point; no second, separately-named position is staged for it.

export const THRESHING_FLOOR_POS: [number, number] = [10, -15];

// ---------------------------------------------------------------------------
// Obed-edom's house (b-diversion, b-blessing-obed-edom, 6:10-11): also
// staged, also unlocated — a modest household diversion point at the
// route's own end for this scene (no continuation toward Jerusalem is
// staged or implied; see the brief's "Resolved design calls").

export const OBED_EDOM_POS: [number, number] = [165, 45];

/** Where the ark/cart itself settles at the scene's end — close to, but not
 * literally inside, Obed-edom's house (b-diversion/b-blessing-obed-edom). */
export const ARK_SETTLE_POS: [number, number] = [OBED_EDOM_POS[0] - 10, OBED_EDOM_POS[1] - 8];

// ---------------------------------------------------------------------------
// The route corridor itself: one shared curve the column, the ark cart, and
// the named principals all ride, with per-figure lane offsets (the
// hebron-gate/rephaim-valley procession pattern) — never per-figure
// independent pathing.

export const ROUTE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(ROUTE_START[0], 0, ROUTE_START[1]),
    new THREE.Vector3(-70, 0, -8),
    new THREE.Vector3(THRESHING_FLOOR_POS[0], 0, THRESHING_FLOOR_POS[1]),
    new THREE.Vector3(92, 0, 12),
    new THREE.Vector3(OBED_EDOM_POS[0], 0, OBED_EDOM_POS[1]),
  ],
  false,
  'catmullrom',
  0.5,
);

/** Curve parameter `u` nearest the threshing floor's own staged point —
 * found by sampling, since a Catmull-Rom curve's `u` does not correspond
 * linearly to its control points (the same search pattern hebron-gate's
 * `ABNER_RETURN_GATE_U` uses). */
export const THRESHING_FLOOR_U: number = (() => {
  let bestU = 0;
  let bestD = Infinity;
  for (let i = 0; i <= 240; i++) {
    const u = i / 240;
    const p = ROUTE_CURVE.getPointAt(u);
    const d = (p.x - THRESHING_FLOOR_POS[0]) ** 2 + (p.z - THRESHING_FLOOR_POS[1]) ** 2;
    if (d < bestD) {
      bestD = d;
      bestU = u;
    }
  }
  return bestU;
})();

// ---------------------------------------------------------------------------
// Kiriath-jearim's house massing (claim-kiriath-jearim-form): a modest hill
// cluster around the settlement center, comparative to the excavated
// four-room/pillared house form (king-stager-2001) — no wall plan or gate
// asserted, this is a small hill settlement, not a fortified town.

export interface HouseSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
  h: number;
}

const KJ_HOUSE_TARGET = 9;
const KJ_HOUSE_MIN_SPACING = 9;

export const KIRIATH_JEARIM_HOUSES: HouseSpec[] = (() => {
  const rng = mulberry32(260605);
  const houses: HouseSpec[] = [];
  let guard = 0;
  while (houses.length < KJ_HOUSE_TARGET && guard++ < KJ_HOUSE_TARGET * 200) {
    const angle = rng() * Math.PI * 2;
    const r = 10 + rng() * 38;
    const x = KIRIATH_JEARIM_CENTER[0] + Math.cos(angle) * r;
    const z = KIRIATH_JEARIM_CENTER[1] + Math.sin(angle) * r * 0.85;
    if (houses.some((h) => (h.x - x) ** 2 + (h.z - z) ** 2 < KJ_HOUSE_MIN_SPACING ** 2)) continue;
    if (Math.hypot(x - ABINADAB_HOUSE_POS[0], z - ABINADAB_HOUSE_POS[1]) < 8) continue;
    houses.push({
      x,
      z,
      rot: rng() * Math.PI,
      w: 3.2 + rng() * 2.0,
      d: 2.9 + rng() * 1.8,
      h: 2.0 + rng() * 0.5,
    });
  }
  return houses;
})();

/** The house of Abinadab itself — larger than the ambient scatter, since it
 * has hosted the ark for a generation (1 Samuel 7:1-2, outside this
 * project's built timeline) and is where the new cart is loaded. */
export const ABINADAB_HOUSE_SPEC: HouseSpec = {
  x: ABINADAB_HOUSE_POS[0],
  z: ABINADAB_HOUSE_POS[1],
  rot: 0.4,
  w: 6.2,
  d: 5.4,
  h: 2.8,
};

/** Obed-edom's own modest household structure at the diversion point. */
export const OBED_EDOM_HOUSE_SPEC: HouseSpec = {
  x: OBED_EDOM_POS[0],
  z: OBED_EDOM_POS[1],
  rot: -0.3,
  w: 5.2,
  d: 4.6,
  h: 2.5,
};

// ---------------------------------------------------------------------------
// Crowd slot pools (rejection-sampled annuli, ADR-006 convention).

/** Ambient Kiriath-jearim settlement (~10-20 at high tier, static,
 * claim-ark-procession-cast-scale) — scattered around the hill, distinct
 * from the departure-gather crowd below it. */
export const KIRIATH_JEARIM_AMBIENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  24,
  260601,
  KIRIATH_JEARIM_CENTER,
  8,
  55,
  3.4,
);

/** The marching column's initial gathering slots at Kiriath-jearim (before
 * b-music's departure walk). Pool sized generously above the high-tier
 * target (~150-200) per the hebron-gate raid-party-pool convention. */
export const COLUMN_GATHER_SLOTS: [number, number][] = rejectionSampleAnnulus(
  220,
  260602,
  DEPARTURE_GATHER_CENTER,
  4,
  56,
  2.0,
);

/** The column's settle slots near Obed-edom's house at the scene's end
 * (b-diversion onward) — distinct ground from the household's own figures
 * below, short of the house itself (the procession halts near, not inside,
 * the household). */
export const COLUMN_SETTLE_CENTER: [number, number] = [
  OBED_EDOM_POS[0] - 24,
  OBED_EDOM_POS[1] - 18,
];
export const COLUMN_SETTLE_SLOTS: [number, number][] = rejectionSampleAnnulus(
  220,
  260603,
  COLUMN_SETTLE_CENTER,
  4,
  50,
  2.0,
);

/** Obed-edom's household (~5-10 at high tier, static) — close around the
 * house itself, distinct from the column's settle ground. */
export const OBED_EDOM_HOUSEHOLD_SLOTS: [number, number][] = rejectionSampleAnnulus(
  12,
  260604,
  OBED_EDOM_POS,
  3,
  16,
  2.2,
);
