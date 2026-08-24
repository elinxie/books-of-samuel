import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { DAVIDS_OCCUPY_SLOTS } from './layout';
import { davidsForcePose, type ForceFigureParams } from './poses';

/**
 * David's force (`davids-band`, reused by reference; `claim-stronghold-
 * cast-scale`) — "the king and his men" (5:6), deliberately not an army:
 * ≈40-60 figures at high tier. An approach column at the capture beats,
 * redistributed as an occupying presence inside the enclosure afterward
 * (`davidsForcePose`, ./poses.ts) — the geometry never enacts the taking
 * itself, it simply finishes arriving and then resettles once the
 * narrative's own gap (b-taking) has passed. Per-frame position update
 * (like AbnerParty.tsx/hebron-gate's MourningAssembly.tsx), well under the
 * cleared ~79-figure precedent at this count.
 */

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildForceFigures(count: number, seed = 240201): ForceFigureParams[] {
  const rng = mulberry32(seed);
  const out: ForceFigureParams[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      laneOffset: (rng() - 0.5) * 4.6,
      arriveStagger: rng() * 6,
      destSlot: DAVIDS_OCCUPY_SLOTS[i % DAVIDS_OCCUPY_SLOTS.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function DavidsForce({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildForceFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = davidsForcePose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.94 + (i % 7) * 0.015);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
