'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';
import { getGalleryImages, saveGalleryImage, removeGalleryImage } from '@/lib/firestore';
import { uploadToCloudinary } from '@/lib/cloudinary';

const ALBUMS = ['Factory', 'Laboratory', 'Warehouse', 'Certificates', 'Events'];

export default function AdminGalleryCMS() {
  const { isAdmin, loading } = useAuth();
  const [images, setImages] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('Factory');
  const [newTitle, setNewTitle] = useState('');

  const loadGallery = () => {
    setLoadingData(true);
    getGalleryImages()
      .then((data) => {
        setImages(data);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  };

  useEffect(() => {
    if (isAdmin) {
      loadGallery();
    }
  }, [isAdmin]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, 'gallery');
      const payload = {
        title: newTitle || file.name.split('.')[0] || 'Gallery Asset',
        url: result.url,
        category: selectedAlbum,
        order: 0,
        createdAt: new Date().toISOString()
      };
      await saveGalleryImage(payload);
      setNewTitle('');
      loadGallery();
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this media file?')) return;
    try {
      await removeGalleryImage(id);
      loadGallery();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Cloudinary asset URL copied to clipboard!');
  };

  const filtered = images.filter((img) => img.category === selectedAlbum);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500 font-600">Access denied</p></div>;

  return (
    <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Cloudinary Media Explorer</h2>
          <p className="text-xs text-gray-500 mt-1 font-500 font-sans">Upload, categorize, and browse website images hosted on Cloudinary CDN.</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-[18px] border border-gray-200/80 p-4 lg:p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 lg:gap-6 items-end">
        <div>
          <label className="block text-xs font-700 text-gray-600 mb-1">Asset Title (Optional)</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Factory Boiler Unit"
            className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-sm lg:text-xs focus:outline-hidden text-gray-950 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-700 text-gray-600 mb-1">Target Album *</label>
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-sm lg:text-xs focus:outline-hidden text-gray-950 bg-white min-h-[44px] lg:min-h-0"
          >
            {ALBUMS.map((alb) => (
              <option key={alb} value={alb}>{alb} Folder</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <label className="w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[10px] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[44px]">
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <span>＋ Upload Media File</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Albums Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-200 pb-px admin-tabs-scroll">
        {ALBUMS.map((alb) => (
          <button
            key={alb}
            onClick={() => setSelectedAlbum(alb)}
            className={`px-4 py-2 text-xs font-700 border-b-2 transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
              selectedAlbum === alb
                ? 'border-[#25D366] text-[#128C7E]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {alb}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loadingData ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400 mt-3 font-600">Syncing with Cloudinary storage...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs text-gray-400 text-xs">
          No media assets found in this folder. Upload a new image above to populate the gallery.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((img) => (
            <div key={img.id} className="bg-white rounded-[18px] border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col">
              <div className="relative aspect-video w-full bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 flex-shrink-0">
                <img src={img.url} alt="" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-3">
                <div>
                  <h4 className="font-800 text-gray-900 line-clamp-1 leading-tight">{img.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 font-500 uppercase tracking-wider">{img.category}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleCopyLink(img.url)}
                    className="flex-1 py-2 bg-gray-50 border border-gray-200 rounded-[8px] text-[11px] font-700 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer min-h-[38px]"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-[8px] border border-gray-200 transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                    title="Delete Image"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
