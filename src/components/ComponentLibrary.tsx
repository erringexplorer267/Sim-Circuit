import React from 'react';
import { motion } from 'framer-motion';

export interface PinDef {
  id: string;
  label: string;
  pos: 'left' | 'right' | 'top' | 'bottom';
  offset: number; 
}

export interface ComponentTemplate {
  width: number;
  height: number;
  render: (data: any) => React.ReactNode;
  getDefaultPins: () => PinDef[];
}

export const COMPONENT_LIBRARY: Record<string, ComponentTemplate> = {
  esp32: {
    width: 180,
    height: 240,
    getDefaultPins: () => [
      { id: '3V3', label: '3V3', pos: 'left', offset: 15 },
      { id: 'EN', label: 'EN', pos: 'left', offset: 25 },
      { id: 'VP', label: 'VP', pos: 'left', offset: 35 },
      { id: 'VN', label: 'VN', pos: 'left', offset: 45 },
      { id: 'D34', label: 'D34', pos: 'left', offset: 55 },
      { id: 'D35', label: 'D35', pos: 'left', offset: 65 },
      { id: 'D32', label: 'D32', pos: 'left', offset: 75 },
      { id: 'D33', label: 'D33', pos: 'left', offset: 85 },
      { id: 'VIN', label: 'VIN', pos: 'right', offset: 15 },
      { id: 'GND', label: 'GND', pos: 'right', offset: 25 },
      { id: 'D13', label: 'D13', pos: 'right', offset: 35 },
      { id: 'D12', label: 'D12', pos: 'right', offset: 45 },
      { id: 'D14', label: 'D14', pos: 'right', offset: 55 },
      { id: 'D27', label: 'D27', pos: 'right', offset: 65 },
      { id: 'D26', label: 'D26', pos: 'right', offset: 75 },
      { id: 'D25', label: 'D25', pos: 'right', offset: 85 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 180 240" fill="none">
        <rect x="10" y="10" width="160" height="220" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
        <rect x="30" y="30" width="120" height="60" rx="2" fill="#0f172a" stroke="#475569"/>
        <text x="90" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">ESP32-WROOM</text>
        <rect x="40" y="120" width="100" height="80" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="1"/>
        <circle cx="90" cy="160" r="15" fill="#1e293b" stroke="#334155" />
      </svg>
    )
  },
  arduino_uno: {
    width: 240,
    height: 180,
    getDefaultPins: () => [
      { id: 'RESEST', label: 'RST', pos: 'bottom', offset: 10 },
      { id: '3.3V', label: '3.3V', pos: 'bottom', offset: 20 },
      { id: '5V', label: '5V', pos: 'bottom', offset: 30 },
      { id: 'GND', label: 'GND', pos: 'bottom', offset: 40 },
      { id: 'VIN', label: 'VIN', pos: 'bottom', offset: 50 },
      { id: 'A0', label: 'A0', pos: 'bottom', offset: 65 },
      { id: 'A1', label: 'A1', pos: 'bottom', offset: 75 },
      { id: 'A2', label: 'A2', pos: 'bottom', offset: 85 },
      { id: 'D0', label: 'D0', pos: 'top', offset: 10 },
      { id: 'D1', label: 'D1', pos: 'top', offset: 20 },
      { id: 'D2', label: 'D2', pos: 'top', offset: 30 },
      { id: 'D3', label: 'D3', pos: 'top', offset: 40 },
      { id: 'D13', label: 'D13', pos: 'top', offset: 85 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 240 180" fill="none">
        <rect width="240" height="180" rx="8" fill="#1d4ed8" stroke="#1e40af" strokeWidth="2"/>
        <rect x="20" y="20" width="40" height="30" fill="#cbd5e1" rx="2" />
        <rect x="180" y="100" width="40" height="60" fill="#334155" rx="2" />
        <text x="120" y="90" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="heavy">ARDUINO UNO</text>
      </svg>
    )
  },
  ultrasonic: {
    width: 140,
    height: 80,
    getDefaultPins: () => [
      { id: 'VCC', label: 'VCC', pos: 'bottom', offset: 20 },
      { id: 'TRIG', label: 'TRIG', pos: 'bottom', offset: 40 },
      { id: 'ECHO', label: 'ECHO', pos: 'bottom', offset: 60 },
      { id: 'GND', label: 'GND', pos: 'bottom', offset: 80 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 140 80" fill="none">
        <rect width="140" height="80" rx="4" fill="#1e3a8a" stroke="#1e40af" />
        <circle cx="35" cy="40" r="25" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="105" cy="40" r="25" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="60" y="5" width="20" height="10" fill="#1e293b" />
      </svg>
    )
  },
  led: {
    width: 60,
    height: 80,
    getDefaultPins: () => [
      { id: 'ANODE', label: 'A', pos: 'bottom', offset: 30 },
      { id: 'CATHODE', label: 'K', pos: 'bottom', offset: 70 },
    ],
    render: (data: any) => {
      const color = data.color || '#ff0000';
      const active = data.isActive;
      return (
        <svg width="100%" height="100%" viewBox="0 0 60 80" fill="none">
          <path d="M10 40C10 17.9086 23.4315 0 40 0C56.5685 0 70 17.9086 70 40H10Z" transform="translate(-10 0)" fill={color} fillOpacity={active ? 1 : 0.3} />
          <rect x="0" y="40" width="60" height="10" rx="2" fill={color} fillOpacity={active ? 1 : 0.5}/>
          <rect x="18" y="50" width="4" height="30" fill="#94a3b8" />
          <rect x="38" y="50" width="4" height="25" fill="#94a3b8" />
          {active && <circle cx="30" cy="20" r="20" fill={color} filter="blur(15px)" opacity="0.6" />}
        </svg>
      );
    }
  },
  servo: {
    width: 100,
    height: 100,
    getDefaultPins: () => [
      { id: 'VCC', label: 'V', pos: 'right', offset: 30 },
      { id: 'GND', label: 'G', pos: 'right', offset: 50 },
      { id: 'PWM', label: 'PWM', pos: 'right', offset: 70 },
    ],
    render: (data) => (
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <rect x="10" y="30" width="80" height="40" rx="2" fill="#1e293b" />
        <circle cx="30" cy="50" r="25" fill="#334155" />
        <rect x="25" y="10" width="10" height="80" rx="5" fill="#cbd5e1" transform={`rotate(${data.angle || 0} 30 50)`} />
      </svg>
    )
  },
  resistor: {
    width: 100,
    height: 40,
    getDefaultPins: () => [
      { id: 'L', label: 'L', pos: 'left', offset: 50 },
      { id: 'R', label: 'R', pos: 'right', offset: 50 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 100 40" fill="none">
        <rect x="0" y="19" width="20" height="2" fill="#94a3b8" />
        <rect x="80" y="19" width="20" height="2" fill="#94a3b8" />
        <rect x="20" y="10" width="60" height="20" rx="4" fill="#fde68a" stroke="#d97706" />
        <rect x="30" y="10" width="4" height="20" fill="#92400e" />
        <rect x="45" y="10" width="4" height="20" fill="#dc2626" />
        <rect x="60" y="10" width="4" height="20" fill="#d97706" />
      </svg>
    )
  },
  and_gate: {
    width: 100,
    height: 100,
    getDefaultPins: () => [
      { id: 'A', label: 'A', pos: 'left', offset: 30 },
      { id: 'B', label: 'B', pos: 'left', offset: 70 },
      { id: 'OUT', label: 'OUT', pos: 'right', offset: 50 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <path d="M20 20 L50 20 A 30 30 0 0 1 50 80 L20 80 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="15" y="20" width="10" height="60" fill="#1e293b" />
      </svg>
    )
  },
  or_gate: {
    width: 100,
    height: 100,
    getDefaultPins: () => [
      { id: 'A', label: 'A', pos: 'left', offset: 30 },
      { id: 'B', label: 'B', pos: 'left', offset: 70 },
      { id: 'OUT', label: 'OUT', pos: 'right', offset: 50 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <path d="M20 20 Q 40 50 20 80 Q 70 80 90 50 Q 70 20 20 20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      </svg>
    )
  },
  xor_gate: {
    width: 100,
    height: 100,
    getDefaultPins: () => [
      { id: 'A', label: 'A', pos: 'left', offset: 30 },
      { id: 'B', label: 'B', pos: 'left', offset: 70 },
      { id: 'OUT', label: 'OUT', pos: 'right', offset: 50 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <path d="M15 20 Q 35 50 15 80" stroke="#334155" strokeWidth="2" fill="none" />
        <path d="M22 20 Q 42 50 22 80 Q 72 80 92 50 Q 72 20 22 20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      </svg>
    )
  },
  not_gate: {
    width: 100,
    height: 80,
    getDefaultPins: () => [
      { id: 'IN', label: 'IN', pos: 'left', offset: 50 },
      { id: 'OUT', label: 'OUT', pos: 'right', offset: 50 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none">
        <path d="M20 10 L70 40 L20 70 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <circle cx="75" cy="40" r="5" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      </svg>
    )
  },
  toggle_switch: {
    width: 60,
    height: 60,
    getDefaultPins: () => [
      { id: 'OUT', label: 'OUT', pos: 'right', offset: 50 },
    ],
    render: (data) => (
      <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
        <rect width="60" height="60" rx="4" fill="#1e293b" stroke="#334155" />
        <rect x="20" y={data.isActive ? 10 : 30} width="20" height="20" rx="2" fill={data.isActive ? "#00f3ff" : "#475569"} />
      </svg>
    )
  },
  soil_moisture: {
    width: 60,
    height: 120,
    getDefaultPins: () => [
      { id: 'VCC', label: 'VCC', pos: 'top', offset: 20 },
      { id: 'GND', label: 'GND', pos: 'top', offset: 50 },
      { id: 'A0', label: 'SIG', pos: 'top', offset: 80 },
    ],
    render: () => (
      <svg width="100%" height="100%" viewBox="0 0 60 120" fill="none">
        <rect x="5" y="0" width="50" height="40" rx="2" fill="#1e293b" stroke="#334155" />
        <path d="M15 40 L15 120 L25 120 L25 40 Z" fill="#92400e" opacity="0.8" />
        <path d="M35 40 L35 120 L45 120 L45 40 Z" fill="#92400e" opacity="0.8" />
        <rect x="10" y="5" width="40" height="20" fill="#3b82f6" opacity="0.5" />
      </svg>
    )
  },
  water_pump: {
    width: 100,
    height: 80,
    getDefaultPins: () => [
      { id: 'VCC', label: '+', pos: 'right', offset: 30 },
      { id: 'GND', label: '-', pos: 'right', offset: 70 },
    ],
    render: (data) => (
      <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none">
        <rect x="0" y="20" width="70" height="40" rx="20" fill="#1e293b" stroke="#334155" />
        <rect x="70" y="30" width="20" height="20" fill="#475569" />
        <circle cx="35" cy="40" r="15" fill="#0f172a" />
        {data.isActive && (
          <motion.path 
            d="M 90 40 Q 110 20 130 40" 
            stroke="#60a5fa" strokeWidth="4" fill="none"
            animate={{ d: ["M 90 40 Q 100 30 110 40", "M 90 40 Q 110 50 130 40"] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          />
        )}
      </svg>
    )
  },
  oled: {
    width: 120,
    height: 100,
    getDefaultPins: () => [
      { id: 'VCC', label: 'VCC', pos: 'top', offset: 20 },
      { id: 'GND', label: 'GND', pos: 'top', offset: 40 },
      { id: 'SCL', label: 'SCL', pos: 'top', offset: 60 },
      { id: 'SDA', label: 'SDA', pos: 'top', offset: 80 },
    ],
    render: (data) => (
      <svg width="100%" height="100%" viewBox="0 0 120 100" fill="none">
        <rect width="120" height="100" rx="4" fill="#1e293b" />
        <rect x="5" y="25" width="110" height="70" rx="2" fill="#000000" stroke="#334155" />
        {data.isActive && (
          <text x="60" y="65" textAnchor="middle" fill="#00f3ff" fontSize="8" fontFamily="monospace">
            {data.displayText || "SYSTEM_BOOTING..."}
          </text>
        )}
      </svg>
    )
  },
  geiger: {
    width: 160,
    height: 40,
    getDefaultPins: () => [
      { id: 'VCC', label: 'VCC', pos: 'right', offset: 30 },
      { id: 'GND', label: 'GND', pos: 'right', offset: 50 },
      { id: 'SIG', label: 'OUT', pos: 'right', offset: 70 },
    ],
    render: (data) => (
      <svg width="100%" height="100%" viewBox="0 0 160 40" fill="none">
        <rect x="20" y="10" width="120" height="20" rx="10" fill="#334155" />
        <rect x="140" y="15" width="20" height="10" fill="#94a3b8" />
        <rect x="0" y="15" width="20" height="10" fill="#94a3b8" />
        {data.isActive && (
          <motion.circle 
            cx="80" cy="20" r="15" fill="#fca5a1" opacity="0.4"
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.1, repeat: 1 }}
          />
        )}
      </svg>
    )
  }
};
