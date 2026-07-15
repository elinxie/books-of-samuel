import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { PYRE_POS } from './layout';
import { pyreFireIntensity, PYRE_COVER_DUR, PYRE_COVER_START } from './poses';

/**
 * The pyre (claim-burning-bodies, asset-pyre): a stacked-timber platform
 * that rises to fully cover the four wrapped forms before any flame renders
 * — the brief's hard constraint, identical in both violence modes. Once
 * covered, the fire is deliberately the one large flame the project
 * renders, reusing the amalekite-camp/Beth-shan emissive-sprite technique at
 * a bigger, brighter scale ("a light source in appearance only" — never a
 * real point/spot light). No wrapped-form or charring detail is ever
 * visible once the logs finish covering (Biers.tsx hides the forms on the
 * same schedule this component's logs finish growing). Standard mode shows
 * the covered pyre lit and burning at documentary distance; reduced mode
 * caps the fire at an embers-only level throughout — `pyreFireIntensity`'s
 * `violenceMode` branch — "cuts from lighting to embers" per the brief. The
 * covered-before-flame timber sequencing itself never varies by mode.
 */

const dummy = new THREE.Object3D();

interface LogSpec {
  x: number;
  z: number;
  restY: number;
  len: number;
  radius: number;
  rotY: number;
  rotZ: number;
  delay: number; // 0..1 fraction across the cover window when this log finishes rising
}

const LOG_COUNT = 26;
const LOG_GROW_DUR = 1.4;

const LOGS: LogSpec[] = (() => {
  const rng = mulberry32(71501);
  const out: LogSpec[] = [];
  for (let i = 0; i < LOG_COUNT; i++) {
    const tier = Math.floor((i / LOG_COUNT) * 4); // 0..3 stacking tiers
    const acrossPlatform = rng() < 0.5;
    const len = 2.0 + rng() * 1.1;
    out.push({
      x: PYRE_POS[0] + (rng() - 0.5) * 5.6,
      z: PYRE_POS[1] + (rng() - 0.5) * 2.2,
      restY: 0.22 + tier * 0.32 + rng() * 0.08,
      len,
      radius: 0.09 + rng() * 0.06,
      rotY: acrossPlatform ? Math.PI / 2 + (rng() - 0.5) * 0.2 : (rng() - 0.5) * 0.2,
      rotZ: (rng() - 0.5) * 0.08,
      delay: i / LOG_COUNT,
    });
  }
  return out;
})();

export function Pyre({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const logRef = useRef<THREE.InstancedMesh>(null);
  const flameRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const [px, pz] = PYRE_POS;
  const groundY = terrain.heightAt(px, pz);

  const flameOffsets: [number, number][] = useMemo(
    () => [
      [-1.4, 0],
      [0.6, 0.4],
      [0.8, -0.5],
    ],
    [],
  );

  useFrame(() => {
    const logs = logRef.current;
    const flames = flameRef.current;
    const glow = glowRef.current;
    if (!logs || !flames || !glow) return;
    const { timeSec: t, violenceMode } = useAppStore.getState();

    for (let i = 0; i < LOGS.length; i++) {
      const log = LOGS[i];
      const startT = PYRE_COVER_START + log.delay * (PYRE_COVER_DUR - LOG_GROW_DUR);
      const growth = Math.min(1, Math.max(0, (t - startT) / LOG_GROW_DUR));
      const eased = growth * growth * (3 - 2 * growth);
      const y = groundY + THREE.MathUtils.lerp(-0.35, log.restY, eased);
      dummy.position.set(log.x, y, log.z);
      dummy.rotation.set(0, log.rotY, log.rotZ);
      dummy.scale.set(log.radius / 0.1, log.len / 2.2, log.radius / 0.1);
      dummy.updateMatrix();
      logs.setMatrixAt(i, dummy.matrix);
    }
    logs.instanceMatrix.needsUpdate = true;

    const intensity = pyreFireIntensity(t, violenceMode);
    for (let i = 0; i < flameOffsets.length; i++) {
      const [ox, oz] = flameOffsets[i];
      const flicker = 1 + Math.sin(t * 8.4 + i * 2) * 0.14 + Math.sin(t * 19 + i) * 0.07;
      const s = Math.max(0.0001, intensity * (0.85 + i * 0.12) * flicker);
      dummy.position.set(px + ox, groundY + 1.3 + 0.4 * s, pz + oz);
      dummy.rotation.set(0, t * 0.5 + i, 0);
      dummy.scale.set(s * 0.7, s * 1.3, s * 0.7);
      dummy.updateMatrix();
      flames.setMatrixAt(i, dummy.matrix);
    }
    flames.instanceMatrix.needsUpdate = true;

    const glowScale = Math.max(0.0001, intensity * 3.2);
    dummy.position.set(px, groundY + 0.08, pz);
    dummy.rotation.set(-Math.PI / 2, 0, 0);
    dummy.scale.setScalar(glowScale);
    dummy.updateMatrix();
    glow.setMatrixAt(0, dummy.matrix);
    glow.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={logRef}
        args={[undefined, undefined, LOGS.length]}
        frustumCulled={false}
        castShadow={shadows}
        receiveShadow
      >
        <cylinderGeometry args={[0.1, 0.1, 2.2, 6]} />
        <meshStandardMaterial color="#4b3a24" roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={flameRef} args={[undefined, undefined, 3]} frustumCulled={false}>
        <coneGeometry args={[0.55, 1.3, 7]} />
        <meshStandardMaterial
          color="#3a1804"
          emissive="#ff8a24"
          emissiveIntensity={3.2}
          roughness={1}
        />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, 1]} frustumCulled={false}>
        <circleGeometry args={[1.4, 20]} />
        <meshStandardMaterial
          color="#1c0d02"
          emissive="#c2591c"
          emissiveIntensity={0.6}
          roughness={1}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  );
}
