// Draws a single chamber. If it's still being built, we show a dashed
// outline with the dirt fill growing as construction progresses. Once
// active, we show a solid dirt rim + an inner accent color for the
// chamber type + a tiny icon in the center hinting at the function.

import {
  CHAMBER_RADIUS,
  CHAMBER_BUILD_TICKS,
  COLORS,
} from '../constants.js';

const ACCENT = {
  nursery: COLORS.nurseryAccent,
  foodstore: COLORS.foodstoreAccent,
  barracks: COLORS.barracksAccent,
};

export function drawChamber(ctx, chamber, tick) {
  if (chamber.state === 'building') {
    drawBuilding(ctx, chamber, tick);
  } else {
    drawActive(ctx, chamber);
  }
}

function drawBuilding(ctx, chamber, tick) {
  const { x, y } = chamber;
  const progress = Math.min(1, (tick - chamber.layTick) / CHAMBER_BUILD_TICKS);

  // Partial fill grows as construction progresses
  const r = CHAMBER_RADIUS * progress;
  if (r > 0) {
    ctx.fillStyle = COLORS.chamberBuildingFill;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dashed outline showing final size
  ctx.strokeStyle = COLORS.chamberBuildingOutline;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.arc(x, y, CHAMBER_RADIUS, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawActive(ctx, chamber) {
  const { x, y, type } = chamber;

  // Outer dirt rim
  ctx.fillStyle = COLORS.chamberOuter;
  ctx.beginPath();
  ctx.arc(x, y, CHAMBER_RADIUS + 3, 0, Math.PI * 2);
  ctx.fill();

  // Mid layer
  ctx.fillStyle = COLORS.chamberMid;
  ctx.beginPath();
  ctx.arc(x, y, CHAMBER_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // Inner accent color (per type)
  ctx.fillStyle = ACCENT[type];
  ctx.beginPath();
  ctx.arc(x, y, CHAMBER_RADIUS * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Dark core
  ctx.fillStyle = COLORS.nestInner;
  ctx.beginPath();
  ctx.arc(x, y, CHAMBER_RADIUS * 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Little icon in the center hints what this chamber does
  drawChamberIcon(ctx, x, y, type);
}

function drawChamberIcon(ctx, x, y, type) {
  if (type === 'nursery') {
    // Tiny egg
    ctx.fillStyle = COLORS.eggShell;
    ctx.beginPath();
    ctx.ellipse(x, y, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'foodstore') {
    // Three little crumbs
    ctx.fillStyle = COLORS.foodCrumb;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * 3, y + Math.sin(a) * 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'barracks') {
    // Crossed swords (simplified: an X)
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 3);
    ctx.lineTo(x + 3, y + 3);
    ctx.moveTo(x - 3, y + 3);
    ctx.lineTo(x + 3, y - 3);
    ctx.stroke();
  }
}
