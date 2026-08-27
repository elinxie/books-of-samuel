import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * The ark of the covenant (`asset-ark-form`, `claim-ark-physical-form`) —
 * the project's first staging of the ark as a physical object, built to be
 * reused unchanged by the not-yet-built `ark-into-jerusalem` scene later.
 * Keep this file a clean, independent, reusable unit: no scene-specific
 * positioning logic here, only the object's own geometry and material.
 *
 * A plain rectangular gold-toned chest with visible carrying poles —
 * approximate proportions from Exodus 25:10-22's "two and a half cubits...
 * a cubit and a half... a cubit and a half" (2 Samuel 6 itself gives no
 * construction detail of its own; this is a cross-book citation, not
 * corroborated by any excavated comparandum — see claim-ark-physical-form).
 *
 * **No cherubim geometry renders here, in any mode, ever.** The text names
 * them (Exodus 25:18-20) but gives no visual detail beyond the word itself;
 * rendering a specific ancient Near Eastern composite-creature iconography
 * would invent an artistic program no evidence attests for this object
 * (queue #26). The lid is a plain flat rectangular slab — nothing more.
 */

const CHEST_LENGTH = 1.15; // ~2.5 cubits
const CHEST_WIDTH = 0.68; // ~1.5 cubits
const CHEST_HEIGHT = 0.68; // ~1.5 cubits
const POLE_RADIUS = 0.035;
const POLE_OVERHANG = 0.45;

export function buildArkGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const chest = new THREE.BoxGeometry(CHEST_LENGTH, CHEST_HEIGHT, CHEST_WIDTH);
  chest.translate(0, CHEST_HEIGHT / 2, 0);
  parts.push(chest);

  // A plain, flush lid — no cherubim, no raised mercy-seat rim, nothing
  // beyond the basic chest-and-poles form (Resolved design calls).
  const lid = new THREE.BoxGeometry(CHEST_LENGTH * 1.02, CHEST_HEIGHT * 0.08, CHEST_WIDTH * 1.02);
  lid.translate(0, CHEST_HEIGHT + CHEST_HEIGHT * 0.04, 0);
  parts.push(lid);

  // Two carrying poles, running the chest's long axis, protruding past
  // both ends — "visible carrying poles" per the brief's Resolved design
  // calls; not shown gripped/shoulder-carried in this scene (the ark rides
  // the cart here, per 6:3), only present as the object's own form.
  const poleLength = CHEST_LENGTH + POLE_OVERHANG * 2;
  for (const side of [-1, 1]) {
    const pole = new THREE.CylinderGeometry(POLE_RADIUS, POLE_RADIUS, poleLength, 8);
    pole.rotateZ(Math.PI / 2);
    pole.translate(0, CHEST_HEIGHT * 0.28, (side * CHEST_WIDTH) / 2 + side * POLE_RADIUS * 1.6);
    parts.push(pole);
  }

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export const ARK_HEIGHT = CHEST_HEIGHT;

/** A single reusable ark mesh — position/rotate via a parent group. */
export function Ark({ shadows }: { shadows: boolean }) {
  const geometry = useMemo(() => buildArkGeometry(), []);
  return (
    <mesh geometry={geometry} castShadow={shadows} receiveShadow>
      <meshStandardMaterial color="#c9a227" roughness={0.32} metalness={0.55} />
    </mesh>
  );
}
