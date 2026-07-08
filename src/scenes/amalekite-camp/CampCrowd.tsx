import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { TUNIC_PALETTE } from '../../engine/characters';
import { ATTACKER_SLOTS, CAPTIVE_POS, CAPTIVE_SLOTS, CLUSTERS } from './layout';
import { clamp01, DRIVE_T, lerp, RAIDERS_GONE_T, RECOVERY_T, smoothstep, STRIKE_T } from './timing';

/**
 * Scripted reenactment of 1 Samuel 30:16–20 for the crowd, in one instanced
 * mesh (pure pose functions per ADR-007): raiders feasting then scattering
 * at the strike (claim-camp-sprawl, claim-strike-timing), David's attackers
 * charging from the staging line, and the captives — seated until the
 * recovery, then reunited and walking north (claim-full-recovery). Violence
 * per the brief: figures crumple at distance in failing light; no gore
 * geometry; after the compression card the fallen are not rendered.
 */

const MARCH_SPEED = 3.4;
const FLEE_SPEED = 5.0;
const CHARGE_SPEED = 5.4;
const GATHER_SPEED = 4.0;
const DRIVE_SPEED = 3.2;
const STAGE_ARRIVE_T = 16; // attackers settle on the staging line by here

export type CampGroup = 'raider' | 'attacker' | 'captive';

export interface CampFigureState {
  group: CampGroup;
  /** Feast spot (raider), staging slot (attacker), or seat (captive). */
  home: [number, number];
  /** Raiders: flee heading (radians) and how far they get. */
  fleeDir: number;
  fleeDist: number;
  /** Raiders: whether this figure crumples at fleeDist (out of frame focus). */
  falls: boolean;
  /** Raiders: seconds after the strike before the alarm reaches this figure. */
  alarmDelay: number;
  /** Attackers: charge target inside the sprawl. */
  target: [number, number];
  /** Where this figure gathers at the recovery/reunion. */
  reunionSlot: [number, number];
  /** Column lane x for the drive north. */
  lane: number;
  bobPhase: number;
  /** Raiders: dancing (larger sway) vs. sitting at the fire. */
  dancer: boolean;
}

export interface CampPose {
  x: number;
  z: number;
  yaw: number;
  /** 0..1 seated/crouched blend (captives seated; attackers staged low). */
  kneel: number;
  /** 0..1 crumple blend for fallen raiders. */
  fall: number;
  moving: boolean;
  visible: boolean;
}

const HIDDEN: CampPose = { x: 0, z: 0, yaw: 0, kneel: 0, fall: 0, moving: false, visible: false };

/** Position/rest-pose for one crowd figure at scene time t. Exported for unit tests. */
export function campFigurePose(t: number, fig: CampFigureState): CampPose {
  if (fig.group === 'raider') {
    if (t >= RAIDERS_GONE_T) return HIDDEN;
    const alarmT = STRIKE_T + fig.alarmDelay;
    const [hx, hz] = fig.home;
    if (t < alarmT) {
      // Feasting around the fire; sway/dance is render-side ornamentation.
      return {
        x: hx,
        z: hz,
        yaw: fig.fleeDir + Math.PI,
        kneel: fig.dancer ? 0 : 0.5,
        fall: 0,
        moving: false,
        visible: true,
      };
    }
    const run = (t - alarmT) * FLEE_SPEED;
    if (fig.falls && run >= fig.fleeDist) {
      const fall = smoothstep((run - fig.fleeDist) / (FLEE_SPEED * 0.7));
      return {
        x: hx + Math.sin(fig.fleeDir) * fig.fleeDist,
        z: hz + Math.cos(fig.fleeDir) * fig.fleeDist,
        yaw: fig.fleeDir,
        kneel: 0,
        fall,
        moving: false,
        visible: true,
      };
    }
    return {
      x: hx + Math.sin(fig.fleeDir) * run,
      z: hz + Math.cos(fig.fleeDir) * run,
      yaw: fig.fleeDir,
      kneel: 0,
      fall: 0,
      moving: true,
      visible: true,
    };
  }

  if (fig.group === 'attacker') {
    const [sx, sz] = fig.home;
    if (t < STAGE_ARRIVE_T) {
      // Column closes up from the north onto the staging line.
      const back = (STAGE_ARRIVE_T - t) * MARCH_SPEED;
      return { x: sx, z: sz - back, yaw: 0, kneel: 0, fall: 0, moving: true, visible: back < 130 };
    }
    if (t < STRIKE_T) {
      // Waiting low below the rise while the camp feasts.
      const settle = smoothstep((t - STAGE_ARRIVE_T) / 3);
      return { x: sx, z: sz, yaw: 0, kneel: 0.35 * settle, fall: 0, moving: false, visible: true };
    }
    const [tx, tz] = fig.target;
    const chargeDist = Math.hypot(tx - sx, tz - sz) || 1;
    const p = clamp01(((t - STRIKE_T) * CHARGE_SPEED) / chargeDist);
    let x = lerp(sx, tx, p);
    let z = lerp(sz, tz, p);
    let yaw = Math.atan2(tx - sx, tz - sz);
    let moving = p < 1;
    if (t >= RECOVERY_T) {
      const [rx, rz] = fig.reunionSlot;
      const gatherDist = Math.hypot(rx - tx, rz - tz) || 1;
      const g = clamp01(((t - RECOVERY_T) * GATHER_SPEED) / gatherDist);
      x = lerp(tx, rx, g);
      z = lerp(tz, rz, g);
      yaw =
        g < 1 ? Math.atan2(rx - tx, rz - tz) : Math.atan2(CAPTIVE_POS[0] - x, CAPTIVE_POS[1] - z);
      moving = g < 1;
    }
    if (t >= DRIVE_T) {
      const dt = t - DRIVE_T;
      const settle = smoothstep(dt / 8);
      x = lerp(x, fig.lane, settle);
      z -= dt * DRIVE_SPEED;
      return { x, z, yaw: Math.PI, kneel: 0, fall: 0, moving: true, visible: true };
    }
    return { x, z, yaw, kneel: 0, fall: 0, moving, visible: true };
  }

  // Captives: seated under guard until the recovery, then standing, reunited,
  // and walking north with the column.
  const [hx, hz] = fig.home;
  if (t < RECOVERY_T) {
    return { x: hx, z: hz, yaw: Math.PI, kneel: 1, fall: 0, moving: false, visible: true };
  }
  const rise = smoothstep((t - RECOVERY_T) / 2.5);
  const [rx, rz] = fig.reunionSlot;
  const mingle = smoothstep((t - RECOVERY_T - 3) / 10);
  let x = lerp(hx, rx, mingle);
  let z = lerp(hz, rz, mingle);
  if (t >= DRIVE_T) {
    const dt = t - DRIVE_T;
    const settle = smoothstep(dt / 8);
    x = lerp(x, fig.lane, settle);
    z -= dt * DRIVE_SPEED;
    return { x, z, yaw: Math.PI, kneel: 0, fall: 0, moving: true, visible: true };
  }
  return {
    x,
    z,
    yaw: mingle > 0.02 && mingle < 0.98 ? Math.atan2(rx - hx, rz - hz) : Math.PI,
    kneel: 1 - rise,
    fall: 0,
    moving: mingle > 0.02 && mingle < 0.98,
    visible: true,
  };
}

function makeFigureGeometry(): THREE.BufferGeometry {
  const body = new THREE.CapsuleGeometry(0.26, 1.0, 4, 8);
  body.translate(0, 0.86, 0);
  const head = new THREE.SphereGeometry(0.15, 8, 6);
  head.translate(0, 1.68, 0);
  const merged = mergeGeometries([body, head]);
  merged.computeVertexNormals();
  return merged;
}

/** Deterministic figure roster scaled by the quality tier's figureCount. */
export function buildCampFigures(figureCount: number): CampFigureState[] {
  const rng = mulberry32(8200);
  const out: CampFigureState[] = [];
  const raiderCount = figureCount;
  const attackerCount = Math.max(1, Math.round(figureCount * 0.55));
  const captiveCount = Math.max(1, Math.round(figureCount * 0.28));

  for (let i = 0; i < raiderCount; i++) {
    const cluster = CLUSTERS[i % CLUSTERS.length];
    const angle = rng() * Math.PI * 2;
    const r = 2 + rng() * (cluster.radius - 2.5);
    const home: [number, number] = [
      cluster.center[0] + Math.cos(angle) * r,
      cluster.center[1] + Math.sin(angle) * r,
    ];
    // Flee away from the basin's north edge (the attack comes from there),
    // fanned outward from the cluster's fire.
    const away = Math.atan2(home[0] - cluster.center[0], home[1] - cluster.center[1]);
    const fleeDir = away * 0.5 + (rng() - 0.5) * 1.2 + (home[0] > 10 ? 0.5 : -0.5) * rng();
    out.push({
      group: 'raider',
      home,
      fleeDir,
      fleeDist: 8 + rng() * 22,
      falls: rng() < 0.55,
      alarmDelay: 1.5 + (cluster.center[1] + 40) / 32 + rng() * 2,
      target: [0, 0],
      reunionSlot: [0, 0],
      lane: 0,
      bobPhase: rng() * Math.PI * 2,
      dancer: rng() < 0.45,
    });
  }

  for (let i = 0; i < attackerCount; i++) {
    const cluster = CLUSTERS[(i * 7) % CLUSTERS.length];
    out.push({
      group: 'attacker',
      home: ATTACKER_SLOTS[i % ATTACKER_SLOTS.length],
      fleeDir: 0,
      fleeDist: 0,
      falls: false,
      alarmDelay: 0,
      target: [
        cluster.center[0] + (rng() - 0.5) * cluster.radius * 1.6,
        cluster.center[1] + (rng() - 0.5) * cluster.radius * 1.6,
      ],
      reunionSlot: [
        CAPTIVE_POS[0] + Math.cos(rng() * Math.PI * 2) * (7 + rng() * 8),
        CAPTIVE_POS[1] + Math.sin(rng() * Math.PI * 2) * (7 + rng() * 8),
      ],
      lane: -16 + (i % 12) * 2.4 + (rng() - 0.5) * 1.2,
      bobPhase: rng() * Math.PI * 2,
      dancer: false,
    });
  }

  for (let i = 0; i < captiveCount; i++) {
    out.push({
      group: 'captive',
      home: CAPTIVE_SLOTS[i % CAPTIVE_SLOTS.length],
      fleeDir: 0,
      fleeDist: 0,
      falls: false,
      alarmDelay: 0,
      target: [0, 0],
      reunionSlot: [CAPTIVE_POS[0] + (rng() - 0.5) * 10, CAPTIVE_POS[1] + (rng() - 0.5) * 9],
      lane: -16 + (i % 12) * 2.4 + (rng() - 0.5) * 1.2,
      bobPhase: rng() * Math.PI * 2,
      dancer: false,
    });
  }

  return out;
}

const dummy = new THREE.Object3D();

export function CampCrowd({ figureCount, shadows }: { figureCount: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => makeFigureGeometry(), []);
  const figures = useMemo(() => buildCampFigures(figureCount), [figureCount]);
  const total = figures.length;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rng = mulberry32(8201);
    const color = new THREE.Color();
    for (let i = 0; i < total; i++) {
      color.set(TUNIC_PALETTE[Math.floor(rng() * TUNIC_PALETTE.length)]);
      color.offsetHSL(0, 0, (rng() - 0.5) * 0.08);
      // Captives read slightly paler — worn, undyed cloth after captivity.
      if (figures[i].group === 'captive') color.offsetHSL(0, -0.06, 0.07);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [total, figures]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < figures.length; i++) {
      const fig = figures[i];
      const pose = campFigurePose(t, fig);
      if (!pose.visible) {
        dummy.position.set(0, -60, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      } else {
        const y = terrain.heightAt(pose.x, pose.z);
        let bob = 0;
        let sway = 0;
        if (pose.moving) {
          bob = Math.abs(Math.sin(t * 4.2 + fig.bobPhase)) * 0.07;
        } else if (fig.group === 'raider' && t < STRIKE_T + fig.alarmDelay && fig.dancer) {
          // Feast dancing: a taller rhythmic bob and yaw sway at the fire.
          bob = Math.abs(Math.sin(t * 3.1 + fig.bobPhase)) * 0.16;
          sway = Math.sin(t * 1.9 + fig.bobPhase) * 0.5;
        }
        dummy.position.set(pose.x, y + bob + pose.fall * 0.12, pose.z);
        const kneelScale = 1 - pose.kneel * 0.42;
        dummy.scale.set(0.95, 0.95 * kneelScale, 0.95);
        dummy.rotation.set(pose.kneel * 0.35 - pose.fall * 1.4, pose.yaw + sway, 0);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, total]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}
