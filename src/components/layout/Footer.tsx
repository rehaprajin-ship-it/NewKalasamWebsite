'use client';

/* ═══════════════════════════════════════════════════════════════
   Enterprise Footer — Kalasam Jaikrishna Industries
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { footerNav } from '@/data/navigation';
import { COMPANY, CERTIFICATIONS } from '@/lib/constants';
import { subscribeNewsletter } from '@/lib/firestore';
import { useToast } from '@/context/ToastProvider';
import ObfuscatedEmail, { ENCODED_EMAIL } from '@/components/common/ObfuscatedEmail';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await subscribeNewsletter(email.trim(), 'footer');
      showToast('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch {
      showToast('Subscription failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* ── Newsletter Strip ────────────────────────────────── */}
      <div className="bg-primary">
        <div className="container-custom py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-700 text-white tracking-tight">
                Stay Updated with Industry Insights
              </h3>
              <p className="text-white/70 mt-1 text-sm">
                Product launches, export updates, and manufacturing news — delivered monthly.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-600 text-sm rounded-r-lg transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {submitting ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ────────────────────────────────── */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Company Info — spans 2 cols on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-4 mb-5 group" aria-label="Kalasam Jaikrishna Industries Home">
              <Image
                src="/images/logo.png"
                alt="Kalasam Jaikrishna Industries Logo"
                width={250}
                height={70}
                className="h-auto max-h-[70px] max-w-[250px] object-contain"
                style={{ width: 'auto' }}
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              {COMPANY.description}
            </p>
            <div className="space-y-2.5 text-sm">
              <a href={`tel:${COMPANY.contact.phone}`} className="flex items-center gap-2.5 text-gray-400 hover:text-accent transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {COMPANY.contact.phone}
              </a>
              <a href={`mailto:${COMPANY.contact.email}`} className="flex items-center gap-2.5 text-gray-400 hover:text-accent transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <ObfuscatedEmail encoded={ENCODED_EMAIL} className="" asLink={false} />
              </a>
              <div className="flex items-start gap-2.5 text-gray-400">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {COMPANY.location.address}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-600 text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-sm font-600 text-white uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2.5">
              {footerNav.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-600 text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-600 text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Certifications Strip ─────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="text-xs text-gray-500 font-500 tracking-wide">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. | Last updated: August {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-6">
              {footerNav.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {Object.entries(COMPANY.social).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-accent transition-colors" aria-label={name}>
                  <FooterSocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSocialIcon({ name }: { name: string }) {
  const cls = 'w-4 h-4';
  switch (name) {
    case 'facebook': return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case 'instagram': return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case 'linkedin': return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case 'youtube': return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'twitter': return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    default: return null;
  }
}
