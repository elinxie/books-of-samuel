import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { TownBlocks } from './TownBlocks';
import { WallAndGate } from './WallAndGate';
import { Monuments } from './Monuments';
import { DisplayForms } from './DisplayForms';
import { Townspeople } from './Townspeople';
import { PhilistineEscort } from './PhilistineEscort';
import { RetrievalParty } from './RetrievalParty';
import { Torches } from './Torches';
import { BETH_SHAN_WALLS_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import { clamp01 } from './poses';

const SCENE = SCENES_BY_ID.get('beth-shan-walls')!;

/**
 * Beth-shan: terrain + town/wall architecture + choreographed crowds
 * (procession, display, messengers, night retrieval) + a beat-driven
 * lighting arc (midday arrival → dusk news-crossing → deep night retrieval
 * → grey pre-dawn empty wall — one keyframed directional + hemisphere rig
 * throughout, torches are emissive sprites, never new lights, per the
 * amalekite-camp precedent). See docs/design/beth-shan-walls-brief.md.
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
    t: 0,
    sun: 1.15,
    hemi: 0.55,
    amb: 0.2,
    sunColor: '#fff3da',
    sky: '#dce7ea',
    ground: '#7c8452',
    bg: '#cfe0e2',
  },
  {
    t: 55,
    sun: 1.05,
    hemi: 0.5,
    amb: 0.18,
    sunColor: '#ffedc4',
    sky: '#dde3d8',
    ground: '#7c8452',
    bg: '#d6dfd0',
  },
  {
    t: 85,
    sun: 0.68,
    hemi: 0.38,
    amb: 0.14,
    sunColor: '#ffa75f',
    sky: '#d9ac82',
    ground: '#6c5e46',
    bg: '#cd9a6e',
  },
  {
    t: 100,
    sun: 0.32,
    hemi: 0.24,
    amb: 0.11,
    sunColor: '#ff8a4a',
    sky: '#a97a68',
    ground: '#544938',
    bg: '#8a5c48',
  },
  {
    t: 115,
    sun: 0.06,
    hemi: 0.16,
    amb: 0.1,
    sunColor: '#8b93bd',
    sky: '#454a68',
    ground: '#3a3742',
    bg: '#1c1a26',
  },
  {
    t: 132,
    sun: 0.03,
    hemi: 0.13,
    amb: 0.09,
    sunColor: '#7d88b8',
    sky: '#3a3f58',
    ground: '#34333c',
    bg: '#151420',
  },
  {
    t: 140,
    sun: 0.4,
    hemi: 0.3,
    amb: 0.13,
    sunColor: '#a9b7c8',
    sky: '#93a2ac',
    ground: '#5c6058',
    bg: '#8a97a0',
  },
  {
    t: 150,
    sun: 0.48,
    hemi: 0.32,
    amb: 0.14,
    sunColor: '#bcc6d0',
    sky: '#a3aeb2',
    ground: '#636b5c',
    bg: '#9ba7ab',
  },
];

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

    const sun = sunRef.current;
    if (sun) {
      sun.intensity = a.sun + (b.sun - a.sun) * f;
      sun.color
        .copy(keyColors[i].sunColor)
        .lerp(keyColors[Math.min(i + 1, keyColors.length - 1)].sunColor, f);
    }
    const hemi = hemiRef.current;
    if (hemi) {
      hemi.intensity = a.hemi + (b.hemi - a.hemi) * f;
      hemi.color
        .copy(keyColors[i].sky)
        .lerp(keyColors[Math.min(i + 1, keyColors.length - 1)].sky, f);
      hemi.groundColor
        .copy(keyColors[i].ground)
        .lerp(keyColors[Math.min(i + 1, keyColors.length - 1)].ground, f);
    }
    const amb = ambRef.current;
    if (amb) amb.intensity = a.amb + (b.amb - a.amb) * f;

    bgColor.copy(keyColors[i].bg).lerp(keyColors[Math.min(i + 1, keyColors.length - 1)].bg, f);
    if (scene.fog) scene.fog.color.copy(bgColor);
  });

  return (
    <>
      <hemisphereLight ref={hemiRef} args={['#dce7ea', '#7c8452', 0.5]} />
      <directionalLight
        ref={sunRef}
        position={[-620, 260, 120]}
        intensity={1.1}
        color="#fff3da"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-180}
        shadow-camera-right={180}
        shadow-camera-top={180}
        shadow-camera-bottom={-180}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight ref={ambRef} intensity={0.2} />
    </>
  );
}

export function BethShanWallsScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Scene-specific ratios on top of the shared figureCount tier (amalekite-
  // camp/gilboa-battle convention), tuned to land within the brief's
  // 55–70-figure high-tier target: architecture, not crowd size, is this
  // scene's budget load.
  const townCount = Math.max(1, Math.round(profile.figureCount * 0.5));
  const escortCount = Math.max(1, Math.round(profile.figureCount * 0.167));
  const retrievalCount = Math.max(1, Math.round(profile.figureCount * 0.125));

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
      />
      <TownBlocks shadows={profile.shadows} />
      <WallAndGate shadows={profile.shadows} />
      <Monuments shadows={profile.shadows} />
      <DisplayForms shadows={profile.shadows} />
      <Townspeople count={townCount} shadows={profile.shadows} />
      <PhilistineEscort count={escortCount} shadows={profile.shadows} />
      <RetrievalParty count={retrievalCount} shadows={profile.shadows} />
      <Torches />
      {showLabels && BETH_SHAN_WALLS_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
