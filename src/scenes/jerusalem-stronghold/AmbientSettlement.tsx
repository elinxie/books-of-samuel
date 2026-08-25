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
import { AMBIENT_SETTLEMENT_SLOTS } from './layout';

/**
 * Ambient household/settlement presence after the occupation (`claim-
 * stronghold-cast-scale`) — ≈20-30 figures at high tier, static, inside the
 * enclosure. Deliberately unspecified continuity: the narrative does not say
 * whether this population is continuing Jebusite residents, David's own
 * people, or a mix, and this component does not assert an answer either way
 * — it renders only "a settled presence now inside David's city," matching
 * `claim-city-of-david-naming`'s bare naming statement and nothing more.
 * Same static baked idle-bucket cost precedent as JebusiteInhabitants.tsx/
 * hebron-covenant's TownAmbient.tsx — never `useFrame`.
 */

const BUCKET_COUNT = 3;

const GENERIC_SETTLED_PARAMS: CharacterParams = {
  stature: 1.67,
  build: 0.48,
  shoulders: 0.96,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[1], beltColor: '#3b2416', headwear: 'bare' },
};

const AMBIENT_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.06,
    legSwingR: -0.06,
    kneeBendL: 0.1,
    kneeBendR: 0.06,
    armSwingL: 0.14,
    armSwingR: -0.1,
  },
  {
    legSwingL: -0.04,
    legSwingR: 0.07,
    kneeBendL: 0.06,
    kneeBendR: 0.14,
    armSwingL: 0.2,
    armSwingR: 0.22,
  },
];

interface AmbientFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
  color: THREE.Color;
}

export function buildAmbientFigures(count: number, seed = 241101): AmbientFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: AmbientFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = AMBIENT_SETTLEMENT_SLOTS[i % AMBIENT_SETTLEMENT_SLOTS.length];
    color.setRGB(1, 1, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
    out.push({
      x,
      z,
      yaw: rng() * Math.PI * 2,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.92 + rng() * 0.14,
      color: color.clone(),
    });
  }
  return out;
}

export function AmbientSettlement({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      AMBIENT_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_SETTLED_PARAMS,
          poseJointPositions(GENERIC_SETTLED_PARAMS.stature, pose),
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
