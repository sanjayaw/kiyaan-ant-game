// Colony chambers: Nursery / Food Store / Barracks.
// Placement, build timer, and lookup helpers.

import {
  NEST_X, NEST_Y,
  CANVAS_WIDTH, CANVAS_HEIGHT,
  CHAMBER_RADIUS,
  CHAMBER_PLACEMENT_RING,
  CHAMBER_SPACING,
  CHAMBER_BUILD_TICKS,
} from './constants.js';

// Try to find a free spot around the nest. Returns {x,y} or null if we
// couldn't find one after a reasonable number of tries.
export function findChamberSpot(state) {
  for (let tries = 0; tries < 40; tries++) {
    const angle = Math.random() * Math.PI * 2;
    const x = NEST_X + Math.cos(angle) * CHAMBER_PLACEMENT_RING;
    const y = NEST_Y + Math.sin(angle) * CHAMBER_PLACEMENT_RING;

    // Must fit on the canvas with a small margin
    if (x < CHAMBER_RADIUS + 10 || x > CANVAS_WIDTH - CHAMBER_RADIUS - 10) continue;
    if (y < CHAMBER_RADIUS + 10 || y > CANVAS_HEIGHT - CHAMBER_RADIUS - 10) continue;

    // Must not overlap any existing chamber
    let ok = true;
    for (const c of state.chambers) {
      if (Math.hypot(c.x - x, c.y - y) < CHAMBER_SPACING) { ok = false; break; }
    }
    if (ok) return { x, y };
  }
  return null;
}

export function updateChambers(state) {
  for (const c of state.chambers) {
    if (c.state === 'building' && state.tick - c.layTick >= CHAMBER_BUILD_TICKS) {
      c.state = 'active';
    }
  }
}

export function activeChamberCount(state, type) {
  let n = 0;
  for (const c of state.chambers) {
    if (c.type === type && c.state === 'active') n++;
  }
  return n;
}
