import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { finishRound } from '../src/game/finish';
import { pay } from '../src/game/settlement';
import { transition } from '../src/game/engine';
it('ends the final round as a draw when values match', () => {
  const m = createMatch();
  m.round = 30;
  finishRound(m);
  expect(m.phase).toBe('finished');
  expect(m.winner).toBe('draw');
});
it('counts property value in final standings', () => {
  const m = createMatch();
  m.round = 30;
  m.owners[39] = 'you';
  finishRound(m);
  expect(m.winner).toBe('you');
});
it('can award the final match to Orbit', () => {
  const m = createMatch();
  m.round = 30;
  m.players.bot.balance++;
  finishRound(m);
  expect(m.winner).toBe('bot');
});
it('transfers only remaining cash on bankruptcy', () => {
  const m = createMatch();
  m.players.you.balance = 3;
  pay(m, 'you', 50, 'bot');
  expect(m.players.you.balance).toBe(0);
  expect(m.players.bot.balance).toBe(1503);
  expect(m.winner).toBe('bot');
  expect(m.phase).toBe('finished');
});
it('allows paying exactly the remaining balance', () => {
  const m = createMatch();
  m.players.you.balance = 50;
  pay(m, 'you', 50);
  expect(m.winner).toBeNull();
  expect(m.players.you.balance).toBe(0);
});
it('never resumes a completed match', () => {
  const m = createMatch();
  m.phase = 'finished';
  m.winner = 'you';
  expect(transition(m, { type: 'roll', dice: [1, 2] })).toBe(m);
});
it('ends immediately on a bankrupt fee landing', () => {
  const m = createMatch();
  m.players.you.balance = 10;
  const next = transition(m, { type: 'roll', dice: [2, 2] });
  expect(next.phase).toBe('finished');
  expect(next.winner).toBe('bot');
});
