import {
  ANT_SPEED,
  NEST_X, NEST_Y, NEST_DEPOSIT_RADIUS,
  CANVAS_WIDTH, CANVAS_HEIGHT, EDGE_MARGIN,
  FOOD_PICKUP_DIST,
  SOLDIER_DAMAGE, SOLDIER_ENGAGE_RANGE,
  ATTACK_RANGE, ATTACK_COOLDOWN,
  WORKER_FLEE_RANGE,
} from './constants.js';

function stepToward(ant, tx, ty, speed = ANT_SPEED) {
  const dx = tx - ant.x;
  const dy = ty - ant.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 0.01) ant.facingAngle = Math.atan2(dy, dx);
  if (dist < speed) { ant.x = tx; ant.y = ty; return 0; }
  ant.x += (dx / dist) * speed;
  ant.y += (dy / dist) * speed;
  return dist;
}

function newWanderTarget(ant) {
  ant.targetX = EDGE_MARGIN + Math.random() * (CANVAS_WIDTH - EDGE_MARGIN * 2);
  ant.targetY = EDGE_MARGIN + Math.random() * (CANVAS_HEIGHT - EDGE_MARGIN * 2);
}

function findNearest(items, from) {
  let nearest = null, best = Infinity;
  for (const it of items) {
    const d = Math.hypot(it.x - from.x, it.y - from.y);
    if (d < best) { best = d; nearest = it; }
  }
  return nearest ? { item: nearest, dist: best } : null;
}

function findNearestUnclaimedFood(ant, food) {
  let nearest = null, best = Infinity;
  for (const f of food) {
    if (f.claimedBy !== null) continue;
    const d = Math.hypot(f.x - ant.x, f.y - ant.y);
    if (d < best) { best = d; nearest = f; }
  }
  return nearest;
}

export function updateAnts(state) {
  for (const ant of state.ants) {
    // SOLDIERS: engage nearest threat, otherwise patrol
    if (ant.caste === 'soldier') {
      const near = findNearest(state.threats, ant);
      if (near && near.dist < SOLDIER_ENGAGE_RANGE) {
        const t = near.item;
        ant.targetX = t.x;
        ant.targetY = t.y;
        if (near.dist < ATTACK_RANGE) {
          if (state.tick >= ant.nextAttackTick) {
            t.hp -= SOLDIER_DAMAGE;
            ant.nextAttackTick = state.tick + ATTACK_COOLDOWN;
          }
          const dx = t.x - ant.x, dy = t.y - ant.y;
          if (dx !== 0 || dy !== 0) ant.facingAngle = Math.atan2(dy, dx);
        } else {
          stepToward(ant, t.x, t.y);
        }
        continue;
      }
      const dx = ant.targetX - ant.x;
      const dy = ant.targetY - ant.y;
      if (Math.hypot(dx, dy) < 2) newWanderTarget(ant);
      else stepToward(ant, ant.targetX, ant.targetY);
      continue;
    }

    // NON-SOLDIERS: flee threats within range
    const scare = findNearest(state.threats, ant);
    if (scare && scare.dist < WORKER_FLEE_RANGE) {
      const t = scare.item;
      const dx = ant.x - t.x;
      const dy = ant.y - t.y;
      const d = Math.hypot(dx, dy) || 1;
      ant.targetX = Math.max(EDGE_MARGIN, Math.min(CANVAS_WIDTH - EDGE_MARGIN,
        ant.x + (dx / d) * 60));
      ant.targetY = Math.max(EDGE_MARGIN, Math.min(CANVAS_HEIGHT - EDGE_MARGIN,
        ant.y + (dy / d) * 60));
      stepToward(ant, ant.targetX, ant.targetY);
      ant.fleeing = true;
      continue;
    }
    ant.fleeing = false;

    // Food loop
    if (ant.carrying) {
      ant.targetX = NEST_X;
      ant.targetY = NEST_Y;
      stepToward(ant, NEST_X, NEST_Y);
      const d = Math.hypot(ant.x - NEST_X, ant.y - NEST_Y);
      if (d < NEST_DEPOSIT_RADIUS) {
        ant.carrying = false;
        state.foodStored += 1;
        newWanderTarget(ant);
      }
      continue;
    }

    if (ant.targetFoodId !== null) {
      const food = state.food.find(f => f.id === ant.targetFoodId);
      if (!food) {
        ant.targetFoodId = null;
        newWanderTarget(ant);
        continue;
      }
      ant.targetX = food.x;
      ant.targetY = food.y;
      stepToward(ant, food.x, food.y);
      const d = Math.hypot(ant.x - food.x, ant.y - food.y);
      if (d < FOOD_PICKUP_DIST) {
        state.food = state.food.filter(f => f.id !== food.id);
        ant.carrying = true;
        ant.targetFoodId = null;
      }
      continue;
    }

    const found = findNearestUnclaimedFood(ant, state.food);
    if (found) {
      found.claimedBy = ant.id;
      ant.targetFoodId = found.id;
      continue;
    }

    const dx = ant.targetX - ant.x;
    const dy = ant.targetY - ant.y;
    if (Math.hypot(dx, dy) < 2) newWanderTarget(ant);
    else stepToward(ant, ant.targetX, ant.targetY);
  }

  // Remove dead ants, free their food claims
  const alive = [];
  for (const ant of state.ants) {
    if (ant.hp > 0) {
      alive.push(ant);
    } else if (ant.targetFoodId !== null) {
      const f = state.food.find(ff => ff.id === ant.targetFoodId);
      if (f) f.claimedBy = null;
    }
  }
  state.ants = alive;
}
