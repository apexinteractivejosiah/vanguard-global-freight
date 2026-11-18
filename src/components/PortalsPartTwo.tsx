import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Anchor,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Compass,
  Globe,
  Lock,
  MessageSquare,
  Navigation,
  PackageCheck,
  Radio,
  Send,
  ShieldCheck,
  Ship,
  Sliders,
  Thermometer,
  Truck,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  CHECKPOINT_ORDER,
  CheckpointName,
  CorporateClient,
  DispatchMessage,
  GLOBAL_PORTS,
  PortalId,
  ShipmentRecord,
  StaffMember,
  StaffRole,
  VesselFleetItem,
} from '../utils/freightEngine';

import { CountryFlag } from './CountryFlag';
import { OrbitalGlobeCanvas } from './OrbitalGlobeCanvas';

const GLASS_CARD = 'glass-blue-window rounded-3xl';
const SUB_GLASS = 'glass-blue-sub rounded-2xl';
const GLASS_INPUT = 'glass-blue-input rounded-xl';

// ============================================================================
// PORTAL 4: CLIENT SHIPPER PORTAL — 4 VERTICAL SECTIONS
// ============================================================================
interface ClientPortalProps {
  shipments: ShipmentRecord[];
  unlockedWaybillIds: string[];
  messages: DispatchMessage[];
  onSendMessage: (msg: Omit<DispatchMessage, 'id' | 'timestamp'>) => void;
  onNavigatePortal: (portal: PortalId) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  shipments,
  unlockedWaybillIds,
  messages,
  onSendMessage,
  onNavigatePortal,
}) => {
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('ALL');
  const [msgWaybillId, setMsgWaybillId] = useState<string>('');
  const [msgText, setMsgText] = useState<string>('');
  const [msgPriority, setMsgPriority] = useState<
    'Standard' | 'Priority Customs' | 'Cold-Chain Advisory'
  >('Priority Customs');

  const uniqueCompanies = Array.from(new Set(shipments.map((s) => s.clientName)));
  const visibleShipments =
    selectedClientFilter === 'ALL'
      ? shipments
      : shipments.filter((s) => s.clientName === selectedClientFilter);

  const totalBookedValueUsd = visibleShipments.reduce(
    (acc, s) => acc + s.quotedTotalUsd,
    0
  );
  const totalCargoWeightKg = visibleShipments.reduce(
    (acc, s) => acc + s.weightKg,
    0
  );

  const handleClientMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedWaybill = msgWaybillId.trim().replace(/^#+/, '').toUpperCase();
    if (!cleanedWaybill || !msgText.trim()) return;
    const targetShipment = shipments.find(
      (s) => s.waybillId.toUpperCase() === cleanedWaybill
    );

    onSendMessage({
      waybillId: cleanedWaybill,
      senderName: targetShipment
        ? `${targetShipment.clientName} (Shipper Desk)`
        : 'Commercial Shipper Desk',
      senderRole: 'Client Shipper',
      message: msgText.trim(),
      priority: msgPriority,
    });
    setMsgText('');
    setMsgWaybillId('');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* SECTION 4A: Corporate Shipper Header & Account Summary */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-6`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Portal 04 · Commercial Shipper & Trade Documentation Desk
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent mt-1">
              Corporate Shipper Command Portal
            </h1>
            <p className="text-sm text-[#1E3A5F] mt-2 max-w-2xl">
              Monitor private corridor status bars, inspect customs bond clearances, and
              message the 24/7 Master Dispatch desk directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Filter by Corporate Shipper Account"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
              className={`${GLASS_INPUT} px-4 py-2.5 text-xs font-semibold shadow-xs`}
            >
              <option value="ALL">All Enterprise Shipper Accounts ({shipments.length})</option>
              {uniqueCompanies.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onNavigatePortal('estimator')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_8px_22px_rgba(2,132,199,0.28)] font-semibold text-xs cursor-pointer whitespace-nowrap"
            >
              + Book New Shipment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className={`${SUB_GLASS} p-5`}
          >
            <div className="text-xs text-[#334155]">Active Waybills in Transit</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] tabular-nums mt-1">
              {visibleShipments.length} Shipments
            </div>
            <div className="text-xs font-semibold text-[#0369A1] mt-1">100% Satellite Telemetry Linked</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className={`${SUB_GLASS} p-5`}
          >
            <div className="text-xs text-[#334155]">Total Contracted Freight Value</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#0369A1] tabular-nums mt-1">
              ${totalBookedValueUsd.toLocaleString()}
            </div>
            <div className="text-xs text-[#334155] mt-1">Lloyd’s All-Risk Underwritten</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className={`${SUB_GLASS} p-5`}
          >
            <div className="text-xs text-[#334155]">Aggregate Manifest Payload</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] tabular-nums mt-1">
              {totalCargoWeightKg.toLocaleString()} kg
            </div>
            <div className="text-xs text-[#334155] mt-1">Verified SOLAS VGM Weight</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className={`${SUB_GLASS} p-5`}
          >
            <div className="text-xs text-[#334155]">Customs EDI Bond Standing</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#1D4ED8] mt-1">
              Tier-1 AEO
            </div>
            <div className="text-xs text-[#334155] mt-1">Zero Hold Priority Corridor</div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4B: Protected Consignment Ledger & Live Visual Status Bars */}
      <section className={`${GLASS_CARD} p-8 space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Protected Consignment Overview & Real-Time Transit Status
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Active Corporate Consignments & Corridor Status Bars
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#1E3A5F] font-medium">
            <Lock className="w-3.5 h-3.5 text-[#0369A1]" />
            <span>Private Waybill & Document numbers hidden for security</span>
          </div>
        </div>

        <div className="space-y-4">
          {visibleShipments.map((shipment) => {
            const isUnlocked = unlockedWaybillIds.includes(shipment.waybillId);
            const stageIndex = CHECKPOINT_ORDER.indexOf(shipment.currentCheckpoint);
            return (
              <div
                key={shipment.waybillId}
                className={`${SUB_GLASS} p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6`}
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0369A1] tabular-nums">
                      <Lock className="w-3 h-3" />
                      {isUnlocked ? shipment.waybillId : 'Private Consignment'}
                    </span>
                    <span className="text-sky-400">·</span>
                    <span className="text-[#0B1B3B] font-semibold">{shipment.clientName}</span>
                    <span className="text-sky-400">·</span>
                    <span className="text-[#1D4ED8] font-semibold">{shipment.mode}</span>
                    <span className="text-sky-400">·</span>
                    <span className="text-[#1E3A5F]">
                      Customs: <strong className="text-[#0B1B3B]">{shipment.customsStatus}</strong>
                    </span>
                  </div>

                  <div className="text-base font-semibold text-[#0B1B3B]">
                    {shipment.commodity}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#1E3A5F] tabular-nums">
                    {(() => {
                      const oPort = GLOBAL_PORTS.find(
                        (p) => p.code === shipment.originPortCode
                      );
                      const dPort = GLOBAL_PORTS.find(
                        (p) => p.code === shipment.destinationPortCode
                      );
                      return (
                        <span className="inline-flex items-center gap-1.5">
                          <span>Route:</span>
                          {oPort && (
                            <CountryFlag
                              countryCode={oPort.countryCode}
                              countryName={oPort.country}
                              size="sm"
                            />
                          )}
                          <strong className="text-[#0B1B3B]">{shipment.originPortCode}</strong>
                          <span>→</span>
                          {dPort && (
                            <CountryFlag
                              countryCode={dPort.countryCode}
                              countryName={dPort.country}
                              size="sm"
                            />
                          )}
                          <strong className="text-[#0B1B3B]">
                            {shipment.destinationPortCode}
                          </strong>
                        </span>
                      );
                    })()}
                    <span>·</span>
                    <span>Temp: {shipment.temperatureC}</span>
                    <span>·</span>
                    <span>ETA: {shipment.etaDate}</span>
                  </div>
                </div>

                {/* Live Visual Status Bar (Replaces Private Invoice & Bill of Lading Numbers) */}
                <div
                  data-testid={`client-status-bar-${shipment.originPortCode}-${shipment.destinationPortCode}`}
                  className="w-full lg:w-[340px] shrink-0 space-y-2.5 bg-white/75 border border-sky-300/75 rounded-2xl p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0369A1]">
                      {shipment.currentCheckpoint}
                    </span>
                    <span className="font-semibold text-[#0B1B3B] tabular-nums">
                      {shipment.progressPct}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-sky-100 overflow-hidden border border-sky-300/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#EF4444] via-[#FACC15] to-[#22C55E] transition-all duration-500"
                      style={{ width: `${shipment.progressPct}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-1 pt-0.5">
                    {CHECKPOINT_ORDER.map((cp, idx) => (
                      <div
                        key={cp}
                        title={cp}
                        className={`h-1 rounded-full ${
                          idx <= stageIndex ? 'bg-[#0284C7]' : 'bg-sky-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4C: Direct 24/7 Master Dispatch Messaging Desk */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleClientMessageSubmit}
          className={`${GLASS_CARD} lg:col-span-5 p-8 space-y-5`}
        >
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Two-Way Encrypted Telemetry Link
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B] mt-1">
              Message 24/7 Master Dispatch Desk
            </h2>
          </div>

          <div>
            <label
              htmlFor="client-msg-waybill"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Reference Waybill ID
            </label>
            <input
              id="client-msg-waybill"
              type="text"
              required
              value={msgWaybillId}
              onChange={(e) => setMsgWaybillId(e.target.value)}
              placeholder="Enter your private Waybill ID manually..."
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            />
          </div>

          <div>
            <label
              htmlFor="client-msg-priority"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Dispatch Routing Priority
            </label>
            <select
              id="client-msg-priority"
              value={msgPriority}
              onChange={(e) =>
                setMsgPriority(
                  e.target.value as
                    | 'Standard'
                    | 'Priority Customs'
                    | 'Cold-Chain Advisory'
                )
              }
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            >
              <option value="Priority Customs">Priority Customs Clearance</option>
              <option value="Cold-Chain Advisory">Cold-Chain Thermal Advisory</option>
              <option value="Standard">Standard Routing Instruction</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="client-msg-input"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Instruction to Master Dispatch Desk
            </label>
            <textarea
              id="client-msg-input"
              rows={3}
              required
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Request berth slot confirmation, customs bond amendment, or consignee handover..."
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_8px_22px_rgba(2,132,199,0.28)] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Transmit to 24/7 Master Dispatch Inbox</span>
          </button>
        </form>

        {/* Live Dispatch Conversation Stream */}
        <div className={`${GLASS_CARD} lg:col-span-7 p-8 space-y-5`}>
          <div className="flex items-center justify-between">
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Live Shipper ↔ Master Dispatch Feed ({messages.length})
            </h2>
            <span className="text-xs font-semibold text-[#0369A1]">Synced with Portal 06 ERP</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {messages.map((m) => {
              const showId = unlockedWaybillIds.includes(m.waybillId);
              return (
                <div
                  key={m.id}
                  className={`${SUB_GLASS} p-4 space-y-1.5`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0369A1] tabular-nums">
                        {showId ? m.waybillId : 'Protected Waybill'}
                      </span>
                      <span className="text-sky-400">·</span>
                      <span className="font-semibold text-[#0B1B3B]">{m.senderName}</span>
                      <span className="text-sky-400">·</span>
                      <span className="text-[#1D4ED8] font-semibold">{m.priority}</span>
                    </div>
                    <span className="text-[#334155] tabular-nums">{m.timestamp}</span>
                  </div>
                  <p className="text-sm text-[#1E3A5F] leading-relaxed">{m.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4D: Customs & Cold-Chain Compliance Assurance Matrix */}
      <section className={`${GLASS_CARD} p-8 space-y-4`}>
        <h2 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B]">
          Customs Brokerage & Cold-Chain Audit Compliance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className={`${SUB_GLASS} p-5 space-y-1.5`}>
            <div className="font-semibold text-[#0369A1]">
              WCO Authorized Economic Operator (AEO)
            </div>
            <p className="text-[#1E3A5F] text-xs leading-relaxed">
              Pre-arrival electronic declarations eliminate port inspection delays across
              Rotterdam, Singapore, Los Angeles, and Jebel Ali.
            </p>
          </div>
          <div className={`${SUB_GLASS} p-5 space-y-1.5`}>
            <div className="font-semibold text-[#1D4ED8]">
              21 CFR Part 11 Thermal Telemetry
            </div>
            <p className="text-[#1E3A5F] text-xs leading-relaxed">
              Every cryogenic and refrigerated reefer container logs tamper-evident
              temperature and e-Seal signatures at 60-second intervals.
            </p>
          </div>
          <div className={`${SUB_GLASS} p-5 space-y-1.5`}>
            <div className="font-semibold text-[#0B1B3B]">
              Direct Berth-to-Rail Intermodal Bond
            </div>
            <p className="text-[#1E3A5F] text-xs leading-relaxed">
              Containers transition under single sovereign customs bond from deepwater
              gantry cranes directly onto inland heavy ground relays.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// PORTAL 5: EMPLOYEE & COURIER TERMINAL — 4 VERTICAL SECTIONS
// ============================================================================
interface EmployeePortalProps {
  shipments: ShipmentRecord[];
  selectedWaybillId: string;
  staffRoster: StaffMember[];
  onSelectWaybill: (waybillId: string) => void;
  onUpdateShipmentCheckpoint: (params: {
    waybillId: string;
    checkpoint: CheckpointName;
    role: StaffRole;
    authorName: string;
    temperatureC: string;
    securitySeal: string;
    fieldNote: string;
  }) => void;
  onTrackOnGlobe: (waybillId: string) => void;
}

export const EmployeePortal: React.FC<EmployeePortalProps> = ({
  shipments,
  selectedWaybillId,
  staffRoster,
  onSelectWaybill,
  onUpdateShipmentCheckpoint,
}) => {
  const [activeRole, setActiveRole] = useState<StaffRole>('Vessel Captain');

  const currentShipment =
    shipments.find((s) => s.waybillId === selectedWaybillId) || shipments[0];

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointName>(
    currentShipment.currentCheckpoint
  );
  const [tempInput, setTempInput] = useState<string>(currentShipment.temperatureC);
  const [sealInput, setSealInput] = useState<string>(currentShipment.securitySeal);
  const [noteInput, setNoteInput] = useState<string>(
    'Telemetry verified nominal on watch. Container seal intact and customs EDI token confirmed.'
  );
  const [updateBanner, setUpdateBanner] = useState<string>('');

  const handleSelectShipmentChange = (newId: string) => {
    onSelectWaybill(newId);
    const found = shipments.find((s) => s.waybillId === newId);
    if (found) {
      setSelectedCheckpoint(found.currentCheckpoint);
      setTempInput(found.temperatureC);
      setSealInput(found.securitySeal);
    }
  };

  const activeStaffForRole =
    staffRoster.find((st) => st.role === activeRole) || staffRoster[0];

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShipmentCheckpoint({
      waybillId: currentShipment.waybillId,
      checkpoint: selectedCheckpoint,
      role: activeRole,
      authorName: activeStaffForRole.name,
      temperatureC: tempInput.trim() || currentShipment.temperatureC,
      securitySeal: sealInput.trim() || currentShipment.securitySeal,
      fieldNote:
        noteInput.trim() ||
        `Checkpoint updated to ${selectedCheckpoint} by ${activeStaffForRole.name}.`,
    });
    setUpdateBanner(
      `Synced! ${currentShipment.waybillId} moved to "${selectedCheckpoint}" — 3D Globe Pin & 24/7 Master ERP updated immediately.`
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* SECTION 5A: Role Switcher Header */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-6`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Portal 05 · Field Operations & Satellite Uplink Terminal
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent mt-1">
              Fleet Captain & Courier Terminal
            </h1>
            <p className="text-sm text-[#1E3A5F] mt-2 max-w-2xl">
              Switch operational duty role, select an active Waybill, advance its GPS
              checkpoint, and log container thermal & e-Seal readings. Updates propagate
              instantly to the 3D Globe and Master ERP.
            </p>
          </div>
          <div className="text-xs text-[#0369A1] font-medium tabular-nums">
            Active Officer: <strong className="text-[#0B1B3B]">{activeStaffForRole.name}</strong> (
            {activeStaffForRole.licenseCode})
          </div>
        </div>

        {/* 4 Role Switcher Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            [
              {
                role: 'Vessel Captain' as StaffRole,
                desc: 'Bridge AIS & Maritime Corridor Watch',
              },
              {
                role: 'Air Loadmaster' as StaffRole,
                desc: 'Boeing 777F Main-Deck Weight & Cryo Lock',
              },
              {
                role: 'Customs Broker' as StaffRole,
                desc: 'Port EDI Pre-Clearance & Bond Release',
              },
              {
                role: 'Last-Mile Driver' as StaffRole,
                desc: 'Bonded Heavy Ground Drayage & Handover',
              },
            ] as const
          ).map((item) => {
            const isSelected = activeRole === item.role;
            return (
              <button
                key={item.role}
                type="button"
                onClick={() => setActiveRole(item.role)}
                className={`p-5 rounded-2xl text-left transition-shadow cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] border-sky-300/70 text-white shadow-[0_8px_22px_rgba(2,132,199,0.28)]'
                    : 'glass-blue-sub text-[#0B1B3B] hover:border-sky-400/80'
                }`}
              >
                <div className={`text-xs font-semibold ${isSelected ? 'text-[#E0F2FE]' : 'text-[#0369A1]'}`}>
                  Duty Terminal
                </div>
                <div className={`text-base font-semibold mt-1 ${isSelected ? 'text-white' : 'text-[#0B1B3B]'}`}>
                  {item.role}
                </div>
                <div className={`text-xs mt-1 ${isSelected ? 'text-sky-100' : 'text-[#1E3A5F]'}`}>
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 5B: Live Waybill Checkpoint Updater + Thermal/Seal Logger */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleTerminalSubmit}
          className={`${GLASS_CARD} lg:col-span-7 p-8 space-y-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Update GPS Checkpoint & Container Telemetry
            </h2>
            <span className="text-xs font-semibold text-[#0369A1]">
              Role: {activeRole}
            </span>
          </div>

          {/* Select Active Waybill ID */}
          <div>
            <label
              htmlFor="employee-waybill-select"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Select Active Waybill ID to Update
            </label>
            <select
              id="employee-waybill-select"
              value={currentShipment.waybillId}
              onChange={(e) => handleSelectShipmentChange(e.target.value)}
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            >
              {shipments.map((s) => (
                <option key={s.waybillId} value={s.waybillId}>
                  {s.waybillId} — {s.clientName} ({s.originPortCode} →{' '}
                  {s.destinationPortCode}) [{s.currentCheckpoint}]
                </option>
              ))}
            </select>
          </div>

          {/* 6 GPS Checkpoint Selector Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#0B1B3B]">
              Select New GPS Corridor Checkpoint (Moves 3D Globe Vessel Pin)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CHECKPOINT_ORDER.map((cp, idx) => {
                const active = selectedCheckpoint === cp;
                return (
                  <button
                    key={cp}
                    type="button"
                    onClick={() => setSelectedCheckpoint(cp)}
                    className={`p-3.5 rounded-xl text-left border transition-shadow cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white border-sky-300/70 font-semibold shadow-[0_6px_16px_rgba(2,132,199,0.28)]'
                        : 'glass-blue-sub text-[#0B1B3B] hover:border-sky-400/75'
                    }`}
                  >
                    <div className={`text-[11px] tabular-nums ${active ? 'text-sky-100' : 'text-[#0369A1] font-medium'}`}>
                      Stage 0{idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold mt-0.5">{cp}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temperature & Security Seal Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="employee-temp-input"
                className="block text-xs font-semibold text-[#0B1B3B] mb-2"
              >
                Internal Container Temperature Log
              </label>
              <input
                id="employee-temp-input"
                type="text"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
              />
            </div>
            <div>
              <label
                htmlFor="employee-seal-input"
                className="block text-xs font-semibold text-[#0B1B3B] mb-2"
              >
                ISO Biometric Security e-Seal ID
              </label>
              <input
                id="employee-seal-input"
                type="text"
                value={sealInput}
                onChange={(e) => setSealInput(e.target.value)}
                className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
              />
            </div>
          </div>

          {/* Field Notes */}
          <div>
            <label
              htmlFor="employee-note-input"
              className="block text-xs font-semibold text-[#0B1B3B] mb-2"
            >
              Live Field Telemetry & Inspection Note
            </label>
            <textarea
              id="employee-note-input"
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className={`${GLASS_INPUT} w-full px-4 py-3 text-sm`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_10px_24px_rgba(2,132,199,0.28)] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Transmit Checkpoint & Sync to 3D Globe + Master ERP</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {updateBanner && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-400/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#15803D]">{updateBanner}</span>
            </div>
          )}
        </form>

        {/* Live Telemetry Snapshot for Selected Waybill */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`${GLASS_CARD} p-8 space-y-5`}>
            <div className="text-xs font-semibold text-[#0369A1]">
              Live Satellite Transponder Readout
            </div>
            <h3 className="font-editorial italic font-semibold text-3xl text-[#0B1B3B] tabular-nums">
              {currentShipment.waybillId} Status
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-sky-300/55">
                <span className="text-[#334155]">Trade Corridor</span>
                {(() => {
                  const oPort = GLOBAL_PORTS.find(
                    (p) => p.code === currentShipment.originPortCode
                  );
                  const dPort = GLOBAL_PORTS.find(
                    (p) => p.code === currentShipment.destinationPortCode
                  );
                  return (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B1B3B]">
                      {oPort && (
                        <CountryFlag
                          countryCode={oPort.countryCode}
                          countryName={oPort.country}
                          size="sm"
                        />
                      )}
                      <span>{currentShipment.originPortCode}</span>
                      <span className="text-[#0369A1]">→</span>
                      {dPort && (
                        <CountryFlag
                          countryCode={dPort.countryCode}
                          countryName={dPort.country}
                          size="sm"
                        />
                      )}
                      <span>{currentShipment.destinationPortCode}</span>
                    </span>
                  );
                })()}
              </div>
              <div className="flex justify-between py-2 border-b border-sky-300/55">
                <span className="text-[#334155]">Current Checkpoint</span>
                <span className="font-semibold text-[#0369A1]">
                  {currentShipment.currentCheckpoint} ({currentShipment.progressPct}%)
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-300/55">
                <span className="text-[#334155]">Orbital Coordinates</span>
                <span className="font-semibold text-[#1D4ED8] tabular-nums">
                  {currentShipment.currentLat.toFixed(3)}° N,{' '}
                  {currentShipment.currentLng.toFixed(3)}° E
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-300/55">
                <span className="text-[#334155]">Vessel / Callsign</span>
                <span className="font-semibold text-[#0B1B3B]">
                  {currentShipment.vesselOrFlightName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-300/55">
                <span className="text-[#334155]">Thermal & e-Seal</span>
                <span className="font-semibold text-[#0B1B3B] tabular-nums">
                  {currentShipment.temperatureC} · {currentShipment.securitySeal}
                </span>
              </div>
            </div>

            <div className="text-xs font-semibold text-[#0369A1] pt-2 border-t border-sky-300/55">
              Synced live with Crew Terminal 3D Tracking Globe below
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5B-2: Dedicated Crew Terminal Live 3D Tracking Globe */}
      <section className={`${GLASS_CARD} p-6 sm:p-8 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Crew Tactical Navigation & Fleet Waybill Tracker
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Crew Terminal 3D Orbital Tracking Globe
            </h2>
          </div>
          <div className="text-xs font-semibold text-[#1E3A5F]">
            Authorized Officer Access · All Fleet Waybill IDs Active
          </div>
        </div>
        <OrbitalGlobeCanvas
          activeShipment={currentShipment}
          allShipments={shipments}
          onSelectWaybill={handleSelectShipmentChange}
          allowFleetSwitcher={true}
        />
      </section>

      {/* SECTION 5C: Recent Crew & Terminal Field Log Stream */}
      <section className={`${GLASS_CARD} p-8 space-y-5`}>
        <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
          Logged Field Transmissions for {currentShipment.waybillId}
        </h2>
        <div className="space-y-3">
          {currentShipment.fieldLogs.map((log) => (
            <div
              key={log.id}
              className={`${SUB_GLASS} p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div>
                <div className="text-xs text-[#0369A1] font-semibold">
                  {log.author} ({log.role}) · Stage: {log.checkpoint}
                </div>
                <p className="text-sm text-[#1E3A5F] mt-1">{log.note}</p>
              </div>
              <div className="text-xs text-[#334155] tabular-nums shrink-0 sm:text-right">
                <div className="text-[#0B1B3B] font-semibold">
                  {log.temperatureC} · {log.sealNumber}
                </div>
                <div>{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5D: Active Watch Duty Roster */}
      <section className={`${GLASS_CARD} p-8 space-y-5`}>
        <h2 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B]">
          Global Watch Roster & SATCOM Channels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffRoster.map((member) => (
            <div
              key={member.id}
              className={`${SUB_GLASS} p-5 space-y-2`}
            >
              <div className="text-xs text-[#0369A1] font-semibold">{member.role}</div>
              <div className="text-base font-semibold text-[#0B1B3B]">{member.name}</div>
              <div className="text-xs text-[#334155] tabular-nums">
                License: {member.licenseCode}
              </div>
              <div className="text-xs text-[#1D4ED8] font-semibold tabular-nums">
                Assigned Waybill: {member.currentAssignmentWaybill}
              </div>
              <div className="text-[11px] text-[#334155] pt-2 border-t border-sky-300/55">
                {member.contactChannel}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// PORTAL 6: 24/7 MASTER DISPATCH ERP — 5 SYNCED MODULES & 4 VERTICAL SECTIONS
// ============================================================================
type AdminTabId = 'shipments' | 'fleet' | 'crm' | 'roster' | 'inbox';

interface AdminPortalProps {
  shipments: ShipmentRecord[];
  selectedWaybillId: string;
  onSelectWaybill: (waybillId: string) => void;
  vesselFleet: VesselFleetItem[];
  corporateClients: CorporateClient[];
  staffRoster: StaffMember[];
  messages: DispatchMessage[];
  onOverrideShipment: (
    waybillId: string,
    updates: {
      checkpoint?: CheckpointName;
      etaDate?: string;
      originPortCode?: string;
      destinationPortCode?: string;
      customsStatus?: ShipmentRecord['customsStatus'];
      assignedStaffName?: string;
    }
  ) => void;
  onAssignStaffToWaybill: (staffId: string, waybillId: string) => void;
  onSendDispatchReply: (waybillId: string, replyText: string) => void;
  onTrackOnGlobe: (waybillId: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  shipments,
  selectedWaybillId,
  onSelectWaybill,
  vesselFleet,
  corporateClients,
  staffRoster,
  messages,
  onOverrideShipment,
  onAssignStaffToWaybill,
  onSendDispatchReply,
  onTrackOnGlobe,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabId>('shipments');
  const activeGlobeShipment =
    shipments.find((s) => s.waybillId === selectedWaybillId) || shipments[0];
  const [replyWaybillId, setReplyWaybillId] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');

  const totalRevenueUsd = shipments.reduce((sum, s) => sum + s.quotedTotalUsd, 0);

  const handleDispatchReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedWaybill = replyWaybillId.trim().replace(/^#+/, '').toUpperCase();
    if (!cleanedWaybill || !replyText.trim()) return;
    onSendDispatchReply(cleanedWaybill, replyText.trim());
    setReplyText('');
    setReplyWaybillId('');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* SECTION 6A: Master ERP Command Header & Real-Time KPI Strip */}
      <section className={`${GLASS_CARD} p-8 lg:p-10 space-y-6`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Portal 06 · Sovereign Global Supply Chain Command Center
            </div>
            <h1 className="font-editorial italic font-semibold text-3xl sm:text-5xl bg-gradient-to-r from-[#0B1B3B] via-[#1D4ED8] to-[#0284C7] bg-clip-text text-transparent mt-1">
              24/7 Master Dispatch ERP
            </h1>
            <p className="text-sm text-[#1E3A5F] mt-2 max-w-2xl">
              Full administrative override across all active Waybills, vessel corridors,
              corporate client credit lines, captain rosters, and two-way dispatch
              communications.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#334155]">Active Network Freight Ledger</div>
            <div className="font-editorial italic font-semibold text-3xl text-[#0369A1] tabular-nums">
              ${totalRevenueUsd.toLocaleString()} USD
            </div>
          </div>
        </div>

        {/* 5 Synced ERP Module Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-sky-300/55">
          {(
            [
              { id: 'shipments' as AdminTabId, label: `All Active Shipments (${shipments.length})` },
              { id: 'fleet' as AdminTabId, label: `Global Vessel Fleet (${vesselFleet.length})` },
              { id: 'crm' as AdminTabId, label: `Commercial Client CRM (${corporateClients.length})` },
              { id: 'roster' as AdminTabId, label: `Captains & Couriers Roster (${staffRoster.length})` },
              { id: 'inbox' as AdminTabId, label: `24/7 Dispatch Inbox (${messages.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-shadow cursor-pointer whitespace-nowrap border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] text-white border-sky-300/60 shadow-[0_6px_16px_rgba(2,132,199,0.28)]'
                  : 'bg-white/75 text-[#0B1B3B] hover:bg-white border-sky-300/75'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 6B-0: Dedicated 24/7 Master Dispatch ERP Live 3D Tracking Globe */}
      <section className={`${GLASS_CARD} p-6 sm:p-8 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#0369A1]">
              Sovereign Master Command · Real-Time Fleet Tracking Globe
            </div>
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              24/7 Master ERP 3D Orbital Globe Monitor
            </h2>
          </div>
          <div className="text-xs font-semibold text-[#1E3A5F]">
            Master Override Sync · Select Any Active Waybill ID
          </div>
        </div>
        <OrbitalGlobeCanvas
          activeShipment={activeGlobeShipment}
          allShipments={shipments}
          onSelectWaybill={onSelectWaybill}
          allowFleetSwitcher={true}
        />
      </section>

      {/* SECTION 6B: Active ERP Module Viewport */}
      <section className={`${GLASS_CARD} p-8 space-y-6`}>
        {activeTab === 'shipments' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
                Module 1 · All Active Shipments (24/7 Status, ETA & Route Override)
              </h2>
              <p className="text-xs text-[#334155] mt-1">
                Overriding any checkpoint or route below immediately updates the 3D Globe
                Map and Client Shipper Portal.
              </p>
            </div>

            <div className="space-y-4">
              {shipments.map((s) => (
                <div
                  key={s.waybillId}
                  className={`${SUB_GLASS} p-6 space-y-4`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-[#0369A1] tabular-nums">
                          {s.waybillId}
                        </span>
                        <span className="text-sky-400">·</span>
                        <span className="text-[#0B1B3B] font-semibold">{s.clientName}</span>
                        <span className="text-sky-400">·</span>
                        {(() => {
                          const oPort = GLOBAL_PORTS.find((p) => p.code === s.originPortCode);
                          const dPort = GLOBAL_PORTS.find(
                            (p) => p.code === s.destinationPortCode
                          );
                          return (
                            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B1B3B]">
                              {oPort && (
                                <CountryFlag
                                  countryCode={oPort.countryCode}
                                  countryName={oPort.country}
                                  size="sm"
                                />
                              )}
                              <span>{s.originPortCode}</span>
                              <span className="text-[#0369A1]">→</span>
                              {dPort && (
                                <CountryFlag
                                  countryCode={dPort.countryCode}
                                  countryName={dPort.country}
                                  size="sm"
                                />
                              )}
                              <span>{s.destinationPortCode}</span>
                            </span>
                          );
                        })()}
                        <span className="text-sky-400">·</span>
                        <span className="text-[#1D4ED8] font-semibold">{s.mode}</span>
                        <span className="text-sky-400">·</span>
                        <span className="text-[#1E3A5F] tabular-nums">
                          Lat {s.currentLat.toFixed(2)}° / Lng {s.currentLng.toFixed(2)}°
                        </span>
                      </div>
                      <div className="text-sm font-medium text-[#1E3A5F] mt-1">
                        {s.commodity} · Assigned: {s.assignedStaffName}
                      </div>
                      {s.contactPerson && (
                        <div className="text-xs text-[#0369A1] font-medium mt-1">
                          Client Contact: {s.contactPerson} · {s.contactNumber} · {s.companyEmail}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onTrackOnGlobe(s.waybillId)}
                      className="px-4 py-2 rounded-xl bg-white/75 hover:bg-white border border-sky-300/75 text-xs font-semibold text-[#0B1B3B] transition-shadow cursor-pointer whitespace-nowrap self-start lg:self-auto shadow-xs"
                    >
                      Inspect on 3D Globe
                    </button>
                  </div>

                  {/* Direct Override Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-sky-300/55 text-xs">
                    <div>
                      <label className="block text-[#0B1B3B] font-semibold mb-1">
                        Override Checkpoint (24/7)
                      </label>
                      <select
                        aria-label={`Override Checkpoint for ${s.waybillId}`}
                        value={s.currentCheckpoint}
                        onChange={(e) =>
                          onOverrideShipment(s.waybillId, {
                            checkpoint: e.target.value as CheckpointName,
                          })
                        }
                        className={`${GLASS_INPUT} w-full px-3 py-2 rounded-lg`}
                      >
                        {CHECKPOINT_ORDER.map((cp) => (
                          <option key={cp} value={cp}>
                            {cp}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#0B1B3B] font-semibold mb-1">
                        Reassign Destination Port
                      </label>
                      <select
                        aria-label={`Reassign Destination Port for ${s.waybillId}`}
                        value={s.destinationPortCode}
                        onChange={(e) =>
                          onOverrideShipment(s.waybillId, {
                            destinationPortCode: e.target.value,
                          })
                        }
                        className={`${GLASS_INPUT} w-full px-3 py-2 rounded-lg`}
                      >
                        {GLOBAL_PORTS.map((port) => (
                          <option key={port.code} value={port.code}>
                            {port.code} — {port.country} ({port.portArea})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#0B1B3B] font-semibold mb-1">
                        Customs Clearance Status
                      </label>
                      <select
                        aria-label={`Customs Status for ${s.waybillId}`}
                        value={s.customsStatus}
                        onChange={(e) =>
                          onOverrideShipment(s.waybillId, {
                            customsStatus: e.target.value as ShipmentRecord['customsStatus'],
                          })
                        }
                        className={`${GLASS_INPUT} w-full px-3 py-2 rounded-lg`}
                      >
                        <option value="Pre-Cleared">Pre-Cleared</option>
                        <option value="Bonded Inspection">Bonded Inspection</option>
                        <option value="Export Verified">Export Verified</option>
                        <option value="Released">Released</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#0B1B3B] font-semibold mb-1">Edit Target ETA</label>
                      <input
                        type="text"
                        aria-label={`Edit ETA for ${s.waybillId}`}
                        value={s.etaDate}
                        onChange={(e) =>
                          onOverrideShipment(s.waybillId, { etaDate: e.target.value })
                        }
                        className={`${GLASS_INPUT} w-full px-3 py-2 rounded-lg tabular-nums`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Module 2 · Global Vessel & Widebody Air Fleet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vesselFleet.map((v) => (
                <div
                  key={v.id}
                  className={`${SUB_GLASS} p-6 space-y-3`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0369A1] font-semibold">{v.type}</span>
                    <span className="text-[#1D4ED8] font-semibold tabular-nums">{v.imoNumber}</span>
                  </div>
                  <div className="text-xl font-semibold text-[#0B1B3B]">{v.name}</div>
                  <div className="text-xs text-[#1E3A5F]">
                    Corridor: <strong className="text-[#0B1B3B]">{v.corridor}</strong> · Commander:{' '}
                    {v.captainOrCommander}
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-sky-300/55 text-xs tabular-nums">
                    <div>
                      <div className="text-[#334155]">Speed</div>
                      <div className="text-[#0B1B3B] font-semibold mt-0.5">
                        {v.speedKnotsOrMach}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#334155]">Utilization</div>
                      <div className="text-[#0369A1] font-semibold mt-0.5">
                        {v.capacityUtilizationPct}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[#334155]">Active Waybills</div>
                      <div className="text-[#0B1B3B] font-semibold mt-0.5">
                        {v.activeWaybillsCount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="space-y-6">
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Module 3 · Commercial Client CRM & Customs Bonds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {corporateClients.map((client) => (
                <div
                  key={client.id}
                  className={`${SUB_GLASS} p-6 space-y-3`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0369A1] font-semibold">{client.tier}</span>
                    <span className="text-[#334155] tabular-nums">
                      Account: {client.accountCode}
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-[#0B1B3B]">
                    {client.companyName}
                  </div>
                  <div className="text-xs text-[#1E3A5F]">
                    {client.primaryContact} · {client.contactEmail}
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-sky-300/55 text-xs tabular-nums">
                    <div>
                      <div className="text-[#334155]">Annual Volume</div>
                      <div className="text-[#0B1B3B] font-semibold mt-0.5">
                        {client.annualVolumeTeu.toLocaleString()} TEU
                      </div>
                    </div>
                    <div>
                      <div className="text-[#334155]">Customs Bond</div>
                      <div className="text-[#1D4ED8] font-semibold mt-0.5">
                        {client.customsBondNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#334155]">Credit Line</div>
                      <div className="text-[#0369A1] font-semibold mt-0.5">
                        ${(client.creditLineUsd / 1000000).toFixed(1)}M USD
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roster' && (
          <div className="space-y-6">
            <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
              Module 4 · Captains & Couriers Roster (Assign Staff to Waybills)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staffRoster.map((staff) => (
                <div
                  key={staff.id}
                  className={`${SUB_GLASS} p-6 space-y-4`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0369A1] font-semibold">{staff.role}</span>
                    <span className="text-[#1D4ED8] font-semibold tabular-nums">{staff.licenseCode}</span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#0B1B3B]">{staff.name}</div>
                    <div className="text-xs text-[#334155] mt-0.5">
                      {staff.hubLocation} · {staff.contactChannel}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sky-300/55 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-[#0B1B3B] font-semibold">Assigned Waybill Command:</span>
                    <select
                      aria-label={`Assign Waybill to ${staff.name}`}
                      value={staff.currentAssignmentWaybill}
                      onChange={(e) => onAssignStaffToWaybill(staff.id, e.target.value)}
                      className={`${GLASS_INPUT} px-3 py-2 rounded-lg font-medium`}
                    >
                      {shipments.map((s) => (
                        <option key={s.waybillId} value={s.waybillId}>
                          {s.waybillId} — {s.clientName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleDispatchReplySubmit}
              className={`${SUB_GLASS} lg:col-span-5 space-y-4 p-6`}
            >
              <h3 className="font-editorial italic font-semibold text-2xl text-[#0B1B3B]">
                Module 5 · Issue Master Dispatch Directive
              </h3>
              <div>
                <label
                  htmlFor="admin-reply-waybill"
                  className="block text-xs font-semibold text-[#0B1B3B] mb-1.5"
                >
                  Target Waybill ID
                </label>
                <input
                  id="admin-reply-waybill"
                  type="text"
                  required
                  value={replyWaybillId}
                  onChange={(e) => setReplyWaybillId(e.target.value)}
                  placeholder="Type Waybill ID manually (e.g. VGF-8841)"
                  className={`${GLASS_INPUT} w-full px-3.5 py-2.5 text-xs`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0B1B3B] mb-1.5">
                  Official Dispatch Response (Synced with Client Portal)
                </label>
                <textarea
                  rows={3}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter berth confirmation, customs clearance token, or routing update..."
                  className={`${GLASS_INPUT} w-full px-3.5 py-2.5 text-xs`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 shadow-[0_6px_18px_rgba(2,132,199,0.28)] font-semibold text-xs cursor-pointer"
              >
                Broadcast Directive to Shipper & Crew
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`${SUB_GLASS} p-4 space-y-1`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0369A1] tabular-nums">
                      {m.waybillId} · {m.senderName}
                    </span>
                    <span className="text-[#334155] tabular-nums">{m.timestamp}</span>
                  </div>
                  <p className="text-sm text-[#1E3A5F]">{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6C: Global Port Gantry & Corridor Capacity Utilization */}
      <section className={`${GLASS_CARD} p-8 space-y-5`}>
        <h2 className="font-editorial italic font-semibold text-2xl sm:text-3xl text-[#0B1B3B]">
          International Harbor Berth & Customs EDI Telemetry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GLOBAL_PORTS.slice(0, 8).map((port) => (
            <div
              key={port.code}
              className={`${SUB_GLASS} p-5 space-y-2`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CountryFlag countryCode={port.countryCode} countryName={port.country} size="sm" />
                  <span className="font-semibold text-[#0369A1] tabular-nums">
                    {port.code}
                  </span>
                </div>
                <span className="text-[#1D4ED8] font-semibold tabular-nums">
                  {port.customsClearanceHours}h EDI Release
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0B1B3B]">{port.name}</div>
              <div className="text-[11px] font-semibold text-[#0369A1]">{port.portArea}</div>
              <div className="text-xs text-[#334155] tabular-nums">
                {port.berths} Deepwater Berths · {port.avgDraftMeters}m Max Draft
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6D: 24/7 Sovereign Watch Security Protocol */}
      <section className={`${GLASS_CARD} p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <div className="text-xs font-semibold text-[#0369A1]">
            Continuous Multi-Portal State Synchronization
          </div>
          <div className="text-base font-semibold text-[#0B1B3B] mt-0.5">
            All changes executed in Master Dispatch ERP propagate in real time to Client,
            Crew, and 3D Orbital Globe portals.
          </div>
        </div>
        <button
          type="button"
          onClick={() => onTrackOnGlobe(shipments[0]?.waybillId || 'VGF-8841')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#1D4ED8] hover:from-[#38BDF8] hover:to-[#1E40AF] text-white border border-sky-300/60 text-xs font-semibold cursor-pointer whitespace-nowrap shadow-[0_6px_16px_rgba(2,132,199,0.28)]"
        >
          Open Live 3D Globe Map
        </button>
      </section>
    </div>
  );
};
