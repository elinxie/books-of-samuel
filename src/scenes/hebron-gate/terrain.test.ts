import { describe, expect, it } from 'vitest';
import { HEBRON_GATE_TERRAIN } from './terrain';
import { HEBRON_TERRAIN_SPEC } from '../hebron-anointing/terrain';
import { TOMB_CENTER } from './layout';

describe('hebron-gate terrain', () => {
  it('reuses hebron-anointing’s TerrainSpec directly (visual continuity, brief requirement)', () => {
    expect(HEBRON_GATE_TERRAIN.spec).toBe(HEBRON_TERRAIN_SPEC);
  });

  it('keeps the town hill above the valley south of it, same as hebron-anointing/hebron-covenant', () => {
    const townSummit = HEBRON_GATE_TERRAIN.heightAt(0, -70);
    const valleyFloor = HEBRON_GATE_TERRAIN.heightAt(0, 55);
    expect(townSummit).toBeGreaterThan(valleyFloor + 15);
  });

  it('the tomb ground sits on a rising flank, well above the valley floor south of the town', () => {
    const tombFlank = HEBRON_GATE_TERRAIN.heightAt(TOMB_CENTER[0], TOMB_CENTER[1]);
    const valleyFloor = HEBRON_GATE_TERRAIN.heightAt(0, 55);
    expect(tombFlank).toBeGreaterThan(valleyFloor + 5);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = HEBRON_GATE_TERRAIN.buildGeometry(500, 50);
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
