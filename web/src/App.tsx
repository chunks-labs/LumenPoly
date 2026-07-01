
import { Board } from './components/Board';
import { useFreighter } from './hooks/useFreighter';
import { useGameStore } from './store/store';
import { useSorobanSync } from './hooks/useSorobanSync';

const TESTNET_CONTRACT_ID = "CA...PLACEHOLDER"; // Will be updated after Soroban deployment

function App() {
  const { address } = useGameStore();
  const { hasFreighter, connect } = useFreighter();
  
  // Start polling Soroban RPC for updates if connected
  useSorobanSync(TESTNET_CONTRACT_ID);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-10 px-4 font-sans text-white">
      
      {/* Header & Wallet Login */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            LumenPoly
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Stellar Futurenet</p>
        </div>
        
        {!address ? (
          <button 
            onClick={connect}
            disabled={!hasFreighter}
            className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all ${
              hasFreighter 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/50'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {hasFreighter ? 'Connect Freighter' : 'Install Freighter Wallet'}
          </button>
        ) : (
          <div className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 font-mono text-sm shadow-inner">
            {address.substring(0, 5)}...{address.substring(address.length - 4)}
          </div>
        )}
      </header>

      {/* Main Game Board */}
      <main className="w-full flex-grow flex flex-col items-center justify-center">
        {!address ? (
          <div className="text-center p-12 bg-slate-800 rounded-2xl border border-slate-700 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Welcome to LumenPoly</h2>
            <p className="text-slate-400 mb-8">
              Connect your Freighter wallet to join the game, stake XLM, and learn the rules of Web3 finance natively on Stellar.
            </p>
          </div>
        ) : (
          <Board />
        )}
      </main>
      
    </div>
  );
}

export default App;
