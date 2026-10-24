// Game engine. Owns the state, runs the loop, exposes a small API
// for the React UI to send commands in.

import { createInitialState } from './state.js';
import { updateAnts } from './ants.js';
import { updateEggs } from './eggs.js';
import { drawFrame } from './render.js';
import {
  EGG_COST,
  EGG_HATCH_TICKS,
  NEST_X,
  NEST_Y,
  NEST_RADIUS,
  CASTES,
} from './constants.js';

export function startGame(canvas, onHudUpdate) {
  const ctx = canvas.getContext('2d');
  const state = createInitialState();
  let rafId;
  let lastHud = { food: -1, colony: -1, eggs: -1 };

  function emitHud() {
    const hud = {
      food: state.foodStored,
      colony: state.ants.length,
      eggs: state.eggs.length,
    };
    // Only re-render HUD when something actually changed.
    if (
      hud.food !== lastHud.food ||
      hud.colony !== lastHud.colony ||
      hud.eggs !== lastHud.eggs
    ) {
      lastHud = hud;
      if (onHudUpdate) onHudUpdate(hud);
    }
  }

  function loop() {
    state.tick++;
    updateAnts(state);
    updateEggs(state);
    drawFrame(ctx, state);
    emitHud();
    rafId = requestAnimationFrame(loop);
  }
  loop();

  return {
    stop: () => cancelAnimationFrame(rafId),

    dropFood: (x, y) => {
      state.food.push({
        id: state.nextFoodId++,
        x,
        y,
        claimedBy: null,
      });
    },

    layEgg: (caste) => {
      if (!CASTES.includes(caste)) return false;
      if (state.foodStored < EGG_COST) return false;
      state.foodStored -= EGG_COST;

      // Put the egg somewhere in the inner nest chamber.
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * NEST_RADIUS * 0.4;
      state.eggs.push({
        id: state.nextEggId++,
        x: NEST_X + Math.cos(angle) * r,
        y: NEST_Y + Math.sin(angle) * r,
        caste,
        hatchTick: state.tick + EGG_HATCH_TICKS,
      });
      return true;
    },
  };
}
