import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { COMPONENT_LIBRARY, type PinDef } from './ComponentLibrary';
import clsx from 'clsx';

export const DynamicNode = memo(({ data }: NodeProps) => {
  const nodeData = data as any;
  const componentType = nodeData.type || 'esp32';
  const template = COMPONENT_LIBRARY[componentType] || COMPONENT_LIBRARY['esp32'];
  const isActive = nodeData.isActive;
  
  // Custom pins from JSON or default from library
  const pins: PinDef[] = nodeData.pins 
    ? nodeData.pins.map((pName: string) => {
        const defaultPin = template.getDefaultPins().find(dp => dp.label === pName || dp.id === pName);
        if (defaultPin) return defaultPin;
        // Fallback: distribute unknown pins
        return { id: pName, label: pName, pos: 'left', offset: 50 };
      })
    : template.getDefaultPins();

  const getHandleStyle = (pin: PinDef) => {
    const isPower = ['VCC', '5V', '3V3', 'VIN', 'GND'].includes(pin.label.toUpperCase());
    const style: React.CSSProperties = {
      background: isPower ? (pin.label.toUpperCase() === 'GND' ? '#64748b' : '#ef4444') : '#00f3ff',
      border: '1px solid rgba(255,255,255,0.2)',
      width: '10px',
      height: '10px',
      boxShadow: isActive ? '0 0 10px currentColor' : 'none',
    };

    switch (pin.pos) {
      case 'left': return { ...style, left: -5, top: `${pin.offset}%` };
      case 'right': return { ...style, right: -5, top: `${pin.offset}%` };
      case 'top': return { ...style, top: -5, left: `${pin.offset}%` };
      case 'bottom': return { ...style, bottom: -5, left: `${pin.offset}%` };
    }
  };

  const getHandlePosition = (pos: string) => {
    switch (pos) {
      case 'left': return Position.Left;
      case 'right': return Position.Right;
      case 'top': return Position.Top;
      case 'bottom': return Position.Bottom;
      default: return Position.Left;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx(
        "relative rounded-lg bg-slate-900 shadow-xl border border-slate-700 transition-all duration-500",
        isActive ? "ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.4)] border-cyan-400/50" : "hover:border-slate-500"
      )}
      style={{ width: template.width, height: template.height }}
    >
      {/* Scanline Effect for Active State */}
      {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-[100px] -translate-y-full animate-[scanline_2s_linear_infinite]" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#00f3ff_100%)] animate-pulse" />
          </div>
      )}

      {/* Label */}
      <div className="absolute -top-7 left-0 right-0 flex justify-center">
        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter whitespace-nowrap">
          {nodeData.label || componentType}
        </span>
      </div>

      {/* SVG Render */}
      <div className="w-full h-full p-2 flex items-center justify-center">
        {template.render(nodeData)}
      </div>

      {/* Dynamic Handles */}
      {pins.map((pin) => (
        <div key={pin.id}>
          <Handle
            type="source" // In React-Flow, handles can be both source/target if needed, but for schematic we'll just use source/target based on context or both
            position={getHandlePosition(pin.pos)}
            id={pin.id}
            style={getHandleStyle(pin)}
            className="hover:scale-150 transition-transform cursor-crosshair"
          />
          {/* Internal Label for handle */}
          <div 
            className="absolute text-[8px] font-mono text-slate-500 pointer-events-none"
            style={{
              top: pin.pos === 'left' || pin.pos === 'right' ? `${pin.offset}%` : (pin.pos === 'top' ? 6 : undefined),
              bottom: pin.pos === 'bottom' ? 6 : undefined,
              left: pin.pos === 'top' || pin.pos === 'bottom' ? `${pin.offset}%` : (pin.pos === 'left' ? 6 : undefined),
              right: pin.pos === 'right' ? 6 : undefined,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            {pin.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
});

DynamicNode.displayName = 'DynamicNode';
