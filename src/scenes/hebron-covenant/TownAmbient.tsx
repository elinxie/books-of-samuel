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
import { TOWN_AMBIENT_SLOTS } from './layout';

/**
 * Hebron's own townspeople, going about an ordinary working day
 * (claim-covenant-cast-scale) — a disclosed design count (~20-30 at high
 * quality tier), deliberately far below hebron-anointing's 150-200-figure
 * civic assembly: that was a public founding, this is a closed political
 * meal, and the contrast in scale is itself part of what the scene
 * communicates (brief's "Scale assumptions"). Static/cheap, same
 * pose-bucket convention as `DavidsEscort.tsx`/hebron-anointing's
 * `JudahAssembly.tsx`.
 */

const BUCKET_COUNT = 2;

const AMBIENT_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[2],
    beltColor: '#4a3a26',
    headwear: 'wrap',
    headwrapColor: '#b69b6d',
  },
};

const AMBIENT_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: -0.03,
    legSwingR: 0.05,
    kneeBendL: 0.04,
    kneeBendR: 0.1,
    armSwingL: 0.28,
    armSwingR: 0.24,
  },
];

interface AmbientFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
  isChild: boolean;
  color: THREE.Color;
}

const CHILD_FRACTION = 0.2;

export function buildAmbientFigures(count: number, seed = 230801): AmbientFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: AmbientFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = TOWN_AMBIENT_SLOTS[i % TOWN_AMBIENT_SLOTS.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.9 + rng() * 0.16,
      isChild: rng() < CHILD_FRACTION,
      color: color.clone(),
    });
  }
  return out;
}

export function TownAmbient({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      AMBIENT_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(AMBIENT_PARAMS, poseJointPositions(AMBIENT_PARAMS.stature, pose)),
      ),
    [],
  );
  const figures = useMemo(() => buildAmbientFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: AmbientFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
        const y = terrain.heightAt(fig.x, fig.z);
        dummy.position.set(fig.x, y, fig.z);
        dummy.rotation.set(0, fig.yaw, 0);
        dummy.scale.setScalar(fig.isChild ? fig.scale * 0.62 : fig.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, fig.color);
      }
      mesh.count = group.length;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
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
