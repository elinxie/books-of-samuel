# Progress

Keep this concise — status, not narrative. Detailed roadmap lives in
`src/data/milestones.ts` (rendered at `/progress` in-app).

## Milestone 0 — Repo foundation: **done**

- Stack chosen + documented (`docs/architecture.md`, ADR-001).
- Data model implemented (`src/data/types.ts` + seeded content).
- Research/source folder structure + ingestion policy.
- Progress/features/sources/method pages.
- Unit tests (31 passing: data integrity, source cards, store, reenactment timing).
- Playwright smoke suite (6 passing).
- CI + GitHub Pages deploy workflows.
- Continuation docs, subagents, slash commands (this pass).

## Milestone 1 — 1 Samuel 30 vertical slice (Ziklag): **in progress, functionally complete**

Done:

- Ziklag burned-settlement scene: terrain, houses, wall/gate, smoke, vegetation,
  well, fields, threshing floor — all labeled placeholders.
- Scripted reenactment (return, grief, mutiny talk, David strengthens himself,
  Abiathar/ephod inquiry, departure south) driven by a pure, unit-tested pose
  function, scrubbable via the timeline.
- First-person observer camera: inspect (orbit) and walk (pointer-lock WASD) modes.
- Quality modes (study/balanced/high) wired through every instanced system.
- Sources / scholarly-notes / labels toggles; theological-commentary toggle present
  but disabled ("coming later").
- Teleport panel (viewpoints + scene/region index).
- "Certain vs. reconstructed" panel grouped by confidence.
- Entity inspector with claim cards + scholarly views + source citations.
- 16 source cards seeded; ESV excerpt budget enforced by test.

Remaining for a clean M1 close-out:

- Citation verification pass on `garfinkel-ganor-2019` and `oren-tel-sera-1993`
  (queue item 4).
- One short final checklist pass (`docs/fable-review-checklist.md`) before
  flipping `M1` to `released` in `src/data/milestones.ts`. The creative-direction
  review items (plan type, figure ratio, lighting) were all resolved at the
  2026-07-07 Fable session (`fable-review-queue.md` Resolved), which also landed
  ADR-005…ADR-009 (terrain generalization, layout conventions, reenactment
  pattern, asset pipeline, violence default).

## Milestone 2–4: **planned**, not started. See `src/data/milestones.ts` for goals.

## Repo note: companion reader at `/reader/`

A separate Claude Code session had independently built and merged (into `main`,
before this branch's PR) an unrelated static KJV/WEB full-text reader under the
same repo. Reconciled per user direction: it now lives at `/reader/` as a
companion full-text tool (its own README, own Python toolchain, not part of this
project's stack) — see `docs/architecture.md` § "The `reader/` companion" and
`docs/run-log.md` for the full story. Root `LICENSE` (MIT) came from that merge
and now covers the whole repo's code.

## Build/test status as of last run

- `npm run format:check` — pass
- `npm run lint` — pass
- `npm run test` (vitest) — 39/39 pass (31 + 8 terrain tests from ADR-005)
- `npm run build` — pass (also copies `reader/index.html` → `dist/reader/index.html`)
- `npm run e2e` (playwright) — 7/7 pass (sandboxed env needs
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium`; unnecessary in normal CI)
