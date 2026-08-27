import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { OFFERING_GROUND_POS } from './layout';

/**
 * The offering ground (2 Samuel 6:13, 6:17-19a; `claim-sacrifice-depiction`)
 * — a modest stone altar and a pair of living-animal placeholder forms,
 * conveying the offering through ritual activity and presence alone. **No
 * slaughter, wound, blood, or carcass geometry renders here, in any mode,
 * ever** — this project's first staged sacrifice, extending ADR-009's
 * restraint principle ("violence shown honestly, never gratuitously") to
 * animal sacrifice by reasoned analogy, per the brief. No new lights, fire,
 * or particle system renders here either (the brief's own performance
 * ceiling): the smoke of the offerings is carried by the beat caption text,
 * not by a rendered effect. No priest or specific Levitical office is named
 * at this point in the text — the two officiant figures rendered in
 * PrincipalFigures.tsx are anonymous, generic crowd-tier figures, not a
 * distinct priestly costume.
 */

function buildAltarGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const rng = mulberry32(270501);
  // A simple stacked-stone altar, comparative to the general stone-course
  // vocabulary this project already uses (ConstructionGround.tsx), not any
  // specific excavated altar plan.
  for (let row = 0; row < 3; row++) {
    const w = 1.8 - row * 0.18;
    const d = 1.5 - row * 0.14;
    const h = 0.32;
    const block = new THREE.BoxGeometry(w, h, d);
    block.translate((rng() - 0.5) * 0.05, h * row + h / 2, (rng() - 0.5) * 0.05);
    parts.push(block);
  }
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

/** A simple, generic quadruped silhouette (body, four legs, head) — living
 * animal presence only, no specific breed/species detail asserted beyond
 * "an ox and a fattened animal" (6:13). */
function buildAnimalGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const body = new THREE.CapsuleGeometry(0.24, 0.5, 3, 8);
  body.rotateZ(Math.PI / 2);
  body.translate(0, 0.42, 0);
  parts.push(body);
  const head = new THREE.SphereGeometry(0.16, 8, 6);
  head.translate(0.42, 0.46, 0);
  parts.push(head);
  for (const [lx, lz] of [
    [0.24, 0.16],
    [0.24, -0.16],
    [-0.24, 0.16],
    [-0.24, -0.16],
  ]) {
    const leg = new THREE.CylinderGeometry(0.045, 0.05, 0.4, 6);
    leg.translate(lx, 0.2, lz);
    parts.push(leg);
  }
  const merged = mergeGeometries(parts);
  merged.computeVertexNormals();
  return merged;
}

export function OfferingGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const altarGeo = useMemo(() => buildAltarGeometry(), []);
  const animalGeo = useMemo(() => buildAnimalGeometry(), []);
  const y = terrain.heightAt(OFFERING_GROUND_POS[0], OFFERING_GROUND_POS[1]);

  const animalPlacements = useMemo(
    () => [
      { x: OFFERING_GROUND_POS[0] - 1.6, z: OFFERING_GROUND_POS[1] - 1.1, yaw: 0.6, scale: 1.1 },
      { x: OFFERING_GROUND_POS[0] + 1.5, z: OFFERING_GROUND_POS[1] - 1.4, yaw: -0.4, scale: 0.85 },
    ],
    [],
  );

  return (
    <group>
      <mesh
        position={[OFFERING_GROUND_POS[0], y, OFFERING_GROUND_POS[1]]}
        geometry={altarGeo}
        castShadow={shadows}
        receiveShadow
      >
        <meshStandardMaterial color="#a89572" roughness={0.95} />
      </mesh>
      {animalPlacements.map((a, i) => {
        const ay = terrain.heightAt(a.x, a.z);
        return (
          <mesh
            key={`animal-${i}`}
            position={[a.x, ay, a.z]}
            rotation={[0, a.yaw, 0]}
            scale={a.scale}
            geometry={animalGeo}
            castShadow={shadows}
            receiveShadow
          >
            <meshStandardMaterial color={i === 0 ? '#6b5a4a' : '#c7bda6'} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}
