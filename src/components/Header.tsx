import React from 'react';
import { Cpu, Zap, Download, FileJson, Square } from 'lucide-react';
import { UserProfile } from './UserProfile';
import type { User } from 'firebase/auth';

interface HeaderProps {
    stage: string;
    isSimulating: boolean;
    onRunSimulation: () => void;
    onStopSimulation: () => void;
    onExportImage: () => void;
    onExportData: () => void;
    user: User;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
    stage, 
    isSimulating, 
    onRunSimulation, 
    onStopSimulation,
    onExportImage, 
    onExportData,
    user,
    onLogout
}) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-slate-950/50 backdrop-blur-md border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="p-1.5 md:p-2 rounded-lg bg-[#00f3ff]/20 text-[#00f3ff]">
                    <Cpu size={18} className="md:w-6 md:h-6" />
                </div>
                <h1 className="text-base md:text-xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] bg-clip-text text-transparent drop-shadow-md">
                    Sim-Circuit <span className="hidden sm:inline text-slate-500 font-normal text-xs ml-2">V2</span>
                </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:flex items-center gap-2 text-sm font-mono text-slate-400 mr-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM ONLINE
                </div>

                {stage === 'COMPLETE' && (
                    <div className="hidden md:flex items-center gap-1 md:gap-2 md:mr-4 md:border-r md:border-slate-700 md:pr-4">
                        <button
                            onClick={onExportImage}
                            title="Export Image"
                            className="p-1.5 md:p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-neon-cyan transition-colors"
                        >
                            <Download size={16} />
                        </button>
                        <button
                            onClick={onExportData}
                            title="Export JSON"
                            className="p-1.5 md:p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-neon-cyan transition-colors"
                        >
                            <FileJson size={16} />
                        </button>
                    </div>
                )}

                <button
                    onClick={isSimulating ? onStopSimulation : onRunSimulation}
                    disabled={stage !== 'COMPLETE'}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md border transition-all text-[10px] md:text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:grayscale disabled:hover:shadow-none font-mono relative right-1 md:right-0 ${
                        isSimulating 
                        ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                        : 'bg-[#00f3ff]/10 text-[#00f3ff] border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                    }`}
                >
                    {isSimulating ? (
                        <>
                            <Square size={14} fill="currentColor" className="animate-pulse" />
                            <span className="hidden xs:inline">Stop Simulation</span>
                            <span className="xs:hidden">Stop</span>
                        </>
                    ) : (
                        <>
                            <Zap size={14} />
                            <span className="hidden xs:inline">Run Simulation</span>
                            <span className="xs:hidden">Run</span>
                        </>
                    )}
                </button>

                <div className="md:ml-2">
                    <UserProfile user={user} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
};
