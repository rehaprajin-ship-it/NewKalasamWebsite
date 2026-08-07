import type { BlogPost } from '@/types/blog';
import { BLOG_POSTS_BATCH1 } from './blog-posts-batch1';
import { BLOG_POSTS_BATCH2 } from './blog-posts-batch2';
import { BLOG_POSTS_BATCH3 } from './blog-posts-batch3';
import { BLOG_POSTS_BATCH4 } from './blog-posts-batch4';
import { BLOG_POSTS_BATCH5 } from './blog-posts-batch5';
import { BLOG_POSTS_BATCH6 } from './blog-posts-batch6';
import { BLOG_POSTS_BATCH7 } from './blog-posts-batch7';
import { BLOG_POSTS_BATCH8 } from './blog-posts-batch8';
import { BLOG_POSTS_BATCH9 } from './blog-posts-batch9';
import { BLOG_POSTS_BATCH10 } from './blog-posts-batch10';
import { BLOG_POSTS_BATCH11 } from './blog-posts-batch11';

const ALL_RAW_POSTS: BlogPost[] = [
  ...BLOG_POSTS_BATCH1,
  ...BLOG_POSTS_BATCH2,
  ...BLOG_POSTS_BATCH3,
  ...BLOG_POSTS_BATCH4,
  ...BLOG_POSTS_BATCH5,
  ...BLOG_POSTS_BATCH6,
  ...BLOG_POSTS_BATCH7,
  ...BLOG_POSTS_BATCH8,
  ...BLOG_POSTS_BATCH9,
  ...BLOG_POSTS_BATCH10,
  ...BLOG_POSTS_BATCH11,
];

// Deduplicate by slug to prevent React key duplication console warnings
const seenSlugs = new Set<string>();
export const BLOG_POSTS: BlogPost[] = [];

for (const post of ALL_RAW_POSTS) {
  if (!seenSlugs.has(post.slug)) {
    seenSlugs.add(post.slug);
    BLOG_POSTS.push(post);
  }
}

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getPostsByCategory = (categorySlug: string): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.category === categorySlug);
