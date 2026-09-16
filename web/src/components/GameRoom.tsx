import { useCallback, useState } from 'react';
import { useGameStore } from '../store/store';
import { useBotTurn } from '../hooks/useBotTurn';
import { Board } from './Board';
import { TurnControls } from './TurnControls';
import { PlayerCard } from './PlayerCard';
import { PropertyDetails } from './PropertyDetails';
import { ActivityLog } from './ActivityLog';
import { GameResults } from './GameResults';
import { Icon } from './Icon';
export default function GameRoom({ onPlay }: { onPlay: () => void }) {
  const match = useGameStore(state => state.match)!;
  const [inspected, setInspected] = useState<number | null>(null);
  const [inspectedAt, setInspectedAt] = useState('');
  const stateKey = `${match.round}-${match.phase}-${match.players.you.position}`;
  const select = useCallback((id: number) => { setInspected(id); setInspectedAt(stateKey); }, [stateKey]);
  const selected = inspectedAt === stateKey && inspected !== null ? inspected : match.pendingProperty ?? match.players.you.position;
  useBotTurn();
  return <div className="game-page"><div className="page-intro compact"><div><p className="eyebrow">YOUR TABLE. YOUR POSSIBILITIES.</p><h1>Make it your move<span className="lime-text">.</span></h1><p>Practice game <span>·</span> Round {match.round} of 30 <span>·</span> Simulated XLM</p></div><button className="button secondary" onClick={onPlay}><Icon name="refresh" size={16} />New game</button></div>{match.phase === 'finished' && <GameResults match={match} onPlay={onPlay} />}<div className="game-layout"><div className="mobile-turn-panel"><TurnControls /></div><section className="board-panel"><div className="board-panel-heading"><span><span className="status-dot" />{match.phase === 'finished' ? 'MATCH COMPLETE' : 'PRACTICE TABLE'}</span><span>YOU + ORBIT</span></div><Board selected={selected} onSelect={select} /><p className="board-hint">Select any space to explore it. Own a complete color group to double its rent.</p><ActivityLog events={match.events} /></section><aside className="game-details" aria-label="Players and selected property"><PlayerCard match={match} id="you" /><PlayerCard match={match} id="bot" /><PropertyDetails tileId={selected} /></aside></div></div>;
}
