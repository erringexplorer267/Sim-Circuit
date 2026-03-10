import { useState, useCallback, useRef } from 'react';
import { type Node, type Edge } from '@xyflow/react';
import type { BOMItem } from '../components/BOMTable';

export type AgentStage = 'IDLE' | 'ARCHITECT' | 'SCOUT' | 'FIRMWARE' | 'COMPLETE';

export interface ProjectSchema {
  project_title: string;
  components: { id: string; type: string; label: string; pins: string[]; color?: string }[];
  connections: { from: string; fromPin: string; to: string; toPin: string }[];
  firmware: string;
  simulation_logic: { trigger: string; action: string; value?: any };
}

export interface UseOrchestratorReturn {
    stage: AgentStage;
    nodes: Node[];
    edges: Edge[];
    logs: { role: string; content: string; timestamp: number }[];
    scoutData: BOMItem[];
    firmwareCode: string;
    isSimulating: boolean;
    simStatus: string;
    serialLogs: { timestamp: number; message: string }[];
    startOrchestration: (prompt: string) => void;
    setNodes: (nodes: Node[] | ((nds: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;
    handleRunSimulation: () => void;
    stopSimulation: () => void;
}

export function useOrchestrator(): UseOrchestratorReturn {
    const [stage, setStage] = useState<AgentStage>('IDLE');
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [logs, setLogs] = useState<{ role: string; content: string; timestamp: number }[]>([]);
    const [scoutData, setScoutData] = useState<BOMItem[]>([]);
    const [firmwareCode, setFirmwareCode] = useState('');
    const [simStatus, setSimStatus] = useState('System Idle');
    const [currentProject, setCurrentProject] = useState<ProjectSchema | null>(null);

    // Simulation State
    const [isSimulating, setIsSimulating] = useState(false);
    const [serialLogs, setSerialLogs] = useState<{ timestamp: number; message: string }[]>([]);
    const simIntervalRef = useRef<any>(null);

    const addLog = (role: string, content: string) => {
        setLogs((prev) => [...prev, { role, content, timestamp: Date.now() }]);
    };

    const addSerialLog = (message: string) => {
        setSerialLogs((prev) => [...prev, { timestamp: Date.now(), message }].slice(-50));
    };

    const startOrchestration = useCallback((prompt: string) => {
        setStage('ARCHITECT');
        setNodes([]);
        setEdges([]);
        setLogs([]);
        setScoutData([]);
        setFirmwareCode('');
        setIsSimulating(false);
        setSerialLogs([]);

        const promptLower = prompt.toLowerCase();
        
        // --- Architect Agent Simulation ---
        addLog('Architect', `Analyzing system requirements for: "${prompt}"`);
        
        interface CompMeta { type: string; keywords: string[]; pins: string[]; category: 'mcu' | 'sensor' | 'actuator' | 'display' | 'logic' }
        const REGISTRY: Record<string, CompMeta> = {
          esp32: { type: 'esp32', keywords: ['esp32', 'wifi', 'iot'], pins: ['3V3', 'GND', 'D2', 'D4', 'D5', 'D13', 'D21', 'D22', 'A0'], category: 'mcu' },
          arduino: { type: 'arduino_uno', keywords: ['arduino', 'uno'], pins: ['5V', 'GND', 'D2', 'D3', 'D9', 'D10', 'A0', 'A1'], category: 'mcu' },
          ultrasonic: { type: 'ultrasonic', keywords: ['distance', 'parking', 'hc-sr04'], pins: ['VCC', 'TRIG', 'ECHO', 'GND'], category: 'sensor' },
          soil: { type: 'soil_moisture', keywords: ['soil', 'moisture', 'plant'], pins: ['VCC', 'GND', 'A0'], category: 'sensor' },
          pump: { type: 'water_pump', keywords: ['pump', 'water'], pins: ['VCC', 'GND'], category: 'actuator' },
          oled: { type: 'oled', keywords: ['display', 'oled', 'screen'], pins: ['VCC', 'GND', 'SCL', 'SDA'], category: 'display' },
          led: { type: 'led', keywords: ['led', 'light', 'blink'], pins: ['ANODE', 'CATHODE'], category: 'actuator' },
          servo: { type: 'servo', keywords: ['motor', 'servo', 'gate'], pins: ['PWM', 'VCC', 'GND'], category: 'actuator' },
          geiger: { type: 'geiger', keywords: ['radiation', 'geiger'], pins: ['VCC', 'GND', 'SIG'], category: 'sensor' },
          buzzer: { type: 'buzzer', keywords: ['sound', 'buzzer', 'alarm'], pins: ['POS', 'NEG'], category: 'actuator' },
          toggle: { type: 'toggle_switch', keywords: ['switch', 'button', 'input'], pins: ['OUT'], category: 'logic' },
          xor: { type: 'xor_gate', keywords: ['xor', 'adder'], pins: ['A', 'B', 'OUT'], category: 'logic' },
          and: { type: 'and_gate', keywords: ['and', 'logic'], pins: ['A', 'B', 'OUT'], category: 'logic' }
        };

        const selectedIds = new Set<string>();
        if (promptLower.includes('half') && promptLower.includes('adder')) {
          ['xor', 'and', 'toggle', 'toggle', 'led', 'led'].forEach(id => selectedIds.add(id));
        } else {
          Object.keys(REGISTRY).forEach(id => {
            if (REGISTRY[id].keywords.some(k => promptLower.includes(k))) selectedIds.add(id);
          });
        }

        if (![...selectedIds].some(id => REGISTRY[id].category === 'mcu') && !promptLower.includes('logic')) {
          selectedIds.add(promptLower.includes('arduino') ? 'arduino' : 'esp32');
        }

        const projectComponents: any[] = [];
        const projectConnections: any[] = [];
        let mcuNodeId = "";
        let dPins = ['D2', 'D4', 'D5', 'D13', 'D27', 'D26', 'D25'];
        let aPins = ['A0', 'A1', 'A2'];
        let dPtr = 0;

        const counters: Record<string, number> = {};
        const getUid = (type: string) => {
          counters[type] = (counters[type] || 0) + 1;
          return `${type}_${counters[type]}`;
        };

        Array.from(selectedIds).forEach(cid => {
          const meta = REGISTRY[cid];
          const uid = getUid(cid);
          if (meta.category === 'mcu') mcuNodeId = uid;
          projectComponents.push({ id: uid, ...meta, label: meta.type.toUpperCase() });
        });

        projectComponents.forEach(comp => {
          if (comp.id === mcuNodeId) return;
          const meta = comp as CompMeta;
          if (mcuNodeId) {
            // Basic Auto-Wiring logic
            if (meta.pins.includes('VCC') || meta.pins.includes('ANODE') || meta.pins.includes('POS')) {
               const target = meta.pins.find((p: string) => ['VCC','ANODE','POS','VIN','PWM'].includes(p));
               const source = meta.category === 'actuator' ? dPins[dPtr++] : '3V3';
               if (source && target) projectConnections.push({ from: mcuNodeId, fromPin: source, to: comp.id, toPin: target });
            }
            if (meta.pins.includes('GND') || meta.pins.includes('CATHODE')) {
               const target = meta.pins.find((p: string) => ['GND','CATHODE'].includes(p));
               if (target) projectConnections.push({ from: mcuNodeId, fromPin: 'GND', to: comp.id, toPin: target });
            }
            if (meta.category === 'sensor') {
              const sig = meta.pins.find((p: string) => ['SIG','OUT','A0','ECHO'].includes(p));
              const mcuPin = sig === 'A0' ? aPins.pop() : dPins[dPtr++];
              if (sig && mcuPin) projectConnections.push({ from: comp.id, fromPin: sig, to: mcuNodeId, toPin: mcuPin });
            }
          }
        });

        // Specific Logic Circuit Overrides
        if (promptLower.includes('adder')) {
           projectConnections.length = 0;
           projectConnections.push(
             { from: 'toggle_switch_1', fromPin: 'OUT', to: 'xor_gate_1', toPin: 'A' },
             { from: 'toggle_switch_1', fromPin: 'OUT', to: 'and_gate_1', toPin: 'A' },
             { from: 'toggle_switch_2', fromPin: 'OUT', to: 'xor_gate_1', toPin: 'B' },
             { from: 'toggle_switch_2', fromPin: 'OUT', to: 'and_gate_1', toPin: 'B' },
             { from: 'xor_gate_1', fromPin: 'OUT', to: 'led_1', toPin: 'ANODE' },
             { from: 'and_gate_1', fromPin: 'OUT', to: 'led_2', toPin: 'ANODE' }
           );
        }

        const project: ProjectSchema = {
          project_title: prompt.toUpperCase(),
          components: projectComponents,
          connections: projectConnections,
          firmware: `// Generative Code\nvoid setup() { /* INIT */ }\nvoid loop() { /* RUN */ }`,
          simulation_logic: { trigger: "playback", action: "sync", value: [0, 1, 2, 3] }
        };

        setCurrentProject(project);

        const generatedNodes: Node[] = project.components.map((c, idx) => ({
          id: c.id,
          type: 'dynamicNode',
          position: { x: 150 + (idx * 280) % 800, y: 150 + Math.floor(idx / 3) * 250 },
          data: { label: c.label, type: c.type, pins: c.pins }
        }));

        const generatedEdges: Edge[] = project.connections.map((conn, idx) => ({
          id: `e-${idx}`,
          source: conn.from,
          sourceHandle: conn.fromPin,
          target: conn.to,
          targetHandle: conn.toPin,
          type: 'animated',
          data: { isSimulating: false, isHigh: false, label: conn.fromPin }
        }));

        const generatedBOM: BOMItem[] = project.components.map(c => ({
          component: c.label,
          price: 2.50,
          availability: 'In Stock',
          source: 'System',
          url: '#'
        }));

        addLog('Architect', `Generated schema: ${project.project_title}`);
        addLog('Architect', JSON.stringify({ components: projectComponents.length, connections: projectConnections.length }, null, 2));

        setTimeout(() => {
          setNodes(generatedNodes);
          setEdges(generatedEdges);
          setStage('SCOUT');
          setTimeout(() => {
            setScoutData(generatedBOM);
            setStage('FIRMWARE');
            setTimeout(() => {
              setFirmwareCode(project.firmware);
              setStage('COMPLETE');
              addLog('System', 'A.I. Digital Twin simulation ready.');
            }, 800);
          }, 800);
        }, 1000);
    }, []);

    const handleRunSimulation = useCallback(() => {
        if (stage !== 'COMPLETE' || !currentProject) return;
        setIsSimulating(true);
        setSerialLogs([]);

        let step = 0;
        simIntervalRef.current = setInterval(() => {
            step++;
            const timestamp = Date.now();
            const timeStr = new Date(timestamp).toLocaleTimeString();
            
            const playback = currentProject.simulation_logic.value || [];
            const mockVal = playback.length > 0 ? playback[step % playback.length] : Math.random() * 100;

            let logMsg = '';
            let isActive = false;

            const title = currentProject.project_title.toUpperCase();
            if (title.includes('ADDER')) {
               const a = (mockVal >> 1) & 1;
               const b = mockVal & 1;
               const sum = a ^ b;
               const carry = a & b;
               isActive = sum === 1 || carry === 1;
               logMsg = `[${timeStr}] BIN_IN: A=${a} B=${b} | OUT: SUM=${sum} CARRY=${carry}`;
               setSimStatus(`Logic: Input A=${a}, B=${b} -> Sum=${sum}, Carry=${carry}`);
               
               setNodes(nds => nds.map(n => {
                 if (n.id === 'toggle_switch_1') return { ...n, data: { ...n.data, isActive: a === 1 } };
                 if (n.id === 'toggle_switch_2') return { ...n, data: { ...n.data, isActive: b === 1 } };
                 if (n.id === 'led_1') return { ...n, data: { ...n.data, isActive: sum === 1 } };
                 if (n.id === 'led_2') return { ...n, data: { ...n.data, isActive: carry === 1 } };
                 const nData = n.data as any;
                 if (nData.type?.includes('gate')) return { ...n, data: { ...n.data, isActive: true } };
                 return n;
               }));
            } else if (title.includes('IRRIGATION')) {
               isActive = mockVal > 500;
               logMsg = `[${timeStr}] MOISTURE: ${mockVal} | PUMP: ${isActive ? 'ON' : 'OFF'}`;
               setSimStatus(isActive ? "Critical: Soil is dry! Water pump activated." : "Status: Soil moisture is optimal. Pump in standby.");
            } else if (title.includes('GEIGER')) {
               isActive = mockVal === 1;
               logMsg = `[${timeStr}] RAD: ${mockVal > 0 ? 'PARTICLE' : 'QUIET'} | BEEP: ${isActive ? 'YES' : 'NO'}`;
               setSimStatus(isActive ? "Radiation pulse detected! Triggering alert buzzer." : "Background radiation levels stable.");
            } else if (title.includes('PARKING')) {
               isActive = mockVal < 10;
               logMsg = `[${timeStr}] DIST: ${mockVal}cm | ALERT: ${isActive ? 'CRITICAL' : 'OK'}`;
               setSimStatus(isActive ? "Obstacle detected within 10cm! Red Warning LED HIGH." : "Distance clear. System monitoring...");
            } else {
               isActive = step % 2 === 0;
               logMsg = `[${timeStr}] DATA: ${mockVal.toFixed(2)} | STATE: ${isActive ? 'ACTIVE' : 'IDLE'}`;
               setSimStatus(`Processing stream: Data val ${mockVal.toFixed(1)}`);
            }

            if (!title.includes('ADDER')) {
              addSerialLog(logMsg);
              
              setNodes(nds => nds.map(n => {
                if (['pump_1', 'buzzer_1', 'led_1', 'servo', 'tube_1'].includes(n.id) || n.data.type === 'oled') {
                  return { ...n, data: { ...n.data, isActive: isActive, displayText: `DATA: ${mockVal}` } };
                }
                return n;
              }));
            } else {
              addSerialLog(logMsg);
            }
            
            setEdges(eds => eds.map(e => ({
              ...e, 
              data: { ...e.data, isSimulating: true, isHigh: isActive }
            })));

        }, 800);
    }, [stage, currentProject]);

    const stopSimulation = useCallback(() => {
        setIsSimulating(false);
        setSimStatus('System Idle');
        if (simIntervalRef.current) {
            clearInterval(simIntervalRef.current);
            simIntervalRef.current = null;
        }
        setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, isActive: false, angle: 0 } })));
        setEdges(eds => eds.map(e => ({ ...e, data: { isSimulating: false, isHigh: false } })));
    }, []);

    return {
        stage,
        nodes,
        edges,
        logs,
        scoutData,
        firmwareCode,
        isSimulating,
        simStatus,
        serialLogs,
        startOrchestration,
        setNodes,
        setEdges,
        handleRunSimulation,
        stopSimulation,
    };
}

