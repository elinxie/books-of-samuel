# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## State right now (2026-07-09, post-Gilboa-brief)

**M2 is released.** M3's first scene has its world-director brief:
`docs/design/gilboa-battle-brief.md` (Fable, 2026-07-09), `SceneDef`
beats/viewpoints filled in `src/data/scenes.ts` (`gilboa-battle` stays
`status: 'planned'` — no build yet). Full gate green: format/lint/70
vitest/build (e2e not re-run this pass — no interactive surface changed).

Two new fable-review-queue items opened by the brief (both non-blocking for
starting the build): #12 DEM data-sourcing/licensing ADR (deferred — v1 uses
procedural `ridge` terrain), #13 Philistine plumed-headdress source
verification (must clear before the scene ships `released`, not before build
starts).

## Next session: pick in this order

1. **Build `gilboa-battle`** (Sonnet/`threejs-engineer`), following
   `docs/design/gilboa-battle-brief.md` exactly:
   - Continue after the landed terrain slice: `ridge` `TerrainSpec` support exists in
     `src/engine/terrain.ts`, and `src/scenes/gilboa-battle/terrain.ts` defines the
     first procedural Gilboa ridge (do not replace it with stacked `mound`s). Next
     wire the scene build around this terrain.
   - New claims per the brief's "Required source basis": topography/terrain
     (`claim-gilboa-topography`, `claim-gilboa-terrain-form`) are seeded; add the narrated beats
     (`claim-gilboa-rout`, `claim-sons-killed`, `claim-saul-wounded-archers`,
     `claim-armor-bearer-refusal`, `claim-saul-death`), material culture
     (`claim-philistine-kit` with the headdress `scholarlyViews` dispute,
     `claim-israelite-muster-kit`), design (`claim-battle-scale`).
   - New characters (light entries): `jonathan`, `abinadab-son-of-saul`,
     `malchi-shua`, `sauls-armor-bearer`.
   - Military-kit attachment meshes on the existing ADR-010 rig (spear/
     shield/bow/round-shield/straight-sword/headdress) — not new body
     models. Fallen/prone pose buckets + death-sequence pose functions
     (ADR-007, pure, beat-invariant test required).
   - Violence rendering per the brief's beat table — both `violenceMode`
     paths, ADR-009's first-visit advisory is part of this milestone's build
     (not yet implemented anywhere in the codebase; this is the first scene
     that needs it).
   - Scale: ~120–140 combat figures at high tier per the brief — budget
     against the Amalekite scene's draw-call count.
   - Reviewers after the first geometry slice: `archaeology-reviewer`
     (kit/headdress dispute honesty), `biblical-text-reviewer` (beat
     captions vs. 31:1–6), `performance-reviewer` (early, not just at the
     end per the brief).
2. **Visual-fidelity roadmap slice 3** (`docs/visual-fidelity-roadmap.md` §A:
   instanced burned-debris + expanded rock/scrub variety in Ziklag) — good
   filler if Gilboa's data/claims layer needs a Fable-tier pause partway
   through (e.g., queue #13's headdress citation).
3. **Quick Pages-live check** (carried forward): confirm
   `https://elinxie.github.io/books-of-samuel/` renders after the latest
   merge (expect `/books-of-samuel/assets/...` requests, not `/src/main.tsx`).
4. **Test-gap backlog** (small `test-engineer` task, from the 2026-07-08
   biblical review): `integrity.test.ts` only scans `PASSAGES[].keyExcerpts`
   for the ESV excerpt budget — beat captions in `SCENES[].beats[]` are
   invisible to it. Add caption scanning.

## User priority note (2026-07-07, carries forward)

Deprioritize deep bibliographic research and heavy test-writing when they cost
significant budget; prioritize visual realism. Keep tests focused.

## Environment notes

- Sandboxed e2e needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  (unnecessary in real CI).
- `claude/amalekite-camp-7h2pjc` was restarted from `main` post-merge per the
  checkpoint protocol; the M2 sign-off commit rides on it.
