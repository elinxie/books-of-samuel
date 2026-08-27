import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Perez-uzzah terrain mesh — no water feature in this scene (unlike
 * jerusalem-stronghold's Gihon or gibeon-pool's basin). Plain terrain
 * geometry only.
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
