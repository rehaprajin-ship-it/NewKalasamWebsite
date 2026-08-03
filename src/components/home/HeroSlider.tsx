'use client';

/* ═══════════════════════════════════════════════════════════════
   Hero Video Background — Full-Viewport Autoplay Video Hero
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    overline: 'Since 1995',
    title: "India's Premier\nCamphor Manufacturer",
    subtitle: 'World-class synthetic camphor, D-camphor, and isoborneol — exported to 17+ countries with uncompromising quality standards.',
    cta: { label: 'Explore Products', href: '/products' },
    ctaSecondary: { label: 'Export Inquiry', href: '/export' },
  },
  {
    id: 2,
    overline: 'Global Export Division',
    title: 'Trusted Across\n17+ Countries',
    subtitle: 'From Bangladesh to the UAE, our industrial chemicals and premium pooja products serve global markets with ISO-certified quality.',
    cta: { label: 'Our Export Markets', href: '/export' },
    ctaSecondary: { label: 'Get a Quote', href: '/contact' },
  },
  {
    id: 3,
    overline: 'OEM & Private Label',
    title: 'Your Brand,\nOur Manufacturing',
    subtitle: 'Custom formulations, private label packaging, and OEM manufacturing for chemical companies and FMCG brands worldwide.',
    cta: { label: 'OEM Services', href: '/oem-manufacturing' },
    ctaSecondary: { label: 'Private Label', href: '/private-label' },
  },
  {
    id: 4,
    overline: 'Premium Pooja Products',
    title: 'Sacred Traditions,\nModern Quality',
    subtitle: 'Pure camphor tablets, sambrani, agarbathi, lamp oil, and rose water — crafted for temples, homes, and spiritual stores.',
    cta: { label: 'Pooja Products', href: '/pooja-products' },
    ctaSecondary: { label: 'Become a Distributor', href: '/distributors' },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  // Listen to prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (prefersReducedMotion) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [prefersReducedMotion]);

  const slide = slides[current];

  return (
    <section className="relative h-[80vh] md:h-[90vh] lg:h-screen w-full overflow-hidden bg-gray-950">
      
      {/* Autoplay Video Background */}
      {!prefersReducedMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          poster="/images/hero/factory-campus.png"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-90"
        >
          <source src="/images/hero vedio.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url('/images/hero/factory-campus.png')` }}
        />
      )}

      {/* Premium Gradient Overlay with Deep Green Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-emerald-950/45 to-black/85 z-10" />

      {/* Hero Content (Centered) */}
      <div className="relative z-20 container-custom h-full flex items-center justify-center text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
                exit: {},
              }}
              className="flex flex-col items-center"
            >
              {/* Overline */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-8 h-px bg-accent" />
                <span className="text-accent text-[11px] sm:text-xs font-700 uppercase tracking-[0.25em]">
                  {slide.overline}
                </span>
                <span className="w-8 h-px bg-accent" />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
                }}
                className="heading-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-900 tracking-tight leading-[1.15] whitespace-pre-line"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-5 text-white/80 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-500"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <Link href={slide.cta.href} className="btn btn-gold btn-lg justify-center w-full sm:w-auto">
                  {slide.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href={slide.ctaSecondary.href} className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 justify-center w-full sm:w-auto">
                  {slide.ctaSecondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative h-8 flex items-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={`h-0.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-10 bg-accent' : 'w-5 bg-white/30 group-hover:bg-white/50'
            }`}>
              {i === current && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="h-full bg-accent origin-left rounded-full"
                  key={`progress-${current}`}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-30 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] font-700 tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
