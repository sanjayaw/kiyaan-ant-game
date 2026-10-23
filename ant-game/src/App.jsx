import { useEffect, useRef, useState } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './game/constants.js';
import { startGame } from './game/engine.js';
import HUD from './ui/HUD.jsx';

export default function App() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [hud, setHud] = useState({ food: 0, colony: 0 });

  useEffect(() => {
    gameRef.current = startGame(canvasRef.current, setHud);
    return () => gameRef.current.stop();
  }, []);

  function handleCanvasClick(e) {
    // Convert the mouse's screen position into the canvas's own coord system.
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    gameRef.current.dropFood(x, y);
  }

  return (
    <div className="game-wrapper">
      <HUD food={hud.food} colony={hud.colony} />
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
      />
      <p className="hint">Click anywhere to drop food. Workers will fetch it.</p>
    </div>
  );
}
