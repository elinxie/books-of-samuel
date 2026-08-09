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
 * Hebron's own townsfolk, going about an ordinary working day — "a working
 * town on an ordinary day, not an assembly" (brief, "Scale assumptions"),
 * deliberately far below hebron-anointing's 150-200-figure civic crowd
 * (~20-30 at high tier, claim-covenant-cast-scale). Not part of the feast:
 * scattered near their homes on the town hill, not gathered at the feast
 * ground. A genuinely static crowd, baked once like `DavidsEscort.tsx` —
 * this scene's cheapest crowd family.
 */

const BUCKET_COUNT = 3;

const GENERIC_TOWNSFOLK_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.44,
  shoulders: 0.92,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: {
    tunicColor: TUNIC_PALETTE[2],
    beltColor: '#5a3722',
    headwear: 'wrap',
    headwrapColor: '#cbb98c',
  },
};

const IDLE_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.05,
    legSwingR: -0.05,
    kneeBendL: 0.1,
    kneeBendR: 0.05,
    armSwingL: 0.12,
    armSwingR: -0.08,
  },
  {
    legSwingL: -0.03,
    legSwingR: 0.06,
    kneeBendL: 0.05,
    kneeBendR: 0.12,
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

export function buildTownAmbientFigures(count: number, seed = 230501): TownFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: TownFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = TOWN_AMBIENT_SLOTS[i % TOWN_AMBIENT_SLOTS.length];
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

export function TownAmbient({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      IDLE_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_TOWNSFOLK_PARAMS,
          poseJointPositions(GENERIC_TOWNSFOLK_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildTownAmbientFigures(count), [count]);
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
