export default function GameOver({ stats, onRestart }) {
  const mm = Math.floor(stats.timeSec / 60);
  const ss = (stats.timeSec % 60).toString().padStart(2, '0');

  return (
    <div className="game-over">
      <div className="game-over-card">
        <h2>Colony lost!</h2>
        <p className="game-over-sub">Your queen has fallen.</p>
        <dl className="game-over-stats">
          <dt>Time survived</dt><dd>{mm}:{ss}</dd>
          <dt>Peak colony size</dt><dd>{stats.peakColony}</dd>
          <dt>Eggs laid</dt><dd>{stats.eggsLaid}</dd>
          <dt>Threats defeated</dt><dd>{stats.threatsKilled}</dd>
        </dl>
        <button className="restart-btn" onClick={onRestart}>Start again</button>
      </div>
    </div>
  );
}
