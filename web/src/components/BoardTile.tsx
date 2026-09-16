import { memo } from 'react';
import type { BoardTile as Tile } from '../data/board';
import type { PlayerId, PlayerToken } from '../game/types';
import { boardPosition, groupColors } from '../lib/boardLayout';
import { tokenSymbol } from '../data/tokens';
export const BoardTile = memo(function BoardTile({
  tile,
  owner,
  hasPlayer,
  hasBot,
  token,
  selected,
  onSelect,
}: {
  tile: Tile;
  owner?: PlayerId;
  hasPlayer: boolean;
  hasBot: boolean;
  token: PlayerToken;
  selected: boolean;
  onSelect: (id: number) => void;
}) {
  const special =
    tile.id === 0
      ? '↗'
      : tile.id === 10
        ? '☕'
        : tile.id === 20
          ? '✳'
          : tile.id === 30
            ? '⇥'
            : tile.type === 'chance'
              ? '?'
              : tile.type === 'community'
                ? '✧'
                : tile.type === 'tax'
                  ? '↘'
                  : null;
  return (
    <button
      className={`board-tile ${tile.type === 'corner' ? 'corner-tile' : ''} ${selected ? 'tile-selected' : ''} ${hasPlayer ? 'player-here' : ''}`}
      style={boardPosition(tile.id)}
      onClick={() => onSelect(tile.id)}
      aria-pressed={selected}
      aria-label={`${tile.name}${tile.price ? `, ${tile.price} XLM` : ''}${owner ? `, owned by ${owner === 'you' ? 'you' : 'Orbit'}` : ''}${hasPlayer ? ', your position' : ''}${hasBot ? ', Orbit’s position' : ''}`}
    >
      {tile.color && (
        <span className="tile-stripe" style={{ background: groupColors[tile.color] }} />
      )}
      {special && (
        <span className="tile-special" aria-hidden="true">
          {special}
        </span>
      )}
      <span className="tile-name">{tile.name}</span>
      {tile.price && <span className="tile-price">{tile.price}</span>}
      {owner && <span className={`ownership-dot ${owner}`} aria-hidden="true" />}
      {(hasPlayer || hasBot) && (
        <span className="tile-tokens" aria-hidden="true">
          {hasPlayer && <span>{tokenSymbol(token)}</span>}
          {hasBot && <span className="bot-token">◉</span>}
        </span>
      )}
    </button>
  );
});
