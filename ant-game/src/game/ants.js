import {
  ANT_SPEED,
  FORAGER_SPEED,
  NEST_X, NEST_Y, NEST_DEPOSIT_RADIUS,
  CANVAS_WIDTH, CANVAS_HEIGHT, EDGE_MARGIN,
  FOOD_PICKUP_DIST,
  SOLDIER_DAMAGE, SOLDIER_ENGAGE_RANGE,
  ATTACK_RANGE, ATTACK_COOLDOWN,
  WORKER_FLEE_RANGE,
  BARRACKS_DAMAGE_BONUS,
  NURSE_HEAL_RANGE, NURSE_HEAL_AMOUNT, NURSE_HEAL_COOLDOWN,
} from './constants.js';
import { activeChamberCount } from './chambers.js';

function speedFor(ant) {
  return ant.caste === 'forager' ? FORAGER_SPEED : ANT_SPEED;
}

function stepToward(ant, tx, ty) {
  const dx = tx - ant.x;
  const dy = ty - ant.y;
  const dist = Math.hypot(dx, dy);
  const s = speedFor(ant);
  if (dist > 0.01) ant.facingAngle = Math.atan2(dy, dx);
  if (dist < s) { ant.x = tx; ant.y = ty; return 0; }
  ant.x += (dx / dist) * s;
  ant.y += (dy / dist) * s;
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

function pickFoodForAnt(ant, food) {
  // Foragers scout: they prefer food that's FAR FROM THE NEST (so they
  // cover ground workers won't reach quickly). Everyone else grabs
  // whatever's closest to them.
  if (ant.caste === 'forager') {
    let best = null, bestDist = -1;
    for (const f of food) {
      if (f.claimedBy !== null) continue;
      const d = Math.hypot(f.x - NEST_X, f.y - NEST_Y);
      if (d > bestDist) { bestDist = d; best = f; }
    }
    return best;
  }
  let best = null, bestD = Infinity;
  for (const f of food) {
    if (f.claimedBy !== null) continue;
    const d = Math.hypot(f.x - ant.x, f.y - ant.y);
    if (d < bestD) { bestD = d; best = f; }
  }
  return best;
}

function findInjuredToHeal(state, nurse) {
  // Nearest damaged ally within NURSE_HEAL_RANGE. Checks all ants + the queen.
  let best = null, bestD = NURSE_HEAL_RANGE;
  function check(unit) {
    if (unit === nurse) return;
    if (unit.hp >= unit.maxHp) return;
    const d = Math.hypot(unit.x - nurse.x, unit.y - nurse.y);
    if (d < bestD) { bestD = d; best = unit; }
  }
  check(state.queen);
  for (const a of state.ants) check(a);
  return best;
}

export function updateAnts(state) {
  const soldierDamage = SOLDIER_DAMAGE + BARRACKS_DAMAGE_BONUS * activeChamberCount(state, 'barracks');
  const foodPerDeposit = 1 + activeChamberCount(state, 'foodstore');

  for (const ant of state.ants) {
    // SOLDIERS: engage threats, else patrol
    if (ant.caste === 'soldier') {
      const near = findNearest(state.threats, ant);
      if (near && near.dist < SOLDIER_ENGAGE_RANGE) {
        const t = near.item;
        ant.targetX = t.x;
        ant.targetY = t.y;
        if (near.dist < ATTACK_RANGE) {
          if (state.tick >= ant.nextAttackTick) {
              t.hp -= soldierDamage;
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

    // NON-SOLDIERS: flee threats within range (safety first)
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

    // NURSES: heal damaged allies before anything else
    if (ant.caste === 'nurse') {
      const injured = findInjuredToHeal(state, ant);
      if (injured) {
        const d = Math.hypot(injured.x - ant.x, injured.y - ant.y);
        if (d < ATTACK_RANGE) {
          if (state.tick >= ant.nextAttackTick) {
            injured.hp = Math.min(injured.maxHp, injured.hp + NURSE_HEAL_AMOUNT);
            ant.nextAttackTick = state.tick + NURSE_HEAL_COOLDOWN;
          }
          const dx = injured.x - ant.x, dy = injured.y - ant.y;
          if (dx !== 0 || dy !== 0) ant.facingAngle = Math.atan2(dy, dx);
        } else {
          ant.targetX = injured.x;
          ant.targetY = injured.y;
          stepToward(ant, injured.x, injured.y);
        }
        continue;
      }
      // Nothing to heal -> fall through to food loop
    }

    // Food loop (shared by workers, nurses when idle, foragers)
    if (ant.carrying) {
      ant.targetX = NEST_X;
      ant.targetY = NEST_Y;
      stepToward(ant, NEST_X, NEST_Y);
      const d = Math.hypot(ant.x - NEST_X, ant.y - NEST_Y);
      if (d < NEST_DEPOSIT_RADIUS) {
        ant.carrying = false;
        state.foodStored += foodPerDeposit;
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

    const found = pickFoodForAnt(ant, state.food);
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

  // Clean up dead ants, release their food claims
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
