// Egg lifecycle. Each frame we check every egg: if its hatch tick has
// arrived, we remove the egg and spawn a new ant of its caste at the
// egg's position.

import { makeAnt } from './state.js';

export function updateEggs(state) {
  const stillCooking = [];
  for (const egg of state.eggs) {
    if (state.tick >= egg.hatchTick) {
      // Hatch — add a new ant to the colony.
      state.ants.push(makeAnt({
        id: state.nextAntId++,
        caste: egg.caste,
        x: egg.x,
        y: egg.y,
        targetX: egg.x,
        targetY: egg.y,  // ants.js will pick a new wander target on tick 1
      }));
    } else {
      stillCooking.push(egg);
    }
  }
  state.eggs = stillCooking;
}
