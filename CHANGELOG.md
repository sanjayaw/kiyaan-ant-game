# Changelog

All notable changes to the Ant Colony Game.

## [Unreleased]

### Phase 3 — Eggs + castes
- Right-side `CommandPanel` with four "Lay Egg" buttons (Worker / Soldier / Nurse / Forager)
- Egg economy: 3 food per egg, 10-second hatch (`EGG_COST`, `EGG_HATCH_TICKS`)
- Eggs render in the nest as cream ovals with a caste-colored dot
- Hatched ants spawn with their caste color (brown / red / white / yellow)
- HUD gained a `🥚 Eggs` row showing active incubations
- Engine exposes `layEgg(caste)` API; buttons disable when food < 3
- Castes share worker behavior for now (visual-only, per design)

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
