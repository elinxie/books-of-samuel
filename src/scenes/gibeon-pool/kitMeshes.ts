import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { jointPositions } from '../../engine/characters';

/**
 * Weapon-only attachment geometries for gibeon-pool: a spear (Abner's, and
 * Joab's/Abishai's) and a short sword (the champions' contest, 2:16 — "each
 * caught his opponent by the head and thrust his sword in his opponent's
 * side"). Simple cylinder/cone/box primitives, not modeled assets — the same
 * primitive-attachment approach as gilboa-battle's kitMeshes.ts, copied and
 * trimmed rather than shared, matching this project's per-scene convention.
 *
 * Deliberately NOT a kit-differentiation claim: both Israelite sides carry
 * the same undifferentiated weapon set (reuses claim-dress; no new
 * "Judah kit" vs. "Benjamin kit" distinction, per the brief's explicit
 * "no invented dress differentiation" rule). asset-gibeon-weapon-kit.
 */

/** A representative stature for crowd figures, which have no literal skeleton. */
export const CROWD_KIT_STATURE = 1.74;

function mergeParts(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** Thin shaft + small cone tip, gripped near the hand and angled forward/up
 * — used by Abner (reversed at the death beat by the scene component's own
 * rotation, not by a second geometry) and by Joab/Abishai. */
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
  const butt = new THREE.ConeGeometry(shaftR * 1.6, stature * 0.05, 6);
  butt.rotateX(Math.PI);
  butt.translate(0, shaftLen * 0.42 - shaftLen / 2, 0);

  const spear = mergeParts([shaft, tip, butt]);
  spear.rotateZ(hand === 'handR' ? 0.16 : -0.16);
  spear.rotateX(-0.12);
  spear.translate(grip.x, grip.y, grip.z);
  return spear;
}

/**
 * A short, close-quarters blade gripped forward and low (a thrusting hold,
 * not sheathed) — the champions' contest weapon (2:16), and reused generic
 * kit for the wider contingents. Undifferentiated between the two Israelite
 * sides.
 */
export function buildShortSwordGeometry(
  stature: number,
  hand: 'handL' | 'handR' = 'handR',
): THREE.BufferGeometry {
  const grip = jointPositions(stature)[hand];
  const bladeLen = stature * 0.24;
  const blade = new THREE.BoxGeometry(stature * 0.026, bladeLen, stature * 0.006);
  blade.translate(0, bladeLen / 2, 0);
  const guard = new THREE.BoxGeometry(stature * 0.08, stature * 0.013, stature * 0.011);
  const handle = new THREE.CylinderGeometry(stature * 0.011, stature * 0.011, stature * 0.07, 6);
  handle.translate(0, -stature * 0.04, 0);

  const sword = mergeParts([blade, guard, handle]);
  sword.rotateX(-0.9); // held forward/low, a thrusting grip
  sword.translate(grip.x, grip.y, grip.z);
  return sword;
}
