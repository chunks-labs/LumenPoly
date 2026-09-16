import type { Match } from './types';
import { lumenPolyBoard } from '../data/board';
import { validDice } from './dice';
const object = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
const integer = (value: unknown, min: number, max: number) =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max;
export function isMatch(value: unknown): value is Match {
  if (!object(value) || !object(value.players) || !object(value.owners)) return false;
  if (!['roll', 'resolve', 'bot', 'finished'].includes(String(value.phase))) return false;
  if (!['rocket', 'node', 'astronaut'].includes(String(value.token))) return false;
  if (!['easy', 'hard', 'boss'].includes(String(value.difficulty))) return false;
  if (!integer(value.round, 1, 30) || !Array.isArray(value.dice) || !validDice(value.dice))
    return false;
  if (value.winner !== null && !['you', 'bot', 'draw'].includes(String(value.winner))) return false;
  if ((value.phase === 'finished') !== (value.winner !== null)) return false;
  for (const id of ['you', 'bot']) {
    const player = value.players[id];
    if (
      !object(player) ||
      player.id !== id ||
      typeof player.name !== 'string' ||
      player.name.length > 40 ||
      !integer(player.position, 0, 39) ||
      !integer(player.balance, 0, 1000000) ||
      typeof player.jailed !== 'boolean'
    )
      return false;
  }
  if (
    !Object.entries(value.owners).every(
      ([key, owner]) =>
        /^(0|[1-9][0-9]?)$/.test(key) &&
        lumenPolyBoard[Number(key)]?.type === 'property' &&
        (owner === 'you' || owner === 'bot'),
    )
  )
    return false;
  if (value.pendingProperty !== null) {
    if (!integer(value.pendingProperty, 0, 39)) return false;
    const id = value.pendingProperty as number;
    if (lumenPolyBoard[id]?.type !== 'property' || value.owners[id] || value.phase !== 'resolve')
      return false;
    if ((value.players.you as Record<string, unknown>).position !== id) return false;
  }
  if (
    !integer(value.nextEventId, 1, 1000000) ||
    !Array.isArray(value.events) ||
    value.events.length > 60
  )
    return false;
  const ids = new Set<number>();
  return value.events.every((event) => {
    if (
      !object(event) ||
      !integer(event.id, 0, (value.nextEventId as number) - 1) ||
      !integer(event.round, 1, value.round as number) ||
      typeof event.text !== 'string' ||
      event.text.length > 500 ||
      !['move', 'money', 'property', 'system'].includes(String(event.kind)) ||
      ids.has(event.id as number)
    )
      return false;
    ids.add(event.id as number);
    return true;
  });
}
