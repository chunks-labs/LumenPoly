import type { GameEvent } from '../game/types';
export function ActivityLog({ events }: { events: GameEvent[] }) {
  return <section className="activity-card"><div className="section-heading"><h3>At the table</h3><span className="subtle-label">ACTIVITY</span></div><ol className="activity-list" aria-label="Match activity">{events.slice(0, 20).map(event => <li key={event.id}><span className={`activity-dot ${event.kind}`} /><div><p>{event.text}</p><span>Round {event.round}</span></div></li>)}</ol></section>;
}
