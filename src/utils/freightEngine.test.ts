import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFreightQuote,
  calculateGreatCircleKm,
  getCheckpointProgressPct,
  interpolateCorridorPosition,
  normalizeWaybillId,
  validateClientBookingFields,
  VERIFIED_FLEET_ASSETS,
} from './freightEngine';

test('normalizeWaybillId formats bare numbers and hashes cleanly', () => {
  assert.equal(normalizeWaybillId('#VGF-8841'), 'VGF-8841');
  assert.equal(normalizeWaybillId('  vgf-7290 '), 'VGF-7290');
  assert.equal(normalizeWaybillId('8841'), 'VGF-8841');
});

test('calculateGreatCircleKm returns realistic intercontinental distances', () => {
  // Singapore (1.264, 103.84) to Rotterdam (51.955, 4.142)
  const km = calculateGreatCircleKm(1.264, 103.84, 51.955, 4.142);
  assert.ok(km > 9500 && km < 11500, `Expected ~10500km, got ${km}`);
});

test('calculateFreightQuote computes deterministic breakdown and container count', () => {
  const oceanQuote = calculateFreightQuote({
    mode: 'Ocean 40ft High-Cube',
    originPortCode: 'SGSIN',
    destinationPortCode: 'NLRTM',
    weightKg: 24000,
    volumeCbm: 55,
  });

  const airQuote = calculateFreightQuote({
    mode: 'Priority Air Charter',
    originPortCode: 'SGSIN',
    destinationPortCode: 'NLRTM',
    weightKg: 24000,
    volumeCbm: 55,
  });

  assert.equal(
    oceanQuote.totalQuoteUsd,
    oceanQuote.baseFreightUsd +
      oceanQuote.fuelBunkerSurchargeUsd +
      oceanQuote.customsBrokerageUsd +
      oceanQuote.allRiskInsuranceUsd
  );
  assert.ok(airQuote.totalQuoteUsd > oceanQuote.totalQuoteUsd);
  assert.ok(airQuote.estimatedTransitDays < oceanQuote.estimatedTransitDays);
  assert.equal(oceanQuote.recommendedContainers, 1);
  assert.equal(airQuote.recommendedContainers, 2);
});

test('interpolateCorridorPosition advances coordinates and progress across checkpoints', () => {
  const originState = interpolateCorridorPosition(
    'SGSIN',
    'NLRTM',
    'Origin Warehouse'
  );
  const midState = interpolateCorridorPosition(
    'SGSIN',
    'NLRTM',
    'Mid-Ocean Transit'
  );
  const deliveredState = interpolateCorridorPosition(
    'SGSIN',
    'NLRTM',
    'Delivered'
  );

  assert.equal(originState.progressPct, getCheckpointProgressPct('Origin Warehouse'));
  assert.equal(midState.progressPct, 56);
  assert.equal(deliveredState.progressPct, 100);
  assert.notEqual(originState.lat, midState.lat);
  assert.notEqual(midState.lng, deliveredState.lng);
});

test('VERIFIED_FLEET_ASSETS enforces exact 1-to-1 label-to-image mapping', () => {
  assert.equal(VERIFIED_FLEET_ASSETS.length, 5);
  assert.equal(
    VERIFIED_FLEET_ASSETS[0].label,
    'Ultra-Large Container Vessel — Pacific Trade Lane'
  );
  assert.equal(
    VERIFIED_FLEET_ASSETS[0].imageUrl,
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85'
  );
  assert.equal(
    VERIFIED_FLEET_ASSETS[2].label,
    'Priority Boeing 777F Air Freight Corridor'
  );
  assert.equal(
    VERIFIED_FLEET_ASSETS[2].imageUrl,
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85'
  );
});

test('validateClientBookingFields rejects missing or invalid contact fields and accepts valid input', () => {
  assert.ok(
    validateClientBookingFields({
      contactPerson: '   ',
      contactNumber: '+1 555 234 8910',
      companyEmail: 'ops@aethelgard.de',
      companyEntity: 'Aethelgard AG',
      commodity: 'Wafer Optics',
    })
  );
  assert.ok(
    validateClientBookingFields({
      contactPerson: 'Dr. Elena Vance',
      contactNumber: '123',
      companyEmail: 'ops@aethelgard.de',
      companyEntity: 'Aethelgard AG',
      commodity: 'Wafer Optics',
    })
  );
  assert.ok(
    validateClientBookingFields({
      contactPerson: 'Dr. Elena Vance',
      contactNumber: '+1 555 234 8910',
      companyEmail: 'invalid-email',
      companyEntity: 'Aethelgard AG',
      commodity: 'Wafer Optics',
    })
  );
  assert.equal(
    validateClientBookingFields({
      contactPerson: 'Dr. Elena Vance',
      contactNumber: '+1 (555) 234-8910',
      companyEmail: 'elena.vance@aethelgard.de',
      companyEntity: 'Aethelgard Semiconductor AG',
      commodity: 'Cleanroom Wafer Stepper Modules',
    }),
    null
  );
});

