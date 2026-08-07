import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { buildWrappedFormGeometry } from '../../engine/characters';
import { headBundlePose } from './poses';

/**
 * Ish-bosheth's head, presented and buried (`claim-david-judgment`,
 * `claim-ish-bosheth-assassination`) — the smallest-scale application yet of
 * the project's honest, anatomically-unresolved funerary standard
 * (`buildWrappedFormGeometry`, the same builder used at Beth-shan, the
 * Jabesh bone bundle, and Abner's bier at hebron-gate). ADR-009's absolute
 * dismemberment bar governs this asset unconditionally: no head, face, or
 * anatomical feature of any kind is ever modeled — a small bound bundle,
 * identifiable only by caption text, carried low (never brandished, per the
 * brief's placeholder policy) and never a "trophy" framing at any beat.
 *
 * Carried in along the arrival road, held at the presentation ground through
 * the verdict and execution beats (`headBundlePose`'s own timing), then
 * carried to Abner's tomb and settled — sinking out of view represents
 * burial itself, the same convention `Bier.tsx` (hebron-gate) and
 * `BoneBundle.tsx` (jabesh-burial) already use.
 */

const HEAD_BUNDLE_LENGTH_SCALE = 0.16;

export function HeadBundle({ shadows }: { shadows: boolean }) {
  const formRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => buildWrappedFormGeometry(HEAD_BUNDLE_LENGTH_SCALE), []);

  useFrame(() => {
    const form = formRef.current;
    if (!form) return;
    const { timeSec: t, terrain } = useAppStore.getState();
    const pose = headBundlePose(t);

    form.visible = pose.visible;
    if (!pose.visible) return;

    const groundY = terrain.heightAt(pose.x, pose.z);
    // Held low, close to the carrier — the brief's "carried low, not
    // brandished," never lifted to shoulder or head height.
    const carryLift = 0.1 + pose.carried * 0.28;
    const sinkDrop = pose.sink * 0.4;
    const fadeScale = 1 - pose.sink * 0.85;

    form.position.set(pose.x, groundY + carryLift - sinkDrop, pose.z);
    form.rotation.set(0, pose.yaw, Math.PI / 2); // long axis horizontal, lying flat
    form.scale.setScalar(fadeScale);
  });

  return (
    <mesh ref={formRef} geometry={geometry} castShadow={shadows}>
      <meshStandardMaterial color="#c7bb9a" roughness={0.95} />
    </mesh>
  );
}
