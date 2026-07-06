# CLAUDE.md

Guidance for any Claude Code session working in this repository.

## What this project is

A historically serious, first-person, neutral-observer 3D visualizer for the world
of 1–2 Samuel — not a game. No combat mechanics, inventory, leveling, quests, or
win/loss states. The user observes, navigates, pauses, and replays scripted
reenactments in reconstructed historical settings, with every visual element
traceable to biblical text, archaeology, comparative ancient Near Eastern evidence,
a named scholarly reconstruction, or a clearly labeled placeholder.

## Start here

1. `README.md` — project overview, dev commands.
2. `docs/model-handoff.md` — what's fixed, what's changeable, when to use Fable
   vs. Sonnet.
3. `docs/sonnet-continuation.md` — the actual step-by-step resume checklist.
4. `docs/next-run.md` — the concrete next task.

Do not skip straight to writing code — `docs/next-run.md` and
`docs/fable-review-queue.md` may change what's actually next.

## Hard constraints (do not relax these without a Fable review)

- No proprietary game assets, trademarks, mechanics, maps, names, or UI patterns
  copied from any commercial game or franchise.
- No full ESV chapter text stored or displayed — references, original summaries,
  and short excerpts only (budget enforced by `src/data/integrity.test.ts`). See
  `docs/architecture-decisions/adr-003-esv-policy.md`.
- Every claim needs a real `basis` and `confidence`; disputed questions get
  `scholarlyViews`, not a single silently-chosen answer.
- Anachronism discipline: when period evidence is thin, omit or label
  `design-placeholder` rather than invent.
- Violence is shown honestly, never gratuitously; a reduced-intensity mode is
  planned for battle scenes.
- Theological commentary stays off by default and separated from historical
  content when it is eventually added (not yet built).

## Where things live

See `docs/architecture.md` for the full directory layout. Short version: historical
content and data model in `src/data/`, source bibliography in
`sources/source-cards/*.json`, per-scene 3D composition in `src/scenes/<name>/`,
shared 3D building blocks in `src/engine/`, UI/HUD in `src/ui/` and `src/pages/`,
all project documentation in `docs/`.

## Model routing (summary — full policy in `docs/model-handoff.md`)

- **Fable**: architecture/taxonomy changes, milestone sign-off review, new major
  scene creative direction, genuinely contested historical/design calls, stack or
  policy changes.
- **Sonnet** (or another capable coding model): everything else — implementation,
  tests, docs, source-card entry, bug fixes, refactors, routine scene-building
  within an already-set composition.
- Model switch commands: `claude --model claude-fable-5`,
  `claude --model claude-sonnet-5`, or `/model` inside a session. Switches do not
  persist automatically across sessions.

## Dev commands

```bash
npm install
npm run dev          # local dev server
npm run verify        # format:check + lint + test + build + e2e — run before committing
npm run build:sources # regenerate sources/source-index.json after editing source cards
```

## Internal communication style

Use compact, information-dense notes for run logs, checkpoints, and subagent
status updates (`docs/run-log.md`, `docs/session-checkpoints/`) — token efficiency
matters here since this project runs across many short sessions. Do **not** compress
public-facing content: biblical summaries, historical explanations, bibliography
entries, and README sections should read as normal, clear prose.

## Subagents

See `.claude/agents/*.md` for the project's subagent roster and
`.claude/commands/continue-samuel-sonnet.md` for the standard resume command.
