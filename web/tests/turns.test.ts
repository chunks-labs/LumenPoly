import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { transition } from '../src/game/engine';
it('keeps the original state immutable', () => {
  const m = createMatch();
  const next = transition(m, { type: 'roll', dice: [3, 3] });
  expect(m.players.you.position).toBe(0);
  expect(next.players.you.position).toBe(6);
  expect(next.phase).toBe('resolve');
});
it('prevents rerolling before ending a turn', () => {
  const m = transition(createMatch(), { type: 'roll', dice: [3, 3] });
  expect(transition(m, { type: 'roll', dice: [6, 6] })).toBe(m);
});
it('prevents the bot from moving during the player turn', () => {
  const m = createMatch();
  expect(transition(m, { type: 'bot', dice: [1, 1] })).toBe(m);
});
it('rejects invalid dice without changing the match', () => {
  const m = createMatch();
  expect(transition(m, { type: 'roll', dice: [0, 7] })).toBe(m);
});
it('clears offers when ending a turn', () => {
  let m = transition(createMatch(), { type: 'roll', dice: [3, 3] });
  m = transition(m, { type: 'end' });
  expect(m.phase).toBe('bot');
  expect(m.pendingProperty).toBeNull();
});
it('returns control after exactly one bot turn', () => {
  let m = transition(createMatch(), { type: 'roll', dice: [3, 3] });
  m = transition(m, { type: 'end' });
  m = transition(m, { type: 'bot', dice: [4, 4] });
  expect(m.phase).toBe('roll');
  expect(m.round).toBe(2);
  expect(transition(m, { type: 'bot', dice: [1, 1] })).toBe(m);
});
it('waits one turn when detained and then clears detention', () => {
  const m = createMatch();
  m.players.you.jailed = true;
  m.players.you.position = 10;
  const next = transition(m, { type: 'roll', dice: [3, 3] });
  expect(next.players.you).toMatchObject({ position: 10, jailed: false });
  expect(next.phase).toBe('resolve');
});
it('ignores purchases outside the resolution phase', () => {
  const m = createMatch();
  expect(transition(m, { type: 'buy' })).toBe(m);
});
