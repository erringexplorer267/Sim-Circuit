import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// SVG components for high-fidelity representation
const ESP32_SVG = () => (
  <svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="180" height="260" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
    <rect x="30" y="30" width="140" height="80" rx="2" fill="#0f172a" stroke="#475569"/>
    <text x="100" y="75" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold">ESP32-WROOM</text>
    {/* Pins on the left */}
    {[...Array(15)].map((_, i) => (
      <rect key={`l-${i}`} x="2" y={40 + i * 15} width="12" height="4" fill="#94a3b8" />
    ))}
    {/* Pins on the right */}
    {[...Array(15)].map((_, i) => (
      <rect key={`r-${i}`} x="186" y={40 + i * 15} width="12" height="4" fill="#94a3b8" />
    ))}
  </svg>
);

const LED_SVG = ({ color = "#ff0000", active = false }: { color?: string, active?: boolean }) => (
  <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="60" width="2" height="40" fill="#94a3b8" />
    <rect x="33" y="60" width="2" height="30" fill="#94a3b8" />
    <path d="M10 50C10 22.3858 23.4315 0 40 0C56.5685 0 70 22.3858 70 50H10Z" transform="translate(-10 0)" fill={color} fillOpacity={active ? 1 : 0.3} style={{ filter: active ? `drop-shadow(0 0 10px ${color})` : 'none' }}/>
    <rect x="0" y="50" width="60" height="10" rx="2" fill={color} fillOpacity={active ? 1 : 0.5}/>
  </svg>
);

const BREADBOARD_SVG = () => (
  <svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="200" rx="8" fill="#e2e8f0" />
    {[...Array(60)].map((_, i) => (
      [...Array(10)].map((_, j) => (
        <circle key={`${i}-${j}`} cx={20 + i * 10} cy={20 + j * 15} r="2" fill="#94a3b8" />
      ))
    ))}
  </svg>
);

const RESISTOR_SVG = () => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="14" width="20" height="2" fill="#94a3b8" />
    <rect x="80" y="14" width="20" height="2" fill="#94a3b8" />
    <rect x="20" y="5" width="60" height="20" rx="4" fill="#d1d5db" stroke="#94a3b8" />
    <rect x="30" y="5" width="5" height="20" fill="#92400e" />
    <rect x="45" y="5" width="5" height="20" fill="#92400e" />
    <rect x="60" y="5" width="5" height="20" fill="#b45309" />
  </svg>
);

export const CustomPinNode = memo(({ data }: NodeProps) => {
    const nodeData = data as any;
    const type = nodeData.type || 'esp32';
    const isActive = nodeData.isActive;

    const renderComponent = () => {
        switch (type) {
            case 'esp32':
                return (
                    <div className="relative">
                        <ESP32_SVG />
                        {[...Array(15)].map((_, i) => (
                            <Handle
                                key={`l-${i}`}
                                type="target"
                                position={Position.Left}
                                id={`pin-l-${i}`}
                                style={{ top: 42 + i * 15, left: 2, background: 'transparent', border: 'none' }}
                            />
                        ))}
                        {[...Array(15)].map((_, i) => (
                            <Handle
                                key={`r-${i}`}
                                type="source"
                                position={Position.Right}
                                id={`pin-r-${i}`}
                                style={{ top: 42 + i * 15, right: 2, background: 'transparent', border: 'none' }}
                            />
                        ))}
                    </div>
                );
            case 'resistor':
                return (
                    <div className="relative">
                        <RESISTOR_SVG />
                        <Handle type="target" position={Position.Left} id="left" style={{ top: 15, left: 0, background: 'transparent', border: 'none' }} />
                        <Handle type="source" position={Position.Right} id="right" style={{ top: 15, right: 0, background: 'transparent', border: 'none' }} />
                    </div>
                );
            case 'led':
                return (
                    <div className="relative flex flex-col items-center">
                        <LED_SVG color={nodeData.color} active={isActive} />
                        <Handle
                            type="target"
                            position={Position.Bottom}
                            id="anode"
                            style={{ bottom: 0, left: '42%', background: 'transparent', border: 'none' }}
                        />
                        <Handle
                            type="target"
                            position={Position.Bottom}
                            id="cathode"
                            style={{ bottom: 0, left: '58%', background: 'transparent', border: 'none' }}
                        />
                    </div>
                );
            case 'breadboard':
                return (
                    <div className="relative">
                        <BREADBOARD_SVG />
                        <Handle type="source" position={Position.Top} id="vcc" style={{ top: 10, left: 50 }} />
                        <Handle type="source" position={Position.Top} id="gnd" style={{ top: 10, left: 100 }} />
                    </div>
                )
            default:
                return <div>Unknown Component</div>;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
                "relative p-2 rounded-lg",
                isActive && "ring-2 ring-neon-cyan ring-offset-4 ring-offset-slate-950"
            )}
        >
            <div className="absolute -top-6 left-0 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1 rounded">
                {nodeData.label}
            </div>
            {renderComponent()}
        </motion.div>
    );
});

CustomPinNode.displayName = 'CustomPinNode';
