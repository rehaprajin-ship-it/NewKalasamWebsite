'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDistributorApplications, removeDistributorApplication } from '@/lib/firestore';
import { useToast } from '@/context/ToastProvider';

export default function AdminDistributorsCRM() {
  const [apps, setApps] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getDistributorApplications()
      .then((data) => {
        setApps(data);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this application?')) {
      return;
    }
    setDeletingId(id);
    try {
      await removeDistributorApplication(id);
      setApps(prev => prev.filter(a => a.id !== id));
      showToast('Application successfully deleted.');
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
    } catch (err) {
      console.error('Failed to delete application:', err);
      showToast('Failed to delete application.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (apps.length === 0) return;
    const headers = ['Name', 'Email', 'Phone', 'Company', 'City', 'State', 'Territory', 'Investment Capacity', 'Experience', 'Message', 'Created At'];
    const rows = apps.map(a => [
      a.name || '',
      a.email || '',
      a.phone || '',
      a.company || '',
      a.city || '',
      a.state || '',
      a.territory || '',
      a.investmentCapacity || '',
      a.experience || '',
      a.message || '',
      a.createdAt ? new Date(a.createdAt.seconds * 1000).toLocaleString() : ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `distributors_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = apps.filter((a) =>
    (a.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (a.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (a.company?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (a.city?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Distributor Applications</h2>
          <p className="text-xs text-gray-500 mt-1 font-500 font-sans">Track retailer applications, territories, investment capacities, and notes.</p>
        </div>
        <button onClick={handleExportCSV} className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer">
          Export CSV
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-[14px] border border-gray-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications by name, email, or city..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-[10px] text-xs focus:outline-hidden focus:border-[#25D366] text-gray-900"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Content layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: List view */}
        <div className="lg:col-span-2 space-y-4">
          {loadingData ? (
            <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
              <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 mt-3 font-600">Loading applications...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
              <p className="text-gray-400 text-sm font-700">No distributor applications available.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs overflow-hidden divide-y divide-gray-100">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedApp(a)}
                  className={`p-5 transition-colors cursor-pointer text-xs ${
                    selectedApp?.id === a.id ? 'bg-emerald-50/50' : 'hover:bg-gray-50/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-800 text-gray-900 leading-tight">{a.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 font-500">{a.email} • {a.phone}</p>
                    </div>
                    {a.investmentCapacity && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-sm font-700">
                        {a.investmentCapacity}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-2 font-600">Location: {a.city}, {a.state} ({a.territory || 'Default Territory'})</p>
                  {a.message && <p className="text-gray-500 mt-1 line-clamp-1 italic">"{a.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Detail view card */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs sticky top-24 space-y-5 text-xs text-gray-700">
              <div>
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Applicant Details</span>
                <h3 className="text-base font-800 text-gray-950 mt-1.5">{selectedApp.name}</h3>
                <p className="text-gray-500 mt-1">{selectedApp.email}</p>
                <p className="text-gray-500 mt-0.5">{selectedApp.phone}</p>
                {selectedApp.company && (
                  <p className="text-gray-500 mt-1.5 font-700">Company: {selectedApp.company}</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">City / State</span>
                  <p className="font-700 text-gray-900 mt-1">{selectedApp.city || '—'}, {selectedApp.state || '—'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Target Territory</span>
                  <p className="font-700 text-gray-900 mt-1">{selectedApp.territory || '—'}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Investment Capacity</span>
                  <p className="font-700 text-emerald-700 mt-1">{selectedApp.investmentCapacity || '—'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Experience</span>
                  <p className="font-700 text-gray-900 mt-1">{selectedApp.experience ? `${selectedApp.experience} Years` : '—'}</p>
                </div>
              </div>

              {selectedApp.message && (
                <div className="border-t border-gray-100 pt-4">
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Application Message</span>
                  <p className="text-gray-600 leading-relaxed mt-2 p-3 bg-gray-50 rounded-[12px] border border-gray-100 italic">
                    "{selectedApp.message}"
                  </p>
                </div>
              )}

              {/* Delete Button */}
              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleDelete(selectedApp.id)}
                  disabled={deletingId === selectedApp.id}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:border-rose-300 font-700 rounded-[12px] text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deletingId === selectedApp.id ? (
                    <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>🗑️ Delete Application</span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-dashed border-2 border-dashed border-gray-200 rounded-[18px] p-8 text-center text-gray-400 text-xs">
              Select an application from the list to view its complete submission details here.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
