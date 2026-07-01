import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/store';
import { lumenPolyBoard } from '../data/board';

export const Board: React.FC = () => {
  const { isRolling } = useGameStore();

  return (
    <div className="relative w-full max-w-4xl aspect-square bg-slate-900 border-4 border-slate-700 rounded-xl p-4 shadow-2xl overflow-hidden mx-auto">
      {/* 40-cell grid layout wrapper */}
      <div className="grid grid-cols-11 grid-rows-11 h-full w-full gap-1">
        
        {/* Placeholder rendering for the board tiles */}
        {lumenPolyBoard.map((tile) => {
          // This is a simplified CSS Grid mapping algorithm for a 40-tile monopoly board
          let col = 1;
          let row = 1;
          if (tile.id < 10) { col = 11 - tile.id; row = 11; }
          else if (tile.id < 20) { col = 1; row = 11 - (tile.id - 10); }
          else if (tile.id < 30) { col = 1 + (tile.id - 20); row = 1; }
          else { col = 11; row = 1 + (tile.id - 30); }

          return (
            <div 
              key={tile.id} 
              className="border border-slate-600 bg-slate-800 flex flex-col items-center justify-center text-[10px] text-center p-1 relative"
              style={{ gridColumn: col, gridRow: row }}
            >
              <div className={`w-full h-2 mb-1 ${tile.color ? 'bg-' + tile.color + '-500' : ''}`} />
              <span className="text-white font-bold">{tile.name}</span>
              {tile.price && <span className="text-slate-400 mt-1">{tile.price} XLM</span>}
            </div>
          );
        })}

        {/* Center of the board */}
        <div className="col-span-9 row-span-9 bg-slate-800 rounded-lg flex flex-col items-center justify-center p-8 text-white shadow-inner" style={{ gridColumn: '2 / span 9', gridRow: '2 / span 9' }}>
          <h1 className="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg mb-8">
            LUMENPOLY
          </h1>
          
          <motion.div 
            animate={{ rotate: isRolling ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-white text-slate-900 rounded-xl flex items-center justify-center text-4xl font-black shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            🎲
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};
