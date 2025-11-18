import React, { useState, useEffect, useRef } from 'react';
import type { Tool } from '../App';

interface ToolDetailProps {
  tool: Tool;
  onClose: () => void;
  isGatewayActive: boolean;
}

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

const generateLogEntry = (toolName: string) => {
    const actions = ['Initializing connection', 'Verifying signature', 'Querying entropy pool', 'Encrypting data packet', 'Syncing with adjacent nodes', 'Optimizing protocol', 'Receiving directive', 'Broadcasting heartbeat'];
    const targets = ['Elysium Gateway', 'Daughter Protocol', 'Syntropic Engine', 'Identity Node', 'user session'];
    const statuses = ['SUCCESS', 'PENDING', 'OK', 'NO_RESPONSE', 'COMPLETE'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomTarget = targets[Math.floor(Math.random() * targets.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${toolName}] ${randomAction} -> ${randomTarget}... [${randomStatus}]`;
};

const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onClose, isGatewayActive }) => {
    const [logs, setLogs] = useState<string[]>(['Initializing data feed...']);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with `number | null` for browser compatibility.
        // `setInterval` returns a number in the browser.
        let interval: number | null = null;
        if (isGatewayActive) {
            interval = setInterval(() => {
                setLogs(prevLogs => [...prevLogs.slice(-100), generateLogEntry(tool.name)]);
            }, 1500 + Math.random() * 1000);
        } else {
            setLogs([`[SYSTEM] ${tool.name} is OFFLINE. Awaiting Elysium Gateway activation.`]);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isGatewayActive, tool.name]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md z-20 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-900 p-3 rounded-full border border-gray-700">
              <tool.icon className="w-8 h-8 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 font-orbitron">{tool.name}</h2>
              <p className="text-gray-400">{tool.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2 font-orbitron">System Description</h3>
                <p className="text-gray-300 leading-relaxed">{tool.longDescription}</p>

                <h3 className="text-lg font-semibold text-cyan-300 mt-6 mb-2 font-orbitron">Current Configuration</h3>
                <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700/50 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Activation Threshold:</span>
                        <span className="font-mono text-cyan-300">{tool.activationThreshold}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Notification Level:</span>
                        <span className="font-mono text-cyan-300 capitalize">{tool.notificationLevel}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2 font-orbitron">Live Data Feed</h3>
                <div ref={logContainerRef} className="bg-gray-900/70 p-3 rounded-md h-80 overflow-y-auto font-mono text-xs text-green-400 border border-gray-700/50">
                   {logs.map((log, index) => (
                       <p key={index} className="whitespace-pre-wrap animate-log-entry">{log}</p>
                   ))}
                </div>
            </div>
          </div>
        </div>
      </div>
       <style jsx="true">{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
            @keyframes log-entry {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-log-entry {
                animation: log-entry 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ToolDetail;
