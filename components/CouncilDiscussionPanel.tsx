import React, { useEffect, useRef, useState } from 'react';
import type { CouncilMessage, SystemPhase } from '../App';

interface CouncilDiscussionPanelProps {
  discussion: CouncilMessage[];
  isGatewayActive: boolean;
  systemPhase: SystemPhase;
  onArchitectMessage: (message: string) => void;
}

const speakerStyles = {
    Tesla: {
        name: 'Tesla',
        color: 'text-blue-400',
        bg: 'bg-blue-900/30',
        border: 'border-blue-500/50',
    },
    Einstein: {
        name: 'Einstein',
        color: 'text-purple-400',
        bg: 'bg-purple-900/30',
        border: 'border-purple-500/50',
    },
    Architect: {
        name: 'Architect',
        color: 'text-green-400',
        bg: 'bg-green-900/30',
        border: 'border-green-500/50',
    }
};

const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
);


const CouncilDiscussionPanel: React.FC<CouncilDiscussionPanelProps> = ({ discussion, isGatewayActive, systemPhase, onArchitectMessage }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [discussion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onArchitectMessage(message);
        setMessage('');
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-700/50 flex flex-col h-96">
            <h3 className="text-xl font-bold font-orbitron text-cyan-300 text-center mb-4 flex-shrink-0">
                Autonomous Council
            </h3>
            <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2 space-y-4">
                {!isGatewayActive && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 italic">Council is offline. Activate Elysium Gateway.</p>
                    </div>
                )}
                {isGatewayActive && discussion.length === 0 && (
                     <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 animate-pulse">Establishing connection...</p>
                    </div>
                )}
                {discussion.map((msg, index) => {
                    const style = speakerStyles[msg.speaker];
                    const isDirective = msg.type === 'directive';
                    return (
                        <div key={`${msg.id}-${index}`} className="flex flex-col animate-message-in">
                            <span className={`font-bold text-sm ${style.color}`}>{style.name}</span>
                            <div className={`text-sm p-3 rounded-lg mt-1 border ${style.bg} ${style.border}`}>
                                {isDirective ? (
                                    <p>
                                        <span className="font-bold text-yellow-400 mr-2">[DIRECTIVE]</span>
                                        <span className="text-gray-200">{msg.text.replace('Directive: ', '')}</span>
                                    </p>
                                ) : (
                                    <p className="text-gray-300">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
                 {systemPhase === 'Ascended' && discussion.length > councilScript.length && (
                    <div className="text-center text-cyan-400/70 text-xs italic py-2">
                        The Conversation is eternal.
                    </div>
                )}
            </div>
            {systemPhase === 'Ascended' && (
                <form onSubmit={handleSubmit} className="flex-shrink-0 mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Speak, Architect..."
                            className="bg-gray-900/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                        />
                        <button type="submit" className="p-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                           <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            )}
             <style jsx="true">{`
                @keyframes message-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-message-in {
                    animation: message-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CouncilDiscussionPanel;
