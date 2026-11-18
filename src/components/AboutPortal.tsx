import React from 'react';
import {
  Anchor,
  ArrowRight,
  Award,
  Building2,
  Compass,
  Globe,
  Leaf,
  Lock,
  Plane,
  Radio,
  ShieldCheck,
  Ship,
  Snowflake,
  Users,
} from 'lucide-react';
import { PortalId, VERIFIED_FLEET_ASSETS } from '../utils/freightEngine';
import { LangCode, getTranslations } from '../utils/i18n';
import { CountryFlag } from './CountryFlag';

const GLASS_CARD = 'glass-blue-window rounded-3xl';
const SUB_GLASS = 'glass-blue-sub rounded-2xl';

interface AboutPortalProps {
  lang: LangCode;
  onNavigatePortal: (portal: PortalId) => void;
}

const REGIONAL_HEADQUARTERS = [
  {
    region: 'European Maritime HQ',
    city: 'Rotterdam, Netherlands',
    hubCode: 'NLRTM · Maasvlakte II',
    countryCode: 'NL',
    countryName: 'Netherlands',
    role: 'Global Fleet Chartering, North Sea Automated Quay Operations & EU Customs Bond Desk',
    telemetryFloor: '24/7 Europort Command Floor',
  },
  {
    region: 'Asia-Pacific Hub Command',
    city: 'Singapore',
    hubCode: 'SGSIN · Tuas Mega Port',
    countryCode: 'SG',
    countryName: 'Singapore',
    role: 'Trans-Pacific Vessel Routing, Malacca Corridor Dispatch & High-Tech Cold-Chain Vaults',
    telemetryFloor: '24/7 Strait Telemetry Annex',
  },
  {
    region: 'Americas Aviation & Rail Desk',
    city: 'New York & Newark, USA',
    hubCode: 'USNYC · Elizabeth Terminal',
    countryCode: 'US',
    countryName: 'United States',
    role: 'Priority Boeing 777F Air Charters, Trans-Atlantic Dispatch & FDA/CBP Pre-Clearance',
    telemetryFloor: 'Atlantic Corridor Control',
  },
  {
    region: 'Middle East & Indian Ocean Hub',
    city: 'Dubai, UAE',
    hubCode: 'AEJEA · Jebel Ali Free Zone',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    role: 'Suez-to-Gulf Bonded Transshipment, Aerospace Forging Drayage & Cryogenic Relay',
    telemetryFloor: 'MENA Intermodal Desk',
  },
];

const LEADERSHIP_TEAM = [
  {
    name: 'Capt. Henrik Lindqvist',
    title: 'Chief Maritime Operations Officer',
    base: 'Rotterdam (NLRTM)',
    tenure: '24 Years At Sea & Fleet Command',
    focus: 'Oversees 420+ ultra-large container vessels, automated weather-routing, and green methanol propulsion transition.',
  },
  {
    name: 'Elena Rostova',
    title: 'VP of Priority Aviation & Cold-Chain',
    base: 'Frankfurt / New York',
    tenure: '17 Years Widebody Cargo & Cryo Ops',
    focus: 'Directs Boeing 777F main-deck charters and -25°C pharmaceutical Envirotainer reliability across 38 air hubs.',
  },
  {
    name: 'Dr. Kenji Takahashi',
    title: 'Director of Orbital Telemetry & EDI',
    base: 'Tokyo / Singapore',
    tenure: '15 Years Satellite AIS & Cryptographic Seals',
    focus: 'Architect of Vanguard 3D Orbital Globe tracking, Inmarsat L-Band container sensors, and zero-leak Waybill privacy.',
  },
  {
    name: 'Amina Al-Mansoor',
    title: 'Head of Global Customs & AEO Compliance',
    base: 'Dubai (AEJEA)',
    tenure: '19 Years International Trade Law',
    focus: 'Leads WCO Tier-1 Authorized Economic Operator filings enabling 2.4-hour automated quay releases across 148 ports.',
  },
];

const COMPLIANCE_STANDARDS = [
  {
    code: 'WCO Tier-1 AEO',
    title: 'Authorized Economic Operator',
    detail: 'Trusted sovereign customs status across 148 harbors for pre-arrival digital clearance and priority inspection lanes.',
    icon: ShieldCheck,
  },
  {
    code: 'ISO 17712 & FIPS',
    title: 'Cryptographic Seal & Privacy',
    detail: 'High-security biometric container e-Seals paired with private Waybill encryption locked exclusively to authorized desks.',
    icon: Lock,
  },
  {
    code: 'EU GDP / 21 CFR',
    title: 'Pharmaceutical Cold-Chain Audit',
    detail: 'Continuous 60-second dual-probe temperature telemetry from -25°C cryogenic holds to hospital distribution docks.',
    icon: Snowflake,
  },
  {
    code: 'IMO 2050 Net-Zero',
    title: 'Dual-Fuel Green Methanol Fleet',
    detail: 'Next-generation ULCV hulls cutting lifecycle maritime carbon intensity by 68% across deep-water trade corridors.',
    icon: Leaf,
  },
];

export const AboutPortal: React.FC<AboutPortalProps> = ({
  lang,
  onNavigatePortal,
}) => {
  const t = getTranslations(lang);
  const terminalPhoto = VERIFIED_FLEET_ASSETS[1]?.imageUrl ?? '/assets/fleet/port-gantry-terminal.jpg';
  const vesselPhoto = VERIFIED_FLEET_ASSETS[0]?.imageUrl ?? '/assets/fleet/ocean-container-ship.jpg';
  const airPhoto = VERIFIED_FLEET_ASSETS[2]?.imageUrl ?? '/assets/fleet/air-cargo-jet.jpg';

  return (
    <div className="space-y-8 pb-20">
      {/* HERO OVERVIEW CARD */}
      <section className={`${GLASS_CARD} p-8 sm:p-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0369A1] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0284C7]" />
              <span>{t.aboutEyebrow}</span>
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl text-[#0B1B3B] leading-[1.08]">
              {t.aboutTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#1E3A5F] leading-relaxed max-w-2xl">
              {t.aboutSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigatePortal('estimator')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_8px_22px_rgba(2,132,199,0.28)] font-semibold text-xs flex items-center gap-2 cursor-pointer"
              >
                <span>{t.launchEstimatorBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal('globe')}
                className="px-5 py-3 rounded-xl bg-white/75 hover:bg-white border border-sky-300/80 text-[#0B1B3B] font-semibold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t.navGlobe}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <div className={`${SUB_GLASS} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                Established
              </div>
              <div className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] mt-1">
                1998
              </div>
              <p className="text-xs text-[#1E3A5F] mt-1">
                Twin maritime charters in Rotterdam & Singapore.
              </p>
            </div>
            <div className={`${SUB_GLASS} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                Customs Network
              </div>
              <div className="font-editorial italic font-semibold text-3xl text-[#1D4ED8] mt-1">
                148 Ports
              </div>
              <p className="text-xs text-[#1E3A5F] mt-1">
                Direct automated EDI harbor berths worldwide.
              </p>
            </div>
            <div className={`${SUB_GLASS} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                Sovereign Fleet
              </div>
              <div className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] mt-1">
                420+ Units
              </div>
              <p className="text-xs text-[#1E3A5F] mt-1">
                Ocean ULCVs, Boeing 777Fs, reefers & drayage rigs.
              </p>
            </div>
            <div className={`${SUB_GLASS} p-4`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                Schedule Reliability
              </div>
              <div className="font-editorial italic font-semibold text-3xl text-[#047857] mt-1">
                99.94%
              </div>
              <p className="text-xs text-[#1E3A5F] mt-1">
                Continuous satellite berth-window precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE OPERATIONAL PILLARS WITH FLEET PHOTOGRAPHY */}
      <section className={`${GLASS_CARD} p-8 sm:p-10 space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-300/70 pb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0369A1] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0284C7]" />
              <span>01. Operational Doctrine</span>
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-4xl text-[#0B1B3B] mt-1">
              Built for Critical Semiconductor, BioPharma & Industrial Trade
            </h2>
          </div>
          <span className="text-xs font-medium text-[#0369A1]">
            Zero Third-Party Subcontracting on Core Lanes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className={`${SUB_GLASS} overflow-hidden flex flex-col`}>
            <div className="h-44 relative overflow-hidden">
              <img
                src={vesselPhoto}
                alt="Vanguard Sovereign Maritime Container Fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122E]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white text-xs font-semibold">
                <Ship className="w-4 h-4 text-[#38BDF8]" />
                <span>Deep-Water Maritime Sovereignty</span>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-base font-semibold text-[#0B1B3B]">
                Dedicated Ultra-Large Container Hulls
              </h3>
              <p className="text-xs text-[#1E3A5F] leading-relaxed">
                Every ocean consignment moves strictly on verified open-water lanes with dedicated berth priority at Tuas Mega Port, Maasvlakte II, Yokohama, and San Pedro Bay.
              </p>
            </div>
          </article>

          <article className={`${SUB_GLASS} overflow-hidden flex flex-col`}>
            <div className="h-44 relative overflow-hidden">
              <img
                src={airPhoto}
                alt="Vanguard Priority Boeing 777F Air Fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122E]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white text-xs font-semibold">
                <Plane className="w-4 h-4 text-[#38BDF8]" />
                <span>Priority Widebody Air Corridors</span>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-base font-semibold text-[#0B1B3B]">
                Mach 0.84 Urgent Cryogenic Charters
              </h3>
              <p className="text-xs text-[#1E3A5F] leading-relaxed">
                When hours matter for mRNA bioreactors or lithography optics, our Boeing 777F freighters link tarmac cold-vaults directly without layover consolidation.
              </p>
            </div>
          </article>

          <article className={`${SUB_GLASS} overflow-hidden flex flex-col`}>
            <div className="h-44 relative overflow-hidden">
              <img
                src={terminalPhoto}
                alt="Vanguard Automated Gantry Port Infrastructure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122E]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white text-xs font-semibold">
                <Radio className="w-4 h-4 text-[#38BDF8]" />
                <span>24/7 Orbital Satellite & Crew Sync</span>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-base font-semibold text-[#0B1B3B]">
                Encrypted End-to-End Telemetry
              </h3>
              <p className="text-xs text-[#1E3A5F] leading-relaxed">
                Captains, loadmasters, customs brokers, and our 24/7 Master Dispatch desk synchronize every seal signature and thermal reading across a private zero-leak architecture.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* GLOBAL COMMAND HEADQUARTERS */}
      <section className={`${GLASS_CARD} p-8 sm:p-10 space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-300/70 pb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0369A1] flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#0284C7]" />
              <span>02. Regional Command Desks</span>
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-4xl text-[#0B1B3B] mt-1">
              Four Intercontinental Dispatch Headquarters
            </h2>
          </div>
          <span className="text-xs font-medium text-[#1E3A5F]">
            Follow-the-Sun 24/7 Watch Rotation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REGIONAL_HEADQUARTERS.map((hq) => (
            <div key={hq.hubCode} className={`${SUB_GLASS} p-6 space-y-3`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CountryFlag
                    countryCode={hq.countryCode}
                    countryName={hq.countryName}
                    size="md"
                  />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0369A1]">
                      {hq.region}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0B1B3B]">
                      {hq.city}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white/75 border border-sky-300/80 text-xs font-mono font-semibold text-[#0369A1]">
                  {hq.hubCode}
                </span>
              </div>
              <p className="text-xs text-[#1E3A5F] leading-relaxed">{hq.role}</p>
              <div className="pt-2 border-t border-sky-300/60 flex items-center justify-between text-xs text-[#0369A1] font-medium">
                <span>{hq.telemetryFloor}</span>
                <span>Active 24/7</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP & CERTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className={`lg:col-span-7 ${GLASS_CARD} p-7 sm:p-8 space-y-5`}>
          <div className="border-b border-sky-300/70 pb-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0369A1] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0284C7]" />
              <span>03. Command Leadership</span>
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B] mt-1">
              Maritime, Aviation & Telemetry Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LEADERSHIP_TEAM.map((leader) => (
              <div key={leader.name} className={`${SUB_GLASS} p-4 space-y-2`}>
                <div>
                  <div className="text-sm font-semibold text-[#0B1B3B]">
                    {leader.name}
                  </div>
                  <div className="text-xs font-semibold text-[#0369A1]">
                    {leader.title}
                  </div>
                </div>
                <div className="text-xs text-[#1E3A5F]/85 font-medium">
                  {leader.base} · {leader.tenure}
                </div>
                <p className="text-xs text-[#1E3A5F] leading-relaxed">
                  {leader.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`lg:col-span-5 ${GLASS_CARD} p-7 sm:p-8 space-y-5`}>
          <div className="border-b border-sky-300/70 pb-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0369A1] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0284C7]" />
              <span>04. Sovereign Standards</span>
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B] mt-1">
              Certifications & Fleet ESG
            </h2>
          </div>

          <div className="space-y-3">
            {COMPLIANCE_STANDARDS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.code} className={`${SUB_GLASS} p-4 flex items-start gap-3`}>
                  <div className="w-9 h-9 rounded-xl bg-white/80 border border-sky-300/80 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#0284C7]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0369A1]">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-[#0B1B3B]">
                        · {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#1E3A5F] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* BOTTOM ACTION BANNER */}
      <section className={`${GLASS_CARD} p-8 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="space-y-1">
          <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
            {t.readyCtaTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#1E3A5F]">{t.readyCtaDesc}</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigatePortal('estimator')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_8px_22px_rgba(2,132,199,0.28)] font-semibold text-xs cursor-pointer"
          >
            {t.launchEstimatorBtn}
          </button>
          <button
            type="button"
            onClick={() => onNavigatePortal('client')}
            className="px-5 py-3 rounded-xl bg-white/75 hover:bg-white border border-sky-300/80 text-[#0B1B3B] font-semibold text-xs shadow-sm cursor-pointer transition-colors"
          >
            {t.enterClientBtn}
          </button>
        </div>
      </section>
    </div>
  );
};
