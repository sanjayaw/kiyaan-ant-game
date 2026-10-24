export default function HUD({ food, colony, eggs, time, queenHp, queenMaxHp, threats }) {
  const mm = Math.floor(time / 60);
  const ss = (time % 60).toString().padStart(2, '0');
  const hpPct = queenMaxHp ? Math.max(0, (queenHp / queenMaxHp) * 100) : 100;

  return (
    <div className="hud">
      <div className="hud-row"><span className="hud-label">⏱ Time</span><span className="hud-value">{mm}:{ss}</span></div>
      <div className="hud-row"><span className="hud-label">🍞 Food</span><span className="hud-value">{food}</span></div>
      <div className="hud-row"><span className="hud-label">🐜 Colony</span><span className="hud-value">{colony}</span></div>
      <div className="hud-row"><span className="hud-label">🥚 Eggs</span><span className="hud-value">{eggs}</span></div>
      <div className="hud-row"><span className="hud-label">🕷 Threats</span><span className="hud-value">{threats}</span></div>
      <div className="hud-queen">
        <span className="hud-label">👑 Queen</span>
        <div className="hud-queen-bar">
          <div className="hud-queen-fill" style={{ width: `${hpPct}%` }} />
        </div>
      </div>
    </div>
  );
}
