import type { TransportMode } from './freightEngine';

export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Higher-resolution continental & major island coastline polygons [lat, lng]
 * Preserves recognizable real-world geography across all 6 continents.
 */
export const CONTINENT_POLYGONS: Array<Array<[number, number]>> = [
  // North America & Central America
  [
    [71.2, -156.8], [70.2, -143.5], [69.5, -133.0], [70.5, -124.0], [68.8, -112.0],
    [68.5, -96.0], [66.5, -83.0], [63.0, -78.0], [61.5, -93.0], [58.8, -94.0],
    [55.5, -83.0], [52.0, -79.5], [57.0, -76.5], [62.5, -77.5], [62.0, -68.0],
    [58.5, -63.0], [53.5, -55.8], [48.5, -53.2], [46.8, -55.5], [47.2, -61.5],
    [45.5, -61.0], [43.5, -65.8], [44.8, -67.0], [43.6, -70.2], [41.8, -70.0],
    [40.6, -73.9], [39.0, -74.8], [36.9, -76.0], [35.2, -75.5], [32.1, -80.9],
    [29.5, -81.1], [25.2, -80.3], [25.8, -81.6], [28.0, -82.8], [30.1, -84.2],
    [29.8, -89.0], [29.1, -90.5], [29.4, -94.8], [26.0, -97.1], [22.2, -97.8],
    [19.2, -96.1], [18.4, -93.0], [21.3, -90.2], [21.5, -87.0], [18.5, -88.2],
    [15.8, -88.5], [15.8, -84.2], [12.0, -83.7], [9.4, -82.2], [9.3, -79.8],
    [8.2, -78.0], [7.5, -80.5], [8.6, -83.5], [11.2, -85.8], [13.8, -90.5],
    [15.6, -93.8], [16.8, -99.8], [19.2, -104.5], [23.2, -106.5], [27.9, -110.8],
    [31.5, -114.2], [24.2, -110.3], [23.0, -109.9], [28.0, -114.1], [32.5, -117.1],
    [34.4, -120.5], [37.8, -122.5], [42.0, -124.3], [46.2, -124.0], [48.4, -124.7],
    [51.0, -127.8], [54.5, -130.5], [58.2, -136.5], [60.2, -145.0], [59.5, -151.5],
    [55.5, -161.5], [59.0, -162.0], [63.0, -165.5], [65.6, -168.0], [68.8, -166.2],
  ],
  // Cuba & Hispaniola
  [
    [21.8, -84.9], [23.1, -81.5], [22.2, -78.0], [20.2, -74.2], [19.9, -77.5], [21.5, -82.5],
  ],
  // Greenland
  [
    [83.4, -33.0], [81.5, -16.0], [76.5, -19.0], [70.5, -22.0], [65.5, -37.0],
    [60.0, -44.2], [64.2, -51.8], [69.2, -53.5], [76.2, -68.5], [81.8, -58.0],
  ],
  // South America
  [
    [11.2, -74.8], [12.2, -71.2], [10.6, -67.0], [10.5, -62.2], [7.8, -58.8],
    [5.2, -52.5], [1.4, -49.8], [-1.5, -47.5], [-3.7, -38.5], [-5.8, -35.2],
    [-9.6, -35.7], [-13.0, -38.5], [-19.8, -40.0], [-23.0, -43.2], [-25.5, -48.5],
    [-32.1, -52.1], [-34.9, -56.2], [-38.0, -57.5], [-40.8, -62.5], [-43.0, -64.5],
    [-47.8, -65.9], [-52.3, -68.4], [-55.0, -66.5], [-54.8, -71.5], [-50.5, -75.2],
    [-43.5, -74.2], [-37.0, -73.5], [-33.0, -71.6], [-23.6, -70.4], [-18.4, -70.3],
    [-12.1, -77.1], [-5.1, -81.2], [-2.2, -80.9], [1.0, -79.8], [4.0, -77.4], [8.5, -77.3],
  ],
  // Europe (Atlantic, Iberian, Mediterranean, Nordic, Black Sea)
  [
    [36.0, -5.6], [37.0, -8.9], [38.7, -9.4], [41.2, -8.7], [43.4, -8.4],
    [43.4, -2.0], [45.6, -1.2], [48.4, -4.7], [49.9, -1.8], [51.0, 2.0],
    [52.5, 4.5], [53.8, 8.6], [55.5, 8.1], [57.7, 10.6], [56.2, 12.6],
    [58.0, 11.5], [59.8, 10.6], [58.0, 7.5], [60.4, 5.2], [63.4, 10.2],
    [68.2, 14.5], [71.1, 25.8], [70.1, 30.8], [67.0, 40.5], [65.2, 36.8],
    [60.5, 28.5], [59.4, 24.7], [57.0, 24.0], [54.9, 19.5], [54.4, 14.0],
    [57.5, 18.4], [59.3, 18.2], [63.8, 20.4], [65.8, 24.0], [60.2, 24.9],
    [59.9, 30.3], [54.0, 27.5], [48.5, 34.5], [46.5, 32.0], [45.2, 33.5],
    [46.5, 38.8], [44.0, 39.2], [42.0, 41.6], [41.2, 29.1], [40.2, 26.2],
    [38.0, 23.7], [36.5, 22.5], [39.5, 20.0], [42.5, 18.5], [45.5, 13.8],
    [43.5, 13.6], [40.2, 18.4], [38.0, 15.6], [38.1, 12.6], [41.8, 12.2],
    [44.4, 8.9], [43.3, 5.4], [41.4, 2.2], [39.4, -0.3], [36.7, -4.4],
  ],
  // Great Britain & Ireland
  [
    [50.1, -5.7], [51.4, -3.2], [53.4, -3.1], [55.0, -5.0], [58.6, -5.0],
    [58.6, -3.0], [57.1, -2.1], [55.0, -1.4], [52.9, 1.4], [51.3, 1.4], [50.7, -1.5],
  ],
  [
    [51.5, -9.8], [52.8, -9.5], [54.4, -8.5], [55.3, -7.2], [54.6, -5.6],
    [53.3, -6.2], [52.1, -6.9],
  ],
  // Iceland
  [
    [64.1, -22.7], [65.6, -24.5], [66.5, -18.0], [65.2, -13.6], [63.5, -19.0],
  ],
  // Africa
  [
    [35.8, -5.9], [35.8, -0.5], [37.2, 9.8], [33.0, 11.5], [32.9, 13.2],
    [31.2, 20.1], [31.5, 32.3], [29.9, 32.6], [27.0, 34.0], [22.0, 36.9],
    [15.6, 39.5], [12.6, 43.3], [11.8, 51.3], [5.0, 48.3], [-1.8, 41.5],
    [-6.8, 39.3], [-11.0, 40.5], [-19.8, 34.9], [-26.0, 32.6], [-29.9, 31.0],
    [-33.9, 25.6], [-34.8, 20.0], [-33.9, 18.4], [-26.6, 15.1], [-17.2, 11.8],
    [-8.8, 13.2], [-4.8, 11.8], [1.8, 9.8], [4.0, 9.6], [6.4, 3.4],
    [5.3, -4.0], [4.4, -7.5], [8.5, -13.3], [14.7, -17.5], [20.9, -17.0],
    [27.8, -13.2], [33.6, -7.6],
  ],
  // Madagascar
  [
    [-12.0, 49.3], [-15.5, 50.4], [-20.5, 48.5], [-25.1, 47.0], [-25.2, 44.2], [-18.5, 44.2], [-14.0, 47.8],
  ],
  // Asia & Middle East
  [
    [41.2, 29.1], [41.8, 35.5], [41.6, 41.6], [43.5, 47.5], [46.8, 48.0],
    [47.0, 52.0], [56.0, 55.0], [66.5, 62.0], [71.5, 72.0], [73.5, 86.0],
    [77.2, 104.0], [73.2, 128.0], [70.8, 152.0], [69.0, 178.0], [65.5, 179.0],
    [61.5, 174.0], [59.8, 164.0], [51.2, 156.8], [56.5, 161.0], [59.2, 146.0],
    [54.2, 138.0], [48.5, 140.0], [42.8, 133.5], [40.2, 128.5], [35.1, 129.1],
    [35.0, 126.5], [37.5, 126.4], [39.8, 124.2], [38.9, 121.6], [40.1, 119.8],
    [37.8, 121.4], [35.5, 119.6], [31.2, 122.0], [28.0, 121.2], [24.5, 118.2],
    [22.3, 114.2], [21.3, 110.5], [20.8, 106.8], [16.1, 108.3], [11.9, 109.2],
    [8.6, 104.8], [13.5, 100.6], [8.5, 99.9], [1.3, 103.8], [3.1, 101.3],
    [6.5, 100.0], [10.0, 98.6], [16.5, 96.3], [20.5, 92.5], [22.3, 91.8],
    [21.6, 87.5], [16.5, 82.0], [13.1, 80.3], [8.1, 77.5], [13.0, 74.8],
    [19.1, 72.8], [22.7, 69.5], [24.8, 67.0], [25.2, 62.0], [26.8, 56.5],
    [29.8, 49.0], [26.3, 50.2], [25.0, 55.1], [23.6, 58.6], [19.0, 57.8],
    [14.5, 49.2], [12.7, 45.0], [13.0, 43.4], [21.5, 39.1], [28.0, 34.6],
    [30.0, 32.6], [31.3, 34.2], [33.9, 35.5], [36.8, 35.9], [36.4, 30.5],
    [38.4, 27.0], [40.1, 26.4],
  ],
  // Sri Lanka
  [
    [9.8, 80.1], [8.5, 81.2], [6.0, 80.5], [6.9, 79.8],
  ],
  // Taiwan
  [
    [25.2, 121.5], [23.5, 121.5], [21.9, 120.8], [23.8, 120.2],
  ],
  // Japan Archipelago
  [
    [31.4, 130.5], [33.6, 130.4], [34.4, 133.5], [35.4, 139.8], [38.3, 141.5],
    [41.4, 141.4], [43.3, 145.5], [45.4, 141.9], [42.0, 140.0], [39.5, 139.9],
    [37.2, 136.8], [35.0, 132.2], [32.8, 129.8],
  ],
  // Philippines (Luzon + Mindanao simplified)
  [
    [18.5, 120.7], [18.3, 122.3], [14.5, 121.7], [13.2, 123.8], [14.0, 120.6], [16.5, 120.3],
  ],
  [
    [9.8, 125.5], [7.2, 126.5], [5.6, 125.4], [7.0, 122.0], [8.6, 123.4],
  ],
  // Sumatra
  [
    [5.6, 95.3], [2.5, 99.8], [-1.0, 104.4], [-5.9, 105.8], [-4.5, 102.5], [1.0, 97.5],
  ],
  // Java
  [
    [-6.1, 105.9], [-6.9, 112.8], [-8.5, 114.5], [-8.2, 110.5], [-7.2, 106.5],
  ],
  // Borneo
  [
    [6.9, 116.8], [5.2, 119.0], [0.8, 117.5], [-3.4, 116.2], [-3.2, 111.5], [1.6, 109.7], [4.8, 114.8],
  ],
  // Sulawesi & New Guinea
  [
    [1.6, 125.0], [-1.5, 123.5], [-5.2, 120.2], [-2.5, 119.0], [1.0, 120.8],
  ],
  [
    [-1.4, 131.0], [-2.6, 140.7], [-6.5, 147.8], [-10.5, 150.5], [-8.2, 143.0], [-4.5, 135.5],
  ],
  // Australia
  [
    [-12.4, 130.8], [-12.0, 136.8], [-15.2, 136.0], [-16.8, 140.8], [-10.7, 142.5],
    [-16.9, 145.8], [-23.5, 150.8], [-27.5, 153.4], [-33.9, 151.3], [-37.5, 150.0],
    [-38.4, 144.8], [-35.2, 138.5], [-32.2, 133.5], [-33.8, 121.9], [-34.4, 115.1],
    [-31.9, 115.8], [-24.9, 113.6], [-20.3, 118.6], [-17.9, 122.2], [-14.0, 126.5],
  ],
  // Tasmania & New Zealand
  [
    [-40.8, 144.8], [-41.2, 148.3], [-43.5, 147.0], [-42.5, 145.2],
  ],
  [
    [-34.5, 172.7], [-37.6, 178.5], [-41.3, 174.8], [-46.5, 168.4], [-43.0, 170.5], [-39.0, 174.0],
  ],
];

/**
 * Subtle internal country / geopolitical border polylines [lat, lng]
 * Drawn delicately over continents to heighten cartographic realism without altering colors.
 */
export const COUNTRY_BORDER_LINES: Array<Array<[number, number]>> = [
  // US - Canada border
  [[49.0, -123.0], [49.0, -95.2], [48.0, -89.5], [46.5, -84.5], [42.3, -83.0], [45.0, -74.7], [47.4, -69.2]],
  // US - Mexico border
  [[32.5, -117.0], [31.3, -111.0], [31.8, -106.5], [29.5, -104.0], [29.8, -101.5], [26.0, -97.2]],
  // South America major borders (Colombia/Venezuela/Brazil/Peru/Bolivia/Argentina/Chile)
  [[1.2, -77.5], [4.5, -72.0], [10.0, -68.0]],
  [[1.5, -67.0], [-4.2, -70.0], [-10.5, -70.5], [-13.5, -60.5], [-20.0, -58.0], [-25.5, -54.5], [-30.0, -57.5], [-33.5, -53.5]],
  [[-18.3, -70.0], [-23.0, -67.0], [-32.8, -70.0], [-41.0, -71.8], [-52.0, -71.0]],
  // Iberian & France / Germany / Italy / Central Europe
  [[42.0, -8.8], [41.5, -6.5], [37.2, -7.4]],
  [[43.4, -1.8], [42.5, 3.0]],
  [[51.0, 2.5], [49.5, 6.0], [47.6, 7.5], [44.0, 7.6]],
  [[47.5, 7.5], [47.0, 13.5], [46.5, 13.8]],
  [[54.8, 9.3], [53.9, 14.2], [50.8, 15.0], [49.0, 13.8], [47.5, 10.5]],
  [[54.5, 19.6], [52.0, 23.5], [49.2, 22.5], [45.2, 29.6]],
  [[59.0, 11.5], [64.0, 13.5], [68.5, 18.0]],
  [[60.5, 20.5], [65.5, 24.0], [69.0, 29.0]],
  [[59.8, 28.0], [56.0, 28.2], [51.0, 35.0], [47.2, 38.2]],
  // Africa major interior borders (Maghreb, Sahel, Nile, Congo, Southern Africa)
  [[35.0, -2.2], [30.0, -5.0], [27.5, -8.5], [21.0, -6.0], [15.0, -12.0]],
  [[33.0, 11.5], [25.0, 10.0], [23.5, 15.0], [22.0, 25.0], [31.5, 25.0]],
  [[22.0, 25.0], [22.0, 36.8]],
  [[22.0, 25.0], [16.0, 24.0], [10.0, 24.0], [4.5, 28.0], [-4.0, 29.5], [-10.0, 28.5], [-17.8, 25.2], [-22.0, 20.0], [-28.5, 16.5]],
  [[13.0, 14.0], [13.5, 3.5], [10.5, -5.5]],
  [[4.5, 34.0], [-1.0, 34.0], [-5.0, 39.0]],
  [[-11.0, 40.5], [-16.0, 33.5], [-22.3, 31.0], [-25.5, 26.0], [-28.8, 17.5]],
  // Middle East & South / Central / East Asia
  [[37.0, 36.0], [37.2, 42.3], [32.5, 47.8], [30.0, 48.0]],
  [[32.0, 35.0], [29.5, 35.0], [29.1, 46.5], [24.0, 51.5], [19.0, 52.0], [15.5, 43.5]],
  [[37.3, 54.0], [36.5, 61.2], [30.0, 61.5], [25.2, 61.5]],
  [[24.5, 70.0], [31.0, 74.5], [35.5, 75.5], [31.0, 79.0], [27.5, 88.5], [28.0, 96.5], [22.0, 92.5]],
  [[55.0, 60.0], [54.0, 75.0], [49.5, 86.0], [44.0, 80.5], [40.5, 69.0], [45.0, 56.0]],
  [[49.5, 86.0], [50.0, 116.0], [53.2, 121.0], [48.2, 134.8], [42.8, 130.6]],
  [[42.0, 124.0], [40.0, 128.0], [38.0, 126.8]],
  [[22.0, 100.0], [21.5, 106.5], [16.5, 105.0], [12.0, 102.5]],
];

/**
 * Major port & coastal hubs for subtle night-side city illumination dots
 */
export const COASTAL_CITY_LIGHTS: Array<[number, number]> = [
  [40.7, -74.0], [34.0, -118.2], [37.7, -122.4], [25.7, -80.2], [45.5, -73.5], [49.2, -123.1],
  [51.5, -0.1], [51.9, 4.4], [53.5, 10.0], [48.8, 2.3], [41.4, 2.1], [41.9, 12.5], [37.9, 23.7],
  [30.0, 31.2], [25.2, 55.2], [21.5, 39.2], [19.0, 72.8], [13.0, 80.2], [1.3, 103.8],
  [22.3, 114.1], [31.2, 121.4], [35.6, 139.7], [37.5, 126.9], [35.1, 129.0], [13.7, 100.5],
  [-6.2, 106.8], [-33.8, 151.2], [-33.9, 18.4], [-29.8, 31.0], [-23.5, -46.6], [-34.6, -58.3],
];

/**
 * Subdivide polygon or polyline edges so sphere projection curves smoothly around Earth horizon
 */
export function densifyPolygon(
  coords: Array<[number, number]>,
  maxStepDeg = 4,
  closed = true
): Array<[number, number]> {
  const result: Array<[number, number]> = [];
  const limit = closed ? coords.length : coords.length - 1;
  for (let i = 0; i < limit; i++) {
    const [lat1, lng1] = coords[i];
    const [lat2, lng2] = coords[(i + 1) % coords.length];
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const steps = Math.max(
      1,
      Math.ceil(Math.max(Math.abs(dLat), Math.abs(dLng)) / maxStepDeg)
    );
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      result.push([lat1 + dLat * t, lng1 + dLng * t]);
    }
  }
  if (!closed && coords.length > 0) {
    result.push(coords[coords.length - 1]);
  }
  return result;
}

export const DENSIFIED_CONTINENTS = CONTINENT_POLYGONS.map((poly) =>
  densifyPolygon(poly, 4, true)
);

export const DENSIFIED_BORDERS = COUNTRY_BORDER_LINES.map((line) =>
  densifyPolygon(line, 4, false)
);

/**
 * Normalize longitude into [-180, 180]
 */
export function normalizeLongitude(lng: number): number {
  let out = ((lng + 180) % 360 + 360) % 360 - 180;
  if (out === -180 && lng > 0) out = 180;
  return out;
}

/**
 * Point-in-polygon check against continental landmasses (lat, lng).
 * Note: Port coastal harbors right on shorelines can sit inside coarse polygon vertices;
 * sea-lane midpoints and ocean vessels must strictly stay outside these land polygons.
 */
function pointInRing(lat: number, lng: number, ring: Array<[number, number]>): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const yi = ring[i][0];
    const xi = ring[i][1];
    const yj = ring[j][0];
    const xj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function isCoordinateOnLand(lat: number, lng: number): boolean {
  const normLng = normalizeLongitude(lng);
  for (const poly of CONTINENT_POLYGONS) {
    if (pointInRing(lat, normLng, poly)) {
      return true;
    }
  }
  return false;
}

/**
 * Maritime Ocean Sea-Lane Waypoint Graph (Strictly Ocean Coordinates!)
 * Used to route Cargo Ships cleanly around Africa, through Suez / Red Sea / Malacca,
 * across the Atlantic, or across the ±180° Pacific Date Line — never crossing over continents.
 */
interface SeaNode {
  id: string;
  lat: number;
  lng: number;
}

const SEA_NODES: SeaNode[] = [
  // North Europe & Atlantic East
  { id: 'NORTH_SEA', lat: 54.0, lng: 3.5 },
  { id: 'ENGLISH_CH', lat: 49.8, lng: -4.2 },
  { id: 'BISCAY', lat: 45.2, lng: -8.5 },
  { id: 'CAPE_FINISTERRE', lat: 42.5, lng: -10.8 },
  { id: 'GIBRALTAR_W', lat: 36.0, lng: -7.5 },
  // Mediterranean & Suez & Red Sea
  { id: 'WEST_MED', lat: 37.8, lng: 3.0 },
  { id: 'CENTRAL_MED', lat: 35.8, lng: 16.5 },
  { id: 'EAST_MED', lat: 33.4, lng: 30.8 },
  { id: 'SUEZ_SEA', lat: 28.2, lng: 33.4 },
  { id: 'RED_SEA_MID', lat: 20.5, lng: 38.4 },
  { id: 'BAB_EL_MANDEB', lat: 12.2, lng: 44.2 },
  // Arabian Sea & Persian Gulf & Indian Ocean
  { id: 'GULF_OF_ADEN', lat: 12.5, lng: 50.5 },
  { id: 'GULF_OF_OMAN', lat: 24.4, lng: 58.6 },
  { id: 'HORMUZ', lat: 26.2, lng: 56.2 },
  { id: 'ARABIAN_SEA', lat: 14.5, lng: 64.5 },
  { id: 'SRI_LANKA_S', lat: 5.0, lng: 80.5 },
  { id: 'INDIAN_W', lat: -8.0, lng: 56.0 },
  { id: 'MOZAMBIQUE_S', lat: -27.5, lng: 34.5 },
  { id: 'CAPE_GOOD_HOPE', lat: -36.5, lng: 19.5 },
  { id: 'SOUTH_ATL_E', lat: -24.0, lng: 4.0 },
  { id: 'SOUTH_ATL_W', lat: -25.0, lng: -42.0 },
  // Malacca & East Asia
  { id: 'ANDAMAN', lat: 6.2, lng: 97.2 },
  { id: 'MALACCA_S', lat: 1.2, lng: 103.5 },
  { id: 'SOUTH_CHINA_SEA', lat: 12.5, lng: 114.2 },
  { id: 'TAIWAN_ST_E', lat: 23.0, lng: 121.8 },
  { id: 'EAST_CHINA_SEA', lat: 30.2, lng: 125.0 },
  { id: 'KOREA_ST', lat: 34.0, lng: 129.0 },
  { id: 'TOKYO_APPROACH', lat: 34.0, lng: 141.5 },
  // Pacific Ocean (handles Date Line cleanly)
  { id: 'PAC_NW', lat: 38.5, lng: 158.0 },
  { id: 'PAC_DATELINE', lat: 41.0, lng: 179.0 },
  { id: 'PAC_NE', lat: 39.5, lng: -152.0 },
  { id: 'CALIF_APPROACH', lat: 33.8, lng: -124.5 },
  { id: 'VANCOUVER_APPR', lat: 48.5, lng: -128.0 },
  // Australia / South Pacific
  { id: 'CORAL_SEA', lat: -14.0, lng: 154.0 },
  { id: 'TASMAN_SEA', lat: -34.2, lng: 154.0 },
  // North Atlantic & Americas
  { id: 'ATL_WEST_N', lat: 40.5, lng: -64.0 },
  { id: 'ATL_MID_N', lat: 42.5, lng: -38.0 },
  { id: 'US_SE_ATL', lat: 31.5, lng: -76.5 },
  { id: 'CARIBBEAN_E', lat: 16.5, lng: -68.0 },
  { id: 'PANAMA_N', lat: 10.2, lng: -79.2 },
  { id: 'PANAMA_S', lat: 7.2, lng: -79.8 },
];

const SEA_EDGES: Array<[string, string]> = [
  ['NORTH_SEA', 'ENGLISH_CH'],
  ['ENGLISH_CH', 'BISCAY'],
  ['BISCAY', 'CAPE_FINISTERRE'],
  ['CAPE_FINISTERRE', 'GIBRALTAR_W'],
  ['CAPE_FINISTERRE', 'ATL_MID_N'],
  ['ENGLISH_CH', 'ATL_MID_N'],
  ['ATL_MID_N', 'ATL_WEST_N'],
  ['ATL_WEST_N', 'US_SE_ATL'],
  ['US_SE_ATL', 'CARIBBEAN_E'],
  ['GIBRALTAR_W', 'WEST_MED'],
  ['GIBRALTAR_W', 'ATL_MID_N'],
  ['GIBRALTAR_W', 'SOUTH_ATL_E'],
  ['WEST_MED', 'CENTRAL_MED'],
  ['CENTRAL_MED', 'EAST_MED'],
  ['EAST_MED', 'SUEZ_SEA'],
  ['SUEZ_SEA', 'RED_SEA_MID'],
  ['RED_SEA_MID', 'BAB_EL_MANDEB'],
  ['BAB_EL_MANDEB', 'GULF_OF_ADEN'],
  ['GULF_OF_ADEN', 'ARABIAN_SEA'],
  ['GULF_OF_ADEN', 'INDIAN_W'],
  ['ARABIAN_SEA', 'GULF_OF_OMAN'],
  ['GULF_OF_OMAN', 'HORMUZ'],
  ['ARABIAN_SEA', 'SRI_LANKA_S'],
  ['SRI_LANKA_S', 'ANDAMAN'],
  ['ANDAMAN', 'MALACCA_S'],
  ['MALACCA_S', 'SOUTH_CHINA_SEA'],
  ['SOUTH_CHINA_SEA', 'TAIWAN_ST_E'],
  ['SOUTH_CHINA_SEA', 'CORAL_SEA'],
  ['TAIWAN_ST_E', 'EAST_CHINA_SEA'],
  ['EAST_CHINA_SEA', 'KOREA_ST'],
  ['KOREA_ST', 'TOKYO_APPROACH'],
  ['TAIWAN_ST_E', 'TOKYO_APPROACH'],
  ['TOKYO_APPROACH', 'PAC_NW'],
  ['PAC_NW', 'PAC_DATELINE'],
  ['PAC_DATELINE', 'PAC_NE'],
  ['PAC_NE', 'CALIF_APPROACH'],
  ['PAC_NE', 'VANCOUVER_APPR'],
  ['CALIF_APPROACH', 'PANAMA_S'],
  ['PANAMA_S', 'PANAMA_N'],
  ['PANAMA_N', 'CARIBBEAN_E'],
  ['CARIBBEAN_E', 'SOUTH_ATL_W'],
  ['SOUTH_ATL_W', 'SOUTH_ATL_E'],
  ['SOUTH_ATL_E', 'CAPE_GOOD_HOPE'],
  ['CAPE_GOOD_HOPE', 'MOZAMBIQUE_S'],
  ['MOZAMBIQUE_S', 'INDIAN_W'],
  ['INDIAN_W', 'SRI_LANKA_S'],
  ['CORAL_SEA', 'TASMAN_SEA'],
  ['TASMAN_SEA', 'PAC_NW'],
];

const PORT_TO_SEA_NODE: Record<string, string> = {
  SGSIN: 'MALACCA_S',
  CNSHA: 'EAST_CHINA_SEA',
  NLRTM: 'NORTH_SEA',
  USLAX: 'CALIF_APPROACH',
  AEJEA: 'HORMUZ',
  DEHAM: 'NORTH_SEA',
  JPYOK: 'TOKYO_APPROACH',
  USNYC: 'ATL_WEST_N',
  KRPUS: 'KOREA_ST',
  HKHKG: 'SOUTH_CHINA_SEA',
  AUSYD: 'TASMAN_SEA',
  BEANR: 'NORTH_SEA',
  GBFXT: 'NORTH_SEA',
  ESVLC: 'WEST_MED',
  USSAV: 'US_SE_ATL',
  CAVAN: 'VANCOUVER_APPR',
  SAJED: 'RED_SEA_MID',
  INMUN: 'ARABIAN_SEA',
  PAPTY: 'PANAMA_S',
  BRSSZ: 'SOUTH_ATL_W',
  ZADUR: 'MOZAMBIQUE_S',
};

export function latLngToVec3(lat: number, lng: number, radius = 1): Vec3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

export function vec3ToLatLng(v: Vec3): LatLngPoint {
  const r = Math.hypot(v.x, v.y, v.z) || 1;
  const lat = 90 - (Math.acos(Math.max(-1, Math.min(1, v.y / r))) * 180) / Math.PI;
  const theta = Math.atan2(v.z, -v.x);
  let lng = (theta * 180) / Math.PI - 180;
  lng = normalizeLongitude(lng);
  return { lat, lng };
}

function sphericalDistanceRad(a: LatLngPoint, b: LatLngPoint): number {
  const va = latLngToVec3(a.lat, a.lng, 1);
  const vb = latLngToVec3(b.lat, b.lng, 1);
  const dot = Math.max(-1, Math.min(1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
  return Math.acos(dot);
}

/**
 * Shortest spherical interpolation (Slerp) along the 3D globe surface.
 * Naturally handles Date Line (±180°) crossings without awkward horizontal jumps.
 */
export function slerpLatLng(a: LatLngPoint, b: LatLngPoint, t: number): LatLngPoint {
  const va = latLngToVec3(a.lat, a.lng, 1);
  const vb = latLngToVec3(b.lat, b.lng, 1);
  const dot = Math.max(-1, Math.min(1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
  const omega = Math.acos(dot);

  if (omega < 1e-4) {
    return {
      lat: a.lat + (b.lat - a.lat) * t,
      lng: a.lng + (b.lng - a.lng) * t,
    };
  }

  const sinOmega = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / sinOmega;
  const k2 = Math.sin(t * omega) / sinOmega;
  return vec3ToLatLng({
    x: k1 * va.x + k2 * vb.x,
    y: k1 * va.y + k2 * vb.y,
    z: k1 * va.z + k2 * vb.z,
  });
}

function nearestSeaNodeId(lat: number, lng: number): string {
  let bestId = SEA_NODES[0].id;
  let bestDist = Infinity;
  for (const node of SEA_NODES) {
    const d = sphericalDistanceRad({ lat, lng }, node);
    if (d < bestDist) {
      bestDist = d;
      bestId = node.id;
    }
  }
  return bestId;
}

/**
 * Computes shortest open-ocean route between two ports using Dijkstra on SEA_NODES.
 */
export function computeSeaLaneWaypoints(
  originCode: string,
  originLat: number,
  originLng: number,
  destCode: string,
  destLat: number,
  destLng: number
): LatLngPoint[] {
  const startId = PORT_TO_SEA_NODE[originCode] ?? nearestSeaNodeId(originLat, originLng);
  const endId = PORT_TO_SEA_NODE[destCode] ?? nearestSeaNodeId(destLat, destLng);

  const nodeMap = new Map<string, SeaNode>();
  SEA_NODES.forEach((n) => nodeMap.set(n.id, n));

  const adj = new Map<string, Array<{ to: string; weight: number }>>();
  SEA_NODES.forEach((n) => adj.set(n.id, []));
  for (const [u, v] of SEA_EDGES) {
    const nu = nodeMap.get(u);
    const nv = nodeMap.get(v);
    if (!nu || !nv) continue;
    const w = sphericalDistanceRad(nu, nv);
    adj.get(u)!.push({ to: v, weight: w });
    adj.get(v)!.push({ to: u, weight: w });
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const unvisited = new Set<string>(SEA_NODES.map((n) => n.id));
  SEA_NODES.forEach((n) => {
    dist.set(n.id, Infinity);
    prev.set(n.id, null);
  });
  dist.set(startId, 0);

  while (unvisited.size > 0) {
    let curr: string | null = null;
    let bestD = Infinity;
    for (const id of unvisited) {
      const d = dist.get(id) ?? Infinity;
      if (d < bestD) {
        bestD = d;
        curr = id;
      }
    }
    if (!curr || curr === endId || bestD === Infinity) break;
    unvisited.delete(curr);

    for (const edge of adj.get(curr) ?? []) {
      if (!unvisited.has(edge.to)) continue;
      const alt = bestD + edge.weight;
      if (alt < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, alt);
        prev.set(edge.to, curr);
      }
    }
  }

  const nodeChain: LatLngPoint[] = [];
  let trace: string | null = endId;
  while (trace) {
    const n = nodeMap.get(trace);
    if (n) nodeChain.unshift({ lat: n.lat, lng: n.lng });
    trace = prev.get(trace) ?? null;
  }

  const points: LatLngPoint[] = [{ lat: originLat, lng: originLng }];
  for (const pt of nodeChain) {
    const last = points[points.length - 1];
    if (sphericalDistanceRad(last, pt) > 0.015) {
      points.push(pt);
    }
  }
  const destPt = { lat: destLat, lng: destLng };
  if (sphericalDistanceRad(points[points.length - 1], destPt) > 0.015) {
    points.push(destPt);
  }
  return points;
}

/**
 * If a sampled maritime coordinate ever nudges onto a coastal corner polygon,
 * shift it gently toward the nearest open-ocean node so no ship ever sits on land.
 */
export function ensureOceanCoordinate(lat: number, lng: number): LatLngPoint {
  if (!isCoordinateOnLand(lat, lng)) {
    return { lat, lng: normalizeLongitude(lng) };
  }
  // Spiral outward or step toward nearest open-sea node until off land
  const nearestId = nearestSeaNodeId(lat, lng);
  const target = SEA_NODES.find((n) => n.id === nearestId) || SEA_NODES[0];
  for (let step = 1; step <= 12; step++) {
    const pt = slerpLatLng({ lat, lng }, target, step / 12);
    if (!isCoordinateOnLand(pt.lat, pt.lng)) {
      return pt;
    }
  }
  return { lat: target.lat, lng: target.lng };
}

/**
 * Generates dense polyline along either:
 * - Aerial great-circle Slerp (for 'Priority Air Charter', flies over continents/ocean)
 * - Ocean Sea-Lane path (for Ocean / Cold-Chain / Ground sea corridors, stays strictly over water)
 */
export function buildCorridorArcSamples(params: {
  originCode: string;
  originLat: number;
  originLng: number;
  destCode: string;
  destLat: number;
  destLng: number;
  mode?: TransportMode;
  samplesCount?: number;
}): LatLngPoint[] {
  const {
    originCode,
    originLat,
    originLng,
    destCode,
    destLat,
    destLng,
    mode = 'Ocean 40ft High-Cube',
    samplesCount = 44,
  } = params;

  if (mode === 'Priority Air Charter') {
    const out: LatLngPoint[] = [];
    const a = { lat: originLat, lng: originLng };
    const b = { lat: destLat, lng: destLng };
    for (let i = 0; i <= samplesCount; i++) {
      out.push(slerpLatLng(a, b, i / samplesCount));
    }
    return out;
  }

  const waypoints = computeSeaLaneWaypoints(
    originCode,
    originLat,
    originLng,
    destCode,
    destLat,
    destLng
  );

  // Measure cumulative spherical length along ocean waypoints
  const segLengths: number[] = [];
  let totalLen = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const d = sphericalDistanceRad(waypoints[i], waypoints[i + 1]);
    segLengths.push(d);
    totalLen += d;
  }

  if (totalLen < 1e-4) {
    return waypoints;
  }

  const sampled: LatLngPoint[] = [];
  for (let i = 0; i <= samplesCount; i++) {
    const targetDist = (i / samplesCount) * totalLen;
    let accum = 0;
    let placed = false;
    for (let seg = 0; seg < segLengths.length; seg++) {
      const len = segLengths[seg];
      if (accum + len >= targetDist || seg === segLengths.length - 1) {
        const localT = len > 1e-6 ? Math.max(0, Math.min(1, (targetDist - accum) / len)) : 0;
        const rawPt = slerpLatLng(waypoints[seg], waypoints[seg + 1], localT);
        // Guarantee middle-sea points never overlap continental polygons
        if (i > 0 && i < samplesCount) {
          sampled.push(ensureOceanCoordinate(rawPt.lat, rawPt.lng));
        } else {
          sampled.push(rawPt);
        }
        placed = true;
        break;
      }
      accum += len;
    }
    if (!placed) sampled.push(waypoints[waypoints.length - 1]);
  }
  return sampled;
}

/**
 * Sample a single route position + instantaneous tangent heading at normalized progress t in [0, 1].
 */
export function sampleRouteAtProgress(params: {
  originCode: string;
  originLat: number;
  originLng: number;
  destCode: string;
  destLat: number;
  destLng: number;
  t: number;
  mode?: TransportMode;
}): { lat: number; lng: number; nextLat: number; nextLng: number } {
  const clampedT = Math.max(0, Math.min(1, params.t));
  const samples = buildCorridorArcSamples({
    originCode: params.originCode,
    originLat: params.originLat,
    originLng: params.originLng,
    destCode: params.destCode,
    destLat: params.destLat,
    destLng: params.destLng,
    mode: params.mode,
    samplesCount: 48,
  });

  const maxIdx = samples.length - 1;
  const fIdx = clampedT * maxIdx;
  const i0 = Math.min(maxIdx - 1, Math.floor(fIdx));
  const i1 = Math.min(maxIdx, i0 + 1);
  const localT = fIdx - i0;
  const cur = slerpLatLng(samples[i0], samples[i1], localT);
  const ahead = samples[Math.min(maxIdx, i0 + 2)];

  const finalPt =
    params.mode !== 'Priority Air Charter' && clampedT > 0.12 && clampedT < 0.88
      ? ensureOceanCoordinate(cur.lat, cur.lng)
      : cur;

  return {
    lat: Number(finalPt.lat.toFixed(3)),
    lng: Number(finalPt.lng.toFixed(3)),
    nextLat: ahead.lat,
    nextLng: ahead.lng,
  };
}

/**
 * Computes the sub-solar geographic coordinate & 3D unit sun vector from real-time UTC clock.
 * Solar noon longitude = (12 - utcHours) * 15° (so 12:00 UTC shines on Prime Meridian 0°).
 * Solar declination accounts for 23.44° axial tilt over the calendar year.
 */
export function getUtcSunVector(date: Date = new Date()): {
  sunLat: number;
  sunLng: number;
  vec: Vec3;
} {
  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const sunLng = normalizeLongitude((12 - utcHours) * 15);

  // Day of year calculation
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = (date.getTime() - startOfYear) / 86400000;
  // Approximate axial tilt declination (-23.44° to +23.44°)
  const sunLat = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));

  return {
    sunLat,
    sunLng,
    vec: latLngToVec3(sunLat, sunLng, 1),
  };
}
