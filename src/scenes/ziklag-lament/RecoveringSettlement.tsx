import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GATE_TOWERS, HOUSES, WALLS } from '../ziklag/layout';

/**
 * The same settlement massing as `ziklag/Settlement.tsx` (see
 * asset-house-block/asset-perimeter-wall/asset-gate-simple), dressed for a
 * "recovering" state three narrative days on (see docs/design/
 * ziklag-lament-brief.md, "Resolved design calls" — no new geometry family,
 * only damage-state dressing). No smoke, no fresh scorch/ash decals: each
 * house is deterministically assigned one of three repair states —
 * `repaired` (fresh, pale mudbrick and a restored roof), `repairing` (a
 * patched wall with a couple of leaning scaffold poles and a part-laid
 * roof), or `still-damaged` (the same charred look as ziklag-aftermath,
 * minus the ash-cone/smoke residue, which reads as an active-fire byproduct
 * that a fresh raid's ground scorch — already baked into the reused terrain,
 * see terrain.ts — does not).
 */
const tmpHsl = { h: 0, s: 0, l: 0 };

function jitteredMaterial(
  rng: () => number,
  baseHex: string,
  hueJitter: number,
  lightJitter: number,
  baseRoughness = 0.88,
  roughnessJitter = 0.12,
): THREE.MeshStandardMaterial {
  const color = new THREE.Color(baseHex);
  color.getHSL(tmpHsl);
  color.setHSL(
    tmpHsl.h + (rng() - 0.5) * hueJitter,
    tmpHsl.s,
    Math.max(0, Math.min(1, tmpHsl.l + (rng() - 0.5) * lightJitter)),
  );
  return new THREE.MeshStandardMaterial({
    color,
    roughness: Math.max(0, Math.min(1, baseRoughness + (rng() - 0.5) * roughnessJitter)),
  });
}

type RepairState = 'repaired' | 'repairing' | 'still-damaged';

export function RecoveringSettlement({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);

  const { repairStates, materials } = useMemo(() => {
    // Distinct seed from ziklag/Settlement.tsx's house-material rng: this is
    // a different narrative moment (days later), not the same fresh-burn
    // dressing recomputed.
    const stateRng = mulberry32(19010722);
    const states: RepairState[] = HOUSES.map(() => {
      const r = stateRng();
      if (r < 0.4) return 'repaired';
      if (r < 0.75) return 'repairing';
      return 'still-damaged';
    });

    const matRng = mulberry32(19010723);
    return {
      repairStates: states,
      materials: {
        stone: new THREE.MeshStandardMaterial({ color: '#9a8d76', roughness: 1 }),
        charredDark: new THREE.MeshStandardMaterial({ color: '#3a332d', roughness: 1 }),
        scaffold: new THREE.MeshStandardMaterial({ color: '#8a6a3f', roughness: 0.9 }),
        socle: HOUSES.map(() => jitteredMaterial(matRng, '#9a8d76', 0.02, 0.12, 0.92, 0.1)),
        repairedWall: HOUSES.map(() => jitteredMaterial(matRng, '#b9a87c', 0.03, 0.08, 0.85, 0.1)),
        repairedRoof: HOUSES.map(() => jitteredMaterial(matRng, '#c7b98d', 0.03, 0.08, 0.8, 0.08)),
        charredWall: HOUSES.map((_, i) =>
          jitteredMaterial(matRng, i % 3 === 0 ? '#6f5f4b' : '#4a423a', 0.03, 0.09),
        ),
        wallSegments: WALLS.map(() => jitteredMaterial(matRng, '#8a7c5f', 0.02, 0.08, 0.85, 0.1)),
      },
    };
  }, []);

  return (
    <group>
      {HOUSES.map((h, i) => {
        const y = terrain.heightAt(h.x, h.z);
        const state = repairStates[i];
        const collapsedLook = state === 'still-damaged' && h.collapsed;
        const height = collapsedLook ? h.h * 0.55 : h.h;
        const wallMat = state === 'repaired' ? materials.repairedWall[i] : materials.charredWall[i];
        const showRoof = state === 'repaired' || !h.roofGone || state === 'repairing';
        const roofMat = state === 'repaired' ? materials.repairedRoof[i] : materials.charredDark;

        return (
          <group key={`house-${i}`} position={[h.x, y, h.z]} rotation={[0, h.rot, 0]}>
            <mesh position={[0, 0.2, 0]} material={materials.socle[i]} castShadow={shadows}>
              <boxGeometry args={[h.w + 0.3, 0.5, h.d + 0.3]} />
            </mesh>
            <mesh
              position={[0, 0.4 + height / 2, 0]}
              rotation={[collapsedLook ? 0.05 : 0, 0, collapsedLook ? 0.06 : 0]}
              material={wallMat}
              castShadow={shadows}
            >
              <boxGeometry args={[h.w, height, h.d]} />
            </mesh>
            {showRoof && (
              <mesh position={[0, 0.4 + height + 0.12, 0]} material={roofMat} castShadow={shadows}>
                <boxGeometry args={[h.w + 0.5, 0.24, h.d + 0.5]} />
              </mesh>
            )}
            {state === 'repairing' && (
              <>
                {/* Scaffold poles leaning against the wall — repair in progress. */}
                <mesh
                  position={[h.w / 2 + 0.15, 0.4 + height * 0.5, 0]}
                  rotation={[0, 0, 0.15]}
                  material={materials.scaffold}
                  castShadow={shadows}
                >
                  <cylinderGeometry args={[0.05, 0.05, height + 0.6, 5]} />
                </mesh>
                <mesh
                  position={[-h.w / 2 - 0.15, 0.4 + height * 0.5, h.d * 0.2]}
                  rotation={[0, 0, -0.12]}
                  material={materials.scaffold}
                  castShadow={shadows}
                >
                  <cylinderGeometry args={[0.05, 0.05, height + 0.6, 5]} />
                </mesh>
              </>
            )}
            {collapsedLook && (
              <mesh position={[h.w * 0.35, 0.45, h.d * 0.3]} material={materials.charredDark}>
                <coneGeometry args={[Math.min(h.w, h.d) * 0.45, 0.9, 5]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Perimeter wall belt — unchanged from ziklag-aftermath (claim-wall-gate) */}
      {WALLS.map((w, i) => {
        const y = terrain.heightAt(w.x, w.z);
        return (
          <mesh
            key={`wall-${i}`}
            position={[w.x, y + w.h / 2, w.z]}
            rotation={[0, w.rot, 0]}
            material={materials.wallSegments[i]}
            castShadow={shadows}
          >
            <boxGeometry args={[w.len, w.h, 1.1]} />
          </mesh>
        );
      })}

      {/* Gate towers */}
      {GATE_TOWERS.map(([x, z], i) => {
        const y = terrain.heightAt(x, z);
        return (
          <mesh
            key={`tower-${i}`}
            position={[x, y + 2.1, z]}
            material={materials.stone}
            castShadow={shadows}
          >
            <boxGeometry args={[3.2, 4.2, 3.2]} />
          </mesh>
        );
      })}
    </group>
  );
}
