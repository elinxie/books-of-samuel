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
import { ABNER_MEN_SLOTS } from './layout';
import { abnerMemberPose, type PartyMemberSpec } from './poses';

/**
 * Abner's twenty men (`claim-covenant-feast`, 2 Samuel 3:20) — rendered
 * literally 1:1, always all twenty regardless of quality tier (the same
 * "small, exact, textually-stated headcount" register as gibeon-pool's
 * twenty-four champions). One InstancedMesh; the shared travel/settle/
 * depart choreography lives in `./poses.ts` (`abnerMemberPose`), keyed by a
 * small per-figure stagger so the party doesn't move in lockstep. Unarmed,
 * undifferentiated dress from David's side (`claim-dress`) — this project's
 * standing "no invented Judah/Israel kit split" convention.
 */

export const ABNER_MEN_COUNT = ABNER_MEN_SLOTS.length;

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.71,
  build: 0.53,
  shoulders: 1.01,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildAbnerMenSpecs(seed = 53201): (PartyMemberSpec & { color: THREE.Color })[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: (PartyMemberSpec & { color: THREE.Color })[] = [];
  for (let i = 0; i < ABNER_MEN_SLOTS.length; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
    out.push({
      feastSlot: ABNER_MEN_SLOTS[i],
      arriveStagger: rng() * 4,
      departStagger: rng() * 4,
      laneOffset: (rng() - 0.5) * 3.4,
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
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const specs = useMemo(() => buildAbnerMenSpecs(), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < specs.length; i++) {
      const spec = specs[i];
      const pose = abnerMemberPose(t, spec);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
      const y = terrain.heightAt(pose.x, pose.z) - pose.seated * 0.22;
      const squash = 1 - pose.seated * 0.32;
      const s = 0.93 + (i % 6) * 0.014;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.set(s, s * squash, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, spec.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, specs.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
