/**
 * Core data model for the Books of Samuel historical visualizer.
 *
 * Design intent (see /docs/architecture-decisions/adr-002-data-model.md):
 * every visual element in a scene must be traceable to a ReconstructionClaim,
 * every claim to one or more SourceCards, and every uncertainty must be
 * representable rather than collapsed into fake consensus.
 */

/** Confidence levels for any reconstruction claim shown in the app. */
export type Confidence = 'high' | 'moderate' | 'low' | 'speculative';

/** The evidential basis for a claim or visual element. */
export type ClaimBasis =
  | 'biblical-text'
  | 'archaeology'
  | 'comparative-ane'
  | 'scholarly-reconstruction'
  | 'design-placeholder';

export type ContentStatus = 'released' | 'in-progress' | 'planned';

export interface ScholarlyView {
  id: string;
  label: string;
  /** Named scholars associated with this view. Hedge with "e.g." when attribution is unverified. */
  proponents?: string[];
  summary: string;
  confidence: Confidence;
  sourceIds: string[];
}

export interface ReconstructionClaim {
  id: string;
  /**
   * What the app visually asserts. Claims derived from the narrative are
   * phrased as "The narrative states/presents ..." so that textual content
   * and historical corroboration stay distinct.
   */
  statement: string;
  basis: ClaimBasis;
  confidence: Confidence;
  sourceIds: string[];
  scholarlyViews?: ScholarlyView[];
  notes?: string;
}

export interface PassageExcerpt {
  /** e.g. "1 Samuel 30:6" */
  verse: string;
  /** Short ESV excerpt. Length budget enforced by tests (see ESV policy). */
  text: string;
}

export interface Passage {
  id: string;
  book: '1 Samuel' | '2 Samuel';
  chapter: number;
  verses?: string;
  /** Human-readable reference, e.g. "1 Samuel 30". */
  reference: string;
  translationAnchor: 'ESV';
  /** Summary in the project's own words — never a paraphrase-dump of the full chapter. */
  summary: string;
  keyExcerpts?: PassageExcerpt[];
  sceneIds: string[];
  milestoneId: string;
  status: ContentStatus;
}

export interface HistoricalPeriod {
  id: string;
  label: string;
  approxRange: string;
  approxStartYearBC: number;
  approxEndYearBC: number;
  summary: string;
  claimIds: string[];
}

export interface SiteIdentification {
  disputed: boolean;
  views: ScholarlyView[];
}

export interface LocationEntry {
  id: string;
  name: string;
  altNames?: string[];
  region: string;
  summary: string;
  identification: SiteIdentification;
  approxCoordinates?: { lat: number; lon: number; confidence: Confidence };
  sceneIds: string[];
  claimIds: string[];
  status: ContentStatus;
}

export interface CharacterOrGroup {
  id: string;
  name: string;
  kind: 'person' | 'group';
  summary: string;
  passageRefs: string[];
  claimIds: string[];
}

export interface RouteDef {
  id: string;
  name: string;
  fromLocationId: string;
  toLocationId: string;
  summary: string;
  approxDistanceKm?: { min: number; max: number; confidence: Confidence };
  claimIds: string[];
  status: ContentStatus;
}

export interface SceneViewpoint {
  id: string;
  label: string;
  /** x/z in scene meters; y is height offset above local terrain. */
  position: [number, number, number];
  lookAt: [number, number, number];
}

export interface SceneBeat {
  id: string;
  timeSec: number;
  title: string;
  caption: string;
  passageRef: string;
}

export interface SceneDef {
  id: string;
  title: string;
  passageIds: string[];
  locationId: string;
  periodId: string;
  milestoneId: string;
  status: ContentStatus;
  synopsis: string;
  durationSec: number;
  beats: SceneBeat[];
  viewpoints: SceneViewpoint[];
  claimIds: string[];
  assetIds: string[];
}

export interface AssetRecord {
  id: string;
  name: string;
  represents: string;
  placeholder: boolean;
  whyTemporary?: string;
  historicalRequirements?: string;
  replacementMilestoneId?: string;
  /** Repo path of the loaded model file (e.g. a `.glb`), if any. See ADR-008. */
  modelPath?: string;
  /** Licensing/provenance category for a modeled or generated asset. See ADR-008. */
  modelLicense?: 'project-original' | 'cc0-adapted';
  /** How the model was made: authoring method, what (if anything) it adapted, where source files live. See ADR-008/ADR-009. */
  modelProvenance?: string;
}

export interface Milestone {
  id: string;
  label: string;
  status: ContentStatus;
  passageRefs: string[];
  goals: string[];
}

export type FeatureStatus = 'done' | 'in-progress' | 'planned';

export interface FeatureEntry {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  milestoneId: string;
}

export type SourceType =
  | 'biblical-text'
  | 'archaeology'
  | 'historical-geography'
  | 'material-culture'
  | 'scholarly-article'
  | 'documentation'
  | 'reference'
  | 'other';

export type CopyrightStatus = 'public-domain' | 'licensed' | 'copyrighted-limited-use' | 'unknown';

/**
 * Bibliographic card for every source the project relies on.
 * Canonical records live as JSON in /sources/source-cards/; see
 * /docs/source-ingestion-policy.md. `url` is optional for print-only works
 * (documented deviation from the original spec).
 */
export interface SourceCard {
  id: string;
  title: string;
  url?: string;
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateAccessed: string;
  sourceType: SourceType;
  copyrightStatus: CopyrightStatus;
  allowedUseNotes: string;
  summary: string;
  relevantPassages: string[];
  extractedClaims: string[];
  confidenceNotes: string;
}
