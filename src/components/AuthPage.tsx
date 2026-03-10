import React, { useState } from 'react';
import { Shield, Cpu, Activity, Lock } from 'lucide-react';
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
    <div className="relative min-h-screen w-full landing-radial-bg text-slate-200 overflow-y-auto flex flex-col items-center justify-center py-20 px-6 font-sans">
      
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
          <div className="relative bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 flex flex-col items-center space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Logo/Icon Area */}
            <div className="relative mb-4">
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
                className="group relative w-full flex items-center justify-center gap-4 py-4 bg-white text-slate-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 disabled:grayscale disabled:opacity-50"
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
                      {/* Original Google Logo */}
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Sign in with Google</span>
                    </div>
                  )}
                </AnimatePresence>
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
            <div className="text-white/20 font-bold italic tracking-tighter text-sm uppercase">SIM-CIRCUIT Authentication by Uttiyo</div>
        </div>
      </motion.div>

      {/* Glassmorphism Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
