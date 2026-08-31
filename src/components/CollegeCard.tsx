'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Bookmark, 
  BookmarkCheck, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ 
  college, 
  isFavorited, 
  onToggleFavorite 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPolicyBadge = (policy: College['admissionsPolicy']) => {
    switch (policy) {
      case 'Need-Blind':
        return 'bg-[#DFEBDC] text-[#235831] border-[#BFD8BC]';
      case 'Full Tuition Work College':
        return 'bg-[#F2E5D3] text-[#7A4F16] border-[#DEC7A8]';
      case 'Need-Aware':
        return 'bg-[#EAE0D0] text-[#554536] border-[#D4C3AC]';
      default:
        return 'bg-[#EAE0D0] text-[#554536] border-[#D4C3AC]';
    }
  };

  return (
    <div 
      id={`college-card-${college.id}`}
      className={`group relative rounded-3xl transition-all duration-300 p-5 flex flex-col justify-between h-full liquid-glass-card ${
        isFavorited 
          ? 'border-[#D4A949]/70 ring-2 ring-[#D4A949]/30 shadow-deep-lg' 
          : 'shadow-card-hover'
      }`}
    >
      <div>
        {/* Header Badges - Single Line Flow */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#DFEBDC] text-[#235831] border border-[#BDD7BA] flex items-center gap-1 whitespace-nowrap shadow-deep-sm">
              <ShieldCheck className="w-3 h-3 text-[#235831] shrink-0" />
              100% Need Met
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap truncate max-w-[130px] ${getPolicyBadge(college.admissionsPolicy)}`}>
              {college.admissionsPolicy}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleFavorite(college.id)}
            id={`fav-btn-${college.id}`}
            title={isFavorited ? 'Remove from targets' : 'Pin to my target list'}
            className={`p-1.5 rounded-xl transition-all cursor-pointer shrink-0 border shadow-deep-sm ${
              isFavorited
                ? 'bg-[#EAE0D0] text-[#7A5416] border-[#DEC494]'
                : 'bg-[#EDE4D5] text-[#786655] border-[#D8C9B4] hover:text-[#221A14] hover:bg-[#DFCDB9] hover:border-[#BFAB93] group-hover:border-[#C4B29A]'
            }`}
          >
            {isFavorited ? (
              <BookmarkCheck className="w-4 h-4 text-[#8C6328] fill-[#8C6328]/40" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* College Name & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold tracking-tight text-[#221A14] font-serif-heading leading-tight truncate">
            {college.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[#705F4F] font-medium mt-1">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-[#917E6E] shrink-0" />
              {college.location}, {college.state}
            </span>
            <span>•</span>
            <span className="text-[#554637] whitespace-nowrap truncate">{college.type}</span>
          </div>
        </div>

        {/* Application Method & Ranking Note */}
        <div className="mb-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#4E4032]">
            <span className="font-bold text-[#221A14] whitespace-nowrap">Submission:</span>
            <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] whitespace-nowrap ${
              college.applicationMethod.includes('Direct') 
                ? 'bg-[#F2E3C4] text-[#784D12] border border-[#DFC396]' 
                : 'bg-[#EAE0D1] text-[#4F3F30] border border-[#D5C4AF]'
            }`}>
              {college.applicationMethod}
            </span>
          </div>

          {college.rankingNote && (
            <p className="text-[11px] text-[#7A6A5A] italic leading-tight truncate">
              {college.rankingNote}
            </p>
          )}
        </div>

        {/* Key Aid Highlight - Stacked layout to prevent any badge overflow */}
        <div className="bg-[#F3EADB] border border-[#DCCDB9] rounded-xl p-3.5 mb-3.5 shadow-deep-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A5416] mb-1.5">
            <Award className="w-4 h-4 text-[#8C6328] shrink-0" />
            <span>Financial Aid Package</span>
          </div>
          {college.averageAward && (
            <div className="mb-2.5">
              <span className="inline-block text-[11px] font-bold text-[#235831] bg-[#DFEBDC] px-2.5 py-1 rounded-lg border border-[#BDD7BA] leading-snug">
                {college.averageAward}
              </span>
            </div>
          )}
          <ul className="space-y-1.5 text-xs text-[#524334]">
            {college.aidHighlights.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6328] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Extended Details with motion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-3 border-t border-[#DECDBA] text-xs text-[#554637] mb-2">
                {/* Additional Aid Points */}
                {college.aidHighlights.length > 2 && (
                  <div>
                    <p className="font-bold text-[#221A14] mb-1">Additional Aid Benefits:</p>
                    <ul className="space-y-1 pl-0.5">
                      {college.aidHighlights.slice(2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B37] shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deadlines Box */}
                <div className="bg-[#EFE7D8] rounded-xl p-3 border border-[#D8C7B0] shadow-deep-sm">
                  <p className="font-bold text-[#221A14] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#5C4B3C]" />
                    Key Deadlines
                  </p>
                  <div className="grid grid-cols-1 gap-1 text-[11px]">
                    {college.keyDeadlines.early && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#685645]">Early Action/Decision:</span>
                        <span className="text-[#221A14] font-bold">{college.keyDeadlines.early}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-[#685645]">Regular Decision:</span>
                      <span className="text-[#221A14] font-bold">{college.keyDeadlines.regular}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#685645]">Financial Aid filing:</span>
                      <span className="text-[#221A14] font-bold">{college.keyDeadlines.financialAid}</span>
                    </div>
                  </div>
                </div>

                {/* Campus Job Details */}
                {college.campusJobDetail && (
                  <div className="flex items-start gap-2 bg-[#F6EDDC] p-2.5 rounded-xl border border-[#E4D1B4] text-[11px] text-[#553610] shadow-deep-sm">
                    <Briefcase className="w-3.5 h-3.5 text-[#8C6328] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#3D2506]">Campus Work-Study: </span>
                      {college.campusJobDetail}
                    </div>
                  </div>
                )}

                {/* Special requirements */}
                <div>
                  <p className="font-bold text-[#221A14] mb-1">Admissions Strategy:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#5C4C3B]">
                    {college.specialRequirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer controls - guaranteed containment */}
      <div className="pt-3.5 border-t border-[#E3D6C4] flex items-center justify-between gap-2 mt-auto w-full">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsExpanded(!isExpanded)}
          id={`expand-college-${college.id}`}
          className="text-xs font-semibold text-[#4A3C2F] hover:text-[#18120D] flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#EDE4D5] hover:bg-[#E0D4C2] border border-[#D5C5B0] hover:border-[#C0AD94] transition-all cursor-pointer whitespace-nowrap shadow-deep-sm shrink-0"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Deadlines & Details</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </motion.button>

        {college.directPortalUrl ? (
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.94 }}
            href={college.directPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            id={`direct-portal-${college.id}`}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#221A14] bg-[#E9D6B3] hover:bg-[#DFC494] px-3.5 py-1.5 rounded-xl transition-all shadow-deep-sm whitespace-nowrap border border-[#C8AF82] group-hover:border-[#9E7332] group-hover:bg-[#E3CEAA] group-hover:shadow-[0_4px_12px_rgba(233,214,179,0.5)] min-w-0 max-w-[calc(100%-145px)]"
          >
            <span className="truncate">Direct Portal</span>
            <ExternalLink className="w-3 h-3 text-[#6B4B1B] shrink-0" />
          </motion.a>
        ) : (
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.94 }}
            href="https://www.commonapp.org"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            id={`commonapp-link-${college.id}`}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#FAF6EE] bg-[#221A14] hover:bg-[#3D2E20] px-3.5 py-1.5 rounded-xl transition-all shadow-deep-sm whitespace-nowrap border border-[#221A14] group-hover:border-[#8C6328] group-hover:bg-[#2B2119] group-hover:shadow-[0_4px_12px_rgba(34,26,20,0.22)] min-w-0 max-w-[calc(100%-145px)]"
          >
            <span className="truncate">Via Common App</span>
            <ExternalLink className="w-3 h-3 text-[#DBC59E] shrink-0" />
          </motion.a>
        )}
      </div>
    </div>
  );
};
