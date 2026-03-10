import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isFunctional?: boolean;
  tag?: string;
  color: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  isFunctional,
  tag,
  color,
  onClick,
  className,
  children
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative rounded-3xl p-8 overflow-hidden group transition-all duration-500",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "hover:border-white/20 cursor-pointer overflow-visible",
        isFunctional && "border-beam-active",
        className
      )}
      onClick={onClick}
    >
      {/* Animated Gradient Border Beam (only on hover) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${color}20, transparent 80%)`
        }}
      />
      
      {/* Glossy Overlay */}
      <div className="absolute inset-px rounded-[23px] bg-slate-900/60 z-[1]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div 
            className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"
            style={{ color: color, boxShadow: `0 0 20px ${color}20` }}
          >
            <Icon size={28} />
          </div>
          {tag && (
            <span 
              className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 font-bold"
              style={{ color: color, borderColor: `${color}40` }}
            >
              {tag}
            </span>
          )}
          {isFunctional && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color }} />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Live</span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-500">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          {children}
        </div>
      </div>

      {/* Neon Glow on Functional Cards */}
      {isFunctional && (
        <div 
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  );
};
