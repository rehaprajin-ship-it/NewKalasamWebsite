'use client';

/* ═══════════════════════════════════════════════════════════════
   ObfuscatedEmail — Prevents email harvesting by bots
   Email is base64-encoded and decoded only via client-side JS.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';

interface ObfuscatedEmailProps {
  /** Base64-encoded email address */
  encoded: string;
  /** Optional subject for mailto link */
  subject?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to render as a clickable mailto link */
  asLink?: boolean;
}

export default function ObfuscatedEmail({
  encoded,
  subject,
  className = '',
  asLink = true,
}: ObfuscatedEmailProps) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      setEmail(atob(encoded));
    } catch {
      setEmail('');
    }
  }, [encoded]);

  if (!email) return <span className={className}>Contact us via the form</span>;

  if (asLink) {
    const href = subject
      ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
      : `mailto:${email}`;
    return (
      <a href={href} className={className}>
        {email}
      </a>
    );
  }

  return <span className={className}>{email}</span>;
}

/**
 * Pre-computed base64 for the company email.
 * btoa('jaikrishnaindustries1@gmail.com')
 */
export const ENCODED_EMAIL = 'amFpa3Jpc2huYWluZHVzdHJpZXMxQGdtYWlsLmNvbQ==';
