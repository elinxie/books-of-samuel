# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## User priority note (2026-07-07, carries forward)

The user explicitly asked to **deprioritize deep bibliographic
research/cross-checking and heavy test-writing** when it costs significant
token budget, and to **prioritize making the scene look more realistic**
(the visual-fidelity roadmap) instead. Citation-verification-style tasks
(queue #4, now resolved) should not be repeated speculatively — treat
`docs/visual-fidelity-roadmap.md` as the default work source over research
tasks unless a real blocker forces otherwise. Keep new tests focused and
proportionate (a couple of targeted assertions, not exhaustive coverage) —
don't over-invest tokens in test depth for routine visual tweaks.

## Out-of-band insertion (2026-07-07, Fable, ADR-009)

The user directed an unscheduled pull-forward: realistic 3D characters
(`src/engine/characters/`, procedural skinned rig + period dress + baked-pose
crowds) landed now, ahead of everything below. This does **not** replace the
"Next Sonnet session" list below — it was inserted before it, not instead of
it. The visual-fidelity roadmap's §D (characters) is now mostly checked off
as a result; §A/§B/§C and the M2 groundwork item are still exactly where they
were. See `docs/run-log.md` and `docs/progress.md` for what shipped.

## Since the last version of this note

`docs/fable-review-queue.md`'s Open table is now **empty** — queue #4
(citation completeness for `garfinkel-ganor-2019`/`oren-tel-sera-1993`) was
resolved 2026-07-07 (Sonnet, via the `researcher` subagent): real venues,
named proponents/critics now in the source cards, `claims.ts`, and
`locations.ts`. The substantive 3-candidate Ziklag-location dispute is
untouched — only citation accuracy improved. See `docs/run-log.md`.

The same session started the visual-fidelity roadmap
(`docs/visual-fidelity-roadmap.md`, new): landed slice 1 (Ziklag ground-color
zones keyed to real smoke-origin/gate positions instead of one flat disk —
`src/scenes/ziklag/terrain.ts`). Also checked in a project skill,
`.claude/skills/threejs-r3f-performance/SKILL.md`, mirroring the user's
account-wide Three.js/R3F performance skills (couldn't export their exact
content — no tool exposes raw account-skill text to this session — so it's
an original write-up grounded in this repo's actual patterns).

## Next Sonnet session: pick in this order

1. **Visual-fidelity roadmap, next slice(s)** — slices 1–2
   (`docs/visual-fidelity-roadmap.md` §A terrain zones, §C settlement
   material jitter) are done. Slice 3 is next in the suggested order:
   instanced burned-debris + expanded rock/scrub variety (§A), using the
   same `Vegetation.tsx` instancing pattern. Keep picking small slices from
   that doc each session; re-order freely by what's smallest/safest for the
   remaining budget. Ask `performance-reviewer` after any slice that adds
   real instance/draw-call volume.
2. **Milestone 2 groundwork** (lower priority than visual work per the user's
   note above, but still open): flesh out the `besor-crossing` `SceneDef`
   (beats/viewpoints) and its claims. Terrain-wise this is unblocked — compose
   against `createTerrain` with a `channel` feature (ADR-005; new
   `src/scenes/besor-crossing/terrain.ts`, add to `SCENE_REGISTRY` in
   `ObservePage`, following Ziklag's pattern). Route _distances_ still depend
   on the Ziklag-candidate question (`uncertainty-register.md` #1–2) — keep
   the crossing "representative," not a measured route.
3. **Repo hygiene**: confirm GitHub Pages is actually live (README
   "Deploying" — one manual repo-settings step). If not live, that's a
   Milestone 0 acceptance criterion and jumps to top priority.

Milestone 1 sign-off (`docs/fable-review-checklist.md` pass, flip `M1` to
`released`) is a **Fable** task now that queue #4 is clear — not Sonnet's to
self-certify; don't block on it (`docs/next-fable-session.md`).

## Known state

- Full gate green as of this commit (format / lint / typecheck / 40 vitest /
  build / 7 playwright e2e).
- No open bugs. No open Fable-review-queue items.
- `M1` stays `in-progress` pending the Fable sign-off pass noted above.

## Files most recently changed

`src/scenes/ziklag/terrain.ts` (ground-color zones), `src/scenes/ziklag/terrain.test.ts`
(new zone-effect tests), `sources/source-cards/{garfinkel-ganor-2019,oren-tel-sera-1993}.json`,
`src/data/claims.ts`, `src/data/locations.ts`, `docs/fable-review-queue.md`,
`docs/uncertainty-register.md`, `docs/bibliography.md`, new
`docs/visual-fidelity-roadmap.md`, new `.claude/skills/threejs-r3f-performance/SKILL.md`.
