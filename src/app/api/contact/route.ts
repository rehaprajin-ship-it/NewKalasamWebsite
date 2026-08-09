import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/firestore';
import { sendEmail, buildAdminEmailHTML, buildCustomerConfirmationHTML } from '@/lib/email/resend';

// Simple honeypot & basic structure validation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot anti-spam check
    if (body.website_honeypot) {
      console.warn('Spam submission detected via honeypot.');
      return NextResponse.json({ success: true, message: 'Message filtered as spam' });
    }

    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      department,
      sourcePage,
    } = body;

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid business email address' }, { status: 400 });
    }
    if (!phone || phone.trim().length < 5) {
      return NextResponse.json({ error: 'Valid contact number is required' }, { status: 400 });
    }

    // 1. Core operation: Save to database first
    let dbId = '';
    let emailStatus = 'EMAIL_PENDING';
    
    try {
      dbId = await saveContact({
        name,
        email,
        phone,
        company: company || '',
        subject: subject || 'General Query',
        message: message || '',
        department: department || 'sales',
        sourcePage: sourcePage || '/contact',
        formType: 'General Contact',
      });
    } catch (dbErr) {
      console.error('Firestore save failed for contact submission:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = process.env.ADMIN_EMAIL || 'srinisrkp@gmail.com';
    const emailParams = {
      formType: 'General Contact',
      name,
      email,
      phone,
      company,
      subject,
      message,
      sourcePage: sourcePage || '/contact',
    };

    let adminSent = false;
    let customerSent = false;

    // Send admin notification
    try {
      const adminHtml = buildAdminEmailHTML(emailParams);
      await sendEmail({
        to: adminEmail,
        subject: `🔔 New Contact Inquiry — ${name}${company ? ` (${company})` : ''}`,
        html: adminHtml,
        replyTo: email,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin contact notification failed:', adminErr);
    }

    // Send customer confirmation
    try {
      const customerHtml = buildCustomerConfirmationHTML(emailParams);
      await sendEmail({
        to: email,
        subject: `We Received Your Enquiry — Kalasam Jaikrishna Industries`,
        html: customerHtml,
      });
      customerSent = true;
    } catch (custErr) {
      console.error('Resend customer contact confirmation failed:', custErr);
    }

    // Update email status on firestore document if saved
    if (dbId) {
      try {
        const { getFirebaseDb } = require('@/lib/firebase');
        const { doc, updateDoc, serverTimestamp } = require('firebase/firestore');
        const db = getFirebaseDb();
        const docRef = doc(db, 'contacts', dbId);
        
        emailStatus = adminSent && customerSent ? 'EMAIL_SENT' : (adminSent ? 'EMAIL_PARTIAL' : 'EMAIL_FAILED');
        
        await updateDoc(docRef, {
          emailStatus,
          emailSentAt: serverTimestamp(),
        });
      } catch (updateErr) {
        console.error('Failed to update email status on firestore contact:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbId,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API contact POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
