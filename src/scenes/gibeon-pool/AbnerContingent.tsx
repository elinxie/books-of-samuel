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
import { AMMAH_BAND_SLOTS, ISRAEL_CONTINGENT_SLOTS, POOL_CENTER } from './layout';
import { abnerFigurePose, yawToward, type AbnerFigureParams, type AbnerRole } from './poses';
import { buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * Abner's wider Israel/Benjamin contingent (`claim-gibeon-contest`; disclosed
 * design count, brief's "Scale assumptions": ~35-45 figures at high quality
 * tier). Roles split deterministically at build time: a fraction fall in the
 * rout once the wider battle ignites (b-battle-spreads, 2:17); a fraction
 * treks all the way to the hill of Ammah and settles into the rallying band
 * (2:25 — drawn from this contingent, not additive to it); the remainder
 * scatter partway down the pursuit route and stop. Same bucketed
 * walk-cycle-InstancedMesh approach as gilboa-battle's RoutingIsraelites.tsx.
 */

const BUCKET_COUNT = 8;
const WALK_CYCLE_SEC = 1.15;
const FALLS_FRACTION = 0.38;
const BAND_FRACTION = 0.34;

const GENERIC_ISRAELITE_PARAMS: CharacterParams = {
  stature: CROWD_KIT_STATURE,
  build: 0.5,
  shoulders: 1,
  skinColor: '#8f5b3d',
  hairColor: '#1f1712',
  beard: false,
  detail: 'crowd',
  dress: { tunicColor: TUNIC_PALETTE[0], beltColor: '#3b2416', headwear: 'bare' },
};

interface AbnerFigureState extends AbnerFigureParams {
  walkPhaseOffset: number;
  scale: number;
  color: THREE.Color;
}

export function buildAbnerFigures(count: number, seed = 220801): AbnerFigureState[] {
  const rng = mulberry32(seed);
  const paletteRng = mulberry32(seed + 300);
  const color = new THREE.Color();
  let bandCursor = 0;
  const out: AbnerFigureState[] = [];
  for (let i = 0; i < count; i++) {
    const [sx, sz] = ISRAEL_CONTINGENT_SLOTS[i % ISRAEL_CONTINGENT_SLOTS.length];
    const bank: [number, number, number] = [
      sx,
      sz,
      yawToward(sx, sz, POOL_CENTER[0], POOL_CENTER[1]),
    ];
    const roll = rng();
    let role: AbnerRole;
    if (roll < FALLS_FRACTION) role = 'falls';
    else if (roll < FALLS_FRACTION + BAND_FRACTION) role = 'band';
    else role = 'scatter';

    const settleTarget: [number, number] =
      role === 'band' ? AMMAH_BAND_SLOTS[bandCursor++ % AMMAH_BAND_SLOTS.length] : [0, 0];

    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    out.push({
      role,
      bank,
      fallDelay: rng() * 6,
      pursuitDelay: rng() * 10,
      scatterTargetU: 0.26 + rng() * 0.32,
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

export function AbnerContingent({ count, shadows }: { count: number; shadows: boolean }) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const bucketGeometries = useMemo(
    () =>
      sampleWalkPoses(BUCKET_COUNT).map((pose) =>
        buildCrowdLimbedGeometry(
          GENERIC_ISRAELITE_PARAMS,
          poseJointPositions(GENERIC_ISRAELITE_PARAMS.stature, pose),
        ),
      ),
    [],
  );
  const spearGeo = useMemo(() => buildSpearGeometry(CROWD_KIT_STATURE, 'handR'), []);
  const figures = useMemo(() => buildAbnerFigures(count), [count]);

  useFrame(() => {
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const spearMesh = spearMeshRef.current;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = abnerFigurePose(t, fig, violenceMode);
      const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
      const lean = (pose.moving ? -0.06 : 0) - pose.fallen * 1.35;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(lean, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
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
