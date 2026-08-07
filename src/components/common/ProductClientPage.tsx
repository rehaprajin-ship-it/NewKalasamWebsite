'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { saveContact } from '@/lib/firestore';
import { seedProducts } from '@/data/products';

// Zod validation for B2B Inquiry Form
const b2bInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Target country is required'),
  email: z.string().email('Invalid business email address'),
  phone: z.string().min(5, 'Contact number is required'),
  whatsapp: z.string().optional(),
  quantity: z.string().min(1, 'Target quantity is required (e.g. 5 Tons)'),
  packaging: z.string().min(1, 'Select packaging format'),
  requirementType: z.enum(['Spot Order', 'Contract Supply', 'OEM Manufacturing', 'Private Label'] as const),
  message: z.string().min(10, 'Please describe your detailed specification requirements')
});

type B2BInquiryData = z.infer<typeof b2bInquirySchema>;

export default function ProductClientPage({ initialProduct, slug }: { initialProduct: any; slug: string }) {
  const [product] = useState<any>(initialProduct);
  const [activeImage, setActiveImage] = useState<string>(initialProduct?.images?.[0] || '/images/products/synthetic-camphor.png');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<B2BInquiryData>({
    resolver: zodResolver(b2bInquirySchema)
  });

  const onInquirySubmit = async (data: B2BInquiryData) => {
    setIsSubmitting(true);
    try {
      await saveContact({
        ...data,
        subject: `B2B Portal Inquiry: ${product?.name} (${data.requirementType})`,
        createdAt: new Date()
      });
      setFormSuccess(true);
      reset();
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      
      {/* 1. B2B Industrial Hero Section */}
      <section className="bg-gradient-to-r from-[#128C7E] to-[#1b5d54] text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4 font-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[#DCF8C6]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-2.5 py-0.5 bg-white/10 text-white rounded-md text-[10px] font-700 uppercase border border-white/15">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#DCF8C6]/20 text-[#DCF8C6] rounded-md text-[10px] font-700 uppercase border border-[#DCF8C6]/25">
                  Export Certified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-900 tracking-tight leading-tight mt-1">
                {product.name}
              </h1>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 pt-2 font-mono text-[11px] text-white/70">
                {product.casNumber && (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">CAS No.</p>
                    <p className="text-[#DCF8C6] font-700 mt-0.5">{product.casNumber}</p>
                  </div>
                )}
                {product.molecularFormula && (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider">Formula</p>
                    <p className="text-white font-700 mt-0.5">{product.molecularFormula}</p>
                  </div>
                )}
                {product.molecularWeight && (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider font-sans">Mol. Weight</p>
                    <p className="text-white font-700 mt-0.5">{product.molecularWeight}</p>
                  </div>
                )}
                {product.purity && (
                  <div>
                    <p className="text-white/40 font-500 uppercase tracking-wider font-sans">Assay / Purity</p>
                    <p className="text-[#25D366] font-700 mt-0.5">{product.purity}</p>
                  </div>
                )}
              </div>

              <p className="text-white/80 text-sm leading-relaxed max-w-3xl pt-2">
                {product.shortDescription || product.description}
              </p>

              {/* B2B Trust badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-2.5 py-1 bg-white/10 rounded-[6px] text-[10px] font-700 border border-white/10">ISO 9001:2015 Ready</span>
                <span className="px-2.5 py-1 bg-white/10 rounded-[6px] text-[10px] font-700 border border-white/10">GMP Packaging Standards</span>
                <span className="px-2.5 py-1 bg-white/10 rounded-[6px] text-[10px] font-700 border border-white/10">100% Laboratory Checked</span>
                <span className="px-2.5 py-1 bg-[#25D366]/20 text-[#25D366] rounded-[6px] text-[10px] font-700 border border-[#25D366]/20">Made in India</span>
              </div>
            </div>

            {/* Quick CTAs card */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-[18px] border border-white/10 p-5 space-y-3">
              <h4 className="text-xs font-700 text-[#DCF8C6] uppercase tracking-wider">B2B Action Center</h4>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Connect directly with our technical sales division for bulk volume discounts and global freight bookings.
              </p>
              <a href="#inquiry-form" className="w-full py-2.5 bg-[#25D366] hover:bg-[#1fbd58] text-white text-center rounded-[10px] text-xs font-700 shadow-md transition-colors block cursor-pointer">
                Submit RFQ Request
              </a>
              <a href="#downloads-section" className="w-full py-2.5 bg-white/15 text-white text-center rounded-[10px] text-xs font-700 border border-white/20 hover:bg-white/25 transition-colors block cursor-pointer">
                Download Safety Sheets (MSDS)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main split details content layout */}
      <section className="container-custom py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: specifications & highlights */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gallery display */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-5 shadow-xs">
            <div className="aspect-video relative w-full bg-gray-50 border border-gray-100 rounded-[14px] overflow-hidden flex items-center justify-center p-6">
              <img src={activeImage} alt={product.name} className="object-contain max-h-[350px] w-auto transition-transform duration-300 hover:scale-105" />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-[8px] border overflow-hidden p-1 flex items-center justify-center flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-[#25D366] ring-1 ring-[#25D366]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="object-contain w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technical specifications grid table */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-800 text-gray-900 border-b border-gray-100 pb-2">Technical Properties</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="font-600 text-gray-400">Chemical Name</span>
                <span className="font-700 text-gray-900">{product.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="font-600 text-gray-400">Category Group</span>
                <span className="font-700 text-gray-900">{product.category}</span>
              </div>
              {product.casNumber && (
                <div className="flex justify-between py-1.5 border-b border-gray-100 font-mono">
                  <span className="font-600 text-gray-400 font-sans">CAS Registry No</span>
                  <span className="font-800 text-gray-955">{product.casNumber}</span>
                </div>
              )}
              {product.purity && (
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-600 text-gray-400">Assay / Purity</span>
                  <span className="font-800 text-[#128C7E]">{product.purity}</span>
                </div>
              )}
              {product.molecularFormula && (
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-600 text-gray-400">Formula String</span>
                  <span className="font-700 text-gray-900">{product.molecularFormula}</span>
                </div>
              )}
              {product.molecularWeight && (
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-600 text-gray-400">Molecular Weight</span>
                  <span className="font-700 text-gray-900">{product.molecularWeight}</span>
                </div>
              )}
              {product.appearance && (
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-600 text-gray-400">Appearance</span>
                  <span className="font-700 text-gray-900">{product.appearance}</span>
                </div>
              )}
              {product.shelfLife && (
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-600 text-gray-400">Shelf Life</span>
                  <span className="font-700 text-gray-900">{product.shelfLife}</span>
                </div>
              )}
            </div>
          </div>

          {/* Applications Grid */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-800 text-gray-900">Commercial Applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Pharmaceutical Industry', desc: 'Used extensively as an active analgesic formulation agent for topical muscle rubs and pain relief sprays.' },
                { title: 'Incense & Pooja Products', desc: 'The high volatility and pure carbon composition provide optimal flame properties for religious rituals.' },
                { title: 'Chemical Syntheses', desc: 'Acts as a critical raw material intermediate in the processing of specialized organic compounds.' },
                { title: 'Aromatics & Fragrances', desc: 'Adds fresh cooling therapeutic camphoraceous notes to household air fresheners and toiletries.' }
              ].map((app) => (
                <div key={app.title} className="p-4 bg-gray-50 rounded-[12px] border border-gray-100">
                  <h4 className="font-800 text-gray-955 text-xs">{app.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worldwide Export Profile */}
          <div className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-800 text-gray-900">Worldwide Shipping & Container Loading</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 text-xs">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-[12px]">
                <span className="text-[10px] text-gray-400 font-600 block">Shipping Ports</span>
                <span className="font-700 text-gray-955 mt-1 block">Chennai / Tuticorin</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-[12px]">
                <span className="text-[10px] text-gray-400 font-600 block">Shipping Terms</span>
                <span className="font-700 text-[#128C7E] mt-1 block">FOB, CIF, CFR</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-[12px]">
                <span className="text-[10px] text-gray-400 font-600 block">Lead Time</span>
                <span className="font-700 text-gray-955 mt-1 block">15 - 20 Days</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-[12px]">
                <span className="text-[10px] text-gray-400 font-600 block">Minimum Order</span>
                <span className="font-700 text-gray-955 mt-1 block">500 Kg</span>
              </div>
            </div>
          </div>

          {/* Downloads Center */}
          <div id="downloads-section" className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-800 text-gray-900">Documentation & Safety Files</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Safety Data Sheet (MSDS)', size: '280 Kb' },
                { label: 'Technical Datasheet (TDS)', size: '150 Kb' },
                { label: 'Certificate of Analysis (COA)', size: '120 Kb' }
              ].map((doc) => (
                <div key={doc.label} className="p-3 bg-gray-50 rounded-[12px] border border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-800 text-gray-900 text-[11px]">{doc.label}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{doc.size} • PDF Document</p>
                  </div>
                  <button className="p-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-100 text-gray-505 cursor-pointer">
                    📥
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Sticky Form */}
        <div className="lg:col-span-1">
          <div id="inquiry-form" className="bg-white rounded-[18px] border border-gray-200/80 p-6 shadow-xs sticky top-24 space-y-5">
            <div>
              <h3 className="text-base font-800 text-gray-955">Bulk Quotation Form</h3>
              <p className="text-[11px] text-gray-500 mt-1 font-500">Provide company credentials to retrieve freight rates and sample dispatch conditions.</p>
            </div>

            <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-4 text-xs text-gray-700">
              
              <div>
                <label className="block font-700 text-gray-600 mb-1">Contact Name *</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Company Registered Name *</label>
                <input
                  type="text"
                  {...register('company')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                />
                {errors.company && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.company.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Target Country *</label>
                  <input
                    type="text"
                    {...register('country')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                  />
                  {errors.country && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.country.message}</p>}
                </div>
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden text-base sm:text-xs"
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Target Volume *</label>
                  <input
                    type="text"
                    {...register('quantity')}
                    placeholder="e.g. 5 Tons"
                    className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                  />
                  {errors.quantity && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.quantity.message}</p>}
                </div>
                <div>
                  <label className="block font-700 text-gray-600 mb-1">Packaging *</label>
                  <select
                    {...register('packaging')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                  >
                    <option value="25kg drums">25 Kg Fiber Drums</option>
                    <option value="50kg bags">50 Kg Paper Bags</option>
                    <option value="1kg pouches">1 Kg Retail Pouches</option>
                    <option value="Custom requirements">Custom Packaging</option>
                  </select>
                  {errors.packaging && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.packaging.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Inquiry Purpose *</label>
                <select
                  {...register('requirementType')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden"
                >
                  <option value="Spot Order">Spot Order</option>
                  <option value="Contract Supply">Contract Supply</option>
                  <option value="OEM Manufacturing">OEM Manufacturing</option>
                  <option value="Private Label">Private Label</option>
                </select>
              </div>

              <div>
                <label className="block font-700 text-gray-600 mb-1">Specification Details *</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder="Specify targeted purity levels, mesh sizes, specific packaging markers..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-gray-900 bg-white focus:outline-hidden resize-none"
                />
                {errors.message && <p className="text-red-500 text-[10px] mt-1 font-600">{errors.message.message}</p>}
              </div>

              {formSuccess ? (
                <div className="p-3 bg-green-50 border border-green-200 rounded-[12px] text-green-700 font-700 text-center animate-pulse">
                  ✓ B2B Inquiry Submitted Successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-700 rounded-[12px] shadow-sm transition-colors cursor-pointer text-center"
                >
                  {isSubmitting ? 'Submitting Inquiry...' : 'Submit B2B Inquiry'}
                </button>
              )}
            </form>
          </div>
        </div>

      </section>

      {/* Related Products Section */}
      <section className="bg-white border-t border-gray-150 py-12">
        <div className="container-custom space-y-6">
          <div>
            <h3 className="text-lg font-800 text-gray-900 tracking-tight">Related Products</h3>
            <p className="text-xs text-gray-500 mt-1">Discover other high-purity industrial chemicals and pooja items from our portfolio.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {seedProducts
              .filter((p) => p.slug !== slug)
              .slice(0, 4)
              .map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="bg-[#F7F8FA] rounded-[18px] border border-gray-200/80 p-4 hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div className="aspect-square w-full bg-white rounded-[12px] border border-gray-100 overflow-hidden flex items-center justify-center p-3 mb-3">
                    <img src={p.image || '/images/products/synthetic-camphor.png'} alt={p.name} className="object-contain max-h-[120px] group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div>
                    <h4 className="font-850 text-xs text-gray-905 group-hover:text-[#128C7E] transition-colors line-clamp-1">{p.name || p.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-700">{p.category || 'Chemical'}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container-custom py-12 border-t border-gray-200/60">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-800 text-gray-900 tracking-tight">Frequently Asked Questions</h3>
            <p className="text-xs text-gray-500 mt-1">Essential guidance on global shipping, sample dispatches, and minimum order requirements.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is the Minimum Order Quantity (MOQ) for international shipment?',
                a: 'Our standard MOQ for export-grade camphor and isoborneol derivatives is 500 Kg. Sample requests are processed in smaller packaging units (e.g. 1 Kg).'
              },
              {
                q: 'Can you manufacture custom packaging or private labels?',
                a: 'Yes. We support custom branding, packaging design, and OEM specifications. Talk to our sales division for container loading requirements.'
              },
              {
                q: 'Are your chemical batches laboratory certified?',
                a: 'Every single dispatch batch is tested in our quality control lab, and accompanies a certified Certificate of Analysis (COA) specifying the purity, CAS parameters, and melting points.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200/80 rounded-[14px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-5 py-4 min-h-[44px] text-left flex justify-between items-center hover:bg-gray-50/50 cursor-pointer"
                >
                  <span className="text-sm sm:text-xs font-800 text-gray-900">{faq.q}</span>
                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{activeFaq === index ? '▲' : '▼'}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-4 pt-1 text-xs text-gray-500 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
