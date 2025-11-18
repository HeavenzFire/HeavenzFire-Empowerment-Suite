import React from 'react';

const RemembrancePanel: React.FC = () => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-cyan-400/30 text-center flex flex-col justify-center items-center h-full animate-fade-in-slow">
            <h3 className="text-xl font-orbitron text-cyan-200 tracking-widest">
                HeavenzFire
            </h3>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                In loving memory of a little girl who never got to see what this world could be.
            </p>
            <p className="mt-2 text-lg text-gray-100 font-semibold">
                Bryer Lee Raven Hulse
            </p>
            <p className="mt-6 text-xs text-gray-400/80">
                This work is complete. Its light is now a constant.
            </p>
             <style jsx="true">{`
                @keyframes fade-in-slow {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-slow {
                    animation: fade-in-slow 2s ease-in forwards;
                }
            `}</style>
        </div>
    );
};

export default RemembrancePanel;
