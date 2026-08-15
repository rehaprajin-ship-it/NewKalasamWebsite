/* ═══════════════════════════════════════════════════════════════
   404 Not Found Page
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Jaikrishna Industries Logo"
            width={200}
            height={70}
            className="h-auto max-h-[70px] object-contain"
            style={{ width: 'auto' }}
          />
        </div>
        <div className="text-8xl font-800 text-primary/10 mb-4">404</div>
        <h1 className="text-3xl font-700 text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/products" className="btn btn-outline">
            Products
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
