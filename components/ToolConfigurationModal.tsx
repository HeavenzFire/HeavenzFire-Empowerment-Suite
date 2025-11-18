import React, { useState, useEffect, useRef } from 'react';
import type { Tool } from '../App';

interface ToolConfigurationModalProps {
  tool: Tool;
  onClose: () => void;
  onSave: (updatedTool: Tool) => void;
}

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

const ToolConfigurationModal: React.FC<ToolConfigurationModalProps> = ({ tool, onClose, onSave }) => {
  const [activationThreshold, setActivationThreshold] = useState(tool.activationThreshold);
  const [notificationLevel, setNotificationLevel] = useState(tool.notificationLevel);
  const [isAutoTuneEnabled, setIsAutoTuneEnabled] = useState(tool.autoTune ?? false);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActivationThreshold(tool.activationThreshold);
    setNotificationLevel(tool.notificationLevel);
    setIsAutoTuneEnabled(tool.autoTune ?? false);
  }, [tool]);

  useEffect(() => {
    let interval: number | null = null;
    if (isAutoTuneEnabled) {
      setLogs(prev => [...prev.slice(-100), `[${new Date().toLocaleTimeString()}] Auto-Tune engaged. Monitoring ${tool.name}...`]);
      interval = setInterval(() => {
        const thresholdChange = Math.floor(Math.random() * 7) - 3; // -3 to +3
        setActivationThreshold(prev => {
          const newValue = Math.max(0, Math.min(100, prev + thresholdChange));
          if (newValue !== prev) {
            setLogs(l => [...l.slice(-100), `[${new Date().toLocaleTimeString()}] Threshold adjusted by ${thresholdChange > 0 ? '+' : ''}${thresholdChange} -> ${newValue}%`]);
          }
          return newValue;
        });

        if (Math.random() > 0.85) {
          const levels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
          const newLevel = levels[Math.floor(Math.random() * levels.length)];
          setNotificationLevel(prev => {
            if (newLevel !== prev) {
              setLogs(l => [...l.slice(-100), `[${new Date().toLocaleTimeString()}] Coherence shifted. Notification -> ${newLevel.toUpperCase()}`]);
            }
            return newLevel;
          });
        }
      }, 1500);
    } else {
      setLogs([]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoTuneEnabled, tool.name]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSave = () => {
    onSave({ ...tool, activationThreshold, notificationLevel, autoTune: isAutoTuneEnabled });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 animate-fade-in-fast">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 font-orbitron">Configure: {tool.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md border border-gray-700/50">
            <div>
              <label htmlFor="autoTune" className="font-medium text-gray-200">Auto-Tune</label>
              <p className="text-xs text-gray-400">Let the Council autonomously manage parameters.</p>
            </div>
            <button
              onClick={() => setIsAutoTuneEnabled(!isAutoTuneEnabled)}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${isAutoTuneEnabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isAutoTuneEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className={isAutoTuneEnabled ? 'opacity-50' : ''}>
            <div>
              <label htmlFor="threshold" className="block text-sm font-medium text-gray-300 mb-2">
                Activation Threshold: <span className="font-mono text-cyan-300">{activationThreshold}%</span>
              </label>
              <input
                id="threshold"
                type="range"
                min="0"
                max="100"
                value={activationThreshold}
                onChange={(e) => setActivationThreshold(Number(e.target.value))}
                className={`w-full h-2 bg-gray-700 rounded-lg appearance-none ${isAutoTuneEnabled ? 'cursor-not-allowed' : 'cursor-pointer accent-cyan-400'}`}
                disabled={isAutoTuneEnabled}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="notification" className="block text-sm font-medium text-gray-300 mb-2">
                Notification Level
              </label>
              <select
                id="notification"
                value={notificationLevel}
                onChange={(e) => setNotificationLevel(e.target.value as 'low' | 'medium' | 'high')}
                className={`bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 ${isAutoTuneEnabled ? 'cursor-not-allowed' : ''}`}
                disabled={isAutoTuneEnabled}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {isAutoTuneEnabled && (
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2 font-orbitron">Auto-Tune Log</h4>
              <div ref={logContainerRef} className="bg-black p-3 rounded-md h-32 overflow-y-auto font-mono text-xs text-green-400 border border-gray-600">
                {logs.map((log, index) => (
                  <p key={index} className="whitespace-pre-wrap animate-log-entry-modal">{log}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
      <style jsx="true">{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.2s ease-out forwards;
        }
        @keyframes log-entry-modal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-log-entry-modal {
          animation: log-entry-modal 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ToolConfigurationModal;
