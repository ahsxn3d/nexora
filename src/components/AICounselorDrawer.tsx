'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Globe, 
  RefreshCw, 
  ChevronRight, 
  Check, 
  HelpCircle,
  Compass,
  DollarSign,
  FileText,
  ShieldCheck,
  Landmark,
  Layers,
  Key,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { CountryPlanData, ChatMessage } from '../types';
import { DEFAULT_COUNTRIES } from '../data/countryProfiles';
import { useLenis } from '../context/LenisContext';
import { useAuth } from '../context/AuthContext';

interface AICounselorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryPlanData;
  onSelectCountry: (country: CountryPlanData) => void;
}

export const AICounselorDrawer: React.FC<AICounselorDrawerProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry
}) => {
  const { stop: stopLenis, start: startLenis } = useLenis();
  const { user, userApiKey, setUserApiKey } = useAuth();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello! I'm your **AI US Admissions & F-1 Visa Counselor** powered by Gemini.

I can personalize your entire roadmap, calculate exact costs in your local currency, explain high school curriculum conversions (Matric/F.Sc, CBSE, HSC, WAEC, etc.), and guide your F-1 visa interview at your local US Embassy.

🌍 **Current Country Profile:** ${selectedCountry.flagEmoji} **${selectedCountry.countryName}**
*You can tell me any country you live in, and I will tailor your entire admissions plan!*`,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdaptingCountry, setIsAdaptingCountry] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(userApiKey || '');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll lock background page and pause Lenis smooth scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      stopLenis();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const timer = setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 300);

      return () => {
        clearTimeout(timer);
        startLenis();
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.touchAction = '';
      };
    }
  }, [isOpen, stopLenis, startLenis]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    setApiKeyInput(userApiKey || '');
  }, [userApiKey]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setUserApiKey(apiKeyInput);
    setShowKeyConfig(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Check if user is asking to switch/adapt to a country
      const lower = text.toLowerCase();
      const matchedPreset = DEFAULT_COUNTRIES.find(c => 
        lower.includes(c.countryName.toLowerCase()) || 
        lower.includes(c.id) ||
        (c.id === 'pakistan' && (lower.includes('lahore') || lower.includes('karachi') || lower.includes('islamabad'))) ||
        (c.id === 'india' && (lower.includes('delhi') || lower.includes('mumbai') || lower.includes('bangalore') || lower.includes('hyderabad'))) ||
        (c.id === 'bangladesh' && (lower.includes('dhaka') || lower.includes('chittagong') || lower.includes('sylhet'))) ||
        (c.id === 'nepal' && (lower.includes('kathmandu') || lower.includes('pokhara'))) ||
        (c.id === 'vietnam' && (lower.includes('hanoi') || lower.includes('saigon') || lower.includes('hcmc'))) ||
        (c.id === 'nigeria' && (lower.includes('lagos') || lower.includes('abuja'))) ||
        (c.id === 'kenya' && (lower.includes('nairobi') || lower.includes('mombasa')))
      );

      if (matchedPreset && matchedPreset.id !== selectedCountry.id) {
        onSelectCountry(matchedPreset);
      }

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          country: matchedPreset ? matchedPreset.countryName : selectedCountry.countryName,
          userEmail: user?.email,
          userApiKey: userApiKey,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          context: {
            currentStage: 'Exploring 100% need-met admissions, upfront budget, and visa',
            selectedCountryName: selectedCountry.countryName
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      if (data.requiresApiKey) {
        setShowKeyConfig(true);
      }

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I've analyzed your profile and updated the admissions roadmap.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `Here are the key recommendations for **${selectedCountry.flagEmoji} ${selectedCountry.countryName}**:

- **Curriculum:** ${selectedCountry.curriculumAdvice}
- **US Embassy Hubs:** ${selectedCountry.embassyLocations.join(', ')}
- **Advising Center:** ${selectedCountry.advisingCenter}
- **Local Budget Equivalent:** SAT registration is approximately **${selectedCountry.testCostEquivalents.satCostFormatted}** and SEVIS fee is **${selectedCountry.testCostEquivalents.sevisCostFormatted}**.
- **Financial Aid Strategy:** ${selectedCountry.feeWaiverStrategies[0]}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomCountryAdapt = async (countryName: string) => {
    if (!countryName.trim()) return;
    setIsAdaptingCountry(true);
    setIsLoading(true);

    try {
      const preset = DEFAULT_COUNTRIES.find(c => c.countryName.toLowerCase() === countryName.toLowerCase());
      if (preset) {
        onSelectCountry(preset);
        setMessages(prev => [
          ...prev,
          {
            id: `adapt-${Date.now()}`,
            role: 'assistant',
            content: `✨ **Plan successfully adapted for ${preset.flagEmoji} ${preset.countryName}!**\n\n- **Curriculum Guidance:** ${preset.curriculumAdvice}\n- **US Consular Locations:** ${preset.embassyLocations.join(' & ')}\n- **Bank & Forex Rule:** ${preset.bankRegulations}\n- **Currency Unit:** ${preset.currencyCode} (${preset.currencySymbol}) with live exchange rates applied across your Runway Calculator!`,
            timestamp: Date.now()
          }
        ]);
        setIsAdaptingCountry(false);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/ai/adapt-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          countryName,
          userEmail: user?.email,
          userApiKey: userApiKey
        })
      });

      const data = await response.json();
      if (data.success && data.planData) {
        const plan = data.planData;
        const newCountryProfile: CountryPlanData = {
          id: countryName.toLowerCase().replace(/\s+/g, '-'),
          countryName: plan.countryName || countryName,
          flagEmoji: plan.flagEmoji || '🌐',
          currencyCode: plan.currencyCode || 'USD',
          currencySymbol: plan.currencySymbol || '$',
          usdExchangeRate: plan.usdExchangeRate || 1,
          curriculumType: plan.curriculumType || 'National Curriculum',
          curriculumAdvice: plan.curriculumAdvice || 'Standard translation transcripts required.',
          embassyLocations: plan.embassyLocations || [`US Embassy in ${countryName}`],
          advisingCenter: plan.advisingCenter || 'EducationUSA Center',
          bankRegulations: plan.bankRegulations || 'Standard international wire and forex guidelines.',
          feeWaiverStrategies: plan.feeWaiverStrategies || ['Request institutional fee code waivers.'],
          visaInterviewTips: plan.visaInterviewTips || ['Demonstrate strong non-immigrant intent and home ties.'],
          testCostEquivalents: plan.testCostEquivalents || {
            satCostFormatted: '$111 USD',
            detCostFormatted: '$65 USD',
            sevisCostFormatted: '$350 USD',
            mrvCostFormatted: '$185 USD'
          },
          customSummary: plan.customSummary || `Personalized roadmap generated for ${countryName}.`
        };

        onSelectCountry(newCountryProfile);
        setMessages(prev => [
          ...prev,
          {
            id: `adapt-${Date.now()}`,
            role: 'assistant',
            content: `✨ **AI Roadmap Generated for ${newCountryProfile.flagEmoji} ${newCountryProfile.countryName}!**\n\n- **Curriculum Conversion:** ${newCountryProfile.curriculumAdvice}\n- **US Consular Locations:** ${newCountryProfile.embassyLocations.join(', ')}\n- **Advising Hub:** ${newCountryProfile.advisingCenter}\n- **Bank Guidelines:** ${newCountryProfile.bankRegulations}\n- **Currency Unit:** ${newCountryProfile.currencyCode} (${newCountryProfile.currencySymbol}) applied across your entire dashboard.`,
            timestamp: Date.now()
          }
        ]);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsAdaptingCountry(false);
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Berea College $0 Strategy", text: "How do international students get full tuition & living coverage at Berea College without loans?" },
    { label: "High School GPA Conversion", text: `How should my ${selectedCountry.countryName} curriculum (${selectedCountry.curriculumType}) be submitted to US admissions officers?` },
    { label: "F-1 Visa Interview Prep", text: `What specific questions will the consular officer ask at ${selectedCountry.embassyLocations[0] || 'the US Embassy'} for an international student with full financial aid?` },
    { label: "SAT Fee Waiver Hack", text: "Can international applicants get fee waivers for the SAT or CSS Profile?" },
    { label: "Campus Job $750/mo Rule", text: "How does the on-campus 20 hours/week student job pay for health insurance and personal expenses?" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-[#140F0B]/50 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.9 }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[520px] bg-[#FAF5EB] text-[#221A14] z-50 shadow-2xl border-l border-[#DCCDBC] flex flex-col justify-between overflow-hidden overscroll-contain"
          >
            {/* Drawer Header */}
            <div className="bg-[#221A14] text-[#FAF6EE] p-4.5 border-b border-[#3B2E24] flex items-center justify-between shrink-0 shadow-deep-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E6C678]/20 border border-[#E6C678]/40 flex items-center justify-center text-[#E6C678] shadow-deep-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#FAF6EE]">AI Admissions Counselor</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#3B2E24] text-[#D8C7A6] border border-[#524133]">
                      Gemini 3.7
                    </span>
                  </div>
                  <p className="text-xs text-[#C5B49D] flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3 h-3 text-[#E6C678]" />
                    <span>Personalized for {selectedCountry.flagEmoji} {selectedCountry.countryName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowKeyConfig(!showKeyConfig)}
                  title="Configure Gemini API Key"
                  className={`p-2 rounded-xl border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                    userApiKey 
                      ? 'bg-[#2E3B2E] text-[#7BD492] border-[#44624A]' 
                      : 'bg-[#34271E] text-[#D4C3A3] hover:text-[#FAF6EE] border-[#48392C]'
                  }`}
                >
                  <Key className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  id="close-ai-drawer-btn"
                  className="p-2 rounded-xl bg-[#34271E] text-[#D4C3A3] hover:text-[#FAF6EE] hover:bg-[#463529] border border-[#48392C] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Gemini API Key Configuration Accordion Banner */}
            <AnimatePresence>
              {showKeyConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#1C1510] text-[#FAF6EE] px-4 py-3 border-b border-[#3B2E24] shrink-0 text-xs overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-[#E6C678] font-bold">
                      <Key className="w-3.5 h-3.5" />
                      <span>Gemini API Key Settings</span>
                    </div>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#A69380] hover:text-[#FAF6EE] flex items-center gap-1 underline"
                    >
                      <span>Get free key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <form onSubmit={handleSaveApiKey} className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Paste your Gemini API key (AIzaSy...)"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="flex-1 bg-[#271E17] border border-[#48372A] rounded-xl px-3 py-1.5 text-xs text-[#FAF6EE] placeholder-[#7A6959] focus:outline-none focus:border-[#D4A949]"
                    />
                    <button
                      type="submit"
                      className="bg-[#D4A949] hover:bg-[#E2BA5A] text-[#1C1510] font-bold px-3 py-1.5 rounded-xl transition-colors shrink-0"
                    >
                      Save
                    </button>
                  </form>
                  <p className="text-[10px] text-[#A69380] mt-1.5">
                    💡 The administrator email uses the server API key automatically. Other applicants can enter their own free key here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Country Switcher Strip */}
            <div 
              data-lenis-prevent="true"
              className="bg-[#EFE5D5] px-4 py-2.5 border-b border-[#DBCAB7] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none shrink-0"
            >
              <span className="text-[11px] font-bold text-[#554637] whitespace-nowrap flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#8C6328]" />
                <span>Switch Country Focus:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {DEFAULT_COUNTRIES.slice(0, 5).map(c => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCountry(c)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      c.id === selectedCountry.id
                        ? 'bg-[#221A14] text-[#FAF6EE] border-[#221A14] font-bold shadow-deep-sm'
                        : 'bg-[#F4EDE0] text-[#4A3C2F] border-[#D5C5B0] hover:bg-[#E8DCCB]'
                    }`}
                  >
                    {c.flagEmoji} {c.countryName}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Body */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain"
            >
              {messages.map((msg) => {
                const isAi = msg.role === 'assistant';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl bg-[#221A14] text-[#E6C678] flex items-center justify-center shrink-0 mt-0.5 shadow-deep-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-deep-sm ${
                        isAi
                          ? 'bg-[#FFFFFF] text-[#221A14] border border-[#E5D7C4] rounded-tl-sm'
                          : 'bg-[#221A14] text-[#FAF6EE] rounded-tr-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans-ui">
                        {msg.content}
                      </div>
                      <div className={`text-[9px] mt-2 font-mono text-right ${isAi ? 'text-[#8C7B6B]' : 'text-[#A69380]'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#221A14] text-[#E6C678] flex items-center justify-center shrink-0 shadow-deep-sm">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-[#FFFFFF] text-[#221A14] border border-[#E5D7C4] rounded-2xl rounded-tl-sm p-3.5 text-xs shadow-deep-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#8C6328] animate-ping" />
                    <span className="font-semibold text-[#554637]">
                      {isAdaptingCountry ? 'Synthesizing country roadmap & financial aid guidelines...' : 'Counselor is analyzing your question...'}
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inspiration Prompts */}
            <div 
              data-lenis-prevent="true"
              className="px-4 py-2.5 bg-[#F2E8D8] border-t border-[#E0D0BE] shrink-0"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A6959] mb-1.5">
                Quick Admissions Questions:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {quickPrompts.map((qp, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(qp.text)}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF5EB] hover:bg-[#FFFFFF] text-[#221A14] text-xs font-semibold whitespace-nowrap border border-[#DCCDBC] hover:border-[#8C6328] shadow-deep-sm transition-all cursor-pointer shrink-0"
                  >
                    {qp.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Form Bar */}
            <div className="p-4 bg-[#FAF5EB] border-t border-[#E3D6C4] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={`Ask anything about US admissions for ${selectedCountry.countryName}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-[#FFFFFF] text-[#221A14] placeholder-[#8A7968] text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#D5C5B0] focus:outline-hidden focus:border-[#8C6328] focus:ring-1 focus:ring-[#8C6328] shadow-inner"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  id="send-ai-message-btn"
                  className="bg-[#221A14] hover:bg-[#34271E] disabled:opacity-50 text-[#FAF6EE] p-3 rounded-2xl border border-[#D4A949]/40 shadow-deep-md transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 text-[#E6C678]" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
