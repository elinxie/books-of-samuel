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
 * Ambient Hebron townsfolk (`claim-gate-cast-scale`): a working town still
 * visible at its edges, deliberately smaller than and distinct from the
 * mourning assembly proper — the same three-crowd discipline (raid party /
 * mourning assembly / ambient town, never conflated) hebron-covenant used.
 * Two static pose buckets, matrices written once, never `useFrame` — the
 * cheapest crowd in the scene.
 */

const BUCKET_COUNT = 2;
const CHILD_FRACTION = 0.2;

const TOWNSFOLK_PARAMS: CharacterParams = {
  stature: 1.65,
  build: 0.44,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[1],
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const AMBIENT_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: -0.03,
    legSwingR: 0.05,
    kneeBendL: 0.05,
    kneeBendR: 0.1,
    armSwingL: 0.22,
    armSwingR: 0.18,
  },
];

interface AmbientFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  isChild: boolean;
  scale: number;
  color: THREE.Color;
}

export function buildAmbientFigures(count: number, seed = 240601): AmbientFigure[] {
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
      isChild: rng() < CHILD_FRACTION,
      scale: 0.9 + rng() * 0.16,
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
        buildCrowdLimbedGeometry(
          TOWNSFOLK_PARAMS,
          poseJointPositions(TOWNSFOLK_PARAMS.stature, pose),
        ),
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
        const scale = fig.isChild ? fig.scale * 0.62 : fig.scale;
        dummy.position.set(fig.x, y, fig.z);
        dummy.rotation.set(0, fig.yaw, 0);
        dummy.scale.setScalar(scale);
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
