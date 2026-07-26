import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Gibeon terrain, the pool basin's stone rim, and the flat water plane
 * (placeholder-tier — see asset-terrain-gibeon-highlands,
 * asset-gibeon-pool-basin, asset-water-plane, claim-gibeon-pool-form). The
 * basin depression itself is baked into the terrain heightfield
 * (terrain.ts's negative-height mound feature); this component adds only
 * the two features that are not terrain-native: a low rock-cut-style rim
 * ring around the basin edge (a single static instanced-free mesh, per the
 * brief's performance target), and the water surface — a flat,
 * minimally-lit plane, no reflection/refraction shader, matching
 * besor-crossing's own declined-water-shader precedent (asset-water-pool).
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const poolFloorY = terrain.heightAt(POOL_CENTER[0], POOL_CENTER[1]);
  const rimY = terrain.heightAt(POOL_CENTER[0] + POOL_RADIUS + 2, POOL_CENTER[1]);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {/* The pool's rock-cut rim (disclosed, undated-fidelity form — see
          claim-gibeon-pool-form's dating caveat: the excavated rock-cut pool
          at Tell el-Jib may postdate the early Iron IIA setting of 2 Samuel
          2; this is a modest, non-monumental approximation, not a
          reproduction of Pritchard's excavated dimensions). */}
      <mesh
        position={[POOL_CENTER[0], rimY + 0.15, POOL_CENTER[1]]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
        castShadow
      >
        <torusGeometry args={[POOL_RADIUS + 1.2, 0.55, 8, 48]} />
        <meshStandardMaterial color="#a99c7c" roughness={0.95} />
      </mesh>

      {/* The water surface (asset-water-plane): flat, minimally lit, no
          reflection/refraction — a disclosed rendering-fidelity placeholder,
          not a historical claim about the pool's real appearance. */}
      <mesh
        position={[POOL_CENTER[0], poolFloorY + 0.12, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[POOL_RADIUS, 40]} />
        <meshStandardMaterial
          color="#3f5c53"
          roughness={0.2}
          metalness={0.15}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
