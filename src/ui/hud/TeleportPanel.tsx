import { Link } from 'react-router-dom';
import type { SceneDef } from '../../data/types';
import { LOCATIONS, SCENES } from '../../data';
import { useAppStore } from '../../state/store';

/** Viewpoints within the current scene, plus the scene/region index. */
export function TeleportPanel({ scene }: { scene: SceneDef }) {
  const requestTeleport = useAppStore((s) => s.requestTeleport);
  const setActivePanel = useAppStore((s) => s.setActivePanel);

  return (
    <aside className="hud-panel" data-testid="panel-teleport">
      <button
        type="button"
        className="panel-close"
        onClick={() => setActivePanel('none')}
        aria-label="Close panel"
      >
        ✕
      </button>
      <h2>Teleport</h2>
      <p className="panel-sub">The observer moves freely — jump to a viewpoint or another scene.</p>

      <h3>Viewpoints — {scene.title}</h3>
      <div className="vp-list">
        {scene.viewpoints.map((vp) => (
          <button
            key={vp.id}
            type="button"
            data-testid={`vp-${vp.id}`}
            onClick={() => requestTeleport({ position: vp.position, lookAt: vp.lookAt })}
          >
            <span>{vp.label}</span>
          </button>
        ))}
      </div>

      <h3>Scenes</h3>
      <div className="scene-list">
        {SCENES.map((sc) =>
          sc.status !== 'planned' ? (
            <Link key={sc.id} to={`/observe/${sc.id}`}>
              <span>{sc.title}</span>
              <span className="scene-note">{sc.id === scene.id ? 'current' : 'enter'}</span>
            </Link>
          ) : (
            <div key={sc.id} className="scene-disabled">
              <span>{sc.title}</span>
              <span className="scene-note">planned — {sc.milestoneId}</span>
            </div>
          ),
        )}
      </div>

      <h3>Regions</h3>
      <div className="scene-list">
        {LOCATIONS.map((l) => {
          const target = SCENES.find((sc) => sc.locationId === l.id && sc.status !== 'planned');
          return target ? (
            <Link key={l.id} to={`/observe/${target.id}`}>
              <span>
                {l.name}
                {l.identification.disputed ? ' *' : ''}
              </span>
              <span className="scene-note">{l.region}</span>
            </Link>
          ) : (
            <div key={l.id} className="scene-disabled">
              <span>
                {l.name}
                {l.identification.disputed ? ' *' : ''}
              </span>
              <span className="scene-note">planned</span>
            </div>
          );
        })}
      </div>
      <p className="panel-sub" style={{ marginTop: 10 }}>
        * site identification disputed
      </p>
    </aside>
  );
}
