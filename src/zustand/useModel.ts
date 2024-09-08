import { create } from 'zustand';

interface ModelStore {
  items: string[];
  steps: string[];
  [key: number]: string; // 인덱스 스그니처 추가
}

export const useModelStore = create<ModelStore>((set) => ({
  items: [
    'g90-black',
    'g90-long-wheel-base',
    'g90',
    'g80',
    'electrified-g80',
    'g70',
    'g70-shooting-brake',
    'gv80',
    'gv80-coupe',
    'gv70',
    'electrified-gv70',
    'gv60',
    'neolun-concept',
  ],
  steps: [
    'detail',
    'engine',
    'drivetrain',
    'passenger',
    'exterior',
    'interior',
    'garnish',
    'wheel',
    'add',
    'payments',
  ],
  // addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  // removeItem: (index) => set((state) => ({
  //   items: state.items.filter((_, i) => i !== index)
  // })),
}));
