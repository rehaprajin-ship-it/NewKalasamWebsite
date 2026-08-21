'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getBlogPosts, saveBlogPost, removeBlogPost } from '@/lib/firestore';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useAuth } from '@/context/AuthProvider';
import type { BlogPost, BlogCategory } from '@/types';

// Zod Validation Schema for Blogs
const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum([
    'Industry',
    'Traditions',
    'Guide',
    'Wellness',
    'Manufacturing',
    'Export',
    'News'
  ] as const),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content body must be at least 20 characters'),
  coverImage: z.string().min(1, 'Cover image is required'),
  status: z.enum(['published', 'draft'] as const),
  publishedAt: z.string().min(5, 'Published date is required')
});

type BlogFormData = z.infer<typeof blogSchema>;

const BLOG_CATEGORIES: BlogCategory[] = [
  'Industry',
  'Traditions',
  'Guide',
  'Wellness',
  'Manufacturing',
  'Export',
  'News'
];

export default function AdminBlogCMS() {
  const { user, loading, isAdmin, logout } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Manufacturing',
      excerpt: '',
      content: '',
      coverImage: '',
      status: 'published',
      publishedAt: new Date().toISOString().split('T')[0]
    }
  });

  const watchCoverImage = watch('coverImage');
  const watchTitle = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !editingId) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', generatedSlug);
    }
  }, [watchTitle, setValue, editingId]);

  const loadPosts = () => {
    setLoadingData(true);
    getBlogPosts()
      .then((data) => {
        setPosts(data);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    reset({
      title: '',
      slug: '',
      category: 'Manufacturing',
      excerpt: '',
      content: '',
      coverImage: '',
      status: 'published',
      publishedAt: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingId(post.id);
    reset({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category as BlogCategory,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || '',
      status: post.status as 'published' | 'draft',
      publishedAt: post.publishedAt || new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await uploadToCloudinary(file, 'blog');
      setValue('coverImage', result.url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      const payload = {
        ...data,
        author: {
          name: user?.displayName || 'Kalasam Editorial Team',
          role: 'Technical Research Lead',
          avatar: user?.photoURL || '/images/logo.png'
        }
      };

      await saveBlogPost(payload, editingId || undefined);
      setIsModalOpen(false);
      loadPosts();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await removeBlogPost(id);
      loadPosts();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filtered = posts.filter((p) =>
    (p.title?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (p.category?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-6 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Enterprise Blog CMS</h2>
          <p className="text-xs text-gray-500 mt-1 font-500">Publish guides, supplier information, and industry articles.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer min-h-[44px] inline-flex items-center justify-center">
          + New Post
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4 bg-white p-3 lg:p-4 rounded-[14px] border border-gray-200/80 shadow-xs">
        <div className="relative flex-1 lg:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 lg:py-2 border border-gray-200 rounded-[10px] text-sm lg:text-xs focus:outline-hidden focus:border-[#25D366] text-gray-900"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3 lg:top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Blogs List */}
      {loadingData ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400 mt-3 font-600">Loading articles database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <span className="text-3xl">📝</span>
          <p className="text-gray-400 text-sm font-700 mt-3">No posts found in database.</p>
          <button onClick={handleOpenAdd} className="mt-4 px-4 py-2.5 bg-[#25D366] text-white font-700 rounded-xl text-xs">Create First Post</button>
        </div>
      ) : (
        <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs overflow-hidden">
          {/* ═══ Mobile Card View ═══ */}
          <div className="admin-cards-mobile divide-y divide-gray-100 md:hidden">
            {filtered.map((p) => (
              <div key={p.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {p.coverImage ? (
                      <img src={p.coverImage} alt="" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-lg">📝</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-800 text-gray-900 text-sm leading-snug">{p.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-mono truncate">{p.slug}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-600">{p.category}</span>
                  <span className={`px-2 py-0.5 text-[10px] rounded-md font-700 uppercase tracking-wider ${
                    p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-gray-400 text-[11px] font-500">{p.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button onClick={() => handleOpenEdit(p)} className="flex-1 py-2.5 text-xs font-700 text-[#128C7E] bg-emerald-50 rounded-lg text-center cursor-pointer min-h-[44px]">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 py-2.5 text-xs font-700 text-red-600 bg-red-50 rounded-lg text-center cursor-pointer min-h-[44px]">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* ═══ Desktop Table ═══ */}
          <table className="w-full text-xs hidden md:table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-700 uppercase tracking-wider text-left">
                <th className="px-5 py-3.5">Article Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Published Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] border border-gray-200 bg-gray-50 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {p.coverImage ? (
                          <img src={p.coverImage} alt="" className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-sm">📝</span>
                        )}
                      </div>
                      <div>
                        <p className="font-700 text-gray-900 leading-tight">{p.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-500">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-600">{p.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 text-[10px] rounded-md font-700 uppercase tracking-wider ${
                      p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 font-500">{p.publishedAt}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => handleOpenEdit(p)} className="text-[#128C7E] hover:underline mr-4 font-700 cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline font-700 cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-0 lg:p-4">
          <div className="bg-white rounded-none lg:rounded-[18px] w-full max-w-3xl shadow-2xl relative h-full lg:h-auto lg:max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <header className="px-4 lg:px-6 py-3.5 lg:py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-sm lg:text-base font-800 text-gray-900">
                {editingId ? 'Modify Blog Post' : 'Compose New Blog Post'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer">✕</button>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 text-xs text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Post Title *</label>
                  <input
                    type="text"
                    {...register('title')}
                    className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                  />
                  {errors.title && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Slug (Google Friendly) *</label>
                  <input
                    type="text"
                    {...register('slug')}
                    className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                  />
                  {errors.slug && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Category *</label>
                  <select
                    {...register('category')}
                    className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs min-h-[44px] lg:min-h-0"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.category.message}</p>}
                </div>
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Status</label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs min-h-[44px] lg:min-h-0"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Published Date</label>
                  <input
                    type="date"
                    {...register('publishedAt')}
                    className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs min-h-[44px] lg:min-h-0"
                  />
                  {errors.publishedAt && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.publishedAt.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Excerpt *</label>
                <input
                  type="text"
                  {...register('excerpt')}
                  className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                />
                {errors.excerpt && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.excerpt.message}</p>}
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Content Body (Markdown / HTML) *</label>
                <textarea
                  {...register('content')}
                  rows={8}
                  className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden font-mono resize-none text-sm lg:text-xs"
                />
                {errors.content && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.content.message}</p>}
              </div>

              {/* Cover Image upload to Cloudinary */}
              <div className="bg-gray-50/50 p-3.5 lg:p-4 rounded-[14px] border border-gray-100">
                <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 mb-3 text-xs">Cover Image (Cloudinary)</h4>
                <div className="flex flex-wrap items-center gap-3">
                  {watchCoverImage && (
                    <div className="w-20 h-20 border rounded-[10px] overflow-hidden bg-white shadow-xs">
                      <img src={watchCoverImage} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}
                  <label className="px-4 py-2.5 border border-dashed border-gray-300 rounded-[10px] flex items-center gap-2 cursor-pointer hover:bg-gray-50 bg-white min-h-[44px]">
                    {uploadingImage ? (
                      <span className="w-4 h-4 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="text-sm text-gray-400 font-bold">+</span>
                        <span className="text-xs text-gray-700 font-600">Upload Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.coverImage && <p className="text-red-500 text-[10px] mt-2 font-600">{errors.coverImage.message}</p>}
              </div>

              <footer className="pt-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 border border-gray-200 rounded-[10px] text-gray-600 hover:bg-gray-50 font-600 cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[10px] font-700 cursor-pointer shadow-sm min-h-[44px]"
                >
                  Save Post
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
