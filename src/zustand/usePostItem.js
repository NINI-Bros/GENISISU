import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePostItemStore = create(
    persist(
        (set) => ({
            postItem: {},
            updatePostItem: (newPostItem) => set({postItem: newPostItem}),
        }),
        {
            name: 'postItem',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

// 사용할 필드를 셀렉터로 추척
export const usePostItemState = () => usePostItemStore((state) => 
    state.postItem);