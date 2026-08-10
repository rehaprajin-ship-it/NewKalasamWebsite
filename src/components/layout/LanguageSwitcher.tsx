'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LANGUAGES = [
  { code: '', label: 'All Languages' },
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'hi', label: 'Hindi (हिन्दी)' },
  { code: 'te', label: 'Telugu (తెలుగు)' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', label: 'Malayalam (മലയാളം)' },
  { code: 'bn', label: 'Bengali (বাংলা)' },
  { code: 'mr', label: 'Marathi (मராठी)' },
  { code: 'gu', label: 'Gujarati (ગુજરાતી)' },
  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'ur', label: 'Urdu (اردו)' },
  { code: 'ar', label: 'Arabic (العربية)' },
  { code: 'zh-CN', label: 'Chinese (中文)' },
  { code: 'ja', label: 'Japanese (日本語)' },
  { code: 'ko', label: 'Korean (한국어)' },
  { code: 'fr', label: 'French (Français)' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'es', label: 'Spanish (Español)' },
  { code: 'pt', label: 'Portuguese (Português)' },
  { code: 'ru', label: 'Russian (Русский)' },
  { code: 'it', label: 'Italian (Italiano)' },
  { code: 'tr', label: 'Turkish (Türkçe)' },
  { code: 'th', label: 'Thai (ไทย)' },
  { code: 'vi', label: 'Vietnamese (Tiếng Việt)' },
  { code: 'id', label: 'Indonesian (Bahasa)' },
  { code: 'ms', label: 'Malay (Bahasa Melayu)' },
  { code: 'nl', label: 'Dutch (Nederlands)' },
  { code: 'pl', label: 'Polish (Polski)' },
  { code: 'sv', label: 'Swedish (Svenska)' },
];

interface LanguageSwitcherProps {
  selectedLang: string;
  onLanguageChange: (code: string) => void;
  alignRight?: boolean;
}

export default function LanguageSwitcher({
  selectedLang,
  onLanguageChange,
  alignRight = false,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full
                   text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-primary
                   transition-all duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{currentLang.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className={`hidden md:block absolute mt-2 w-64 rounded-xl bg-white border border-gray-200 shadow-xl z-[600] overflow-hidden ${
                alignRight ? 'right-0' : 'left-0'
              }`}
            >
              {/* Search Box */}
              <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-primary"
                  autoFocus
                />
              </div>

              {/* Language List */}
              <ul className="max-h-60 overflow-y-auto py-1 divide-y divide-gray-50 text-xs">
                {filteredLanguages.length === 0 ? (
                  <li className="px-4 py-3 text-gray-400 text-center">No languages found</li>
                ) : (
                  filteredLanguages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-[#128C7E] transition-colors cursor-pointer ${
                          selectedLang === lang.code ? 'bg-emerald-50/50 text-[#128C7E] font-700' : 'text-gray-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>

            {/* Mobile Bottom Sheet Overlay & Panel */}
            <div className="md:hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[990] pointer-events-auto"
                onClick={() => setIsOpen(false)}
              />
              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl z-[1000] flex flex-col overflow-hidden"
              >
                {/* Drag Handle Indicator */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 flex-shrink-0" />

                <div className="px-4 pb-3 border-b border-gray-150 flex items-center justify-between">
                  <span className="text-sm font-800 text-gray-950">Select Language</span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* scrollable items list */}
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5 divide-y divide-gray-50">
                  {filteredLanguages.length === 0 ? (
                    <div className="py-8 text-center text-sm text-gray-400">No languages found</div>
                  ) : (
                    filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3.5 text-sm active:bg-emerald-50 active:text-[#128C7E] transition-colors cursor-pointer rounded-lg ${
                          selectedLang === lang.code ? 'bg-emerald-50 text-[#128C7E] font-800' : 'text-gray-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
