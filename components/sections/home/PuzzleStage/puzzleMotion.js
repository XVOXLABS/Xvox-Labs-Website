// Pure maths for the homepage puzzle stage, ported unchanged from the prototype's final
// puzUpdate (index.html). No DOM access here. clamp and eio (the prototype's ease) are shared
// with the hero sequence.
import { clamp, eio } from "../HeroSequence/heroMotion";

// Start offsets of the five pieces: [x in "lim" units of 2.3, y in board heights x 0.55, rotation].
export const SCATTER = [
  [-2.3, -0.32, -22],
  [-1.1, -0.5, 16],
  [0, -0.12, -10],
  [1.15, -0.45, 20],
  [2.3, -0.25, -16],
];

// Piece i starts moving at p = 0.10 + 0.06 i and locks 0.5 later (Sage locks at p = 0.84).
export function pieceProgress(p, i) {
  return eio(clamp((p - 0.1 - i * 0.06) / 0.5));
}

// Piece width for the board size; phone = the prototype's phone layout (decision D7: viewport <= 600px).
export function pieceWidth(bw, bh, phone) {
  return phone ? bw / 3.4 : Math.min(bh * 0.62, bw / 4.6);
}

// Position of piece i at progress t (0 scattered, 1 locked in the row), from the board's bottom centre.
export function pieceTransform(i, t, bw, bh, w, phone) {
  const [ax, ay, ar] = SCATTER[i];
  const tx = (i - 2) * w * (phone ? 0.62 : 0.8);
  const lim = Math.max(w, bw / 2 - w * 0.75);
  const sx = (ax / 2.3) * lim;
  const sy = ay * bh * 0.55;
  return { x: sx + (tx - sx) * t, y: sy * (1 - t), rot: ar * (1 - t) };
}
