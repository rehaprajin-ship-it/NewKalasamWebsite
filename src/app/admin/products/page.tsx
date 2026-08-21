'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Reorder } from 'framer-motion';
import { getProducts, saveProduct, removeProduct } from '@/lib/firestore';
import { uploadToCloudinary } from '@/lib/cloudinary';
import type { Product, ProductCategory } from '@/types';
import { seedProducts } from '@/data/products';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import BulkImportModal from '@/components/admin/BulkImportModal';

const CATEGORIES: ProductCategory[] = PRODUCT_CATEGORIES.map((c) => c.name as ProductCategory);

// Zod Validation Schema
const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must have at least 2 characters'),
  slug: z.string().min(2, 'Valid slug required').regex(/^[a-z0-9-]+$/, 'Lower alphanumeric and dashes only'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  shortDescription: z.string().min(10, 'Short description is required'),
  description: z.string().min(20, 'Detailed description is required'),
  images: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  casNumber: z.string().optional(),
  molecularFormula: z.string().optional(),
  molecularWeight: z.string().optional(),
  purity: z.string().optional(),
  appearance: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  exportAvailable: z.boolean().default(false),
  oemAvailable: z.boolean().default(false),
  privateLabelAvailable: z.boolean().default(false),
  order: z.number().optional(),
  sortOrder: z.number().optional(),
  variants: z.array(z.object({
    id: z.string(),
    sku: z.string(),
    attributes: z.record(z.string(), z.string()),
    packingType: z.string(),
    materialType: z.string(),
    customPackingAvailable: z.boolean(),
    sortOrder: z.number().optional()
  })).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional()
  }).optional()
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminProductsCMS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewTab, setPreviewTab] = useState<'seo' | 'card' | 'faq'>('seo');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Reordering State
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [activeReorderCategory, setActiveReorderCategory] = useState<ProductCategory>(CATEGORIES[0]);
  const [reorderList, setReorderList] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      slug: '',
      category: 'Industrial Product',
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
      sortOrder: undefined,
      variants: [],
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    }
  });

  const watchName = watch('name') || 'Product Name';
  const watchSlug = watch('slug') || 'product-slug';
  const watchCategory = watch('category') || 'Industrial Product';
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

  // Sync reorder list when category or products list changes
  useEffect(() => {
    const filteredForReorder = products
      .filter((p) => p.category === activeReorderCategory)
      .sort((a, b) => {
        const sA = a.sortOrder !== undefined ? a.sortOrder : (a.order !== undefined ? a.order : 9999);
        const sB = b.sortOrder !== undefined ? b.sortOrder : (b.order !== undefined ? b.order : 9999);
        if (sA !== sB) return sA - sB;
        return (a.name || '').localeCompare(b.name || '');
      });
    setReorderList(filteredForReorder);
  }, [products, activeReorderCategory, isReorderMode]);

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
      sortOrder: undefined,
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
      sortOrder: p.sortOrder,
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
    if (!confirm('This will DELETE all existing products in Firestore and re-seed the corrected catalog. Are you sure?')) return;
    try {
      setLoadingData(true);
      // Fetch and delete existing products
      const existing = await getProducts();
      for (const p of existing) {
        if (p.id) {
          await removeProduct(p.id);
        }
      }

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
          variants: p.variants || [],
          seo: {
            metaTitle: p.seo?.metaTitle || `${p.name} | Kalasam Industries`,
            metaDescription: p.seo?.metaDescription || `Industrial grade ${p.name}.`,
            keywords: p.seo?.keywords || `${p.name}, kalasam`
          }
        };
        await saveProduct(payload);
      }
      alert('All products reset and seeded successfully!');
      loadCatalog();
    } catch (err: any) {
      alert(`Seeding failed: ${err.message}`);
      setLoadingData(false);
    }
  };

  const runSortOrderMigration = async () => {
    if (!confirm('Warning: Running this migration will reset all custom manual ordering back to default creation-date order. Are you sure?')) return;
    try {
      const allProducts = await getProducts();
      
      const grouped: Record<string, Product[]> = {};
      for (const p of allProducts) {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
      }
      
      for (const cat of Object.keys(grouped)) {
        const list = grouped[cat];
        list.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (dateA !== dateB) return dateA - dateB;
          return (a.id || '').localeCompare(b.id || '');
        });
        
        for (let i = 0; i < list.length; i++) {
          const prod = list[i];
          const newOrder = i * 10;
          await saveProduct({ sortOrder: newOrder }, prod.id);
        }
      }
      
      alert('Sort order migration completed successfully! All products have been backfilled with increments of 10.');
      loadCatalog();
    } catch (err: any) {
      alert(`Migration failed: ${err.message}`);
    }
  };

  const handleInlineSortOrderChange = async (productId: string, newOrder: number) => {
    try {
      await saveProduct({ sortOrder: newOrder }, productId);
      loadCatalog();
    } catch (err: any) {
      alert(`Failed to update sort order: ${err.message}`);
    }
  };

  const saveNewOrder = async () => {
    try {
      for (let i = 0; i < reorderList.length; i++) {
        const p = reorderList[i];
        const newOrder = i * 10;
        if (p.sortOrder !== newOrder) {
          await saveProduct({ sortOrder: newOrder }, p.id);
        }
      }
      alert('New display sequence saved successfully!');
      setIsReorderMode(false);
      loadCatalog();
    } catch (err: any) {
      alert(`Failed to save reorder: ${err.message}`);
    }
  };

  const handleReorder = (newOrder: Product[]) => {
    setReorderList(newOrder);
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
      await saveProduct(enrichedData as unknown as Partial<Product>, editingId || undefined);
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
      setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
      loadCatalog();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected product${selectedIds.size > 1 ? 's' : ''}? This cannot be undone.`)) return;
    try {
      for (const id of Array.from(selectedIds)) {
        await removeProduct(id);
      }
      setSelectedIds(new Set());
      loadCatalog();
    } catch (err: any) {
      alert(`Bulk delete failed: ${err.message}`);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length && filtered.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  };

  const filtered = products.filter((p) =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
    (p.category?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-6 animate-in fade-in duration-300">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-800 text-gray-900 tracking-tight">Enterprise Product CMS</h2>
          <p className="text-xs text-gray-500 mt-1 font-500">Configure catalog properties, chemical specifications, and display sequence.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <a
            href="/api/admin/bulk-template"
            download="kalasam-bulk-product-import-template.xlsx"
            className="px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-700 rounded-[12px] text-xs transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
            title="Download Excel template for offline product preparation"
          >
            <span>⬇️</span> Download Template
          </a>
          <button
            onClick={() => setIsBulkImportOpen(true)}
            className="px-3.5 py-2 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-700 rounded-[12px] text-xs transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>📊</span> Bulk Import
          </button>
          {/* Hide/Disable migration button if products already have sortOrder to prevent accidental overwrites */}
          {products.some((p) => p.sortOrder === undefined) && (
            <button onClick={runSortOrderMigration} className="px-3.5 py-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 font-700 rounded-[12px] text-xs transition-colors cursor-pointer">
              ⚙️ Run Sort Migration
            </button>
          )}
          <button onClick={() => setIsReorderMode(!isReorderMode)} className={`px-3.5 py-2 border font-700 rounded-[12px] text-xs transition-colors cursor-pointer ${isReorderMode ? 'bg-[#128C7E] text-white border-[#128C7E]' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'}`}>
            {isReorderMode ? '✕ Exit Reorder' : '⇅ Reorder Mode'}
          </button>
          <button onClick={handleSeedProducts} className="px-3.5 py-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 font-700 rounded-[12px] text-xs transition-colors cursor-pointer">
            Seed Defaults
          </button>
          <button onClick={handleOpenAdd} className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer inline-flex items-center gap-1">
            + Add Product
          </button>
        </div>
      </div>

      {/* Category Overview Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
            <div
              key={cat}
              onClick={() => {
                setSearch(cat === search ? '' : cat);
              }}
              className={`p-3.5 rounded-[14px] border transition-all cursor-pointer ${
                search === cat
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
              }`}
            >
              <p className="text-[11px] font-700 text-gray-500 truncate">{cat}</p>
              <p className="text-xl font-900 text-gray-900 mt-1">
                {count}{' '}
                <span className="text-[10px] font-600 text-gray-400">SKUs</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Filter and Search / Reorder Controls */}
      {isReorderMode ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-[14px] border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-800 text-emerald-800 uppercase tracking-wider">Reordering Category:</span>
            <select
              value={activeReorderCategory}
              onChange={(e) => setActiveReorderCategory(e.target.value as ProductCategory)}
              className="px-3 py-1.5 border border-emerald-200 rounded-[10px] text-xs bg-white text-gray-900 focus:outline-hidden font-600"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <span className="text-[10px] text-emerald-600 font-500">Drag items to sort. Changes are saved back in increments of 10.</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsReorderMode(false)} className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 font-700 rounded-[12px] text-xs transition-colors cursor-pointer bg-white">
              Cancel
            </button>
            <button onClick={saveNewOrder} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-700 rounded-[12px] text-xs transition-colors shadow-sm cursor-pointer">
              Save Display Sequence
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 bg-white p-3 lg:p-4 rounded-[14px] border border-gray-200/80 shadow-xs">
          <div className="relative flex-1 lg:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name, category..."
              className="w-full pl-9 pr-4 py-2.5 lg:py-2 border border-gray-200 rounded-[10px] text-sm lg:text-xs focus:outline-hidden focus:border-[#25D366] text-gray-900"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3 lg:top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      {/* Grid List */}
      {loadingData ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto animate-pulse" />
          <p className="text-xs text-gray-400 mt-3 font-600">Retrieving catalog datasets...</p>
        </div>
      ) : isReorderMode ? (
        reorderList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
            <p className="text-gray-400 text-sm font-700">No products registered in this category.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs p-6">
            <Reorder.Group axis="y" values={reorderList} onReorder={handleReorder} className="space-y-2">
              {reorderList.map((p) => (
                <Reorder.Item
                  key={p.id}
                  value={p}
                  style={{ touchAction: 'none' }}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200/60 rounded-[12px] hover:border-emerald-500/30 hover:bg-emerald-50/10 cursor-grab active:cursor-grabbing transition-colors admin-reorder-item"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-400 font-mono text-lg">☰</span>
                    <div className="w-10 h-10 bg-white border border-gray-100 rounded-[8px] overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                      <img src={p.images?.[0] || '/images/products/synthetic-camphor.png'} alt="" className="object-contain w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-800 text-gray-955 leading-tight truncate">{p.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-sans leading-none truncate">{p.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4 text-xs flex-shrink-0">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-600 hidden sm:inline">{p.category}</span>
                    <span className="font-mono text-gray-500">#{p.sortOrder !== undefined ? p.sortOrder : '—'}</span>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        )
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[18px] border border-gray-200/80 shadow-xs">
          <p className="text-gray-400 text-sm font-700">No products registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[18px] border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 gap-2 bg-rose-50 border border-rose-200 rounded-t-[18px] border-b-0">
              <span className="text-xs font-700 text-rose-800">
                {selectedIds.size} product{selectedIds.size > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="px-3 py-2 text-xs font-700 text-gray-600 hover:text-gray-900 cursor-pointer min-h-[44px]"
                >
                  Clear
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-700 rounded-[10px] cursor-pointer transition-colors shadow-xs flex items-center gap-1.5 min-h-[44px]"
                >
                  🗑️ Delete {selectedIds.size} Selected
                </button>
              </div>
            </div>
          )}

          {/* ═══ Mobile Card View ═══ */}
          <div className="admin-cards-mobile divide-y divide-gray-100">
            {filtered.map((p) => (
              <div key={p.id} className={`p-4 ${selectedIds.has(p.id) ? 'bg-rose-50/30' : ''}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    className="w-5 h-5 accent-[#128C7E] cursor-pointer rounded mt-1 flex-shrink-0"
                  />
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-[8px] overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                    <img src={p.images?.[0] || '/images/products/synthetic-camphor.png'} alt="" className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-800 text-gray-900 text-sm leading-tight truncate">{p.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-mono truncate">{p.slug}</p>
                  </div>
                </div>
                <div className="mt-3 ml-8 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-600">{p.category}</span>
                  {p.casNumber && (
                    <span className="font-mono text-[10px] bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded-sm">CAS: {p.casNumber}</span>
                  )}
                  <span className={`px-2 py-0.5 text-[10px] rounded-md font-700 uppercase tracking-wider ${
                    p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{p.status}</span>
                  <span className="font-mono text-gray-500 text-[10px]">Order: {p.sortOrder ?? '—'}</span>
                </div>
                <div className="mt-3 ml-8 flex items-center gap-3">
                  <button onClick={() => handleOpenEdit(p)} className="px-4 py-2 text-xs font-700 text-[#128C7E] bg-emerald-50 rounded-[8px] cursor-pointer min-h-[44px] flex-1 text-center">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-4 py-2 text-xs font-700 text-red-600 bg-red-50 rounded-[8px] cursor-pointer min-h-[44px] flex-1 text-center">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* ═══ Desktop Table View ═══ */}
          <table className="w-full text-xs text-left border-collapse admin-table-desktop">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-gray-400 font-800 uppercase tracking-wider">
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#128C7E] cursor-pointer rounded"
                    title={selectedIds.size === filtered.length ? 'Deselect all' : 'Select all'}
                  />
                </th>
                <th className="px-4 py-4 w-2/5">Product Profile</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">CAS Registry</th>
                <th className="px-4 py-4">Sort Order</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-50/40 transition-colors ${selectedIds.has(p.id) ? 'bg-rose-50/30' : ''}`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="w-4 h-4 accent-[#128C7E] cursor-pointer rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
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
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-600">{p.category}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {p.casNumber ? (
                      <span className="font-mono text-[10px] bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded-sm">
                        CAS: {p.casNumber}
                      </span>
                    ) : (
                      <span className="text-gray-300 font-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        defaultValue={p.sortOrder !== undefined ? p.sortOrder : 0}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            handleInlineSortOrderChange(p.id, val);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseInt((e.target as HTMLInputElement).value, 10);
                            if (!isNaN(val)) {
                              handleInlineSortOrderChange(p.id, val);
                            }
                          }
                        }}
                        className={`w-14 px-1.5 py-1 border rounded-[6px] text-center text-xs font-mono focus:outline-hidden ${
                          products.some((oth) => oth.id !== p.id && oth.category === p.category && oth.sortOrder === p.sortOrder)
                            ? 'border-amber-400 bg-amber-50/50 text-amber-700'
                            : 'border-gray-200 text-gray-800'
                        }`}
                        title={
                          products.some((oth) => oth.id !== p.id && oth.category === p.category && oth.sortOrder === p.sortOrder)
                            ? 'Warning: Duplicate sortOrder in this category!'
                            : 'Adjust sort order value'
                        }
                      />
                      {products.some((oth) => oth.id !== p.id && oth.category === p.category && oth.sortOrder === p.sortOrder) && (
                        <span className="text-amber-500 font-bold" title="Duplicate sortOrder in this category">⚠️</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 text-[10px] rounded-md font-700 uppercase tracking-wider ${
                      p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleOpenEdit(p)} className="text-[#128C7E] hover:underline mr-4 font-700 cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline font-700 cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Split-screen Form Modal with Live Previews on Desktop / Single-column Full-screen on Mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-0 lg:p-4">
          <div className="bg-white rounded-none lg:rounded-[18px] w-full max-w-6xl shadow-2xl relative h-full lg:h-auto lg:max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100 overflow-hidden">
            
            <header className="px-4 lg:px-6 py-3.5 lg:py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-white z-10">
              <h2 className="text-sm lg:text-base font-800 text-gray-900 truncate">
                {editingId ? 'Modify Product Specifications' : 'Add New Product to Catalog'}
              </h2>
              <button 
                onClick={handleCloseModal} 
                className="text-gray-400 hover:text-gray-600 text-xl p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
              
              {/* Form Editor Column */}
              <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-1/2 lg:overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-5 text-xs text-gray-700 lg:border-r border-gray-100">
                
                {/* Product Basic Info */}
                <div className="bg-gray-50/50 p-3.5 lg:p-4 rounded-[14px] border border-gray-100 space-y-3 lg:space-y-4">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 text-xs">General Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Product Name *</label>
                      <input
                        type="text"
                        {...register('name')}
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Product SEO Slug *</label>
                      <input
                        type="text"
                        {...register('slug')}
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                      {errors.slug && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.slug.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Category *</label>
                      <select
                        {...register('category')}
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs min-h-[44px] lg:min-h-0"
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
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Sort Order</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        {...register('sortOrder', { valueAsNumber: true })}
                        placeholder="Auto (+10)"
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Status</label>
                      <select
                        {...register('status')}
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs min-h-[44px] lg:min-h-0"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chemical Specifications */}
                <div className="bg-gray-50/50 p-3.5 lg:p-4 rounded-[14px] border border-gray-100 space-y-3 lg:space-y-4">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 text-xs">Chemical Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">CAS Number</label>
                      <input
                        type="text"
                        {...register('casNumber')}
                        placeholder="e.g. 76-22-2"
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Purity / Assay</label>
                      <input
                        type="text"
                        {...register('purity')}
                        placeholder="e.g. ≥ 96%"
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles & Promotion Settings */}
                <div className="bg-gray-50/50 p-3.5 lg:p-4 rounded-[14px] border border-gray-100">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 mb-3 text-xs">Toggles & Promotion Settings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <label className="flex items-center gap-2.5 cursor-pointer font-600 text-gray-700 min-h-[40px]">
                      <input type="checkbox" {...register('featured')} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span className="text-xs">Top Selling</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer font-600 text-gray-700 min-h-[40px]">
                      <input type="checkbox" {...register('bestseller')} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span className="text-xs">Bestseller</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer font-600 text-gray-700 min-h-[40px]">
                      <input type="checkbox" {...register('exportAvailable')} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span className="text-xs">Export</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer font-600 text-gray-700 min-h-[40px]">
                      <input type="checkbox" {...register('oemAvailable')} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span className="text-xs">OEM</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer font-600 text-gray-700 min-h-[40px]">
                      <input type="checkbox" {...register('privateLabelAvailable')} className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                      <span className="text-xs">Private Label</span>
                    </label>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Short Description *</label>
                    <input
                      type="text"
                      {...register('shortDescription')}
                      className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                    />
                    {errors.shortDescription && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.shortDescription.message}</p>}
                  </div>
                  <div>
                    <label className="block font-700 text-gray-600 mb-1">Detailed Description *</label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden resize-none text-sm lg:text-xs"
                    />
                    {errors.description && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.description.message}</p>}
                  </div>
                </div>

                {/* Media upload */}
                <div className="bg-gray-50/50 p-3.5 lg:p-4 rounded-[14px] border border-gray-100">
                  <h4 className="font-800 text-gray-900 border-b border-gray-100 pb-1.5 mb-3 text-xs">Product Media (Cloudinary)</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    {watchImages.map((img, idx) => (
                      <div key={idx} className="w-16 h-16 border rounded-[10px] overflow-hidden relative group bg-white">
                        <img src={img} alt="" className="object-contain w-full h-full p-1" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-black/60 text-white text-[10px] font-700 flex items-center justify-center opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer uppercase min-h-[44px]"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-[10px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white min-h-[44px]">
                      {uploadingImage ? (
                        <span className="w-5 h-5 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="text-gray-500 font-700 text-xs">+ Add</span>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* SEO Optimization Fields */}
                <div className="bg-blue-50/50 p-3.5 lg:p-4 rounded-[14px] border border-blue-100">
                  <h4 className="font-800 text-gray-900 border-b border-blue-100 pb-1.5 mb-3 flex items-center gap-2 text-xs">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    SEO Optimization (Optional Overrides)
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-700 text-gray-600 mb-1">
                        Meta Title
                        <span className={`ml-2 text-[10px] font-600 ${(watchMetaTitle?.length || 0) > 60 ? 'text-red-500' : (watchMetaTitle?.length || 0) > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                          {watchMetaTitle?.length || 0}/60 chars
                        </span>
                      </label>
                      <input
                        type="text"
                        {...register('seo.metaTitle')}
                        placeholder={`${watchName} | Kalasam`}
                        className={`w-full px-3 py-2.5 lg:py-2 border rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs ${(watchMetaTitle?.length || 0) > 60 ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`}
                      />
                    </div>

                    <div>
                      <label className="block font-700 text-gray-600 mb-1">
                        Meta Description
                        <span className={`ml-2 text-[10px] font-600 ${
                          (watchMetaDesc?.length || 0) > 160 ? 'text-red-500' :
                          (watchMetaDesc?.length || 0) > 0 && (watchMetaDesc?.length || 0) < 120 ? 'text-amber-500' :
                          (watchMetaDesc?.length || 0) >= 120 ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {watchMetaDesc?.length || 0}/160 chars
                        </span>
                      </label>
                      <textarea
                        {...register('seo.metaDescription')}
                        rows={2}
                        placeholder="120-160 chars recommended."
                        className={`w-full px-3 py-2.5 lg:py-2 border rounded-[8px] text-gray-900 bg-white focus:outline-hidden resize-none text-sm lg:text-xs ${
                          (watchMetaDesc?.length || 0) > 160 ? 'border-red-300 bg-red-50/30' :
                          (watchMetaDesc?.length || 0) > 0 && (watchMetaDesc?.length || 0) < 120 ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-700 text-gray-600 mb-1">Focus Keywords</label>
                      <input
                        type="text"
                        {...register('seo.keywords')}
                        placeholder={`${watchName}, ${watchName} manufacturer`}
                        className="w-full px-3 py-2.5 lg:py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-sm lg:text-xs"
                      />
                    </div>
                  </div>
                </div>

                <footer className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-2">
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
                    Save Product
                  </button>
                </footer>

              </form>

              {/* Right Column: Live Previews (Collapsible / Stacked on Mobile) */}
              <div className="w-full lg:w-1/2 lg:overflow-y-auto p-4 lg:p-6 bg-gray-50/60 flex flex-col space-y-4 lg:space-y-5 text-xs border-t lg:border-t-0 border-gray-200">
                
                {/* Tab buttons */}
                <div className="flex gap-2 border-b border-gray-200 pb-px flex-shrink-0 admin-tabs-scroll">
                  {['seo', 'card', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPreviewTab(tab as any)}
                      className={`px-3 py-2 text-xs font-700 border-b-2 transition-all cursor-pointer capitalize min-h-[44px] ${
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
                    <div className="bg-white rounded-[14px] border border-gray-200/80 p-4 lg:p-5 shadow-xs space-y-2">
                      <span className="text-[10px] text-gray-400 font-700 uppercase tracking-wider block">Google Search Preview</span>
                      <div className="pt-2">
                        <span className="text-[11px] text-gray-500 block leading-tight truncate">https://www.kalasam.com › products › {watchSlug}</span>
                        <h4 className="text-sm font-600 text-blue-800 hover:underline leading-snug mt-1 cursor-pointer">
                          {watchMetaTitle || `${watchName} Manufacturer & Exporter | Kalasam Industries`}
                        </h4>
                        <p className="text-gray-600 leading-relaxed mt-1 text-[11px]">
                          {watchMetaDesc || `High-purity industrial grade ${watchName} manufactured by Kalasam Jaikrishna Industries. ISO certified quality, bulk packaging, global shipping ready.`}
                        </p>
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
                      <div className="bg-white rounded-[14px] border border-gray-200/80 p-4 space-y-2.5 shadow-xs">
                        <h4 className="font-800 text-gray-900 border-b pb-1.5">Specs Properties</h4>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between"><span className="text-gray-400 font-500">CAS Number</span><span className="font-700 text-gray-900">{watchCasNumber}</span></div>
                          <div className="flex justify-between"><span className="text-gray-400 font-500">Assay / Purity</span><span className="font-700 text-[#128C7E]">{watchPurity}</span></div>
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

      {/* Bulk Excel Import Modal */}
      <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        existingProducts={products}
        onImportComplete={() => {
          loadCatalog();
        }}
      />
    </main>
  );
}
