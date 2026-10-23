// Draws a worker ant. Faces its stored facingAngle, has animated legs,
// and shows a little crumb on its back when it's carrying food.

import { LEG_LENGTH, COLORS } from '../constants.js';

export function drawAnt(ctx, ant, tick) {
  const walk = Math.sin(tick * 0.3 + ant.legPhase);

  ctx.save();
  ctx.translate(ant.x, ant.y);
  ctx.rotate(ant.facingAngle);

  // Shadow
  ctx.fillStyle = COLORS.shadow;
  ctx.beginPath();
  ctx.ellipse(0, 2, 8, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs (tripod gait: front+back swing one way, middle swings the other)
  ctx.strokeStyle = COLORS.antLeg;
  ctx.lineWidth = 1;
  const legX = [3, 0, -3];
  const legSwing = [walk, -walk, walk];
  for (let i = 0; i < 3; i++) {
    const bx = legX[i];
    const kick = legSwing[i] * LEG_LENGTH;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx + kick, -LEG_LENGTH);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx - kick, LEG_LENGTH);
    ctx.stroke();
  }

  // Abdomen
  ctx.fillStyle = COLORS.workerDark;
  ctx.beginPath();
  ctx.ellipse(-4, 0, 3.5, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Thorax
  ctx.fillStyle = COLORS.workerBody;
  ctx.beginPath();
  ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(3, 0, 2.3, 0, Math.PI * 2);
  ctx.fill();

  // Antennae
  ctx.strokeStyle = COLORS.antLeg;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(4, -1);
  ctx.lineTo(6.5, -2.5);
  ctx.moveTo(4, 1);
  ctx.lineTo(6.5, 2.5);
  ctx.stroke();

  // If carrying food, draw a crumb on the ant's back.
  if (ant.carrying) {
    ctx.fillStyle = COLORS.foodCrumbDark;
    ctx.beginPath();
    ctx.arc(-1, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.foodCrumb;
    ctx.beginPath();
    ctx.arc(-1.5, -0.5, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
