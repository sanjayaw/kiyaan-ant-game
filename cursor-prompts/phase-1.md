# Cursor Prompt — Phase 1: Canvas + Queen + Wandering Workers

Hi Cursor! This is Phase 1 of a browser game called "Ant Colony" that an 11-year-old is building. **Write code that is simple and easy to read — he is learning.** Prefer clear variable names, short functions, and inline comments explaining the *why* on non-obvious lines.

## Goal of Phase 1

A running web app that shows a brown nest in the middle of the screen, a big gold Queen Ant in the nest, and 5 small brown Worker Ants wandering around randomly. The game loop runs at 60fps. **Nothing else yet.** No food, no threats, no UI buttons.

## Tech constraints (do not deviate)

- **Framework:** React 18 + Vite. JavaScript, not TypeScript.
- **Rendering:** Plain HTML5 Canvas 2D. No Pixi, no Phaser, no Three.js.
- **Dependencies:** React, ReactDOM, Vite. Nothing else.
- **Styling:** Plain CSS in `src/index.css`. No Tailwind, no CSS-in-JS.

## Files to create

```
ant-game/
  package.json
  index.html
  vite.config.js
  src/
    main.jsx
    App.jsx
    index.css
    game/
      constants.js
      state.js
      ants.js
      engine.js
      render.js
```

### `package.json`
Standard Vite + React setup. Scripts: `dev`, `build`, `preview`.

### `index.html`
Standard Vite index with `<div id="root"></div>` and `<script type="module" src="/src/main.jsx">`.

### `src/main.jsx`
Mount `<App />` to `#root` with React 18's `createRoot`.

### `src/App.jsx`
A single component that:
- Renders a `<canvas>` element with `ref`, sized to `CANVAS_WIDTH` × `CANVAS_HEIGHT` from constants.
- On mount (useEffect), calls `startGame(canvas)` from `engine.js`.
- On unmount, calls the returned stop function to cancel the animation frame.

### `src/game/constants.js`
Export these constants:
```js
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const NEST_X = CANVAS_WIDTH / 2;
export const NEST_Y = CANVAS_HEIGHT / 2;
export const NEST_RADIUS = 60;
export const ANT_SPEED = 0.5;         // pixels per frame
export const WORKER_RADIUS = 4;
export const QUEEN_RADIUS = 12;
export const COLORS = {
  background: '#2d1810',   // dark soil
  nest: '#5a3a22',         // lighter dirt
  queen: '#f5c842',        // gold
  worker: '#a0522d',       // brown
};
export const STARTING_WORKERS = 5;
```

### `src/game/state.js`
Export a factory function `createInitialState()` that returns a fresh game-state object:
```js
{
  queen: { x: NEST_X, y: NEST_Y },
  ants: [ /* 5 workers, each with { id, caste: 'worker', x, y, targetX, targetY } */ ],
  tick: 0,
}
```
Workers should start inside the nest circle (random position within NEST_RADIUS of nest center).

### `src/game/ants.js`
Export `updateAnts(state)` that moves each ant toward its `targetX`/`targetY`. If an ant reaches its target (within 2 pixels), pick a new random target somewhere in the canvas. Ants should also roughly stay away from the far edges (keep targets at least 20px from edges).

Movement: compute `dx = targetX - x`, `dy = targetY - y`, normalize, multiply by `ANT_SPEED`.

### `src/game/render.js`
Export `drawFrame(ctx, state)` that:
1. Fills the whole canvas with `COLORS.background`.
2. Draws the nest as a filled circle at `(NEST_X, NEST_Y)` with `NEST_RADIUS`, color `COLORS.nest`.
3. Draws each worker ant as a filled circle (`WORKER_RADIUS`, `COLORS.worker`).
4. Draws the queen as a filled circle (`QUEEN_RADIUS`, `COLORS.queen`). Draw last so she's on top.

### `src/game/engine.js`
Export `startGame(canvas)`:
```js
export function startGame(canvas) {
  const ctx = canvas.getContext('2d');
  const state = createInitialState();
  let rafId;

  function loop() {
    state.tick++;
    updateAnts(state);
    drawFrame(ctx, state);
    rafId = requestAnimationFrame(loop);
  }
  loop();

  return () => cancelAnimationFrame(rafId);
}
```

### `src/index.css`
Center the canvas on the page. Dark page background. Nothing fancy.

## How Kiyaan will test Phase 1

1. `cd ant-game && npm install && npm run dev`
2. Open the browser URL Vite prints.
3. Should see: dark brown screen, a lighter brown circle in the middle (the nest), one big gold circle (the queen) in the nest, and 5 small brown circles (workers) wandering around.
4. Workers should move smoothly, not teleport.
5. Workers can walk outside the nest — that's fine for Phase 1.

## Status report

When you finish, return a short status report with:
1. Confirmation of each file created
2. Any decisions you made that weren't in this prompt
3. Any warnings or errors from `npm install` or `npm run dev`
4. A list of anything you deliberately left out and why

Do **not** add food, threats, UI buttons, or anything from Phase 2–6. Keep this scope tight.
