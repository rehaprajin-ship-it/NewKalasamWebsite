'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { BlogCategory } from '@/types/blog';

interface BlogFiltersProps {
  categories: BlogCategory[];
  activeCategory: string;
  searchQuery: string;
}

export default function BlogFilters({ categories, activeCategory, searchQuery }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to page 1 on filter change
    router.push(`/blog?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to page 1 on search
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mb-12 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
      <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category selector */}
        <div className="w-full md:w-1/3">
          <label htmlFor="category-select" className="sr-only">Filter by Category</label>
          <select
            id="category-select"
            name="category"
            value={activeCategory}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm font-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search query input */}
        <div className="w-full md:w-2/3 flex gap-2">
          <label htmlFor="search-input" className="sr-only">Search Articles</label>
          <input
            id="search-input"
            type="text"
            name="search"
            placeholder="Search technical publications, LSI terms, products..."
            defaultValue={searchQuery}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button type="submit" className="btn btn-primary px-6">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
