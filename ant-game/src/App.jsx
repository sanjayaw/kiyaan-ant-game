import { useState } from 'react';
import Game from './Game.jsx';

export default function App() {
  // Changing this key forces React to unmount and remount the Game,
  // which gives us a clean restart with zero state surgery.
  const [gameKey, setGameKey] = useState(0);
  return <Game key={gameKey} onRestart={() => setGameKey(k => k + 1)} />;
}
