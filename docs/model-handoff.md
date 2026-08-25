# Model handoff

**2026-08-24, user directive: do not invoke Fable on this project.** Every
"needs Fable" routing rule below is retired — `.claude/agents/fable-architect.md`
and `.claude/agents/world-director.md` both run `model: sonnet` now. Don't run
`/model claude-fable-5`, don't retry a Fable call after an error, and don't
treat a Fable spend-limit error as something to wait out. Everything this doc
used to route to Fable — milestone sign-off, scene creative direction,
architecture/taxonomy calls, contested historical/design calls — is Sonnet's
(or another capable coding model's) to decide directly: implement the most
defensible option and mark genuinely contested calls **provisional** in
`docs/fable-review-queue.md`, the same discipline the "How to continue if
Fable usage runs out" section below already describes — that fallback path is
now simply the only path, not a fallback. The rest of this doc (what was
already decided, the fixed-vs-changeable list, what NOT to spend
review-tier attention on) is still accurate and load-bearing; only the model
name attached to "who does the reviewing" has changed.

This is the single most important doc for continuing this project across chats and
models.

## A note on how this doc was produced

I (Sonnet 5) do not have any tool that reads your Claude account's Fable 5 usage
meter — that's account/billing-level information, not something exposed to a coding
agent. So the guidance below is a **policy based on what kind of decision a task
is**, not a readout of your remaining quota. You're the one who knows the number;
this doc tells you how to spend it well regardless of what it currently is.

## What Fable decided (the baseline)

In the first session, Fable set the following, all recorded in version-controlled
files so no chat memory is required to reconstruct them:

| Decision                                                                                                        | Where it's recorded                                                                    |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Tech stack (Vite/React/R3F/TS/Zustand/Zod/Vitest/Playwright)                                                    | `docs/architecture.md`, `docs/architecture-decisions/adr-001-tech-stack.md`            |
| Claim/basis/confidence data model                                                                               | `src/data/types.ts`, `docs/architecture-decisions/adr-002-data-model.md`               |
| ESV excerpt-only policy                                                                                         | `docs/architecture-decisions/adr-003-esv-policy.md`, `docs/source-ingestion-policy.md` |
| Quality-mode profile shape                                                                                      | `docs/architecture-decisions/adr-004-quality-modes.md`                                 |
| Reconstruction method (narrated-vs-corroborated, anachronism/violence/commentary policy)                        | `docs/reconstruction-method.md`                                                        |
| Milestone roadmap and scope (M0–M4, chapter order)                                                              | `src/data/milestones.ts`, `docs/progress.md`                                           |
| Ziklag vertical-slice scene composition (settlement plan type, figure ratio, timeline beats, camera viewpoints) | `src/scenes/ziklag/*`, `docs/uncertainty-register.md`                                  |
| Subagent roster                                                                                                 | `.claude/agents/*.md`                                                                  |

Added in the 2026-07-07 Fable review session:

| Decision                                                                         | Where it's recorded                                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Per-scene terrain (`TerrainSpec` + `createTerrain`)                              | `docs/architecture-decisions/adr-005-terrain-generalization.md`       |
| Settlement-layout: defer extraction, conventions standardized                    | `docs/architecture-decisions/adr-006-settlement-layout-pattern.md`    |
| Pure pose functions as the reenactment standard                                  | `docs/architecture-decisions/adr-007-reenactment-pose-functions.md`   |
| Asset pipeline (Blender → glTF at M3, sourcing/licensing policy)                 | `docs/architecture-decisions/adr-008-asset-pipeline.md`               |
| Violence depiction default (standard + first-visit advisory)                     | `docs/architecture-decisions/adr-009-violence-depiction-defaults.md`  |
| Camel depiction (render, flight beat only); Ziklag plan/ratio/lighting confirmed | `docs/fable-review-queue.md` Resolved, `docs/uncertainty-register.md` |

Added in the 2026-07-09 policy session (user-directed):

| Decision                                                                                     | Where it's recorded                                                   |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Atlas-first scope with constrained game-like affordances (replaces the blanket "not a game") | `docs/architecture-decisions/adr-011-atlas-first-game-affordances.md` |

Added in the 2026-07-16 Fable M3 sign-off session:

| Decision                                                                             | Where it's recorded                                                  |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| DEM terrain-data sourcing/provenance policy (SRTM default, source-card + disclosure) | `docs/architecture-decisions/adr-012-dem-terrain-data.md`            |
| ADR-009 extended to funerary handling of the dead (covered-before-flame, both modes) | `docs/architecture-decisions/adr-009-violence-depiction-defaults.md` |

Why these choices: see the individual ADRs — each states the alternatives
considered and the consequences, not just the conclusion.

## Fixed vs. changeable

**Fixed for now** (treat as load-bearing; changing it is a real decision —
implement the most defensible option and log it as **provisional** in
`docs/fable-review-queue.md`, don't just change it inline):

- The tech stack and its major dependencies.
- The `ReconstructionClaim`/`ClaimBasis`/`Confidence` taxonomy shape.
- The ESV excerpt budget and no-full-text policy.
- The milestone order (1 Sam 30 → 31 → 2 Sam 1–2 → onward chapter by chapter).
- The atlas-first scope boundary (ADR-011): game-like affordances only within
  its allow-list; fantasy systems, loot grind, power-fantasy leveling, win/loss
  states that distort the material, and unsourced invented certainty stay out
  without a separate documented approval.

**Sonnet (or any capable coding model) may change freely:**

- Anything inside a scene's implementation once its composition is set (geometry
  details, instancing strategy, shader tweaks, layout constant tuning).
- New source cards, new claims within the existing taxonomy, new scenes that
  follow the established checklist (`docs/reconstruction-method.md`).
- Tests, docs, refactors, bug fixes, CI/build config, asset-roadmap bookkeeping.
- Minor UI layout and copy (not historical/theological content decisions).

**Needs extra care (review-tier, not routine):** see `docs/fable-review-queue.md`
for the live list. As a rule of thumb, a task needs this extra care if getting it
wrong would be expensive to unwind later (it's load-bearing for many future
scenes) or if it's a judgment call about historical/creative direction rather
than an execution detail. This used to be "needs Fable"; it's now just work
Sonnet should slow down and be deliberate about, documenting the reasoning in
`docs/fable-review-queue.md` rather than deciding it silently.

## What review-tier work actually looks like

**Slow down and document reasoning for, roughly in priority order:**

1. **Milestone sign-off review** — once a milestone's scenes are built and
   tested, a full pass checking historical plausibility, anachronisms, visual
   coherence, performance risk, source traceability, and "do the affordances
   serve the atlas per ADR-011" (checklist: `docs/fable-review-checklist.md`).
   Batch this — don't review scene-by-scene if a milestone has several.
2. **Data-model or taxonomy changes** — adding a sixth `ClaimBasis`, changing what
   `confidence` means, restructuring `SceneDef`, etc.
3. **New major scene creative direction** — before building Gilboa, Beth-shan,
   or Jabesh-gilead, set historical intent, visual composition, scale
   assumptions, camera/observer experience, performance target, required source
   basis, and placeholder policy for that scene (mirroring how the Ziklag scene was
   specified) — a single upfront pass, not ongoing supervision during
   implementation.
4. **Genuinely contested historical/design calls** flagged in
   `fable-review-queue.md` — e.g., how to render Amalekite camels given the
   domestication-timing dispute, or the default violence-intensity for Gilboa.
5. **Stack or policy changes** — anything in "Fixed for now" above.

**Routine work, no extra deliberation needed:**

- Writing/editing React or Three.js components that follow an established pattern.
- Test writing, doc maintenance, source-card data entry, bibliography upkeep.
- Routine bug fixes, refactors, CI/lint/build fixes.
- Small UI additions (a new toggle, a new panel section) that don't change scope.
- Anything `.claude/agents/*.md` already routes to a focused subagent.
- Running verification gates (`npm run verify`) or interpreting routine test/CI
  failures — subagent work.

**Batching tip:** accumulate open questions in `fable-review-queue.md` as you hit
them, rather than context-switching per question. Clear the queue in one focused
pass per milestone (or when it has 3–5 items and a milestone is close to done).

## Delegation rule: the orchestrating session judges, subagents execute

A senior dev shouldn't do work a junior dev can do. The orchestrating session's
attention is the scarce resource here: spend it on judgment — direction, review
verdicts, contested calls — never routine execution.

Concretely: running `npm run verify` and interpreting ordinary failures, doc
syncing (`docs-maintainer`), test writing (`test-engineer`), source-card data
entry (`researcher`), scene implementation within already-set direction
(`threejs-engineer`, `ui-engineer`), and performance audits
(`performance-reviewer`) should be dispatched to the subagents in
`.claude/agents/*.md`, not done inline by the orchestrating session. The
orchestrating session reads the subagent's conclusion and rules on it; it does
not re-derive the work itself.

Every file in `.claude/agents/` declares `model: sonnet` (including
`fable-architect` and `world-director`, which historically ran on Fable — see
"Model policy — do not invoke Fable" in `CLAUDE.md`).

The same rule runs the other way: don't over-deliberate on anything this doc
already marks as routine — batch genuine review-tier questions in
`docs/fable-review-queue.md` instead of context-switching per question.

The same tiering applies to non-Claude implementation agents (e.g. Codex): see
`AGENTS.md`'s "Your role tier" section, which places them at the
implementation/execution tier, not the judgment tier.

## Historical note: the old Fable/Sonnet split

Before 2026-08-24, this project split judgment-tier work to a separate "Fable"
model and routine execution to Sonnet, with a documented fallback for when
Fable's usage ran out: implement the most defensible option, mark it
**provisional** in `docs/fable-review-queue.md`, and keep moving rather than
blocking on availability — checkpointing each decision as it was made so a
mid-session cutoff lost at most one in-progress item. **That fallback is now
simply how all review-tier work happens, per the top-of-file notice** — there
is no model to fall back from anymore. This section is kept only so old
`docs/run-log.md`/`docs/fable-review-queue.md` entries referencing "Fable
sign-off" or "Fable review" make sense in context.

## Model commands

```bash
# Normal day-to-day development
claude --model claude-sonnet-5

# Inside a running session
/model
/status
```

Model switches do not persist automatically across sessions — set explicitly each
time via `--model` or `/model`. If Sonnet is unavailable, any competent
coding-capable model should follow `docs/sonnet-continuation.md` unmodified
(never fall back to Fable); record which model actually ran in
`docs/run-log.md`.
