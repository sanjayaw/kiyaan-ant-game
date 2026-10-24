// Draws every enemy bug. One dispatch function + one draw function
// per bug type. Edit any single function to tweak that bug's look.

import { COLORS } from '../constants.js';

export function drawThreat(ctx, threat, tick) {
  switch (threat.type) {
    case 'spider':    return drawSpider(ctx, threat, tick);
    case 'beetle':    return drawBeetle(ctx, threat, tick);
    case 'centipede': return drawCentipede(ctx, threat, tick);
    case 'rival':     return drawRival(ctx, threat, tick);
    case 'wasp':      return drawWasp(ctx, threat, tick);
  }
}

function shadow(ctx, w, h) {
  ctx.fillStyle = COLORS.shadow;
  ctx.beginPath();
  ctx.ellipse(0, h, w, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpider(ctx, s, tick) {
  const walk = Math.sin(tick * 0.4 + s.phase);
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.facingAngle);
  shadow(ctx, 10, 3);

  ctx.strokeStyle = COLORS.spiderDark;
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const angle = -0.9 + i * 0.6;
    const bend = (i % 2 === 0 ? walk : -walk) * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 8, Math.sin(angle) * 8 - bend);
    ctx.lineTo(Math.cos(angle) * 10, Math.sin(angle) * 10 + 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(-angle) * 8, Math.sin(-angle) * 8 + bend);
    ctx.lineTo(Math.cos(-angle) * 10, Math.sin(-angle) * 10 - 2);
    ctx.stroke();
  }

  ctx.fillStyle = COLORS.spiderBody;
  ctx.beginPath();
  ctx.arc(-2, 0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(3, 0, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ff2222';
  ctx.beginPath();
  ctx.arc(4, -1, 0.6, 0, Math.PI * 2);
  ctx.arc(4, 1, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBeetle(ctx, b, tick) {
  const walk = Math.sin(tick * 0.2 + b.phase);
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.facingAngle);
  shadow(ctx, 12, 4);

  ctx.strokeStyle = COLORS.spiderDark;
  ctx.lineWidth = 1.2;
  for (let i = -1; i <= 1; i++) {
    const bx = i * 4;
    const kick = (i % 2 === 0 ? walk : -walk) * 2;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx + kick, -6);
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx - kick, 6);
    ctx.stroke();
  }

  ctx.fillStyle = COLORS.beetleBody;
  ctx.beginPath();
  ctx.ellipse(-2, 0, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.beetleShell;
  ctx.beginPath();
  ctx.ellipse(-2, -1, 9, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.beetleHighlight;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(6, 0);
  ctx.stroke();

  ctx.fillStyle = COLORS.beetleShell;
  ctx.beginPath();
  ctx.arc(8, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.beetleHighlight;
  ctx.beginPath();
  ctx.moveTo(10, -1); ctx.lineTo(12, -2);
  ctx.moveTo(10, 1); ctx.lineTo(12, 2);
  ctx.stroke();

  ctx.restore();
}

function drawCentipede(ctx, c, tick) {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(c.facingAngle);

  for (let i = 5; i >= 0; i--) {
    const bx = -i * 4;
    const wiggle = Math.sin(tick * 0.3 + c.phase + i * 0.5) * 2;
    ctx.fillStyle = i === 0 ? COLORS.centipedeDark : COLORS.centipedeBody;
    ctx.beginPath();
    ctx.ellipse(bx, wiggle, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.centipedeDark;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(bx, wiggle);
    ctx.lineTo(bx, wiggle - 4);
    ctx.moveTo(bx, wiggle);
    ctx.lineTo(bx, wiggle + 4);
    ctx.stroke();
  }

  ctx.fillStyle = COLORS.centipedeBody;
  ctx.beginPath();
  ctx.arc(4, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.centipedeDark;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(6, -1); ctx.lineTo(9, -3);
  ctx.moveTo(6, 1); ctx.lineTo(9, 3);
  ctx.stroke();

  ctx.restore();
}

function drawRival(ctx, r, tick) {
  const walk = Math.sin(tick * 0.3 + r.phase);
  ctx.save();
  ctx.translate(r.x, r.y);
  ctx.rotate(r.facingAngle);
  shadow(ctx, 7, 2);

  ctx.strokeStyle = COLORS.rivalDark;
  ctx.lineWidth = 1;
  const legX = [3, 0, -3];
  const legSwing = [walk, -walk, walk];
  for (let i = 0; i < 3; i++) {
    const bx = legX[i];
    const kick = legSwing[i] * 4;
    ctx.beginPath();
    ctx.moveTo(bx, 0); ctx.lineTo(bx + kick, -4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx, 0); ctx.lineTo(bx - kick, 4);
    ctx.stroke();
  }
  ctx.fillStyle = COLORS.rivalDark;
  ctx.beginPath();
  ctx.ellipse(-4, 0, 3.5, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.rivalBody;
  ctx.beginPath();
  ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(3, 0, 2.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawWasp(ctx, w, tick) {
  const flap = Math.sin(tick * 0.6 + w.phase);
  ctx.save();
  ctx.translate(w.x, w.y);
  ctx.rotate(w.facingAngle);
  shadow(ctx, 10, 3);

  ctx.fillStyle = COLORS.waspWing;
  ctx.beginPath();
  ctx.ellipse(-2, -5, 6, 2 + flap * 0.6, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-2, 5, 6, 2 + flap * 0.6, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.waspBody;
  ctx.beginPath();
  ctx.ellipse(-3, 0, 7, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.waspStripe;
  for (let i = -2; i <= 1; i++) {
    ctx.fillRect(-5 + i * 2, -3, 1.2, 6);
  }

  ctx.fillStyle = COLORS.waspStripe;
  ctx.beginPath();
  ctx.arc(5, 0, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.waspStripe;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(-13, 0);
  ctx.stroke();

  ctx.restore();
}
