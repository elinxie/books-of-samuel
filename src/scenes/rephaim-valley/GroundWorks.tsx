import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Rephaim-valley terrain mesh — no water anywhere in this scene (unlike
 * jerusalem-stronghold's Gihon or gibeon-pool's basin, this valley has no
 * narrated water feature). Plain terrain geometry only.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);

  return (
    <mesh geometry={terrainGeo} receiveShadow>
      <meshStandardMaterial vertexColors roughness={1} metalness={0} />
    </mesh>
  );
}
