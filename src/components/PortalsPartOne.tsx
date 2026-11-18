import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Anchor,
  ArrowRight,
  Box,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Compass,
  Copy,
  FileCheck2,
  Globe,
  Languages,
  Layers,
  Lock,
  MapPin,
  Moon,
  Navigation,
  PackageCheck,
  Plane,
  Radio,
  Search,
  ShieldCheck,
  Ship,
  Sliders,
  Sun,
  Thermometer,
  Truck,
  Wind,
} from 'lucide-react';
import {
  CHECKPOINT_ORDER,
  CheckpointName,
  GLOBAL_PORTS,
  PortalId,
  ShipmentRecord,
  TransportMode,
  VERIFIED_FLEET_ASSETS,
  calculateFreightQuote,
  normalizeWaybillId,
  validateClientBookingFields,
} from '../utils/freightEngine';
import {
  LangCode,
  SUPPORTED_LANGUAGES,
  WebsiteTheme,
  getTranslations,
} from '../utils/i18n';
import { OrbitalGlobeCanvas } from './OrbitalGlobeCanvas';
import { CountryFlag } from './CountryFlag';
import { ContainerTruckVisualizer } from './ContainerTruckVisualizer';

const GLASS_CARD = 'glass-blue-window rounded-3xl';
const SUB_GLASS = 'glass-blue-sub rounded-2xl';
const GLASS_INPUT = 'glass-blue-input rounded-xl';

// ============================================================================
// PORTAL 1: GLOBAL NETWORK (HOME) — 5 FULL VERTICAL SECTIONS
// ============================================================================
interface HomePortalProps {
  theme: WebsiteTheme;
  lang: LangCode;
  onChangeTheme: (theme: WebsiteTheme) => void;
  onChangeLang: (lang: LangCode) => void;
  onNavigatePortal: (portal: PortalId) => void;
  onQuickTrackWaybill: (waybillId: string) => boolean;
  onBookTransportMode: (mode: TransportMode) => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  theme,
  lang,
  onChangeTheme,
  onChangeLang,
  onNavigatePortal,
  onQuickTrackWaybill,
  onBookTransportMode,
}) => {
  const [heroWaybillInput, setHeroWaybillInput] = useState<string>('');
  const [heroLookupError, setHeroLookupError] = useState<string>('');
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<
    | 'Asia-Pacific'
    | 'Europe'
    | 'North America'
    | 'Middle East'
    | 'Latin America & Africa'
  >('Asia-Pacific');

  const t = getTranslations(lang);

  // 3-scene crossfading showcase using exact Container Vessel, Port Gantry, and Air Freight images
  const heroShowcaseScenes = VERIFIED_FLEET_ASSETS.slice(0, 3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveShowcaseIdx((prev) => (prev + 1) % heroShowcaseScenes.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [heroShowcaseScenes.length]);

  const handleHeroTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeWaybillId(heroWaybillInput);
    if (!normalized) {
      setHeroLookupError('Please enter your private Waybill ID to open telemetry.');
      return;
    }
    const ok = onQuickTrackWaybill(normalized);
    if (!ok) {
      setHeroLookupError(
        'No active Waybill matches that reference ID. Verify your private dispatch code.'
      );
      return;
    }
    setHeroLookupError('');
  };

  const regionPorts = GLOBAL_PORTS.filter((p) => p.region === selectedRegion);

  return (
    <div className="space-y-16 pb-20">
      {/* SECTION 1A: Full-Image Page 1 Hero */}
      <section className="relative rounded-3xl overflow-hidden min-h-[600px] lg:min-h-[calc(100vh-8.5rem)] flex flex-col justify-between shadow-[0_24px_60px_rgba(11,27,59,0.16)] border border-sky-200/80 bg-[#050C1B]">
        {/* Full-Bleed Crossfading Fleet Showcase Background */}
        <div className="absolute inset-0">
          {heroShowcaseScenes.map((scene, idx) => {
            const isActive = idx === activeShowcaseIdx;
            return (
              <div
                key={scene.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={scene.imageUrl}
                  alt={scene.label}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${
                    isActive ? 'animate-ken-burns' : ''
                  }`}
                />
              </div>
            );
          })}
          {/* Crisp maritime scrim so headline, lookup form, and scene bar remain legible */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050C1B]/90 via-[#071836]/62 to-[#050C1B]/25" />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050C1B]/85 via-transparent to-[#050C1B]/25" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-30 p-7 sm:p-10 lg:p-14 flex flex-col justify-between flex-1 gap-8">
          {/* Top Hero Preferences Row: Light/Dark Theme Slider + Language Picker */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold tracking-wider text-[#7DD3FC]"
            >
              {t.heroEyebrow}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass-blue-window rounded-2xl px-4 py-2.5 flex flex-wrap items-center gap-4"
            >
              {/* Tactile Light / Dark Website Theme Slider */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onChangeTheme('light')}
                  className={`flex items-center gap-1 text-xs font-semibold cursor-pointer transition-colors ${
                    theme === 'light' ? 'text-[#B45309]' : 'text-[#1E3A5F] hover:text-[#0B1B3B]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{t.themeLight}</span>
                </button>
                <input
                  id="home-theme-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={1}
                  aria-label={`${t.themeLabel}: ${theme === 'dark' ? t.themeDark : t.themeLight}`}
                  value={theme === 'dark' ? 1 : 0}
                  onChange={(e) =>
                    onChangeTheme(Number(e.target.value) === 1 ? 'dark' : 'light')
                  }
                  className="w-12 h-2 accent-[#0284C7] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => onChangeTheme('dark')}
                  className={`flex items-center gap-1 text-xs font-semibold cursor-pointer transition-colors ${
                    theme === 'dark' ? 'text-[#1D4ED8]' : 'text-[#1E3A5F] hover:text-[#0B1B3B]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{t.themeDark}</span>
                </button>
              </div>

              <span className="h-4 w-px bg-sky-400/50 hidden sm:inline-block" />

              {/* Multi-Language Selector */}
              <div className="flex items-center gap-2">
                <Languages className="w-3.5 h-3.5 text-[#0369A1]" />
                <select
                  id="home-language-select"
                  aria-label={t.languageLabel}
                  value={lang}
                  onChange={(e) => onChangeLang(e.target.value as LangCode)}
                  className={`${GLASS_INPUT} px-2.5 py-1 text-xs font-semibold cursor-pointer`}
                >
                  {SUPPORTED_LANGUAGES.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>

          <div className="max-w-2xl space-y-6">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-editorial italic font-semibold text-4xl sm:text-6xl lg:text-[68px] text-white leading-[1.04] tracking-tight drop-shadow-sm"
                style={{ textWrap: 'balance' }}
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-xl"
              >
                {t.heroSubtitle}
              </motion.p>
            </div>

            {/* Frosted Baby-Light-Blue Gradient Glass Waybill Lookup Box */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleHeroTrackSubmit}
              className="glass-blue-window rounded-2xl p-4 sm:p-5 space-y-3"
            >
              <label
                htmlFor="hero-waybill-input"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1B3B]"
              >
                <Lock className="w-3.5 h-3.5 text-[#0369A1]" />
                <span>{t.heroLookupLabel}</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#0369A1] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="hero-waybill-input"
                    type="text"
                    value={heroWaybillInput}
                    onChange={(e) => {
                      setHeroWaybillInput(e.target.value);
                      if (heroLookupError) setHeroLookupError('');
                    }}
                    placeholder={t.heroLookupPlaceholder}
                    className={`${GLASS_INPUT} w-full pl-10 pr-4 py-3 text-sm`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_6px_22px_rgba(2,132,199,0.3)] font-semibold text-sm flex items-center justify-center gap-2 transition-shadow cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.heroLookupButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {heroLookupError && (
                <div className="text-xs font-semibold text-[#DC2626]">{heroLookupError}</div>
              )}
            </motion.form>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigatePortal('estimator')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#1D4ED8] to-[#0B1B3B] hover:from-[#38BDF8] hover:to-[#1E3A8A] border border-sky-200/45 text-xs font-semibold text-white shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.heroConfigureBtn}
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('client')}
                className="px-5 py-2.5 rounded-xl backdrop-blur-xl bg-white/15 hover:bg-white/25 border border-sky-200/40 text-xs font-semibold text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.heroClientBtn}
              </button>
            </div>
          </div>

          {/* Bottom Full-Width Active Scene Bar & Switcher Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pt-4 border-t border-white/20">
            <div className="space-y-1 max-w-xl">
              <div className="text-xs font-semibold text-[#7DD3FC]">
                {heroShowcaseScenes[activeShowcaseIdx].mode} ·{' '}
                {heroShowcaseScenes[activeShowcaseIdx].capacitySpec}
              </div>
              <div className="text-lg sm:text-xl font-semibold text-white">
                {heroShowcaseScenes[activeShowcaseIdx].label}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-1">
                {heroShowcaseScenes[activeShowcaseIdx].corridorSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 lg:w-[540px] shrink-0">
              {heroShowcaseScenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveShowcaseIdx(idx)}
                  className={`p-3 rounded-xl text-left transition-shadow cursor-pointer border ${
                    idx === activeShowcaseIdx
                      ? 'bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white border-sky-200/80 shadow-lg'
                      : 'glass-blue-sub text-[#0B1B3B] hover:border-sky-400/80'
                  }`}
                >
                  <div className="text-xs font-semibold truncate">{scene.label}</div>
                  <div
                    className={`text-[11px] font-medium truncate mt-0.5 ${
                      idx === activeShowcaseIdx ? 'text-[#E0F2FE]' : 'text-[#0369A1]'
                    }`}
                  >
                    {scene.transitSpeed}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1B: Live Global Corridor Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            metric: t.kpi1Title,
            sub: 'Sovereign ultra-large container & reefer hulls operating across 6 oceans',
            detail: 'AIS & Inmarsat L-Band linked',
          },
          {
            metric: t.kpi2Title,
            sub: 'Predictive weather-routed maritime & priority widebody air charters',
            detail: 'Berth window guarantee',
          },
          {
            metric: t.kpi3Title,
            sub: 'Direct EDI pre-clearance with automated gantry discharge terminals',
            detail: 'Zero demurrage priority lanes',
          },
          {
            metric: t.kpi4Title,
            sub: 'Continuous internal container thermal, humidity, and biometric seal logs',
            detail: 'Sub-minute orbital refresh',
          },
        ].map((item, idx) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`${GLASS_CARD} p-6 flex flex-col justify-between`}
          >
            <div>
              <div className="font-editorial italic font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent tabular-nums">
                {item.metric}
              </div>
              <p className="text-sm text-[#1E3A5F] mt-2 leading-relaxed">{item.sub}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-sky-300/60 text-xs font-semibold text-[#0369A1]">
              {item.detail}
            </div>
          </motion.div>
        ))}
      </section>

      {/* SECTION 1C: Fleet & Infrastructure Bento Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div
              className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-[#7DD3FC]' : 'text-[#1D4ED8]'
              }`}
            >
              {t.sectionFleetEyebrow}
            </div>
            <h2
              className={`font-editorial italic font-semibold text-3xl sm:text-4xl mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-[#0B1B3B]'
              }`}
            >
              {t.sectionFleetTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigatePortal('estimator')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] border border-sky-300/60 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(2,132,199,0.25)] transition-shadow cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            {t.compareTariffsBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {VERIFIED_FLEET_ASSETS.map((asset, idx) => {
            const spanClass =
              idx === 0 || idx === 1
                ? 'lg:col-span-6'
                : idx === 2
                ? 'lg:col-span-4'
                : idx === 3
                ? 'lg:col-span-4'
                : 'lg:col-span-4';

            return (
              <motion.article
                key={asset.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`${GLASS_CARD} ${spanClass} overflow-hidden flex flex-col justify-between group`}
              >
                <div>
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#06122B]">
                    <img
                      src={asset.imageUrl}
                      alt={asset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06122B] via-[#06122B]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-sky-100">
                      <span>{asset.mode}</span>
                      <span className="tabular-nums text-[#7DD3FC]">
                        {asset.utilizationPct}% Corridor Allocation
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-semibold text-[#0B1B3B] leading-snug">
                      {asset.label}
                    </h3>
                    <p className="text-sm text-[#1E3A5F] leading-relaxed">
                      {asset.corridorSummary}
                    </p>
                    <div className="pt-2 space-y-1.5 text-xs text-[#1E3A5F] border-t border-sky-300/55">
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155]">Payload Capacity:</span>
                        <span className="font-semibold text-[#0B1B3B] tabular-nums">
                          {asset.capacitySpec}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155]">Transit Speed:</span>
                        <span className="font-semibold text-[#0369A1] tabular-nums">
                          {asset.transitSpeed}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onBookTransportMode(asset.mode)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] border border-sky-300/60 text-xs font-semibold text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {t.bookModePrefix} {asset.mode}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* SECTION 1D: How 24/7 Telemetry Works (4-Step Visual Pipeline) */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-8`}>
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-[#0369A1]">
            {t.sectionTelemetryEyebrow}
          </div>
          <h2 className="font-editorial italic font-semibold text-3xl sm:text-4xl text-[#0B1B3B] mt-1">
            {t.sectionTelemetryTitle}
          </h2>
          <p className="text-sm text-[#1E3A5F] mt-2">
            Every Waybill issued on Vanguard Global Freight links physical container
            sensors directly to port authority EDI gateways and orbital tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1. Container Sealed & Scanned',
              title: 'Biometric & Thermal Lock',
              desc: 'Smart 40ft High-Cube or Envirotainer units are sealed at origin with continuous internal shock, GPS, and temperature transponders.',
              metric: 'ISO-17712 High-Security e-Seal',
            },
            {
              step: '2. Customs Pre-Cleared',
              title: 'Automated Port EDI Filing',
              desc: 'Commercial invoices, HS tariff codes, and bills of lading are verified with destination customs 72 hours before vessel arrival.',
              metric: 'Avg. 2.4 Hr Quay Release',
            },
            {
              step: '3. Satellite Ocean/Air Routing',
              title: 'Live 3D Orbital Telemetry',
              desc: 'Captains and air loadmasters transmit real-time position, sea state, and cold-chain logs directly to your 3D Globe view.',
              metric: 'Inmarsat & AeroSAT Dual-Link',
            },
            {
              step: '4. Final Mile Handover',
              title: 'Bonded Drayage Delivery',
              desc: 'Upon gantry discharge or tarmac touchdown, air-ride ground convoys complete customs-bonded delivery to your receiving dock.',
              metric: 'Digital Proof of Delivery',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className={`${SUB_GLASS} p-6 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#0369A1]">{item.step}</div>
                <h3 className="text-base font-semibold text-[#0B1B3B]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#1E3A5F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-sky-300/60 text-xs text-[#0369A1] font-semibold">
                {item.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 1E: Global Trade Partners, Regional Hub Selector & Instant CTA */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-8`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              {t.sectionPortsEyebrow}
            </div>
            <h2 className="font-editorial italic font-semibold text-3xl sm:text-4xl text-[#0B1B3B] mt-1">
              {t.sectionPortsTitle}
            </h2>
          </div>

          {/* Regional Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                'Asia-Pacific',
                'Europe',
                'North America',
                'Middle East',
                'Latin America & Africa',
              ] as const
            ).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-shadow cursor-pointer whitespace-nowrap border ${
                  selectedRegion === region
                    ? 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white border-sky-300/60 shadow-sm'
                    : 'bg-white/75 text-[#0B1B3B] hover:bg-white border-sky-300/75'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regionPorts.map((port) => (
            <div
              key={port.code}
              className={`${SUB_GLASS} p-5 space-y-3`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CountryFlag
                    countryCode={port.countryCode}
                    countryName={port.country}
                    size="sm"
                  />
                  <span className="text-sm font-semibold text-[#0B1B3B] truncate">
                    {port.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#0369A1] tabular-nums shrink-0">
                  {port.code}
                </span>
              </div>
              <div className="text-xs text-[#1E3A5F]">
                {port.country} · {port.portArea}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-sky-300/55 text-xs">
                <div>
                  <div className="text-[#334155]">Deep Berths</div>
                  <div className="text-[#0B1B3B] font-semibold tabular-nums mt-0.5">
                    {port.berths}
                  </div>
                </div>
                <div>
                  <div className="text-[#334155]">EDI Clearance</div>
                  <div className="text-[#0369A1] font-semibold tabular-nums mt-0.5">
                    {port.customsClearanceHours} hrs
                  </div>
                </div>
                <div>
                  <div className="text-[#334155]">Max Draft</div>
                  <div className="text-[#0B1B3B] font-semibold tabular-nums mt-0.5">
                    {port.avgDraftMeters}m
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instant Conversion Strip */}
        <div className="pt-6 border-t border-sky-300/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-[#0B1B3B]">{t.readyCtaTitle}</div>
            <div className="text-xs text-[#1E3A5F] mt-0.5">{t.readyCtaDesc}</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigatePortal('estimator')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_6px_20px_rgba(2,132,199,0.28)] font-semibold text-xs transition-shadow cursor-pointer whitespace-nowrap"
            >
              {t.launchEstimatorBtn}
            </button>
            <button
              type="button"
              onClick={() => onNavigatePortal('client')}
              className="px-5 py-2.5 rounded-xl bg-white/75 hover:bg-white border border-sky-300/80 text-[#0B1B3B] font-semibold text-xs shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.enterClientBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// PORTAL 2: FREIGHT ESTIMATOR & WAYBILL GENERATOR — 4 VERTICAL SECTIONS
// ============================================================================
interface EstimatorPortalProps {
  initialMode: TransportMode;
  shipments: ShipmentRecord[];
  onCreateBooking: (newShipment: ShipmentRecord) => void;
  onTrackWaybillOnGlobe: (waybillId: string) => void;
}

export const EstimatorPortal: React.FC<EstimatorPortalProps> = ({
  initialMode,
  shipments,
  onCreateBooking,
  onTrackWaybillOnGlobe,
}) => {
  const [mode, setMode] = useState<TransportMode>(initialMode);
  const [originPortCode, setOriginPortCode] = useState<string>('SGSIN');
  const [destinationPortCode, setDestinationPortCode] = useState<string>('NLRTM');
  const [weightKg, setWeightKg] = useState<number>(18500);
  const [volumeCbm, setVolumeCbm] = useState<number>(52);
  const [clientName, setClientName] = useState<string>('Aethelgard Semiconductor AG');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [bookingError, setBookingError] = useState<string>('');
  const [commodity, setCommodity] = useState<string>(
    'Cleanroom Wafer Stepper Modules & Precision Vacuum Pumps'
  );
  const [targetTempC, setTargetTempC] = useState<string>('+18.0°C');
  const [createdWaybill, setCreatedWaybill] = useState<ShipmentRecord | null>(null);
  const [copiedWaybill, setCopiedWaybill] = useState<boolean>(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const quote = calculateFreightQuote({
    mode,
    originPortCode,
    destinationPortCode,
    weightKg,
    volumeCbm,
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErr = validateClientBookingFields({
      contactPerson,
      contactNumber,
      companyEmail,
      companyEntity: clientName,
      commodity,
    });
    if (validationErr) {
      setBookingError(validationErr);
      return;
    }
    setBookingError('');

    const randomSuffix = Math.floor(9100 + (shipments.length * 137) % 850);
    const waybillId = `VGF-${randomSuffix}`;
    const originPort =
      GLOBAL_PORTS.find((p) => p.code === originPortCode) || GLOBAL_PORTS[0];

    const vesselName =
      mode === 'Priority Air Charter'
        ? 'VGF-AIR-777F Callsign Sovereign-8'
        : mode === 'Refrigerated Cold-Chain'
        ? 'M/V Vanguard Cryo-Star II'
        : mode === 'Cross-Border Ground'
        ? 'VGF Heavy Intermodal Relay-42'
        : 'M/V Vanguard Sovereign XII';

    const newRecord: ShipmentRecord = {
      waybillId,
      clientName: clientName.trim(),
      contactPerson: contactPerson.trim(),
      contactNumber: contactNumber.trim(),
      companyEmail: companyEmail.trim(),
      clientAccountCode: 'ENT-9042',
      commodity: commodity.trim(),
      mode,
      originPortCode,
      destinationPortCode,
      currentCheckpoint: 'Origin Warehouse',
      progressPct: 8,
      currentLat: originPort.lat,
      currentLng: originPort.lng,
      vesselOrFlightName: vesselName,
      assignedStaffId: 'STF-101',
      assignedStaffName:
        mode === 'Priority Air Charter'
          ? 'Loadmaster Elena Rostova'
          : 'Capt. Henrik Lindqvist',
      weightKg,
      volumeCbm,
      containersCount: quote.recommendedContainers,
      temperatureC:
        mode === 'Refrigerated Cold-Chain' ? '-18.5°C' : targetTempC || '+18.0°C',
      securitySeal: `VGF-SEAL-${randomSuffix}X`,
      seaState:
        mode === 'Priority Air Charter'
          ? 'FL350 Clear Corridor'
          : 'Beaufort 2 — Calm Harbour Staging',
      windSpeedKnots: 11,
      customsStatus: 'Pre-Cleared',
      etaDate: `2026-11-${Math.min(30, 17 + quote.estimatedTransitDays)} 14:00 UTC`,
      quotedTotalUsd: quote.totalQuoteUsd,
      invoiceNumber: `INV-2026-${randomSuffix}`,
      billOfLadingNumber: `BOL-VGF-${randomSuffix}`,
      fieldLogs: [
        {
          id: `LOG-${randomSuffix}-1`,
          timestamp: '2026-11-17 07:15 UTC',
          author: 'Vanguard Automated Booking Desk',
          role: 'Master Dispatch ERP',
          checkpoint: 'Origin Warehouse',
          temperatureC:
            mode === 'Refrigerated Cold-Chain' ? '-18.5°C' : targetTempC,
          sealNumber: `VGF-SEAL-${randomSuffix}X`,
          note: `Waybill ${waybillId} booked for ${mode} (${originPortCode} to ${destinationPortCode}) by ${contactPerson.trim()} (${companyEmail.trim()}, ${contactNumber.trim()}). Synced to Client Portal, Crew Terminal, and 24/7 Master ERP.`,
        },
      ],
    };

    onCreateBooking(newRecord);
    setCreatedWaybill(newRecord);
    setCopiedWaybill(false);
  };

  const handleCopyWaybill = () => {
    if (!createdWaybill) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(createdWaybill.waybillId).catch(() => {});
    }
    setCopiedWaybill(true);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* SECTION 2A: Estimator Header & Transport Mode Selector */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-6`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Portal 02 · Container & Air Freight Configurator
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent mt-1">
              Instant Intermodal Tariff & Waybill Generator
            </h1>
            <p className="text-sm text-[#1E3A5F] mt-2 max-w-2xl">
              Configure your transport mode, port pair, payload weight, and cubic volume.
              Submitting immediately issues a live Waybill synced to all operational portals.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#334155]">Calculated Corridor Distance</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#0369A1] tabular-nums">
              {quote.routeDistanceKm.toLocaleString()} km
            </div>
          </div>
        </div>

        {/* 4 Transport Mode Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {(
            [
              {
                m: 'Ocean 40ft High-Cube' as TransportMode,
                sub: '67.7 CBM · Max 26,500 kg per Box',
                tag: 'Deep-Water Vessel',
              },
              {
                m: 'Priority Air Charter' as TransportMode,
                sub: 'Boeing 777F Main-Deck Express',
                tag: '48-72 Hr Global',
              },
              {
                m: 'Refrigerated Cold-Chain' as TransportMode,
                sub: '-25°C to +15°C Active Thermal Vault',
                tag: 'Biopharma & Cryo',
              },
              {
                m: 'Cross-Border Ground' as TransportMode,
                sub: 'Air-Ride Heavy Bonded Convoy',
                tag: 'Door-to-Port Relay',
              },
            ] as const
          ).map((item) => {
            const active = mode === item.m;
            return (
              <button
                key={item.m}
                type="button"
                onClick={() => setMode(item.m)}
                className={`p-5 rounded-2xl text-left transition-shadow cursor-pointer border ${
                  active
                    ? 'bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] border-sky-300/70 text-white shadow-[0_8px_24px_rgba(2,132,199,0.28)]'
                    : 'glass-blue-sub text-[#0B1B3B] hover:border-sky-400/80'
                }`}
              >
                <div className={`text-xs font-semibold ${active ? 'text-[#E0F2FE]' : 'text-[#0369A1]'}`}>
                  {item.tag}
                </div>
                <div className={`text-base font-semibold mt-1 ${active ? 'text-white' : 'text-[#0B1B3B]'}`}>
                  {item.m}
                </div>
                <div className={`text-xs mt-1 ${active ? 'text-sky-100' : 'text-[#1E3A5F]'}`}>
                  {item.sub}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2B: Configurator Form + Visual Container Packing & Quote Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleBookingSubmit}
          noValidate
          className={`${GLASS_CARD} lg:col-span-7 p-8 space-y-6`}
        >
          <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
            1. Route & Cargo Payload Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(() => {
              const selectedOrigin =
                GLOBAL_PORTS.find((p) => p.code === originPortCode) ||
                GLOBAL_PORTS[0];
              const selectedDest =
                GLOBAL_PORTS.find((p) => p.code === destinationPortCode) ||
                GLOBAL_PORTS[2];
              const portRegions = [
                'Asia-Pacific',
                'Europe',
                'North America',
                'Middle East',
                'Latin America & Africa',
              ] as const;

              return (
                <>
                  <div>
                    <label
                      htmlFor="origin-port-select"
                      className="flex items-center justify-between text-xs font-semibold text-[#0B1B3B] mb-2"
                    >
                      <span>Origin Port Hub</span>
                      <span className="text-[11px] font-semibold text-[#0369A1]">
                        {selectedOrigin.region}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        <CountryFlag
                          countryCode={selectedOrigin.countryCode}
                          countryName={selectedOrigin.country}
                          size="sm"
                        />
                      </span>
                      <select
                        id="origin-port-select"
                        value={originPortCode}
                        onChange={(e) => setOriginPortCode(e.target.value)}
                        className={`${GLASS_INPUT} w-full pl-11 pr-4 py-3 text-sm`}
                      >
                        {portRegions.map((reg) => (
                          <optgroup key={reg} label={`— ${reg} Port Area —`}>
                            {GLOBAL_PORTS.filter((p) => p.region === reg).map(
                              (port) => (
                                <option key={port.code} value={port.code}>
                                  {port.code} — {port.name} ({port.country})
                                </option>
                              )
                            )}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-sky-300/70 text-[11px] text-[#1E3A5F]">
                      <CountryFlag
                        countryCode={selectedOrigin.countryCode}
                        countryName={selectedOrigin.country}
                        size="sm"
                      />
                      <span className="font-semibold text-[#0B1B3B]">
                        {selectedOrigin.country}
                      </span>
                      <span>·</span>
                      <span className="truncate">{selectedOrigin.portArea}</span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="dest-port-select"
                      className="flex items-center justify-between text-xs font-semibold text-[#0B1B3B] mb-2"
                    >
                      <span>Destination Port Hub</span>
                      <span className="text-[11px] font-semibold text-[#0369A1]">
                        {selectedDest.region}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        <CountryFlag
                          countryCode={selectedDest.countryCode}
                          countryName={selectedDest.country}
                          size="sm"
                        />
                      </span>
                      <select
                        id="dest-port-select"
                        value={destinationPortCode}
                        onChange={(e) => setDestinationPortCode(e.target.value)}
                        className={`${GLASS_INPUT} w-full pl-11 pr-4 py-3 text-sm`}
                      >
                        {portRegions.map((reg) => (
                          <optgroup key={reg} label={`— ${reg} Port Area —`}>
                            {GLOBAL_PORTS.filter((p) => p.region === reg).map(
                              (port) => (
                                <option key={port.code} value={port.code}>
                                  {port.code} — {port.name} ({port.country})
                                </option>
                              )
                            )}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-sky-300/70 text-[11px] text-[#1E3A5F]">
                      <CountryFlag
                        countryCode={selectedDest.countryCode}
                        countryName={selectedDest.country}
                        size="sm"
                      />
                      <span className="font-semibold text-[#0B1B3B]">
                        {selectedDest.country}
                      </span>
                      <span>·</span>
                      <span className="truncate">{selectedDest.portArea}</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Cargo Weight Slider (100 kg to 50,000 kg) */}
          <div className={`${SUB_GLASS} p-5 space-y-3`}>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cargo-weight-slider"
                className="text-xs font-semibold text-[#0B1B3B]"
              >
                Gross Cargo Payload Weight (100 kg – 50,000 kg)
              </label>
              <span className="text-base font-semibold text-[#0369A1] tabular-nums">
                {weightKg.toLocaleString()} kg
              </span>
            </div>
            <input
              id="cargo-weight-slider"
              type="range"
              min={100}
              max={50000}
              step={100}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#334155] tabular-nums">
              <span>100 kg Min</span>
              <span>25,000 kg Standard TEU</span>
              <span>50,000 kg Heavy Charter</span>
            </div>
          </div>

          {/* Cargo Volume Slider */}
          <div className={`${SUB_GLASS} p-5 space-y-3`}>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cargo-volume-slider"
                className="text-xs font-semibold text-[#0B1B3B]"
              >
                Cubic Cargo Volume (2 CBM – 260 CBM)
              </label>
              <span className="text-base font-semibold text-[#0369A1] tabular-nums">
                {volumeCbm} CBM (m³)
              </span>
            </div>
            <input
              id="cargo-volume-slider"
              type="range"
              min={2}
              max={260}
              step={2}
              value={volumeCbm}
              onChange={(e) => setVolumeCbm(Number(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#334155] tabular-nums">
              <span>2 CBM LCL Pallet</span>
              <span>67.7 CBM (1x 40ft High-Cube)</span>
              <span>260 CBM Multi-Box</span>
            </div>
          </div>

          {/* Client Contact Details (Required) */}
          <div className={`${SUB_GLASS} p-5 space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                Authorized Client Contact Information
              </span>
              <span className="text-[11px] font-medium text-[#1E3A5F]">
                Required for Waybill Dispatch
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="client-contact-name-input"
                  className="block text-xs font-semibold text-[#0B1B3B] mb-2"
                >
                  Client Full Name *
                </label>
                <input
                  id="client-contact-name-input"
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => {
                    setContactPerson(e.target.value);
                    if (bookingError) setBookingError('');
                  }}
                  placeholder="Enter full name..."
                  className={`${GLASS_INPUT} w-full px-3.5 py-2.5 text-sm`}
                />
              </div>
              <div>
                <label
                  htmlFor="client-contact-number-input"
                  className="block text-xs font-semibold text-[#0B1B3B] mb-2"
                >
                  Contact Number *
                </label>
                <input
                  id="client-contact-number-input"
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                    if (bookingError) setBookingError('');
                  }}
                  placeholder="+1 (555) 234-8910"
                  className={`${GLASS_INPUT} w-full px-3.5 py-2.5 text-sm`}
                />
              </div>
              <div>
                <label
                  htmlFor="client-company-email-input"
                  className="block text-xs font-semibold text-[#0B1B3B] mb-2"
                >
                  Company Email *
                </label>
                <input
                  id="client-company-email-input"
                  type="email"
                  required
                  value={companyEmail}
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                    if (bookingError) setBookingError('');
                  }}
                  placeholder="dispatch@company.com"
                  className={`${GLASS_INPUT} w-full px-3.5 py-2.5 text-sm`}
                />
              </div>
            </div>
          </div>

          {/* Shipper Entity & Thermal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="shipper-company-input"
                className="block text-xs font-semibold text-[#0B1B3B] mb-2"
              >
                Commercial Shipper / Consignee Entity
              </label>
              <input
                id="shipper-company-input"
                type="text"
                required
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (bookingError) setBookingError('');
                }}
                className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
              />
            </div>
            <div>
              <label
                htmlFor="thermal-setpoint-input"
                className="block text-xs font-semibold text-[#0B1B3B] mb-2"
              >
                Thermal Telemetry Setpoint
              </label>
              <input
                id="thermal-setpoint-input"
                type="text"
                value={targetTempC}
                onChange={(e) => setTargetTempC(e.target.value)}
                className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="commodity-description-input"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Commodity Description & HS Tariff Classification
            </label>
            <input
              id="commodity-description-input"
              type="text"
              required
              value={commodity}
              onChange={(e) => {
                setCommodity(e.target.value);
                if (bookingError) setBookingError('');
              }}
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            />
          </div>

          {bookingError && (
            <div
              role="alert"
              className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold"
            >
              {bookingError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_8px_24px_rgba(2,132,199,0.28)] font-semibold text-sm flex items-center justify-center gap-2 transition-shadow cursor-pointer"
          >
            <span>Issue Official Waybill & Sync to 24/7 Dispatch ERP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Live Visual Container Packing Diagram + Itemized Quote */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`${GLASS_CARD} p-8 space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B]">
                {mode === 'Priority Air Charter'
                  ? '2. Live Air Cargo ULD Diagram'
                  : '2. Live Container Packing Diagram'}
              </h2>
              <span className="text-xs font-semibold text-[#0369A1] tabular-nums">
                {quote.recommendedContainers}x Unit(s) Allocated
              </span>
            </div>

            {/* Real Container Truck Side-Elevation UI with Green Cubic Volume Fill */}
            <ContainerTruckVisualizer
              volumeCbm={volumeCbm}
              volumeUtilizationPct={quote.volumeUtilizationPct}
              weightUtilizationPct={quote.weightUtilizationPct}
              recommendedContainers={quote.recommendedContainers}
              mode={mode}
            />

            {/* Itemized Customs & Insurance Quote */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-[#0B1B3B]">
                Itemized Intermodal Tariff & Customs Breakdown
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-[#1E3A5F]">
                  <span>Base Linehaul ({mode})</span>
                  <span className="text-[#0B1B3B] font-semibold tabular-nums">
                    ${quote.baseFreightUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#1E3A5F]">
                  <span>Low-Sulfur Bunker & Security Adjustment</span>
                  <span className="text-[#0B1B3B] font-semibold tabular-nums">
                    ${quote.fuelBunkerSurchargeUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#1E3A5F]">
                  <span>Automated EDI Customs Brokerage ({destinationPortCode})</span>
                  <span className="text-[#0B1B3B] font-semibold tabular-nums">
                    ${quote.customsBrokerageUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#1E3A5F]">
                  <span>Lloyd’s Maritime All-Risk Cargo Insurance</span>
                  <span className="text-[#0B1B3B] font-semibold tabular-nums">
                    ${quote.allRiskInsuranceUsd.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-sky-300/60 flex items-end justify-between">
                <div>
                  <div className="text-xs text-[#334155]">
                    Guaranteed Door-to-Port All-In Tariff
                  </div>
                  <div className="text-xs font-semibold text-[#0369A1] mt-0.5 tabular-nums">
                    Estimated Transit: {quote.estimatedTransitDays} Calendar Days
                  </div>
                </div>
                <div className="font-editorial italic font-semibold text-4xl text-[#0B1B3B] tabular-nums">
                  ${quote.totalQuoteUsd.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2C: Generated Waybill Confirmation Banner (Appears on Submit or shows Sample Ready State) */}
      <section className={`${GLASS_CARD} p-8`}>
        {createdWaybill ? (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#0369A1]">
                Live Waybill Issued & Synced Across All Portals
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="font-editorial italic font-semibold text-3xl sm:text-4xl text-[#0B1B3B] tabular-nums">
                  Waybill Reference: {createdWaybill.waybillId}
                </h3>
                <button
                  type="button"
                  onClick={handleCopyWaybill}
                  className="px-3.5 py-1.5 rounded-xl bg-white/75 hover:bg-white border border-sky-300/75 text-xs font-semibold text-[#0B1B3B] flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5 text-[#0369A1]" />
                  <span>{copiedWaybill ? 'Copied Waybill ID' : 'Copy Waybill ID'}</span>
                </button>
              </div>
              <p className="text-sm text-[#1E3A5F]">
                {createdWaybill.clientName}
                {createdWaybill.contactPerson
                  ? ` · Contact: ${createdWaybill.contactPerson} (${createdWaybill.contactNumber} · ${createdWaybill.companyEmail})`
                  : ''}{' '}
                · {createdWaybill.originPortCode} →{' '}
                {createdWaybill.destinationPortCode} · {createdWaybill.mode} ·{' '}
                {createdWaybill.weightKg.toLocaleString()} kg · Invoice{' '}
                {createdWaybill.invoiceNumber}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onTrackWaybillOnGlobe(createdWaybill.waybillId)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_6px_20px_rgba(2,132,199,0.28)] font-semibold text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Track {createdWaybill.waybillId} on 3D Globe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-[#0B1B3B]">
                Instant Multi-Portal Synchronization Ready
              </h3>
              <p className="text-xs text-[#1E3A5F] mt-0.5">
                Click “Issue Official Waybill” above to generate a live Waybill Reference
                ID and track it on the 3D Orbital Globe.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#0369A1] tabular-nums">
              {shipments.length} Active Waybills in Registry
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2D: Live Corridor Tariff Comparison & SLA Matrix */}
      <section className={`${GLASS_CARD} p-8 space-y-5`}>
        <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
          3. Sovereign Corridor Service Level Agreements
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-sky-300/60 text-xs text-[#334155]">
                <th className="py-3 pr-4 font-semibold">Transport Mode</th>
                <th className="py-3 px-4 font-semibold">Container / Unit Spec</th>
                <th className="py-3 px-4 font-semibold">Thermal Tolerance</th>
                <th className="py-3 px-4 font-semibold">Customs EDI Protocol</th>
                <th className="py-3 pl-4 font-semibold text-right">Target Transit Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-300/45 text-xs sm:text-sm">
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-[#0B1B3B]">Ocean 40ft High-Cube</td>
                <td className="py-3.5 px-4 text-[#1E3A5F] tabular-nums">67.7 CBM / 26,500 kg</td>
                <td className="py-3.5 px-4 text-[#1E3A5F]">Ambient Dry Ventilated</td>
                <td className="py-3.5 px-4 text-[#0369A1] font-semibold">72-Hr Pre-Arrival Clearance</td>
                <td className="py-3.5 pl-4 text-right font-semibold text-[#0B1B3B] tabular-nums">12 – 18 Days</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-[#0B1B3B]">Priority Air Charter</td>
                <td className="py-3.5 px-4 text-[#1E3A5F] tabular-nums">PMC Main-Deck Pallets</td>
                <td className="py-3.5 px-4 text-[#1E3A5F]">+15°C to +25°C Pressurized</td>
                <td className="py-3.5 px-4 text-[#0369A1] font-semibold">90-Min Airside Tarmac Release</td>
                <td className="py-3.5 pl-4 text-right font-semibold text-[#0B1B3B] tabular-nums">2 – 3 Days</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-[#0B1B3B]">Refrigerated Cold-Chain</td>
                <td className="py-3.5 px-4 text-[#1E3A5F] tabular-nums">58.4 CBM Active Reefer</td>
                <td className="py-3.5 px-4 text-[#1E3A5F]">-25°C to +15°C (±0.2°C)</td>
                <td className="py-3.5 px-4 text-[#0369A1] font-semibold">FDA / EMA Biologics Priority</td>
                <td className="py-3.5 pl-4 text-right font-semibold text-[#0B1B3B] tabular-nums">4 – 14 Days</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-[#0B1B3B]">Cross-Border Ground</td>
                <td className="py-3.5 px-4 text-[#1E3A5F] tabular-nums">62.0 CBM Air-Ride Chassis</td>
                <td className="py-3.5 px-4 text-[#1E3A5F]">Climate & Shock Monitored</td>
                <td className="py-3.5 px-4 text-[#0369A1] font-semibold">TIR Carnet Automated Gate</td>
                <td className="py-3.5 pl-4 text-right font-semibold text-[#0B1B3B] tabular-nums">3 – 7 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// PORTAL 3: LIVE 3D GLOBE MAP TRACKER — PRIVACY-GATED CLIENT VIEW
// ============================================================================
interface GlobePortalProps {
  shipments: ShipmentRecord[];
  unlockedWaybillId: string | null;
  onUnlockWaybill: (waybillId: string) => boolean;
}

export const GlobePortal: React.FC<GlobePortalProps> = ({
  shipments,
  unlockedWaybillId,
  onUnlockWaybill,
}) => {
  const [searchInput, setSearchInput] = useState<string>(unlockedWaybillId ?? '');
  const [searchFeedback, setSearchFeedback] = useState<string>('');

  useEffect(() => {
    if (unlockedWaybillId) {
      setSearchInput(unlockedWaybillId);
    }
  }, [unlockedWaybillId]);

  const activeShipment = unlockedWaybillId
    ? shipments.find((s) => s.waybillId === unlockedWaybillId) || null
    : null;

  const originPort = activeShipment
    ? GLOBAL_PORTS.find((p) => p.code === activeShipment.originPortCode) ||
      GLOBAL_PORTS[0]
    : null;
  const destPort = activeShipment
    ? GLOBAL_PORTS.find((p) => p.code === activeShipment.destinationPortCode) ||
      GLOBAL_PORTS[2]
    : null;

  const handleWaybillSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeWaybillId(searchInput);
    if (!normalized) {
      setSearchFeedback('Please type your private Waybill ID manually.');
      return;
    }
    const unlocked = onUnlockWaybill(normalized);
    if (unlocked) {
      setSearchFeedback(`Private telemetry unlocked for ${normalized}.`);
    } else {
      setSearchFeedback(
        `Waybill "${searchInput}" not found. Verify your private dispatch code.`
      );
    }
  };

  const currentCheckpointIdx = activeShipment
    ? CHECKPOINT_ORDER.indexOf(activeShipment.currentCheckpoint)
    : -1;

  return (
    <div className="space-y-12 pb-20">
      {/* SECTION 3A: Private Manual Waybill Lookup Bar (Zero Public Waybill Chips) */}
      <section className={`${GLASS_CARD} p-8 space-y-5`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Portal 03 · Orbital Satellite & AIS Vessel Telemetry
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent mt-1">
              Live 3D Globe Corridor Tracker
            </h1>
            <p className="text-xs sm:text-sm text-[#1E3A5F] mt-1.5">
              Waybill tracking numbers are private. Enter your issued Waybill Reference ID
              manually to unlock live route telemetry.
            </p>
          </div>

          <form
            onSubmit={handleWaybillSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
          >
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-[#0369A1] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Enter private Waybill Reference ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Type private Waybill ID manually..."
                className={`${GLASS_INPUT} w-full pl-10 pr-4 py-2.5 text-sm`}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_6px_18px_rgba(2,132,199,0.28)] font-semibold text-xs cursor-pointer whitespace-nowrap"
            >
              Unlock Satellite Pin
            </button>
          </form>
        </div>

        {searchFeedback && (
          <div className="text-xs font-semibold text-[#0369A1] pt-2 border-t border-sky-300/55">
            {searchFeedback}
          </div>
        )}
      </section>

      {/* SECTION 3B: Interactive Cosmic 3D Earth Globe Canvas + Telemetry Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex">
          <OrbitalGlobeCanvas
            activeShipment={activeShipment}
            allShipments={shipments}
            allowFleetSwitcher={false}
          />
        </div>

        {activeShipment && originPort && destPort ? (
          <div className={`${GLASS_CARD} lg:col-span-5 p-8 flex flex-col justify-between space-y-6`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0369A1]">
                  {activeShipment.mode}
                </span>
                <span className="text-xs font-semibold text-[#1E3A5F] tabular-nums">
                  Customs: {activeShipment.customsStatus}
                </span>
              </div>

              <div>
                <h2 className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] tabular-nums">
                  {activeShipment.clientName}
                </h2>
                <p className="text-xs sm:text-sm text-[#1E3A5F] mt-1">
                  {activeShipment.commodity}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className={`${SUB_GLASS} p-4`}>
                  <div className="flex items-center justify-between text-xs text-[#334155]">
                    <span>Origin Terminal</span>
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" title="Origin Pin" />
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0B1B3B] mt-1.5">
                    <CountryFlag
                      countryCode={originPort.countryCode}
                      countryName={originPort.country}
                      size="md"
                    />
                    <span>
                      {originPort.code} · {originPort.country}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#334155] truncate mt-1">
                    {originPort.portArea}
                  </div>
                </div>
                <div className={`${SUB_GLASS} p-4`}>
                  <div className="flex items-center justify-between text-xs text-[#334155]">
                    <span>Destination Terminal</span>
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" title="Destination Pin" />
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0B1B3B] mt-1.5">
                    <CountryFlag
                      countryCode={destPort.countryCode}
                      countryName={destPort.country}
                      size="md"
                    />
                    <span>
                      {destPort.code} · {destPort.country}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#334155] truncate mt-1">
                    {destPort.portArea}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`${SUB_GLASS} p-3.5 rounded-xl`}>
                  <div className="text-[#334155]">Current Latitude / Longitude</div>
                  <div className="text-sm font-semibold text-[#0369A1] tabular-nums mt-1">
                    {activeShipment.currentLat.toFixed(3)}° N,{' '}
                    {activeShipment.currentLng.toFixed(3)}° E
                  </div>
                </div>
                <div className={`${SUB_GLASS} p-3.5 rounded-xl`}>
                  <div className="text-[#334155]">Internal Container Temp</div>
                  <div className="text-sm font-semibold text-[#0B1B3B] tabular-nums mt-1">
                    {activeShipment.temperatureC} (Nominal)
                  </div>
                </div>
                <div className={`${SUB_GLASS} p-3.5 rounded-xl`}>
                  <div className="text-[#334155]">Sea & Atmospheric State</div>
                  <div className="text-sm font-semibold text-[#0B1B3B] mt-1 truncate">
                    {activeShipment.seaState}
                  </div>
                </div>
                <div className={`${SUB_GLASS} p-3.5 rounded-xl`}>
                  <div className="text-[#334155]">Security Seal Status</div>
                  <div className="text-sm font-semibold text-[#0B1B3B] tabular-nums mt-1">
                    {activeShipment.windSpeedKnots} kts · Sealed
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sky-300/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[#334155]">Assigned Commander: </span>
                <span className="text-[#0B1B3B] font-semibold">
                  {activeShipment.assignedStaffName}
                </span>
              </div>
              <div className="text-[#0369A1] font-semibold tabular-nums">
                ETA: {activeShipment.etaDate}
              </div>
            </div>
          </div>
        ) : (
          <div className={`${GLASS_CARD} lg:col-span-5 p-8 flex flex-col justify-between space-y-6`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0369A1]">
                <Lock className="w-4 h-4" />
                <span>Private Waybill Telemetry Guard</span>
              </div>
              <h2 className="font-editorial italic font-semibold text-3xl text-[#0B1B3B]">
                Real-Time Earth, Solar Terminator & Ocean Corridor Monitor
              </h2>
              <p className="text-sm text-[#1E3A5F] leading-relaxed">
                For client confidentiality, live Waybill tracking numbers are private and
                reserved exclusively for Crew Terminal and 24/7 Master Dispatch ERP. Enter
                your private Waybill ID in the lookup box above to unlock your live vessel
                or air charter vector.
              </p>

              <div className="space-y-3 pt-2">
                <div className={`${SUB_GLASS} p-4 flex items-center justify-between text-xs`}>
                  <span className="text-[#1E3A5F]">Maritime Ocean Corridors</span>
                  <span className="font-semibold text-[#0369A1]">Sea-Lane Water Routing Active</span>
                </div>
                <div className={`${SUB_GLASS} p-4 flex items-center justify-between text-xs`}>
                  <span className="text-[#1E3A5F]">Priority Air Charters</span>
                  <span className="font-semibold text-[#0369A1]">Boeing 777F Aerial Vectors</span>
                </div>
                <div className={`${SUB_GLASS} p-4 flex items-center justify-between text-xs`}>
                  <span className="text-[#1E3A5F]">Solar Day / Night Lighting</span>
                  <span className="font-semibold text-[#0B1B3B]">Live UTC Sun & Moon Sync</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sky-300/60 text-xs text-[#334155]">
              Need an instant shipment ID? Issue a new corridor booking in Freight Estimator.
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3C & 3D: Shown when a private Waybill has been unlocked */}
      {activeShipment && originPort && destPort && (
        <>
          <section className={`${GLASS_CARD} p-8 space-y-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-[#0369A1]">
                  Live 6-Stage Corridor Milestone Verification
                </div>
                <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
                  Checkpoint Progression ({activeShipment.progressPct}% Complete)
                </h2>
              </div>
              <span className="text-xs text-[#1E3A5F]">
                Current Stage:{' '}
                <strong className="text-[#0369A1]">{activeShipment.currentCheckpoint}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {CHECKPOINT_ORDER.map((step, index) => {
                const isCompleted = index <= currentCheckpointIdx;
                const isCurrent = index === currentCheckpointIdx;
                return (
                  <div
                    key={step}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] border-sky-300/70 text-white shadow-md'
                        : isCompleted
                        ? 'glass-blue-sub text-[#0B1B3B]'
                        : 'bg-white/45 border-sky-300/45 text-[#475569]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold tabular-nums">0{index + 1}</span>
                      <span>
                        {isCurrent
                          ? 'Active Now'
                          : isCompleted
                          ? 'Verified'
                          : 'Pending'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold">{step}</div>
                    <div className={`text-[11px] mt-1 ${isCurrent ? 'text-sky-100' : 'text-[#334155]'}`}>
                      {index === 0 && `Sealed at ${originPort.code}`}
                      {index === 1 && 'Quay Gantry Stowed'}
                      {index === 2 && 'Satellite Corridor'}
                      {index === 3 && 'EDI Bond Released'}
                      {index === 4 && 'Final-Mile Convoy'}
                      {index === 5 && `Pod at ${destPort.code}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={`${GLASS_CARD} p-8 space-y-5`}>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Vessel & Terminal Field Telemetry Logs ({activeShipment.fieldLogs.length})
            </h2>
            <div className="space-y-3">
              {activeShipment.fieldLogs.map((log) => (
                <div
                  key={log.id}
                  className={`${SUB_GLASS} p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#0369A1]">
                      <span className="font-semibold text-[#0B1B3B]">{log.author}</span>
                      <span>·</span>
                      <span>{log.role}</span>
                      <span>·</span>
                      <span>Checkpoint: {log.checkpoint}</span>
                    </div>
                    <p className="text-sm text-[#1E3A5F]">{log.note}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 space-y-0.5 text-xs tabular-nums">
                    <div className="text-[#0369A1] font-semibold">
                      Temp: {log.temperatureC} · Sealed
                    </div>
                    <div className="text-[#334155]">{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
