import { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { GATE_TOWERS, HOUSES, SMOKE_ORIGINS, WALLS, WELL_POS } from './layout';

/**
 * Burned settlement massing. Every structure is a labeled placeholder
 * (see asset-house-block, asset-perimeter-wall, asset-gate-simple).
 * The whole town is shown burned per 1 Samuel 30:1 — "…and burned it with fire."
 *
 * Wall and socle materials are jittered per structure (deterministic seed) so
 * mudbrick/stone read as individually weathered surfaces rather than two flat
 * repeated tones — same "vary color/roughness per instance" technique used for
 * vegetation, applied here per-mesh since houses aren't instanced.
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

export function Settlement({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const materials = useMemo(() => {
    const rng = mulberry32(90210);
    return {
      charred: new THREE.MeshStandardMaterial({ color: '#4a423a', roughness: 1 }),
      charredDark: new THREE.MeshStandardMaterial({ color: '#3a332d', roughness: 1 }),
      stone: new THREE.MeshStandardMaterial({ color: '#9a8d76', roughness: 1 }),
      ash: new THREE.MeshStandardMaterial({ color: '#2e2a26', roughness: 1 }),
      scorch: new THREE.MeshBasicMaterial({
        color: '#1f1c19',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
      // One jittered wall + socle material per house — soot-black char and
      // scorched mudbrick are the two burned tones, stone socles vary by
      // weathering rather than fire.
      houseWalls: HOUSES.map((_, i) =>
        jitteredMaterial(rng, i % 3 === 0 ? '#6f5f4b' : '#4a423a', 0.03, 0.09),
      ),
      houseSocles: HOUSES.map(() => jitteredMaterial(rng, '#9a8d76', 0.02, 0.12, 0.92, 0.1)),
      wallSegments: WALLS.map(() => jitteredMaterial(rng, '#6f5f4b', 0.025, 0.08)),
    };
  }, []);

  return (
    <group>
      {HOUSES.map((h, i) => {
        const y = terrain.heightAt(h.x, h.z);
        const height = h.collapsed ? h.h * 0.55 : h.h;
        return (
          <group key={`house-${i}`} position={[h.x, y, h.z]} rotation={[0, h.rot, 0]}>
            {/* Stone socle */}
            <mesh position={[0, 0.2, 0]} material={materials.houseSocles[i]} castShadow={shadows}>
              <boxGeometry args={[h.w + 0.3, 0.5, h.d + 0.3]} />
            </mesh>
            {/* Mudbrick walls, charred */}
            <mesh
              position={[0, 0.4 + height / 2, 0]}
              rotation={[h.collapsed ? 0.05 : 0, 0, h.collapsed ? 0.06 : 0]}
              material={materials.houseWalls[i]}
              castShadow={shadows}
            >
              <boxGeometry args={[h.w, height, h.d]} />
            </mesh>
            {/* Roof slab where it survived */}
            {!h.roofGone && (
              <mesh
                position={[0, 0.4 + height + 0.12, 0]}
                material={materials.charredDark}
                castShadow={shadows}
              >
                <boxGeometry args={[h.w + 0.5, 0.24, h.d + 0.5]} />
              </mesh>
            )}
            {/* Collapse debris */}
            {h.collapsed && (
              <mesh position={[h.w * 0.35, 0.45, h.d * 0.3]} material={materials.charredDark}>
                <coneGeometry args={[Math.min(h.w, h.d) * 0.45, 0.9, 5]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Perimeter wall belt (speculative — claim-wall-gate) */}
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
            material={materials.charred}
            castShadow={shadows}
          >
            <boxGeometry args={[3.2, 4.2, 3.2]} />
          </mesh>
        );
      })}

      {/* Scorch marks and ash where smoke rises */}
      {SMOKE_ORIGINS.map((s, i) => {
        const y = terrain.heightAt(s.x, s.z);
        return (
          <group key={`scorch-${i}`}>
            <mesh
              position={[s.x, y + 0.12, s.z]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={materials.scorch}
            >
              <circleGeometry args={[s.major ? 7 : 4.5, 20]} />
            </mesh>
            <mesh position={[s.x + 1.2, y + 0.35, s.z + 0.8]} material={materials.ash}>
              <coneGeometry args={[1.4, 0.8, 6]} />
            </mesh>
          </group>
        );
      })}

      {/* Well head near the gate (illustrative — claim-well) */}
      <group position={[WELL_POS[0], terrain.heightAt(WELL_POS[0], WELL_POS[1]), WELL_POS[1]]}>
        <mesh position={[0, 0.45, 0]} material={materials.stone} castShadow={shadows}>
          <cylinderGeometry args={[1.0, 1.1, 0.9, 10]} />
        </mesh>
        <mesh position={[0, 1.4, 0]} material={materials.charredDark}>
          <boxGeometry args={[0.18, 2.0, 0.18]} />
        </mesh>
      </group>
    </group>
  );
}
