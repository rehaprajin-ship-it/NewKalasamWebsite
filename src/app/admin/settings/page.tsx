'use client';
/* Admin Settings */
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';
import { COMPANY } from '@/lib/constants';

export default function AdminSettings() {
  const { isAdmin, loading, user } = useAuth();
  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Access denied</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 sticky top-0 z-50">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-primary">← Dashboard</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-700 text-gray-900">Settings</h1>
      </header>
      <main className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-700 text-gray-900 mb-4">Site Configuration</h2>
          <div className="space-y-4">
            {[
              { label: 'Company Name', value: COMPANY.name },
              { label: 'Tagline', value: COMPANY.tagline },
              { label: 'Phone', value: COMPANY.contact.phone },
              { label: 'Email', value: COMPANY.contact.email },
              { label: 'Export Email', value: COMPANY.contact.exportEmail },
              { label: 'WhatsApp', value: COMPANY.contact.whatsapp },
              { label: 'Address', value: COMPANY.location.address },
            ].map((cfg) => (
              <div key={cfg.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{cfg.label}</span>
                <span className="text-sm font-500 text-gray-900">{cfg.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Site configuration is managed in <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">src/lib/constants.ts</code></p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-700 text-gray-900 mb-4">Admin Account</h2>
          <div className="flex items-center gap-4">
            {user?.photoURL && <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full" />}
            <div>
              <p className="text-sm font-600 text-gray-900">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <p className="text-xs text-green-500 mt-1">✓ Admin access verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-700 text-gray-900 mb-4">Integrations</h2>
          <div className="space-y-3">
            {[
              { name: 'Firebase', status: 'Connected', desc: 'Authentication & Firestore database' },
              { name: 'Cloudinary', status: 'Connected', desc: 'Image optimization & CDN' },
              { name: 'EmailJS', status: 'Connected', desc: 'Contact form notifications' },
            ].map((int) => (
              <div key={int.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-500 text-gray-900">{int.name}</p>
                  <p className="text-xs text-gray-400">{int.desc}</p>
                </div>
                <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-600 rounded">{int.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
