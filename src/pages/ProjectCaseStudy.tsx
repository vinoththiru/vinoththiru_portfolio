import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  Package,
  ShieldAlert,
  Target,
  Users,
  Wrench,
} from 'lucide-react';
import { getProjectBySlug, projectsData } from '../data/projects';
import { profileData } from '../data/profile';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Button } from '../components/Button';
import { ProjectVisualPreview } from '../components/ProjectVisualPreview';

type ErpMockTab = 'purchase-orders' | 'vendors' | 'quotations' | 'inventory';

const ERP_SANITIZED_TABS: {
  id: ErpMockTab;
  label: string;
  icon: typeof FileText;
  route: string;
  caption: string;
  columns: string[];
  rows: string[][];
}[] = [
  {
    id: 'purchase-orders',
    label: 'Purchase Orders',
    icon: FileText,
    route: '/admin/purchase-orders',
    caption:
      'Illustrative purchase order registry demonstrating structured order tracking, vendor linkage, and approval states (sanitized sample data).',
    columns: ['PO Number', 'Sample Vendor', 'Item Category', 'Status'],
    rows: [
      ['PO-SAMPLE-101', 'Apex Fabrication Co.', 'Hardware Components', 'Approved'],
      ['PO-SAMPLE-102', 'Meridian Industrial', 'Packaging Supplies', 'In Review'],
      ['PO-SAMPLE-103', 'Crestline Materials', 'Raw Material Batch', 'Ordered'],
    ],
  },
  {
    id: 'vendors',
    label: 'Vendor Directory',
    icon: Users,
    route: '/admin/vendors',
    caption:
      'Illustrative vendor management view organizing supplier records, categories, and operational contact metadata (sanitized sample data).',
    columns: ['Vendor ID', 'Sample Supplier', 'Category', 'State'],
    rows: [
      ['VND-001', 'Apex Fabrication Co.', 'Mechanical Parts', 'Active'],
      ['VND-002', 'Meridian Industrial', 'Packaging & Logistics', 'Active'],
      ['VND-003', 'Crestline Materials', 'Raw Inputs', 'Verified'],
    ],
  },
  {
    id: 'quotations',
    label: 'Quotations',
    icon: Layers,
    route: '/admin/quotations',
    caption:
      'Illustrative quotation comparison ledger supporting pre-order evaluation before converting approved quotes into purchase orders.',
    columns: ['Quote Ref', 'Sample Supplier', 'Linked Request', 'Stage'],
    rows: [
      ['QT-SAMPLE-401', 'Apex Fabrication Co.', 'REQ-2026-18', 'Selected'],
      ['QT-SAMPLE-402', 'Northstar Supplies', 'REQ-2026-18', 'Compared'],
      ['QT-SAMPLE-403', 'Meridian Industrial', 'REQ-2026-21', 'Pending'],
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory & Reports',
    icon: Package,
    route: '/admin/inventory',
    caption:
      'Illustrative inventory and purchase reporting screen linking received items with structured stock visibility and dashboard summaries.',
    columns: ['SKU Code', 'Sample Material', 'Stock Status', 'Report Sync'],
    rows: [
      ['SKU-A14', 'Fastener Kit (Standard)', 'In Stock', 'Synced'],
      ['SKU-B09', 'Protective Wrap Roll', 'Reorder Watch', 'Flagged'],
      ['SKU-C22', 'Industrial Adhesive Unit', 'In Stock', 'Synced'],
    ],
  },
];

export function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [activeTab, setActiveTab] = useState<ErpMockTab>('purchase-orders');

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Case Study | Vinoth Thiruppathi`;
    } else {
      document.title = 'Case Study Not Found | Vinoth Thiruppathi';
    }
  }, [project]);

  if (!project) {
    return (
      <main id="main-content" className="min-h-[75vh] bg-ivory pt-32 pb-24">
        <div className="editorial-container text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-burgundy">
            404 — Case Study Not Found
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-burgundy-deep sm:text-4xl">
            That project case study could not be located.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Return to the portfolio homepage to browse all available enterprise
            projects and case studies.
          </p>
          <div className="mt-7">
            <Button as="link" to="/#projects" variant="primary" size="md">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Projects
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const currentIndex = projectsData.findIndex((item) => item.slug === project.slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const isMiniErp = project.slug === 'procurement-mini-erp';
  const currentTabData =
    ERP_SANITIZED_TABS.find((t) => t.id === activeTab) ?? ERP_SANITIZED_TABS[0];

  return (
    <main id="main-content" className="bg-ivory">
      {/* Burgundy Editorial Hero Header */}
      <section className="relative overflow-hidden bg-burgundy-hero pt-28 pb-16 text-ivory sm:pt-32 sm:pb-20">
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />
        <div className="editorial-container relative z-10">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-gold transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to All Projects
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-gold/50 bg-burgundy px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                  {project.category}
                </span>
                {project.organization && (
                  <span className="rounded-full border border-ivory/20 bg-white/10 px-3 py-1 font-mono text-[11px] text-ivory">
                    {project.organization}
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ivory sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg text-justify">
                {project.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-ivory/25 bg-white/10 px-3 py-1 font-mono text-xs text-ivory"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-gold/35 bg-burgundy-deep/85 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                  Role &amp; Ownership
                </p>
                <p className="mt-1 font-heading text-base font-semibold text-ivory">
                  {project.role}
                </p>
                {project.organization && (
                  <p className="mt-1 font-mono text-xs text-ivory/75">
                    Organization: {project.organization}
                  </p>
                )}

                {project.liveUrl && (
                  <div className="mt-4 border-t border-ivory/15 pt-4">
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="gold"
                      size="sm"
                      className="w-full"
                    >
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.liveUrlLabel ?? 'View Live Application'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                    {project.liveUrlNote && (
                      <p className="mt-2 font-mono text-[10px] leading-relaxed text-ivory/70">
                        {project.liveUrlNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <article className="editorial-container space-y-14 py-14 sm:py-20">
        {/* 1 & 2: Project Overview + Business Context */}
        <section className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="editorial-card p-6 sm:p-8 lg:col-span-7"
          >
            <span className="eyebrow-label">01 / Project Overview</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
              Executive Summary
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-charcoal/90 text-justify">
              {project.caseStudy.overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="editorial-card p-6 sm:p-8 lg:col-span-5"
          >
            <span className="eyebrow-label">02 / Business Context</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
              Operational Background
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-muted text-justify">
              {project.caseStudy.businessContext}
            </p>
          </motion.div>
        </section>

        {/* 3 & 4: Problem Statement + Project Objectives */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="editorial-card p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="h-5 w-5 text-burgundy" aria-hidden="true" />
              <span className="eyebrow-label">03 / Problem Statement</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
              Operational Gaps Addressed
            </h2>
            <ul className="mt-5 space-y-3">
              {project.caseStudy.problemStatement.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/90 text-justify"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="editorial-card p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Target className="h-5 w-5 text-gold-dark" aria-hidden="true" />
              <span className="eyebrow-label">04 / Project Objectives</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
              Engineering Goals
            </h2>
            <ul className="mt-5 space-y-3">
              {project.caseStudy.objectives.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/90 text-justify"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5: Independent Development Contribution */}
        <section className="editorial-card p-6 sm:p-8">
          <span className="eyebrow-label">05 / Engineering Ownership</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
            My Development Contribution
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.caseStudy.independentContribution.map((point, idx) => (
              <div
                key={point}
                className="flex items-start gap-3.5 rounded-xl border border-blush/80 bg-ivory/75 p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-burgundy font-mono text-xs font-semibold text-gold">
                  0{idx + 1}
                </span>
                <p className="text-sm leading-relaxed text-charcoal/90 text-justify">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6: Implemented Application Modules (Flagship Mini ERP or Key Features) */}
        {project.caseStudy.modules && project.caseStudy.modules.length > 0 && (
          <section>
            <span className="eyebrow-label">06 / Application Modules</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep sm:text-3xl">
              Seven Core Procurement Modules
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted text-justify">
              Every module maps directly to structured purchasing operations—keeping
              order records, supplier data, quotations, inventory, and analytics
              consistent inside one authenticated application.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.caseStudy.modules.map((mod, idx) => (
                <div
                  key={mod.name}
                  className="editorial-card editorial-card-hover p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
                      Module 0{idx + 1}
                    </span>
                    <BarChart3
                      className="h-4 w-4 text-burgundy/60"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-2.5 font-heading text-base font-semibold text-burgundy-deep">
                    {mod.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted text-justify">
                    {mod.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7 & 8: Technology Stack + Architecture Diagram */}
        <section className="space-y-6">
          <div>
            <span className="eyebrow-label">07 / Architecture &amp; Stack</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep sm:text-3xl">
              Technical Architecture
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Clean separation between presentation, API validation &amp; business
              logic, and relational data storage.
            </p>
          </div>

          <ArchitectureDiagram
            layers={project.caseStudy.architectureLayers}
            title={
              isMiniErp
                ? 'React.js → Python FastAPI → PostgreSQL'
                : `${project.title} — System Flow`
            }
          />
        </section>

        {/* 9: Sanitized Illustrative UI Screens Walkthrough */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow-label">08 / Interface Walkthrough</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep sm:text-3xl">
                {isMiniErp
                  ? 'Illustrative UI Mockups (Sanitized Dummy Data)'
                  : 'System Interface Preview'}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-white px-3.5 py-1.5 font-mono text-[11px] font-medium text-burgundy">
              <Lock className="h-3.5 w-3.5 text-gold-dark" aria-hidden="true" />
              Illustrative Mockup — No Private Company Records Exposed
            </span>
          </div>

          {isMiniErp ? (
            <div className="editorial-card overflow-hidden">
              {/* Interactive Module Tabs */}
              <div
                role="tablist"
                aria-label="Illustrative Mini ERP Module Screens"
                className="flex flex-wrap gap-2 border-b border-blush bg-ivory p-3 sm:p-4"
              >
                {ERP_SANITIZED_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-burgundy text-ivory shadow-card'
                          : 'border border-blush bg-white text-charcoal hover:border-gold hover:text-burgundy'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Sanitized Interactive Table Screen */}
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blush pb-4">
                  <div>
                    <p className="font-mono text-xs text-burgundy">
                      Route Preview: {currentTabData.route}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {currentTabData.caption}
                    </p>
                  </div>
                  <span className="rounded-lg bg-blush/55 px-3 py-1 font-mono text-[11px] font-medium text-burgundy-deep">
                    Sanitized Illustrative Data
                  </span>
                </div>

                <div className="mt-5 overflow-x-auto rounded-xl border border-blush">
                  <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                    <thead className="bg-burgundy-deep text-ivory">
                      <tr>
                        {currentTabData.columns.map((col) => (
                          <th
                            key={col}
                            scope="col"
                            className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blush bg-white">
                      {currentTabData.rows.map((row) => (
                        <tr key={row[0]} className="hover:bg-ivory/60">
                          {row.map((cell, cellIdx) => (
                            <td
                              key={`${row[0]}-${cellIdx}`}
                              className={`px-4 py-3.5 ${
                                cellIdx === 0
                                  ? 'font-mono text-xs font-semibold text-burgundy'
                                  : cellIdx === row.length - 1
                                    ? 'font-mono text-xs'
                                    : 'text-charcoal'
                              }`}
                            >
                              {cellIdx === row.length - 1 ? (
                                <span className="inline-flex rounded-full border border-gold/50 bg-ivory px-2.5 py-0.5 text-[11px] font-medium text-burgundy-deep">
                                  {cell}
                                </span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 font-mono text-[11px] text-muted">
                  Disclaimer: The interface table above is an illustrative mockup
                  populated solely with synthetic placeholder records to demonstrate
                  module structure without exposing internal business data.
                </p>
              </div>
            </div>
          ) : (
            <ProjectVisualPreview type={project.visualType} />
          )}
        </section>

        {/* 10: Development Challenges & Solutions */}
        <section>
          <div className="flex items-center gap-2.5">
            <Wrench className="h-5 w-5 text-burgundy" aria-hidden="true" />
            <span className="eyebrow-label">09 / Challenges &amp; Solutions</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep sm:text-3xl">
            Engineering Trade-offs &amp; Resolutions
          </h2>

          <div className="mt-6 space-y-4">
            {project.caseStudy.challengesAndSolutions.map((pair, idx) => (
              <div
                key={pair.challenge}
                className="editorial-card grid gap-6 p-6 sm:grid-cols-2 sm:p-7"
              >
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-burgundy">
                    Challenge 0{idx + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal text-justify">
                    {pair.challenge}
                  </p>
                </div>
                <div className="border-t border-blush pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
                    Solution Implemented
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
                    {pair.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11: Key Learnings */}
        <section className="editorial-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <Lightbulb className="h-5 w-5 text-gold-dark" aria-hidden="true" />
            <span className="eyebrow-label">10 / Key Learnings</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-burgundy-deep">
            Engineering Takeaways
          </h2>
          <ul className="mt-5 space-y-3">
            {project.caseStudy.keyLearnings.map((learning) => (
              <li
                key={learning}
                className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/90 text-justify"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-burgundy"
                  aria-hidden="true"
                />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 12: Demo / Contact CTA + Next Case Study */}
        <section className="rounded-2xl border border-gold/45 bg-burgundy-hero p-7 text-ivory shadow-editorial sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Interested in a Similar System?
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                Let&apos;s Discuss Your Business Automation or Backend Project.
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ivory/80">
                Happy to walk through the architecture, technical decisions, or
                discuss building a custom FastAPI / React.js application tailored
                to your operations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button as="link" to="/#contact" variant="gold" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Request Walkthrough
              </Button>
              <Button
                as="a"
                href={`mailto:${profileData.email}?subject=${encodeURIComponent(
                  `Case Study Inquiry: ${project.title}`
                )}`}
                variant="outline-light"
                size="lg"
              >
                Email Directly
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 pt-6">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All Projects
            </Link>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-gold transition-colors hover:text-ivory"
            >
              Next Case Study: {nextProject.title}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
