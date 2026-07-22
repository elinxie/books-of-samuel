import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TERRACE_SEGMENTS } from './layout';

/**
 * Dry-stone agricultural terracing on Hebron's south-facing (observer-facing)
 * flank — new asset-terrace-walls, the Judean-highland palette's signature
 * feature (rockier and more intensively terraced than Gilead's oak-and-scrub
 * flank, per the brief). A single instanced mesh of short tangential wall
 * segments following concentric contour bands around the town hill — a
 * generic, disclosed placeholder, not a surveyed terrace plan.
 */

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function TerraceWalls({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(220801);
    for (let i = 0; i < TERRACE_SEGMENTS.length; i++) {
      const seg = TERRACE_SEGMENTS[i];
      const y = terrain.heightAt(seg.x, seg.z);
      dummy.position.set(seg.x, y + 0.32, seg.z);
      dummy.rotation.set(0, seg.yaw, 0);
      dummy.scale.set(seg.len, 0.62, 0.42);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.setHSL(0.09, 0.08 + rng() * 0.04, 0.52 + rng() * 0.1);
      mesh.setColorAt(i, tmpColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [terrain]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, TERRACE_SEGMENTS.length]}
      frustumCulled={false}
      castShadow={shadows}
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
