'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  X, 
  BookOpen, 
  Coins, 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  School,
  FileCheck,
  Building
} from 'lucide-react';
import { CountryPlanData } from '../types';
import { DEFAULT_COUNTRIES } from '../data/countryProfiles';

interface CountrySystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryPlanData;
  onSelectCountry: (country: CountryPlanData) => void;
}

export const CountrySystemModal: React.FC<CountrySystemModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry
}) => {
  const [activeTabCountry, setActiveTabCountry] = useState<CountryPlanData>(selectedCountry);
  const [activeDimension, setActiveDimension] = useState<'all' | 'curriculum' | 'currency' | 'banking' | 'visa'>('all');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#140F0B]/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="relative w-full max-w-4xl bg-[#FAF5EB] rounded-3xl border border-[#DCCDBC] shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#221A14] text-[#FAF6EE] p-5 sm:p-6 border-b border-[#3B2E24] flex items-center justify-between shrink-0 shadow-deep-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#3D2E22] text-[#E6C678] flex items-center justify-center border border-[#523F2E] shadow-deep-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-heading">
                    Country Intelligence & Adaptation Engine
                  </h3>
                  <p className="text-xs text-[#C5B7A6] mt-0.5">
                    How every section of the roadmap dynamically adapts to your home country
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-[#35281E] hover:bg-[#48372A] text-[#D8C7B5] hover:text-[#FAF6EE] border border-[#48372A] cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Country Tabs Bar */}
            <div className="bg-[#EDE3D3] p-2.5 border-b border-[#DBC9B5] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A49] px-2 whitespace-nowrap">
                Select Country to Inspect:
              </span>
              {DEFAULT_COUNTRIES.map((c) => {
                const isActive = activeTabCountry.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveTabCountry(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-deep-sm ${
                      isActive
                        ? 'bg-[#221A14] text-[#FAF6EE] border-[#221A14] ring-2 ring-[#8C6328]'
                        : 'bg-[#FAF6EE] text-[#4A3C2F] border-[#DAC8B4] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    <span>{c.flagEmoji}</span>
                    <span>{c.countryName}</span>
                    {c.id === selectedCountry.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7BD492]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-[#FAF5EB]">
              {/* Active Profile Summary Banner */}
              <div className="bg-[#F3EADB] border border-[#DFCFA8] rounded-2xl p-4.5 shadow-deep-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeTabCountry.flagEmoji}</span>
                    <h4 className="text-base font-bold text-[#221A14]">
                      {activeTabCountry.countryName} Custom Profile
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#221A14] text-[#FAF6EE]">
                      1 USD = {activeTabCountry.currencySymbol} {activeTabCountry.usdExchangeRate.toLocaleString()} {activeTabCountry.currencyCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C4C3B] mt-1 leading-relaxed max-w-2xl">
                    {activeTabCountry.customSummary}
                  </p>
                </div>

                {activeTabCountry.id !== selectedCountry.id ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onSelectCountry(activeTabCountry);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#221A14] text-[#FAF6EE] hover:bg-[#382B21] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-deep-md shrink-0 border border-[#8C6328]"
                  >
                    <span>Apply {activeTabCountry.countryName} as Active</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E6C678]" />
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#235831] bg-[#DFEBDC] px-3 py-1.5 rounded-xl border border-[#BDD7BA] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Currently Active Roadmap</span>
                  </div>
                )}
              </div>

              {/* 5 Core Dimensions of Adaptation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. High School Curriculum & Transcript Conversion */}
                <div className="bg-[#FAF6EE] border border-[#DCCDBC] rounded-2xl p-4 shadow-deep-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7A5416] mb-2">
                    <BookOpen className="w-4 h-4 text-[#8C6328]" />
                    <span>1. Academic Curriculum & Equivalence</span>
                  </div>
                  <div className="text-xs font-bold text-[#221A14] mb-1">
                    System: {activeTabCountry.curriculumType}
                  </div>
                  <p className="text-xs text-[#554637] leading-relaxed">
                    {activeTabCountry.curriculumAdvice}
                  </p>
                </div>

                {/* 2. Live Forex & Test Cost Equivalents */}
                <div className="bg-[#FAF6EE] border border-[#DCCDBC] rounded-2xl p-4 shadow-deep-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#235831] mb-2">
                    <Coins className="w-4 h-4 text-[#235831]" />
                    <span>2. Local Upfront Budget & Test Costs</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-[#F2ECE0] p-2 rounded-lg border border-[#E0D2C0]">
                      <span className="text-[#786655] block">Digital SAT:</span>
                      <span className="font-bold text-[#221A14]">{activeTabCountry.testCostEquivalents.satCostFormatted}</span>
                    </div>
                    <div className="bg-[#F2ECE0] p-2 rounded-lg border border-[#E0D2C0]">
                      <span className="text-[#786655] block">Duolingo DET:</span>
                      <span className="font-bold text-[#221A14]">{activeTabCountry.testCostEquivalents.detCostFormatted}</span>
                    </div>
                    <div className="bg-[#F2ECE0] p-2 rounded-lg border border-[#E0D2C0]">
                      <span className="text-[#786655] block">SEVIS I-901:</span>
                      <span className="font-bold text-[#221A14]">{activeTabCountry.testCostEquivalents.sevisCostFormatted}</span>
                    </div>
                    <div className="bg-[#F2ECE0] p-2 rounded-lg border border-[#E0D2C0]">
                      <span className="text-[#786655] block">MRV Visa Fee:</span>
                      <span className="font-bold text-[#221A14]">{activeTabCountry.testCostEquivalents.mrvCostFormatted}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Central Bank & Foreign Remittance Regulations */}
                <div className="bg-[#FAF6EE] border border-[#DCCDBC] rounded-2xl p-4 shadow-deep-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E4E75] mb-2">
                    <Landmark className="w-4 h-4 text-[#1E4E75]" />
                    <span>3. Central Bank Forex & Student File Rules</span>
                  </div>
                  <p className="text-xs text-[#554637] leading-relaxed">
                    {activeTabCountry.bankRegulations}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-[#8C6328] flex items-center gap-1">
                    <School className="w-3.5 h-3.5" />
                    <span>Official Center: {activeTabCountry.advisingCenter}</span>
                  </div>
                </div>

                {/* 4. US Embassy Locations & Consular Visa Strategy */}
                <div className="bg-[#FAF6EE] border border-[#DCCDBC] rounded-2xl p-4 shadow-deep-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#552766] mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#552766]" />
                    <span>4. US Embassy Locations & Interview Tactics</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#221A14] mb-1.5">
                    Interview Posts: {activeTabCountry.embassyLocations.join(', ')}
                  </div>
                  <ul className="space-y-1 text-xs text-[#554637]">
                    {activeTabCountry.visaInterviewTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#552766] shrink-0 mt-1.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5. Country-Specific Fee Waiver Tactics */}
              <div className="bg-[#FAF6EE] border border-[#DCCDBC] rounded-2xl p-4 shadow-deep-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C4A11] mb-2">
                  <FileCheck className="w-4 h-4 text-[#8C4A11]" />
                  <span>5. High-Impact Fee Waiver Strategies for {activeTabCountry.countryName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeTabCountry.feeWaiverStrategies.map((strat, idx) => (
                    <div key={idx} className="bg-[#F5EDE1] p-3 rounded-xl border border-[#DECDBA] text-xs text-[#554637] leading-relaxed">
                      <span className="font-bold text-[#221A14] block mb-1">Strategy {idx + 1}:</span>
                      {strat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#EDE4D5] px-6 py-4 border-t border-[#DBC9B5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-[#6B5A4B]">
                Need a country not listed? Type it in the country search box to generate a real-time custom Gemini adaptation profile.
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#221A14] text-[#FAF6EE] text-xs font-bold cursor-pointer hover:bg-[#382A1F] shadow-deep-sm"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
