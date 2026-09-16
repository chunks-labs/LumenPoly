import { Brand } from './Brand';
import { Icon } from './Icon';
import type { IconName } from './Icon';
import { useGameStore } from '../store/store';
import type { Page } from '../store/store';
const links: { page: Page; label: string; icon: IconName }[] = [
  { page: 'home', label: 'Overview', icon: 'home' }, { page: 'game', label: 'Play a game', icon: 'board' },
  { page: 'portfolio', label: 'My portfolio', icon: 'chart' }, { page: 'learn', label: 'How to play', icon: 'book' },
];
export function Sidebar({ onPlay }: { onPlay: () => void }) {
  const page = useGameStore(state => state.page);
  const setPage = useGameStore(state => state.setPage);
  const match = useGameStore(state => state.match);
  return <aside className="sidebar">
    <button className="brand-button" onClick={() => setPage('home')} aria-label="LumenPoly home"><Brand /></button>
    <span className="nav-caption">YOUR PLAYGROUND</span>
    <nav aria-label="Main navigation">{links.map(link => <button key={link.page} className={`nav-item ${page === link.page ? 'active' : ''}`} aria-current={page === link.page ? 'page' : undefined} onClick={() => link.page === 'game' && !match ? onPlay() : setPage(link.page)}><Icon name={link.icon} /><span>{link.label}</span>{link.page === 'game' && <span className="nav-pill">PLAY</span>}</button>)}</nav>
    <div className="sidebar-bottom"><div className="sidebar-note"><span className="small-star">✧</span><h3>A little play.<br />A lot to discover.</h3><p>Explore the Stellar ecosystem, one move at a time.</p><button onClick={() => setPage('learn')}>Learn the basics <Icon name="arrow" size={16} /></button></div><div className="network-label"><span className="status-dot" />Built around Stellar<Icon name="globe" size={16} /></div><span className="sidebar-version">LumenPoly · Practice edition</span></div>
  </aside>;
}
