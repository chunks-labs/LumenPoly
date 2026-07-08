import React from 'react';
import { useGameStore } from '../store/store';
import type { PlayerToken, AIDifficulty } from '../store/store';
import { motion } from 'framer-motion';

export const BattleSetup: React.FC = () => {
  const { playerToken, aiDifficulty, setLobbyConfig, startGame } = useGameStore();

  const handleTokenSelect = (token: PlayerToken) => {
    setLobbyConfig(token, aiDifficulty);
  };

  const handleDifficultySelect = (difficulty: AIDifficulty) => {
    setLobbyConfig(playerToken, difficulty);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-slate-900/80 p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
            STELLAR BATTLE SETUP
          </h1>
          <p className="text-slate-400 font-mono">CONFIGURE YOUR MATCH • ENGAGE ENEMY • DOMINATE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Select Piece */}
          <div>
            <h3 className="text-cyan-400 font-mono text-sm mb-4 tracking-widest uppercase">Select Piece</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['rocket', 'node', 'astronaut'] as PlayerToken[]).map((token) => (
                <button
                  key={token}
                  onClick={() => handleTokenSelect(token)}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    playerToken === token 
                      ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                      : 'border-slate-800 bg-slate-900 hover:border-slate-600'
                  }`}
                >
                  <span className="text-2xl">
                    {token === 'rocket' ? '🚀' : token === 'node' ? '🖥️' : '👨‍🚀'}
                  </span>
                  <span className="text-xs font-bold uppercase">{token}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Difficulty */}
          <div>
            <h3 className="text-cyan-400 font-mono text-sm mb-4 tracking-widest uppercase">Battle Difficulty</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'hard', 'boss'] as AIDifficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => handleDifficultySelect(diff)}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    aiDifficulty === diff 
                      ? diff === 'boss' 
                        ? 'border-red-500 bg-red-950/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                        : 'border-emerald-400 bg-emerald-950/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-600'
                  }`}
                >
                  <span className="text-2xl">
                    {diff === 'easy' ? '🟢' : diff === 'hard' ? '🟡' : '💀'}
                  </span>
                  <span className="text-xs font-bold uppercase">{diff}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={startGame}
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xl rounded-full uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            🚀 Launch Battle
          </button>
        </div>
      </motion.div>
    </div>
  );
};
