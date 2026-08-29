import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from '../jerusalem-stronghold/GroundWorks';
import { Vegetation } from '../jerusalem-stronghold/Vegetation';
import { TerraceWalls } from '../jerusalem-stronghold/TerraceWalls';
import { Stronghold } from '../jerusalem-stronghold/Stronghold';
import { Tent } from '../ark-into-jerusalem/Tent';
import { DavidsHouseComplete } from './DavidsHouseComplete';
import { PrincipalFigures } from './PrincipalFigures';
import { nightAmount } from './poses';
import { NATHANS_ORACLE_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('nathans-oracle')!;

/**
 * Nathan's oracle and David's prayer (2 Samuel 7:1-29). See
 * docs/design/nathans-oracle-brief.md. Sole scene of Milestone 8, and the
 * smallest and least action-heavy scene the project has built to date —
 * conversation-scale, two principals only, no crowd, procession, or death
 * anywhere. Reuses `jerusalem-stronghold`'s terrain, enclosure, and palette
 * and `ark-into-jerusalem`'s tent **completely unchanged** — no new
 * `TerrainSpec`. The only new geometry is David's house shown complete for
 * the first time (`DavidsHouseComplete.tsx`, superseding `jerusalem-
 * stronghold`'s `ConstructionGround.tsx`/`TyrianCraftsmen.tsx`, neither of
 * which renders anywhere in this scene) and two named figures in seated/
 * conversational/resting poses (`PrincipalFigures.tsx`, `poses.ts`).
 *
 * `depictsDeath: false` — nothing violent or graphic anywhere in this scene.
 * ADR-013 governs the `b-night-word` beat: Nathan's reception of the LORD's
 * word is stated by card only, never visualized — no light, glow, wind,
 * particle effect, environmental animation, audio cue, or camera language
 * implying a presence, and no receptive/visionary posture for Nathan, who is
 * shown at ordinary rest (see `PrincipalFigures.tsx`, `poses.ts`,
 * `claim-oracle-depiction`). 7:4's "that same night" is this project's first
 * scene beat with an explicit narrated time of day: the lighting arc below
 * (`SceneEnvironment`) dims to an ordinary, unremarkable night and lifts
 * again, driven entirely by `nightAmount(t)` — never keyed to the oracle's
 * content itself, only to the hour. No `<Sky>` shader renders in this scene,
 * in any quality mode (unlike every prior Jerusalem scene) — a bright
 * daytime sky shader has no honest way to also read as night, and
 * `jabesh-burial`'s own night-inclusive lighting rig (background/fog/light
 * color+intensity lerp only, no sky shader) is the precedent followed here.
 * No naming or visual identification of Solomon or any specific son as the
 * promised "offspring" of 7:12, no Bathsheba, no temple construction, and no
 * 2 Samuel 8+ content of any kind, anywhere including the closing card.
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

// Day values match jerusalem-stronghold/ark-into-jerusalem's own steady
// midday/early-afternoon convention exactly, for visual continuity. Night
// values reuse jabesh-burial's own "deep night" key verbatim (same ordinary,
// unremarkable-darkness palette this project already established for a
// night beat), rather than inventing a new one.
const DAY = {
  sun: 1.55,
  hemi: 0.6,
  amb: 0.24,
  sunColor: '#fff8e4',
  sky: '#eef0e6',
  ground: '#7c8256',
  bg: '#dde4de',
};
const NIGHT = {
  sun: 0.06,
  hemi: 0.16,
  amb: 0.1,
  sunColor: '#8b93bd',
  sky: '#454a68',
  ground: '#3a3742',
  bg: '#1c1a26',
};

function lerpNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const dayBgColor = new THREE.Color(DAY.bg);
const nightBgColor = new THREE.Color(NIGHT.bg);
const daySunColor = new THREE.Color(DAY.sunColor);
const nightSunColor = new THREE.Color(NIGHT.sunColor);
const daySkyColor = new THREE.Color(DAY.sky);
const nightSkyColor = new THREE.Color(NIGHT.sky);
const dayGroundColor = new THREE.Color(DAY.ground);
const nightGroundColor = new THREE.Color(NIGHT.ground);

function SceneEnvironment({
  shadows,
  shadowMapSize,
  far,
}: {
  shadows: boolean;
  shadowMapSize: number;
  far: number;
}) {
  const scene = useThree((s) => s.scene);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const bgColor = useMemo(() => new THREE.Color(DAY.bg), []);

  useEffect(() => {
    scene.background = bgColor;
    return () => {
      scene.background = null;
    };
  }, [scene, bgColor]);

  useFrame(() => {
    const t = useAppStore.getState().timeSec;
    const amt = nightAmount(t);

    const sun = sunRef.current;
    if (sun) {
      sun.intensity = lerpNum(DAY.sun, NIGHT.sun, amt);
      sun.color.lerpColors(daySunColor, nightSunColor, amt);
    }
    const hemi = hemiRef.current;
    if (hemi) {
      hemi.intensity = lerpNum(DAY.hemi, NIGHT.hemi, amt);
      hemi.color.lerpColors(daySkyColor, nightSkyColor, amt);
      hemi.groundColor.lerpColors(dayGroundColor, nightGroundColor, amt);
    }
    const amb = ambRef.current;
    if (amb) amb.intensity = lerpNum(DAY.amb, NIGHT.amb, amt);

    bgColor.lerpColors(dayBgColor, nightBgColor, amt);
    if (scene.fog) scene.fog.color.copy(bgColor);
  });

  return (
    <>
      <hemisphereLight ref={hemiRef} args={[DAY.sky, DAY.ground, DAY.hemi]} />
      <directionalLight
        ref={sunRef}
        position={[500, 640, -380]}
        intensity={DAY.sun}
        color={DAY.sunColor}
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
      <ambientLight ref={ambRef} intensity={DAY.amb} />
      <CameraFar far={far} />
    </>
  );
}

export function NathansOracleScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  return (
    <>
      <fog attach="fog" args={[DAY.bg, profile.fogNear, profile.fogFar]} />
      <SceneEnvironment
        shadows={profile.shadows}
        shadowMapSize={profile.shadowMapSize}
        far={profile.cameraFar}
      />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <TerraceWalls shadows={profile.shadows} />
      <Stronghold shadows={profile.shadows} />
      <DavidsHouseComplete shadows={profile.shadows} />
      <Tent shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels &&
        NATHANS_ORACLE_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
