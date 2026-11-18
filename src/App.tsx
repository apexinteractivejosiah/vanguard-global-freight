/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import {
  CheckpointName,
  CorporateClient,
  DispatchMessage,
  INITIAL_CORPORATE_CLIENTS,
  INITIAL_DISPATCH_MESSAGES,
  INITIAL_SHIPMENTS,
  INITIAL_STAFF_ROSTER,
  INITIAL_VESSEL_FLEET,
  PortalId,
  ShipmentRecord,
  StaffMember,
  StaffRole,
  TransportMode,
  VesselFleetItem,
  interpolateCorridorPosition,
  normalizeWaybillId,
} from './utils/freightEngine';
import {
  LangCode,
  WebsiteTheme,
  getTranslations,
} from './utils/i18n';
import {
  EstimatorPortal,
  GlobePortal,
  HomePortal,
} from './components/PortalsPartOne';
import {
  AdminPortal,
  ClientPortal,
  EmployeePortal,
} from './components/PortalsPartTwo';
import { AboutPortal } from './components/AboutPortal';
import { VanguardLogo } from './components/VanguardLogo';
import { StartupIntroOverlay } from './components/StartupIntroOverlay';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') !== '1';
    }
    return true;
  });

  const [theme, setTheme] = useState<WebsiteTheme>('light');
  const [lang, setLang] = useState<LangCode>('en');
  const [activePortal, setActivePortal] = useState<PortalId>('home');
  const [shipments, setShipments] =
    useState<ShipmentRecord[]>(INITIAL_SHIPMENTS);

  // Crew Terminal & Master Dispatch ERP selected shipment
  const [selectedWaybillId, setSelectedWaybillId] =
    useState<string>('VGF-8841');

  // Public / Client-unlocked private Waybill IDs (initially empty so zero tracking numbers leak)
  const [unlockedWaybillIds, setUnlockedWaybillIds] = useState<string[]>([]);
  const [clientGlobeWaybillId, setClientGlobeWaybillId] =
    useState<string | null>(null);

  const [estimatorMode, setEstimatorMode] = useState<TransportMode>(
    'Ocean 40ft High-Cube'
  );
  const [vesselFleet] = useState<VesselFleetItem[]>(INITIAL_VESSEL_FLEET);
  const [corporateClients] = useState<CorporateClient[]>(
    INITIAL_CORPORATE_CLIENTS
  );
  const [staffRoster, setStaffRoster] =
    useState<StaffMember[]>(INITIAL_STAFF_ROSTER);
  const [messages, setMessages] = useState<DispatchMessage[]>(
    INITIAL_DISPATCH_MESSAGES
  );

  const t = getTranslations(lang);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const portalNavItems: Array<{
    id: PortalId;
    label: string;
    shortLabel: string;
  }> = [
    { id: 'home', label: t.navHome, shortLabel: t.navHome },
    { id: 'estimator', label: t.navEstimator, shortLabel: t.navEstimator },
    { id: 'globe', label: t.navGlobe, shortLabel: t.navGlobe },
    { id: 'client', label: t.navClient, shortLabel: t.navClient },
    { id: 'employee', label: t.navEmployee, shortLabel: t.navEmployee },
    { id: 'admin', label: t.navAdmin, shortLabel: t.navAdmin },
    { id: 'about', label: t.navAbout, shortLabel: t.navAbout },
  ];

  // Switch portal and scroll immediately to top
  const handleSwitchPortal = (portal: PortalId) => {
    setActivePortal(portal);
    window.scrollTo(0, 0);
  };

  // Unlock a private Waybill explicitly typed/searched by a client
  const handleUnlockWaybill = (rawWaybillId: string): ShipmentRecord | null => {
    const normalized = normalizeWaybillId(rawWaybillId);
    if (!normalized) return null;
    const matched = shipments.find(
      (s) => s.waybillId.toUpperCase() === normalized.toUpperCase()
    );
    if (!matched) return null;

    setUnlockedWaybillIds((prev) =>
      prev.includes(matched.waybillId) ? prev : [...prev, matched.waybillId]
    );
    setClientGlobeWaybillId(matched.waybillId);
    setSelectedWaybillId(matched.waybillId);
    return matched;
  };

  // Jump straight to 3D Globe tracker for an explicitly searched or newly booked Waybill
  const handleQuickTrackWaybill = (rawWaybillId: string): boolean => {
    const matched = handleUnlockWaybill(rawWaybillId);
    if (!matched) return false;
    handleSwitchPortal('globe');
    return true;
  };

  // Pre-select a transport mode from the Fleet Bento Grid and open Estimator
  const handleBookTransportMode = (mode: TransportMode) => {
    setEstimatorMode(mode);
    handleSwitchPortal('estimator');
  };

  // Add newly created shipment from Estimator and unlock it for the user
  const handleCreateBooking = (newShipment: ShipmentRecord) => {
    setShipments((prev) => [newShipment, ...prev]);
    setUnlockedWaybillIds((prev) => [...prev, newShipment.waybillId]);
    setClientGlobeWaybillId(newShipment.waybillId);
    setSelectedWaybillId(newShipment.waybillId);
  };

  // Employee & Courier Terminal checkpoint update -> immediately moves 3D Globe pin & Master ERP
  const handleUpdateShipmentCheckpoint = (params: {
    waybillId: string;
    checkpoint: CheckpointName;
    role: StaffRole;
    authorName: string;
    temperatureC: string;
    securitySeal: string;
    fieldNote: string;
  }) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.waybillId !== params.waybillId) return s;
        const { lat, lng, progressPct } = interpolateCorridorPosition(
          s.originPortCode,
          s.destinationPortCode,
          params.checkpoint,
          s.mode
        );

        const newCustomsStatus: ShipmentRecord['customsStatus'] =
          params.checkpoint === 'Customs Cleared' ||
          params.checkpoint === 'Out for Delivery' ||
          params.checkpoint === 'Delivered'
            ? 'Released'
            : s.customsStatus;

        const newLog = {
          id: `LOG-${Date.now()}`,
          timestamp: '2026-11-17 08:45 UTC',
          author: params.authorName,
          role: params.role,
          checkpoint: params.checkpoint,
          temperatureC: params.temperatureC,
          sealNumber: params.securitySeal,
          note: params.fieldNote,
        };

        return {
          ...s,
          currentCheckpoint: params.checkpoint,
          progressPct,
          currentLat: lat,
          currentLng: lng,
          temperatureC: params.temperatureC,
          securitySeal: params.securitySeal,
          customsStatus: newCustomsStatus,
          fieldLogs: [newLog, ...s.fieldLogs],
        };
      })
    );
    setSelectedWaybillId(params.waybillId);
  };

  // Admin 24/7 Master Dispatch ERP override handler
  const handleAdminOverrideShipment = (
    waybillId: string,
    updates: {
      checkpoint?: CheckpointName;
      etaDate?: string;
      originPortCode?: string;
      destinationPortCode?: string;
      customsStatus?: ShipmentRecord['customsStatus'];
      assignedStaffName?: string;
    }
  ) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.waybillId !== waybillId) return s;
        const nextOrigin = updates.originPortCode ?? s.originPortCode;
        const nextDest = updates.destinationPortCode ?? s.destinationPortCode;
        const nextCheckpoint = updates.checkpoint ?? s.currentCheckpoint;
        const { lat, lng, progressPct } = interpolateCorridorPosition(
          nextOrigin,
          nextDest,
          nextCheckpoint,
          s.mode
        );

        const logAddition =
          updates.checkpoint && updates.checkpoint !== s.currentCheckpoint
            ? [
                {
                  id: `LOG-ADM-${Date.now()}`,
                  timestamp: '2026-11-17 08:48 UTC',
                  author: '24/7 Master Dispatch ERP',
                  role: 'Master Dispatch ERP' as const,
                  checkpoint: nextCheckpoint,
                  temperatureC: s.temperatureC,
                  sealNumber: s.securitySeal,
                  note: `Master Dispatch ERP overrode stage to ${nextCheckpoint} (${nextOrigin} → ${nextDest}).`,
                },
                ...s.fieldLogs,
              ]
            : s.fieldLogs;

        return {
          ...s,
          originPortCode: nextOrigin,
          destinationPortCode: nextDest,
          currentCheckpoint: nextCheckpoint,
          progressPct,
          currentLat: lat,
          currentLng: lng,
          etaDate: updates.etaDate ?? s.etaDate,
          customsStatus: updates.customsStatus ?? s.customsStatus,
          assignedStaffName: updates.assignedStaffName ?? s.assignedStaffName,
          fieldLogs: logAddition,
        };
      })
    );
  };

  // Assign staff member to a Waybill from Master ERP Roster
  const handleAssignStaffToWaybill = (staffId: string, waybillId: string) => {
    const targetStaff = staffRoster.find((st) => st.id === staffId);
    if (!targetStaff) return;

    setStaffRoster((prev) =>
      prev.map((st) =>
        st.id === staffId ? { ...st, currentAssignmentWaybill: waybillId } : st
      )
    );

    setShipments((prev) =>
      prev.map((s) =>
        s.waybillId === waybillId
          ? {
              ...s,
              assignedStaffId: targetStaff.id,
              assignedStaffName: targetStaff.name,
            }
          : s
      )
    );
  };

  // Two-way messaging between Client Portal and 24/7 Master Dispatch Inbox
  const handleSendMessage = (
    msg: Omit<DispatchMessage, 'id' | 'timestamp'>
  ) => {
    const newEntry: DispatchMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      timestamp: '2026-11-17 08:50 UTC',
    };
    setMessages((prev) => [newEntry, ...prev]);
  };

  const handleSendDispatchReply = (waybillId: string, replyText: string) => {
    handleSendMessage({
      waybillId,
      senderName: 'Vanguard Master Dispatch Desk',
      senderRole: 'Master Dispatch Desk',
      message: replyText,
      priority: 'Priority Customs',
    });
  };

  const isDarkTheme = theme === 'dark';

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-website-theme={theme}
        data-website-lang={lang}
        className={`min-h-screen relative transition-colors duration-300 selection:bg-[#2563EB]/20 ${
          isDarkTheme
            ? 'bg-[#030917] text-white selection:text-white'
            : 'bg-white/85 text-[#0B1B3B] selection:text-[#0B1B3B]'
        }`}
      >
        {showIntro && (
          <StartupIntroOverlay onComplete={() => setShowIntro(false)} />
        )}

        {/* 1. PULSATING AMBIENT BACKGROUND ORBS */}
        <div
          aria-hidden="true"
          className={`orb-ice fixed -top-32 -left-24 w-[540px] h-[540px] rounded-full blur-[150px] pointer-events-none z-0 ${
            isDarkTheme ? 'bg-[#1D4ED8]/25' : 'bg-[#BAE6FD]/45'
          }`}
        />
        <div
          aria-hidden="true"
          className={`orb-cobalt fixed top-1/4 -right-32 w-[620px] h-[620px] rounded-full blur-[150px] pointer-events-none z-0 ${
            isDarkTheme ? 'bg-[#38BDF8]/15' : 'bg-[#3B82F6]/15'
          }`}
        />
        <div
          aria-hidden="true"
          className={`orb-sky fixed -bottom-36 left-1/3 w-[520px] h-[520px] rounded-full blur-[150px] pointer-events-none z-0 ${
            isDarkTheme ? 'bg-[#0EA5E9]/14' : 'bg-[#E0F2FE]/65'
          }`}
        />

        {/* 2. STICKY BABY-BLUE FROSTED GLASS NAVIGATION DOCK */}
        <header className="fixed top-0 inset-x-0 z-[100] backdrop-blur-2xl bg-gradient-to-r from-[#F0F9FF]/95 via-[#DCF0FF]/94 to-[#BAE6FD]/92 border-b border-sky-300/80 shadow-[0_10px_30px_rgba(14,52,114,0.12)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2 xl:gap-3">
            <button
              type="button"
              onClick={() => handleSwitchPortal('home')}
              aria-label="Vanguard Global Freight Home"
              className="hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer text-left"
            >
              <VanguardLogo size="header" variant="light" />
            </button>

            <nav
              aria-label="Supply Chain OS Portals"
              className="flex items-center gap-0.5 xl:gap-1 overflow-x-auto py-1 no-scrollbar"
            >
              {portalNavItems.map((item) => {
                const isActive = activePortal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSwitchPortal(item.id)}
                    className={`px-2 xl:px-2.5 py-2 rounded-xl text-[11px] xl:text-xs font-medium transition-shadow cursor-pointer whitespace-nowrap shrink-0 border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white font-semibold border-sky-300/60 shadow-[0_4px_14px_rgba(2,132,199,0.3)]'
                        : 'text-[#1E3A5F] border-transparent hover:text-[#0B1B3B] hover:bg-white/65'
                    }`}
                  >
                    <span className="hidden min-[1360px]:inline">{item.label}</span>
                    <span className="min-[1360px]:hidden">{item.shortLabel}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center shrink-0">
              <button
                type="button"
                onClick={() => handleSwitchPortal('estimator')}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] border border-sky-300/60 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(2,132,199,0.28)] transition-shadow whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.bookWaybillCta}
              </button>
            </div>
          </div>
        </header>

        {/* MAIN PORTAL VIEWPORT */}
        <main className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 pt-28">
          <motion.div
            key={activePortal}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePortal === 'home' && (
              <HomePortal
                theme={theme}
                lang={lang}
                onChangeTheme={setTheme}
                onChangeLang={setLang}
                onNavigatePortal={handleSwitchPortal}
                onQuickTrackWaybill={handleQuickTrackWaybill}
                onBookTransportMode={handleBookTransportMode}
              />
            )}

            {activePortal === 'estimator' && (
              <EstimatorPortal
                initialMode={estimatorMode}
                shipments={shipments}
                onCreateBooking={handleCreateBooking}
                onTrackWaybillOnGlobe={(waybillId) => {
                  handleQuickTrackWaybill(waybillId);
                }}
              />
            )}

            {activePortal === 'globe' && (
              <GlobePortal
                shipments={shipments}
                unlockedWaybillId={clientGlobeWaybillId}
                onUnlockWaybill={(id) => {
                  const matched = handleUnlockWaybill(id);
                  return matched !== null;
                }}
              />
            )}

            {activePortal === 'client' && (
              <ClientPortal
                shipments={shipments}
                unlockedWaybillIds={unlockedWaybillIds}
                messages={messages}
                onSendMessage={handleSendMessage}
                onNavigatePortal={handleSwitchPortal}
              />
            )}

            {activePortal === 'employee' && (
              <EmployeePortal
                shipments={shipments}
                selectedWaybillId={selectedWaybillId}
                staffRoster={staffRoster}
                onSelectWaybill={setSelectedWaybillId}
                onUpdateShipmentCheckpoint={handleUpdateShipmentCheckpoint}
                onTrackOnGlobe={(waybillId) => {
                  setSelectedWaybillId(waybillId);
                }}
              />
            )}

            {activePortal === 'admin' && (
              <AdminPortal
                shipments={shipments}
                selectedWaybillId={selectedWaybillId}
                onSelectWaybill={setSelectedWaybillId}
                vesselFleet={vesselFleet}
                corporateClients={corporateClients}
                staffRoster={staffRoster}
                messages={messages}
                onOverrideShipment={handleAdminOverrideShipment}
                onAssignStaffToWaybill={handleAssignStaffToWaybill}
                onSendDispatchReply={handleSendDispatchReply}
                onTrackOnGlobe={(waybillId) => {
                  setSelectedWaybillId(waybillId);
                }}
              />
            )}

            {activePortal === 'about' && (
              <AboutPortal lang={lang} onNavigatePortal={handleSwitchPortal} />
            )}
          </motion.div>
        </main>

        {/* BABY LIGHT BLUE GLASS FOOTER */}
        <footer className="relative z-10 border-t border-sky-300/80 bg-gradient-to-r from-[#F0F9FF]/95 via-[#DCF0FF]/94 to-[#BAE6FD]/92 text-[#1E3A5F] py-10 mt-12 backdrop-blur-2xl">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#1E3A5F]">
            <div className="flex flex-wrap items-center gap-3">
              <VanguardLogo size="footer" variant="light" />
              <span>· {t.footerTagline}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {portalNavItems.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSwitchPortal(p.id)}
                  className="hover:text-[#0B1B3B] font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
