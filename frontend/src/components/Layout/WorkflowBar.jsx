import React from 'react';
import { ChevronRight } from 'lucide-react';

const WORKFLOW_STAGES = [
  { id: 'setup', number: '01', title: 'Problem Definition' },
  { id: 'data', number: '02', title: 'Data Collection' },
  { id: 'processing', number: '03', title: 'Data Processing' },
  { id: 'about', number: '04', title: 'Model Development' },
  { id: 'digital-twin', number: '05', title: 'Digital Twin' },
  { id: 'validation', number: '06', title: 'Validation' },
  { id: 'forecast', number: '07', title: 'Visualization' },
  { id: 'scenario', number: '08', title: 'Scenario Analysis' }
];

export const WorkflowBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-6 py-2.5 overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-max gap-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mr-2 flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          OFFICIAL WORKFLOW:
        </span>

        {WORKFLOW_STAGES.map((stage, idx) => {
          const isActive = activeTab === stage.id;
          const isPast = WORKFLOW_STAGES.findIndex(s => s.id === activeTab) > idx;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setActiveTab(stage.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-102'
                    : isPast
                    ? 'bg-slate-800/80 text-cyan-300 hover:bg-slate-800 border border-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800/40 border border-slate-800/60'
                }`}
              >
                <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${
                  isActive ? 'bg-slate-950/30 text-slate-950 font-bold' : 'text-slate-400'
                }`}>
                  {stage.number}
                </span>
                <span>{stage.title}</span>
              </button>

              {idx < WORKFLOW_STAGES.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0 mx-0.5" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowBar;
