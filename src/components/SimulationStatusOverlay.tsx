import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Info, Zap } from 'lucide-react';

interface SimulationStatusOverlayProps {
  isSimulating: boolean;
  simStatus: string;
}

export const SimulationStatusOverlay: React.FC<SimulationStatusOverlayProps> = ({ isSimulating, simStatus }) => {
  return (
    <AnimatePresence>
      {isSimulating && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[90%] md:w-auto"
        >
          <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3 md:p-4 shadow-2xl shadow-emerald-500/10 min-w-0 md:min-w-[320px] max-w-[500px]">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">Live Simulation</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-slate-200 text-sm font-medium leading-relaxed">
                  {simStatus}
                </p>
                
                <div className="mt-3 flex items-center gap-3">
                    <div className="bg-slate-800 p-1 rounded-md">
                        <Zap className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-emerald-500"
                            animate={{ width: ["10%", "90%", "40%", "80%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Info className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] text-slate-500 font-mono">Telemetry</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
