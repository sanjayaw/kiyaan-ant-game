import {
  NEST_X, NEST_Y, NEST_RADIUS,
  STARTING_WORKERS,
  CANVAS_WIDTH, CANVAS_HEIGHT, EDGE_MARGIN,
  ANT_MAX_HP, QUEEN_MAX_HP,
} from './constants.js';

function randomPointInNest() {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * NEST_RADIUS * 0.7;
  return { x: NEST_X + Math.cos(angle) * r, y: NEST_Y + Math.sin(angle) * r };
}

function randomTarget() {
  return {
    x: EDGE_MARGIN + Math.random() * (CANVAS_WIDTH - EDGE_MARGIN * 2),
    y: EDGE_MARGIN + Math.random() * (CANVAS_HEIGHT - EDGE_MARGIN * 2),
  };
}

export function makeAnt({ id, caste, x, y, targetX, targetY }) {
  const maxHp = ANT_MAX_HP[caste] ?? 10;
  return {
    id, caste, x, y, targetX, targetY,
    facingAngle: 0,
    legPhase: Math.random() * Math.PI * 2,
    carrying: false,
    targetFoodId: null,
    hp: maxHp,
    maxHp,
    nextAttackTick: 0,
    fleeing: false,
  };
}

export function createInitialState() {
  const ants = [];
  for (let i = 0; i < STARTING_WORKERS; i++) {
    const start = randomPointInNest();
    const target = randomTarget();
    ants.push(makeAnt({
      id: i, caste: 'worker',
      x: start.x, y: start.y,
      targetX: target.x, targetY: target.y,
    }));
  }

  return {
    queen: { x: NEST_X, y: NEST_Y, hp: QUEEN_MAX_HP, maxHp: QUEEN_MAX_HP },
    ants,
    eggs: [],
    food: [],
    threats: [],
    chambers: [],
    foodStored: 0,
    nextAntId: STARTING_WORKERS,
    nextEggId: 1,
    nextFoodId: 1,
    nextThreatId: 1,
    nextChamberId: 1,
    nextSpawnTick: null,
    spawnInterval: null,
    tick: 0,
    stats: {
      peakColony: STARTING_WORKERS,
      eggsLaid: 0,
      threatsKilled: 0,
    },
    gameOver: null,
  };
}
