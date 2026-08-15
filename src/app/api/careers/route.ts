import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/firestore';
import { sendEmail, buildAdminEmailHTML, buildCustomerConfirmationHTML, getRecipientForFormType } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot anti-spam check
    if (body.website_honeypot) {
      console.warn('Spam submission detected via honeypot.');
      return NextResponse.json({ success: true, message: 'Filtered as spam' });
    }

    const {
      name,
      email,
      phone,
      whatsapp,
      currentLocation,
      experience,
      preferredTerritory,
      currentRole,
      message,
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

    const messageContent = `WhatsApp: ${whatsapp || 'N/A'}\nCurrent Location: ${currentLocation || 'N/A'}\nExperience: ${experience || 'N/A'}\nPreferred Territory: ${preferredTerritory || 'N/A'}\nCurrent Role: ${currentRole || 'N/A'}\n\n${message || ''}`;

    try {
      dbId = await saveContact({
        name,
        email,
        phone,
        subject: `Job Application — Field Sales Executive`,
        message: messageContent,
        company: currentRole || 'None',
        country: 'India',
        sourcePage: sourcePage || '/careers',
        formType: 'Careers Application',
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.error('Firestore save failed for career application:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = getRecipientForFormType('careers');
    const emailParams = {
      formType: 'Careers Application',
      name,
      email,
      phone,
      company: currentRole || 'None',
      country: 'India',
      message: message || '',
      sourcePage: sourcePage || '/careers',
      role: 'Field Sales Executive / Line Salesman',
      territory: preferredTerritory || 'N/A',
      availability: `Current Location: ${currentLocation} | Experience: ${experience} | WhatsApp: ${whatsapp}`,
    };

    let adminSent = false;
    let customerSent = false;

    // Send admin notification with distinct visual structure (role information)
    try {
      const adminHtml = buildAdminEmailHTML(emailParams);
      await sendEmail({
        to: adminEmail,
        subject: `📋 New Job Application — ${name} — Field Sales`,
        html: adminHtml,
        replyTo: email,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin career notification failed:', adminErr);
    }

    // Send customer confirmation
    try {
      const customerHtml = buildCustomerConfirmationHTML(emailParams);
      await sendEmail({
        to: email,
        subject: `We Received Your Job Application — Kalasam Jaikrishna Industries`,
        html: customerHtml,
      });
      customerSent = true;
    } catch (custErr) {
      console.error('Resend customer career confirmation failed:', custErr);
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
        console.error('Failed to update email status on firestore career doc:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbId,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API careers POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
