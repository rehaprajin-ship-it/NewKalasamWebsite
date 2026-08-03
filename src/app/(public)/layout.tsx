/* ═══════════════════════════════════════════════════════════════
   Public Layout — Navbar + Footer + Floating Elements
   ═══════════════════════════════════════════════════════════════ */

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import BackToTop from '@/components/common/BackToTop';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
