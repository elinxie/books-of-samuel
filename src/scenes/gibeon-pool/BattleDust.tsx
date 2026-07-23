import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import type { Terrain } from '../../engine/terrain';
import { buildBattleSpreadSlots } from './layout';
import { lerp, smoothstep, T_ASAHEL_DEATH, T_BATTLE_SPREADS } from './poses';

/**
 * Battle-spread dust (`b-battle-spreads`, 2:17): reuses Gilboa's rout-dust
 * GPU point-sprite technique (asset-dust-motion — "the visual device the
 * brief assigns to carry the scale... in place of a blow-by-blow crowd") at
 * a single density over the spreading battlefield, rather than a rout/press
 * split (this scene has one contested field, not a crest-vs-slope
 * geography). No new real-time lights, no water shader — cheap, reused
 * technique.
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
    p.x += cos(swirl + age * 5.0) * 1.1;
    p.z += sin(swirl + age * 4.0) * 1.1;
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
    vec3 col = mix(vec3(0.58, 0.52, 0.4), vec3(0.82, 0.77, 0.63), vAge);
    gl_FragColor = vec4(col, disc * fade * uIntensity * 0.42);
  }
`;

/**
 * Dust density from `b-battle-spreads` onward: ramps up over ~14s, holds
 * through the pursuit, settles (never to zero) as the far side of the field
 * empties out during the pursuit/standoff beats.
 */
export function battleDustIntensity(t: number): number {
  if (t <= T_BATTLE_SPREADS) return 0;
  const rise = smoothstep((t - T_BATTLE_SPREADS) / 14);
  if (t < T_ASAHEL_DEATH) return rise;
  const settle = smoothstep((t - T_ASAHEL_DEATH) / 90);
  return lerp(1, 0.3, settle);
}

function buildDustGeometry(count: number, terrain: Terrain): THREE.BufferGeometry {
  const rng = mulberry32(62701);
  const anchorsA = buildBattleSpreadSlots(Math.ceil(count / 2), 'benjamin', 62702);
  const anchorsB = buildBattleSpreadSlots(Math.floor(count / 2), 'judah', 62703);
  const anchors = [...anchorsA, ...anchorsB];

  const positions = new Float32Array(anchors.length * 3);
  const seeds = new Float32Array(anchors.length);
  const rates = new Float32Array(anchors.length);
  const heights = new Float32Array(anchors.length);
  const drift = new Float32Array(anchors.length * 2);
  const sizes = new Float32Array(anchors.length);

  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    const x = a.x + (rng() - 0.5) * 16;
    const z = a.z + (rng() - 0.5) * 16;
    const y = terrain.heightAt(x, z) + 0.15 + rng() * 0.5;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    seeds[i] = rng();
    rates[i] = 0.05 + rng() * 0.05;
    heights[i] = 1.2 + rng() * 2.0;
    drift[i * 2] = (rng() - 0.5) * 14;
    drift[i * 2 + 1] = 6 + rng() * 12;
    sizes[i] = 7 + rng() * 9;
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
    mat.uniforms.uIntensity.value = battleDustIntensity(timeSec);
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
