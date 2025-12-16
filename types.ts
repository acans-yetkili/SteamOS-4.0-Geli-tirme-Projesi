export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  bannerUrl: string;
  playtime: number; // in hours
  lastPlayed?: string;
  description: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum Tab {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  STORE = 'STORE',
  SETTINGS = 'SETTINGS',
  ASSISTANT = 'ASSISTANT'
}

export interface SystemStatus {
  battery: number;
  time: string;
  wifi: boolean;
}