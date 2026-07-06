import { resolveSources } from '../data';
import type { ReconstructionClaim } from '../data/types';
import { useAppStore } from '../state/store';
import { BASIS_LABELS, CONFIDENCE_LABELS } from './basisMeta';

/**
 * Renders one reconstruction claim with its basis, confidence, scholarly
 * views (behind the scholarly-notes toggle), and sources (behind the sources
 * toggle). Used by the inspector, the certainty panel, and the method page.
 */
export function ClaimCard({
  claim,
  forceExpanded = false,
}: {
  claim: ReconstructionClaim;
  forceExpanded?: boolean;
}) {
  const showSources = useAppStore((s) => s.showSources) || forceExpanded;
  const showNotes = useAppStore((s) => s.showScholarlyNotes) || forceExpanded;
  const sources = resolveSources(claim.sourceIds);

  return (
    <div className="claim-card" data-claim-id={claim.id}>
      <div className="claim-head">
        <span className={`basis-chip basis-${claim.basis}`}>{BASIS_LABELS[claim.basis]}</span>
        <span className="conf-label">
          <i className={`conf-dot conf-${claim.confidence}`} />
          {CONFIDENCE_LABELS[claim.confidence]}
        </span>
      </div>
      <p>{claim.statement}</p>
      {showNotes && claim.notes && <p className="claim-notes">{claim.notes}</p>}
      {showNotes && claim.scholarlyViews && claim.scholarlyViews.length > 0 && (
        <div className="scholarly-views">
          <h4>Scholarly views</h4>
          {claim.scholarlyViews.map((v) => (
            <div key={v.id} className="scholarly-view">
              <span className="view-label">{v.label}</span>
              {v.proponents && v.proponents.length > 0 && (
                <span className="view-proponents"> — {v.proponents.join('; ')}</span>
              )}
              <p>{v.summary}</p>
            </div>
          ))}
        </div>
      )}
      {showSources && sources.length > 0 && (
        <ul className="source-list">
          {sources.map((s) => (
            <li key={s.id}>
              {s.author ? `${s.author}. ` : ''}
              <span className="source-title">{s.title}</span>
              {s.datePublished ? ` (${s.datePublished}).` : '.'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
