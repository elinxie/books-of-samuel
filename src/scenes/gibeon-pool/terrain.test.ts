import { describe, expect, it } from 'vitest';
import { GIBEON_TERRAIN } from './terrain';

describe('Gibeon terrain', () => {
  it('keeps the pool basin below its surrounding bank ground', () => {
    const basinFloor = GIBEON_TERRAIN.heightAt(0, 0);
    const northBank = GIBEON_TERRAIN.heightAt(0, -46);
    const southBank = GIBEON_TERRAIN.heightAt(0, 46);
    expect(basinFloor).toBeLessThan(northBank - 1.5);
    expect(basinFloor).toBeLessThan(southBank - 1.5);
  });

  it('keeps the hill of Ammah above the pursuit ground short of it', () => {
    const hillSummit = GIBEON_TERRAIN.heightAt(360, -190);
    const pursuitGround = GIBEON_TERRAIN.heightAt(180, -140);
    expect(hillSummit).toBeGreaterThan(pursuitGround + 5);
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
