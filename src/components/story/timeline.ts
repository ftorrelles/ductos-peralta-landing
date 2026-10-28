/**
 * Scroll timeline for the 3D story.
 *
 * The story is driven by a single "chapter coordinate" `c` in [0, LAST_CHAPTER]:
 * `c === k` means chapter card k is centered in the viewport, and values in between
 * are transitions. Every scene element derives its state from `c` (pure functions).
 */

export const CHAPTER_COUNT = 5;
export const LAST_CHAPTER = CHAPTER_COUNT - 1;

/** State shown when the user prefers reduced motion: assembled network with air inside. */
export const REDUCED_MOTION_COORD = 3;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smoothstep-eased 0..1 progress of `v` across [edge0, edge1]. */
export function smooth(edge0: number, edge1: number, v: number): number {
  const t = clamp((v - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Progress of the transition *into* chapter `k` (0 while at chapter k-1, 1 once at chapter k).
 * The transition happens across the middle of the gap so each card has a resting state.
 */
export const into = (c: number, k: number) => smooth(k - 0.8, k - 0.15, c);

/** Maps the section's bounding rect to the chapter coordinate. */
export function chapterCoordFromRect(rect: DOMRect, viewportHeight: number): number {
  const chapterHeight = rect.height / CHAPTER_COUNT;
  const viewportCenter = -rect.top + viewportHeight / 2;
  return clamp(viewportCenter / chapterHeight - 0.5, 0, LAST_CHAPTER);
}

/* ---------- colors ---------- */

export type RGB = readonly [number, number, number];

export const hexToRgb = (hex: string): RGB => {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const mixRgb = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export const rgbCss = ([r, g, b]: RGB) => `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;

const PAPER = hexToRgb("#EEF1F4");
const INK = hexToRgb("#0A1220");
const NAVY = hexToRgb("#0B2D5B");
export const HEAT = hexToRgb("#FF6A2B");
export const SKY = hexToRgb("#3FA9F5");

/** Section background: paper → ink while the network forms, then ink → navy as the room cools. */
export function backgroundAt(c: number): { color: RGB; dark: boolean } {
  const toInk = smooth(1.6, 2.6, c);
  const toNavy = smooth(3.1, 4, c);
  const color = mixRgb(mixRgb(PAPER, INK, toInk), NAVY, toNavy);
  return { color, dark: toInk > 0.5 };
}

/**
 * Room (not duct) temperature readout: the room stays at 32°C while cold air travels the duct,
 * and only drops to 24°C once the diffuser releases it during the last chapter.
 */
export function temperatureAt(c: number): { value: number; color: RGB; visible: number } {
  const t = smooth(3.3, 4, c);
  return { value: lerp(32, 24, t), color: mixRgb(HEAT, SKY, t), visible: smooth(2.4, 2.9, c) };
}

/* ---------- camera ---------- */

export type CameraKey = { pos: readonly [number, number, number]; target: readonly [number, number, number] };

/** One camera keyframe per chapter. */
export const CAMERA_KEYS: readonly CameraKey[] = [
  { pos: [-1.2, 1.9, 4.6], target: [-1.5, 1.15, 0] },
  { pos: [-0.2, 2.3, 3.9], target: [-1.5, 1.15, 0] },
  { pos: [0.6, 2.8, 8.4], target: [-0.8, 0.45, 0] },
  // Oblique from the A/C unit's side so the unit and the whole run read in one frame.
  { pos: [-9.2, 2.6, 5.0], target: [-2.1, 0.4, 0] },
  { pos: [5.2, 0.4, 5.6], target: [1.7, -1.1, 0] },
];

/** Interpolated camera pose at coordinate `c` (eased between integer keyframes). */
export function cameraAt(c: number, out: { pos: number[]; target: number[] }) {
  const i = Math.min(Math.floor(c), LAST_CHAPTER - 1);
  const f = smooth(0, 1, c - i);
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[i + 1];
  for (let k = 0; k < 3; k++) {
    out.pos[k] = lerp(a.pos[k], b.pos[k], f);
    out.target[k] = lerp(a.target[k], b.target[k], f);
  }
  return out;
}
