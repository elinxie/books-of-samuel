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
import { ABNER_FEAST_SLOTS } from './layout';
import { partyMemberPose, type PartyMember } from './poses';

/**
 * Abner's twenty men (claim-covenant-feast, 2 Samuel 3:20a) — rendered
 * literally, 1:1, the text's own exact count, no quality-tier scaling (the
 * same literal-cast convention gibeon-pool's `Champions.tsx` set for its
 * twenty-four). One `InstancedMesh`, choreographed entirely by
 * `partyMemberPose` (ADR-007) — march up the northern road, settle to a
 * feast-ground seat, hold through the pledge, then return to the road and
 * recede. `claim-dress`: undifferentiated from David's own men — no
 * invented Judah/Benjamin kit split.
 */

export const PARTY_MEN_COUNT = 20;

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

interface PartyFigure extends PartyMember {
  color: THREE.Color;
}

export function buildPartyFigures(seed = 230601): PartyFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: PartyFigure[] = [];
  for (let i = 0; i < PARTY_MEN_COUNT; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      laneOffset: (rng() - 0.5) * 4.2,
      feastSlot: ABNER_FEAST_SLOTS[i % ABNER_FEAST_SLOTS.length],
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function PartyFigures({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildPartyFigures(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = partyMemberPose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(0.94 + (i % 7) * 0.015);
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
