import { useAppStore } from '../../state/store';
import {
  GATE_CHAMBER_EAST_CENTER,
  GATE_CHAMBER_WEST_CENTER,
  GATE_CORRIDOR_HALF_WIDTH,
  GATE_NORTH_THRESHOLD,
  GATE_PASSAGE_NORTH_Z,
  GATE_PASSAGE_SOUTH_Z,
  GATE_ROOF_HALF_SPAN_X,
  GATE_SOUTH_THRESHOLD,
} from './layout';

/**
 * The gate passage (`claim-hebron-gate-form`, `asset-hebron-gate-passage`):
 * a modest two-chamber gateway — a short roofed corridor between the town
 * cluster and the open gate plaza, with two small flanking chamber recesses.
 * Explicitly disclosed `design-placeholder`: Tell Rumeida has no excavated
 * gate of any period (`claim-hebron-town-form`'s permanent researcher-gap
 * finding extends here), and this is deliberately *not* a monumental
 * six-chamber Solomonic-type gate — the brief's hard anachronism-discipline
 * line. Simple box massing only, matching `TownAndPlaza`'s fidelity level;
 * the corridor's roofed span is the "gateway's interior shadow" the aside
 * (3:27a) is staged into (see `ASIDE_POINT`, `poses.ts`'s `gateAsidePose`).
 */

const WALL_COLOR = '#9a8d76';
const SOCLE_COLOR = '#8a7d68';
const ROOF_COLOR = '#7d715e';
const CORRIDOR_LENGTH = GATE_PASSAGE_SOUTH_Z - GATE_PASSAGE_NORTH_Z; // positive, 8m
const CORRIDOR_CENTER_Z = (GATE_PASSAGE_SOUTH_Z + GATE_PASSAGE_NORTH_Z) / 2;
const WALL_HEIGHT = 2.4;
const CHAMBER_SPAN = 3.2;
const CHAMBER_DEPTH = 3.4;
const CHAMBER_WALL_THICK = 0.5;

export function GatePassage({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const yAt = (x: number, z: number) => terrain.heightAt(x, z);

  const corridorWallY = yAt(0, CORRIDOR_CENTER_Z);

  return (
    <group>
      {/* Corridor side walls, running the passage's north-south length. */}
      {[-GATE_CORRIDOR_HALF_WIDTH, GATE_CORRIDOR_HALF_WIDTH].map((x, i) => (
        <mesh
          key={`corridor-wall-${i}`}
          position={[x, corridorWallY + WALL_HEIGHT / 2, CORRIDOR_CENTER_Z]}
          castShadow={shadows}
          receiveShadow
        >
          <boxGeometry args={[0.6, WALL_HEIGHT, CORRIDOR_LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={1} />
        </mesh>
      ))}

      {/* Threshold jamb posts, plaza-facing (south) and town-facing (north). */}
      {[GATE_SOUTH_THRESHOLD, GATE_NORTH_THRESHOLD].flatMap((thresh, ti) =>
        [-GATE_CORRIDOR_HALF_WIDTH - 0.4, GATE_CORRIDOR_HALF_WIDTH + 0.4].map((x, xi) => {
          const y = yAt(x, thresh[1]);
          return (
            <mesh
              key={`jamb-${ti}-${xi}`}
              position={[x, y + 1.5, thresh[1]]}
              castShadow={shadows}
              receiveShadow
            >
              <boxGeometry args={[0.9, 3.0, 0.9]} />
              <meshStandardMaterial color={SOCLE_COLOR} roughness={1} />
            </mesh>
          );
        }),
      )}

      {/* The two flanking chambers — U-shaped low-wall recesses (back wall +
          two short returns), open toward the corridor. Deliberately modest:
          no bench/pillar detail, no roof of their own beyond the shared
          corridor roof slab below. */}
      {[GATE_CHAMBER_WEST_CENTER, GATE_CHAMBER_EAST_CENTER].map(([cx, cz], ci) => {
        const outward = cx < 0 ? -1 : 1;
        const y = yAt(cx, cz);
        const backWallX = cx + outward * (CHAMBER_DEPTH / 2);
        return (
          <group key={`chamber-${ci}`}>
            <mesh
              position={[backWallX, y + WALL_HEIGHT / 2, cz]}
              castShadow={shadows}
              receiveShadow
            >
              <boxGeometry args={[CHAMBER_WALL_THICK, WALL_HEIGHT, CHAMBER_SPAN + 0.6]} />
              <meshStandardMaterial color={WALL_COLOR} roughness={1} />
            </mesh>
            {[cz - CHAMBER_SPAN / 2, cz + CHAMBER_SPAN / 2].map((wz, wi) => (
              <mesh
                key={`chamber-${ci}-return-${wi}`}
                position={[cx + outward * (CHAMBER_DEPTH / 4), y + WALL_HEIGHT / 2, wz]}
                castShadow={shadows}
                receiveShadow
              >
                <boxGeometry args={[CHAMBER_DEPTH / 2, WALL_HEIGHT, CHAMBER_WALL_THICK]} />
                <meshStandardMaterial color={WALL_COLOR} roughness={1} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Roof slab over the whole footprint (corridor + both chamber mouths)
          — the one continuous shaded interior, "the gateway's interior
          shadow" the brief's aside staging needs. */}
      <mesh
        position={[0, corridorWallY + WALL_HEIGHT + 0.2, CORRIDOR_CENTER_Z]}
        castShadow={shadows}
        receiveShadow
      >
        <boxGeometry args={[GATE_ROOF_HALF_SPAN_X * 2, 0.4, CORRIDOR_LENGTH + 1.4]} />
        <meshStandardMaterial color={ROOF_COLOR} roughness={0.95} />
      </mesh>
    </group>
  );
}
