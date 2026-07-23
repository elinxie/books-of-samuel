import { describe, expect, it } from 'vitest';
import { createTerrain, type TerrainSpec } from './terrain';

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

  it('ridge adds an elongated rise along a segment with rounded shoulders', () => {
    const t = createTerrain(
      specWith({
        features: [{ kind: 'ridge', start: [-100, 0], end: [100, 0], width: 25, height: 12 }],
      }),
    );
    expect(t.heightAt(-100, 0)).toBe(12);
    expect(t.heightAt(0, 0)).toBe(12);
    expect(t.heightAt(100, 0)).toBe(12);
    expect(t.heightAt(0, 25)).toBeCloseTo(12 * Math.exp(-0.5), 12);
    expect(t.heightAt(0, 250)).toBeCloseTo(0, 10);
    expect(t.heightAt(125, 0)).toBeCloseTo(12 * Math.exp(-0.5), 12);
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

  it('basin carves an elliptical depression, deepest at center, tapering off-axis', () => {
    const t = createTerrain(
      specWith({
        features: [{ kind: 'basin', center: [0, 0], radiusX: 10, radiusZ: 20, depth: 4 }],
      }),
    );
    expect(t.heightAt(0, 0)).toBeCloseTo(-4, 10);
    // Far outside either radius, the basin has no effect.
    expect(t.heightAt(0, 400)).toBeCloseTo(0, 6);
    expect(t.heightAt(400, 0)).toBeCloseTo(0, 6);
    // The same offset along the long (z) axis sits shallower than along the
    // short (x) axis would at an equivalent absolute distance, since the
    // gaussian falloff is normalized by each axis's own radius.
    const atShortRadius = t.heightAt(10, 0);
    const atLongRadius = t.heightAt(0, 20);
    expect(atShortRadius).toBeCloseTo(atLongRadius, 10);
  });

  it('rejects degenerate ramp directions, ridges, channel paths, and basin radii', () => {
    expect(() =>
      createTerrain(
        specWith({ features: [{ kind: 'ramp', direction: [0, 0], start: 0, end: 1, drop: 1 }] }),
      ),
    ).toThrow();
    expect(() =>
      createTerrain(
        specWith({
          features: [{ kind: 'ridge', start: [0, 0], end: [0, 0], width: 10, height: 1 }],
        }),
      ),
    ).toThrow();
    expect(() =>
      createTerrain(
        specWith({ features: [{ kind: 'channel', path: [[0, 0]], width: 10, depth: 1 }] }),
      ),
    ).toThrow();
    expect(() =>
      createTerrain(
        specWith({
          features: [{ kind: 'basin', center: [0, 0], radiusX: 0, radiusZ: 10, depth: 1 }],
        }),
      ),
    ).toThrow();
  });
});
