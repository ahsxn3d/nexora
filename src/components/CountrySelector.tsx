'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, Sparkles, ChevronDown, Search, ArrowRight, Bot, HelpCircle } from 'lucide-react';
import { CountryPlanData } from '../types';
import { DEFAULT_COUNTRIES } from '../data/countryProfiles';
import { CountrySystemModal } from './CountrySystemModal';

interface CountrySelectorProps {
  selectedCountry: CountryPlanData;
  onSelectCountry: (country: CountryPlanData) => void;
  onOpenAIChat: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  onOpenAIChat
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCountryInput, setCustomCountryInput] = useState('');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);

  const filteredCountries = DEFAULT_COUNTRIES.filter(c =>
    c.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currencyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.curriculumType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomCountrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCountryInput.trim()) return;

    setIsGeneratingCustom(true);
    try {
      const response = await fetch('/api/ai/adapt-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryName: customCountryInput.trim() })
      });
      const data = await response.json();
      if (data.success && data.planData) {
        onSelectCountry({
          id: customCountryInput.toLowerCase().replace(/\s+/g, '-'),
          countryName: data.planData.countryName || customCountryInput,
          flagEmoji: data.planData.flagEmoji || '🌐',
          currencyCode: data.planData.currencyCode || 'USD',
          currencySymbol: data.planData.currencySymbol || '$',
          usdExchangeRate: data.planData.usdExchangeRate || 1,
          curriculumType: data.planData.curriculumType || 'National Secondary Certificate',
          curriculumAdvice: data.planData.curriculumAdvice || 'Submit official secondary transcripts with grading criteria.',
          embassyLocations: data.planData.embassyLocations || [`US Embassy in ${customCountryInput}`],
          advisingCenter: data.planData.advisingCenter || 'EducationUSA Center',
          bankRegulations: data.planData.bankRegulations || 'International student file and bank drafts.',
          feeWaiverStrategies: data.planData.feeWaiverStrategies || ['Direct contact with university financial aid officers.'],
          visaInterviewTips: data.planData.visaInterviewTips || ['Demonstrate strong ties to your home country.'],
          testCostEquivalents: data.planData.testCostEquivalents || {
            satCostFormatted: '$111',
            detCostFormatted: '$59',
            sevisCostFormatted: '$350',
            mrvCostFormatted: '$185'
          },
          customSummary: data.planData.customSummary || `Personalized roadmap generated for ${customCountryInput}.`
        });
        setIsOpen(false);
        setCustomCountryInput('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button with spring bounce & iOS Liquid Glass */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        id="country-selector-trigger-btn"
        className="inline-flex items-center gap-1.5 sm:gap-2 liquid-glass-light text-[#221A14] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl shadow-deep-sm transition-all cursor-pointer text-xs font-bold shrink-0"
      >
        <span className="text-sm sm:text-base leading-none">{selectedCountry.flagEmoji}</span>
        <span className="hidden md:inline truncate max-w-[120px]">{selectedCountry.countryName}</span>
        <span className="text-[10px] text-[#7A6959] font-mono font-medium px-1.5 py-0.5 rounded-md bg-white/70 border border-white/80">
          {selectedCountry.currencyCode}
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7A6959] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown Menu in iOS Liquid Glass */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 mt-2 sm:w-[440px] md:w-[480px] liquid-glass-light rounded-3xl shadow-2xl z-50 p-4 sm:p-5 text-[#221A14] overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E3D6C4] mb-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Globe className="w-4 h-4 text-[#8C6328]" />
                  <span className="font-bold text-xs text-[#221A14]">Select Home Country & Currency</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsSystemModalOpen(true);
                  }}
                  className="text-[10px] bg-[#E8DCB8] hover:bg-[#DEC494] text-[#7A5416] px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1 border border-[#D5C29B]"
                  title="Click to view what changes across each country system"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>What Changes?</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-[#8C7B6B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search countries (India, Bangladesh, Pakistan...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F3E9D9] text-[#221A14] placeholder-[#8A7968] text-xs pl-8 pr-3 py-2 rounded-xl border border-[#D5C5B0] focus:outline-hidden focus:border-[#8C6328]"
                />
              </div>

              {/* Preset List */}
              <div className="max-h-72 sm:max-h-[340px] overflow-y-auto space-y-2 pr-1.5 overscroll-contain mb-3.5">
                {filteredCountries.map((country) => {
                  const isSelected = country.id === selectedCountry.id;
                  return (
                    <motion.button
                      key={country.id}
                      whileHover={{ x: 2 }}
                      onClick={() => {
                        onSelectCountry(country);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#221A14] text-[#FAF6EE] border-[#221A14] font-bold shadow-deep-sm'
                          : 'bg-[#F4EDE0] text-[#3D3024] border-[#DECFC0] hover:bg-[#E8DCCB] hover:border-[#C4B29E]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="text-xl shrink-0">{country.flagEmoji}</span>
                        <div>
                          <div className="font-bold text-xs sm:text-sm truncate">{country.countryName}</div>
                          <div className={`text-[11px] truncate ${isSelected ? 'text-[#D8C7A6]' : 'text-[#7A6959]'}`}>
                            {country.curriculumType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-[#3B2E24] text-[#E6C678]' : 'bg-[#E5D7C4] text-[#554637]'
                        }`}>
                          {country.currencyCode}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#E6C678]" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Country / AI Plan Generator */}
              <div className="pt-3 border-t border-[#E3D6C4] bg-[#F2E8D8] -mx-4 -mb-4 p-4">
                <form onSubmit={handleCustomCountrySubmit} className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#554637]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#8C6328]" />
                      <span>Other Country? Ask Gemini AI:</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="e.g. Egypt, Sri Lanka, Turkey..."
                      value={customCountryInput}
                      onChange={(e) => setCustomCountryInput(e.target.value)}
                      className="flex-1 bg-[#FAF5EB] text-[#221A14] placeholder-[#8A7968] text-xs px-3 py-1.5 rounded-xl border border-[#D5C5B0] focus:outline-hidden focus:border-[#8C6328]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={!customCountryInput.trim() || isGeneratingCustom}
                      className="bg-[#8C6328] hover:bg-[#724F1D] text-[#FAF6EE] text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>{isGeneratingCustom ? 'Adapting...' : 'Adapt'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </form>

                <div className="mt-2.5 pt-2 border-t border-[#DCC7B0] flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsSystemModalOpen(true);
                    }}
                    className="font-bold text-[#7A5416] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How Country Adaptation Works</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAIChat();
                    }}
                    className="font-bold text-[#8C6328] hover:text-[#5F4015] flex items-center gap-1 cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Open AI Chatbot</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Country System Adaptation & Comparison Modal */}
      <CountrySystemModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
        selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry}
      />
    </div>
  );
};
