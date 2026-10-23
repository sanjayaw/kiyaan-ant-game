// Paints the soil floor. We pre-compute random noise dots and pebble
// positions ONCE when the game loads, then re-draw them each frame.
// This way the "random" texture doesn't flicker.

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  NEST_X,
  NEST_Y,
  NEST_RADIUS,
  COLORS,
} from '../constants.js';

function random(min, max) {
  return min + Math.random() * (max - min);
}

// 400 tiny speckles of light and dark dirt
const soilNoise = Array.from({ length: 400 }, () => ({
  x: Math.random() * CANVAS_WIDTH,
  y: Math.random() * CANVAS_HEIGHT,
  r: random(0.5, 1.5),
  color: Math.random() > 0.5 ? COLORS.soilNoiseLight : COLORS.soilNoiseDark,
}));

// Scatter pebbles, but keep them clear of the nest.
const pebbles = [];
while (pebbles.length < 14) {
  const x = Math.random() * CANVAS_WIDTH;
  const y = Math.random() * CANVAS_HEIGHT;
  const dx = x - NEST_X;
  const dy = y - NEST_Y;
  if (Math.hypot(dx, dy) > NEST_RADIUS + 25) {
    pebbles.push({ x, y, r: random(3, 6) });
  }
}

export function drawBackground(ctx) {
  // Dark soil fill
  ctx.fillStyle = COLORS.soil;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Noise speckles
  for (const dot of soilNoise) {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pebbles with a tiny top-left highlight
  for (const p of pebbles) {
    ctx.fillStyle = COLORS.pebble;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.pebbleHighlight;
    ctx.beginPath();
    ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}
