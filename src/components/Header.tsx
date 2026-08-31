'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Coins, 
  Compass, 
  ExternalLink, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Bot,
  Menu,
  X,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { CountryPlanData } from '../types';
import { CountrySelector } from './CountrySelector';
import { AuthButton } from './AuthButton';
import { NexoraLogo } from './NexoraLogo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  selectedCountry: CountryPlanData;
  onSelectCountry: (country: CountryPlanData) => void;
  onOpenAIChat: () => void;
  completedTasksCount?: number;
  totalTasks?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  selectedCountry,
  onSelectCountry,
  onOpenAIChat,
  completedTasksCount = 0,
  totalTasks = 25
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const completionPercentage = Math.round((completedTasksCount / totalTasks) * 100);

  const navItems = [
    { 
      id: 'portals-section', 
      label: '1. Portals & Berea Direct', 
      shortLabel: 'Portals',
      description: 'Common App, Berea Direct, SAT, CSS Profile, SEVIS & Visa',
      icon: ExternalLink 
    },
    { 
      id: 'colleges-section', 
      label: '2. 100% Need-Met Colleges', 
      shortLabel: 'Colleges',
      description: 'Berea, Amherst, Dartmouth, Princeton, Harvard, MIT',
      icon: Building2 
    },
    { 
      id: 'timeline-section', 
      label: '3. 5-Step Scholar Plan', 
      shortLabel: '5-Step Plan',
      description: 'Runway, 1450+ SAT, $0 EFC CSS, F-1 Visa & Arrival',
      icon: Compass 
    },
    { 
      id: 'runway-tools-section', 
      label: '4. Runway Budget & Tests', 
      shortLabel: 'Runway',
      description: 'Upfront test/visa expense tracker & $750/mo campus job',
      icon: Coins 
    },
    { 
      id: 'common-app-helper-section', 
      label: '5. Arrival & Visa', 
      shortLabel: 'Arrival',
      description: 'Common App activity character validator & arrival protocol',
      icon: Sparkles 
    }
  ];

  const handleMobileNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="mb-10 sm:mb-14">
      {/* Top Masthead in Rich Academic Obsidian Brown Liquid Glass */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="liquid-glass-header rounded-3xl p-3 sm:p-4 mb-6 flex items-center justify-between gap-2.5 sm:gap-4 shadow-banner-dark"
      >
        {/* Left Brand Identity: Logo + Academic Title */}
        <div className="flex items-center gap-2">
          <NexoraLogo size="md" variant="light" />
        </div>

        {/* Right Actions: Country Selector + AI Counselor Button + Auth + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Country Selector */}
          <CountrySelector 
            selectedCountry={selectedCountry}
            onSelectCountry={onSelectCountry}
            onOpenAIChat={onOpenAIChat}
          />

          {/* Quick AI Counselor Trigger (Desktop & Tablet) */}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={onOpenAIChat}
            id="top-masthead-ai-chat-btn"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#DFB86C] via-[#CD9E47] to-[#B88732] hover:from-[#E8C57D] hover:to-[#C6953C] text-[#1C1510] font-extrabold px-3.5 py-2 rounded-2xl border border-[#F5DC9A] shadow-deep-sm cursor-pointer text-xs whitespace-nowrap transition-all"
          >
            <Bot className="w-4 h-4 text-[#1C1510]" />
            <span>AI Advisor</span>
            <span className="text-[11px] font-mono font-bold bg-[#1C1510]/15 px-1.5 py-0.5 rounded-md text-[#1C1510]">
              {selectedCountry.countryName === 'Pakistan' ? 'PK' : selectedCountry.flagEmoji}
            </span>
          </motion.button>

          {/* User Sign In / Profile */}
          <AuthButton />

          {/* Mobile Hamburger Toggle Button (Visible on Mobile & Tablet) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-hamburger-toggle"
            aria-label="Toggle navigation menu"
            className="lg:hidden flex items-center justify-center p-2.5 rounded-2xl bg-[#2D2117] hover:bg-[#3D2E22] text-[#FAF6EE] border border-[#D4A949]/50 shadow-deep-sm cursor-pointer transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#E6C678]" />
            ) : (
              <Menu className="w-5 h-5 text-[#E6C678]" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Hamburger Navigation Menu Drawer / Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Menu Dropdown Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="fixed top-20 left-3 right-3 max-w-md mx-auto bg-[#1C1510] text-[#FAF6EE] rounded-3xl border border-[#D4A949]/40 shadow-2xl p-5 z-50 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Header inside Mobile Menu */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#3A2E24] mb-4">
                <div className="flex items-center gap-2">
                  <NexoraLogo size="sm" variant="light" showTagline={false} />
                  <span className="text-xs font-bold text-[#E6C678] uppercase tracking-wider">Navigation Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#2F231B] text-[#C4B29B] hover:text-[#FAF6EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Section Links */}
              <div className="space-y-2 mb-4">
                <p className="text-[11px] font-bold text-[#A89886] uppercase tracking-wider px-1">Roadmap Sections</p>
                {navItems.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeSection === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMobileNavClick(tab.id)}
                      id={`mobile-nav-${tab.id}`}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                        isActive
                          ? 'bg-[#F5E4A8] text-[#1C1510] font-bold border-[#F5E4A8] shadow-deep-sm'
                          : 'bg-[#291F18] text-[#FAF6EE] border-[#433427] hover:bg-[#34271E]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isActive ? 'bg-[#1C1510] text-[#F5E4A8]' : 'bg-[#3B2C21] text-[#E6C678]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-tight truncate">{tab.label}</div>
                          <div className={`text-[11px] truncate mt-0.5 ${
                            isActive ? 'text-[#3E2E20]' : 'text-[#A89886]'
                          }`}>
                            {tab.description}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1C1510]' : 'text-[#7A6959]'}`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* AI Counselor Quick Button inside Mobile Menu */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAIChat();
                }}
                id="mobile-menu-ai-chat-btn"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#DFB86C] via-[#CD9E47] to-[#B88732] text-[#1C1510] font-extrabold p-3.5 rounded-2xl shadow-deep-md border border-[#F5DC9A] cursor-pointer text-xs mb-3"
              >
                <Bot className="w-4 h-4 text-[#1C1510]" />
                <span>Open AI Admissions Advisor</span>
                <span className="text-xs bg-[#1C1510]/15 px-2 py-0.5 rounded-md font-mono">
                  {selectedCountry.countryName === 'Pakistan' ? 'PK' : selectedCountry.flagEmoji}
                </span>
              </motion.button>

              {/* Footer Progress info inside Mobile Menu */}
              <div className="bg-[#241A14] rounded-2xl p-3 border border-[#3E3024] flex items-center justify-between text-xs text-[#C4B29B]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#E6C678]" />
                  <span>Tasks Completed</span>
                </div>
                <span className="font-mono font-bold text-[#F5E4A8]">{completedTasksCount} / {totalTasks} ({completionPercentage}%)</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Academic Luxury Hero Banner in Liquid Glass Dark Obsidian */}
      <motion.div 
        initial={{ opacity: 0, y: -16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.9, delay: 0.05 }}
        className="liquid-glass-dark rounded-3xl text-[#F7F3EC] p-5 sm:p-8 md:p-9 relative overflow-hidden shadow-banner-dark"
      >
        {/* Subtle warm ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B3F]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#2E1F14]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-3xl">
            {/* Tagline Badge & Country Indicator */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <motion.span 
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F2DEB0] bg-[#2E231B]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#524032] whitespace-nowrap shadow-deep-sm"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#E6C678]" />
                International Applicant Blueprint
              </motion.span>

              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#D4C4B0] bg-[#2E231B]/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#48372A]">
                <span>{selectedCountry.flagEmoji}</span>
                <span>{selectedCountry.countryName} Edition</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight text-[#FAF7F2] font-serif-heading leading-[1.2] mb-3">
              F-1 Visa & 100% Full-Need US College Roadmap
            </h1>

            <p className="text-xs sm:text-sm md:text-[15px] text-[#D8CDC0] leading-relaxed max-w-2xl font-sans-ui">
              Tailored for <span className="text-[#FFF5DF] font-semibold">{selectedCountry.flagEmoji} {selectedCountry.countryName}</span> applicants. A unified single-dashboard guide uniting the <span className="text-[#FFF5DF] font-semibold">Common App</span> ecosystem, <span className="text-[#FFF5DF] font-semibold">Berea College direct portal</span>, official SAT & DET testing, CSS Profile $0 EFC financial aid filings, and consular interviews at <span className="text-[#FFF5DF] font-semibold">{selectedCountry.embassyLocations[0] || 'the US Embassy'}</span>.
            </p>
          </div>

          {/* Right Side Progress Card in Liquid Glass */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="w-full lg:w-80 bg-[#291F18]/80 backdrop-blur-xl rounded-2xl border border-[#D4A949]/30 p-4 sm:p-5 shrink-0 flex flex-col justify-between shadow-deep-md"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D8CDC0] whitespace-nowrap">
                Roadmap Progress
              </span>
              <span className="text-xs font-mono font-bold text-[#F0D597] bg-[#3D2F23]/80 px-2 py-0.5 rounded-md border border-[#5C4736] whitespace-nowrap">
                {completionPercentage}% Complete
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#17110C]/80 rounded-full overflow-hidden mb-3 border border-[#3D2F23]/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#8C6328] via-[#D4A949] to-[#2E6B37] rounded-full shadow-[0_0_10px_rgba(212,169,73,0.5)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#C0B3A2]">
              <span className="whitespace-nowrap">{completedTasksCount} of {totalTasks} Tasks Done</span>
              <span className="text-[11px] text-[#7BD492] font-semibold whitespace-nowrap">
                {completionPercentage === 100 ? '🎉 Departure Ready!' : 'In Progress'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 Metric Highlights in Liquid Glass (Responsive 2-col to 4-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 mt-6 sm:mt-8 pt-5 sm:pt-7 border-t border-[#3A2E24]/80">
          <motion.div 
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="bg-[#261D16]/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#48372A] shadow-deep-sm"
          >
            <div className="flex items-center gap-1.5 text-[#E6C678] text-[11px] sm:text-xs font-semibold mb-1 whitespace-nowrap">
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6C678]" />
              Upfront Fund
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#FAF6EE] font-mono leading-none my-1 truncate">
              {selectedCountry.currencySymbol} {(2300 * selectedCountry.usdExchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8AA98] mt-0.5 leading-snug truncate">
              ~${(2300).toLocaleString()} USD Runway
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="bg-[#261D16]/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#48372A] shadow-deep-sm"
          >
            <div className="flex items-center gap-1.5 text-[#7BD492] text-[11px] sm:text-xs font-semibold mb-1 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7BD492]" />
              Calculated EFC
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#FAF6EE] font-mono leading-none my-1">
              $0 / year
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8AA98] mt-0.5 leading-snug">
              100% need met policy
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="bg-[#261D16]/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#48372A] shadow-deep-sm"
          >
            <div className="flex items-center gap-1.5 text-[#86BAE8] text-[11px] sm:text-xs font-semibold mb-1 whitespace-nowrap">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#86BAE8]" />
              Testing Target
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#FAF6EE] font-mono leading-none my-1 truncate">
              1450+ SAT / 125+ DET
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8AA98] mt-0.5 leading-snug truncate">
              {selectedCountry.advisingCenter}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="bg-[#261D16]/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#48372A] shadow-deep-sm"
          >
            <div className="flex items-center gap-1.5 text-[#F2C063] text-[11px] sm:text-xs font-semibold mb-1 whitespace-nowrap">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F2C063]" />
              Campus Cashflow
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-[#FAF6EE] font-mono leading-none my-1">
              $750–$900/mo
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#B8AA98] mt-0.5 leading-snug">
              15–20 hr/wk student work
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Navigation Tabs (Visible on large screens) */}
      <div className="hidden lg:block mt-6 w-full space-y-2.5">
        {/* Tab Pills Row in Liquid Glass */}
        <div className="flex flex-wrap items-center gap-1.5 liquid-glass-header p-2 rounded-2xl shadow-deep-md w-full">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={() => onNavigate(tab.id)}
                id={`nav-btn-${tab.id}`}
                className={`flex-1 min-w-[140px] text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 justify-center ${
                  isActive
                    ? 'bg-[#F5E4A8] text-[#1C1510] shadow-deep-sm font-bold border border-[#F5E4A8]'
                    : 'text-[#D8CDC0] hover:text-[#FAF6EE] hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* AI Counselor Action Button in Warm Gold / Skin Tone */}
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={onOpenAIChat}
          id="header-open-ai-chat-btn"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#DFB86C] via-[#CD9E47] to-[#B88732] hover:from-[#E8C57D] hover:to-[#C6953C] text-[#1C1510] px-4 py-3 rounded-2xl shadow-deep-md cursor-pointer text-xs font-bold border border-[#F5DC9A]"
        >
          <Bot className="w-4 h-4 text-[#1C1510]" />
          <span>AI Admissions Advisor</span>
          <span className="text-xs bg-[#1C1510]/15 px-2 py-0.5 rounded-md font-mono">{selectedCountry.countryName === 'Pakistan' ? 'PK' : selectedCountry.flagEmoji}</span>
        </motion.button>
      </div>
    </header>
  );
};
