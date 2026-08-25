import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { ENCLOSURE_WALL_HEIGHT, GATE_POSTS, WALL_RING_SEGMENTS } from './layout';

/**
 * The Jebusite/Davidic stronghold enclosure (`claim-jebusite-stronghold-
 * form`, `asset-jerusalem-stronghold-form`): a modest stone circuit around a
 * small summit area at the ridge's high end, with a simple gateway — a gap
 * in the ring flanked by two plain posts, deliberately not a chambered or
 * monumental gate. **Not allowed, and not built here**: a six-chamber gate,
 * a casemate system, a glacis, or towers (Resolved design calls; the same
 * herzog-1997 typology reasoning that governs claim-hebron-gate-form applies
 * harder here). One InstancedMesh for the wall ring, matching every other
 * scene's wall/terrace convention.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function Stronghold({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(240701);
    for (let i = 0; i < WALL_RING_SEGMENTS.length; i++) {
      const seg = WALL_RING_SEGMENTS[i];
      const y = terrain.heightAt(seg.x, seg.z);
      dummy.position.set(seg.x, y + ENCLOSURE_WALL_HEIGHT / 2, seg.z);
      dummy.rotation.set(0, seg.yaw, 0);
      dummy.scale.set(seg.len, ENCLOSURE_WALL_HEIGHT, 0.7);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.setHSL(0.09, 0.07 + rng() * 0.03, 0.48 + rng() * 0.08);
      mesh.setColorAt(i, tmpColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [terrain]);

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, WALL_RING_SEGMENTS.length]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      {GATE_POSTS.map(([x, z], i) => {
        const y = terrain.heightAt(x, z);
        return (
          <mesh key={`gate-post-${i}`} position={[x, y + 1.3, z]} castShadow={shadows}>
            <boxGeometry args={[1.3, 2.6, 1.3]} />
            <meshStandardMaterial color="#9a8d76" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}
