# Kiyaan's Ant Colony Game — Plan

A browser game where you are the Queen Ant and must survive by commanding your workers, soldiers, nurses, and foragers against bug threats.

Learning project for Kiyaan (11yo) — code should be readable, phases small, each phase visually testable in the browser.

## Tech

- **Frontend:** React 18 (functional components, hooks)
- **Rendering:** HTML5 Canvas (vanilla — no Pixi, no Phaser)
- **Build:** Vite
- **Deps:** React only. No state libraries, no game engines.
- **Hosting (eventual):** Static site — any CDN works. GitHub Pages or Netlify are free.

## File layout

```
ant-game/
  package.json
  index.html
  vite.config.js
  src/
    main.jsx
    App.jsx                 (mounts canvas + HUD)
    game/
      engine.js             (requestAnimationFrame game loop)
      state.js              (single mutable game-state object)
      ants.js               (per-caste behavior: wander, gather, attack, patrol)
      queen.js              (queen commands: lay egg, assign caste, order)
      threats.js            (bug AI)
      render.js             (draws everything)
      constants.js          (CANVAS_W, CANVAS_H, ANT_SPEED, COLORS, etc.)
    ui/
      HUD.jsx               (food counter, timer, colony size)
      CommandPanel.jsx      (buttons for queen commands)
```

## Castes (ant jobs)

| Caste | Color | Role |
|---|---|---|
| Worker | Brown | General labor — defaults to gathering food |
| Soldier | Red | Attacks threats, defends queen |
| Nurse | White | Tends eggs faster, feeds queen |
| Forager | Yellow | Scouts far, finds distant food fast |
| Queen | Gold (large) | You. Can't move. If she dies, game over. |

## Queen's commands

1. **Lay Egg** — costs food, produces an egg that hatches into a chosen caste
2. **Assign Caste** — change a selected ant's job
3. **Order: Gather** — selected ants gather food
4. **Order: Attack** — selected ants attack the nearest threat
5. **Order: Patrol** — selected ants roam near the nest
6. **Order: Return** — selected ants return to nest

## Threats (bugs)

| Bug | HP | Damage | Notes |
|---|---|---|---|
| Spider | 20 | 5 | Fast, targets lone ants |
| Beetle | 50 | 10 | Slow, tanky |
| Centipede | 35 | 7 | Multi-segment, hard to kill |
| Rival Ant | 15 | 4 | Spawns in groups |
| Wasp | 25 | 12 | Flies — ignores obstacles |

Threats spawn more often as the game progresses.

## Phases

1. **Canvas + Queen + wandering workers** — ants crawl around the nest
2. **Food + gather loop** — click to drop food, workers gather it
3. **Jobs + command panel** — buttons to lay eggs, assign castes
4. **Threats + combat** — bugs attack, soldiers defend
5. **Colony expansion** — dig chambers for bonuses
6. **HUD + game over + polish** — score, start/restart screens

## Branching

- `main` — stable, playable builds only
- `feature/phase-N-...` — one branch per phase
- Merge to main only after Kiyaan confirms the phase works in the browser.

## Current status

**Phases 1-4 shipped to `main`.** Game is now a playable survival loop: queen, 4 castes, food gather, 5 bug types with escalating spawns, auto-combat, HP bars, game over + restart. Phase 5 (colony expansion / chambers) in progress on `feature/phase-5-colony-expansion`.

### Phase 5 design decisions (locked)
- Three chamber types: **Nursery, Food Store, Barracks**
- Cost: **10 food each**; build time: **15 seconds**; chambers **stack** (multiple of same type compound their bonuses)
- Placement: **random spot adjacent to the nest** (no click-to-place UI yet)
- Bonuses:
  - **Nursery** — each one halves egg hatch time (minimum 2s)
  - **Food Store** — each one adds +1 to food gained per worker deposit
  - **Barracks** — each one adds +2 to soldier attack damage
