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

export function createInitialState() {
  const ants = [];
  for (let i = 0; i < STARTING_WORKERS; i++) {
    const start = randomPointInNest();
    const target = randomTarget();
    ants.push({
      id: i,
      caste: 'worker',
      x: start.x,
      y: start.y,
      targetX: target.x,
      targetY: target.y,
      facingAngle: 0,          // which way the ant is pointing
      legPhase: Math.random() * Math.PI * 2,
      carrying: false,         // is this ant hauling a crumb?
      targetFoodId: null,      // if claiming a food item, its id
    });
  }

  return {
    queen: { x: NEST_X, y: NEST_Y },
    ants,
    food: [],                  // active food crumbs on the map
    foodStored: 0,             // crumbs delivered to the nest
    nextFoodId: 1,
    tick: 0,
  };
}
