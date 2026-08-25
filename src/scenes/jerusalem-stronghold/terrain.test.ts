import { describe, expect, it } from 'vitest';
import { JERUSALEM_TERRAIN } from './terrain';
import { GIHON_CENTER, STRONGHOLD_CENTER } from './layout';

describe('jerusalem-stronghold terrain', () => {
  it('the ridge crest is higher than both flanking valley floors', () => {
    const crest = JERUSALEM_TERRAIN.heightAt(0, 0);
    const eastValley = JERUSALEM_TERRAIN.heightAt(60, 0);
    const westValley = JERUSALEM_TERRAIN.heightAt(-60, 0);
    expect(crest).toBeGreaterThan(eastValley + 10);
    expect(crest).toBeGreaterThan(westValley + 10);
  });

  it('the Kidron valley (east) is deeper than the western valley, per the disclosed relative-depth choice', () => {
    const eastValley = JERUSALEM_TERRAIN.heightAt(60, 0);
    const westValley = JERUSALEM_TERRAIN.heightAt(-60, 0);
    expect(eastValley).toBeLessThan(westValley);
  });

  it('the stronghold summit sits well above the Gihon spring at the foot of the eastern slope', () => {
    const summit = JERUSALEM_TERRAIN.heightAt(STRONGHOLD_CENTER[0], STRONGHOLD_CENTER[1]);
    const spring = JERUSALEM_TERRAIN.heightAt(GIHON_CENTER[0], GIHON_CENTER[1]);
    expect(summit).toBeGreaterThan(spring + 15);
  });

  it('the Gihon spring sits below the mid-slope terrace ground toward the ridge crest', () => {
    const spring = JERUSALEM_TERRAIN.heightAt(GIHON_CENTER[0], GIHON_CENTER[1]);
    const terraceGround = JERUSALEM_TERRAIN.heightAt(20, GIHON_CENTER[1]);
    expect(spring).toBeLessThan(terraceGround);
  });

  it('builds geometry with vertex colors and no NaNs', () => {
    const geo = JERUSALEM_TERRAIN.buildGeometry(500, 50);
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
