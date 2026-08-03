import { useEffect, useRef } from 'react';
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
import { Contingent } from './Contingent';
import { PrincipalFigures } from './PrincipalFigures';
import { BattleDust } from './BattleDust';
import { duskBlend } from './poses';
import { GIBEON_POOL_ENTITIES } from './entities';
import { EntityLabel } from '../../ui/scene/EntityLabel';

const SCENE = SCENES_BY_ID.get('gibeon-pool')!;

/**
 * The pool of Gibeon, the champions' contest, and the death of Asahel
 * (2 Samuel 2:8-32). See docs/design/gibeon-pool-brief.md. Terrain (the
 * pool basin, the hill of Ammah) plus figures: twenty-four champions
 * (literal 1:1, `Champions.tsx`), the two wider contingents (a disclosed
 * design-choice scale, `Contingent.tsx`, reused for both sides), and four
 * named principals (Abner, Joab, Abishai, Asahel — `PrincipalFigures.tsx`).
 * Ish-bosheth and Mahanaim are referenced only, never staged, per the
 * brief's hard scope guard. Gated by the standard/reduced violence mode
 * (ADR-009) throughout, with `claim-asahel-death`'s documentary-distance/
 * held-reaction precedent carried by the pure pose functions in `./poses.ts`.
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
  const lightRef = useRef<THREE.DirectionalLight>(null);

  // Blends the fixed daytime rig toward a warmer, lower dusk state across
  // b-pursuit-continues/b-standoff (2:24's "the sun was going down") — the
  // one lighting hour the text states directly (`poses.ts`'s `duskBlend`).
  // Every other beat's hour stays an unstated, disclosed placeholder (a
  // fixed rig otherwise).
  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    const { timeSec } = useAppStore.getState();
    const blend = duskBlend(timeSec);
    light.intensity = 1.5 - blend * 0.7;
    light.color.setHSL(0.12 - blend * 0.02, 0.55 + blend * 0.2, 0.78 - blend * 0.18);
    light.position.set(600 - blend * 500, 380 - blend * 320, -900 + blend * 700);
  });

  return (
    <>
      <color attach="background" args={['#dbe3de']} />
      <fog attach="fog" args={['#dbe3de', profile.fogNear, profile.fogFar]} />
      {profile.useSkyShader && (
        <Sky
          distance={45000}
          sunPosition={[600, 380, -900]}
          turbidity={2.6}
          rayleigh={2.1}
          mieCoefficient={0.005}
          mieDirectionalG={0.78}
        />
      )}
      <hemisphereLight args={['#e2e8df', '#5c5642', 0.55]} />
      <directionalLight
        ref={lightRef}
        position={[600, 380, -900]}
        intensity={1.5}
        color="#fff3de"
        castShadow={profile.shadows}
        shadow-mapSize-width={profile.shadowMapSize}
        shadow-mapSize-height={profile.shadowMapSize}
        shadow-camera-left={-160}
        shadow-camera-right={160}
        shadow-camera-top={160}
        shadow-camera-bottom={-160}
        shadow-camera-far={900}
        shadow-bias={-0.0004}
      />
      <ambientLight intensity={0.22} />
      <CameraFar far={profile.cameraFar} />
    </>
  );
}

export function GibeonPoolScene() {
  const quality = useAppStore((s) => s.quality);
  const showLabels = useAppStore((s) => s.showLabels);
  const profile = QUALITY_PROFILES[quality];

  // Champions: literal 1:1 (24 figures, the text's own exact number) — no
  // quality-tier scaling. Wider contingents: disclosed design-choice counts
  // (`claim-gibeon-battle-scale`), targeting Abner's ~35-45 and Joab's
  // ~30-40 at high tier — combined with the champions, a ~90-115 high-tier
  // combat total, deliberately below gilboa-battle's 120-140.
  const abnerContingentCount = Math.max(8, Math.round(profile.figureCount * 0.56));
  const joabContingentCount = Math.max(8, Math.round(profile.figureCount * 0.5));
  const battleDustCount = Math.max(1, Math.round(profile.figureCount * 1.5));

  return (
    <>
      <SceneEnvironment />
      <GroundWorks />
      <Vegetation
        key={`veg-${quality}`}
        shrubCount={profile.vegetationCount}
        rockCount={profile.rockCount}
      />
      <Champions shadows={profile.shadows} />
      <Contingent
        side="abner"
        count={abnerContingentCount}
        seed={43101}
        shadows={profile.shadows}
      />
      <Contingent side="joab" count={joabContingentCount} seed={43102} shadows={profile.shadows} />
      <PrincipalFigures shadows={profile.shadows} />
      <BattleDust count={battleDustCount} />
      {showLabels && GIBEON_POOL_ENTITIES.map((e) => <EntityLabel key={e.id} entity={e} />)}
      <TimelineDriver durationSec={SCENE.durationSec} />
      <ObserverControls />
    </>
  );
}
