# Character system design

The character system supplies realistic-enough, project-original human figures for
the Books of Samuel visualizer.

## Goals

- Human silhouettes with articulated shoulders, elbows, knees, feet, heads, and hands.
- Period-dressed figures: knee-length tunic, belt, optional mantle, sandals, head wrap,
  hair, and beard hints.
- No portraiture: named figures remain identified by labels and dress colors.
- Web budgets: principal figures may use denser geometry; crowds use lower detail and
  can be rendered from baked pose buckets.

## Skeleton contract

The public bone list is `hips`, `spine`, `chest`, `neck`, `head`, left and right arm
chains, and left and right leg chains. Animations and future glTF replacements must
preserve those names.

## Animation clips

The initial clips are `walk`, `idle`, `kneel`, and `mourn`. They are procedural and
intended to be sampled for crowd pose buckets as well as played on principal rigs.
