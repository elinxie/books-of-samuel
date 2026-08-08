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
import { ABNER_MEN_COUNT, ABNER_MEN_SLOTS } from './layout';
import { partyMemberPose, type PartyFigureSpec } from './poses';

/**
 * Abner's twenty men (2 Samuel 3:20a): rendered literally 1:1, the text's
 * own exact count — same register as gibeon-pool's twelve-a-side champions,
 * "no ratio, no disclosure needed beyond 'this is the stated count.'" One
 * InstancedMesh for the whole party; each figure follows the same north
 * road as Abner (poses.ts's `partyMemberPose`), arriving staggered, holding
 * through the feast/pledge beats, then departing staggered — the exact
 * mirror of arrival, never a faster or more furtive departure choreography.
 */

const GENERIC_ISRAELITE_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.53,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[1],
    beltColor: '#3b2416',
    headwear: 'wrap',
    headwrapColor: '#a89670',
  },
};

interface PartyFigure extends PartyFigureSpec {
  scale: number;
  color: THREE.Color;
}

export function buildPartyFigures(seed = 230801): PartyFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: PartyFigure[] = [];
  for (let i = 0; i < ABNER_MEN_COUNT; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      laneOffset: (rng() - 0.5) * 3.6,
      arriveStagger: rng() * 4,
      departStagger: rng() * 4,
      destSlot: ABNER_MEN_SLOTS[i % ABNER_MEN_SLOTS.length],
      scale: 0.93 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function AbnerParty({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_ISRAELITE_PARAMS), []);
  const figures = useMemo(() => buildPartyFigures(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = partyMemberPose(t, fig);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
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
