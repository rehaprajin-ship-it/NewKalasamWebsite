/* ═══════════════════════════════════════════════════════════════
   Homepage — Kalasam Jaikrishna Industries
   20+ Premium Sections — Every section unique
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import BackToTop from '@/components/common/BackToTop';

import HeroSlider from '@/components/home/HeroSlider';
import CompanyIntro from '@/components/home/CompanyIntro';
import ProductCategories from '@/components/home/ProductCategories';
import ManufacturingExcellence from '@/components/home/ManufacturingExcellence';
import ExportDivision from '@/components/home/ExportDivision';
import IndustriesServed from '@/components/home/IndustriesServed';
import Statistics from '@/components/home/Statistics';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CompanyTimeline from '@/components/home/CompanyTimeline';
import Testimonials from '@/components/home/Testimonials';
import QualitySection from '@/components/home/QualitySection';
import ContactCTA from '@/components/home/ContactCTA';
import HomepageFAQ from '@/components/home/HomepageFAQ';
import ProductComparison from '@/components/home/ProductComparison';

import { SITE_NAME, SITE_URL, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kalasam Jaikrishna Industries — Camphor Manufacturer',
  description: 'Certified manufacturer & exporter of synthetic camphor, D-camphor, and isoborneol flakes. Supplying premium pooja products and chemicals worldwide from India.',
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* Visually hidden semantic H1 for non-JS search engine crawlers */}
      <h1 className="sr-only">Kalasam Jaikrishna Industries — Premium Camphor Manufacturer, Supplier & Exporter India</h1>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is synthetic camphor, and how is it used?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Synthetic camphor is a manufactured alternative to natural camphor, produced from alpha-pinene through a multi-step chemical process. You can use it across pharmaceutical formulations, fragrance compounding, cellulose plasticization, and religious ceremonies. Our facility processes over 500 metric tons of synthetic camphor annually, meeting ISO 9001:2015 quality standards.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you supply camphor and pooja products in bulk?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes — we are a direct-from-factory bulk manufacturer. You can order camphor tablets, agarbathi, cup sambrani, lamp oil, and rose water in wholesale quantities. We offer flexible packaging from 1 kg retail packs to 30 kg industrial bags. Minimum order quantities vary by product; contact our sales team for a custom quote.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which countries do you export to?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We export to over 17 countries, including Bangladesh, Sri Lanka, Malaysia, Singapore, UAE, Saudi Arabia, Oman, Qatar, Kuwait, Nigeria, Kenya, and the United States. All shipments comply with international packaging standards (ISPM-15), and we provide full export documentation including COA, MSDS, and phytosanitary certificates.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I become a distributor or super stockist?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We actively appoint distributors and super stockists across India. As a distributor, you get exclusive territory rights, marketing support, and competitive trade margins. Visit our Distributors page to submit your application, or call us directly at +91 6383020848. We typically respond within 48 hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'What quality certifications does Jaikrishna Industries hold?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our manufacturing facility holds ISO 9001:2015 certification for quality management systems. Every batch undergoes in-house laboratory testing for purity, sublimation rate, and moisture content. We provide Certificates of Analysis (COA) and Material Safety Data Sheets (MSDS) with every industrial shipment, per international B2B buyer requirements.',
                },
              },
            ],
          }),
        }}
      />
      
      <main className="flex-1">
        <HeroSlider />
        <CompanyIntro />
        <ProductCategories />
        <ProductComparison />
        <ManufacturingExcellence />
        <Statistics />
        <ExportDivision />
        <IndustriesServed />
        <QualitySection />
        <WhyChooseUs />
        <CompanyTimeline />
        <Testimonials />
        <HomepageFAQ />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
