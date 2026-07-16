# ADR-009: Violence depiction — standard mode is the default, behind a first-visit advisory

**Status:** Accepted (2026-07-07, Fable review — resolves `fable-review-queue.md` #6).
Applies to every scene depicting death or battle violence: Mount Gilboa and the
Beth-shan aftermath (Milestone 3) first, then the 2 Samuel war narratives.
The first-visit advisory (`src/ui/ViolenceAdvisory.tsx`, `SceneDef.depictsDeath`)
landed 2026-07-14 and is wired into `gilboa-battle`; `beth-shan-walls` and
`jabesh-burial` opt in via `depictsDeath`. The funerary-burning extension below
was ratified into this ADR at the M3 sign-off (2026-07-16, Fable — resolves the
policy half of `fable-review-queue.md` #17).

## Context

The project's standing policy is "violence shown honestly, never gratuitously,
with a reduced-intensity mode available." What was undecided is which mode a
first-time viewer gets. 1 Samuel 31 contains Saul's suicide, the deaths of his
sons, and the display of their bodies on Beth-shan's wall — heavy content, and
an explorable 3D battlefield is more visceral than the same events in text.

## Decision

### Two modes, one choreography

- `violenceMode: 'standard' | 'reduced'` — a persisted setting alongside the
  quality mode.
- Both modes run the **same pose-function timeline** (ADR-007). Violence mode is
  a _rendering_ treatment, never a second choreography — divergent timelines
  would double the test surface and let the two modes drift into telling
  different stories.
- **Reduction abstracts depiction, never facts.** Beat descriptions, labels, and
  study text state plainly what happened in both modes. Reduced mode may soften
  what is drawn; it may not soften what is said.

### What each mode means

**Standard (honest, restrained by design):**

- Deaths are depicted with gravity at documentary distance — no gore geometry,
  no lingering or close-up framing, no slow motion, nothing trophy-like.
- No dismemberment is ever rendered in any mode. Saul's beheading (31:9) falls
  in the narrative's own gap ("on the next day…") and is conveyed as
  aftermath-discovery, matching the text's own camera.
- The Beth-shan body display (31:10–12) renders as still, distant silhouette
  forms on the wall — identifiable, undetailed.
- At current figure fidelity nothing more is possible anyway; when modeled
  figures land (M3), at most minimal static dark staining — no spurts, pools,
  or wound modeling.

**Reduced:**

- No blood indication at all; no projectiles shown lodged in bodies.
- The dying lower to the ground and become still (no writhing); camera beats
  keep wider distance.
- Saul's suicide moment is not geometrically depicted — before and aftermath
  render; the beat card states the event.
- Beth-shan: the wall location renders without body forms; the text card
  carries the fact.

### Funerary handling of the dead (ratified at M3 sign-off, 2026-07-16)

This ADR's principles extend beyond battle deaths and the wall display to any
depiction of handling, burning, or burying the dead (first case: the Jabesh
pyre, 1 Samuel 31:12b–13):

- **Covered before flame, unconditionally.** In _both_ modes, wrapped remains
  are laid and fully covered (by pyre timber or equivalent) before any flame
  renders. No burning human silhouette and no charring detail is ever rendered,
  in any mode — the same absolute bar as dismemberment.
- Remains render only as wrapped, anatomically unresolved forms (the
  `buildWrappedFormGeometry` treatment); skeletal or bone geometry is never
  rendered in any mode. Bone-gathering reads as a cloth-wrapped bundle.
- Standard shows the covered pyre lit and burning at documentary distance;
  reduced holds a wider frame and cuts from lighting to embers (intensity
  capped at ember level, no full blaze).
- As everywhere in this ADR, reduction abstracts depiction, never facts:
  anomalies the text records (cremation against normal practice, the
  1 Chronicles 10:12 omission) are stated identically in both modes' captions.

Scenes that depict handling of the dead set `depictsDeath` and get the
first-visit advisory even when no violence occurs on-screen.

### Default and consent

- **Standard is the default.** The advisory (below) is the consent mechanism.
- **Why not reduced-as-default:** the default is what most users ever see. Making
  the abstracted version canonical would (a) misrepresent the text's own
  unflinching brevity, (b) hide the honest treatment behind a setting most
  users never open, and (c) drift the project toward the sanitized-illustration
  genre it explicitly defines itself against. The full mode is already
  constrained to non-sensational content — the standard is honest, not graphic.
- **First-visit advisory:** before a scene flagged as depicting death first
  renders, a plain, factual pre-scene notice appears with two equally prominent
  choices: continue in standard mode, or switch to reduced mode. The choice
  persists (settings-changeable any time); the advisory does not reappear once
  answered. Advisory copy is descriptive, not lurid, and notes that reduced
  mode changes depiction only, not the recorded events.
- `SceneDef` gains a content flag at M3 build time so the advisory triggers per
  scene data, not hardcoded scene ids.

## Alternatives considered

- **Reduced as default with opt-in to standard:** rejected for the reasons
  above — it inverts the project's honesty commitment at the point of first
  contact.
- **No advisory (standard, cold):** rejected — an explorable battlefield
  warrants informed consent, especially for classroom and younger viewers.
- **Age gate / hard lock:** rejected — this is a study tool, not a rated
  product; a gate would be both over- and under-inclusive, and unverifiable
  anyway.

## Consequences

- Sonnet can build Gilboa's beats knowing exactly what each mode renders; the
  mode is a rendering-path fork inside components, testable by asserting which
  visual elements mount per mode.
- The advisory is a small reusable UI piece (M3), driven by scene data.
- `docs/reconstruction-method.md`'s violence-policy section now records the
  decided default and points here; uncertainty register #9 is closed as decided.
