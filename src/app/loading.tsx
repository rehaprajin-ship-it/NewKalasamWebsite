/* ═══════════════════════════════════════════════════════════════
   Global Loading Screen — Kalasam Jaikrishna Industries
   Fade In + Scale 0.95 → 1 + Soft Green Glow
   ═══════════════════════════════════════════════════════════════ */

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Logo with CSS animations (no framer-motion in server components) */}
      <div
        className="relative animate-[fadeScale_1s_ease-out_forwards]"
        style={{ opacity: 0 }}
      >
        {/* Soft glow behind logo */}
        <div className="absolute inset-0 -m-6 rounded-full bg-primary/8 blur-2xl animate-[glowPulse_2.5s_ease-in-out_infinite]" />

        <Image
          src="/images/logo.png"
          alt="Kalasam Jaikrishna Industries Logo"
          width={280}
          height={90}
          priority
          className="relative h-auto max-h-[90px] object-contain"
          style={{ width: 'auto' }}
        />
      </div>

      {/* Subtle loading indicator */}
      <div className="mt-8 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
      </div>

      {/* Inline keyframes for server component compatibility */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}} />
    </div>
  );
}
