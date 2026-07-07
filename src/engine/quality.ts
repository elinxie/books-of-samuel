import type { QualityMode } from '../state/store';

export interface QualityProfile {
  label: string;
  description: string;
  fogNear: number;
  fogFar: number;
  cameraFar: number;
  dpr: [number, number];
  shadows: boolean;
  shadowMapSize: number;
  vegetationCount: number;
  rockCount: number;
  treeCount: number;
  smokeParticlesPerColumn: number;
  figureCount: number;
  useSkyShader: boolean;
}

/**
 * Quality profiles per /docs/architecture.md. Study mode favors smooth
 * observation on weak hardware; High extends draw distance and density.
 */
export const QUALITY_PROFILES: Record<QualityMode, QualityProfile> = {
  study: {
    label: 'Study (performance)',
    description: 'More fog, shorter draw distance, fewer figures and plants, no shadows.',
    fogNear: 55,
    fogFar: 420,
    cameraFar: 520,
    dpr: [0.75, 1],
    shadows: false,
    shadowMapSize: 512,
    vegetationCount: 350,
    rockCount: 120,
    treeCount: 14,
    smokeParticlesPerColumn: 28,
    figureCount: 40,
    useSkyShader: false,
  },
  balanced: {
    label: 'Balanced',
    description: 'Default. Moderate fog, shadows, and density.',
    fogNear: 120,
    fogFar: 900,
    cameraFar: 1000,
    dpr: [1, 1.5],
    shadows: true,
    shadowMapSize: 1024,
    vegetationCount: 900,
    rockCount: 260,
    treeCount: 26,
    smokeParticlesPerColumn: 56,
    figureCount: 60,
    useSkyShader: true,
  },
  high: {
    label: 'High fidelity',
    description: 'Less fog, longer draw distance, higher density and shadow quality.',
    fogNear: 200,
    fogFar: 1600,
    cameraFar: 1800,
    dpr: [1, 2],
    shadows: true,
    shadowMapSize: 2048,
    vegetationCount: 1600,
    rockCount: 420,
    treeCount: 40,
    smokeParticlesPerColumn: 90,
    figureCount: 72,
    useSkyShader: true,
  },
};

export function useQualityProfile(quality: QualityMode): QualityProfile {
  return QUALITY_PROFILES[quality];
}
