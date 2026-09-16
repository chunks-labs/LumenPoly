import { Icon } from './Icon';
import { useGameStore } from '../store/store';
import { shortAddress } from '../lib/format';
const titles = { home: 'Overview', game: 'The game room', learn: 'How to play', portfolio: 'My portfolio' };
export function Header({ onWallet }: { onWallet: () => void }) {
  const page = useGameStore(state => state.page);
  const address = useGameStore(state => state.address);
  return <header className="topbar"><div className="breadcrumb">Workspace<Icon name="chevron" size={14} /><span>{titles[page]}</span></div><div className="topbar-actions"><span className="mode-badge"><span className="status-dot" />Practice mode</span><button className="button wallet-button" onClick={onWallet}><Icon name="wallet" size={17} /><span>{address ? shortAddress(address) : 'Connect wallet'}</span></button><span className="guest-avatar" aria-label={address ? 'Connected player' : 'Guest player'}>{address ? 'P' : 'G'}</span></div></header>;
}
