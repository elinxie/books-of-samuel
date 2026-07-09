# ADR-011: Atlas-first world with constrained game-like affordances

**Status:** accepted (2026-07-09, user-directed policy change, Fable session)
**Supersedes:** the blanket "not a game" scope boundary previously stated in
`CLAUDE.md`, `AGENTS.md`, `README.md`, `docs/model-handoff.md` ("Fixed for
now"), `docs/fable-review-checklist.md`, and `docs/visual-fidelity-roadmap.md`.

## Context

The project launched under a hard "not a game" rule: no combat mechanics,
inventory, leveling, quests, or win/loss states. That rule did two jobs at
once — it protected historical seriousness, and it banned a whole interaction
vocabulary. As scenes grew (scripted reenactments, teleport viewpoints, route
progression, guided study flow), the second job started fighting the first:
some plainly game-like affordances _are_ the best tools for exploration,
orientation, and learning in a 3D world. The user has directed that the ban be
narrowed to what it was actually protecting.

## Decision

> Books of Samuel is an **atlas-first historical world**. It may include
> game-like affordances when they deepen exploration, orientation, learning,
> embodied understanding, or scene comprehension. These affordances must not
> override historical traceability, biblical/textual integrity, scholarly
> uncertainty, atlas usability, or the project's source/claim discipline.

### Explicitly allowed (no per-feature Fable approval needed)

First-person navigation; guided paths; interactable labels; optional study
objectives; map/route progression; NPC presence; scripted reenactments;
replayable scenes; environmental discovery; non-combat learning interactions;
light progression that helps orientation or learning.

### Disallowed unless separately approved (Fable review + queue entry first)

Fantasy systems; loot grind; leveling as power fantasy; win/loss states that
distort the biblical/historical material; unsourced invented certainty.
Combat _mechanics_ (player-driven fighting) are not on the allowed list —
battle remains scripted reenactment under ADR-009 unless separately approved.

### Preserved unchanged (these outrank any affordance)

- Every rendered element needs a `ReconstructionClaim` or an explicit
  placeholder entry in `src/data/assets.ts`.
- Disputed historical questions use `scholarlyViews` or provisional notes —
  never a silently chosen answer, and never a gameplay-convenient one.
- Anachronism discipline: omit or label `design-placeholder`, don't invent.
- Theological commentary stays separated and off by default until implemented
  under its own policy.
- No proprietary game assets, trademarks, mechanics, maps, names, or UI
  patterns copied from any commercial game or franchise.

### Decision test for new affordances

Before building a game-like affordance, answer: (1) which of exploration /
orientation / learning / embodied understanding / scene comprehension does it
deepen? (2) can the user still ignore it and simply inhabit the scene as an
atlas? (3) does it ever reward or require asserting something the sources
don't support? A "no" on (2) or a "yes" on (3) means redesign or escalate to
the Fable review queue.

## Consequences

- `docs/fable-review-checklist.md` §"Serves observation, not gameplay" becomes
  "Affordances serve the atlas" with the test above.
- Public copy still saying "not a game" (`README.md` updated here;
  `src/pages/LandingPage.tsx`, `src/ui/SiteChrome.tsx`,
  `src/pages/FeaturesPage.tsx` queued as a small `ui-engineer` follow-up in
  `docs/next-run.md`) must be reworded to "atlas-first" framing.
- Existing hard constraints (ESV budget, claim/basis discipline, violence
  policy ADR-009) are untouched.
