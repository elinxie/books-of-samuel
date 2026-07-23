import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { Champions } from './Champions';
import { ContingentGroup } from './Contingents';
import { PrincipalFigures } from './PrincipalFigures';
import { BattleDust } from './BattleDust';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import {
  T_ARRIVAL,
  T_BATTLE_SPREADS,
  T_JOAB_HALTS,
  T_PURSUIT_CONTINUES,
  T_STANDOFF,
} from './poses';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * Gibeon: terrain + pool basin/water plane (GroundWorks.tsx) + Benjamin-
 * highland vegetation + the champions' contest (Champions.tsx) + the two
 * wider contingents (Contingents.tsx) + the four named principals
 * (PrincipalFigures.tsx) + battle-spread dust (BattleDust.tsx) + a lighting
 * arc anchored to 2:24's own stated hour ("the sun went down") at
 * T_PURSUIT_CONTINUES — the one beat this scene has a textual lighting cue
 * for; every other beat's hour is an unstated, disclosed design choice
 * (daylight throughout, per a public daytime confrontation). See
 * docs/design/gibeon-pool-brief.md.
 */

function TimelineDriver({ durationSec }: { durationSec: number }) {
  useFrame((_, dt) => {
    const s = useAppStore.getState();
    if (s.playing) s.advanceTime(Math.min(dt, 0.1), durationSec);
  });
  return null;
}

function CameraFar({ far }: { far: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.far = far;
    camera.updateProjectionMatrix();
  }, [camera, far]);
  return null;
}

interface LightKey {
  t: number;
  sun: number;
  hemi: number;
  amb: number;
  sunColor: string;
  sky: string;
  ground: string;
  bg: string;
}

const LIGHT_KEYS: LightKey[] = [
  {
    t: T_ARRIVAL, // clear daylight — the two companies meet at the pool
    sun: 1.5,
    hemi: 0.58,
    amb: 0.22,
    sunColor: '#fff6e0',
    sky: '#eef0e6',
    ground: '#7a7f4f',
    bg: '#dfe3dc',
  },
  {
    t: T_BATTLE_SPREADS, // still bright, edging toward afternoon
    sun: 1.35,
    hemi: 0.5,
    amb: 0.2,
    sunColor: '#ffe9bf',
    sky: '#e6dfc0',
    ground: '#736c48',
    bg: '#d9d0a8',
  },
  {
    t: T_PURSUIT_CONTINUES, // "the sun went down" (2:24) — the scene's one stated hour
    sun: 0.55,
    hemi: 0.3,
    amb: 0.14,
    sunColor: '#e88f52',
    sky: '#b98a66',
    ground: '#4f4632',
    bg: '#a97452',
  },
  {
    t: T_STANDOFF, // dusk, the standoff at the hill
    sun: 0.35,
    hemi: 0.22,
    amb: 0.12,
    sunColor: '#c06a4a',
    sky: '#7d6a72',
    ground: '#38332c',
    bg: '#6a5866',
  },
  {
    t: T_JOAB_HALTS, // deeper dusk as the pursuit is called off
    sun: 0.2,
    hemi: 0.16,
    amb: 0.1,
    sunColor: '#9a5f5a',
    sky: '#4d465c',
    ground: '#26232a',
    bg: '#3c3548',
  },
];

const keyColors = LIGHT_KEYS.map((k) => ({
  sunColor: new THREE.Color(k.sunColor),
  sky: new THREE.Color(k.sky),
  ground: new THREE.Color(k.ground),
  bg: new THREE.Color(k.bg),
}));

function smooth(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

const scratchSunColor = new THREE.Color();
const scratchSky = new THREE.Color();
const scratchGround = new THREE.Color();
const scratchBg = new THREE.Color();

function BeatLighting({ shadows, shadowMapSize }: { shadows: boolean; shadowMapSize: number }) {
  const scene = useThree((s) => s.scene);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const bgColor = useMemo(() => new THREE.Color(LIGHT_KEYS[0].bg), []);

  useEffect(() => {
    scene.background = bgColor;
    return () => {
      scene.background = null;
    };
  }, [scene, bgColor]);

  useFrame(() => {
    const t = useAppStore.getState().timeSec;
    let i = 0;
    while (i < LIGHT_KEYS.length - 1 && t >= LIGHT_KEYS[i + 1].t) i++;
    const a = LIGHT_KEYS[i];
    const b = LIGHT_KEYS[Math.min(i + 1, LIGHT_KEYS.length - 1)];
    const span = b.t - a.t || 1;
    const f = smooth((t - a.t) / span);
    const j = Math.min(i + 1, keyColors.length - 1);

    const sun = a.sun + (b.sun - a.sun) * f;
    const hemi = a.hemi + (b.hemi - a.hemi) * f;
    const amb = a.amb + (b.amb - a.amb) * f;
    scratchSunColor.copy(keyColors[i].sunColor).lerp(keyColors[j].sunColor, f);
    scratchSky.copy(keyColors[i].sky).lerp(keyColors[j].sky, f);
    scratchGround.copy(keyColors[i].ground).lerp(keyColors[j].ground, f);
    scratchBg.copy(keyColors[i].bg).lerp(keyColors[j].bg, f);

    const sun_ = sunRef.current;
    if (sun_) {
      sun_.intensity = sun;
      sun_.color.copy(scratchSunColor);
    }
    const hemi_ = hemiRef.current;
    if (hemi_) {
      hemi_.intensity = hemi;
      hemi_.color.copy(scratchSky);
      hemi_.groundColor.copy(scratchGround);
    }
    const amb_ = ambRef.current;
    if (amb_) amb_.intensity = amb;

    bgColor.copy(scratchBg);
    if (scene.fog) scene.fog.color.copy(bgColor);
  });

  return (
    <>
      <hemisphereLight ref={hemiRef} args={['#eef0e6', '#7a7f4f', 0.58]} />
      <directionalLight
        ref={sunRef}
        position={[300, 500, -180]}
        intensity={1.5}
        color="#fff6e0"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-160}
        shadow-camera-right={160}
        shadow-camera-top={160}
        shadow-camera-bottom={-160}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight ref={ambRef} intensity={0.2} />
    </>
  );
}

export function GibeonPoolScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Scale assumptions (brief): the champions render at the text's own exact
  // count (24, twelve a side) regardless of quality tier — no ratio applies.
  // The two wider contingents and the hilltop rallying band (drawn from,
  // not additive to, Benjamin's contingent) are a disclosed design count,
  // deliberately below gilboa-battle's already-modest musters
  // (claim-gibeon-battle-scale): at high quality tier, ~40 Benjamin/Israel,
  // ~35 Judah, ~14 of Benjamin's survivors becoming the rally band — total
  // combat figures (24 + 40 + 35 = 99) noticeably below Gilboa's 120-140.
  const benjaminCount = Math.max(1, Math.round(profile.figureCount * 0.56));
  const judahCount = Math.max(1, Math.round(profile.figureCount * 0.49));
  const rallyBandCount = Math.max(1, Math.round(benjaminCount * 0.35));

  return (
    <>
      <fog attach="fog" args={[LIGHT_KEYS[0].bg, profile.fogNear, profile.fogFar]} />
      <BeatLighting shadows={profile.shadows} shadowMapSize={profile.shadowMapSize} />
      <CameraFar far={profile.cameraFar} />
      <GroundWorks />
      <Vegetation shrubCount={profile.vegetationCount} rockCount={profile.rockCount} />
      <Champions shadows={profile.shadows} />
      <ContingentGroup
        side="benjamin"
        count={benjaminCount}
        rallyBandCount={rallyBandCount}
        seed={621001}
        shadows={profile.shadows}
      />
      <ContingentGroup
        side="judah"
        count={judahCount}
        rallyBandCount={0}
        seed={622001}
        shadows={profile.shadows}
      />
      <PrincipalFigures shadows={profile.shadows} />
      <BattleDust count={Math.max(1, Math.round(profile.figureCount * 3))} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
