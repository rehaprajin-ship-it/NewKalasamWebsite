import type { Metadata } from 'next';
import LegalPage from '@/components/common/LegalPage';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = { title: 'Privacy Policy', description: `Privacy policy for ${COMPANY.name} website.` };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" overline="Legal" lastUpdated="January 1, 2025">
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or subscribe to our newsletter. This may include your name, email address, phone number, company name, and message content.</p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries and provide customer support</li>
        <li>To send you quotations, product information, and order updates</li>
        <li>To send marketing communications (with your consent)</li>
        <li>To improve our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

      <h2>Third-Party Services</h2>
      <p>We use Firebase (Google) for authentication and data storage, Cloudinary for image hosting, and EmailJS for email notifications. These services have their own privacy policies.</p>

      <h2>Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. <a href="/contact">Contact us</a> for any privacy-related requests.</p>

      <h2>Contact</h2>
      <p>{COMPANY.name}<br />{COMPANY.location.address}<br />Phone: {COMPANY.contact.phone}<br /><a href="/contact">Contact Form</a></p>
    </LegalPage>
  );
}
