'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UPFRONT_EXPENSES } from '../data/roadmapData';
import { 
  Calculator, 
  Coins, 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  Circle,
  PiggyBank,
  ArrowUpRight,
  Plane,
  Sparkles,
  Globe
} from 'lucide-react';
import { CountryPlanData } from '../types';

interface RunwayCalculatorProps {
  selectedCountry?: CountryPlanData;
}

export const RunwayCalculator: React.FC<RunwayCalculatorProps> = ({ selectedCountry }) => {
  const [expenses, setExpenses] = useState(UPFRONT_EXPENSES);
  const [freelanceProjectsDone, setFreelanceProjectsDone] = useState<number>(4);
  const [avgProjectRate, setAvgProjectRate] = useState<number>(450);
  const [campusHourlyRate, setCampusHourlyRate] = useState<number>(15);
  const [campusHoursPerWeek, setCampusHoursPerWeek] = useState<number>(16);

  const exchangeRate = selectedCountry?.usdExchangeRate || 1;
  const currencySymbol = selectedCountry?.currencySymbol || '$';
  const currencyCode = selectedCountry?.currencyCode || 'USD';

  const toggleExpensePaid = (id: string) => {
    setExpenses(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const totalRequiredRunway = expenses.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalPaidRunway = expenses.filter(i => i.isCompleted).reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalFreelanceSaved = freelanceProjectsDone * avgProjectRate;
  const runwayProgress = Math.min(100, Math.round((totalFreelanceSaved / totalRequiredRunway) * 100));

  // Campus job monthly cashflow (4.33 weeks in a month)
  const campusMonthlyEarnings = Math.round(campusHourlyRate * campusHoursPerWeek * 4.33);

  const formatLocal = (usdAmount: number) => {
    const local = usdAmount * exchangeRate;
    if (exchangeRate === 1) return `$${usdAmount.toLocaleString()}`;
    return `${currencySymbol} ${Math.round(local).toLocaleString()}`;
  };

  return (
    <section id="runway-tools-section" className="mb-14 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#855D1C] bg-[#EFE6D5] px-3 py-1 rounded-full border border-[#DAC9B0] shadow-deep-sm whitespace-nowrap">
              <Coins className="w-3.5 h-3.5 text-[#855D1C]" />
              Financial Independence Engine
            </span>
            {selectedCountry && (
              <span className="inline-flex items-center gap-1 text-xs text-[#2B5731] font-bold bg-[#DFEBDC] px-2.5 py-0.5 rounded-full border border-[#BED7BA] whitespace-nowrap shadow-deep-sm">
                <Globe className="w-3 h-3 text-[#2B5731]" />
                {selectedCountry.flagEmoji} {currencyCode} ({currencySymbol}) Forex Active
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#221A14] font-serif-heading">
            Freelance Runway & Cashflow Calculator
          </h2>
          <p className="text-sm text-[#5C4D3E] max-w-3xl mt-1 leading-relaxed">
            Track your ~${(2300).toLocaleString()} USD ({formatLocal(2300)}) upfront self-funded testing, visa filing, and airfare reserves alongside your future on-campus student employment cashflow ($750–$900/month).
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Itemized Upfront Expenses */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 liquid-glass-card rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E3D6C4]">
              <div>
                <h3 className="text-lg font-bold text-[#221A14] font-serif-heading">
                  Upfront Cost Breakdown (~$2,300 Target)
                </h3>
                <p className="text-xs text-[#7A6A5A]">
                  Click items as you pay them from your freelance savings
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-[#221A14] font-mono block">
                  ${totalRequiredRunway} <span className="text-xs font-normal text-[#7A6959]">({formatLocal(totalRequiredRunway)})</span>
                </span>
                <p className="text-[11px] text-[#235831] font-bold">
                  Paid: ${totalPaidRunway} ({formatLocal(totalPaidRunway)})
                </p>
              </div>
            </div>

            {/* Expenses List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {expenses.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  id={`expense-item-${item.id}`}
                  onClick={() => toggleExpensePaid(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 shadow-deep-sm ${
                    item.isCompleted
                      ? 'bg-[#EAF3E7] border-[#BCD4BA] text-[#224A28]'
                      : 'bg-[#FDFBF7] border-[#DCCDBC] text-[#3D3126] hover:border-[#BFAF9A] hover:bg-[#F9F4EB]'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-[#235831] fill-[#DFEBDC]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#A19181]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold leading-tight truncate">{item.title}</h4>
                      <p className="text-[11px] text-[#7A6959] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#EDE4D5] text-[#221A14] border border-[#D5C6B1] whitespace-nowrap block">
                      ${item.estimatedCost}
                    </span>
                    {exchangeRate !== 1 && (
                      <span className="text-[10px] text-[#7A6959] font-mono block mt-0.5">
                        {formatLocal(item.estimatedCost)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Freelance Savings Simulator Bar */}
          <div className="bg-[#F3EADB] border border-[#DCCDBC] rounded-xl p-4 mt-2 shadow-deep-sm">
            <div className="flex items-center justify-between text-xs font-bold text-[#221A14] mb-2">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <PiggyBank className="w-4 h-4 text-[#8C6328]" />
                Freelance Web Dev Runway Progress
              </span>
              <span className="font-mono text-[#235831] font-bold whitespace-nowrap">
                ${totalFreelanceSaved} / ${totalRequiredRunway} ({runwayProgress}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#E2D6C5] rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-[#8C6328] transition-all duration-500 rounded-full"
                style={{ width: `${runwayProgress}%` }}
              />
            </div>

            {/* Sliders for Projects & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <div className="flex justify-between mb-1 text-[#5C4D3E]">
                  <span>Client Projects Completed:</span>
                  <span className="font-bold text-[#221A14]">{freelanceProjectsDone} projects</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={freelanceProjectsDone}
                  onChange={(e) => setFreelanceProjectsDone(Number(e.target.value))}
                  className="w-full accent-[#221A14] h-1.5 bg-[#DCCDBA] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[#5C4D3E]">
                  <span>Avg Profit per Project:</span>
                  <span className="font-bold text-[#221A14]">${avgProjectRate} ({formatLocal(avgProjectRate)})</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={1000}
                  step={50}
                  value={avgProjectRate}
                  onChange={(e) => setAvgProjectRate(Number(e.target.value))}
                  className="w-full accent-[#221A14] h-1.5 bg-[#DCCDBA] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right 1 Col: Campus Job Cashflow Projection */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-card rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#235831] bg-[#DFEBDC] px-2.5 py-0.5 rounded-full border border-[#BED7BA] flex items-center gap-1 shadow-deep-sm whitespace-nowrap">
                <Briefcase className="w-3 h-3 text-[#235831]" />
                On-Campus Employment
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#221A14] font-serif-heading mb-1">
              Campus Work Cashflow
            </h3>
            <p className="text-xs text-[#5C4D3E] mb-4 leading-relaxed">
              International F-1 students can legally work up to 20 hours/week on campus during active semesters, providing steady pocket money.
            </p>

            {/* Monthly Projection Callout */}
            <div className="bg-[#F4EDE0] border border-[#DCCDBC] rounded-xl p-4 mb-4 text-center shadow-deep-sm">
              <span className="text-xs text-[#7A6A5A] font-bold uppercase tracking-wider block mb-0.5">
                Projected Monthly Pocket Cash
              </span>
              <span className="text-3xl font-extrabold text-[#221A14] font-mono block">
                ${campusMonthlyEarnings}
              </span>
              <span className="text-xs text-[#7A6A5A] block mt-0.5">
                ({formatLocal(campusMonthlyEarnings)} / month)
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-3 text-xs mb-4">
              <div>
                <div className="flex justify-between mb-1 text-[#5C4D3E]">
                  <span>Hourly Wage:</span>
                  <span className="font-bold text-[#221A14]">${campusHourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={20}
                  value={campusHourlyRate}
                  onChange={(e) => setCampusHourlyRate(Number(e.target.value))}
                  className="w-full accent-[#235831] h-1.5 bg-[#DCCDBA] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[#5C4D3E]">
                  <span>Hours per Week (F-1 Max 20hr):</span>
                  <span className="font-bold text-[#221A14]">{campusHoursPerWeek} hrs/week</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={20}
                  value={campusHoursPerWeek}
                  onChange={(e) => setCampusHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-[#235831] h-1.5 bg-[#DCCDBA] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Campus Roles */}
            <div className="text-[11px] text-[#554637] space-y-1 bg-[#F4EDE0] p-3 rounded-xl border border-[#DCCDBC] shadow-deep-sm">
              <p className="font-bold text-[#221A14]">Recommended Student Roles:</p>
              <p>• Computer Science Lab & Teaching Assistant</p>
              <p>• Campus Web & IT Helpdesk Technician</p>
              <p>• Athletic Center & Recreation Supervisor</p>
              <p>• Library Circulation & Archival Assistant</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3D6C4] text-[11px] text-[#7A6A5A] italic mt-3">
            💡 Enables SSN acquisition & opening US checking account.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
