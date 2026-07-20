# ADR-013: Political/administrative geography is atlas-tier by default

**Status:** accepted (2026-07-20, Fable, M4 scoping pass)

## Context

M4 (2 Samuel 1–2) is the first milestone whose passage material includes
pure political geography: 2 Samuel 2:8–11 names Mahanaim as Ish-bosheth's
seat and lists the territories claimed for him (Gilead, the Ashurites,
Jezreel, Ephraim, Benjamin, "all Israel") against David's Judah, with reign
lengths — but narrates no scene-able event there. Nothing in the text puts
an observer anywhere at Mahanaim watching anything happen. Building a 3D
scene for it would force us to invent an event (a coronation ceremony, a
court in session) that the text does not describe, at a site whose
identification is itself disputed. This pattern recurs throughout Samuel:
territorial lists, administrative summaries, officer rosters (2 Sam 3:10;
5:4–5; 8:15–18; 20:23–26; the ch. 24 census route).

## Decision

> Political/administrative-geography material with no narrated,
> place-anchored event gets **atlas-tier treatment by default**: a
> `LocationEntry` (map marker + location page, with `SiteIdentification`
> views and claims as usual) and/or a map/study-page feature under
> ADR-011's allow-list ("map/route progression", "non-combat learning
> interactions") — **not** a 3D scene. A 3D scene requires a narrated event
> that puts bodies in a place at a time.

Corollaries:

- A location may legitimately exist with `sceneIds: []` indefinitely. That
  is not an unfinished state; it is the correct tier for a site the text
  names but never stages (Mahanaim in M4 is the first deliberate case —
  Gath was already de facto this).
- Map/study features carrying political geography follow the same
  claim/source discipline as scenes: territorial extents get
  `ReconstructionClaim`s with real `basis`/`confidence`, disputed readings
  (e.g. 2 Sam 2:9's "Ashurites" — Asherites? Geshurites?) get
  `scholarlyViews`, and boundary lines are drawn with confidence shading,
  never hard certain borders. `f-overview-map`'s existing "confidence
  shading" framing is the standard.
- Escalation path: if a future milestone wants to _stage_ an un-narrated
  political setting as a 3D scene anyway (e.g. an ambient "Mahanaim under
  Ish-bosheth" walk-through with no event), that is a scope call for a
  Fable pass, logged in `docs/fable-review-queue.md` first — same gate as
  any ADR-011 disallowed-list item.

## Alternatives considered

- **Full 3D scene at Mahanaim for M4.** Rejected: requires inventing an
  un-narrated event (violates the reconstruction method's
  narrated-vs-corroborated discipline), at a low-confidence site, and
  spends a whole scene budget on material a map communicates better.
- **Fold 2:8–11 into a Hebron-scene beat only.** Rejected as the sole
  treatment: a caption in Hebron can reference the rival kingship, but the
  territorial/two-kingdoms picture is spatial content — exactly what an
  atlas-first project should render as a map, not prose.
- **Decide per-case with no default.** Rejected: this shape recurs enough
  in Samuel that re-litigating it each milestone wastes Fable budget.

## Consequences

- M4's "early divided-kingdom context view" goal is satisfied by the
  regional overview map feature (`f-overview-map`, re-scoped M3 → M4),
  extended with the 2 Sam 2:8–11 two-kingdoms layer, plus a `mahanaim`
  `LocationEntry` — no Mahanaim scene.
- Building such map features is Sonnet-tier work (data + UI within this
  policy); the claims behind the boundaries follow the ordinary claim
  checklist, with genuinely contested boundary judgments batched to the
  review queue as usual.
