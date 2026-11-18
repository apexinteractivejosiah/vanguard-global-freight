# Vanguard Global Freight — 24/7 Supply Chain & Telemetry OS

An enterprise, multi-portal international logistics and freight management platform built for sovereign maritime container corridors, priority widebody air charters, cryogenic cold-chain custody, and cross-border bonded drayage.

## Enterprise Portal Architecture

1. **Global Network (`Home`)** — Multi-language (`EN`, `ES`, `FR`, `DE`, `JA`, `ZH`) executive portal with Light/Dark workspace theme switching, fleet allocation cards, 4-stage custody architecture, and regional port authority directories across 148 customs harbors.
2. **Freight Estimator (`Configurator & Waybill Booking`)** — Real-time tariff calculation across `Ocean 40ft High-Cube`, `Priority Air Charter`, `Refrigerated Cold-Chain`, and `Cross-Border Ground`, complete with container volume utilization visualization, client contact validation, and live Waybill issuance.
3. **Live 3D Globe Map (`Orbital Corridor Tracker`)** — Hardware-accelerated 3D Canvas globe featuring real-time UTC Day/Night solar terminator lighting, cosmic starfield, ocean-lane maritime vessel routing (including trans-Pacific Date Line navigation), and great-circle aviation corridors.
4. **Client Shipper Portal** — Privacy-hardened shipper dashboard displaying masked consignment status bars, thermal setpoints, customs bond clearances, and two-way encrypted dispatch messaging without exposing sensitive internal tracking or invoice numbers.
5. **Employee & Courier Terminal** — Dedicated watch-floor terminal for Vessel Captains, Air Loadmasters, Customs Brokers, and Last-Mile Drivers to inspect Waybills, record biometric e-Seal & thermal logs, and advance corridor checkpoints in real time.
6. **24/7 Master Dispatch ERP** — Administrative command center featuring full shipment override controls, fleet telemetry monitors, commercial client CRM, staff roster assignment, two-way dispatch inbox, and an integrated 3D fleet tracking globe.
7. **About Us** — Corporate heritage, four intercontinental dispatch headquarters, operational doctrine, leadership roster, and WCO Tier-1 AEO / EU GDP / IMO 2050 compliance standards.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + PostCSS + Autoprefixer
- **Motion & Icons**: Motion (`motion/react`) + Lucide React

## Local Development & Verification

```bash
# Install dependencies (respects .npmrc legacy-peer-deps=true)
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```

## Production Deployment (Vercel)

This repository includes pre-configured production files for zero-touch Vercel deployment:
- `.npmrc` (`legacy-peer-deps=true`) for predictable dependency resolution.
- `vercel.json` with SPA rewrite rules directing all routes to `/index.html`.
- `vite.config.ts` targeting static output in `dist/`.
