import { lumenPolyBoard } from '../data/board';
import { record } from './events';
import type { Match, PlayerId } from './types';
export function canBuy(match: Match, id: PlayerId, tileId: number): boolean {
  const tile = lumenPolyBoard[tileId];
  return match.phase !== 'finished' && match.pendingProperty === tileId &&
    match.players[id].position === tileId && tile?.type === 'property' &&
    !match.owners[tileId] && (tile.price ?? Infinity) <= match.players[id].balance;
}
export function purchase(match: Match, id: PlayerId): boolean {
  const tileId = match.pendingProperty;
  if (tileId === null || !canBuy(match, id, tileId)) return false;
  const tile = lumenPolyBoard[tileId];
  match.players[id].balance -= tile.price!;
  match.owners[tileId] = id;
  match.pendingProperty = null;
  record(match, `${match.players[id].name} bought ${tile.name} for ${tile.price} XLM.`, 'property');
  return true;
}
