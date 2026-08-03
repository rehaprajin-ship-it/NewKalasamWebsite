'use client';

/* ═══════════════════════════════════════════════════════════════
   Manufacturing Excellence — Horizontal Process Showcase
   ═══════════════════════════════════════════════════════════════ */

import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

const processes = [
  {
    step: '01',
    title: 'Raw Material Sourcing',
    description: 'Premium turpentine oil and chemical precursors sourced from verified international suppliers.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Chemical Synthesis',
    description: 'Advanced reactor systems with precise temperature and pressure control for camphor synthesis.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Quality Testing',
    description: 'In-house laboratory with GC, HPLC, and spectroscopic analysis for every production batch.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Processing & Pressing',
    description: 'Automated tablet pressing, granulation, and milling with precision weight control.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M6.34 10.07l5.1-5.1M11.42 15.17l5.1-5.1M16.5 10.07l-5.1-5.1M11.42 15.17V21M11.42 4.97V3" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Packaging & Dispatch',
    description: 'Multi-layer packaging for domestic retail, bulk industrial, and export-grade containerized shipping.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.375M8.25 18.75h6M3 14.25V6.375c0-.621.504-1.125 1.125-1.125h9.75M17.25 18.75h2.625c.621 0 1.125-.504 1.125-1.125v-3.375m0 0V10.5m0 4.875H17.25m3.375 0h1.125" />
      </svg>
    ),
  },
];

export default function ManufacturingExcellence() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          overline="Manufacturing"
          title="Precision-Engineered Production"
          subtitle="Our integrated manufacturing facility combines advanced chemical processing with rigorous quality control at every stage."
          align="left"
        />

        {/* Process Steps — Horizontal scroll on mobile, grid on desktop */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 mt-4">
          {processes.map((proc, i) => (
            <StaggerItem key={proc.step}>
              <div className="group relative p-6 rounded-xl border border-gray-200 hover:border-primary/20 hover:shadow-medium transition-all duration-300 h-full">
                {/* Step number */}
                <div className="absolute -top-3 left-6 bg-white px-2">
                  <span className="text-xs font-700 text-accent tracking-wider">{proc.step}</span>
                </div>

                {/* Connector line (hidden on first) */}
                {i < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-300" />
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {proc.icon}
                </div>

                <h3 className="text-base font-600 text-gray-900 mb-2">{proc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{proc.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/manufacturing" className="btn btn-primary">
              Factory Tour
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                ISO 9001:2015
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                GMP Certified
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
