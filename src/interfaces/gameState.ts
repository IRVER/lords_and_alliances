export interface GameState {
    gold: number;
    food: number;
    loyalty: number;
    relationships: Record<string, number>; // Relación con otras entidades
    game_started: boolean;
  }
  