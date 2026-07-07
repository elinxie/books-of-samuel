import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { SMOKE_ORIGINS } from './layout';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aRate;
  attribute float aHeight;
  varying float vAge;
  void main() {
    float age = fract(aSeed + uTime * aRate);
    vAge = age;
    vec3 p = position;
    float swirl = aSeed * 6.2831;
    float r = 0.5 + age * 2.6;
    p.x += cos(swirl + age * 9.0) * r * 0.4;
    p.z += sin(swirl + age * 7.0) * r * 0.4;
    p.x += age * age * 15.0; /* prevailing drift */
    p.y += age * aHeight;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = mix(2.5, 17.0, pow(age, 0.65));
    gl_PointSize = size * uPixelRatio * (150.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAge;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.1, length(uv));
    float fade = smoothstep(0.0, 0.12, vAge) * (1.0 - smoothstep(0.5, 1.0, vAge));
    vec3 col = mix(vec3(0.14, 0.13, 0.12), vec3(0.55, 0.53, 0.50), vAge);
    gl_FragColor = vec4(col, disc * fade * 0.4);
  }
`;

/** GPU particle smoke rising from the ruined structures. */
export function SmokeColumns({ particlesPerColumn }: { particlesPerColumn: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const terrain = useAppStore((s) => s.terrain);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rng = mulberry32(9090);
    const total = SMOKE_ORIGINS.length * particlesPerColumn;
    const positions = new Float32Array(total * 3);
    const seeds = new Float32Array(total);
    const rates = new Float32Array(total);
    const heights = new Float32Array(total);
    let i = 0;
    for (const origin of SMOKE_ORIGINS) {
      const baseY = terrain.heightAt(origin.x, origin.z) + 2.4;
      for (let p = 0; p < particlesPerColumn; p++) {
        positions[i * 3] = origin.x + (rng() - 0.5) * 1.6;
        positions[i * 3 + 1] = baseY;
        positions[i * 3 + 2] = origin.z + (rng() - 0.5) * 1.6;
        seeds[i] = rng();
        rates[i] = 0.045 + rng() * 0.04;
        heights[i] = (origin.major ? 30 : 17) * (0.8 + rng() * 0.4);
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aRate', new THREE.BufferAttribute(rates, 1));
    geo.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1));
    return geo;
  }, [particlesPerColumn, terrain]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;
    }
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
