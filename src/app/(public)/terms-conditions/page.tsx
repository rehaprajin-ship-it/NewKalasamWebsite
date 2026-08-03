import type { Metadata } from 'next';
import LegalPage from '@/components/common/LegalPage';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = { title: 'Terms & Conditions', description: `Terms and conditions for ${COMPANY.name}.` };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" overline="Legal" lastUpdated="January 1, 2025">
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using this website, you accept and agree to be bound by these terms. If you do not agree, please do not use our website.</p>

      <h2>Products & Pricing</h2>
      <p>All product specifications and pricing are subject to change without notice. Prices listed are indicative and may vary based on quantity, specifications, and market conditions. Formal quotations are provided on request.</p>

      <h2>Orders & Payment</h2>
      <p>All orders are subject to acceptance by {COMPANY.name}. Payment terms will be agreed upon at the time of order confirmation. For export orders, payment terms include LC, TT, and DA/DP.</p>

      <h2>Quality & Returns</h2>
      <p>All products are manufactured under ISO 9001:2015 quality management standards. Claims for defective products must be made within 7 days of delivery with supporting evidence. Return shipments require prior authorization.</p>

      <h2>Intellectual Property</h2>
      <p>All content on this website is the property of {COMPANY.name} and is protected by copyright laws. Unauthorized use is prohibited.</p>

      <h2>Limitation of Liability</h2>
      <p>{COMPANY.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>

      <h2>Governing Law</h2>
      <p>These terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Theni, Tamil Nadu.</p>
    </LegalPage>
  );
}
