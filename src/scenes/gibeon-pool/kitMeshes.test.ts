import { describe, expect, it } from 'vitest';
import {
  buildGripSwordGeometry,
  buildOvalShieldGeometry,
  buildSpearGeometry,
  buildSpearGeometryAtGrip,
  CROWD_KIT_STATURE,
} from './kitMeshes';

function hasNonEmptyPositions(geo: { attributes: { position?: { count: number } } }): boolean {
  return (geo.attributes.position?.count ?? 0) > 0;
}

describe('kit geometry builders', () => {
  it('build non-empty geometries for every kit type', () => {
    expect(hasNonEmptyPositions(buildSpearGeometry(CROWD_KIT_STATURE, 'handR'))).toBe(true);
    expect(hasNonEmptyPositions(buildSpearGeometry(CROWD_KIT_STATURE, 'handL', true))).toBe(true);
    expect(hasNonEmptyPositions(buildOvalShieldGeometry(CROWD_KIT_STATURE, 'handL'))).toBe(true);
    expect(hasNonEmptyPositions(buildGripSwordGeometry(CROWD_KIT_STATURE, 'handR'))).toBe(true);
    expect(hasNonEmptyPositions(buildSpearGeometryAtGrip(CROWD_KIT_STATURE, 'handR'))).toBe(true);
  });

  it('a reversed spear grip is a distinct orientation from the forward grip', () => {
    const forward = buildSpearGeometry(CROWD_KIT_STATURE, 'handR', false);
    const reversed = buildSpearGeometry(CROWD_KIT_STATURE, 'handR', true);
    const a = forward.attributes.position.array;
    const b = reversed.attributes.position.array;
    expect(a.length).toBe(b.length);
    let differs = false;
    for (let i = 0; i < a.length; i++) {
      if (Math.abs(a[i] - b[i]) > 1e-4) {
        differs = true;
        break;
      }
    }
    expect(differs).toBe(true);
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
