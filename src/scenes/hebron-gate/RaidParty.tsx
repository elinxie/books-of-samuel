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
import { RAID_PARTY_SLOTS } from './layout';
import { raidFigurePose, type RaidFigureParams } from './poses';

/**
 * Joab's raid party (3:22, "from a raid, bringing much spoil") —
 * `claim-gate-cast-scale`, a disclosed design count (~15-25 at high tier,
 * not a narrated number, scaled off the shared quality-profile figureCount
 * like every other M4/M5 background crowd). Undifferentiated Israelite
 * dress (`claim-dress`), same register as gibeon-pool/hebron-covenant's
 * generic-men crowds. Arrives standing (a returning military party, not a
 * seated household), settles east of the plaza, and stays there for the
 * rest of the scene — a single, always-moving InstancedMesh update, the
 * same cost precedent as hebron-covenant's `AbnerParty.tsx`.
 */

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1.0,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildRaidPartyFigures(count: number, seed = 330101): RaidFigureParams[] {
  const rng = mulberry32(seed);
  const out: RaidFigureParams[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      arriveStagger: rng() * 4,
      laneOffset: (rng() - 0.5) * 4.4,
      destSlot: RAID_PARTY_SLOTS[i % RAID_PARTY_SLOTS.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function RaidParty({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildRaidPartyFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = raidFigurePose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.set(0.94 + (i % 7) * 0.015, 1, 0.94 + (i % 7) * 0.015);
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
