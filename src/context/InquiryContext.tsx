'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface InquiryItem {
  id: string; // productSlug-variantSku or productSlug
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  sku: string;
  quantity: string;
  packingType: string;
  materialType: string;
  image?: string;
}

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (item: Omit<InquiryItem, 'quantity'> & { quantity?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: string) => void;
  clearList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('kalasam_inquiry_list');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load inquiry list:', e);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('kalasam_inquiry_list', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save inquiry list:', e);
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<InquiryItem, 'quantity'> & { quantity?: string }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        // If it exists, keep it or optionally append to quantity (let's keep existing but update quantity value if provided)
        return prev;
      }
      return [
        ...prev,
        {
          ...newItem,
          quantity: newItem.quantity || '100 Kg' // default B2B indicative quantity
        }
      ];
    });
    setIsDrawerOpen(true); // Auto-open drawer to show item was added successfully
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearList = () => {
    setItems([]);
  };

  return (
    <InquiryContext.Provider
      value={{
        items: mounted ? items : [],
        addItem,
        removeItem,
        updateQuantity,
        clearList,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
