import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../noise';
import { randomCharacterParams } from './anthropometry';
import { buildCharacterRig } from './bodyGeometry';
import type { CharacterRig } from './types';

const SEEDS = [1, 2, 3, 17, 99];
const DETAILS = ['crowd', 'principal'] as const;

function rigFor(seed: number, detail: 'crowd' | 'principal'): CharacterRig {
  const params = randomCharacterParams(mulberry32(seed), { detail });
  return buildCharacterRig(params);
}

function readAllPositions(rig: CharacterRig): Float32Array {
  const pos = rig.geometry.getAttribute('position');
  return Float32Array.from(pos.array as ArrayLike<number>);
}

describe('body geometry determinism', () => {
  it('same seed produces identical params', () => {
    const p1 = randomCharacterParams(mulberry32(23));
    const p2 = randomCharacterParams(mulberry32(23));
    expect(p1).toEqual(p2);
  });

  it('same seed produces identical geometry positions', () => {
    const a = rigFor(23, 'crowd');
    const b = rigFor(23, 'crowd');
    const pa = readAllPositions(a);
    const pb = readAllPositions(b);
    expect(pa.length).toBe(pb.length);
    for (let i = 0; i < pa.length; i++) {
      expect(pa[i]).toBeCloseTo(pb[i], 6);
    }
  });

  it('different seeds produce differing geometry (not identical vertex data)', () => {
    const a = rigFor(1, 'crowd');
    const b = rigFor(2, 'crowd');
    const pa = readAllPositions(a);
    const pb = readAllPositions(b);
    // Statures/builds differ, so total vertex data should not match exactly,
    // even if vertex counts happen to be equal.
    let identical = pa.length === pb.length;
    if (identical) {
      for (let i = 0; i < pa.length; i++) {
        if (Math.abs(pa[i] - pb[i]) > 1e-9) {
          identical = false;
          break;
        }
      }
    }
    expect(identical).toBe(false);
  });
});

describe('body geometry invariants', () => {
  for (const detail of DETAILS) {
    for (const seed of SEEDS) {
      it(`has no NaNs, bounded XY extent, normalized weights, valid bone indices (seed=${seed}, detail=${detail})`, () => {
        const rig = rigFor(seed, detail);
        const geo = rig.geometry;
        const pos = geo.getAttribute('position');
        const skinIndex = geo.getAttribute('skinIndex');
        const skinWeight = geo.getAttribute('skinWeight');
        const boneCount = rig.skeleton.bones.length;

        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          expect(Number.isNaN(x)).toBe(false);
          expect(Number.isNaN(y)).toBe(false);
          expect(Number.isNaN(z)).toBe(false);
          expect(Math.abs(x)).toBeLessThan(0.35);
          expect(Math.abs(z)).toBeLessThan(0.35);

          let sum = 0;
          for (let s = 0; s < 4; s++) {
            const bi = skinIndex.getComponent(i, s);
            expect(bi).toBeGreaterThanOrEqual(0);
            expect(bi).toBeLessThan(boneCount);
            expect(bi).toBeLessThan(17);
            sum += skinWeight.getComponent(i, s);
          }
          expect(sum).toBeCloseTo(1, 3);
        }
      });
    }
  }
});
