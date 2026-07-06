import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SCENES_BY_ID } from '../data/scenes';
import type { SceneDef } from '../data/types';
import { useAppStore } from '../state/store';
import { QUALITY_PROFILES } from '../engine/quality';
import { ZiklagScene } from '../scenes/ziklag/ZiklagScene';
import { Hud } from '../ui/hud/Hud';
import { Page } from '../ui/SiteChrome';

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  'ziklag-aftermath': ZiklagScene,
};

function PlannedScene({ scene }: { scene: SceneDef }) {
  return (
    <Page>
      <div className="planned-scene">
        <div>
          <h1>{scene.title}</h1>
          <p className="synopsis">{scene.synopsis}</p>
          <p>
            <span className={`status-chip status-planned`}>Planned — {scene.milestoneId}</span>
          </p>
          <p>
            <Link className="btn" to="/progress">
              See the roadmap
            </Link>{' '}
            <Link className="btn btn-primary" to="/observe/ziklag-aftermath">
              Enter the current scene
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
}

function WebGLFallback() {
  return (
    <div className="webgl-fallback" data-testid="webgl-fallback">
      <div>
        <h1>3D rendering unavailable</h1>
        <p>
          This browser could not create a WebGL context, which the observer mode requires. The study
          pages still work: <Link to="/progress">Progress</Link>, <Link to="/sources">Sources</Link>
          , <Link to="/method">Method</Link>.
        </p>
      </div>
    </div>
  );
}

export default function ObservePage() {
  const { sceneId } = useParams();
  const scene = sceneId ? SCENES_BY_ID.get(sceneId) : undefined;
  const quality = useAppStore((s) => s.quality);
  const navMode = useAppStore((s) => s.navMode);
  const setScene = useAppStore((s) => s.setScene);
  const requestTeleport = useAppStore((s) => s.requestTeleport);

  // Reset playback and move the observer to the scene's default viewpoint.
  useEffect(() => {
    if (!scene || scene.status === 'planned') return;
    setScene(scene.id);
    const vp = scene.viewpoints[0];
    if (vp) requestTeleport({ position: vp.position, lookAt: vp.lookAt });
  }, [scene, setScene, requestTeleport]);

  if (!scene) return <Navigate to="/" replace />;
  if (scene.status === 'planned') return <PlannedScene scene={scene} />;

  const SceneComponent = SCENE_COMPONENTS[scene.id];
  const profile = QUALITY_PROFILES[quality];

  return (
    <div className="observe-root" data-testid="observe-root">
      <Canvas
        shadows={profile.shadows}
        dpr={profile.dpr}
        camera={{ fov: 60, near: 0.3, far: profile.cameraFar, position: [120, 40, -160] }}
        fallback={<WebGLFallback />}
      >
        {SceneComponent ? <SceneComponent /> : null}
      </Canvas>
      {navMode === 'walk' && (
        <div className="walk-hint">
          Click the scene to look around · WASD to walk · Shift to hurry · Esc to release
        </div>
      )}
      <Hud scene={scene} />
    </div>
  );
}
