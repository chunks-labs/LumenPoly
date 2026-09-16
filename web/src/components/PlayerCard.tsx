import type { Match, PlayerId } from '../game/types';
import { properties, netWorth } from '../game/portfolio';
import { tokenSymbol } from '../data/tokens';
import { formatXlm } from '../lib/format';
export function PlayerCard({ match, id }: { match: Match; id: PlayerId }) {
  const player = match.players[id];
  const active = match.phase !== 'finished' && (id === 'bot' ? match.phase === 'bot' : match.phase !== 'bot');
  return <article className={`player-card ${active ? 'current-player' : ''}`}><div className="player-heading"><span className={`player-avatar ${id}`} aria-hidden="true">{id === 'you' ? tokenSymbol(match.token) : '◉'}</span><div><strong>{player.name}</strong><small>{id === 'you' ? 'The next big thing' : 'Your AI opponent'}</small></div>{active && <span className="mini-badge">TURN</span>}</div><strong className="player-balance">{formatXlm(player.balance)}</strong><div className="player-meta"><span>{properties(match, id).length} properties</span><span>{formatXlm(netWorth(match, id))} total</span></div></article>;
}
