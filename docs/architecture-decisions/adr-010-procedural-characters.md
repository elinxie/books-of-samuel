# ADR-010: Procedural skinned character system

**Status:** Accepted (2026-07-07). Renumbered from ADR-009 on 2026-07-08 — that number was already taken by adr-009-violence-depiction-defaults.md; this ADR landed later the same day via a separate PR and collided.

## Context

ADR-008 scheduled modeled figures for Milestone 3, but realistic web-native 3D
characters are now pulled forward. A licensing review found no CC0 realistic,
rigged human package that fits the period, budget, and provenance requirements.

## Decision

- Generate project-original character geometry in code under `src/engine/characters/`.
- Use a stable 17-bone skeleton contract so future Blender/glTF bodies can replace
  the procedural mesh without changing scene code.
- Provide principal and crowd detail tiers; crowds can use baked static pose buckets
  sampled from the same animation clips.
- Keep the asset records honest: the figures are improved placeholders until dress,
  gear, and pack-animal details receive full historical review.

## Consequences

The Ziklag scene can move beyond capsule figures while retaining clear disclosure,
source traceability, and a future path to authored character art.
