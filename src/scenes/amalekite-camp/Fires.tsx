import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { FIRE_POINTS } from './layout';
import { COMPRESS_T, FLIGHT_T, lerp, smoothstep } from './timing';

/**
 * The camp's fire points — the scene's visual signature at dusk (the
 * observer reads the camp's size by its fires, as a scout would). Emissive
 * flame cones + ember-glow discs in two instanced meshes; deliberately NOT
 * real lights, so the single-directional + hemisphere rig stays (scene
 * brief / asset-camp-fire). Fires die to embers across the time-compression
 * card — a day later they are burned down.
 */

const dummy = new THREE.Object3D();

/** Flame size multiplier over the timeline: full through the strike, embers next day. */
export function fireScale(t: number): number {
  if (t < COMPRESS_T) return 1;
  return lerp(1, 0.32, smoothstep((t - COMPRESS_T) / (FLIGHT_T - COMPRESS_T)));
}

export function Fires() {
  const flameRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const count = FIRE_POINTS.length;

  const seeds = useMemo(() => {
    const rng = mulberry32(4311);
    return FIRE_POINTS.map(() => ({ phase: rng() * Math.PI * 2, size: 0.85 + rng() * 0.4 }));
  }, []);

  // Ember glow discs are static; place them once.
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const { terrain } = useAppStore.getState();
    for (let i = 0; i < count; i++) {
      const [x, z] = FIRE_POINTS[i];
      dummy.position.set(x, terrain.heightAt(x, z) + 0.06, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(seeds[i].size);
      dummy.updateMatrix();
      glow.setMatrixAt(i, dummy.matrix);
    }
    glow.instanceMatrix.needsUpdate = true;
  }, [count, seeds]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const flames = flameRef.current;
    if (!flames) return;
    const dieDown = fireScale(t);
    for (let i = 0; i < count; i++) {
      const [x, z] = FIRE_POINTS[i];
      const { phase, size } = seeds[i];
      const flicker = 1 + Math.sin(t * 9.3 + phase) * 0.12 + Math.sin(t * 23.7 + phase * 2) * 0.06;
      const s = size * dieDown * flicker;
      dummy.position.set(x, terrain.heightAt(x, z) + 0.5 * s, z);
      dummy.rotation.set(0, t * 0.7 + phase, 0);
      dummy.scale.set(s * 0.55, s, s * 0.55);
      dummy.updateMatrix();
      flames.setMatrixAt(i, dummy.matrix);
    }
    flames.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={flameRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.55, 1.1, 6]} />
        <meshStandardMaterial
          color="#3a1804"
          emissive="#ff7a1f"
          emissiveIntensity={2.4}
          roughness={1}
        />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <circleGeometry args={[2.2, 16]} />
        <meshStandardMaterial
          color="#1c0d02"
          emissive="#c2591c"
          emissiveIntensity={0.55}
          roughness={1}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  );
}
