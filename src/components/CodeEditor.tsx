import React from 'react';
import { Code, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
    code: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border border-slate-700/50 rounded-lg overflow-hidden font-mono shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Code size={14} className="text-emerald-400" />
                    <span>firmware.ino</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-1 hover:bg-white/5 rounded transition-colors text-slate-500 hover:text-slate-300"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
            </div>
            <div className="flex-1 overflow-auto p-4 text-[11px] leading-relaxed text-slate-300 relative group">
                <pre>
                    <code>{code || '// Architecting firmware...'}</code>
                </pre>
                
                {/* Syntax highlighting markers (mock) */}
                <div className="absolute top-0 left-0 w-12 h-full bg-[#1e1e1e] border-r border-white/5 flex flex-col items-center pt-4 text-[#858585] select-none text-[10px]">
                  {code.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <style dangerouslySetInnerHTML={{ __html: `
                  pre { padding-left: 3.5rem; }
                  code {
                    color: #d4d4d4;
                  }
                  .keyword { color: #569cd6; }
                  .function { color: #dcdcaa; }
                  .string { color: #ce9178; }
                `}} />
            </div>
            
            <div className="px-4 py-1.5 bg-[#007acc] text-[10px] text-white font-bold flex items-center justify-between uppercase tracking-tighter">
                <span>UTF-8</span>
                <span>C++ / Arduino</span>
            </div>
        </div>
    );
};
