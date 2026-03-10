import React from 'react';
import { Terminal, Code, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOMTable, type BOMItem } from './BOMTable';

interface AgentTerminalProps {
    stage: string;
    logs: { role: string; content: string; timestamp: number }[];
    scoutData: BOMItem[];
    firmwareCode: string;
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({ stage, logs, scoutData, firmwareCode }) => {
    return (
        <div className="absolute right-6 top-24 bottom-6 w-96 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-all duration-300">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <Terminal size={18} className="text-neon-cyan" />
                <h2 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">Orchestrator</h2>
                <div className="ml-auto flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
                <AnimatePresence>
                    {logs.map((log, idx) => (
                        <motion.div
                            key={log.timestamp + idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-2 items-start"
                        >
                            <span className="text-slate-500 shrink-0">
                                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                            <div className="flex-1">
                                <span className={`font-bold mr-2 ${log.role === 'Architect' ? 'text-violet-400' :
                                    log.role === 'Scout' ? 'text-blue-400' :
                                        log.role === 'Firmware' ? 'text-emerald-400' :
                                            'text-neon-cyan'
                                    }`}>
                                    [{log.role}]
                                </span>
                                <span className="text-slate-300">{log.content}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Dynamic Agent Data Displays */}
            <AnimatePresence>
                {(stage === 'SCOUT' || stage === 'FIRMWARE' || stage === 'COMPLETE') && scoutData.length > 0 && (
                    <BOMTable data={scoutData} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(stage === 'FIRMWARE' || stage === 'COMPLETE') && firmwareCode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="border-t border-slate-700/50 bg-slate-950 p-4 relative"
                    >
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest">
                            <Code size={14} /> FIRMWARE COMPILED
                        </div>
                        <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto bg-slate-900/50 p-3 rounded border border-slate-800 typewriter max-h-40 overflow-y-auto">
                            <code>{firmwareCode}</code>
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Status */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className={stage === 'COMPLETE' ? 'text-emerald-500' : 'text-slate-500'} />
                    VERIFICATION
                </span>
                <span className={stage === 'COMPLETE' ? 'text-emerald-500 animate-pulse font-bold' : 'text-amber-500 animate-pulse'}>
                    {stage === 'COMPLETE' ? 'SYSTEM READY' : 'PROCESSING...'}
                </span>
            </div>

        </div>
    );
};
