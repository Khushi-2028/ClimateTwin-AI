import React from 'react';
import { 
  Home, 
  Settings, 
  Database, 
  Cpu, 
  BarChart2, 
  Globe, 
  CheckCircle2, 
  Sliders, 
  Activity,
  BookOpen,
  Layers,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'setup', label: 'Climate Setup', icon: Settings },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'processing', label: 'Data Processing', icon: Cpu },
  { id: 'forecast', label: 'AI Forecast', icon: BarChart2 },
  { id: 'digital-twin', label: 'Digital Twin', icon: Globe },
  { id: 'validation', label: 'Validation', icon: CheckCircle2 },
  { id: 'scenario', label: 'Scenario Simulator', icon: Sliders },
  { id: 'system-status', label: 'System Status', icon: Activity },
  { id: 'about', label: 'About / Methodology', icon: BookOpen },
];

export const Sidebar = ({ activeTab, setActiveTab, backendStatus, onStartDemo }) => {
  return (
    <aside className="w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 tracking-wider font-heading leading-tight">
              CLIMATETWIN <span className="text-cyan-400">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">DIGITAL TWIN PROTOTYPE</p>
          </div>
        </div>

        {/* Start Demo Button */}
        <div className="px-4 pt-4">
          <button
            onClick={onStartDemo}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/15 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950 transition-transform group-hover:rotate-12" />
            <span>START DEMO MODE</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                }`} />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Backend & AI Status Widget at Bottom */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
        <div className="space-y-2 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Backend API</span>
            <span className="flex items-center gap-1.5 font-mono">
              <span className={`w-2 h-2 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className={backendStatus ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
                {backendStatus ? 'Connected' : 'Offline'}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">AI Model</span>
            <span className="flex items-center gap-1.5 font-mono text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              LSTM Ready
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 mt-1">
            <span className="text-slate-400">Pilot Region</span>
            <span className="font-semibold text-slate-200">Chhattisgarh</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
