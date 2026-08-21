'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContacts, removeContact, getDistributorApplications, removeDistributorApplication } from '@/lib/firestore';
import { useToast } from '@/context/ToastProvider';

type TabType = 'all' | 'contact' | 'product' | 'super_stockist' | 'distributor' | 'careers';

export default function AdminContactsCRM() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadData = async () => {
    setLoadingData(true);
    try {
      const [contactsData, distributorsData] = await Promise.all([
        getContacts(),
        getDistributorApplications()
      ]);
      
      // Standardize distributors to match contacts structure for list rendering
      const formattedDistributors = distributorsData.map(d => ({
        ...d,
        formType: 'Distributor',
        subject: `Distributor Application — ${d.city || ''}, ${d.state || ''}`,
      }));

      setContacts(contactsData);
      setDistributors(formattedDistributors);
    } catch (err) {
      console.error('Error loading inquiries:', err);
      showToast('Failed to load CRM data', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, formType: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry from the database?')) {
      return;
    }
    setDeletingId(id);
    try {
      if (formType === 'Distributor') {
        await removeDistributorApplication(id);
        setDistributors(prev => prev.filter(item => item.id !== id));
      } else {
        await removeContact(id);
        setContacts(prev => prev.filter(item => item.id !== id));
      }
      showToast('Inquiry successfully deleted from database.');
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      showToast('Failed to delete inquiry. Please try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    const listToExport = getFilteredList();
    if (listToExport.length === 0) return;
    
    const headers = ['Type', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Created At'];
    const rows = listToExport.map(c => [
      c.formType || 'Contact',
      c.name || '',
      c.email || '',
      c.phone || '',
      c.company || '',
      c.subject || '',
      c.message || '',
      c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleString() : ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${activeTab}_inquiries_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredList = () => {
    // Combine list depending on selection
    let combined = [];
    if (activeTab === 'all') {
      combined = [...contacts, ...distributors];
    } else if (activeTab === 'distributor') {
      combined = distributors;
    } else {
      combined = contacts.filter(c => {
        if (activeTab === 'contact') return c.formType === 'General Contact' || !c.formType;
        if (activeTab === 'product') return c.formType === 'Product Inquiry' || c.formType === 'Consolidated Inquiry';
        if (activeTab === 'super_stockist') return c.formType === 'Super Stockist';
        if (activeTab === 'careers') return c.formType === 'Careers Application';
        return true;
      });
    }

    // Sort by date descending
    combined.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });

    // Apply search filter
    return combined.filter(c => 
      (c.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (c.company?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (c.subject?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
  };

  const filtered = getFilteredList();

  const tabs: { type: TabType; label: string; count: number }[] = [
    { type: 'all', label: 'All Inquiries', count: contacts.length + distributors.length },
    { type: 'contact', label: 'General Contact', count: contacts.filter(c => c.formType === 'General Contact' || !c.formType).length },
    { type: 'product', label: 'Product/B2B Quotes', count: contacts.filter(c => c.formType === 'Product Inquiry' || c.formType === 'Consolidated Inquiry').length },
    { type: 'super_stockist', label: 'Super Stockist', count: contacts.filter(c => c.formType === 'Super Stockist').length },
    { type: 'distributor', label: 'Distributors', count: distributors.length },
    { type: 'careers', label: 'Careers/Job Apps', count: contacts.filter(c => c.formType === 'Careers Application').length }
  ];

  return (
    <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Enterprise Leads CRM</h2>
          <p className="text-xs text-gray-500 mt-1 font-500 font-sans">Access, filter, export, and delete customer submissions across different segments.</p>
        </div>
        <button onClick={handleExportCSV} className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer">
          Export CSV
        </button>
      </div>

      {/* Tabs with Horizontal Scroll */}
      <div className="flex gap-2 border-b border-gray-200 pb-px overflow-x-auto admin-tabs-scroll">
        {tabs.map(tab => (
          <button
            key={tab.type}
            onClick={() => {
              setActiveTab(tab.type);
              setSelectedContact(null);
            }}
            className={`px-3.5 py-2 text-xs font-700 border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === tab.type
                ? 'border-[#25D366] text-[#128C7E]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label} <span className="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-600">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4 bg-white p-3 lg:p-4 rounded-[14px] border border-gray-200/80 shadow-xs">
        <div className="relative flex-1 lg:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, email, company..."
            className="w-full pl-9 pr-4 py-2.5 lg:py-2 border border-gray-200 rounded-[10px] text-sm lg:text-xs focus:outline-hidden focus:border-[#25D366] text-gray-900"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3 lg:top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
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
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-800 text-gray-900 leading-tight">{c.name}</h4>
                        <span className={`px-1.5 py-0.5 rounded-sm text-[9px] font-800 uppercase ${
                          c.formType === 'Super Stockist' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                          c.formType === 'Distributor' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                          c.formType === 'Careers Application' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          c.formType === 'Product Inquiry' || c.formType === 'Consolidated Inquiry' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          'bg-gray-50 text-gray-700 border border-gray-100'
                        }`}>
                          {c.formType || 'Contact'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 font-500">{c.email} • {c.phone}</p>
                    </div>
                    {c.company && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-600">
                        {c.company}
                      </span>
                    )}
                  </div>
                  <p className="font-700 text-gray-700 mt-2">Subject: {c.subject}</p>
                  <p className="text-gray-500 mt-1 line-clamp-2 leading-relaxed">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Detail view card (Desktop sticky / Mobile overlay) */}
        <div className="hidden lg:block lg:col-span-1">
          {selectedContact ? (
            <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs sticky top-24 space-y-5 text-xs text-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Sender Info</span>
                  <h3 className="text-base font-800 text-gray-950 mt-1.5">{selectedContact.name}</h3>
                  <p className="text-gray-500 mt-1">{selectedContact.email}</p>
                  <p className="text-gray-500 mt-0.5">{selectedContact.phone}</p>
                  {selectedContact.company && (
                    <p className="text-gray-500 mt-1.5 font-700">
                      {selectedContact.formType === 'Careers Application' ? 'Current Role' : 'Company'}: {selectedContact.company}
                    </p>
                  )}
                </div>
                <span className={`px-2 py-0.5 rounded-sm text-[9px] font-800 uppercase ${
                  selectedContact.formType === 'Super Stockist' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                  selectedContact.formType === 'Distributor' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                  selectedContact.formType === 'Careers Application' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                  selectedContact.formType === 'Product Inquiry' || selectedContact.formType === 'Consolidated Inquiry' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                  'bg-gray-50 text-gray-700 border border-gray-100'
                }`}>
                  {selectedContact.formType || 'Contact'}
                </span>
              </div>

              {selectedContact.sourcePage && (
                <div className="border-t border-gray-100 pt-4">
                  <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Submitted From Page</span>
                  <code className="text-gray-700 font-mono bg-gray-50 px-2 py-0.5 rounded mt-1.5 inline-block text-[10px]">{selectedContact.sourcePage}</code>
                </div>
              )}

              {/* Distributor-specific details */}
              {selectedContact.formType === 'Distributor' && (
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Location / Territory</span>
                    <p className="font-700 text-gray-900 mt-1">{selectedContact.city || '—'}, {selectedContact.state || '—'} ({selectedContact.territory || 'Default Territory'})</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Investment Capacity</span>
                      <p className="font-700 text-emerald-700 mt-1">{selectedContact.investmentCapacity || '—'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Experience</span>
                      <p className="font-700 text-gray-900 mt-1">{selectedContact.experience ? `${selectedContact.experience} Years` : '—'}</p>
                    </div>
                  </div>
                  {selectedContact.currentBusiness && (
                    <div>
                      <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Current Business</span>
                      <p className="text-gray-700 mt-1">{selectedContact.currentBusiness}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Subject */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Subject</span>
                <p className="font-800 text-gray-900 mt-1.5">{selectedContact.subject}</p>
              </div>

              {/* Message Details */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Inquiry / Message Details</span>
                <p className="text-gray-600 leading-relaxed mt-2 p-3 bg-gray-50 rounded-[12px] border border-gray-100 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              {/* Delete Button */}
              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleDelete(selectedContact.id, selectedContact.formType)}
                  disabled={deletingId === selectedContact.id}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:border-rose-300 font-700 rounded-[12px] text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deletingId === selectedContact.id ? (
                    <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>🗑️ Delete Submission</span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-dashed border-2 border-dashed border-gray-200 rounded-[18px] p-8 text-center text-gray-400 text-xs">
              Select an inquiry from the list to view its complete submission details and delete options here.
            </div>
          )}
        </div>

      </div>

      {/* Mobile Detail Modal / Bottom Sheet */}
      {selectedContact && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl space-y-4 text-xs text-gray-700 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Submission Detail</span>
                <h3 className="text-base font-800 text-gray-950 mt-1">{selectedContact.name}</h3>
                <p className="text-gray-500 mt-0.5">{selectedContact.email} • {selectedContact.phone}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold min-h-[44px] min-w-[44px] -mr-2 -mt-2 cursor-pointer"
                aria-label="Close detail"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className={`px-2 py-1 rounded-md text-[10px] font-800 uppercase ${
                selectedContact.formType === 'Super Stockist' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                selectedContact.formType === 'Distributor' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                selectedContact.formType === 'Careers Application' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                selectedContact.formType === 'Product Inquiry' || selectedContact.formType === 'Consolidated Inquiry' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                'bg-gray-50 text-gray-700 border border-gray-100'
              }`}>
                {selectedContact.formType || 'Contact'}
              </span>
              {selectedContact.company && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-700">
                  {selectedContact.company}
                </span>
              )}
            </div>

            {selectedContact.formType === 'Distributor' && (
              <div className="bg-gray-50 p-3 rounded-xl space-y-2 border border-gray-100">
                <p><strong>Territory:</strong> {selectedContact.city || '—'}, {selectedContact.state || '—'} ({selectedContact.territory || 'Default'})</p>
                <p><strong>Investment:</strong> <span className="text-emerald-700 font-bold">{selectedContact.investmentCapacity || '—'}</span></p>
                <p><strong>Experience:</strong> {selectedContact.experience ? `${selectedContact.experience} Yrs` : '—'}</p>
              </div>
            )}

            <div>
              <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Subject</span>
              <p className="font-800 text-gray-900 mt-1">{selectedContact.subject}</p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Message</span>
              <p className="text-gray-600 leading-relaxed mt-1 p-3 bg-gray-50 rounded-xl border border-gray-100 whitespace-pre-wrap text-xs">
                {selectedContact.message}
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-700 rounded-xl text-xs min-h-[44px] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedContact.id, selectedContact.formType)}
                disabled={deletingId === selectedContact.id}
                className="flex-1 py-3 bg-rose-50 text-rose-600 border border-rose-200 font-700 rounded-xl text-xs min-h-[44px] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {deletingId === selectedContact.id ? 'Deleting...' : '🗑️ Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
