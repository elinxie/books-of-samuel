import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { buildRetinueSlots, type FigureSlot } from './layout';
import { retinueFallPose } from './poses';
import {
  assignRetinueKit,
  buildBowGeometry,
  buildShieldGeometry,
  buildSpearGeometry,
  CROWD_KIT_STATURE,
  type RetinueKit,
} from './kitMeshes';

/**
 * Crest bodyguard/retinue (M3 Step 3): a thin ring of generic Israelite
 * figures around the five named principals, per the brief's "Focal masses"
 * (a). At the `b-sons` beat, a seeded fraction of the retinue collapses
 * alongside the sons — "the line collapsing over them" — staggered by a
 * per-figure delay so it reads as a ripple, not a single cut; the rest hold
 * position. Bare/generic dress (claim-dress), one instanced mesh, same
 * crowd-figure convention as CampCrowd.tsx/Crossing.tsx.
 *
 * M3 Step 4 adds non-uniform military kit (`claim-israelite-muster-kit`):
 * each figure is seeded (`assignRetinueKit`) into spear / shield /
 * spear+shield / bow, with one shared InstancedMesh per kit type. Instances
 * a figure does not carry are parked off-scene (see HIDDEN_MATRIX) rather
 * than given a variable-length mesh.
 */

interface RetinueFigure extends FigureSlot {
  scale: number;
  color: THREE.Color;
  falls: boolean;
  fallDelay: number;
  kit: RetinueKit;
}

function makeFigureGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 1.0, 4, 8);
  body.translate(0, 0.86, 0);
  const head = new THREE.SphereGeometry(0.15, 8, 6);
  head.translate(0, 1.68, 0);
  const merged = mergeGeometries([body, head]);
  merged.computeVertexNormals();
  return merged;
}

/** Deterministic retinue roster: position, scale/tint, fall, and kit assignment. */
function buildRetinueFigures(count: number, seed = 31001): RetinueFigure[] {
  const slots = buildRetinueSlots(count, seed);
  const scaleRng = mulberry32(31006);
  const fallRng = mulberry32(31009);
  const kitRng = mulberry32(31010);
  const color = new THREE.Color();
  return slots.map((slot) => {
    color.set(TUNIC_PALETTE[Math.floor(scaleRng() * TUNIC_PALETTE.length)]);
    color.offsetHSL(0, 0, (scaleRng() - 0.5) * 0.08);
    return {
      ...slot,
      scale: 0.95 + scaleRng() * 0.1,
      color: color.clone(),
      // Roughly a third of the thin bodyguard line goes down with the sons;
      // the rest hold the ground (brief: "partially collapses").
      falls: fallRng() < 0.35,
      fallDelay: fallRng() * 3,
      kit: assignRetinueKit(kitRng),
    };
  });
}

const dummy = new THREE.Object3D();
// Parks an unused kit instance off-scene at zero scale rather than giving
// each kit type a variable-length InstancedMesh.
const HIDDEN_MATRIX = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -1000, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function CrestRetinue({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const bowMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(
    () => buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'),
    [],
  );
  const bowGeo = useMemo(() => buildBowGeometry(CROWD_KIT_STATURE, 'handL'), []);
  const figures = useMemo(() => buildRetinueFigures(count), [count]);
  const total = figures.length;

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const bowMesh = bowMeshRef.current;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = retinueFallPose(t, violenceMode, fig.falls, fig.fallDelay);
      const y = terrain.heightAt(fig.x, fig.z) - pose.fallen * 0.12;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(-pose.fallen * 1.35, fig.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
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
        args={[geometry, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
      <instancedMesh
        ref={bowMeshRef}
        args={[bowGeo, undefined, total]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#5c4023" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
