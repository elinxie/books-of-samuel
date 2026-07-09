import { mulberry32 } from '../../engine/noise';

/**
 * Deterministic figure placement for the Gilboa battlefield (M3 Step 2:
 * count/grouping/positioning only — no pose/death choreography yet, see
 * docs/design/gilboa-battle-brief.md "Focal masses" and "Scale assumptions").
 * 1 unit = 1 meter. The ridge crest sits near the origin (`terrain.ts`); the
 * Jezreel plain and Philistine approach fall away to the north (negative z);
 * the Israelite rout drains down the eastern slope (positive x). Positions
 * are x/z only — height is sampled from the scene terrain at render time via
 * `terrain.heightAt`, never baked in here, so this module stays terrain-free
 * and unit-testable.
 */

export interface FigureSlot {
  x: number;
  z: number;
  /** Facing, radians (yaw around Y). */
  yaw: number;
}

/**
 * Crest bodyguard/retinue: a thin ring around the five named principals at
 * the ridge crest — the composition's still center (brief "Focal masses" a).
 */
export function buildRetinueSlots(count: number, seed = 31001): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / Math.max(1, count)) * Math.PI * 2 + rng() * 0.5;
    const r = 6 + rng() * 17;
    out.push({
      x: Math.cos(angle) * r,
      z: Math.sin(angle) * r * 0.75, // flattened slightly along the ridge's west-east axis
      yaw: angle + Math.PI,
    });
  }
  return out;
}

/**
 * Philistine archer element: a distinct forward line climbing the northern
 * slope (1 Samuel 31:3 — "the archers found him"; brief "Focal masses" b).
 * Kept forward of (closer to the crest than) the pursuing infantry mass.
 */
export function buildArcherSlots(count: number, seed = 31002): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const spread = count > 1 ? i / (count - 1) - 0.5 : 0;
    out.push({
      x: spread * 100 + (rng() - 0.5) * 12,
      z: -58 - rng() * 34, // z in [-92, -58]: forward line, below the crest
      yaw: Math.PI, // facing south/upslope toward the crest
    });
  }
  return out;
}

/** Pursuing Philistine infantry: the broader press behind/around the archer line. */
export function buildInfantrySlots(count: number, seed = 31003): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: (rng() - 0.5) * 200,
      z: -70 - rng() * 150, // z in [-220, -70]: overlapping/behind the archer line
      yaw: Math.PI + (rng() - 0.5) * 0.7,
    });
  }
  return out;
}

/**
 * A few kit-differentiated Philistine principals (positioning only this
 * slice — no kit meshes yet), clustered near the archer/infantry line so
 * they read as a small distinguishable group, not lost in the press.
 */
export function buildPhilistinePrincipalSlots(count: number, seed = 31004): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / Math.max(1, count)) * Math.PI * 2 + rng() * 0.3;
    out.push({
      x: Math.cos(angle) * 9,
      z: -78 + Math.sin(angle) * 9,
      yaw: Math.PI,
    });
  }
  return out;
}

/**
 * Israelite defensive line (M3 melee-clash addition): the thin line that
 * actually meets the Philistine infantry before the position gives way,
 * staged between the infantry band (z in [-220,-70], `buildInfantrySlots`)
 * and the crest retinue (clustered near the origin, `buildRetinueSlots`).
 * Faces north toward the Philistine advance (yaw 0), mirroring the
 * infantry's south-facing yaw (`Math.PI`) — the two lines face each other
 * across the clash (`claim-line-defense`).
 */
export function buildDefenderSlots(count: number, seed = 31006): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: (rng() - 0.5) * 190, // matches the infantry's engagement-front width
      z: -20 - rng() * 30, // z in [-50, -20]: holding ground short of the crest
      yaw: (rng() - 0.5) * 0.6, // facing north (toward the Philistines), mirrors infantry's Math.PI
    });
  }
  return out;
}

/**
 * Routing Israelites streaming down the eastern escape slope. For this
 * slice figures are simply distributed at varied distances down the slope
 * (a range of "how far this figure has gotten"); the rout-reads-by-motion-
 * and-dust choreography is a later step.
 */
export function buildRoutSlots(count: number, seed = 31005): FigureSlot[] {
  const rng = mulberry32(seed);
  const out: FigureSlot[] = [];
  for (let i = 0; i < count; i++) {
    const drift = rng(); // 0 = still near the crest, 1 = far down the draw
    out.push({
      x: 40 + drift * 280 + (rng() - 0.5) * 20,
      z: (rng() - 0.5) * 140,
      yaw: Math.PI / 2 + (rng() - 0.5) * 0.6, // broadly facing east, downslope
    });
  }
  return out;
}
