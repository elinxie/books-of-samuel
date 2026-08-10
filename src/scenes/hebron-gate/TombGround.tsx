import { useAppStore } from '../../state/store';
import { TOMB_CENTER, TOMB_ENTRY_POS } from './layout';

/**
 * The tomb ground (`claim-abner-tomb-form`, design-placeholder) — "they
 * buried Abner in Hebron" (3:32) gives no form or location beyond the town
 * itself. Rendered as a simple rock-cut entry on the hill's flank: a low
 * rock outcrop with a dark rectangular opening, nothing more — deliberately
 * NOT the medieval "Tomb of Abner" tradition/site in modern Hebron, which
 * this project does not adopt (brief's "Resolved design calls").
 */

const ROCK_COLOR = '#a89877';
const ENTRY_COLOR = '#2e281f';

export function TombGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const outcropY = terrain.heightAt(TOMB_CENTER[0], TOMB_CENTER[1]);
  const entryY = terrain.heightAt(TOMB_ENTRY_POS[0], TOMB_ENTRY_POS[1]);

  return (
    <group>
      <mesh
        position={[TOMB_CENTER[0], outcropY + 1.3, TOMB_CENTER[1]]}
        castShadow={shadows}
        receiveShadow
      >
        <dodecahedronGeometry args={[3.2, 0]} />
        <meshStandardMaterial color={ROCK_COLOR} roughness={1} />
      </mesh>
      <mesh position={[TOMB_ENTRY_POS[0], entryY + 0.7, TOMB_ENTRY_POS[1]]}>
        <boxGeometry args={[1.1, 1.4, 0.6]} />
        <meshStandardMaterial color={ENTRY_COLOR} roughness={1} />
      </mesh>
      {/* A modest, undressed threshold slab — the placeholder's whole prop
          budget (brief: "a grave at Hebron... nothing more"). */}
      <mesh
        position={[TOMB_ENTRY_POS[0], entryY + 0.05, TOMB_ENTRY_POS[1] + 0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.6, 1.2]} />
        <meshStandardMaterial color={ROCK_COLOR} roughness={1} />
      </mesh>
    </group>
  );
}
