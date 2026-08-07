/* ═══════════════════════════════════════════════════════════════
   Breadcrumbs — Visual breadcrumb trail + BreadcrumbList schema
   Usage: <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Products',href:'/products'},{label:'Synthetic Camphor'}]} />
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

interface BreadcrumbItem {
  label: string;
  href?: string;  // Last item (current page) has no href
}

export default function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbItem[];
  light?: boolean;
}) {
  // Build schema items with full URLs
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href
      ? item.href.startsWith('http')
        ? item.href
        : `${SITE_URL}${item.href}`
      : `${SITE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`,
  }));

  return (
    <>
      {/* JSON-LD BreadcrumbList schema */}
      <BreadcrumbSchema items={schemaItems} />

      {/* Visual breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-500 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg className={`w-3 h-3 flex-shrink-0 ${light ? 'text-white/30' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}

              {isLast || !item.href ? (
                <span className={`${light ? 'text-accent-light font-600' : 'text-primary font-600'} truncate max-w-[200px]`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`${light ? 'text-white/50 hover:text-white/80' : 'text-gray-400 hover:text-gray-600'} transition-colors truncate max-w-[150px]`}
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
