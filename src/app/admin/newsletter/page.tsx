'use client';
/* Admin Newsletter */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';
import { getNewsletterSubscribers } from '@/lib/firestore';
import type { NewsletterSubscriber } from '@/types';

export default function AdminNewsletter() {
  const { isAdmin, loading } = useAuth();
  const [subs, setSubs] = useState<NewsletterSubscriber[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    getNewsletterSubscribers().then((data) => { setSubs(data); setLoadingData(false); }).catch(() => setLoadingData(false));
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Access denied</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 sticky top-0 z-50">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-primary">← Dashboard</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-700 text-gray-900">Newsletter Subscribers</h1>
        <span className="text-xs text-gray-400 ml-auto">{subs.length} subscribers</span>
      </header>
      <main className="p-6 lg:p-8 max-w-4xl mx-auto">
        {loadingData ? (
          <div className="text-center py-20"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : subs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200"><p className="text-gray-400">No subscribers yet.</p></div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-600 text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-600 text-gray-600">Source</th>
                <th className="text-left px-4 py-3 font-600 text-gray-600">Date</th>
              </tr></thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.email} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-900">{s.email}</td>
                    <td className="px-4 py-3 text-gray-500">{s.source || 'website'}</td>
                    <td className="px-4 py-3 text-gray-400">{s.subscribedAt || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
