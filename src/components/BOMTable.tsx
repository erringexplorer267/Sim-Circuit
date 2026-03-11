import React from 'react';
import { Database } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BOMItem {
    component: string;
    price: number;
    availability: string;
    source: string;
    url: string;
}

interface BOMTableProps {
    data: BOMItem[];
}

export const BOMTable: React.FC<BOMTableProps> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col bg-slate-950/80"
        >
            <div className="p-4 border-b border-slate-700/50 bg-slate-900/50">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold font-mono uppercase tracking-widest">
                    <Database size={14} /> SCOUT BOM (Bill of Materials)
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-auto p-4 custom-scrollbar">
                <div className="w-full text-left font-mono text-xs text-slate-300">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700/50 text-slate-500 uppercase text-[10px]">
                                <th className="pb-2 font-normal">Component</th>
                                <th className="pb-2 font-normal text-right">Source</th>
                                <th className="pb-2 font-normal text-right">Stock</th>
                                <th className="pb-2 font-normal text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr key={idx} className="border-b border-slate-800/30 hover:bg-white/5 transition-colors">
                                    <td className="py-2.5 text-cyan-50 truncate max-w-[120px]">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan underline decoration-dotted">
                                            {item.component}
                                        </a>
                                    </td>
                                    <td className="py-2.5 text-right text-slate-400">{item.source}</td>
                                    <td className="py-2.5 text-right">
                                        <span className={item.availability === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'}>
                                            {item.availability}
                                        </span>
                                    </td>
                                    <td className="py-2.5 text-right text-cyan-400 font-bold">${item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 243, 255, 0.4);
                }
            `}} />
        </motion.div>
    );
};
