# Changelog

All notable changes to the Ant Colony Game.

## [Unreleased]

### Phase 2 — Food + gather loop
- Left-click anywhere to drop food crumbs
- Workers claim the nearest unclaimed crumb, haul it to the nest, deposit it
- Food is visibly carried on the ant's back during transport
- HUD overlay shows live `Food` and `Colony` counts
- Engine now exposes a `dropFood(x, y)` API and `onHudUpdate` callback

### Phase 1.5 — Visual pass (procedural canvas sprites)
- Ants rendered with head/thorax/abdomen, antennae, 6 animated legs (tripod gait)
- Each ant has a randomized leg phase so the colony isn't in lockstep
- Direction-aware rendering: ants rotate to face their target
- Queen enlarged with a crown mark and subtle breathing animation
- Nest redrawn as layered dirt mound with 5 tunnel entrances
- Soil textured with 400 noise speckles + scattered pebbles

### Phase 1 — Canvas + Queen + wandering workers
- Vite + React scaffold with HTML5 Canvas rendering
- 60fps `requestAnimationFrame` game loop
- Starter state: queen + 5 workers wandering inside/outside the nest
- Modular `game/` folder: engine, state, ants, render, constants

### Phase 0 — Project kickoff
- Plan.md with 6-phase roadmap
- Public GitHub repo: sanjayaw/kiyaan-ant-game
