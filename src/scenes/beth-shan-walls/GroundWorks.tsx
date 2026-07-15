import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Beth-shan tell terrain mesh (placeholder-tier — see
 * asset-terrain-beth-shan-tell, claim-beth-shan-identification). The
 * terrain's own vertex-color ramp (well-watered green valley floor, basalt
 * on the flanks, pale mudbrick at the summit/plaza) carries the ground
 * detail for this shell.
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
