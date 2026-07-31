import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Gibeon terrain shell plus the one genuinely new geometry family this scene
 * introduces: the pool basin and its water surface (brief's "Performance
 * target" — a single static basin mesh plus one flat plane, no reflection or
 * refraction, no new real-time lights). The basin depression itself is
 * carried by terrain.ts's inverted-mound feature; this component adds a
 * slightly darker rock-cut rim ring (reading the excavated form's edge, at
 * placeholder fidelity) and the flat, minimally-lit tinted water plane
 * (asset-water-plane). See claim-gibeon-pool-form for the identification/
 * dating disclosure this geometry represents.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const basinFloorY = useMemo(() => terrain.heightAt(POOL_CENTER[0], POOL_CENTER[1]), [terrain]);
  const rimGeo = useMemo(() => new THREE.TorusGeometry(POOL_RADIUS * 0.92, 0.6, 6, 28), []);
  const waterGeo = useMemo(() => new THREE.CircleGeometry(POOL_RADIUS * 0.82, 40), []);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>
      <mesh
        geometry={rimGeo}
        position={[POOL_CENTER[0], basinFloorY + 1.2, POOL_CENTER[1]]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#8d8168" roughness={0.95} />
      </mesh>
      {/* The water plane: flat, minimally lit, no reflection/refraction —
          a disclosed fidelity placeholder (asset-water-plane), not a
          historical claim about the pool's true depth or clarity. */}
      <mesh
        geometry={waterGeo}
        position={[POOL_CENTER[0], basinFloorY + 0.55, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#5b7a80" roughness={0.35} metalness={0} />
      </mesh>
    </group>
  );
}
