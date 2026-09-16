import type { Match, PlayerId } from './types';
import { record } from './events';
export function pay(match: Match, from: PlayerId, amount: number, to?: PlayerId) {
  const player = match.players[from];
  const paid = Math.min(player.balance, amount);
  player.balance -= paid;
  if (to) match.players[to].balance += paid;
  if (paid < amount) {
    match.winner = from === 'you' ? 'bot' : 'you';
    match.phase = 'finished';
    match.pendingProperty = null;
    record(match, `${player.name} could not cover a ${amount} XLM payment. The match is complete.`);
  }
}
