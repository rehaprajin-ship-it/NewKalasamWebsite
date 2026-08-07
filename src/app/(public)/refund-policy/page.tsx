import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import LegalPage from '@/components/common/LegalPage';

export const metadata: Metadata = {
  alternates: { canonical: `/refund-policy` }, title: 'Refund Policy', description: 'Refund and return policy for Kalasam products.' };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" overline="Legal" lastUpdated="January 1, 2025">
      <h2>Quality Guarantee</h2>
      <p>All our products are manufactured under ISO 9001:2015 quality standards and are thoroughly tested before dispatch. We stand behind the quality of every product we ship.</p>

      <h2>Defective Products</h2>
      <p>If you receive a product that does not meet the agreed specifications, please notify us within 7 days of delivery. Provide batch number, photographs, and a description of the issue. We will arrange for replacement or credit.</p>

      <h2>Return Process</h2>
      <ul>
        <li>Contact our customer service team with your complaint</li>
        <li>Provide batch number and photographic evidence</li>
        <li>Do not dispose of the defective product until our team inspects it</li>
        <li>Returns must be authorized by our quality team</li>
        <li>Return shipping costs for verified defective products will be borne by us</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <p>Custom-manufactured OEM products and private-label products are non-returnable unless they fail to meet agreed specifications. Products damaged due to improper storage or handling by the buyer are not eligible for returns.</p>

      <h2>Refund Timeline</h2>
      <p>Approved refunds or credits are processed within 15 business days of receiving the returned product and completing our quality investigation.</p>
    </LegalPage>
  );
}
