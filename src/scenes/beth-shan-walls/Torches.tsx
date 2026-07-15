import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { NIGHT_WORK_SLOTS } from './layout';
import { torchPresence } from './poses';

/**
 * Torch sprites at the wall for the night retrieval (asset-torch-sprites,
 * reusing the amalekite-camp fire-sprite technique — emissive cone "flame" +
 * circle ember-glow, no new real-time lights). Present only through
 * `torchPresence`'s window around `b-retrieval`; day and pre-dawn stay dark.
 */

const dummy = new THREE.Object3D();

const TORCH_POINTS: [number, number][] = [...NIGHT_WORK_SLOTS.slice(0, 6), [-68, -18], [-66, -42]];

export function Torches() {
  const flameRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const postRef = useRef<THREE.InstancedMesh>(null);
  const count = TORCH_POINTS.length;

  const seeds = useMemo(() => {
    const rng = mulberry32(65901);
    return TORCH_POINTS.map(() => ({ phase: rng() * Math.PI * 2, size: 0.7 + rng() * 0.3 }));
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const { terrain } = useAppStore.getState();
    for (let i = 0; i < count; i++) {
      const [x, z] = TORCH_POINTS[i];
      dummy.position.set(x, terrain.heightAt(x, z) + 0.05, z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(seeds[i].size * 1.3);
      dummy.updateMatrix();
      glow.setMatrixAt(i, dummy.matrix);
    }
    glow.instanceMatrix.needsUpdate = true;
  }, [count, seeds]);

  useFrame(() => {
    const { timeSec: t, terrain } = useAppStore.getState();
    const flames = flameRef.current;
    const posts = postRef.current;
    if (!flames) return;
    const presence = torchPresence(t);
    const postScale = presence > 0.02 ? 1 : 0.0001;
    for (let i = 0; i < count; i++) {
      const [x, z] = TORCH_POINTS[i];
      const { phase, size } = seeds[i];
      const flicker = 1 + Math.sin(t * 9.1 + phase) * 0.12 + Math.sin(t * 21.4 + phase * 2) * 0.06;
      const s = size * presence * flicker;
      dummy.position.set(x, terrain.heightAt(x, z) + 1.1 + 0.3 * s, z);
      dummy.rotation.set(0, t * 0.6 + phase, 0);
      dummy.scale.set(s * 0.5, s, s * 0.5);
      dummy.updateMatrix();
      flames.setMatrixAt(i, dummy.matrix);

      if (posts) {
        dummy.position.set(x, terrain.heightAt(x, z) + 0.55, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(postScale);
        dummy.updateMatrix();
        posts.setMatrixAt(i, dummy.matrix);
      }
    }
    flames.instanceMatrix.needsUpdate = true;
    if (posts) posts.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={flameRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <coneGeometry args={[0.4, 0.85, 6]} />
        <meshStandardMaterial
          color="#3a1804"
          emissive="#ff7a1f"
          emissiveIntensity={2.4}
          roughness={1}
        />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <circleGeometry args={[1.6, 14]} />
        <meshStandardMaterial
          color="#1c0d02"
          emissive="#c2591c"
          emissiveIntensity={0.5}
          roughness={1}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
      {/* A simple post under each flame so the torch reads as a held/planted
          light source, not a floating flame — faded out with the flame when
          not present (daylight beats). */}
      <instancedMesh ref={postRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 5]} />
        <meshStandardMaterial color="#3a2a18" roughness={0.95} />
      </instancedMesh>
    </group>
  );
}
