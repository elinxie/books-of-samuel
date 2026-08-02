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
import {
  buildAbnerBankSlots,
  buildAbnerSpreadSlots,
  buildAmmahRallySlots,
  buildJoabBankSlots,
  buildJoabSpreadSlots,
  buildPursuerBaseSlots,
} from './layout';
import {
  contingentFigurePose,
  type ContingentFigureParams,
  type ContingentRole,
  type ContingentSide,
} from './poses';
import { buildShieldGeometry, buildSpearGeometry, CROWD_KIT_STATURE } from './kitMeshes';

/**
 * The two wider contingents (`claim-gibeon-contest`, `claim-gibeon-battle-
 * scale`): a generic, side-parameterized crowd component reused for both
 * Abner's and Joab's followings — deliberately undifferentiated kit/dress
 * (`claim-dress`, per the brief's "no invented Judah/Benjamin uniform"), the
 * two sides legible only by grouping and position. Every figure starts at
 * its pool-bank slot, walks to the battle-spread ground once the contest
 * ignites the wider clash, then either falls (a documentary minority, read
 * as the disproportion 2:30-31 states in text — never a literal ratio of
 * it), holds its ground, or continues into the pursuit toward the hill of
 * Ammah as part of the rallying (Abner's side) or pursuing (Joab's side)
 * subset. See `poses.ts`'s `contingentFigurePose` for the pure timeline this
 * renders.
 */

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

const BUCKET_COUNT = 8;
const WALK_CYCLE_SEC = 1.1;

export interface ContingentRenderFigure extends ContingentFigureParams {
  walkPhaseOffset: number;
  scale: number;
  color: THREE.Color;
}

/**
 * Assigns each figure a role (per side) and builds its full pose spec.
 * Abner's side: ~25% fall during the spread clash, a fixed 12-18-figure
 * subset rallies at the hill (drawn from, not additive to, the contingent —
 * per the brief), the remainder scatter/disperse along the retreat and fade
 * from the scene (never depicted falling — dispersal, not a rendered death).
 * Joab's side: a much smaller ~10% fall, a fixed pursuing subset follows to
 * the hill's foot, the remainder hold their ground near the battlefield.
 */
export function buildContingentFigures(
  side: ContingentSide,
  count: number,
  seed: number,
): ContingentRenderFigure[] {
  const bankSlots =
    side === 'abner' ? buildAbnerBankSlots(count, seed) : buildJoabBankSlots(count, seed);
  const spreadSlots =
    side === 'abner'
      ? buildAbnerSpreadSlots(count, seed + 1)
      : buildJoabSpreadSlots(count, seed + 1);
  const rng = mulberry32(seed + 500);
  const paletteRng = mulberry32(seed + 900);
  const color = new THREE.Color();

  const fallCount =
    side === 'abner' ? Math.round(count * 0.25) : Math.min(Math.round(count * 0.1), count);
  const remaining = Math.max(0, count - fallCount);
  const rallyCount =
    side === 'abner'
      ? Math.min(remaining, Math.min(18, Math.max(12, Math.round(count * 0.35))))
      : 0;
  const pursueCount =
    side === 'joab' ? Math.min(remaining, Math.min(16, Math.max(10, Math.round(count * 0.35)))) : 0;

  const rallySlots = side === 'abner' ? buildAmmahRallySlots(rallyCount, seed + 20) : [];
  const pursuerSlots = side === 'joab' ? buildPursuerBaseSlots(pursueCount, seed + 21) : [];

  const out: ContingentRenderFigure[] = [];
  let rallyIdx = 0;
  let pursueIdx = 0;
  for (let i = 0; i < count; i++) {
    let role: ContingentRole;
    if (i < fallCount) {
      role = 'falls';
    } else if (side === 'abner' && i < fallCount + rallyCount) {
      role = 'rally';
    } else if (side === 'joab' && i < fallCount + pursueCount) {
      role = 'pursue';
    } else {
      role = side === 'abner' ? 'scatter' : 'hold';
    }

    color.setRGB(1, 1, 1).offsetHSL(0, 0, (paletteRng() - 0.5) * 0.14);
    const finalSlot: [number, number] | undefined =
      role === 'rally'
        ? rallySlots[rallyIdx++]
        : role === 'pursue'
          ? pursuerSlots[pursueIdx++]
          : undefined;

    out.push({
      side,
      role,
      bank: bankSlots[i % bankSlots.length],
      spread: spreadSlots[i % spreadSlots.length],
      arriveDelay: rng() * 6,
      fallDelay: rng() * 4,
      scatterTargetU: 0.15 + rng() * 0.3,
      scatterFadeDelay: rng() * 3,
      routeDelay: rng() * 8,
      routeArriveDelay: rng() * 6,
      finalSlot,
      walkPhaseOffset: rng(),
      scale: 0.95 + paletteRng() * 0.1,
      color: color.clone(),
    });
  }
  return out;
}

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function Contingent({
  side,
  count,
  seed,
  shadows,
}: {
  side: ContingentSide;
  count: number;
  seed: number;
  shadows: boolean;
}) {
  const bucketMeshRefs = useRef<(THREE.InstancedMesh | null)[]>(Array(BUCKET_COUNT).fill(null));
  const bucketCursors = useRef<number[]>(Array(BUCKET_COUNT).fill(0));
  const spearMeshRef = useRef<THREE.InstancedMesh>(null);
  const shieldMeshRef = useRef<THREE.InstancedMesh>(null);
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
  const shieldGeo = useMemo(() => buildShieldGeometry(CROWD_KIT_STATURE, 'handL'), []);
  const figures = useMemo(() => buildContingentFigures(side, count, seed), [side, count, seed]);

  useFrame(() => {
    const spearMesh = spearMeshRef.current;
    const shieldMesh = shieldMeshRef.current;
    if (bucketMeshRefs.current.some((m) => !m)) return;
    const { timeSec: t, terrain, violenceMode } = useAppStore.getState();
    bucketCursors.current.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = contingentFigurePose(t, fig, violenceMode);

      if (!pose.visible) {
        spearMesh?.setMatrixAt(i, HIDDEN);
        shieldMesh?.setMatrixAt(i, HIDDEN);
        continue;
      }

      const y = terrain.heightAt(pose.x, pose.z) - pose.fallen * 0.12;
      const lean = (pose.moving ? -0.08 : 0) - pose.fallen * 1.35;
      dummy.position.set(pose.x, y, pose.z);
      dummy.rotation.set(lean, pose.yaw, 0);
      const squash = 1 - pose.fallen * 0.55;
      dummy.scale.set(fig.scale, fig.scale * squash, fig.scale);
      dummy.updateMatrix();

      const phase = pose.moving
        ? (t / WALK_CYCLE_SEC + fig.walkPhaseOffset) % 1
        : fig.walkPhaseOffset;
      const bucket = Math.min(
        BUCKET_COUNT - 1,
        Math.floor(Math.min(0.999, Math.max(0, phase)) * BUCKET_COUNT),
      );
      const bucketMesh = bucketMeshRefs.current[bucket]!;
      const slot = bucketCursors.current[bucket]++;
      bucketMesh.setMatrixAt(slot, dummy.matrix);
      bucketMesh.setColorAt(slot, fig.color);

      spearMesh?.setMatrixAt(i, dummy.matrix);
      shieldMesh?.setMatrixAt(i, dummy.matrix);
    }

    for (let b = 0; b < BUCKET_COUNT; b++) {
      const mesh = bucketMeshRefs.current[b]!;
      mesh.count = bucketCursors.current[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    if (spearMesh) spearMesh.instanceMatrix.needsUpdate = true;
    if (shieldMesh) shieldMesh.instanceMatrix.needsUpdate = true;
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
      <instancedMesh
        ref={shieldMeshRef}
        args={[shieldGeo, undefined, figures.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <meshStandardMaterial color="#8a6a3f" roughness={0.85} />
      </instancedMesh>
    </group>
  );
}
