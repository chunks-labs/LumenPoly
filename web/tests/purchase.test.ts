import { expect, it } from 'vitest';
import { createMatch } from '../src/game/createMatch';
import { canBuy, purchase } from '../src/game/purchase';
function offered() { const m = createMatch(); m.phase = 'resolve'; m.players.you.position = 6; m.pendingProperty = 6; return m; }
it('deducts listed purchase price and assigns ownership', () => { const m = offered(); expect(purchase(m, 'you')).toBe(true); expect(m.players.you.balance).toBe(1400); expect(m.owners[6]).toBe('you'); expect(m.pendingProperty).toBeNull(); });
it('prevents repeated purchases', () => { const m = offered(); purchase(m, 'you'); expect(purchase(m, 'you')).toBe(false); expect(m.players.you.balance).toBe(1400); });
it('rejects unaffordable properties', () => { const m = offered(); m.players.you.balance = 99; expect(purchase(m, 'you')).toBe(false); expect(m.players.you.balance).toBe(99); });
it('allows exact-price purchases', () => { const m = offered(); m.players.you.balance = 100; expect(purchase(m, 'you')).toBe(true); expect(m.players.you.balance).toBe(0); });
it('rejects purchases away from the current space', () => { const m = offered(); m.players.you.position = 5; expect(purchase(m, 'you')).toBe(false); });
it('rejects owned properties', () => { const m = offered(); m.owners[6] = 'bot'; expect(purchase(m, 'you')).toBe(false); });
it('rejects non-properties and finished matches', () => { const m = offered(); expect(canBuy(m, 'you', 0)).toBe(false); m.phase = 'finished'; expect(purchase(m, 'you')).toBe(false); });
