import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { ChampionsGround } from './ChampionsGround';
import { AbnerContingent, JoabContingent } from './Contingents';
import { PrincipalFigures } from './PrincipalFigures';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import { lerp, T_CLOSE, T_JOAB_HALTS, T_PURSUIT_CONTINUES, T_STANDOFF } from './poses';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * The pool of Gibeon: Benjamin-highlands terrain + the pool basin/water
 * plane (GroundWorks.tsx) + the champions' contest (ChampionsGround.tsx,
 * 24 figures, literal 1:1) + the two wider contingents (Contingents.tsx,
 * a disclosed design count, deliberately smaller than gilboa-battle's) +
 * the four named principals' full journey (PrincipalFigures.tsx,
 * ./poses.ts) — pool bank, battle-spread field, pursuit route, hill of
 * Ammah. Civil war, not a foreign-enemy battle: no invented "Judah kit" vs.
 * "Benjamin kit," sides read only by grouping and position. Daytime through
 * the pool/champions/battle/pursuit beats, arcing to the sundown 2:24 states
 * directly once the pursuit continues toward the hill of Ammah. See
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

/** Daytime through the pool/champions/battle/pursuit beats — hour unstated
 * in the text for those beats, a disclosed design-placeholder (see
 * claim-gibeon-terrain-form's notes) — arcing to sundown exactly where 2:24
 * itself states it, deepening into dusk through the hill-of-Ammah beats. */
const LIGHT_KEYS: LightKey[] = [
  {
    t: 0, // b-context / b-arrival: open highland midday
    sun: 1.55,
    hemi: 0.56,
    amb: 0.2,
    sunColor: '#fff3da',
    sky: '#dfe6da',
    ground: '#7c7452',
    bg: '#d9dfd0',
  },
  {
    t: T_PURSUIT_CONTINUES, // 2:24's own detail: "the sun went down"
    sun: 0.75,
    hemi: 0.36,
    amb: 0.16,
    sunColor: '#f4a866',
    sky: '#caa082',
    ground: '#5c4c38',
    bg: '#c08c62',
  },
  {
    t: T_STANDOFF, // the hill of Ammah, low golden light
    sun: 0.5,
    hemi: 0.28,
    amb: 0.13,
    sunColor: '#dd8452',
    sky: '#93705f',
    ground: '#4a3e34',
    bg: '#8a6050',
  },
  {
    t: T_JOAB_HALTS, // dusk deepens through the plea and the halt
    sun: 0.3,
    hemi: 0.2,
    amb: 0.11,
    sunColor: '#b96a52',
    sky: '#6a5f70',
    ground: '#3c3630',
    bg: '#5c5268',
  },
  {
    t: T_CLOSE, // near dark, the text-only closing cards
    sun: 0.14,
    hemi: 0.14,
    amb: 0.09,
    sunColor: '#7a6a8a',
    sky: '#3c3a52',
    ground: '#26232a',
    bg: '#242233',
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

    const sun = lerp(a.sun, b.sun, f);
    const hemi = lerp(a.hemi, b.hemi, f);
    const amb = lerp(a.amb, b.amb, f);
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
      <hemisphereLight ref={hemiRef} args={['#dfe6da', '#7c7452', 0.56]} />
      <directionalLight
        ref={sunRef}
        position={[520, 420, -260]}
        intensity={1.55}
        color="#fff3da"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
        shadow-camera-far={1000}
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

  // Scale assumptions (docs/design/gibeon-pool-brief.md): champions render
  // literally 1:1 (24 figures, fixed — see ChampionsGround.tsx), never
  // scaled by quality tier. The two wider contingents are a disclosed design
  // count scaled off the shared figureCount tier (same convention as
  // gilboa-battle/hebron-anointing): ~40/72 => Abner's contingent, ~35/72
  // => Joab's — landing at the high tier's ~90-115 combat-figure total
  // (24 + ~40 + ~35 = ~99) once the champions are added, deliberately below
  // gilboa-battle's 120-140 (claim-gibeon-battle-scale). The hilltop rally
  // band (12-18) is drawn from Abner's contingent, not additive to it.
  const abnerCount = Math.max(1, Math.round(profile.figureCount * 0.556));
  const joabCount = Math.max(1, Math.round(profile.figureCount * 0.486));
  const hillCount = Math.min(abnerCount, 15);

  return (
    <>
      <BeatLighting shadows={profile.shadows} shadowMapSize={profile.shadowMapSize} />
      <fog attach="fog" args={[LIGHT_KEYS[0].bg, profile.fogNear, profile.fogFar]} />
      <CameraFar far={profile.cameraFar} />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
      />
      <ChampionsGround shadows={profile.shadows} />
      <AbnerContingent count={abnerCount} hillCount={hillCount} shadows={profile.shadows} />
      <JoabContingent count={joabCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
