import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/firestore';
import { sendEmail, buildAdminEmailHTML, buildCustomerConfirmationHTML } from '@/lib/email/resend';

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
      territory,
      warehouseSize,
      currentBusiness,
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

    // 1. Core operation: Save to database first
    let dbId = '';
    let emailStatus = 'EMAIL_PENDING';

    const messageContent = `Territory: ${territory || 'N/A'}\nWarehouse: ${warehouseSize || 'N/A'}\nCurrent Business: ${currentBusiness || 'N/A'}\nInvestment Capacity: ${investment || 'N/A'}\n\n${message || ''}`;

    try {
      dbId = await saveContact({
        name,
        company: company || '',
        email,
        phone,
        subject: `Super Stockist Application — ${territory || 'N/A'}`,
        message: messageContent,
        country: 'India',
        sourcePage: sourcePage || '/super-stockist',
        formType: 'Super Stockist',
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.error('Firestore save failed for super stockist application:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = process.env.ADMIN_EMAIL || 'srinisrkp@gmail.com';
    const emailParams = {
      formType: 'Super Stockist',
      name,
      email,
      phone,
      company,
      country: 'India',
      message: message || '',
      sourcePage: sourcePage || '/super-stockist',
      territory: territory || 'N/A',
      orderVolume: investment ? `Investment: ${investment} | Warehouse: ${warehouseSize}` : 'N/A',
      howHeard: currentBusiness ? `Current Business: ${currentBusiness}` : 'N/A',
    };

    let adminSent = false;
    let customerSent = false;

    // Send admin notification
    try {
      const adminHtml = buildAdminEmailHTML(emailParams);
      await sendEmail({
        to: adminEmail,
        subject: `🔔 New Super Stockist Inquiry — ${company || name}`,
        html: adminHtml,
        replyTo: email,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin super stockist notification failed:', adminErr);
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
      console.error('Resend customer super stockist confirmation failed:', custErr);
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
        console.error('Failed to update email status on firestore super stockist doc:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbId,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API super-stockist POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
