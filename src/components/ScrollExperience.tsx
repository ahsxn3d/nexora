'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from '../context/LenisContext';
import { 
  ArrowUp, 
  Compass, 
  ExternalLink, 
  Building2, 
  Coins, 
  Sparkles,
  Bot
} from 'lucide-react';
import { CountryPlanData } from '../types';
import { NexoraLogo } from './NexoraLogo';

interface ScrollExperienceProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  selectedCountry?: CountryPlanData;
  onOpenAIChat?: () => void;
}

export const ScrollExperience: React.FC<ScrollExperienceProps> = ({
  activeSection,
  onNavigate,
  selectedCountry,
  onOpenAIChat
}) => {
  const { lenis, scrollTo } = useLenis();
  const [scrollProgressRatio, setScrollProgressRatio] = useState(0);
  const [scrollProgressPercent, setScrollProgressPercent] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    if (lenis) {
      const handleLenisScroll = (e: { progress: number; scroll: number }) => {
        const clampedRatio = Math.min(1, Math.max(0, e.progress));
        setScrollProgressRatio(clampedRatio);
        setScrollProgressPercent(Math.min(100, Math.max(0, Math.round(clampedRatio * 100))));
        setShowFloatingNav(e.scroll > 280);
      };

      lenis.on('scroll', handleLenisScroll);
      return () => {
        lenis.off('scroll', handleLenisScroll);
      };
    } else {
      const handleWindowScroll = () => {
        const currentScroll = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = totalHeight > 0 ? currentScroll / totalHeight : 0;
        const clampedRatio = Math.min(1, Math.max(0, ratio));
        setScrollProgressRatio(clampedRatio);
        setScrollProgressPercent(Math.min(100, Math.max(0, Math.round(clampedRatio * 100))));
        setShowFloatingNav(currentScroll > 280);
      };

      window.addEventListener('scroll', handleWindowScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleWindowScroll);
    }
  }, [lenis]);

  const navLinks = [
    { id: 'portals-section', label: 'Portals', icon: ExternalLink },
    { id: 'colleges-section', label: 'Colleges', icon: Building2 },
    { id: 'timeline-section', label: '5-Step Plan', icon: Compass },
    { id: 'runway-tools-section', label: 'Runway', icon: Coins },
    { id: 'common-app-helper-section', label: 'Arrival', icon: Sparkles }
  ];

  const activeNavItem = navLinks.find(item => item.id === activeSection) || navLinks[0];
  const ActiveIcon = activeNavItem.icon;

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.4 });
  };

  return (
    <>
      {/* Top Fixed Progress Bar with Silk-Smooth GPU Transform */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-[#221A14]/15 pointer-events-none">
        <div
          className="h-full w-full bg-gradient-to-r from-[#8C6328] via-[#C99E52] via-[#E2C37E] to-[#8C6328] shadow-[0_0_12px_rgba(201,158,82,0.9)]"
          style={{
            transform: `scaleX(${scrollProgressRatio})`,
            transformOrigin: '0% 50%',
            willChange: 'transform',
            transition: 'transform 0.08s linear'
          }}
        />
      </div>

      {/* Floating Sticky Quick-Jump Bar (Fully Mobile-Adapted Capsule) */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.92 }}
            transition={{ 
              type: 'spring', 
              stiffness: 380, 
              damping: 24, 
              mass: 0.8 
            }}
            className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[94%] sm:w-[92%]"
          >
            <div className="liquid-glass-dark text-[#FAF6EE] px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl flex items-center justify-between gap-2 sm:gap-3 shadow-deep-xl border border-[#D4A949]/35">
              
              {/* Left Brand Badge (Desktop) */}
              <div 
                onClick={handleScrollToTop}
                className="hidden lg:flex items-center pr-3 border-r border-[#48372A] cursor-pointer"
                title="Scroll to top"
              >
                <NexoraLogo size="sm" variant="light" showTagline={false} />
              </div>

              {/* Desktop Full Navigation Pill Links (Visible md+) */}
              <div className="hidden md:flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 flex-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                      onClick={() => onNavigate(item.id)}
                      id={`floating-nav-${item.id}`}
                      className={`flex-1 relative text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-[#F5E4A8] text-[#1C1510] font-bold shadow-deep-sm'
                          : 'text-[#D0C2B0] hover:text-[#FAF6EE] hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Compact Active Indicator (Visible only on phones <md) */}
              <div className="md:hidden flex items-center gap-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 bg-[#F5E4A8] text-[#1C1510] font-bold px-2.5 py-1 rounded-xl text-xs truncate shadow-deep-sm">
                  <ActiveIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeNavItem.label}</span>
                </div>
              </div>

              {/* AI Counselor Quick Button in Warm Gold / Skin Tone */}
              {onOpenAIChat && (
                <motion.button
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={onOpenAIChat}
                  id="floating-open-ai-chat"
                  title="Open AI Admissions Counselor"
                  className="flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#DFB86C] via-[#CD9E47] to-[#B88732] hover:from-[#E8C57D] hover:to-[#C6953C] text-[#1C1510] shadow-deep-sm cursor-pointer whitespace-nowrap shrink-0 border border-[#F5DC9A]"
                >
                  <Bot className="w-3.5 h-3.5 text-[#1C1510]" />
                  <span className="hidden sm:inline">AI Advisor</span>
                  <span className="text-[10px] font-mono font-bold bg-[#1C1510]/15 px-1.5 py-0.5 rounded-md text-[#1C1510]">
                    {selectedCountry?.countryName === 'Pakistan' ? 'PK' : selectedCountry?.flagEmoji}
                  </span>
                </motion.button>
              )}

              {/* Progress & Scroll-to-top */}
              <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 border-l border-[#48372A] shrink-0">
                <span className="text-[10px] font-mono text-[#D4C3A3] font-bold hidden sm:inline">
                  {scrollProgressPercent}%
                </span>
                <motion.button
                  whileHover={{ scale: 1.12, y: -1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  onClick={handleScrollToTop}
                  id="floating-scroll-top-btn"
                  title="Smooth scroll to top"
                  className="p-1.5 sm:p-2 rounded-xl bg-[#2D221A]/90 text-[#FAF6EE] hover:bg-[#3D2F24] transition-colors cursor-pointer border border-[#48392C]"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#E6C678]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom-Right AI Counselor Trigger with Liquid Glass */}
      <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-40 flex flex-col gap-2.5 items-end">
        {/* Persistent AI Counselor FAB */}
        {onOpenAIChat && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={onOpenAIChat}
            id="fab-ai-counselor"
            title="Ask AI Admissions Counselor"
            className="group flex items-center gap-2 sm:gap-2.5 liquid-glass-dark text-[#FAF6EE] hover:border-[#D4A949] p-3 sm:px-4 sm:py-3 rounded-2xl shadow-2xl transition-all cursor-pointer ring-2 ring-[#8C6328]/30"
          >
            <div className="w-6 h-6 rounded-lg bg-[#8C6328]/30 flex items-center justify-center text-[#E6C678] border border-[#8C6328]/60">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-[#FAF6EE] flex items-center gap-1">
                <span>AI Admissions Advisor</span>
                {selectedCountry && <span className="text-xs">{selectedCountry.flagEmoji}</span>}
              </div>
              <div className="text-[10px] text-[#C4B29B]">Personalize your plan</div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#E6C678] animate-pulse" />
          </motion.button>
        )}

        {/* Scroll To Top FAB (Reveals on scroll) */}
        <AnimatePresence>
          {showFloatingNav && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 12 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              onClick={handleScrollToTop}
              id="fab-scroll-top"
              title="Lenis smooth scroll to top"
              className="group flex items-center gap-1.5 sm:gap-2 liquid-glass-dark text-[#FAF6EE] p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-deep-xl transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 text-[#E6C678] group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-xs font-bold font-mono text-[#DCC79E]">
                {scrollProgressPercent}%
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
