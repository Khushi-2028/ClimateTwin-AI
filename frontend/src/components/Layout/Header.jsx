import React from 'react';
import { RefreshCw, MapPin, Cpu } from 'lucide-react';

export const Header = ({ backendStatus, onRefresh }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            National Climate Twin
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <MapPin className="w-3 h-3 text-cyan-400" />
            Pilot Region: <strong className="text-slate-200">Chhattisgarh</strong>
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-extrabold text-slate-100 font-heading tracking-tight mt-0.5">
          ClimateTwin AI — <span className="text-slate-300 font-normal text-sm md:text-base">AI-Powered Digital Twin of India's Climate</span>
        </h2>
      </div>

      {/* Header Live Status Badges */}
      <div className="flex items-center gap-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI Model:</span>
          <span className="text-cyan-400 font-bold">● Ready</span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold ${
          backendStatus 
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
            : 'bg-rose-950/60 text-rose-300 border-rose-500/30'
        }`}>
          <span className={`w-2 h-2 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></span>
          <span>Backend: {backendStatus ? '● Connected' : '● Offline'}</span>
        </div>

        <button
          onClick={onRefresh}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          title="Refresh Backend API State"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
