'use client';

/* ═══════════════════════════════════════════════════════════════
   SEO Manager Dashboard — Bulk SEO Completeness View
   Shows SEO health across all products and blog posts at a glance.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/firestore';
import { BLOG_POSTS } from '@/data/blog-posts';
import type { Product } from '@/types';

type SEOStatus = 'good' | 'warn' | 'missing';

interface SEOEntry {
  name: string;
  slug: string;
  type: 'product' | 'blog';
  titleStatus: SEOStatus;
  titleValue: string;
  titleLength: number;
  descStatus: SEOStatus;
  descValue: string;
  descLength: number;
  keywordsStatus: SEOStatus;
  imagesStatus: SEOStatus;
  faqStatus: SEOStatus;
  overallScore: number;
}

function checkTitle(title?: string): { status: SEOStatus; length: number } {
  if (!title) return { status: 'missing', length: 0 };
  if (title.length > 60) return { status: 'warn', length: title.length };
  return { status: 'good', length: title.length };
}

function checkDesc(desc?: string): { status: SEOStatus; length: number } {
  if (!desc) return { status: 'missing', length: 0 };
  if (desc.length < 120 || desc.length > 160) return { status: 'warn', length: desc.length };
  return { status: 'good', length: desc.length };
}

function statusDot(status: SEOStatus) {
  const colors = {
    good: 'bg-green-500',
    warn: 'bg-amber-400',
    missing: 'bg-red-400',
  };
  return <span className={`w-2.5 h-2.5 rounded-full ${colors[status]} inline-block`} />;
}

function scoreBadge(score: number) {
  const color =
    score >= 80 ? 'bg-green-100 text-green-700 border-green-200' :
    score >= 50 ? 'bg-amber-100 text-amber-700 border-amber-200' :
    'bg-red-100 text-red-700 border-red-200';
  return (
    <span className={`text-[10px] font-800 px-2 py-0.5 rounded-full border ${color}`}>
      {score}%
    </span>
  );
}

export default function SEODashboard() {
  const [entries, setEntries] = useState<SEOEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'products' | 'blogs'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'good' | 'issues'>('all');

  useEffect(() => {
    async function load() {
      const results: SEOEntry[] = [];

      // Load products from Firestore
      try {
        const products = await getProducts();
        for (const p of products) {
          const title = p.seo?.metaTitle || '';
          const desc = p.seo?.metaDescription || '';
          const keywords = p.seo?.keywords || '';
          const titleCheck = checkTitle(title);
          const descCheck = checkDesc(desc);
          const keywordsStatus: SEOStatus = keywords ? 'good' : 'missing';
          const imagesStatus: SEOStatus = (p.images?.length || 0) > 0 ? 'good' : 'missing';
          const faqStatus: SEOStatus = (p.faq?.length || 0) > 0 ? 'good' : 'missing';

          const checks = [titleCheck.status, descCheck.status, keywordsStatus, imagesStatus, faqStatus];
          const score = Math.round(
            (checks.filter((c) => c === 'good').length / checks.length) * 100
          );

          results.push({
            name: p.name || '(Untitled)',
            slug: p.slug || '',
            type: 'product',
            titleStatus: titleCheck.status,
            titleValue: title,
            titleLength: titleCheck.length,
            descStatus: descCheck.status,
            descValue: desc,
            descLength: descCheck.length,
            keywordsStatus,
            imagesStatus,
            faqStatus,
            overallScore: score,
          });
        }
      } catch (e) {}

      // Load blog posts
      for (const post of BLOG_POSTS) {
        const title = post.metaTitle || '';
        const desc = post.metaDescription || '';
        const keywords = [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean).join(', ');
        const titleCheck = checkTitle(title);
        const descCheck = checkDesc(desc);
        const keywordsStatus: SEOStatus = keywords ? 'good' : 'missing';
        const imagesStatus: SEOStatus = 'good'; // Blog posts have default images
        const faqStatus: SEOStatus = ((post as any).faq?.length || 0) > 0 ? 'good' : 'missing';

        const checks = [titleCheck.status, descCheck.status, keywordsStatus, imagesStatus, faqStatus];
        const score = Math.round(
          (checks.filter((c) => c === 'good').length / checks.length) * 100
        );

        results.push({
          name: post.title || '(Untitled)',
          slug: post.slug || '',
          type: 'blog',
          titleStatus: titleCheck.status,
          titleValue: title,
          titleLength: titleCheck.length,
          descStatus: descCheck.status,
          descValue: desc,
          descLength: descCheck.length,
          keywordsStatus,
          imagesStatus,
          faqStatus,
          overallScore: score,
        });
      }

      // Sort by score ascending (worst first)
      results.sort((a, b) => a.overallScore - b.overallScore);
      setEntries(results);
      setLoading(false);
    }

    load();
  }, []);

  const filtered = entries.filter((e) => {
    if (filter !== 'all' && e.type !== (filter === 'products' ? 'product' : 'blog')) return false;
    if (statusFilter === 'good' && e.overallScore < 80) return false;
    if (statusFilter === 'issues' && e.overallScore >= 80) return false;
    return true;
  });

  const avgScore = entries.length > 0
    ? Math.round(entries.reduce((s, e) => s + e.overallScore, 0) / entries.length)
    : 0;
  const issueCount = entries.filter((e) => e.overallScore < 80).length;
  const goodCount = entries.filter((e) => e.overallScore >= 80).length;

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-800 text-gray-900 tracking-tight">SEO Manager</h2>
        <p className="text-xs text-gray-500 mt-1 font-500">
          Monitor SEO completeness across all products and blog posts. Fix issues before they hurt rankings.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-[14px] border border-gray-200 p-4">
          <p className="text-[10px] text-gray-400 font-700 uppercase">Total Pages</p>
          <p className="text-2xl font-800 text-gray-900 mt-1">{entries.length}</p>
        </div>
        <div className="bg-white rounded-[14px] border border-gray-200 p-4">
          <p className="text-[10px] text-gray-400 font-700 uppercase">Avg SEO Score</p>
          <p className={`text-2xl font-800 mt-1 ${avgScore >= 80 ? 'text-green-600' : avgScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
            {avgScore}%
          </p>
        </div>
        <div className="bg-white rounded-[14px] border border-green-200 p-4">
          <p className="text-[10px] text-green-600 font-700 uppercase">Fully Optimized</p>
          <p className="text-2xl font-800 text-green-600 mt-1">{goodCount}</p>
        </div>
        <div className="bg-white rounded-[14px] border border-red-200 p-4">
          <p className="text-[10px] text-red-500 font-700 uppercase">Needs Attention</p>
          <p className="text-2xl font-800 text-red-600 mt-1">{issueCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'products', 'blogs'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-[11px] font-700 rounded-full border transition-all capitalize cursor-pointer ${
              filter === f
                ? 'bg-[#25D366] text-white border-[#25D366]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="w-px h-5 bg-gray-200 mx-1" />
        {(['all', 'good', 'issues'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-3 py-1.5 text-[11px] font-700 rounded-full border transition-all cursor-pointer ${
              statusFilter === f
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {f === 'good' ? '✓ Optimized' : f === 'issues' ? '⚠ Issues' : 'All Status'}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80">
          <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400 mt-3 font-600">Analyzing SEO health...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[18px] border border-gray-200/80 overflow-hidden">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-gray-400 font-800 uppercase tracking-wider">
                <th className="px-4 py-3 w-1/3">Page</th>
                <th className="px-4 py-3 text-center">Title</th>
                <th className="px-4 py-3 text-center">Description</th>
                <th className="px-4 py-3 text-center">Keywords</th>
                <th className="px-4 py-3 text-center">Images</th>
                <th className="px-4 py-3 text-center">FAQ</th>
                <th className="px-4 py-3 text-center">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((entry) => (
                <tr key={`${entry.type}-${entry.slug}`} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-800 uppercase px-1.5 py-0.5 rounded ${
                        entry.type === 'product'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {entry.type}
                      </span>
                      <span className="font-700 text-gray-900 truncate max-w-[200px]" title={entry.name}>
                        {entry.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[250px]">
                      /{entry.type === 'product' ? 'products' : 'blog'}/{entry.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center" title={`${entry.titleLength} chars: ${entry.titleValue}`}>
                    {statusDot(entry.titleStatus)}
                    <span className="block text-[9px] text-gray-400 mt-0.5">{entry.titleLength}ch</span>
                  </td>
                  <td className="px-4 py-3 text-center" title={`${entry.descLength} chars`}>
                    {statusDot(entry.descStatus)}
                    <span className="block text-[9px] text-gray-400 mt-0.5">{entry.descLength}ch</span>
                  </td>
                  <td className="px-4 py-3 text-center">{statusDot(entry.keywordsStatus)}</td>
                  <td className="px-4 py-3 text-center">{statusDot(entry.imagesStatus)}</td>
                  <td className="px-4 py-3 text-center">{statusDot(entry.faqStatus)}</td>
                  <td className="px-4 py-3 text-center">{scoreBadge(entry.overallScore)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 font-600">
                    No pages match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-[10px] text-gray-400 font-500">
        <span className="flex items-center gap-1.5">{statusDot('good')} Good</span>
        <span className="flex items-center gap-1.5">{statusDot('warn')} Warning</span>
        <span className="flex items-center gap-1.5">{statusDot('missing')} Missing</span>
      </div>
    </main>
  );
}
