import React from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { Brain, Cpu, CheckCircle2, ArrowRight, Server, Zap, ShieldCheck } from 'lucide-react';
import { MODEL_METRICS_STATIC } from '../data/chhattisgarhGrid';

export const AIModelPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Brain className="w-3.5 h-3.5" />
          <span>WORKFLOW STAGE 04</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">AI Model Architecture & Development</h1>
        <p className="text-sm text-slate-400 mt-1">
          Deep Learning sequence model based on PyTorch Recurrent Networks for spatio-temporal climate prediction.
        </p>
      </div>

      {/* Model Status Bar */}
      <div className="p-4 rounded-xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">PyTorch LSTM Model Status</div>
            <div className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
              <span>climate_lstm_best.pth</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Loaded & Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block">Framework</span>
            <span className="text-cyan-300 font-bold">PyTorch 2.x</span>
          </div>
          <div>
            <span className="text-slate-400 block">Optimizer</span>
            <span className="text-slate-200 font-bold">Adam (lr=0.001)</span>
          </div>
          <div>
            <span className="text-slate-400 block">Loss Metric</span>
            <span className="text-slate-200 font-bold">MSE Loss</span>
          </div>
        </div>
      </div>

      {/* PyTorch Architecture Diagram */}
      <Card title="ClimateLSTM PyTorch Architecture" icon={Cpu}>
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { title: 'Input Layer', spec: '7 Days × 7 Features', desc: 'Normalized sequence tensor [batch, 7, 7]', color: 'border-slate-700 bg-slate-950/80 text-cyan-400' },
              { title: 'LSTM Layer 1', spec: 'Hidden Units = 64', desc: 'nn.LSTM(input_size=7, hidden_size=64)', color: 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300' },
              { title: 'LSTM Layer 2', spec: 'Stacked Recurrent Layer', desc: 'num_layers=2, batch_first=True', color: 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300' },
              { title: 'Dropout Regularizer', spec: 'Rate = 0.2 (20%)', desc: 'nn.Dropout(p=0.2) to prevent overfitting', color: 'border-slate-700 bg-slate-950/80 text-amber-300' },
              { title: 'Linear Output Layer', spec: 'FC (64 → 2 Outputs)', desc: 'Rainfall (mm) + Temperature (°C)', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' },
            ].map((node, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${node.color} space-y-1.5 flex flex-col justify-between`}>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase opacity-80 mb-1">Layer 0{idx + 1}</div>
                  <h4 className="text-xs font-extrabold">{node.title}</h4>
                  <div className="text-[11px] font-mono font-semibold mt-1">{node.spec}</div>
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-2 leading-tight">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-cyan-400 font-semibold border-b border-slate-800 pb-2">
              <span>PyTorch Implementation Code snippet (ai/model.py):</span>
              <span className="text-[10px] text-slate-400">Class ClimateLSTM(nn.Module)</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded">
{`class ClimateLSTM(nn.Module):
    def __init__(self, input_size=7, hidden_size=64, num_layers=2, output_size=2):
        super().__init__()
        self.lstm = nn.LSTM(input_size=input_size, hidden_size=hidden_size, num_layers=num_layers, batch_first=True)
        self.dropout = nn.Dropout(0.2)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        output, (hidden, cell) = self.lstm(x)
        hidden = self.dropout(hidden[-1])
        return self.fc(hidden)`}
            </pre>
          </div>
        </div>
      </Card>

      {/* Rationale & Hyperparameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Why LSTM for Climate Intelligence?" icon={Zap}>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              Climate variables exhibit strong temporal auto-correlation and seasonal periodicity. Traditional regression models fail to capture multi-day atmospheric memory.
            </p>
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 space-y-2">
              <strong className="block text-cyan-400 font-semibold">Long Short-Term Memory Rationale:</strong>
              <p className="text-[11px]">
                LSTM cell gates (input, forget, and output gates) retain relevant past atmospheric trends over 7-day sliding sequences while discarding short-term noise, resulting in accurate next-day rainfall and temperature estimates.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Verified Hyperparameters" icon={Server}>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Input Sequence</span>
              <span className="text-slate-100 font-bold">7 Time Steps</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Input Features</span>
              <span className="text-slate-100 font-bold">7 Channels</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Hidden Layer Size</span>
              <span className="text-cyan-400 font-bold">64 Units</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Stacked Layers</span>
              <span className="text-cyan-400 font-bold">2 Layers</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Training Epochs</span>
              <span className="text-slate-100 font-bold">20 Epochs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Batch Size</span>
              <span className="text-slate-100 font-bold">64</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIModelPage;
