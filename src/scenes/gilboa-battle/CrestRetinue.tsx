import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildRetinueSlots } from './layout';

/**
 * Crest bodyguard/retinue (M3 Step 2): a thin ring of generic Israelite
 * figures around the five named principals, per the brief's "Focal masses"
 * (a) — count/grouping/positioning only, simple standing poses. Bare/
 * generic dress (claim-dress), same one-instanced-mesh crowd-figure
 * convention as CampCrowd.tsx/Crossing.tsx — no new body meshes.
 */

function makeFigureGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 1.0, 4, 8);
  body.translate(0, 0.86, 0);
  const head = new THREE.SphereGeometry(0.15, 8, 6);
  head.translate(0, 1.68, 0);
  const merged = mergeGeometries([body, head]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();

export function CrestRetinue({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const slots = useMemo(() => buildRetinueSlots(count), [count]);
  const terrain = useAppStore((s) => s.terrain);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(31006);
    const color = new THREE.Color();
    for (let i = 0; i < slots.length; i++) {
      const { x, z, yaw } = slots[i];
      const y = terrain.heightAt(x, z);
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.setScalar(0.95 + rng() * 0.1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(TUNIC_PALETTE[Math.floor(rng() * TUNIC_PALETTE.length)]);
      color.offsetHSL(0, 0, (rng() - 0.5) * 0.08);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [slots, terrain]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, slots.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
