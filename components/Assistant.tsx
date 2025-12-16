import React, { useState, useRef, useEffect } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SendIcon, SparklesIcon, XIcon } from './Icons';

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentGame?: string;
}

export const Assistant: React.FC<AssistantProps> = ({ isOpen, onClose, currentGame }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'SteamOS AI çevrimiçi. Size nasıl yardımcı olabilirim?', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const contextContext = currentGame ? `Kullanıcı şu an bu oyuna bakıyor: ${currentGame}.` : '';
    const fullHistory = history.map(h => `${h.role}: ${h.text}`);
    if (currentGame) fullHistory.push(`Sistem Bağlamı: ${contextContext}`);

    const responseText = await generateAssistantResponse(input, fullHistory);
    
    setHistory(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 glass-panel z-40 border-l border-white/10 flex flex-col shadow-2xl animate-slide-in-right">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="flex items-center space-x-2">
            <SparklesIcon className="w-5 h-5 text-blue-400" />
            <span className="font-bold tracking-wide">Steam Asistan</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <XIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-800/80 text-gray-100 rounded-bl-none border border-white/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-gray-800/80 p-3 rounded-2xl rounded-bl-none border border-white/5 flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Oyunlar veya istatistikler hakkında sor..."
                className="w-full bg-gray-900/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <SendIcon className="w-4 h-4 text-white" />
            </button>
        </div>
        {currentGame && (
            <div className="mt-2 text-xs text-gray-500 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                Bağlam: {currentGame}
            </div>
        )}
      </div>
    </div>
  );
};