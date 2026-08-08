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
import { JOAB_RAID_SLOTS } from './layout';
import { raidPartyMemberPose, type RaidPartyFigureSpec } from './poses';

/**
 * Joab's returning raid party (2 Samuel 3:22, "from a raid, bringing much
 * spoil"): a disclosed design-choice headcount (`claim-gate-cast-scale`,
 * ~15-25 at high tier — no number is narrated). Arrives once, early, and
 * simply remains near the plaza's edge for the rest of the scene (no
 * departure leg) — the same single-InstancedMesh, position-only-animation
 * register hebron-covenant's AbnerParty used, appropriate at this crowd's
 * "static/slow" cost budget.
 */

const RAID_PARTY_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.54,
  shoulders: 1.02,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[0],
    beltColor: '#3b2416',
    headwear: 'bare',
  },
};

interface RaidFigure extends RaidPartyFigureSpec {
  scale: number;
  color: THREE.Color;
}

export function buildRaidFigures(count: number, seed = 240401): RaidFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: RaidFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      laneOffset: (rng() - 0.5) * 5,
      arriveStagger: rng() * 5,
      destSlot: JOAB_RAID_SLOTS[i % JOAB_RAID_SLOTS.length],
      scale: 0.93 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

export function JoabRaidParty({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(RAID_PARTY_PARAMS), []);
  const figures = useMemo(() => buildRaidFigures(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = raidPartyMemberPose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
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
