import { describe, expect, it } from 'vitest';
import { GIBEON_TERRAIN, HILL_OF_AMMAH_CENTER, POOL_CENTER, POOL_RADIUS } from './terrain';

describe('Gibeon terrain', () => {
  it('carves the pool basin below the surrounding plateau', () => {
    const poolFloor = GIBEON_TERRAIN.heightAt(...POOL_CENTER);
    const bankGround = GIBEON_TERRAIN.heightAt(POOL_CENTER[0] + 60, POOL_CENTER[1]);
    expect(poolFloor).toBeLessThan(bankGround - 2);
  });

  it('keeps the pool basin flat out to its radius', () => {
    const center = GIBEON_TERRAIN.heightAt(...POOL_CENTER);
    const edge = GIBEON_TERRAIN.heightAt(POOL_CENTER[0] + POOL_RADIUS - 0.5, POOL_CENTER[1]);
    expect(edge).toBeCloseTo(center, 0);
  });

  it('raises the hill of Ammah above the plateau it stands on', () => {
    const crest = GIBEON_TERRAIN.heightAt(...HILL_OF_AMMAH_CENTER);
    const plateau = GIBEON_TERRAIN.heightAt(HILL_OF_AMMAH_CENTER[0] - 90, HILL_OF_AMMAH_CENTER[1]);
    expect(crest).toBeGreaterThan(plateau + 10);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = GIBEON_TERRAIN.buildGeometry(500, 50);
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    expect(pos.count).toBeGreaterThan(0);
    expect(col.count).toBe(pos.count);
    for (let i = 0; i < pos.count; i += 113) {
      expect(Number.isFinite(pos.getY(i))).toBe(true);
      expect(Number.isFinite(col.getX(i))).toBe(true);
    }
  });
});
