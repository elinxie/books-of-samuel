import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { GRAVE_POS, TAMARISK_POS } from './layout';
import { burialMoundProgress } from './poses';

/**
 * The tamarisk (claim-tamarisk-burial, asset-tamarisk-tree): a single mature
 * tree, the scene's landmark and its final resting point (31:13a) — the
 * Chronicles terebinth/oak variant is a label note, not a second tree. The
 * burial mound at its foot grows in once the bone bundle is lowered
 * (`burialMoundProgress`), and stays through the seven-day fast and the
 * closing card.
 */

function buildCanopyGeometry(): THREE.BufferGeometry {
  // A loose, open, feathery silhouette (tamarisks read as fine, wispy
  // sprays rather than a dense round canopy) — three offset spheroids.
  const geo = new THREE.IcosahedronGeometry(1, 1);
  return geo;
}

export function Tamarisk({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const moundRef = useRef<THREE.Mesh>(null);
  const canopyGeo = useMemo(() => buildCanopyGeometry(), []);
  const [tx, tz] = TAMARISK_POS;
  const [gx, gz] = GRAVE_POS;
  const ty = terrain.heightAt(tx, tz);
  const gy = terrain.heightAt(gx, gz);

  const canopyLobes: [number, number, number, number][] = useMemo(
    () => [
      [0, 4.6, 0, 2.6],
      [1.1, 4.1, 0.6, 1.9],
      [-1.0, 4.3, -0.7, 2.0],
      [0.4, 5.4, -0.5, 1.6],
    ],
    [],
  );

  useFrame(() => {
    const mound = moundRef.current;
    if (!mound) return;
    const t = useAppStore.getState().timeSec;
    const progress = burialMoundProgress(t);
    mound.scale.setScalar(Math.max(0.001, progress));
  });

  return (
    <group>
      {/* Trunk */}
      <mesh
        position={[tx, ty + 1.6, tz]}
        rotation={[0, 0.4, 0.03]}
        castShadow={shadows}
        receiveShadow
      >
        <cylinderGeometry args={[0.22, 0.34, 3.2, 7]} />
        <meshStandardMaterial color="#5a4630" roughness={0.95} />
      </mesh>
      {/* Feathery, open canopy — several offset lobes rather than one dense blob */}
      <group position={[tx, ty, tz]}>
        {canopyLobes.map(([lx, ly, lz, ls], i) => (
          <mesh
            key={`lobe-${i}`}
            position={[lx, ly, lz]}
            scale={[ls, ls * 0.65, ls]}
            geometry={canopyGeo}
            castShadow={shadows}
          >
            <meshStandardMaterial color="#7d8a52" roughness={1} />
          </mesh>
        ))}
      </group>
      {/* Burial mound at the tamarisk's foot — grows in once the bundle is lowered */}
      <mesh
        ref={moundRef}
        position={[gx, gy + 0.18, gz]}
        scale={[0.001, 0.001, 0.001]}
        castShadow={shadows}
        receiveShadow
      >
        <sphereGeometry args={[0.75, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#786248" roughness={1} />
      </mesh>
    </group>
  );
}
