import type { PlayerToken } from '../game/types';
export const tokens: { id: PlayerToken; name: string; symbol: string; description: string }[] = [
  { id: 'rocket', name: 'Voyager', symbol: '🚀', description: 'Big moves. New horizons.' },
  { id: 'node', name: 'Builder', symbol: '🛰️', description: 'Make the network yours.' },
  { id: 'astronaut', name: 'Explorer', symbol: '🧑‍🚀', description: 'A little curiosity goes far.' },
];
export const tokenSymbol = (id: PlayerToken) => tokens.find((token) => token.id === id)!.symbol;
