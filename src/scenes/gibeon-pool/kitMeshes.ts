import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Generic weapon-kit attachment geometries: a spear and a short sword,
 * simple cylinder/cone/box primitives (not modeled assets), attached at a
 * representative hand joint — same technique as gilboa-battle's
 * kitMeshes.ts, but deliberately undifferentiated between the two sides
 * (see docs/design/gibeon-pool-brief.md, "no invented Judah kit vs. Benjamin
 * kit" — both civil-war sides here are Israelite, and the text gives no
 * kit-distinguishing detail the way Gilboa's Philistine/Israelite split
 * did). The sword's presence has direct textual warrant (2:16, "each
 * caught his opponent by the head and thrust his sword in his opponent's
 * side"); the spear's presence has direct textual warrant from Abner's own
 * weapon (2:23, "Abner struck him... with the butt of his spear"). Every
 * combat figure in this scene — Abner's side and Joab's side alike — may
 * carry either, at the artist's discretion, never as a side-identifying
 * marker.
 */

/** A representative stature for crowd figures, which have no literal skeleton. */
export const CROWD_KIT_STATURE = 1.74;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand and angled forward/up. */
export function buildSpearGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const shaftLen = stature * 0.92;
  const shaftR = stature * 0.011;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 6);
  shaft.translate(0, shaftLen * 0.42, 0);
  const tip = new THREE.ConeGeometry(shaftR * 2.4, stature * 0.08, 6);
  tip.translate(0, shaftLen * 0.42 + shaftLen / 2, 0);
  // A small butt-spike at the shaft's lower end — the detail 2:23 hinges on
  // (Abner strikes with this end, reversed grip, not the tip).
  const buttSpike = new THREE.ConeGeometry(shaftR * 1.6, stature * 0.05, 6);
  buttSpike.rotateX(Math.PI);
  buttSpike.translate(0, shaftLen * 0.42 - shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip, buttSpike]);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.12);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/** Short, straight blade + cross-guard + handle, gripped in the hand for the
 * champions' close paired killing (2:16). */
export function buildSwordGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const bladeLen = stature * 0.3;
  const blade = new THREE.BoxGeometry(stature * 0.026, bladeLen, stature * 0.006);
  blade.translate(0, bladeLen / 2, 0);
  const guard = new THREE.BoxGeometry(stature * 0.08, stature * 0.014, stature * 0.011);
  const handle = new THREE.CylinderGeometry(stature * 0.011, stature * 0.011, stature * 0.08, 6);
  handle.translate(0, -stature * 0.045, 0);

  const sword = mergeParts([blade, guard, handle]);
  sword.rotateZ(hand === 'handR' ? 0.1 : -0.1);
  sword.translate(grip.x, grip.y, grip.z);
  return sword;
}
