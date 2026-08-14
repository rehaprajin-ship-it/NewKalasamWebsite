'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { saveContact, getProductBySlug } from '@/lib/firestore';
import { useInquiry } from '@/context/InquiryContext';
import { COMPANY } from '@/lib/constants';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Zod validation for B2B Inquiry Form
const b2bInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Target country is required'),
  email: z.string().email('Invalid business email address'),
  phone: z.string().min(5, 'Contact number is required'),
  whatsapp: z.string().optional(),
  quantity: z.string().min(1, 'Target quantity is required (e.g. 5 Tons)'),
  requirementType: z.enum(['Spot Order', 'Contract Supply', 'OEM Manufacturing', 'Private Label'] as const),
  message: z.string().min(10, 'Please describe your detailed specification requirements')
});

type B2BInquiryData = z.infer<typeof b2bInquirySchema>;

export default function ProductClientPage({ initialProduct, allProducts = [], slug }: { initialProduct: any; allProducts?: any[]; slug: string }) {
  const [product, setProduct] = useState<any>(initialProduct);
  const { addItem } = useInquiry();
  const [activeVariant, setActiveVariant] = useState<any>(
    initialProduct?.variants && initialProduct.variants.length > 0
      ? initialProduct.variants[0]
      : null
  );
  const [activeImage, setActiveImage] = useState<string>(
    initialProduct?.images?.[0] || '/images/products/synthetic-camphor.png'
  );
  const [inquiryQty, setInquiryQty] = useState('100 Kg');
  const [activeTab, setActiveTab] = useState<'specs' | 'apps' | 'downloads' | 'faq'>('specs');

  // Client-side real-time sync with Firestore to ensure newly uploaded images/edits show immediately
  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then((latest) => {
        if (latest) {
          setProduct(latest);
          if (latest.images && latest.images.length > 0) {
            setActiveImage((prev) => {
              // If current activeImage is default or not in updated images, switch to first image
              if (!latest.images.includes(prev) || prev === '/images/products/synthetic-camphor.png') {
                return latest.images[0];
              }
              return prev;
            });
          }
          const variants = latest.variants;
          if (variants && variants.length > 0) {
            setActiveVariant((prev: any) => {
              if (!prev) return variants[0];
              const match = variants.find((v: any) => v.id === prev.id || v.sku === prev.sku);
              return match || variants[0];
            });
          }
        }
      })
      .catch(() => {});
  }, [slug]);

  // Sync details to window object for global mobile EnquiryModal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).currentProductDetail = {
        product: activeVariant
          ? `${product.name} — ${Object.values(activeVariant.attributes)[0]}`
          : product.name,
        casNo: product.casNumber || '',
        grade: activeVariant ? `SKU: ${activeVariant.sku}` : '',
      };
    }
  }, [product, activeVariant]);

  const hasVariants = product?.variants && product.variants.length > 0;
  const attributeKeys = hasVariants ? Object.keys(product.variants[0].attributes) : [];
  const primaryAttrKey = attributeKeys[0]; // e.g. "shape" or "packSize"
  const attrLabel = primaryAttrKey === 'shape' ? 'Shape' : primaryAttrKey === 'packSize' ? 'Pack Size' : primaryAttrKey || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<B2BInquiryData>({
    resolver: zodResolver(b2bInquirySchema)
  });

  const handleVariantSelect = (variantVal: string) => {
    const found = product.variants.find((v: any) => v.attributes[primaryAttrKey] === variantVal);
    if (found) {
      setActiveVariant(found);
    }
  };

  const handleAddToInquiry = () => {
    if (activeVariant) {
      const attrVal = Object.values(activeVariant.attributes)[0] as string;
      addItem({
        id: `${product.slug}-${activeVariant.sku}`,
        productId: product.id || product.slug,
        productName: product.name,
        variantId: activeVariant.id,
        variantName: attrVal,
        sku: activeVariant.sku,
        packingType: activeVariant.packingType,
        materialType: activeVariant.materialType,
        image: product.images?.[0],
        quantity: inquiryQty
      });
    } else {
      addItem({
        id: product.slug,
        productId: product.id || product.slug,
        productName: product.name,
        sku: product.sku || product.id || 'N/A',
        packingType: product.packaging?.[0]?.size ? `${product.packaging[0].size} ${product.packaging[0].unit}` : 'Custom',
        materialType: product.appearance || 'Standard',
        image: product.images?.[0],
        quantity: inquiryQty
      });
    }
  };

  const handleGetQuote = () => {
    const detail = {
      product: activeVariant
        ? `${product.name} — ${Object.values(activeVariant.attributes)[0]}`
        : product.name,
      casNo: product.casNumber || '',
      grade: activeVariant ? `SKU: ${activeVariant.sku}` : '',
    };
    window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail }));
  };

  // Cross-sell groupings
  const otherSizes = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id && p.name.startsWith('Kalasam Camphor')
  );

  const youMayAlsoLike = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id && !p.name.startsWith('Kalasam Camphor')
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4 font-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-green-200">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-2.5 py-0.5 bg-white/10 text-white rounded-md text-[10px] font-700 uppercase border border-white/15">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-green-300/20 text-green-200 rounded-md text-[10px] font-700 uppercase border border-green-300/25">
                  Export Certified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-900 tracking-tight leading-tight mt-1">
                {product.name}
              </h1>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 pt-2 font-mono text-[11px] text-white/70">
                {product.casNumber ? (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">CAS No.</p>
                    <p className="text-green-200 font-700 mt-0.5">{product.casNumber}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">CAS No.</p>
                    <p className="text-white/55 font-600 mt-0.5 italic">Pending COA</p>
                  </div>
                )}
                {product.molecularFormula ? (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">Formula</p>
                    <p className="text-white font-700 mt-0.5">{product.molecularFormula}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">Formula</p>
                    <p className="text-white/55 font-600 mt-0.5 italic">Pending COA</p>
                  </div>
                )}
                {product.purity ? (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">Assay / Purity</p>
                    <p className="text-green-400 font-700 mt-0.5">{product.purity}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">Assay / Purity</p>
                    <p className="text-white/55 font-600 mt-0.5 italic">Pending COA</p>
                  </div>
                )}
              </div>

              <p className="text-white/80 text-sm leading-relaxed max-w-3xl pt-2">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Quick CTAs card */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-[18px] border border-white/10 p-5 space-y-3">
              <h4 className="text-xs font-700 text-green-200 uppercase tracking-wider">B2B Action Center</h4>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Connect directly with our technical sales division for bulk volume discounts and global freight bookings.
              </p>
              <button
                onClick={handleGetQuote}
                className="w-full py-2.5 bg-green-400 hover:bg-green-500 text-white text-center rounded-[10px] text-xs font-700 shadow-md transition-colors block cursor-pointer"
              >
                Get a Quote
              </button>
              <a
                href={`https://wa.me/${COMPANY.contact.whatsapp}?text=Hi,%20I'm%20inquiring%20about%20${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-white/15 text-white text-center rounded-[10px] text-xs font-700 border border-white/20 hover:bg-white/25 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon /> Direct WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main split details content layout */}
      <section className="container-custom py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: gallery & properties */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery display */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-5 shadow-xs">
            <div className="aspect-video relative w-full bg-gray-50 border border-gray-100 rounded-[14px] overflow-hidden flex items-center justify-center p-6 group">
              <img
                src={activeImage}
                alt={product.name}
                className="object-contain max-h-[350px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-[8px] border overflow-hidden p-1 flex items-center justify-center flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" width={56} height={56} className="object-contain w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tabbed Info */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs">
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3 px-4 text-xs font-700 uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('apps')}
                className={`py-3 px-4 text-xs font-700 uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'apps' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`py-3 px-4 text-xs font-700 uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'downloads' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Downloads
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-3 px-4 text-xs font-700 uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'faq' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                FAQ
              </button>
            </div>

            <div>
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs text-gray-700">
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Chemical Name</span>
                      <span className="font-700 text-gray-900">{product.name}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Category Group</span>
                      <span className="font-700 text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">CAS Registry No</span>
                      <span className="font-700 text-gray-900">{product.casNumber || <span className="text-gray-400 italic">Pending COA/MSDS upload</span>}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Assay / Purity</span>
                      <span className="font-700 text-gray-900">{product.purity || <span className="text-gray-400 italic">Pending COA/MSDS upload</span>}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Formula String</span>
                      <span className="font-700 text-gray-900">{product.molecularFormula || <span className="text-gray-400 italic">Pending COA/MSDS upload</span>}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Molecular Weight</span>
                      <span className="font-700 text-gray-900">{product.molecularWeight || <span className="text-gray-400 italic">Pending COA/MSDS upload</span>}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Appearance Form</span>
                      <span className="font-700 text-gray-900">{product.appearance || 'Standard'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="font-600 text-gray-400">Storage Parameters</span>
                      <span className="font-700 text-gray-900">{product.storage || 'Keep in cool, dry place. Avoid direct sunlight.'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider mb-2">Industry Use Cases</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications?.map((app: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-600 text-gray-700">
                        {app}
                      </span>
                    )) || <p className="text-xs text-gray-400">Standard chemical intermediates & B2B application support.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'downloads' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider mb-2">Technical Documentation</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#"
                      className="px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-700 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      📄 Download MSDS Safety Sheet
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-700 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      📄 Download COA Quality Certificate
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {product.faq?.map((faq: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-100 pb-3">
                      <h4 className="font-800 text-gray-900 text-xs">{faq.question}</h4>
                      <p className="text-[11px] text-gray-600 mt-1">{faq.answer}</p>
                    </div>
                  )) || (
                    <div className="space-y-3">
                      <div className="border-b border-gray-100 pb-3">
                        <h4 className="font-800 text-gray-900 text-xs">What is the MOQ for this product?</h4>
                        <p className="text-[11px] text-gray-600 mt-1">Standard MOQ for synthetic camphor and intermediates is 30kg (one standard bag). Custom packing and smaller trial orders are available on request.</p>
                      </div>
                      <div className="border-b border-gray-100 pb-3">
                        <h4 className="font-800 text-gray-900 text-xs">Are custom packaging options available for export?</h4>
                        <p className="text-[11px] text-gray-600 mt-1">Yes, we customize bag weight, drum lining, and container packing configurations to align with regional customs compliance and distributor logistics.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Variant Selection & B2B Inquiry */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-5 shadow-xs space-y-5">
            <h3 className="text-sm font-800 text-gray-900 border-b border-gray-150 pb-2">Specification & Order details</h3>

            {/* Selected Variant details */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-600 text-gray-400">SKU Code:</span>
                <span className="font-800 text-gray-900">{activeVariant ? activeVariant.sku : (product.sku || 'N/A')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-600 text-gray-400">Material Form:</span>
                <span className="font-700 text-gray-800">{activeVariant ? activeVariant.materialType : (product.appearance || 'Standard')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-600 text-gray-400">Packing Type:</span>
                <span className="font-700 text-gray-800">{activeVariant ? activeVariant.packingType : (product.packaging?.[0]?.size ? `${product.packaging[0].size} ${product.packaging[0].unit}` : 'Custom')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-600 text-gray-400">Custom Packing:</span>
                <span className="font-700 text-green-600">Available</span>
              </div>
            </div>

            {/* Single-Attribute Variant Selector */}
            {hasVariants && (
              <div className="space-y-2.5">
                <label className="text-xs font-800 text-gray-400 uppercase tracking-wider block">
                  Select {attrLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: any) => {
                    const attrVal = v.attributes[primaryAttrKey];
                    const isSelected = activeVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantSelect(attrVal)}
                        className={`px-3 py-2 rounded-lg text-xs font-700 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary/10 text-primary border-primary'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {attrVal}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Input + Add to Inquiry List */}
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-700 text-gray-700">Quantity Needed:</label>
                <input
                  type="text"
                  value={inquiryQty}
                  onChange={(e) => setInquiryQty(e.target.value)}
                  className="w-28 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-700 text-right text-gray-950 focus:outline-hidden"
                  placeholder="e.g. 500 Kg"
                />
              </div>

              <button
                onClick={handleAddToInquiry}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-700 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                ➕ Add to Inquiry List
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Pharmaceutical & Technical Buyers Section — Synthetic Camphor Only */}
      {slug === 'synthetic-camphor' && (
        <section className="container-custom py-10 border-t border-gray-200/60">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200/50 p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="text-lg font-900 text-gray-900 tracking-tight">For Pharmaceutical & Technical Buyers</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Kalasam Jaikrishna Industries supplies pharmaceutical-grade synthetic camphor to pharma companies, compounding facilities, and technical chemical buyers across India and internationally. Our camphor powder and crystals are manufactured under strict quality control with batch-wise Certificate of Analysis (COA) available on request.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
                <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider">Quality Assurance</h4>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Batch-wise COA (Certificate of Analysis) provided</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> MSDS / SDS documentation available</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Consistent purity across production batches</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Third-party lab testing on request</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
                <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider">Pharma Supply Capabilities</h4>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Pharmaceutical-grade camphor available on request</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Custom purity specifications accommodated</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Bulk supply for compounding and formulation</li>
                  <li className="flex gap-2"><span className="text-blue-500">✓</span> Regulatory documentation support for import/export</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200/50 rounded-lg p-4 text-xs text-blue-900">
              <strong>Note:</strong> For specific pharmacopeia grade requirements, detailed purity specifications, or custom COA formats, please contact our technical sales team directly. We will provide complete specification sheets and sample availability for evaluation before bulk commitment.
            </div>

            <button
              onClick={handleGetQuote}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-700 shadow-md transition-colors cursor-pointer"
            >
              Request Pharma-Grade Specification Sheet
            </button>
          </div>
        </section>
      )}

      {/* Cross-Sells Section */}
      <section className="container-custom py-8 border-t border-gray-200/60 space-y-12">
        {/* Other sizes of this product */}
        {otherSizes.length > 0 && (
          <div className="space-y-5">
            <h3 className="text-lg font-900 text-gray-950 tracking-tight">Other Sizes & Shapes Available</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {otherSizes.slice(0, 4).map((p: any) => (
                <div key={p.id} className="bg-white border border-gray-250/60 rounded-xl p-4 flex flex-col items-center justify-between hover:shadow-xs transition-shadow">
                  <Link href={`/products/${p.slug}`} className="w-full aspect-square bg-gray-50/50 rounded-lg flex items-center justify-center p-4">
                    <img src={p.images?.[0] || '/images/products/synthetic-camphor.png'} alt={p.name} width={100} height={100} className="object-contain max-h-[100px] w-auto" />
                  </Link>
                  <Link href={`/products/${p.slug}`} className="mt-3 text-center">
                    <h4 className="font-800 text-xs text-gray-900 hover:text-primary transition-colors leading-tight line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{p.shortDescription || 'Refined camphor tablet'}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {youMayAlsoLike.length > 0 && (
          <div className="space-y-5">
            <h3 className="text-lg font-900 text-gray-950 tracking-tight">You May Also Be Interested In</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {youMayAlsoLike.slice(0, 4).map((p: any) => (
                <div key={p.id} className="bg-white border border-gray-250/60 rounded-xl p-4 flex flex-col items-center justify-between hover:shadow-xs transition-shadow">
                  <Link href={`/products/${p.slug}`} className="w-full aspect-square bg-gray-50/50 rounded-lg flex items-center justify-center p-4">
                    <img src={p.images?.[0] || '/images/products/synthetic-camphor.png'} alt={p.name} width={100} height={100} className="object-contain max-h-[100px] w-auto" />
                  </Link>
                  <Link href={`/products/${p.slug}`} className="mt-3 text-center">
                    <h4 className="font-800 text-xs text-gray-900 hover:text-primary transition-colors leading-tight line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{p.category}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mobile Sticky bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-200/80 p-3 shadow-lg flex items-center gap-3 lg:hidden">
        <div className="flex-1 min-w-0">
          <h4 className="font-800 text-xs text-gray-900 truncate leading-tight">{product.name}</h4>
          <p className="text-[10px] text-gray-500 font-600 truncate mt-0.5">
            {activeVariant ? `SKU: ${activeVariant.sku}` : `SKU: ${product.sku || 'N/A'}`}
          </p>
        </div>
        <button
          onClick={handleGetQuote}
          className="px-5 py-2.5 bg-primary text-white text-xs font-700 rounded-lg shadow-sm hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}
