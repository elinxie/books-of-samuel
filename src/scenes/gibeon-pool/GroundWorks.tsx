import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { POOL_CENTER, POOL_RADIUS } from './layout';

/**
 * Gibeon terrain plus the pool of Gibeon itself (2:13): a shallow rock-cut
 * basin (the terrain's own `basin` feature, engine/terrain.ts) with a low
 * stone rim and a flat, unlit tinted water plane — no reflection/refraction
 * shader, per the brief's explicit "no new water-rendering shader" call
 * (matching gilboa-battle's and jabesh-burial's own declined-water-shader
 * precedent). Dimensions are a modest, disclosed approximation, not
 * Pritchard's excavated monumental pool/tunnel dimensions — see
 * claim-gibeon-pool-feature's dating caveat and asset-water-plane.
 */
export function GroundWorks() {
  const terrain = useAppStore((s) => s.terrain);
  const terrainGeo = useMemo(() => terrain.buildGeometry(), [terrain]);
  const poolFloorY = terrain.heightAt(POOL_CENTER[0], POOL_CENTER[1]);
  const rimY = terrain.heightAt(POOL_CENTER[0] + POOL_RADIUS + 1, POOL_CENTER[1]);

  return (
    <group>
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>

      {/* The pool's low rock-cut rim, just outside the basin's carved edge. */}
      <mesh
        position={[POOL_CENTER[0], rimY + 0.15, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[POOL_RADIUS - 0.6, POOL_RADIUS + 0.9, 40]} />
        <meshStandardMaterial color="#9d8f6e" roughness={0.95} />
      </mesh>

      {/* The still water itself — flat, minimally lit, no reflection/refraction
          shader (asset-water-plane, disclosed placeholder). Sits a little
          above the carved floor, well below the surrounding bank ground, so
          the two companies read the pool as a real body of water between
          them (2:13's "one on one side of the pool and the other on the
          other side"). */}
      <mesh
        position={[POOL_CENTER[0], poolFloorY + 1.4, POOL_CENTER[1]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[POOL_RADIUS - 0.4, 40]} />
        <meshStandardMaterial
          color="#3f5a5c"
          roughness={0.2}
          metalness={0.15}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
