import React, { useState } from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { getWeatherCondition } from '../utils/weatherUtils';
import { Sliders, Play, Thermometer, CloudRain, AlertTriangle, Table, Sparkles, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ScenarioAnalysisPage = ({ livePrediction }) => {
  // Baseline values fetched from backend GET /predict or fallback
  const baseTemp = livePrediction ? livePrediction.temperature_c : 24.85;
  const baseRain = livePrediction ? (livePrediction.rainfall_mm > 0 ? livePrediction.rainfall_mm : 2.0) : 2.0;

  // Sliders state
  const [tempDelta, setTempDelta] = useState(2.0); // +2°C default
  const [rainDelta, setRainDelta] = useState(-20); // -20% default

  // Scenario Math
  const scenarioTemp = +(baseTemp + tempDelta).toFixed(2);
  const scenarioRain = +Math.max(0, baseRain * (1 + rainDelta / 100)).toFixed(2);

  // Compute dynamic weather conditions
  const baseCondition = getWeatherCondition({ rainfall_mm: baseRain, temperature_c: baseTemp });
  const scenarioCondition = getWeatherCondition({ rainfall_mm: scenarioRain, temperature_c: scenarioTemp });

  const comparisonData = [
    { name: 'Temperature (°C)', Baseline: baseTemp, Scenario: scenarioTemp },
    { name: 'Rainfall (mm)', Baseline: baseRain, Scenario: scenarioRain },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>WHAT-IF CLIMATE SIMULATOR</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">What-If Climate Simulator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore hypothetical changes in climate conditions relative to the baseline state.
        </p>
      </div>

      {/* DYNAMIC SCENARIO CONDITION CHANGE BANNER */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300 font-bold">Hypothetical Scenario Condition Change:</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1.5 font-bold">
            <span className="text-base" role="img" aria-label={baseCondition.ariaLabel}>{baseCondition.icon}</span>
            <span>Baseline: {baseCondition.label}</span>
          </span>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />

          <span className="px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-extrabold flex items-center gap-1.5">
            <span className="text-base" role="img" aria-label={scenarioCondition.ariaLabel}>{scenarioCondition.icon}</span>
            <span>Scenario: {scenarioCondition.label}</span>
          </span>
        </div>
      </div>

      {/* Baseline & Scenario Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scenario Controls Panel */}
        <div className="md:col-span-2 space-y-6">
          <Card title="SCENARIO CONTROLS" icon={Sliders}>
            <div className="space-y-6">
              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    Temperature Change (°C)
                  </span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                    tempDelta > 0 ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-blue-950 text-blue-400 border border-blue-500/30'
                  }`}>
                    {tempDelta > 0 ? `+${tempDelta}°C` : `${tempDelta}°C`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-5.0"
                  max="5.0"
                  step="0.5"
                  value={tempDelta}
                  onChange={(e) => setTempDelta(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>-5°C (Cooling)</span>
                  <span>0°C (Baseline)</span>
                  <span>+5°C (Warming)</span>
                </div>
              </div>

              {/* Rainfall Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <CloudRain className="w-4 h-4 text-cyan-400" />
                    Rainfall Change (%)
                  </span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                    rainDelta >= 0 ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                  }`}>
                    {rainDelta > 0 ? `+${rainDelta}%` : `${rainDelta}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="5"
                  value={rainDelta}
                  onChange={(e) => setRainDelta(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>-50% (Drought Shift)</span>
                  <span>0% (Baseline)</span>
                  <span>+50% (Excess Precipitation)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Scientific Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-mono text-cyan-400 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Scientific Disclaimer:
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-500/30">
                SCENARIO TYPE: Hypothetical
              </span>
            </div>
            <p className="text-[11px] leading-relaxed font-sans pt-1">
              This scenario simulator provides a hypothetical climate-state sensitivity simulation applied to the Digital Twin baseline.
            </p>
          </div>
        </div>

        {/* BASELINE VS SCENARIO STATE CARDS */}
        <div className="space-y-4">
          <Card title="BASELINE CONDITION" icon={Table}>
            <div className="space-y-3 font-mono text-xs text-center py-1">
              <div className="text-4xl my-1" role="img" aria-label={baseCondition.ariaLabel}>
                {baseCondition.icon}
              </div>
              <div className="text-sm font-extrabold text-slate-200">{baseCondition.label}</div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Temp</span>
                  <span className="text-amber-400 font-bold">{baseTemp} °C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Rain</span>
                  <span className="text-cyan-300 font-bold">{baseRain} mm</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="SIMULATED SCENARIO CONDITION" icon={Sparkles}>
            <div className="space-y-3 font-mono text-xs text-center py-1">
              <div className="text-4xl my-1" role="img" aria-label={scenarioCondition.ariaLabel}>
                {scenarioCondition.icon}
              </div>
              <div className="text-sm font-extrabold text-cyan-400">{scenarioCondition.label}</div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
                  <span className="text-slate-400 text-[10px] block">Simulated Temp</span>
                  <span className="text-amber-400 font-bold">{scenarioTemp} °C</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                  <span className="text-slate-400 text-[10px] block">Simulated Rain</span>
                  <span className="text-cyan-300 font-bold">{scenarioRain} mm</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* BASELINE VS SCENARIO TABLE & VISUAL CHART */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="BASELINE VS SCENARIO TABLE" icon={Table}>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2">Parameter</th>
                  <th className="pb-2">Baseline</th>
                  <th className="pb-2">Scenario</th>
                  <th className="pb-2">Delta Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 font-semibold text-slate-100 flex items-center gap-1.5">
                    <span role="img" aria-label={baseCondition.ariaLabel}>{baseCondition.icon}</span>
                    <span>Condition</span>
                  </td>
                  <td className="py-3 font-bold">{baseCondition.label}</td>
                  <td className="py-3 font-bold text-cyan-300">{scenarioCondition.label}</td>
                  <td className="py-3 font-bold text-amber-400">Condition Shift</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 font-semibold text-slate-100">Temperature</td>
                  <td className="py-3">{baseTemp} °C</td>
                  <td className="py-3 font-bold text-amber-400">{scenarioTemp} °C</td>
                  <td className={`py-3 font-bold ${tempDelta > 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {tempDelta > 0 ? `+${tempDelta}°C` : `${tempDelta}°C`}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-3 font-semibold text-slate-100">Rainfall</td>
                  <td className="py-3">{baseRain} mm</td>
                  <td className="py-3 font-bold text-cyan-300">{scenarioRain} mm</td>
                  <td className={`py-3 font-bold ${rainDelta >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                    {rainDelta > 0 ? `+${rainDelta}%` : `${rainDelta}%`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="BASELINE VS SCENARIO VISUAL COMPARISON" icon={BarChart}>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Baseline" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Scenario" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioAnalysisPage;
