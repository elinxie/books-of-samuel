import { describe, expect, it } from 'vitest';
import {
  AMMAH_HILL_CENTER,
  GIBEON_POOL_CENTER,
  GIBEON_POOL_DEPTH,
  GIBEON_POOL_TERRAIN,
} from './terrain';

describe('Gibeon pool terrain', () => {
  it('carves a basin depression at the pool center, below the surrounding ground', () => {
    const center = GIBEON_POOL_TERRAIN.heightAt(GIBEON_POOL_CENTER[0], GIBEON_POOL_CENTER[1]);
    const nearby = GIBEON_POOL_TERRAIN.heightAt(GIBEON_POOL_CENTER[0] + 60, GIBEON_POOL_CENTER[1]);
    expect(center).toBeLessThan(nearby - GIBEON_POOL_DEPTH * 0.5);
  });

  it('rises to a modest hill at the hill of Ammah', () => {
    const hillTop = GIBEON_POOL_TERRAIN.heightAt(AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1]);
    const foot = GIBEON_POOL_TERRAIN.heightAt(AMMAH_HILL_CENTER[0], AMMAH_HILL_CENTER[1] - 90);
    expect(hillTop).toBeGreaterThan(foot + 8);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = GIBEON_POOL_TERRAIN.buildGeometry(500, 50);
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
