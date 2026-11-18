import React from 'react';
import { motion } from 'motion/react';
import { TransportMode } from '../utils/freightEngine';

interface ContainerTruckVisualizerProps {
  volumeCbm: number;
  volumeUtilizationPct: number;
  weightUtilizationPct: number;
  recommendedContainers: number;
  mode: TransportMode;
}

/**
 * Mode-aware cubic volume packing visualizer:
 * - Priority Air Charter: side-elevation Boeing 777F Widebody Freighter with green main-deck ULD fill.
 * - Ocean / Cold-Chain / Ground: side-elevation 40ft container semi-truck with green cargo fill.
 */
export const ContainerTruckVisualizer: React.FC<
  ContainerTruckVisualizerProps
> = ({
  volumeCbm,
  volumeUtilizationPct,
  weightUtilizationPct,
  recommendedContainers,
  mode,
}) => {
  const clampedVol = Math.max(0, Math.min(100, volumeUtilizationPct));
  const clampedWeight = Math.max(0, Math.min(100, weightUtilizationPct));
  const isAir = mode === 'Priority Air Charter';
  const isColdChain = mode === 'Refrigerated Cold-Chain';

  if (isAir) {
    const bayWidth = 236;
    const greenBayWidth = (bayWidth * clampedVol) / 100;

    return (
      <div className="glass-blue-sub p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#0B1B3B]">
            Main-Deck Aircraft ULD Fill ({volumeCbm} CBM)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-400/70 font-semibold text-[#15803D] tabular-nums">
            {clampedVol}% Cargo Deck
          </span>
        </div>

        {/* Side-Elevation Boeing 777F Widebody Cargo Aircraft */}
        <motion.div
          data-testid="air-freighter-visualizer"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative pt-3 pb-2 px-3 rounded-xl bg-gradient-to-b from-[#0E3675]/80 via-[#0A2252]/88 to-[#051029]/95 border border-sky-300/30 shadow-inner"
        >
          <svg
            viewBox="0 0 420 132"
            className="w-full h-32 overflow-visible animate-float-gentle"
            role="img"
            aria-label={`Boeing 777F Cargo Aircraft loaded ${clampedVol}% (${volumeCbm} CBM)`}
          >
            <defs>
              <linearGradient id="vgf-air-tail" x1="20" y1="6" x2="96" y2="62" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="55%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="vgf-air-fuselage" x1="60" y1="32" x2="60" y2="82" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="vgf-air-green" x1="88" y1="40" x2="324" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="55%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <clipPath id="vgf-air-bay-clip">
                <rect x="88" y="39" width={bayWidth} height="29" rx="5" />
              </clipPath>
            </defs>

            {/* Vertical Tail Stabilizer */}
            <path
              d="M36 52 L16 8 H46 L82 44 Z"
              fill="url(#vgf-air-tail)"
              stroke="#1E3A8A"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M29 22 L46 22 L62 38 L44 38 Z" fill="#FFFFFF" fillOpacity="0.24" />
            {/* Horizontal Tailplane */}
            <path d="M18 57 L54 54 L60 60 L20 62 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />

            {/* Widebody Boeing 777F Fuselage */}
            <path
              d="M28 60 Q48 44 82 36 H334 C366 36 394 46 406 62 C398 74 374 80 342 80 H82 Q52 80 28 64 Z"
              fill="url(#vgf-air-fuselage)"
              stroke="#64748B"
              strokeWidth="1.5"
            />

            {/* Main-Deck Cargo Bay Window Cavity */}
            <rect
              x="88"
              y="39"
              width={bayWidth}
              height="29"
              rx="5"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.2"
            />

            {/* Green Cubic Volume Fill inside Main Deck */}
            <g clipPath="url(#vgf-air-bay-clip)">
              <motion.rect
                data-testid="cubic-volume-green-fill"
                x="88"
                y="39"
                initial={false}
                animate={{ width: greenBayWidth }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                height="29"
                fill="url(#vgf-air-green)"
              />
              {/* ULD Pallet Slot Dividers */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line
                  key={i}
                  x1={88 + i * (bayWidth / 8)}
                  y1="39"
                  x2={88 + i * (bayWidth / 8)}
                  y2="68"
                  stroke="#FFFFFF"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Nose Cargo Door Outline & Cockpit Windshields */}
            <path d="M352 43 L370 43 L381 51 L352 51 Z" fill="#0F2A5F" />
            <line x1="362" y1="43" x2="365" y2="51" stroke="#7DD3FC" strokeWidth="1" />
            <line x1="336" y1="40" x2="336" y2="75" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2" />

            {/* Lower Swept Main Wing & GE90 Turbofan Engine */}
            <path
              d="M174 71 L248 71 L212 94 L162 94 Z"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <rect
              x="212"
              y="74"
              width="44"
              height="20"
              rx="6"
              fill="#F8FAFC"
              stroke="#334155"
              strokeWidth="1.4"
            />
            <rect x="249" y="75" width="7" height="18" rx="2" fill="#0F2A5F" />
            <path d="M202 79 L212 77 L212 91 L202 89 Z" fill="#64748B" />

            {/* Nose & Main Bogie Landing Gear */}
            <line x1="352" y1="80" x2="352" y2="104" stroke="#334155" strokeWidth="2.5" />
            <circle cx="352" cy="109" r="6.5" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
            <circle cx="352" cy="109" r="2.5" fill="#CBD5E1" />

            <line x1="214" y1="94" x2="214" y2="105" stroke="#334155" strokeWidth="2.8" />
            <rect x="197" y="102" width="34" height="3.5" rx="1" fill="#475569" />
            {[201, 214, 227].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="110" r="6.5" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
                <circle cx={cx} cy="110" r="2.5" fill="#CBD5E1" />
              </g>
            ))}

            {/* Runway Horizon */}
            <line x1="8" y1="118" x2="412" y2="118" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="123" x2="392" y2="123" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="16 12" />
          </svg>

          {/* Clean Aircraft Payload Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-300/45 text-[11px] font-semibold text-[#86EFAC] tabular-nums">
              {volumeCbm} CBM · {clampedVol}% Main Deck Loaded
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-500/20 border border-sky-300/35 text-[11px] font-semibold text-[#BAE6FD] tabular-nums">
              {recommendedContainers}x PMC ULD Deck · Boeing 777F
            </span>
          </div>
        </motion.div>

        {/* Structural Payload Weight Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-[#0B1B3B]">
            <span className="font-medium">Boeing 777F Payload Distribution</span>
            <span className="font-semibold text-[#15803D] tabular-nums">
              {clampedWeight}% Max Aircraft Payload
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/80 border border-sky-300/70 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] transition-all duration-300"
              style={{ width: `${clampedWeight}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-blue-sub p-5 rounded-2xl space-y-4">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-[#0B1B3B]">
          Cubic Volume Fill ({volumeCbm} CBM)
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-400/70 font-semibold text-[#15803D] tabular-nums">
          {clampedVol}% Bay Volume
        </span>
      </div>

      {/* Real Container Truck Side-Elevation UI */}
      <div
        data-testid="container-truck-visualizer"
        className="relative pt-2 pb-1 px-2 rounded-xl bg-gradient-to-b from-[#0E3675]/80 via-[#0A2252]/88 to-[#051029]/95 border border-sky-300/30 shadow-inner"
      >
        <div className="flex items-end gap-1.5 w-full">
          {/* 40ft High-Cube Freight Container Trailer (Left ~76% width) */}
          <div className="flex-1 flex flex-col">
            {/* Corrugated Container Box */}
            <div className="relative h-24 rounded-lg border-2 border-slate-300 bg-slate-100/90 overflow-hidden shadow-xs">
              {/* Subtle vertical steel container ribs */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(15,23,42,0.18) 14px, rgba(15,23,42,0.18) 15px)',
                }}
              />

              {/* Green Cubic Cargo Volume Fill */}
              <div
                data-testid="cubic-volume-green-fill"
                className="absolute inset-y-0 left-0 z-0 transition-all duration-300 bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E]"
                style={{ width: `${clampedVol}%` }}
              >
                {/* Stacked Pallet Grid Overlay inside Green Fill */}
                <div className="h-full w-full grid grid-rows-2 gap-1 p-1.5 opacity-35">
                  <div className="border border-white/60 rounded-xs" />
                  <div className="border border-white/60 rounded-xs" />
                </div>
              </div>

              {/* Container Door Lock Bars (Rear Left Edge) */}
              <div
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-1.5 rounded-xs bg-slate-400/75 z-20"
              />

              {/* Container Spec & Live Volume Overlay Badge */}
              <div className="relative z-20 h-full flex items-center justify-between px-4">
                <div className="px-2.5 py-1 rounded-md bg-white/92 border border-emerald-300/90 shadow-xs text-[11px] font-semibold text-[#14532D] tabular-nums">
                  {volumeCbm} CBM · {clampedVol}% Filled
                </div>
                <div className="hidden sm:block px-2 py-0.5 rounded bg-white/85 border border-slate-200 text-[10px] font-semibold text-slate-700 tabular-nums">
                  {recommendedContainers}x {isColdChain ? '40ft Reefer' : '40ft HC'}
                </div>
              </div>
            </div>

            {/* Steel Chassis Frame Rail & Landing Gear */}
            <div className="h-2.5 mx-1 bg-slate-700 rounded-b-xs flex items-center justify-between px-4">
              <div className="w-6 h-1 bg-amber-400/80 rounded-full" />
              <div className="w-10 h-1 bg-slate-500 rounded-full" />
            </div>

            {/* Dual Tandem Trailer Wheels */}
            <div className="flex items-center justify-between px-3 -mt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-500" />
                </span>
                <span className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-500" />
                </span>
              </div>
              <div className="w-3 h-3 border-l-2 border-b-2 border-slate-500 ml-4 mb-1" />
            </div>
          </div>

          {/* Heavy Tractor Cab (Right ~24% width, facing right) */}
          <div className="w-20 sm:w-24 shrink-0 flex flex-col">
            <svg viewBox="0 0 96 76" className="w-full h-[106px] overflow-visible">
              {/* Fifth-wheel connector */}
              <rect x="-4" y="49" width="12" height="5" rx="1" fill="#334155" />
              {/* Sleeper & Cab Body */}
              <path
                d="M6 12 H48 L66 26 H86 C90 26 92 29 92 33 V54 H6 V12 Z"
                fill="url(#vgf-cab-grad)"
                stroke="#1E3A8A"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="vgf-cab-grad" x1="6" y1="12" x2="92" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1D4ED8" />
                  <stop offset="55%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              {/* Aerodynamic Windshield */}
              <polygon points="48,16 64,27 48,27" fill="#E0F2FE" stroke="#0F2A5F" strokeWidth="1" />
              {/* Side Window */}
              <rect x="26" y="17" width="18" height="10" rx="1.5" fill="#E0F2FE" />
              {/* Headlight & Grille */}
              <rect x="85" y="34" width="6" height="11" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
              <rect x="86" y="47" width="5" height="3.5" rx="1" fill="#FEF08A" />
              {/* Exhaust Stack & Fuel Tank */}
              <rect x="10" y="4" width="3.5" height="10" rx="1" fill="#64748B" />
              <rect x="22" y="47" width="22" height="7" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
              {/* Chassis Base */}
              <rect x="4" y="54" width="88" height="5" rx="1.5" fill="#1E293B" />
              {/* Drive & Steer Wheels */}
              <circle cx="19" cy="63" r="10.5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <circle cx="19" cy="63" r="4.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
              <circle cx="74" cy="63" r="10.5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <circle cx="74" cy="63" r="4.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Road Line */}
        <div className="mt-0.5 h-1 w-full rounded-full bg-gradient-to-r from-sky-300/30 via-sky-200/50 to-sky-300/30" />
      </div>

      {/* Structural Payload Weight Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs text-[#0B1B3B]">
          <span className="font-medium">Structural Payload Weight Distribution</span>
          <span className="font-semibold text-[#15803D] tabular-nums">
            {clampedWeight}% Max Tare Load
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-white/80 border border-sky-300/70 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] transition-all duration-300"
            style={{ width: `${clampedWeight}%` }}
          />
        </div>
      </div>
    </div>
  );
};
