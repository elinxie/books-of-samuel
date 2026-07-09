import { useMemo } from 'react';
import { useAppStore } from '../../state/store';

/**
 * Gilboa ridge terrain mesh (placeholder-tier — see asset-terrain-gilboa-ridge,
 * claim-gilboa-terrain-form). A battlefield ridge has no built roads; the
 * terrain's own vertex-color ramp (garrigue base thinning to exposed rock on
 * the crest, per claim-gilboa-topography) carries all the ground detail for
 * this shell — no additional ground props.
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
