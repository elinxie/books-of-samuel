import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { GIHON_CENTER, GIHON_RADIUS } from './layout';

/**
 * Jerusalem terrain mesh plus the Gihon spring's outflow surface
 * (`claim-gihon-spring`, `claim-jerusalem-terrain-form`). The basin
 * depression itself is carved into the terrain heightfield (`terrain.ts`'s
 * `basin` feature); this component adds only a flat, minimally-lit tinted
 * disc over its floor — no reflection/refraction shader, matching the
 * declined-water-shader precedent from gibeon-pool/gilboa-battle/
 * jabesh-burial. No shaft, tunnel, channel, or monumental spring
 * fortification renders anywhere (fable-review-queue #23).
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const waterY = useMemo(
    () => terrain.heightAt(GIHON_CENTER[0], GIHON_CENTER[1]) + 0.12,
    [terrain],
  );

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>
      <mesh
        position={[GIHON_CENTER[0], waterY, GIHON_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[GIHON_RADIUS * 0.8, 36]} />
        <meshStandardMaterial color="#3c5a5e" roughness={0.55} metalness={0} />
      </mesh>
    </group>
  );
}
