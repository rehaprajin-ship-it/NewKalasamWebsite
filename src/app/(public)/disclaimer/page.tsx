import type { Metadata } from 'next';
import LegalPage from '@/components/common/LegalPage';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = { title: 'Disclaimer', description: `Disclaimer for ${COMPANY.name} website.` };

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" overline="Legal" lastUpdated="January 1, 2025">
      <h2>General Information</h2>
      <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and accurate, {COMPANY.name} makes no representations or warranties of any kind about the completeness, accuracy, or reliability of the information.</p>

      <h2>Product Information</h2>
      <p>Product specifications, images, and descriptions are provided for reference purposes. Actual product characteristics may vary slightly between batches. For exact specifications, please request a Certificate of Analysis (COA) for the specific batch.</p>

      <h2>Professional Advice</h2>
      <p>Nothing on this website constitutes professional chemical, pharmaceutical, or regulatory advice. Users should consult relevant experts and regulatory authorities for specific applications and compliance requirements.</p>

      <h2>External Links</h2>
      <p>Our website may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices.</p>

      <h2>Limitation</h2>
      <p>In no event shall {COMPANY.name} be liable for any loss or damage arising from the use of this website or reliance on any information provided herein.</p>
    </LegalPage>
  );
}
