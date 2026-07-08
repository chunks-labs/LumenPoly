import React from 'react';
import { useGameStore } from '../store/store';

export const Sidebar: React.FC = () => {
  const { address, balance, playerToken, aiState, actionLog } = useGameStore();

  const truncateAddress = (addr: string | null) => {
    if (!addr) return 'Not Connected';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getTokenEmoji = (token: string) => {
    if (token === 'rocket') return '🚀';
    if (token === 'node') return '🖥️';
    return '👨‍🚀';
  };

  return (
    <div className="w-80 h-screen bg-slate-950 border-r border-slate-800 flex flex-col p-4 text-white font-mono">
      <div className="mb-8">
        <h2 className="text-xl font-bold font-orbitron text-cyan-400 mb-4 tracking-wider">NETWORK DASHBOARD</h2>
        
        {/* Players List */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="bg-slate-800/50 p-2 text-xs font-bold text-slate-400 uppercase">Live Players</div>
          
          {/* User */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-cyan-950/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {getTokenEmoji(playerToken)}
              </div>
              <div>
                <div className="font-bold text-sm text-cyan-100 flex items-center gap-2">
                  {truncateAddress(address)} <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">YOU</span>
                </div>
                <div className="text-emerald-400 font-bold text-sm">${balance.toLocaleString()} XLM</div>
              </div>
            </div>
          </div>

          {/* AI Bot */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-red-500/30">
                🤖
              </div>
              <div>
                <div className="font-bold text-sm text-slate-300">{aiState.name}</div>
                <div className="text-emerald-400 font-bold text-sm">${aiState.balance.toLocaleString()} XLM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Log */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-800/50 p-2 text-xs font-bold text-slate-400 uppercase">Action Log</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {actionLog.map((log, index) => (
            <div key={index} className="text-xs text-slate-300 border-l-2 border-cyan-500/50 pl-3 py-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
