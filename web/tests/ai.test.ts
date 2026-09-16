import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { shouldBotBuy } from '../src/game/ai';
import { transition } from '../src/game/engine';
it.each([
  ['easy', false],
  ['hard', true],
  ['boss', true],
] as const)('uses a %s cash reserve', (difficulty, result) => {
  const m = createMatch('rocket', difficulty);
  m.pendingProperty = 6;
  m.players.bot.balance = 400;
  expect(shouldBotBuy(m)).toBe(result);
});
it('never buys without an offer', () => expect(shouldBotBuy(createMatch())).toBe(false));
it('buys at the reserve boundary', () => {
  const m = createMatch();
  m.pendingProperty = 6;
  m.players.bot.balance = 600;
  expect(shouldBotBuy(m)).toBe(true);
});
it('buys a landed property during its turn', () => {
  const m = createMatch();
  m.phase = 'bot';
  const next = transition(m, { type: 'bot', dice: [3, 3] });
  expect(next.owners[6]).toBe('bot');
  expect(next.players.bot.balance).toBe(1400);
});
it('skips unaffordable purchases while completing its turn', () => {
  const m = createMatch();
  m.phase = 'bot';
  m.players.bot.balance = 40;
  const next = transition(m, { type: 'bot', dice: [3, 3] });
  expect(next.owners[6]).toBeUndefined();
  expect(next.phase).toBe('roll');
});
