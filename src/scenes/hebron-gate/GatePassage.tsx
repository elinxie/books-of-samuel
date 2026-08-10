import { useAppStore } from '../../state/store';
import {
  GATE_CHAMBER_HALF_DEPTH,
  GATE_CHAMBER_OFFSET_X,
  GATE_CHAMBER_Z,
  GATE_PASSAGE_HALF_WIDTH,
  GATE_PASSAGE_INNER_Z,
  GATE_PASSAGE_OUTER_Z,
  GATE_POSTS,
} from './layout';

/**
 * The gate-passage interior (`asset-hebron-gate-passage`, `claim-hebron-
 * gate-form`) — the scene's one new structure. "The midst of the gate"
 * (3:27) needs an interior deep enough to draw someone aside into; this
 * renders a modest, disclosed-placeholder two-chamber gateway (two recessed
 * chamber masses flanking a short corridor, roofed over), built directly on
 * hebron-anointing's own `GATE_POSTS` line — deliberately NOT a monumental
 * six-chamber Solomonic-type gate, which would both overclaim for Hebron and
 * risk anachronism for the period (brief's "Resolved design calls"; Tell
 * Rumeida's own town form stays permanently thin per `claim-hebron-town-
 * form`, queue #19c).
 *
 * The observer is never meant to enter this structure — `vp-gate-shadow`
 * holds at documentary distance throughout (ADR-009) — so there is no
 * hollowed, walkable interior. Depth and shadow read entirely from exterior
 * massing (stepped pier walls narrowing the passage at the chambers), a
 * roof slab spanning the corridor, and a darkened floor patch under it, so
 * the "shadow line" is legible even at quality tiers with shadows disabled.
 */

const STONE_COLOR = '#9a8d76';
const WALL_COLOR = '#8c8068';
const SHADE_COLOR = '#4c463a';

export function GatePassage({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);

  const outerPierY = terrain.heightAt(GATE_POSTS[0][0], GATE_PASSAGE_OUTER_Z);
  const innerPierY = terrain.heightAt(GATE_POSTS[0][0], GATE_PASSAGE_INNER_Z);
  const corridorY = terrain.heightAt(0, GATE_CHAMBER_Z);

  const pierH = 2.9;
  const wallH = 2.4;
  const roofY = corridorY + wallH + 0.15;

  return (
    <group>
      {/* Outer piers, on hebron-anointing's own gate-post line. */}
      {GATE_POSTS.map(([x], i) => (
        <mesh
          key={`outer-pier-${i}`}
          position={[x, outerPierY + pierH / 2, GATE_PASSAGE_OUTER_Z]}
          castShadow={shadows}
        >
          <boxGeometry args={[1.6, pierH, 2.2]} />
          <meshStandardMaterial color={STONE_COLOR} roughness={1} />
        </mesh>
      ))}
      {/* Inner (town-facing) piers, mirroring the outer pair. */}
      {GATE_POSTS.map(([x], i) => (
        <mesh
          key={`inner-pier-${i}`}
          position={[x, innerPierY + pierH / 2, GATE_PASSAGE_INNER_Z]}
          castShadow={shadows}
        >
          <boxGeometry args={[1.6, pierH, 2.2]} />
          <meshStandardMaterial color={STONE_COLOR} roughness={1} />
        </mesh>
      ))}

      {/* Corridor walls, west and east — the straight run of the passage. */}
      {[-1, 1].map((side) => (
        <mesh
          key={`corridor-wall-${side}`}
          position={[
            side * GATE_PASSAGE_HALF_WIDTH,
            corridorY + wallH / 2,
            (GATE_PASSAGE_OUTER_Z + GATE_PASSAGE_INNER_Z) / 2,
          ]}
          castShadow={shadows}
          receiveShadow
        >
          <boxGeometry args={[0.6, wallH, Math.abs(GATE_PASSAGE_INNER_Z - GATE_PASSAGE_OUTER_Z)]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={1} />
        </mesh>
      ))}

      {/* The two chamber masses — recessed rooms flanking the corridor at
          its midpoint, the "midst of the gate" Joab draws Abner into. Solid
          exterior massing only (no walkable interior — see file comment);
          the recess reads through the corridor waisting outward here. */}
      {[-1, 1].map((side) => (
        <mesh
          key={`chamber-${side}`}
          position={[side * GATE_CHAMBER_OFFSET_X, corridorY + wallH / 2, GATE_CHAMBER_Z]}
          castShadow={shadows}
          receiveShadow
        >
          <boxGeometry
            args={[
              (GATE_CHAMBER_OFFSET_X - GATE_PASSAGE_HALF_WIDTH) * 2,
              wallH,
              GATE_CHAMBER_HALF_DEPTH * 2,
            ]}
          />
          <meshStandardMaterial color={WALL_COLOR} roughness={1} />
        </mesh>
      ))}

      {/* Roof slab over the corridor — the "shadow line" (brief's ADR-009
          framing): blocks direct light and casts the passage's floor in
          shadow, the documentary-distance visual cue for "the midst of the
          gate." */}
      <mesh
        position={[0, roofY, (GATE_PASSAGE_OUTER_Z + GATE_PASSAGE_INNER_Z) / 2]}
        castShadow={shadows}
      >
        <boxGeometry
          args={[
            (GATE_CHAMBER_OFFSET_X + 1) * 2,
            0.3,
            Math.abs(GATE_PASSAGE_INNER_Z - GATE_PASSAGE_OUTER_Z) + 1,
          ]}
        />
        <meshStandardMaterial color="#6b5d46" roughness={1} />
      </mesh>

      {/* A darkened floor patch under the roofed footprint — keeps the
          shadow line legible even with dynamic shadows disabled (study
          tier). */}
      <mesh
        position={[0, corridorY + 0.02, (GATE_PASSAGE_OUTER_Z + GATE_PASSAGE_INNER_Z) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry
          args={[
            GATE_CHAMBER_OFFSET_X * 2 - 1,
            Math.abs(GATE_PASSAGE_INNER_Z - GATE_PASSAGE_OUTER_Z) - 1,
          ]}
        />
        <meshStandardMaterial color={SHADE_COLOR} roughness={1} />
      </mesh>
    </group>
  );
}
