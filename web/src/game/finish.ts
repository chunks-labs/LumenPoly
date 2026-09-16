import { ROUND_LIMIT } from './constants';
import { record } from './events';
import { netWorth } from './portfolio';
import type { Match } from './types';
export function finishRound(match: Match) {
  if (match.phase === 'finished') return;
  match.pendingProperty = null;
  if (match.round >= ROUND_LIMIT) {
    const you = netWorth(match, 'you');
    const bot = netWorth(match, 'bot');
    match.winner = you === bot ? 'draw' : you > bot ? 'you' : 'bot';
    match.phase = 'finished';
    record(match, 'Final round complete. Cash and property value decide the winner.');
  } else { match.round++; match.phase = 'roll'; }
}
