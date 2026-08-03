'use client';

/* ═══════════════════════════════════════════════════════════════
   Industries Served — Icon Grid with Hover Expand
   ═══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import { INDUSTRIES } from '@/lib/constants';

export default function IndustriesServed() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          overline="Applications"
          title="Industries We Empower"
          subtitle="Our chemicals and products serve diverse industries — from pharmaceutical labs to sacred temples."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-4">
          {INDUSTRIES.map((ind) => (
            <StaggerItem key={ind.name}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-gray-50 hover:bg-primary rounded-2xl p-6 lg:p-7 transition-colors duration-300 h-full cursor-default"
              >
                {/* Icon */}
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {ind.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-600 text-gray-900 group-hover:text-white transition-colors mb-2">
                  {ind.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 group-hover:text-white/70 transition-colors leading-relaxed">
                  {ind.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-r-[40px] border-r-gray-200/50 group-hover:border-r-white/10 transition-colors" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
