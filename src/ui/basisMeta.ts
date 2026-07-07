import type { ClaimBasis, Confidence } from '../data/types';

/** Display names for the five evidential bases. */
export const BASIS_LABELS: Record<ClaimBasis, string> = {
  'biblical-text': 'Biblical text',
  archaeology: 'Archaeology',
  'comparative-ane': 'Comparative ANE',
  'scholarly-reconstruction': 'Scholarly reconstruction',
  'design-placeholder': 'Design placeholder',
};

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Low confidence',
  speculative: 'Speculative reconstruction',
};

export const CONFIDENCE_ORDER: Confidence[] = ['high', 'moderate', 'low', 'speculative'];
