'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getProducts, saveProduct, removeProduct } from '@/lib/firestore';
import { uploadToCloudinary } from '@/lib/cloudinary';
import type { Product, ProductCategory } from '@/types';
import { seedProducts } from '@/data/products';

// Zod Validation Schema
const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum([
    'Industrial Chemicals',
    'Camphor',
    'Sambrani',
    'Agarbathi',
    'Lamp Oil',
    'Rose Water',
    'Temple Products',
    'Pooja Accessories'
  ] as const),
  subcategory: z.string().optional(),
  shortDescription: z.string().min(5, 'Short description is required'),
  description: z.string().min(10, 'Full description is required'),
  images: z.array(z.string()).min(1, 'At least one product image is required'),
  thumbnail: z.string().optional(),
  casNumber: z.string().optional(),
  molecularFormula: z.string().optional(),
  molecularWeight: z.string().optional(),
  purity: z.string().optional(),
  appearance: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived'] as const),
  featured: z.boolean(),
  bestseller: z.boolean(),
  exportAvailable: z.boolean(),
  oemAvailable: z.boolean(),
  privateLabelAvailable: z.boolean(),
  order: z.number(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional()
  }).optional()
});

type ProductFormData = z.infer<typeof productSchema>;

const CATEGORIES: ProductCategory[] = [
  'Industrial Chemicals',
  'Camphor',
  'Sambrani',
  'Agarbathi',
  'Lamp Oil',
  'Rose Water',
  'Temple Products',
  'Pooja Accessories'
];

export default function AdminProductsCMS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewTab, setPreviewTab] = useState<'seo' | 'card' | 'faq'>('seo');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      category: 'Industrial Chemicals',
      subcategory: '',
      shortDescription: '',
      description: '',
      images: [],
      thumbnail: '',
      casNumber: '',
      molecularFormula: '',
      molecularWeight: '',
      purity: '',
      appearance: '',
      status: 'active',
      featured: false,
      bestseller: false,
      exportAvailable: false,
      oemAvailable: false,
      privateLabelAvailable: false,
      order: 0,
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    }
  });

  const watchName = watch('name') || 'Product Name';
  const watchSlug = watch('slug') || 'product-slug';
  const watchCategory = watch('category') || 'Industrial Chemicals';
  const watchPurity = watch('purity') || '≥ 96%';
  const watchCasNumber = watch('casNumber') || '76-22-2';
  const watchShortDesc = watch('shortDescription') || 'Configure short descriptions here...';
  const watchDescription = watch('description') || 'Configure detailed product descriptions...';
  const watchImages = watch('images') || [];

  // Watch SEO overrides for live preview
  const watchMetaTitle = watch('seo.metaTitle');
  const watchMetaDesc = watch('seo.metaDescription');
  const watchKeywords = watch('seo.keywords');

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name && !editingId) {
        const generatedSlug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        setValue('slug', generatedSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, editingId]);

  const loadCatalog = () => {
    setLoadingData(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    reset({
      name: '',
      slug: '',
      category: 'Industrial Chemicals',
      subcategory: '',
      shortDescription: '',
      description: '',
      images: [],
      thumbnail: '',
      casNumber: '',
      molecularFormula: '',
      molecularWeight: '',
      purity: '',
      appearance: '',
      status: 'active',
      featured: false,
      bestseller: false,
      exportAvailable: false,
      oemAvailable: false,
      privateLabelAvailable: false,
      order: 0,
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    reset({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      subcategory: p.subcategory || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      images: p.images || [],
      thumbnail: p.thumbnail || '',
      casNumber: p.casNumber || '',
      molecularFormula: p.molecularFormula || '',
      molecularWeight: p.molecularWeight || '',
      purity: p.purity || '',
      appearance: p.appearance || '',
      status: p.status || 'active',
      featured: !!p.featured,
      bestseller: !!p.bestseller,
      exportAvailable: !!p.exportAvailable,
      oemAvailable: !!p.oemAvailable,
      privateLabelAvailable: !!p.privateLabelAvailable,
      order: p.order || 0,
      seo: {
        metaTitle: (p as any).seo?.metaTitle || '',
        metaDescription: (p as any).seo?.metaDescription || '',
        keywords: (p as any).seo?.keywords || ''
      }
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSeedProducts = async () => {
    if (!confirm('Are you sure you want to seed default products into Firestore? This will add all predefined items.')) return;
    try {
      for (const item of seedProducts) {
        const p = item as any;
        const payload = {
          name: p.name || '',
          slug: p.slug || '',
          category: (p.category || 'Industrial Chemicals') as ProductCategory,
          subcategory: p.subcategory || '',
          shortDescription: p.shortDescription || 'Predefined catalog item.',
          description: p.description || 'Predefined detailed description.',
          images: p.images || (p.image ? [p.image] : []),
          thumbnail: p.thumbnail || p.image || '',
          casNumber: p.casNumber || '',
          molecularFormula: p.molecularFormula || '',
          molecularWeight: p.molecularWeight || '',
          purity: p.purity || '',
          appearance: p.appearance || '',
          status: 'active' as const,
          featured: !!p.featured,
          bestseller: !!p.bestseller,
          exportAvailable: !!p.exportAvailable,
          oemAvailable: !!p.oemAvailable,
          privateLabelAvailable: !!p.privateLabelAvailable,
          order: p.order || 0,
          seo: {
            metaTitle: p.seo?.metaTitle || `${p.name} | Kalasam Industries`,
            metaDescription: p.seo?.metaDescription || `Industrial grade ${p.name}.`,
            keywords: p.seo?.keywords || `${p.name}, kalasam`
          }
        };
        await saveProduct(payload);
      }
      alert('Default products seeded successfully!');
      loadCatalog();
    } catch (err: any) {
      alert(`Seeding failed: ${err.message}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await uploadToCloudinary(file, 'products');
      const currentImages = watchImages;
      setValue('images', [...currentImages, result.url]);
      if (!watch('thumbnail')) {
        setValue('thumbnail', result.url);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = watchImages;
    const updatedImages = currentImages.filter((_, idx) => idx !== index);
    setValue('images', updatedImages);
    if (watch('thumbnail') === currentImages[index]) {
      setValue('thumbnail', updatedImages[0] || '');
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const enrichedData = {
        ...data,
        seo: {
          metaTitle: data.seo?.metaTitle || `${data.name} Manufacturer & Exporter | Kalasam Industries`,
          metaDescription: data.seo?.metaDescription || `High-purity industrial grade ${data.name} manufactured by Kalasam Jaikrishna Industries. ISO certified quality, bulk packaging, global shipping ready.`,
          keywords: data.seo?.keywords || `${data.name}, buy ${data.name}, ${data.name} supplier, ${data.name} manufacturer, bulk ${data.name}`
        },
        faq: [
          {
            question: `What is the minimum assay purity of ${data.name}?`,
            answer: `Our standard production batches of ${data.name} are synthesized to match premium grade industrial specifications, accompanying a Certificate of Analysis (COA).`
          },
          {
            question: `What are the bulk packaging tiers for ${data.name}?`,
            answer: `We pack ${data.name} in standard 25 Kg HDPE double-lined fiber drums or 50 Kg bags. Custom export packaging and retail branding are supported.`
          }
        ],
        applications: [
          'Pharmaceutical API Formulation',
          'Incense and Agarbathi Manufacturing',
          'Organic Chemical Synthesis Reagents',
          'Perfumery and Aroma Compounds Processing'
        ]
      };
      await saveProduct(enrichedData, editingId || undefined);
      setIsModalOpen(false);
      loadCatalog();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await removeProduct(id);
      loadCatalog();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filtered = products.filter((p) =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (p.category?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Enterprise Product CMS</h2>
          <p className="text-xs text-gray-500 mt-1 font-500">Configure catalog properties, chemical specifications, and media items.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSeedProducts} className="px-4 py-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 font-700 rounded-[12px] text-xs transition-colors cursor-pointer">
            Seed Default Products
          </button>
          <button onClick={handleOpenAdd} className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer">
            + Add Product
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-[14px] border border-gray-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, category..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-[10px] text-xs focus:outline-hidden focus:border-[#25D366] text-gray-900"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Grid List */}
      {loadingData ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto animate-pulse" />
          <p className="text-xs text-gray-400 mt-3 font-600">Retrieving catalog datasets...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <p className="text-gray-400 text-sm font-700">No products registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-gray-400 font-800 uppercase tracking-wider">
                <th className="px-5 py-4 w-2/5">Product Profile</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">CAS Registry</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-[8px] overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                        <img src={p.images?.[0] || '/images/products/synthetic-camphor.png'} alt="" className="object-contain w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-800 text-gray-955 leading-tight">{p.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-sans leading-none">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-600">{p.category}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {p.casNumber ? (
                      <span className="font-mono text-[10px] bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded-sm">
                        CAS: {p.casNumber}
                      </span>
                    ) : (
                      <span className="text-gray-300 font-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 text-[10px] rounded-md font-700 uppercase tracking-wider ${
                      p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
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

      {/* Split-screen Form Modal with Live Previews */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] w-full max-w-6xl shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100 overflow-hidden">
            
            <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-base font-800 text-gray-900">
                {editingId ? 'Modify Product Specifications' : 'Add New Product to Catalog'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer">✕</button>
            </header>

            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Column: Form Editor */}
              <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 overflow-y-auto p-6 space-y-5 text-xs text-gray-700 border-r border-gray-100">
                
                {/* Product Basic Info */}
                <div className="bg-gray-50/50 p-4 rounded-[14px] border border-gray-100 space-y-4">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5">General Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Product Name *</label>
                      <input
                        type="text"
                        {...register('name')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Product SEO Slug *</label>
                      <input
                        type="text"
                        {...register('slug')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      />
                      {errors.slug && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.slug.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Category *</label>
                      <select
                        {...register('category')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Subcategory</label>
                      <input
                        type="text"
                        {...register('subcategory')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Status</label>
                      <select
                        {...register('status')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chemical Specifications */}
                <div className="bg-gray-50/50 p-4 rounded-[14px] border border-gray-100 space-y-4">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5">Chemical Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">CAS Number</label>
                      <input
                        type="text"
                        {...register('casNumber')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Purity</label>
                      <input
                        type="text"
                        {...register('purity')}
                        className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles & Promotion Settings */}
                <div className="bg-gray-50/50 p-4 rounded-[14px] border border-gray-100">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 mb-3">Toggles & Promotion Settings</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-600 text-gray-700">
                      <input type="checkbox" {...register('featured')} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span>Featured Item</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-600 text-gray-700">
                      <input type="checkbox" {...register('bestseller')} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span>Bestseller</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-600 text-gray-700">
                      <input type="checkbox" {...register('exportAvailable')} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span>Export Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-600 text-gray-700">
                      <input type="checkbox" {...register('oemAvailable')} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span>OEM Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-600 text-gray-700">
                      <input type="checkbox" {...register('privateLabelAvailable')} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span>Private Label</span>
                    </label>
                  </div>
                </div>

                {/* Optional SEO Custom Overrides */}
                <div className="bg-gray-50/50 p-4 rounded-[14px] border border-gray-100 space-y-4">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5">SEO & Meta Overrides (Optional)</h4>
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Custom Meta Title</label>
                    <input
                      type="text"
                      {...register('seo.metaTitle')}
                      placeholder="Leave blank for auto-generation"
                      className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Custom Meta Description</label>
                    <textarea
                      {...register('seo.metaDescription')}
                      rows={2}
                      placeholder="Leave blank for auto-generation"
                      className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Custom Keywords (Comma Separated)</label>
                    <input
                      type="text"
                      {...register('seo.keywords')}
                      placeholder="e.g. synthetic camphor, camphor powder, pooja"
                      className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Short Description *</label>
                    <input
                      type="text"
                      {...register('shortDescription')}
                      className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Detailed Description *</label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden resize-none"
                    />
                  </div>
                </div>

                {/* Media upload */}
                <div className="bg-gray-50/50 p-4 rounded-[14px] border border-gray-100">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 mb-3">Product Media (Cloudinary)</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    {watchImages.map((img, idx) => (
                      <div key={idx} className="w-16 h-16 border rounded-[10px] overflow-hidden relative group bg-white">
                        <img src={img} alt="" className="object-contain w-full h-full p-1" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-black/60 text-white text-[9px] font-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer uppercase"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 border border-dashed border-gray-300 rounded-[10px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                      {uploadingImage ? (
                        <span className="w-4 h-4 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="text-gray-400 font-700">+ Add</span>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                    </label>
                  </div>
                </div>

                <footer className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-gray-200 rounded-[10px] text-gray-500 hover:bg-gray-50 font-600 cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[10px] font-700 cursor-pointer shadow-sm">
                    Save Product
                  </button>
                </footer>

              </form>

              {/* Right Column: Live Previews */}
              <div className="w-1/2 overflow-y-auto p-6 bg-gray-50/60 flex flex-col space-y-5 text-xs">
                
                {/* Tab buttons */}
                <div className="flex gap-2 border-b border-gray-200 pb-px flex-shrink-0">
                  {['seo', 'card', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPreviewTab(tab as any)}
                      className={`px-3 py-1.5 text-[11px] font-700 border-b-2 transition-all cursor-pointer capitalize ${
                        previewTab === tab ? 'border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'seo' ? 'Google SEO' : tab === 'card' ? 'Catalog Card' : 'FAQs & Specs'}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1">
                  
                  {previewTab === 'seo' && (
                    <div className="bg-white rounded-[14px] border border-gray-200/80 p-5 shadow-xs space-y-2">
                      <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Google Search Preview</span>
                      <div className="pt-2">
                        <span className="text-[11px] text-gray-500 block leading-tight">https://www.kalasam.com › products › {watchSlug}</span>
                        <h4 className="text-sm font-600 text-blue-800 hover:underline leading-snug mt-1 cursor-pointer">
                          {watchMetaTitle || `${watchName} Manufacturer & Exporter | Kalasam Industries`}
                        </h4>
                        <p className="text-gray-600 leading-relaxed mt-1 text-[11px]">
                          {watchMetaDesc || `High-purity industrial grade ${watchName} manufactured by Kalasam Jaikrishna Industries. ISO certified quality, bulk packaging, global shipping ready.`}
                        </p>
                        {watchKeywords && (
                          <p className="text-[10px] text-gray-400 mt-2 font-mono">
                            Keywords: {watchKeywords}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {previewTab === 'card' && (
                    <div className="bg-white rounded-[18px] border-2 border-[#25D366]/30 overflow-hidden max-w-[220px] mx-auto shadow-xs">
                      <div className="aspect-square bg-gray-50 flex items-center justify-center p-3">
                        <img src={watchImages[0] || '/images/products/synthetic-camphor.png'} alt="" className="object-contain max-h-[140px]" />
                      </div>
                      <div className="p-3.5 text-center">
                        <h4 className="font-800 text-gray-905 text-xs line-clamp-1">{watchName}</h4>
                        <p className="text-[10px] text-gray-400 uppercase font-700 mt-0.5">{watchCategory}</p>
                      </div>
                    </div>
                  )}

                  {previewTab === 'faq' && (
                    <div className="space-y-4">
                      {/* Specifications Preview */}
                      <div className="bg-white rounded-[14px] border border-gray-200/80 p-4 space-y-2.5 shadow-xs">
                        <h4 className="font-800 text-gray-900 border-b pb-1.5">Specs Properties</h4>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between"><span className="text-gray-400 font-500">CAS Number</span><span className="font-700 text-gray-900">{watchCasNumber}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400 font-500">Assay / Purity</span><span className="font-700 text-[#128C7E]">{watchPurity}</span></div>
                        </div>
                      </div>

                      {/* FAQs Preview */}
                      <div className="bg-white rounded-[14px] border border-gray-200/80 p-4 space-y-3 shadow-xs">
                        <h4 className="font-800 text-gray-900 border-b pb-1.5">Auto-Generated FAQ Accordion</h4>
                        <div className="space-y-2">
                          <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-700 text-gray-800">Q: What is the minimum assay purity of {watchName}?</p>
                            <p className="text-gray-500 mt-1">A: Our standard production batches of {watchName} are synthesized to match premium grade specifications...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}
