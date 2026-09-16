import { afterEach, expect, it, vi } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { isMatch } from '../src/game/validate';
import { loadMatch, saveMatch } from '../src/lib/storage';
import { transition } from '../src/game/engine';
afterEach(() => vi.unstubAllGlobals());
it('accepts a fresh match', () => expect(isMatch(createMatch())).toBe(true));
it.each([null, {}, [], { players: {} }])('rejects incomplete data %j', (value) =>
  expect(isMatch(value)).toBe(false),
);
it.each(['position', 'balance'])('rejects invalid player %s', (key) => {
  const m = createMatch();
  Object.assign(m.players.you, { [key]: -1 });
  expect(isMatch(m)).toBe(false);
});
it('rejects ownership of special tiles', () => {
  const m = createMatch();
  m.owners[0] = 'you';
  expect(isMatch(m)).toBe(false);
});
it('rejects duplicate event identities', () => {
  const m = createMatch();
  m.events.push(m.events[0]);
  expect(isMatch(m)).toBe(false);
});
it('rejects inconsistent finished state', () => {
  const m = createMatch();
  m.phase = 'finished';
  expect(isMatch(m)).toBe(false);
});
it('accepts every state through a complete simulated match', () => {
  let m = createMatch();
  for (let n = 0; n < 200 && m.phase !== 'finished'; n++) {
    m = transition(
      m,
      m.phase === 'roll'
        ? { type: 'roll', dice: [3, 3] }
        : m.phase === 'bot'
          ? { type: 'bot', dice: [2, 3] }
          : { type: 'end' },
      () => 0,
    );
    expect(isMatch(m)).toBe(true);
  }
  expect(m.phase).toBe('finished');
});
it('tolerates blocked browser storage', () => {
  vi.stubGlobal('localStorage', {
    getItem() {
      throw Error('blocked');
    },
    setItem() {
      throw Error('blocked');
    },
  });
  expect(loadMatch()).toBeNull();
  expect(saveMatch(createMatch())).toBe(false);
});
it('ignores malformed JSON', () => {
  vi.stubGlobal('localStorage', { getItem: () => '{oops' });
  expect(loadMatch()).toBeNull();
});
it('persists and restores a valid match', () => {
  let raw: string | null = null;
  vi.stubGlobal('localStorage', {
    getItem: () => raw,
    setItem: (_: string, value: string) => {
      raw = value;
    },
    removeItem: () => {
      raw = null;
    },
  });
  const m = createMatch();
  expect(saveMatch(m)).toBe(true);
  expect(loadMatch()).toEqual(m);
  expect(saveMatch(null)).toBe(true);
  expect(loadMatch()).toBeNull();
});
