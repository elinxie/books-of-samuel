# ADR-012: DEM terrain-data sourcing and provenance

**Status:** Accepted (2026-07-16, Fable, M3 sign-off session — resolves
`fable-review-queue.md` #12). Sets policy only; no elevation data enters the
repo with this ADR. First intended consumer: a Beth-shan (Tel Beth-Shean)
terrain refinement, then Gilboa (see each scene brief's DEM note).

## Context

Gilboa was the project's first identified (non-composite) battlefield, making
real elevation data newly relevant; Beth-shan is now a second identified site.
Introducing a digital elevation model is a data-provenance decision — license,
attribution, vertical datum, resampling — that must be fixed before any
elevation data lands, or every DEM-derived terrain inherits an unsourced basis.
Both M3 identified-site scenes shipped with procedural ADR-005 terrain
(relative topography honest, microrelief a disclosed `design-placeholder`), so
nothing here is retroactive.

## Decision

1. **Approved default source: NASA/USGS SRTM 1 Arc-Second Global (SRTMGL1,
   ~30 m).** Public-domain US-government data — no license constraint, no
   attribution requirement (courtesy attribution given anyway). **Permitted
   alternative:** Copernicus GLO-30, free with mandatory attribution
   ("© DLR e.V. 2010–2014 and © Airbus DS 2014–2015, provided under COPERNICUS
   by the European Union and ESA") — use only if SRTM quality is insufficient
   for a specific site, and carry the attribution in the source card and the
   asset's provenance notes. ASTER GDEM is **not** approved (heavier artifact
   profile, redundant given the above).
2. **A DEM is a source, so it gets a source card** in
   `sources/source-cards/` before any derived data is committed: dataset name
   and version/tile ids, retrieval date, distributor (e.g. USGS EarthExplorer /
   OpenTopography), `copyrightStatus`/`allowedUseNotes` per the dataset's
   actual terms.
3. **Processing must be disclosed on the derived asset** (`src/data/assets.ts`
   provenance fields, pre-authorized by ADR-008): horizontal datum (WGS84),
   vertical datum (EGM96 geoid for SRTM), tile/crop extent, resampling method
   and target resolution, any vertical exaggeration (state the factor; 1.0
   preferred), and any hole-filling/smoothing.
4. **A DEM depicts the modern surface.** Every DEM-derived terrain claim must
   note that modern topography (terracing, roads, reservoirs, quarrying,
   tell-summit excavation) is not the Iron Age surface — the DEM upgrades
   macro-topography honesty, it does not make the ground "period-verified."
   Basis for such claims stays what the claim actually asserts (typically the
   site's real topographic form, cited to the DEM source card), with the
   modern-surface caveat in `notes`.
5. **Storage/derivation stays lightweight:** commit only the small derived
   heightfield the scene consumes (e.g. a cropped, downsampled grid feeding
   ADR-005's `TerrainSpec`/`createTerrain` path), never raw tiles. Raw-tile
   processing happens outside the repo; the source card records how.

## Alternatives considered

- **Defer the policy until DEM work actually starts:** rejected — the queue
  item exists precisely because provenance policy must precede data, and the
  decision is cheap to make now and expensive to retrofit.
- **Copernicus GLO-30 as default:** better absolute accuracy in places, but
  its attribution obligation propagates into every derived artifact;
  public-domain SRTM keeps the provenance chain simplest, and 30 m is adequate
  at scene scale.
- **High-resolution commercial/national LiDAR:** rejected — licensing burden
  and false-precision risk (sub-meter modern microrelief asserts exactly what
  the anachronism discipline avoids).

## Consequences

- Queue #12 closes. DEM work is unblocked whenever a Sonnet session picks up
  the Beth-shan or Gilboa refinement (`f-dem-terrain`, milestone M3-tagged but
  not gating M3 sign-off — it is a refinement, not a scene requirement).
- The first DEM slice must land as: source card → derived heightfield +
  provenance-complete asset record → claim-note updates → scene wiring, in
  that order, and is ordinary Sonnet work once this policy is followed.
