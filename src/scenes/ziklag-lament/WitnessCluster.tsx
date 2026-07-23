import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildBodyGeometry, randomCharacterParams } from '../../engine/characters';
import { witnessPose } from './poses';

/**
 * The small witness cluster of David's men (~6-10 figures — a disclosed
 * small headcount, not a scaled fraction of the narrated six hundred; see
 * claim-600-men's scene-specific usage note and the brief's "Scale
 * assumptions"). Crowd-detail geometry (a single shared silhouette,
 * per-instance color variation), the "small group" scale of this scene's
 * intimate three-scale composition.
 */
const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

const WOOL_PALETTE = ['#8a7a62', '#6f5b43', '#7d6a52', '#9c8a6c', '#5f5142', '#7a4a3a'];

export function WitnessCluster({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildBodyGeometry(randomCharacterParams(4, 'crowd')), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(130120);
    for (let i = 0; i < count; i++) {
      tmpColor.set(WOOL_PALETTE[Math.floor(rng() * WOOL_PALETTE.length)]);
      tmpColor.offsetHSL(0, 0, (rng() - 0.5) * 0.06);
      mesh.setColorAt(i, tmpColor);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(() => {
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const pose = witnessPose(t, i, count, violenceMode);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(pose.grieve * 0.3 + pose.strike * 0.6, pose.yaw, 0);
      const squash = 1 - pose.grieve * 0.12;
      dummy.scale.set(0.95, 0.95 * squash, 0.95);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.count = count;
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
