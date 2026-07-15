import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { VillageHouses } from './VillageHouses';
import { Tamarisk } from './Tamarisk';
import { RetrievalColumn } from './RetrievalColumn';
import { Torches } from './Torches';
import { Biers } from './Biers';
import { Pyre } from './Pyre';
import { BoneBundle } from './BoneBundle';
import { Villagers } from './Villagers';
import { JABESH_BURIAL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import {
  clamp01,
  lerp,
  sevenDayShimmerEnvelope,
  sevenDayShimmerOscillation,
  T_BONES,
} from './poses';

const SCENE = SCENES_BY_ID.get('jabesh-burial')!;

/**
 * Jabesh-gilead: terrain + an unwalled hamlet cluster + the wadi path +
 * choreographed crowds (the retrieval column, the townspeople) + a
 * beat-driven lighting arc (deep night arrival -> grey dawn -> morning pyre
 * -> dusk burial -> a compressed day-cycle shimmer for the seven-day fast ->
 * still evening close — one keyframed directional + hemisphere rig
 * throughout; torches and the pyre are emissive sprites, never new lights,
 * per the amalekite-camp precedent). See
 * docs/design/jabesh-burial-brief.md. The deliberately quietest scene in the
 * project so far — no spectacle, the smallest M3 cast.
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
    t: 0, // b-night-march: deep night
    sun: 0.06,
    hemi: 0.16,
    amb: 0.1,
    sunColor: '#8b93bd',
    sky: '#454a68',
    ground: '#3a3742',
    bg: '#1c1a26',
  },
  {
    t: 24, // b-received: grey dawn
    sun: 0.4,
    hemi: 0.3,
    amb: 0.13,
    sunColor: '#a9b7c8',
    sky: '#93a2ac',
    ground: '#5c6058',
    bg: '#8a97a0',
  },
  {
    t: 55, // b-pyre: morning
    sun: 1.05,
    hemi: 0.5,
    amb: 0.18,
    sunColor: '#ffedc4',
    sky: '#dde3d8',
    ground: '#7c8452',
    bg: '#d6dfd0',
  },
  {
    t: T_BONES, // b-bones: brightest, midday-adjacent
    sun: 1.15,
    hemi: 0.55,
    amb: 0.2,
    sunColor: '#fff3da',
    sky: '#dce7ea',
    ground: '#7c8452',
    bg: '#cfe0e2',
  },
  {
    t: 104, // b-tamarisk: dusk
    sun: 0.68,
    hemi: 0.38,
    amb: 0.14,
    sunColor: '#ffa75f',
    sky: '#d9ac82',
    ground: '#6c5e46',
    bg: '#cd9a6e',
  },
  {
    t: 122, // b-seven-days start: dusk holds, the shimmer overlay begins here
    sun: 0.5,
    hemi: 0.3,
    amb: 0.12,
    sunColor: '#e08a52',
    sky: '#b98868',
    ground: '#5c5040',
    bg: '#a97858',
  },
  {
    t: 140, // shimmer settles back to a stable evening
    sun: 0.4,
    hemi: 0.26,
    amb: 0.12,
    sunColor: '#c9a878',
    sky: '#8f8878',
    ground: '#544938',
    bg: '#7c6858',
  },
  {
    t: 142, // b-close: still evening
    sun: 0.38,
    hemi: 0.25,
    amb: 0.12,
    sunColor: '#c2a274',
    sky: '#897f72',
    ground: '#514634',
    bg: '#766252',
  },
  {
    t: 150,
    sun: 0.38,
    hemi: 0.25,
    amb: 0.12,
    sunColor: '#c2a274',
    sky: '#897f72',
    ground: '#514634',
    bg: '#766252',
  },
];

/** The night key (index 0) and the brightest daylight key (b-bones) are the
 * shimmer's oscillation endpoints — see `poses.ts`'s `sevenDayShimmerOscillation`. */
const SHIMMER_NIGHT_KEY = 0;
const SHIMMER_DAY_KEY = LIGHT_KEYS.findIndex((k) => k.t === T_BONES);

const keyColors = LIGHT_KEYS.map((k) => ({
  sunColor: new THREE.Color(k.sunColor),
  sky: new THREE.Color(k.sky),
  ground: new THREE.Color(k.ground),
  bg: new THREE.Color(k.bg),
}));

function smooth(t: number): number {
  const c = clamp01(t);
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

    let sun = lerp(a.sun, b.sun, f);
    let hemi = lerp(a.hemi, b.hemi, f);
    let amb = lerp(a.amb, b.amb, f);
    scratchSunColor.copy(keyColors[i].sunColor).lerp(keyColors[j].sunColor, f);
    scratchSky.copy(keyColors[i].sky).lerp(keyColors[j].sky, f);
    scratchGround.copy(keyColors[i].ground).lerp(keyColors[j].ground, f);
    scratchBg.copy(keyColors[i].bg).lerp(keyColors[j].bg, f);

    // The seven-day compression: a keyframed rig mutation (interpolated per
    // frame here, never new lights or per-frame material rebuilds) —
    // oscillates the SAME directional+hemisphere rig between the night and
    // brightest-day reference keys, standing in for compressed day/night
    // passes across the fast, then fades back to the base timeline exactly
    // by the window's end (poses.ts's `sevenDayShimmerEnvelope`/`Oscillation`).
    const envelope = sevenDayShimmerEnvelope(t);
    if (envelope > 0.001) {
      const osc = sevenDayShimmerOscillation(t);
      const night = LIGHT_KEYS[SHIMMER_NIGHT_KEY];
      const day = LIGHT_KEYS[SHIMMER_DAY_KEY];
      const shimmerSun = lerp(night.sun, day.sun, osc);
      const shimmerHemi = lerp(night.hemi, day.hemi, osc);
      const shimmerAmb = lerp(night.amb, day.amb, osc);
      sun = lerp(sun, shimmerSun, envelope);
      hemi = lerp(hemi, shimmerHemi, envelope);
      amb = lerp(amb, shimmerAmb, envelope);
      scratchSunColor.lerp(
        keyColors[SHIMMER_NIGHT_KEY].sunColor
          .clone()
          .lerp(keyColors[SHIMMER_DAY_KEY].sunColor, osc),
        envelope,
      );
      scratchSky.lerp(
        keyColors[SHIMMER_NIGHT_KEY].sky.clone().lerp(keyColors[SHIMMER_DAY_KEY].sky, osc),
        envelope,
      );
      scratchGround.lerp(
        keyColors[SHIMMER_NIGHT_KEY].ground.clone().lerp(keyColors[SHIMMER_DAY_KEY].ground, osc),
        envelope,
      );
      scratchBg.lerp(
        keyColors[SHIMMER_NIGHT_KEY].bg.clone().lerp(keyColors[SHIMMER_DAY_KEY].bg, osc),
        envelope,
      );
    }

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
      <hemisphereLight ref={hemiRef} args={['#454a68', '#3a3742', 0.16]} />
      <directionalLight
        ref={sunRef}
        position={[-520, 240, 140]}
        intensity={0.5}
        color="#a9b7c8"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-170}
        shadow-camera-right={170}
        shadow-camera-top={170}
        shadow-camera-bottom={-170}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight ref={ambRef} intensity={0.12} />
    </>
  );
}

export function JabeshBurialScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Scene-specific ratios on top of the shared figureCount tier, tuned to
  // land within the brief's ~45-55-figure high-tier target — the smallest
  // M3 cast; cost here is vegetation, terrain, and night lighting, not
  // crowd size (brief, "Performance target").
  const retrievalCount = Math.max(1, Math.round(profile.figureCount * 0.153));
  const villagerCount = Math.max(1, Math.round(profile.figureCount * 0.5));

  return (
    <>
      <fog attach="fog" args={[LIGHT_KEYS[0].bg, profile.fogNear, profile.fogFar]} />
      <BeatLighting shadows={profile.shadows} shadowMapSize={profile.shadowMapSize} />
      <CameraFar far={profile.cameraFar} />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <VillageHouses shadows={profile.shadows} />
      <Tamarisk shadows={profile.shadows} />
      <RetrievalColumn count={retrievalCount} shadows={profile.shadows} />
      <Torches count={retrievalCount} />
      <Biers shadows={profile.shadows} />
      <Pyre shadows={profile.shadows} />
      <BoneBundle shadows={profile.shadows} />
      <Villagers count={villagerCount} shadows={profile.shadows} />
      {showLabels && JABESH_BURIAL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
