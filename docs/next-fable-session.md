# Next Fable session — building a reusable 3D-world base

**Purpose of this session:** Milestone 1 (Ziklag) works, but several of its
patterns are Ziklag-specific where they should be a general-purpose base —
so that Milestone 2 onward (and other models customizing this project later)
is straightforward reuse, not re-derivation. This doc is a scoped, ordered,
checkpointable brief for that work. It intentionally does not include routine
implementation — that stays with Sonnet.

## If you run low on Fable usage partway through this session

**First choice — stay in this chat and switch models.** Run `/model
claude-sonnet-5` (or whatever model Claude Code offers as available) in the
same conversation. Model switches in Claude Code preserve the full
conversation — the new model sees everything you've done and decided so far,
which is strictly better than a cold restart from docs. Finish whatever item
you're mid-way through if you can; if not, at least write down where you got
to (see checkpoint rule below) before switching.

**Fallback — if the session itself is unusable** (closed, expired, or you're
starting fresh later): the checkpoint rule below is what makes that safe.

**Checkpoint rule — follow this regardless of which path applies:** treat
each numbered item below as an independent unit. The moment you decide one,
immediately (a) write the decision into the real file it belongs in (an ADR,
a claim, `src/data/assets.ts`, etc. — never leave a decision only in this
chat), (b) move that row from `docs/fable-review-queue.md`'s Open table to
its Resolved section with a one-line outcome, (c) append a compact
`docs/run-log.md` entry, (d) commit. Do not batch multiple items into one
uncommitted working state — if you get cut off between items, everything up
to the last commit is safe and the next session (Fable or Sonnet) can see
exactly what's decided and what's still open just by reading the queue.

## Items, in priority order

Each references its full context in `docs/fable-review-queue.md` (items #7,
#8, #9, #1, #2, #3, #5, #6) — read the row there for the "why," not repeated
here.

### 1. Terrain generalization (queue #7)

Decide: should `src/engine/terrain.ts` take a per-scene `TerrainConfig`
(hills amplitude/frequency, an optional "feature" like a tell or a wadi
channel, a base-color ramp) instead of Ziklag's constants living directly in
`terrainHeight()`? Or is a different abstraction better (e.g., named
biome/preset functions per terrain type)? Sonnet's read: parameterize now —
Milestone 2's Besor scene needs a wadi channel feature almost immediately,
and the current function has no way to express one without a copy-paste
fork. Confirm, redirect, or override.

**Deliverable:** an ADR (`docs/architecture-decisions/adr-005-terrain-generalization.md`
or similar) stating the chosen shape, plus updating `terrain.ts` itself if
the change is small enough to make directly — otherwise leave the ADR as the
spec and hand implementation to Sonnet via `docs/next-run.md`.

### 2. Settlement-layout generalization (queue #8)

Decide: extract `src/scenes/ziklag/layout.ts`'s ring-settlement generator
into a reusable, parameterized function now, or defer until a second
settlement scene actually needs it? Sonnet's read: mildly favor deferring
the _extraction_ itself (avoid over-fitting an abstraction to one example)
but documenting the _pattern_ now (seeded PRNG, ring placement math, gate/wall
gap logic) as the approach future settlement scenes should follow, via an ADR
or a note in `docs/reconstruction-method.md`, so the second scene's author
copies a documented pattern rather than reverse-engineering Ziklag's code.

**Deliverable:** a decision recorded either way, with rationale, in an ADR or
`docs/reconstruction-method.md`.

### 3. Reenactment/choreography pattern (not yet queued — add if you agree)

The pure-pose-function pattern (`figurePose(t, ...)` in `ReturningMen.tsx`,
scene time in, position/yaw/pose out, independently unit-testable) worked
well for Ziklag. Confirm this as the standard approach for all future scripted
reenactments, worth an ADR of its own so it's not accidentally reinvented
differently per scene.

**Deliverable:** ADR (or fold into #2's doc) naming this the standard pattern.

### 4. Asset pipeline maturity plan (queue #9)

Decide the concrete path from capsule/box placeholders to modeled assets:
what tooling (Blender + glTF export? a specific asset marketplace with
appropriate licensing? procedural-only, never modeled?), and at what
milestone it actually starts, beyond the current per-asset
`replacementMilestoneId` labels in `src/data/assets.ts`.

**Deliverable:** a decision in `docs/asset-roadmap.md`'s intro, or a new ADR
if it's a real dependency/tooling choice.

### 5. Remaining creative-direction items (queue #1, #2, #3)

Quick confirms, lowest effort of this session — Ziklag's already-shipped
choices (settlement plan type, figure ratio, lighting), each already applied
and disclosed; this is a sign-off pass, not new design work. Resolve each
independently per the checkpoint rule.

### 6. Higher-stakes creative-direction items (queue #5, #6)

Camel representation for the Milestone 2 Amalekite-camp scene, and the
default violence-intensity for Milestone 3 Gilboa. Neither scene is built
yet, so these can be genuinely upfront design decisions rather than
after-the-fact review — use `.claude/agents/world-director.md`'s brief
format if you want to fully scope either scene while you're at it (optional,
not required for this session).

## Exit criteria for this session

Not all items need to be resolved in one sitting (see the checkpoint rule).
Whatever you do finish should leave:

- `docs/fable-review-queue.md`'s Resolved section reflecting real outcomes.
- Any new ADRs committed.
- `docs/next-run.md` updated with whatever's left, so Sonnet can pick up
  either the remaining queue items or start implementing against whatever
  you did decide (e.g., building the Milestone 2 Besor scene against a newly
  generalized terrain config).
