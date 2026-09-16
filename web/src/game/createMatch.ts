import type { AIDifficulty, Match, PlayerToken } from './types';
import { STARTING_BALANCE } from './constants';
export function createMatch(token: PlayerToken = 'rocket', difficulty: AIDifficulty = 'easy'): Match {
  return {
    players: {
      you: { id: 'you', name: 'You', position: 0, balance: STARTING_BALANCE, jailed: false },
      bot: { id: 'bot', name: 'Orbit', position: 0, balance: STARTING_BALANCE, jailed: false },
    },
    owners: {}, phase: 'roll', round: 1, dice: [1, 1], events: [
      { id: 0, round: 1, text: 'Your table is ready. Roll the dice to begin.', kind: 'system' },
    ], nextEventId: 1, winner: null, difficulty, token, pendingProperty: null,
  };
}
