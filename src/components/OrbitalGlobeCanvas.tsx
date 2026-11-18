import React, { useEffect, useRef, useState } from 'react';
import { Compass, Moon, Pause, Play, RotateCcw, Shield, Sun } from 'lucide-react';
import { GLOBAL_PORTS, ShipmentRecord } from '../utils/freightEngine';
import {
  COASTAL_CITY_LIGHTS,
  DENSIFIED_BORDERS,
  DENSIFIED_CONTINENTS,
  Vec3,
  buildCorridorArcSamples,
  ensureOceanCoordinate,
  getUtcSunVector,
  latLngToVec3,
} from '../utils/worldMapGeometry';

interface OrbitalGlobeCanvasProps {
  activeShipment: ShipmentRecord | null;
  allShipments: ShipmentRecord[];
  onSelectWaybill?: (waybillId: string) => void;
  allowFleetSwitcher?: boolean;
  emptyPromptTitle?: string;
  emptyPromptSubtitle?: string;
}

interface StarPoint {
  xFrac: number;
  yFrac: number;
  size: number;
  phase: number;
  speed: number;
  isSparkle: boolean;
}

const COSMIC_STARS: StarPoint[] = Array.from({ length: 135 }, (_, idx) => {
  const s1 = Math.sin(idx * 12.9898) * 43758.5453;
  const s2 = Math.sin(idx * 78.233 + 1.7) * 28461.132;
  const s3 = Math.sin(idx * 45.164 + 3.1) * 19534.712;
  const r1 = s1 - Math.floor(s1);
  const r2 = s2 - Math.floor(s2);
  const r3 = s3 - Math.floor(s3);
  return {
    xFrac: r1,
    yFrac: r2,
    size: idx % 9 === 0 ? 2.1 : idx % 3 === 0 ? 1.35 : 0.85,
    phase: r3 * Math.PI * 2,
    speed: 0.9 + r3 * 2.2,
    isSparkle: idx % 11 === 0,
  };
});

// Rotate point around Y axis (yaw), then 23.4° axial tilt Z-roll & X pitch
function rotateEarthPoint(p: Vec3, yaw: number, pitch: number): Vec3 {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = p.x * cosY - p.z * sinY;
  const z1 = p.x * sinY + p.z * cosY;

  // Subtle realistic Earth axial tilt (~23.4 deg projected smoothly)
  const tilt = 0.24;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  const x2 = x1 * cosT - p.y * sinT;
  const y2 = x1 * sinT + p.y * cosT;

  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);
  const y3 = y2 * cosP - z1 * sinP;
  const z3 = y2 * sinP + z1 * cosP;

  return { x: x2, y: y3, z: z3 };
}

// Draw shining 4-point star sparkle
function drawStarSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
  ctx.beginPath();
  const rOuter = radius * 3.1;
  const rInner = radius * 0.55;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const rad = i % 2 === 0 ? rOuter : rInner;
    const px = Math.cos(angle) * rad;
    const py = Math.sin(angle) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Animated Ocean Cargo Ship strictly gliding across water with ocean bow waves & stern wake
function drawCargoShipIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  headingRad: number,
  swellOffset: number,
  pulseTick: number
) {
  ctx.save();
  ctx.translate(x, y + swellOffset);
  ctx.rotate(headingRad);

  // Expanding stern wake V-waves in ocean water
  for (let w = 0; w < 2; w++) {
    const phase = ((pulseTick * 1.15 + w * 0.5) % 1);
    const alpha = (1 - phase) * 0.72;
    ctx.strokeStyle = `rgba(186, 230, 253, ${alpha})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-12 - phase * 10, -2 - phase * 5);
    ctx.lineTo(-18 - phase * 12, -5 - phase * 7);
    ctx.moveTo(-12 - phase * 10, 2 + phase * 5);
    ctx.lineTo(-18 - phase * 12, 5 + phase * 7);
    ctx.stroke();
  }

  // Soft ocean ripple ring around bow
  const bowWave = (pulseTick * 1.4) % 1;
  ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - bowWave) * 0.7})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(13, 0, 3 + bowWave * 4.5, -0.8, 0.8);
  ctx.stroke();

  // Hull shadow & crisp outline
  ctx.shadowColor = 'rgba(2, 6, 23, 0.65)';
  ctx.shadowBlur = 7;
  ctx.beginPath();
  ctx.moveTo(-14, -5.5);
  ctx.lineTo(8, -5.5);
  ctx.lineTo(16, 0);
  ctx.lineTo(8, 5.5);
  ctx.lineTo(-14, 5.5);
  ctx.closePath();
  ctx.fillStyle = '#0F2A5F';
  ctx.fill();
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Multi-colored stacked ocean container bays
  ctx.fillStyle = '#22C55E';
  ctx.fillRect(-5, -3.5, 4.5, 7);
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(0.5, -3.5, 4.5, 7);
  ctx.fillStyle = '#FACC15';
  ctx.fillRect(6, -2.8, 3.5, 5.6);

  // White Bridge Tower at stern
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(-12, -3.8, 4.2, 7.6);
  ctx.fillStyle = '#1D4ED8';
  ctx.fillRect(-10.5, -2.5, 1.5, 5);

  ctx.restore();
}

// Animated Cargo Airplane gliding on stratospheric wind with contrails & banking motion
function drawCargoPlaneIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  headingRad: number,
  glideBank: number,
  pulseTick: number
) {
  ctx.save();
  ctx.translate(x, y + Math.sin(pulseTick * 2.6) * 2.6);
  ctx.rotate(headingRad + glideBank);

  // Twin animated wind contrail streams behind wings
  for (let side of [-5.5, 5.5]) {
    const streamLen = 22 + Math.sin(pulseTick * 4) * 4;
    const grad = ctx.createLinearGradient(-4, side, -4 - streamLen, side);
    grad.addColorStop(0, 'rgba(224, 242, 254, 0.85)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-4, side);
    ctx.lineTo(-4 - streamLen, side);
    ctx.stroke();
  }

  // Animated wind slipstream arc passing wingtips
  const windOffset = (pulseTick * 18) % 16;
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.55)';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(8 - windOffset, -11);
  ctx.lineTo(-4 - windOffset, -11);
  ctx.moveTo(10 - windOffset, 11);
  ctx.lineTo(-2 - windOffset, 11);
  ctx.stroke();

  ctx.shadowColor = 'rgba(56, 189, 248, 0.55)';
  ctx.shadowBlur = 8;

  // Boeing 777F Swept Wings
  ctx.fillStyle = '#E0F2FE';
  ctx.strokeStyle = '#0F2A5F';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(3, -1.8);
  ctx.lineTo(-5, -13.5);
  ctx.lineTo(-8, -13.5);
  ctx.lineTo(-3, -1.8);
  ctx.lineTo(-3, 1.8);
  ctx.lineTo(-8, 13.5);
  ctx.lineTo(-5, 13.5);
  ctx.lineTo(3, 1.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Horizontal Tail Stabilizers
  ctx.beginPath();
  ctx.moveTo(-9.5, -1.2);
  ctx.lineTo(-13.5, -5.5);
  ctx.lineTo(-15, -5.5);
  ctx.lineTo(-12.5, 0);
  ctx.lineTo(-15, 5.5);
  ctx.lineTo(-13.5, 5.5);
  ctx.lineTo(-9.5, 1.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Fuselage
  ctx.beginPath();
  ctx.ellipse(0, 0, 14.5, 2.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#1D4ED8';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Sovereign Blue Tail Stripe & Cockpit Windscreen
  ctx.fillStyle = '#0EA5E9';
  ctx.fillRect(-13.5, -1.1, 4.5, 2.2);
  ctx.fillStyle = '#0F2A5F';
  ctx.beginPath();
  ctx.arc(10.5, 0, 1.3, -Math.PI / 2, Math.PI / 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

export const OrbitalGlobeCanvas: React.FC<OrbitalGlobeCanvasProps> = ({
  activeShipment,
  allShipments,
  onSelectWaybill,
  allowFleetSwitcher = false,
  emptyPromptTitle = 'Private Orbital Telemetry Protection Active',
  emptyPromptSubtitle = 'Enter a Waybill Reference ID to inspect vessel or flight corridor telemetry.',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const initialLng = activeShipment?.currentLng ?? 30;
  const rotationRef = useRef<{ yaw: number; pitch: number }>({
    yaw: -((initialLng + 65) * Math.PI) / 180,
    pitch: 0.18,
  });
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(true);
  const activeShipmentRef = useRef<ShipmentRecord | null>(activeShipment);
  const allShipmentsRef = useRef<ShipmentRecord[]>(allShipments);
  const allowFleetSwitcherRef = useRef<boolean>(allowFleetSwitcher);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    activeShipmentRef.current = activeShipment;
    if (activeShipment) {
      rotationRef.current.yaw = -((activeShipment.currentLng + 70) * Math.PI) / 180;
    }
  }, [activeShipment]);

  useEffect(() => {
    allShipmentsRef.current = allShipments;
  }, [allShipments]);

  useEffect(() => {
    allowFleetSwitcherRef.current = allowFleetSwitcher;
  }, [allowFleetSwitcher]);

  const handleCenterOnVessel = () => {
    const target = activeShipment ?? allShipments[0];
    if (!target) return;
    rotationRef.current = {
      yaw: -((target.currentLng + 70) * Math.PI) / 180,
      pitch: Math.max(-0.45, Math.min(0.45, (target.currentLat * Math.PI) / 360)),
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let pulseTick = 0;

    const renderFrame = () => {
      pulseTick += 0.032;
      if (autoRotateRef.current && !isDraggingRef.current) {
        // Real eastward Earth rotation
        rotationRef.current.yaw -= 0.0018;
      }

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2 + 2;
      const radius = Math.min(width, height) * 0.34;
      const { yaw, pitch } = rotationRef.current;

      // 1. Deep Cosmic Space Background
      const spaceGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.4,
        cx,
        cy,
        Math.max(width, height) * 0.78
      );
      spaceGrad.addColorStop(0, '#071B44');
      spaceGrad.addColorStop(0.55, '#040C22');
      spaceGrad.addColorStop(1, '#020510');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Shining & Twinkling Stars in Space
      COSMIC_STARS.forEach((star) => {
        const sx = star.xFrac * width;
        const sy = star.yFrac * height;
        // Skip behind Earth disc
        if (Math.hypot(sx - cx, sy - cy) < radius * 1.03) return;
        const twinkle = 0.42 + 0.58 * (0.5 + 0.5 * Math.sin(pulseTick * star.speed + star.phase));
        if (star.isSparkle && twinkle > 0.65) {
          drawStarSparkle(ctx, sx, sy, star.size, twinkle * 0.92);
        } else {
          ctx.fillStyle = `rgba(224, 242, 254, ${twinkle * 0.85})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Real-Time UTC Sun & Moon Vectors
      const utcNow = new Date();
      const solarInfo = getUtcSunVector(utcNow);
      const sunRot = rotateEarthPoint(solarInfo.vec, yaw, pitch);
      // Place glowing Sun in surrounding cosmos cleanly outside Earth limb
      const sunNorm = Math.hypot(sunRot.x, sunRot.y) || 1;
      const sunOrbitDist = radius * 1.56;
      const sunX = cx + (sunRot.x / sunNorm) * sunOrbitDist;
      const sunY = cy - (sunRot.y / sunNorm) * sunOrbitDist;

      // Subtle Moon ~148° away in surrounding cosmos
      const moonVec = latLngToVec3(-solarInfo.sunLat * 0.65, solarInfo.sunLng + 148, 1);
      const moonRot = rotateEarthPoint(moonVec, yaw, pitch);
      const moonNorm = Math.hypot(moonRot.x, moonRot.y) || 1;
      const moonOrbitDist = radius * 1.46;
      const moonX = cx + (moonRot.x / moonNorm) * moonOrbitDist;
      const moonY = cy - (moonRot.y / moonNorm) * moonOrbitDist;

      // Render Sun behind Earth rim if on far hemisphere, or bright in front
      const drawSunBody = () => {
        ctx.save();
        const sunCorona = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 44);
        sunCorona.addColorStop(0, 'rgba(255, 251, 235, 0.98)');
        sunCorona.addColorStop(0.28, 'rgba(253, 224, 71, 0.58)');
        sunCorona.addColorStop(0.65, 'rgba(251, 146, 60, 0.16)');
        sunCorona.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.fillStyle = sunCorona;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 44, 0, Math.PI * 2);
        ctx.fill();

        // Subtle animated solar flare rays
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
        ctx.lineWidth = 1.1;
        for (let r = 0; r < 8; r++) {
          const ang = (r * Math.PI) / 4 + pulseTick * 0.18;
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(ang) * 14, sunY + Math.sin(ang) * 14);
          ctx.lineTo(sunX + Math.cos(ang) * 23, sunY + Math.sin(ang) * 23);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sunX, sunY, 11.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FEF9C3';
        ctx.fill();
        ctx.restore();
      };

      const drawMoonBody = () => {
        ctx.save();
        const moonHalo = ctx.createRadialGradient(moonX, moonY, 3, moonX, moonY, 20);
        moonHalo.addColorStop(0, 'rgba(226, 232, 240, 0.35)');
        moonHalo.addColorStop(1, 'rgba(148, 163, 184, 0)');
        ctx.fillStyle = moonHalo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(moonX, moonY, 8.2, 0, Math.PI * 2);
        const moonShade = ctx.createLinearGradient(
          moonX - 7,
          moonY - 5,
          moonX + 7,
          moonY + 5
        );
        moonShade.addColorStop(0, '#F1F5F9');
        moonShade.addColorStop(0.6, '#94A3B8');
        moonShade.addColorStop(1, '#1E293B');
        ctx.fillStyle = moonShade;
        ctx.fill();
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.65)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      };

      if (sunRot.z <= 0) drawSunBody();
      if (moonRot.z <= 0) drawMoonBody();

      // 4. Atmospheric Outer Halo (Blue & Ice-Blue)
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.84,
        cx,
        cy,
        radius * 1.24
      );
      haloGrad.addColorStop(0, 'rgba(37, 99, 235, 0.24)');
      haloGrad.addColorStop(0.55, 'rgba(56, 189, 248, 0.14)');
      haloGrad.addColorStop(1, 'rgba(2, 6, 18, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.24, 0, Math.PI * 2);
      ctx.fill();

      // 5. Deep Ocean Globe Sphere Fill (Exact Maritime Blue Palette Preserved)
      const lightOffsetX = sunRot.x * radius * 0.42;
      const lightOffsetY = -sunRot.y * radius * 0.42;
      const sphereGrad = ctx.createRadialGradient(
        cx + lightOffsetX,
        cy + lightOffsetY,
        radius * 0.08,
        cx,
        cy,
        radius * 1.05
      );
      sphereGrad.addColorStop(0, '#2563EB');
      sphereGrad.addColorStop(0.55, '#0F2A5F');
      sphereGrad.addColorStop(1, '#06132E');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Crisp Ice-Blue Atmosphere Rim
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 6. Clip inside Earth Sphere for Detailed Continents, Country Borders, City Lights & Day/Night Terminator
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 0.8, 0, Math.PI * 2);
      ctx.clip();

      // 6A. Realistic Continents
      DENSIFIED_CONTINENTS.forEach((poly) => {
        const rotated = poly.map(([lat, lng]) =>
          rotateEarthPoint(latLngToVec3(lat, lng, radius), yaw, pitch)
        );
        const visibleCount = rotated.filter((p) => p.z > 0).length;
        if (visibleCount === 0) return;

        ctx.beginPath();
        rotated.forEach((p, idx) => {
          let sx = cx + p.x;
          let sy = cy - p.y;
          if (p.z < 0) {
            const len = Math.hypot(p.x, p.y) || 1;
            sx = cx + (p.x / len) * radius;
            sy = cy - (p.y / len) * radius;
          }
          if (idx === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.closePath();

        ctx.fillStyle = 'rgba(224, 242, 254, 0.28)';
        ctx.fill();

        // Crisp front coastlines
        ctx.beginPath();
        let penDown = false;
        for (let i = 0; i < rotated.length; i++) {
          const p = rotated[i];
          if (p.z > 0) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!penDown) {
              ctx.moveTo(sx, sy);
              penDown = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            penDown = false;
          }
        }
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.78)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });

      // 6B. Subtle Internal Country Borders inside Continents
      DENSIFIED_BORDERS.forEach((line) => {
        const rotated = line.map(([lat, lng]) =>
          rotateEarthPoint(latLngToVec3(lat, lng, radius), yaw, pitch)
        );
        ctx.beginPath();
        let penDown = false;
        for (const p of rotated) {
          if (p.z > 0) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!penDown) {
              ctx.moveTo(sx, sy);
              penDown = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            penDown = false;
          }
        }
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.34)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      // 6C. Accurate UTC Day / Night Shadow Terminator across Sphere
      const nightCenterX = cx - sunRot.x * radius * 0.88;
      const nightCenterY = cy + sunRot.y * radius * 0.88;
      const nightGrad = ctx.createRadialGradient(
        nightCenterX,
        nightCenterY,
        radius * 0.12,
        nightCenterX,
        nightCenterY,
        radius * 1.48
      );
      nightGrad.addColorStop(0, 'rgba(2, 6, 20, 0.74)');
      nightGrad.addColorStop(0.58, 'rgba(4, 14, 42, 0.42)');
      nightGrad.addColorStop(0.76, 'rgba(56, 189, 248, 0.11)'); // Subtle atmospheric twilight line
      nightGrad.addColorStop(1, 'rgba(125, 211, 252, 0.06)');
      ctx.fillStyle = nightGrad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // 6D. Coastal City Lights illuminating strictly on Night Hemisphere
      COASTAL_CITY_LIGHTS.forEach(([lat, lng]) => {
        const worldPos = latLngToVec3(lat, lng, 1);
        const solarDot =
          worldPos.x * solarInfo.vec.x +
          worldPos.y * solarInfo.vec.y +
          worldPos.z * solarInfo.vec.z;
        if (solarDot > 0.05) return; // Daylight side: hide night lights
        const rp = rotateEarthPoint(
          { x: worldPos.x * radius, y: worldPos.y * radius, z: worldPos.z * radius },
          yaw,
          pitch
        );
        if (rp.z <= 2) return;
        const nightStrength = Math.min(1, (-solarDot + 0.05) * 2.5);
        ctx.fillStyle = `rgba(253, 224, 71, ${0.72 * nightStrength})`;
        ctx.beginPath();
        ctx.arc(cx + rp.x, cy - rp.y, 1.45, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Render Sun/Moon in front if on viewer-facing hemisphere
      if (sunRot.z > 0) drawSunBody();
      if (moonRot.z > 0) drawMoonBody();

      // 7. Render Active & Authorized Shipping / Air Corridors
      const currentActive = activeShipmentRef.current;
      const shipmentsToRender = allowFleetSwitcherRef.current
        ? allShipmentsRef.current
        : currentActive
        ? [currentActive]
        : [];

      shipmentsToRender.forEach((shipment) => {
        const originPort =
          GLOBAL_PORTS.find((p) => p.code === shipment.originPortCode) ||
          GLOBAL_PORTS[0];
        const destPort =
          GLOBAL_PORTS.find((p) => p.code === shipment.destinationPortCode) ||
          GLOBAL_PORTS[2];

        const isSelected = Boolean(
          currentActive && shipment.waybillId === currentActive.waybillId
        );
        const isAirMode = shipment.mode === 'Priority Air Charter';

        const pStart = rotateEarthPoint(
          latLngToVec3(originPort.lat, originPort.lng, radius),
          yaw,
          pitch
        );
        const pEnd = rotateEarthPoint(
          latLngToVec3(destPort.lat, destPort.lng, radius),
          yaw,
          pitch
        );

        // Multi-point spherical corridor (Ocean Sea-Lane for Ships vs High Aerial Arc for Planes)
        const geoSamples = buildCorridorArcSamples({
          originCode: originPort.code,
          originLat: originPort.lat,
          originLng: originPort.lng,
          destCode: destPort.code,
          destLat: destPort.lat,
          destLng: destPort.lng,
          mode: shipment.mode,
          samplesCount: 44,
        });

        const arcScreenPts = geoSamples.map((pt, idx) => {
          const t = idx / (geoSamples.length - 1);
          // Air routes arch gracefully into sky above continents; ships hug ocean surface cleanly
          const lift = isAirMode
            ? 1 + Math.sin(t * Math.PI) * (isSelected ? 0.17 : 0.08)
            : 1 + Math.sin(t * Math.PI) * 0.02;
          const rp = rotateEarthPoint(
            latLngToVec3(pt.lat, pt.lng, radius * lift),
            yaw,
            pitch
          );
          return { x: cx + rp.x, y: cy - rp.y, z: rp.z };
        });

        ctx.save();
        ctx.beginPath();
        let arcStarted = false;
        arcScreenPts.forEach((pt) => {
          if (pt.z > -radius * 0.14) {
            if (!arcStarted) {
              ctx.moveTo(pt.x, pt.y);
              arcStarted = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            arcStarted = false;
          }
        });

        if (isSelected) {
          const routeGrad = ctx.createLinearGradient(
            cx + pStart.x,
            cy - pStart.y,
            cx + pEnd.x,
            cy - pEnd.y
          );
          routeGrad.addColorStop(0, '#EF4444');
          routeGrad.addColorStop(0.5, '#FACC15');
          routeGrad.addColorStop(1, '#22C55E');
          ctx.strokeStyle = routeGrad;
          ctx.lineWidth = isAirMode ? 2.8 : 3.2;
          if (isAirMode) ctx.setLineDash([6, 4]);
        } else {
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.25)';
          ctx.lineWidth = 1.0;
          ctx.setLineDash([4, 4]);
        }
        ctx.stroke();
        ctx.restore();

        // Active Pins: Red Origin, Yellow Midway, Green Destination
        if (isSelected) {
          const midPt = geoSamples[Math.floor(geoSamples.length / 2)];
          const midLift = isAirMode ? 1.17 : 1.02;
          const pMid = rotateEarthPoint(
            latLngToVec3(midPt.lat, midPt.lng, radius * midLift),
            yaw,
            pitch
          );

          if (pStart.z > -radius * 0.1) {
            const ox = cx + pStart.x;
            const oy = cy - pStart.y;
            ctx.beginPath();
            ctx.arc(ox, oy, 9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.28)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(ox, oy, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#EF4444';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
            ctx.fillText(originPort.code, ox + 9, oy + 3);
          }

          if (pMid.z > -radius * 0.1) {
            const mx = cx + pMid.x;
            const my = cy - pMid.y;
            ctx.beginPath();
            ctx.arc(mx, my, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(250, 204, 21, 0.28)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#FACC15';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }

          if (pEnd.z > -radius * 0.1) {
            const dx = cx + pEnd.x;
            const dy = cy - pEnd.y;
            ctx.beginPath();
            ctx.arc(dx, dy, 9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34, 197, 94, 0.28)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(dx, dy, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#22C55E';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
            ctx.fillText(destPort.code, dx + 9, dy + 3);
          }
        }

        // Animated Live Vehicle Position:
        // Glide smoothly along the true path tangent while honoring checkpoint progress
        const baseT = Math.max(0.06, Math.min(0.94, shipment.progressPct / 100));
        const glideOsc = isSelected ? Math.sin(pulseTick * 0.65) * 0.025 : 0;
        const activeT = Math.max(0.04, Math.min(0.96, baseT + glideOsc));
        const idx0 = Math.min(
          geoSamples.length - 2,
          Math.floor(activeT * (geoSamples.length - 1))
        );
        const rawLive = geoSamples[idx0];
        const rawAhead = geoSamples[Math.min(geoSamples.length - 1, idx0 + 2)];

        const liveGeo = isAirMode
          ? rawLive
          : ensureOceanCoordinate(rawLive.lat, rawLive.lng);
        const vehicleLift = isAirMode ? 1 + Math.sin(activeT * Math.PI) * 0.17 : 1.02;

        const pVessel = rotateEarthPoint(
          latLngToVec3(liveGeo.lat, liveGeo.lng, radius * vehicleLift),
          yaw,
          pitch
        );
        const pAhead = rotateEarthPoint(
          latLngToVec3(rawAhead.lat, rawAhead.lng, radius * vehicleLift),
          yaw,
          pitch
        );

        if (pVessel.z > -radius * 0.12) {
          const vx = cx + pVessel.x;
          const vy = cy - pVessel.y;

          if (isSelected) {
            const headingRad = Math.atan2(-(pAhead.y - pVessel.y), pAhead.x - pVessel.x);

            // Pulsing GPS radar ring
            const pulseRadius = 17 + Math.sin(pulseTick * 2.2) * 4.5;
            ctx.beginPath();
            ctx.arc(vx, vy, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = isAirMode
              ? 'rgba(56, 189, 248, 0.18)'
              : 'rgba(250, 204, 21, 0.16)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
            ctx.lineWidth = 1.25;
            ctx.stroke();

            if (isAirMode) {
              const glideBank = Math.sin(pulseTick * 1.9) * 0.09;
              drawCargoPlaneIcon(ctx, vx, vy, headingRad, glideBank, pulseTick);
            } else {
              const swellOffset = Math.sin(pulseTick * 2.4) * 1.8;
              drawCargoShipIcon(ctx, vx, vy, headingRad, swellOffset, pulseTick);
            }
          } else {
            ctx.beginPath();
            ctx.arc(vx, vy, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#7DD3FC';
            ctx.fill();
          }
        }
      });

      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    rotationRef.current.yaw += dx * 0.006;
    rotationRef.current.pitch = Math.max(
      -0.65,
      Math.min(0.65, rotationRef.current.pitch + dy * 0.006)
    );
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const utcTimeString = new Date().toISOString().slice(11, 16) + ' UTC';

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="glass-blue-window relative w-full flex flex-col items-center justify-between overflow-hidden rounded-3xl p-4 sm:p-5 gap-3">
        {/* Top Bar Outside Globe Sphere */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 z-10">
          {activeShipment ? (
            <div className="glass-blue-sub rounded-2xl px-4 py-2.5">
              <div className="text-[11px] font-semibold text-[#0369A1]">
                {activeShipment.mode === 'Priority Air Charter'
                  ? 'Active Aerial Flight Vector'
                  : 'Active Ocean Sea-Lane Lock'}
              </div>
              <div className="text-sm font-semibold text-[#0B1B3B] tabular-nums">
                {allowFleetSwitcher
                  ? `${activeShipment.waybillId} · ${activeShipment.vesselOrFlightName}`
                  : `Unlocked Corridor · ${activeShipment.vesselOrFlightName}`}
              </div>
              <div className="text-[11px] font-semibold text-[#1E3A5F] tabular-nums">
                Lat {activeShipment.currentLat.toFixed(3)}° · Lng{' '}
                {activeShipment.currentLng.toFixed(3)}°
              </div>
            </div>
          ) : (
            <div className="glass-blue-sub rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#0369A1] shrink-0" />
              <div>
                <div className="text-xs font-semibold text-[#0B1B3B]">{emptyPromptTitle}</div>
                <div className="text-[11px] text-[#1E3A5F]">{emptyPromptSubtitle}</div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 border border-sky-300/70 text-[11px] font-semibold text-[#0B1B3B] tabular-nums">
              <Sun className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Day/Night {utcTimeString}</span>
              <Moon className="w-3 h-3 text-[#1E3A5F] ml-0.5" />
            </div>
            <button
              type="button"
              onClick={() => setAutoRotate((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/75 hover:bg-white border border-sky-300/75 shadow-sm text-xs font-semibold text-[#0B1B3B] transition-colors cursor-pointer"
            >
              {autoRotate ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#0369A1]" />
                  <span>Pause Orbit</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#0369A1]" />
                  <span>Resume Orbit</span>
                </>
              )}
            </button>
            {activeShipment && (
              <button
                type="button"
                onClick={handleCenterOnVessel}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/75 hover:bg-white border border-sky-300/75 shadow-sm text-xs font-semibold text-[#0B1B3B] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0369A1]" />
                <span>
                  {activeShipment.mode === 'Priority Air Charter'
                    ? 'Center Flight'
                    : 'Center Vessel'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Centered Cosmic 3D Earth Canvas */}
        <canvas
          ref={canvasRef}
          width={680}
          height={440}
          data-testid="orbital-globe-canvas"
          data-active-mode={activeShipment?.mode ?? 'locked'}
          data-fleet-switcher={allowFleetSwitcher ? 'true' : 'false'}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full max-w-[680px] h-[360px] sm:h-[420px] rounded-2xl border border-sky-300/60 shadow-inner cursor-grab active:cursor-grabbing select-none"
          aria-label={
            activeShipment
              ? `Interactive 3D Orbital Freight Globe tracking ${activeShipment.originPortCode} to ${activeShipment.destinationPortCode}`
              : 'Interactive 3D Earth Globe in deep space'
          }
        />

        {/* Route Legend + Authorized Fleet Switcher (Fleet IDs ONLY shown on Crew & Master ERP!) */}
        <div className="glass-blue-sub w-full flex flex-wrap items-center justify-between gap-2.5 rounded-2xl px-4 py-2.5 z-10">
          {activeShipment ? (
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#0B1B3B]">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-red-400/40" />
                Origin ({activeShipment.originPortCode})
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-yellow-400/50" />
                {activeShipment.mode === 'Priority Air Charter'
                  ? 'Midway Air Corridor'
                  : 'Midway Ocean Lane'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-emerald-400/40" />
                Destination ({activeShipment.destinationPortCode})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-[#1E3A5F]">
              <Compass className="w-3.5 h-3.5 text-[#0369A1]" />
              <span>Real-time UTC solar terminator & ocean sea-lane visualization</span>
            </div>
          )}

          {allowFleetSwitcher && onSelectWaybill ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#0369A1] mr-0.5 hidden sm:inline" />
              {allShipments.map((s) => (
                <button
                  key={s.waybillId}
                  type="button"
                  onClick={() => onSelectWaybill(s.waybillId)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-shadow cursor-pointer whitespace-nowrap ${
                    activeShipment && s.waybillId === activeShipment.waybillId
                      ? 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white font-semibold shadow-sm'
                      : 'bg-white/75 text-[#0B1B3B] hover:bg-white border border-sky-300/75'
                  }`}
                >
                  {s.waybillId}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[11px] font-semibold text-[#0369A1]">
              Private Telemetry Mode · Enter Waybill ID Manually
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
