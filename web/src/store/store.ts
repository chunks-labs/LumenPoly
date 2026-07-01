import { create } from 'zustand';

interface GameState {
  address: string | null;
  balance: number;
  position: number;
  isRolling: boolean;
  setAddress: (addr: string | null) => void;
  setGameState: (position: number, balance: number) => void;
  setRolling: (rolling: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  address: null,
  balance: 0,
  position: 0,
  isRolling: false,
  setAddress: (addr) => set({ address: addr }),
  setGameState: (position, balance) => set({ position, balance }),
  setRolling: (rolling) => set({ isRolling: rolling }),
}));
