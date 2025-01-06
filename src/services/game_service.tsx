import axios from "axios";

const API_URL = "http://localhost:5005/api/game";

import { GameState } from "../interfaces/gameState";

export const GameService = {

  getState: async (): Promise<GameState> => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/state`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateGameState: async (gameState:GameState ) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("Token no encontrado en localStorage");
    }
  
    const response = await axios.put(`${API_URL}/update`, gameState, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
};


