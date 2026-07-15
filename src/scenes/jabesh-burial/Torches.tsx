import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { buildColumnFigures, columnFigurePose, type ColumnFigure } from './RetrievalColumn';
import { columnTorchPresence, T_RECEIVED } from './poses';

/**
 * Torch sprites carried by the retrieval column (asset-torch-sprites,
 * reusing the amalekite-camp fire-sprite technique — emissive cone flame +
 * circle ember-glow, no new real-time lights). Unlike Beth-shan's static
 * wall-foot torches, these move with their bearer: "the torches of the
 * returning column string down the dark wadi path" is the composition's
 * money shot (brief, "Sightlines") — compose it first.
 */

const dummy = new THREE.Object3D();
const HIDDEN = new THREE.Matrix4().compose(
  new THREE.Vector3(0, -500, 0),
  new THREE.Quaternion(),
  new THREE.Vector3(0.0001, 0.0001, 0.0001),
);

export function Torches({ count }: { count: number }) {
  const flameRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const postRef = useRef<THREE.InstancedMesh>(null);

  const figures = useMemo<ColumnFigure[]>(() => buildColumnFigures(count), [count]);
  const torchFigures = useMemo(() => figures.filter((f) => f.hasTorch), [figures]);
  const seeds = useMemo(() => {
    const rng = mulberry32(71402);
    return torchFigures.map(() => ({ phase: rng() * Math.PI * 2, size: 0.75 + rng() * 0.25 }));
  }, [torchFigures]);

  useFrame(() => {
    const flames = flameRef.current;
    const glow = glowRef.current;
    const posts = postRef.current;
    if (!flames || !glow || !posts) return;
    const { timeSec: t, terrain } = useAppStore.getState();

    for (let i = 0; i < torchFigures.length; i++) {
      const fig = torchFigures[i];
      const arriveAt = T_RECEIVED + fig.arrivalStagger;
      const presence = columnTorchPresence(t, arriveAt);
      if (presence <= 0.01) {
        flames.setMatrixAt(i, HIDDEN);
        glow.setMatrixAt(i, HIDDEN);
        posts.setMatrixAt(i, HIDDEN);
        continue;
      }
      const pose = columnFigurePose(t, fig);
      const { phase, size } = seeds[i];
      const flicker = 1 + Math.sin(t * 9.1 + phase) * 0.12 + Math.sin(t * 21.4 + phase * 2) * 0.06;
      const s = size * presence * flicker;
      const groundY = terrain.heightAt(pose.x, pose.z);

      dummy.position.set(pose.x + 0.3, groundY + 1.6 + 0.3 * s, pose.z);
      dummy.rotation.set(0, t * 0.6 + phase, 0);
      dummy.scale.set(s * 0.5, s, s * 0.5);
      dummy.updateMatrix();
      flames.setMatrixAt(i, dummy.matrix);

      dummy.position.set(pose.x + 0.3, groundY + 1.05 + 0.3 * s, pose.z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.setScalar(size * 0.9 * presence);
      dummy.updateMatrix();
      glow.setMatrixAt(i, dummy.matrix);

      dummy.position.set(pose.x + 0.3, groundY + 1.0, pose.z);
      dummy.rotation.set(0, pose.yaw, 0);
      dummy.scale.setScalar(presence > 0.02 ? 1 : 0.0001);
      dummy.updateMatrix();
      posts.setMatrixAt(i, dummy.matrix);
    }
    flames.instanceMatrix.needsUpdate = true;
    glow.instanceMatrix.needsUpdate = true;
    posts.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={flameRef}
        args={[undefined, undefined, torchFigures.length]}
        frustumCulled={false}
      >
        <coneGeometry args={[0.35, 0.75, 6]} />
        <meshStandardMaterial
          color="#3a1804"
          emissive="#ff7a1f"
          emissiveIntensity={2.4}
          roughness={1}
        />
      </instancedMesh>
      <instancedMesh
        ref={glowRef}
        args={[undefined, undefined, torchFigures.length]}
        frustumCulled={false}
      >
        <circleGeometry args={[1.1, 12]} />
        <meshStandardMaterial
          color="#1c0d02"
          emissive="#c2591c"
          emissiveIntensity={0.5}
          roughness={1}
          transparent
          opacity={0.75}
        />
      </instancedMesh>
      <instancedMesh
        ref={postRef}
        args={[undefined, undefined, torchFigures.length]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.025, 0.03, 1.0, 5]} />
        <meshStandardMaterial color="#3a2a18" roughness={0.95} />
      </instancedMesh>
    </group>
  );
}
