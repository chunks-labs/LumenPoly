import { validDice } from './dice';
import { record } from './events';
import { move } from './movement';
import { land } from './landing';
import { purchase } from './purchase';
import { shouldBotBuy } from './ai';
import { finishRound } from './finish';
import type { Match } from './types';
export type GameAction =
  { type: 'roll' | 'bot'; dice: [number, number] } | { type: 'buy' } | { type: 'end' };
export function transition(current: Match, action: GameAction, random = Math.random): Match {
  if (current.phase === 'finished') return current;
  if (action.type === 'roll' && current.phase !== 'roll') return current;
  if (action.type === 'bot' && current.phase !== 'bot') return current;
  if ((action.type === 'buy' || action.type === 'end') && current.phase !== 'resolve')
    return current;
  if ('dice' in action && !validDice(action.dice)) return current;
  const match = structuredClone(current);
  if (action.type === 'buy') {
    purchase(match, 'you');
    return match;
  }
  if (action.type === 'end') {
    match.pendingProperty = null;
    match.phase = 'bot';
    return match;
  }
  const id = action.type === 'roll' ? 'you' : 'bot';
  const player = match.players[id];
  match.pendingProperty = null;
  match.dice = action.dice;
  if (player.jailed) {
    player.jailed = false;
    record(match, `${player.name} waited one turn and can roll next round.`);
  } else {
    record(match, `${player.name} rolled ${action.dice[0]} + ${action.dice[1]}.`, 'move');
    move(match, id, action.dice[0] + action.dice[1]);
    land(match, id, random);
  }
  if (match.phase === 'finished') return match;
  if (id === 'bot') {
    if (shouldBotBuy(match)) purchase(match, 'bot');
    finishRound(match);
  } else match.phase = 'resolve';
  return match;
}
