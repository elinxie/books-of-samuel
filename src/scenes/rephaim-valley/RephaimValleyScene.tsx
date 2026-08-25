import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useAppStore } from '../../state/store';
import { QUALITY_PROFILES } from '../../engine/quality';
import { ObserverControls } from '../../engine/ObserverControls';
import { SCENES_BY_ID } from '../../data/scenes';
import { GroundWorks } from './GroundWorks';
import { Vegetation } from './Vegetation';
import { Grove } from './Grove';
import { DavidsForce } from './DavidsForce';
import { PhilistineForce } from './PhilistineForce';
import { PrincipalFigures } from './PrincipalFigures';
import { REPHAIM_VALLEY_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('rephaim-valley')!;

/**
 * The two Philistine engagements in the Valley of Rephaim (2 Samuel
 * 5:17-25). See docs/design/rephaim-valley-brief.md. One scene, two phases,
 * the same ground and the same instanced Philistine population staged
 * twice — the deliberate visual repetition ("same enemy, same ground, two
 * different answers") is the whole point of building this as one scene.
 *
 * No melee choreography anywhere: both engagements read at documentary
 * distance as formation movement — an advance, a formation breaking, a
 * population dispersing — never a fight-stance clash cycle
 * (`gilboa-battle`'s `defenderClashPose`/`clashPhase01` has no counterpart
 * here). `depictsDeath: true`; ADR-009's advisory fires and gates
 * `b-engagement-1`/`b-engagement-2` only, via `useAppStore`'s
 * `violenceMode`, read inside `PhilistineForce.tsx`'s per-frame pose
 * evaluation.
 *
 * The 5:24 sign (`b-sound`) is never visualized anywhere in this file or
 * its children: no wind effect, no light, no canopy motion keyed to the
 * beat — `Grove.tsx`'s trees are static instanced geometry with no
 * foliage-sway system to begin with, and lighting here is flat and
 * unchanging through the whole timeline (`claim-divine-sign-depiction`,
 * fable-review-queue #24). No divination apparatus renders anywhere (no
 * ephod, lots, priest, altar, or shrine) — the inquiry beats are staged as
 * a small, still, waiting group only (`PrincipalFigures.tsx`).
 *
 * No Jerusalem geometry, no named commanders, no triumphal staging — see
 * the brief's "Resolved design calls" and "Placeholder policy".
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

function SceneEnvironment() {
  const quality = useAppStore((s) => s.quality);
  const profile = QUALITY_PROFILES[quality];
  return (
    <>
      <color attach="background" args={['#dde3d8']} />
      <fog attach="fog" args={['#dde3d8', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[600, 620, 400]}
          turbidity={2.8}
          rayleigh={2.2}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      {/* Flat daylight throughout, hour unstated in the text (disclosed
          design-placeholder, brief's "Lighting"). No beat-driven lighting
          arc anywhere — deliberately, so the wait beat cannot be read as
          staged under any atmospheric cue (claim-divine-sign-depiction). */}
      <hemisphereLight args={['#eef0e6', '#7c8256', 0.62]} />
      <directionalLight
        position={[600, 620, 400]}
        intensity={1.5}
        color="#fff8e4"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-220}
        shadow-camera-right={220}
        shadow-camera-top={220}
        shadow-camera-bottom={-220}
        shadow-camera-far={1000}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.26} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function RephaimValleyScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Disclosed design counts (claim-rephaim-cast-scale): Philistine force
  // ~55-70, David's force ~45-60 at high tier — no ratio is claimed (2
  // Samuel 5:17-25 narrates no count for either side), and the high-tier
  // total (~130 including the 5-figure principal cluster) stays at or below
  // gilboa-battle's measured band, materially cheaper per figure (no
  // fight-stance pose buckets).
  const philistineCount = Math.max(20, Math.round(profile.figureCount * 0.95));
  const davidsForceCount = Math.max(16, Math.round(profile.figureCount * 0.8));

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
        treeCount={profile.treeCount}
      />
      <Grove shadows={profile.shadows} />
      <DavidsForce count={davidsForceCount} shadows={profile.shadows} />
      <PhilistineForce count={philistineCount} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      {showLabels && REPHAIM_VALLEY_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
