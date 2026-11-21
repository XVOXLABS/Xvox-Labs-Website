// Pure maths for the homepage hero sequence, ported unchanged from the prototype
// (index.html: eio, eout, seqTick, the final seqApply). No DOM access here.

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Cubic ease-in-out and ease-out (prototype eio / eout).
export const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const eout = (t) => 1 - Math.pow(1 - t, 3);

// Scroll smoothing (prototype seqTick): each frame moves 14% towards the target; stop when close.
export const SMOOTHING = 0.14;
export const SETTLE = 0.0004;
// Sequence counts as finished (hover/focus tags on) past this progress.
export const DONE_AT = 0.97;

// Start tilt of the five agents, in order.
export const START_ROTATION = [-3, 2, 0, 4, -2];

// Progress p (0-1 through the pinned section) to the sequence phase q (0-0.5).
export const phase = (p) => clamp(p / 0.85) * 0.5;

// Agent size and spacing in the starting row (prototype S0 / gap), by stage width.
export function agentRow(width) {
  const narrow = width < 600;
  const size = narrow ? (width * 0.98) / 2.35 : Math.min(470, (width * 0.98) / 4);
  const gap = narrow ? size * 0.34 : (width * 0.98 - size) / 4;
  return { narrow, size, gap };
}
