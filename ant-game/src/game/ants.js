// Worker ant behavior. Each frame, every ant does ONE of these:
//   1. If carrying food, head to the nest. Drop it when close enough.
//   2. If claiming a food item, head to it. Pick it up when close enough.
//   3. Otherwise look for the nearest unclaimed crumb to claim.
//   4. If none, keep wandering to a random spot.

import {
  ANT_SPEED,
  NEST_X,
  NEST_Y,
  NEST_DEPOSIT_RADIUS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  EDGE_MARGIN,
  FOOD_PICKUP_DIST,
} from './constants.js';

function stepToward(ant, tx, ty) {
  const dx = tx - ant.x;
  const dy = ty - ant.y;
  const dist = Math.hypot(dx, dy);

  // Only update facing when actually moving, so a stopped ant doesn't spin.
  if (dist > 0.01) {
    ant.facingAngle = Math.atan2(dy, dx);
  }

  if (dist < ANT_SPEED) {
    ant.x = tx;
    ant.y = ty;
    return 0;
  }
  ant.x += (dx / dist) * ANT_SPEED;
  ant.y += (dy / dist) * ANT_SPEED;
  return dist;
}

function newWanderTarget(ant) {
  ant.targetX = EDGE_MARGIN + Math.random() * (CANVAS_WIDTH - EDGE_MARGIN * 2);
  ant.targetY = EDGE_MARGIN + Math.random() * (CANVAS_HEIGHT - EDGE_MARGIN * 2);
}

function findNearestUnclaimedFood(ant, foodList) {
  let nearest = null;
  let best = Infinity;
  for (const f of foodList) {
    if (f.claimedBy !== null) continue;
    const d = Math.hypot(f.x - ant.x, f.y - ant.y);
    if (d < best) {
      best = d;
      nearest = f;
    }
  }
  return nearest;
}

export function updateAnts(state) {
  for (const ant of state.ants) {
    // 1. Carrying food -> go home.
    if (ant.carrying) {
      ant.targetX = NEST_X;
      ant.targetY = NEST_Y;
      stepToward(ant, NEST_X, NEST_Y);
      const distToNest = Math.hypot(ant.x - NEST_X, ant.y - NEST_Y);
      if (distToNest < NEST_DEPOSIT_RADIUS) {
        ant.carrying = false;
        state.foodStored += 1;
        newWanderTarget(ant);
      }
      continue;
    }

    // 2. Claimed a specific food item -> go pick it up.
    if (ant.targetFoodId !== null) {
      const food = state.food.find(f => f.id === ant.targetFoodId);
      if (!food) {
        // Food vanished (edge case). Reset.
        ant.targetFoodId = null;
        newWanderTarget(ant);
        continue;
      }
      ant.targetX = food.x;
      ant.targetY = food.y;
      stepToward(ant, food.x, food.y);
      const d = Math.hypot(ant.x - food.x, ant.y - food.y);
      if (d < FOOD_PICKUP_DIST) {
        // Pick up: remove from map, start carrying.
        state.food = state.food.filter(f => f.id !== food.id);
        ant.carrying = true;
        ant.targetFoodId = null;
      }
      continue;
    }

    // 3. Free worker. Any unclaimed food around? Claim it.
    const found = findNearestUnclaimedFood(ant, state.food);
    if (found) {
      found.claimedBy = ant.id;
      ant.targetFoodId = found.id;
      continue;
    }

    // 4. Nothing to do -- wander.
    const dx = ant.targetX - ant.x;
    const dy = ant.targetY - ant.y;
    if (Math.hypot(dx, dy) < 2) {
      newWanderTarget(ant);
    } else {
      stepToward(ant, ant.targetX, ant.targetY);
    }
  }
}
