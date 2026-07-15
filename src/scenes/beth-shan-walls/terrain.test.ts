import { describe, expect, it } from 'vitest';
import { BETH_SHAN_TERRAIN } from './terrain';

describe('Beth-shan terrain', () => {
  it('keeps the summit well above the western valley-road approach', () => {
    const crest = BETH_SHAN_TERRAIN.heightAt(0, 0);
    const valleyRoad = BETH_SHAN_TERRAIN.heightAt(-350, 0);
    expect(crest).toBeGreaterThan(valleyRoad + 24);
  });

  it('drops toward the eastern Jordan-valley slope', () => {
    const crest = BETH_SHAN_TERRAIN.heightAt(0, 0);
    const eastSlope = BETH_SHAN_TERRAIN.heightAt(240, 0);
    expect(crest).toBeGreaterThan(eastSlope + 24);
  });

  it('keeps the wall brow (west point, radius 66) below the true summit but well above the valley floor', () => {
    const crest = BETH_SHAN_TERRAIN.heightAt(0, 0);
    const wallBrow = BETH_SHAN_TERRAIN.heightAt(-66, 0);
    const valleyFloor = BETH_SHAN_TERRAIN.heightAt(-380, 0);
    expect(wallBrow).toBeLessThan(crest);
    expect(wallBrow).toBeGreaterThan(valleyFloor + 20);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = BETH_SHAN_TERRAIN.buildGeometry(500, 50);
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
