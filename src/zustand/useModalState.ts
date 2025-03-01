import { create } from 'zustand';

export interface ModalStateType {
  modalState: boolean;
  setModalToggleState: () => void;
  setModalSelectState: (state: boolean) => void;
}

export const useModalStateStore = create<ModalStateType>((set) => ({
  modalState: false,
  setModalToggleState: () => set((state) => ({ modalState: !state.modalState })),
  setModalSelectState: (newState) => set((newWtate) => ({ modalState: newState })),
}));
