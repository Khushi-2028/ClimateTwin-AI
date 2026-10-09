import React from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { TRAINING_HISTORY_DATA, MODEL_METRICS_STATIC } from '../data/chhattisgarhGrid';
import { CheckCircle2, LineChart as ChartIcon, Table, Cpu, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ValidationPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>WORKFLOW STAGE 06</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">Model Training & Validation</h1>
        <p className="text-sm text-slate-400 mt-1">
          Empirical loss curves and quantitative metrics extracted from PyTorch training artifacts (saved_models/training_history.csv).
        </p>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-cyan-500/30">
          <div className="text-xs text-slate-400 font-mono uppercase mb-1">Mean Squared Error (MSE)</div>
          <div className="text-2xl font-bold font-mono text-cyan-400">{MODEL_METRICS_STATIC.mse}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Epoch 20 Minimum Loss</div>
        </Card>

        <Card className="border-cyan-500/30">
          <div className="text-xs text-slate-400 font-mono uppercase mb-1">Root MSE (RMSE)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{MODEL_METRICS_STATIC.rmse}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Normalized Error Metric</div>
        </Card>

        <Card className="border-cyan-500/30">
          <div className="text-xs text-slate-400 font-mono uppercase mb-1">Mean Absolute Error (MAE)</div>
          <div className="text-2xl font-bold font-mono text-amber-400">{MODEL_METRICS_STATIC.mae}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Direct Residual Deviation</div>
        </Card>

        <Card className="border-cyan-500/30">
          <div className="text-xs text-slate-400 font-mono uppercase mb-1">Training Epochs</div>
          <div className="text-2xl font-bold font-mono text-slate-100">{MODEL_METRICS_STATIC.epochsTrained} Epochs</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Batch Size = 64 (Adam lr=0.001)</div>
        </Card>
      </div>

      {/* Recharts Loss History Chart */}
      <Card title="PyTorch Training vs Validation Loss (20 Epochs)" icon={ChartIcon}>
        <div className="py-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TRAINING_HISTORY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="epoch" stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 0.012]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ fontFamily: 'JetBrains Mono' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="train_loss" name="Training Loss (MSE)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="val_loss" name="Validation Loss (MSE)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Dataset Split: 80% Train (29,499 seqs) | 20% Test (7,375 seqs)</span>
            <span className="text-cyan-400">Best Model: saved_models/climate_lstm_best.pth</span>
          </div>
        </div>
      </Card>

      {/* Epoch Data Table */}
      <Card title="Training Epoch History Record" icon={Table}>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-2">Epoch</th>
                <th className="pb-2">Training Loss</th>
                <th className="pb-2">Validation Loss</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {TRAINING_HISTORY_DATA.slice(0, 10).map((row) => (
                <tr key={row.epoch} className="hover:bg-slate-900/50">
                  <td className="py-2 text-cyan-400 font-bold">Epoch {row.epoch < 10 ? `0${row.epoch}` : row.epoch}</td>
                  <td className="py-2">{row.train_loss.toFixed(6)}</td>
                  <td className="py-2">{row.val_loss.toFixed(6)}</td>
                  <td className="py-2 text-[10px] text-emerald-400">
                    {row.val_loss === Math.min(...TRAINING_HISTORY_DATA.map(d => d.val_oss)) ? '★ Best Checkpoint' : 'Evaluated'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ValidationPage;
