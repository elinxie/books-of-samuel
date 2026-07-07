import * as THREE from 'three';
import { resetToRest } from './skeleton';
import type { BoneName, CharacterRig } from './types';

/**
 * CPU pose sampling and baking — the "instanced static-pose variants"
 * strategy from ADR-008/ADR-009. A clip is sampled at a fixed time, the
 * skinning transform is applied on the CPU, and the result is a plain static
 * BufferGeometry suitable for InstancedMesh crowds.
 */

/** Poses the rig's bones from a clip at the given time (clamped). */
export function applyClipPose(rig: CharacterRig, clip: THREE.AnimationClip, time: number): void {
  resetToRest(rig.bones, rig.params.stature);
  const t = THREE.MathUtils.clamp(time, 0, clip.duration);
  for (const track of clip.tracks) {
    const dot = track.name.lastIndexOf('.');
    const boneName = track.name.slice(0, dot) as BoneName;
    const prop = track.name.slice(dot + 1);
    const bone = rig.bones[boneName];
    if (!bone) continue;
    const values = track
      .InterpolantFactoryMethodLinear(new Float64Array(track.getValueSize()))
      .evaluate(t);
    if (prop === 'quaternion') {
      bone.quaternion.set(values[0], values[1], values[2], values[3]);
    } else if (prop === 'position') {
      bone.position.set(values[0], values[1], values[2]);
    }
  }
  rig.root.updateMatrixWorld(true);
}

const v = new THREE.Vector3();
const out = new THREE.Vector3();

/**
 * Bakes the rig's current bone pose into a static geometry: positions are
 * skinned on the CPU, colors are carried over, normals recomputed, and the
 * skin attributes dropped.
 */
export function bakeCurrentPose(rig: CharacterRig): THREE.BufferGeometry {
  const src = rig.geometry;
  const pos = src.getAttribute('position');
  const skinIndex = src.getAttribute('skinIndex');
  const skinWeight = src.getAttribute('skinWeight');
  const bones = rig.skeleton.bones;
  const inverses = rig.skeleton.boneInverses;

  // Per-bone skinning matrices: world * bindInverse (bindMatrix is identity —
  // geometry is authored in the same space the skeleton was bound in).
  const mats = bones.map((bone, i) =>
    new THREE.Matrix4().multiplyMatrices(bone.matrixWorld, inverses[i]),
  );

  const baked = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    out.set(0, 0, 0);
    for (let s = 0; s < 4; s++) {
      const w = skinWeight.getComponent(i, s);
      if (w === 0) continue;
      const bi = skinIndex.getComponent(i, s);
      out.addScaledVector(v.clone().applyMatrix4(mats[bi]), w);
    }
    baked[i * 3] = out.x;
    baked[i * 3 + 1] = out.y;
    baked[i * 3 + 2] = out.z;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(baked, 3));
  geo.setAttribute('color', src.getAttribute('color').clone());
  if (src.index) geo.setIndex(src.index.clone());
  geo.computeVertexNormals();
  return geo;
}

/** Convenience: pose from a clip at `time`, then bake. */
export function bakePoseGeometry(
  rig: CharacterRig,
  clip: THREE.AnimationClip,
  time: number,
): THREE.BufferGeometry {
  applyClipPose(rig, clip, time);
  return bakeCurrentPose(rig);
}

export interface PoseBucketSet {
  /** Walk cycle sliced by phase [0,1) into `geometries.walk.length` buckets. */
  walk: THREE.BufferGeometry[];
  /** Kneel progress 0..1 sliced into buckets (last = full grieving kneel). */
  kneel: THREE.BufferGeometry[];
  /** Idle sway frames, cycled slowly by phase. */
  idle: THREE.BufferGeometry[];
}

/** Bakes the standard crowd bucket set from one rig (see design doc). */
export function bakePoseBuckets(
  rig: CharacterRig,
  clips: { walk: THREE.AnimationClip; kneel: THREE.AnimationClip; idle: THREE.AnimationClip },
  counts: { walk: number; kneel: number; idle: number } = { walk: 8, kneel: 4, idle: 3 },
): PoseBucketSet {
  const walk = Array.from({ length: counts.walk }, (_, i) =>
    bakePoseGeometry(rig, clips.walk, (i / counts.walk) * clips.walk.duration),
  );
  const kneel = Array.from({ length: counts.kneel }, (_, i) =>
    bakePoseGeometry(rig, clips.kneel, ((i + 1) / counts.kneel) * clips.kneel.duration),
  );
  const idle = Array.from({ length: counts.idle }, (_, i) =>
    bakePoseGeometry(rig, clips.idle, (i / counts.idle) * clips.idle.duration),
  );
  return { walk, kneel, idle };
}
