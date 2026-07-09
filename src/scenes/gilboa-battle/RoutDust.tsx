import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import type { Terrain } from '../../engine/terrain';
import { buildInfantrySlots, buildRoutSlots } from './layout';
import { lerp, smoothstep, T_ARCHERS, T_LINES, T_ROUT, T_SAUL_DEATH, T_SILENCE } from './poses';

/**
 * Rout-dust system (M3 Step 5, final slice): one shared-material, GPU-driven
 * point-sprite field, in the manner of `ziklag/SmokeColumns.tsx` (vertex-
 * shader-driven position/age cycling, no per-particle CPU loop). Per the
 * brief's "Visual composition" ("Dust and motion, not gore, carry the
 * battle... reads the mass movement") this is the primary visual-fidelity
 * deliverable for Gilboa: it illustrates `claim-gilboa-rout` and
 * `asset-dust-motion`, not a new claim.
 *
 * Two densities share one material and one draw call, distinguished per-
 * vertex by `aGroup` (0 = rout, 1 = press):
 *   - **Rout dust** (heavier): footprint follows `buildRoutSlots` — the same
 *     position-generating function `RoutingIsraelites.tsx` uses for the
 *     eastern-draw figures — so the dust cloud sits over the same ground the
 *     rout actually drains across, not an independently invented placement.
 *     Drifts eastward/downslope (+x), matching the rout's direction.
 *   - **Press dust** (lighter): footprint follows `buildInfantrySlots` (the
 *     Philistine northern climb). Kept off the crest death-knoll sightline
 *     (z <= -70, well north of the death-knoll viewpoint) per the brief's
 *     "serving form legibility... not melodrama."
 *
 * Both groups' visibility is gated by pure, unit-tested intensity envelopes
 * (`routDustIntensity`, `pressDustIntensity`) keyed to the beat timeline in
 * `poses.ts`/`scenes.ts`: dust intensifies from `b-rout` (t=18) and thins
 * (never to zero) toward `b-silence` (t=140), per the brief.
 *
 * No new real-time lights (emissive/vertex-color only, same as
 * `SmokeColumns.tsx`/`Fires.tsx`) and no water shader — performance target
 * per the brief. Sprite counts scale off `profile.figureCount` (no new
 * quality-profile field), matching Gilboa's existing scene-local scaling
 * convention in `GilboaBattleScene.tsx`.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uRoutIntensity;
  uniform float uPressIntensity;
  attribute float aSeed;
  attribute float aRate;
  attribute float aHeight;
  attribute vec2 aDrift;
  attribute float aGroup;
  attribute float aSize;
  varying float vAge;
  varying float vIntensity;
  void main() {
    float age = fract(aSeed + uTime * aRate);
    vAge = age;
    vIntensity = mix(uRoutIntensity, uPressIntensity, aGroup);
    vec3 p = position;
    float swirl = aSeed * 6.2831;
    p.x += cos(swirl + age * 5.0) * 1.1;
    p.z += sin(swirl + age * 4.0) * 1.1;
    p.x += aDrift.x * age; /* prevailing drift along the slope */
    p.z += aDrift.y * age;
    p.y += age * aHeight * (1.0 - age * 0.4); /* low loft, settles rather than rises */
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = mix(aSize * 0.3, aSize, pow(age, 0.5));
    gl_PointSize = size * uPixelRatio * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAge;
  varying float vIntensity;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.05, length(uv));
    float fade = smoothstep(0.0, 0.12, vAge) * (1.0 - smoothstep(0.5, 1.0, vAge));
    vec3 col = mix(vec3(0.60, 0.53, 0.41), vec3(0.83, 0.78, 0.65), vAge);
    gl_FragColor = vec4(col, disc * fade * vIntensity * 0.45);
  }
`;

/**
 * Rout-dust density from `b-rout` (t=18) onward: ramps up over ~16s to full,
 * holds through the death sequence, then thins toward `b-silence` (t=140) —
 * settling with the emptying ridge, never fully vanishing (dust lingers).
 */
export function routDustIntensity(t: number): number {
  if (t <= T_ROUT) return 0;
  const rise = smoothstep((t - T_ROUT) / 16);
  if (t < T_SAUL_DEATH) return rise;
  const settle = smoothstep((t - T_SAUL_DEATH) / (T_SILENCE - T_SAUL_DEATH));
  return lerp(1, 0.35, settle);
}

/**
 * Philistine-press dust: present from the opening beat (the climb is already
 * underway at `b-lines`), lighter cap than the rout so it never competes with
 * the crest death-group's sightline, easing off after the archer volley
 * (`b-archers`, t=72) as the press's advance resolves into the death
 * sequence, toward a low ambient level at `b-silence`.
 */
export function pressDustIntensity(t: number): number {
  const cap = 0.55;
  const rise = smoothstep((t - T_LINES) / 20) * cap;
  if (t < T_ARCHERS) return rise;
  const settle = smoothstep((t - T_ARCHERS) / (T_SILENCE - T_ARCHERS));
  return lerp(cap, 0.15, settle);
}

const GROUP_ROUT = 0;
const GROUP_PRESS = 1;

function buildDustGeometry(
  routCount: number,
  pressCount: number,
  terrain: Terrain,
): THREE.BufferGeometry {
  const rng = mulberry32(31009);
  // Reuse the same position-generating functions the figure systems use, so
  // the dust footprint sits over the ground the rout/press actually cross
  // rather than an independently invented cloud.
  const routAnchors = buildRoutSlots(routCount, 31010);
  const pressAnchors = buildInfantrySlots(pressCount, 31011);
  const total = routAnchors.length + pressAnchors.length;

  const positions = new Float32Array(total * 3);
  const seeds = new Float32Array(total);
  const rates = new Float32Array(total);
  const heights = new Float32Array(total);
  const drift = new Float32Array(total * 2);
  const groups = new Float32Array(total);
  const sizes = new Float32Array(total);

  let i = 0;
  const fill = (anchors: { x: number; z: number }[], group: number, isRout: boolean) => {
    for (const a of anchors) {
      const spread = isRout ? 14 : 10;
      const x = a.x + (rng() - 0.5) * spread;
      const z = a.z + (rng() - 0.5) * spread;
      const y = terrain.heightAt(x, z) + 0.15 + rng() * 0.5;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = rng();
      rates[i] = 0.05 + rng() * 0.05;
      heights[i] = 1.2 + rng() * 2.2;
      if (isRout) {
        drift[i * 2] = 16 + rng() * 14; // eastward, downslope — the rout's direction
        drift[i * 2 + 1] = (rng() - 0.5) * 10;
      } else {
        drift[i * 2] = (rng() - 0.5) * 10;
        drift[i * 2 + 1] = 10 + rng() * 10; // toward the crest — the climb's direction
      }
      groups[i] = group;
      sizes[i] = isRout ? 9 + rng() * 10 : 6 + rng() * 7;
      i++;
    }
  };
  fill(routAnchors, GROUP_ROUT, true);
  fill(pressAnchors, GROUP_PRESS, false);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute('aRate', new THREE.BufferAttribute(rates, 1));
  geo.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1));
  geo.setAttribute('aDrift', new THREE.BufferAttribute(drift, 2));
  geo.setAttribute('aGroup', new THREE.BufferAttribute(groups, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  return geo;
}

/** GPU particle dust over the eastern rout draw and (lighter) the northern Philistine climb. */
export function RoutDust({ routCount, pressCount }: { routCount: number; pressCount: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(
    () => buildDustGeometry(routCount, pressCount, terrain),
    [routCount, pressCount, terrain],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uRoutIntensity: { value: 0 },
      uPressIntensity: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;
    const { timeSec } = useAppStore.getState();
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uPixelRatio.value = state.viewport.dpr;
    mat.uniforms.uRoutIntensity.value = routDustIntensity(timeSec);
    mat.uniforms.uPressIntensity.value = pressDustIntensity(timeSec);
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
