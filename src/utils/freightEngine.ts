import { sampleRouteAtProgress } from './worldMapGeometry';

export type PortalId = 'home' | 'estimator' | 'globe' | 'client' | 'employee' | 'admin' | 'about';

export type TransportMode =
  | 'Ocean 40ft High-Cube'
  | 'Priority Air Charter'
  | 'Refrigerated Cold-Chain'
  | 'Cross-Border Ground';

export type CheckpointName =
  | 'Origin Warehouse'
  | 'Port Loaded'
  | 'Mid-Ocean Transit'
  | 'Customs Cleared'
  | 'Out for Delivery'
  | 'Delivered';

export type StaffRole =
  | 'Vessel Captain'
  | 'Air Loadmaster'
  | 'Customs Broker'
  | 'Last-Mile Driver';

export const CHECKPOINT_ORDER: CheckpointName[] = [
  'Origin Warehouse',
  'Port Loaded',
  'Mid-Ocean Transit',
  'Customs Cleared',
  'Out for Delivery',
  'Delivered',
];

export interface PortHub {
  code: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  portArea: string;
  region:
    | 'Asia-Pacific'
    | 'Europe'
    | 'North America'
    | 'Middle East'
    | 'Latin America & Africa';
  lat: number;
  lng: number;
  berths: number;
  customsClearanceHours: number;
  avgDraftMeters: number;
}

export const GLOBAL_PORTS: PortHub[] = [
  {
    code: 'SGSIN',
    name: 'Port of Singapore (Tuas Mega Hub)',
    country: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    portArea: 'Malacca Strait Deepwater Zone',
    region: 'Asia-Pacific',
    lat: 1.264,
    lng: 103.84,
    berths: 66,
    customsClearanceHours: 2.4,
    avgDraftMeters: 18.0,
  },
  {
    code: 'CNSHA',
    name: 'Shanghai Yangshan Deepwater Port',
    country: 'China',
    countryCode: 'CN',
    flag: '🇨🇳',
    portArea: 'East China Sea Automated Island',
    region: 'Asia-Pacific',
    lat: 30.626,
    lng: 122.064,
    berths: 74,
    customsClearanceHours: 3.8,
    avgDraftMeters: 17.5,
  },
  {
    code: 'NLRTM',
    name: 'Port of Rotterdam (Maasvlakte II)',
    country: 'Netherlands',
    countryCode: 'NL',
    flag: '🇳🇱',
    portArea: 'North Sea Europort Corridor',
    region: 'Europe',
    lat: 51.955,
    lng: 4.142,
    berths: 58,
    customsClearanceHours: 2.1,
    avgDraftMeters: 19.6,
  },
  {
    code: 'USLAX',
    name: 'Port of Los Angeles / Long Beach',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    portArea: 'San Pedro Bay Trans-Pacific Gate',
    region: 'North America',
    lat: 33.729,
    lng: -118.262,
    berths: 52,
    customsClearanceHours: 4.2,
    avgDraftMeters: 16.5,
  },
  {
    code: 'AEJEA',
    name: 'Jebel Ali Port & Free Zone',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    portArea: 'Arabian Gulf Bonded Logistics Zone',
    region: 'Middle East',
    lat: 25.011,
    lng: 55.061,
    berths: 48,
    customsClearanceHours: 2.9,
    avgDraftMeters: 17.0,
  },
  {
    code: 'DEHAM',
    name: 'Port of Hamburg (Altenwerder)',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    portArea: 'Elbe River Intermodal Basin',
    region: 'Europe',
    lat: 53.504,
    lng: 9.931,
    berths: 44,
    customsClearanceHours: 2.6,
    avgDraftMeters: 16.2,
  },
  {
    code: 'JPYOK',
    name: 'Port of Yokohama (Honmoku Pier)',
    country: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    portArea: 'Tokyo Bay Pacific Terminal',
    region: 'Asia-Pacific',
    lat: 35.443,
    lng: 139.669,
    berths: 42,
    customsClearanceHours: 2.2,
    avgDraftMeters: 16.8,
  },
  {
    code: 'USNYC',
    name: 'Port Newark–Elizabeth Marine Terminal',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    portArea: 'New York Harbor Atlantic Basin',
    region: 'North America',
    lat: 40.684,
    lng: -74.145,
    berths: 46,
    customsClearanceHours: 3.5,
    avgDraftMeters: 15.8,
  },
  {
    code: 'KRPUS',
    name: 'Port of Busan (New Port Phase 2-5)',
    country: 'South Korea',
    countryCode: 'KR',
    flag: '🇰🇷',
    portArea: 'Korea Strait Transshipment Basin',
    region: 'Asia-Pacific',
    lat: 35.078,
    lng: 128.828,
    berths: 50,
    customsClearanceHours: 2.5,
    avgDraftMeters: 17.2,
  },
  {
    code: 'HKHKG',
    name: 'Port of Hong Kong (Kwai Tsing Terminal)',
    country: 'Hong Kong',
    countryCode: 'HK',
    flag: '🇭🇰',
    portArea: 'Pearl River Delta Harbor',
    region: 'Asia-Pacific',
    lat: 22.336,
    lng: 114.122,
    berths: 40,
    customsClearanceHours: 2.7,
    avgDraftMeters: 17.0,
  },
  {
    code: 'AUSYD',
    name: 'Port Botany Container Terminal',
    country: 'Australia',
    countryCode: 'AU',
    flag: '🇦🇺',
    portArea: 'Tasman Sea Logistics Precinct',
    region: 'Asia-Pacific',
    lat: -33.973,
    lng: 151.213,
    berths: 28,
    customsClearanceHours: 3.1,
    avgDraftMeters: 16.5,
  },
  {
    code: 'BEANR',
    name: 'Port of Antwerp-Bruges (Deurganckdok)',
    country: 'Belgium',
    countryCode: 'BE',
    flag: '🇧🇪',
    portArea: 'Scheldt Estuary Ro-Ro & Chemical Zone',
    region: 'Europe',
    lat: 51.298,
    lng: 4.267,
    berths: 54,
    customsClearanceHours: 2.4,
    avgDraftMeters: 17.8,
  },
  {
    code: 'GBFXT',
    name: 'Port of Felixstowe (Trinity Terminal)',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    portArea: 'North Sea UK Deepwater Quay',
    region: 'Europe',
    lat: 51.954,
    lng: 1.318,
    berths: 36,
    customsClearanceHours: 2.8,
    avgDraftMeters: 16.0,
  },
  {
    code: 'ESVLC',
    name: 'Port of Valencia (Muelle Príncipe Felipe)',
    country: 'Spain',
    countryCode: 'ES',
    flag: '🇪🇸',
    portArea: 'Western Mediterranean Hub',
    region: 'Europe',
    lat: 39.445,
    lng: -0.318,
    berths: 34,
    customsClearanceHours: 3.0,
    avgDraftMeters: 16.5,
  },
  {
    code: 'USSAV',
    name: 'Port of Savannah (Garden City Terminal)',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    portArea: 'Southeastern Intermodal Rail Hub',
    region: 'North America',
    lat: 32.128,
    lng: -81.148,
    berths: 38,
    customsClearanceHours: 3.3,
    avgDraftMeters: 15.2,
  },
  {
    code: 'CAVAN',
    name: 'Port of Vancouver (Deltaport Roberts Bank)',
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    portArea: 'Georgia Strait Pacific Gateway',
    region: 'North America',
    lat: 49.019,
    lng: -123.164,
    berths: 32,
    customsClearanceHours: 2.9,
    avgDraftMeters: 16.8,
  },
  {
    code: 'SAJED',
    name: 'Jeddah Islamic Port (Red Sea Gateway)',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    flag: '🇸🇦',
    portArea: 'Red Sea Suez Approach Terminal',
    region: 'Middle East',
    lat: 21.482,
    lng: 39.146,
    berths: 42,
    customsClearanceHours: 3.2,
    avgDraftMeters: 16.5,
  },
  {
    code: 'INMUN',
    name: 'Mundra Port & SEZ Deepwater Terminal',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    portArea: 'Gulf of Kutch Western Corridor',
    region: 'Middle East',
    lat: 22.739,
    lng: 69.708,
    berths: 36,
    customsClearanceHours: 3.6,
    avgDraftMeters: 17.5,
  },
  {
    code: 'PAPTY',
    name: 'Port of Balboa (Panama Pacific Terminal)',
    country: 'Panama',
    countryCode: 'PA',
    flag: '🇵🇦',
    portArea: 'Panama Canal Pacific Entrance',
    region: 'Latin America & Africa',
    lat: 8.953,
    lng: -79.566,
    berths: 30,
    customsClearanceHours: 2.8,
    avgDraftMeters: 16.2,
  },
  {
    code: 'BRSSZ',
    name: 'Port of Santos (Brasil Terminal Portuário)',
    country: 'Brazil',
    countryCode: 'BR',
    flag: '🇧🇷',
    portArea: 'South Atlantic Mercosur Corridor',
    region: 'Latin America & Africa',
    lat: -23.953,
    lng: -46.308,
    berths: 44,
    customsClearanceHours: 4.5,
    avgDraftMeters: 15.0,
  },
  {
    code: 'ZADUR',
    name: 'Port of Durban (Pier 2 Container Terminal)',
    country: 'South Africa',
    countryCode: 'ZA',
    flag: '🇿🇦',
    portArea: 'Indian Ocean Cape Trade Lane',
    region: 'Latin America & Africa',
    lat: -29.874,
    lng: 31.028,
    berths: 32,
    customsClearanceHours: 3.9,
    avgDraftMeters: 15.5,
  },
];

export interface FleetShowcaseAsset {
  id: string;
  label: string;
  imageUrl: string;
  mode: TransportMode;
  capacitySpec: string;
  transitSpeed: string;
  corridorSummary: string;
  customsProtocol: string;
  utilizationPct: number;
}

/**
 * Rule 3 Strict 1-to-1 Image-to-Label Mapping
 */
export const VERIFIED_FLEET_ASSETS: FleetShowcaseAsset[] = [
  {
    id: 'vessel-pacific',
    label: 'Ultra-Large Container Vessel — Pacific Trade Lane',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85',
    mode: 'Ocean 40ft High-Cube',
    capacitySpec: '24,188 TEU / 240,000 DWT',
    transitSpeed: '22.5 Knots Sustained',
    corridorSummary: 'Direct deep-water sovereign lane connecting Shanghai, Singapore, Rotterdam, and Los Angeles with continuous satellite hull telemetry.',
    customsProtocol: 'Automated pre-arrival manifest clearance 72 hours prior to pilot station boarding.',
    utilizationPct: 94,
  },
  {
    id: 'gantry-rotterdam',
    label: 'Automated Port Gantry Terminal — Rotterdam & Singapore',
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=85',
    mode: 'Ocean 40ft High-Cube',
    capacitySpec: '48 Dual-Hoist Cranes / 210 Moves per Hr',
    transitSpeed: '18-Minute Turnaround Cycle',
    corridorSummary: 'Zero-emission optical crane arrays synchronized with autonomous guided dockside straddle carriers.',
    customsProtocol: 'Instant X-ray gamma portal scan and biometric seal verification on quay discharge.',
    utilizationPct: 91,
  },
  {
    id: 'air-777f',
    label: 'Priority Boeing 777F Air Freight Corridor',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85',
    mode: 'Priority Air Charter',
    capacitySpec: '102,010 kg Revenue Payload / 27 Main Deck Pallets',
    transitSpeed: 'Mach 0.84 (905 km/h)',
    corridorSummary: 'Dedicated main-deck widebody slots for semiconductor tooling, aerospace turbines, and urgent pharmaceutical payloads.',
    customsProtocol: 'Tarmac bonded airside release within 90 minutes of wheels-down.',
    utilizationPct: 89,
  },
  {
    id: 'robotics-hub',
    label: 'Climate-Controlled Robotics Fulfillment Hub',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    mode: 'Refrigerated Cold-Chain',
    capacitySpec: '-25°C to +15°C Multi-Zone / 180,000 Pallet Positions',
    transitSpeed: '99.98% Thermal Stability',
    corridorSummary: 'ISO-certified cold-chain staging vaults with dual-redundant nitrogen backup and continuous RFID pallet telemetry.',
    customsProtocol: 'FDA / EMA phytosanitary & biologics digital chain-of-custody ledger.',
    utilizationPct: 96,
  },
  {
    id: 'ground-fleet',
    label: 'Trans-Continental Heavy Ground Fleet',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=85',
    mode: 'Cross-Border Ground',
    capacitySpec: '44,000 kg Gross Vehicle Weight / Air-Ride Chassis',
    transitSpeed: '1,150 km Daily Team Relay',
    corridorSummary: 'Bonded intermodal drayage and trans-continental highway corridors linking inland dry ports directly to ocean terminals.',
    customsProtocol: 'TIR Carnet & FAST lane automated border transponder clearance.',
    utilizationPct: 88,
  },
];

export interface FieldNoteEntry {
  id: string;
  timestamp: string;
  author: string;
  role: StaffRole | 'Master Dispatch ERP';
  checkpoint: CheckpointName;
  temperatureC: string;
  sealNumber: string;
  note: string;
}

export interface ShipmentRecord {
  waybillId: string;
  clientName: string;
  contactPerson?: string;
  contactNumber?: string;
  companyEmail?: string;
  clientAccountCode: string;
  commodity: string;
  mode: TransportMode;
  originPortCode: string;
  destinationPortCode: string;
  currentCheckpoint: CheckpointName;
  progressPct: number;
  currentLat: number;
  currentLng: number;
  vesselOrFlightName: string;
  assignedStaffId: string;
  assignedStaffName: string;
  weightKg: number;
  volumeCbm: number;
  containersCount: number;
  temperatureC: string;
  securitySeal: string;
  seaState: string;
  windSpeedKnots: number;
  customsStatus: 'Pre-Cleared' | 'Bonded Inspection' | 'Released' | 'Export Verified';
  etaDate: string;
  quotedTotalUsd: number;
  invoiceNumber: string;
  billOfLadingNumber: string;
  fieldLogs: FieldNoteEntry[];
}

export interface VesselFleetItem {
  id: string;
  name: string;
  imoNumber: string;
  type: 'Ultra-Large Container Vessel' | 'Boeing 777F Freighter' | 'Reefer Sovereign Vessel' | 'Heavy Intermodal Convoy';
  corridor: string;
  captainOrCommander: string;
  speedKnotsOrMach: string;
  capacityUtilizationPct: number;
  currentLat: number;
  currentLng: number;
  status: 'Underway by Satellite' | 'Berth Loading' | 'Airborne Priority' | 'Customs Anchorage';
  activeWaybillsCount: number;
}

export interface CorporateClient {
  id: string;
  companyName: string;
  accountCode: string;
  tier: 'Sovereign Charter' | 'Global Enterprise' | 'Cold-Chain Priority';
  primaryContact: string;
  contactEmail: string;
  annualVolumeTeu: number;
  activeShipments: number;
  customsBondNumber: string;
  creditLineUsd: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  licenseCode: string;
  currentAssignmentWaybill: string;
  hubLocation: string;
  shiftStatus: 'Active Watch' | 'Port Standby' | 'In-Flight Duty';
  contactChannel: string;
}

export interface DispatchMessage {
  id: string;
  waybillId: string;
  senderName: string;
  senderRole: 'Client Shipper' | 'Master Dispatch Desk' | StaffRole;
  timestamp: string;
  message: string;
  priority: 'Standard' | 'Priority Customs' | 'Cold-Chain Advisory';
}

export interface FreightQuoteBreakdown {
  baseFreightUsd: number;
  fuelBunkerSurchargeUsd: number;
  customsBrokerageUsd: number;
  allRiskInsuranceUsd: number;
  totalQuoteUsd: number;
  estimatedTransitDays: number;
  recommendedContainers: number;
  volumeUtilizationPct: number;
  weightUtilizationPct: number;
  routeDistanceKm: number;
}

/**
 * Great-circle Haversine distance in kilometers between two coordinates.
 */
export function calculateGreatCircleKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(450, Math.round(R * c));
}

/**
 * Checkpoint progress mapping (0% to 100%)
 */
export function getCheckpointProgressPct(checkpoint: CheckpointName): number {
  const index = CHECKPOINT_ORDER.indexOf(checkpoint);
  if (index <= 0) return 8;
  if (index === 1) return 26;
  if (index === 2) return 56;
  if (index === 3) return 76;
  if (index === 4) return 90;
  return 100;
}

/**
 * Interpolates live GPS coordinates along the shipping corridor based on checkpoint.
 * Ocean vessels route strictly across open-sea waypoints; air charters fly great-circle arcs.
 */
export function interpolateCorridorPosition(
  originPortCode: string,
  destinationPortCode: string,
  checkpoint: CheckpointName,
  mode: TransportMode = 'Ocean 40ft High-Cube'
): { lat: number; lng: number; progressPct: number } {
  const origin =
    GLOBAL_PORTS.find((p) => p.code === originPortCode) || GLOBAL_PORTS[0];
  const dest =
    GLOBAL_PORTS.find((p) => p.code === destinationPortCode) || GLOBAL_PORTS[2];

  const progressPct = getCheckpointProgressPct(checkpoint);
  const t = progressPct / 100;

  const sampled = sampleRouteAtProgress({
    originCode: origin.code,
    originLat: origin.lat,
    originLng: origin.lng,
    destCode: dest.code,
    destLat: dest.lat,
    destLng: dest.lng,
    t,
    mode,
  });

  return { lat: sampled.lat, lng: sampled.lng, progressPct };
}

/**
 * Calculates full itemized freight quote and container packing metrics
 */
export function calculateFreightQuote(params: {
  mode: TransportMode;
  originPortCode: string;
  destinationPortCode: string;
  weightKg: number;
  volumeCbm: number;
}): FreightQuoteBreakdown {
  const { mode, originPortCode, destinationPortCode, weightKg, volumeCbm } = params;
  const origin =
    GLOBAL_PORTS.find((p) => p.code === originPortCode) || GLOBAL_PORTS[0];
  const dest =
    GLOBAL_PORTS.find((p) => p.code === destinationPortCode) || GLOBAL_PORTS[2];

  const safeWeightKg = Math.max(100, Math.min(50000, weightKg));
  const safeVolumeCbm = Math.max(2, Math.min(350, volumeCbm));
  const routeDistanceKm =
    origin.code === dest.code
      ? 850
      : calculateGreatCircleKm(origin.lat, origin.lng, dest.lat, dest.lng);

  // Mode multipliers
  let ratePerKg = 0.24;
  let ratePerCbm = 62;
  let speedKmPerDay = 880;
  let containerMaxCbm = 67.7; // 40ft High-Cube
  let containerMaxKg = 26500;

  if (mode === 'Priority Air Charter') {
    ratePerKg = 2.65;
    ratePerCbm = 290;
    speedKmPerDay = 9200;
    containerMaxCbm = 42;
    containerMaxKg = 18000;
  } else if (mode === 'Refrigerated Cold-Chain') {
    ratePerKg = 0.48;
    ratePerCbm = 118;
    speedKmPerDay = 940;
    containerMaxCbm = 58.4;
    containerMaxKg = 24800;
  } else if (mode === 'Cross-Border Ground') {
    ratePerKg = 0.35;
    ratePerCbm = 85;
    speedKmPerDay = 1150;
    containerMaxCbm = 62.0;
    containerMaxKg = 22000;
  }

  const distanceFactor = 0.65 + routeDistanceKm / 9500;
  const rawBase =
    (safeWeightKg * ratePerKg + safeVolumeCbm * ratePerCbm) * distanceFactor;
  const baseFreightUsd = Math.round(Math.max(1250, rawBase));
  const fuelBunkerSurchargeUsd = Math.round(baseFreightUsd * 0.16);
  const customsBrokerageUsd =
    mode === 'Priority Air Charter' ? 680 : mode === 'Refrigerated Cold-Chain' ? 890 : 540;
  const allRiskInsuranceUsd = Math.round(baseFreightUsd * 0.045 + 195);
  const totalQuoteUsd =
    baseFreightUsd +
    fuelBunkerSurchargeUsd +
    customsBrokerageUsd +
    allRiskInsuranceUsd;

  const estimatedTransitDays = Math.max(
    mode === 'Priority Air Charter' ? 2 : 4,
    Math.ceil(routeDistanceKm / speedKmPerDay) + 1
  );

  const byVolume = Math.ceil(safeVolumeCbm / containerMaxCbm);
  const byWeight = Math.ceil(safeWeightKg / containerMaxKg);
  const recommendedContainers = Math.max(1, Math.max(byVolume, byWeight));

  const totalCapacityCbm = recommendedContainers * containerMaxCbm;
  const totalCapacityKg = recommendedContainers * containerMaxKg;

  const volumeUtilizationPct = Math.min(
    99,
    Math.max(8, Math.round((safeVolumeCbm / totalCapacityCbm) * 100))
  );
  const weightUtilizationPct = Math.min(
    99,
    Math.max(6, Math.round((safeWeightKg / totalCapacityKg) * 100))
  );

  return {
    baseFreightUsd,
    fuelBunkerSurchargeUsd,
    customsBrokerageUsd,
    allRiskInsuranceUsd,
    totalQuoteUsd,
    estimatedTransitDays,
    recommendedContainers,
    volumeUtilizationPct,
    weightUtilizationPct,
    routeDistanceKm,
  };
}

/**
 * Normalizes a user-typed Waybill reference (e.g. "#vgf-8841" -> "VGF-8841")
 */
export function normalizeWaybillId(rawInput: string): string {
  const cleaned = rawInput.trim().replace(/^#+/, '').toUpperCase();
  if (!cleaned) return '';
  if (/^\d{4}$/.test(cleaned)) {
    return `VGF-${cleaned}`;
  }
  return cleaned;
}

export const INITIAL_SHIPMENTS: ShipmentRecord[] = [
  {
    waybillId: 'VGF-8841',
    clientName: 'Aethelgard Semiconductor AG',
    clientAccountCode: 'ENT-9042',
    commodity: 'EUV Lithography Optics & Cryo-Subassemblies',
    mode: 'Ocean 40ft High-Cube',
    originPortCode: 'SGSIN',
    destinationPortCode: 'NLRTM',
    currentCheckpoint: 'Mid-Ocean Transit',
    progressPct: 56,
    currentLat: 14.512,
    currentLng: 58.64,
    vesselOrFlightName: 'M/V Vanguard Sovereign IX',
    assignedStaffId: 'STF-101',
    assignedStaffName: 'Capt. Henrik Lindqvist',
    weightKg: 24600,
    volumeCbm: 58,
    containersCount: 1,
    temperatureC: '+18.4°C',
    securitySeal: 'VGF-SEAL-99281A',
    seaState: 'Beaufort 3 — Slight Swell (1.1m)',
    windSpeedKnots: 14,
    customsStatus: 'Pre-Cleared',
    etaDate: '2026-11-24 06:30 UTC',
    quotedTotalUsd: 18420,
    invoiceNumber: 'INV-2026-8841',
    billOfLadingNumber: 'BOL-VGF-8841-RT',
    fieldLogs: [
      {
        id: 'LOG-8841-3',
        timestamp: '2026-11-17 05:40 UTC',
        author: 'Capt. Henrik Lindqvist',
        role: 'Vessel Captain',
        checkpoint: 'Mid-Ocean Transit',
        temperatureC: '+18.4°C',
        sealNumber: 'VGF-SEAL-99281A',
        note: 'Transiting Arabian Sea / Suez Northbound Approach at 22.1 knots. Shock-dampened smart container telemetry nominal.',
      },
      {
        id: 'LOG-8841-2',
        timestamp: '2026-11-13 19:15 UTC',
        author: 'Mei-Ling Tan',
        role: 'Customs Broker',
        checkpoint: 'Port Loaded',
        temperatureC: '+18.5°C',
        sealNumber: 'VGF-SEAL-99281A',
        note: 'Loaded aboard M/V Vanguard Sovereign IX Bay 14 Tier 08 at Tuas Mega Hub Berth 12. Rotterdam customs pre-clearance token issued.',
      },
      {
        id: 'LOG-8841-1',
        timestamp: '2026-11-12 08:00 UTC',
        author: 'Marcus Vance',
        role: 'Last-Mile Driver',
        checkpoint: 'Origin Warehouse',
        temperatureC: '+18.6°C',
        sealNumber: 'VGF-SEAL-99281A',
        note: 'Nitrogen-purged optical crates sealed at Jurong Cleanroom Vault and drayed to Tuas Quay.',
      },
    ],
  },
  {
    waybillId: 'VGF-7290',
    clientName: 'Helios BioPharma Consortium',
    clientAccountCode: 'ENT-4418',
    commodity: 'Cryogenic mRNA Bioreactor Vessels & Sterile Media',
    mode: 'Priority Air Charter',
    originPortCode: 'DEHAM',
    destinationPortCode: 'USNYC',
    currentCheckpoint: 'Customs Cleared',
    progressPct: 76,
    currentLat: 43.912,
    currentLng: -54.018,
    vesselOrFlightName: 'VGF-AIR-777F Callsign Titan-4',
    assignedStaffId: 'STF-102',
    assignedStaffName: 'Loadmaster Elena Rostova',
    weightKg: 14200,
    volumeCbm: 36,
    containersCount: 1,
    temperatureC: '-21.8°C',
    securitySeal: 'VGF-CRYO-77410C',
    seaState: 'FL360 Stratospheric Smooth',
    windSpeedKnots: 42,
    customsStatus: 'Released',
    etaDate: '2026-11-17 19:45 UTC',
    quotedTotalUsd: 49850,
    invoiceNumber: 'INV-2026-7290',
    billOfLadingNumber: 'AWB-VGF-7290-NY',
    fieldLogs: [
      {
        id: 'LOG-7290-2',
        timestamp: '2026-11-17 06:10 UTC',
        author: 'Loadmaster Elena Rostova',
        role: 'Air Loadmaster',
        checkpoint: 'Customs Cleared',
        temperatureC: '-21.8°C',
        sealNumber: 'VGF-CRYO-77410C',
        note: 'CBP & FDA airside e-manifest cleared ahead of Newark touchdown. Dual active Envirotainer RKN units at 98% battery.',
      },
      {
        id: 'LOG-7290-1',
        timestamp: '2026-11-16 22:30 UTC',
        author: 'Loadmaster Elena Rostova',
        role: 'Air Loadmaster',
        checkpoint: 'Port Loaded',
        temperatureC: '-22.0°C',
        sealNumber: 'VGF-CRYO-77410C',
        note: 'Main deck pallet positions P1-P6 locked on Boeing 777F. Cold-chain telemetry linked to cockpit SATCOM.',
      },
    ],
  },
  {
    waybillId: 'VGF-6104',
    clientName: 'Kyoto Precision Robotics Ltd.',
    clientAccountCode: 'ENT-7710',
    commodity: '6-Axis Harmonic Drive Actuators & CNC Cells',
    mode: 'Refrigerated Cold-Chain',
    originPortCode: 'JPYOK',
    destinationPortCode: 'USLAX',
    currentCheckpoint: 'Port Loaded',
    progressPct: 26,
    currentLat: 36.105,
    currentLng: 162.41,
    vesselOrFlightName: 'M/V Vanguard Pacifica IV',
    assignedStaffId: 'STF-103',
    assignedStaffName: 'Mei-Ling Tan',
    weightKg: 38900,
    volumeCbm: 98,
    containersCount: 2,
    temperatureC: '+12.0°C',
    securitySeal: 'VGF-SEAL-61049B',
    seaState: 'Beaufort 4 — Moderate Breeze (1.6m)',
    windSpeedKnots: 19,
    customsStatus: 'Export Verified',
    etaDate: '2026-11-26 14:00 UTC',
    quotedTotalUsd: 29640,
    invoiceNumber: 'INV-2026-6104',
    billOfLadingNumber: 'BOL-VGF-6104-LA',
    fieldLogs: [
      {
        id: 'LOG-6104-1',
        timestamp: '2026-11-16 14:20 UTC',
        author: 'Mei-Ling Tan',
        role: 'Customs Broker',
        checkpoint: 'Port Loaded',
        temperatureC: '+12.0°C',
        sealNumber: 'VGF-SEAL-61049B',
        note: 'Two 40ft humidity-controlled reefers stowed on Honmoku Pier Berth D4. Dehumidification set to 35% RH.',
      },
    ],
  },
  {
    waybillId: 'VGF-5518',
    clientName: 'Valkyrie Aerospace Propulsion',
    clientAccountCode: 'ENT-3190',
    commodity: 'Titanium Blisk Forgings & Avionics Harnesses',
    mode: 'Cross-Border Ground',
    originPortCode: 'CNSHA',
    destinationPortCode: 'AEJEA',
    currentCheckpoint: 'Out for Delivery',
    progressPct: 90,
    currentLat: 24.42,
    currentLng: 58.62,
    vesselOrFlightName: 'VGF Convoy Unit-19 / M/V Arabia Star',
    assignedStaffId: 'STF-104',
    assignedStaffName: 'Marcus Vance',
    weightKg: 19500,
    volumeCbm: 48,
    containersCount: 1,
    temperatureC: '+20.1°C',
    securitySeal: 'VGF-SEAL-55182X',
    seaState: 'Arid Highway Corridor — Clear',
    windSpeedKnots: 9,
    customsStatus: 'Released',
    etaDate: '2026-11-17 16:00 UTC',
    quotedTotalUsd: 16280,
    invoiceNumber: 'INV-2026-5518',
    billOfLadingNumber: 'BOL-VGF-5518-DXB',
    fieldLogs: [
      {
        id: 'LOG-5518-1',
        timestamp: '2026-11-17 04:50 UTC',
        author: 'Marcus Vance',
        role: 'Last-Mile Driver',
        checkpoint: 'Out for Delivery',
        temperatureC: '+20.1°C',
        sealNumber: 'VGF-SEAL-55182X',
        note: 'Cleared Jebel Ali Free Zone Gate 4. Heavy air-ride tractor en route to Dubai South Aerospace Hangar 7.',
      },
    ],
  },
];

export const INITIAL_VESSEL_FLEET: VesselFleetItem[] = [
  {
    id: 'FLT-01',
    name: 'M/V Vanguard Sovereign IX',
    imoNumber: 'IMO 9948210',
    type: 'Ultra-Large Container Vessel',
    corridor: 'Singapore (SGSIN) → Rotterdam (NLRTM)',
    captainOrCommander: 'Capt. Henrik Lindqvist',
    speedKnotsOrMach: '22.4 Knots',
    capacityUtilizationPct: 94,
    currentLat: 14.512,
    currentLng: 58.64,
    status: 'Underway by Satellite',
    activeWaybillsCount: 142,
  },
  {
    id: 'FLT-02',
    name: 'VGF-AIR-777F Callsign Titan-4',
    imoNumber: 'REG N877VG',
    type: 'Boeing 777F Freighter',
    corridor: 'Hamburg (DEHAM) → New York (USNYC)',
    captainOrCommander: 'Loadmaster Elena Rostova',
    speedKnotsOrMach: 'Mach 0.84',
    capacityUtilizationPct: 89,
    currentLat: 43.912,
    currentLng: -54.018,
    status: 'Airborne Priority',
    activeWaybillsCount: 38,
  },
  {
    id: 'FLT-03',
    name: 'M/V Vanguard Pacifica IV',
    imoNumber: 'IMO 9910438',
    type: 'Reefer Sovereign Vessel',
    corridor: 'Yokohama (JPYOK) → Los Angeles (USLAX)',
    captainOrCommander: 'Capt. Kenji Takahashi',
    speedKnotsOrMach: '21.8 Knots',
    capacityUtilizationPct: 91,
    currentLat: 36.105,
    currentLng: 162.41,
    status: 'Underway by Satellite',
    activeWaybillsCount: 118,
  },
  {
    id: 'FLT-04',
    name: 'VGF Convoy Unit-19 / M/V Arabia Star',
    imoNumber: 'IMO 9884125',
    type: 'Heavy Intermodal Convoy',
    corridor: 'Shanghai (CNSHA) → Jebel Ali (AEJEA)',
    captainOrCommander: 'Cmdr. Tariq Al-Mansoor',
    speedKnotsOrMach: '88 km/h Highway Relay',
    capacityUtilizationPct: 87,
    currentLat: 24.42,
    currentLng: 58.62,
    status: 'Berth Loading',
    activeWaybillsCount: 64,
  },
];

export const INITIAL_CORPORATE_CLIENTS: CorporateClient[] = [
  {
    id: 'CLI-01',
    companyName: 'Aethelgard Semiconductor AG',
    accountCode: 'ENT-9042',
    tier: 'Sovereign Charter',
    primaryContact: 'Dr. Lukas Weber (VP Global Supply)',
    contactEmail: 'l.weber@aethelgard-semi.ch',
    annualVolumeTeu: 4280,
    activeShipments: 14,
    customsBondNumber: 'EORI-NL88492011',
    creditLineUsd: 12500000,
  },
  {
    id: 'CLI-02',
    companyName: 'Helios BioPharma Consortium',
    accountCode: 'ENT-4418',
    tier: 'Cold-Chain Priority',
    primaryContact: 'Dr. Claire Beaumont (Director Cold-Chain)',
    contactEmail: 'c.beaumont@heliosbiopharma.eu',
    annualVolumeTeu: 1950,
    activeShipments: 9,
    customsBondNumber: 'FDA-BOND-77410',
    creditLineUsd: 8400000,
  },
  {
    id: 'CLI-03',
    companyName: 'Kyoto Precision Robotics Ltd.',
    accountCode: 'ENT-7710',
    tier: 'Global Enterprise',
    primaryContact: 'Haruto Sato (Head of Export Logistics)',
    contactEmail: 'h.sato@kyotoprecision.jp',
    annualVolumeTeu: 3120,
    activeShipments: 11,
    customsBondNumber: 'JP-AEO-559102',
    creditLineUsd: 9200000,
  },
  {
    id: 'CLI-04',
    companyName: 'Valkyrie Aerospace Propulsion',
    accountCode: 'ENT-3190',
    tier: 'Sovereign Charter',
    primaryContact: 'Evelyn Sterling (Chief Procurement Officer)',
    contactEmail: 'e.sterling@valkyrie-aero.com',
    annualVolumeTeu: 2640,
    activeShipments: 7,
    customsBondNumber: 'UAE-FZ-319088',
    creditLineUsd: 15000000,
  },
];

export const INITIAL_STAFF_ROSTER: StaffMember[] = [
  {
    id: 'STF-101',
    name: 'Capt. Henrik Lindqvist',
    role: 'Vessel Captain',
    licenseCode: 'MASTER-UNLIM-SE-882',
    currentAssignmentWaybill: 'VGF-8841',
    hubLocation: 'M/V Vanguard Sovereign IX (Indian Ocean)',
    shiftStatus: 'Active Watch',
    contactChannel: 'Inmarsat FleetBroadband Ch-04',
  },
  {
    id: 'STF-102',
    name: 'Loadmaster Elena Rostova',
    role: 'Air Loadmaster',
    licenseCode: 'IATA-DG-777F-409',
    currentAssignmentWaybill: 'VGF-7290',
    hubLocation: 'North Atlantic Corridor FL360',
    shiftStatus: 'In-Flight Duty',
    contactChannel: 'AeroSAT Priority Link-09',
  },
  {
    id: 'STF-103',
    name: 'Mei-Ling Tan',
    role: 'Customs Broker',
    licenseCode: 'WCO-AEO-SG-9104',
    currentAssignmentWaybill: 'VGF-6104',
    hubLocation: 'Singapore Tuas & Rotterdam Desk',
    shiftStatus: 'Active Watch',
    contactChannel: 'Customs EDI Direct Terminal-01',
  },
  {
    id: 'STF-104',
    name: 'Marcus Vance',
    role: 'Last-Mile Driver',
    licenseCode: 'CDL-HAZ-TIR-3318',
    currentAssignmentWaybill: 'VGF-5518',
    hubLocation: 'Jebel Ali Heavy Intermodal Terminal',
    shiftStatus: 'Active Watch',
    contactChannel: 'Fleet UHF Telemetry Relay-19',
  },
];

export const INITIAL_DISPATCH_MESSAGES: DispatchMessage[] = [
  {
    id: 'MSG-901',
    waybillId: 'VGF-8841',
    senderName: 'Dr. Lukas Weber (Aethelgard Semiconductor)',
    senderRole: 'Client Shipper',
    timestamp: '2026-11-17 05:52 UTC',
    message: 'Please confirm that Rotterdam Maasvlakte II Berth 6 gantry slot is locked for immediate discharge upon arrival.',
    priority: 'Priority Customs',
  },
  {
    id: 'MSG-902',
    waybillId: 'VGF-8841',
    senderName: 'Vanguard Master Dispatch Desk',
    senderRole: 'Master Dispatch Desk',
    timestamp: '2026-11-17 05:58 UTC',
    message: 'Confirmed. Berth 6 optical cranes and bonded low-vibration air-ride chassis are reserved for this priority optical consignment. Customs pre-clearance token is active.',
    priority: 'Priority Customs',
  },
  {
    id: 'MSG-903',
    waybillId: 'VGF-7290',
    senderName: 'Loadmaster Elena Rostova',
    senderRole: 'Air Loadmaster',
    timestamp: '2026-11-17 06:15 UTC',
    message: 'Flight Titan-4 cryogenic telemetry steady at -21.8°C. Newark tarmac cold-vault transfer crew alerted for 19:45 UTC arrival.',
    priority: 'Cold-Chain Advisory',
  },
];

export interface ClientBookingContactInput {
  contactPerson: string;
  contactNumber: string;
  companyEmail: string;
  companyEntity: string;
  commodity: string;
}

export function validateClientBookingFields(
  input: ClientBookingContactInput
): string | null {
  if (!input.contactPerson.trim()) {
    return 'Please enter the client contact full name.';
  }
  const digitsOnly = input.contactNumber.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return 'Please enter a valid contact phone number (at least 7 digits).';
  }
  const emailTrimmed = input.companyEmail.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    return 'Please enter a valid company email address.';
  }
  if (!input.companyEntity.trim()) {
    return 'Please enter the Commercial Shipper / Consignee Entity.';
  }
  if (!input.commodity.trim()) {
    return 'Please enter the Commodity Description & HS Tariff Classification.';
  }
  return null;
}

