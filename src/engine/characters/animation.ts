import * as THREE from 'three';
import { P } from './anthropometry';
import type { BoneName, ClipName } from './types';

/**
 * Programmatic AnimationClips for the character skeleton. All rotations are
 * authored as deltas from the rest pose (bones have identity rest rotation).
 * Sign conventions (character faces +Z): rotation about +X moves a hanging
 * limb backward, so forward swing/raise is negative X; knee flexion is
 * positive X on the shin; elbow flexion is negative X on the forearm.
 *
 * The walk cycle is authored for WALK_STRIDE_M meters per 1 s cycle — play it
 * at timeScale = groundSpeed / WALK_STRIDE_M so feet never skate.
 */

const euler = new THREE.Euler();
const quat = new THREE.Quaternion();

function rotTrack(bone: BoneName, times: number[], eulersDeg: [number, number, number][]) {
  const values: number[] = [];
  for (const [x, y, z] of eulersDeg) {
    euler.set(THREE.MathUtils.degToRad(x), THREE.MathUtils.degToRad(y), THREE.MathUtils.degToRad(z));
    quat.setFromEuler(euler);
    values.push(quat.x, quat.y, quat.z, quat.w);
  }
  return new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, times, values);
}

function posTrack(bone: BoneName, times: number[], positions: [number, number, number][]) {
  const values: number[] = [];
  for (const p of positions) values.push(...p);
  return new THREE.VectorKeyframeTrack(`${bone}.position`, times, values);
}

const T5 = [0, 0.25, 0.5, 0.75, 1];

function makeWalkClip(stature: number): THREE.AnimationClip {
  const h0 = P.hipsY * stature;
  const bob = 0.016 * stature;
  const sway = 0.011 * stature;
  const x = (vals: number[]): [number, number, number][] => vals.map((v) => [v, 0, 0]);
  const y = (vals: number[]): [number, number, number][] => vals.map((v) => [0, v, 0]);

  const tracks: THREE.KeyframeTrack[] = [
    // Pelvis: vertical bob (low at each strike), lateral weight shift,
    // transverse rotation toward the leading leg, and pelvic list.
    posTrack('hips', T5, [
      [0, h0 - bob, 0],
      [sway, h0 + bob * 0.7, 0],
      [0, h0 - bob, 0],
      [-sway, h0 + bob * 0.7, 0],
      [0, h0 - bob, 0],
    ]),
    rotTrack(
      'hips',
      T5,
      [
        [0, -6, 0],
        [0, 0, 4],
        [0, 6, 0],
        [0, 0, -4],
        [0, -6, 0],
      ],
    ),
    // Trunk counter-rotation keeps the shoulders opposing the pelvis.
    rotTrack('spine', T5, y([3, 0, -3, 0, 3])),
    rotTrack('chest', T5, y([4.5, 0, -4.5, 0, 4.5])),
    rotTrack('head', T5, y([-3, 0, 3, 0, -3])),

    // Left leg strikes at t=0; right leg is the mirror at half phase.
    rotTrack('thighL', T5, x([-25, 3, 20, -12, -25])),
    rotTrack('thighR', T5, x([20, -12, -25, 3, 20])),
    rotTrack('shinL', [0, 0.25, 0.5, 0.62, 0.78, 1], x([6, 10, 26, 50, 62, 6])),
    rotTrack('shinR', [0, 0.12, 0.28, 0.5, 0.75, 1], x([50, 62, 6, 6, 26, 50])),
    rotTrack('footL', [0, 0.25, 0.5, 0.68, 0.85, 1], x([-8, 2, 12, 20, -4, -8])),
    rotTrack('footR', [0, 0.18, 0.35, 0.5, 0.75, 1], x([20, -4, -8, -8, 12, 20])),

    // Arms counter-swing with elbow flexion deepening on the forward swing.
    rotTrack('upperArmL', T5, x([20, 3, -18, 3, 20])),
    rotTrack('upperArmR', T5, x([-18, 3, 20, 3, -18])),
    rotTrack('forearmL', T5, x([-12, -20, -30, -20, -12])),
    rotTrack('forearmR', T5, x([-30, -20, -12, -20, -30])),
  ];
  return new THREE.AnimationClip('walk', 1, tracks);
}

function makeIdleClip(stature: number): THREE.AnimationClip {
  const h0 = P.hipsY * stature;
  const t = [0, 1, 2, 3, 4];
  const tracks: THREE.KeyframeTrack[] = [
    posTrack('hips', [0, 2, 4], [
      [0, h0, 0],
      [0.004 * stature, h0 - 0.003 * stature, 0],
      [0, h0, 0],
    ]),
    // Breathing in the chest, a slow small head turn, arms settled.
    rotTrack('chest', [0, 1.6, 3.2, 4], [
      [0.6, 0, 0],
      [-1, 0, 0],
      [0.8, 0, 0],
      [0.6, 0, 0],
    ]),
    rotTrack('head', t, [
      [2, 0, 0],
      [2.5, 3, 0],
      [1.5, 0, 0],
      [2.5, -2.5, 0],
      [2, 0, 0],
    ]),
    rotTrack('upperArmL', [0, 2, 4], [
      [4, 0, 0],
      [5, 0, 1],
      [4, 0, 0],
    ]),
    rotTrack('upperArmR', [0, 2, 4], [
      [4, 0, 0],
      [3, 0, -1],
      [4, 0, 0],
    ]),
    rotTrack('forearmL', [0, 4], [
      [-10, 0, 0],
      [-10, 0, 0],
    ]),
    rotTrack('forearmR', [0, 4], [
      [-10, 0, 0],
      [-10, 0, 0],
    ]),
  ];
  return new THREE.AnimationClip('idle', 4, tracks);
}

/**
 * Grieving kneel: sink through a crouch onto both knees, shins folded flat,
 * trunk and head bowed, hands brought up toward the face (1 Sam 30:4).
 * One-shot; play with LoopOnce + clampWhenFinished, or sample its progress
 * for crowd pose buckets.
 */
function makeKneelClip(stature: number): THREE.AnimationClip {
  const h0 = P.hipsY * stature;
  const t = [0, 1.2, 2];
  const tracks: THREE.KeyframeTrack[] = [
    posTrack('hips', t, [
      [0, h0, 0],
      [0, 0.42 * stature, -0.02 * stature],
      [0, 0.265 * stature, -0.06 * stature],
    ]),
    rotTrack('thighL', t, [
      [0, 0, 0],
      [-38, 0, -3],
      [-20, 0, -4],
    ]),
    rotTrack('thighR', t, [
      [0, 0, 0],
      [-38, 0, 3],
      [-20, 0, 4],
    ]),
    rotTrack('shinL', t, [
      [4, 0, 0],
      [65, 0, 0],
      [110, 0, 0],
    ]),
    rotTrack('shinR', t, [
      [4, 0, 0],
      [65, 0, 0],
      [110, 0, 0],
    ]),
    rotTrack('footL', t, [
      [0, 0, 0],
      [25, 0, 0],
      [42, 0, 0],
    ]),
    rotTrack('footR', t, [
      [0, 0, 0],
      [25, 0, 0],
      [42, 0, 0],
    ]),
    rotTrack('spine', t, [
      [0, 0, 0],
      [10, 0, 0],
      [17, 0, 0],
    ]),
    rotTrack('chest', t, [
      [0, 0, 0],
      [12, 0, 0],
      [20, 0, 0],
    ]),
    rotTrack('neck', t, [
      [0, 0, 0],
      [8, 0, 0],
      [14, 0, 0],
    ]),
    rotTrack('head', t, [
      [0, 0, 0],
      [8, 0, 0],
      [15, 0, 0],
    ]),
    rotTrack('upperArmL', t, [
      [4, 0, 0],
      [-30, 0, -8],
      [-52, 0, -14],
    ]),
    rotTrack('upperArmR', t, [
      [4, 0, 0],
      [-30, 0, 8],
      [-52, 0, 14],
    ]),
    rotTrack('forearmL', t, [
      [-10, 0, 0],
      [-55, 0, 0],
      [-96, 0, 0],
    ]),
    rotTrack('forearmR', t, [
      [-10, 0, 0],
      [-55, 0, 0],
      [-96, 0, 0],
    ]),
  ];
  return new THREE.AnimationClip('kneel', 2, tracks);
}

/** Standing mourning: bowed, one hand raised to the face, slight rocking. */
function makeMournClip(stature: number): THREE.AnimationClip {
  const h0 = P.hipsY * stature;
  const t = [0, 2, 4];
  const tracks: THREE.KeyframeTrack[] = [
    posTrack('hips', t, [
      [0, h0 - 0.008 * stature, 0],
      [0, h0 - 0.012 * stature, -0.004 * stature],
      [0, h0 - 0.008 * stature, 0],
    ]),
    rotTrack('spine', t, [
      [10, 0, 0],
      [13, 1.5, 0],
      [10, 0, 0],
    ]),
    rotTrack('chest', t, [
      [10, 0, 0],
      [12, -1.5, 0],
      [10, 0, 0],
    ]),
    rotTrack('head', t, [
      [17, 0, 0],
      [20, 3, 0],
      [17, 0, 0],
    ]),
    rotTrack('upperArmR', t, [
      [-68, 0, 12],
      [-72, 0, 12],
      [-68, 0, 12],
    ]),
    rotTrack('forearmR', t, [
      [-102, 0, 0],
      [-106, 0, 0],
      [-102, 0, 0],
    ]),
    rotTrack('upperArmL', t, [
      [-14, 0, -4],
      [-16, 0, -4],
      [-14, 0, -4],
    ]),
    rotTrack('forearmL', t, [
      [-46, 0, 0],
      [-50, 0, 0],
      [-46, 0, 0],
    ]),
  ];
  return new THREE.AnimationClip('mourn', 4, tracks);
}

/** Builds the full clip set for a given stature (hips height is absolute). */
export function makeClips(stature: number): Record<ClipName, THREE.AnimationClip> {
  return {
    walk: makeWalkClip(stature),
    idle: makeIdleClip(stature),
    kneel: makeKneelClip(stature),
    mourn: makeMournClip(stature),
  };
}
