// Tiny HP bar above a unit. Only appears when the unit is damaged.

import { COLORS } from '../constants.js';

export function drawHpBar(ctx, x, y, hp, maxHp, width = 12) {
  if (hp >= maxHp) return;
  const w = width;
  const h = 2;
  const ratio = Math.max(0, hp / maxHp);

  ctx.fillStyle = COLORS.hpBg;
  ctx.fillRect(x - w / 2 - 1, y - 1, w + 2, h + 2);

  ctx.fillStyle = COLORS.hpRed;
  ctx.fillRect(x - w / 2, y, w, h);

  ctx.fillStyle = COLORS.hpGreen;
  ctx.fillRect(x - w / 2, y, w * ratio, h);
}
