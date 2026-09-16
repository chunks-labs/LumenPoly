import { create } from 'zustand';
import { createMatch } from '../game/createMatch';
import { transition } from '../game/engine';
import type { GameAction } from '../game/engine';
import type { AIDifficulty, Match, PlayerToken } from '../game/types';
import { loadMatch, saveMatch } from '../lib/storage';
export type Page = 'home' | 'game' | 'learn' | 'portfolio';
interface GameStore {
  page: Page;
  address: string | null;
  match: Match | null;
  saveFailed: boolean;
  setPage: (page: Page) => void;
  setAddress: (address: string | null) => void;
  startGame: (token: PlayerToken, difficulty: AIDifficulty) => void;
  dispatch: (action: GameAction) => void;
  clearGame: () => void;
}
export const useGameStore = create<GameStore>((set, get) => ({
  page: 'home',
  address: null,
  match: loadMatch(),
  saveFailed: false,
  setPage: (page) => set({ page }),
  setAddress: (address) => set({ address }),
  startGame: (token, difficulty) => {
    const match = createMatch(token, difficulty);
    set({ match, page: 'game', saveFailed: !saveMatch(match) });
  },
  dispatch: (action) => {
    const previous = get().match;
    if (!previous) return;
    const match = transition(previous, action);
    if (match !== previous) set({ match, saveFailed: !saveMatch(match) });
  },
  clearGame: () => set({ match: null, page: 'home', saveFailed: !saveMatch(null) }),
}));
