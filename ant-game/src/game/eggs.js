// Egg lifecycle. Each frame we compute the current effective hatch time
// (which gets faster with each Nursery), and any egg older than that
// hatches into a new ant of its caste.

import { makeAnt } from './state.js';
import { EGG_HATCH_TICKS, EGG_HATCH_FLOOR } from './constants.js';
import { activeChamberCount } from './chambers.js';

export function updateEggs(state) {
  const nurseries = activeChamberCount(state, 'nursery');
  // Each nursery halves the hatch time, floored.
  const effectiveHatch = Math.max(
    EGG_HATCH_FLOOR,
    EGG_HATCH_TICKS / Math.pow(2, nurseries),
  );

  const stillCooking = [];
  for (const egg of state.eggs) {
    if (state.tick - egg.layTick >= effectiveHatch) {
      state.ants.push(makeAnt({
        id: state.nextAntId++,
        caste: egg.caste,
        x: egg.x,
        y: egg.y,
        targetX: egg.x,
        targetY: egg.y,
      }));
    } else {
      stillCooking.push(egg);
    }
  }
  state.eggs = stillCooking;
}
