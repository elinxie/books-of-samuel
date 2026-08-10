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
import {
  GATE_PLAZA_CENTER,
  MOURNING_GATHER_SLOTS,
  MOURNING_TOMB_SLOTS,
  TOMB_ENTRY_POS,
} from './layout';
import { mournerFigurePose, yawToward, type MournerFigureParams } from './poses';

/**
 * The mourning assembly ("all the people," 3:31-32, 35-36) —
 * `claim-gate-cast-scale`, a disclosed representative crowd (~60-90 at high
 * tier), the same no-narrated-count convention as `claim-judah-assembly-
 * scale`, smaller than the anointing crowd (a funeral, not a tribal
 * founding). Present from the scene's start near the gate plaza — Hebron's
 * own townspeople, who also read as the figures "noticing, motionless"
 * through the held-reaction gap after the strike (brief's ADR-009 note) —
 * then processes to the tomb ground once the funeral begins, mostly a
 * static pose (a single shared rest geometry, position/yaw updated every
 * frame, the same cost precedent as hebron-covenant's `AbnerParty.tsx`; no
 * per-figure walk-cycle animation, per the brief's "cheaper than per-figure
 * pathing... acceptable at this fidelity").
 */

const GENERIC_MOURNER_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.47,
  shoulders: 0.95,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildMournerFigures(count: number, seed = 330301): MournerFigureParams[] {
  const rng = mulberry32(seed);
  const out: MournerFigureParams[] = [];
  for (let i = 0; i < count; i++) {
    const gather = MOURNING_GATHER_SLOTS[i % MOURNING_GATHER_SLOTS.length];
    const tomb = MOURNING_TOMB_SLOTS[i % MOURNING_TOMB_SLOTS.length];
    out.push({
      gather,
      gatherYaw: yawToward(gather[0], gather[1], GATE_PLAZA_CENTER[0], GATE_PLAZA_CENTER[1]),
      tomb,
      tombYaw: yawToward(tomb[0], tomb[1], TOMB_ENTRY_POS[0], TOMB_ENTRY_POS[1]),
      stagger: rng() * 4,
      laneOffset: (rng() - 0.5) * 8,
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function MourningAssembly({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MOURNER_PARAMS), []);
  const figures = useMemo(() => buildMournerFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = mournerFigurePose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.set(0.92 + (i % 9) * 0.016, 1, 0.92 + (i % 9) * 0.016);
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
