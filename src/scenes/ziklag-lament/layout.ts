import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic, scene-local staging for ziklag-lament. This is literally
 * the same town as `ziklag-aftermath`, three narrative days later (see
 * docs/design/ziklag-lament-brief.md, "Resolved design calls" — "Reused
 * settlement, advanced state") — so the settlement geometry itself (houses,
 * walls, gate, well) is imported directly from `../ziklag/layout`, not
 * regenerated here. This file only adds the new staging this scene needs:
 * the messenger's approach (reusing the same gate road), the plaza
 * conversation slots, and the lament rise near the wall.
 */
export { APPROACH_CURVE as GATE_APPROACH_CURVE } from '../ziklag/layout';

/** Small, seeded rejection-sampled ring of slots around a center — the same
 * technique jabesh-burial's layout.ts uses for crowd gathering, here sized
 * for a witness cluster (6-10 figures), never a mustered-army ratio (see the
 * brief's "Scale assumptions"). */
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

// ---------------------------------------------------------------------------
// The plaza: the same open center used by ziklag-aftermath's vp-plaza. The
// messenger falls to the ground here before David (1:2), gives his report,
// and produces the crown and armlet (1:10); David's judgment and the
// execution happen here too.

export const PLAZA_CENTER: [number, number] = [0, -6];
export const DAVID_PLAZA_POS: [number, number] = [3, -4];
export const MESSENGER_FALL_POS: [number, number] = [-2.5, -3];

/** Ten witness slots generated; the scene uses the first `witnessCount`
 * (6-10, see the brief) — a disclosed small headcount, not a scaled fraction
 * of the narrated six hundred. */
export const WITNESS_PLAZA_SLOTS: [number, number][] = rejectionSampleAnnulus(
  10,
  130118,
  [DAVID_PLAZA_POS[0] + 1.5, DAVID_PLAZA_POS[1] + 3.5],
  3,
  9,
  2.0,
);

/** Index into the witness slots singled out as the one who carries out the
 * execution (1:15b) — staging only, never a named/invented figure. */
export const EXECUTIONER_INDEX = 0;

// ---------------------------------------------------------------------------
// The lament rise: a deliberately separate, quieter space near the wall, at
// dusk, apart from the plaza's interrogation/judgment beats (brief, "Visual
// composition"). East flank of the settlement, just outside the wall belt
// (radius ~45.5 per ziklag/layout.ts), clear of both the north gate gap and
// the south postern gap.

export const LAMENT_RISE_POS: [number, number] = [52, 20];
export const DAVID_LAMENT_POS: [number, number] = [52, 13];

export const WITNESS_LAMENT_SLOTS: [number, number][] = rejectionSampleAnnulus(
  10,
  130119,
  [56, 26],
  3,
  9,
  2.0,
);
