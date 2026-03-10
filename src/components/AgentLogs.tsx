import React from 'react';
import { Terminal, Cpu, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentLogsProps {
    logs: { role: string; content: string; timestamp: number }[];
}

export const AgentLogs: React.FC<AgentLogsProps> = ({ logs }) => {
    return (
        <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800/50 backdrop-blur-3xl overflow-hidden font-mono shadow-2xl relative">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100/5 border-b border-white/5">
                <Terminal size={14} className="text-neon-cyan" />
                <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">A.I. REASONING LOGS</h2>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>

            <div className="flex-1 overflow-auto p-4 text-[10px] space-y-4">
                <AnimatePresence>
                    {logs.map((log, idx) => (
                        <motion.div
                            key={log.timestamp + idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-1 border-l-2 border-slate-700 pl-3 py-1 bg-slate-800/20 group hover:border-neon-cyan transition-colors"
                        >
                            <div className="flex items-center justify-between opacity-50 mb-1">
                                <span className={`font-black ${
                                    log.role === 'Architect' ? 'text-violet-400' :
                                    log.role === 'Scout' ? 'text-blue-400' :
                                    log.role === 'Firmware' ? 'text-emerald-400' :
                                    'text-neon-cyan'
                                }`}>
                                    @{log.role.toUpperCase()}
                                </span>
                                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>
                            <div className="text-slate-300 leading-relaxed font-light break-words">
                                {log.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {logs.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full opacity-20 text-center space-y-4 filter grayscale">
                      <Cpu size={48} />
                      <p className="text-xs uppercase tracking-[0.2em] font-bold">Awaiting Input Prompt...</p>
                   </div>
                )}
            </div>
            
            <div className="p-4 bg-slate-950/50 border-t border-white/5">
                <div className="flex items-center gap-2 text-[8px] text-slate-500 uppercase tracking-widest">
                   <Info size={12} className="text-blue-500" />
                   <span>Multi-Agent System Online (v0.2.4)</span>
                </div>
            </div>
        </div>
    );
};
