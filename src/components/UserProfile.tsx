import React, { useState } from 'react';
import { LogOut, User as UserIcon, ChevronDown, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { User } from 'firebase/auth';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="group flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
      >
        <div className="relative">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || "User"} className="w-6 h-6 rounded-full border border-cyan-500/50 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-cyan-500/50">
              <UserIcon size={12} className="text-cyan-400" />
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black animate-pulse"></div>
        </div>
        <span className="hidden sm:inline text-[10px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider">
          {user.displayName?.split(' ')[0] || 'Member'}
        </span>
        <ChevronDown size={12} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-[120]"
            >
              <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Authorized User</p>
                <p className="text-xs font-bold text-slate-200 truncate mt-1">{user.displayName || 'Architect'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
              <div className="p-1.5">
                <button 
                  onClick={() => {
                      window.open(`https://myaccount.google.com/`, '_blank');
                      setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-cyan-400 transition-all text-xs text-left group/item"
                >
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover/item:bg-cyan-500/10 transition-colors">
                    <UserCircle size={14} />
                  </div>
                  View Profile
                </button>
                <button 
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-xs text-left group/item"
                >
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover/item:bg-red-500/10 transition-colors">
                    <LogOut size={14} />
                  </div>
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
