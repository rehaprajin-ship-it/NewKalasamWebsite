'use client';

import { useState } from 'react';

interface ShareButtonProps {
  slug: string;
  title: string;
}

export default function ShareButton({ slug, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/blog/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share cancelled/failed
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="h-9 w-14 bg-[#4ccd3c] hover:bg-[#43b834] active:bg-[#3ba22d] border border-green-600 rounded flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm relative"
        title="Share this article"
        aria-label="Share article"
      >
        {/* Connected nodes share icon */}
        <svg
          className="w-3.5 h-3.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186l.09.043a3.07 3.07 0 0 0 2.828-.093l2.828-1.572a3.07 3.07 0 0 0 1.282-2.51V6.25a2.25 2.25 0 1 0-4.5 0v.528c0 .87-.513 1.66-1.308 2.01l-1.192.53m1.192-.53a3.07 3.07 0 0 0-2.828-.093L3.717 9.878a3.07 3.07 0 0 0-1.282 2.51v.528c0 .87.513 1.66 1.308 2.01l1.192.53m0 0a3.07 3.07 0 0 0 2.828.093l2.828-1.572a3.07 3.07 0 0 0 1.282-2.51V15.75a2.25 2.25 0 1 0 4.5 0v-.528c0-.87-.513-1.66-1.308-2.01l-1.192-.53"
          />
        </svg>
        {/* Down Arrow / Triangle */}
        <svg
          className="w-2 h-2 text-white opacity-80"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21l-12-18h24z" />
        </svg>

        {copied && (
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow whitespace-nowrap z-50">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
