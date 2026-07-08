import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { NORTH_CURVE, POOL_SPOTS, SOUTH_CURVE, samplePath } from './layout';

/**
 * Terrain, the worn ford path, and standing pools in the braided bed
 * (placeholder-tier — see asset-terrain-besor, asset-water-pool).
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const pathPoints = useMemo(() => [...samplePath(NORTH_CURVE), ...samplePath(SOUTH_CURVE)], []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {/* Worn crossing path, north approach through the ford to the south route */}
      {pathPoints.map((p, i) => (
        <mesh
          key={`path-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.2, 0.05, 7.4]} />
          <meshStandardMaterial color="#d3c4a0" roughness={1} />
        </mesh>
      ))}

      {/* Standing pools in the braided bed — water level/season is a labeled placeholder */}
      {POOL_SPOTS.map((pool, i) => (
        <mesh
          key={`pool-${i}`}
          position={[pool.x, terrain.heightAt(pool.x, pool.z) + 0.08, pool.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[pool.r, 20]} />
          <meshStandardMaterial
            color="#3f5c53"
            roughness={0.15}
            metalness={0.3}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
}
