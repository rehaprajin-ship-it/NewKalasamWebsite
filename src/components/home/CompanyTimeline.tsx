'use client';

/* ═══════════════════════════════════════════════════════════════
   Company Timeline — Vertical Milestone Strip
   ═══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/common/ScrollReveal';

const milestones = [
  { year: '1995', title: 'Founded in Theni', description: 'Kalasam Jaikrishna Industries established as a traditional camphor manufacturing unit in Theni, Tamil Nadu.' },
  { year: '2002', title: 'Product Expansion', description: 'Expanded into pooja products — agarbathi, sambrani, and lamp oil — serving South Indian markets.' },
  { year: '2008', title: 'Industrial Chemicals', description: 'Launched synthetic camphor and isoborneol manufacturing lines for pharmaceutical and industrial clients.' },
  { year: '2013', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification, establishing quality management systems across all operations.' },
  { year: '2016', title: 'Export Division', description: 'Opened the export division, shipping to Bangladesh, Nepal, Sri Lanka, and Middle Eastern markets.' },
  { year: '2020', title: 'R&D Laboratory', description: 'Established in-house R&D laboratory for product innovation, quality testing, and new formulations.' },
  { year: '2024', title: '17+ Countries', description: 'Exports now reaching 17+ countries across Asia, Middle East, Africa, and North America.' },
];

export default function CompanyTimeline() {
  return (
    <section className="section-padding bg-primary-dark overflow-hidden">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="overline text-accent-light">Our Journey</span>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-white mt-4 text-balance">
              From Humble Beginnings to Global Reach
            </h2>
            <div className="accent-line accent-line-center mt-6" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-0">
            {milestones.map((ms, i) => {
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal
                  key={ms.year}
                  direction={isEven ? 'left' : 'right'}
                  delay={i * 0.1}
                >
                  <div className={`relative flex items-start gap-8 lg:gap-0 ${
                    i > 0 ? 'lg:mt-12' : ''
                  }`}>
                    {/* Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="w-3 h-3 rounded-full bg-accent border-2 border-primary-dark" />
                    </motion.div>

                    {/* Content Card */}
                    <div className={`pl-12 lg:pl-0 lg:w-1/2 ${
                      isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:ml-auto'
                    }`}>
                      <div className={`bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors ${
                        isEven ? 'lg:mr-0' : 'lg:ml-0'
                      }`}>
                        <span className="text-accent font-800 text-2xl tracking-tight">{ms.year}</span>
                        <h3 className="text-white font-600 text-lg mt-1">{ms.title}</h3>
                        <p className="text-white/50 text-sm mt-2 leading-relaxed">{ms.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
