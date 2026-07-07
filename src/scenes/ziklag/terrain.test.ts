import { describe, expect, it } from 'vitest';
import { createTerrain, type Terrain } from '../../engine/terrain';
import { ZIKLAG_TERRAIN, ZIKLAG_TERRAIN_SPEC } from './terrain';
import { GATE_TOWERS, SMOKE_ORIGINS } from './layout';

/** Nearest-vertex color lookup for asserting ground-color zone effects. */
function colorNear(terrain: Terrain, x: number, z: number): [number, number, number] {
  const geo = terrain.buildGeometry();
  const pos = geo.attributes.position;
  const col = geo.attributes.color;
  let best = Infinity;
  let bestI = 0;
  for (let i = 0; i < pos.count; i++) {
    const dx = pos.getX(i) - x;
    const dz = pos.getZ(i) - z;
    const d2 = dx * dx + dz * dz;
    if (d2 < best) {
      best = d2;
      bestI = i;
    }
  }
  return [col.getX(bestI), col.getY(bestI), col.getZ(bestI)];
}

function luminance([r, g, b]: [number, number, number]): number {
  return r + g + b;
}

// Same hills/features/base colors as ZIKLAG_TERRAIN, but with the ground-
// color zones stripped out — isolates the zones' effect from the underlying
// procedural noise, which otherwise varies by location on its own.
const ZIKLAG_TERRAIN_NO_ZONES = createTerrain({
  ...ZIKLAG_TERRAIN_SPEC,
  colors: { ...ZIKLAG_TERRAIN_SPEC.colors, zones: [] },
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

  it('ground darkens at smoke-origin scorch patches, scaled by severity', () => {
    const major = SMOKE_ORIGINS.find((s) => s.major)!;
    const minor = SMOKE_ORIGINS.find((s) => !s.major)!;
    const majorDelta =
      luminance(colorNear(ZIKLAG_TERRAIN_NO_ZONES, major.x, major.z)) -
      luminance(colorNear(ZIKLAG_TERRAIN, major.x, major.z));
    const minorDelta =
      luminance(colorNear(ZIKLAG_TERRAIN_NO_ZONES, minor.x, minor.z)) -
      luminance(colorNear(ZIKLAG_TERRAIN, minor.x, minor.z));
    expect(majorDelta).toBeGreaterThan(0); // zoned ground is darker than unzoned at the same spot
    expect(minorDelta).toBeGreaterThan(0);
    expect(majorDelta).toBeGreaterThan(minorDelta); // major scorch patches darken more than minor ones
  });

  it('ground lightens toward the worn gate approach', () => {
    const gateMidpoint: [number, number] = [
      (GATE_TOWERS[0][0] + GATE_TOWERS[1][0]) / 2,
      (GATE_TOWERS[0][1] + GATE_TOWERS[1][1]) / 2,
    ];
    const delta =
      luminance(colorNear(ZIKLAG_TERRAIN, gateMidpoint[0], gateMidpoint[1])) -
      luminance(colorNear(ZIKLAG_TERRAIN_NO_ZONES, gateMidpoint[0], gateMidpoint[1]));
    expect(delta).toBeGreaterThan(0); // zoned ground is lighter (dustier) than unzoned at the gate
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
