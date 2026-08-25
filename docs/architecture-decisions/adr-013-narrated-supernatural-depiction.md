# ADR-013: Narrated divine/supernatural events — stated, never visualized

**Status:** Accepted (2026-08-25, Sonnet review-tier decision — resolves
`fable-review-queue.md` #24). First case: 2 Samuel 5:24's sign in the tops of
the balsam trees (`rephaim-valley`, M6). Applies to every future scene that
narrates a divine or supernatural event with no described physical mechanism
the project could render without inventing one.

## Context

2 Samuel 5:24 is the project's first case of a narrated divine sign sitting
inside a scene rather than inside a card: "when you hear the sound of
marching in the tops of the balsam trees, then rouse yourself." The
`rephaim-valley` brief (2026-08-23) set a default for it — stated by caption
and by a held, motionless wait, with no wind, light, canopy motion, audio
cue, or camera language standing in for the sign — and flagged the call for
a dedicated ratification pass, since the same problem recurs constantly from
2 Samuel 6 onward: the ark's effects at Beth-shemesh and on Uzzah (2 Sam 6),
the Nathan oracle (2 Sam 7), the plague and its stopping at Araunah's
threshing floor (2 Sam 24), and more beyond Samuel. Deciding it once, as a
named policy, is cheaper than re-litigating it scene by scene and risks less
drift than leaving each brief to invent its own answer.

This is not a new principle so much as the existing anachronism discipline
(`CLAUDE.md`: "when period evidence is thin, omit or label
`design-placeholder` rather than invent") applied to a different kind of
missing evidence. For physical culture, the gap is archaeological. Here, the
gap is observational: no camera, however placed, could have recorded a
divine act, so any visual effect claiming to render one — a wind burst, a
glow, marching silhouettes in a canopy, a voice's source made visible —
would assert as observed fact something the project has no basis to observe.
That is a stronger claim than a design-placeholder building or garment; it
would present invention _as the divine act itself_, not as a disclosed
approximation of something that did physically exist.

## Decision

**A narrated divine or supernatural event is always stated, never
visualized**, wherever the text describes an effect without a physical
mechanism the scene could render honestly:

- No visual effect stands in for the event — no light, wind, glow, or
  particle effect; no environmental animation (canopy motion, water,
  fire behavior, weather) timed, intensified, or framed to read as a
  signal; no audio cue presented as the event itself, only as its
  narrated description; no camera language (a push-in, a hold, a
  reveal) implying a presence or an unseen actor.
- **The event is carried by caption and by stillness or the ordinary
  behavior of the scene around it** — the `rephaim-valley` `b-sound` beat's
  held wait among unremarkable trees is the template: nothing added, nothing
  withheld from what would already be there.
- A disclosed `design-placeholder` claim states the policy on-screen for
  each instance (first case: `claim-divine-sign-depiction`), so the
  restraint itself is legible to the viewer, not just enforced silently in
  code.
- **This governs the mechanism, not the narrated outcome.** Where the text
  also states a physical, worldly consequence — a death, a plague's toll, an
  object's failure — that consequence may be depicted as an outcome or
  aftermath under the project's existing rules for exactly that kind of
  content (ADR-009's distance-and-restraint template for a death, the
  anachronism/`design-placeholder` discipline for anything else). What may
  never be rendered is the supernatural _causation_ itself — the light, the
  voice, the visible hand — only its stated claim and its worldly result.
  (2 Samuel 6:7, Uzzah's death "because he put out his hand to the ark," is
  the clearest future test of this line: the death is depictable per
  ADR-009; the divine strike that the text says caused it is not.)
- This is a default, not an unreversible lock. A future scene may find a
  narrated event genuinely ambiguous about whether it describes a
  supernatural act or an ordinary one read as providential in hindsight
  (armies interpreting a natural occurrence as a sign, for instance) — that
  is a `scholarlyViews`-eligible textual question for that scene's own
  brief, not a reason to relax this ADR's rendering bar once the text is
  read as describing the supernatural.

## Alternatives considered

- **Render a restrained, ambiguous effect** (a distant sound cue, a subtle
  environmental shift) that a viewer could read either as staging or as
  coincidence: rejected. "Restrained" does not change what the effect
  _asserts_; a subtle glow is still a glow, and the ambiguity would be
  legible to the project's own reasoning, not necessarily to a viewer, who
  would reasonably read any staged effect as the project's answer to an
  unanswerable question.
- **Depict nothing at all, drop the caption too**: rejected — the text's
  claim is part of what the passage says and belongs on screen like any
  other narrated content; omitting it would misrepresent the source, the
  opposite error from inventing it.
- **Decide case by case, per scene brief, with no cross-scene policy**:
  rejected — the whole reason this is escalated is that it recurs constantly
  from 2 Samuel 6 onward; leaving it to each brief risks a different, harder
  line in one scene and a softer one in the next with no principled reason
  for the difference.

## Consequences

- `rephaim-valley`'s `claim-divine-sign-depiction` is the reference
  implementation; its notes now point here instead of carrying the
  ratification question itself.
- Every future brief touching a narrated divine/supernatural event (2 Sam 6
  onward) inherits this default without needing to re-derive it — the brief
  states which beat it applies to and adds a scene-specific
  `design-placeholder` claim, per the template above, rather than reopening
  the policy.
- `docs/fable-review-queue.md` #24 closes to Resolved, pointing here.
