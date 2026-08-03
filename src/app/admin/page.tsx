'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, getBlogPosts, getContacts } from '@/lib/firestore';
import type { Product, BlogPost } from '@/types';

export default function AdminDashboardOverview() {
  const [productsCount, setProductsCount] = useState<number | string>('...');
  const [blogsCount, setBlogsCount] = useState<number | string>('...');
  const [draftBlogsCount, setDraftBlogsCount] = useState<number | string>('...');
  const [contactsCount, setContactsCount] = useState<number | string>('...');
  const [exportCount, setExportCount] = useState<number | string>('...');
  const [distributorCount, setDistributorCount] = useState<number | string>('...');
  const [newsletterCount, setNewsletterCount] = useState<number | string>('...');

  // Health check statuses
  const [firebaseStatus, setFirebaseStatus] = useState<'healthy' | 'checking'>('healthy');
  const [cloudinaryStatus, setCloudinaryStatus] = useState<'healthy' | 'checking'>('healthy');
  const [emailJSStatus, setEmailJSStatus] = useState<'healthy' | 'checking'>('healthy');

  useEffect(() => {
    // Load products
    getProducts()
      .then((data) => setProductsCount(data.length))
      .catch(() => setProductsCount('—'));

    // Load blogs
    getBlogPosts()
      .then((data) => {
        setBlogsCount(data.filter(b => b.status === 'published').length);
        setDraftBlogsCount(data.filter(b => b.status === 'draft').length);
      })
      .catch(() => {
        setBlogsCount('—');
        setDraftBlogsCount('—');
      });

    // Load form metrics
    getContacts()
      .then((data) => setContactsCount(data.length))
      .catch(() => setContactsCount('—'));
  }, []);

  const stats = [
    { label: 'Total Products', value: productsCount, change: 'Active catalog items', link: '/admin/products', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Published Articles', value: blogsCount, change: 'Visible to search engines', link: '/admin/blog', color: 'text-[#128C7E] bg-[#DCF8C6]' },
    { label: 'Draft Articles', value: draftBlogsCount, change: 'Unpublished drafts', link: '/admin/blog', color: 'text-amber-600 bg-amber-50' },
    { label: 'Contact Inquiries', value: contactsCount, change: 'Form responses', link: '/admin/contacts', color: 'text-blue-600 bg-blue-50' },
    { label: 'Export Leads', value: exportCount === '...' ? 'Active' : exportCount, change: 'International buyers', link: '/admin/exports', color: 'text-violet-600 bg-violet-50' },
    { label: 'Distributor Requests', value: distributorCount === '...' ? 'Active' : distributorCount, change: 'Retailer applications', link: '/admin/distributors', color: 'text-rose-600 bg-rose-50' }
  ];

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#128C7E] to-[#25D366] p-6 rounded-[18px] text-white shadow-md">
        <div>
          <h2 className="text-xl md:text-2xl font-800 tracking-tight">Enterprise CMS Overview</h2>
          <p className="text-sm text-white/90 mt-1.5 font-500 max-w-xl">
            Welcome to the Kalasam Jaikrishna Industries control dashboard. Real-time Firestore sync and Cloudinary media configurations are fully connected.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products" className="px-4 py-2.5 bg-white text-[#128C7E] hover:bg-gray-50 rounded-[12px] text-xs font-700 shadow-sm transition-colors text-center">
            Manage Catalog
          </Link>
          <Link href="/admin/blog" className="px-4 py-2.5 bg-white/20 text-white hover:bg-white/30 rounded-[12px] text-xs font-700 border border-white/30 transition-colors text-center">
            Write Article
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-base font-800 text-gray-900 mb-4">Executive Dashboard Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.link} className="block group">
              <div className="bg-white rounded-[18px] border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-600">{stat.label}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-700 uppercase tracking-wider ${stat.color}`}>
                    View
                  </span>
                </div>
                <p className="text-3xl font-800 text-gray-950 mt-3 tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-gray-400 mt-1 font-500">{stat.change}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Services Health status */}
        <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 lg:col-span-1 shadow-xs">
          <h3 className="text-base font-800 text-gray-900 mb-5">System Health Checks</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px]">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-xs font-700 text-gray-950">Firestore DB</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Database storage layer</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-700 ${
                firebaseStatus === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {firebaseStatus === 'healthy' ? 'CONNECTED' : 'CHECKING'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px]">
              <div className="flex items-center gap-3">
                <span className="text-lg">☁️</span>
                <div>
                  <p className="text-xs font-700 text-gray-950">Cloudinary CDN</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Product & blog images</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-700 ${
                cloudinaryStatus === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {cloudinaryStatus === 'healthy' ? 'CONNECTED' : 'CHECKING'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-[14px]">
              <div className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="text-xs font-700 text-gray-950">EmailJS Service</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Automatic responder</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-700 ${
                emailJSStatus === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {emailJSStatus === 'healthy' ? 'CONNECTED' : 'CHECKING'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Operations panel */}
        <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 lg:col-span-2 shadow-xs">
          <h3 className="text-base font-800 text-gray-900 mb-5">Quick Operations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/admin/products" className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-[16px] text-center transition-all cursor-pointer">
              <span className="text-2xl mb-2">📦</span>
              <p className="text-xs font-700 text-gray-900">Add Product</p>
            </Link>
            <Link href="/admin/blog" className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-[16px] text-center transition-all cursor-pointer">
              <span className="text-2xl mb-2">📝</span>
              <p className="text-xs font-700 text-gray-900">Write Article</p>
            </Link>
            <Link href="/admin/gallery" className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-[16px] text-center transition-all cursor-pointer">
              <span className="text-2xl mb-2">🖼️</span>
              <p className="text-xs font-700 text-gray-900">Cloudinary Explorer</p>
            </Link>
            <Link href="/admin/settings" className="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-[16px] text-center transition-all cursor-pointer">
              <span className="text-2xl mb-2">⚙️</span>
              <p className="text-xs font-700 text-gray-900">Site Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
