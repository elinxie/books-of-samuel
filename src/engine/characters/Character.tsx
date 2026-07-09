import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { makeClips } from './animation';
import { buildCharacterRig } from './bodyGeometry';
import { WALK_STRIDE_M, type CharacterParams, type ClipName } from './types';

/**
 * A fully skinned, animated principal figure (David, Abiathar, …). Position
 * and yaw are the parent group's job; this component owns the mesh, the
 * mixer, and clip crossfades. Driven by scene time from the app store, so it
 * pauses and scrubs with the timeline. Crowds should NOT use this — they go
 * through the baked-pose instancing path (see bake.ts / ADR-009).
 */
export function Character({
  params,
  clip,
  speed = 1.5,
  shadows = false,
}: {
  params: CharacterParams;
  clip: ClipName;
  /** Ground speed in m/s while walking; sets walk timeScale (no skating). */
  speed?: number;
  shadows?: boolean;
}) {
  const { mesh, mixer, actions, material } = useMemo(() => {
    const rig = buildCharacterRig(params);
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.SkinnedMesh(rig.geometry, material);
    // Skinned bounds don't track animation; the figure is always near the camera path.
    mesh.frustumCulled = false;
    mesh.add(rig.root);
    mesh.bind(rig.skeleton);
    const mixer = new THREE.AnimationMixer(mesh);
    const clips = makeClips(params.stature);
    const actions = {} as Record<ClipName, THREE.AnimationAction>;
    for (const name of ['walk', 'idle', 'kneel', 'mourn'] as const) {
      actions[name] = mixer.clipAction(clips[name]);
    }
    actions.kneel.setLoop(THREE.LoopOnce, 1);
    actions.kneel.clampWhenFinished = true;
    return { mesh, mixer, actions, material };
  }, [params]);

  useEffect(() => {
    return () => {
      mesh.geometry.dispose();
      material.dispose();
    };
  }, [mesh, material]);

  useEffect(() => {
    mesh.castShadow = shadows;
  }, [mesh, shadows]);

  useEffect(() => {
    actions.walk.timeScale = speed / WALK_STRIDE_M;
  }, [actions, speed]);

  const activeRef = useRef<ClipName | null>(null);
  useEffect(() => {
    const prev = activeRef.current;
    if (prev === clip) return;
    const next = actions[clip];
    next
      .reset()
      .fadeIn(prev ? 0.35 : 0)
      .play();
    if (prev) actions[prev].fadeOut(0.35);
    activeRef.current = clip;
  }, [actions, clip]);

  const lastTime = useRef<number | null>(null);
  useFrame(() => {
    const { timeSec } = useAppStore.getState();
    const last = lastTime.current;
    lastTime.current = timeSec;
    if (last === null) return;
    const dt = timeSec - last;
    if (dt > 0) {
      mixer.update(Math.min(dt, 0.25));
    } else if (dt < -0.5) {
      // Timeline scrubbed backwards: restart the active clip cleanly.
      const active = activeRef.current;
      if (active) actions[active].reset().play();
    }
  });

  return <primitive object={mesh} />;
}
