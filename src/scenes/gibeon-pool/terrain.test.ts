import { describe, expect, it } from 'vitest';
import { GIBEON_POOL_TERRAIN } from './terrain';

describe('Gibeon-pool terrain', () => {
  it('carves the pool basin below the surrounding bank ground', () => {
    const poolFloor = GIBEON_POOL_TERRAIN.heightAt(0, 0);
    const bank = GIBEON_POOL_TERRAIN.heightAt(0, -34);
    expect(poolFloor).toBeLessThan(bank - 1.5);
  });

  it('rises toward the hill of Ammah, well above the pursuit-route ground', () => {
    const hillTop = GIBEON_POOL_TERRAIN.heightAt(345, -8);
    const routeGround = GIBEON_POOL_TERRAIN.heightAt(150, 0);
    expect(hillTop).toBeGreaterThan(routeGround + 8);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = GIBEON_POOL_TERRAIN.buildGeometry(500, 60);
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    expect(pos.count).toBeGreaterThan(0);
    expect(col.count).toBe(pos.count);
    for (let i = 0; i < pos.count; i += 97) {
      expect(Number.isFinite(pos.getY(i))).toBe(true);
      expect(Number.isFinite(col.getX(i))).toBe(true);
    }
  });
});
