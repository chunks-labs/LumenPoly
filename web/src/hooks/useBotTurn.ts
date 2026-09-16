import { useEffect } from 'react';
import { useGameStore } from '../store/store';
import { rollDice } from '../game/dice';
export function useBotTurn() {
  const phase = useGameStore(state => state.match?.phase);
  const round = useGameStore(state => state.match?.round);
  const dispatch = useGameStore(state => state.dispatch);
  useEffect(() => {
    if (phase !== 'bot') return;
    const timer = window.setTimeout(() => dispatch({ type: 'bot', dice: rollDice() }), 650);
    return () => window.clearTimeout(timer);
  }, [phase, round, dispatch]);
}
