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
import { ABNER_FEAST_SLOTS, ABNER_MEN_COUNT } from './layout';
import { abnerPartyFigurePose, type CovenantFigureConfig } from './poses';

/**
 * Abner's twenty men (2 Samuel 3:20a) — rendered literally 1:1, the text's
 * own exact count, no ratio (the brief's "same register as gibeon-pool's
 * twelve-a-side champions"). A single InstancedMesh, rigid-body translation
 * along the northern road and into/out of the feast seat (mirrors
 * hebron-anointing's ApproachColumn.tsx — no per-frame walk-cycle bucket
 * cycling, since this is a small, literal-count cast, not a large crowd).
 * No weapons/kit geometry: this is a peaceable arrival, not a muster.
 */

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: 1.7,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export function buildAbnerPartyFigures(seed = 43101): CovenantFigureConfig[] {
  const rng = mulberry32(seed);
  const out: CovenantFigureConfig[] = [];
  for (let i = 0; i < ABNER_MEN_COUNT; i++) {
    out.push({
      laneOffset: (rng() - 0.5) * 3.6,
      arriveStagger: rng() * 3,
      feastSlot: ABNER_FEAST_SLOTS[i % ABNER_FEAST_SLOTS.length],
      departStagger: rng() * 3,
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
  const figures = useMemo(() => buildAbnerPartyFigures(), []);
  const colors = useMemo(() => {
    const rng = mulberry32(43102);
    const color = new THREE.Color();
    return figures.map(() => {
      color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.12);
      return color.clone();
    });
  }, [figures]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const pose = abnerPartyFigurePose(t, figures[i]);
      if (!pose.visible) {
        mesh.setMatrixAt(i, HIDDEN);
        continue;
      }
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
      args={[geometry, undefined, figures.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </instancedMesh>
  );
}
