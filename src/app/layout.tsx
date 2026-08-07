import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/context/AuthProvider';
import { ToastProvider } from '@/context/ToastProvider';
import { COMPANY, SITE_URL, SITE_NAME } from '@/lib/constants';
import EnquiryModal from '@/components/common/EnquiryModal';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#25D366',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Camphor & Chemical Manufacturer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: COMPANY.metaDescription,
  verification: {
    google: '0eYZe7AYbI2_cdaJ4TddTcfy8HTrMrZYL35TSuO9iN8',
  },
  keywords: [
    // 1. Company Keywords
    'Kalasam Jaikrishna Industries', 'Jaikrishna Industries', 'Kalasam India', 'Jaikrishna Exporters',
    'Chemical Manufacturer India', 'Chemical Exporter India', 'Industrial Chemical Manufacturer',
    'Industrial Chemical Supplier', 'Chemical Factory India', 'Chemical Company Tamil Nadu',
    'Chemical Manufacturer Theni', 'Made in India Chemicals', 'Indian Chemical Exporter',
    'OEM Chemical Manufacturer', 'Private Label Chemical Manufacturer', 'Bulk Chemical Supplier',
    'Wholesale Chemical Supplier', 'Chemical Manufacturing Company',
    // 2. Synthetic Camphor Keywords
    'Synthetic Camphor', 'Synthetic Camphor Manufacturer', 'Synthetic Camphor Supplier',
    'Synthetic Camphor Exporter', 'Synthetic Camphor Powder', 'Synthetic Camphor Crystal',
    'Industrial Synthetic Camphor', 'Bulk Synthetic Camphor', 'Buy Synthetic Camphor',
    'Synthetic Camphor India', 'Synthetic Camphor Manufacturer India', 'Synthetic Camphor Wholesale',
    'Synthetic Camphor Chemical', 'Synthetic Camphor Factory', 'Camphor Chemical Manufacturer',
    'Synthetic Camphor Price', 'Synthetic Camphor Supplier India',
    // 3. D Camphor Keywords
    'D Camphor', 'Natural D Camphor', 'D Camphor Powder', 'D Camphor Manufacturer',
    'D Camphor Exporter', 'D Camphor Supplier', 'Pure D Camphor', 'Pharmaceutical D Camphor',
    'Bulk D Camphor', 'D Camphor India', 'D Camphor Wholesale',
    // 4. Isoborneol Powder Keywords
    'Isoborneol Powder', 'Isoborneol Manufacturer', 'Isoborneol Supplier', 'Isoborneol Exporter',
    'Isoborneol India', 'Industrial Isoborneol', 'Bulk Isoborneol', 'High Purity Isoborneol',
    'Buy Isoborneol Powder', 'Isoborneol CAS Number', 'Isoborneol Chemical', 'Pharmaceutical Isoborneol',
    'Cosmetic Grade Isoborneol', 'Fragrance Grade Isoborneol',
    // 5. Isoborneol Flakes
    'Isoborneol Flakes', 'Isoborneol Flakes Manufacturer', 'Isoborneol Flakes Supplier',
    'Isoborneol Flakes Exporter', 'Bulk Isoborneol Flakes', 'Industrial Isoborneol Flakes',
    'Isoborneol Crystal', 'High Purity Isoborneol Flakes',
    // 6. Camphor Oil
    'Camphor Oil', 'Pure Camphor Oil', 'Camphor Oil Manufacturer', 'Camphor Oil Supplier',
    'Camphor Oil Exporter', 'Natural Camphor Oil', 'Industrial Camphor Oil', 'Camphor Essential Oil',
    'Camphor Oil India', 'Bulk Camphor Oil',
    // 7. Camphor Tablets
    'Camphor Tablets', 'Pooja Camphor Tablets', 'Camphor Tablets Manufacturer', 'Camphor Tablets Supplier',
    'Camphor Tablets Wholesale', 'Temple Camphor', 'Camphor Cubes', 'White Camphor Tablets', 'Buy Camphor Tablets',
    // 8. Agarbathi
    'Agarbathi', 'Incense Sticks', 'Premium Agarbathi', 'Agarbathi Manufacturer', 'Agarbathi Supplier',
    'Agarbathi Exporter', 'Wholesale Agarbathi', 'Natural Incense Sticks', 'Temple Incense',
    'Flora Agarbathi', 'Sandal Agarbathi', 'Jasmine Agarbathi', 'Rose Agarbathi',
    // 9. Lamp Oil
    'Lamp Oil', 'Pooja Lamp Oil', 'Deepam Oil', 'Gingelly Lamp Oil', 'Sesame Lamp Oil', 'Temple Lamp Oil',
    'Premium Lamp Oil', 'Lamp Oil Manufacturer', 'Lamp Oil Supplier', 'Lamp Oil Exporter',
    // 10. Sambrani
    'Sambrani Cups', 'Cup Sambrani', 'Computer Sambrani', 'Natural Sambrani', 'Sambrani Manufacturer',
    'Sambrani Exporter', 'Sambrani Supplier', 'Temple Sambrani', 'Premium Sambrani', 'Bulk Sambrani',
    // 11. Rose Water
    'Rose Water', 'Paneer Rose Water', 'Pure Rose Water', 'Rose Water Manufacturer', 'Rose Water Supplier',
    'Rose Water Exporter', 'Damask Rose Water', 'Natural Rose Water', 'Food Grade Rose Water', 'Cosmetic Rose Water',
    // 12. Export & Location SEO
    'Chemical Exporter India', 'Chemical Export Company', 'Camphor Exporter', 'Isoborneol Exporter',
    'Bulk Chemical Export', 'Industrial Chemical Export', 'Chemical Export to Bangladesh',
    'Chemical Export to Malaysia', 'Chemical Export to UAE', 'Chemical Export to Singapore',
    'Chemical Export to Africa', 'Chemical Export to Europe', 'Chemical Export Documentation',
    'Chemical Export Manufacturer', 'Chemical Manufacturer Tamil Nadu', 'Chemical Manufacturer Theni',
    'Chemical Manufacturer South India', 'Industrial Chemical Supplier Tamil Nadu', 'Camphor Manufacturer India',
    'Camphor Manufacturer Tamil Nadu', 'Indian Chemical Export Company',
    // 13. Buyer Intent Keywords
    'Buy Synthetic Camphor', 'Buy Isoborneol Powder', 'Buy D Camphor', 'Buy Camphor Oil', 'Buy Agarbathi',
    'Buy Lamp Oil', 'Buy Sambrani Cups', 'Buy Rose Water', 'Synthetic Camphor Manufacturer India',
    'Bulk Camphor Supplier', 'Chemical Supplier Near Me', 'Industrial Chemical Exporter',
    'OEM Chemical Manufacturer India', 'Private Label Camphor Manufacturer', 'Best Chemical Manufacturer India'
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Camphor & Chemical Manufacturer`,
    description: COMPANY.metaDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jaikrishna Industries — Camphor and industrial chemical manufacturing facility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Camphor & Chemical Manufacturer`,
    description: COMPANY.metaDescription,
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: SITE_NAME,
              legalName: 'Jaikrishna Industries',
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/logo.png`,
                width: 200,
                height: 60,
              },
              description: COMPANY.description,
              foundingDate: COMPANY.founded,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Telephone Nagar',
                addressLocality: COMPANY.location.city,
                addressRegion: COMPANY.location.state,
                addressCountry: 'IN',
                postalCode: COMPANY.location.pincode,
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: COMPANY.contact.phone,
                  contactType: 'sales',
                  email: COMPANY.contact.email,
                  availableLanguage: ['English', 'Tamil', 'Hindi'],
                  areaServed: ['IN', 'BD', 'LK', 'MY', 'SG', 'AE', 'SA', 'OM', 'QA', 'KW', 'NG', 'KE', 'US'],
                },
              ],
              sameAs: Object.values(COMPANY.social),
              brand: [
                { '@type': 'Brand', name: 'Kalasam' },
                { '@type': 'Brand', name: 'Temple Dharisana' },
              ],
            }),
          }}
        />

        {/* JSON-LD LocalBusiness + Manufacturer Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'Manufacturer'],
              '@id': `${SITE_URL}/#localbusiness`,
              name: SITE_NAME,
              description: COMPANY.description,
              url: SITE_URL,
              telephone: COMPANY.contact.phone,
              email: COMPANY.contact.email,
              image: `${SITE_URL}/opengraph-image.png`,
              logo: `${SITE_URL}/images/logo.png`,
              priceRange: '$$',
              currenciesAccepted: 'INR, USD',
              paymentAccepted: 'Bank Transfer, LC',
              foundingDate: COMPANY.founded,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Telephone Nagar',
                addressLocality: 'Theni',
                addressRegion: 'Tamil Nadu',
                postalCode: '625531',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 10.0104,
                longitude: 77.4768,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '18:00',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Industrial Chemicals & Pooja Products',
                itemListElement: [
                  {
                    '@type': 'OfferCatalog',
                    name: 'Industrial Chemicals',
                    url: `${SITE_URL}/industrial-chemicals`,
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Pooja & Temple Products',
                    url: `${SITE_URL}/pooja-products`,
                  },
                ],
              },
              sameAs: Object.values(COMPANY.social),
              additionalType: 'http://www.productontology.org/id/Chemical_manufacturer',
            }),
          }}
        />

        {/* Preconnect hints for critical 3rd party origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Google Analytics 4 — Replace G-XXXXXXXXXX with your Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6RY7XSD72L"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6RY7XSD72L');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-800 antialiased pb-16 lg:pb-0">
        <AuthProvider>
          <ToastProvider>
            {children}
            <EnquiryModal />
            <MobileBottomBar />
            <Analytics />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
