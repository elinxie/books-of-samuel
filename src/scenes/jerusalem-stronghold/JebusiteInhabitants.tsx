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
import { JEBUSITE_WALL_SLOTS } from './layout';

/**
 * The Jebusite stronghold population (`jebusites`, `claim-jerusalem-
 * capture`, `claim-stronghold-cast-scale`) — ≈25-40 figures at high tier,
 * visible along the wall line facing the approach during b-approach/
 * b-taunt. A genuinely static crowd (same cost precedent as
 * hebron-anointing's JudahAssembly.tsx): baked idle pose-bucket geometries,
 * all matrices written once in a setup effect, never `useFrame`. **No
 * figure here ever performs the blind-and-lame taunt** — these are ordinary
 * standing/watching poses only, per the brief's Resolved design calls; the
 * taunt itself is spoken and captioned, never enacted. The narrative does
 * not say what becomes of this population after the capture, and this
 * project does not invent an answer — no removal, harm, or replacement is
 * staged anywhere; this component simply renders continuously.
 */

const BUCKET_COUNT = 3;

// Same undifferentiated `claim-dress` treatment as every other group in this
// project (no invented Canaanite/Jebusite ethnic costume — the project has
// no source basis to distinguish it, queue #22's open Jerusalem material-
// culture gap) — the only tunic-color variation used elsewhere for legible
// grouping, nothing about headwear or form.
const JEBUSITE_PARAMS: CharacterParams = {
  stature: 1.66,
  build: 0.48,
  shoulders: 0.94,
  skinColor: '#8a5a3a',
  hairColor: '#241a10',
  beard: true,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[3], beltColor: '#3b2416', headwear: 'bare' },
};

const WATCH_POSE_BUCKETS: CrowdLimbPose[] = [
  REST_LIMB_POSE,
  {
    legSwingL: 0.03,
    legSwingR: -0.03,
    kneeBendL: 0.06,
    kneeBendR: 0.04,
    armSwingL: 0.12,
    armSwingR: -0.08,
  },
  {
    legSwingL: -0.02,
    legSwingR: 0.04,
    kneeBendL: 0.04,
    kneeBendR: 0.07,
    armSwingL: -0.06,
    armSwingR: 0.16,
  },
];

interface WallFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
}

export function buildWallFigures(count: number, seed = 241001): WallFigure[] {
  const rng = mulberry32(seed);
  const out: WallFigure[] = [];
  for (let i = 0; i < count; i++) {
    const slot = JEBUSITE_WALL_SLOTS[i % JEBUSITE_WALL_SLOTS.length];
    out.push({
      x: slot.x,
      z: slot.z,
      yaw: slot.yaw + (rng() - 0.5) * 0.3,
      bucket: Math.floor(rng() * BUCKET_COUNT),
      scale: 0.92 + rng() * 0.14,
    });
  }
  return out;
}

export function JebusiteInhabitants({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      WATCH_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          JEBUSITE_PARAMS,
          poseJointPositions(JEBUSITE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildWallFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: WallFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
