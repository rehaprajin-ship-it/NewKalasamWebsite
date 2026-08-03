'use client';
/* Admin Export Inquiries */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';
import { getExportInquiries } from '@/lib/firestore';

export default function AdminExports() {
  const { isAdmin, loading } = useAuth();
  const [inquiries, setInquiries] = useState<Record<string, string>[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    getExportInquiries().then((data) => { setInquiries(data as Record<string, string>[]); setLoadingData(false); }).catch(() => setLoadingData(false));
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Access denied</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 sticky top-0 z-50">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-primary">← Dashboard</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-700 text-gray-900">Export Inquiries</h1>
      </header>
      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        {loadingData ? (
          <div className="text-center py-20"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="text-5xl mb-4">🌍</div>
            <p className="text-gray-400 text-lg">No export inquiries yet.</p>
            <p className="text-sm text-gray-400 mt-2">Export inquiries from the website will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-600 text-gray-900">{inq.name || 'Unknown'}</h3>
                <p className="text-xs text-gray-400 mt-1">{inq.email} • {inq.phone} • {inq.country}</p>
                <p className="text-sm text-gray-500 mt-3">{inq.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
