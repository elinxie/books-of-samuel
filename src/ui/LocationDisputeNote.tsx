import type { LocationEntry } from '../data/types';
import { useAppStore } from '../state/store';

/**
 * Surfaces a disputed LocationEntry's identification candidates in the UI
 * (not just in src/data/locations.ts) — reuses ClaimCard's scholarly-view
 * markup/CSS rather than a parallel display mechanism, and gates the
 * candidate breakdown behind the same showScholarlyNotes study toggle
 * ClaimCard uses. The top-level "disputed" disclosure itself is never hidden.
 */
export function LocationDisputeNote({ location }: { location: LocationEntry }) {
  const showNotes = useAppStore((s) => s.showScholarlyNotes);
  if (!location.identification.disputed) return null;

  return (
    <div className="claim-card" data-testid={`location-dispute-${location.id}`}>
      <div className="claim-head">
        <span
          className="status-chip"
          style={{ color: 'var(--conf-low)', borderColor: 'var(--conf-low)' }}
        >
          Disputed identification
        </span>
      </div>
      <p>
        <strong>{location.name}</strong>: {location.summary}
      </p>
      {showNotes && (
        <div className="scholarly-views">
          <h4>Candidate sites</h4>
          {location.identification.views.map((v) => (
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
    </div>
  );
}
