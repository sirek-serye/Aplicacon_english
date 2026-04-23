export type View = 'home' | 'explorer' | 'shop' | 'profile' | 'teacher';

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface Mission {
  id: string;
  title: string;
  gold: number;
  completed: boolean;
  progress?: number;
  total?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'hats' | 'outfits' | 'companions' | 'colors';
  owned: boolean;
  equipped: boolean;
  isNew?: boolean;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  lastActive: string;
  currentUnit: string;
  progress: number;
  status: 'on-track' | 'slipping' | 'at-risk';
}
