import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { CircuitCanvas } from './CircuitCanvas';
import { SerialMonitor } from './SerialMonitor';
import { AgentLogs } from './AgentLogs';
import { CodeEditor } from './CodeEditor';
import { BOMTable } from './BOMTable';
import type { UseOrchestratorReturn } from '../hooks/useOrchestrator';
import { SimulationStatusOverlay } from './SimulationStatusOverlay';

interface SimulationWorkspaceProps {
  orchestrator: UseOrchestratorReturn;
}

export const SimulationWorkspace: React.FC<SimulationWorkspaceProps> = ({ orchestrator }) => {
  const {
    stage,
    nodes,
    edges,
    logs,
    scoutData,
    firmwareCode,
    isSimulating,
    simStatus,
    serialLogs,
    setNodes,
    setEdges,
    handleRunSimulation,
    stopSimulation
  } = orchestrator;

  const exportImage = useCallback(() => {
    const el = document.getElementById('circuit-canvas-container');
    if (!el) return;
    import('html-to-image').then((m) => {
      m.toBlob(el, { cacheBust: true, backgroundColor: '#020617' })
        .then((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'sim-circuit-blueprint.png';
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.error('Error exporting image:', err);
        });
    });
  }, []);

  const exportData = useCallback(() => {
    const payload = {
      nodes,
      edges,
      bom: scoutData,
      firmware: firmwareCode
    };
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sim-circuit-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges, scoutData, firmwareCode]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-screen h-screen bg-black overflow-hidden relative"
    >
      <Header
        isSimulating={isSimulating}
        stage={stage}
        onRunSimulation={handleRunSimulation}
        onExportImage={exportImage}
        onExportData={exportData}
      />

      <div className="flex-1 flex flex-col md:flex-row pt-14 md:pt-16 relative overflow-y-auto md:overflow-hidden">
        {/* Main Canvas Area - Ratio 2 */}
        <main className="w-full h-[50dvh] md:h-full md:flex-1 relative bg-slate-950 order-1 md:order-2 shrink-0 md:shrink">
          <CircuitCanvas 
            nodes={nodes} 
            edges={edges} 
            setNodes={setNodes} 
            setEdges={setEdges} 
            isSimulating={isSimulating}
            onStartSimulation={handleRunSimulation}
            onStopSimulation={stopSimulation}
          />
          
          {/* Dashboard Description Popup */}
          <SimulationStatusOverlay
            isSimulating={isSimulating}
            simStatus={simStatus}
          />
        </main>

        {/* Left Sidebar: Reasoning Logs - Ratio 1 */}
        <aside className="w-full h-[25dvh] md:h-full md:w-80 flex-shrink-0 z-20 bg-black md:bg-transparent border-t md:border-t-0 md:border-r border-white/5 order-2 md:order-1">
          <AgentLogs logs={logs} />
        </aside>

        {/* Right Sidebar: Code & BOM / Serial Monitor - Ratio 1 */}
        <aside className="w-full h-[25dvh] md:h-full md:w-[450px] flex-shrink-0 z-20 bg-slate-900 border-t md:border-t-0 md:border-l border-white/5 overflow-hidden flex flex-col order-3 md:order-3">
            <div className="flex-1 p-4 overflow-hidden flex flex-col gap-4">
               {/* Top Code Editor */}
               <div className="flex-1 min-h-0">
                  <CodeEditor code={firmwareCode} />
               </div>
               
               {/* Middle: Serial Monitor (Only when simulating) */}
               {isSimulating && (
                 <div className="h-24 md:h-auto md:flex-1 min-h-0">
                   <SerialMonitor
                     isSimulating={isSimulating}
                     logs={serialLogs}
                     onStop={stopSimulation}
                   />
                 </div>
               )}

               {/* Bottom Section: BOM / Status */}
               {!isSimulating && (
                 <div className="h-24 md:h-auto md:flex-1 bg-slate-950/30 rounded-lg border border-white/5 overflow-hidden">
                    <BOMTable data={scoutData} />
                 </div>
               )}
            </div>
        </aside>
      </div>
    </motion.div>
  );
};
