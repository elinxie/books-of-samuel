import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { TOMB_ENTRANCE_INSET, TOMB_POS } from './layout';

/**
 * Abner's tomb (`asset-bier` covers the bier/wrapped-form family; the tomb
 * structure itself is `claim-abner-tomb-form`): a simple rock-cut entry on
 * the hill's flank, disclosed as a design placeholder — deliberately not
 * the medieval "Tomb of Abner" tradition still shown to visitors in modern
 * Hebron, which this project does not adopt as a site or form. A modest
 * boulder mass with a single dark inset opening; no interior is modeled or
 * implied (the wrapped bier fades from view at the mouth, per ADR-009's
 * funerary handling — never a rendered interment).
 */
export function TombGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const [tx, tz] = TOMB_POS;
  const ty = terrain.heightAt(tx, tz);
  const [ex, ez] = TOMB_ENTRANCE_INSET;
  const ey = terrain.heightAt(ex, ez);

  const boulders = useMemo(
    () =>
      [
        { dx: 0, dz: 0, s: 3.2, ry: 0.4 },
        { dx: 1.8, dz: -1.2, s: 2.1, ry: 1.1 },
        { dx: -1.6, dz: -0.9, s: 1.9, ry: 2.0 },
        { dx: 0.6, dz: 1.6, s: 1.6, ry: 2.8 },
      ] as const,
    [],
  );

  return (
    <group>
      {boulders.map((b, i) => (
        <mesh
          key={`tomb-boulder-${i}`}
          position={[tx + b.dx, ty + b.s * 0.42, tz + b.dz]}
          rotation={[0.15, b.ry, 0.1]}
          scale={[b.s, b.s * 0.82, b.s * 0.9]}
          castShadow={shadows}
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a89778" roughness={1} />
        </mesh>
      ))}
      {/* The tomb mouth — a dark, shallow inset; no interior is modeled. */}
      <mesh position={[ex, ey + 0.9, ez]} rotation={[0, 0.3, 0]} receiveShadow>
        <boxGeometry args={[1.3, 1.6, 0.4]} />
        <meshStandardMaterial color="#151210" roughness={1} />
      </mesh>
    </group>
  );
}
