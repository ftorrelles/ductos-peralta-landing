import * as THREE from "three";

/**
 * World-space layout of the duct run used by the story.
 *
 *   [A/C unit] ── S0 ── S1 (rolled sheet) ── S2 ──╮ elbow
 *                                             │ drop
 *                                          [diffuser]
 */

export const DUCT_RADIUS = 0.45;
export const RUN_Y = 1.2;
export const SEGMENT_LENGTH = 1.8;

/** x-centers of the three straight horizontal segments (S0, S1, S2). */
export const SEGMENT_X = [-3.3, -1.5, 0.3] as const;
export const RUN_START_X = SEGMENT_X[0] - SEGMENT_LENGTH / 2; // -4.2
export const RUN_END_X = SEGMENT_X[2] + SEGMENT_LENGTH / 2; // 1.2

export const ELBOW_RADIUS = 0.8;
export const ELBOW_CENTER = new THREE.Vector3(RUN_END_X, RUN_Y - ELBOW_RADIUS, 0); // (1.2, 0.4, 0)
export const DROP_X = RUN_END_X + ELBOW_RADIUS; // 2.0
export const DROP_TOP_Y = ELBOW_CENTER.y; // 0.4
export const DROP_BOTTOM_Y = -0.45;

export const DIFFUSER = {
  center: new THREE.Vector3(DROP_X, -0.62, 0),
  size: [1.4, 0.3, 1.4] as const,
};

/**
 * A/C air handler at the start of the run: it cools the air and pushes it into the duct.
 * Its +x face sits on the first flange; the particle path starts hidden inside it.
 */
export const AIR_HANDLER = {
  size: [1.1, 1.3, 1.3] as const,
  center: new THREE.Vector3(RUN_START_X - 0.55, RUN_Y, 0),
};

/** Point where air leaves the diffuser into the room. */
export const OUTLET = new THREE.Vector3(DROP_X, -0.8, 0);

/** Rolled sheet = segment S1. */
export const SHEET_CENTER = new THREE.Vector3(SEGMENT_X[1], RUN_Y, 0);

/** Centerline of the whole run, used by the airflow particles. */
export function createDuctCurve(): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  for (let x = RUN_START_X - 0.6; x < RUN_END_X; x += 0.6) pts.push(new THREE.Vector3(x, RUN_Y, 0));
  pts.push(new THREE.Vector3(RUN_END_X, RUN_Y, 0));
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    const a = Math.PI / 2 - (i / steps) * (Math.PI / 2);
    pts.push(
      new THREE.Vector3(ELBOW_CENTER.x + Math.cos(a) * ELBOW_RADIUS, ELBOW_CENTER.y + Math.sin(a) * ELBOW_RADIUS, 0),
    );
  }
  pts.push(new THREE.Vector3(DROP_X, 0, 0));
  pts.push(new THREE.Vector3(DROP_X, OUTLET.y, 0));
  return new THREE.CatmullRomCurve3(pts, false, "centripetal");
}

/** Deterministic PRNG so geometry/texture generation stays pure. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
