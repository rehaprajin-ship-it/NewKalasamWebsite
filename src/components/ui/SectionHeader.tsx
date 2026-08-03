'use client';

/* ═══════════════════════════════════════════════════════════════
   SectionHeader — Premium Section Title Component
   ═══════════════════════════════════════════════════════════════ */

import ScrollReveal from '@/components/common/ScrollReveal';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={cn('mb-12 md:mb-16', alignClass, className)}>
      {overline && (
        <ScrollReveal delay={0}>
          <span
            className={cn(
              'overline inline-block mb-4',
              light ? 'text-accent-light' : 'text-accent'
            )}
          >
            {overline}
          </span>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.1}>
        <h2
          className={cn(
            'heading-section text-balance',
            'text-3xl sm:text-4xl lg:text-5xl',
            light ? 'text-white' : 'text-gray-900'
          )}
        >
          {title}
        </h2>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className={cn(
              'mt-4 text-lg max-w-2xl leading-relaxed',
              align === 'center' && 'mx-auto',
              light ? 'text-gray-300' : 'text-gray-500'
            )}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.25}>
        <div
          className={cn(
            'accent-line mt-6',
            align === 'center' && 'accent-line-center'
          )}
        />
      </ScrollReveal>
    </div>
  );
}
