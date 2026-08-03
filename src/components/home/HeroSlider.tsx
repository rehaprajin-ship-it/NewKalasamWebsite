'use client';

/* ═══════════════════════════════════════════════════════════════
   Hero Slider — Full-Viewport Animated Slider
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    overline: 'Since 1995',
    title: 'India\'s Premier\nCamphor Manufacturer',
    subtitle: 'World-class synthetic camphor, D-camphor, and isoborneol — exported to 17+ countries with uncompromising quality standards.',
    cta: { label: 'Explore Products', href: '/products' },
    ctaSecondary: { label: 'Export Inquiry', href: '/export' },
    gradient: 'from-primary-dark/95 via-primary/80 to-transparent',
    image: '/images/hero/factory-campus.png',
  },
  {
    id: 2,
    overline: 'Global Export Division',
    title: 'Trusted Across\n17+ Countries',
    subtitle: 'From Bangladesh to the UAE, our industrial chemicals and premium pooja products serve global markets with ISO-certified quality.',
    cta: { label: 'Our Export Markets', href: '/export' },
    ctaSecondary: { label: 'Get a Quote', href: '/contact' },
    gradient: 'from-gray-900/90 via-gray-900/60 to-transparent',
    image: '/images/hero/export-port.png',
  },
  {
    id: 3,
    overline: 'OEM & Private Label',
    title: 'Your Brand,\nOur Manufacturing',
    subtitle: 'Custom formulations, private label packaging, and OEM manufacturing for chemical companies and FMCG brands worldwide.',
    cta: { label: 'OEM Services', href: '/oem-manufacturing' },
    ctaSecondary: { label: 'Private Label', href: '/private-label' },
    gradient: 'from-primary/90 via-primary-dark/70 to-transparent',
    image: '/images/hero/manufacturing-line.png',
  },
  {
    id: 4,
    overline: 'Premium Pooja Products',
    title: 'Sacred Traditions,\nModern Quality',
    subtitle: 'Pure camphor tablets, sambrani, agarbathi, lamp oil, and rose water — crafted for temples, homes, and spiritual stores.',
    cta: { label: 'Pooja Products', href: '/pooja-products' },
    ctaSecondary: { label: 'Become a Distributor', href: '/distributors' },
    gradient: 'from-gray-900/85 via-primary-dark/60 to-transparent',
    image: '/images/hero/pooja-temple.png',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = slides[current];

  return (
    <section className="relative h-[100svh] min-h-[600px] max-h-[1000px] overflow-hidden bg-primary-dark">
      {/* Background Layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} z-10`} />
          {/* Real background image */}
          <Image
            src={slide.image}
            alt={slide.overline}
            fill
            priority={slide.id === 1}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 container-custom h-full flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
                exit: {},
              }}
            >
              {/* Overline */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-px bg-accent" />
                <span className="text-accent text-xs font-600 uppercase tracking-[0.2em]">
                  {slide.overline}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
                }}
                className="heading-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-pre-line"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-6 text-white/70 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link href={slide.cta.href} className="btn btn-gold btn-lg">
                  {slide.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href={slide.ctaSecondary.href} className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">
                  {slide.ctaSecondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative h-10 flex items-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={`h-0.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-12 bg-accent' : 'w-6 bg-white/30 group-hover:bg-white/50'
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
        transition={{ delay: 2 }}
        className="absolute bottom-10 right-8 z-30 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-white/20"
        />
      </motion.div>
    </section>
  );
}
