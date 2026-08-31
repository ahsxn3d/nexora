'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { PortalsSection } from '../components/PortalsSection';
import { CollegeList } from '../components/CollegeList';
import { Timeline } from '../components/Timeline';
import { RunwayCalculator } from '../components/RunwayCalculator';
import { CommonAppHelper } from '../components/CommonAppHelper';
import { ScrollExperience } from '../components/ScrollExperience';
import { AICounselorDrawer } from '../components/AICounselorDrawer';
import { useLenis } from '../context/LenisContext';
import { TIMELINE_STEPS } from '../data/roadmapData';
import { DEFAULT_COUNTRIES } from '../data/countryProfiles';
import { CountryPlanData } from '../types';
import { Interactive3DFluidBackground } from '../components/Interactive3DFluidBackground';
import { GraduationCap } from 'lucide-react';

export default function HomePage() {
  const { scrollTo } = useLenis();
  const [mounted, setMounted] = useState(false);

  // Local storage for selected country profile
  const [selectedCountry, setSelectedCountry] = useState<CountryPlanData>(DEFAULT_COUNTRIES[0]);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Local storage for persistence of tasks, portals, and favorite colleges
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    '1-Complete Khan Academy Digital SAT Math diagnostic',
  ]);

  const [completedPortals, setCompletedPortals] = useState<string[]>([
    'khan-academy',
  ]);

  const [favoriteColleges, setFavoriteColleges] = useState<string[]>([
    'berea',
    'amherst',
    'dartmouth',
  ]);

  const [activeSection, setActiveSection] = useState<string>('portals-section');

  // Load from local storage once client mounts
  useEffect(() => {
    setMounted(true);
    try {
      const savedCountry = localStorage.getItem('f1_roadmap_selected_country');
      if (savedCountry) setSelectedCountry(JSON.parse(savedCountry));

      const savedTasks = localStorage.getItem('f1_roadmap_completed_tasks');
      if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));

      const savedPortals = localStorage.getItem('f1_roadmap_completed_portals');
      if (savedPortals) setCompletedPortals(JSON.parse(savedPortals));

      const savedFavs = localStorage.getItem('f1_roadmap_fav_colleges');
      if (savedFavs) setFavoriteColleges(JSON.parse(savedFavs));
    } catch {
      // fallback to initial states
    }
  }, []);

  // Save changes to localStorage after mounting
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('f1_roadmap_selected_country', JSON.stringify(selectedCountry));
    } catch {
      // ignore
    }
  }, [selectedCountry, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('f1_roadmap_completed_tasks', JSON.stringify(completedTasks));
    } catch {
      // ignore
    }
  }, [completedTasks, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('f1_roadmap_completed_portals', JSON.stringify(completedPortals));
    } catch {
      // ignore
    }
  }, [completedPortals, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('f1_roadmap_fav_colleges', JSON.stringify(favoriteColleges));
    } catch {
      // ignore
    }
  }, [favoriteColleges, mounted]);

  // Scroll spy to automatically update active section on scroll
  useEffect(() => {
    const sectionIds = [
      'portals-section',
      'colleges-section',
      'timeline-section',
      'runway-tools-section',
      'common-app-helper-section',
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleTogglePortal = (portalId: string) => {
    setCompletedPortals((prev) =>
      prev.includes(portalId) ? prev.filter((id) => id !== portalId) : [...prev, portalId]
    );
  };

  const handleToggleFavoriteCollege = (collegeId: string) => {
    setFavoriteColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    );
  };

  const handleResetTasks = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset all roadmap tasks to initial state?')) {
      setCompletedTasks([]);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollTo(`#${sectionId}`, { offset: -75, duration: 1.2 });
  };

  const totalChecklistItems = TIMELINE_STEPS.reduce(
    (acc, step) => acc + step.keyChecklist.length,
    0
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#FAF7F0] via-[#EFE7DA] via-[#FAF6ED] to-[#ECE2D2] text-[#221A14] font-sans-ui selection:bg-[#E2D5BE] selection:text-[#221A14] overflow-hidden">
      {/* Interactive Straight Grid & Magnetic Nodes Canvas */}
      <Interactive3DFluidBackground />

      {/* Scroll Experience: Top Lenis Progress & Floating Quick Jump */}
      <ScrollExperience
        activeSection={activeSection}
        onNavigate={handleNavigate}
        selectedCountry={selectedCountry}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* AI Counselor Drawer */}
      <AICounselorDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />

      {/* Container constraint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Navigation & Hero Banner */}
        <Header
          totalTasks={totalChecklistItems}
          completedTasksCount={completedTasks.length}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onOpenAIChat={() => setIsAIChatOpen(true)}
        />

        {/* Section 1: Official Clickable Portals with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <PortalsSection
            completedPortals={completedPortals}
            onToggleComplete={handleTogglePortal}
          />
        </motion.div>

        {/* Section 2: Top Target Colleges (100% Full Need Met) with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <CollegeList
            favoriteColleges={favoriteColleges}
            onToggleFavorite={handleToggleFavoriteCollege}
          />
        </motion.div>

        {/* Section 3: The 5-Step Step-by-Step Pathway with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Timeline
            completedTasks={completedTasks}
            onToggleTask={handleToggleTask}
            onResetTasks={handleResetTasks}
            selectedCountry={selectedCountry}
          />
        </motion.div>

        {/* Section 4: Freelance Runway & Upfront Budget Calculator with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <RunwayCalculator selectedCountry={selectedCountry} />
        </motion.div>

        {/* Section 5: Common App Activity Formatter & Arrival Playbook with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <CommonAppHelper />
        </motion.div>

        {/* Footer with Scroll Trigger */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 pt-8 border-t border-[#DECDBA] text-center text-xs text-[#6B5A4B] space-y-2"
        >
          <div className="flex items-center justify-center gap-2 font-bold text-[#221A14]">
            <GraduationCap className="w-4 h-4 text-[#8C6328]" />
            <span>F-1 Visa & 100% Need-Met US College Roadmap</span>
          </div>
          <p className="max-w-xl mx-auto text-[#5C4D3E] leading-relaxed">
            Crafted for ambitious international students pursuing undergraduate degrees in the United States with full institutional aid, zero loans, and dedicated campus work-study.
          </p>
          <div className="text-[11px] text-[#8A7969] pt-2">
            Common App • Berea Direct • College Board • Khan Academy • CSS Profile • Duolingo English Test • SEVIS I-901 • CEAC DS-160
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
