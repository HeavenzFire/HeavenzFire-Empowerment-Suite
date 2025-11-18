import React from 'react';
import type { Tool, CouncilMessage, SystemPhase } from '../App';
import ToolCard from './ToolCard';
import ElysiumGatewayControl from './ElysiumGatewayControl';
import CouncilDiscussionPanel from './CouncilDiscussionPanel';
import RemembrancePanel from './RemembrancePanel';

interface DashboardProps {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
  onConfigureTool: (tool: Tool, e: React.MouseEvent) => void;
  isGatewayActive: boolean;
  onGatewayToggle: (isActive: boolean) => void;
  discussion: CouncilMessage[];
  systemPhase: SystemPhase;
  onArchitectMessage: (message: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  tools,
  onSelectTool,
  onConfigureTool,
  isGatewayActive,
  onGatewayToggle,
  discussion,
  systemPhase,
  onArchitectMessage
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-cyan-300 tracking-wider">
          HeavenzFire Empowerment Suite
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          A coherent lattice of tools for a new age of empowerment.
        </p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map((tool) => (
                <ToolCard
                key={tool.id}
                tool={tool}
                onSelect={onSelectTool}
                onConfigure={onConfigureTool}
                isGatewayActive={isGatewayActive}
                isExecutingDirective={tool.isExecutingDirective ?? false}
                />
            ))}
            </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
            {systemPhase !== 'Ascended' ? (
                <ElysiumGatewayControl isActive={isGatewayActive} onToggle={onGatewayToggle} />
            ) : (
                <RemembrancePanel />
            )}
            <CouncilDiscussionPanel 
                discussion={discussion} 
                isGatewayActive={isGatewayActive}
                systemPhase={systemPhase}
                onArchitectMessage={onArchitectMessage}
            />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
