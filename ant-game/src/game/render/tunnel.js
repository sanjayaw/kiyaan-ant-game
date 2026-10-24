// A dug tunnel between the main nest and one chamber. Drawn as a wide
// dirt rim with a darker hole on top. Both endpoints get covered by
// the nest and the chamber when they draw themselves on top.

import {
  NEST_X, NEST_Y, NEST_RADIUS,
  CHAMBER_RADIUS,
  COLORS,
} from '../constants.js';

export function drawTunnel(ctx, chamber) {
  const dx = chamber.x - NEST_X;
  const dy = chamber.y - NEST_Y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;

  const startX = NEST_X + ux * (NEST_RADIUS - 5);
  const startY = NEST_Y + uy * (NEST_RADIUS - 5);
  const endX = chamber.x - ux * (CHAMBER_RADIUS - 5);
  const endY = chamber.y - uy * (CHAMBER_RADIUS - 5);

  // Dirt rim (wider, lighter)
  ctx.strokeStyle = COLORS.chamberOuter;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Dark hole (narrower, on top)
  ctx.strokeStyle = COLORS.tunnel;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
