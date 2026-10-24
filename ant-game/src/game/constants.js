export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const NEST_X = CANVAS_WIDTH / 2;
export const NEST_Y = CANVAS_HEIGHT / 2;
export const NEST_RADIUS = 70;
export const NEST_DEPOSIT_RADIUS = NEST_RADIUS * 0.55;

export const ANT_SPEED = 0.5;
export const FORAGER_SPEED = 0.7; // 40% faster than other ants
export const LEG_LENGTH = 4;
export const FOOD_PICKUP_DIST = 3;

export const EGG_COST = 3;
export const EGG_HATCH_TICKS = 600;
export const EGG_HATCH_FLOOR = 120;

export const CASTES = ['worker', 'soldier', 'nurse', 'forager'];
export const CASTE_LABELS = {
  worker: 'Worker', soldier: 'Soldier', nurse: 'Nurse', forager: 'Forager',
};

// --- Chambers ---
export const CHAMBER_TYPES = ['nursery', 'foodstore', 'barracks'];
export const CHAMBER_LABELS = {
  nursery: 'Nursery', foodstore: 'Food Store', barracks: 'Barracks',
};
export const CHAMBER_COST = 10;
export const CHAMBER_BUILD_TICKS = 900;
export const CHAMBER_RADIUS = 25;
export const CHAMBER_PLACEMENT_RING = 135;
export const CHAMBER_SPACING = 60;
export const BARRACKS_DAMAGE_BONUS = 2;

// --- Health & combat ---
export const QUEEN_MAX_HP = 100;
export const ANT_MAX_HP = {
  worker: 10, nurse: 10, forager: 10, soldier: 25,
};
export const SOLDIER_DAMAGE = 5;
export const SOLDIER_ENGAGE_RANGE = 150;
export const ATTACK_RANGE = 10;
export const ATTACK_COOLDOWN = 60;
export const WORKER_FLEE_RANGE = 50;

// --- Nurse healing ---
export const NURSE_HEAL_RANGE = 100;
export const NURSE_HEAL_AMOUNT = 1;
export const NURSE_HEAL_COOLDOWN = 30; // ~0.5s between heals

// --- Threat spawning ---
export const THREAT_SPAWN_FIRST = 1200;
export const THREAT_SPAWN_MIN_INTERVAL = 300;
export const THREAT_SPAWN_RAMP_PER_SPAWN = 60;
export const THREAT_SPAWN_INITIAL_INTERVAL = 1200;

export const THREAT_STATS = {
  spider:    { hp: 20, damage: 3, speed: 0.7, unlockSec: 0 },
  rival:     { hp: 15, damage: 2, speed: 0.5, unlockSec: 0 },
  beetle:    { hp: 50, damage: 6, speed: 0.3, unlockSec: 60 },
  centipede: { hp: 35, damage: 4, speed: 0.5, unlockSec: 120 },
  wasp:      { hp: 25, damage: 5, speed: 0.8, unlockSec: 120 },
};

export const COLORS = {
  soil: '#2d1810', soilNoiseLight: '#3a2016', soilNoiseDark: '#231007',
  pebble: '#4a3826', pebbleHighlight: '#6b5438',

  nestOuter: '#6a4428', nestMid: '#5a3a22', nestInner: '#3f2817',
  nestEntrance: '#1a0d05',

  queenBody: '#f5c842', queenDark: '#c8991b', queenCrown: '#fff0a8',

  workerBody:  '#a0522d', workerDark:  '#7a3f20',
  soldierBody: '#c53030', soldierDark: '#8f1f1f',
  nurseBody:   '#e5e5dc', nurseDark:   '#b8b8ad',
  foragerBody: '#d4a017', foragerDark: '#9b7510',
  antLeg: '#4a2814',

  foodCrumb: '#f0e5c8', foodCrumbDark: '#c7b482',
  eggShell: '#f3ead3', eggShellDark: '#c9bf9d',

  spiderBody: '#1a1a1a', spiderDark: '#000',
  beetleBody: '#2a2a1a', beetleShell: '#454528', beetleHighlight: '#6b6b3a',
  centipedeBody: '#9b4b7a', centipedeDark: '#6a2e52',
  rivalBody: '#4a0000', rivalDark: '#2a0000',
  waspBody: '#f4c430', waspStripe: '#1a1a1a', waspWing: 'rgba(230, 230, 240, 0.55)',

  chamberOuter: '#6a4428',
  chamberMid: '#5a3a22',
  chamberBuildingFill: 'rgba(90, 58, 34, 0.4)',
  chamberBuildingOutline: 'rgba(240, 200, 100, 0.6)',
  nurseryAccent: '#e5e5dc',
  foodstoreAccent: '#f0e5c8',
  barracksAccent: '#c53030',
  tunnel: '#1a0d05',

  hpGreen: '#2a9d2a', hpRed: '#8b0000', hpBg: '#000',

  shadow: 'rgba(0, 0, 0, 0.35)',
};

export const STARTING_WORKERS = 5;
export const EDGE_MARGIN = 20;
