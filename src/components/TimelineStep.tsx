'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  Lightbulb, 
  CheckSquare, 
  Clock, 
  ShieldCheck,
  Tag,
  Globe,
  Landmark
} from 'lucide-react';
import { TimelineStep as TimelineStepType, CountryPlanData } from '../types';

interface TimelineStepProps {
  step: TimelineStepType;
  completedTasks: string[];
  onToggleTask: (taskId: string) => void;
  isCurrentStep: boolean;
  onSelectStep: (stepNumber: number) => void;
  selectedCountry?: CountryPlanData;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  completedTasks,
  onToggleTask,
  isCurrentStep,
  onSelectStep,
  selectedCountry
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isCurrentStep || step.stepNumber === 1);

  const stepTasksCompleted = step.keyChecklist.filter(item => completedTasks.includes(`${step.stepNumber}-${item}`)).length;
  const isStepFullyComplete = stepTasksCompleted === step.keyChecklist.length && step.keyChecklist.length > 0;

  return (
    <div 
      id={`timeline-step-${step.stepNumber}`}
      className={`relative rounded-3xl transition-all duration-300 overflow-hidden liquid-glass-card ${
        isStepFullyComplete
          ? 'border-[#7BD492]/60 ring-2 ring-[#7BD492]/20 shadow-deep-sm'
          : isCurrentStep
          ? 'border-[#D4A949]/70 ring-2 ring-[#D4A949]/30 shadow-deep-lg'
          : 'shadow-card-hover'
      }`}
    >
      {/* Top Header Card */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Step Number Badge with Spring Bounce */}
            <motion.div 
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-tight shrink-0 shadow-deep-sm transition-colors ${
                isStepFullyComplete
                  ? 'bg-[#235831] text-[#FAF7F0]'
                  : isCurrentStep
                  ? 'bg-[#221A14] text-[#FAF6EE]'
                  : 'bg-[#EAE0D0] text-[#554536] border border-[#D5C6B1]'
              }`}
            >
              {isStepFullyComplete ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span>0{step.stepNumber}</span>
              )}
            </motion.div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#855D1C] bg-[#EFE6D5] px-2.5 py-0.5 rounded-full border border-[#DAC9B0] shadow-deep-sm whitespace-nowrap">
                  Step 0{step.stepNumber}
                </span>
                <span className="text-xs text-[#6B5A4B] font-medium flex items-center gap-1 whitespace-nowrap">
                  <Clock className="w-3 h-3 text-[#8A7969]" />
                  {step.durationOrTiming}
                </span>
                {selectedCountry && step.stepNumber === 4 && (
                  <span className="text-[10px] font-bold text-[#235831] bg-[#DFEBDC] px-2 py-0.5 rounded-full border border-[#BED7BA] whitespace-nowrap">
                    {selectedCountry.flagEmoji} {selectedCountry.embassyLocations[0]}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#221A14] font-serif-heading mt-1">
                {step.title}
              </h3>
            </div>
          </div>

          {/* Progress / Status Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EAE0D0] text-[#554536] border border-[#D5C6B1] shadow-deep-sm whitespace-nowrap">
              {stepTasksCompleted}/{step.keyChecklist.length} Milestones
            </span>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              onClick={() => setIsExpanded(!isExpanded)}
              id={`toggle-step-expand-${step.stepNumber}`}
              className="p-1.5 rounded-xl text-[#554536] hover:text-[#18120D] bg-[#EDE4D5] hover:bg-[#DFCDB9] hover:border-[#C0AD94] transition-all cursor-pointer border border-[#D5C6B1] shadow-deep-sm"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Subtitle & Focus Metric */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <p className="text-xs font-semibold text-[#5C4D3E]">
            {step.subtitle}
          </p>
          <span className="text-[#C8B8A4]">•</span>
          <span className="text-xs font-bold text-[#235831] bg-[#DFEBDC] px-2.5 py-0.5 rounded-md border border-[#BED7BA] shadow-deep-sm whitespace-nowrap">
            🎯 {step.focusMetric}
          </span>
        </div>

        {/* Core Summary */}
        <p className="text-xs sm:text-sm text-[#4E4033] leading-relaxed bg-[#F4EDE0] p-4 rounded-xl border border-[#DCCDBC] shadow-deep-sm">
          {step.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {step.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[11px] font-bold text-[#635242] bg-[#EDE4D5] px-2.5 py-0.5 rounded-full border border-[#D7C8B4] whitespace-nowrap shadow-deep-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Step Body with motion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#DECDBA] space-y-5">
              {/* Country Adaptive Callout (if active) */}
              {selectedCountry && (
                <div className="bg-[#FAF4E6] border border-[#E8D6B4] rounded-xl p-4 shadow-deep-sm">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#7A5416]">
                    <Globe className="w-4 h-4 text-[#8C6328]" />
                    <span>{selectedCountry.flagEmoji} {selectedCountry.countryName} Country-Specific Guidance:</span>
                  </div>
                  {step.stepNumber === 1 && (
                    <p className="text-xs text-[#554536] leading-relaxed">
                      <strong>Curriculum Conversion:</strong> {selectedCountry.curriculumAdvice} ({selectedCountry.curriculumType})
                    </p>
                  )}
                  {step.stepNumber === 2 && (
                    <p className="text-xs text-[#554536] leading-relaxed">
                      <strong>Fee Waiver Strategy:</strong> {selectedCountry.feeWaiverStrategies[0]}
                    </p>
                  )}
                  {step.stepNumber === 3 && (
                    <p className="text-xs text-[#554536] leading-relaxed">
                      <strong>Advising & Portal Support:</strong> Connect with {selectedCountry.advisingCenter} for cohort application reviews.
                    </p>
                  )}
                  {step.stepNumber === 4 && (
                    <div className="space-y-1 text-xs text-[#554536] leading-relaxed">
                      <p><strong>US Consular Hubs:</strong> {selectedCountry.embassyLocations.join(', ')}</p>
                      <p><strong>Visa Strategy:</strong> {selectedCountry.visaInterviewTips[0]}</p>
                    </div>
                  )}
                  {step.stepNumber === 5 && (
                    <p className="text-xs text-[#554536] leading-relaxed">
                      <strong>Forex & Student File:</strong> {selectedCountry.bankRegulations}
                    </p>
                  )}
                </div>
              )}

              {/* Detailed Guides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.detailedGuide.map((guide, idx) => (
                  <div key={idx} className="bg-[#F6EFE3] border border-[#DBCBBA] rounded-xl p-4 shadow-deep-sm">
                    <h4 className="text-xs font-bold text-[#221A14] uppercase tracking-wider mb-2">
                      {guide.heading}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#524436]">
                      {guide.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C6328] shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Interactive Checklist */}
              <div className="bg-[#FDFBF7] border border-[#DCCDBC] rounded-xl p-4.5 shadow-deep-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#221A14] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#235831]" />
                    Step 0{step.stepNumber} Action Checklist
                  </h4>
                  <span className="text-[11px] text-[#7A6A5A] font-medium">Click items to track progress</span>
                </div>

                <div className="space-y-2">
                  {step.keyChecklist.map((task, idx) => {
                    const taskId = `${step.stepNumber}-${task}`;
                    const isChecked = completedTasks.includes(taskId);
                    return (
                      <motion.label
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        id={`task-label-${taskId}`}
                        onClick={() => onToggleTask(taskId)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none shadow-deep-sm ${
                          isChecked
                            ? 'bg-[#EAF3E7] border-[#BCD4BA] text-[#224A28]'
                            : 'bg-[#FAF6EE] border-[#D8CABE] text-[#3D3126] hover:bg-[#F2EADB]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isChecked ? 'bg-[#235831] text-[#FAF6EE]' : 'bg-[#EAE0D0] text-[#554637]'
                          }`}>
                            {step.stepNumber}.{idx + 1}
                          </span>
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-[#235831] fill-[#DFEBDC]" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#A19181]" />
                          )}
                        </div>
                        <span className={`text-xs font-medium leading-relaxed ${isChecked ? 'line-through text-[#667E67]' : ''}`}>
                          {task}
                        </span>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Pro Tips Box */}
              {step.proTips && step.proTips.length > 0 && (
                <div className="bg-[#FAF3E6] border border-[#E0CFAB] rounded-xl p-4 shadow-deep-sm">
                  <h4 className="text-xs font-bold text-[#7A4F16] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-4 h-4 text-[#8C6328]" />
                    Insider Strategic Tips
                  </h4>
                  <ul className="space-y-1 text-xs text-[#524334]">
                    {step.proTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#8C6328] font-bold">›</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


