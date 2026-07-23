import { describe, expect, it } from 'vitest';
import { HEBRON_TERRAIN } from './terrain';

describe('Hebron terrain', () => {
  it('keeps the town hill above the valley south of it', () => {
    const townSummit = HEBRON_TERRAIN.heightAt(0, -70);
    const valleyFloor = HEBRON_TERRAIN.heightAt(0, 55);
    expect(townSummit).toBeGreaterThan(valleyFloor + 15);
  });

  it('keeps the approach ridge above the valley between it and the town', () => {
    const ridge = HEBRON_TERRAIN.heightAt(0, 165);
    const valleyFloor = HEBRON_TERRAIN.heightAt(0, 90);
    expect(ridge).toBeGreaterThan(valleyFloor + 5);
  });

  it('falls away toward the east, along the messenger-departure road', () => {
    const near = HEBRON_TERRAIN.heightAt(50, -30);
    const far = HEBRON_TERRAIN.heightAt(320, -30);
    expect(near).toBeGreaterThan(far + 10);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = HEBRON_TERRAIN.buildGeometry(500, 50);
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
