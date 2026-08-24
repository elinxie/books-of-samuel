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
  assignRetinueKit,
  buildBowGeometry,
  buildShieldGeometry,
  buildSpearGeometry,
  CROWD_KIT_STATURE,
  type RetinueKit,
} from '../gilboa-battle/kitMeshes';
import { DAVIDS_RIM_SLOTS } from './layout';
import { davidsForcePose, type DavidForceFigureParams } from './poses';

/**
 * David's force (`davids-band`, reused by reference; `claim-rephaim-cast-
 * scale`) — one instanced population reused across both phases: rim hold,
 * phase-one advance and return, rim hold, phase-two flanking march, wait,
 * and converging attack (`davidsForcePose`, ./poses.ts). Every leg rides a
 * shared route curve with a per-figure lane offset — no per-figure
 * independent pathing and no fight-stance pose buckets anywhere (the
 * brief's biggest cost-saving relative to gilboa-battle): a single
 * rest-pose geometry, position/orientation updated per frame, the same
 * lighter convention hebron-gate's raid party/mourning assembly established.
 *
 * Non-uniform kit (`claim-israelite-muster-kit`'s spear/shield/bow mix,
 * reused via `assignRetinueKit`/`kitMeshes` from gilboa-battle) — no
 * uniform is asserted.
 */

const GENERIC_MAN_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.52,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

interface ForceFigure extends DavidForceFigureParams {
  scale: number;
  color: THREE.Color;
  kit: RetinueKit;
}

export function buildDavidsForceFigures(count: number, seed = 250401): ForceFigure[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 300);
  const kitRng = mulberry32(seed + 600);
  const color = new THREE.Color();
  const out: ForceFigure[] = [];
  for (let i = 0; i < count; i++) {
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      restSlot: DAVIDS_RIM_SLOTS[i % DAVIDS_RIM_SLOTS.length],
      holdOffset: [0, 0],
      laneOffset: (rng() - 0.5) * 60,
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
      kit: assignRetinueKit(kitRng),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const HIDDEN_MATRIX = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -1000, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function DavidsForce({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const bowMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_MAN_PARAMS), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'), []);
  const bowGeo = useMemo(() => buildBowGeometry(CROWD_KIT_STATURE, 'handL'), []);
  const figures = useMemo(() => buildDavidsForceFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const bowMesh = bowMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = davidsForcePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      const hasSpear = fig.kit === 'spear' || fig.kit === 'spear-shield';
      const hasShield = fig.kit === 'shield' || fig.kit === 'spear-shield';
      const hasBow = fig.kit === 'bow';
      spearMesh?.setMatrixAt(i, hasSpear ? dummy.matrix : HIDDEN_MATRIX);
      shieldMesh?.setMatrixAt(i, hasShield ? dummy.matrix : HIDDEN_MATRIX);
      bowMesh?.setMatrixAt(i, hasBow ? dummy.matrix : HIDDEN_MATRIX);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (bowMesh) bowMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
      <instancedMesh
        ref={bowMeshRef}
        args={[bowGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#5c4023" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
