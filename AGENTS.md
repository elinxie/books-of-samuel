# AGENTS.md

Instructions for any coding agent working in this repository that does not read
`CLAUDE.md` natively (ChatGPT Codex, Cursor, aider, etc.). If you are Claude
Code, `CLAUDE.md` governs and this file adds nothing new.

## What this project is

An **atlas-first historical world** for 1–2 Samuel: historically serious,
first-person, neutral-observer. Game-like affordances are allowed when they
deepen exploration, orientation, learning, embodied understanding, or scene
comprehension (allow-list in
`docs/architecture-decisions/adr-011-atlas-first-game-affordances.md`); fantasy
systems, loot grind, leveling as power fantasy, win/loss states that distort
the biblical/historical material, and unsourced invented certainty stay out
without separate Fable approval. Every visual element must trace to biblical
text, archaeology, comparative ancient Near Eastern evidence, a named scholarly
reconstruction, or a clearly labeled placeholder.

## Read before working

1. `CLAUDE.md` — hard constraints (they bind you too, verbatim).
2. `docs/next-run.md` — the concrete next task. Do this task, not what you
   infer from browsing.
3. `docs/sonnet-continuation.md` — the step-by-step session checklist.
4. `docs/checkpoint-protocol.md` — when and how to commit (summary below).
5. `docs/architecture.md` — directory layout and stack.

## Your role tier

This repo routes decisions by weight (`docs/model-handoff.md`). Treat yourself
as the **implementation tier** (equivalent to Sonnet): build scenes/UI/tests
within already-set direction, fix bugs, maintain docs and data entries.

Do **not** decide: architecture or data-model taxonomy changes, new-scene
creative direction, contested historical questions, ESV/licensing policy, or
anything `docs/model-handoff.md` lists as "Fixed for now". If a task forces
such a call, implement the most defensible option, mark it clearly as
**provisional** (in code comments and claim `notes`), and add a row to
`docs/fable-review-queue.md` so a Fable-tier review can confirm or reverse it.

## Checkpoint protocol (manual form — you cannot see token meters)

- One task = one slice = one commit + push. Never batch several slices into
  one long uncommitted run.
- Prefer several small tasks over one big one; a usage cutoff then costs at
  most the current slice.
- Finish every task by updating `docs/next-run.md` (next concrete action) and
  appending a compact entry to `docs/run-log.md`.
- If a task ends early or leaves anything half-done, write
  `docs/session-checkpoints/<date>-codex-<slug>.md`: done / in-progress /
  next / test status / files touched.

## Dev commands

```bash
npm install
npm run dev           # local dev server
npm run verify        # format:check + lint + test + build + e2e — run before committing
npm run build:sources # regenerate sources/source-index.json after editing source cards
```

If Playwright's bundled browser is unavailable in your sandbox, set
`PLAYWRIGHT_CHROMIUM_PATH` to a system Chromium (see `docs/architecture.md`
§ Testing layers); if e2e cannot run at all, say so in the PR body instead of
skipping silently.

## Git workflow

- Branch off `main`; open the PR against `main`. Never stack on an unmerged
  feature branch; never push directly to `main`.
- Squash-merge, one commit per PR, once checks are green (agents are
  authorized to merge their own green PRs — see `CLAUDE.md`).
- Commit messages: Conventional Commits, subject ≤ 50 chars where possible.

## Content rules that are easy to break by accident

- **No full ESV chapter text** stored or displayed — references, original
  summaries, and short excerpts only; a test enforces the budget
  (`src/data/integrity.test.ts`).
- **No proprietary game assets/names/mechanics** from any commercial game.
- Every new rendered element needs a claim with a real `basis` and
  `confidence` in `src/data/claims.ts`, or an explicit `design-placeholder`
  asset entry in `src/data/assets.ts` — invented detail with no label fails
  review.
- Disputed historical questions get `scholarlyViews` entries, not a silently
  chosen answer.
