import type { Match } from '../game/types';
import { netWorth } from '../game/portfolio';
import { formatXlm } from '../lib/format';
import { Icon } from './Icon';
export function GameResults({ match, onPlay }: { match: Match; onPlay: () => void }) {
  return (
    <section className="results-banner" aria-labelledby="results-title">
      <span className="result-icon">
        <Icon name="trophy" size={30} />
      </span>
      <div>
        <span className="eyebrow">THAT’S A WRAP</span>
        <h2 id="results-title">
          {match.winner === 'draw'
            ? 'Great minds. An even match.'
            : match.winner === 'you'
              ? 'The network is yours.'
              : 'This round belongs to Orbit.'}
        </h2>
        <p>
          You: {formatXlm(netWorth(match, 'you'))} · Orbit: {formatXlm(netWorth(match, 'bot'))} in
          total value.
        </p>
      </div>
      <button className="button primary" onClick={onPlay}>
        Play again
        <Icon name="arrow" size={17} />
      </button>
    </section>
  );
}
