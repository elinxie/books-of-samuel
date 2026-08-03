import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Gibeon terrain mesh plus the pool of Gibeon's water surface
 * (`claim-gibeon-pool-form`, `claim-gibeon-terrain-form`,
 * `asset-gibeon-pool-basin`, `asset-water-plane`). The basin depression
 * itself is carved into the terrain heightfield (`terrain.ts`'s new `basin`
 * feature); this component adds only a flat, minimally-lit tinted disc over
 * its floor — no reflection/refraction shader, matching the declined-water-
 * shader precedent from gilboa-battle/jabesh-burial. Modest, disclosed
 * dimensions, not Pritchard's excavated monumental form (dating caveat on
 * `claim-gibeon-pool-form`).
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
