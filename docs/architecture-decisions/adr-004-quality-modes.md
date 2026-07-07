# ADR-004: Quality mode profiles

**Status:** Fixed shape (three modes: study/balanced/high; the profile fields
listed below). Tuning specific numeric values within a profile is routine Sonnet
work; adding a fourth mode or restructuring the profile shape should go through
a performance-reviewer pass and be noted in `docs/run-log.md`.

## Context

Needed to run acceptably on a "normal laptop browser" without looking like a bare
polygon demo, per the project's performance-and-fidelity goal.

## Decision

Three named profiles in `src/engine/quality.ts` (`QUALITY_PROFILES`), each setting:
`fogNear`/`fogFar`, `cameraFar`, `dpr` range, `shadows` + `shadowMapSize`,
instance counts (`vegetationCount`, `rockCount`, `treeCount`, `figureCount`,
`smokeParticlesPerColumn`), and `useSkyShader`. Components read the active profile
from the Zustand store (`useAppStore((s) => s.quality)`) rather than hardcoding any
of these values locally.

- **Study**: short draw distance, dense fog, no shadows, minimal instancing — for
  weak hardware or pure text-study sessions.
- **Balanced**: default for most users.
- **High**: longer draw distance, higher shadow resolution, denser
  vegetation/crowds — for users who want to "simply inhabit the scene."

## Consequences

- Adding density to a scene means adding an instance-count field to the relevant
  profile, not a scene-local constant — keeps quality tuning centralized.
- No FPS-based auto-detection yet; the user picks a mode manually via Settings.
  Automatic hardware-based selection is a plausible future feature, not yet
  planned into a milestone.
