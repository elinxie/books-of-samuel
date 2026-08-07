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
import { buildTownBackgroundSlots } from './layout';

/**
 * Ambient townsfolk (`claim-covenant-cast-scale`) — "a working town on an
 * ordinary day," deliberately far below hebron-anointing's 150-200-figure
 * civic assembly: this is a closed political meal, not a public founding.
 * Fully static, baked once — same convention as DavidsEscort.tsx/
 * hebron-anointing's JudahAssembly.tsx.
 */

const BUCKET_COUNT = 3;

const GENERIC_TOWNSFOLK_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.44,
  shoulders: 0.94,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#5a3722', headwear: 'bare' },
};

const TOWN_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.1,
    legSwingR: -0.1,
    kneeBendL: 0.16,
    kneeBendR: 0.08,
    armSwingL: 0.18,
    armSwingR: -0.14,
  },
  {
    legSwingL: -0.08,
    legSwingR: 0.14,
    kneeBendL: 0.1,
    kneeBendR: 0.2,
    armSwingL: 0.3,
    armSwingR: 0.3,
  },
];

interface TownFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
  color: THREE.Color;
}

export function buildTownFigures(count: number, seed = 43501): TownFigure[] {
  const rng = mulberry32(seed);
  const slots = buildTownBackgroundSlots(count);
  const color = new THREE.Color();
  const out: TownFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = slots[i % slots.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.9 + rng() * 0.16,
      color: color.clone(),
    });
  }
  return out;
}

export function TownBackground({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      TOWN_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_TOWNSFOLK_PARAMS,
          poseJointPositions(GENERIC_TOWNSFOLK_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildTownFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: TownFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
        dummy.scale.setScalar(fig.scale);
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
