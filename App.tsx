import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { GameCard } from './components/GameCard';
import { Assistant } from './components/Assistant';
import { 
  GamepadIcon, 
  LibraryIcon, 
  StoreIcon, 
  SettingsIcon, 
  SparklesIcon, 
  BatteryIcon, 
  WifiIcon, 
  PowerIcon,
  PlayIcon,
  SteamLogo
} from './components/Icons';
import { GAMES } from './constants';
import { Tab, Game, SystemStatus } from './types';
import { suggestGameDescription } from './services/geminiService';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [selectedGame, setSelectedGame] = useState<Game>(GAMES[0]);
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    battery: 85,
    time: '12:00',
    wifi: true
  });
  const [bgImage, setBgImage] = useState(GAMES[0].bannerUrl);
  const [aiDescription, setAiDescription] = useState<string | null>(null);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemStatus(prev => ({
        ...prev,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update background when game is selected
  useEffect(() => {
    if (selectedGame) {
      setBgImage(selectedGame.bannerUrl);
      // Reset AI desc when game changes
      setAiDescription(null);
    }
  }, [selectedGame]);

  const handleBootComplete = () => {
    setBooted(true);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleAskAI = async () => {
    if (!selectedGame) return;
    setAssistantOpen(true); // Open the side panel
  };

  // Function to render the main content based on tab
  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return (
          <div className="flex flex-col h-full animate-fade-in">
            {/* Hero Section */}
            <div className="mt-8 mb-12 px-8 flex items-end justify-between">
                <div className="max-w-2xl">
                   <div className="flex items-center space-x-3 mb-2">
                       {selectedGame.lastPlayed && <span className="bg-white/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider text-blue-300">Son Oynanan: {selectedGame.lastPlayed}</span>}
                       <span className="bg-white/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider text-green-300">{selectedGame.playtime} Saat</span>
                   </div>
                   <h1 className="text-6xl font-bold mb-4 drop-shadow-lg leading-tight">{selectedGame.title}</h1>
                   <p className="text-lg text-gray-200 mb-6 drop-shadow-md line-clamp-3 max-w-xl">
                      {aiDescription || selectedGame.description}
                   </p>
                   
                   <div className="flex items-center space-x-4">
                       <button className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-md font-bold text-lg flex items-center space-x-2 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                          <PlayIcon className="w-6 h-6 fill-current" />
                          <span>DEVAM ET</span>
                       </button>
                       <button 
                        onClick={handleAskAI}
                        className="glass-panel hover:bg-white/20 px-6 py-3 rounded-md font-semibold flex items-center space-x-2 transition-all"
                       >
                          <SparklesIcon className="w-5 h-5 text-purple-400" />
                          <span>Asistana Sor</span>
                       </button>
                   </div>
                </div>
            </div>

            {/* Recent Games Row */}
            <div className="flex-1 px-8 pb-8 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
              <h2 className="text-xl font-bold mb-4 text-gray-400 uppercase tracking-widest text-sm">Son Oyunlar</h2>
              <div className="flex space-x-6 pb-4">
                {GAMES.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    isActive={selectedGame.id === game.id}
                    onClick={handleGameSelect} 
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case Tab.LIBRARY:
        return (
          <div className="p-8 h-full overflow-y-auto animate-fade-in">
             <h2 className="text-3xl font-bold mb-8 sticky top-0 bg-transparent backdrop-blur-sm py-4 z-10">Tüm Oyunlar ({GAMES.length})</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {GAMES.map(game => (
                    <div key={game.id} onClick={() => { setSelectedGame(game); setActiveTab(Tab.HOME); }} className="cursor-pointer group">
                        <img src={game.coverUrl} className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200 w-full aspect-[2/3] object-cover" />
                        <div className="mt-2 font-medium truncate group-hover:text-blue-400">{game.title}</div>
                    </div>
                ))}
             </div>
          </div>
        );

      case Tab.STORE:
        return (
          <div className="p-8 h-full flex items-center justify-center animate-fade-in">
             <div className="text-center">
                 <StoreIcon className="w-24 h-24 mx-auto text-gray-600 mb-4" />
                 <h2 className="text-2xl font-bold text-gray-400">Mağaza Çevrimdışı</h2>
                 <p className="text-gray-500 mt-2">Steam sunucularına bağlanılıyor...</p>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!booted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <div className="h-screen w-screen flex relative bg-[#0f1014] overflow-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-40 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014] via-[#0f1014]/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent z-0" />

      {/* Sidebar Navigation */}
      <div className="w-24 h-full glass-panel z-20 flex flex-col items-center py-8 border-r border-white/5 backdrop-blur-xl">
        <div className="mb-12">
            {/* Steam Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#1a9fff] to-[#003d7c] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <SteamLogo className="w-8 h-8 text-white" />
            </div>
        </div>

        <nav className="flex-1 flex flex-col space-y-8 w-full">
            <NavItem icon={<GamepadIcon />} label="Ana Sayfa" active={activeTab === Tab.HOME} onClick={() => setActiveTab(Tab.HOME)} />
            <NavItem icon={<LibraryIcon />} label="Kütüphane" active={activeTab === Tab.LIBRARY} onClick={() => setActiveTab(Tab.LIBRARY)} />
            <NavItem icon={<StoreIcon />} label="Mağaza" active={activeTab === Tab.STORE} onClick={() => setActiveTab(Tab.STORE)} />
            <div className="flex-1"></div>
            <NavItem icon={<SparklesIcon />} label="Asistan" active={isAssistantOpen} onClick={() => setAssistantOpen(!isAssistantOpen)} color="text-purple-400" />
            <NavItem icon={<SettingsIcon />} label="Ayarlar" active={activeTab === Tab.SETTINGS} onClick={() => setActiveTab(Tab.SETTINGS)} />
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col items-center space-y-6 text-gray-400">
             <button className="hover:text-red-400 transition-colors">
                <PowerIcon className="w-6 h-6" />
             </button>
        </div>
      </div>

      {/* Top Bar Status */}
      <div className="absolute top-0 right-0 p-6 z-30 flex items-center space-x-6 text-gray-300 font-medium tracking-wide">
          <div className="flex items-center space-x-2">
            <WifiIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-2">
            <span>{systemStatus.battery}%</span>
            <BatteryIcon level={systemStatus.battery} className="w-6 h-6" />
          </div>
          <div className="text-xl font-bold text-white">
            {systemStatus.time}
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-500">
             <img src="https://picsum.photos/seed/useravatar/100/100" alt="Avatar" />
          </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 h-full overflow-hidden pt-16">
         {renderContent()}
      </main>

      {/* AI Assistant Overlay */}
      <Assistant 
        isOpen={isAssistantOpen} 
        onClose={() => setAssistantOpen(false)} 
        currentGame={selectedGame?.title}
      />

    </div>
  );
};

const NavItem = ({ icon, active, onClick, color = 'text-gray-400' }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, color?: string }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-center py-3 relative group transition-all duration-200`}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>}
        <div className={`transform transition-transform group-hover:scale-110 ${active ? 'text-white scale-110' : color} group-hover:text-white`}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { 
                className: `w-7 h-7 ${active ? 'fill-current' : ''} stroke-2` 
            }) : icon}
        </div>
    </button>
);

export default App;