import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Elden Ring',
    coverUrl: 'https://picsum.photos/seed/eldenring/300/450',
    bannerUrl: 'https://picsum.photos/seed/eldenringbanner/1200/600',
    playtime: 142,
    lastPlayed: 'Bugün',
    description: 'YENİ FANTAZİ AKSİYON RPG. Aradaki Topraklar\'da Elden Lordu olmak için lütufun rehberliğinde Elden Yüzüğü\'nün gücünü kullanın.',
    tags: ['RPG', 'Açık Dünya', 'Zor']
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    coverUrl: 'https://picsum.photos/seed/cyberpunk/300/450',
    bannerUrl: 'https://picsum.photos/seed/cyberpunkbanner/1200/600',
    playtime: 68,
    lastPlayed: 'Dün',
    description: 'Cyberpunk 2077, güç, ihtişam ve vücut modifikasyonu takıntılı tehlikeli bir metropol olan Night City\'nin karanlık geleceğinde geçen bir açık dünya aksiyon-macera RPG oyunudur.',
    tags: ['Bilim Kurgu', 'FPS', 'RPG']
  },
  {
    id: '3',
    title: 'Hades II',
    coverUrl: 'https://picsum.photos/seed/hades/300/450',
    bannerUrl: 'https://picsum.photos/seed/hadesbanner/1200/600',
    playtime: 12,
    lastPlayed: '2 gün önce',
    description: 'Ödüllü rogue-like zindan tarayıcısının bu büyüleyici devam oyununda Zaman Titanı\'nı alt etmek için kara büyü kullanarak Yeraltı Dünyasının ötesinde savaşın.',
    tags: ['Roguelike', 'Aksiyon', 'Bağımsız']
  },
  {
    id: '4',
    title: 'Stardew Valley',
    coverUrl: 'https://picsum.photos/seed/stardew/300/450',
    bannerUrl: 'https://picsum.photos/seed/stardewbanner/1200/600',
    playtime: 200,
    description: 'Büyükbabanın Stardew Valley\'deki eski çiftliğini devraldın. Elinde birkaç eski alet ve biraz parayla yeni hayatına başlamak için yola koyuluyorsun.',
    tags: ['Çiftçilik', 'Simülasyon', 'Rahatlatıcı']
  },
  {
    id: '5',
    title: 'Baldur\'s Gate 3',
    coverUrl: 'https://picsum.photos/seed/bg3/300/450',
    bannerUrl: 'https://picsum.photos/seed/bg3banner/1200/600',
    playtime: 89,
    description: 'Baldur’s Gate 3, seçimlerinizin dostluk ve ihanet, hayatta kalma ve fedakarlık hikayesini şekillendirdiği Zindanlar ve Ejderhalar evreninde geçen zengin hikayeli bir RPG\'dir.',
    tags: ['RPG', 'Strateji', 'Hikaye Zengin']
  },
  {
    id: '6',
    title: 'Hollow Knight',
    coverUrl: 'https://picsum.photos/seed/hollow/300/450',
    bannerUrl: 'https://picsum.photos/seed/hollowbanner/1200/600',
    playtime: 45,
    description: 'Hollow Knight\'ta kendi yolunu çiz! Böcekler ve kahramanlardan oluşan yıkık bir krallıkta destansı bir aksiyon macerası. Klasik, el çizimi 2D tarzında kıvrımlı mağaraları keşfedin.',
    tags: ['Metroidvania', 'Souls-like', '2D']
  }
];