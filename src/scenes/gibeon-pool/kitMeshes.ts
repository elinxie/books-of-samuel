import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Military-kit attachment geometries for the pool of Gibeon: spear, oval
 * shield, and a straight sword — `asset-military-kit-gibeon`. Both sides are
 * Israelite, so kit is deliberately undifferentiated between them (reusing
 * `claim-dress` as-is, per the brief's "no invented Judah/Benjamin kit
 * split"). The sword specifically is attested for this passage (2:16 —
 * "each caught his opponent by the head and thrust his sword in his
 * companion's side"), unlike gilboa-battle's Philistine-only sword
 * convention. Simple cylinder/cone/box primitives, not modeled assets, in
 * the same figure-local grip space `engine/characters/bodyGeometry.ts` uses
 * (see gilboa-battle/kitMeshes.ts for the shared convention this mirrors).
 */

export const CROWD_KIT_STATURE = 1.72;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand. `reversed` flips the
 * grip so the butt end leads — the one specific, non-graphic detail 2:23
 * gives for Abner's strike on Asahel (a gesture, never penetration). */
export function buildSpearGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
  reversed = false,
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const shaftLen = stature * 0.92;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0);
  const tip = new THREE.ConeGeometry(shaftR * 2.4, stature * 0.08, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip]);
  if (reversed) spear.rotateX(Math.PI); // butt end leads
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.12);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/** A flattened oval board — the Israelite shield silhouette, both sides. */
export function buildShieldGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handL',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const board = new THREE.SphereGeometry(stature * 0.19, 10, 8);
  board.scale(0.58, 0.92, 0.16);
  const sideSign = hand === 'handL' ? 1 : -1;
  board.translate(grip.x + sideSign * stature * 0.05, grip.y * 1.05, grip.z + stature * 0.12);
  return board;
}

/** Straight blade + cross-guard + handle — the sword 2:16 names for the
 * champions' contest, gripped and driven forward for the grapple pose. */
export function buildStraightSwordGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const bladeLen = stature * 0.32;
  const blade = new THREE.BoxGeometry(stature * 0.026, bladeLen, stature * 0.006);
  blade.translate(0, bladeLen / 2, 0);
  const guard = new THREE.BoxGeometry(stature * 0.08, stature * 0.013, stature * 0.011);
  const handle = new THREE.CylinderGeometry(stature * 0.011, stature * 0.011, stature * 0.08, 6);
  handle.translate(0, -stature * 0.045, 0);

  const sword = mergeParts([blade, guard, handle]);
  sword.rotateX(hand === 'handR' ? -0.3 : 0.3);
  sword.translate(grip.x, grip.y, grip.z);
  return sword;
}
