'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, UserCheck, Sparkles, Key, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NexoraLogo } from './NexoraLogo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInPersonal, signInWithGoogle } = useAuth();
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  if (!isAuthModalOpen) return null;

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInPersonal(candidateName || 'Ahsan', candidateEmail || 'ahsan@nexora.app');
  };

  const handleGoogleOAuth = () => {
    signInWithGoogle();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 25 }}
          className="relative w-full max-w-md bg-[#1C1510] text-[#FAF6EE] rounded-3xl border border-[#48372A] p-6 sm:p-8 shadow-deep-xl overflow-hidden z-10"
        >
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A949]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#44624A]/15 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-[#A69380] hover:text-[#FAF6EE] p-1.5 rounded-full hover:bg-[#2E2219] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-3">
              <NexoraLogo size="sm" variant="light" showTagline={false} />
            </div>
            <h3 className="text-xl font-bold text-[#FAF6EE] font-serif-heading">
              Personal Scholar Access
            </h3>
            <p className="text-xs text-[#C0B29F] mt-1 max-w-xs">
              Sign in to save your 100% need-met college list, SAT roadmap checklist, and F-1 visa timeline.
            </p>
          </div>

          {/* Sign In Options */}
          <div className="space-y-4">
            {/* Google Sign-in Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleOAuth}
              className="w-full flex items-center justify-center gap-3 bg-[#FAF6EE] hover:bg-[#FFFFFF] text-[#1C1510] font-semibold py-3 px-4 rounded-xl shadow-deep-sm transition-all border border-[#FAF6EE]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </motion.button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#3A2E24] w-full" />
              <span className="bg-[#1C1510] px-3 text-[11px] text-[#A69380] uppercase tracking-wider font-semibold">
                Or Direct Single-User Access
              </span>
            </div>

            {/* Quick 1-Click Form */}
            <form onSubmit={handlePersonalSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4C4B0] mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahsan"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-[#271E17] border border-[#48372A] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6EE] placeholder-[#8A7969] focus:outline-none focus:border-[#D4A949]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4C4B0] mb-1">
                  Target Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. scholar@nexora.app"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full bg-[#271E17] border border-[#48372A] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6EE] placeholder-[#8A7969] focus:outline-none focus:border-[#D4A949]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4A949] to-[#8C6328] hover:from-[#E2BA5A] hover:to-[#9E7230] text-[#1C1510] font-bold py-2.5 px-4 rounded-xl shadow-deep-sm transition-all text-xs cursor-pointer mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Launch Personal Dashboard</span>
              </motion.button>
            </form>

            {/* Config Note Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowConfigGuide(!showConfigGuide)}
                className="text-[11px] text-[#A69380] hover:text-[#D4A949] flex items-center gap-1.5 mx-auto transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>How to set Google Client ID & Gemini API Key?</span>
              </button>

              {showConfigGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-[#261D16] border border-[#433427] rounded-xl text-[11px] text-[#C0B29F] space-y-1.5"
                >
                  <p className="font-semibold text-[#FAF6EE]">Stored in your local environment (.env.local):</p>
                  <p>• <code className="text-[#E6C678] bg-[#18110B] px-1 py-0.5 rounded">DATABASE_URL=...</code> (Neon PostgreSQL connection)</p>
                  <p>• <code className="text-[#E6C678] bg-[#18110B] px-1 py-0.5 rounded">GOOGLE_CLIENT_ID=...</code> & <code className="text-[#E6C678] bg-[#18110B] px-1 py-0.5 rounded">GOOGLE_CLIENT_SECRET=...</code></p>
                  <p>• <code className="text-[#E6C678] bg-[#18110B] px-1 py-0.5 rounded">GEMINI_API_KEY=...</code></p>
                  <p className="text-[10px] text-[#7BD492] pt-1">✨ Sessions are saved persistently on this device for 1 full year.</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
