import type { GameEvent, Match } from './types';
import { EVENT_LIMIT } from './constants';
export function record(match: Match, text: string, kind: GameEvent['kind'] = 'system') {
  match.events = [{ id: match.nextEventId++, round: match.round, text, kind }, ...match.events].slice(0, EVENT_LIMIT);
}
