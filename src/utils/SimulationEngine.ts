
export interface SimulationState {
    nodes: Record<string, any>;
    edges: Record<string, any>;
    logs: { timestamp: number; message: string }[];
}

export class SimulationEngine {
    private interval: any = null;
    private onUpdate: (state: SimulationState) => void;
    private logs: { timestamp: number; message: string }[] = [];
    private startTime: number = 0;

    constructor(onUpdate: (state: SimulationState) => void) {
        this.onUpdate = onUpdate;
    }

    public start() {
        if (this.interval) return;
        this.startTime = Date.now();
        this.logs = [{ timestamp: Date.now(), message: "Simulation started..." }];
        
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    public stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    private tick() {
        const timestamp = Date.now();
        const elapsed = (timestamp - this.startTime) / 1000;
        
        // Mock logic: generate logs and state changes
        const newLog = {
            timestamp,
            message: `[${elapsed.toFixed(1)}s] Analog Read A0: ${Math.floor(Math.random() * 1024)}`
        };
        
        this.logs = [...this.logs.slice(-50), newLog];

        // Update state based on some logic (e.g. if A0 > 500, glow LED)
        this.onUpdate({
            nodes: {
                // Example: node with ID 'led-1' should be active
                'led-1': { isActive: Math.random() > 0.5 }
            },
            edges: {
                // Example: edge with ID 'wire-1' has high current
                'wire-1': { isHigh: true }
            },
            logs: this.logs
        });
    }
}
