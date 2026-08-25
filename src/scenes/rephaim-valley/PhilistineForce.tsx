import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildCrowdLimbedGeometry, type CharacterParams } from '../../engine/characters';
import {
  buildHeaddressGeometry,
  buildShieldGeometry,
  buildStraightSwordGeometry,
  CROWD_KIT_STATURE,
} from '../gilboa-battle/kitMeshes';
import { PHILISTINE_SPREAD_CENTER, PHILISTINE_SPREAD_SLOTS, RIM_EDGE } from './layout';
import { philistinePose, yawToward, type PhilistineFigureParams } from './poses';

/**
 * The Philistine deployment (`claim-rephaim-first-engagement`,
 * `claim-rephaim-second-engagement`, `claim-rephaim-cast-scale`) — one
 * instanced population reused across both phases (`philistinePose`,
 * ./poses.ts), never doubled. No archer element here (unlike gilboa-battle:
 * 5:17-25 narrates no Philistine archers) — infantry kit only (round shield
 * + straight sword, `claim-philistine-kit`), plus a small kit-differentiated
 * principal cluster carrying the disputed plumed headdress, restated per
 * queue #13's constraint: principal-tier ONLY, never crowd/infantry.
 *
 * No fight-stance pose buckets (the brief's biggest cost-saving vs.
 * Gilboa) — a single rest-pose geometry, position/orientation/collapse
 * updated per frame, the same lighter convention hebron-gate's raid
 * party/mourning assembly established.
 */

const GENERIC_PHILISTINE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: '#8f8a72', beltColor: '#5a3722', headwear: 'bare' },
};

interface PhilistineFigure extends PhilistineFigureParams {
  /** Facing while standing/idle, before any break/fall/disperse — toward
   * the rim, the direction the first threat comes from. */
  standYaw: number;
  principal: boolean;
  scale: number;
  color: THREE.Color;
}

/** Fraction of the population rendered as the small kit-differentiated
 * principal cluster (headdress carriers) — deliberately small. */
const PRINCIPAL_FRACTION = 0.1;

export function buildPhilistineFigures(count: number, seed = 250301): PhilistineFigure[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 200);
  const color = new THREE.Color();
  const principalEvery = Math.max(4, Math.round(1 / PRINCIPAL_FRACTION));
  const out: PhilistineFigure[] = [];
  for (let i = 0; i < count; i++) {
    const slot = PHILISTINE_SPREAD_SLOTS[i % PHILISTINE_SPREAD_SLOTS.length];
    const dx = slot[0] - PHILISTINE_SPREAD_CENTER[0];
    const dz = slot[1] - PHILISTINE_SPREAD_CENTER[1];
    const dist = Math.hypot(dx, dz) || 1;
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      slot,
      falls: rng() < 0.4,
      fallDelay: rng() * 6,
      fleeDir: [dx / dist, dz / dist],
      fleeDist: 55 + rng() * 45,
      standYaw: yawToward(slot[0], slot[1], RIM_EDGE[0], RIM_EDGE[1]),
      principal: i % principalEvery === 0,
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
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

export function PhilistineForce({ count, shadows }: { count: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const headdressMeshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildCrowdLimbedGeometry(GENERIC_PHILISTINE_PARAMS), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'), []);
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);
  const headdressGeo = useMemo(() => buildHeaddressGeometry(CROWD_KIT_STATURE), []);
  const figures = useMemo(() => buildPhilistineFigures(count), [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const shieldMesh = shieldMeshRef.current;
    const swordMesh = swordMeshRef.current;
    const headdressMesh = headdressMeshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = philistinePose(t, fig, violenceMode);
      if (!pose.visible) {
        dummy.matrix.copy(HIDDEN_MATRIX);
      } else {
        const yaw = pose.moving || pose.fallen > 0.01 ? pose.yaw : fig.standYaw;
        const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
        dummy.position.set(pose.x, y, pose.z);
        dummy.rotation.set(-pose.fallen * 1.35, yaw, 0);
        const squash = 1 - pose.fallen * 0.55;
        dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
        dummy.updateMatrix();
      }
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, fig.color);

      const kitVisible = pose.visible && pose.fallen < 0.6;
      shieldMesh?.setMatrixAt(i, kitVisible ? dummy.matrix : HIDDEN_MATRIX);
      swordMesh?.setMatrixAt(i, kitVisible ? dummy.matrix : HIDDEN_MATRIX);
      headdressMesh?.setMatrixAt(i, kitVisible && fig.principal ? dummy.matrix : HIDDEN_MATRIX);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
    if (headdressMesh) headdressMesh.instanceMatrix.needsUpdate = true;
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
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#6e5c3d" roughness={0.8} />
      </instancedMesh>
      <instancedMesh
        ref={swordMeshRef}
        args={[swordGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8c7038" roughness={0.55} metalness={0.35} />
      </instancedMesh>
      <instancedMesh
        ref={headdressMeshRef}
        args={[headdressGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#c9b27a" roughness={0.8} />
      </instancedMesh>
    </group>
  );
}
