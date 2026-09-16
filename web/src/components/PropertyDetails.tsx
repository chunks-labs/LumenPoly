import { lumenPolyBoard } from '../data/board';
import { groupColors } from '../lib/boardLayout';
import { canBuy } from '../game/purchase';
import { rentFor } from '../game/portfolio';
import { useGameStore } from '../store/store';
import { formatXlm } from '../lib/format';
import { Icon } from './Icon';
export function PropertyDetails({ tileId }: { tileId: number }) {
  const match = useGameStore((state) => state.match)!;
  const dispatch = useGameStore((state) => state.dispatch);
  const tile = lumenPolyBoard[tileId];
  const owner = match.owners[tileId];
  const pending = match.phase === 'resolve' && match.pendingProperty === tileId;
  return (
    <section className="property-detail" aria-label="Selected space">
      <div
        className="property-detail-stripe"
        style={{ background: groupColors[tile.color ?? 'green'] }}
      />
      <span className="eyebrow">
        {tile.type === 'property' ? 'PROPERTY SPOTLIGHT' : 'ON THE BOARD'}
      </span>
      <h3>{tile.name}</h3>
      {tile.type === 'property' ? (
        <>
          <div className="property-values">
            <div>
              <span>Purchase price</span>
              <strong>{formatXlm(tile.price!)}</strong>
            </div>
            <div>
              <span>Current rent</span>
              <strong>{formatXlm(rentFor(match, tileId))}</strong>
            </div>
          </div>
          <p className="muted">
            {owner
              ? `Owned by ${owner === 'you' ? 'you' : 'Orbit'}.`
              : 'Available to buy when you land here.'}
          </p>
          {pending && (
            <button
              className="button primary full"
              disabled={!canBuy(match, 'you', tileId)}
              onClick={() => dispatch({ type: 'buy' })}
            >
              {canBuy(match, 'you', tileId) ? 'Buy property' : 'Not enough XLM'}
              <Icon name="arrow" size={16} />
            </button>
          )}
        </>
      ) : (
        <p className="muted">
          {tile.description ??
            (tile.type === 'chance'
              ? 'Draw a chance card. An unexpected cost or reward awaits.'
              : 'Draw a community card and see what the network brings.')}
        </p>
      )}
    </section>
  );
}
