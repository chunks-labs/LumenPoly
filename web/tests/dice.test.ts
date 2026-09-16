import { describe, expect, it } from 'vitest';
import { rollDie, rollDice, validDice } from '../src/game/dice';
describe('dice boundaries', () => {
  it.each([
    [0, 1],
    [0.5, 4],
    [0.999, 6],
    [1, 6],
    [-1, 1],
  ])('maps %s to %s', (random, result) => expect(rollDie(() => random)).toBe(result));
  it('rolls two dice', () => expect(rollDice(() => 0.2)).toEqual([2, 2]));
  it.each([[0, 1], [7, 1], [1.2, 2], [1], [1, 2, 3], [NaN, 2]])(
    'rejects invalid dice %j',
    (...dice) => expect(validDice(dice)).toBe(false),
  );
  it('accepts both extremes', () => expect(validDice([1, 6])).toBe(true));
});
