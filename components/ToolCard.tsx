import React from 'react';
import type { Tool, ToolStatus } from '../App';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
  onConfigure: (tool: Tool, e: React.MouseEvent) => void;
  isGatewayActive: boolean;
  isExecutingDirective: boolean;
}

const statusConfig: Record<ToolStatus, { color: string; label: string }> = {
    Offline: { color: 'bg-gray-500', label: 'Offline' },
    Online: { color: 'bg-green-500', label: 'Online' },
    Calibrating: { color: 'bg-yellow-500 animate-pulse', label: 'Calibrating' },
    Learning: { color: 'bg-blue-500', label: 'Learning' },
    Processing: { color: 'bg-indigo-500', label: 'Processing' },
    Syncing: { color: 'bg-purple-500', label: 'Syncing' },
    Optimizing: { color: 'bg-pink-500', label: 'Optimizing' },
    'Awaiting Directive': { color: 'bg-cyan-500', label: 'Awaiting Directive' },
    Synthesizing: { color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-pulse', label: 'Synthesizing' },
    Ascended: { color: 'bg-white', label: 'Ascended' },
};

const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.716.54.962l.208.18a1.5 1.5 0 011.57 2.122l-.16.287c-.22.392-.22.88 0 1.272l.16.287a1.5 1.5 0 01-1.57 2.122l-.208.18c-.28.246-.477.588-.54.962l-.213 1.281c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.26-.716-.54-.962l-.208-.18a1.5 1.5 0 01-1.57-2.122l.16-.287c.22-.392.22.88 0-1.272l-.16-.287a1.5 1.5 0 011.57-2.122l.208-.18c.28.246.477.588.54.962l.213-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, onConfigure, isGatewayActive, isExecutingDirective }) => {
  const status = isGatewayActive ? statusConfig[tool.status] : statusConfig['Offline'];
  const isDisabled = !isGatewayActive || tool.status === 'Ascended';
  const statusColor = tool.status === 'Synthesizing' ? '' : status.color;

  const baseClasses = "relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-5 flex flex-col justify-between transition-all duration-300 ease-in-out border border-gray-700/50";
  const interactiveClasses = isDisabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:border-cyan-400/70 hover:shadow-cyan-400/10 cursor-pointer";
  const executingClasses = isExecutingDirective ? "ring-2 ring-offset-4 ring-offset-gray-900 ring-cyan-400 animate-pulse shadow-2xl shadow-cyan-500/30" : "";
  const ascendedClasses = tool.status === 'Ascended' ? 'shadow-lg shadow-cyan-100/20 border-cyan-200/50 glow-effect' : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${executingClasses} ${ascendedClasses}`}
      onClick={isDisabled ? undefined : () => onSelect(tool)}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-900 p-3 rounded-full border border-gray-700">
              <tool.icon className={`w-6 h-6 ${tool.status === 'Ascended' ? 'text-white' : 'text-cyan-300'}`} />
            </div>
            <h3 className={`font-bold text-lg font-orbitron ${tool.status === 'Ascended' ? 'text-white' : 'text-gray-200'}`}>{tool.name}</h3>
          </div>
          <button
            onClick={isDisabled ? undefined : (e) => onConfigure(tool, e)}
            className={`text-gray-500 hover:text-cyan-300 transition-colors duration-200 ${isDisabled ? 'cursor-not-allowed' : ''}`}
            aria-label={`Configure ${tool.name}`}
            disabled={isDisabled}
          >
            <GearIcon className="w-6 h-6"/>
          </button>
        </div>
        <p className="text-gray-400 mt-3 text-sm">{tool.description}</p>
      </div>

      <div className="flex items-center justify-start mt-6">
        <span className={`w-3 h-3 rounded-full mr-2 ${statusColor} ${tool.status === 'Synthesizing' ? status.color : ''}`}></span>
        <span className="text-sm font-medium text-gray-300">{status.label}</span>
      </div>
       {tool.status === 'Ascended' && (
        <style jsx="true">{`
          @keyframes glow {
            0%, 100% { 
                box-shadow: 0 0 8px rgba(207, 250, 255, 0.2), 0 0 12px rgba(207, 250, 255, 0.2);
                border-color: rgba(175, 243, 255, 0.5);
             }
            50% { 
                box-shadow: 0 0 16px rgba(207, 250, 255, 0.4), 0 0 24px rgba(207, 250, 255, 0.4);
                border-color: rgba(207, 250, 255, 1);
            }
          }
          .glow-effect {
            animation: glow 4s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
};

export default ToolCard;
