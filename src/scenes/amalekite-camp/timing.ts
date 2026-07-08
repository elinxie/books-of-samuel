/**
 * Shared beat times (seconds) for the Amalekite-camp reenactment, mirroring
 * scenes.ts's amalekite-camp beats. Every pose function keys off these.
 */
export const SPRAWL_T = 20; // b-sprawl
export const STRIKE_T = 55; // b-strike (onset at twilight)
export const COMPRESS_T = 80; // b-compression (explicit time-skip card)
export const RAIDERS_GONE_T = 84; // raiders no longer rendered (dark trough of the skip)
export const FLIGHT_T = 100; // b-camel-flight
export const RECOVERY_T = 122; // b-recovery
export const DRIVE_T = 145; // b-drive-north
export const END_T = 170; // scene duration

export function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
