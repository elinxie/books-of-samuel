import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildRoutSlots } from './layout';

/**
 * Routing Israelites (M3 Step 2): figures streaming down the eastern escape
 * slope, per the brief's "Focal masses" (c) and "Scale assumptions" — the
 * rout reads by motion, dust, and the emptying ridge, not by headcount
 * (claim-battle-scale). This slice places a varied, simple standing/
 * walking-pose distribution along the downslope only; the crumple/fall
 * choreography and the dust system are later steps. Bare/generic dress
 * (claim-dress), same one-instanced-mesh crowd-figure convention as
 * CampCrowd.tsx/Crossing.tsx.
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

export function RoutingIsraelites({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const slots = useMemo(() => buildRoutSlots(count), [count]);
  const terrain = useAppStore((s) => s.terrain);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(31008);
    const color = new THREE.Color();
    for (let i = 0; i < slots.length; i++) {
      const { x, z, yaw } = slots[i];
      const y = terrain.heightAt(x, z);
      dummy.position.set(x, y, z);
      // A slight forward lean reads as motion at documentary distance
      // without any actual pose/crumple choreography this slice.
      dummy.rotation.set(-0.08, yaw, 0);
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
