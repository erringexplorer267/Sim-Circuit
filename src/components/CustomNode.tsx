import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Cpu, Wifi, Activity, Battery, TriangleAlert } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
    esp32: <Cpu size={16} />,
    wifi: <Wifi size={16} />,
    sensor: <Activity size={16} />,
    power: <Battery size={16} />,
    actuator: <TriangleAlert size={16} />,
};

type CustomNodeData = {
    label: string;
    type?: string;
    isActive?: boolean;
};

export const CustomNode = memo(({ data }: NodeProps) => {
    const nodeData = data as unknown as CustomNodeData;
    const isCore = nodeData.type === 'esp32';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={clsx(
                'neon-node min-w-[180px]',
                nodeData.isActive && 'active'
            )}
        >
            <div className="neon-node-header border-b border-slate-700/50 pb-2 mb-3">
                {iconMap[nodeData.type || 'sensor'] || <Activity size={16} />}
                <span>{nodeData.type || 'Component'}</span>
            </div>

            <div className="neon-node-body">
                <span className={clsx(
                    "font-semibold bg-clip-text text-transparent",
                    isCore ? "bg-gradient-to-r from-neon-cyan to-neon-magenta" : "bg-gradient-to-r from-slate-200 to-slate-400"
                )}>
                    {nodeData.label}
                </span>
            </div>

            {isCore ? (
                <>
                    <Handle type="target" position={Position.Top} className="!bg-slate-900 border-2 !border-neon-cyan !w-3 !h-3" />
                    <Handle type="source" position={Position.Bottom} className="!bg-slate-900 border-2 !border-neon-magenta !w-3 !h-3" />
                    <Handle type="target" position={Position.Left} className="!bg-slate-900 border-2 !border-blue-400 !w-3 !h-3" />
                    <Handle type="source" position={Position.Right} className="!bg-slate-900 border-2 !border-emerald-400 !w-3 !h-3" />
                </>
            ) : (
                <>
                    <Handle type="target" position={Position.Top} className="!bg-slate-900 border-2 !border-slate-400 !w-2.5 !h-2.5" />
                    <Handle type="source" position={Position.Bottom} className="!bg-slate-900 border-2 !border-slate-400 !w-2.5 !h-2.5" />
                </>
            )}
        </motion.div>
    );
});

CustomNode.displayName = 'CustomNode';
