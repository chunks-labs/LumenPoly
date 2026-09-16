import { useGameStore } from '../store/store';
import { netWorth, properties } from '../game/portfolio';
import { groupColors } from '../lib/boardLayout';
import { formatXlm } from '../lib/format';
import { Icon } from './Icon';
import { StatCard } from './StatCard';
export function Portfolio({ onPlay }: { onPlay: () => void }) {
  const match = useGameStore(state => state.match);
  const setPage = useGameStore(state => state.setPage);
  const owned = match ? properties(match, 'you') : [];
  return <div className="portfolio-page"><div className="page-intro"><div><p className="eyebrow">BUILT ONE MOVE AT A TIME</p><h1>A little empire in the making<span className="lime-text">.</span></h1><p>Your practice properties and the bigger picture.</p></div></div><div className="stats-grid"><StatCard icon="wallet" label="Cash balance" value={formatXlm(match?.players.you.balance ?? 0)} detail="Simulated XLM available to spend." /><StatCard icon="board" label="Properties" value={String(owned.length).padStart(2, '0')} detail="Your share of the board." /><StatCard icon="chart" label="Net worth" value={formatXlm(match ? netWorth(match, 'you') : 0)} detail="Cash + property purchase value." /></div>{owned.length ? <div className="portfolio-grid">{owned.map(tile => <article className="portfolio-property" key={tile.id}><span className="portfolio-stripe" style={{ background: groupColors[tile.color!] }} /><span className="eyebrow">YOUR PROPERTY</span><h2>{tile.name}</h2><p>{formatXlm(tile.price!)} purchase value</p><button className="text-button" onClick={() => setPage('game')}>Back to the table<Icon name="arrow" size={16} /></button></article>)}</div> : <section className="empty-state"><Icon name="board" size={40} /><h2>Every portfolio starts with a first move.</h2><p>Land on an available property and make it yours. You’ll find your collection here.</p><button className="button primary" onClick={() => match ? setPage('game') : onPlay()}>{match ? 'Return to your game' : 'Start a practice game'}<Icon name="arrow" size={17} /></button></section>}</div>;
}
