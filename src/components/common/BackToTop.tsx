'use client';

/* ═══════════════════════════════════════════════════════════════
   Consolidated Floating Actions Stack
   - Desktop: Bottom-left vertical stack (Scroll-to-Top above, Inquiry List button below)
   - Mobile: Scroll-to-Top only, positioned bottom-right above the MobileBottomBar
   - Reconciles collisions with WhatsApp (moved to bottom-right on desktop)
   ═══════════════════════════════════════════════════════════════ */

import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledPast } from '@/hooks';
import { useInquiry } from '@/context/InquiryContext';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const visible = useScrolledPast(400);
  const { items, setIsDrawerOpen } = useInquiry();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const transitionOpts = (prefersReducedMotion 
    ? { duration: 0 } 
    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }) as any;

  return (
    <>
      {/* ── Desktop Stack (Bottom-Left) ── */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-[var(--z-overlay)] flex-col gap-3 items-center">
        <AnimatePresence>
          {visible && (
            <motion.button
              key="desktop-scroll-top"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={transitionOpts}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {visible && (
            <motion.button
              key="desktop-inquiry-list"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={transitionOpts}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDrawerOpen(true)}
              className="w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
              aria-label="Open Inquiry List"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-900 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-scale-in">
                  {items.length}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile/Tablet Float (Bottom-Right, above MobileBottomBar) ── */}
      <div className="lg:hidden fixed bottom-20 right-4 z-[var(--z-overlay)] flex flex-col items-center">
        <AnimatePresence>
          {visible && (
            <motion.button
              key="mobile-scroll-top"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={transitionOpts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-11 h-11 bg-primary/95 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
