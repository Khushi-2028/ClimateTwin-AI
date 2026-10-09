import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CHHATTISGARH_STATE_GEOJSON, CHHATTISGARH_DISTRICTS_GEOJSON, CHHATTISGARH_BOUNDS } from '../../data/chhattisgarhGeoJSON';
import { CHHATTISGARH_DISTRICTS, CHHATTISGARH_CITIES, PILOT_REGION } from '../../data/chhattisgarhGrid';
import { getWeatherCondition } from '../../utils/weatherUtils';
import { Layers, MapPin, RotateCcw, Thermometer, CloudRain, Sparkles, Search, Globe2, SunMedium } from 'lucide-react';

// Controller component to dynamically fit bounds or pan view
function MapBoundsController({ targetBounds, targetCenter, targetZoom, resetTrigger }) {
  const map = useMap();

  useEffect(() => {
    if (resetTrigger > 0) {
      map.fitBounds(CHHATTISGARH_BOUNDS, { padding: [25, 25], animate: true, duration: 1.2 });
    }
  }, [resetTrigger, map]);

  useEffect(() => {
    if (targetCenter) {
      map.setView(targetCenter, targetZoom || 11, { animate: true, duration: 1.2 });
    }
  }, [targetCenter, targetZoom, map]);

  return null;
}

// Custom DivIcon generator for district name & emoji markers on map
function createDistrictLabelIcon(name, emoji) {
  return L.divIcon({
    className: 'district-label-marker',
    html: `<div style="
      font-family: Inter, sans-serif;
      font-size: 10px;
      font-weight: 700;
      color: #f8fafc;
      text-shadow: 0px 1px 3px rgba(0,0,0,0.9), 0px 0px 6px rgba(0,0,0,0.9);
      white-space: nowrap;
      pointer-events: none;
      transform: translate(-50%, -50%);
      display: flex;
      items-center;
      gap: 3px;
    "><span style="font-size: 12px;">${emoji}</span> ${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
}

export const ClimateMap = ({
  selectedVariable,
  setSelectedVariable,
  activeStateMode,
  setActiveStateMode,
  activeDistrict,
  setActiveDistrict,
  livePrediction,
  isScenario = false,
  scenarioDeltas = { temp: 2.0, rain: -20 }
}) => {
  const [mapLayer, setMapLayer] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [targetCenter, setTargetCenter] = useState(null);
  const [targetZoom, setTargetZoom] = useState(11);
  const [resetCount, setResetCount] = useState(0);

  // Global prediction delta offset if activeStateMode is predicted or scenario
  const tempOffset = isScenario ? scenarioDeltas.temp : (activeStateMode === 'predicted' ? -0.5 : 0);
  const rainMult = isScenario ? (1 + scenarioDeltas.rain / 100) : (activeStateMode === 'predicted' ? 0.9 : 1.0);

  // Helper function to resolve district-specific spatial climate values independently
  const getDistrictClimateData = (distName) => {
    const record = CHHATTISGARH_DISTRICTS.find(d => d.name.toLowerCase().includes(distName.toLowerCase())) || CHHATTISGARH_DISTRICTS[0];
    const distTemp = +(record.baseTemp + tempOffset).toFixed(2);
    const distRain = +Math.max(0, record.baseRain * rainMult).toFixed(2);
    const condition = getWeatherCondition({ rainfall_mm: distRain, temperature_c: distTemp });

    return {
      ...record,
      distTemp,
      distRain,
      condition
    };
  };

  // Search Filter
  const searchResults = CHHATTISGARH_DISTRICTS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (item) => {
    setTargetCenter([item.lat, item.lon]);
    setTargetZoom(11);
    setSearchQuery('');
    setActiveDistrict(item);
  };

  const handleResetToState = () => {
    setTargetCenter(null);
    setResetCount(r => r + 1);
  };

  // Map Tile Providers (Standard, Satellite, Terrain)
  const TILE_URLS = {
    standard: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  const TILE_ATTRIBUTIONS = {
    standard: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS',
    terrain: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };

  // District GeoJSON styling function (Evaluates each district independently!)
  const getDistrictStyle = (feature) => {
    const distData = getDistrictClimateData(feature.properties.name);
    const isSelected = activeDistrict?.name?.toLowerCase() === feature.properties.name?.toLowerCase();
    
    let fillColor = '#3b82f6';
    if (selectedVariable === 'temperature') {
      fillColor = distData.distTemp > 32.2 ? '#ef4444' : distData.distTemp > 32.0 ? '#f59e0b' : '#38bdf8';
    } else if (selectedVariable === 'rainfall') {
      fillColor = distData.distRain > 4.5 ? '#06b6d4' : distData.distRain > 3.2 ? '#3b82f6' : '#64748b';
    } else {
      // Condition Layer Visuals
      fillColor = distData.condition.type.includes('heavy') ? '#0891b2' : distData.condition.type.includes('rain') ? '#0284c7' : '#f59e0b';
    }

    return {
      fillColor: fillColor,
      fillOpacity: isSelected ? 0.7 : 0.25,
      color: isSelected ? '#ffffff' : '#0284c7',
      weight: isSelected ? 3.5 : 1.2,
      dashArray: isSelected ? '' : '3',
    };
  };

  const onEachDistrict = (feature, layer) => {
    const distName = feature.properties.name;
    const distData = getDistrictClimateData(distName);

    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.75,
          weight: 3,
          color: '#ffffff'
        });
      },
      mouseout: (e) => {
        const target = e.target;
        target.setStyle(getDistrictStyle(feature));
      },
      click: () => {
        const match = CHHATTISGARH_DISTRICTS.find(d => d.name.toLowerCase().includes(distName.toLowerCase()));
        setActiveDistrict(match || distData);
      }
    });

    layer.bindTooltip(`
      <div style="font-family: Inter, sans-serif; font-size: 11px; padding: 4px 8px;">
        <span style="font-size: 14px;">${distData.condition.icon}</span> <strong style="color: #0284c7;">${distName} District</strong><br/>
        <span style="color: #475569; font-size: 10px;">Temp: ${distData.distTemp}°C | Rain: ${distData.distRain}mm</span>
      </div>
    `, { sticky: true });
  };

  return (
    <div className="space-y-3">
      {/* SEARCH & CONTROLS BAR ABOVE MAP */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-100 font-heading tracking-tight flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              DISTRICT-WISE CLIMATE DIGITAL TWIN MAP
            </h3>
            <p className="text-xs text-slate-400">
              Independent district-wise weather conditions, rainfall & temperature calculated from IMD dataset
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="relative min-w-[280px] max-w-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search district in Chhattisgarh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 text-slate-100 text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            {/* Suggestions */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto divide-y divide-slate-800/60 font-sans text-xs">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => {
                    const cData = getDistrictClimateData(item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleSelectLocation(item)}
                        className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200 cursor-pointer"
                      >
                        <span className="font-semibold text-cyan-300 flex items-center gap-1">
                          <span>{cData.condition.icon}</span> {item.name} District
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{cData.distTemp}°C | {cData.distRain}mm</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-2.5 text-[11px] text-slate-400 text-center">No matching district found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MAP LAYER TOGGLES & CLIMATE CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 font-mono text-xs">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold px-2">LAYERS:</span>
            {[
              { id: 'standard', label: '🗺️ Standard' },
              { id: 'satellite', label: '🛰️ Satellite' },
              { id: 'terrain', label: '⛰️ Terrain' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setMapLayer(l.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  mapLayer === l.id
                    ? 'bg-slate-800 text-slate-100 font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CLIMATE LAYER SWITCH (Rainfall | Temperature | Condition) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedVariable('rainfall')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedVariable === 'rainfall'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>🌧 RAINFALL</span>
            </button>

            <button
              onClick={() => setSelectedVariable('temperature')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedVariable === 'temperature'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>🌡 TEMPERATURE</span>
            </button>

            <button
              onClick={() => setSelectedVariable('condition')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedVariable === 'condition'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>☁️ CONDITION</span>
            </button>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveStateMode('current')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeStateMode === 'current'
                  ? 'bg-slate-800 text-slate-100 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CURRENT
            </button>

            <button
              onClick={() => setActiveStateMode('predicted')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeStateMode === 'predicted'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PREDICTED
            </button>
          </div>

          <button
            onClick={handleResetToState}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1.5 cursor-pointer font-sans text-xs font-bold shadow-md"
            title="Fit Bounds to Complete Chhattisgarh State"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESET TO CHHATTISGARH</span>
          </button>
        </div>
      </div>

      {/* LEAFLET MAP CONTAINER */}
      <div className="relative w-full h-[580px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl z-10">
        <MapContainer
          bounds={CHHATTISGARH_BOUNDS}
          boundsOptions={{ padding: [20, 20] }}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <MapBoundsController targetCenter={targetCenter} targetZoom={targetZoom} resetTrigger={resetCount} />
          <ZoomControl position="bottomright" />

          <TileLayer
            key={mapLayer}
            url={TILE_URLS[mapLayer]}
            attribution={TILE_ATTRIBUTIONS[mapLayer]}
            maxZoom={18}
          />

          <GeoJSON
            data={CHHATTISGARH_STATE_GEOJSON}
            style={{
              fillColor: '#0284c7',
              fillOpacity: 0.04,
              color: '#38bdf8',
              weight: 3.5,
            }}
          />

          {/* District Polygons */}
          <GeoJSON
            key={`districts-${mapLayer}-${selectedVariable}-${activeStateMode}-${isScenario}-${activeDistrict.name}`}
            data={CHHATTISGARH_DISTRICTS_GEOJSON}
            style={getDistrictStyle}
            onEachFeature={onEachDistrict}
          />

          {/* Dynamic District Weather Emoji + Name Markers */}
          {CHHATTISGARH_DISTRICTS_GEOJSON.features.map((f) => {
            if (!f.properties.center) return null;
            const dData = getDistrictClimateData(f.properties.name);
            return (
              <Marker
                key={`label-${f.properties.id}`}
                position={f.properties.center}
                icon={createDistrictLabelIcon(f.properties.name, dData.condition.icon)}
                interactive={false}
              />
            );
          })}

          {/* District Click Markers & Popups */}
          {CHHATTISGARH_DISTRICTS.map((dist) => {
            const distData = getDistrictClimateData(dist.name);
            const isSelected = activeDistrict?.id === dist.id;
            return (
              <CircleMarker
                key={dist.id}
                center={[dist.lat, dist.lon]}
                radius={isSelected ? 10 : 6}
                pathOptions={{
                  color: isSelected ? '#ffffff' : '#0284c7',
                  fillColor: selectedVariable === 'temperature' ? '#f59e0b' : '#06b6d4',
                  fillOpacity: 0.9,
                  weight: isSelected ? 3 : 1.5
                }}
                eventHandlers={{
                  click: () => setActiveDistrict(distData)
                }}
              >
                {/* DISTRICT CLICK POPUP CARD */}
                <Popup>
                  <div className="p-2 space-y-2 font-sans text-xs min-w-[220px]">
                    <div className="font-bold text-cyan-600 border-b border-slate-200 pb-1 flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-heading text-sm">
                        <span className="text-lg" role="img" aria-label={distData.condition.ariaLabel}>{distData.condition.icon}</span>
                        {dist.name} District
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Chhattisgarh</span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-700 font-mono">
                      <div className="flex justify-between">
                        <strong>Condition:</strong>
                        <span className="font-bold text-cyan-700">{distData.condition.icon} {distData.condition.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>Temperature:</strong>
                        <span className="font-bold text-amber-600">{distData.distTemp} °C</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>Rainfall:</strong>
                        <span className="font-bold text-cyan-600">{distData.distRain} mm</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Data Source:</span>
                      <span className="text-emerald-700 font-bold">IMD Spatial Dataset</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Selected District Badge */}
        {(() => {
          const selectedData = getDistrictClimateData(activeDistrict.name);
          return (
            <div className="absolute top-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-cyan-500/30 text-xs shadow-2xl space-y-1 max-w-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-cyan-400 text-xs">
                <span className="text-xl" role="img" aria-label={selectedData.condition.ariaLabel}>{selectedData.condition.icon}</span>
                <span>{activeDistrict.name.toUpperCase()}: {selectedData.condition.label.toUpperCase()}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-tight">
                Temp: <strong>{selectedData.distTemp} °C</strong> | Rain: <strong>{selectedData.distRain} mm</strong>
              </p>

              {isScenario && (
                <div className="mt-2 p-1.5 rounded bg-amber-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>HYPOTHETICAL CLIMATE SCENARIO</span>
                </div>
              )}
            </div>
          );
        })()}

        {/* Dynamic Legend */}
        <div className="absolute bottom-6 left-4 z-20 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs shadow-2xl space-y-2 max-w-xs">
          <div className="font-mono text-[11px] font-bold text-slate-200 border-b border-slate-800 pb-1">
            DISTRICT WEATHER LEGEND
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>☀️</span> <span>Clear / Warm</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>🌤️</span> <span>Pleasant / Mild</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>🌦️</span> <span>Light Rain</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>🌧️</span> <span>Rain / Heavy</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>⛈️</span> <span>Very Heavy Rain</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>🥵</span> <span>Hot (&gt;32°C)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateMap;
