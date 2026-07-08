import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Basin terrain mesh (placeholder-tier — see asset-terrain-camp-basin).
 * Worn/grazed ground under the sprawl is painted by the terrain color zones;
 * a raider camp has no built roads or paths, so there is no path geometry.
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
