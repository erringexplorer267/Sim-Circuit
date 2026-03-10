import React, { useMemo, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    type NodeChange,
    type EdgeChange,
    type Node,
    type Edge
} from '@xyflow/react';
import { CustomNode } from './CustomNode';

interface FlowCanvasProps {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nds: Node[] | ((nds: Node[]) => Node[])) => void;
    setEdges: (eds: Edge[] | ((eds: Edge[]) => Edge[])) => void;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({ nodes, edges, setNodes, setEdges }) => {
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges<Node>(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges<Edge>(changes, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-screen flow-bg relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="w-full h-full"
            >
                <Background
                    color="#1e293b"
                    gap={16}
                    size={1}
                    style={{ opacity: 0.5 }}
                />
                <Controls
                    className="bg-slate-900 border border-slate-700 !fill-cyan-400"
                    position="bottom-left"
                />
            </ReactFlow>
        </div>
    );
};
