import { BOARD_SIZE, GO_REWARD } from './constants';
import { record } from './events';
import type { Match, PlayerId } from './types';
export function move(match: Match, id: PlayerId, steps: number) {
  const player = match.players[id];
  const total = player.position + steps;
  if (total >= BOARD_SIZE) {
    player.balance += GO_REWARD;
    record(match, `${player.name} passed Launch and collected ${GO_REWARD} XLM.`, 'money');
  }
  player.position = total % BOARD_SIZE;
}
