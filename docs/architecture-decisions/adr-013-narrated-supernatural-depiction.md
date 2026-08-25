# ADR-013: Depiction policy for narrated supernatural/divine signs

**Status:** Accepted (2026-08-25, Sonnet — resolves `fable-review-queue.md`
#24). Ratifies the default the `rephaim-valley` brief set for 2 Samuel 5:24
as standing project policy, not a per-scene claim. Fable is not used on this
project (`CLAUDE.md`'s "Model policy — do not invoke Fable," 2026-08-24);
this decision was made directly by Sonnet under that policy, per
`docs/model-handoff.md`.

## Context

2 Samuel 5:24 (the sound of marching in the tops of the balsam trees, a sign
David is told to wait for and then act on) is the first time a narrated
divine/supernatural sign sits inside a staged scene rather than inside a
context card. `rephaim-valley`'s brief set a default — state it, never
visualize it — and `fable-review-queue.md` flagged it for a dedicated
ratification pass rather than treating it as settled, because the same
situation recurs constantly from here on: the ark narratives (2 Samuel 6,
including Uzzah's death), the dynastic oracle (2 Samuel 7), the plague and
its staying (2 Samuel 24), and beyond into Kings. A per-scene claim would
re-litigate the same question every time it comes up; a standing ADR settles
it once, the same way ADR-009 settled violence depiction and ADR-003 settled
ESV quotation.

## Decision

**Narrated supernatural/divine signs, effects, or interventions are stated in
caption/dialogue and never rendered as an observed visual or audio effect —
in any quality mode, in any scene, without exception**, unless a future ADR
revises this policy explicitly.

Concretely, this bars:

- Any environmental effect staged as caused by or signaling the divine (wind
  bursts, unnatural light, timed/intensified motion in foliage, water,
  fire, or weather, camera language implying an unseen presence).
- Any visualized appearance, voice-effect, or theophany.
- Any staging choice (lighting arc, camera move, sound design) that reads as
  confirming the sign to the observer beyond what the text's own words
  state — a held, ordinary wait is the correct staging; a dramatized one is
  not, even without an explicit special effect, because dramatization itself
  asserts a confirmed perception.

This is not a claim about whether such things occurred — the project takes
no editorial position either way, matching its standing discipline for every
other narrated-not-corroborated claim. It is a claim about what the project
can honestly render: there is no observational basis (textual, archaeological,
or comparative) for the sensory specifics of a divine sign, so rendering one
would manufacture the missing specificity and move the project toward the
sanitized-illustration genre `docs/reconstruction-method.md` and ADR-011
already reject it becoming. This is the same reasoning ADR-009 already
applies to unnarrated violence detail (no invented strike method, no
invented wound) — extended here from "the text doesn't say how" to "the
text doesn't say how it would have looked or sounded."

**Implementation pattern** (see `rephaim-valley`'s `b-sound` beat and
`claim-divine-sign-depiction` in `src/data/claims.ts` for the working
example): no new animation/effect system is built for the beat at all — the
absence of a mechanism is the mechanism. Where a scene already has ambient
motion systems (foliage sway, water, fire) that predate the sign beat, they
must not be altered, paused, or amplified in sync with it; where a scene has
no such systems, none should be added for this purpose. Lighting must not
carry a dedicated arc timed to the sign unless the scene already has one
for unrelated reasons (e.g. a text-fixed time-of-day cue elsewhere in the
same scene).

## Alternatives considered

- **Render a restrained, ambiguous effect** (e.g. a light foliage rustle,
  timed but not obviously supernatural): rejected — "restrained" does not
  solve the underlying problem, since any staged correlation between the
  effect and the narrative beat asserts the connection as observed, and a
  deliberately ambiguous effect just hides the assertion rather than
  removing it.
- **Leave this as a per-scene claim, decided fresh each time**: rejected —
  the queue item itself predicted this recurs constantly; re-deciding it at
  every future scene (Uzzah's death, the ark's arrival, the dynastic oracle,
  the plague) risks inconsistent rulings across scenes an observer will
  reasonably expect to be treated the same way, and spends review attention
  on a question this ADR can close permanently.
- **A confidence/basis-driven middle ground** (visualize signs with strong
  comparative-ANE attestation, withhold ones without): rejected — attestation
  that a described phenomenon type existed in the ANE imagination is not the
  same as attestation of what any specific narrated instance looked or
  sounded like; the gap this ADR is about is the latter, and no citation
  closes it.

## Consequences

- Queue #24 closes. `claim-divine-sign-depiction`'s `notes` should reference
  this ADR going forward rather than carrying the full reasoning inline;
  not itself required to unblock `released` (see the M6 release note in
  `docs/fable-review-queue.md`).
- Binding on every future scene depicting a narrated supernatural sign or
  intervention, not just `rephaim-valley` — flag this ADR explicitly in any
  future scene brief that touches one (2 Samuel 6 onward is the immediate
  horizon).
- Does not change how the project already handles the ephod/Urim-and-Thummim
  inquiry mechanism question (`claim-inquiry-depiction`, a no-invented-
  apparatus rule already in force) — that claim's reasoning is a sibling of
  this one, not superseded by it; both stay in force independently.
