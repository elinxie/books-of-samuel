import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import {
  Character,
  WALK_STRIDE_M,
  bakePoseBuckets,
  buildCharacterRig,
  makeClips,
  randomCharacterParams,
  type ClipName,
  type PoseBucketSet,
} from '../../engine/characters';
import { APPROACH_CURVE, EXIT_CURVE, PLAZA_SLOTS } from './layout';

/**
 * Scripted reenactment of 1 Samuel 30:1–9: the column returns from the north,
 * gathers on the open center, grieves, and finally departs south toward the
 * Besor. Figures are procedural skinned characters (ADR-009) rendered at
 * ~1:10 of the narrated six hundred (see claim-600-men,
 * asset-figure-procedural). The crowd uses baked-pose instancing: each frame
 * every figure is assigned to the nearest baked pose bucket of its body
 * variant; David and Abiathar are fully animated principal rigs.
 *
 * Timeline constants are derived from the beats in scenes.ts.
 */

const MARCH_SPEED = 2.2; // m/s, urgent pace
const EXIT_SPEED = 2.6;
const HEAD_START_DIST = 100; // meters from column head to plaza at t=0
const RANK_SPACING = 2.0;
const GRIEF_T = 57;
const STAND_T = 132;
const DEPART_T = 136;

/** Subtle per-figure tint multiplied over the baked vertex colors — keep
 * these near white or the whole figure darkens. */
const WOOL_PALETTE = [
  '#ffffff',
  '#f3ece0',
  '#e9e4da',
  '#fff4e4',
  '#e5dcd2',
  '#f6efe9',
  '#ece9e2',
  '#fbf3e3',
];

const VARIANT_SEEDS = [1011, 2022, 3033];
const BUCKET_COUNTS = { walk: 8, kneel: 4, idle: 3 } as const;

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

interface FigureState {
  rank: number;
  lane: number;
  laneOffset: number;
  slot: [number, number];
  kneeler: boolean;
  bobPhase: number;
}

const dummy = new THREE.Object3D();
const tmpVec = new THREE.Vector3();
const tmpTan = new THREE.Vector3();

/** Position/yaw/pose for one figure at scene time t. Exported for unit tests. */
export function figurePose(
  t: number,
  fig: FigureState,
  curveLen: number,
  exitLen: number,
): { x: number; z: number; yaw: number; kneel: number; moving: boolean; visible: boolean } {
  const sHead = curveLen - HEAD_START_DIST + t * MARCH_SPEED;
  const s = sHead - fig.rank * RANK_SPACING;
  const arrivalT = (HEAD_START_DIST + fig.rank * RANK_SPACING) / MARCH_SPEED;

  // Departure south
  const sOut = (t - DEPART_T - fig.rank * 0.8) * EXIT_SPEED;
  if (t >= DEPART_T && sOut > 0) {
    const u = Math.min(sOut / exitLen, 1);
    EXIT_CURVE.getPointAt(u, tmpVec);
    EXIT_CURVE.getTangentAt(u, tmpTan);
    let x = tmpVec.x + fig.laneOffset;
    let z = tmpVec.z;
    // Blend out of the plaza slot over the first meters.
    if (sOut < 8) {
      const b = smoothstep(sOut / 8);
      x = fig.slot[0] + (x - fig.slot[0]) * b;
      z = fig.slot[1] + (z - fig.slot[1]) * b;
    }
    return { x, z, yaw: Math.atan2(tmpTan.x, tmpTan.z), kneel: 0, moving: true, visible: true };
  }

  if (t >= arrivalT) {
    // Fan out from the curve end to the assigned slot at marching speed.
    APPROACH_CURVE.getPointAt(1, tmpVec);
    const dx = fig.slot[0] - tmpVec.x;
    const dz = fig.slot[1] - tmpVec.z;
    const dist = Math.hypot(dx, dz) || 1;
    const fan = Math.min(((t - arrivalT) * MARCH_SPEED) / dist, 1);
    const x = tmpVec.x + dx * fan;
    const z = tmpVec.z + dz * fan;
    const settled = fan >= 1;
    // Grieving pose: kneel/slump between GRIEF_T and STAND_T once settled.
    let kneel = 0;
    if (settled) {
      const kneelStart = Math.max(GRIEF_T, arrivalT + dist / MARCH_SPEED + 2);
      kneel = smoothstep((t - kneelStart) / 2.5) * (1 - smoothstep((t - STAND_T) / 2));
    }
    const yaw = settled ? Math.atan2(-x, -(z + 6)) : Math.atan2(dx, dz);
    return { x, z, yaw, kneel, moving: !settled, visible: true };
  }

  // Marching along the approach curve, two abreast.
  const u = Math.min(Math.max(s / curveLen, 0), 1);
  APPROACH_CURVE.getPointAt(u, tmpVec);
  APPROACH_CURVE.getTangentAt(u, tmpTan);
  const yaw = Math.atan2(tmpTan.x, tmpTan.z);
  // Perpendicular lane offset
  const px = Math.cos(yaw) * fig.lane;
  const pz = -Math.sin(yaw) * fig.lane;
  return { x: tmpVec.x + px, z: tmpVec.z + pz, yaw, kneel: 0, moving: true, visible: s > 0 };
}

/** Flat list of baked pose bucket geometries across all body variants. */
interface CrowdBuckets {
  geometries: THREE.BufferGeometry[];
  /** geometry list index for (variant, kind, frame) */
  indexOf: (variant: number, kind: keyof PoseBucketSet, frame: number) => number;
}

function bakeCrowd(): CrowdBuckets {
  const geometries: THREE.BufferGeometry[] = [];
  const offsets: Record<string, number> = {};
  VARIANT_SEEDS.forEach((seed, v) => {
    const params = randomCharacterParams(mulberry32(seed), { detail: 'crowd' });
    const rig = buildCharacterRig(params);
    const clips = makeClips(params.stature);
    const buckets = bakePoseBuckets(rig, clips, BUCKET_COUNTS);
    rig.geometry.dispose();
    for (const kind of ['walk', 'kneel', 'idle'] as const) {
      offsets[`${v}:${kind}`] = geometries.length;
      geometries.push(...buckets[kind]);
    }
  });
  return {
    geometries,
    indexOf: (variant, kind, frame) => offsets[`${variant}:${kind}`] + frame,
  };
}

export function ReturningMen({ figureCount, shadows }: { figureCount: number; shadows: boolean }) {
  const davidRef = useRef<THREE.Group>(null);
  const abiatharRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const [davidClip, setDavidClip] = useState<ClipName>('walk');
  const [abiatharClip, setAbiatharClip] = useState<ClipName>('idle');

  const crowd = useMemo(() => bakeCrowd(), []);
  const crowdMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const figures = useMemo<FigureState[]>(() => {
    const rng = mulberry32(1030);
    return Array.from({ length: figureCount }, (_, i) => ({
      rank: Math.floor(i / 2) + 1,
      lane: (i % 2 === 0 ? -1 : 1) * (0.8 + rng() * 0.3),
      laneOffset: (rng() - 0.5) * 2.4,
      slot: PLAZA_SLOTS[(i + 2) % PLAZA_SLOTS.length],
      kneeler: i % 3 === 0,
      bobPhase: rng() * Math.PI * 2,
    }));
  }, [figureCount]);

  const tints = useMemo(() => {
    const rng = mulberry32(808);
    return Array.from({ length: figureCount }, () => {
      const c = new THREE.Color(WOOL_PALETTE[Math.floor(rng() * WOOL_PALETTE.length)]);
      c.offsetHSL(0, 0, (rng() - 0.5) * 0.05);
      return c;
    });
  }, [figureCount]);

  const lengths = useMemo(
    () => ({ curve: APPROACH_CURVE.getLength(), exit: EXIT_CURVE.getLength() }),
    [],
  );

  // David's dress is pinned so he stays recognizable across sessions; identity
  // remains label-based (asset-david-marker) — this is wardrobe, not a face.
  const davidParams = useMemo(
    () =>
      randomCharacterParams(mulberry32(41), {
        detail: 'principal',
        stature: 1.72,
        dress: {
          tunicColor: '#8f8168',
          cloakColor: '#7a3b2e',
          beltColor: '#4e3c2b',
          headwear: 'wrap',
          headwrapColor: '#7d6a52',
        },
      }),
    [],
  );
  const abiatharParams = useMemo(
    () =>
      randomCharacterParams(mulberry32(42), {
        detail: 'principal',
        stature: 1.64,
        dress: {
          tunicColor: '#d8d2c0', // linen tone
          cloakColor: undefined,
          beltColor: '#665038',
          headwear: 'wrap',
          headwrapColor: '#d8d2c0',
        },
      }),
    [],
  );

  useEffect(() => () => crowdMaterial.dispose(), [crowdMaterial]);
  useEffect(
    () => () => {
      for (const g of crowd.geometries) g.dispose();
    },
    [crowd],
  );

  const counts = useMemo(() => new Array<number>(crowd.geometries.length), [crowd]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    counts.fill(0);

    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = figurePose(t, fig, lengths.curve, lengths.exit);
      if (!pose.visible) continue;

      let bucket: number;
      if (pose.moving) {
        const speed = t >= DEPART_T ? EXIT_SPEED : MARCH_SPEED;
        const phase = (t * speed) / WALK_STRIDE_M + fig.bobPhase;
        const frame =
          Math.floor((phase - Math.floor(phase)) * BUCKET_COUNTS.walk) % BUCKET_COUNTS.walk;
        bucket = crowd.indexOf(i % VARIANT_SEEDS.length, 'walk', frame);
      } else if (pose.kneel > 0.05) {
        // Kneelers sink fully; the rest slump partway (kneeler flag varies depth).
        const depth = fig.kneeler ? pose.kneel : pose.kneel * 0.6;
        const frame = Math.min(
          BUCKET_COUNTS.kneel - 1,
          Math.round(depth * (BUCKET_COUNTS.kneel - 1)),
        );
        bucket = crowd.indexOf(i % VARIANT_SEEDS.length, 'kneel', frame);
      } else {
        const idlePhase = t * 0.35 + fig.bobPhase;
        const frame =
          Math.floor((idlePhase - Math.floor(idlePhase)) * BUCKET_COUNTS.idle) % BUCKET_COUNTS.idle;
        bucket = crowd.indexOf(i % VARIANT_SEEDS.length, 'idle', frame);
      }

      const mesh = meshRefs.current[bucket];
      if (!mesh) continue;
      const slot = counts[bucket]++;
      dummy.position.set(pose.x, terrain.heightAt(pose.x, pose.z), pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(slot, dummy.matrix);
      mesh.setColorAt(slot, tints[i]);
    }

    for (let b = 0; b < crowd.geometries.length; b++) {
      const mesh = meshRefs.current[b];
      if (!mesh) continue;
      mesh.count = counts[b];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    // David: marches ahead of the column, stands apart at the strengthen beat.
    const david = davidRef.current;
    if (david) {
      const sHead = lengths.curve - HEAD_START_DIST + t * MARCH_SPEED + 6;
      const arrivalT = (HEAD_START_DIST - 6) / MARCH_SPEED;
      let x: number;
      let z: number;
      let yaw: number;
      if (t >= DEPART_T - 1.5) {
        const sOut = (t - (DEPART_T - 1.5)) * EXIT_SPEED;
        const u = Math.min(sOut / lengths.exit, 1);
        EXIT_CURVE.getPointAt(u, tmpVec);
        EXIT_CURVE.getTangentAt(u, tmpTan);
        const b = smoothstep(sOut / 8);
        x = 14 + (tmpVec.x - 14) * b;
        z = -1 + (tmpVec.z - -1) * b;
        yaw = Math.atan2(tmpTan.x, tmpTan.z);
      } else if (t >= 105) {
        const f = smoothstep((t - 105) / 5);
        x = 2.5 + (14 - 2.5) * f;
        z = -7 + (-1 - -7) * f;
        yaw = Math.atan2(-x, -z - 40); // facing away, toward the north road
      } else if (t >= arrivalT) {
        const f = smoothstep(((t - arrivalT) * MARCH_SPEED) / 12);
        APPROACH_CURVE.getPointAt(1, tmpVec);
        x = tmpVec.x + (2.5 - tmpVec.x) * f;
        z = tmpVec.z + (-7 - tmpVec.z) * f;
        yaw = Math.atan2(0 - x, -6 - z);
      } else {
        const u = Math.min(Math.max(sHead / lengths.curve, 0), 1);
        APPROACH_CURVE.getPointAt(u, tmpVec);
        APPROACH_CURVE.getTangentAt(u, tmpTan);
        x = tmpVec.x;
        z = tmpVec.z;
        yaw = Math.atan2(tmpTan.x, tmpTan.z);
      }
      const moving = t < arrivalT || t >= DEPART_T - 1.5 || (t >= 105 && t < 110);
      david.position.set(x, terrain.heightAt(x, z), z);
      david.rotation.set(0, yaw, 0);
      const clip: ClipName = moving ? 'walk' : t >= GRIEF_T && t < 105 ? 'mourn' : 'idle';
      if (clip !== davidClip) setDavidClip(clip);
    }

    // Abiathar: appears in the crowd, brings the ephod to David at the inquiry beat.
    const abiathar = abiatharRef.current;
    if (abiathar) {
      const appear = smoothstep((t - 64) / 2);
      let x = -7;
      let z = 5;
      let movingAb = false;
      if (t >= 122) {
        const f = smoothstep((t - 122) / 4);
        x = -7 + (12.4 - -7) * f;
        z = 5 + (0.6 - 5) * f;
        movingAb = t < 126.5;
      }
      if (t >= DEPART_T + 1.6) {
        const sOut = (t - (DEPART_T + 1.6)) * EXIT_SPEED;
        const u = Math.min(sOut / lengths.exit, 1);
        EXIT_CURVE.getPointAt(u, tmpVec);
        const b = smoothstep(sOut / 8);
        x = 12.4 + (tmpVec.x - 12.4) * b;
        z = 0.6 + (tmpVec.z - 0.6) * b;
        movingAb = true;
      }
      abiathar.position.set(x, terrain.heightAt(x, z), z);
      abiathar.scale.setScalar(appear * 0.95 + 0.001);
      abiathar.rotation.set(0, Math.atan2(14 - x, -1 - z), 0);
      const clip: ClipName = movingAb ? 'walk' : 'idle';
      if (clip !== abiatharClip) setAbiatharClip(clip);
    }
  });

  return (
    <group>
      {crowd.geometries.map((geo, b) => (
        <instancedMesh
          key={b}
          ref={(m) => {
            meshRefs.current[b] = m;
          }}
          args={[geo, crowdMaterial, figureCount]}
          frustumCulled={false}
          castShadow={shadows}
        />
      ))}

      {/* David — narrative figure, distinguished by pinned dress + label only */}
      <group ref={davidRef}>
        <Character params={davidParams} clip={davidClip} speed={MARCH_SPEED} shadows={shadows} />
      </group>

      {/* Abiathar the priest — linen tones */}
      <group ref={abiatharRef}>
        <Character
          params={abiatharParams}
          clip={abiatharClip}
          speed={MARCH_SPEED}
          shadows={shadows}
        />
      </group>
    </group>
  );
}
