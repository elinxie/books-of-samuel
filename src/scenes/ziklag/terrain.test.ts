import { describe, expect, it } from 'vitest';
import { ZIKLAG_TERRAIN } from './terrain';

/**
 * Pins for the reviewed Milestone 1 Ziklag heightfield, captured from the
 * pre-ADR-005 implementation. These guarantee the generalization changed
 * nothing on screen. If the Ziklag terrain is ever changed DELIBERATELY,
 * update these values in the same commit and say so in the run log.
 */
describe('Ziklag terrain regression pins', () => {
  const heightPins: [number, number, number][] = [
    [0, 0, 7.334935733726517],
    [30, -40, 6.973831075728123],
    [100, 0, 6.124086298244499],
    [-200, 150, 7.115124116320758],
    [0, 300, 4.384616753179129],
    [400, -400, 9.177413337674645],
    [-520, 510, 1.8658909445748844],
    [7.3, -123.4, 7.728644346371881],
  ];

  it('heightAt matches the reviewed heightfield', () => {
    for (const [x, z, expected] of heightPins) {
      expect(ZIKLAG_TERRAIN.heightAt(x, z), `heightAt(${x}, ${z})`).toBeCloseTo(expected, 10);
    }
  });

  it('default geometry keeps its vertex count, heights, and colors', () => {
    const geo = ZIKLAG_TERRAIN.buildGeometry();
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    expect(pos.count).toBe(31329);
    const vertexPins: [number, number, [number, number, number]][] = [
      [0, 7.383203506469727, [0.49488532543182373, 0.34873226284980774, 0.13824595510959625]],
      [5000, 11.696842193603516, [0.49460044503211975, 0.34939223527908325, 0.1474212408065796]],
      [20000, 8.630457878112793, [0.5361491441726685, 0.3650757968425751, 0.14794579148292542]],
    ];
    for (const [i, y, [r, g, b]] of vertexPins) {
      expect(pos.getY(i), `y[${i}]`).toBeCloseTo(y, 6);
      expect(col.getX(i), `r[${i}]`).toBeCloseTo(r, 6);
      expect(col.getY(i), `g[${i}]`).toBeCloseTo(g, 6);
      expect(col.getZ(i), `b[${i}]`).toBeCloseTo(b, 6);
    }
  });
});
