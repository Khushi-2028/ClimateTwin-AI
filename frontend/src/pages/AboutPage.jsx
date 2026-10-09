import React from 'react';
import { Card } from '../components/Common/Card';
import { BookOpen, Target, Cpu, Database, Brain, Globe, ShieldCheck } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PROJECT METHODOLOGY & SPECIFICATIONS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">About & Research Methodology</h1>
        <p className="text-sm text-slate-400 mt-1">
          Technical specifications, problem statement alignment, and system architecture details for ClimateTwin AI.
        </p>
      </div>

      {/* Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Official Problem Statement" icon={Target}>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 font-semibold font-mono">
              "AI-Powered Digital Twin of India's Climate using India's National Data"
            </div>
            <p>
              Climate change induces intense localized weather anomalies across India. Traditional static forecasting models fail to provide interactive scenario simulation capacity.
            </p>
            <p>
              <strong>Objective:</strong> Construct an interactive, operational AI Digital Twin prototype using national India Meteorological Department (IMD) observations to enable spatio-temporal forecasting and scenario exploration.
            </p>
          </div>
        </Card>

        <Card title="Core Technology Stack" icon={Cpu}>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Backend API</span>
              <span className="text-slate-100 font-bold">Python FastAPI + Uvicorn</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">AI Deep Learning</span>
              <span className="text-cyan-400 font-bold">PyTorch 2.x (ClimateLSTM)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Frontend Framework</span>
              <span className="text-slate-100 font-bold">React 18 + Vite + Tailwind CSS v4</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Geospatial Mapping</span>
              <span className="text-emerald-400 font-bold">React Leaflet + GeoJSON</span>
            </div>
          </div>
        </Card>
      </div>

      {/* End-to-End Methodology */}
      <Card title="End-to-End Methodological Architecture" icon={Brain}>
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            The system operates through an end-to-end data assimilation, neural inference, and digital twin rendering workflow:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">1. Ingestion</div>
              <p className="text-[11px] font-sans text-slate-400">IMD gridded rainfall (0.25°) and surface temperature (1.0°) files.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">2. Sequences</div>
              <p className="text-[11px] font-sans text-slate-400">36,874 sliding window tensors (7 time steps × 7 features).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">3. Neural Net</div>
              <p className="text-[11px] font-sans text-slate-400">2-layer stacked PyTorch LSTM (64 hidden units, Dropout 0.2).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">4. Digital Twin</div>
              <p className="text-[11px] font-sans text-slate-400">Interactive GeoJSON map & What-if scenario sensitivity sliders.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
