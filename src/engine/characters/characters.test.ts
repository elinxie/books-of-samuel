import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../noise';
import { makeClips } from './animation';
import { applyClipPose, bakePoseBuckets, bakePoseGeometry } from './bake';
import { buildCharacterRig } from './bodyGeometry';
import { randomCharacterParams } from './anthropometry';
import type { CharacterRig } from './types';

function rigFor(detail: 'crowd' | 'principal'): CharacterRig {
  const params = randomCharacterParams(mulberry32(7), { detail });
  return buildCharacterRig(params);
}

function triangleCount(rig: CharacterRig): number {
  return (rig.geometry.index?.count ?? 0) / 3;
}

describe('character rig geometry', () => {
  it('stays within the crowd triangle budget', () => {
    const tris = triangleCount(rigFor('crowd'));
    expect(tris).toBeGreaterThan(800);
    expect(tris).toBeLessThanOrEqual(3000);
  });

  it('principal detail is richer but within the web budget', () => {
    const tris = triangleCount(rigFor('principal'));
    expect(tris).toBeGreaterThan(3000);
    expect(tris).toBeLessThanOrEqual(14000);
  });

  it('has no NaN positions and matches the requested stature', () => {
    const rig = rigFor('crowd');
    const pos = rig.geometry.getAttribute('position');
    let maxY = -Infinity;
    let minY = Infinity;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      expect(Number.isNaN(pos.getX(i)) || Number.isNaN(y) || Number.isNaN(pos.getZ(i))).toBe(
        false,
      );
      maxY = Math.max(maxY, y);
      minY = Math.min(minY, y);
    }
    expect(maxY).toBeGreaterThan(rig.params.stature * 0.96);
    expect(maxY).toBeLessThan(rig.params.stature * 1.08);
    expect(minY).toBeGreaterThan(-0.02);
  });

  it('normalizes skin weights to 1 with valid bone indices', () => {
    const rig = rigFor('crowd');
    const w = rig.geometry.getAttribute('skinWeight');
    const idx = rig.geometry.getAttribute('skinIndex');
    for (let i = 0; i < w.count; i++) {
      let sum = 0;
      for (let s = 0; s < 4; s++) {
        sum += w.getComponent(i, s);
        const bi = idx.getComponent(i, s);
        expect(bi).toBeGreaterThanOrEqual(0);
        expect(bi).toBeLessThan(rig.skeleton.bones.length);
      }
      expect(sum).toBeCloseTo(1, 3);
    }
  });
});

describe('animation clips', () => {
  const clips = makeClips(1.66);

  it('looping clips close cleanly (first key equals last key)', () => {
    for (const name of ['walk', 'idle', 'mourn'] as const) {
      for (const track of clips[name].tracks) {
        const size = track.getValueSize();
        const values = track.values;
        for (let c = 0; c < size; c++) {
          expect(values[c]).toBeCloseTo(values[values.length - size + c], 5);
        }
      }
    }
  });

  it('walk keeps the feet near the ground across the cycle', () => {
    const rig = rigFor('crowd');
    for (const t of [0, 0.2, 0.45, 0.7, 0.9]) {
      const baked = bakePoseGeometry(rig, clips.walk, t);
      const pos = baked.getAttribute('position');
      let minY = Infinity;
      for (let i = 0; i < pos.count; i++) minY = Math.min(minY, pos.getY(i));
      expect(minY).toBeGreaterThan(-0.06);
      expect(minY).toBeLessThan(0.1);
    }
  });

  it('full kneel brings the head well below standing height', () => {
    const rig = rigFor('crowd');
    applyClipPose(rig, clips.kneel, clips.kneel.duration);
    const head = rig.bones.head;
    const y = head.getWorldPosition(head.position.clone()).y;
    expect(y).toBeLessThan(rig.params.stature * 0.72);
    expect(y).toBeGreaterThan(rig.params.stature * 0.35);
  });
});

describe('pose baking', () => {
  it('produces distinct geometry per walk bucket', () => {
    const rig = rigFor('crowd');
    const clips = makeClips(rig.params.stature);
    const buckets = bakePoseBuckets(rig, clips, { walk: 4, kneel: 2, idle: 2 });
    expect(buckets.walk).toHaveLength(4);
    const a = buckets.walk[0].getAttribute('position');
    const b = buckets.walk[2].getAttribute('position');
    let maxDelta = 0;
    for (let i = 0; i < a.count; i++) {
      maxDelta = Math.max(maxDelta, Math.abs(a.getY(i) - b.getY(i)));
    }
    // Opposite walk phases must move limbs by a visible amount.
    expect(maxDelta).toBeGreaterThan(0.05);
  });
});
