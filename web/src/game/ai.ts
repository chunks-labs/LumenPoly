import { lumenPolyBoard } from '../data/board';
import type { Match } from './types';
export function shouldBotBuy(match: Match): boolean {
  if (match.pendingProperty === null) return false;
  const tile = lumenPolyBoard[match.pendingProperty];
  const reserve = { easy: 500, hard: 250, boss: 100 }[match.difficulty];
  return (
    tile.type === 'property' && match.players.bot.balance - (tile.price ?? Infinity) >= reserve
  );
}
