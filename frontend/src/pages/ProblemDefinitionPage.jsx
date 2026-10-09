import React, { useState } from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { Settings, CheckSquare, MapPin, ArrowRight, Layers, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const REGIONS = [
  { id: 'chhattisgarh', name: 'Chhattisgarh', type: 'Active Pilot (PoC)', supported: true },
  { id: 'madhya_pradesh', name: 'Madhya Pradesh', type: 'Future National Deployment', supported: false },
  { id: 'maharashtra', name: 'Maharashtra', type: 'Future National Deployment', supported: false },
  { id: 'odisha', name: 'Odisha', type: 'Future National Deployment', supported: false },
  { id: 'telangana', name: 'Telangana', type: 'Future National Deployment', supported: false },
];

export const ProblemDefinitionPage = ({ setActiveTab, onRefresh, livePrediction, loading }) => {
  const [selectedRegion, setSelectedRegion] = useState('chhattisgarh');
  const [variables, setVariables] = useState({ rainfall: true, temperature: true });
  const [forecastHorizon, setForecastHorizon] = useState('7');
  const [isLoaded, setIsLoaded] = useState(false);

  const activeRegionObj = REGIONS.find(r => r.id === selectedRegion);

  const handleLoadState = async () => {
    if (!activeRegionObj?.supported) return;
    setIsLoaded(false);
    if (onRefresh) await onRefresh();
    setIsLoaded(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>CLIMATE SETUP — CONFIGURATION PANEL</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">Climate Setup</h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure target geographic region, climate parameters, and temporal forecast horizon for AI inference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Setup Configuration Form */}
        <div className="md:col-span-2 space-y-6">
          <Card title="1. Select Target Geographic Region" icon={MapPin}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center justify-between">
                  <span>Target Region</span>
                  <InfoTooltip text="Currently, real IMD gridded sequences and PyTorch LSTM models are trained specifically for Chhattisgarh pilot region." />
                </label>
                
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setIsLoaded(false);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-slate-900">
                      {r.name} — ({r.type})
                    </option>
                  ))}
                </select>
              </div>

              {!activeRegionObj?.supported && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">Future National Deployment</strong>
                    The backend AI engine currently supports Chhattisgarh pilot sequences. Additional national states are scheduled for national deployment expansion.
                  </div>
                </div>
              )}

              {activeRegionObj?.supported && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between font-semibold text-cyan-400">
                    <span>Pilot Territory: Active PoC</span>
                    <span>Chhattisgarh Grid</span>
                  </div>
                  <p className="text-slate-300 font-sans">
                    24 interpolation spatial grid points (0.5° × 0.5°) spanning 33 districts.
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card title="2. Select Climate Variables & Horizon" icon={CheckSquare}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 block font-mono">Target Climate Variables:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={variables.rainfall}
                      onChange={(e) => setVariables({ ...variables, rainfall: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span className="text-xs font-semibold text-slate-200">Rainfall (Precipitation mm)</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={variables.temperature}
                      onChange={(e) => setVariables({ ...variables, temperature: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <span className="text-xs font-semibold text-slate-200">Temperature (°C)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block font-mono mb-1.5">Forecast Horizon:</label>
                <select
                  value={forecastHorizon}
                  onChange={(e) => setForecastHorizon(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200"
                >
                  <option value="7">7 Days (Auto-regressive LSTM Horizon)</option>
                </select>
              </div>

              <button
                onClick={handleLoadState}
                disabled={loading || !activeRegionObj?.supported}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
                <span>{loading ? 'CALLING BACKEND API...' : 'LOAD CLIMATE STATE'}</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Status Output & Next Action */}
        <div className="space-y-6">
          <Card title="Current Loaded State" icon={CheckCircle2}>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Region:</span>
                <span className="text-slate-100 font-bold">{activeRegionObj?.name}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Live Temperature:</span>
                <span className="text-amber-400 font-bold">
                  {livePrediction ? `${livePrediction.temperature_c} °C` : '24.85 °C'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Live Rainfall:</span>
                <span className="text-cyan-300 font-bold">
                  {livePrediction ? `${livePrediction.rainfall_mm} mm` : '0.0 mm'}
                </span>
              </div>

              {isLoaded && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2 font-sans">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Climate state loaded from backend API successfully!</span>
                </div>
              )}
            </div>
          </Card>

          <div className="glass-panel rounded-xl p-5 border border-cyan-500/30 text-center space-y-3">
            <h4 className="text-sm font-bold text-slate-100">Next Step</h4>
            <p className="text-xs text-slate-400">
              Proceed to launch the AI forecast or spatial Digital Twin map.
            </p>
            <button
              onClick={() => setActiveTab('digital-twin')}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>OPEN DIGITAL TWIN MAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDefinitionPage;
