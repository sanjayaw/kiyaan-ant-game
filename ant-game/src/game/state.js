import {
  NEST_X,
  NEST_Y,
  NEST_RADIUS,
  STARTING_WORKERS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  EDGE_MARGIN,
} from './constants.js';

function randomPointInNest() {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * NEST_RADIUS * 0.7;
  return {
    x: NEST_X + Math.cos(angle) * r,
    y: NEST_Y + Math.sin(angle) * r,
  };
}

function randomTarget() { 
  return {
    x: EDGE_MARGIN + Math.random() * (CANVAS_WIDTH - EDGE_MARGIN * 2),
    y: EDGE_MARGIN + Math.random() * (CANVAS_HEIGHT - EDGE_MARGIN * 2),
  };
}

// Factory for a single ant. Reused by state.js and eggs.js when hatching.
export function makeAnt({ id, caste, x, y, targetX, targetY }) {
  return {
    id,
    caste,
    x,
    y,
    targetX,
    targetY,
    facingAngle: 0,
    legPhase: Math.random() * Math.PI * 2,
    carrying: false,
    targetFoodId: null,
  };
}

export function createInitialState() {
  const ants = [];
  for (let i = 0; i < STARTING_WORKERS; i++) {
    const start = randomPointInNest();
    const target = randomTarget();
    ants.push(makeAnt({
      id: i,
      caste: 'worker',
      x: start.x,
      y: start.y,
      targetX: target.x,
      targetY: target.y,
    }));
  }

  return {
    queen: { x: NEST_X, y: NEST_Y },
    ants,
    eggs: [],              // eggs currently incubating in the nest
    food: [],                  // active food crumbs on the map
    foodStored: 0,
    nextAntId: STARTING_WORKERS,
    nextEggId: 1,
    nextFoodId: 1,
    tick: 0,
  };
}
