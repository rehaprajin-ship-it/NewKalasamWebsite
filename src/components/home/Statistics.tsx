'use client';

/* ═══════════════════════════════════════════════════════════════
   Statistics — Full-Width Gradient Counter Bar
   ═══════════════════════════════════════════════════════════════ */

import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { COMPANY_STATS } from '@/lib/constants';

export default function Statistics() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-20 bg-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6">
          {COMPANY_STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              light
              className="text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
