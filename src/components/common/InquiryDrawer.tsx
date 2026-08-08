'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInquiry } from '@/context/InquiryContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, items, removeItem, updateQuantity } = useInquiry();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    }

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            ref={drawerRef}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-55 flex flex-col border-l border-gray-200"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-150 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <h3 className="font-800 text-gray-900 text-base">Inquiry List</h3>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-700">
                  {items.length}
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full bg-white hover:bg-gray-150 border border-gray-200 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <span className="text-4xl text-gray-300">📋</span>
                  <div>
                    <h4 className="font-800 text-gray-800 text-sm">Your list is empty</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                      Add products and variants to compile a consolidated bulk quote request.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-[10px] text-xs font-700 transition-colors cursor-pointer"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 relative hover:shadow-xs transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 bg-white border border-gray-200/60 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0">
                      <img
                        src={item.image || '/images/products/synthetic-camphor.png'}
                        alt={item.productName}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2 pr-5">
                        <h4 className="font-800 text-gray-900 text-xs truncate leading-tight">
                          {item.productName}
                        </h4>
                      </div>
                      
                      {item.variantName && (
                        <p className="text-[10px] text-gray-500 font-600">
                          Option: {item.variantName}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 text-[9px] font-mono text-gray-400">
                        <span>SKU: {item.sku}</span>
                        <span>•</span>
                        <span>{item.packingType}</span>
                      </div>

                      {/* Quantity Selector Input */}
                      <div className="pt-1.5 flex items-center gap-2">
                        <label className="text-[10px] text-gray-400 font-500">Qty Needed:</label>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          className="w-24 px-2 py-0.5 text-xs border border-gray-200 rounded-md bg-white text-gray-950 font-700 focus:outline-hidden"
                          placeholder="e.g. 500 Kg"
                        />
                      </div>
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-150 bg-gray-50 space-y-2">
                <Link
                  href="/inquiry"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-700 text-center block transition-all shadow-md"
                >
                  Proceed to Submit Inquiry
                </Link>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-2.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-700 text-center block transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
