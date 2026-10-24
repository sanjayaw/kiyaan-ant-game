import { createInitialState } from './state.js';
import { updateAnts } from './ants.js';
import { updateEggs } from './eggs.js';
import { updateChambers, findChamberSpot } from './chambers.js';
import { updateThreats, updateSpawner, initSpawner } from './combat.js';
import { drawFrame } from './render.js';
import {
  EGG_COST,
  NEST_X, NEST_Y, NEST_RADIUS,
  CASTES,
  CHAMBER_TYPES,
  CHAMBER_COST,
} from './constants.js';

export function startGame(canvas, onHudUpdate, onGameOver) {
  const ctx = canvas.getContext('2d');
  const state = createInitialState();
  initSpawner(state);
  let rafId;
  let lastHud = {};

  function emitHud() {
    const hud = {
      food: state.foodStored,
      colony: state.ants.length,
      eggs: state.eggs.length,
      time: Math.floor(state.tick / 60),
      queenHp: state.queen.hp,
      queenMaxHp: state.queen.maxHp,
      threats: state.threats.length,
      chambers: state.chambers.filter(c => c.state === 'active').length,
    };
    if (
      hud.food !== lastHud.food ||
      hud.colony !== lastHud.colony ||
      hud.eggs !== lastHud.eggs ||
      hud.time !== lastHud.time ||
      hud.queenHp !== lastHud.queenHp ||
      hud.threats !== lastHud.threats ||
      hud.chambers !== lastHud.chambers
    ) {
      lastHud = hud;
      if (onHudUpdate) onHudUpdate(hud);
    }
  }

  function updateStats() {
    if (state.ants.length > state.stats.peakColony) {
      state.stats.peakColony = state.ants.length;
    }
  }

  function checkGameOver() {
    if (state.gameOver) return true;
    if (state.queen.hp <= 0) {
      state.gameOver = {
        timeSec: Math.floor(state.tick / 60),
        peakColony: state.stats.peakColony,
        eggsLaid: state.stats.eggsLaid,
        threatsKilled: state.stats.threatsKilled,
      };
      if (onGameOver) onGameOver(state.gameOver);
      return true;
    }
    return false;
  }

  function loop() {
    state.tick++;
    updateAnts(state);
    updateEggs(state);
    updateChambers(state);
    updateSpawner(state);
    updateThreats(state);
    updateStats();
    drawFrame(ctx, state);
    emitHud();
    if (checkGameOver()) {
      cancelAnimationFrame(rafId);
      return;
    }
    rafId = requestAnimationFrame(loop);
  }
  loop();

  return {
    stop: () => cancelAnimationFrame(rafId),

    dropFood: (x, y) => {
      if (state.gameOver) return;
      state.food.push({
        id: state.nextFoodId++, x, y, claimedBy: null,
      });
    },

    layEgg: (caste) => {
      if (state.gameOver) return false;
      if (!CASTES.includes(caste)) return false;
      if (state.foodStored < EGG_COST) return false;
      state.foodStored -= EGG_COST;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * NEST_RADIUS * 0.4;
      state.eggs.push({
        id: state.nextEggId++,
        x: NEST_X + Math.cos(angle) * r,
        y: NEST_Y + Math.sin(angle) * r,
        caste,
        layTick: state.tick,
      });
      state.stats.eggsLaid += 1;
      return true;
    },

    digChamber: (type) => {
      if (state.gameOver) return false;
      if (!CHAMBER_TYPES.includes(type)) return false;
      if (state.foodStored < CHAMBER_COST) return false;
      const spot = findChamberSpot(state);
      if (!spot) return false; // no room -- don't charge
      state.foodStored -= CHAMBER_COST;
      state.chambers.push({
        id: state.nextChamberId++,
        type,
        x: spot.x,
        y: spot.y,
        state: 'building',
        layTick: state.tick,
      });
      return true;
    },
  };
}
