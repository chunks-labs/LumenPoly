import { lumenPolyBoard } from '../data/board';
import type { Match, PlayerId } from './types';
export function properties(match: Match, id: PlayerId) {
  return lumenPolyBoard.filter(tile => match.owners[tile.id] === id);
}
export function netWorth(match: Match, id: PlayerId): number {
  return match.players[id].balance + properties(match, id).reduce((total, tile) => total + (tile.price ?? 0), 0);
}
export function rentFor(match: Match, tileId: number): number {
  const tile = lumenPolyBoard[tileId];
  if (!tile || tile.type !== 'property') return 0;
  const owner = match.owners[tileId];
  const group = lumenPolyBoard.filter(item => item.type === 'property' && item.color === tile.color);
  const complete = owner && group.length > 0 && group.every(item => match.owners[item.id] === owner);
  return (tile.rent ?? 0) * (complete ? 2 : 1);
}
