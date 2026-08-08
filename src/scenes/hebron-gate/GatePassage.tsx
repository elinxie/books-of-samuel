import { useAppStore } from '../../state/store';
import { GATE_LINTEL_Y, GATE_PASSAGE_CENTER, GATE_WALLS } from './layout';

/**
 * The Hebron gate passage (`asset-hebron-gate-passage`, `claim-hebron-gate-
 * form`): a modest, disclosed two-chamber gateway — deep enough to draw
 * someone into its interior shadow (3:27, "the midst of the gate"), not a
 * monumental six-chamber Solomonic-type gate. Replaces hebron-anointing's
 * simple two-post marker at the same location (`GATE_POSTS`, imported only
 * for continuity/tests, never rendered alongside this fuller structure).
 * Static box massing, matching the project's placeholder-fidelity
 * convention for unattested architecture (no excavated gate exists at Tell
 * Rumeida for this period — see claim-hebron-gate-form's notes).
 */
export function GatePassage({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const baseY = terrain.heightAt(GATE_PASSAGE_CENTER[0], GATE_PASSAGE_CENTER[1]);

  return (
    <group>
      {GATE_WALLS.map((w, i) => (
        <mesh
          key={`gate-wall-${i}`}
          position={[w.x, baseY + w.h / 2, w.z]}
          castShadow={shadows}
          receiveShadow
        >
          <boxGeometry args={[w.w, w.h, w.d]} />
          <meshStandardMaterial color="#9a8d76" roughness={1} />
        </mesh>
      ))}
      {/* The lintel over the passage's narrowest point. */}
      <mesh position={[0, baseY + GATE_LINTEL_Y, GATE_PASSAGE_CENTER[1]]} castShadow={shadows}>
        <boxGeometry args={[8, 0.5, 1]} />
        <meshStandardMaterial color="#8d8069" roughness={1} />
      </mesh>
    </group>
  );
}
