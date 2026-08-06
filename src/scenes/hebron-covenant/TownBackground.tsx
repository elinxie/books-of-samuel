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
import { TOWN_BACKGROUND_SLOTS } from './layout';

/**
 * Ambient Hebron townspeople (`claim-covenant-cast-scale`) — a working town
 * on an ordinary day, deliberately far below hebron-anointing's 150-200-
 * figure civic assembly. Fully static (three baked pose-bucket
 * `InstancedMesh`es, matrices/colors written once in a setup effect, never
 * per-frame — mirroring `JudahAssembly.tsx`'s cost-zero-per-frame
 * convention): this crowd never moves and never seats itself, since it is
 * not attending the feast, just present in the town around it.
 */

const BUCKET_COUNT = 3;

const GENERIC_TOWNSPERSON_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.48,
  shoulders: 0.98,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

const BACKGROUND_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.04,
    legSwingR: -0.04,
    kneeBendL: 0.08,
    kneeBendR: 0.04,
    armSwingL: 0.1,
    armSwingR: -0.06,
  },
  {
    legSwingL: -0.02,
    legSwingR: 0.05,
    kneeBendL: 0.04,
    kneeBendR: 0.09,
    armSwingL: 0.24,
    armSwingR: 0.2,
  },
];

interface BackgroundFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
  color: THREE.Color;
}

export function buildBackgroundFigures(count: number, seed = 53401): BackgroundFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: BackgroundFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = TOWN_BACKGROUND_SLOTS[i % TOWN_BACKGROUND_SLOTS.length];
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
      BACKGROUND_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_TOWNSPERSON_PARAMS,
          poseJointPositions(GENERIC_TOWNSPERSON_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildBackgroundFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: BackgroundFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
