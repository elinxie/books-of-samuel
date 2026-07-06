import { Html } from '@react-three/drei';
import { CLAIMS_BY_ID } from '../../data/claims';
import { BASIS_LABELS } from '../basisMeta';
import { useAppStore } from '../../state/store';
import { terrainHeight } from '../../engine/terrain';
import type { SceneEntityDef } from '../../scenes/ziklag/entities';

/**
 * In-scene label pill. Kept deliberately quiet: title plus (when sources are
 * shown) the dominant evidential basis and confidence of the entity's claims.
 * Clicking opens the inspector panel.
 */
export function EntityLabel({ entity }: { entity: SceneEntityDef }) {
  const showSources = useAppStore((s) => s.showSources);
  const selectEntity = useAppStore((s) => s.selectEntity);
  const selected = useAppStore((s) => s.selectedEntityId === entity.id);

  const dominantClaim = entity.claimIds.length ? CLAIMS_BY_ID.get(entity.claimIds[0]) : undefined;
  const [x, yOffset, z] = entity.position;
  const y = terrainHeight(x, z) + yOffset;

  return (
    <Html position={[x, y, z]} center distanceFactor={110} zIndexRange={[40, 0]}>
      <button
        type="button"
        className={`entity-label${selected ? ' is-selected' : ''}`}
        data-testid={`label-${entity.id}`}
        onClick={() => selectEntity(entity.id)}
      >
        <span className="entity-label-title">{entity.title}</span>
        {showSources && dominantClaim && (
          <span className={`basis-chip basis-${dominantClaim.basis}`}>
            {BASIS_LABELS[dominantClaim.basis]}
            <i className={`conf-dot conf-${dominantClaim.confidence}`} />
          </span>
        )}
      </button>
    </Html>
  );
}
