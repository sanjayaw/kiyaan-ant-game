import { drawBackground } from './render/background.js';
import { drawNest } from './render/nest.js';
import { drawTunnel } from './render/tunnel.js';
import { drawChamber } from './render/chamber.js';
import { drawFood } from './render/food.js';
import { drawEgg } from './render/egg.js';
import { drawAnt } from './render/ant.js';
import { drawQueen } from './render/queen.js';
import { drawThreat } from './render/threats.js';
import { drawHpBar } from './render/hpbar.js';

export function drawFrame(ctx, state) {
  drawBackground(ctx);

  // Tunnels sit under the nest and chambers; both will cover the endpoints.
  for (const c of state.chambers) drawTunnel(ctx, c);
  drawNest(ctx);
  for (const c of state.chambers) drawChamber(ctx, c, state.tick);

  drawFood(ctx, state.food);
  for (const egg of state.eggs) drawEgg(ctx, egg);
  for (const ant of state.ants) drawAnt(ctx, ant, state.tick);
  drawQueen(ctx, state.queen, state.tick);
  for (const threat of state.threats) drawThreat(ctx, threat, state.tick);

  for (const ant of state.ants) {
    drawHpBar(ctx, ant.x, ant.y - 10, ant.hp, ant.maxHp, 10);
  }
  for (const t of state.threats) {
    drawHpBar(ctx, t.x, t.y - 14, t.hp, t.maxHp, 16);
  }
  drawHpBar(ctx, state.queen.x, state.queen.y - 18, state.queen.hp, state.queen.maxHp, 24);
}
