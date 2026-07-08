import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { DONKEY_SLOTS } from './layout';

/**
 * Instanced pack donkeys at the north-bank laager (placeholder-tier — see
 * asset-pack-donkeys, claim-pack-donkeys). Static beyond a slight idle bob;
 * the baggage train does not travel with the scene's reenactment.
 */

const dummy = new THREE.Object3D();

function makeDonkeyGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 0.62, 3, 8);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 0.62, 0);
  const neck = new THREE.CapsuleGeometry(0.15, 0.22, 2, 6);
  neck.rotateX(-0.65);
  neck.translate(0.4, 0.78, 0);
  const head = new THREE.CapsuleGeometry(0.12, 0.22, 2, 6);
  head.rotateX(-0.2);
  head.translate(0.58, 0.94, 0);
  const legGeo = () => new THREE.CylinderGeometry(0.045, 0.055, 0.58, 5);
  const legs = [
    [0.24, 0.29, 0.18],
    [0.24, 0.29, -0.18],
    [-0.24, 0.29, 0.18],
    [-0.24, 0.29, -0.18],
  ].map(([x, y, z]) => {
    const g = legGeo();
    g.translate(x, y, z);
    return g;
  });
  const earL = new THREE.ConeGeometry(0.045, 0.16, 5);
  earL.translate(0.6, 1.08, 0.07);
  const earR = new THREE.ConeGeometry(0.045, 0.16, 5);
  earR.translate(0.6, 1.08, -0.07);
  const merged = mergeGeometries([body, neck, head, ...legs, earL, earR]);
  merged.computeVertexNormals();
  return merged;
}

export function PackDonkeys({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeDonkeyGeometry(), []);
  const count = DONKEY_SLOTS.length;

  const seeds = useMemo(() => {
    const rng = mulberry32(6060);
    return DONKEY_SLOTS.map(() => ({ yaw: rng() * Math.PI * 2, phase: rng() * Math.PI * 2 }));
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(6161);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      color.setHSL(0.08, 0.2, 0.32 + rng() * 0.1);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const [x, z] = DONKEY_SLOTS[i];
      const { yaw, phase } = seeds[i];
      const bob = Math.sin(t * 1.1 + phase) * 0.015;
      dummy.position.set(x, terrain.heightAt(x, z) + bob, z);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
