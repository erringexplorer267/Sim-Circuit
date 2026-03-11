import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { SimulationWorkspace } from './components/SimulationWorkspace';
import { useOrchestrator } from './hooks/useOrchestrator';
import { AnimatePresence, motion } from 'framer-motion';
import { auth, logout } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

type ViewState = 'landing' | 'simulator';

function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = loading
  const [view, setView] = useState<ViewState>('landing');
  const [prompt, setPrompt] = useState('');
  const orchestrator = useOrchestrator();
  const { stage, isSimulating, startOrchestration } = orchestrator;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    startOrchestration(prompt);
  };

  const handleLogout = async () => {
    await logout();
    setView('landing');
  };

  if (user === undefined) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-cyan-500/20 rounded-full animate-spin border-t-cyan-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_#00f3ff]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AnimatePresence>
        <AuthPage onSuccess={() => {}} />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative w-screen min-h-screen bg-black text-slate-200 overflow-y-auto font-sans">
      
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen z-[100]"
          >
            <LandingPage onLaunch={() => setView('simulator')} user={user} onLogout={handleLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col w-full h-screen overflow-hidden"
          >
            <SimulationWorkspace orchestrator={orchestrator} user={user} onLogout={handleLogout} />

            {/* Top/Bottom Prompt Input */}
            <div className={`fixed bottom-8 sm:top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm sm:max-w-xl px-4 transition-all duration-700 ease-in-out ${isSimulating ? 'opacity-0 pointer-events-none translate-y-20 sm:-translate-y-10' : 'opacity-100 translate-y-0'}`}>
              <form onSubmit={handleSubmit} className="relative w-full group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex items-center bg-slate-900/95 backdrop-blur-2xl border border-white/10 sm:border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-1.5 pl-4 transition-all focus-within:border-neon-cyan/50 focus-within:shadow-[0_0_30px_rgba(0,243,255,0.15)]
                  max-sm:border-neon-cyan/40 max-sm:shadow-[0_0_20px_rgba(0,243,255,0.15)]
                ">
                  <Sparkles size={16} className="text-neon-cyan mr-3 shrink-0 animate-pulse" />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={stage !== 'IDLE' && stage !== 'COMPLETE'}
                    placeholder="Simulate your visuals..."
                    className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-xs sm:text-sm py-2 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={(stage !== 'IDLE' && stage !== 'COMPLETE') || !prompt.trim()}
                    className="px-4 sm:px-6 py-2.5 ml-2 bg-gradient-to-r from-neon-cyan to-neon-magenta text-white font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale shadow-lg shadow-neon-cyan/40 max-sm:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                  >
                    Architect
                  </button>
                </div>
              </form>
            </div>
            
            {/* Back to Landing (Subtle) */}
            <button 
              onClick={() => setView('landing')}
              className={`fixed top-4 left-4 z-[70] px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] uppercase tracking-tighter hover:bg-white/10 transition-all ${isSimulating ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'}`}
            >
              Exit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
