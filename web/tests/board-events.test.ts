import { expect, it } from 'vitest';
import { lumenPolyBoard } from '../src/data/board';
import { boardPosition, groupColors } from '../src/lib/boardLayout';
import { createMatch } from '../src/game/createMatch';
import { record } from '../src/game/events';
it('maps forty unique perimeter spaces without overlapping the center', () => { const cells = lumenPolyBoard.map(tile => boardPosition(tile.id)); expect(cells).toHaveLength(40); expect(new Set(cells.map(cell => `${cell.gridRow},${cell.gridColumn}`)).size).toBe(40); for (const cell of cells) { expect(cell.gridRow === 1 || cell.gridRow === 11 || cell.gridColumn === 1 || cell.gridColumn === 11).toBe(true); } });
it('keeps tile indices aligned with IDs', () => { lumenPolyBoard.forEach((tile, index) => expect(tile.id).toBe(index)); });
it('provides prices rent and display colors for every property', () => { for (const tile of lumenPolyBoard.filter(tile => tile.type === 'property')) { expect(tile.price).toBeGreaterThan(0); expect(tile.rent).toBeGreaterThan(0); expect(groupColors[tile.color!]).toBeTruthy(); } });
it('bounds event history without reusing identities', () => { const m = createMatch(); for (let n = 0; n < 100; n++) record(m, `Event ${n}`); expect(m.events).toHaveLength(60); expect(m.events[0].id).toBe(100); expect(new Set(m.events.map(event => event.id)).size).toBe(60); expect(m.nextEventId).toBe(101); });
