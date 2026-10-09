import React from 'react';
import { Card } from '../components/Common/Card';
import { InfoTooltip } from '../components/Common/InfoTooltip';
import { Database, CheckCircle2, ArrowRight, Server, Satellite, ShieldCheck } from 'lucide-react';

export const DataCollectionPage = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
          <Database className="w-3.5 h-3.5" />
          <span>DATA SOURCES & INGESTION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 font-heading">Data Sources & National Climate Ingestion</h1>
        <p className="text-sm text-slate-400 mt-1">
          Meteorological datasets from the India Meteorological Department (IMD) powering the PyTorch LSTM models.
        </p>
      </div>

      {/* Primary Data Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-cyan-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Primary Data Source</span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              ● Available
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-100">IMD Gridded Rainfall</h3>
          <p className="text-xs text-slate-400 mt-1">
            Daily rainfall precipitation records at 0.25° × 0.25° spatial resolution from India Meteorological Department.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div>• Ingested via <code>read_imd_rainfall.py</code></div>
            <div>• Parsed to spatial grid series</div>
          </div>
        </Card>

        <Card className="border-cyan-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Primary Data Source</span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              ● Available
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-100">IMD Gridded Temperature</h3>
          <p className="text-xs text-slate-400 mt-1">
            Daily surface mean temperature observations at 1.0° × 1.0° spatial resolution across Indian sub-grids.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div>• Ingested via <code>read_imd_temperature.py</code></div>
            <div>• Converted to spatial grid CSV</div>
          </div>
        </Card>

        <Card className="border-cyan-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Spatial Target</span>
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              Active PoC
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-100">Chhattisgarh Region</h3>
          <p className="text-xs text-slate-400 mt-1">
            Extracted subset bounding box (Lat 18°N–24°N, Lon 80.5°E–84.5°E) for regional spatial alignment.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div>• 24 interpolation spatial grid points</div>
            <div>• 36,874 temporal sequence records</div>
          </div>
        </Card>
      </div>

      {/* Data Flow Diagram */}
      <Card title="Data Ingestion Pipeline Flow" icon={Server}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
          {[
            { title: 'IMD National Data', desc: 'Raw binary grid files (.grd / .bin)', detail: 'Official IMD Data Source' },
            { title: 'Raw Climate Data', desc: 'Spatio-temporal decoding & cleaning', detail: 'Decoding Scripts' },
            { title: 'Preprocessing', desc: 'Chhattisgarh bounding box & grid merge', detail: 'merge_climate_data.py' },
            { title: 'AI Dataset', desc: 'Normalized 7-day sequence tensors', detail: 'X.npy & Y.npy Tensors' },
          ].map((step, idx) => (
            <div key={idx} className="relative">
              <div className="glass-card rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-cyan-400 mb-1">STAGE 0{idx + 1}</div>
                  <h4 className="text-xs font-bold text-slate-100">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{step.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-300">
                  {step.detail}
                </div>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* National Dataset Expansion (Future Scope) */}
      <Card title="National Dataset Expansion Roadmap" icon={Satellite}>
        <div className="space-y-3 text-xs">
          <p className="text-slate-300">
            Future Earth Observation dataset integration planned for national deployment scaling:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">INSAT-3D / 3DR</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Future Integration
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Geostationary satellite thermal infrared and water vapor channels for cloud tracking.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">MOSDAC (SAC / ISRO)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Future Integration
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Meteorological & Oceanographic Satellite Data Archival Centre soil moisture products.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Bhuvan Geo-portal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Future Integration
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                ISRO geospatial administrative vector boundaries and land-use land-cover (LULC) layers.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DataCollectionPage;
