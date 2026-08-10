'use client';

/* ═══════════════════════════════════════════════════════════════
   Testimonials — Carousel with Quote Cards + Swipe + Dots
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
  {
    id: 1,
    quote: 'Kalasam delivers consistently high-purity camphor that meets our pharmaceutical formulation standards. Their COA documentation and batch traceability are exceptional.',
    name: 'Rajesh Mehta',
    title: 'Procurement Director',
    company: 'PharmaChem Industries, Mumbai',
    type: 'Industrial Client',
  },
  {
    id: 2,
    quote: 'We have been importing Kalasam synthetic camphor for 5 years. Their export team handles all documentation flawlessly, and the product quality has never deviated.',
    name: 'Ahmed Al-Rashid',
    title: 'Import Manager',
    company: 'Gulf Chemical Trading, Dubai',
    type: 'Export Client',
  },
  {
    id: 3,
    quote: 'Our private label camphor tablets and agarbathi from Kalasam have become the top sellers in our retail chain. The packaging quality and consistent supply are outstanding.',
    name: 'Priya Natarajan',
    title: 'Category Manager',
    company: 'Temple Needs Retail Chain, Chennai',
    type: 'Private Label Client',
  },
  {
    id: 4,
    quote: 'As a distributor, I need reliable supply and competitive pricing. Kalasam provides both, plus their marketing support materials help us grow our territory every year.',
    name: 'Suresh Pandian',
    title: 'Regional Distributor',
    company: 'Madurai Distribution Network',
    type: 'Distributor Partner',
  },
  {
    id: 5,
    quote: 'The isoborneol powder from Kalasam is consistently within spec. Their R&D team also helped us optimize our camphor synthesis process, which reduced our production costs by 12%.',
    name: 'Dr. Kenji Tanaka',
    title: 'Technical Director',
    company: 'NipponChem Corp, Tokyo',
    type: 'Industrial Client',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Touch/swipe tracking
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
  };

  const testimonial = testimonials[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          overline="Client Trust"
          title="What Our Partners Say"
          subtitle="From pharmaceutical importers to temple product distributors — hear from the businesses that trust Kalasam."
        />

        <div className="max-w-4xl mx-auto mt-4">
          {/* Quote Card */}
          <div
            className="relative bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12 min-h-[320px] flex flex-col justify-center touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Large quote mark */}
            <div className="absolute top-6 left-6 sm:left-8 text-8xl font-serif text-primary/5 leading-none select-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Type badge */}
                <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-600 rounded-full mb-6">
                  {testimonial.type}
                </span>

                {/* Quote */}
                <blockquote cite={`https://kalasamjaikrishna.co.in/testimonials#${testimonial.id}`} className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-400 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="mt-6 sm:mt-8 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-700 text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-600 text-gray-900">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{testimonial.title}</div>
                    <cite className="text-xs sm:text-sm text-accent font-500 not-italic">{testimonial.company}</cite>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows — desktop + mobile */}
            <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 flex items-center gap-2 sm:gap-3">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current
                    ? 'w-6 h-2.5 bg-primary'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                style={{ minWidth: '10px', minHeight: '10px' }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
