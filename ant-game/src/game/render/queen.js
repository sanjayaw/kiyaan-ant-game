// Draws the queen — big, gold, with a crown and a slow "breathing" belly.

import { COLORS } from '../constants.js';

export function drawQueen(ctx, queen, tick) {
  // Subtle breathing animation — abdomen pulses in and out.
  const breath = 1 + Math.sin(tick * 0.05) * 0.05;

  ctx.save();
  ctx.translate(queen.x, queen.y);

  // Shadow (bigger than a worker's)
  ctx.fillStyle = COLORS.shadow;
  ctx.beginPath();
  ctx.ellipse(0, 4, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Static legs (queen doesn't walk)
  ctx.strokeStyle = COLORS.antLeg;
  ctx.lineWidth = 1.5;
  for (let i = -1; i <= 1; i++) {
    const bx = i * 5;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx - 2, -8);
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx + 2, 8);
    ctx.stroke();
  }

  // Huge egg-filled abdomen (breathing)
  ctx.fillStyle = COLORS.queenDark;
  ctx.beginPath();
  ctx.ellipse(-10, 0, 10 * breath, 7 * breath, 0, 0, Math.PI * 2);
  ctx.fill();

  // Highlight stripe on the abdomen
  ctx.fillStyle = COLORS.queenBody;
  ctx.beginPath();
  ctx.ellipse(-10, -2, 8 * breath, 3 * breath, 0, 0, Math.PI * 2);
  ctx.fill();

  // Thorax
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(6, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  // Crown spot
  ctx.fillStyle = COLORS.queenCrown;
  ctx.beginPath();
  ctx.arc(6, -1, 2, 0, Math.PI * 2);
  ctx.fill();

  // Antennae
  ctx.strokeStyle = COLORS.antLeg;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(10, -2);
  ctx.lineTo(14, -5);
  ctx.moveTo(10, 2);
  ctx.lineTo(14, 5);
  ctx.stroke();

  ctx.restore();
}
