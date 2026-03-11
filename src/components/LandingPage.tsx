import React, { useState } from 'react';
import { 
  Cpu, 
  ChevronRight, 
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCard } from './FeatureCard';
import { UserProfile } from './UserProfile';
import type { User } from 'firebase/auth';

interface LandingPageProps {
  onLaunch: () => void;
  user: User;
  onLogout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch, user, onLogout }) => {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onLaunch();
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  } as any;

  return (
    <div className="relative min-h-screen w-full landing-radial-bg text-slate-200 overflow-x-hidden flex flex-col items-center justify-center py-20 px-6 font-sans">
      
      {/* Top Header for Landing */}
      <div className="fixed top-6 right-6 z-[110]">
        <UserProfile user={user} onLogout={onLogout} />
      </div>
      
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

      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-0 m-0"
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-[100vw] h-[100vh] bg-cyan-400/10 blur-[40px] rounded-full" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-24"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Activity size={14} className="animate-pulse" />
            <span>Project Sim-Circuit Beta</span>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
            <span className="block italic">Design Hardware.</span>
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Execute Logic.</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-lg leading-relaxed font-light">
            The World's First Generative Digital Twin for ECE. Engineer circuit architectures from prompt to production in seconds.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex justify-center pb-20">
          
          {/* Card 1: Flagship */}
          <FeatureCard 
            title="Generative Digital Twin"
            description="Our primary neural engine that generates fully-simulatable circuit diagrams from natural language specifications."
            icon={Cpu}
            isFunctional
            color="#00f3ff"
            className="w-full max-w-2xl min-h-[400px]"
          >
            <div className="flex flex-col h-full justify-end">
              <div className="mb-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f3ff]" />
                  <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">Live Simulation Active</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00f3ff]"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleLaunch}
                className="group relative w-full flex items-center justify-center gap-3 py-5 bg-cyan-500 text-slate-950 font-black text-xl rounded-2xl hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] active:scale-95"
              >
                <span>Launch Simulation</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </FeatureCard>
        </div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center pt-20 border-t border-white/10 space-y-4">
           <div className="text-2xl md:text-4xl font-bold bg-white/20 bg-clip-text text-transparent italic tracking-tightest">SIM-CIRCUIT.EXE</div>
           <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.5em]">
              The Hardware Operating System
           </p>
        </motion.div>
      </motion.div>

      {/* Glassmorphism Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
