'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortalCard } from './PortalCard';
import { PORTALS_DATA } from '../data/roadmapData';
import { Search, Globe, CheckCircle2, RotateCcw, ArrowRight, ListOrdered } from 'lucide-react';

interface PortalsSectionProps {
  completedPortals: string[];
  onToggleComplete: (id: string) => void;
}

export const PortalsSection: React.FC<PortalsSectionProps> = ({ 
  completedPortals, 
  onToggleComplete 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStepFilter, setActiveStepFilter] = useState<number | null>(null);

  const sortedPortals = [...PORTALS_DATA].sort((a, b) => a.stepOrder - b.stepOrder);

  const filteredPortals = sortedPortals.filter((portal) => {
    const matchesCategory = selectedCategory === 'all' || portal.category === selectedCategory;
    const matchesStep = activeStepFilter === null || portal.stepOrder === activeStepFilter;
    const matchesSearch = 
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStep && matchesSearch;
  });

  const completedCount = completedPortals.length;

  const categories = [
    { id: 'all', label: 'All Portals (8)' },
    { id: 'application', label: 'Application Hubs' },
    { id: 'testing', label: 'Standardized Exams' },
    { id: 'prep', label: 'Free Prep' },
    { id: 'aid', label: 'Financial Aid' },
    { id: 'visa', label: 'Govt Visa' }
  ];

  return (
    <section id="portals-section" className="mb-14 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#855D1C] bg-[#EFE6D5] px-3 py-1 rounded-full border border-[#DAC9B0] shadow-deep-sm whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-[#855D1C]" />
              Sequential 8-Step Pipeline
            </span>
            <span className="text-xs text-[#6B5A4B] font-semibold bg-[#EBE2D3] px-2.5 py-0.5 rounded-full border border-[#D5C6B1] whitespace-nowrap">
              {completedCount} of {PORTALS_DATA.length} Setup Done
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#221A14] font-serif-heading">
            Official Application & Financial Aid Portals
          </h2>
          <p className="text-sm text-[#5C4D3E] max-w-3xl mt-1 leading-relaxed">
            Follow this chronological 8-step setup sequence: configure your universal application hub first, register for standardized exams, file $0 EFC institutional aid, and complete US consular visa clearance.
          </p>
        </div>

        {/* Search Input with deep shadow */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#8C7B6B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="search-portals"
            placeholder="Search portals (SEVIS, SAT, CSS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-[#FBF9F4] border border-[#D0C2AD] rounded-xl pl-9 pr-3.5 py-2.5 text-[#241A13] placeholder:text-[#9A8B7B] focus:outline-none focus:ring-2 focus:ring-[#8C6328]/30 focus:border-[#8C6328] shadow-deep-sm transition-all"
          />
        </div>
      </div>

      {/* Sequential 8-Step Pipeline Tracker */}
      <div className="bg-[#FAF4E6] border border-[#E5D2B4] rounded-2xl p-4 mb-6 shadow-deep-md overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7A5416]">
            <ListOrdered className="w-4 h-4 text-[#8C6328]" />
            <span className="uppercase tracking-wider">Chronological Setup Order (Do Step 01 to Step 08)</span>
          </div>
          {activeStepFilter !== null && (
            <button
              onClick={() => setActiveStepFilter(null)}
              className="text-[11px] font-bold text-[#8C6328] hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Show All 8 Steps</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {sortedPortals.map((p) => {
            const isDone = completedPortals.includes(p.id);
            const isSelected = activeStepFilter === p.stepOrder;
            return (
              <motion.button
                key={p.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                onClick={() => setActiveStepFilter(isSelected ? null : p.stepOrder)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between shadow-deep-sm ${
                  isSelected
                    ? 'bg-[#221A14] text-[#FAF6EE] border-[#221A14] ring-2 ring-[#8C6328]'
                    : isDone
                    ? 'bg-[#E3EFE0] text-[#235831] border-[#BCD7B8]'
                    : 'bg-[#FFFDF9] text-[#3D3126] border-[#DECDBA] hover:bg-[#F5ECE0]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-[#FAF6EE] text-[#221A14]' : isDone ? 'bg-[#235831] text-[#FAF6EE]' : 'bg-[#EBE0D0] text-[#554637]'
                  }`}>
                    0{p.stepOrder}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B37]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#DAC9B5]" />
                  )}
                </div>
                <div className="text-[11px] font-bold truncate leading-tight mt-0.5">
                  {p.name.split('.')[0]}
                </div>
                <div className={`text-[9px] truncate mt-0.5 ${isSelected ? 'text-[#D8C7A6]' : 'text-[#8A7969]'}`}>
                  {p.category.toUpperCase()}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Category Pills & Quick Filter with Deep Shadow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id && activeStepFilter === null;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveStepFilter(null);
              }}
              id={`filter-cat-${cat.id}`}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#221A14] text-[#F9F5EC] shadow-deep-md font-bold'
                  : 'bg-[#EDE5D8] text-[#554637] border border-[#D7C9B5] hover:bg-[#E2D8C7] hover:text-[#221A14] shadow-deep-sm'
              }`}
            >
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Bento Grid with Motion Stagger - 3 in one row */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPortals.map((portal, idx) => (
            <motion.div
              key={portal.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col"
            >
              <PortalCard
                portal={portal}
                isCompleted={completedPortals.includes(portal.id)}
                onToggleComplete={onToggleComplete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPortals.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-[#F8F4EB] rounded-2xl border border-[#D8CCB8] p-6 shadow-deep-md"
        >
          <p className="text-[#685848] text-sm">No portals found matching your filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setActiveStepFilter(null); }}
            className="mt-3 text-xs font-bold text-[#8C6328] hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset search filters</span>
          </button>
        </motion.div>
      )}
    </section>
  );
};
