import { create } from 'zustand';

interface PostStore {
  list: {
    searchWord: string;
    thisPage: string;
  };
  setSearchWord: (word: string) => void;
}

export const postStore = create<PostStore>((set) => ({
  list: {
    searchWord: '',
    thisPage: '1',
  },

  setSearchWord: (searchWord) => set((state) => ({ list: { ...state.list, searchWord } })),
}));
