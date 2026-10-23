// Draws the nest as layered dirt rings with tunnel entrances around the edge.

import { NEST_X, NEST_Y, NEST_RADIUS, COLORS } from '../constants.js';

const TUNNEL_COUNT = 5;
const tunnels = Array.from({ length: TUNNEL_COUNT }, (_, i) => ({
  angle: (i / TUNNEL_COUNT) * Math.PI * 2,
}));

export function drawNest(ctx) {
  // Outer mound
  ctx.fillStyle = COLORS.nestOuter;
  ctx.beginPath();
  ctx.arc(NEST_X, NEST_Y, NEST_RADIUS + 10, 0, Math.PI * 2);
  ctx.fill();

  // Middle layer
  ctx.fillStyle = COLORS.nestMid;
  ctx.beginPath();
  ctx.arc(NEST_X, NEST_Y, NEST_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // Inner chamber (where the queen sits)
  ctx.fillStyle = COLORS.nestInner;
  ctx.beginPath();
  ctx.arc(NEST_X, NEST_Y, NEST_RADIUS * 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Dark tunnel entrances around the edge
  ctx.fillStyle = COLORS.nestEntrance;
  for (const t of tunnels) {
    const x = NEST_X + Math.cos(t.angle) * (NEST_RADIUS + 5);
    const y = NEST_Y + Math.sin(t.angle) * (NEST_RADIUS + 5);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
