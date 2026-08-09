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
import { ABNER_SEAT_SLOTS, GATE_LINEUP_SLOTS } from './layout';
import { abnerEscortPose, type EscortFigure } from './poses';

/**
 * "Abner ... came to David at Hebron with twenty men" (3:20) — rendered
 * literally 1:1, the text's own exact, named count (same register as
 * gibeon-pool's twelve-a-side champions: no ratio, no design disclosure
 * needed beyond "this is the stated count"). Undifferentiated Israelite
 * dress from David's own men (claim-dress) — no invented Judah/Benjamin kit
 * split, and no invented named members of the twenty.
 */

export const ABNER_ESCORT_COUNT = 20;

const GENERIC_ESCORT_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildAbnerEscortFigures(seed = 230301): EscortFigure[] {
  const rng = mulberry32(seed);
  const out: EscortFigure[] = [];
  for (let i = 0; i < ABNER_ESCORT_COUNT; i++) {
    out.push({
      laneOffset: (rng() - 0.5) * 4,
      lineupSlot: GATE_LINEUP_SLOTS[i % GATE_LINEUP_SLOTS.length],
      seatSlot: ABNER_SEAT_SLOTS[i % ABNER_SEAT_SLOTS.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

export function AbnerEscort({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_ESCORT_PARAMS), []);
  const figures = useMemo(() => buildAbnerEscortFigures(), []);
  const colors = useMemo(() => {
    const rng = mulberry32(230302);
    return figures.map(() => {
      tmpColor.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
      return tmpColor.clone();
    });
  }, [figures]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = abnerEscortPose(t, figures[i]);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.94 + (i % 7) * 0.015);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, colors[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, ABNER_ESCORT_COUNT]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
