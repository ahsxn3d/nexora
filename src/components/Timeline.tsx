'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimelineStep } from './TimelineStep';
import { TIMELINE_STEPS } from '../data/roadmapData';
import { Compass, RotateCcw } from 'lucide-react';
import { CountryPlanData } from '../types';

interface TimelineProps {
  completedTasks: string[];
  onToggleTask: (taskId: string) => void;
  onResetTasks: () => void;
  selectedCountry?: CountryPlanData;
}

export const Timeline: React.FC<TimelineProps> = ({
  completedTasks,
  onToggleTask,
  onResetTasks,
  selectedCountry
}) => {
  const [activeStepFilter, setActiveStepFilter] = useState<number | 'all'>('all');

  const totalChecklistItems = TIMELINE_STEPS.reduce((acc, step) => acc + step.keyChecklist.length, 0);
  const totalCompletedTasks = completedTasks.length;
  const progressPercent = Math.round((totalCompletedTasks / totalChecklistItems) * 100) || 0;

  const displaySteps = activeStepFilter === 'all' 
    ? TIMELINE_STEPS 
    : TIMELINE_STEPS.filter(s => s.stepNumber === activeStepFilter);

  return (
    <section id="timeline-section" className="mb-14 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#855D1C] bg-[#EFE6D5] px-3 py-1 rounded-full border border-[#DAC9B0] shadow-deep-sm whitespace-nowrap">
              <Compass className="w-3.5 h-3.5 text-[#855D1C]" />
              The Master Pathway
            </span>
            <span className="text-xs text-[#6B5A4B] font-semibold bg-[#EBE2D3] px-2.5 py-0.5 rounded-full border border-[#D5C6B1] whitespace-nowrap">
              5 Action Phases from Preparation to Campus Arrival
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#221A14] font-serif-heading">
            The Step-by-Step Pathway
          </h2>
          <p className="text-sm text-[#5C4D3E] max-w-3xl mt-1 leading-relaxed">
            Execute each milestone sequentially: build your freelance runway, achieve 1450+ SAT scores in {selectedCountry ? selectedCountry.countryName : 'your home country'}, file CSS Profile for $0 EFC, secure your F-1 Visa at {selectedCountry ? selectedCountry.embassyLocations[0] : 'the US Embassy'}, and settle into campus life.
          </p>
        </div>

        {/* Quick Reset / Status with Deep Shadow */}
        <div className="flex items-center gap-3 bg-[#FAF6EE] border border-[#D8CCB8] p-2.5 rounded-2xl shadow-deep-sm shrink-0">
          <div className="text-right">
            <span className="text-xs font-bold text-[#221A14] whitespace-nowrap block">{progressPercent}% Completed</span>
            <p className="text-[11px] text-[#7A6A5A] font-semibold whitespace-nowrap">{totalCompletedTasks} of {totalChecklistItems} Tasks Done</p>
          </div>
          {totalCompletedTasks > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onResetTasks}
              id="reset-tasks-btn"
              title="Reset task checkmarks"
              className="p-2 rounded-xl text-[#7A6959] hover:text-[#9E2A2B] hover:bg-[#EAE0D0] transition-colors cursor-pointer border border-[#D5C6B1]"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Step Navigation Tabs with Deep Dark Shadow */}
      <div className="flex items-center gap-1.5 bg-[#EAE1D2] p-1.5 rounded-2xl border border-[#D5C6B1] shadow-deep-md mb-4 overflow-x-auto scrollbar-none">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveStepFilter('all')}
          id="step-tab-all"
          className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeStepFilter === 'all'
              ? 'bg-[#221A14] text-[#F9F5EC] shadow-deep-sm font-bold'
              : 'text-[#504031] hover:text-[#1E1711] hover:bg-[#DDD2C0]'
          }`}
        >
          All 5 Steps View
        </motion.button>

        {TIMELINE_STEPS.map((step) => {
          const stepDone = step.keyChecklist.every(t => completedTasks.includes(`${step.stepNumber}-${t}`));
          const isActive = activeStepFilter === step.stepNumber;
          return (
            <motion.button
              key={step.stepNumber}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveStepFilter(step.stepNumber)}
              id={`step-tab-${step.stepNumber}`}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#221A14] text-[#F9F5EC] shadow-deep-sm font-bold'
                  : 'text-[#504031] hover:text-[#1E1711] hover:bg-[#DDD2C0]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                stepDone ? 'bg-[#235831] text-white' : 'bg-[#D7C9B6] text-[#4A3C2F]'
              }`}>
                {step.stepNumber}
              </span>
              <span className="whitespace-nowrap">{step.title.split('&')[0]}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Country Specific Active Pathway Banner */}
      {selectedCountry && (
        <div className="bg-[#FAF5EB] border border-[#DFCFA8] rounded-2xl p-3.5 mb-6 shadow-deep-sm flex flex-wrap items-center justify-between gap-3 text-xs text-[#554637]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedCountry.flagEmoji}</span>
            <div>
              <span className="font-bold text-[#221A14]">Active Country Pathway: {selectedCountry.countryName}</span>
              <span className="text-[#7A6959] ml-2 font-medium">({selectedCountry.curriculumType})</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="bg-[#F2EAE0] px-2.5 py-1 rounded-lg border border-[#DAC9B5]">
              Embassy: <strong>{selectedCountry.embassyLocations[0]}</strong>
            </span>
            <span className="bg-[#F2EAE0] px-2.5 py-1 rounded-lg border border-[#DAC9B5] hidden sm:inline-block">
              Center: <strong>{selectedCountry.advisingCenter}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Steps List with smooth layout motion */}
      <motion.div layout className="space-y-6">
        <AnimatePresence mode="popLayout">
          {displaySteps.map((step) => (
            <motion.div
              key={step.stepNumber}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <TimelineStep
                step={step}
                completedTasks={completedTasks}
                onToggleTask={onToggleTask}
                isCurrentStep={activeStepFilter === step.stepNumber}
                onSelectStep={(num) => setActiveStepFilter(num)}
                selectedCountry={selectedCountry}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
