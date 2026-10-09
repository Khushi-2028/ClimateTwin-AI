import React from 'react';
import { Activity, Server, Cpu, MapPin } from 'lucide-react';

export const StatusFooter = ({ backendStatus }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 px-6 py-2 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-slate-400" />
          <span>API Base: <code className="text-cyan-300">http://localhost:8000</code></span>
        </div>

        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Model: <span className="text-slate-200">climate_lstm_best.pth</span></span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pilot Region: <span className="text-slate-200 font-sans font-semibold">Chhattisgarh</span></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${backendStatus ? 'bg-emerald-400' : 'bg-rose-500'}`} />
          <span className={backendStatus ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
            {backendStatus ? '● Live API Connected' : '● Backend Disconnected (Run python main.py)'}
          </span>
        </span>
        <span className="text-slate-400">v1.0.0</span>
      </div>
    </footer>
  );
};

export default StatusFooter;
