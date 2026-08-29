import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { HOUSE_CENTER, HOUSE_D, HOUSE_H, HOUSE_ROT, HOUSE_W } from './layout';

/**
 * David's house, shown complete for the first time (`asset-davids-house-
 * complete`, `claim-davids-house-complete`, 2 Samuel 7:1) — the exterior
 * finish pass on the exact ground jerusalem-stronghold's construction site
 * occupied (`claim-hiram-building`, that scene's `ConstructionGround.tsx`),
 * superseding its two-milestone under-construction state on 7:1's own
 * textual license ("when the king lived in his house..."). This scene
 * renders neither `ConstructionGround` nor `TyrianCraftsmen` — no timber
 * stacks, loose stone blocks, or craftsmen figures anywhere in this file or
 * this scene. A single modest exterior form comparative to the four-room/
 * pillared house plan (king-stager-2001), the same comparative form already
 * used for the Kiriath-jearim/household staging in M7 — no interior is
 * modeled; the reception ground (`HOUSE_COURT_POS`, layout.ts) stays an
 * exterior courtyard/entrance space, per the brief.
 *
 * Two materials only, no decorative program: a pale stone tone for the
 * walls/foundation (matching `ConstructionGround.tsx`'s own stone-course
 * tones for visual continuity) and a cedar-brown tone for the roof timbers,
 * a small, honest gesture at 7:2's "a house of cedar" without asserting any
 * interior cedar paneling or construction detail the text does not give.
 */

const WALL_T = 0.3;
const DOOR_HALF_W = 0.6;
const DOOR_H = 2.0;

function box(
  w: number,
  h: number,
  d: number,
  cx: number,
  cy: number,
  cz: number,
): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.translate(cx, cy, cz);
  return geo;
}

function buildWallsGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const halfW = HOUSE_W / 2;
  const halfD = HOUSE_D / 2;

  // Foundation course.
  parts.push(box(HOUSE_W + 0.3, 0.26, HOUSE_D + 0.3, 0, 0.13, 0));

  // The doorway wall (local -z face, facing the reception ground): two
  // door-flanking piers at full height, a lintel band above the door — the
  // doorway itself reaches the floor, a real geometric gap, not a texture.
  // The same functional-opening technique ark-into-jerusalem's Household.tsx
  // already established.
  const dz = -halfD;
  parts.push(
    box(halfW - DOOR_HALF_W, DOOR_H, WALL_T, -(halfW + DOOR_HALF_W) / 2, DOOR_H / 2 + 0.26, dz),
  );
  parts.push(
    box(halfW - DOOR_HALF_W, DOOR_H, WALL_T, (halfW + DOOR_HALF_W) / 2, DOOR_H / 2 + 0.26, dz),
  );
  parts.push(box(HOUSE_W, HOUSE_H - DOOR_H, WALL_T, 0, (DOOR_H + HOUSE_H) / 2 + 0.26, dz));

  // The three remaining walls: closed, unbroken — 7:1 licenses only the fact
  // of completion, not any interior layout, so no further opening is
  // invented.
  parts.push(box(WALL_T, HOUSE_H, HOUSE_D, -halfW, HOUSE_H / 2 + 0.26, 0));
  parts.push(box(WALL_T, HOUSE_H, HOUSE_D, halfW, HOUSE_H / 2 + 0.26, 0));
  parts.push(box(HOUSE_W, HOUSE_H, WALL_T, 0, HOUSE_H / 2 + 0.26, halfD));

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

function buildRoofGeometry(): THREE.BufferGeometry {
  // A simple flat roof, closing off the structure — "roof finished" per the
  // brief's Resolved design calls; no upper story, parapet, or decorative
  // program asserted.
  const roof = box(HOUSE_W + 0.5, 0.24, HOUSE_D + 0.5, 0, HOUSE_H + 0.38, 0);
  roof.computeVertexNormals();
  return roof;
}

export function DavidsHouseComplete({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const wallsGeometry = useMemo(() => buildWallsGeometry(), []);
  const roofGeometry = useMemo(() => buildRoofGeometry(), []);
  const y = terrain.heightAt(HOUSE_CENTER[0], HOUSE_CENTER[1]);

  return (
    <group position={[HOUSE_CENTER[0], y, HOUSE_CENTER[1]]} rotation={[0, HOUSE_ROT, 0]}>
      <mesh geometry={wallsGeometry} castShadow={shadows} receiveShadow>
        <meshStandardMaterial color="#cdbe93" roughness={0.94} />
      </mesh>
      <mesh geometry={roofGeometry} castShadow={shadows} receiveShadow>
        <meshStandardMaterial color="#6e5334" roughness={0.9} />
      </mesh>
    </group>
  );
}
