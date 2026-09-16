import { lumenPolyBoard } from '../data/board';
import { useGameStore } from '../store/store';
import { BoardTile } from './BoardTile';
import { TurnControls } from './TurnControls';
export function Board({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (id: number) => void;
}) {
  const match = useGameStore((state) => state.match)!;
  return (
    <div
      className="board-scroll"
      role="region"
      aria-label="Game board. Scroll horizontally on small screens."
      tabIndex={0}
    >
      <div className="game-board">
        {lumenPolyBoard.map((tile) => (
          <BoardTile
            key={tile.id}
            tile={tile}
            owner={match.owners[tile.id]}
            hasPlayer={match.players.you.position === tile.id}
            hasBot={match.players.bot.position === tile.id}
            token={match.token}
            selected={selected === tile.id}
            onSelect={onSelect}
          />
        ))}
        <div className="board-center">
          <div className="board-brand">
            <span>✳</span>
            <strong>LUMENPOLY</strong>
            <small>OWN YOUR NEXT MOVE</small>
          </div>
          <TurnControls />
          <div className="board-legend">
            <span>
              <i className="legend-you" />
              You
            </span>
            <span>
              <i className="legend-bot" />
              Orbit
            </span>
            <span>Practice table</span>
          </div>
        </div>
      </div>
    </div>
  );
}
