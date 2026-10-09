import React from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { getWeatherCondition } from '../utils/weatherUtils';
import { 
  Globe, 
  ArrowRight, 
  Database, 
  Cpu, 
  Brain, 
  Sliders, 
  CloudRain, 
  Thermometer, 
  CheckCircle2,
  Sparkles,
  BarChart2,
  Layers,
  Activity
} from 'lucide-react';

export const OverviewPage = ({ setActiveTab, livePrediction, backendStatus }) => {
  const rawTemp = livePrediction ? livePrediction.temperature_c : 24.85;
  const rawRain = livePrediction ? livePrediction.rainfall_mm : 0.0;
  const condition = getWeatherCondition({ rainfall_mm: rawRain, temperature_c: rawTemp });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner Header */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPERATIONAL CLIMATE CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100 font-heading">
            CLIMATETWIN AI
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            "AI-powered climate prediction and digital twin prototype using national datasets"
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('digital-twin')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Globe className="w-4 h-4 fill-slate-950" />
            <span>OPEN DIGITAL TWIN</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span>RUN 7-DAY FORECAST</span>
          </button>
        </div>
      </div>

      {/* 4 Compact Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase mb-1">Pilot Region</div>
          <div className="text-xl font-bold text-slate-100">Chhattisgarh</div>
          <div className="text-[10px] text-cyan-400 font-mono mt-1">24 Spatial Grid Points</div>
        </Card>

        <Card className="border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase mb-1">Current Condition</div>
          <div className="text-xl font-bold text-slate-100 flex items-center gap-1.5 font-sans">
            <span className="text-2xl" role="img" aria-label={condition.ariaLabel}>{condition.icon}</span>
            <span>{condition.label}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Calculated via Live Data</div>
        </Card>

        <Card className="border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase mb-1">AI Model</div>
          <div className="text-xl font-bold text-slate-100 font-mono">PyTorch LSTM</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">2-Layer Recurrent Network</div>
        </Card>

        <Card className="border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase mb-1">Forecast Horizon</div>
          <div className="text-xl font-bold text-slate-100 font-mono">7 Days</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Auto-regressive Series</div>
        </Card>
      </div>

      {/* SYSTEM PIPELINE (Clickable Stages) */}
      <Card title="SYSTEM PIPELINE" icon={Layers}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 py-2">
          {[
            { step: '01', name: 'IMD DATA', desc: 'Gridded Meteorological Data', tab: 'data', icon: Database },
            { step: '02', name: 'PROCESSING', desc: '7-Day Sequence Tensors', tab: 'processing', icon: Cpu },
            { step: '03', name: 'LSTM', desc: 'PyTorch Neural Network', tab: 'about', icon: Brain },
            { step: '04', name: 'PREDICTION', desc: '7-Day Climate Series', tab: 'forecast', icon: BarChart2 },
            { step: '05', name: 'DIGITAL TWIN', desc: 'Virtual State Map', tab: 'digital-twin', icon: Globe },
            { step: '06', name: 'SCENARIO', desc: 'What-If Simulation', tab: 'scenario', icon: Sliders },
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                onClick={() => setActiveTab(item.tab)}
                className="glass-card rounded-xl p-3.5 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/20">
                    {item.step}
                  </span>
                  <IconComp className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* CURRENT CLIMATE SNAPSHOT (Real Backend Values) */}
      <Card title="CURRENT CLIMATE SNAPSHOT (Live Backend API)" icon={Activity}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">Temperature (GET /predict)</span>
            <div className="text-2xl font-bold text-amber-400 flex items-center gap-1.5">
              <Thermometer className="w-5 h-5 text-amber-400" />
              <span>{rawTemp} °C</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">Rainfall (GET /predict)</span>
            <div className="text-2xl font-bold text-cyan-300 flex items-center gap-1.5">
              <CloudRain className="w-5 h-5 text-cyan-400" />
              <span>{rawRain} mm</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block font-sans font-bold">Dynamic Condition</span>
            <div className="text-sm font-bold text-cyan-300 flex items-center gap-1.5 pt-1 font-sans">
              <span className="text-xl" role="img" aria-label={condition.ariaLabel}>{condition.icon}</span>
              <span>{condition.label}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">API Status</span>
            <div className={`text-sm font-bold flex items-center gap-1.5 pt-1 ${backendStatus ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></span>
              <span>{backendStatus ? 'FastAPI Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewPage;
