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
 * Pre-computed base64 encoded email addresses.
 * These are decoded client-side only, preventing bot harvesting from source.
 */

/** support@kalasamjaikrishna.co.in — Footer general contact / fallback */
export const ENCODED_EMAIL_SUPPORT = btoa('support@kalasamjaikrishna.co.in');

/** export@kalasamjaikrishna.co.in — Export page direct contact */
export const ENCODED_EMAIL_EXPORT = btoa('export@kalasamjaikrishna.co.in');

/** company@kalasamjaikrishna.co.in — Careers / legal correspondence */
export const ENCODED_EMAIL_COMPANY = btoa('company@kalasamjaikrishna.co.in');

/**
 * @deprecated Use ENCODED_EMAIL_SUPPORT for footer, or the segment-specific constants.
 * Kept temporarily for backward compatibility during migration.
 */
export const ENCODED_EMAIL = ENCODED_EMAIL_SUPPORT;
