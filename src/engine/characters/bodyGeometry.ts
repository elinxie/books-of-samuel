import * as THREE from 'three';
import { P, SANDAL_COLOR } from './anthropometry';
import { buildSkeleton, type BuiltSkeleton } from './skeleton';
import type { BoneName, CharacterParams, CharacterRig } from './types';

/**
 * Procedural skinned human body + period dress (knee-length tunic, belt,
 * optional over-mantle, sandals, wrapped or bare head, beard). Everything is
 * ring-loop surface construction with per-vertex colors and bone weights —
 * no textures, project-original geometry (ADR-008 / ADR-009).
 *
 * Design and quality bar: docs/design/character-system.md.
 */

type SkinRef = Array<[BoneName, number]>;

interface Ring {
  /** Ring center in character space. */
  c: THREE.Vector3;
  /** Radii along the ring's local "right" (u) and "forward" (v) axes. */
  rx: number;
  rz: number;
  color: THREE.Color;
  skin: SkinRef;
  /** Superellipse exponent; 2 = ellipse, higher = squarer section. */
  shape?: number;
  /** Radius multiplier by angle (cloth folds, brow ridge, beard mass). */
  radialFn?: (theta: number) => number;
  /** Color override by angle (hair, beard, sandal straps, eye shadow). */
  colorFn?: (theta: number, base: THREE.Color) => THREE.Color;
  /** Per-vertex skin override (tunic skirt splitting across the legs). */
  skinFn?: (theta: number, pos: THREE.Vector3) => SkinRef;
}

interface TubeOptions {
  radial: number;
  capStart?: boolean;
  capEnd?: boolean;
  /** Arc range [start, end] in radians; omit for a full closed loop. */
  arc?: [number, number];
  /** Defines the ring "forward" (v) axis; default +Z. */
  up?: THREE.Vector3;
}

const UP_Z = new THREE.Vector3(0, 0, 1);

class MeshBuilder {
  positions: number[] = [];
  colors: number[] = [];
  skinIndices: number[] = [];
  skinWeights: number[] = [];
  indices: number[] = [];
  constructor(private boneIndex: Record<BoneName, number>) {}

  private pushVertex(pos: THREE.Vector3, color: THREE.Color, skin: SkinRef): number {
    const i = this.positions.length / 3;
    this.positions.push(pos.x, pos.y, pos.z);
    this.colors.push(color.r, color.g, color.b);
    let total = 0;
    for (const [, w] of skin) total += w;
    for (let s = 0; s < 4; s++) {
      const entry = skin[s];
      this.skinIndices.push(entry ? this.boneIndex[entry[0]] : 0);
      this.skinWeights.push(entry && total > 0 ? entry[1] / total : 0);
    }
    return i;
  }

  /** Adds a surface of stacked rings; returns nothing (self-contained part). */
  addTube(rings: Ring[], opts: TubeOptions): void {
    const { radial } = opts;
    const closed = !opts.arc;
    const arcStart = opts.arc ? opts.arc[0] : 0;
    const arcLen = opts.arc ? opts.arc[1] - opts.arc[0] : Math.PI * 2;
    const cols = closed ? radial : radial + 1;
    const up = opts.up ?? UP_Z;

    const axis = new THREE.Vector3();
    const u = new THREE.Vector3();
    const v = new THREE.Vector3();
    const pos = new THREE.Vector3();
    const ringStarts: number[] = [];

    for (let r = 0; r < rings.length; r++) {
      const ring = rings[r];
      // Tube direction from neighboring ring centers.
      const prev = rings[Math.max(0, r - 1)].c;
      const next = rings[Math.min(rings.length - 1, r + 1)].c;
      axis.subVectors(next, prev);
      if (axis.lengthSq() < 1e-10) axis.set(0, 1, 0);
      axis.normalize();
      v.copy(up).addScaledVector(axis, -up.dot(axis));
      if (v.lengthSq() < 1e-6) v.set(0, 0, 1).addScaledVector(axis, -axis.z);
      v.normalize();
      u.crossVectors(axis, v);

      const shape = ring.shape ?? 2;
      const exp = 2 / shape;
      ringStarts.push(this.positions.length / 3);
      for (let s = 0; s < cols; s++) {
        const theta = arcStart + (s / (closed ? radial : radial)) * arcLen;
        const ct = Math.cos(theta);
        const st = Math.sin(theta);
        const cu = Math.sign(ct) * Math.abs(ct) ** exp;
        const sv = Math.sign(st) * Math.abs(st) ** exp;
        const rf = ring.radialFn ? ring.radialFn(theta) : 1;
        pos
          .copy(ring.c)
          .addScaledVector(u, cu * ring.rx * rf)
          .addScaledVector(v, sv * ring.rz * rf);
        const color = ring.colorFn ? ring.colorFn(theta, ring.color) : ring.color;
        const skin = ring.skinFn ? ring.skinFn(theta, pos) : ring.skin;
        this.pushVertex(pos, color, skin);
      }
    }

    for (let r = 0; r < rings.length - 1; r++) {
      const a = ringStarts[r];
      const b = ringStarts[r + 1];
      for (let s = 0; s < (closed ? radial : radial); s++) {
        const s2 = closed ? (s + 1) % radial : s + 1;
        this.indices.push(a + s, b + s, b + s2);
        this.indices.push(a + s, b + s2, a + s2);
      }
    }

    if (opts.capStart) this.addCap(rings[0], ringStarts[0], cols, closed, true);
    if (opts.capEnd)
      this.addCap(rings[rings.length - 1], ringStarts[rings.length - 1], cols, closed, false);
  }

  private addCap(ring: Ring, start: number, cols: number, closed: boolean, flip: boolean): void {
    const center = this.pushVertex(ring.c, ring.color, ring.skin);
    const n = closed ? cols : cols - 1;
    for (let s = 0; s < n; s++) {
      const s2 = closed ? (s + 1) % cols : s + 1;
      if (flip) this.indices.push(center, start + s, start + s2);
      else this.indices.push(center, start + s2, start + s);
    }
  }

  build(): THREE.BufferGeometry {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(this.skinIndices, 4));
    geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(this.skinWeights, 4));
    geo.setIndex(this.indices);
    geo.computeVertexNormals();
    return geo;
  }
}

/** Doubles ring resolution by inserting interpolated rings (principal LOD). */
function subdivide(rings: Ring[]): Ring[] {
  const out: Ring[] = [];
  for (let i = 0; i < rings.length - 1; i++) {
    const a = rings[i];
    const b = rings[i + 1];
    out.push(a);
    out.push({
      c: a.c.clone().lerp(b.c, 0.5),
      rx: (a.rx + b.rx) / 2,
      rz: (a.rz + b.rz) / 2,
      color: a.color.clone().lerp(b.color, 0.5),
      skin: mergeSkin(a.skin, b.skin),
      shape: a.shape ?? b.shape,
      radialFn: a.radialFn ?? b.radialFn,
      colorFn: a.colorFn && b.colorFn ? a.colorFn : undefined,
      skinFn: a.skinFn && b.skinFn ? a.skinFn : undefined,
    });
  }
  out.push(rings[rings.length - 1]);
  return out;
}

function mergeSkin(a: SkinRef, b: SkinRef): SkinRef {
  const map = new Map<BoneName, number>();
  for (const [bone, w] of a) map.set(bone, (map.get(bone) ?? 0) + w / 2);
  for (const [bone, w] of b) map.set(bone, (map.get(bone) ?? 0) + w / 2);
  return [...map.entries()].sort((x, y) => y[1] - x[1]).slice(0, 4);
}

function angDist(a: number, b: number): number {
  const d = Math.abs(THREE.MathUtils.euclideanModulo(a - b + Math.PI, Math.PI * 2) - Math.PI);
  return d;
}

/** theta of the ring's forward (+v) direction. */
const FRONT = Math.PI / 2;
const BACK = -Math.PI / 2;

export function buildBodyGeometry(
  params: CharacterParams,
  skel: BuiltSkeleton,
): THREE.BufferGeometry {
  const H = params.stature;
  const b = 0.85 + params.build * 0.3; // girth scale
  const s = params.shoulders;
  const principal = params.detail === 'principal';
  const radialLimb = principal ? 20 : 10;
  const radialTorso = principal ? 28 : 14;
  const radialHead = principal ? 32 : 16;
  const J = skel.joints;

  const skin = new THREE.Color(params.skinColor);
  const skinShade = skin.clone().multiplyScalar(0.62);
  const hair = new THREE.Color(params.hairColor);
  const tunic = new THREE.Color(params.dress.tunicColor);
  const belt = new THREE.Color(params.dress.beltColor);
  const sandal = new THREE.Color(SANDAL_COLOR);
  const wrap = new THREE.Color(params.dress.headwrapColor ?? params.dress.tunicColor);

  const builder = new MeshBuilder(skel.index);
  const prep = (rings: Ring[]) => (principal ? subdivide(rings) : rings);

  // ---- Legs + feet -------------------------------------------------------
  for (const side of [1, -1] as const) {
    const thigh: BoneName = side > 0 ? 'thighL' : 'thighR';
    const shin: BoneName = side > 0 ? 'shinL' : 'shinR';
    const foot: BoneName = side > 0 ? 'footL' : 'footR';
    const hipX = J[thigh].x;
    const ankleX = J[foot].x;
    const legX = (t: number) => hipX + (ankleX - hipX) * (1 - t); // t: 0 ankle → 1 hip

    const leg = (y: number, r: number, sk: SkinRef, rz = r): Ring => ({
      c: new THREE.Vector3(legX((y - P.ankleY) / (P.hipJointY - P.ankleY)), y * H, 0.002 * H),
      rx: r * H * b,
      rz: rz * H * b,
      color: skin,
      skin: sk,
    });

    builder.addTube(
      prep([
        leg(0.052, 0.028, [[shin, 1]]),
        leg(0.13, 0.036, [[shin, 1]]),
        leg(0.2, 0.05, [[shin, 1]], 0.054), // calf
        leg(0.26, 0.042, [[shin, 1]]),
        leg(0.285, 0.046, [
          [shin, 0.5],
          [thigh, 0.5],
        ]),
        leg(0.35, 0.048, [[thigh, 1]], 0.052),
        leg(0.43, 0.05, [[thigh, 1]], 0.054),
        leg(0.5, 0.052, [
          [thigh, 0.85],
          ['hips', 0.15],
        ]),
      ]),
      { radial: radialLimb, capStart: true, capEnd: true },
    );

    // Foot with sandal: dark sole/straps below, skin above.
    const footColor = (theta: number, base: THREE.Color) => (Math.sin(theta) > 0.1 ? sandal : base); // v axis is -Y here → sin>0 is downward
    const f = (z: number, y: number, rx: number, rz: number): Ring => ({
      c: new THREE.Vector3(ankleX, y * H, z * H),
      rx: rx * H,
      rz: rz * H,
      color: skin,
      skin: [[foot, 1]],
      shape: 3,
      colorFn: footColor,
    });
    const strap = f(0.025, 0.021, 0.033, 0.02);
    strap.colorFn = () => sandal;
    builder.addTube(
      prep([
        f(-P.footBack, 0.024, 0.026, 0.022),
        strap,
        f(0.07, 0.014, 0.04, 0.013),
        f(P.footLen - P.footBack, 0.011, 0.037, 0.009),
      ]),
      { radial: radialLimb, capStart: true, capEnd: true, up: new THREE.Vector3(0, -1, 0) },
    );
  }

  // ---- Torso: one tube from tunic hem to the neck ------------------------
  const foldPhase = params.build * 7;
  const hemFolds = (amp: number) => (theta: number) =>
    1 + amp * Math.sin(6 * theta + foldPhase) + amp * 0.4 * Math.sin(11 * theta + 2);
  /** Skirt vertices follow the nearer leg as they approach the hem. */
  const skirtSkin =
    (k: number) =>
    (_theta: number, pos: THREE.Vector3): SkinRef => {
      const sideW = THREE.MathUtils.clamp(pos.x / (0.08 * H) + 0.5, 0, 1);
      return [
        ['hips', 1 - k],
        ['thighL', k * sideW],
        ['thighR', k * (1 - sideW)],
      ];
    };

  const t = (
    y: number,
    rx: number,
    rz: number,
    color: THREE.Color,
    sk: SkinRef,
    extra: Partial<Ring> = {},
  ): Ring => ({
    c: new THREE.Vector3(0, y * H, 0),
    rx: rx * H,
    rz: rz * H,
    color,
    skin: sk,
    shape: 2.4,
    ...extra,
  });

  builder.addTube(
    prep([
      // Skirt radii are affine in build: the leg offset (hip spacing) doesn't
      // shrink with a lean build, so the cloth must clear it at any b.
      t(0.3, 0.068 + 0.056 * b, 0.03 + 0.06 * b, tunic, [['hips', 1]], {
        radialFn: hemFolds(0.09),
        skinFn: skirtSkin(0.9),
      }),
      t(0.38, 0.065 + 0.054 * b, 0.028 + 0.056 * b, tunic, [['hips', 1]], {
        radialFn: hemFolds(0.05),
        skinFn: skirtSkin(0.55),
      }),
      t(0.47, 0.063 + 0.051 * b, 0.026 + 0.051 * b, tunic, [['hips', 1]], {
        skinFn: skirtSkin(0.2),
      }),
      t(0.555, 0.058 + 0.048 * b, 0.024 + 0.046 * b, tunic, [['hips', 1]]),
      t(0.615, 0.076 * b, 0.056 * b, belt, [
        ['hips', 0.4],
        ['spine', 0.6],
      ]),
      t(0.648, 0.077 * b, 0.057 * b, belt, [
        ['hips', 0.2],
        ['spine', 0.8],
      ]),
      t(0.7, 0.083 * b, 0.06 * b, tunic, [
        ['spine', 0.45],
        ['chest', 0.55],
      ]),
      t(0.755, 0.092 * b * s, 0.062 * b, tunic, [['chest', 1]]),
      t(0.795, 0.106 * s, 0.06, tunic, [['chest', 1]], { shape: 2.1 }),
      // Above the tunic neckline: skin.
      t(0.825, 0.096 * s, 0.05, skin, [['chest', 1]]),
      t(0.845, 0.05, 0.04, skin, [
        ['chest', 0.6],
        ['neck', 0.4],
      ]),
      t(0.858, 0.03, 0.03, skin, [['neck', 1]], { shape: 2 }),
    ]),
    { radial: radialTorso, capStart: true },
  );

  // ---- Arms: sleeve to the elbow, then skin, then a mitt hand ------------
  for (const side of [1, -1] as const) {
    const upper: BoneName = side > 0 ? 'upperArmL' : 'upperArmR';
    const fore: BoneName = side > 0 ? 'forearmL' : 'forearmR';
    const hand: BoneName = side > 0 ? 'handL' : 'handR';
    const sh = J[upper];
    const el = J[fore];
    const wr = J[hand];
    const along = (a: THREE.Vector3, bb: THREE.Vector3, tt: number) => a.clone().lerp(bb, tt);
    const handDir = wr.clone().sub(el).normalize();

    const a = (
      c: THREE.Vector3,
      r: number,
      color: THREE.Color,
      sk: SkinRef,
      rz = r,
      extra: Partial<Ring> = {},
    ): Ring => ({ c, rx: r * H, rz: rz * H, color, skin: sk, ...extra });

    builder.addTube(
      prep([
        a(along(sh, el, -0.02), 0.05 * s, tunic, [
          [upper, 0.5],
          ['chest', 0.5],
        ]),
        a(along(sh, el, 0.22), 0.05 * b * s, tunic, [[upper, 1]]), // deltoid
        a(along(sh, el, 0.55), 0.04 * b, tunic, [[upper, 1]]),
        a(along(sh, el, 0.88), 0.038 * b, tunic, [[upper, 1]]), // sleeve end
        a(along(sh, el, 0.93), 0.029 * b, skin, [
          [upper, 0.7],
          [fore, 0.3],
        ]),
        a(along(el, wr, 0.12), 0.028 * b, skin, [
          [upper, 0.35],
          [fore, 0.65],
        ]),
        a(along(el, wr, 0.45), 0.029 * b, skin, [[fore, 1]]), // forearm belly
        a(along(el, wr, 0.9), 0.021, skin, [[fore, 1]]),
        // Hand as a flattened mitt continuing past the wrist.
        a(wr.clone().addScaledVector(handDir, 0.02 * H), 0.025, skin, [[hand, 1]], 0.014, {
          shape: 3,
        }),
        a(wr.clone().addScaledVector(handDir, 0.062 * H), 0.026, skin, [[hand, 1]], 0.012, {
          shape: 3,
        }),
        a(
          wr
            .clone()
            .addScaledVector(handDir, 0.1 * H)
            .add(new THREE.Vector3(0, 0, 0.008 * H)),
          0.018,
          skin,
          [[hand, 1]],
          0.009,
        ),
      ]),
      { radial: radialLimb, capStart: true, capEnd: true },
    );

    // Thumb: small tapered tube angled forward from the palm.
    const palm = wr.clone().addScaledVector(handDir, 0.03 * H);
    const thumbDir = new THREE.Vector3(-side * 0.5, -0.35, 0.8).normalize();
    builder.addTube(
      [
        a(palm.clone().addScaledVector(thumbDir, 0.008 * H), 0.008, skin, [[hand, 1]]),
        a(palm.clone().addScaledVector(thumbDir, 0.028 * H), 0.007, skin, [[hand, 1]]),
        a(palm.clone().addScaledVector(thumbDir, 0.045 * H), 0.005, skin, [[hand, 1]]),
      ],
      { radial: 6, capEnd: true },
    );
  }

  // ---- Head ---------------------------------------------------------------
  const headSkin: SkinRef = [['head', 1]];
  const wrapped = params.dress.headwear === 'wrap';
  const beardFn = params.beard
    ? (theta: number, base: THREE.Color) =>
        angDist(theta, FRONT) < 0.85 ? hair : napeFn(theta, base)
    : undefined;
  const napeFn = (theta: number, base: THREE.Color) => (angDist(theta, BACK) < 1.2 ? hair : base);
  const eyeFn = (theta: number, base: THREE.Color) =>
    angDist(theta, FRONT - 0.45) < 0.22 || angDist(theta, FRONT + 0.45) < 0.22
      ? skinShade
      : napeFn(theta, base);
  const hairTop = (theta: number, base: THREE.Color) =>
    wrapped ? wrap : angDist(theta, FRONT) < 0.9 ? base : hair;

  const hd = (
    y: number,
    rx: number,
    rz: number,
    zBias: number,
    extra: Partial<Ring> = {},
  ): Ring => ({
    c: new THREE.Vector3(0, y * H, (zBias + 0.006) * H),
    rx: rx * H,
    rz: rz * H,
    color: skin,
    skin: headSkin,
    ...extra,
  });

  builder.addTube(
    prep([
      hd(0.862, 0.027, 0.027, 0.002, {
        skin: [
          ['neck', 0.5],
          ['head', 0.5],
        ],
      }),
      hd(0.878, 0.034, 0.04, 0.006, {
        colorFn: params.beard
          ? (th, base) => (angDist(th, FRONT) < 1.05 ? hair : napeFn(th, base))
          : napeFn,
        radialFn: params.beard ? (th) => (angDist(th, FRONT) < 0.9 ? 1.12 : 1) : undefined,
      }), // jaw + beard mass
      hd(0.9, 0.043, 0.054, 0.009, {
        colorFn: beardFn ?? napeFn,
        radialFn: params.beard ? (th) => (angDist(th, FRONT) < 0.75 ? 1.08 : 1) : undefined,
      }), // mouth
      hd(0.922, 0.049, 0.059, 0.007, { colorFn: napeFn }), // cheekbones
      hd(0.94, 0.051, 0.061, 0.005, {
        colorFn: eyeFn,
        radialFn: (th) =>
          angDist(th, FRONT - 0.45) < 0.2 || angDist(th, FRONT + 0.45) < 0.2 ? 0.965 : 1,
      }), // eye line (sockets inset + shadowed)
      hd(0.954, 0.052, 0.061, 0.007, {
        colorFn: wrapped ? () => wrap : napeFn,
        radialFn: (th) => (angDist(th, FRONT) < 0.7 ? 1.045 : wrapped ? 1.1 : 1),
      }), // brow ridge / wrap band
      hd(0.976, 0.05, 0.057, 0.003, {
        colorFn: hairTop,
        radialFn: wrapped ? () => 1.09 : undefined,
      }),
      hd(0.993, 0.032, 0.036, 0, { color: wrapped ? wrap : hair, colorFn: undefined }),
    ]),
    { radial: radialHead, capEnd: true },
  );

  // Nose: small wedge protruding from the face plane.
  const faceZ = 0.062;
  builder.addTube(
    [
      hd(0.938, 0.011, 0.009, faceZ - 0.006),
      hd(0.931, 0.009, 0.008, faceZ + 0.004),
      hd(0.927, 0.006, 0.005, faceZ + 0.011),
    ],
    { radial: principal ? 10 : 7, capEnd: true, up: new THREE.Vector3(0, 1, 0) },
  );

  // ---- Over-mantle (simlah): open-fronted draped shell -------------------
  if (params.dress.cloakColor) {
    const cloak = new THREE.Color(params.dress.cloakColor);
    const cl = (y: number, r: number, sk: SkinRef, extra: Partial<Ring> = {}): Ring => ({
      c: new THREE.Vector3(0, y * H, -0.012 * H),
      rx: r * H,
      rz: r * H * 0.82,
      color: cloak,
      skin: sk,
      shape: 2.2,
      ...extra,
    });
    builder.addTube(
      prep([
        cl(0.845, 0.078 * s, [
          ['chest', 0.5],
          ['neck', 0.5],
        ]),
        cl(0.815, 0.128 * s, [['chest', 1]]),
        cl(0.72, 0.13, [
          ['chest', 0.55],
          ['spine', 0.45],
        ]),
        cl(0.56, 0.128, [['hips', 1]]),
        cl(0.44, 0.132, [['hips', 1]], { skinFn: skirtSkin(0.6) }),
        cl(0.34, 0.136, [['hips', 1]], {
          radialFn: hemFolds(0.07),
          skinFn: skirtSkin(0.8),
        }),
      ]),
      // Open across the chest: arc runs through the back.
      { radial: radialTorso, arc: [FRONT + 0.55, FRONT + Math.PI * 2 - 0.55] },
    );
  }

  return builder.build();
}

/** Builds a complete rig: skeleton + skinned geometry, ready to bind. */
export function buildCharacterRig(params: CharacterParams): CharacterRig {
  const skel = buildSkeleton(params.stature);
  const geometry = buildBodyGeometry(params, skel);
  return {
    geometry,
    skeleton: skel.skeleton,
    root: skel.root,
    bones: skel.bones,
    params,
  };
}
