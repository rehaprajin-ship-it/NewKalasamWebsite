'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthProvider';
import { COMPANY } from '@/lib/constants';

const navItems = [
  { label: 'Overview', href: '/admin', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z' },
  { label: 'Products', href: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { label: 'Blog Posts', href: '/admin/blog', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { label: 'SEO Manager', href: '/admin/seo', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { label: 'Media Library', href: '/admin/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Contacts', href: '/admin/contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Newsletter', href: '/admin/newsletter', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z' },
  { label: 'Distributors', href: '/admin/distributors', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { label: 'Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, login, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-600 text-gray-500">Checking credentials...</p>
        </div>
      </div>
    );
  }

  // Auth Gate: Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-[18px] border border-gray-200/80 p-8 md:p-10 text-center max-w-md w-full shadow-lg relative">
          <div className="w-24 mx-auto mb-6">
            <Image
              src="/images/logo.png"
              alt="Kalasam Jaikrishna Industries Logo"
              width={200}
              height={80}
              priority
              className="h-auto max-h-[80px] object-contain mx-auto"
              style={{ width: 'auto' }}
            />
          </div>
          <h1 className="text-2xl font-800 text-gray-950 mb-2">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-8">{COMPANY.name} — Control Center</p>
          <button onClick={login} className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] flex items-center justify-center gap-3 transition-colors shadow-md cursor-pointer text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Auth Gate: Logged in but not Admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-[18px] border border-gray-200/80 p-8 md:p-10 text-center max-w-md shadow-lg">
          <div className="text-5xl mb-4">🚫</div>
          <h1 className="text-2xl font-800 text-gray-950 mb-2">Access Denied</h1>
          <p className="text-sm text-gray-500 mb-6">Your account ({user.email}) does not have administrative privileges. Contact the administrator.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={logout} className="px-4 py-2 border border-gray-200 rounded-[12px] text-gray-600 hover:bg-gray-50 text-sm font-600 cursor-pointer">Sign Out</button>
            <Link href="/" className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[12px] text-sm font-600 cursor-pointer">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentNav = navItems.find((item) => item.href === pathname) || { label: 'Admin Panel' };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex text-gray-800 font-sans">
      {/* Collapsible Sidebar */}
      <aside className={`bg-[#128C7E] text-white flex flex-col transition-all duration-300 z-40 fixed lg:static inset-y-0 left-0 ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 lg:w-20 -translate-x-full lg:translate-x-0 overflow-hidden'
        }`}>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-white p-1.5 flex items-center justify-center flex-shrink-0">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain w-full h-full" />
            </div>
            {isSidebarOpen && <span className="font-800 text-sm tracking-wider uppercase">Kalasam</span>}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-[12px] text-sm font-600 transition-all duration-200 ${isActive
                    ? 'bg-[#25D366] text-white shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-600 text-red-200 hover:bg-red-500/10 hover:text-red-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Headerbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-[8px] bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5 text-sm font-500">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-700">{currentNav.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-500 hidden sm:inline-block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-gray-200" />
              )}
              <div className="text-left hidden md:block">
                <p className="text-xs font-700 text-gray-900 leading-tight">{user.displayName}</p>
                <p className="text-[10px] text-gray-400 font-500">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Page wrapper */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
