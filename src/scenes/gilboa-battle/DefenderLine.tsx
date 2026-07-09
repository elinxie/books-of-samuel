import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  sampleFightPoses,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { buildDefenderSlots, type FigureSlot } from './layout';
import { clashPhase01, defenderClashPose, defenderFallPose } from './poses';
import { buildShieldGeometry, buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Israel's defensive line (`claim-line-defense`, `b-line-clash`): a rank
 * holding ground short of the crest, engaging the facing Philistine press
 * directly (`EngagedPhilistines.tsx` mirrors this on the Philistine side)
 * before the position gives way into the existing rout at `T_ROUT`. Body
 * geometry is real limbed crowd-tier figures (`buildCrowdLimbedGeometry`),
 * not the old capsule blob, cycling through baked braced-stance leg-pose
 * buckets (`sampleFightPoses`) as the clash progresses — one InstancedMesh
 * per bucket, `mesh.count` set to however many figures are in that bucket
 * this frame, so leg motion doesn't require per-instance skeletal skinning.
 * Kit stays the existing principal spear/oval-shield conventions
 * (`claim-israelite-muster-kit`).
 */

const BUCKET_COUNT = 6;

/** A single generic crowd-tier Israelite preset — per-instance variety comes
 * from `mesh.setColorAt` tinting (same convention as the rest of this
 * scene), not from multiple baked body geometries. */
const GENERIC_ISRAELITE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

export interface DefenderFigureState extends FigureSlot {
  phaseOffset: number;
  falls: boolean;
  fallDelay: number;
  scale: number;
  color: THREE.Color;
}

export function buildDefenderFigures(count: number, seed = 31006): DefenderFigureState[] {
  const slots = buildDefenderSlots(count, seed);
  const rng = mulberry32(seed + 700);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();
  return slots.map((slot) => {
    // The body geometry now bakes its own tunic/skin vertex colors
    // (`buildCrowdLimbedGeometry`); this instance color multiplies against
    // those, so it stays a near-white brightness jitter rather than a full
    // hue pick (which would double-tint against the baked colors).
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    return {
      ...slot,
      phaseOffset: rng(),
      // A minority of the line goes down as the position breaks — the
      // majority hold and transition into the (separately rendered) rout.
      falls: rng() < 0.3,
      fallDelay: rng() * 4,
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    };
  });
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function DefenderLine({ count, shadows }: { count: number; shadows: boolean }) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
  const bucketGeometries = useMemo(
    () =>
      sampleFightPoses(BUCKET_COUNT).map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_ISRAELITE_PARAMS,
          poseJointPositions(GENERIC_ISRAELITE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'oval', 'handL'), []);
  const figures = useMemo(() => buildDefenderFigures(count), [count]);

  useFrame(() => {
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const clash = defenderClashPose(t, fig.phaseOffset);
      const fall = defenderFallPose(t, violenceMode, fig.falls, fig.fallDelay);
      // Body: a forward/back lean on the swing beat, a small twist on the
      // stagger reaction, settling into the same collapse transform the
      // rest of the scene's fall poses use (rotation + squash, never a new
      // mesh or wound geometry).
      const lean = clash.swing * 0.22 - fall.fallen * 1.35;
      const twist = fig.yaw + clash.stagger * 0.35;
      const y = terrain.heightAt(fig.x, fig.z) - fall.fallen * 0.12;
      dummy.position.set(fig.x, y, fig.z);
      dummy.rotation.set(lean, twist, 0);
      const squash = 1 - fall.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      dummy.updateMatrix();

      const bucket = Math.min(
        BUCKET_COUNT - 1,
        Math.floor(clashPhase01(t, fig.phaseOffset) * BUCKET_COUNT),
      );
      const bucketMesh = bucketMeshRefs.current[bucket]!;
      const slot = bucketCursors.current[bucket]++;
      bucketMesh.setMatrixAt(slot, dummy.matrix);
      bucketMesh.setColorAt(slot, fig.color);

      // Weapon rides the same position/twist but with an exaggerated swing
      // extension so the spear itself reads as thrusting/withdrawing —
      // independent of the body's smaller lean.
      const weaponSwing = clash.swing * 0.55;
      weaponDummy.position.copy(dummy.position);
      weaponDummy.rotation.set(lean + weaponSwing, twist, 0);
      weaponDummy.scale.copy(dummy.scale);
      weaponDummy.updateMatrix();
      spearMesh?.setMatrixAt(i, weaponDummy.matrix);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
    }

    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketMeshRefs.current[b]!;
      mesh.count = bucketCursors.current[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
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
    </group>
  );
}
