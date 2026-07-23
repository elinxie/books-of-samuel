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
import { ASSEMBLY_SLOTS } from './layout';

/**
 * The representative Judah assembly ("the men of Judah", 2:4) —
 * claim-judah-anointing, claim-judah-assembly-scale: Hebron's own
 * townspeople plus a visible elder contingent, explicitly standing for the
 * anointing crowd, not a literal tribal muster. The largest single mass in
 * the scene (~150-200 figures at high quality tier) and, per the brief, the
 * one that should be *cheaper per figure* than a moving battle line: this
 * is a genuinely static crowd — three baked "assembly" pose-bucket
 * geometries (standing rest, a weight-shifted stance, hands drawn forward)
 * assigned once per figure at setup and never re-posed per frame (contrast
 * DefenderLine.tsx's per-frame bucket cycling for a moving clash). All
 * matrices/colors are written once, in a setup effect, not `useFrame` — the
 * whole group costs nothing per frame after that.
 */

const BUCKET_COUNT = 3;

const GENERIC_JUDAHITE_PARAMS: CharacterParams = {
  stature: 1.68,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

const ASSEMBLY_POSE_BUCKETS: CrowdLimbPose[] = [
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
    armSwingL: 0.32,
    armSwingR: 0.32,
  },
];

interface AssemblyFigure {
  x: number;
  z: number;
  yaw: number;
  bucket: number;
  scale: number;
  color: THREE.Color;
}

export function buildAssemblyFigures(count: number, seed = 221301): AssemblyFigure[] {
  const rng = mulberry32(seed);
  const color = new THREE.Color();
  const out: AssemblyFigure[] = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = ASSEMBLY_SLOTS[i % ASSEMBLY_SLOTS.length];
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

export function JudahAssembly({ count, shadows }: { count: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const bucketRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketGeometries = useMemo(
    () =>
      ASSEMBLY_POSE_BUCKETS.map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_JUDAHITE_PARAMS,
          poseJointPositions(GENERIC_JUDAHITE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const figures = useMemo(() => buildAssemblyFigures(count), [count]);
  const bucketed = useMemo(() => {
    const groups: AssemblyFigure[][] = Array.from({ length: BUCKET_COUNT }, () => []);
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
