import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/firestore';
import { BLOG_POSTS } from '@/data/blog-posts';
import { seedProducts } from '@/data/products';
import { SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/industrial-chemicals',
    '/pooja-products',
    '/export',
    '/manufacturing',
    '/distributors',
    '/wholesale',
    '/private-label',
    '/oem-manufacturing',
    '/infrastructure',
    '/research-development',
    '/quality-control',
    '/industries-we-serve',
    '/gallery',
    '/blog',
    '/contact',
    '/careers',
    '/certificates',
    '/downloads',
    '/msds-library',
    '/coa-library',
    '/privacy-policy',
    '/terms-conditions',
    '/shipping-policy',
    '/refund-policy',
    '/disclaimer'
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  // Fetch dynamic products from Firestore
  let productsList: any[] = [];
  try {
    productsList = await getProducts();
  } catch (e) {}

  // Fallback if empty
  if (productsList.length === 0) {
    productsList = seedProducts;
  }

  const productRoutes = productsList.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  // Fetch dynamic blog posts
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date((post as any).modifiedDate || post.publishDate || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
