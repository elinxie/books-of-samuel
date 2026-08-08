import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { bundlePose } from './poses';

/**
 * The covered bundle presented to David and later buried in Abner's tomb
 * (`asset-head-bundle`, `claim-david-judgment`): the head of Ish-bosheth
 * (4:8, 4:12b) renders ONLY as a small, wrapped, anatomically unresolved
 * form — the same `buildWrappedFormGeometry` treatment used for the Jabesh
 * bone bundle and hebron-gate's own bier, at a short bundle-scale
 * `lengthScale`. Identifiable by caption alone, never by geometry — ADR-009's
 * dismemberment bar is unconditional, and this is the one place in the
 * scene closest to that line. Carried low on the Arabah road, lowered (not
 * brandished) at the presentation, left resting through the verdict and
 * execution, then carried to the tomb and interred, fading from view exactly
 * as `Bier.tsx`'s wrapped form does — never a graphic burial.
 */

const BUNDLE_LENGTH_SCALE = 0.24;

export function HeadBundle({ shadows }: { shadows: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => buildWrappedFormGeometry(BUNDLE_LENGTH_SCALE), []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = bundlePose(t);

    mesh.visible = pose.visible;
    if (!pose.visible) return;

    const groundY = terrain.heightAt(pose.x, pose.z);
    const sink = pose.buried * 0.35;
    const liftY = groundY + 0.1 + pose.carried * 0.62 - sink;
    const scale = 1 - pose.buried * 0.35;

    mesh.position.set(pose.x, liftY, pose.z);
    mesh.rotation.set(0, pose.yaw, Math.PI / 2);
    mesh.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow={shadows}>
      <meshStandardMaterial color="#cfc4a4" roughness={0.95} />
    </mesh>
  );
}
