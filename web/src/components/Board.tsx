import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/store';
import type { PlayerToken } from '../store/store';
import { lumenPolyBoard } from '../data/board';

export const Board: React.FC = () => {
  const { isRolling, setRolling, position, balance, setGameState, logAction, simulateAITurn, playerToken, aiState } = useGameStore();
  const [diceResult, setDiceResult] = useState<number>(0);

  const getTokenEmoji = (token: PlayerToken) => {
    if (token === 'rocket') return '🚀';
    if (token === 'node') return '🖥️';
    return '👨‍🚀';
  };

  const handleRollDice = () => {
    if (isRolling) return;
    setRolling(true);
    
    // Simulate dice roll
    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      const total = roll1 + roll2;
      setDiceResult(total);
      
      const newPos = (position + total) % 40;
      let newBalance = balance;
      
      if (newPos % 10 === 0) {
        newBalance += 200;
        logAction(`You rolled ${total} and landed on a corner. Received XLM!`);
      } else {
        const cost = 100 + (Math.floor(newPos / 10) * 50);
        newBalance -= cost;
        logAction(`You rolled ${total} and landed on ${lumenPolyBoard[newPos]?.name || 'a property'}. Paid ${cost} XLM.`);
      }

      setGameState(newPos, newBalance);
      setRolling(false);
      
      // Trigger AI turn after user turn
      setTimeout(() => {
        simulateAITurn();
      }, 1500);

    }, 800);
  };

  return (
    <div className="relative w-[800px] h-[800px] flex items-center justify-center perspective-[1500px]">
      
      {/* The 3D Board Container */}
      <motion.div 
        className="w-full h-full bg-slate-900 border-8 border-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative"
        initial={{ rotateX: 55, rotateZ: -45, scale: 0.8 }}
        animate={{ rotateX: 55, rotateZ: -45, scale: 0.9 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="grid grid-cols-11 grid-rows-11 h-full w-full gap-0 bg-slate-800">
          
          {lumenPolyBoard.map((tile) => {
            let col = 1; let row = 1;
            if (tile.id < 10) { col = 11 - tile.id; row = 11; }
            else if (tile.id < 20) { col = 1; row = 11 - (tile.id - 10); }
            else if (tile.id < 30) { col = 1 + (tile.id - 20); row = 1; }
            else { col = 11; row = 1 + (tile.id - 30); }

            // Determine if players are on this tile
            const hasPlayer = position === tile.id;
            const hasAI = aiState.position === tile.id;

            return (
              <div 
                key={tile.id} 
                className="border-[0.5px] border-slate-700 bg-slate-900 flex flex-col items-center justify-start text-[8px] text-center relative"
                style={{ gridColumn: col, gridRow: row, transformStyle: 'preserve-3d' }}
              >
                {/* Tile Header Color */}
                {tile.color && <div className={`w-full h-3 mb-1`} style={{ backgroundColor: tile.color }} />}
                <span className="text-white font-bold leading-tight px-1 mt-1">{tile.name}</span>
                {tile.price && <span className="text-slate-400 mt-1">{tile.price} XLM</span>}

                {/* 3D Player Tokens */}
                {(hasPlayer || hasAI) && (
                  <div className="absolute inset-0 flex items-center justify-center gap-1" style={{ transform: 'translateZ(20px) rotateX(-55deg) rotateZ(45deg)' }}>
                    {hasPlayer && (
                      <motion.div layoutId="playerToken" className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(34,211,238,0.5)] text-xl border-2 border-white">
                        {getTokenEmoji(playerToken)}
                      </motion.div>
                    )}
                    {hasAI && (
                      <motion.div layoutId="aiToken" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(239,68,68,0.5)] text-xl border-2 border-white">
                        🤖
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Center Area */}
          <div className="col-span-9 row-span-9 bg-slate-900 flex flex-col items-center justify-center relative shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ gridColumn: '2 / span 9', gridRow: '2 / span 9', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="text-9xl font-black font-orbitron text-cyan-400 transform -rotate-45">STELLAR</span>
            </div>
            
            <h1 className="text-6xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-12 z-10" style={{ textShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}>
              LUMENPOLY
            </h1>
            
            <div className="flex flex-col items-center z-10" style={{ transform: 'translateZ(30px) rotateX(-55deg) rotateZ(45deg)' }}>
              <button
                onClick={handleRollDice}
                disabled={isRolling}
                className="w-32 h-32 bg-white rounded-3xl shadow-[0_20px_50px_rgba(255,255,255,0.3)] flex items-center justify-center text-6xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 border-b-8 border-slate-300"
              >
                {isRolling ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5 }}>🎲</motion.div> : (diceResult || '🎲')}
              </button>
              <span className="mt-6 px-6 py-2 bg-cyan-500/20 text-cyan-400 font-bold rounded-full font-mono uppercase tracking-widest border border-cyan-500/50 backdrop-blur-sm">
                Roll to Execute
              </span>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};
