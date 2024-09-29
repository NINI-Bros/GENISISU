import { Cart, CartOption } from '../../types/product';
import { create } from 'zustand';

export interface SelectStore {
  selectItem: Cart;
  updateSelectItem: (state: Cart | undefined) => void;
  resetSelectItem: () => void;
}

export const useSelectStore = create<SelectStore>((set) => ({
  selectItem: { model: '', price: 0 },
  updateSelectItem: (selectItem) => set({ selectItem }),
  resetSelectItem: () => set({ selectItem: { model: '', price: 0 } }),
}));

// 사용할 필드를 셀렉터로 추척
export const useSelectState = () => useSelectStore((state) => state.selectItem);
export const useSelectUpdate = () => useSelectStore((state) => state.updateSelectItem);
export const useSelectReset = () => useSelectStore((state) => state.resetSelectItem);
