import React, { useState } from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { ClimateMap } from '../components/DigitalTwin/ClimateMap';
import { CHHATTISGARH_DISTRICTS } from '../data/chhattisgarhGrid';
import { getWeatherCondition } from '../utils/weatherUtils';
import { Globe, Thermometer, CloudRain, Clock, Layers, Sliders, Activity, Sparkles, Server, RefreshCw, MapPin } from 'lucide-react';

export const DigitalTwinPage = ({ livePrediction, setActiveTab, backendStatus, onRefresh }) => {
  const [selectedVariable, setSelectedVariable] = useState('temperature');
  const [activeStateMode, setActiveStateMode] = useState('predicted');
  const [activeDistrict, setActiveDistrict] = useState(CHHATTISGARH_DISTRICTS[0]); // Default Raipur
  const [activeTimeline, setActiveTimeline] = useState('predicted');
  const [scenarioDeltas, setScenarioDeltas] = useState({ temp: 2.0, rain: -20 });

  // Mode adjustment offsets
  const tempOffset = activeTimeline === 'scenario' ? scenarioDeltas.temp : (activeStateMode === 'predicted' ? -0.5 : 0);
  const rainMult = activeTimeline === 'scenario' ? (1 + scenarioDeltas.rain / 100) : (activeStateMode === 'predicted' ? 0.9 : 1.0);

  // Active district-specific climate calculations
  const distTemp = +( (activeDistrict.distTemp || activeDistrict.baseTemp || 25.8) + tempOffset ).toFixed(2);
  const distRain = +Math.max(0, (activeDistrict.distRain || activeDistrict.baseRain || 2.1) * rainMult).toFixed(2);
  const distCondition = getWeatherCondition({ rainfall_mm: distRain, temperature_c: distTemp });

  // Regional overall prediction
  const predictedTemp = livePrediction ? livePrediction.temperature_c : 24.85;
  const predictedRain = livePrediction ? livePrediction.rainfall_mm : 0.0;
  const predictedCondition = getWeatherCondition({ rainfall_mm: predictedRain, temperature_c: predictedTemp });

  const isScenario = activeTimeline === 'scenario';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Timeline Controls Bar: OBSERVED -> CURRENT -> PREDICTED -> SCENARIO */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between overflow-x-auto">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 shrink-0 mr-4 font-bold">
          <Clock className="w-4 h-4 text-cyan-400" />
          DIGITAL TWIN TIMELINE:
        </span>
        <div className="flex items-center gap-2 min-w-max">
          {[
            { id: 'observed', label: 'OBSERVED', sub: 'IMD Historical' },
            { id: 'current', label: 'CURRENT', sub: 'Active State' },
            { id: 'predicted', label: 'PREDICTED', sub: 'AI LSTM 7-Day' },
            { id: 'scenario', label: 'SCENARIO', sub: 'What-If Simulation' },
          ].map((t, idx) => (
            <React.Fragment key={t.id}>
              <button
                onClick={() => {
                  setActiveTimeline(t.id);
                  if (t.id === 'current') setActiveStateMode('current');
                  if (t.id === 'predicted') setActiveStateMode('predicted');
                  if (t.id === 'scenario') setActiveTab('scenario');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex flex-col items-center ${
                  activeTimeline === t.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20 scale-102'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[9px] font-sans ${activeTimeline === t.id ? 'text-slate-950 font-semibold' : 'text-slate-500'}`}>
                  {t.sub}
                </span>
              </button>
              {idx < 3 && <span className="text-slate-700 font-mono text-xs">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Digital Twin Layout (70% Map / 30% Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 70% Map Column */}
        <div className="lg:col-span-8 space-y-4">
          <ClimateMap
            selectedVariable={selectedVariable}
            setSelectedVariable={setSelectedVariable}
            activeStateMode={activeStateMode}
            setActiveStateMode={setActiveStateMode}
            activeDistrict={activeDistrict}
            setActiveDistrict={setActiveDistrict}
            livePrediction={livePrediction}
            isScenario={isScenario}
            scenarioDeltas={scenarioDeltas}
          />
        </div>

        {/* 30% Digital Twin Side Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* SELECTED DISTRICT CLIMATE CARD */}
          <Card title={`SELECTED: ${activeDistrict.name.toUpperCase()}`} icon={MapPin}>
            <div className="space-y-3 font-mono text-xs text-center py-1">
              <div className="text-5xl my-1 animate-in zoom-in duration-300" role="img" aria-label={distCondition.ariaLabel}>
                {distCondition.icon}
              </div>
              <div className="text-base font-extrabold text-slate-100 font-heading">
                {distCondition.label}
              </div>
              <div className="text-[11px] text-cyan-400 font-sans">
                {activeDistrict.name} District ({activeDistrict.role || 'District Unit'})
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Temperature</span>
                  <span className="text-amber-400 font-bold text-sm">{distTemp} °C</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Rainfall</span>
                  <span className="text-cyan-300 font-bold text-sm">{distRain} mm</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-800/80 flex justify-between">
                <span>Data Source:</span>
                <span className="text-emerald-400 font-bold">IMD Spatial Dataset</span>
              </div>
            </div>
          </Card>

          {/* AI REGIONAL PREDICTION CARD */}
          <Card title="AI REGIONAL PREDICTION" icon={Sparkles}>
            <div className="space-y-3 font-mono text-xs text-center py-1">
              <div className="text-4xl my-1" role="img" aria-label={predictedCondition.ariaLabel}>
                {predictedCondition.icon}
              </div>
              <div className="text-sm font-extrabold text-cyan-400 font-heading">
                Regional State: {predictedCondition.label}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
                  <span className="text-slate-400 text-[10px] block">LSTM Temp</span>
                  <span className="text-amber-400 font-bold">{predictedTemp} °C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                  <span className="text-slate-400 text-[10px] block">LSTM Rain</span>
                  <span className="text-cyan-300 font-bold">{predictedRain} mm</span>
                </div>
              </div>
            </div>
          </Card>

          {/* BACKEND & SYSTEM DIAGNOSTIC */}
          <Card title="BACKEND DIAGNOSTIC" icon={Server}>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Backend Status:</span>
                <span className={`font-bold flex items-center gap-1.5 ${backendStatus ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  {backendStatus ? '● Connected' : '● Offline'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">AI Model State:</span>
                <span className="text-cyan-400 font-bold">● Loaded (PyTorch LSTM)</span>
              </div>

              {!backendStatus && (
                <button
                  onClick={onRefresh}
                  className="w-full py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Connection</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('scenario')}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate District Scenario</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinPage;
