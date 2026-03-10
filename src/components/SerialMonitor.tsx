import React, { useEffect, useRef } from 'react';
import { Terminal, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SerialMonitorProps {
    logs: { timestamp: number; message: string }[];
    isSimulating: boolean;
    onStop: () => void;
}

export const SerialMonitor: React.FC<SerialMonitorProps> = ({ logs, isSimulating, onStop }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (!isSimulating) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0a0a0a] border border-slate-700/50 rounded-lg flex flex-col overflow-hidden shadow-2xl"
        >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-neon-cyan" />
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-300">VIRTUAL SERIAL MONITOR</span>
                    <span className="ml-2 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        BAUD 115200
                    </span>
                </div>
                <button
                    onClick={onStop}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors font-mono"
                >
                    <StopCircle size={14} /> Stop
                </button>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 p-3 overflow-y-auto font-mono text-xs bg-[#0a0a0a] text-slate-300 space-y-1"
            >
                <AnimatePresence>
                    {logs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                        >
                            <span className="text-slate-600 shrink-0">
                                {new Date(log.timestamp).toISOString().substring(11, 23)} -{">"}
                            </span>
                            <span className="break-words text-green-400">{log.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="text-slate-500 animate-pulse mt-2">_</div>
            </div>
        </motion.div>
    );
};
