import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/firestore';
import { sendEmail, buildNewsletterAdminEmailHTML, buildNewsletterCustomerConfirmationHTML, getRecipientForFormType } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot anti-spam check
    if (body.website_honeypot) {
      console.warn('Spam subscription detected via honeypot.');
      return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    }

    const { email, source } = body;

    // Server-side validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 1. Core operation: Save to database first
    try {
      await subscribeNewsletter(email.trim(), source || 'footer');
    } catch (dbErr) {
      console.error('Firestore newsletter subscription failed:', dbErr);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = getRecipientForFormType('newsletter');
    let adminSent = false;
    let customerSent = false;

    // Send admin notification
    try {
      const adminHtml = buildNewsletterAdminEmailHTML(email, source || 'footer');
      await sendEmail({
        to: adminEmail,
        subject: `🔔 New Newsletter Subscriber — ${email}`,
        html: adminHtml,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin newsletter notification failed:', adminErr);
    }

    // Send customer welcome confirmation
    try {
      const customerHtml = buildNewsletterCustomerConfirmationHTML(email);
      await sendEmail({
        to: email,
        subject: `Welcome to Kalasam Newsletter!`,
        html: customerHtml,
      });
      customerSent = true;
    } catch (custErr) {
      console.error('Resend customer newsletter confirmation failed:', custErr);
    }

    const emailStatus = adminSent && customerSent ? 'EMAIL_SENT' : (adminSent ? 'EMAIL_PARTIAL' : 'EMAIL_FAILED');

    return NextResponse.json({
      success: true,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API newsletter POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
