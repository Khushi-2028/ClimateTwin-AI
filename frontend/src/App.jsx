import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { WorkflowBar } from './components/Layout/WorkflowBar';
import { StatusFooter } from './components/Layout/StatusFooter';
import { GuidedDemoModal } from './components/Demo/GuidedDemoModal';

// Pages
import OverviewPage from './pages/OverviewPage';
import ProblemDefinitionPage from './pages/ProblemDefinitionPage';
import DataCollectionPage from './pages/DataCollectionPage';
import DataProcessingPage from './pages/DataProcessingPage';
import VisualizationPage from './pages/VisualizationPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import ValidationPage from './pages/ValidationPage';
import ScenarioAnalysisPage from './pages/ScenarioAnalysisPage';
import SystemStatusPage from './pages/SystemStatusPage';
import AboutPage from './pages/AboutPage';

// API Services
import { getHealth, getPredict, get7DaysPredict } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [backendStatus, setBackendStatus] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [livePrediction, setLivePrediction] = useState(null);
  const [live7Days, setLive7Days] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Centralized backend data fetcher
  const fetchBackendData = useCallback(async () => {
    setLoading(true);

    // 1. GET /health
    const healthRes = await getHealth();
    if (healthRes.success) {
      setBackendStatus(true);
      setHealthData(healthRes.data);
    } else {
      setBackendStatus(false);
    }

    // 2. GET /predict
    const predictRes = await getPredict();
    if (predictRes.success) {
      setLivePrediction(predictRes.data);
    }

    // 3. GET /predict/7days
    const forecastRes = await get7DaysPredict();
    if (forecastRes.success) {
      setLive7Days(forecastRes.data);
    }

    setLoading(false);
  }, []);

  // Periodic health & API sync
  useEffect(() => {
    fetchBackendData();
    const interval = setInterval(fetchBackendData, 30000);
    return () => clearInterval(interval);
  }, [fetchBackendData]);

  const startDemo = () => {
    setIsDemoOpen(true);
    setActiveTab('setup');
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onStartDemo={startDemo}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          backendStatus={backendStatus}
          onRefresh={fetchBackendData}
        />

        {/* Persistent Workflow Stepper */}
        <WorkflowBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic Workspace Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {activeTab === 'overview' && (
            <OverviewPage
              setActiveTab={setActiveTab}
              livePrediction={livePrediction}
              backendStatus={backendStatus}
            />
          )}

          {activeTab === 'setup' && (
            <ProblemDefinitionPage
              setActiveTab={setActiveTab}
              onRefresh={fetchBackendData}
              livePrediction={livePrediction}
              loading={loading}
            />
          )}

          {activeTab === 'data' && (
            <DataCollectionPage setActiveTab={setActiveTab} />
          )}

          {activeTab === 'processing' && (
            <DataProcessingPage />
          )}

          {activeTab === 'forecast' && (
            <VisualizationPage
              live7Days={live7Days}
              livePrediction={livePrediction}
              onRefresh={fetchBackendData}
              loading={loading}
            />
          )}

          {activeTab === 'digital-twin' && (
            <DigitalTwinPage
              livePrediction={livePrediction}
              setActiveTab={setActiveTab}
              backendStatus={backendStatus}
              onRefresh={fetchBackendData}
            />
          )}

          {activeTab === 'validation' && (
            <ValidationPage />
          )}

          {activeTab === 'scenario' && (
            <ScenarioAnalysisPage livePrediction={livePrediction} />
          )}

          {activeTab === 'system-status' && (
            <SystemStatusPage
              backendStatus={backendStatus}
              healthData={healthData}
              onRefresh={fetchBackendData}
              loading={loading}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}
        </main>

        {/* Persistent Bottom Status Footer */}
        <StatusFooter backendStatus={backendStatus} />
      </div>

      {/* Guided Demo Stepper Modal */}
      <GuidedDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;
