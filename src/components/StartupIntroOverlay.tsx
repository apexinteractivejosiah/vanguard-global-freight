import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane, Ship, Thermometer, Truck } from 'lucide-react';
import { VanguardLogo } from './VanguardLogo';

interface StartupIntroOverlayProps {
  onComplete: () => void;
}

const INTRO_DURATION_MS = 10000;

const SERVICES_SEQUENCE = [
  {
    id: 'ocean',
    title: 'Ocean 40ft High-Cube',
    subtitle: '24,188 TEU Ultra-Large Container Vessels across 148 Customs Ports',
    metric: '22.5 Knots · Deep-Water Sovereign Lanes',
    Icon: Ship,
  },
  {
    id: 'air',
    title: 'Priority Air Charter',
    subtitle: 'Boeing 777F Widebody Freighters with 90-Min Airside Bonded Release',
    metric: 'Mach 0.84 · 48–72 Hr Global Uplift',
    Icon: Plane,
  },
  {
    id: 'cold',
    title: 'Refrigerated Cold-Chain',
    subtitle: 'Cryogenic & Biopharma Vaults with 24/7 Biometric & Thermal Sensors',
    metric: '-25°C to +15°C · ±0.2°C Stability',
    Icon: Thermometer,
  },
  {
    id: 'ground',
    title: 'Cross-Border Ground',
    subtitle: 'Air-Ride Bonded Heavy Convoys Linking Deepwater Quays to Inland Hubs',
    metric: '1,150 km Daily Team Relay · TIR Priority',
    Icon: Truck,
  },
];

export const StartupIntroOverlay: React.FC<StartupIntroOverlayProps> = ({
  onComplete,
}) => {
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  useEffect(() => {
    const start = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const nextElapsed = Math.max(0, Math.min(INTRO_DURATION_MS, now - start));
      setElapsedMs(nextElapsed);
      if (nextElapsed >= INTRO_DURATION_MS) {
        onComplete();
        return;
      }
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [onComplete]);

  const progressPct = Math.max(0, Math.min(100, (elapsedMs / INTRO_DURATION_MS) * 100));
  const activeServiceIdx = Math.max(
    0,
    Math.min(
      SERVICES_SEQUENCE.length - 1,
      Math.floor((elapsedMs / INTRO_DURATION_MS) * SERVICES_SEQUENCE.length)
    )
  );
  const activeService = SERVICES_SEQUENCE[activeServiceIdx] ?? SERVICES_SEQUENCE[0];
  const remainingSec = Math.max(0, Math.ceil((INTRO_DURATION_MS - elapsedMs) / 1000));

  return (
    <div
      data-testid="startup-intro-overlay"
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-[#06122E] via-[#0B2252] to-[#020714] text-white p-6 sm:p-10"
    >
      {/* Subtle Cosmic Sapphire Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="orb-ice absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#38BDF8]/20 blur-[140px]" />
        <div className="orb-cobalt absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[#2563EB]/25 blur-[150px]" />
      </div>

      {/* Top Bar: Telemetry Status + Skip */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between gap-4">
        <div className="text-xs font-semibold tracking-wider text-[#7DD3FC]">
          Vanguard Global Freight · Orbital Supply Chain OS Initialization
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-sky-200/35 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>Enter Global Network ({remainingSec}s)</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#7DD3FC]" />
        </button>
      </div>

      {/* Center Stage: Animated Crest + Brand Wordmark + 4-Service Sequence */}
      <div className="relative z-10 max-w-5xl w-full mx-auto my-auto py-8 flex flex-col items-center text-center space-y-10">
        {/* Animated Orbital Emblem & Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="w-28 h-28 rounded-full border border-dashed border-[#7DD3FC]/55 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.28)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute w-22 h-22 rounded-full border border-[#38BDF8]/65"
            />
            <div className="absolute scale-150">
              <VanguardLogo size="header" variant="glass-dark" showWordmark={false} />
            </div>
          </div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-editorial italic font-semibold text-4xl sm:text-6xl bg-gradient-to-r from-white via-[#E0F2FE] to-[#7DD3FC] bg-clip-text text-transparent tracking-tight"
            >
              Vanguard Global Freight
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xs sm:text-sm text-sky-100/85 max-w-xl mx-auto"
            >
              Synchronizing sovereign ocean lanes, priority Boeing 777F air corridors,
              cryogenic cold-chain telemetry, and bonded intermodal ground relays.
            </motion.p>
          </div>
        </motion.div>

        {/* 4 Core Services Spotlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">
          {SERVICES_SEQUENCE.map((svc, idx) => {
            const Icon = svc.Icon;
            const isActive = idx === activeServiceIdx;
            const isRevealed = idx <= activeServiceIdx;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{
                  opacity: isRevealed ? 1 : 0.65,
                  y: 0,
                  scale: isActive ? 1.03 : 1,
                }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                className={`p-5 rounded-2xl border transition-all ${
                  isActive
                    ? 'glass-blue-window ring-2 ring-[#38BDF8] shadow-[0_14px_36px_rgba(56,189,248,0.35)]'
                    : 'glass-blue-sub'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0EA5E9] to-[#1D4ED8] text-white shadow-md'
                        : 'bg-sky-200/70 text-[#0369A1]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#0369A1] tabular-nums">
                    0{idx + 1} / 04
                  </span>
                </div>
                <div className="text-base font-semibold text-[#0B1B3B]">{svc.title}</div>
                <p className="text-xs text-[#1E3A5F] mt-1.5 leading-relaxed">
                  {svc.subtitle}
                </p>
                <div className="mt-3 pt-2.5 border-t border-sky-300/60 text-[11px] font-semibold text-[#0369A1]">
                  {svc.metric}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom 10-Second Progress Track */}
      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs text-sky-100/80 tabular-nums">
          <span>
            Active Service Spotlight:{' '}
            <strong className="text-white">
              {activeService.title}
            </strong>
          </span>
          <span>{Math.round(progressPct)}% Complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/12 overflow-hidden border border-sky-300/25">
          <div
            className="h-full bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#22C55E] transition-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
