// All the numbers and colors the game uses.

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const NEST_X = CANVAS_WIDTH / 2;
export const NEST_Y = CANVAS_HEIGHT / 2;
export const NEST_RADIUS = 70;
export const NEST_DEPOSIT_RADIUS = NEST_RADIUS * 0.55;

export const ANT_SPEED = 0.5;
export const LEG_LENGTH = 4;
export const FOOD_PICKUP_DIST = 3;

// Egg economy
export const EGG_COST = 3;              // food crumbs per egg
export const EGG_HATCH_TICKS = 600;     // ~10 seconds at 60fps

export const CASTES = ['worker', 'soldier', 'nurse', 'forager'];
export const CASTE_LABELS = {
  worker:  'Worker',
  soldier: 'Soldier',
  nurse:   'Nurse',
  forager: 'Forager',
};

export const COLORS = {
  // Ground
  soil: '#2d1810',
  soilNoiseLight: '#3a2016',
  soilNoiseDark: '#231007',
  pebble: '#4a3826',
  pebbleHighlight: '#6b5438',

  // Nest
  nestOuter: '#6a4428',
  nestMid: '#5a3a22',
  nestInner: '#3f2817',
  nestEntrance: '#1a0d05',

  // Queen
  queenBody: '#f5c842',
  queenDark: '#c8991b',
  queenCrown: '#fff0a8',

  // Castes (each has a bright body + a darker abdomen shade)
  workerBody:  '#a0522d', workerDark:  '#7a3f20',
  soldierBody: '#c53030', soldierDark: '#8f1f1f',
  nurseBody:   '#e5e5dc', nurseDark:   '#b8b8ad',
  foragerBody: '#d4a017', foragerDark: '#9b7510',

  // Legs (shared)
  antLeg: '#4a2814',

  // Food
  foodCrumb: '#f0e5c8',
  foodCrumbDark: '#c7b482',

  // Eggs
  eggShell: '#f3ead3',
  eggShellDark: '#c9bf9d',

  // Effects
  shadow: 'rgba(0, 0, 0, 0.35)',
};

export const STARTING_WORKERS = 5;
export const EDGE_MARGIN = 20;
