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

import { SITE_NAME, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Camphor Manufacturer & Exporter India`,
  description: `Jaikrishna Industries manufactures synthetic camphor, D-camphor, and isoborneol in Theni, Tamil Nadu. ISO-certified, exported to 17+ countries. Get a quote today.`,
  alternates: { canonical: '/' },
  keywords: [
    'synthetic camphor manufacturer Theni Tamil Nadu',
    'camphor exporter India',
    'isoborneol flakes supplier Chennai Madurai Coimbatore',
    'pooja products wholesale dealer Tamil Nadu',
    'camphor tablets bulk distributor Karnataka Andhra Kerala',
    'industrial chemicals manufacturer Mumbai Gujarat Delhi',
    'Theni chemical industry',
    'Kalasam Jaikrishna Industries'
  ]
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSlider />
        <CompanyIntro />
        <ProductCategories />
        <ManufacturingExcellence />
        <Statistics />
        <ExportDivision />
        <IndustriesServed />
        <QualitySection />
        <WhyChooseUs />
        <CompanyTimeline />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
