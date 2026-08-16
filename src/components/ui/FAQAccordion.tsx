'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQAccordionItem({
  question,
  answer,
  defaultOpen = false,
}: FAQAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50/80 transition-colors cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-600 text-gray-900 pr-4 group-hover:text-primary transition-colors">
          {question}
        </span>
        <div
          className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'text-gray-400'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3.5 bg-gray-50/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <FAQAccordionItem
          key={idx}
          question={item.question}
          answer={item.answer}
          defaultOpen={false}
        />
      ))}
    </div>
  );
}
