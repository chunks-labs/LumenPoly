import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { BattleSetup } from './components/BattleSetup';
import { Portfolio } from './components/Portfolio';
import { Learn } from './components/Learn';
import { useGameStore } from './store/store';
const GameRoom = lazy(() => import('./components/GameRoom'));
const WalletDialog = lazy(() => import('./components/WalletDialog').then(module => ({ default: module.WalletDialog })));
function App() {
  const page = useGameStore(state => state.page);
  const match = useGameStore(state => state.match);
  const saveFailed = useGameStore(state => state.saveFailed);
  const [dialog, setDialog] = useState<'setup' | 'wallet' | null>(null);
  const main = useRef<HTMLElement>(null);
  const previousPage = useRef(page);
  useEffect(() => {
    document.title = `${{ home: 'Overview', game: 'Play', portfolio: 'Portfolio', learn: 'How to play' }[page]} · LumenPoly`;
    if (previousPage.current !== page) { main.current?.focus(); window.scrollTo({ top: 0 }); previousPage.current = page; }
  }, [page]);
  const play = () => setDialog('setup');
  return <div className="app-shell"><a href="#main-content" className="skip-link">Skip to content</a><Sidebar onPlay={play} /><div className="workspace"><Header onWallet={() => setDialog('wallet')} /><main ref={main} id="main-content" tabIndex={-1}>{saveFailed && <p role="status" className="save-warning">This browser could not save your game. You can keep playing, but refreshing may lose your progress.</p>}<Suspense fallback={<div className="page-loading" role="status">Setting your table…</div>}>{page === 'home' && <Home onPlay={play} />}{page === 'game' && (match ? <GameRoom onPlay={play} /> : <Home onPlay={play} />)}{page === 'portfolio' && <Portfolio onPlay={play} />}{page === 'learn' && <Learn onPlay={play} />}</Suspense></main></div>{dialog === 'setup' && <BattleSetup onClose={() => setDialog(null)} />}<Suspense fallback={<div role="status" className="loading-toast">Opening wallet options…</div>}>{dialog === 'wallet' && <WalletDialog onClose={() => setDialog(null)} />}</Suspense></div>;
}
export default App;
