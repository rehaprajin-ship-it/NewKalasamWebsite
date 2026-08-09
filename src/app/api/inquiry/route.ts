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
      country,
      email,
      phone,
      whatsapp,
      quantity,
      requirementType,
      message,
      productName,
      sku,
      variantName,
      sourcePage,
      items, // array of products for consolidated inquiry
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

    const isConsolidated = items && Array.isArray(items) && items.length > 0;
    
    // Format message content for database storage
    let messageContent = '';
    if (isConsolidated) {
      const itemsListFormatted = items
        .map(
          (item: any) =>
            `- ${item.productName}${item.variantName ? ` (${item.variantName})` : ''} [SKU: ${item.sku || 'N/A'}] (Qty: ${item.quantity})`
        )
        .join('\n');
      messageContent = `Consolidated B2B Inquiry:\n\n${itemsListFormatted}\n\nUser Message:\n${message || ''}`;
    } else {
      messageContent = `Product Name: ${productName || 'N/A'}\nSKU: ${sku || 'N/A'}\nSelected Variant: ${variantName || 'N/A'}\nQuantity Needed: ${quantity || 'N/A'}\nRequirement Type: ${requirementType || 'N/A'}\n\nUser Message:\n${message || ''}`;
    }

    const subjectText = isConsolidated
      ? `Consolidated B2B Catalog Inquiry (${items.length} items)`
      : `B2B Product Inquiry — ${productName || 'N/A'}`;

    // 1. Core operation: Save to database first
    let dbId = '';
    let emailStatus = 'EMAIL_PENDING';

    try {
      dbId = await saveContact({
        name,
        company: company || '',
        country: country || 'India',
        email,
        phone,
        whatsapp: whatsapp || '',
        quantity: isConsolidated ? 'Consolidated List' : (quantity || 'N/A'),
        requirementType: requirementType || 'Contract Supply',
        message: messageContent,
        subject: subjectText,
        sourcePage: sourcePage || (isConsolidated ? '/inquiry' : '/products'),
        formType: isConsolidated ? 'Consolidated Inquiry' : 'Product Inquiry',
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.error('Firestore save failed for product inquiry:', dbErr);
      return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
    }

    // 2. Secondary operation: Send emails via Resend
    const adminEmail = process.env.ADMIN_EMAIL || 'srinisrkp@gmail.com';
    const emailParams = {
      formType: isConsolidated ? 'Consolidated Catalog' : 'Product',
      name,
      email,
      phone,
      company,
      country: country || 'India',
      message: message || '',
      sourcePage: sourcePage || (isConsolidated ? '/inquiry' : '/products'),
      productName: isConsolidated ? undefined : productName,
      quantity: isConsolidated ? undefined : quantity,
      sku: isConsolidated ? undefined : sku,
      variantName: isConsolidated ? undefined : variantName,
      items: isConsolidated ? items : undefined,
    };

    let adminSent = false;
    let customerSent = false;

    // Send admin notification
    try {
      const adminHtml = buildAdminEmailHTML(emailParams);
      const subjectLine = isConsolidated
        ? `🔔 New B2B Catalog Inquiry — ${name} (${items.length} items)`
        : `🔔 New Product Inquiry — ${productName} — ${name}`;
        
      await sendEmail({
        to: adminEmail,
        subject: subjectLine,
        html: adminHtml,
        replyTo: email,
      });
      adminSent = true;
    } catch (adminErr) {
      console.error('Resend admin product inquiry notification failed:', adminErr);
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
      console.error('Resend customer product inquiry confirmation failed:', custErr);
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
        console.error('Failed to update email status on firestore product inquiry doc:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      id: dbId,
      emailStatus,
    });

  } catch (err: any) {
    console.error('Error handling API product inquiry POST:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
