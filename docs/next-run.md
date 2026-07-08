# Next run

**Read `docs/sonnet-continuation.md` first if you haven't (Sonnet), or
`docs/model-handoff.md` for the model-routing policy.**

## Immediate follow-up from Pages hardening (2026-07-08)

After this PR is merged, rerun/confirm the **Deploy to GitHub Pages** workflow and
check `https://elinxie.github.io/books-of-samuel/` in DevTools. The root cause of
the reported blank page was a request for `/src/main.tsx`, meaning Pages served
the repository's Vite development `index.html` instead of the built `dist/`
artifact. The workflow now runs `actions/configure-pages@v5`, uploads `dist/`,
and the artifact includes `.nojekyll`; the network table should request
`/books-of-samuel/assets/...` instead. If `/src/main.tsx` still appears, verify
repo Settings → Pages → Source is **GitHub Actions**, not branch/root.

## User priority note (2026-07-07, carries forward; updated 2026-07-08)

The user explicitly asked to **deprioritize deep bibliographic
research/cross-checking and heavy test-writing** when it costs significant
token budget, and to **prioritize making the scene look more realistic**
(the visual-fidelity roadmap). Keep new tests focused and proportionate (a
couple of targeted assertions, not exhaustive coverage) — don't over-invest
tokens in test depth for routine visual tweaks.

**Update 2026-07-08:** M2 groundwork is now unblocked and direction-complete
(world-director briefs landed — see below). Building `besor-crossing` per its
brief is a **co-equal priority** with the visual-fidelity roadmap now, not a
lower-priority background item — pick whichever is the smaller/safer slice
for the remaining session budget.

## Since the last version of this note

Fable session 2026-07-08, two deliverables:

1. **M1 sign-off** (`docs/fable-review-checklist.md` pass): full gate green
   (format/lint/40 vitest/build/7 e2e), procedural character system (merged
   via codex PR #8/#9 — had no run-log entry until now, see
   `docs/run-log.md`) reviewed clean: no anachronistic gear, honest
   placeholder disclosure with provenance in `src/data/assets.ts`. `M1`
   flipped to `released` in `src/data/milestones.ts`. **Follow-up rider:**
   run `performance-reviewer` over `src/engine/characters`' instancing/bake
   path with the next scene-content slice (item 1 below) — not checked at
   merge time.
2. **M2 scene direction**: `docs/design/besor-crossing-brief.md` +
   `docs/design/amalekite-camp-brief.md` (world-director pass), with
   `SceneDef` beats/viewpoints filled in `src/data/scenes.ts` for both
   (besor-crossing: 9 beats incl. the return-leg spoil ruling, 1 Sam
   30:21–25; amalekite-camp: 7 beats incl. a time-compression card and
   camel-flight-only per register #6). Both scenes stay `status: 'planned'`
   — geometry is Sonnet's to build, direction is not up for re-litigation
   absent a real historical-meaning problem (route back through
   `docs/fable-review-queue.md` if so).

Also this session: ADR-009 collision fixed
(`adr-009-procedural-characters.md` → `adr-010-procedural-characters.md`;
ADR-009 stays the violence-depiction ADR), checkpoint scaffolding
(`scripts/session-usage.mjs`, `.claude/settings.json`,
`docs/checkpoint-protocol.md`) and cross-agent handoff docs (`AGENTS.md`,
`docs/web-handoff.md`) landed. Full detail in `docs/run-log.md`.

## Next Sonnet session: pick in this order

1. **Build `besor-crossing`** per `docs/design/besor-crossing-brief.md` —
   direction and beats are already set (`src/data/scenes.ts`), just build it.
   Terrain: an ADR-005 `channel` feature (new
   `src/scenes/besor-crossing/terrain.ts`, wired into `SCENE_REGISTRY` in
   `ObservePage.tsx` alongside a new scene component, following Ziklag's
   pattern). Add the claims listed in the brief's **§Required source basis**
   before/alongside geometry — `claim-besor-channel-form` (extend
   `claim-negev-terrain`'s sources), `claim-two-hundred-stay`,
   `claim-egyptian-servant`, `claim-spoil-statute`, `claim-pack-donkeys` — no
   new ESV excerpts (budget guard in `src/data/integrity.test.ts`). Run
   `performance-reviewer` on this slice (covers both the new terrain and the
   character-instancing rider above).
2. **Visual-fidelity roadmap, next slice** — slice 3
   (`docs/visual-fidelity-roadmap.md` §A: instanced burned-debris + expanded
   rock/scrub variety), same `Vegetation.tsx` instancing pattern as slices
   1–2. Co-equal priority with item 1 — pick whichever fits the remaining
   budget.
3. **`amalekite-camp`** per `docs/design/amalekite-camp-brief.md`, once
   besor-crossing lands (shares the loess/steppe palette and register #6's
   camel-flight-only decision — easier once the first M2 scene sets the
   pattern).
4. **Quick Pages-live check**: `deploy.yml` was fixed on `main` by codex PR
   #10 (merged) — confirm the live URL (README's "Live site" link) actually
   renders. Low effort; do it if nothing above fits the remaining budget.

`M1` is **released** — no Fable-blocked items remain
(`docs/fable-review-queue.md` Open table is empty). Checkpoint protocol is
mandatory now: commit + push after every completed slice, per
`docs/checkpoint-protocol.md`.

## Known state

- Full gate green as of this commit (format / lint / typecheck / 40 vitest /
  build / 7 playwright e2e — sandboxed env needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`,
  unnecessary in real CI).
- No open bugs. No open Fable-review-queue items.
- `M1` is `released`. `M2` is `planned` (direction set, build not started).

## Files most recently changed

`docs/design/besor-crossing-brief.md`, `docs/design/amalekite-camp-brief.md`,
`src/data/scenes.ts` (M2 beats/viewpoints), `src/data/milestones.ts` (M1 →
released), `src/data/assets.ts` + `src/data/features.ts` (ADR-010 refs),
`docs/architecture-decisions/adr-010-procedural-characters.md` (renamed from
adr-009), `scripts/session-usage.mjs`, `.claude/settings.json`,
`docs/checkpoint-protocol.md`, `AGENTS.md`, `docs/web-handoff.md`,
`docs/model-handoff.md` (delegation rule).

## Test-gap backlog (from 2026-07-08 biblical review)

`src/data/integrity.test.ts` only scans `PASSAGES[].keyExcerpts` for the ESV
excerpt budget — beat captions in `SCENES[].beats[]` are invisible to it. A
future scene could embed quotes without tripping `npm test`. Small
`test-engineer` task: scan captions for quoted ESV text too.
