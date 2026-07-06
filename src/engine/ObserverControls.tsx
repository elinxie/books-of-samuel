import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useAppStore } from '../state/store';
import { terrainHeight } from './terrain';
import { useKeys } from './useKeys';

const EYE_HEIGHT = 1.7;
const WALK_SPEED = 4.5; // m/s — brisk walk
const RUN_MULTIPLIER = 2.2;
const WORLD_LIMIT = 620;

/**
 * First-person, invisible neutral-observer navigation.
 * - inspect: orbit/pan with a free cursor so labels stay clickable.
 * - walk: pointer-lock WASD at eye height following the terrain.
 * Teleports are requested through the store and consumed here.
 */
export function ObserverControls() {
  const navMode = useAppStore((s) => s.navMode);
  const camera = useThree((s) => s.camera);
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const keys = useKeys();
  const dir = useRef(new THREE.Vector3());
  const side = useRef(new THREE.Vector3());

  // Consume teleport requests.
  const pendingTeleport = useAppStore((s) => s.pendingTeleport);
  const clearTeleport = useAppStore((s) => s.clearTeleport);
  useEffect(() => {
    if (!pendingTeleport) return;
    const [x, yOffset, z] = pendingTeleport.position;
    const y = terrainHeight(x, z) + EYE_HEIGHT + yOffset;
    camera.position.set(x, y, z);
    const [lx, lyOffset, lz] = pendingTeleport.lookAt;
    const ly = terrainHeight(lx, lz) + lyOffset;
    if (orbitRef.current) {
      orbitRef.current.target.set(lx, ly, lz);
      orbitRef.current.update();
    } else {
      camera.lookAt(lx, ly, lz);
    }
    clearTeleport();
  }, [pendingTeleport, camera, clearTeleport]);

  // Walk-mode movement.
  useFrame((_, rawDt) => {
    if (navMode !== 'walk') return;
    const dt = Math.min(rawDt, 0.1);
    const k = keys.current;
    const forward =
      (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    const strafe =
      (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) -
      (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    const speed = WALK_SPEED * (k.has('ShiftLeft') || k.has('ShiftRight') ? RUN_MULTIPLIER : 1);

    if (forward !== 0 || strafe !== 0) {
      camera.getWorldDirection(dir.current);
      dir.current.y = 0;
      dir.current.normalize();
      side.current.crossVectors(dir.current, THREE.Object3D.DEFAULT_UP).normalize();
      camera.position.addScaledVector(dir.current, forward * speed * dt);
      camera.position.addScaledVector(side.current, strafe * speed * dt);
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -WORLD_LIMIT, WORLD_LIMIT);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -WORLD_LIMIT, WORLD_LIMIT);
    }
    // Follow the ground smoothly even when standing still (post-teleport).
    const groundY = terrainHeight(camera.position.x, camera.position.z) + EYE_HEIGHT;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, groundY, 0.25);
  });

  const setNavMode = useAppStore((s) => s.setNavMode);

  if (navMode === 'walk') {
    return <PointerLockControls onUnlock={() => setNavMode('inspect')} />;
  }
  return (
    <OrbitControls
      ref={orbitRef}
      makeDefault
      enableDamping
      dampingFactor={0.12}
      maxPolarAngle={Math.PI / 2 - 0.02}
      minDistance={2}
      maxDistance={700}
    />
  );
}
