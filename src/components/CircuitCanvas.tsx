import { useMemo, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    Panel,
    type NodeChange,
    type EdgeChange,
    type Node,
    type Edge,
    type EdgeProps,
    getBezierPath,
} from '@xyflow/react';
import { DynamicNode } from './DynamicNode';
import { Download, Camera, Play, Square } from 'lucide-react';
import { toPng } from 'html-to-image';

interface CircuitCanvasProps {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nds: Node[] | ((nds: Node[]) => Node[])) => void;
    setEdges: (eds: Edge[] | ((eds: Edge[]) => Edge[])) => void;
    isSimulating: boolean;
    onStartSimulation: () => void;
    onStopSimulation: () => void;
}

// Custom Edge Component for Animated Connections
const AnimatedEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const isSimulating = data?.isSimulating;
    const isHigh = data?.isHigh;
    const label = (data?.label as string) || '';
    
    const isPowerPin = ['VCC', 'GND', '5V', '3V3', 'VIN'].includes(label.toUpperCase());
    const isGND = label.toUpperCase() === 'GND';
    
    // Choose colors based on pin type and state
    let edgeColor = '#334155'; // Default inactive
    if (isSimulating) {
        if (isPowerPin) {
            edgeColor = isGND ? '#64748b' : '#ef4444';
        } else {
            edgeColor = isHigh ? '#10b981' : '#00f3ff';
        }
    }

    const glowColor = edgeColor;

    return (
        <>
            {/* Background Glow Path */}
            <path
                id={`${id}-glow`}
                d={edgePath}
                fill="none"
                stroke={edgeColor}
                strokeWidth={isSimulating ? 6 : 0}
                className="transition-all duration-500"
                style={{
                    opacity: isSimulating ? 0.15 : 0,
                    filter: `blur(4px)`,
                }}
            />
            
            {/* Main Wire Path */}
            <path
                id={id}
                style={{
                    ...style,
                    stroke: edgeColor,
                    strokeWidth: 2.5,
                    opacity: isSimulating ? 1 : 0.4
                }}
                className="react-flow__edge-path transition-all duration-300"
                d={edgePath}
                markerEnd={markerEnd}
            />

            {/* Pulsing Signal Flow */}
            {isSimulating && (
                <path
                    d={edgePath}
                    fill="none"
                    stroke={edgeColor}
                    strokeWidth={2}
                    strokeDasharray="10,15"
                    className="transition-all duration-300"
                    style={{
                        filter: `drop-shadow(0 0 6px ${glowColor})`,
                        opacity: 0.8
                    }}
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="50"
                        to="0"
                        dur={isPowerPin ? (isGND ? "2s" : "1.2s") : (isHigh ? "0.4s" : "0.8s")}
                        repeatCount="indefinite"
                    />
                </path>
            )}

            {/* Edge Label for Pin Name */}
            <text>
                <textPath
                    href={`#${id}`}
                    style={{ 
                        fontSize: '9px', 
                        fill: isSimulating ? '#94a3b8' : '#475569', 
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                    }}
                    startOffset="50%"
                    textAnchor="middle"
                >
                    {label}
                </textPath>
            </text>
        </>
    );
};

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({ 
    nodes, 
    edges, 
    setNodes, 
    setEdges,
    isSimulating,
    onStartSimulation,
    onStopSimulation
}) => {
    const nodeTypes = useMemo(() => ({ 
        customPin: DynamicNode,
        dynamicNode: DynamicNode,
    }), []);
    const edgeTypes = useMemo(() => ({ animated: AnimatedEdge }), []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges<Node>(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges<Edge>(changes, eds)),
        [setEdges]
    );

    const downloadSnapshot = () => {
        const element = document.querySelector('.react-flow') as HTMLElement;
        if (element) {
            toPng(element, { backgroundColor: '#020617' })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'circuit-design.png';
                    link.href = dataUrl;
                    link.click();
                });
        }
    };

    const exportProject = () => {
        const projectData = { nodes, edges, timestamp: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'sim-project.json';
        link.href = url;
        link.click();
    };

    return (
        <div id="circuit-canvas-container" className="w-full h-screen flow-bg relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className="w-full h-full"
            >
                <Background
                    color="#1e293b"
                    gap={16}
                    size={1}
                    style={{ opacity: 0.5 }}
                />
                
                <Panel position="top-right" className="flex gap-2">
                    <button 
                        onClick={isSimulating ? onStopSimulation : onStartSimulation}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                            isSimulating 
                            ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30' 
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500/30'
                        }`}
                    >
                        {isSimulating ? <><Square size={16} fill="currentColor"/> STOP</> : <><Play size={16} fill="currentColor"/> RUN SIMULATION</>}
                    </button>
                    <button 
                        onClick={downloadSnapshot}
                        className="p-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                        title="Snapshot"
                    >
                        <Camera size={20} />
                    </button>
                    <button 
                        onClick={exportProject}
                        className="p-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                        title="Export JSON"
                    >
                        <Download size={20} />
                    </button>
                </Panel>

                <Controls
                    className="bg-slate-900 border border-slate-700 !fill-neon-cyan"
                    position="bottom-left"
                />
            </ReactFlow>
        </div>
    );
};

