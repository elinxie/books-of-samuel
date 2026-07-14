import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { buildArcherSlots } from './layout';
import {
  ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE,
  ARCHER_VOLLEY_WAVE_COUNT,
  archerVolleyWaveStart,
  arrowArcHeight,
  arrowFlightProgress,
  arrowTargetScatterRadius,
  lerp,
} from './poses';

/**
 * Instanced arrow-volley projectile system (`b-archers`, 1 Samuel 31:3 —
 * "the archers found him"). One shared geometry/material `InstancedMesh`,
 * matrices rewritten per frame for a small, fixed-size roster of arrows (see
 * `buildArrowRoster` — capped well inside the brief's ~20-40-simultaneous
 * budget regardless of quality tier/archerCount, per
 * docs/design/gilboa-battle-brief.md's performance target and the prior
 * ~1.5x frame-time regression flagged from the melee-clash work). Arrows
 * that aren't currently airborne are parked off-screen at zero scale rather
 * than removed, so the instance count never changes at runtime.
 *
 * Arrows originate from the same footprint `PhilistinePress.tsx`'s archer
 * element actually stands on (`buildArcherSlots`) and arc toward the crest
 * death-group's footprint, converging tighter with each successive wave
 * (`arrowTargetScatterRadius`). No impact/wound geometry is ever drawn — an
 * arrow simply stops being airborne once its flight window ends; Saul's
 * reaction is carried entirely by `saulPose`'s existing kneel transform in
 * `PrincipalFigures.tsx`, not by anything in this file (ADR-009).
 */

export interface ArrowInstance {
  originX: number;
  originZ: number;
  targetX: number;
  targetZ: number;
  waveStart: number;
}

/**
 * A deterministic, fixed-size arrow roster: `ARCHER_VOLLEY_WAVE_COUNT` waves
 * of up to `ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE` arrows each, sampled from the
 * archer line's own footprint so the volley reads as coming from the
 * rendered archers rather than an independently invented origin. Pure/seeded
 * so it stays unit-testable and identical across renders.
 */
export function buildArrowRoster(archerCount: number, seed = 31014): ArrowInstance[] {
  const arrowsPerWave = Math.max(1, Math.min(ARCHER_VOLLEY_MAX_ARROWS_PER_WAVE, archerCount));
  const origins = buildArcherSlots(arrowsPerWave, seed + 1);
  const rng = mulberry32(seed);
  const roster: ArrowInstance[] = [];
  for (let wave = 0; wave < ARCHER_VOLLEY_WAVE_COUNT; wave++) {
    const scatter = arrowTargetScatterRadius(wave);
    const waveStart = archerVolleyWaveStart(wave);
    for (let k = 0; k < arrowsPerWave; k++) {
      const origin = origins[k];
      const angle = rng() * Math.PI * 2;
      const r = rng() * scatter;
      roster.push({
        originX: origin.x,
        originZ: origin.z,
        targetX: Math.cos(angle) * r,
        targetZ: Math.sin(angle) * r * 0.75,
        waveStart,
      });
    }
  }
  return roster;
}

/** A thin shaft + small tip + tail fletching, built along +Z so a direction
 * quaternion (`setFromUnitVectors([0,0,1], velocity)`) points the tip of
 * travel forward. */
function buildArrowGeometry(): THREE.BufferGeometry {
  const length = 0.85;
  const shaftLen = length * 0.82;
  const shaftR = 0.012;
  const tipLen = length * 0.14;
  const fletchLen = length * 0.1;

  const shaft = new THREE.CylinderGeometry(shaftR, shaftR, shaftLen, 5);
  shaft.rotateX(Math.PI / 2);

  const tip = new THREE.ConeGeometry(shaftR * 2.4, tipLen, 5);
  tip.rotateX(Math.PI / 2);
  tip.translate(0, 0, shaftLen / 2 + tipLen / 2);

  const fletch = new THREE.ConeGeometry(shaftR * 3, fletchLen, 4);
  fletch.rotateX(Math.PI / 2);
  fletch.translate(0, 0, -shaftLen / 2 - fletchLen / 2);

  const merged = mergeGeometries([shaft, tip, fletch]);
  merged.computeVertexNormals();
  return merged;
}

const dummy = new THREE.Object3D();
const dir = new THREE.Vector3();
const fromAxis = new THREE.Vector3(0, 0, 1);
const parkPosition = new THREE.Vector3(0, -500, 0);

/** GPU-cheap instanced arrow volley: `PARK_SCALE` (0) hides arrows not currently airborne. */
export function ArrowVolley({ archerCount, shadows }: { archerCount: number; shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => buildArrowGeometry(), []);
  const roster = useMemo(() => buildArrowRoster(archerCount), [archerCount]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t } = useAppStore.getState();

    for (let i = 0; i < roster.length; i++) {
      const a = roster[i];
      const progress = arrowFlightProgress(t, a.waveStart);
      if (progress === null) {
        dummy.position.copy(parkPosition);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        continue;
      }

      const originY = terrain.heightAt(a.originX, a.originZ) + 1.6;
      const targetY = terrain.heightAt(a.targetX, a.targetZ) + 1.0;
      const arc = arrowArcHeight(progress, 9);
      const x = lerp(a.originX, a.targetX, progress);
      const z = lerp(a.originZ, a.targetZ, progress);
      const y = lerp(originY, targetY, progress) + arc;

      // Sample a hair further along the arc to get a facing direction.
      const nextProgress = Math.min(1, progress + 0.02);
      const nx = lerp(a.originX, a.targetX, nextProgress);
      const nz = lerp(a.originZ, a.targetZ, nextProgress);
      const ny = lerp(originY, targetY, nextProgress) + arrowArcHeight(nextProgress, 9);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(1);
      dir.set(nx - x, ny - y, nz - z);
      if (dir.lengthSq() > 1e-8) {
        dir.normalize();
        dummy.quaternion.setFromUnitVectors(fromAxis, dir);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, roster.length]}
      frustumCulled={false}
      castShadow={shadows}
    >
      <meshStandardMaterial color="#3a2a18" roughness={0.75} />
    </instancedMesh>
  );
}
