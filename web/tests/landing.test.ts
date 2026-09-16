import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { land } from '../src/game/landing';
it.each([
  [4, 1300],
  [38, 1400],
])('charges the listed fee at %s', (position, balance) => {
  const m = createMatch();
  m.players.you.position = position;
  land(m, 'you');
  expect(m.players.you.balance).toBe(balance);
});
it('offers an unowned property without charging automatically', () => {
  const m = createMatch();
  m.players.you.position = 6;
  land(m, 'you');
  expect(m.pendingProperty).toBe(6);
  expect(m.players.you.balance).toBe(1500);
});
it('transfers rent to the owner', () => {
  const m = createMatch();
  m.owners[6] = 'bot';
  m.players.you.position = 6;
  land(m, 'you');
  expect(m.players.you.balance).toBe(1494);
  expect(m.players.bot.balance).toBe(1506);
});
it('does not charge rent for your own property', () => {
  const m = createMatch();
  m.owners[6] = 'you';
  m.players.you.position = 6;
  land(m, 'you');
  expect(m.players.you.balance).toBe(1500);
});
it('draws chance rewards', () => {
  const m = createMatch();
  m.players.you.position = 7;
  land(m, 'you', () => 0);
  expect(m.players.you.balance).toBe(1600);
});
it('draws community rewards from a different deck', () => {
  const m = createMatch();
  m.players.you.position = 2;
  land(m, 'you', () => 0);
  expect(m.players.you.balance).toBe(1550);
});
it('applies chance costs', () => {
  const m = createMatch();
  m.players.you.position = 7;
  land(m, 'you', () => 0.3);
  expect(m.players.you.balance).toBe(1450);
});
