// Right-side command panel with two sections:
//   1. Lay Egg (per caste)
//   2. Dig Chamber (per chamber type)
// Buttons disable when the colony can't afford them.

import {
  CASTES, CASTE_LABELS, EGG_COST,
  CHAMBER_TYPES, CHAMBER_LABELS, CHAMBER_COST,
  COLORS,
} from '../game/constants.js';

const CASTE_SWATCH = {
  worker:  COLORS.workerBody,
  soldier: COLORS.soldierBody,
  nurse:   COLORS.nurseBody,
  forager: COLORS.foragerBody,
};

const CHAMBER_SWATCH = {
  nursery:   COLORS.nurseryAccent,
  foodstore: COLORS.foodstoreAccent,
  barracks:  COLORS.barracksAccent,
};

export default function CommandPanel({ food, onLayEgg, onDigChamber }) {
  const canEgg = food >= EGG_COST;
  const canDig = food >= CHAMBER_COST;

  return (
    <div className="command-panel">
      <div className="panel-section">
        <h3 className="panel-title">Lay Egg</h3>
        <p className="panel-subtitle">Cost: {EGG_COST} 🍞 each</p>
        {CASTES.map((caste) => (
          <button
            key={caste}
            className="egg-button"
            disabled={!canEgg}
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

      <div className="panel-section">
        <h3 className="panel-title">Dig Chamber</h3>
        <p className="panel-subtitle">Cost: {CHAMBER_COST} 🍞, 15s build</p>
        {CHAMBER_TYPES.map((type) => (
          <button
            key={type}
            className="egg-button"
            disabled={!canDig}
            onClick={() => onDigChamber(type)}
          >
            <span
              className="egg-swatch"
              style={{ background: CHAMBER_SWATCH[type] }}
            />
            <span className="egg-label">{CHAMBER_LABELS[type]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
