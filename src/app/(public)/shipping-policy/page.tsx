import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import LegalPage from '@/components/common/LegalPage';

export const metadata: Metadata = {
  alternates: { canonical: `/shipping-policy` }, title: 'Shipping Policy', description: 'Shipping policy for domestic and international orders.' };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" overline="Legal" lastUpdated="January 1, 2025">
      <h2>Domestic Shipping</h2>
      <p>We ship across India through trusted logistics partners. Typical delivery time is 5-10 business days from dispatch. Shipping charges are calculated based on weight, volume, and destination.</p>

      <h2>Export Shipping</h2>
      <p>International orders are shipped via sea freight (FCL/LCL) or air freight based on order requirements. We handle all export documentation including commercial invoice, packing list, certificate of origin, fumigation certificate, and customs clearance.</p>

      <h2>Packaging</h2>
      <p>All products are packed in appropriate packaging — HDPE bags, fiber drums, cartons, or containers — suitable for the product type and destination. Export orders include palletization and containerization.</p>

      <h2>Tracking</h2>
      <p>Tracking information is provided for all shipments. For export orders, we share bill of lading, container number, and vessel details.</p>

      <h2>Insurance</h2>
      <p>Shipment insurance is available on request. We recommend insurance for all international shipments.</p>
    </LegalPage>
  );
}
