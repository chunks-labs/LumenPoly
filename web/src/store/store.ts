import { create } from 'zustand';

export type GamePhase = 'lobby' | 'playing' | 'gameover';
export type AIDifficulty = 'easy' | 'hard' | 'boss';
export type PlayerToken = 'rocket' | 'node' | 'astronaut';

export interface AIState {
  name: string;
  position: number;
  balance: number;
}

interface GameState {
  address: string | null;
  balance: number;
  position: number;
  isRolling: boolean;
  gamePhase: GamePhase;
  aiDifficulty: AIDifficulty;
  playerToken: PlayerToken;
  aiState: AIState;
  actionLog: string[];
  
  setAddress: (addr: string | null) => void;
  setGameState: (position: number, balance: number) => void;
  setRolling: (rolling: boolean) => void;
  setLobbyConfig: (token: PlayerToken, difficulty: AIDifficulty) => void;
  startGame: () => void;
  logAction: (action: string) => void;
  simulateAITurn: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  address: null,
  balance: 1500, // Starting capital
  position: 0,
  isRolling: false,
  gamePhase: 'lobby',
  aiDifficulty: 'easy',
  playerToken: 'rocket',
  aiState: { name: 'AI_Soroban_Bot', position: 0, balance: 1500 },
  actionLog: ['Welcome to LumenPoly. Connecting to Stellar Futurenet...'],

  setAddress: (addr) => set({ address: addr }),
  setGameState: (position, balance) => set({ position, balance }),
  setRolling: (rolling) => set({ isRolling: rolling }),
  setLobbyConfig: (token, difficulty) => set({ playerToken: token, aiDifficulty: difficulty }),
  startGame: () => set({ gamePhase: 'playing' }),
  logAction: (action) => set((state) => ({ actionLog: [action, ...state.actionLog].slice(0, 50) })),
  
  simulateAITurn: () => {
    const { aiState, logAction } = get();
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const totalRoll = roll1 + roll2;
    
    let newPosition = (aiState.position + totalRoll) % 40;
    
    // Simulate buying or paying rent (simplified logic)
    let newBalance = aiState.balance;
    if (newPosition % 10 === 0) { // Corners
      newBalance += 200; // GO or Free Parking approximation
      logAction(`${aiState.name} landed on a corner and received XLM!`);
    } else {
      const cost = 100 + (Math.floor(newPosition / 10) * 50);
      newBalance -= cost;
      logAction(`${aiState.name} rolled ${totalRoll} and landed on cell ${newPosition}. Paid ${cost} XLM.`);
    }

    set({ aiState: { ...aiState, position: newPosition, balance: newBalance } });
  }
}));
