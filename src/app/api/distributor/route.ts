import { NextResponse } from 'next/server';
import { saveDistributorApplication } from '@/lib/firestore';
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
      company,
      email,
      phone,
      city,
      state,
      pincode,
      experience,
      investment,
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

    const territory = `${city || ''}, ${state || ''} - ${pincode || ''}`.replace(/^,\s*|,\s*$/, '').trim();

    // 1. Core operation: Save to database first
    let dbId = '';
    let emailStatus = 'EMAIL_PENDING';

    try {
      dbId = await saveDistributorApplication({
        name,
        company: company || '',
        email,
        phone,
        city: city || '',
        state: state || '',
        pincode: pincode || '',
        experience: experience || '',
        investment: investment || '',
        message: message || '',
        sourcePage: sourcePage || '/distributors',
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.error('Firestore save failed for distributor application:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = getRecipientForFormType('distributor');
    const emailParams = {
      formType: 'Distributor',
      name,
      email,
      phone,
      company,
      country: 'India',
      message,
      sourcePage: sourcePage || '/distributors',
      territory: territory || 'N/A',
      orderVolume: investment ? `Investment Capacity: ${investment}` : 'N/A',
      howHeard: experience ? `Experience: ${experience}` : 'N/A',
    };

    let adminSent = false;
    let customerSent = false;

    // Send admin notification
    try {
      const adminHtml = buildAdminEmailHTML(emailParams);
      await sendEmail({
        to: adminEmail,
        subject: `🔔 New Distributor Inquiry — ${name}${company ? ` (${company})` : ''}`,
        html: adminHtml,
        replyTo: email,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin distributor notification failed:', adminErr);
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
      console.error('Resend customer distributor confirmation failed:', custErr);
    }

    // Update email status on firestore document if saved
    if (dbId) {
      try {
        const { getFirebaseDb } = require('@/lib/firebase');
        const { doc, updateDoc, serverTimestamp } = require('firebase/firestore');
        const db = getFirebaseDb();
        const docRef = doc(db, 'distributors', dbId);
        
        emailStatus = adminSent && customerSent ? 'EMAIL_SENT' : (adminSent ? 'EMAIL_PARTIAL' : 'EMAIL_FAILED');
        
        await updateDoc(docRef, {
          emailStatus,
          emailSentAt: serverTimestamp(),
        });
      } catch (updateErr) {
        console.error('Failed to update email status on firestore distributor doc:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbId,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API distributor POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
