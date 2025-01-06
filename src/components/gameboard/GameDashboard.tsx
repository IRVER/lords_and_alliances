import React, { useEffect, useState } from "react";
import { GameService } from "../../services/game_service";
import { GameState } from "../../interfaces/gameState";
import "./GameDashboard.css";

const GameDashboard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const data = await GameService.getState();
        setGameState(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGameState();
  }, []);

  async function startGame() {
    if (gameState) {
      const updatedState = { ...gameState, game_started: true };
      const newState = await GameService.updateGameState(updatedState);
      setGameState(newState);
    }
  }

  if (!gameState) return <div>Cargando...</div>;

  return (
    <div className="gameboard-container">
      <header className="gameboard-header">
        <h1 className="gameboard-title">Lords and Alliances</h1>
      </header>

      {gameState && (
        <div className="gameboard-resources">
          <div>Oro: {gameState.gold}</div>
          <div>Comida: {gameState.food}</div>
          <div>Lealtad: {gameState.loyalty}</div>
        </div>
      )}

      {gameState && !gameState.game_started && (
        <div className="dialog">
          <h1>¡Bienvenido a Lords and Alliances!</h1>
          <p>En este juego, deberás gestionar tus recursos, mantener la lealtad de tus aliados y construir un reino fuerte.</p>
          <p>¡Prepárate para tu aventura!</p>
          <button onClick={startGame}>Comenzar</button>
        </div>
      )}
    </div>
  );
};

export default GameDashboard;
