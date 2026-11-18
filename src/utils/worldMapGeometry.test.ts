import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCorridorArcSamples,
  getUtcSunVector,
  isCoordinateOnLand,
  sampleRouteAtProgress,
} from './worldMapGeometry';

test('isCoordinateOnLand accurately separates major landmasses from open oceans', () => {
  // Land interiors
  assert.equal(isCoordinateOnLand(51.1, 10.4), true, 'Central Germany should be land');
  assert.equal(isCoordinateOnLand(23.5, 12.0), true, 'Sahara Africa should be land');
  assert.equal(isCoordinateOnLand(39.0, -98.0), true, 'Central USA should be land');
  assert.equal(isCoordinateOnLand(35.0, 103.0), true, 'Central China should be land');

  // Open oceans
  assert.equal(isCoordinateOnLand(40.0, -40.0), false, 'Mid North Atlantic should be ocean');
  assert.equal(isCoordinateOnLand(15.0, 62.0), false, 'Arabian Sea should be ocean');
  assert.equal(isCoordinateOnLand(36.0, 165.0), false, 'North Pacific should be ocean');
  assert.equal(isCoordinateOnLand(-10.0, 75.0), false, 'Central Indian Ocean should be ocean');
});

test('maritime cargo ship routes keep ocean-transit positions off continental land', () => {
  const routes: Array<[string, number, number, string, number, number]> = [
    ['SGSIN', 1.264, 103.84, 'NLRTM', 51.955, 4.142],
    ['DEHAM', 53.504, 9.931, 'USNYC', 40.684, -74.145],
    ['JPYOK', 35.443, 139.669, 'USLAX', 33.729, -118.262],
    ['CNSHA', 30.626, 122.064, 'AEJEA', 25.011, 55.061],
  ];

  for (const [oCode, oLat, oLng, dCode, dLat, dLng] of routes) {
    for (const t of [0.25, 0.5, 0.75]) {
      const sample = sampleRouteAtProgress({
        originCode: oCode,
        originLat: oLat,
        originLng: oLng,
        destCode: dCode,
        destLat: dLat,
        destLng: dLng,
        t,
        mode: 'Ocean 40ft High-Cube',
      });
      assert.equal(
        isCoordinateOnLand(sample.lat, sample.lng),
        false,
        `${oCode}->${dCode} at t=${t} (${sample.lat}, ${sample.lng}) must stay over ocean`
      );
    }
  }
});

test('JPYOK to USLAX trans-Pacific ship arc crosses the Date Line rather than Asia/Europe', () => {
  const arc = buildCorridorArcSamples({
    originCode: 'JPYOK',
    originLat: 35.443,
    originLng: 139.669,
    destCode: 'USLAX',
    destLat: 33.729,
    destLng: -118.262,
    mode: 'Refrigerated Cold-Chain',
    samplesCount: 24,
  });

  // Midpoint around North Pacific Date Line has abs(lng) > 130 (Pacific hemisphere), never Europe/Atlantic (~0)
  const mid = arc[Math.floor(arc.length / 2)];
  assert.ok(
    Math.abs(mid.lng) > 130,
    `Trans-Pacific midpoint longitude (${mid.lng}) should cross the Pacific Date Line`
  );
});

test('Priority Air Charter follows direct aerial great-circle route', () => {
  const airMid = sampleRouteAtProgress({
    originCode: 'DEHAM',
    originLat: 53.504,
    originLng: 9.931,
    destCode: 'USNYC',
    destLat: 40.684,
    destLng: -74.145,
    t: 0.5,
    mode: 'Priority Air Charter',
  });
  // Great-circle North Atlantic flight curves northward above 48°N
  assert.ok(
    airMid.lat > 49 && airMid.lng < -20 && airMid.lng > -50,
    `Air midpoint (${airMid.lat}, ${airMid.lng}) should trace high North Atlantic great circle`
  );
});

test('getUtcSunVector computes normalized solar direction synced to UTC time', () => {
  const noonUtc = new Date('2026-06-21T12:00:00Z');
  const sunNoon = getUtcSunVector(noonUtc);
  const mag = Math.hypot(sunNoon.vec.x, sunNoon.vec.y, sunNoon.vec.z);
  assert.ok(Math.abs(mag - 1) < 1e-6, 'Sun vector must be normalized');
  assert.ok(Math.abs(sunNoon.sunLng) < 1, '12:00 UTC sun longitude should be near 0 deg');
  assert.ok(sunNoon.sunLat > 20, 'June solstice sun declination should be northern (+23°)');
});
