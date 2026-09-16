import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { netWorth, properties, rentFor } from '../src/game/portfolio';
it('values a portfolio using cash and original purchase price', () => {
  const m = createMatch();
  m.owners = { 1: 'you', 3: 'bot', 6: 'you' };
  expect(properties(m, 'you').map((p) => p.id)).toEqual([1, 6]);
  expect(netWorth(m, 'you')).toBe(1660);
});
it('uses base rent for an incomplete color group', () => {
  const m = createMatch();
  m.owners[1] = 'you';
  expect(rentFor(m, 1)).toBe(2);
});
it('doubles rent for a complete group', () => {
  const m = createMatch();
  m.owners = { 1: 'you', 3: 'you' };
  expect(rentFor(m, 1)).toBe(4);
  expect(rentFor(m, 3)).toBe(8);
});
it('does not double rent across split ownership', () => {
  const m = createMatch();
  m.owners = { 1: 'you', 3: 'bot' };
  expect(rentFor(m, 1)).toBe(2);
});
it('does not assign rent to non-properties', () => {
  const m = createMatch();
  expect(rentFor(m, 0)).toBe(0);
  expect(rentFor(m, 99)).toBe(0);
});
