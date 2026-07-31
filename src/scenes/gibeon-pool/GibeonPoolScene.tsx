import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { Champions } from './Champions';
import { AbnerContingent } from './AbnerContingent';
import { JoabContingent } from './JoabContingent';
import { PrincipalFigures } from './PrincipalFigures';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';
import { duskProgress } from './poses';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * Gibeon: Benjamin-highlands terrain + the pool basin/water plane
 * (GroundWorks.tsx) + the champions' contest (Champions.tsx, 24 figures
 * literal 1:1) + the two wider bank contingents (AbnerContingent.tsx,
 * JoabContingent.tsx — disclosed design counts, drawn-from-not-additive-to
 * hilltop/pursuer subsets) + the five named principals and Asahel's death
 * (PrincipalFigures.tsx, ./poses.ts) + a day-to-dusk lighting arc anchored
 * directly to 2:24's own "as the sun was going down" (not a placeholder
 * hour, per the brief). See docs/design/gibeon-pool-brief.md.
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

const DAY = {
  sun: 1.5,
  hemi: 0.56,
  amb: 0.2,
  sunColor: new THREE.Color('#fff6e0'),
  sky: new THREE.Color('#dfe6de'),
  ground: new THREE.Color('#7c7452'),
  bg: new THREE.Color('#dfe3dc'),
};
const DUSK = {
  sun: 0.55,
  hemi: 0.28,
  amb: 0.12,
  sunColor: new THREE.Color('#f2a25e'),
  sky: new THREE.Color('#c48d68'),
  ground: new THREE.Color('#5c4c38'),
  bg: new THREE.Color('#b8794f'),
};

const scratchSunColor = new THREE.Color();
const scratchSky = new THREE.Color();
const scratchGround = new THREE.Color();
const scratchBg = new THREE.Color();

/**
 * A day-to-dusk lighting arc keyed directly to `duskProgress` (2:24's own
 * "as the sun was going down" — used directly, not a placeholder hour, per
 * the brief's "Allowed placeholders" note). Every other beat's hour stays
 * an undisclosed, disclosed-placeholder daylight choice, same convention as
 * gilboa-battle/hebron-anointing's fixed-hour rigs.
 */
function BeatLighting({ shadows, shadowMapSize }: { shadows: boolean; shadowMapSize: number }) {
  const scene = useThree((s) => s.scene);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const bgColor = useMemo(() => DAY.bg.clone(), []);

  useEffect(() => {
    scene.background = bgColor;
    return () => {
      scene.background = null;
    };
  }, [scene, bgColor]);

  useFrame(() => {
    const t = useAppStore.getState().timeSec;
    const f = duskProgress(t);

    const sun_ = sunRef.current;
    if (sun_) {
      sun_.intensity = DAY.sun + (DUSK.sun - DAY.sun) * f;
      scratchSunColor.copy(DAY.sunColor).lerp(DUSK.sunColor, f);
      sun_.color.copy(scratchSunColor);
    }
    const hemi_ = hemiRef.current;
    if (hemi_) {
      hemi_.intensity = DAY.hemi + (DUSK.hemi - DAY.hemi) * f;
      scratchSky.copy(DAY.sky).lerp(DUSK.sky, f);
      scratchGround.copy(DAY.ground).lerp(DUSK.ground, f);
      hemi_.color.copy(scratchSky);
      hemi_.groundColor.copy(scratchGround);
    }
    const amb_ = ambRef.current;
    if (amb_) amb_.intensity = DAY.amb + (DUSK.amb - DAY.amb) * f;

    scratchBg.copy(DAY.bg).lerp(DUSK.bg, f);
    bgColor.copy(scratchBg);
    if (scene.fog) scene.fog.color.copy(bgColor);
  });

  return (
    <>
      <hemisphereLight ref={hemiRef} args={['#dfe6de', '#7c7452', 0.56]} />
      <directionalLight
        ref={sunRef}
        position={[380, 620, -240]}
        intensity={1.5}
        color="#fff6e0"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-220}
        shadow-camera-right={220}
        shadow-camera-top={220}
        shadow-camera-bottom={-220}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight ref={ambRef} intensity={0.2} />
    </>
  );
}

function SceneEnvironment({ shadows, shadowMapSize }: { shadows: boolean; shadowMapSize: number }) {
  const quality = useAppStore((s) => s.quality);
  const profile = QUALITY_PROFILES[quality];
  return (
    <>
      <fog attach="fog" args={['#dfe3dc', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[380, 620, -240]}
          turbidity={2.8}
          rayleigh={2.2}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      <BeatLighting shadows={shadows} shadowMapSize={shadowMapSize} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function GibeonPoolScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (brief's "Scale assumptions" — never derived
  // from the 360/20 casualty figures): Abner's contingent lands ~25-45
  // across study/balanced/high, Joab's ~21-37; the rallying band (~12-18)
  // and pursuing detachment are drawn FROM these totals (role fractions in
  // AbnerContingent.tsx/JoabContingent.tsx), not additive on top. Combined
  // with the 24 literal champions, high tier lands ~106 total — within the
  // brief's 90-115 target, noticeably below gilboa-battle's 120-140.
  const abnerCount = Math.max(1, Math.round(profile.figureCount * 0.62));
  const joabCount = Math.max(1, Math.round(profile.figureCount * 0.52));

  return (
    <>
      <SceneEnvironment shadows={profile.shadows} shadowMapSize={profile.shadowMapSize} />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
      />
      <Champions shadows={profile.shadows} />
      <AbnerContingent count={abnerCount} shadows={profile.shadows} />
      <JoabContingent count={joabCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
