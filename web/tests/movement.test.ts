import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { move } from '../src/game/movement';
import { land } from '../src/game/landing';
it('pays launch reward on passing without landing exactly on start', () => {
  const m = createMatch();
  m.players.you.position = 38;
  move(m, 'you', 5);
  expect(m.players.you).toMatchObject({ position: 3, balance: 1700 });
});
it('pays launch only once for landing on start', () => {
  const m = createMatch();
  m.players.you.position = 38;
  move(m, 'you', 2);
  land(m, 'you');
  expect(m.players.you.balance).toBe(1700);
});
it.each([10, 20])('does not reward corner %s', (position) => {
  const m = createMatch();
  m.players.you.position = position;
  land(m, 'you');
  expect(m.players.you.balance).toBe(1500);
});
it('moves a forced break to waiting room without a bonus', () => {
  const m = createMatch();
  m.players.you.position = 30;
  land(m, 'you');
  expect(m.players.you).toMatchObject({ position: 10, balance: 1500, jailed: true });
});
it('does not change the other player when moving', () => {
  const m = createMatch();
  move(m, 'you', 8);
  expect(m.players.bot.position).toBe(0);
});
