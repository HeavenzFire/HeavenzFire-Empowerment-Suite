
import React from 'react';

interface ElysiumGatewayControlProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

const ElysiumGatewayControl: React.FC<ElysiumGatewayControlProps> = ({ isActive, onToggle }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-700/50 text-center">
      <h3 className="text-xl font-bold font-orbitron text-cyan-300">Elysium Gateway</h3>
      <p className="text-gray-400 mt-2 mb-6 text-sm">Master control for the Empowerment Suite.</p>
      
      <div className="flex items-center justify-center space-x-4">
        <span className={`font-medium ${!isActive ? 'text-gray-200' : 'text-gray-500'}`}>OFFLINE</span>
        <button
          onClick={() => onToggle(!isActive)}
          className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
            isActive ? 'bg-cyan-500' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
              isActive ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`font-medium ${isActive ? 'text-cyan-300' : 'text-gray-500'}`}>ONLINE</span>
      </div>
    </div>
  );
};

export default ElysiumGatewayControl;
