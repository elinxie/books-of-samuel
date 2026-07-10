import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  sampleFightPoses,
  type CharacterParams,
} from '../../engine/characters';
import { buildEngagedInfantrySlots } from './layout';
import { clashPhase01, infantryEngagedPose } from './poses';
import { buildShieldGeometry, buildStraightSwordGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The facing rank of the Philistine press (`claim-line-defense`,
 * `b-line-clash`): the mirror of `DefenderLine.tsx` on the Philistine side —
 * engages the Israelite defender line directly rather than standing static
 * like the broader infantry mass in `PhilistinePress.tsx`. Same real-limbed
 * bucket-geometry approach as `DefenderLine.tsx`; same round-shield/
 * straight-sword kit convention as `PhilistinePress.tsx`.
 */

const BUCKET_COUNT = 6;

const GENERIC_PHILISTINE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.55,
  shoulders: 1.02,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: '#8f8a72', beltColor: '#5a3722', headwear: 'bare' },
};

export interface EngagedFigureState {
  x: number;
  z: number;
  yaw: number;
  phaseOffset: number;
  scale: number;
  color: THREE.Color;
}

export function buildEngagedFigures(count: number, seed = 31009): EngagedFigureState[] {
  const slots = buildEngagedInfantrySlots(count, seed);
  const rng = mulberry32(seed + 700);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();
  return slots.map((slot) => {
    // See DefenderLine.tsx's identical note: a near-white jitter, not a
    // full hue pick, since it multiplies against the baked body colors.
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    return {
      x: slot.x,
      z: slot.z,
      yaw: slot.yaw,
      phaseOffset: rng(),
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    };
  });
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function EngagedPhilistines({ count, shadows }: { count: number; shadows: boolean }) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const swordMeshRef = useRef<THREE.InstancedMesh>(null);
  const bucketGeometries = useMemo(
    () =>
      sampleFightPoses(BUCKET_COUNT).map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_PHILISTINE_PARAMS,
          poseJointPositions(GENERIC_PHILISTINE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'round', 'handL'), []);
  const swordGeo = useMemo(() => buildStraightSwordGeometry(CROWD_KIT_STATURE), []);
  const figures = useMemo(() => buildEngagedFigures(count), [count]);

  useFrame(() => {
    const shieldMesh = shieldMeshRef.current;
    const swordMesh = swordMeshRef.current;
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const clash = infantryEngagedPose(t, fig.phaseOffset);
      const lean = clash.swing * 0.22;
      const twist = fig.yaw + clash.stagger * 0.35;
      const y = terrain.heightAt(fig.x, fig.z);
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(lean, twist, 0);
      dummy.scale.setScalar(fig.scale);
      dummy.updateMatrix();

      // infantryEngagedPose runs a half-beat out of phase (see poses.ts),
      // so bucket selection uses the same offset for consistency with the
      // body/weapon rotation it's paired with.
      const bucket = Math.min(
        BUCKET_COUNT - 1,
        Math.floor(clashPhase01(t, fig.phaseOffset + 0.5) * BUCKET_COUNT),
      );
      const bucketMesh = bucketMeshRefs.current[bucket]!;
      const slot = bucketCursors.current[bucket]++;
      bucketMesh.setMatrixAt(slot, dummy.matrix);
      bucketMesh.setColorAt(slot, fig.color);

      const weaponSwing = clash.swing * 0.55;
      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.set(lean + weaponSwing, twist, 0);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      swordMesh?.setMatrixAt(i, weaponDummy.matrix);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
    }

    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketMeshRefs.current[b]!;
      mesh.count = bucketCursors.current[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
    if (swordMesh) swordMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {bucketGeometries.map((geo, b) => (
        <instancedMesh
          key={b}
          ref={(el) => {
            bucketMeshRefs.current[b] = el;
          }}
          args={[geo, undefined, figures.length]}
          frustumCulled={false}
          castShadow={shadows}
        >
          <meshStandardMaterial vertexColors roughness={1} />
        </instancedMesh>
      ))}
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
    </group>
  );
}
