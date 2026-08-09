import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: EmailParams) {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'inquiries@kalasamjaikrishna.co.in';
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error('Resend API returned error:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Failed to send email via Resend:', err);
    throw err;
  }
}

interface FormatEmailInput {
  formType: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  country?: string;
  message?: string;
  sourcePage?: string;
  // Segment specific fields
  territory?: string;
  orderVolume?: string;
  howHeard?: string;
  incoterm?: string;
  role?: string;
  availability?: string;
  // Product / Inquiry List specific
  productName?: string;
  quantity?: string;
  sku?: string;
  variantName?: string;
  items?: Array<{
    productName: string;
    variantName?: string;
    sku?: string;
    quantity: string;
    packingType?: string;
    materialType?: string;
  }>;
}

export function buildAdminEmailHTML(data: FormatEmailInput): string {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' (IST)';
  
  let segmentSpecificHTML = '';
  
  if (data.role || data.availability) {
    segmentSpecificHTML = `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #17a2b8; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #17a2b8; font-size: 14px; text-transform: uppercase;">Job Application Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr><td style="padding: 4px 0; font-weight: bold; width: 140px;">Role Applied For:</td><td style="color: #333;">${data.role || 'N/A'}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">Territory/Coverage:</td><td style="color: #333;">${data.territory || 'N/A'}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">Availability:</td><td style="color: #333;">${data.availability || 'N/A'}</td></tr>
        </table>
      </div>
    `;
  } else if (data.items && data.items.length > 0) {
    let itemsRows = '';
    data.items.forEach((item, index) => {
      itemsRows += `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold;">${index + 1}</td>
          <td style="padding: 10px;">
            <div style="font-weight: bold; color: #128C7E;">${item.productName}</div>
            ${item.variantName ? `<div style="font-size: 11px; color: #666;">Variant: ${item.variantName}</div>` : ''}
            ${item.sku ? `<div style="font-size: 11px; color: #888;">SKU: ${item.sku}</div>` : ''}
          </td>
          <td style="padding: 10px;">${item.materialType || 'Standard'}</td>
          <td style="padding: 10px;">${item.packingType || 'Standard'}</td>
          <td style="padding: 10px; font-weight: bold; color: #25D366; text-align: right;">${item.quantity}</td>
        </tr>
      `;
    });

    segmentSpecificHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #128C7E; font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #128C7E; padding-bottom: 6px;">Requested Products List</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd; text-align: left;">
              <th style="padding: 8px; width: 30px;">#</th>
              <th style="padding: 8px;">Product Description</th>
              <th style="padding: 8px;">Form</th>
              <th style="padding: 8px;">Packaging</th>
              <th style="padding: 8px; text-align: right;">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>
    `;
  } else if (data.productName || data.quantity) {
    segmentSpecificHTML = `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #128C7E; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #128C7E; font-size: 14px; text-transform: uppercase;">Product Request Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr><td style="padding: 4px 0; font-weight: bold; width: 140px;">Product Name:</td><td style="color: #333; font-weight: bold;">${data.productName || 'N/A'}</td></tr>
          ${data.variantName ? `<tr><td style="padding: 4px 0; font-weight: bold;">Selected Variant:</td><td style="color: #333;">${data.variantName}</td></tr>` : ''}
          ${data.sku ? `<tr><td style="padding: 4px 0; font-weight: bold;">SKU:</td><td style="color: #333;">${data.sku}</td></tr>` : ''}
          <tr><td style="padding: 4px 0; font-weight: bold;">Quantity Needed:</td><td style="color: #333; font-weight: bold; color: #25D366;">${data.quantity || 'N/A'}</td></tr>
        </table>
      </div>
    `;
  } else {
    // Distributor, SS, Wholesale, Retail, Export, OEM, etc.
    const fields = [
      { label: 'Target Territory / Region', val: data.territory },
      { label: 'Estimated Order Volume', val: data.orderVolume },
      { label: 'Incoterm Preference', val: data.incoterm },
      { label: 'How They Heard About Us', val: data.howHeard }
    ].filter(f => f.val);

    if (fields.length > 0) {
      let fieldsRows = '';
      fields.forEach(f => {
        fieldsRows += `<tr><td style="padding: 4px 0; font-weight: bold; width: 180px;">${f.label}:</td><td style="color: #333;">${f.val}</td></tr>`;
      });
      segmentSpecificHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #c0a060; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #c0a060; font-size: 14px; text-transform: uppercase;">Segment Specific Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${fieldsRows}
          </table>
        </div>
      `;
    }
  }

  const isJob = !!(data.role || data.availability);
  const themeColor = isJob ? '#17a2b8' : '#128C7E';
  const headerText = isJob ? `New Job Application — ${data.role || 'Field Sales'}` : `New ${data.formType} Inquiry`;

  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, ${themeColor} 0%, #25D366 100%); color: #ffffff; padding: 30px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">${headerText}</h1>
        <p style="margin: 6px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.9);">Submitted via Website Portal</p>
      </div>

      <!-- Main Body -->
      <div style="padding: 24px;">
        <p style="margin-top: 0; font-size: 13px; color: #666;">
          <strong>Source Page:</strong> <code style="background-color: #f1f3f5; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${data.sourcePage || '/'}</code><br/>
          <strong>Timestamp:</strong> ${timestamp}
        </p>

        <!-- Contact Information Block -->
        <div style="margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333; font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #eee; padding-bottom: 6px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px;">
            <tr><td style="padding: 6px 0; font-weight: bold; color: #666; width: 120px;">Name:</td><td style="color: #111; font-weight: bold;">${data.name}</td></tr>
            ${data.company ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Company:</td><td style="color: #111;">${data.company}</td></tr>` : ''}
            <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Email Address:</td><td style="color: #111;"><a href="mailto:${data.email}" style="color: ${themeColor}; text-decoration: none;">${data.email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Phone Number:</td><td style="color: #111;"><a href="tel:${data.phone}" style="color: #111; text-decoration: none;">${data.phone}</a></td></tr>
            ${data.country ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #666;">Country/Region:</td><td style="color: #111;">${data.country}</td></tr>` : ''}
          </table>
        </div>

        <!-- Segment Specific Info -->
        ${segmentSpecificHTML}

        <!-- Message Field -->
        ${data.message ? `
          <div style="margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333; font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #eee; padding-bottom: 6px;">Message / Requirements Details</h3>
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 8px; font-size: 13px; color: #495057; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
          </div>
        ` : ''}

        <!-- Admin Action Footer -->
        <div style="margin-top: 30px; padding-top: 20px; border-t: 1px solid #eee; font-size: 11px; color: #888; text-align: center; line-height: 1.5;">
          Reply directly to this email notification to respond to <strong>${data.name}</strong> at <a href="mailto:${data.email}" style="color: ${themeColor}; text-decoration: none;">${data.email}</a>.<br/>
          &copy; ${new Date().getFullYear()} Jaikrishna Industries — Kalasam Branding.
        </div>
      </div>
    </div>
  `;
}

export function buildCustomerConfirmationHTML(data: FormatEmailInput): string {
  const isJob = !!(data.role || data.availability);
  const themeColor = isJob ? '#17a2b8' : '#128C7E';
  
  let contentText = '';
  if (isJob) {
    contentText = `
      <p style="font-size: 14px; color: #495057; line-height: 1.6;">
        Thank you for submitting your job application for the <strong>${data.role || 'Field Sales Executive'}</strong> position at Kalasam Jaikrishna Industries.
      </p>
      <p style="font-size: 14px; color: #495057; line-height: 1.6;">
        Our recruiting team has received your application. We will review your qualifications, experience, and territory coverage preference. If your profile matches our requirements, we will contact you directly to schedule an interview.
      </p>
    `;
  } else {
    contentText = `
      <p style="font-size: 14px; color: #495057; line-height: 1.6;">
        Thank you for submitting your inquiry to Kalasam Jaikrishna Industries. We have successfully received your request details.
      </p>
      <p style="font-size: 14px; color: #495057; line-height: 1.6;">
        Our technical sales team will review your specifications, target quantities, and destination requirements. We will prepare a detailed B2B quote or get in touch with you shortly to discuss terms.
      </p>
    `;
  }

  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${themeColor} 0%, #25D366 100%); color: #ffffff; padding: 30px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">We Received Your Enquiry</h1>
        <p style="margin: 6px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.9);">Kalasam Jaikrishna Industries</p>
      </div>

      <!-- Body -->
      <div style="padding: 24px;">
        <p style="font-size: 15px; font-weight: bold; color: #111; margin-top: 0;">Hello ${data.name},</p>
        
        ${contentText}

        <div style="margin: 25px 0; padding: 15px; border: 1px solid #e9ecef; border-radius: 8px; background-color: #f8f9fa;">
          <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #666; text-transform: uppercase;">Summary of Details Received</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr><td style="padding: 4px 0; font-weight: bold; color: #666; width: 120px;">Inquiry Type:</td><td style="color: #333;">${isJob ? 'Job Application' : data.formType}</td></tr>
            ${data.productName ? `<tr><td style="padding: 4px 0; font-weight: bold; color: #666;">Product:</td><td style="color: #333; font-weight: bold;">${data.productName}</td></tr>` : ''}
            ${data.quantity ? `<tr><td style="padding: 4px 0; font-weight: bold; color: #666;">Quantity:</td><td style="color: #25D366; font-weight: bold;">${data.quantity}</td></tr>` : ''}
            ${data.items && data.items.length > 0 ? `<tr><td style="padding: 4px 0; font-weight: bold; color: #666;">Total Items:</td><td style="color: #333;">${data.items.length} items requested</td></tr>` : ''}
            ${isJob ? `<tr><td style="padding: 4px 0; font-weight: bold; color: #666;">Current Role:</td><td style="color: #333;">${data.company || 'None'}</td></tr>` : (data.company ? `<tr><td style="padding: 4px 0; font-weight: bold; color: #666;">Company:</td><td style="color: #333;">${data.company}</td></tr>` : '')}
          </table>
        </div>

        <p style="font-size: 13px; color: #888; line-height: 1.5; border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          This is an automated acknowledgment of your website submission. Please do not reply to this email. For direct assistance, you can contact us via phone/WhatsApp at <strong>+91 6383020848</strong> or email at <strong>info@kalasamjaikrishna.co.in</strong>.
        </p>
      </div>
    </div>
  `;
}
