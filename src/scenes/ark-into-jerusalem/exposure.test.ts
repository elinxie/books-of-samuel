import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { buildCharacterRig } from '../../engine/characters';
import { DAVID_DANCE_PARAMS } from './PrincipalFigures';
import { T_DANCE, T_TENT, davidDanceTransform } from './poses';

/**
 * A dedicated, hard, unconditional bar (per the brief): David's figure stays
 * fully clothed at the dance beat (6:14, "with all his might"), in every
 * mode, at every camera distance — no exposure, partial or implied, is ever
 * modeled or suggested by framing. Same spirit as `hebron-gate`'s ADR-009
 * assertions, adapted to this scene's own hard constraint.
 *
 * The underlying reason this bar holds structurally, not just by
 * convention: this project's character-rig pipeline
 * (`src/engine/characters/bodyGeometry.ts`) paints the torso and thighs
 * exclusively in `dress.tunicColor` — `skinColor` is only ever used for the
 * head, forearms/hands, and shins/feet. There is no code path anywhere in
 * this engine that can render bare skin over the torso; "exposure" is not a
 * togglable state this pipeline has ever had. The tests below confirm this
 * scene's own params/pose functions never attempt to introduce one.
 */

describe('David stays fully clothed at every point in the dance (no exposure, any mode)', () => {
  it('DAVID_DANCE_PARAMS always specifies a real tunic color and a real belt color', () => {
    expect(DAVID_DANCE_PARAMS.dress.tunicColor).toBeTruthy();
    expect(DAVID_DANCE_PARAMS.dress.beltColor).toBeTruthy();
    // headwear only ever toggles head covering ('wrap' | 'bare') — never a
    // body-covering state. No other field name on DressSpec exists to encode
    // exposure (see src/engine/characters/types.ts).
    expect(['wrap', 'bare']).toContain(DAVID_DANCE_PARAMS.dress.headwear);
  });

  it('the dress spec has exactly the fields the shared DressSpec type declares — no ad hoc exposure flag added', () => {
    const keys = Object.keys(DAVID_DANCE_PARAMS.dress).sort();
    // tunicColor and beltColor are required; headwear is required;
    // headwrapColor is optional and absent here (headwear: 'bare').
    expect(keys).toEqual(['beltColor', 'headwear', 'tunicColor']);
  });

  it('the built principal rig paints a substantial tunic-colored region distinct from the skin tone (torso/thighs are never bare)', () => {
    const rig = buildCharacterRig(DAVID_DANCE_PARAMS);
    const colorAttr = rig.geometry.getAttribute('color');
    expect(colorAttr).toBeTruthy();

    const tunic = new THREE.Color(DAVID_DANCE_PARAMS.dress.tunicColor);
    const skin = new THREE.Color(DAVID_DANCE_PARAMS.skinColor);
    // Sanity: the two reference tones are genuinely different, so a count
    // split between them is a meaningful signal, not a tautology.
    expect(tunic.getHexString()).not.toBe(skin.getHexString());

    let tunicVerts = 0;
    let skinVerts = 0;
    const tol = 0.02;
    for (let i = 0; i < colorAttr.count; i++) {
      const r = colorAttr.getX(i);
      const g = colorAttr.getY(i);
      const b = colorAttr.getZ(i);
      const dTunic = Math.hypot(r - tunic.r, g - tunic.g, b - tunic.b);
      const dSkin = Math.hypot(r - skin.r, g - skin.g, b - skin.b);
      if (dTunic < tol) tunicVerts++;
      if (dSkin < tol) skinVerts++;
    }
    // Both tones are present (clothed regions and bare hands/head/feet
    // both exist by design), and the tunic-colored region — which is what
    // covers the torso and thighs — is a substantial part of the figure,
    // not a token sliver.
    expect(tunicVerts).toBeGreaterThan(20);
    expect(skinVerts).toBeGreaterThan(0);
  });

  it('davidDanceTransform never produces any field beyond whole-body transform scalars, at any time in the dance window', () => {
    for (let t = T_DANCE; t <= T_TENT; t += 3) {
      const pose = davidDanceTransform(t);
      const keys = Object.keys(pose).sort();
      expect(keys).toEqual(['bounce', 'lean', 'spin']);
      // No field's name or value could plausibly encode an exposure state —
      // all three are finite transform scalars.
      expect(Number.isFinite(pose.bounce)).toBe(true);
      expect(Number.isFinite(pose.spin)).toBe(true);
      expect(Number.isFinite(pose.lean)).toBe(true);
    }
  });

  it('no field named anything exposure-related exists anywhere on the dance pose or dress params', () => {
    const forbidden = /expos|nude|naked|topless|disrobe|bare[-_]?body|skin[-_]?show/i;
    const dancePose = davidDanceTransform((T_DANCE + T_TENT) / 2);
    for (const key of Object.keys(dancePose)) {
      expect(key).not.toMatch(forbidden);
    }
    for (const key of Object.keys(DAVID_DANCE_PARAMS.dress)) {
      expect(key).not.toMatch(forbidden);
    }
  });
});
