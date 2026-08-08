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
import { ATTENDANT_SLOTS } from './layout';
import { attendantPose } from './poses';

/**
 * David's attendants/guard (`claim-reckoning-cast-scale`, ~8-14 at high
 * tier — "the young men" of 4:12a, no number narrated). Static bystanders at
 * the receiving ground for most of the scene; a designated escort pair
 * walks the condemned to the pool ground (`poses.ts`'s
 * `ATTENDANT_ESCORT_INDICES`) and simply stands there while the collapse
 * plays out at documentary distance — no leaning, thrusting, or striking
 * motion is ever animated for them, in either mode: the text supplies no
 * method detail for this killing to invent a gesture from (stricter than
 * every prior ADR-009 named-killing scene). Single InstancedMesh, dynamic
 * per-frame position (the same register as hebron-gate's
 * `JoabRaidParty`/`MourningAssembly`).
 */

const ATTENDANT_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.52,
  shoulders: 1.0,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

interface AttendantFigure {
  slot: readonly [number, number];
  scale: number;
  color: THREE.Color;
}

export function buildAttendantFigures(count: number, seed = 241101): AttendantFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: AttendantFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.14);
    out.push({
      slot: ATTENDANT_SLOTS[i % ATTENDANT_SLOTS.length],
      scale: 0.94 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

export function AttendantGuard({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(ATTENDANT_PARAMS), []);
  const figures = useMemo(() => buildAttendantFigures(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = attendantPose(t, i, fig.slot, violenceMode);
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
