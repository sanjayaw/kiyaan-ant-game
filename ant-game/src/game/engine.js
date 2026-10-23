// Game engine. Owns the state, runs the loop, and exposes an API
// for the React UI to send commands in (like "drop food here").

import { createInitialState } from './state.js';
import { updateAnts } from './ants.js';
import { drawFrame } from './render.js';

export function startGame(canvas, onHudUpdate) {
  const ctx = canvas.getContext('2d');
  const state = createInitialState();
  let rafId;
  let lastHud = { food: -1, colony: -1 };

  function emitHud() {
    const hud = { food: state.foodStored, colony: state.ants.length };
    // Only call React when a number actually changed -- avoids re-rendering
    // the HUD 60 times a second when nothing is different.
    if (hud.food !== lastHud.food || hud.colony !== lastHud.colony) {
      lastHud = hud;
      if (onHudUpdate) onHudUpdate(hud);
    }
  }

  function loop() {
    state.tick++;
    updateAnts(state);
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
  };
}
