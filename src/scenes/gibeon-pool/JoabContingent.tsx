import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  buildCrowdLimbedGeometry,
  poseJointPositions,
  sampleWalkPoses,
  TUNIC_PALETTE,
  type CharacterParams,
} from '../../engine/characters';
import { AMMAH_PURSUER_SLOTS, JUDAH_CONTINGENT_SLOTS, POOL_CENTER } from './layout';
import { joabFigurePose, yawToward, type JoabFigureParams, type JoabRole } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Joab's wider Judah contingent (`claim-gibeon-contest`; disclosed design
 * count, brief's "Scale assumptions": ~30-40 figures at high quality tier).
 * Most stay near the south bank/champions' ground throughout — the text
 * names only Joab and Abishai (and, alone and ahead of them, Asahel) as
 * pursuing Abner; a smaller detachment drawn from this contingent follows
 * the chase, pausing at the 2:23b "stood still" moment (the bystanders
 * nearest Asahel when he falls) before halting at the hill's foot. Same
 * bucketed walk-cycle-InstancedMesh approach as AbnerContingent.tsx.
 */

const BUCKET_COUNT = 8;
const WALK_CYCLE_SEC = 1.15;
const PURSUE_FRACTION = 0.34;

const GENERIC_JUDAHITE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#a66d48',
  hairColor: '#2b1d14',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[2], beltColor: '#3b2416', headwear: 'bare' },
};

interface JoabFigureState extends JoabFigureParams {
  walkPhaseOffset: number;
  scale: number;
  color: THREE.Color;
}

export function buildJoabFigures(count: number, seed = 220802): JoabFigureState[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 300);
  const color = new THREE.Color();
  let pursueCursor = 0;
  const out: JoabFigureState[] = [];
  for (let i = 0; i < count; i++) {
    const [sx, sz] = JUDAH_CONTINGENT_SLOTS[i % JUDAH_CONTINGENT_SLOTS.length];
    const bank: [number, number, number] = [
      sx,
      sz,
      yawToward(sx, sz, POOL_CENTER[0], POOL_CENTER[1]),
    ];
    const role: JoabRole = rng() < PURSUE_FRACTION ? 'pursue' : 'stay';
    const settleTarget: [number, number] =
      role === 'pursue' ? AMMAH_PURSUER_SLOTS[pursueCursor++ % AMMAH_PURSUER_SLOTS.length] : [0, 0];

    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      role,
      bank,
      pursuitDelay: rng() * 8,
      settleTarget,
      walkPhaseOffset: rng(),
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const weaponDummy = new THREE.Object3D();

export function JoabContingent({ count, shadows }: { count: number; shadows: boolean }) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const bucketGeometries = useMemo(
    () =>
      sampleWalkPoses(BUCKET_COUNT).map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_JUDAHITE_PARAMS,
          poseJointPositions(GENERIC_JUDAHITE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const figures = useMemo(() => buildJoabFigures(count), [count]);

  useFrame(() => {
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const spearMesh = spearMeshRef.current;
    const { timeSec: t, terrain } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = joabFigurePose(t, fig);
      const y = terrain.heightAt(pose.x, pose.z);
      const lean = pose.moving ? -0.06 : 0;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(lean, pose.yaw, 0);
      dummy.scale.set(fig.scale, fig.scale, fig.scale);
      dummy.updateMatrix();

      const phase = pose.moving
        ? (t / WALK_CYCLE_SEC + fig.walkPhaseOffset) % 1
        : fig.walkPhaseOffset;
      const bucket = Math.min(BUCKET_COUNT - 1, Math.floor(Math.max(0, phase) * BUCKET_COUNT));
      const bucketMesh = bucketMeshRefs.current[bucket]!;
      const slot = bucketCursors.current[bucket]++;
      bucketMesh.setMatrixAt(slot, dummy.matrix);
      bucketMesh.setColorAt(slot, fig.color);

      if (spearMesh) {
        weaponDummy.position.copy(dummy.position);
        weaponDummy.rotation.copy(dummy.rotation);
        weaponDummy.scale.copy(dummy.scale);
        weaponDummy.updateMatrix();
        spearMesh.setMatrixAt(i, weaponDummy.matrix);
      }
    }

    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketMeshRefs.current[b]!;
      mesh.count = bucketCursors.current[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {bucketGeometries.map((geo, b) => (
        <instancedMesh
          key={b}
          ref={(el) => {
            bucketMeshRefs.current[b] = el;
          }}
          args={[geo, undefined, figures.length]}
          frustumCulled={false}
          castShadow={shadows}
        >
          <meshStandardMaterial vertexColors roughness={1} />
        </instancedMesh>
      ))}
      <instancedMesh
        ref={spearMeshRef}
        args={[spearGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#7a5a35" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
