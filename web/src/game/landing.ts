import { lumenPolyBoard } from '../data/board';
import { chanceCards, communityCards } from '../data/cards';
import { JAIL_POSITION } from './constants';
import { record } from './events';
import { rentFor } from './portfolio';
import { pay } from './settlement';
import type { Match, PlayerId } from './types';
export function land(match: Match, id: PlayerId, random = Math.random) {
  const player = match.players[id];
  const tile = lumenPolyBoard[player.position];
  record(match, `${player.name} landed on ${tile.name}.`, 'move');
  if (tile.id === 30) {
    player.position = JAIL_POSITION;
    player.jailed = true;
    record(match, `${player.name} moved to the waiting room and will miss one roll.`);
  } else if (tile.type === 'tax') {
    const amount = tile.id === 4 ? 200 : 100;
    pay(match, id, amount);
    record(match, `${player.name} paid a ${amount} XLM game fee.`, 'money');
  } else if (tile.type === 'chance' || tile.type === 'community') {
    const deck = tile.type === 'chance' ? chanceCards : communityCards;
    const card = deck[Math.min(deck.length - 1, Math.max(0, Math.floor(random() * deck.length)))];
    if (card.amount < 0) pay(match, id, -card.amount);
    else player.balance += card.amount;
    record(
      match,
      `${card.title}: ${card.text} ${card.amount > 0 ? '+' : ''}${card.amount} XLM.`,
      'money',
    );
  } else if (tile.type === 'property') {
    const owner = match.owners[tile.id];
    if (owner && owner !== id) {
      const rent = rentFor(match, tile.id);
      pay(match, id, rent, owner);
      record(
        match,
        `${player.name} owes ${rent} XLM rent to ${match.players[owner].name}.`,
        'money',
      );
    } else if (!owner) match.pendingProperty = tile.id;
  }
}
