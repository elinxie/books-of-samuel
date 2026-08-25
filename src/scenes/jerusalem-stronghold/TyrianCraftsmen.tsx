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
import { TYRIAN_CRAFTSMEN_SLOTS } from './layout';

/**
 * Tyrian carpenters and masons (`tyrian-craftsmen`, `claim-hiram-building`)
 * — ≈10-15 figures at high tier, clustered at the construction ground.
 * **Carries no invented Phoenician dress**: the same undifferentiated
 * `claim-dress` treatment as every other group, differentiated only by
 * proximity to timber/stone (`ConstructionGround.tsx`) and by a bent-forward
 * "at work" pose bucket — never by clothing or iconography (Resolved design
 * calls, the same no-invented-side-uniforms rule ratified at gibeon-pool).
 * Static baked idle/work-pose buckets, same cost precedent as the rest of
 * this scene's ambient crowds.
 */

const BUCKET_COUNT = 3;

const CRAFTSMAN_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 0.98,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

const WORK_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  // A bent-forward "handling timber/stone" lean — legible as work without
  // any attached tool geometry.
  {
    legSwingL: 0.1,
    legSwingR: -0.05,
    kneeBendL: 0.22,
    kneeBendR: 0.14,
    armSwingL: 0.5,
    armSwingR: 0.4,
  },
  {
    legSwingL: -0.06,
    legSwingR: 0.12,
    kneeBendL: 0.16,
    kneeBendR: 0.24,
    armSwingL: 0.34,
    armSwingR: 0.46,
  },
];

interface CraftsmanFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
}

export function buildCraftsmanFigures(count: number, seed = 241201): CraftsmanFigure[] {
  const rng = mulberry32(seed);
  const out: CraftsmanFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = TYRIAN_CRAFTSMEN_SLOTS[i % TYRIAN_CRAFTSMEN_SLOTS.length];
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.92 + rng() * 0.14,
    });
  }
  return out;
}

export function TyrianCraftsmen({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      WORK_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          CRAFTSMAN_PARAMS,
          poseJointPositions(CRAFTSMAN_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildCraftsmanFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: CraftsmanFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
