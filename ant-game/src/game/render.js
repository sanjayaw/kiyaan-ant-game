// Paints one frame. Each piece of the scene lives in its own file
// inside render/ so you can edit one thing at a time.

import { drawBackground } from './render/background.js';
import { drawNest } from './render/nest.js';
import { drawFood } from './render/food.js';
import { drawEgg } from './render/egg.js';
import { drawAnt } from './render/ant.js';
import { drawQueen } from './render/queen.js';

export function drawFrame(ctx, state) {
  drawBackground(ctx);
  drawNest(ctx);
  drawFood(ctx, state.food);
  for (const egg of state.eggs) {
    drawEgg(ctx, egg);
  }
  for (const ant of state.ants) {
    drawAnt(ctx, ant, state.tick);
  }
  drawQueen(ctx, state.queen, state.tick);
}
