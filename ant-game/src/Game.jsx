import { useEffect, useRef, useState } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT, QUEEN_MAX_HP } from './game/constants.js';
import { startGame } from './game/engine.js';
import HUD from './ui/HUD.jsx';
import CommandPanel from './ui/CommandPanel.jsx';
import GameOver from './ui/GameOver.jsx';

export default function Game({ onRestart }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [hud, setHud] = useState({
    food: 0, colony: 0, eggs: 0, time: 0,
    queenHp: QUEEN_MAX_HP, queenMaxHp: QUEEN_MAX_HP, threats: 0,
  });
  const [gameOver, setGameOver] = useState(null);

  useEffect(() => {
    gameRef.current = startGame(canvasRef.current, setHud, setGameOver);
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
          <HUD {...hud} />
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={handleCanvasClick}
          />
          {gameOver && <GameOver stats={gameOver} onRestart={onRestart} />}
        </div>
        <CommandPanel food={hud.food} onLayEgg={handleLayEgg} />
      </div>
      <p className="hint">Click dirt for food. Lay soldiers before bugs reach the queen.</p>
    </div>
  );
}
