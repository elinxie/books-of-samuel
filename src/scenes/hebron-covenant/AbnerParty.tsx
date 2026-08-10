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
import { ABNER_PARTY_SLOTS } from './layout';
import { partyFigurePose, type PartyFigureParams } from './poses';

/**
 * Abner's twenty (`claim-covenant-feast`, 2 Samuel 3:20a) — rendered
 * literally 1:1, the same register as gibeon-pool's twelve-a-side champions
 * (a named, countable, renderable number taken directly from the text, no
 * ratio). Abner himself is posed separately as a named principal
 * (PrincipalFigures.tsx); this component is the twenty generic men who
 * arrive with him. Undifferentiated Israelite dress (`claim-dress`, same
 * rule as gibeon-pool — both parties are Israelite, no invented Judah/
 * Benjamin kit split).
 *
 * A "seated" squash-and-lower transform approximates floor seating at the
 * feast once settled — the same kind of rigid-body stylization the project
 * already uses for the fallen pose at gibeon-pool/gilboa-battle
 * (non-uniform scale + position offset on the existing ADR-010 rig, not a
 * modeled sitting pose), disclosed under `claim-feast-form`.
 */

export const ABNER_PARTY_COUNT = 20;

const SIT_LOWER = 0.42;
const SIT_SQUASH = 0.4;

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildPartyFigures(count: number, seed = 230101): PartyFigureParams[] {
  const rng = mulberry32(seed);
  const out: PartyFigureParams[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      arriveStagger: rng() * 4,
      departStagger: rng() * 3,
      laneOffset: (rng() - 0.5) * 4.2,
      destSlot: ABNER_PARTY_SLOTS[i % ABNER_PARTY_SLOTS.length],
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function AbnerParty({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const figures = useMemo(() => buildPartyFigures(ABNER_PARTY_COUNT), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = partyFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z) - pose.seated * SIT_LOWER;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      const squash = 1 - pose.seated * SIT_SQUASH;
      dummy.scale.set(0.94 + (i % 7) * 0.015, squash, 0.94 + (i % 7) * 0.015);
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
