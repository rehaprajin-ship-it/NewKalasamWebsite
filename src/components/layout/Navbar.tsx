'use client';

/* ═══════════════════════════════════════════════════════════════
   Premium Mega Navbar — Kalasam Jaikrishna Industries
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { COMPANY } from '@/lib/constants';
import { useInquiry } from '@/context/InquiryContext';
import ObfuscatedEmail, { ENCODED_EMAIL } from '@/components/common/ObfuscatedEmail';
import { useScrolledPast } from '@/hooks';
import type { NavItem, NavGroup } from '@/types';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrolledPast(20);
  const { items, setIsDrawerOpen } = useInquiry();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const translateInitialized = useRef(false);

  /* ── Google Translate Integration (Lazy — loads on first interaction) ── */
  const loadTranslateScript = useCallback(() => {
    if (translateInitialized.current) return;
    translateInitialized.current = true;

    // Callback for Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    // Inject Google Translate script only when needed
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    loadTranslateScript(); // Lazy-load Google Translate on first use

    // Reset to English if empty / "All Languages"
    if (!langCode || langCode === 'en') {
      // Remove the Google Translate cookie to revert to original
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
      window.location.reload();
      return;
    }

    // Set Google Translate cookie
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const [isHidden, setIsHidden] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLangFocused, setIsLangFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Save initial scroll position on mount
    lastScrollY.current = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Always show at the top of the page
      if (currentScrollY < 50) {
        setIsHidden(false);
        scrollAccumulator.current = 0;
        lastScrollY.current = currentScrollY;
        return;
      }

      // Check exceptions
      const hasOpenDropdown = activeMenu !== null;
      const isInputActive = isSearchFocused || isLangFocused;
      if (mobileOpen || hasOpenDropdown || isInputActive) {
        setIsHidden(false);
        scrollAccumulator.current = 0;
        lastScrollY.current = currentScrollY;
        return;
      }

      // Show on any meaningful upward movement
      if (delta < -5) {
        setIsHidden(false);
        scrollAccumulator.current = 0;
      } 
      // Hide only after scrolling down past a threshold
      else if (delta > 10) {
        setIsHidden(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [mobileOpen, activeMenu, isSearchFocused, isLangFocused]);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = useCallback((label: string) => {
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveMenu(null);
  }, []);

  return (
    <>
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <div className="hidden lg:block bg-primary-dark text-white/80 text-xs">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {COMPANY.contact.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {COMPANY.contact.email}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span>{COMPANY.businessHours}</span>
            <span className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-3">
              {Object.entries(COMPANY.social).slice(0, 4).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                   className="hover:text-accent transition-colors" aria-label={name}>
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ─────────────────────────────────────── */}
      <header
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0%)',
          transition: prefersReducedMotion ? 'none' : 'transform 0.25s ease-out, top 0.25s ease-out',
        }}
        className={`fixed left-0 right-0 w-full z-[var(--z-navbar)] ${
          scrolled
            ? 'top-0 glass border-b border-gray-200/60 shadow-subtle'
            : 'top-0 lg:top-8 bg-white'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Kalasam Jaikrishna Industries Home">
              <Image
                src="/images/logo.png"
                alt="Jaikrishna Industries Logo"
                width={220}
                height={60}
                priority
                className={`h-auto object-contain transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  scrolled
                    ? 'max-h-[52px] max-w-[200px]'
                    : 'max-h-[60px] max-w-[220px]'
                } max-[1023px]:max-h-[44px] max-[1023px]:max-w-[170px]`}
                style={{ width: 'auto' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-500 rounded-lg transition-colors ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-primary bg-primary-50'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <svg className={`w-3.5 h-3.5 transition-transform ${activeMenu === item.label ? 'rotate-180' : ''}`}
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Dropdown */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <MegaDropdown groups={item.children} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── Search & Language Bar ─────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Input */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search Products"
                  className="w-48 xl:w-56 pl-4 pr-9 py-2 bg-white border border-gray-300 rounded-full text-sm
                             text-gray-700 placeholder:text-gray-400
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                             transition-all duration-200"
                />
                <button
                  type="submit"
                  aria-label="Search products"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </form>

              {/* Language Dropdown */}
              <LanguageSwitcher selectedLang={selectedLang} onLanguageChange={handleLanguageChange} alignRight />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Toggle search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Inquiry List Clipboard Trigger */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors cursor-pointer"
                aria-label="Open inquiry list"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {items.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[9px] font-800 w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {items.length}
                  </span>
                )}
              </button>

              <Link
                href="/contact"
                className="hidden lg:inline-flex btn btn-primary btn-sm"
              >
                Get a Quote
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 -mr-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current origin-left"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    className="block h-0.5 bg-current"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current origin-left"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* ── Mobile Search Bar (slides down) ────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="container-custom py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Products"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm
                                 focus:outline-none focus:border-primary"
                      autoFocus
                    />
                  </div>
                  <LanguageSwitcher selectedLang={selectedLang} onLanguageChange={handleLanguageChange} />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to reserve space for the fixed header in document flow */}
      <div className="h-18 lg:h-20 w-full" />

      {/* Hidden Google Translate element (used by the API) */}
      <div id="google_translate_element" className="hidden" />

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[calc(var(--z-navbar)-1)] lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20 pb-24">
                {/* Mobile Nav Items */}
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      isExpanded={mobileSubmenu === item.label}
                      onToggle={() =>
                        setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )
                      }
                    />
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="btn btn-primary w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get a Quote
                  </Link>
                </div>

                {/* Mobile Contact Info */}
                <div className="mt-6 space-y-3 text-sm text-gray-500">
                  <a href={`tel:${COMPANY.contact.phone}`} className="flex items-center gap-2 hover:text-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {COMPANY.contact.phone}
                  </a>
                  <a href={`mailto:${COMPANY.contact.email}`} className="flex items-center gap-2 hover:text-primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <ObfuscatedEmail encoded={ENCODED_EMAIL} className="" asLink={false} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Mega Dropdown Panel ────────────────────────────────────── */

function MegaDropdown({ groups }: { groups: NavGroup[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
    >
      <div className="bg-white rounded-xl shadow-elevated border border-gray-100 overflow-hidden min-w-[520px]">
        <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
          {groups.map((group) => (
            <div key={group.title} className="p-5">
              <h3 className="text-xs font-600 uppercase tracking-widest text-gray-400 mb-3">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-500 text-gray-800 group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-600 rounded bg-accent/10 text-accent-dark">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      {link.description && (
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-primary mt-1 transition-colors flex-shrink-0"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile Nav Item ────────────────────────────────────────── */

function MobileNavItem({
  item,
  pathname,
  isExpanded,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`block px-4 py-3.5 text-base font-500 rounded-lg transition-colors min-h-[44px] ${
          isActive ? 'text-primary bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-500 rounded-lg transition-colors min-h-[44px] ${
          isActive ? 'text-primary bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        {item.label}
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {item.children!.map((group) => (
                <div key={group.title}>
                  <div className="px-4 py-1.5 text-xs font-600 uppercase tracking-widest text-gray-400">
                    {group.title}
                  </div>
                  {group.items.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Social Icons ───────────────────────────────────────────── */

function SocialIcon({ name }: { name: string }) {
  const size = 'w-3.5 h-3.5';
  switch (name) {
    case 'facebook':
      return <svg className={size} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case 'instagram':
      return <svg className={size} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
    case 'linkedin':
      return <svg className={size} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case 'youtube':
      return <svg className={size} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
    default:
      return <svg className={size} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>;
  }
}
