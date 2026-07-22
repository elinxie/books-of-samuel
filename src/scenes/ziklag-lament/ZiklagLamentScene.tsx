import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from '../ziklag/Vegetation';
import { RecoveringSettlement } from './RecoveringSettlement';
import { PrincipalFigures } from './PrincipalFigures';
import { WitnessCluster } from './WitnessCluster';
import { ZIKLAG_LAMENT_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import { lerp } from './poses';

const SCENE = SCENES_BY_ID.get('ziklag-lament')!;

/**
 * Ziklag, three narrative days after ziklag-aftermath: the same terrain and
 * settlement (recovering, not burning — RecoveringSettlement.tsx), the
 * messenger's arrival/report/execution sequence (PrincipalFigures.tsx,
 * ./poses.ts), the small witness cluster (WitnessCluster.tsx), and a dusk
 * lighting arc anchored to 1:12's "until evening" (claim-lament-evening) —
 * reusing jabesh-burial's day-cycle keyframing technique (an array of keyed
 * light/color states, lerped per frame), scaled down to a single evening
 * with no shimmer/compression overlay (that technique was specific to
 * jabesh-burial's seven-day-fast card). See
 * docs/design/ziklag-lament-brief.md.
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
    t: 0, // b-arrival: the third day, daylight
    sun: 1.1,
    hemi: 0.5,
    amb: 0.18,
    sunColor: '#fff0d2',
    sky: '#dfe6de',
    ground: '#7c7452',
    bg: '#dcd3ae',
  },
  {
    t: 58, // b-grief: golden late afternoon, arcing toward "until evening" (1:12)
    sun: 0.9,
    hemi: 0.42,
    amb: 0.16,
    sunColor: '#ffcf94',
    sky: '#dcbf94',
    ground: '#6e5c40',
    bg: '#d3ab74',
  },
  {
    t: 98, // b-execution: early dusk
    sun: 0.62,
    hemi: 0.34,
    amb: 0.14,
    sunColor: '#f2a25e',
    sky: '#c48d68',
    ground: '#5c4c38',
    bg: '#b8794f',
  },
  {
    t: 120, // b-song: dusk deepens
    sun: 0.42,
    hemi: 0.26,
    amb: 0.12,
    sunColor: '#d9824f',
    sky: '#9a7360',
    ground: '#4c4034',
    bg: '#8f5f4a',
  },
  {
    t: 133, // b-lament-transition: the rise, deeper dusk
    sun: 0.28,
    hemi: 0.2,
    amb: 0.11,
    sunColor: '#b96a52',
    sky: '#6f6470',
    ground: '#3c3630',
    bg: '#5f5468',
  },
  {
    t: 199, // b-lament-refrain: near-dark, the sky darkening behind him
    sun: 0.12,
    hemi: 0.13,
    amb: 0.09,
    sunColor: '#7a6a8a',
    sky: '#39374e',
    ground: '#26232a',
    bg: '#242233',
  },
  {
    t: 214, // hold
    sun: 0.1,
    hemi: 0.12,
    amb: 0.08,
    sunColor: '#6c5f80',
    sky: '#302e42',
    ground: '#211f26',
    bg: '#1e1c2b',
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
      <hemisphereLight ref={hemiRef} args={['#dfe6de', '#7c7452', 0.5]} />
      <directionalLight
        ref={sunRef}
        position={[-260, 180, -110]}
        intensity={1.1}
        color="#fff0d2"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-140}
        shadow-camera-right={140}
        shadow-camera-top={140}
        shadow-camera-bottom={-140}
        shadow-camera-far={800}
        shadow-bias={-0.0004}
      />
      <ambientLight ref={ambRef} intensity={0.18} />
    </>
  );
}

export function ZiklagLamentScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // A small, disclosed witness-cluster headcount (6-10) — not a ratio of the
  // shared figureCount tier (see the brief's "Scale assumptions" and
  // claim-600-men's scene-specific usage note). Varies gently with quality
  // for a little more density at higher tiers, but never approaches the
  // ~1:10 army-muster convention used in narrated-army scenes.
  const witnessCount = quality === 'study' ? 6 : quality === 'balanced' ? 8 : 10;

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
      <RecoveringSettlement shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <WitnessCluster count={witnessCount} shadows={profile.shadows} />
      {showLabels && ZIKLAG_LAMENT_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
