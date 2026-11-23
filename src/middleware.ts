import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COMING_SOON_HTML } from '@/lib/comingSoonHtml';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets, images, fonts, and Next.js internal files to pass through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/coming-soon.html' ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|txt|json)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Intercept every other route (/, /about, /products, /contact, invalid URLs, etc.)
  // and serve the Coming Soon page
  return new NextResponse(COMING_SOON_HTML, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, must-revalidate',
      'retry-after': '86400',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!_next/static|_next/image).*)',
  ],
};

