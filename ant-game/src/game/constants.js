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

  // Workers
  workerBody: '#a0522d',
  workerDark: '#7a3f20',
  antLeg: '#4a2814',

  // Food
  foodCrumb: '#f0e5c8',
  foodCrumbDark: '#c7b482',

  // Effects
  shadow: 'rgba(0, 0, 0, 0.35)',
};

export const STARTING_WORKERS = 5;
export const EDGE_MARGIN = 20;
