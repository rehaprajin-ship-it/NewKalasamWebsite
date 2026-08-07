'use client';

/* ═══════════════════════════════════════════════════════════════
   Back To Top Button
   ═══════════════════════════════════════════════════════════════ */

import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledPast } from '@/hooks';

export default function BackToTop() {
  const visible = useScrolledPast(400);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[var(--z-overlay)] w-11 h-11 lg:w-12 lg:h-12 bg-primary/90 hover:bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
