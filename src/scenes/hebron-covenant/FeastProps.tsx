import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { ABNER_SIDE_CENTER, DAVID_SIDE_CENTER, FEAST_GROUND_CENTER } from './layout';

/**
 * Feast dressing (new `asset-feast-props`, `claim-feast-form`): low mats and
 * shared vessels laid out across the feast ground — the one new prop family
 * this scene adds, per the brief ("mats/low tables, shared vessels, seated
 * groups"). A single small instanced set, fixed count (not quality-scaled —
 * dressing, not a crowd), present throughout the scene at the feast ground;
 * no fire, no water, matching the brief's performance note.
 */

interface MatSpec {
  x: number;
  z: number;
  rot: number;
  w: number;
  d: number;
}

interface VesselSpec {
  x: number;
  z: number;
  s: number;
}

const MAT_COUNT_PER_SIDE = 6;
const VESSEL_COUNT = 8;

function scatterMats(center: [number, number], seed: number): MatSpec[] {
  const rng = mulberry32(seed);
  const out: MatSpec[] = [];
  for (let i = 0; i < MAT_COUNT_PER_SIDE; i++) {
    const angle = rng() * Math.PI * 2;
    const r = 1.5 + rng() * 5.5;
    out.push({
      x: center[0] + Math.cos(angle) * r,
      z: center[1] + Math.sin(angle) * r,
      rot: rng() * Math.PI,
      w: 1.6 + rng() * 0.6,
      d: 1.0 + rng() * 0.4,
    });
  }
  return out;
}

function scatterVessels(center: [number, number], radius: number, seed: number): VesselSpec[] {
  const rng = mulberry32(seed);
  const out: VesselSpec[] = [];
  for (let i = 0; i < VESSEL_COUNT; i++) {
    const angle = rng() * Math.PI * 2;
    const r = rng() * radius;
    out.push({
      x: center[0] + Math.cos(angle) * r,
      z: center[1] + Math.sin(angle) * r,
      s: 0.7 + rng() * 0.5,
    });
  }
  return out;
}

const dummy = new THREE.Object3D();

export function FeastProps({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.InstancedMesh>(null);
  const vesselRef = useRef<THREE.InstancedMesh>(null);

  const mats = useMemo(
    () => [...scatterMats(ABNER_SIDE_CENTER, 53501), ...scatterMats(DAVID_SIDE_CENTER, 53502)],
    [],
  );
  const vessels = useMemo(() => scatterVessels(FEAST_GROUND_CENTER, 9, 53503), []);

  useEffect(() => {
    const mats_ = matRef.current;
    if (mats_) {
      for (let i = 0; i < mats.length; i++) {
        const m = mats[i];
        const y = terrain.heightAt(m.x, m.z) + 0.02;
        dummy.position.set(m.x, y, m.z);
        dummy.rotation.set(0, m.rot, 0);
        dummy.scale.set(m.w, 0.03, m.d);
        dummy.updateMatrix();
        mats_.setMatrixAt(i, dummy.matrix);
      }
      mats_.instanceMatrix.needsUpdate = true;
    }

    const vessels_ = vesselRef.current;
    if (vessels_) {
      for (let i = 0; i < vessels.length; i++) {
        const v = vessels[i];
        const y = terrain.heightAt(v.x, v.z) + 0.08 * v.s;
        dummy.position.set(v.x, y, v.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(v.s);
        dummy.updateMatrix();
        vessels_.setMatrixAt(i, dummy.matrix);
      }
      vessels_.instanceMatrix.needsUpdate = true;
    }
  }, [mats, vessels, terrain]);

  return (
    <group>
      <instancedMesh
        ref={matRef}
        args={[undefined, undefined, mats.length]}
        frustumCulled={false}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8a7248" roughness={1} />
      </instancedMesh>
      <instancedMesh
        ref={vesselRef}
        args={[undefined, undefined, vessels.length]}
        frustumCulled={false}
        castShadow={shadows}
      >
        <cylinderGeometry args={[0.12, 0.16, 0.22, 8]} />
        <meshStandardMaterial color="#b5623a" roughness={0.7} />
      </instancedMesh>
    </group>
  );
}
