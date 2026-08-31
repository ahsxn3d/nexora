'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CollegeCard } from './CollegeCard';
import { COLLEGES_DATA } from '../data/roadmapData';
import { Target, Info, BookmarkCheck, RotateCcw } from 'lucide-react';

interface CollegeListProps {
  favoriteColleges: string[];
  onToggleFavorite: (id: string) => void;
}

export const CollegeList: React.FC<CollegeListProps> = ({ 
  favoriteColleges, 
  onToggleFavorite 
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredColleges = COLLEGES_DATA.filter((college) => {
    if (filterType === 'favorites') return favoriteColleges.includes(college.id);
    if (filterType === 'need-blind') return college.admissionsPolicy === 'Need-Blind';
    if (filterType === 'direct') return college.applicationMethod.includes('Direct');
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All 6 Colleges' },
    { id: 'need-blind', label: 'Need-Blind Only' },
    { id: 'direct', label: 'Berea Direct Portal' },
    { id: 'favorites', label: `My Shortlist (${favoriteColleges.length})` }
  ];

  return (
    <section id="colleges-section" className="mb-14 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#235831] bg-[#DFEBDC] px-3 py-1 rounded-full border border-[#BED7BA] shadow-deep-sm whitespace-nowrap">
              <Target className="w-3.5 h-3.5 text-[#235831]" />
              Focused Selection
            </span>
            <span className="text-xs text-[#625141] font-semibold bg-[#EAE1D1] px-2.5 py-0.5 rounded-full border border-[#D3C3AD] whitespace-nowrap">
              6 Elite 100% Full Need-Met Colleges
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#221A14] font-serif-heading">
            Top Target Colleges for 100% Full Need
          </h2>
          <p className="text-sm text-[#5A4B3C] max-w-3xl mt-1 leading-relaxed">
            Apply to a focused list of institutions that guarantee comprehensive 100% demonstrated financial need packages for international applicants with zero required parent loans.
          </p>
        </div>

        {/* Filter Pills with Deep Shadow */}
        <div className="flex items-center gap-1.5 bg-[#EAE1D2] p-1.5 rounded-2xl border border-[#D5C6B1] shadow-deep-md self-start md:self-auto overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilterType(tab.id)}
                id={`filter-colleges-${tab.id}`}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border shadow-deep-sm ${
                  isActive
                    ? 'bg-[#221A14] text-[#F9F5EC] border-[#221A14] font-bold'
                    : 'bg-[#F2EAE0] text-[#504031] border-[#D8CABE] hover:text-[#18120D] hover:bg-[#E3D6C5] hover:border-[#BFAD97]'
                }`}
              >
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Strategic Notice Banner with Deep Dark Shadow */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FAF5EB] border border-[#DFCFA8] rounded-2xl p-4.5 mb-6 shadow-deep-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EFE3C3] text-[#7A5416] flex items-center justify-center shrink-0 mt-0.5 border border-[#DBC696] shadow-deep-sm">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#221A14]">
              The 100% Need-Met International Strategy
            </h4>
            <p className="text-xs text-[#5C4C3B] leading-relaxed mt-0.5">
              With a declared household income of <span className="font-semibold text-[#1C150F]">~$4,500/year</span>, your calculated Expected Family Contribution (EFC) will be <span className="font-bold text-[#235831]">$0</span>. Every admitted college on this list fully bridges that gap with institutional tuition waivers, room & board grants, and campus stipends.
            </p>
          </div>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#EDE1CD] border border-[#D5C2A5] text-[#6E4410] shrink-0 self-end sm:self-auto shadow-deep-sm whitespace-nowrap">
          Zero Student Loans Guaranteed
        </div>
      </motion.div>

      {/* Colleges Bento Grid - 3 in one row */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredColleges.map((college, idx) => (
            <motion.div
              key={college.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col"
            >
              <CollegeCard
                college={college}
                isFavorited={favoriteColleges.includes(college.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredColleges.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-[#F8F4EB] rounded-2xl border border-[#D8CCB8] p-6 shadow-deep-md"
        >
          <p className="text-[#685848] text-sm">No colleges match the selected filter.</p>
          <button
            onClick={() => setFilterType('all')}
            className="mt-3 text-xs font-bold text-[#8C6328] hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show all target colleges</span>
          </button>
        </motion.div>
      )}
    </section>
  );
};
