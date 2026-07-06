import { resolveClaims } from '../../data';
import { useAppStore } from '../../state/store';
import { ZIKLAG_ENTITIES } from '../../scenes/ziklag/entities';
import { ClaimCard } from '../ClaimCard';

/** Details for the currently selected in-scene entity. */
export function InspectorPanel() {
  const selectedEntityId = useAppStore((s) => s.selectedEntityId);
  const selectEntity = useAppStore((s) => s.selectEntity);
  const setActivePanel = useAppStore((s) => s.setActivePanel);

  const entity = ZIKLAG_ENTITIES.find((e) => e.id === selectedEntityId);
  if (!entity) return null;

  const claims = resolveClaims(entity.claimIds);

  return (
    <aside className="hud-panel" data-testid="panel-inspector">
      <button
        type="button"
        className="panel-close"
        aria-label="Close panel"
        onClick={() => {
          selectEntity(null);
          setActivePanel('none');
        }}
      >
        ✕
      </button>
      <h2>{entity.title}</h2>
      <p className="panel-sub">{entity.kind}</p>
      <p style={{ fontSize: 13.5 }}>{entity.description}</p>
      {claims.length > 0 && (
        <>
          <h3>Reconstruction claims</h3>
          {claims.map((c) => (
            <ClaimCard key={c.id} claim={c} />
          ))}
        </>
      )}
    </aside>
  );
}
