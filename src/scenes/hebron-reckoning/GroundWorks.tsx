import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import {
  ARRIVAL_ROAD_CURVE,
  BURIAL_ROUTE_CURVE,
  POOL_CENTER,
  POOL_RADIUS,
  samplePath,
} from './layout';

/**
 * hebron-reckoning terrain mesh plus the two new ground routes (the arrival
 * road from the Arabah direction, the head bundle's burial route to Abner's
 * tomb) and the pool of Hebron's water surface (`claim-hebron-pool-feature`,
 * `asset-hebron-pool-basin`, `asset-hebron-pool-water`). The basin
 * depression itself is carved into the terrain heightfield (`terrain.ts`'s
 * `basin` feature, reused from gibeon-pool's convention); this component
 * adds only a flat, minimally-lit tinted disc over its floor — no
 * reflection/refraction shader, matching the declined-water-shader
 * precedent from gilboa-battle/jabesh-burial/gibeon-pool.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const arrivalPoints = useMemo(() => samplePath(ARRIVAL_ROAD_CURVE), []);
  const burialPoints = useMemo(() => samplePath(BURIAL_ROUTE_CURVE, 5), []);
  const waterY = useMemo(() => terrain.heightAt(POOL_CENTER[0], POOL_CENTER[1]) + 0.1, [terrain]);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {arrivalPoints.map((p, i) => (
        <mesh
          key={`arrival-road-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.04, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[2.3, 0.05, 7.2]} />
          <meshStandardMaterial color="#c9bb95" roughness={1} />
        </mesh>
      ))}

      {burialPoints.map((p, i) => (
        <mesh
          key={`burial-route-${i}`}
          position={[p.pos.x, terrain.heightAt(p.pos.x, p.pos.z) + 0.035, p.pos.z]}
          rotation={[0, p.yaw, 0]}
        >
          <boxGeometry args={[1.8, 0.04, 5.4]} />
          <meshStandardMaterial color="#bfae86" roughness={1} />
        </mesh>
      ))}

      <mesh
        position={[POOL_CENTER[0], waterY, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[POOL_RADIUS * 0.8, 36]} />
        <meshStandardMaterial color="#3c5a5e" roughness={0.55} metalness={0} />
      </mesh>
    </group>
  );
}
