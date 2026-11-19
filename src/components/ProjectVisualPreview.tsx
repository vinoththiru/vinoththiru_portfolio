import {
  BarChart3,
  Car,
  Database,
  FileSpreadsheet,
  FileText,
  Lock,
  Package,
  Presentation,
  Radio,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { ProjectVisualType } from '../types/portfolio';

interface ProjectVisualPreviewProps {
  type: ProjectVisualType;
  compact?: boolean;
}

export function ProjectVisualPreview({
  type,
  compact = false,
}: ProjectVisualPreviewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-burgundy/15 bg-burgundy-deep text-ivory ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
      role="img"
      aria-label={`Illustrative system interface preview for ${type.replace(/-/g, ' ')}`}
    >
      {/* Subtle architectural grid */}
      <div className="hero-grid-pattern pointer-events-none absolute inset-0 opacity-60" />

      {/* Top Window Chrome + Explicit Illustrative Label */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-ivory/15 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold/80" />
          <span className="h-2 w-2 rounded-full bg-ivory/35" />
          <span className="h-2 w-2 rounded-full bg-ivory/20" />
        </div>
        <span className="rounded-full border border-gold/40 bg-burgundy/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
          Illustrative Preview
        </span>
      </div>

      {/* Type-Specific Visual */}
      <div className="relative z-10 mt-4">
        {type === 'procurement-erp' && <ProcurementErpMockup compact={compact} />}
        {type === 'ai-report-automation' && <AiReportMockup />}
        {type === 'scaffolding-erp' && <ScaffoldingErpMockup />}
        {type === 'smart-parking' && <SmartParkingMockup />}
      </div>
    </div>
  );
}

function ProcurementErpMockup({ compact }: { compact: boolean }) {
  const sampleOrders = [
    { id: 'PO-2026-014', vendor: 'Apex Materials (Sample)', status: 'Approved', module: 'PO' },
    { id: 'QT-2026-039', vendor: 'Vertex Supplies (Sample)', status: 'Quoted', module: 'Quote' },
    { id: 'INV-882', vendor: 'Warehouse Stock Entry', status: 'Synced', module: 'Stock' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            /admin/purchase-orders
          </p>
          <p className="font-heading text-sm font-semibold text-ivory">
            Procurement &amp; Purchase Management Mini ERP
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-ivory/20 bg-white/10 px-2 py-1 font-mono text-[10px] text-ivory/90">
          <Lock className="h-3 w-3 text-gold" />
          Auth Protected
        </span>
      </div>

      {/* Module Strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: FileText, label: 'Purchase Orders' },
          { icon: Users, label: 'Vendors & Quotes' },
          { icon: BarChart3, label: 'Inventory & Reports' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="rounded-lg border border-ivory/15 bg-white/5 px-2.5 py-2"
          >
            <Icon className="h-3.5 w-3.5 text-gold" />
            <p className="mt-1 truncate font-mono text-[10px] text-ivory/85">{label}</p>
          </div>
        ))}
      </div>

      {/* Sanitized Dummy Rows */}
      <div className="rounded-lg border border-ivory/15 bg-charcoal/55 p-2.5">
        <div className="flex items-center justify-between border-b border-ivory/10 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-ivory/60">
          <span>Ref ID</span>
          <span>Sanitized Sample Workflow</span>
          <span>State</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {sampleOrders.slice(0, compact ? 2 : 3).map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-2 rounded bg-white/5 px-2 py-1.5 font-mono text-[11px]"
            >
              <span className="text-gold">{row.id}</span>
              <span className="truncate text-ivory/80">{row.vendor}</span>
              <span className="shrink-0 rounded bg-burgundy px-1.5 py-0.5 text-[10px] text-ivory">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Stack Footer */}
      <div className="flex items-center justify-between font-mono text-[10px] text-ivory/70">
        <span>React.js UI</span>
        <span className="text-gold">&rarr;</span>
        <span>FastAPI REST</span>
        <span className="text-gold">&rarr;</span>
        <span>PostgreSQL</span>
      </div>
    </div>
  );
}

function AiReportMockup() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 items-center gap-2">
        <div className="rounded-lg border border-ivory/15 bg-white/5 p-3 text-center">
          <FileSpreadsheet className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-1.5 font-mono text-[10px] text-ivory">Excel Input</p>
          <p className="font-mono text-[9px] text-ivory/60">.xlsx Sheets</p>
        </div>
        <div className="rounded-lg border border-gold/40 bg-burgundy p-3 text-center">
          <Database className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-1.5 font-mono text-[10px] text-ivory">Pandas + SQL</p>
          <p className="font-mono text-[9px] text-gold/90">Auto Logic</p>
        </div>
        <div className="rounded-lg border border-ivory/15 bg-white/5 p-3 text-center">
          <Presentation className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-1.5 font-mono text-[10px] text-ivory">PPTX Output</p>
          <p className="font-mono text-[9px] text-ivory/60">Deck Ready</p>
        </div>
      </div>

      <div className="rounded-lg border border-ivory/15 bg-charcoal/55 p-3 font-mono text-[11px] text-ivory/85">
        <div className="flex items-center justify-between text-[10px] text-gold">
          <span>POST /api/reports/generate</span>
          <span>FastAPI + React Admin</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-gold" />
        </div>
        <p className="mt-2 text-[10px] text-ivory/70">
          Automated calculation &amp; slide mapping pipeline
        </p>
      </div>
    </div>
  );
}

function ScaffoldingErpMockup() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Package, title: 'Inventory Module', meta: 'Asset Stock & Allocation' },
          { icon: Users, title: 'CRM & Projects', meta: 'Client & Site Mapping' },
          { icon: ShieldCheck, title: 'RBAC Access', meta: 'Role-Scoped APIs' },
          { icon: Database, title: 'SQL Core', meta: 'Optimized Queries' },
        ].map(({ icon: Icon, title, meta }) => (
          <div
            key={title}
            className="rounded-lg border border-ivory/15 bg-white/5 p-2.5"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
              <p className="truncate font-mono text-[11px] font-medium text-ivory">
                {title}
              </p>
            </div>
            <p className="mt-1 truncate font-mono text-[10px] text-ivory/65">{meta}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-ivory/15 bg-charcoal/55 px-3 py-2 font-mono text-[10px] text-ivory/80">
        <span>Enterprise ERP / CRM APIs</span>
        <span className="text-gold">Python • FastAPI • SQL</span>
      </div>
    </div>
  );
}

function SmartParkingMockup() {
  const slots = [
    { code: 'A-01', occupied: true },
    { code: 'A-02', occupied: false },
    { code: 'A-03', occupied: true },
    { code: 'A-04', occupied: false },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <div
            key={slot.code}
            className={`rounded-lg border p-2 text-center ${
              slot.occupied
                ? 'border-gold/50 bg-burgundy/90'
                : 'border-ivory/20 bg-white/5'
            }`}
          >
            <Car
              className={`mx-auto h-4 w-4 ${
                slot.occupied ? 'text-gold' : 'text-ivory/35'
              }`}
            />
            <p className="mt-1 font-mono text-[10px] text-ivory">{slot.code}</p>
            <p className="font-mono text-[9px] text-ivory/65">
              {slot.occupied ? 'Occupied' : 'Open'}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-ivory/15 bg-charcoal/55 px-3 py-2 font-mono text-[10px] text-ivory/80">
        <span className="inline-flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5 text-gold" />
          OpenCV Detection &rarr; IoT Status API
        </span>
        <span className="text-gold">FastAPI</span>
      </div>
    </div>
  );
}
