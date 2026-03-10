import React, { useState } from 'react';
import { Shield, Chrome, Cpu, Activity, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithGoogle } from '../utils/firebase';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please verify your configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full landing-radial-bg text-slate-200 overflow-hidden flex flex-col items-center justify-center py-20 px-6 font-sans">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 243, 255, 0.4)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles (Cyber UI feel) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: [null, Math.random() * -100 - 50] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative group">
          {/* Glass Card Backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 flex flex-col items-center space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Logo/Icon Area */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative p-5 bg-slate-900 border border-cyan-500/30 rounded-2xl">
                <Shield size={40} className="text-cyan-400" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Cpu size={18} className="text-fuchsia-400 opacity-60" />
              </motion.div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Secure Login</h2>
              <p className="text-slate-400 text-sm font-medium">Accessing Project Sim-Circuit Command Center</p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="w-full space-y-4">
              <button 
                onClick={handleLogin}
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-4 py-4 bg-white text-slate-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:grayscale disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Activity size={20} />
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Chrome size={20} />
                      <span>Sign in with Google</span>
                    </div>
                  )}
                </AnimatePresence>
                
                {/* Micro animation for button */}
                <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <div className="px-4 py-3 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400 text-[10px] font-mono text-center empty:hidden">
                {error}
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em]">
               <Lock size={10} />
               <span>Encrypted Terminal Access</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
            <div className="text-white/20 font-bold italic tracking-tighter text-sm uppercase">SIM-CIRCUIT Authentication v1.2</div>
        </div>
      </motion.div>

      {/* Glassmorphism Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
