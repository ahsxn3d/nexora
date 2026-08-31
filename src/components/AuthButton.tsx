'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, User, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthButton: React.FC = () => {
  const { user, isAuthenticated, openAuthModal, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <motion.button
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={openAuthModal}
        id="masthead-sign-in-btn"
        className="flex items-center gap-2 bg-[#2D2117] hover:bg-[#3D2E22] text-[#FAF6EE] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#D4A949]/60 shadow-deep-sm cursor-pointer text-xs font-bold whitespace-nowrap transition-colors"
      >
        <LogIn className="w-3.5 h-3.5 text-[#E6C678]" />
        <span>Sign In</span>
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        id="masthead-user-profile-btn"
        className="flex items-center gap-2 bg-[#261C14] hover:bg-[#36271D] text-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#8C6328]/70 shadow-deep-sm cursor-pointer text-xs font-semibold whitespace-nowrap transition-colors"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-5 h-5 rounded-full object-cover border border-[#D4A949]"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-[#D4A949] text-[#1C1510] flex items-center justify-center font-bold text-[10px]">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="max-w-[100px] truncate">{user.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#A69380]" />
      </motion.button>

      {/* User Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-[#1C1510] border border-[#48372A] rounded-2xl p-3 shadow-deep-xl z-50 text-xs"
          >
            <div className="px-2 py-1.5 border-b border-[#3A2E24] mb-2">
              <p className="font-bold text-[#FAF6EE] truncate">{user.name}</p>
              <p className="text-[11px] text-[#A69380] truncate">{user.email}</p>
              <div className="inline-flex items-center gap-1 text-[10px] text-[#7BD492] font-semibold mt-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Single-Scholar Dashboard</span>
              </div>
            </div>

            <button
              onClick={() => {
                signOut();
                setDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[#E58888] hover:bg-[#2D1B1B] hover:text-[#FFAAAA] font-semibold transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
