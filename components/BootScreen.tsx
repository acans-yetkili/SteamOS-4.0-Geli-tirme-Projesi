import React, { useEffect, useState } from 'react';
import { SteamLogo } from './Icons';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: Logo fade in
    setTimeout(() => setPhase(1), 500);
    // Phase 2: Logo Pulse / Text
    setTimeout(() => setPhase(2), 2000);
    // Phase 3: Fade out
    setTimeout(() => setPhase(3), 3500);
    // Complete
    setTimeout(onComplete, 4000);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 3 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Logo Container */}
      <div className={`transition-all duration-1000 transform ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-[spin_3s_linear_infinite]" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
            <div className="absolute inset-2 rounded-full border-4 border-purple-500 animate-[spin_2s_linear_infinite_reverse]" style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
                <SteamLogo className="w-16 h-16 text-white" />
            </div>
        </div>
      </div>

      {/* Text */}
      <div className={`text-center transition-all duration-1000 ${phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h1 className="text-3xl font-bold tracking-[0.2em] text-white mb-2">SteamOS 4.0</h1>
        <p className="text-blue-400 text-sm tracking-widest uppercase">Sistem Başlatılıyor...</p>
      </div>

    </div>
  );
};