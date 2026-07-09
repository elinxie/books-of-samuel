# Fable review checklist

Use this when Fable reviews a completed milestone, a new major scene's design, or
an item pulled from `docs/fable-review-queue.md`. One pass per milestone/batch, not
per commit.

## Historical plausibility

- [ ] Every rendered element traces to a claim with a real `basis` (no
      uncredited assumptions).
- [ ] `biblical-text` claims are phrased as narrated content, not asserted fact.
- [ ] Disputed questions expose competing `scholarlyViews` rather than a single
      silently-chosen answer.
- [ ] Confidence levels look right on a second read — nothing marked `high` that's
      actually a design choice, nothing marked `speculative` that's actually
      well-evidenced.

## Anachronism check

- [ ] Clothing, weapons/armor, architecture, roads, crops, animal use, city scale,
      fortifications, religious objects, labels, and political-geography claims are
      each period-appropriate or explicitly flagged `design-placeholder`.

## Visual coherence

- [ ] The scene reads clearly at each quality mode (study/balanced/high).
- [ ] Labels, camera viewpoints, and the timeline agree with the intended beats.
- [ ] Placeholder assets are visually legible as placeholders where that matters
      (or at least not asserting false precision).

## Performance risk

- [ ] Instance counts and shader cost fit the quality-mode budget
      (`docs/architecture-decisions/adr-004-quality-modes.md`).
- [ ] Bundle size / lazy-loading still reasonable (`docs/architecture.md`).

## Test coverage

- [ ] New data has integrity coverage; new interactive UI has e2e coverage.
- [ ] `npm run verify` is green (or failures are documented and understood).

## Source traceability

- [ ] Every new claim cites a real source card; new sources have honest
      `copyrightStatus`/`allowedUseNotes`.
- [ ] Attribution hedges ("e.g., ...") are used where citations aren't page-verified.

## Affordances serve the atlas (ADR-011)

- [ ] Nothing added drifts toward fantasy systems, loot grind, power-fantasy
      leveling, win/loss states that distort the biblical/historical material,
      or player-driven combat mechanics (battle stays scripted reenactment,
      ADR-009).
- [ ] Every game-like affordance demonstrably deepens exploration, orientation,
      learning, embodied understanding, or scene comprehension — and never
      rewards or requires asserting something the sources don't support.
- [ ] The user can still ignore any affordance, pause, replay, inspect, and
      toggle layers off to "simply inhabit the scene."

## Output of a review

Record the outcome in `docs/run-log.md` (what was reviewed, verdict, any follow-ups)
and clear resolved items from `docs/fable-review-queue.md`. If the milestone passes,
update its `status` to `released` in `src/data/milestones.ts` and
`src/data/features.ts`/`scenes.ts` as appropriate.
