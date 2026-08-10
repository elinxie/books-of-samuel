import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  REST_LIMB_POSE,
  TUNIC_PALETTE,
  type CharacterParams,
  type CrowdLimbPose,
} from '../../engine/characters';
import { DAVID_FEAST_POS, DAVIDS_SIDE_SLOTS } from './layout';
import { yawToward } from './poses';

/**
 * David's-side feast presence (`claim-covenant-cast-scale`, disclosed ~15-25
 * at high quality tier — no narrated headcount for who attended, per the
 * brief) — a genuinely static crowd, matching hebron-anointing's
 * JudahAssembly.tsx cost precedent: baked idle pose-bucket geometries
 * assigned once per figure at setup, all matrices/colors written once in a
 * setup effect (never `useFrame`), then a fixed "seated" squash-and-lower
 * transform for the whole group (same disclosed placeholder posture as
 * AbnerParty.tsx, `claim-feast-form`) — the group never moves once the
 * scene loads, it is simply present at the feast throughout.
 */

const BUCKET_COUNT = 3;
const SIT_LOWER = 0.42;
const SIT_SQUASH = 0.4;

const GENERIC_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

const FEAST_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.04,
    legSwingR: -0.04,
    kneeBendL: 0.08,
    kneeBendR: 0.05,
    armSwingL: 0.28,
    armSwingR: 0.1,
  },
  {
    legSwingL: -0.02,
    legSwingR: 0.05,
    kneeBendL: 0.05,
    kneeBendR: 0.08,
    armSwingL: 0.1,
    armSwingR: 0.3,
  },
];

interface FeastFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
}

export function buildFeastFigures(count: number, seed = 230501): FeastFigure[] {
  const rng = mulberry32(seed);
  const out: FeastFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = DAVIDS_SIDE_SLOTS[i % DAVIDS_SIDE_SLOTS.length];
    out.push({
      x,
      z,
      yaw: yawToward(x, z, DAVID_FEAST_POS[0], DAVID_FEAST_POS[1]) + (rng() - 0.5) * 0.5,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.92 + rng() * 0.14,
    });
  }
  return out;
}

export function DavidsSideFeast({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      FEAST_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(GENERIC_PARAMS, poseJointPositions(GENERIC_PARAMS.stature, pose)),
      ),
    [],
  );
  const figures = useMemo(() => buildFeastFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: FeastFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
    for (const fig of figures) groups[fig.bucket].push(fig);
    return groups;
  }, [figures]);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketRefs.current[b];
      if (!mesh) continue;
      const group = bucketed[b];
      for (let i = 0; i < group.length; i++) {
        const fig = group[i];
        const y = terrain.heightAt(fig.x, fig.z) - SIT_LOWER;
        dummy.position.set(fig.x, y, fig.z);
        dummy.rotation.set(0, fig.yaw, 0);
        dummy.scale.set(fig.scale, fig.scale * (1 - SIT_SQUASH), fig.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.count = group.length;
      mesh.instanceMatrix.needsUpdate = true;
    }
  }, [bucketed, terrain]);

  return (
    <group>
      {bucketGeometries.map((geo, b) => (
        <instancedMesh
          key={b}
          ref={(el) => {
            bucketRefs.current[b] = el;
          }}
          args={[geo, undefined, Math.max(1, bucketed[b]?.length ?? 1)]}
          frustumCulled={false}
          castShadow={shadows}
        >
          <meshStandardMaterial vertexColors roughness={1} />
        </instancedMesh>
      ))}
    </group>
  );
}
