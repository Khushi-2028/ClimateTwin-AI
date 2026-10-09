import React from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { Activity, Server, Cpu, RefreshCw, CheckCircle2, AlertCircle, Terminal, Layers } from 'lucide-react';

export const SystemStatusPage = ({ backendStatus, healthData, onRefresh, loading }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>SYSTEM DIAGNOSTICS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 font-heading">System Status & API Diagnostics</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time health monitoring of FastAPI server, PyTorch neural engine, and prediction routes.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>RETRY / REFRESH STATUS</span>
        </button>
      </div>

      {/* Connection Status Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        backendStatus
          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
              backendStatus ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {backendStatus ? <CheckCircle2 className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-heading">
                {backendStatus ? 'FastAPI Backend Online & Operational' : 'Backend Disconnected'}
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Target Endpoint: <code>http://localhost:8000</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`w-3 h-3 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-bold">{backendStatus ? '200 OK — HEALTHY' : 'CONNECTION ERROR'}</span>
          </div>
        </div>
      </div>

      {/* Endpoint Diagnostic Grid */}
      <Card title="Discovered Backend API Routes" icon={Server}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-bold">GET /health</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${backendStatus ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                {backendStatus ? 'Active' : 'Offline'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Health check route exposing service status.</p>
            <div className="text-[10px] font-mono text-slate-300 pt-1 border-t border-slate-800">
              Response: {healthData ? JSON.stringify(healthData) : '{"status": "running"}'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-bold">GET /predict</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${backendStatus ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                {backendStatus ? 'Active' : 'Offline'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Single step PyTorch LSTM inference endpoint.</p>
            <div className="text-[10px] font-mono text-slate-300 pt-1 border-t border-slate-800">
              Response: &#123;"rainfall_mm": 0.0, "temperature_c": 24.85&#125;
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-bold">GET /predict/7days</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${backendStatus ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                {backendStatus ? 'Active' : 'Offline'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Auto-regressive 7-day forecast series.</p>
            <div className="text-[10px] font-mono text-slate-300 pt-1 border-t border-slate-800">
              Returns 7-day array of forecast objects
            </div>
          </div>
        </div>
      </Card>

      {/* Model & System Specifications */}
      <Card title="System Environment & Pilot Configuration" icon={Cpu}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">FastAPI Server</span>
            <span className="text-slate-100 font-bold">Python 3.10+ / Uvicorn</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">AI Framework</span>
            <span className="text-cyan-400 font-bold">PyTorch 2.x</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Model File</span>
            <span className="text-slate-100 font-bold">climate_lstm_best.pth</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Pilot Territory</span>
            <span className="text-emerald-400 font-bold">Chhattisgarh</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemStatusPage;
