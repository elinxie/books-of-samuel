import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Jabesh-gilead terrain mesh (placeholder-tier — see asset-terrain-jabesh-wadi,
 * claim-gilead-terrain, claim-jabesh-location). The terrain's own vertex-color
 * ramp (Gilead hill-flank green, a narrow wadi-side band, pale earth under
 * the village terrace, tan terraced-plot hints) carries the ground detail for
 * this shell.
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
