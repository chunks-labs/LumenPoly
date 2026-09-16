import { useGameStore } from '../store/store';
import { rollDice } from '../game/dice';
import { Dice } from './Dice';
import { Icon } from './Icon';
export function TurnControls() {
  const match = useGameStore((state) => state.match)!;
  const dispatch = useGameStore((state) => state.dispatch);
  const phase = match.phase;
  return (
    <div className="turn-controls">
      <span className="turn-label">
        {phase === 'bot'
          ? 'ORBIT’S TURN'
          : phase === 'finished'
            ? 'TABLE COMPLETE'
            : 'YOUR NEXT MOVE'}
      </span>
      <div className="dice-pair">
        <Dice value={match.dice[0]} />
        <Dice value={match.dice[1]} />
      </div>
      <div className="turn-announcement" role="status">
        {phase === 'roll'
          ? match.players.you.jailed
            ? 'Sit out this roll, then you’re back.'
            : 'A little luck. A lot of possibility.'
          : phase === 'resolve'
            ? match.pendingProperty !== null
              ? 'A new opportunity. Buy it or move on.'
              : 'Your move is complete.'
            : phase === 'bot'
              ? 'Orbit is planning a move…'
              : 'Every move was part of the story.'}
      </div>
      {phase === 'roll' && (
        <button
          className="button primary"
          onClick={() => dispatch({ type: 'roll', dice: rollDice() })}
        >
          {match.players.you.jailed ? 'Wait this turn' : 'Roll the dice'}
          <Icon name="arrow" size={17} />
        </button>
      )}
      {phase === 'resolve' && (
        <button className="button primary" onClick={() => dispatch({ type: 'end' })}>
          End turn
          <Icon name="arrow" size={17} />
        </button>
      )}
      {phase === 'bot' && <span className="thinking-label">Orbit is taking its turn</span>}
    </div>
  );
}
