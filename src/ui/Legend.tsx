import { BASIS_LABELS, CONFIDENCE_LABELS, CONFIDENCE_ORDER } from './basisMeta';
import type { ClaimBasis } from '../data/types';

const BASIS_EXPLANATIONS: Record<ClaimBasis, string> = {
  'biblical-text': 'Stated by the narrative itself (anchored to ESV references).',
  archaeology: 'Grounded in excavated or surveyed evidence from the region and period.',
  'comparative-ane': 'Inferred from wider ancient Near Eastern evidence and parallels.',
  'scholarly-reconstruction': 'A named scholarly synthesis or identification, cited on the card.',
  'design-placeholder': 'A disclosed design decision awaiting evidence or replacement.',
};

/** The shared legend for evidential basis and confidence, used across the UI. */
export function Legend() {
  return (
    <div>
      <h3>Evidential basis</h3>
      {(Object.keys(BASIS_LABELS) as ClaimBasis[]).map((b) => (
        <p key={b} style={{ margin: '6px 0', fontSize: 13 }}>
          <span className={`basis-chip basis-${b}`}>{BASIS_LABELS[b]}</span>{' '}
          <span style={{ color: 'var(--muted)' }}>{BASIS_EXPLANATIONS[b]}</span>
        </p>
      ))}
      <h3>Confidence</h3>
      {CONFIDENCE_ORDER.map((c) => (
        <p key={c} style={{ margin: '6px 0', fontSize: 13 }}>
          <span className="conf-label">
            <i className={`conf-dot conf-${c}`} /> {CONFIDENCE_LABELS[c]}
          </span>
        </p>
      ))}
    </div>
  );
}
