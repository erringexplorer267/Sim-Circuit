import React from 'react';
import { Cpu, Zap, Download, FileJson } from 'lucide-react';

interface HeaderProps {
    stage: string;
    isSimulating: boolean;
    onRunSimulation: () => void;
    onExportImage: () => void;
    onExportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stage, isSimulating, onRunSimulation, onExportImage, onExportData }) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/50 backdrop-blur-md border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#00f3ff]/20 text-[#00f3ff]">
                    <Cpu size={24} />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] bg-clip-text text-transparent drop-shadow-md">
                    Sim-Circuit <span className="text-slate-500 font-normal text-xs ml-2">V2</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-mono text-slate-400 mr-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM ONLINE
                </div>

                {stage === 'COMPLETE' && (
                    <div className="flex items-center gap-2 mr-4 border-r border-slate-700 pr-4">
                        <button
                            onClick={onExportImage}
                            title="Export Image"
                            className="p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-neon-cyan transition-colors"
                        >
                            <Download size={18} />
                        </button>
                        <button
                            onClick={onExportData}
                            title="Export JSON"
                            className="p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-neon-cyan transition-colors"
                        >
                            <FileJson size={18} />
                        </button>
                    </div>
                )}

                <button
                    onClick={onRunSimulation}
                    disabled={stage !== 'COMPLETE' || isSimulating}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 hover:bg-[#00f3ff]/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:grayscale disabled:hover:shadow-none font-mono"
                >
                    <Zap size={16} className={isSimulating ? 'animate-pulse' : ''} />
                    {isSimulating ? 'Simulating...' : 'Run Simulation'}
                </button>
            </div>
        </header>
    );
};
