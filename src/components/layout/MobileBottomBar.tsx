'use client';

/* ═══════════════════════════════════════════════════════════════
   Mobile Bottom Action Bar — Persistent bottom nav (mobile only)
   Contains: Home, Products, WhatsApp, Enquire
   Respects safe-area-inset-bottom for iPhone home indicator.
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import { COMPANY } from '@/lib/constants';

const whatsappUrl = (number: string) =>
  `https://wa.me/${number.replace(/\+/g, '')}?text=${encodeURIComponent('Hello, I would like to inquire about your products.')}`;

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { items, setIsDrawerOpen } = useInquiry();

  // Don't show on admin routes
  if (pathname.startsWith('/admin')) return null;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const openEnquiry = () => {
    setIsDrawerOpen(true);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 h-14">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-600 transition-colors ${
            isActive('/') && !isActive('/products')
              ? 'text-primary'
              : 'text-gray-500'
          }`}
          aria-label="Home"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive('/') && !isActive('/products') ? 2.5 : 2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </Link>

        {/* Products */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-600 transition-colors ${
            isActive('/products')
              ? 'text-primary'
              : 'text-gray-500'
          }`}
          aria-label="Products"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive('/products') ? 2.5 : 2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Products</span>
        </Link>

        {/* WhatsApp */}
        <a
          href={whatsappUrl(COMPANY.contact.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-600 text-[#25D366]"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Enquire */}
        <button
          onClick={openEnquiry}
          className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-600 text-primary cursor-pointer"
          aria-label="Open enquiry form"
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] font-900 w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                {items.length}
              </span>
            )}
          </div>
          <span>Enquire</span>
        </button>
      </div>
    </nav>
  );
}
