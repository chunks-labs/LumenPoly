import { Board } from './components/Board';
import { BattleSetup } from './components/BattleSetup';
import { Sidebar } from './components/Sidebar';
import { useFreighter } from './hooks/useFreighter';
import { useGameStore } from './store/store';
import { useSorobanSync } from './hooks/useSorobanSync';

const TESTNET_CONTRACT_ID = "CA...PLACEHOLDER"; // Will be updated after Soroban deployment

function App() {
  const { address, gamePhase } = useGameStore();
  const { hasFreighter, connect } = useFreighter();
  
  // Start polling Soroban RPC for updates if connected
  useSorobanSync(TESTNET_CONTRACT_ID);

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0E282A] via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center p-12 bg-slate-900/80 rounded-2xl border border-cyan-500/30 max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <h1 className="text-5xl font-black font-orbitron mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
            LUMENPOLY
          </h1>
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-8 font-mono">Stellar Futurenet</p>
          <p className="text-slate-400 mb-8 font-mono">
            Connect your Freighter wallet to join the game, stake XLM, and learn the rules of Web3 finance natively on Stellar.
          </p>
          <button 
            onClick={connect}
            disabled={!hasFreighter}
            className={`px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-transform hover:scale-105 uppercase tracking-wider ${
              hasFreighter 
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {hasFreighter ? 'Connect Wallet To Play' : 'Install Freighter Wallet'}
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'lobby') {
    return <BattleSetup />;
  }

  return (
    <div className="flex w-full h-screen bg-[#0A192f] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 relative bg-gradient-to-br from-[#0a192f] to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative w-full h-full flex items-center justify-center">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
