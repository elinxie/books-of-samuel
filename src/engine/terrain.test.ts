import { describe, expect, it } from 'vitest';
import {
  buildTerrainGeometry,
  createTerrain,
  terrainHeight,
  ZIKLAG_TERRAIN,
  type TerrainSpec,
} from './terrain';

const flatColors = { base: '#c2a36b', scrub: '#8a8a55', rocky: '#a89878' };

function specWith(partial: Partial<TerrainSpec>): TerrainSpec {
  return { hills: [], colors: flatColors, ...partial };
}

describe('createTerrain feature primitives', () => {
  it('mound adds its full height at center and nothing far away', () => {
    const t = createTerrain(
      specWith({ features: [{ kind: 'mound', center: [10, -5], radius: 20, height: 4 }] }),
    );
    expect(t.heightAt(10, -5)).toBe(4);
    expect(t.heightAt(210, -5)).toBeCloseTo(0, 10);
  });

  it('flatten with strength 1 zeroes the hills at its center', () => {
    const hills = [{ frequency: 0.01, amplitude: 10, octaves: 3 }];
    const raw = createTerrain(specWith({ hills }));
    const flattened = createTerrain(
      specWith({
        hills,
        features: [{ kind: 'flatten', center: [3, 4], radius: 30, strength: 1 }],
      }),
    );
    expect(flattened.heightAt(3, 4)).toBe(0);
    // Far outside the flatten radius the hills are untouched.
    expect(flattened.heightAt(303, 4)).toBeCloseTo(raw.heightAt(303, 4), 10);
  });

  it('ramp falls from 0 to -drop across its span', () => {
    const t = createTerrain(
      specWith({ features: [{ kind: 'ramp', direction: [0, 1], start: 0, end: 100, drop: 10 }] }),
    );
    expect(t.heightAt(0, -50)).toBe(0);
    expect(t.heightAt(0, 50)).toBeCloseTo(-5, 12);
    expect(t.heightAt(0, 250)).toBeCloseTo(-10, 12);
  });

  it('channel carves full depth at the centerline, nothing at the banks or past the ends', () => {
    const t = createTerrain(
      specWith({
        features: [
          {
            kind: 'channel',
            path: [
              [0, -100],
              [0, 100],
            ],
            width: 40,
            depth: 6,
          },
        ],
      }),
    );
    expect(t.heightAt(0, 0)).toBe(-6);
    expect(t.heightAt(10, 0)).toBeCloseTo(-3, 12); // halfway down the smooth profile
    expect(t.heightAt(20, 0)).toBe(0); // bank
    expect(t.heightAt(35, 0)).toBe(0); // beyond the bank
    expect(t.heightAt(0, 150)).toBe(0); // 50 m past the end of the path
  });

  it('rejects degenerate ramp directions and channel paths', () => {
    expect(() =>
      createTerrain(
        specWith({ features: [{ kind: 'ramp', direction: [0, 0], start: 0, end: 1, drop: 1 }] }),
      ),
    ).toThrow();
    expect(() =>
      createTerrain(
        specWith({ features: [{ kind: 'channel', path: [[0, 0]], width: 10, depth: 1 }] }),
      ),
    ).toThrow();
  });
});

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

  it('deprecated terrainHeight delegates to the Ziklag terrain', () => {
    expect(terrainHeight(30, -40)).toBe(ZIKLAG_TERRAIN.heightAt(30, -40));
  });

  it('default geometry keeps its vertex count, heights, and colors', () => {
    const geo = buildTerrainGeometry();
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
