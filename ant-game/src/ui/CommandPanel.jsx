// Right-side command panel. One button per caste. Each costs EGG_COST food.
// Buttons disable when the colony can't afford another egg.

import { CASTES, CASTE_LABELS, EGG_COST, COLORS } from '../game/constants.js';

const CASTE_SWATCH = {
  worker:  COLORS.workerBody,
  soldier: COLORS.soldierBody,
  nurse:   COLORS.nurseBody,
  forager: COLORS.foragerBody,
};

export default function CommandPanel({ food, onLayEgg }) {
  const canAfford = food >= EGG_COST;

  return (
    <div className="command-panel">
      <h3 className="panel-title">Lay Egg</h3>
      <p className="panel-subtitle">Cost: {EGG_COST} 🍞 each</p>
      {CASTES.map((caste) => (
        <button
          key={caste}
          className="egg-button"
          disabled={!canAfford}
          onClick={() => onLayEgg(caste)}
        >
          <span
            className="egg-swatch"
            style={{ background: CASTE_SWATCH[caste] }}
          />
          <span className="egg-label">{CASTE_LABELS[caste]}</span>
        </button>
      ))}
    </div>
  );
}
