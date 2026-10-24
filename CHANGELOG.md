# Changelog

All notable changes to the Ant Colony Game.

## [Unreleased]

### Phase 5 — Colony expansion + distinct caste behaviors
- Three chamber types: Nursery, Food Store, Barracks (10 food, 15s build, stacking)
- Chambers placed at random free spots adjacent to the nest; dirt tunnels connect each one to the main nest
- Nursery halves egg hatch time per chamber (floor 2s); Food Store adds +1 to food per deposit; Barracks adds +2 to soldier damage
- CommandPanel now has two sections: Lay Egg + Dig Chamber, split by a divider
- HUD payload includes active chamber count
- Procedural chamber renderer with "under construction" state (dashed outline + progressive fill) and "active" state (dirt rim + colored accent + per-type icon: egg / crumbs / crossed X)
- **Caste behavior divergence** (bonus pass):
  - Foragers move 40% faster and prefer food farthest from the nest (true scouting)
  - Nurses heal damaged ants + queen within range (1 HP every 0.5s); fall back to food gathering when nothing is injured

### Phase 4 — Threats + combat
- Five enemy bug types: Spider, Beetle, Centipede, Rival Ant, Wasp — each with distinct HP / damage / speed / unlock time
- Escalating spawn pacing: first bug at 20s, interval shrinks by 1s per spawn, floored at 5s
- Later bugs unlock at 60s (beetle) and 120s (centipede + wasp); rival ants spawn in groups of 2-3
- Automatic combat: soldiers auto-engage threats within 150px, workers/foragers/nurses flee threats within 50px
- HP system for ants, queen, and threats; damaged units show a red/green bar overhead
- Queen HP bar in the HUD plus Time and Threats rows
- Game Over overlay (dark + red border) with stats: time survived, peak colony, eggs laid, threats defeated
- Restart via React key remount — fully fresh state, no leftover entities
- All five bugs rendered procedurally: spider has 8 animated legs + red eyes, beetle has elytra seam + mandibles, centipede has 6 wiggling segments, wasp has translucent flapping wings + stinger, rival is a dark-red ant variant

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
