import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { GIBEON_POOL_CENTER, GIBEON_WATER_RADIUS_X, GIBEON_WATER_RADIUS_Z } from './terrain';

/**
 * Gibeon terrain mesh plus the pool's water surface (placeholder-tier — see
 * asset-terrain-gibeon-pool, asset-water-plane, claim-gibeon-terrain-form).
 * The basin depression is carved by the terrain's own `basin` feature
 * (engine/terrain.ts); this component adds only a flat, minimally-lit
 * tinted plane over the basin floor — no reflection/refraction shader, no
 * animated ripple, matching the Gilboa/Jabesh precedent of declining a
 * water shader. The plane's radii are deliberately smaller than the basin's
 * so the water reads as nested inside the depression, not spilling over
 * its rim.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const waterY = useMemo(
    () => terrain.heightAt(GIBEON_POOL_CENTER[0], GIBEON_POOL_CENTER[1]) + 0.06,
    [terrain],
  );

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>
      <mesh
        position={[GIBEON_POOL_CENTER[0], waterY, GIBEON_POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[GIBEON_WATER_RADIUS_X, GIBEON_WATER_RADIUS_Z, 1]}
        receiveShadow={false}
      >
        <circleGeometry args={[1, 40]} />
        <meshBasicMaterial color="#3c5a63" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}
