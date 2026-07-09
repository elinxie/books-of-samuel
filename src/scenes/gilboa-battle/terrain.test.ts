import { describe, expect, it } from 'vitest';
import { GILBOA_TERRAIN } from './terrain';

describe('Gilboa terrain', () => {
  it('keeps the crest above the Jezreel-side northern approach', () => {
    const crest = GILBOA_TERRAIN.heightAt(0, 0);
    const northernApproach = GILBOA_TERRAIN.heightAt(0, -430);
    expect(crest).toBeGreaterThan(northernApproach + 24);
  });

  it('drops toward the eastern rout slope', () => {
    const crest = GILBOA_TERRAIN.heightAt(0, 0);
    const easternSlope = GILBOA_TERRAIN.heightAt(560, 20);
    expect(crest).toBeGreaterThan(easternSlope + 12);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = GILBOA_TERRAIN.buildGeometry(500, 50);
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
