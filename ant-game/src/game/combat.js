// Enemy bugs: spawning, movement, attacks, death. All in one file.

import {
  CANVAS_WIDTH, CANVAS_HEIGHT,
  NEST_X, NEST_Y,
  ATTACK_RANGE, ATTACK_COOLDOWN,
  THREAT_STATS,
  THREAT_SPAWN_FIRST,
  THREAT_SPAWN_MIN_INTERVAL,
  THREAT_SPAWN_RAMP_PER_SPAWN,
  THREAT_SPAWN_INITIAL_INTERVAL,
} from './constants.js';

function allowedTypes(elapsedSec) {
  return Object.keys(THREAT_STATS)
    .filter(t => THREAT_STATS[t].unlockSec <= elapsedSec);
}

function spawnPosition() {
  const side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0: return { x: Math.random() * CANVAS_WIDTH, y: 0 };
    case 1: return { x: CANVAS_WIDTH, y: Math.random() * CANVAS_HEIGHT };
    case 2: return { x: Math.random() * CANVAS_WIDTH, y: CANVAS_HEIGHT };
    default: return { x: 0, y: Math.random() * CANVAS_HEIGHT };
  }
}

function makeThreat(id, type, x, y) {
  const stats = THREAT_STATS[type];
  return {
    id, type, x, y,
    targetX: NEST_X, targetY: NEST_Y,
    facingAngle: Math.atan2(NEST_Y - y, NEST_X - x),
    hp: stats.hp,
    maxHp: stats.hp,
    damage: stats.damage,
    speed: stats.speed,
    nextAttackTick: 0,
    phase: Math.random() * Math.PI * 2,
  };
}

export function initSpawner(state) {
  state.nextSpawnTick = THREAT_SPAWN_FIRST;
  state.spawnInterval = THREAT_SPAWN_INITIAL_INTERVAL;
}

export function updateSpawner(state) {
  if (state.tick < state.nextSpawnTick) return;

  const elapsedSec = state.tick / 60;
  const pool = allowedTypes(elapsedSec);
  const type = pool[Math.floor(Math.random() * pool.length)];
  const pos = spawnPosition();
  state.threats.push(makeThreat(state.nextThreatId++, type, pos.x, pos.y));

  if (type === 'rival' && Math.random() < 0.6) {
    const extras = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < extras; i++) {
      state.threats.push(makeThreat(
        state.nextThreatId++, 'rival',
        pos.x + (Math.random() - 0.5) * 20,
        pos.y + (Math.random() - 0.5) * 20,
      ));
    }
  }

  state.spawnInterval = Math.max(
    THREAT_SPAWN_MIN_INTERVAL,
    state.spawnInterval - THREAT_SPAWN_RAMP_PER_SPAWN,
  );
  state.nextSpawnTick = state.tick + state.spawnInterval;
}

function stepToward(entity, tx, ty, speed) {
  const dx = tx - entity.x;
  const dy = ty - entity.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 0.01) entity.facingAngle = Math.atan2(dy, dx);
  if (dist < speed) { entity.x = tx; entity.y = ty; return 0; }
  entity.x += (dx / dist) * speed;
  entity.y += (dy / dist) * speed;
  return dist;
}

function pickTarget(threat, state) {
  let bestD = Math.hypot(state.queen.x - threat.x, state.queen.y - threat.y);
  let best = state.queen;
  for (const ant of state.ants) {
    const d = Math.hypot(ant.x - threat.x, ant.y - threat.y);
    if (d < bestD) { bestD = d; best = ant; }
  }
  return { target: best, dist: bestD };
}

export function updateThreats(state) {
  for (const threat of state.threats) {
    const { target, dist } = pickTarget(threat, state);
    threat.targetX = target.x;
    threat.targetY = target.y;

    if (dist < ATTACK_RANGE) {
      if (state.tick >= threat.nextAttackTick) {
        target.hp -= threat.damage;
        threat.nextAttackTick = state.tick + ATTACK_COOLDOWN;
      }
      const dx = target.x - threat.x, dy = target.y - threat.y;
      if (dx !== 0 || dy !== 0) threat.facingAngle = Math.atan2(dy, dx);
    } else {
      stepToward(threat, target.x, target.y, threat.speed);
    }
  }

  const alive = [];
  for (const t of state.threats) {
    if (t.hp > 0) alive.push(t);
    else state.stats.threatsKilled += 1;
  }
  state.threats = alive;
}
