import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import {
  HOUSEHOLD_D,
  HOUSEHOLD_H,
  HOUSEHOLD_POS,
  HOUSEHOLD_ROT,
  HOUSEHOLD_W,
  WINDOW_HEIGHT,
} from './layout';

/**
 * A single occupied, functional room within the same partially-built house
 * `jerusalem-stronghold` established (`claim-hiram-building`, reused
 * unchanged via `ConstructionGround.tsx` elsewhere in this scene) — the
 * brief's "a partially built house can still have occupied, functional
 * rooms," an ordinary state, not a new design compromise. This is one small
 * room, deliberately modest: it never advances the wider house past the
 * under-construction state that scene established, and it is not identified
 * with any excavated building. Palette matches `ConstructionGround.tsx`'s
 * own stone-course tones directly, for visual continuity.
 *
 * Two functional openings, built as literal gaps in the wall geometry (the
 * same instanced wall-gap technique `Stronghold.tsx`'s gate uses, extended
 * here to a window rather than a full-height breach): a window on the
 * local -x wall (Michal watches from here, 6:16) and a doorway on the
 * local -z wall (she "comes out to meet him," 6:20b). Unrotated by design
 * (see layout.ts) so both openings' outward normals match `WINDOW_POS`/the
 * confrontation-ground direction without extra rotation math.
 */

const WALL_T = 0.28;
const SILL_H = WINDOW_HEIGHT - 0.4;
const LINTEL_H = WINDOW_HEIGHT + 0.4;
const WINDOW_HALF_W = 0.5;
const DOOR_HALF_W = 0.55;
const DOOR_H = 1.9;

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

function buildRoomGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const halfW = HOUSEHOLD_W / 2;
  const halfD = HOUSEHOLD_D / 2;

  // Foundation.
  parts.push(box(HOUSEHOLD_W + 0.3, 0.24, HOUSEHOLD_D + 0.3, 0, 0.12, 0));

  // The window wall (local -x face): bottom band, two window-flanking
  // segments at window height, top band — a real gap for the opening.
  const wx = -halfW;
  parts.push(box(WALL_T, SILL_H, HOUSEHOLD_D, wx, SILL_H / 2 + 0.24, 0));
  parts.push(
    box(
      WALL_T,
      LINTEL_H - SILL_H,
      halfD - WINDOW_HALF_W,
      wx,
      (SILL_H + LINTEL_H) / 2 + 0.24,
      -(halfD + WINDOW_HALF_W) / 2,
    ),
  );
  parts.push(
    box(
      WALL_T,
      LINTEL_H - SILL_H,
      halfD - WINDOW_HALF_W,
      wx,
      (SILL_H + LINTEL_H) / 2 + 0.24,
      (halfD + WINDOW_HALF_W) / 2,
    ),
  );
  parts.push(
    box(WALL_T, HOUSEHOLD_H - LINTEL_H, HOUSEHOLD_D, wx, (LINTEL_H + HOUSEHOLD_H) / 2 + 0.24, 0),
  );

  // The opposite wall (local +x face): full, no opening.
  parts.push(box(WALL_T, HOUSEHOLD_H, HOUSEHOLD_D, halfW, HOUSEHOLD_H / 2 + 0.24, 0));

  // The doorway wall (local -z face): two door-flanking segments at full
  // height above the doorway, a lintel band above the door, no bottom band
  // (the doorway reaches the floor).
  const dz = -halfD;
  parts.push(
    box(halfW - DOOR_HALF_W, DOOR_H, WALL_T, -(halfW + DOOR_HALF_W) / 2, DOOR_H / 2 + 0.24, dz),
  );
  parts.push(
    box(halfW - DOOR_HALF_W, DOOR_H, WALL_T, (halfW + DOOR_HALF_W) / 2, DOOR_H / 2 + 0.24, dz),
  );
  parts.push(
    box(HOUSEHOLD_W, HOUSEHOLD_H - DOOR_H, WALL_T, 0, (DOOR_H + HOUSEHOLD_H) / 2 + 0.24, dz),
  );

  // The back wall (local +z face): full, no opening.
  parts.push(box(HOUSEHOLD_W, HOUSEHOLD_H, WALL_T, 0, HOUSEHOLD_H / 2 + 0.24, halfD));

  // A simple flat roof — this one room reads as finished/occupied even
  // though the wider house (ConstructionGround.tsx, rendered alongside)
  // stays exactly as under-construction as jerusalem-stronghold left it.
  parts.push(box(HOUSEHOLD_W + 0.5, 0.2, HOUSEHOLD_D + 0.5, 0, HOUSEHOLD_H + 0.34, 0));

  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export function Household({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const geometry = useMemo(() => buildRoomGeometry(), []);
  const y = terrain.heightAt(HOUSEHOLD_POS[0], HOUSEHOLD_POS[1]);

  return (
    <mesh
      position={[HOUSEHOLD_POS[0], y, HOUSEHOLD_POS[1]]}
      rotation={[0, HOUSEHOLD_ROT, 0]}
      geometry={geometry}
      castShadow={shadows}
      receiveShadow
    >
      <meshStandardMaterial color="#c2b28c" roughness={0.95} />
    </mesh>
  );
}
