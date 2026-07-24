import { describe, expect, it } from 'vitest';
import { GIBEON_TERRAIN } from './terrain';

describe('Gibeon terrain', () => {
  it('carves the pool basin below the surrounding bank ground', () => {
    const poolFloor = GIBEON_TERRAIN.heightAt(0, 0);
    const bankGround = GIBEON_TERRAIN.heightAt(0, 34);
    expect(poolFloor).toBeLessThan(bankGround - 2.5);
  });

  it('drains gently downward east of the pool, toward the pursuit route', () => {
    const nearPool = GIBEON_TERRAIN.heightAt(60, 40);
    const farEast = GIBEON_TERRAIN.heightAt(300, 40);
    expect(nearPool).toBeGreaterThan(farEast);
  });

  it('keeps the hill of Ammah above the pursuit-route ground below it', () => {
    const hillTop = GIBEON_TERRAIN.heightAt(460, 0);
    const routeGround = GIBEON_TERRAIN.heightAt(340, 0);
    expect(hillTop).toBeGreaterThan(routeGround + 5);
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
