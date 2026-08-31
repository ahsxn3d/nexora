'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  LayoutGrid, 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Receipt, 
  Sparkles, 
  FileCheck, 
  Globe 
} from 'lucide-react';
import { Portal } from '../types';

interface PortalCardProps {
  portal: Portal;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Calculator,
  Receipt,
  Sparkles,
  FileCheck,
  Globe
};

export const PortalCard: React.FC<PortalCardProps> = ({ portal, isCompleted, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[portal.iconName] || Globe;

  const categoryStyles = {
    application: 'bg-[#ECE2D0] text-[#7A5416] border-[#D9C6A5]',
    testing: 'bg-[#E1EAF2] text-[#224E75] border-[#C3D5E4]',
    prep: 'bg-[#DFEBDC] text-[#2B5731] border-[#C0D9BC]',
    aid: 'bg-[#F2E5D5] text-[#8C4A11] border-[#E2C7A9]',
    visa: 'bg-[#EAE0F0] text-[#552766] border-[#D3BEDD]'
  };

  const categoryLabels = {
    application: 'Application Hub',
    testing: 'Official Exam',
    prep: 'Prep & Practice',
    aid: 'Financial Aid',
    visa: 'Government Visa'
  };

  return (
    <div 
      id={`portal-card-${portal.id}`}
      className={`group relative rounded-3xl transition-all duration-300 p-4.5 sm:p-5 flex flex-col justify-between h-full overflow-hidden liquid-glass-card ${
        isCompleted 
          ? 'border-[#7BD492]/60 ring-2 ring-[#7BD492]/20 shadow-deep-sm' 
          : 'shadow-card-hover'
      }`}
    >
      <div>
        {/* Top meta row - strictly single-line badges with step numbering */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-mono font-extrabold bg-[#221A14] text-[#FAF6EE] px-2.5 py-0.5 rounded-lg shrink-0 shadow-deep-sm">
              Step {portal.stepOrder < 10 ? `0${portal.stepOrder}` : portal.stepOrder}
            </span>
            <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border whitespace-nowrap ${categoryStyles[portal.category]}`}>
              {categoryLabels[portal.category]}
            </span>
            {portal.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5B4C] bg-[#EDE4D6] px-2 py-0.5 rounded-full border border-[#D5C6B1] whitespace-nowrap truncate max-w-[100px] hidden sm:inline-block">
                {portal.badge}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onToggleComplete(portal.id)}
            id={`toggle-status-${portal.id}`}
            title={isCompleted ? 'Mark as pending' : 'Mark as done'}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer py-1 px-2.5 rounded-xl border shrink-0 whitespace-nowrap shadow-deep-sm ${
              isCompleted
                ? 'bg-[#E3EFE0] text-[#235831] border-[#BCD7B8]'
                : 'bg-[#EDE4D5] text-[#554637] border-[#D5C6B1] hover:text-[#18120D] hover:bg-[#DFCDB9] hover:border-[#C2B099] group-hover:border-[#C4B29A]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#2E6B37] fill-[#DFEBDC]" />
                <span className="text-[#235831] font-bold">Done</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-[#8C7B6C]" />
                <span className="text-[#554637]">Track</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Portal Title & Icon */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EBE2D3] border border-[#D5C6B1] flex items-center justify-center text-[#2A1F17] shrink-0 group-hover:scale-108 transition-transform duration-200 shadow-deep-sm">
            <IconComponent className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold tracking-tight text-[#221A14] font-serif-heading leading-tight truncate">
              {portal.name}
            </h3>
            <p className="text-[11px] text-[#786756] font-medium mt-0.5 truncate">
              {portal.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#524436] leading-relaxed mb-3 line-clamp-3">
          {portal.description}
        </p>

        {/* Highlight Callout */}
        <div className="text-[11px] font-medium text-[#46382C] bg-[#F1E9DC]/90 border border-[#DCCDBA] rounded-xl p-2.5 mb-3 shadow-deep-sm">
          <span className="font-bold text-[#221A14]">Key Role: </span>
          <span>{portal.highlight}</span>
        </div>

        {/* Expandable required steps with smooth motion */}
        <AnimatePresence>
          {isExpanded && portal.stepsRequired && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-[#DECDBA] text-xs space-y-2 mb-3">
                <p className="font-bold text-[#221A14] uppercase tracking-wider text-[10px]">Action Checklist</p>
                <ul className="space-y-1.5 pl-0.5">
                  {portal.stepsRequired.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#5A4C3D] leading-snug">
                      <span className="w-4 h-4 rounded-full bg-[#E4D8C5] text-[#3D3126] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-deep-sm">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {portal.costNote && (
                  <div className="mt-2 text-[11px] text-[#7A4E1A] italic bg-[#F6EDDB] px-2.5 py-1.5 rounded-lg border border-[#E5D2B4]">
                    💰 {portal.costNote}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Buttons - guaranteed containment */}
      <div className="pt-3.5 border-t border-[#E3D6C4] flex items-center justify-between gap-2 mt-auto w-full">
        {portal.stepsRequired ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsExpanded(!isExpanded)}
            id={`expand-details-${portal.id}`}
            className="text-xs font-semibold text-[#4A3C2F] hover:text-[#18120D] flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#EDE4D5] hover:bg-[#E0D4C2] border border-[#D5C5B0] hover:border-[#C0AD94] transition-all cursor-pointer whitespace-nowrap shadow-deep-sm shrink-0"
          >
            {isExpanded ? (
              <>
                <span>Less</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Checklist</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        ) : <div />}

        <motion.a
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.94 }}
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          id={`launch-link-${portal.id}`}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#FAF6EE] bg-[#221A14] hover:bg-[#3D2E20] px-3.5 py-1.5 rounded-xl transition-all shadow-deep-sm whitespace-nowrap border border-[#221A14] group-hover:border-[#8C6328] group-hover:bg-[#2B2119] group-hover:shadow-[0_4px_12px_rgba(34,26,20,0.22)] min-w-0 max-w-[calc(100%-88px)]"
        >
          <span className="truncate">{portal.actionLabel}</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#DBC59E] shrink-0" />
        </motion.a>
      </div>
    </div>
  );
};
