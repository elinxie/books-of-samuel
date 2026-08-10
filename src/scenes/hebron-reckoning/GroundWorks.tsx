import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Hebron-reckoning terrain mesh plus the pool of Hebron's water surface
 * (`claim-hebron-pool-feature`, `asset-hebron-pool-basin`) — the basin
 * depression itself is carved into the terrain heightfield (see terrain.ts);
 * this component adds only a flat, minimally-lit tinted disc over its floor,
 * the same declined-water-shader convention as gibeon-pool/gilboa-battle/
 * jabesh-burial. Modest, disclosed dimensions; not the extant Birket
 * es-Sultan pool/site in modern Hebron.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const waterY = useMemo(() => terrain.heightAt(POOL_CENTER[0], POOL_CENTER[1]) + 0.12, [terrain]);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>
      <mesh
        position={[POOL_CENTER[0], waterY, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[POOL_RADIUS * 0.82, 40]} />
        <meshStandardMaterial color="#3c5a5e" roughness={0.55} metalness={0} />
      </mesh>
    </group>
  );
}
