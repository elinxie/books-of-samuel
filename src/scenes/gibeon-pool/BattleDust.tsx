import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import type { Terrain } from '../../engine/terrain';
import { ABNER_BATTLE_SLOTS, JUDAH_BATTLE_SLOTS, samplePursuitPoint } from './layout';
import { duskFactor, lerp, smoothstep, T_BATTLE_SPREADS, T_JOAB_HALTS, T_PROPOSAL } from './poses';

/**
 * A single, small GPU point-sprite dust field over the spreading battlefield
 * and pursuit route (claim-gibeon-battle, claim-gibeon-battle-scale;
 * asset-dust-motion, reused id — same technique as gilboa-battle's
 * RoutDust.tsx, deliberately scaled down to match this scene's smaller,
 * contingent-level clash rather than Gilboa's national-muster scale). No
 * new real-time lights, no water shader; one shared material, one draw
 * call, vertex-shader-driven drift keyed to `uTime`.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uIntensity;
  attribute float aSeed;
  attribute float aRate;
  attribute float aHeight;
  attribute vec2 aDrift;
  attribute float aSize;
  varying float vAge;
  void main() {
    float age = fract(aSeed + uTime * aRate);
    vAge = age;
    vec3 p = position;
    float swirl = aSeed * 6.2831;
    p.x += cos(swirl + age * 5.0) * 0.9;
    p.z += sin(swirl + age * 4.0) * 0.9;
    p.x += aDrift.x * age;
    p.z += aDrift.y * age;
    p.y += age * aHeight * (1.0 - age * 0.4);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = mix(aSize * 0.3, aSize, pow(age, 0.5));
    gl_PointSize = size * uPixelRatio * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uIntensity;
  varying float vAge;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.05, length(uv));
    float fade = smoothstep(0.0, 0.12, vAge) * (1.0 - smoothstep(0.5, 1.0, vAge));
    vec3 col = mix(vec3(0.58, 0.51, 0.4), vec3(0.82, 0.76, 0.63), vAge);
    gl_FragColor = vec4(col, disc * fade * uIntensity * 0.4);
  }
`;

/** 0 before the battle spreads, rising through the battle/pursuit beats,
 * settling once Joab halts the pursuit — never fully vanishing. Exported
 * for unit tests. */
export function battleDustIntensity(t: number): number {
  if (t <= T_PROPOSAL) return 0;
  const rise = smoothstep((t - T_BATTLE_SPREADS) / 14);
  if (t < T_JOAB_HALTS) return rise;
  const settle = smoothstep((t - T_JOAB_HALTS) / 20);
  return lerp(1, 0.3, settle);
}

function buildDustGeometry(count: number, terrain: Terrain): THREE.BufferGeometry {
  const rng = mulberry32(220950);
  const anchors: { x: number; z: number }[] = [];
  const battleAnchors = [...ABNER_BATTLE_SLOTS, ...JUDAH_BATTLE_SLOTS].map(([x, z]) => ({ x, z }));
  const pursuitAnchors = Array.from({ length: 14 }, (_, i) => samplePursuitPoint(i / 13));
  const pool = [...battleAnchors, ...pursuitAnchors];
  for (let i = 0; i < count; i++) anchors.push(pool[i % pool.length]);

  const positions = new Float32Array(anchors.length * 3);
  const seeds = new Float32Array(anchors.length);
  const rates = new Float32Array(anchors.length);
  const heights = new Float32Array(anchors.length);
  const drift = new Float32Array(anchors.length * 2);
  const sizes = new Float32Array(anchors.length);

  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    const x = a.x + (rng() - 0.5) * 12;
    const z = a.z + (rng() - 0.5) * 12;
    const y = terrain.heightAt(x, z) + 0.15 + rng() * 0.4;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    seeds[i] = rng();
    rates[i] = 0.05 + rng() * 0.05;
    heights[i] = 1 + rng() * 1.8;
    drift[i * 2] = (rng() - 0.5) * 14;
    drift[i * 2 + 1] = (rng() - 0.5) * 14;
    sizes[i] = 6 + rng() * 8;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute('aRate', new THREE.BufferAttribute(rates, 1));
  geo.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1));
  geo.setAttribute('aDrift', new THREE.BufferAttribute(drift, 2));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  return geo;
}

export function BattleDust({ count }: { count: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => buildDustGeometry(count, terrain), [count, terrain]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: dpr }, uIntensity: { value: 0 } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;
    const { timeSec } = useAppStore.getState();
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uPixelRatio.value = state.viewport.dpr;
    // Dust settles slightly earlier/lighter once dusk sets in, matching the
    // general low-light hour rather than driving its own separate arc.
    mat.uniforms.uIntensity.value = battleDustIntensity(timeSec) * (1 - duskFactor(timeSec) * 0.15);
  });

  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={10}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
