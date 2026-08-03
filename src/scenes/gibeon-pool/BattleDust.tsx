import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import type { Terrain } from '../../engine/terrain';
import { buildAbnerSpreadSlots, buildJoabSpreadSlots } from './layout';
import { lerp, smoothstep, T_BATTLE_SPREADS, T_STANDOFF } from './poses';

/**
 * Battle dust over the spreading clash (`b-battle-spreads`, 2:17;
 * `asset-dust-motion`, reused from gilboa-battle's identical GPU point-
 * sprite technique — see `RoutDust.tsx` there for the shared shader
 * rationale). One shared-material field over both contingents' spread
 * ground; no new real-time lights, no water shader — dust and motion carry
 * the mass movement of the wider clash, not gore (brief's "Visual
 * composition"). Fades in once the contest ignites the wider battle, and
 * out again once the action has moved on toward the hill of Ammah.
 */

export function battleDustIntensity(t: number): number {
  const rise = smoothstep((t - T_BATTLE_SPREADS) / 10);
  const settle = smoothstep((t - (T_STANDOFF - 20)) / 20);
  return lerp(rise, 0, settle) * rise;
}

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
    p.x += cos(swirl + age * 5.0) * 1.0;
    p.z += sin(swirl + age * 4.0) * 1.0;
    p.x += aDrift.x * age;
    p.z += aDrift.y * age;
    p.y += age * aHeight * (1.0 - age * 0.4);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = mix(aSize * 0.3, aSize, pow(age, 0.5));
    gl_PointSize = size * uPixelRatio * (140.0 / -mv.z) * uIntensity;
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
    vec3 col = mix(vec3(0.62, 0.56, 0.42), vec3(0.85, 0.8, 0.66), vAge);
    gl_FragColor = vec4(col, disc * fade * uIntensity * 0.42);
  }
`;

function buildDustGeometry(count: number, terrain: Terrain): THREE.BufferGeometry {
  const rng = mulberry32(52301);
  const anchors = [...buildAbnerSpreadSlots(count, 52302), ...buildJoabSpreadSlots(count, 52303)];
  const total = anchors.length;

  const positions = new Float32Array(total * 3);
  const seeds = new Float32Array(total);
  const rates = new Float32Array(total);
  const heights = new Float32Array(total);
  const drift = new Float32Array(total * 2);
  const sizes = new Float32Array(total);

  for (let i = 0; i < total; i++) {
    const a = anchors[i];
    const x = a[0] + (rng() - 0.5) * 10;
    const z = a[1] + (rng() - 0.5) * 10;
    const y = terrain.heightAt(x, z) + 0.15 + rng() * 0.4;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    seeds[i] = rng();
    rates[i] = 0.05 + rng() * 0.05;
    heights[i] = 1.0 + rng() * 1.8;
    drift[i * 2] = (rng() - 0.5) * 8;
    drift[i * 2 + 1] = (rng() - 0.5) * 8;
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
