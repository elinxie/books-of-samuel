import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { Shelters } from './Shelters';
import { Fires } from './Fires';
import { Livestock } from './Livestock';
import { Camels } from './Camels';
import { CampCrowd } from './CampCrowd';
import { PrincipalFigures } from './PrincipalFigures';
import { AMALEKITE_CAMP_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import { clamp01 } from './timing';

const SCENE = SCENES_BY_ID.get('amalekite-camp')!;

/** Advances scene time while playing. */
function TimelineDriver({ durationSec }: { durationSec: number }) {
  useFrame((_, dt) => {
    const s = useAppStore.getState();
    if (s.playing) s.advanceTime(Math.min(dt, 0.1), durationSec);
  });
  return null;
}

/** Applies the quality profile's draw distance to the active camera. */
function CameraFar({ far }: { far: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.far = far;
    camera.updateProjectionMatrix();
  }, [camera, far]);
  return null;
}

/**
 * Beat-driven lighting: the light rides the timeline — dusk approach,
 * twilight strike, a dark trough under the time-compression card, then
 * next-day evening for the recovery and the drive north (1 Samuel 30:17;
 * claim-strike-timing). One directional sun + hemisphere fill throughout;
 * fires are emissive geometry, never lights, so the light budget is flat.
 * The hemisphere floor stays slightly raised at night so silhouettes read.
 */
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
    sun: 1.0,
    hemi: 0.4,
    amb: 0.14,
    sunColor: '#ffc98a',
    sky: '#f0d3a2',
    ground: '#7a6c50',
    bg: '#e2b98c',
  },
  {
    t: 45,
    sun: 0.8,
    hemi: 0.34,
    amb: 0.13,
    sunColor: '#ffb06a',
    sky: '#e5c090',
    ground: '#71634a',
    bg: '#d9a97b',
  },
  {
    t: 58,
    sun: 0.42,
    hemi: 0.26,
    amb: 0.12,
    sunColor: '#ff9450',
    sky: '#c39a78',
    ground: '#5c5142',
    bg: '#a97f5e',
  },
  {
    t: 70,
    sun: 0.07,
    hemi: 0.17,
    amb: 0.1,
    sunColor: '#8b93bd',
    sky: '#565c74',
    ground: '#454049',
    bg: '#262432',
  },
  {
    t: 82,
    sun: 0.03,
    hemi: 0.13,
    amb: 0.09,
    sunColor: '#7d88b8',
    sky: '#43485e',
    ground: '#3d3a44',
    bg: '#16151f',
  },
  {
    t: 96,
    sun: 0.68,
    hemi: 0.35,
    amb: 0.13,
    sunColor: '#ffd9a4',
    sky: '#ecd0a0',
    ground: '#75674c',
    bg: '#ddbd90',
  },
  {
    t: 110,
    sun: 0.95,
    hemi: 0.4,
    amb: 0.14,
    sunColor: '#ffcf94',
    sky: '#f0d3a2',
    ground: '#7a6c50',
    bg: '#e2bd8d',
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
      <hemisphereLight ref={hemiRef} args={['#f0d3a2', '#7a6c50', 0.4]} />
      <directionalLight
        ref={sunRef}
        position={[-380, 170, -140]}
        intensity={1.0}
        color="#ffc98a"
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
      <ambientLight ref={ambRef} intensity={0.14} />
    </>
  );
}

export function AmalekiteCampScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];
  const camelCount = Math.max(1, Math.round(profile.figureCount * 0.55));

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
      <Shelters shadows={profile.shadows} />
      <Fires />
      <Livestock livestockCount={profile.livestockCount} shadows={profile.shadows} />
      <Camels camelCount={camelCount} shadows={profile.shadows} />
      <CampCrowd figureCount={profile.figureCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && AMALEKITE_CAMP_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
