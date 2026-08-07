'use client';

/* ═══════════════════════════════════════════════════════════════
   AnimatedCounter — Scroll-Triggered Number Counter
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  duration?: number;
  className?: string;
  light?: boolean;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  description,
  duration = 2,
  className = '',
  light = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(value);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Reset to 0 and animate up — the zero is only momentary visual
    setCount(0);

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div
        className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-800 tracking-tight tabular-nums ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {prefix}
        {count.toLocaleString('en-IN')}
        <span className="text-accent">{suffix}</span>
      </div>
      <div
        className={`mt-2 text-sm font-600 uppercase tracking-widest ${
          light ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {label}
      </div>
      {description && (
        <p
          className={`mt-1 text-sm ${
            light ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
