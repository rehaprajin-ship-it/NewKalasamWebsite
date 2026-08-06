'use client';

/* ═══════════════════════════════════════════════════════════════
   ScrollReveal — Framer Motion Reveal-on-Scroll Wrapper
   ═══════════════════════════════════════════════════════════════ */

import { type ReactNode } from 'react';
import { motion, type TargetAndTransition } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  scale?: number;
}

const getInitialVariant = (
  direction: Direction,
  distance: number,
  scale: number
): TargetAndTransition => {
  const base: TargetAndTransition = { opacity: 0 };
  if (scale !== 1) base.scale = scale;

  switch (direction) {
    case 'up':    return { ...base, y: distance };
    case 'down':  return { ...base, y: -distance };
    case 'left':  return { ...base, x: distance };
    case 'right': return { ...base, x: -distance };
    case 'none':  return base;
  }
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  className = '',
  once = true,
  scale = 1,
}: ScrollRevealProps) {
  return (
    <>
      {/*
        Inline style ensures content is visible in SSR HTML before JS hydrates.
        Framer-motion overrides this immediately on hydration.
        This fixes AI/LLM crawler readability (GPTBot, ClaudeBot, etc.)
      */}
      <style dangerouslySetInnerHTML={{ __html: `[data-sr]{opacity:1!important;transform:none!important}` }} />
      <motion.div
        data-sr=""
        initial={getInitialVariant(direction, distance, scale)}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        viewport={{ once, margin: '-60px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}

/* ── Stagger Container ──────────────────────────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
