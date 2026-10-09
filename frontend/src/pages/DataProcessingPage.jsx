import React, { useState } from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { Cpu, Layers, Table, Sliders, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

export const DataProcessingPage = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>PREPROCESSING PIPELINE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">Data Processing & Feature Engineering</h1>
        <p className="text-sm text-slate-400 mt-1">
          Transformation of raw spatio-temporal Observations into normalized sliding window sequence tensors for PyTorch LSTM inference.
        </p>
      </div>

      {/* Compact Interactive Pipeline */}
      <Card title="Interactive Data Processing Pipeline" icon={Layers}>
        <div className="py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
            {[
              { step: '01', name: 'RAW DATA', file: 'IMD Binary Grids' },
              { step: '02', name: 'REGION EXTRACTION', file: 'extract_chhattisgarh.py' },
              { step: '03', name: 'GRID / DATA ALIGNMENT', file: '0.5° × 0.5° Common Grid' },
              { step: '04', name: 'FEATURE ENGINEERING', file: 'Date/Cyclic Vectors' },
              { step: '05', name: 'TEMPORAL SEQUENCES', file: '7-Day Sliding Window' },
              { step: '06', name: 'MODEL INPUT', file: 'X.npy & Y.npy Tensors' },
            ].map((p) => (
              <div 
                key={p.step} 
                className="glass-card rounded-xl p-3 border border-slate-800 text-center flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-[9px] font-mono text-cyan-400 font-bold mb-1">STEP {p.step}</div>
                <div className="text-[11px] font-bold text-slate-100 uppercase tracking-tight leading-tight">
                  {p.name}
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-2 truncate" title={p.file}>
                  {p.file}
                </div>
              </div>
            ))}
          </div>

          {/* Expandable "How preprocessing works" */}
          <div className="mt-4 pt-2 border-t border-slate-800">
            <button
              onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
              className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-mono font-semibold transition-colors cursor-pointer"
            >
              <span>How Preprocessing Works</span>
              {isHowItWorksOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isHowItWorksOpen && (
              <div className="p-4 mt-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <p>
                  <strong>1. Grid Ingestion & Alignment:</strong> Raw IMD binary files are decoded into daily precipitation (0.25°) and temperature (1.0°) grids, aligned onto a common 0.5° spatial grid for Chhattisgarh.
                </p>
                <p>
                  <strong>2. Cyclic Feature Engineering:</strong> Temporal features (Month, WeekOfYear, DayOfYear) are normalized alongside spatial coordinates (Latitude, Longitude) and climate channels (Rainfall, Temperature).
                </p>
                <p>
                  <strong>3. Sliding Window Creation:</strong> For each spatial grid coordinate, continuous 7-day sequences are generated to form the model input tensor X (36874 x 7 x 7) and target tensor Y (36874 x 2).
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Verified Backend Dataset Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Verified Dataset Statistics" icon={Table}>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Total Sequence Tensors (X.npy)</span>
              <span className="text-cyan-400 font-bold text-sm">36,874 Sequences</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Time Steps per Sequence</span>
              <span className="text-slate-100 font-bold">7 Time Steps (Days)</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Input Feature Channels</span>
              <span className="text-slate-100 font-bold">7 Channels</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Target Output Channels (Y.npy)</span>
              <span className="text-emerald-400 font-bold">2 Channels (Rain + Temp)</span>
            </div>
          </div>
        </Card>

        <Card title="Input Channels & Scaler Artifacts" icon={Sliders}>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1.5 font-mono">7 Input Features (Scaled via MinMaxScaler):</span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['Rainfall_mm', 'Temperature_C', 'Latitude', 'Longitude', 'Month', 'WeekOfYear', 'DayOfYear'].map((f, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                    {i + 1}. {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-mono">
                <span className="text-cyan-400">Saved Scaler Artifacts:</span>
                <span className="text-[11px] text-slate-400">datasets/processed/ai/</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  • <code>feature_scaler.pkl</code>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  • <code>target_scaler.pkl</code>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataProcessingPage;
