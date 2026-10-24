import { useEffect, useRef, useState } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './game/constants.js';
import { startGame } from './game/engine.js';
import HUD from './ui/HUD.jsx';
import CommandPanel from './ui/CommandPanel.jsx';

export default function App() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [hud, setHud] = useState({ food: 0, colony: 0, eggs: 0 });

  useEffect(() => {
    gameRef.current = startGame(canvasRef.current, setHud);
    return () => gameRef.current.stop();
  }, []);

  function handleCanvasClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    gameRef.current.dropFood(x, y);
  }
 
  function handleLayEgg(caste) {
    gameRef.current.layEgg(caste);
  }

  return (
    <div className="game-wrapper">
      <div className="game-row">
        <div className="canvas-container">
          <HUD food={hud.food} colony={hud.colony} eggs={hud.eggs} />
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={handleCanvasClick}
          />
        </div>
        <CommandPanel food={hud.food} onLayEgg={handleLayEgg} />
      </div>
      <p className="hint">Click the dirt to drop food. Use the panel to lay eggs.</p>
    </div>
  );
}
