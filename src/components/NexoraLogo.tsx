'use client';

import React from 'react';
import { motion } from 'motion/react';

interface NexoraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = true,
  className = '',
  onClick
}) => {
  const isDark = variant === 'dark';

  const containerSizes: Record<string, string> = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl'
  };

  const titleSizes: Record<string, string> = {
    sm: 'text-base tracking-[0.20em]',
    md: 'text-lg sm:text-xl tracking-[0.24em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.26em]'
  };

  const taglineSizes: Record<string, string> = {
    sm: 'text-[9px] tracking-[0.12em]',
    md: 'text-[10px] tracking-[0.14em]',
    lg: 'text-xs tracking-[0.16em]'
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}
    >
      {/* Square with rounded edges & exact light cream background */}
      <motion.div
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
        className={`relative ${containerSizes[size]} bg-[#F8F4EA] border border-[#E2D5BE] shadow-deep-sm flex items-center justify-center shrink-0 overflow-hidden`}
      >
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-0.5 object-contain"
        >
          <defs>
            <linearGradient id="hdr-gold-bright" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EED58E" />
              <stop offset="50%" stopColor="#CE9F44" />
              <stop offset="100%" stopColor="#A27725" />
            </linearGradient>
            <linearGradient id="hdr-gold-shade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C2943A" />
              <stop offset="100%" stopColor="#7B5614" />
            </linearGradient>
            <linearGradient id="hdr-olive-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6F8F75" />
              <stop offset="100%" stopColor="#4C6C52" />
            </linearGradient>
            <linearGradient id="hdr-olive-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4C6C52" />
              <stop offset="100%" stopColor="#2D4632" />
            </linearGradient>
          </defs>

          {/* Emblem inside light background */}
          <g transform="translate(10, 5) scale(0.96)">
            {/* Academic Serif Letter 'N' */}
            <path d="M 152 175 L 202 175 C 190 175 186 182 186 196 L 186 332 C 186 346 190 353 202 353 L 152 353 C 164 353 168 346 168 332 L 168 196 C 168 182 164 175 152 175 Z" fill="#1C1611" />
            <path d="M 168 182 L 306 346 L 306 312 L 186 175 Z" fill="#1C1611" />
            <path d="M 290 250 L 306 250 L 306 332 C 306 346 302 353 290 353 L 324 353 C 312 353 308 346 308 332 L 308 250 Z" fill="#1C1611" />
            <path d="M 293 250 L 293 275 L 300 248 L 307 275 L 307 250 Z" fill="#1C1611" />

            {/* Open Book Foundation */}
            <path d="M 128 288 C 188 286 230 304 250 330 C 270 304 312 286 372 288 C 378 288 380 293 375 296 C 318 308 274 324 250 348 C 226 324 182 308 125 296 C 120 293 122 288 128 288 Z" fill="#1C1611" />
            <path d="M 116 308 C 182 306 228 322 250 348 C 272 322 318 306 384 308 C 390 308 392 314 386 318 C 324 332 276 348 250 370 C 224 348 176 332 114 318 C 108 314 110 308 116 308 Z" fill="#1C1611" />
            <path d="M 228 338 C 234 356 266 356 272 338 C 266 349 234 349 228 338 Z" fill="#1C1611" />

            {/* 8-Point Compass Star */}
            <g transform="translate(300, 195)">
              <polygon points="0,0 24,-24 5,-5" fill="url(#hdr-olive-light)" />
              <polygon points="0,0 24,-24 24,5" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 -24,-24 -5,-5" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 -24,-24 -24,5" fill="url(#hdr-olive-light)" />
              <polygon points="0,0 24,24 5,5" fill="url(#hdr-olive-light)" />
              <polygon points="0,0 24,24 24,-5" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 -24,24 -5,5" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 -24,24 -24,-5" fill="url(#hdr-olive-light)" />

              <polygon points="0,0 0,-68 16,-16" fill="url(#hdr-gold-bright)" />
              <polygon points="0,0 0,-68 -16,-16" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 68,0 16,16" fill="url(#hdr-gold-shade)" />
              <polygon points="0,0 68,0 16,-16" fill="url(#hdr-gold-bright)" />
              <polygon points="0,0 0,68 -16,16" fill="url(#hdr-olive-dark)" />
              <polygon points="0,0 0,68 16,16" fill="url(#hdr-gold-shade)" />
              <polygon points="0,0 -68,0 -16,-16" fill="url(#hdr-olive-light)" />
              <polygon points="0,0 -68,0 -16,16" fill="url(#hdr-olive-dark)" />
              <circle cx="0" cy="0" r="3.5" fill="#FFFDF8" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif-heading font-extrabold uppercase ${titleSizes[size]} ${
              isDark ? 'text-[#221A14]' : 'text-[#FAF6EE]'
            }`}
            style={{ fontFamily: "'Cinzel', 'Newsreader', Georgia, serif" }}
          >
            NEXORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A949] shrink-0 animate-pulse" />
        </div>

        {showTagline && (
          <span
            className={`hidden sm:inline-block font-semibold uppercase ${taglineSizes[size]} mt-0.5 leading-none ${
              isDark ? 'text-[#7A5416]' : 'text-[#D8BE8E]'
            }`}
          >
            Scholars Pathway · 100% Need Met
          </span>
        )}
      </div>
    </div>
  );
};