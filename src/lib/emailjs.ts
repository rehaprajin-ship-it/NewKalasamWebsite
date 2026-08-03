/* ═══════════════════════════════════════════════════════════════
   EmailJS Integration
   ═══════════════════════════════════════════════════════════════ */

import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const AUTO_REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

let initialized = false;

function initEmailJS() {
  if (!initialized && PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
    initialized = true;
  }
}

/**
 * Send a contact/inquiry email via EmailJS.
 */
export async function sendEmail(
  templateParams: Record<string, string>,
  templateId?: string
): Promise<void> {
  initEmailJS();

  const tid = templateId || TEMPLATE_ID;
  if (!SERVICE_ID || !tid) {
    throw new Error('EmailJS is not configured. Check environment variables.');
  }

  await emailjs.send(SERVICE_ID, tid, templateParams);
}

/**
 * Send auto-reply to the person who submitted the form.
 */
export async function sendAutoReply(
  templateParams: Record<string, string>
): Promise<void> {
  if (!AUTO_REPLY_TEMPLATE_ID) return;
  initEmailJS();
  await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams);
}

/**
 * Send both the notification email and auto-reply in parallel.
 */
export async function sendEmailWithAutoReply(
  templateParams: Record<string, string>
): Promise<void> {
  await Promise.all([
    sendEmail(templateParams),
    sendAutoReply(templateParams),
  ]);
}
