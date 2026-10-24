// Little stats panel overlaid on the top-left of the canvas.

export default function HUD({ food, colony, eggs }) {
  return (
    <div className="hud">
      <div className="hud-row">
        <span className="hud-label">🍞 Food</span>
        <span className="hud-value">{food}</span>
      </div>
      <div className="hud-row">
        <span className="hud-label">🐜 Colony</span>
        <span className="hud-value">{colony}</span>
      </div>
      <div className="hud-row">
        <span className="hud-label">🥚 Eggs</span>
        <span className="hud-value">{eggs}</span>
      </div>
    </div>
  );
}
