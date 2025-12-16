import React from 'react';
import { Game } from '../types';
import { PlayIcon } from './Icons';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  isActive?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick, isActive }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className={`relative group cursor-pointer transition-all duration-300 ease-out flex-shrink-0 rounded-lg overflow-hidden
        ${isActive ? 'scale-105 ring-4 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10' : 'hover:scale-105 hover:ring-2 hover:ring-white/30'}
      `}
      style={{ width: '180px', height: '270px' }}
    >
      {/* Cover Image */}
      <img 
        src={game.coverUrl} 
        alt={game.title} 
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-bold text-white text-lg leading-tight mb-1">{game.title}</h3>
        <p className="text-xs text-gray-400 mb-2">{game.playtime} saat</p>
        
        {/* Hover Action */}
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black">
                <PlayIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-green-400">OYNA</span>
        </div>
      </div>
    </div>
  );
};