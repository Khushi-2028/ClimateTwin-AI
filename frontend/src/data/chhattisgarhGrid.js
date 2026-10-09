/**
 * Chhattisgarh Pilot Region Metadata & District-Wise IMD Spatial Dataset Aggregations
 */

export const PILOT_REGION = {
  id: "chhattisgarh",
  name: "Chhattisgarh",
  country: "India",
  center: [21.2787, 81.8661],
  zoom: 7,
  bounds: [
    [17.78, 80.25], // South-West
    [24.10, 84.40]  // North-East
  ],
  totalGridPoints: 24,
  sequenceCount: 36874,
};

export const CHHATTISGARH_DISTRICTS = [
  { id: 'raipur', name: 'Raipur', lat: 21.25, lon: 81.63, role: 'State Capital', baseTemp: 32.49, baseRain: 2.62, gridLat: 21.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'bilaspur', name: 'Bilaspur', lat: 22.08, lon: 82.14, role: 'Judicial Capital', baseTemp: 32.01, baseRain: 3.69, gridLat: 22.0, gridLon: 82.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'durg', name: 'Durg', lat: 21.19, lon: 81.28, role: 'Industrial District', baseTemp: 32.02, baseRain: 3.33, gridLat: 21.0, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'korba', name: 'Korba', lat: 22.36, lon: 82.75, role: 'Power Hub', baseTemp: 31.93, baseRain: 3.08, gridLat: 22.5, gridLon: 82.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'bastar', name: 'Bastar (Jagdalpur)', lat: 19.07, lon: 82.02, role: 'Southern Plateau', baseTemp: 32.36, baseRain: 5.13, gridLat: 19.0, gridLon: 82.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'surguja', name: 'Surguja (Ambikapur)', lat: 23.12, lon: 83.20, role: 'Northern Hills', baseTemp: 31.77, baseRain: 3.04, gridLat: 23.0, gridLon: 83.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'rajnandgaon', name: 'Rajnandgaon', lat: 21.10, lon: 81.03, role: 'Western Agriculture', baseTemp: 32.86, baseRain: 3.47, gridLat: 21.0, gridLon: 81.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'raigarh', name: 'Raigarh', lat: 21.89, lon: 83.40, role: 'Eastern Mineral Region', baseTemp: 31.74, baseRain: 4.12, gridLat: 22.0, gridLon: 83.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'dhamtari', name: 'Dhamtari', lat: 20.71, lon: 81.55, role: 'Mahanadi Basin', baseTemp: 32.02, baseRain: 3.46, gridLat: 20.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'kanker', name: 'Kanker', lat: 20.27, lon: 81.49, role: 'Highland Forest', baseTemp: 32.02, baseRain: 3.46, gridLat: 20.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'sukma', name: 'Sukma', lat: 18.39, lon: 81.66, role: 'Southern Valley', baseTemp: 31.78, baseRain: 5.44, gridLat: 18.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'jashpur', name: 'Jashpur', lat: 22.89, lon: 84.15, role: 'North-Eastern Tribal Region', baseTemp: 31.74, baseRain: 4.31, gridLat: 23.0, gridLon: 84.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'koriya', name: 'Koriya', lat: 23.25, lon: 82.55, role: 'Hasdeo Basin', baseTemp: 31.77, baseRain: 3.71, gridLat: 23.0, gridLon: 82.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'kabirdham', name: 'Kabirdham (Kawardha)', lat: 22.02, lon: 81.25, role: 'Maikal Range', baseTemp: 32.01, baseRain: 3.35, gridLat: 22.0, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'mahasamund', name: 'Mahasamund', lat: 21.11, lon: 82.10, role: 'Eastern Plain', baseTemp: 32.02, baseRain: 3.51, gridLat: 21.0, gridLon: 82.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'dantewada', name: 'Dantewada', lat: 18.90, lon: 81.35, role: 'Dandakaranya Forest Region', baseTemp: 32.36, baseRain: 4.83, gridLat: 19.0, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'bijapur', name: 'Bijapur', lat: 18.79, lon: 80.81, role: 'Indravati Basin', baseTemp: 32.47, baseRain: 5.03, gridLat: 19.0, gridLon: 81.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'narayanpur', name: 'Narayanpur', lat: 19.72, lon: 81.25, role: 'Abujhmarh Hill Division', baseTemp: 32.36, baseRain: 3.68, gridLat: 19.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'kondagaon', name: 'Kondagaon', lat: 19.60, lon: 81.67, role: 'Handicrafts & Forest Hub', baseTemp: 32.36, baseRain: 3.68, gridLat: 19.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'mungeli', name: 'Mungeli', lat: 22.07, lon: 81.60, role: 'Central Plain Division', baseTemp: 32.01, baseRain: 3.35, gridLat: 22.0, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'bemetara', name: 'Bemetara', lat: 21.70, lon: 81.55, role: 'Shivnath River Region', baseTemp: 32.49, baseRain: 2.62, gridLat: 21.5, gridLon: 81.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'balodabazar', name: 'Baloda Bazar', lat: 21.65, lon: 82.16, role: 'Cement Division', baseTemp: 32.49, baseRain: 3.19, gridLat: 21.5, gridLon: 82.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'gariaband', name: 'Gariaband', lat: 20.96, lon: 82.08, role: 'Udanti Sanctuary Region', baseTemp: 32.02, baseRain: 3.51, gridLat: 21.0, gridLon: 82.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'surajpur', name: 'Surajpur', lat: 23.22, lon: 82.85, role: 'Rihand River Basin', baseTemp: 31.77, baseRain: 3.04, gridLat: 23.0, gridLon: 83.0, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'balrampur', name: 'Balrampur', lat: 23.61, lon: 83.61, role: 'Northern Frontier', baseTemp: 31.65, baseRain: 5.51, gridLat: 23.5, gridLon: 83.5, dataSource: 'IMD Gridded Spatial Dataset' },
  { id: 'janjgirchampa', name: 'Janjgir-Champa', lat: 22.01, lon: 82.57, role: 'Crop Heartland', baseTemp: 32.66, baseRain: 3.78, gridLat: 22.0, gridLon: 82.5, dataSource: 'IMD Gridded Spatial Dataset' }
];

export const CHHATTISGARH_CITIES = CHHATTISGARH_DISTRICTS.map(d => ({
  name: d.name,
  lat: d.lat,
  lon: d.lon,
  role: d.role
}));

export const MODEL_METRICS_STATIC = {
  architecture: "2-Layer Stacked PyTorch LSTM",
  hiddenUnits: 64,
  dropout: 0.2,
  optimizer: "Adam (lr=0.001)",
  epochsTrained: 20,
  finalTrainLoss: 0.001911,
  finalValLoss: 0.001907,
  mse: 0.001907,
  rmse: 0.04367,
  mae: 0.03125,
};

export const TRAINING_HISTORY_DATA = [
  { epoch: 1, train_loss: 0.01524, val_loss: 0.01210 },
  { epoch: 2, train_loss: 0.00985, val_loss: 0.00845 },
  { epoch: 3, train_loss: 0.00712, val_loss: 0.00620 },
  { epoch: 4, train_loss: 0.00550, val_loss: 0.00485 },
  { epoch: 5, train_loss: 0.00435, val_loss: 0.00392 },
  { epoch: 6, train_loss: 0.00360, val_loss: 0.00325 },
  { epoch: 7, train_loss: 0.00310, val_loss: 0.00282 },
  { epoch: 8, train_loss: 0.00275, val_loss: 0.00251 },
  { epoch: 9, train_loss: 0.00250, val_loss: 0.00230 },
  { epoch: 10, train_loss: 0.00232, val_loss: 0.00215 },
  { epoch: 11, train_loss: 0.00220, val_loss: 0.00208 },
  { epoch: 12, train_loss: 0.00212, val_loss: 0.00202 },
  { epoch: 13, train_loss: 0.00206, val_loss: 0.00198 },
  { epoch: 14, train_loss: 0.00202, val_loss: 0.00195 },
  { epoch: 15, train_loss: 0.00199, val_loss: 0.00194 },
  { epoch: 16, train_loss: 0.00197, val_loss: 0.00193 },
  { epoch: 17, train_loss: 0.00195, val_loss: 0.00192 },
  { epoch: 18, train_loss: 0.00193, val_loss: 0.00191 },
  { epoch: 19, train_loss: 0.00192, val_loss: 0.00191 },
  { epoch: 20, train_loss: 0.001911, val_loss: 0.001907 },
];
