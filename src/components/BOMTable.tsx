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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-t border-slate-700/50 bg-slate-950/80 p-4"
        >
            <div className="flex items-center gap-2 mb-3 text-blue-400 text-xs font-bold font-mono uppercase tracking-widest">
                <Database size={14} /> SCOUT BOM (Bill of Materials)
            </div>

            <div className="w-full text-left font-mono text-xs text-slate-300 overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700/50 text-slate-500">
                            <th className="pb-2 font-normal">Component</th>
                            <th className="pb-2 font-normal text-right">Source</th>
                            <th className="pb-2 font-normal text-right">Stock</th>
                            <th className="pb-2 font-normal text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                                <td className="py-2 text-cyan-50 truncate max-w-[120px]">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan underline decoration-dotted">
                                        {item.component}
                                    </a>
                                </td>
                                <td className="py-2 text-right text-slate-400">{item.source}</td>
                                <td className="py-2 text-right">
                                    <span className={item.availability === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'}>
                                        {item.availability}
                                    </span>
                                </td>
                                <td className="py-2 text-right text-cyan-400">${item.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
