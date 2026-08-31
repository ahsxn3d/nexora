'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Laptop, 
  Cpu, 
  Shield, 
  Dumbbell, 
  Building, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight 
} from 'lucide-react';

export const CommonAppHelper: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Common App Activity items with strict character constraints
  const [roleTitle, setRoleTitle] = useState('Lead Full-Stack Web Developer & Founder');
  const [organization, setOrganization] = useState('Freelance Web Solutions & Open Source Dev');
  const [description, setDescription] = useState('Engineered modern React/Tailwind web apps for 15+ global clients. Generated $2.3k+ to self-fund academic testing & led local coding workshops.');

  const sampleActivities = [
    {
      category: 'Work (Paid) / Computer Science',
      role: 'Freelance Web Developer & UI Designer',
      org: 'Independent Client Development (Upwork/Direct)',
      desc: 'Built custom React/Tailwind web applications for international clients; earned $2,300+ to fund testing & visa runway. Managed full client lifecycle.',
      roleLen: 37,
      orgLen: 46,
      descLen: 147
    },
    {
      category: 'Community Service / Educational Outreach',
      role: 'Peer Coding Instructor & Mentor',
      org: 'Local Youth Technology Initiative (Lahore)',
      desc: 'Taught foundational Python and web development to 40+ high school students. Organized hackathons and guided novice programmers in git workflows.',
      roleLen: 33,
      orgLen: 42,
      descLen: 148
    },
    {
      category: 'Athletics: Club / Martial Arts',
      role: 'Wrestling & Martial Arts Practitioner',
      org: 'District Wrestling & Combat Sports Club',
      desc: 'Dedicated 8+ hrs/wk to competitive wrestling and strength conditioning. Built physical resilience, discipline, and sportsmanship across 3 years.',
      roleLen: 38,
      orgLen: 39,
      descLen: 146
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="common-app-helper-section" className="mb-14 scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#855D1C] bg-[#EFE6D5] px-3 py-1 rounded-full border border-[#DAC9B0] shadow-deep-sm whitespace-nowrap">
              <FileText className="w-3.5 h-3.5 text-[#855D1C]" />
              Strategic Application Tools
            </span>
            <span className="text-xs text-[#6B5A4B] font-semibold bg-[#EBE2D3] px-2.5 py-0.5 rounded-full border border-[#D5C6B1] whitespace-nowrap">
              Common App Activity Section Formatter & Arrival Protocol
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#221A14] font-serif-heading">
            Common App Activity Builder & Campus Arrival Playbook
          </h2>
          <p className="text-sm text-[#5C4D3E] max-w-3xl mt-1 leading-relaxed">
            Format your extracurricular coding projects to match Common App character restrictions (50 / 100 / 150 chars) and review your post-arrival packing & campus checklist.
          </p>
        </div>
      </div>

      {/* 2-Column Bento Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Common App Activity Interactive Formatter */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-card rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E3D6C4]">
              <h3 className="text-lg font-bold text-[#221A14] font-serif-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C6328]" />
                Activity Character Limit Validator
              </h3>
              <span className="text-[11px] font-bold text-[#554536] bg-[#EDE4D5] px-2.5 py-0.5 rounded-full border border-[#D5C6B1] shadow-deep-sm whitespace-nowrap">
                Common App Standard
              </span>
            </div>

            {/* Inputs with real-time character counters */}
            <div className="space-y-4 mb-6">
              {/* Position / Leadership Role (Max 50 chars) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-[#221A14] whitespace-nowrap">Position / Leadership Role</span>
                  <span className={`font-mono font-bold whitespace-nowrap ${roleTitle.length > 50 ? 'text-[#9E2A2B]' : 'text-[#7A6A5A]'}`}>
                    {roleTitle.length}/50 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={roleTitle}
                  maxLength={60}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border bg-[#FDFBF7] text-[#221A14] focus:outline-none focus:ring-2 transition-all shadow-deep-sm ${
                    roleTitle.length > 50 
                      ? 'border-[#9E2A2B] ring-[#9E2A2B]/20' 
                      : 'border-[#DCCDBC] focus:ring-[#8C6328]/30 focus:border-[#8C6328]'
                  }`}
                />
              </div>

              {/* Organization Name (Max 100 chars) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-[#221A14] whitespace-nowrap">Organization Name</span>
                  <span className={`font-mono font-bold whitespace-nowrap ${organization.length > 100 ? 'text-[#9E2A2B]' : 'text-[#7A6A5A]'}`}>
                    {organization.length}/100 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={organization}
                  maxLength={110}
                  onChange={(e) => setOrganization(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border bg-[#FDFBF7] text-[#221A14] focus:outline-none focus:ring-2 transition-all shadow-deep-sm ${
                    organization.length > 100 
                      ? 'border-[#9E2A2B] ring-[#9E2A2B]/20' 
                      : 'border-[#DCCDBC] focus:ring-[#8C6328]/30 focus:border-[#8C6328]'
                  }`}
                />
              </div>

              {/* Description (Max 150 chars) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-[#221A14] whitespace-nowrap">Activity Description & Impact</span>
                  <span className={`font-mono font-bold whitespace-nowrap ${description.length > 150 ? 'text-[#9E2A2B]' : 'text-[#7A6A5A]'}`}>
                    {description.length}/150 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  maxLength={165}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border bg-[#FDFBF7] text-[#221A14] focus:outline-none focus:ring-2 transition-all resize-none shadow-deep-sm ${
                    description.length > 150 
                      ? 'border-[#9E2A2B] ring-[#9E2A2B]/20' 
                      : 'border-[#DCCDBC] focus:ring-[#8C6328]/30 focus:border-[#8C6328]'
                  }`}
                />
              </div>
            </div>

            {/* Pre-written templates */}
            <div>
              <p className="text-xs font-bold text-[#221A14] uppercase tracking-wider mb-2.5">
                Ready-to-Use High-Impact Templates
              </p>
              <div className="space-y-2.5">
                {sampleActivities.map((act, idx) => (
                  <div key={idx} className="bg-[#F4EDE0] border border-[#DCCDBC] rounded-xl p-3.5 text-xs shadow-deep-sm">
                    <div className="flex flex-wrap items-center justify-between mb-1.5 gap-2">
                      <span className="font-bold text-[#221A14] truncate max-w-[240px]">{act.role}</span>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setRoleTitle(act.role);
                          setOrganization(act.org);
                          setDescription(act.desc);
                          handleCopy(`${act.role}\n${act.org}\n${act.desc}`, idx);
                        }}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-[#221A14] hover:text-[#000000] bg-[#EAE0D0] hover:bg-[#DCD0BC] px-3 py-1.5 rounded-xl border border-[#D5C6B1] hover:border-[#BFAF98] shadow-deep-sm transition-all cursor-pointer shrink-0 whitespace-nowrap"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#235831]" />
                            <span className="text-[#235831]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#7A6959]" />
                            <span>Load Template</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                    <p className="text-[#7A6A5A] font-semibold text-[11px] mb-1 truncate">{act.org}</p>
                    <p className="text-[#524436] leading-snug">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Campus Arrival & Lifestyle Playbook */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-card rounded-3xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E3D6C4]">
              <h3 className="text-lg font-bold text-[#221A14] font-serif-heading flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#221A14]" />
                Campus Arrival & Logistics Protocol
              </h3>
              <span className="text-[11px] font-bold text-[#235831] bg-[#DFEBDC] px-2.5 py-0.5 rounded-full border border-[#BED7BA] shadow-deep-sm whitespace-nowrap">
                Step 5 Master Plan
              </span>
            </div>

            <div className="space-y-4">
              {/* PC Parts in Carry-on Guide */}
              <div className="bg-[#F4EDE0] border border-[#DCCDBC] rounded-xl p-4 shadow-deep-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#221A14] text-[#FAF6EE] flex items-center justify-center shrink-0 shadow-deep-sm">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221A14] uppercase tracking-wider">
                      Hardware Packing Protocol
                    </h4>
                    <p className="text-xs text-[#524436] leading-relaxed mt-1">
                      Pack your high-value PC parts (<span className="font-bold text-[#221A14]">GPU, NVMe SSDs, RAM sticks, CPU</span>) strictly in your <span className="font-bold text-[#235831]">carry-on baggage</span> inside anti-static packaging. Never put heavy computer monitors or bulky cases in checked luggage — order a cheap monitor and case on Amazon or university buy/sell groups upon arrival.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Banking Guide */}
              <div className="bg-[#F4EDE0] border border-[#DCCDBC] rounded-xl p-4 shadow-deep-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#204060] text-[#FAF6EE] flex items-center justify-center shrink-0 shadow-deep-sm">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221A14] uppercase tracking-wider">
                      Banking: Chase or Bank of America
                    </h4>
                    <p className="text-xs text-[#524436] leading-relaxed mt-1">
                      Within your first week, visit a local branch of <span className="font-bold text-[#221A14]">Chase (College Checking)</span> or <span className="font-bold text-[#221A14]">Bank of America (Advantage Banking)</span>. Bring your Passport, Form I-20, and Student ID to establish a $0-fee account, debit card, and direct deposit for your campus job.
                    </p>
                  </div>
                </div>
              </div>

              {/* Physical Conditioning & Wrestling */}
              <div className="bg-[#F4EDE0] border border-[#DCCDBC] rounded-xl p-4 shadow-deep-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#7A4F16] text-[#FAF6EE] flex items-center justify-center shrink-0 shadow-deep-sm">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221A14] uppercase tracking-wider">
                      Campus Athletics & Wrestling Routine
                    </h4>
                    <p className="text-xs text-[#524436] leading-relaxed mt-1">
                      US liberal arts colleges feature world-class, free athletics centers. Integrate into the <span className="font-bold text-[#221A14]">wrestling club, martial arts dojo, or strength training facilities</span> to maintain peak physical vitality and mental discipline throughout your undergraduate journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3D6C4] text-[11px] text-[#7A6A5A] italic mt-4 flex items-center justify-between">
            <span>🛡️ All liberal arts facilities are 100% free for matriculated students.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
