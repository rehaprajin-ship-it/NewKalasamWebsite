'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContacts } from '@/lib/firestore';

export default function AdminContactsCRM() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  useEffect(() => {
    getContacts()
      .then((data) => {
        setContacts(data);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  }, []);

  const handleExportCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Created At'];
    const rows = contacts.map(c => [
      c.name || '',
      c.email || '',
      c.phone || '',
      c.company || '',
      c.subject || '',
      c.message || '',
      c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleString() : ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `contacts_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = contacts.filter((c) =>
    (c.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (c.company?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Contact Inquiries</h2>
          <p className="text-xs text-gray-500 mt-1 font-500 font-sans">Review feedback and customer inquiries submitted from the contact page.</p>
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
            placeholder="Search inquiries by name, email, or company..."
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
              <p className="text-xs text-gray-400 mt-3 font-600">Loading submissions...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
              <p className="text-gray-400 text-sm font-700">No contact submissions found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs overflow-hidden divide-y divide-gray-100">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedContact(c)}
                  className={`p-5 transition-colors cursor-pointer text-xs ${
                    selectedContact?.id === c.id ? 'bg-emerald-50/50' : 'hover:bg-gray-50/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-800 text-gray-900 leading-tight">{c.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-1 font-500">{c.email} • {c.phone}</p>
                    </div>
                    {c.company && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-600">
                        {c.company}
                      </span>
                    )}
                  </div>
                  <p className="font-700 text-gray-700 mt-2">Sub: {c.subject}</p>
                  <p className="text-gray-500 mt-1 line-clamp-2 leading-relaxed">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Detail view card */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs sticky top-24 space-y-5 text-xs text-gray-700">
              <div>
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Sender Info</span>
                <h3 className="text-base font-800 text-gray-950 mt-1.5">{selectedContact.name}</h3>
                <p className="text-gray-500 mt-1">{selectedContact.email}</p>
                <p className="text-gray-500 mt-0.5">{selectedContact.phone}</p>
                {selectedContact.company && (
                  <p className="text-gray-500 mt-1.5 font-700">Company: {selectedContact.company}</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Subject</span>
                <p className="font-800 text-gray-900 mt-1.5">{selectedContact.subject}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Message Details</span>
                <p className="text-gray-600 leading-relaxed mt-2 p-3 bg-gray-50 rounded-[12px] border border-gray-100">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-dashed border-2 border-dashed border-gray-200 rounded-[18px] p-8 text-center text-gray-400 text-xs">
              Select an inquiry from the list to view its complete submission details here.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
