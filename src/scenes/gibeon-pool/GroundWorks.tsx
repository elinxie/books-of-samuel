import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './terrain';

/**
 * Gibeon terrain mesh (placeholder-tier — see asset-terrain-gibeon-plateau,
 * claim-gibeon-terrain-form) plus the pool of Gibeon's water surface: a
 * single flat, minimally-lit tinted plane over the basin the terrain carves
 * (asset-water-plane). Deliberately no reflection/refraction shader — the
 * brief explicitly declines one, matching gilboa-battle/besor-crossing's own
 * precedent (`asset-water-pool`). The plane sits a few centimeters above the
 * basin floor so it reads as standing water without z-fighting the terrain
 * mesh beneath it.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const waterY = terrain.heightAt(...POOL_CENTER) + 0.12;

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      <mesh position={[POOL_CENTER[0], waterY, POOL_CENTER[1]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[POOL_RADIUS - 0.6, 40]} />
        <meshBasicMaterial color="#4c6a6e" transparent opacity={0.86} toneMapped={false} />
      </mesh>
    </group>
  );
}
