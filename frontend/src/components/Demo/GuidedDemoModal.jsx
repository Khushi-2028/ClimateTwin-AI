import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X } from 'lucide-react';

const DEMO_STEPS = [
  { stage: 'setup', title: 'Step 1: Select Region & Variables', desc: 'Configure target region (Chhattisgarh pilot) and climate parameters (Rainfall & Temperature).' },
  { stage: 'data', title: 'Step 2: Inspect IMD National Datasets', desc: 'Ingest daily gridded rainfall (0.25°) and surface temperature (1.0°) from IMD.' },
  { stage: 'processing', title: 'Step 3: Temporal Sequence Pipeline', desc: 'Transform observations into 7-day sliding window sequence tensors (36,874 samples).' },
  { stage: 'about', title: 'Step 4: PyTorch LSTM Architecture', desc: 'Review 2-layer LSTM neural network (64 hidden units, 7x7 input channels).' },
  { stage: 'digital-twin', title: 'Step 5: Launch Spatial Digital Twin', desc: 'Explore virtual climate map of Chhattisgarh with GeoJSON boundaries and live observed vs predicted state.' },
  { stage: 'validation', title: 'Step 6: Empirical Model Metrics', desc: 'Validate loss convergence across 20 Epochs (MSE = 0.001907).' },
  { stage: 'forecast', title: 'Step 7: 7-Day Live AI Forecast', desc: 'Execute real backend inference GET /predict/7days for temperature & rainfall forecast series.' },
  { stage: 'scenario', title: 'Step 8: Run What-If Scenario Simulation', desc: 'Adjust temperature (+2°C) & rainfall (-20%) sliders to analyze climate sensitivity.' },
];

export const GuidedDemoModal = ({ isOpen, onClose, setActiveTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setActiveTab(DEMO_STEPS[nextIndex].stage);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setActiveTab(DEMO_STEPS[prevIndex].stage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-heading">
                Judges Presentation Demo Mode
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Guided Stage {currentStepIndex + 1} of {DEMO_STEPS.length}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Card Content */}
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {currentStep.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentStep.desc}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-1.5 py-2">
            {DEMO_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-cyan-400'
                    : idx < currentStepIndex
                    ? 'w-2 bg-slate-600'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentStepIndex === DEMO_STEPS.length - 1 ? 'COMPLETE DEMO' : 'NEXT STAGE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedDemoModal;
