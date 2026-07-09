import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../../engine/noise';
import {
  assignRetinueKit,
  buildBowGeometry,
  buildHeaddressGeometry,
  buildShieldGeometry,
  buildSpearGeometry,
  buildStraightSwordGeometry,
  CROWD_KIT_STATURE,
  type RetinueKit,
} from './kitMeshes';

/**
 * Military-kit attachment geometry + non-uniform retinue kit assignment
 * (M3 Step 4 of 5). See docs/design/gilboa-battle-brief.md "Dress review":
 * simple, non-uniform Israelite arms (spear/shield/some bow), a distinct
 * Philistine profile (round shield/straight sword/bow), and the
 * principal-tier-only plumed headdress.
 */

function hasNonEmptyPositions(geo: { attributes: { position?: { count: number } } }): boolean {
  return (geo.attributes.position?.count ?? 0) > 0;
}

describe('kit geometry builders', () => {
  it('build non-empty geometries for every kit type', () => {
    expect(hasNonEmptyPositions(buildSpearGeometry(CROWD_KIT_STATURE, 'handR'))).toBe(true);
    expect(hasNonEmptyPositions(buildSpearGeometry(CROWD_KIT_STATURE, 'handL'))).toBe(true);
    expect(hasNonEmptyPositions(buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'))).toBe(
      true,
    );
    expect(hasNonEmptyPositions(buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'))).toBe(
      true,
    );
    expect(hasNonEmptyPositions(buildBowGeometry(CROWD_KIT_STATURE, 'handL'))).toBe(true);
    expect(hasNonEmptyPositions(buildStraightSwordGeometry(CROWD_KIT_STATURE))).toBe(true);
    expect(hasNonEmptyPositions(buildHeaddressGeometry(CROWD_KIT_STATURE))).toBe(true);
  });

  it('oval and round shields have distinguishable (non-uniform) footprints', () => {
    const oval = buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL');
    const round = buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL');
    oval.computeBoundingBox();
    round.computeBoundingBox();
    const ovalBox = oval.boundingBox!;
    const roundBox = round.boundingBox!;
    const ovalWidth = ovalBox.max.x - ovalBox.min.x;
    const ovalHeight = ovalBox.max.y - ovalBox.min.y;
    const roundWidth = roundBox.max.x - roundBox.min.x;
    const roundHeight = roundBox.max.y - roundBox.min.y;
    // The Israelite oval shield is taller than it is wide; the Philistine
    // round shield is roughly as wide as it is tall — a load-bearing
    // silhouette distinction per the brief, not a decorative one.
    expect(ovalHeight / ovalWidth).toBeGreaterThan(roundHeight / roundWidth);
  });

  it('scales with stature', () => {
    const small = buildSpearGeometry(1.5, 'handR');
    const large = buildSpearGeometry(2.0, 'handR');
    small.computeBoundingBox();
    large.computeBoundingBox();
    const smallHeight = small.boundingBox!.max.y - small.boundingBox!.min.y;
    const largeHeight = large.boundingBox!.max.y - large.boundingBox!.min.y;
    expect(largeHeight).toBeGreaterThan(smallHeight);
  });
});

describe('assignRetinueKit', () => {
  it('is deterministic for a given seeded rng stream', () => {
    const a = Array.from({ length: 30 }, () => 0).map(() => {
      const rng = mulberry32(7);
      return assignRetinueKit(rng);
    });
    const b = Array.from({ length: 30 }, () => 0).map(() => {
      const rng = mulberry32(7);
      return assignRetinueKit(rng);
    });
    expect(a).toEqual(b);
  });

  it('produces a non-uniform mix across a large seeded sample, always spear/shield/bow-related', () => {
    const rng = mulberry32(31010);
    const kits: RetinueKit[] = [];
    for (let i = 0; i < 500; i++) kits.push(assignRetinueKit(rng));
    const kinds = new Set(kits);
    // Non-uniform: more than one kit type appears across the sample.
    expect(kinds.size).toBeGreaterThan(1);
    for (const k of kits) {
      expect(['spear', 'shield', 'spear-shield', 'bow']).toContain(k);
    }
    // "Some bows" — present but a minority of the roster.
    const bowFraction = kits.filter((k) => k === 'bow').length / kits.length;
    expect(bowFraction).toBeGreaterThan(0);
    expect(bowFraction).toBeLessThan(0.3);
  });
});
