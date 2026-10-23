// Draws every food crumb currently on the map as a small cream pellet
// with a darker shadow underneath.

import { COLORS } from '../constants.js';

export function drawFood(ctx, foodList) {
  for (const f of foodList) {
    ctx.fillStyle = COLORS.shadow;
    ctx.beginPath();
    ctx.ellipse(f.x, f.y + 1.5, 4, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.foodCrumbDark;
    ctx.beginPath();
    ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.foodCrumb;
    ctx.beginPath();
    ctx.arc(f.x - 0.8, f.y - 0.8, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
